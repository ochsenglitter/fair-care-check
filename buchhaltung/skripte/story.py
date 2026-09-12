"""Findet private Ausgaben, die sich zu zeigen lohnen.

Grundlage ist die Feststellung aus der Betriebspruefung, dass von privaten
Kosten, die im eigenen Content gezeigt werden, ein fester Anteil betrieblich
abziehbar ist. Der Anteil und die Schwelle stehen in
regeln/story-regeln.csv und sind dort aenderbar.

Die Liste ist nach Wirkung sortiert: oben steht, was am meisten bringt.
Entscheidend ist die Frist - ein Produkt, das vor drei Monaten gekauft wurde,
laesst sich schlecht noch als aktueller Kauf zeigen.

Aufruf:
  python3 story.py privatbuchungen.csv --ausgabe ORDNER [--stichtag 2026-09-12]
"""

from __future__ import annotations

import datetime as dt
import os
import sys

from gemeinsam import betrag_lesen, datum_lesen, euro, tabelle_lesen, tabelle_schreiben
from privatcheck import regel_finden, regeln_laden

REGELDATEI = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "regeln", "story-regeln.csv"
)

SPALTEN = [
    "datum", "betrag", "empfaenger", "verwendungszweck",
    "moegliche_wirkung", "tage_seit_kauf", "status", "hinweis",
]


def einstellungen(pfad: str = REGELDATEI) -> dict[str, float]:
    werte = {"mindestbetrag": 50.0, "anteil_prozent": 20.0, "frist_tage": 45.0}
    if not os.path.exists(pfad):
        return werte
    for zeile in tabelle_lesen(pfad):
        name = (zeile.get("einstellung") or "").strip()
        zahl = betrag_lesen(zeile.get("wert", ""))
        if name in werte and zahl is not None:
            werte[name] = zahl
    return werte


def main(argumente: list[str]) -> int:
    if not argumente:
        print(__doc__)
        return 1

    quelle = argumente[0]
    ausgabeordner = "."
    if "--ausgabe" in argumente:
        ausgabeordner = argumente[argumente.index("--ausgabe") + 1]
    os.makedirs(ausgabeordner, exist_ok=True)

    stichtag = dt.date.today()
    if "--stichtag" in argumente:
        stichtag = datum_lesen(argumente[argumente.index("--stichtag") + 1]) or stichtag

    werte = einstellungen()
    mindestbetrag = werte["mindestbetrag"]
    anteil = werte["anteil_prozent"] / 100.0
    frist = int(werte["frist_tage"])

    ausschlussregeln = regeln_laden()
    kandidaten = []

    for zeile in tabelle_lesen(quelle):
        datum = datum_lesen(zeile.get("datum", ""))
        betrag = betrag_lesen(zeile.get("betrag", ""))
        if datum is None or betrag is None or betrag >= 0:
            continue
        if abs(betrag) < mindestbetrag:
            continue

        text = f"{zeile.get('empfaenger', '')} {zeile.get('verwendungszweck', '')}"
        regel, _ = regel_finden(text, ausschlussregeln)

        # Was ohnehin schon voll betrieblich ist, braucht die 20-Prozent-Regel nicht.
        if regel is not None and regel.get("art") == "kandidat":
            hinweis = (
                f"Laeuft schon als {regel['kategorie']} - dort meist mehr als "
                f"{werte['anteil_prozent']:.0f} Prozent absetzbar. Zuerst dort pruefen."
            )
            status = "bereits betrieblich pruefen"
        else:
            tage = (stichtag - datum).days
            if tage <= frist:
                status = "zeigen lohnt sich"
                verbleibend = frist - tage
                hinweis = (
                    f"Noch {verbleibend} Tage im Zeitfenster. Produkt in einer Story "
                    f"zeigen, Screenshot zum Beleg legen."
                )
            else:
                status = "Frist ueberschritten"
                hinweis = (
                    f"Kauf liegt {tage} Tage zurueck. Nur zeigen, wenn das Produkt "
                    f"noch im Gebrauch ist und das glaubhaft bleibt."
                )

        kandidaten.append({
            "datum": datum.isoformat(),
            "betrag": f"{abs(betrag):.2f}",
            "empfaenger": zeile.get("empfaenger", ""),
            "verwendungszweck": zeile.get("verwendungszweck", ""),
            "moegliche_wirkung": f"{abs(betrag) * anteil:.2f}",
            "tage_seit_kauf": str((stichtag - datum).days),
            "status": status,
            "hinweis": hinweis,
            "_betrag": abs(betrag),
            "_offen": status == "zeigen lohnt sich",
        })

    # Offene Chancen zuerst, darin die groessten Betraege.
    kandidaten.sort(key=lambda k: (not k["_offen"], -k["_betrag"]))
    tabelle_schreiben(os.path.join(ausgabeordner, "story-kandidaten.csv"), kandidaten, SPALTEN)

    offen = [k for k in kandidaten if k["_offen"]]
    wirkung = sum(k["_betrag"] * anteil for k in offen)

    text = [
        f"# Zeigen lohnt sich - Stand {stichtag.isoformat()}",
        "",
        f"Private Ausgaben ab {euro(mindestbetrag)} EUR. Wird das Produkt im eigenen",
        f"Content gezeigt, sind laut Feststellung aus der Betriebspruefung",
        f"{werte['anteil_prozent']:.0f} Prozent der Kosten betrieblich abziehbar.",
        "",
        f"- Offen im Zeitfenster von {frist} Tagen: **{len(offen)}** Posten",
        f"- Moegliche Wirkung daraus: **{euro(wirkung)} EUR** abziehbare Kosten",
        "",
    ]

    if offen:
        text += [
            "## Jetzt zeigen",
            "",
            "| Datum | Betrag EUR | Wirkung EUR | Was | Noch |",
            "| --- | ---: | ---: | --- | ---: |",
        ]
        for k in offen[:25]:
            verbleibend = frist - int(k["tage_seit_kauf"])
            was = (k["empfaenger"] or k["verwendungszweck"])[:38]
            text.append(
                f"| {k['datum']} | {euro(k['_betrag'])} | {euro(k['_betrag'] * anteil)} "
                f"| {was} | {verbleibend} Tage |"
            )
        text.append("")

    abgelaufen = [k for k in kandidaten if k["status"] == "Frist ueberschritten"]
    if abgelaufen:
        text += [
            "## Frist ueberschritten",
            "",
            "Nur noch zeigen, wenn das Produkt tatsaechlich weiter im Gebrauch ist.",
            "",
            "| Datum | Betrag EUR | Was |",
            "| --- | ---: | --- |",
        ]
        for k in abgelaufen[:15]:
            text.append(
                f"| {k['datum']} | {euro(k['_betrag'])} "
                f"| {(k['empfaenger'] or k['verwendungszweck'])[:42]} |"
            )
        text.append("")

    text += [
        "## Wichtig",
        "",
        "Der Abzug haengt daran, dass das Zeigen nachweisbar ist. Zu jedem Posten,",
        "den du zeigst, gehoeren zwei Dinge in den Belegordner:",
        "",
        "1. der Kaufbeleg",
        "2. ein Screenshot der Story mit sichtbarem Datum, benannt wie der Beleg",
        "   mit dem Zusatz `_nachweis`",
        "",
        "Ohne den zweiten Teil traegt der Abzug in einer Pruefung nicht. Der Anteil",
        "von 20 Prozent stammt aus deiner Betriebspruefung und ist hier als feste",
        "Groesse hinterlegt - aendert sich das, gehoert es in",
        "`regeln/story-regeln.csv`.",
        "",
    ]

    with open(os.path.join(ausgabeordner, "story-kandidaten.md"), "w", encoding="utf-8") as datei:
        datei.write("\n".join(text))

    print(
        f"{len(offen)} Posten im Zeitfenster, moegliche Wirkung {euro(wirkung)} EUR "
        f"({len(kandidaten)} Kandidaten insgesamt)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
