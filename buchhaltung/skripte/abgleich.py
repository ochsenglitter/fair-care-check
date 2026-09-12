"""Gleicht Buchungen gegen Belege ab und schreibt auf, was noch fehlt.

Erzeugt drei Dateien:
  zuordnung.csv     jede Buchung mit dem Beleg, der ihr zugeordnet wurde
  offene-posten.csv nur die Buchungen ohne sicheren Beleg - die Arbeitsliste
  bericht.md        lesbare Zusammenfassung, nach Anbieter gebuendelt

Aufruf:
  python3 abgleich.py buchungen.csv belege.csv --ausgabe ../daten/export [--ab 2026-01-01]
"""

from __future__ import annotations

import datetime as dt
import os
import sys
from collections import defaultdict

from gemeinsam import aehnlichkeit, euro, tabelle_lesen, tabelle_schreiben

# Rechnungsdatum und Buchungstag liegen auseinander; vier Wochen sind normal.
TAGE_VOLLE_PUNKTE = 3
TAGE_MAXIMAL = 45
CENT_TOLERANZ = 0.02

MINDEST_NAME = 0.5     # darunter gilt ein Namenstreffer als Zufall
SICHER = 0.75          # ab hier gilt der Beleg als zugeordnet
PRUEFEN = 0.45         # dazwischen: Vorschlag, den ein Mensch bestaetigt

SPALTEN_ZUORDNUNG = [
    "datum", "betrag", "richtung", "empfaenger", "verwendungszweck", "konto",
    "status", "beleg", "beleg_pfad", "guete",
]
SPALTEN_OFFEN = [
    "datum", "betrag", "richtung", "empfaenger", "verwendungszweck", "konto",
    "status", "moeglicher_beleg", "guete", "naechster_schritt",
]


def punktzahl(buchung: dict, beleg: dict) -> float:
    """Bewertet, wie gut ein Beleg zu einer Buchung passt (0 bis 1)."""
    beleg_datum = beleg["_datum"]
    if beleg_datum is None:
        datumspunkte = 0.0
        abstand = TAGE_MAXIMAL
    else:
        abstand = abs((buchung["_datum"] - beleg_datum).days)
        if abstand > TAGE_MAXIMAL:
            return 0.0
        if abstand <= TAGE_VOLLE_PUNKTE:
            datumspunkte = 1.0
        else:
            datumspunkte = max(0.0, 1.0 - (abstand - TAGE_VOLLE_PUNKTE) / TAGE_MAXIMAL)

    text = f"{buchung.get('empfaenger', '')} {buchung.get('verwendungszweck', '')}"
    namenspunkte = max(
        aehnlichkeit(text, beleg.get("anbieter", "")),
        aehnlichkeit(text, beleg.get("titel", "")),
    )

    # Ein uebereinstimmender Betrag ist der staerkste Einzelbeleg fuer eine Zuordnung.
    betragspunkte = 0.0
    if beleg["_betrag"] is not None:
        if abs(beleg["_betrag"] - abs(buchung["_betrag"])) <= CENT_TOLERANZ:
            betragspunkte = 1.0
        else:
            return min(0.4, 0.5 * namenspunkte)  # Betrag bekannt und falsch

    if betragspunkte:
        return min(1.0, 0.45 * betragspunkte + 0.3 * namenspunkte + 0.25 * datumspunkte)

    # Ohne passenden Betrag muss wenigstens der Name tragen. Zwei Buchungen am
    # selben Tag sind Alltag - Datumsnaehe allein ist deshalb kein Nachweis.
    if namenspunkte < MINDEST_NAME:
        return 0.0
    return min(0.95, 0.62 * namenspunkte + 0.38 * datumspunkte)


def zuordnen(buchungen: list[dict], belege: list[dict]) -> list[dict]:
    """Ordnet die besten Paare zuerst zu; jeder Beleg wird nur einmal vergeben."""
    paare = []
    for b_index, buchung in enumerate(buchungen):
        for l_index, beleg in enumerate(belege):
            wert = punktzahl(buchung, beleg)
            if wert >= PRUEFEN:
                paare.append((wert, b_index, l_index))
    paare.sort(reverse=True)

    beleg_fuer_buchung: dict[int, tuple[int, float]] = {}
    vergebene_belege: set[int] = set()
    for wert, b_index, l_index in paare:
        if b_index in beleg_fuer_buchung or l_index in vergebene_belege:
            continue
        beleg_fuer_buchung[b_index] = (l_index, wert)
        vergebene_belege.add(l_index)

    ergebnis = []
    for b_index, buchung in enumerate(buchungen):
        treffer = beleg_fuer_buchung.get(b_index)
        zeile = dict(buchung)
        if treffer is None:
            zeile.update(status="fehlt", beleg="", beleg_pfad="", guete="")
        else:
            l_index, wert = treffer
            beleg = belege[l_index]
            zeile.update(
                status="zugeordnet" if wert >= SICHER else "pruefen",
                beleg=beleg["titel"],
                beleg_pfad=beleg.get("pfad", ""),
                guete=f"{wert:.2f}",
            )
        ergebnis.append(zeile)
    return ergebnis


def naechster_schritt(zeile: dict) -> str:
    if zeile["status"] == "pruefen":
        return "Vorschlag pruefen und Beleg umbenennen, oder Zuordnung verwerfen"
    if zeile["richtung"] == "einnahme":
        return "Ausgangsrechnung heraussuchen und ablegen"
    betrag = abs(zeile["_betrag"])
    if betrag >= 250:
        return "Rechnung beim Anbieter anfordern (Pflichtangaben ab 250 EUR beachten)"
    return "Beleg suchen; falls unauffindbar: Eigenbeleg schreiben"


def bericht_schreiben(pfad: str, zeilen: list[dict], zeitraum: str) -> str:
    offen = [z for z in zeilen if z["status"] in {"fehlt", "pruefen"}]
    fehlend = [z for z in zeilen if z["status"] == "fehlt"]
    zugeordnet = len(zeilen) - len(offen)
    quote = (zugeordnet / len(zeilen) * 100) if zeilen else 100.0

    # Nach Anbieter buendeln: aus vielen Einzelposten werden wenige Aufgaben.
    nach_anbieter: dict[str, list[dict]] = defaultdict(list)
    for zeile in fehlend:
        schluessel = (zeile.get("empfaenger") or zeile.get("verwendungszweck") or "ohne Angabe").strip()
        nach_anbieter[schluessel[:60]].append(zeile)

    gruppen = sorted(
        nach_anbieter.items(),
        key=lambda paar: sum(abs(z["_betrag"]) for z in paar[1]),
        reverse=True,
    )

    text = [
        f"# Belegabgleich {zeitraum}",
        "",
        f"- Buchungen geprueft: **{len(zeilen)}**",
        f"- Mit Beleg: **{zugeordnet}** ({quote:.0f} %)",
        f"- Beleg fehlt: **{len(fehlend)}** "
        f"(Summe {euro(sum(abs(z['_betrag']) for z in fehlend))} EUR)",
        f"- Zuordnung unsicher, bitte bestaetigen: **{len(offen) - len(fehlend)}**",
        "",
    ]

    if not offen:
        text += ["Alle Buchungen in diesem Zeitraum haben einen Beleg. Nichts zu tun.", ""]
    else:
        if gruppen:
            text += [
            "## Aufgaben, nach Anbieter gebuendelt",
            "",
            "Die groessten Posten zuerst. Ein Anbieter ist eine Aufgabe, auch wenn",
            "mehrere Buchungen dahinterstehen - Abo-Rechnungen holt man im Kundenkonto",
            "am besten alle auf einmal.",
            "",
            "| Anbieter | Buchungen | Summe EUR | Zeitraum |",
            "| --- | ---: | ---: | --- |",
            ]
            for name, posten in gruppen:
                summe = sum(abs(z["_betrag"]) for z in posten)
                daten = sorted(z["datum"] for z in posten)
                spanne = daten[0] if len(daten) == 1 else f"{daten[0]} bis {daten[-1]}"
                text.append(f"| {name} | {len(posten)} | {euro(summe)} | {spanne} |")
            text.append("")

        unsicher = [z for z in offen if z["status"] == "pruefen"]
        if unsicher:
            text += [
                "## Zuordnungen zum Bestaetigen",
                "",
                "Hier wurde ein passender Beleg gefunden, aber Name oder Datum weichen ab.",
                "",
                "| Datum | Betrag EUR | Buchung | Vorgeschlagener Beleg | Guete |",
                "| --- | ---: | --- | --- | ---: |",
            ]
            for zeile in sorted(unsicher, key=lambda z: abs(z["_betrag"]), reverse=True):
                partner = (zeile.get("empfaenger") or zeile.get("verwendungszweck") or "")[:40]
                text.append(
                    f"| {zeile['datum']} | {euro(abs(zeile['_betrag']))} | {partner} "
                    f"| {zeile['beleg'][:50]} | {zeile['guete']} |"
                )
            text.append("")

        text += [
            "## Naechster Schritt",
            "",
            "1. `offene-posten.csv` oeffnen und die Anbieter von oben abarbeiten.",
            "2. Belege ins Jahresverzeichnis legen, benannt nach dem Schema",
            "   `JJJJ-MM-TT_Anbieter_Kurzbeschreibung.pdf`.",
            "3. Abgleich erneut laufen lassen. Was dann noch offen ist, geht als",
            "   Eigenbeleg oder als Frage an die Steuerkanzlei.",
            "",
        ]

    inhalt = "\n".join(text)
    with open(pfad, "w", encoding="utf-8") as datei:
        datei.write(inhalt)
    return inhalt


def vorbereiten(zeilen: list[dict], ab: dt.date | None, bis: dt.date | None) -> list[dict]:
    from gemeinsam import betrag_lesen, datum_lesen

    fertig = []
    for zeile in zeilen:
        datum = datum_lesen(zeile.get("datum", ""))
        betrag = betrag_lesen(zeile.get("betrag", ""))
        if datum is None:
            continue
        if ab and datum < ab:
            continue
        if bis and datum > bis:
            continue
        zeile["_datum"] = datum
        zeile["_betrag"] = betrag if betrag is not None else 0.0
        fertig.append(zeile)
    return fertig


def belege_vorbereiten(zeilen: list[dict]) -> list[dict]:
    from gemeinsam import betrag_lesen, datum_lesen

    for zeile in zeilen:
        zeile["_datum"] = datum_lesen(zeile.get("datum", ""))
        zeile["_betrag"] = betrag_lesen(zeile.get("betrag", ""))
    return zeilen


def main(argumente: list[str]) -> int:
    if len(argumente) < 2:
        print(__doc__)
        return 1

    buchungsdatei, belegdatei = argumente[0], argumente[1]
    ausgabeordner = "."
    if "--ausgabe" in argumente:
        ausgabeordner = argumente[argumente.index("--ausgabe") + 1]
    os.makedirs(ausgabeordner, exist_ok=True)

    from gemeinsam import datum_lesen

    ab = datum_lesen(argumente[argumente.index("--ab") + 1]) if "--ab" in argumente else None
    bis = datum_lesen(argumente[argumente.index("--bis") + 1]) if "--bis" in argumente else None

    buchungen = vorbereiten(tabelle_lesen(buchungsdatei), ab, bis)
    belege = belege_vorbereiten(tabelle_lesen(belegdatei))
    if not buchungen:
        print("Keine Buchungen im gewaehlten Zeitraum.")
        return 0

    zeilen = zuordnen(buchungen, belege)
    for zeile in zeilen:
        zeile["betrag"] = f"{zeile['_betrag']:.2f}"

    tabelle_schreiben(
        os.path.join(ausgabeordner, "zuordnung.csv"), zeilen, SPALTEN_ZUORDNUNG
    )

    offen = []
    for zeile in zeilen:
        if zeile["status"] == "zugeordnet":
            continue
        offene_zeile = dict(zeile)
        offene_zeile["moeglicher_beleg"] = zeile["beleg"]
        offene_zeile["naechster_schritt"] = naechster_schritt(zeile)
        offen.append(offene_zeile)
    offen.sort(key=lambda z: abs(z["_betrag"]), reverse=True)
    tabelle_schreiben(
        os.path.join(ausgabeordner, "offene-posten.csv"), offen, SPALTEN_OFFEN
    )

    zeitraum = f"{min(z['datum'] for z in zeilen)} bis {max(z['datum'] for z in zeilen)}"
    bericht_schreiben(os.path.join(ausgabeordner, "bericht.md"), zeilen, zeitraum)

    fehlend = sum(1 for z in zeilen if z["status"] == "fehlt")
    print(
        f"{len(zeilen)} Buchungen, {len(zeilen) - len(offen)} mit Beleg, "
        f"{fehlend} ohne Beleg, {len(offen) - fehlend} zu bestaetigen"
    )
    print(f"-> {os.path.join(ausgabeordner, 'bericht.md')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
