"""Durchsucht Buchungen eines Privatkontos nach moeglichen Betriebsausgaben.

Das Ergebnis ist eine Vorschlagsliste, keine Entscheidung. Ob ein Posten
tatsaechlich abziehbar ist und in welcher Hoehe, entscheidet die Steuerkanzlei.

Aufruf:
  python3 privatcheck.py privat.csv --ausgabe ../daten/export [--ab 2026-01-01]
"""

from __future__ import annotations

import os
import sys
from collections import defaultdict

from gemeinsam import (
    betrag_lesen, datum_lesen, entschaerfen, euro, tabelle_lesen, tabelle_schreiben,
)

REGELDATEI = os.path.join(os.path.dirname(__file__), "..", "regeln", "betriebsausgaben-regeln.csv")

SPALTEN = [
    "datum", "betrag", "empfaenger", "verwendungszweck", "kategorie",
    "anteil_vorschlag", "geschaetzt_abziehbar", "nachweis", "hinweis",
]


def regeln_laden(pfad: str = REGELDATEI) -> list[dict]:
    regeln = []
    for zeile in tabelle_lesen(pfad):
        stichwoerter = [
            entschaerfen(wort) for wort in (zeile.get("stichwoerter") or "").split("|")
        ]
        zeile["_stichwoerter"] = [wort for wort in stichwoerter if wort]
        regeln.append(zeile)
    return regeln


# Kurze Stichwoerter muessen als ganzes Wort vorkommen, sonst findet "kurs"
# auch "diskurs" und "jet" auch "jetzt".
WORTGRENZE_BIS = 6


def stichwort_trifft(stichwort: str, sauber: str) -> bool:
    if len(stichwort) >= WORTGRENZE_BIS or " " in stichwort:
        return stichwort in sauber
    return f" {stichwort} " in sauber


def regel_finden(text: str, regeln: list[dict]) -> tuple[dict | None, str]:
    """Gibt die passende Regel und das ausloesende Stichwort zurueck."""
    sauber = f" {entschaerfen(text)} "
    bester_treffer, bestes_wort = None, ""
    for regel in regeln:
        for wort in regel["_stichwoerter"]:
            if wort and stichwort_trifft(wort, sauber):
                # Das laengste Stichwort gewinnt, es ist das genauere.
                if len(wort) > len(bestes_wort):
                    bester_treffer, bestes_wort = regel, wort
    return bester_treffer, bestes_wort


def abziehbar_schaetzen(betrag: float, anteil: str) -> str:
    try:
        prozent = float(str(anteil).strip().replace("%", ""))
    except ValueError:
        return ""  # 'anteilig' laesst sich nicht pauschal rechnen
    return f"{abs(betrag) * prozent / 100:.2f}"


def buchungen_laden(pfad: str) -> list[dict]:
    """Nimmt sowohl eine bereits normalisierte Liste als auch einen rohen Bankexport.

    So muss beim Monatslauf nicht daran gedacht werden, welches der beiden
    Formate gerade vorliegt.
    """
    zeilen = tabelle_lesen(pfad)
    if not zeilen:
        return []

    spalten = {name.lower() for name in zeilen[0]}
    if {"datum", "betrag"} <= spalten:
        return zeilen

    import kontoauszug
    return kontoauszug.einlesen(pfad, konto="privat")


def main(argumente: list[str]) -> int:
    if not argumente:
        print(__doc__)
        return 1

    quelle = argumente[0]
    ausgabeordner = "."
    if "--ausgabe" in argumente:
        ausgabeordner = argumente[argumente.index("--ausgabe") + 1]
    os.makedirs(ausgabeordner, exist_ok=True)

    ab = datum_lesen(argumente[argumente.index("--ab") + 1]) if "--ab" in argumente else None
    bis = datum_lesen(argumente[argumente.index("--bis") + 1]) if "--bis" in argumente else None

    regeln = regeln_laden()
    kandidaten, ausgeschlossen, ungeklaert = [], [], []

    for zeile in buchungen_laden(quelle):
        datum = datum_lesen(zeile.get("datum", ""))
        betrag = betrag_lesen(zeile.get("betrag", ""))
        if datum is None or betrag is None or betrag >= 0:
            continue  # nur Ausgaben interessieren hier
        if (ab and datum < ab) or (bis and datum > bis):
            continue

        text = f"{zeile.get('empfaenger', '')} {zeile.get('verwendungszweck', '')}"
        regel, _wort = regel_finden(text, regeln)

        eintrag = {
            "datum": datum.isoformat(),
            "betrag": f"{betrag:.2f}",
            "empfaenger": zeile.get("empfaenger", ""),
            "verwendungszweck": zeile.get("verwendungszweck", ""),
            "kategorie": regel["kategorie"] if regel else "",
            "anteil_vorschlag": regel["anteil_vorschlag"] if regel else "",
            "geschaetzt_abziehbar": (
                abziehbar_schaetzen(betrag, regel["anteil_vorschlag"]) if regel else ""
            ),
            "nachweis": regel["nachweis"] if regel else "",
            "hinweis": regel["hinweis"] if regel else "",
        }
        eintrag["_betrag"] = betrag

        if regel is None:
            eintrag["kategorie"] = "nicht eingeordnet"
            eintrag["hinweis"] = "Kein Stichwort getroffen. Selbst entscheiden oder Regel ergaenzen."
            ungeklaert.append(eintrag)
        elif regel["art"] == "ausschluss":
            ausgeschlossen.append(eintrag)
        else:
            kandidaten.append(eintrag)

    kandidaten.sort(key=lambda e: abs(e["_betrag"]), reverse=True)
    ungeklaert.sort(key=lambda e: abs(e["_betrag"]), reverse=True)

    tabelle_schreiben(os.path.join(ausgabeordner, "privat-kandidaten.csv"), kandidaten, SPALTEN)
    tabelle_schreiben(os.path.join(ausgabeordner, "privat-ungeklaert.csv"), ungeklaert, SPALTEN)

    bericht_schreiben(
        os.path.join(ausgabeordner, "privat-bericht.md"),
        kandidaten, ausgeschlossen, ungeklaert,
    )

    summe = sum(
        float(e["geschaetzt_abziehbar"]) for e in kandidaten if e["geschaetzt_abziehbar"]
    )
    print(
        f"{len(kandidaten)} moegliche Betriebsausgaben "
        f"(geschaetzt {euro(summe)} EUR abziehbar), "
        f"{len(ungeklaert)} nicht eingeordnet, {len(ausgeschlossen)} eindeutig privat"
    )
    print(f"-> {os.path.join(ausgabeordner, 'privat-bericht.md')}")
    return 0


def bericht_schreiben(pfad, kandidaten, ausgeschlossen, ungeklaert) -> None:
    nach_kategorie: dict[str, list[dict]] = defaultdict(list)
    for eintrag in kandidaten:
        nach_kategorie[eintrag["kategorie"]].append(eintrag)

    summe = sum(
        float(e["geschaetzt_abziehbar"]) for e in kandidaten if e["geschaetzt_abziehbar"]
    )

    text = [
        "# Private Ausgaben mit moeglichem betrieblichen Anteil",
        "",
        "Diese Liste ist ein **Vorschlag zur Pruefung**, keine steuerliche Beurteilung.",
        "Ob ein Posten abziehbar ist und in welcher Hoehe, entscheidet die Steuerkanzlei.",
        "",
        f"- Kandidaten gefunden: **{len(kandidaten)}**",
        f"- Geschaetzt abziehbar: **{euro(summe)} EUR** (ohne die anteiligen Posten)",
        f"- Nicht eingeordnet, bitte selbst ansehen: **{len(ungeklaert)}**",
        f"- Eindeutig privat, aussortiert: **{len(ausgeschlossen)}**",
        "",
    ]

    if nach_kategorie:
        text += ["## Kandidaten nach Kategorie", ""]
        geordnet = sorted(
            nach_kategorie.items(),
            key=lambda paar: sum(abs(e["_betrag"]) for e in paar[1]),
            reverse=True,
        )
        for kategorie, eintraege in geordnet:
            gesamt = sum(abs(e["_betrag"]) for e in eintraege)
            text += [
                f"### {kategorie} - {len(eintraege)} Posten, {euro(gesamt)} EUR",
                "",
                f"Anteil laut Regel: {eintraege[0]['anteil_vorschlag']} | "
                f"Nachweis: {eintraege[0]['nachweis']}",
                "",
                f"> {eintraege[0]['hinweis']}",
                "",
                "| Datum | Betrag EUR | Empfaenger |",
                "| --- | ---: | --- |",
            ]
            for eintrag in eintraege[:15]:
                text.append(
                    f"| {eintrag['datum']} | {euro(abs(eintrag['_betrag']))} "
                    f"| {(eintrag['empfaenger'] or eintrag['verwendungszweck'])[:50]} |"
                )
            if len(eintraege) > 15:
                text.append(f"| ... | | und {len(eintraege) - 15} weitere in der CSV |")
            text.append("")

    if ungeklaert:
        text += [
            "## Nicht eingeordnet",
            "",
            "Hier hat keine Regel gegriffen. Was davon betrieblich ist, gehoert als",
            "neues Stichwort in `regeln/betriebsausgaben-regeln.csv` - dann findet der",
            "naechste Lauf es von allein.",
            "",
            "| Datum | Betrag EUR | Empfaenger |",
            "| --- | ---: | --- |",
        ]
        for eintrag in ungeklaert[:25]:
            text.append(
                f"| {eintrag['datum']} | {euro(abs(eintrag['_betrag']))} "
                f"| {(eintrag['empfaenger'] or eintrag['verwendungszweck'])[:50]} |"
            )
        if len(ungeklaert) > 25:
            text.append(f"| ... | | und {len(ungeklaert) - 25} weitere in der CSV |")
        text.append("")

    text += [
        "## So geht es weiter",
        "",
        "1. `privat-kandidaten.csv` durchgehen und die Zeilen loeschen, die doch privat waren.",
        "2. Zu jedem verbleibenden Posten den in der Spalte `nachweis` genannten Nachweis",
        "   beilegen. Ohne Nachweis kein Abzug - das ist bei gemischten Ausgaben der",
        "   Punkt, an dem eine Pruefung ansetzt.",
        "3. Die bereinigte Liste an die Steuerkanzlei geben und dort freigeben lassen.",
        "4. Freigegebene Posten kuenftig direkt ueber das Geschaeftskonto bezahlen.",
        "   Das erspart diesen Schritt beim naechsten Mal.",
        "",
    ]

    with open(pfad, "w", encoding="utf-8") as datei:
        datei.write("\n".join(text))


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
