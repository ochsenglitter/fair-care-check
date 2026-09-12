"""Der Monatslauf. Ein Befehl, der alles andere aufruft.

    python3 run.py 2026-08          nur diesen Monat
    python3 run.py 2026             ganzes Jahr
    python3 run.py alles            ohne Einschraenkung

Erwartet wird in ../daten/eingang:
    geschaeftskonto*.csv   Export des Geschaeftskontos (Rohformat der Bank genuegt)
    privatkonto*.csv       Export des Privatkontos (optional)
und als Belegquelle entweder
    ../daten/belege/       ein Ordner mit den Belegdateien
oder ../daten/eingang/belege-liste.csv   eine Dateiliste mit Spalten titel und pfad

Die Ergebnisse landen in ../daten/export/<zeitraum>/.
"""

from __future__ import annotations

import calendar
import datetime as dt
import glob
import os
import sys

import abgleich
import belegindex
import kontoauszug
import privatcheck
import story
import uebersicht
from gemeinsam import tabelle_schreiben

HIER = os.path.dirname(os.path.abspath(__file__))
EINGANG = os.path.join(HIER, "..", "daten", "eingang")
BELEGORDNER = os.path.join(HIER, "..", "daten", "belege")
EXPORT = os.path.join(HIER, "..", "daten", "export")


def zeitraum_deuten(angabe: str) -> tuple[dt.date | None, dt.date | None, str]:
    angabe = (angabe or "alles").strip().lower()
    if angabe in {"alles", "all", "*"}:
        return None, None, "gesamt"
    if len(angabe) == 4 and angabe.isdigit():
        jahr = int(angabe)
        return dt.date(jahr, 1, 1), dt.date(jahr, 12, 31), angabe
    if len(angabe) == 7 and angabe[4] in "-/":
        jahr, monat = int(angabe[:4]), int(angabe[5:])
        letzter = calendar.monthrange(jahr, monat)[1]
        return dt.date(jahr, monat, 1), dt.date(jahr, monat, letzter), f"{jahr}-{monat:02d}"
    raise SystemExit(f"Zeitraum '{angabe}' nicht verstanden. Erwartet: 2026-08, 2026 oder alles.")


def dateien(muster: str) -> list[str]:
    return sorted(glob.glob(os.path.join(EINGANG, muster)))


def konto_einlesen(muster: str, konto: str) -> list[dict]:
    gesammelt: list[dict] = []
    for pfad in dateien(muster):
        gesammelt.extend(kontoauszug.einlesen(pfad, konto=konto))
        print(f"  gelesen: {os.path.basename(pfad)}")
    return gesammelt


def belege_indizieren(ziel: str) -> int:
    liste = os.path.join(EINGANG, "belege-liste.csv")
    if os.path.isdir(BELEGORDNER) and os.listdir(BELEGORDNER):
        eintraege = belegindex.aus_ordner(BELEGORDNER)
    elif os.path.exists(liste):
        eintraege = belegindex.aus_liste(liste)
    else:
        eintraege = []
    tabelle_schreiben(ziel, eintraege, belegindex.SPALTEN)
    return len(eintraege)


def main(argumente: list[str]) -> int:
    angabe = argumente[0] if argumente else "alles"
    if angabe in {"-h", "--hilfe", "--help"}:
        print(__doc__)
        return 0

    ab, bis, name = zeitraum_deuten(angabe)
    ausgabe = os.path.join(EXPORT, name)
    os.makedirs(ausgabe, exist_ok=True)

    print(f"Zeitraum: {name}")

    print("Kontoauszuege:")
    geschaeft = konto_einlesen("geschaeftskonto*.csv", "geschaeft")
    if not geschaeft:
        print(
            f"\nKeine Datei gefunden, die auf 'geschaeftskonto*.csv' passt.\n"
            f"Erwartet in: {os.path.normpath(EINGANG)}"
        )
        return 1
    buchungsdatei = os.path.join(ausgabe, "buchungen.csv")
    tabelle_schreiben(buchungsdatei, geschaeft, kontoauszug.SPALTEN)
    print(f"  {len(geschaeft)} Buchungen Geschaeftskonto")

    print("Belege:")
    belegdatei = os.path.join(ausgabe, "belege.csv")
    anzahl = belege_indizieren(belegdatei)
    print(f"  {anzahl} Belege indiziert")
    if anzahl == 0:
        print(
            "  Achtung: keine Belege gefunden. Ohne Belegquelle gilt jede Buchung\n"
            "  als offen. Belegordner oder belege-liste.csv hinterlegen."
        )

    print("Abgleich:")
    argumentliste = [buchungsdatei, belegdatei, "--ausgabe", ausgabe]
    if ab:
        argumentliste += ["--ab", ab.isoformat(), "--bis", bis.isoformat()]
    abgleich.main(argumentliste)

    privatdateien = dateien("privatkonto*.csv")
    if privatdateien:
        print("Privatkonto:")
        privat = konto_einlesen("privatkonto*.csv", "privat")
        privatdatei = os.path.join(ausgabe, "privatbuchungen.csv")
        tabelle_schreiben(privatdatei, privat, kontoauszug.SPALTEN)
        argumentliste = [privatdatei, "--ausgabe", ausgabe]
        if ab:
            argumentliste += ["--ab", ab.isoformat(), "--bis", bis.isoformat()]
        privatcheck.main(argumentliste)
    else:
        print("Privatkonto: keine Datei gefunden, Schritt uebersprungen.")

    # Gesamtuebersicht ueber alle Konten, Umbuchungen herausgerechnet.
    print("Uebersicht:")
    quellen = [buchungsdatei]
    if privatdateien:
        quellen.append(os.path.join(ausgabe, "privatbuchungen.csv"))
    argumentliste = quellen + ["--ausgabe", ausgabe]
    if ab:
        argumentliste += ["--ab", ab.isoformat(), "--bis", bis.isoformat()]
    uebersicht.main(argumentliste)

    if privatdateien:
        print("Zeigen lohnt sich:")
        story.main([
            os.path.join(ausgabe, "privatbuchungen.csv"), "--ausgabe", ausgabe
        ])

    print(f"\nFertig. Ergebnisse in {os.path.normpath(ausgabe)}")
    print("  bericht.md            welche Buchungen noch einen Beleg brauchen")
    print("  uebersicht.md         Einnahmen, Ausgaben, Ruecklagen ohne Umbuchungen")
    if privatdateien:
        print("  privat-bericht.md     welche privaten Ausgaben betrieblich sein koennten")
        print("  story-kandidaten.md   was sich zu zeigen lohnt, solange die Frist laeuft")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
