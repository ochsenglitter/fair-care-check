"""Fuehrt alle Konten zusammen und erstellt eine realistische Auswertung.

Der Kern ist die Erkennung von Umbuchungen: Geld, das nur zwischen eigenen
Konten wandert, ist weder Einnahme noch Ausgabe. Erkannt wird es an der
Gegenbuchung - gleicher Betrag, entgegengesetztes Vorzeichen, wenige Tage
Abstand. Das ist zuverlaessiger als Stichwoerter im Verwendungszweck.

Aufruf:
  python3 uebersicht.py buchungen.csv [weitere.csv ...] --ausgabe ORDNER [--ab 2026-01-01]
"""

from __future__ import annotations

import os
import sys
from collections import defaultdict

from gemeinsam import betrag_lesen, datum_lesen, euro, tabelle_lesen, tabelle_schreiben

KONTEN_DATEI = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "regeln", "konten.csv"
)

# Umbuchungen brauchen ein paar Tage Spielraum, weil Wertstellungen abweichen.
UMBUCHUNG_TAGE = 4
CENT_TOLERANZ = 0.02

SPALTEN_UMBUCHUNG = ["datum", "betrag", "von", "nach", "verwendungszweck"]


def konten_laden(pfad: str = KONTEN_DATEI) -> dict[str, str]:
    """Ordnet jedem Kontonamen seine Art zu: geschaeft, privat oder ruecklage."""
    if not os.path.exists(pfad):
        return {}
    return {
        (zeile.get("kontoname") or "").strip().lower(): (zeile.get("art") or "").strip().lower()
        for zeile in tabelle_lesen(pfad)
        if zeile.get("kontoname")
    }


def konto_art(kontoname: str, konten: dict[str, str]) -> str:
    """Bestimmt die Art anhand des Kontonamens; im Zweifel geschaeftlich."""
    name = (kontoname or "").strip().lower()
    if name in konten:
        return konten[name]
    # Dateinamen wie 'dkb-privat-2026-08' enthalten den Kontonamen als Teil.
    for bekannt, art in konten.items():
        if bekannt and bekannt in name:
            return art
    if "privat" in name:
        return "privat"
    return "geschaeft"


def umbuchungen_finden(buchungen: list[dict]) -> list[tuple[int, int]]:
    """Findet Paare aus Abgang und Zugang, die denselben Geldbetrag betreffen."""
    abgaenge = [i for i, b in enumerate(buchungen) if b["_betrag"] < 0]
    zugaenge = [i for i, b in enumerate(buchungen) if b["_betrag"] > 0]

    nach_betrag: dict[str, list[int]] = defaultdict(list)
    for i in zugaenge:
        nach_betrag[f"{abs(buchungen[i]['_betrag']):.2f}"].append(i)

    paare: list[tuple[int, int]] = []
    vergeben: set[int] = set()
    for i in sorted(abgaenge, key=lambda x: abs(buchungen[x]["_betrag"]), reverse=True):
        betrag = abs(buchungen[i]["_betrag"])
        kandidaten = []
        # Cent-Toleranz durch Blick auf die benachbarten Betragsschluessel.
        for versatz in (0.0, CENT_TOLERANZ, -CENT_TOLERANZ):
            kandidaten += nach_betrag.get(f"{betrag + versatz:.2f}", [])

        bester, bester_abstand = None, UMBUCHUNG_TAGE + 1
        for j in kandidaten:
            if j in vergeben:
                continue
            abstand = abs((buchungen[j]["_datum"] - buchungen[i]["_datum"]).days)
            if abstand <= UMBUCHUNG_TAGE and abstand < bester_abstand:
                bester, bester_abstand = j, abstand

        if bester is not None:
            paare.append((i, bester))
            vergeben.add(bester)
            vergeben.add(i)
    return paare


def vorbereiten(pfade: list[str], ab, bis, konten: dict[str, str]) -> list[dict]:
    buchungen = []
    for pfad in pfade:
        herkunft = os.path.basename(pfad)
        for zeile in tabelle_lesen(pfad):
            datum = datum_lesen(zeile.get("datum", ""))
            betrag = betrag_lesen(zeile.get("betrag", ""))
            if datum is None or betrag is None:
                continue
            if (ab and datum < ab) or (bis and datum > bis):
                continue
            kontoname = (zeile.get("konto") or "").strip() or herkunft
            zeile["_datum"] = datum
            zeile["_betrag"] = betrag
            zeile["_konto"] = kontoname
            zeile["_art"] = konto_art(kontoname, konten)
            buchungen.append(zeile)
    buchungen.sort(key=lambda b: b["_datum"])
    return buchungen


def auswerten(buchungen: list[dict]) -> dict:
    paare = umbuchungen_finden(buchungen)
    ist_umbuchung = set()
    for links, rechts in paare:
        ist_umbuchung.add(links)
        ist_umbuchung.add(rechts)

    zahlen = {
        "einnahmen_betrieb": 0.0, "ausgaben_betrieb": 0.0,
        "ausgaben_privat": 0.0, "einnahmen_privat": 0.0,
        "ruecklage_zu": 0.0, "ruecklage_ab": 0.0,
        "umbuchungen": len(paare),
        "umbuchungssumme": sum(abs(buchungen[l]["_betrag"]) for l, _ in paare),
    }

    for index, buchung in enumerate(buchungen):
        if index in ist_umbuchung:
            buchung["_kategorie"] = "umbuchung"
            continue
        betrag, art = buchung["_betrag"], buchung["_art"]
        if art == "ruecklage":
            schluessel = "ruecklage_zu" if betrag > 0 else "ruecklage_ab"
            buchung["_kategorie"] = "ruecklage"
        elif art == "privat":
            schluessel = "einnahmen_privat" if betrag > 0 else "ausgaben_privat"
            buchung["_kategorie"] = "privat"
        else:
            schluessel = "einnahmen_betrieb" if betrag > 0 else "ausgaben_betrieb"
            buchung["_kategorie"] = "betrieb"
        zahlen[schluessel] += abs(betrag)

    zahlen["ergebnis"] = zahlen["einnahmen_betrieb"] - zahlen["ausgaben_betrieb"]
    zahlen["ruecklage_veraenderung"] = zahlen["ruecklage_zu"] - zahlen["ruecklage_ab"]
    return {"zahlen": zahlen, "paare": paare, "buchungen": buchungen}


def bericht(ergebnis: dict, zeitraum: str) -> str:
    z = ergebnis["zahlen"]
    buchungen = ergebnis["buchungen"]

    text = [
        f"# Uebersicht {zeitraum}",
        "",
        "Umbuchungen zwischen eigenen Konten sind herausgerechnet. Sie tauchen",
        "weder als Einnahme noch als Ausgabe auf, weil kein Geld das Vermoegen",
        "verlassen hat.",
        "",
        "## Betrieb",
        "",
        "| | EUR |",
        "| --- | ---: |",
        f"| Einnahmen | {euro(z['einnahmen_betrieb'])} |",
        f"| Ausgaben | {euro(z['ausgaben_betrieb'])} |",
        f"| **Ergebnis** | **{euro(z['ergebnis'])}** |",
        "",
        "Das Ergebnis ist eine Ueberschlagsrechnung aus den Kontobewegungen, kein",
        "Jahresabschluss. Abschreibungen, offene Rechnungen und die Umsatzsteuer",
        "sind darin nicht beruecksichtigt.",
        "",
        "## Privat",
        "",
        "| | EUR |",
        "| --- | ---: |",
        f"| Ausgaben | {euro(z['ausgaben_privat'])} |",
        f"| Eingaenge | {euro(z['einnahmen_privat'])} |",
        "",
    ]

    if z["ruecklage_zu"] or z["ruecklage_ab"]:
        text += [
            "## Ruecklagen",
            "",
            "| | EUR |",
            "| --- | ---: |",
            f"| Eingezahlt | {euro(z['ruecklage_zu'])} |",
            f"| Entnommen | {euro(z['ruecklage_ab'])} |",
            f"| **Veraenderung** | **{euro(z['ruecklage_veraenderung'])}** |",
            "",
            "Das ist die Bewegung im Zeitraum, nicht der Kontostand. Fuer den Stand",
            "fehlt der Anfangssaldo - siehe PROZESS.md.",
            "",
        ]

    text += [
        "## Zwischen eigenen Konten",
        "",
        f"{z['umbuchungen']} Umbuchungen ueber zusammen {euro(z['umbuchungssumme'])} EUR",
        "wurden erkannt und herausgerechnet.",
        "",
    ]

    # Groesste Ausgabenposten des Betriebs, damit die Zahlen greifbar werden.
    nach_partner: dict[str, float] = defaultdict(float)
    for buchung in buchungen:
        if buchung.get("_kategorie") == "betrieb" and buchung["_betrag"] < 0:
            name = (buchung.get("empfaenger") or buchung.get("verwendungszweck") or "ohne Angabe")
            nach_partner[name.strip()[:45]] += abs(buchung["_betrag"])

    if nach_partner:
        text += [
            "## Groesste Betriebsausgaben",
            "",
            "| Empfaenger | EUR |",
            "| --- | ---: |",
        ]
        for name, summe in sorted(nach_partner.items(), key=lambda p: p[1], reverse=True)[:15]:
            text.append(f"| {name} | {euro(summe)} |")
        text.append("")

    return "\n".join(text)


def main(argumente: list[str]) -> int:
    if not argumente:
        print(__doc__)
        return 1

    ausgabeordner = "."
    if "--ausgabe" in argumente:
        ausgabeordner = argumente[argumente.index("--ausgabe") + 1]
    os.makedirs(ausgabeordner, exist_ok=True)

    ab = datum_lesen(argumente[argumente.index("--ab") + 1]) if "--ab" in argumente else None
    bis = datum_lesen(argumente[argumente.index("--bis") + 1]) if "--bis" in argumente else None

    pfade = []
    ueberspringen = False
    for eintrag in argumente:
        if ueberspringen:
            ueberspringen = False
            continue
        if eintrag.startswith("--"):
            ueberspringen = True
            continue
        pfade.append(eintrag)

    buchungen = vorbereiten(pfade, ab, bis, konten_laden())
    if not buchungen:
        print("Keine Buchungen im gewaehlten Zeitraum.")
        return 0

    ergebnis = auswerten(buchungen)
    zeitraum = f"{buchungen[0]['_datum'].isoformat()} bis {buchungen[-1]['_datum'].isoformat()}"

    with open(os.path.join(ausgabeordner, "uebersicht.md"), "w", encoding="utf-8") as datei:
        datei.write(bericht(ergebnis, zeitraum))

    tabelle_schreiben(
        os.path.join(ausgabeordner, "umbuchungen.csv"),
        [
            {
                "datum": buchungen[l]["_datum"].isoformat(),
                "betrag": f"{abs(buchungen[l]['_betrag']):.2f}",
                "von": buchungen[l]["_konto"],
                "nach": buchungen[r]["_konto"],
                "verwendungszweck": buchungen[l].get("verwendungszweck", ""),
            }
            for l, r in ergebnis["paare"]
        ],
        SPALTEN_UMBUCHUNG,
    )

    z = ergebnis["zahlen"]
    print(
        f"Betrieb: {euro(z['einnahmen_betrieb'])} ein, {euro(z['ausgaben_betrieb'])} aus, "
        f"Ergebnis {euro(z['ergebnis'])} EUR"
    )
    print(f"Privat: {euro(z['ausgaben_privat'])} EUR Ausgaben")
    print(f"{z['umbuchungen']} Umbuchungen herausgerechnet ({euro(z['umbuchungssumme'])} EUR)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
