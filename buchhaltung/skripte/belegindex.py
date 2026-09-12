"""Baut aus vorhandenen Belegdateien einen durchsuchbaren Index.

Zwei Quellen sind moeglich:
  --ordner PFAD   einen lokalen Ordner rekursiv einlesen (z.B. Google Drive
                  for Desktop oder ein heruntergeladener Belegordner)
  --liste DATEI   eine Dateiliste als CSV mit den Spalten 'titel' und 'pfad'
                  (so laesst sich der Index auch direkt aus Google Drive ziehen,
                  ohne etwas herunterzuladen)

Aus dem Dateinamen werden Datum, Anbieter und - falls vorhanden - Betrag gelesen.
Die Zielkonvention lautet:  JJJJ-MM-TT_Anbieter_Kurzbeschreibung.pdf

Aufruf:  python3 belegindex.py --ordner ../daten/belege --ausgabe ../daten/export/belege.csv
"""

from __future__ import annotations

import datetime as dt
import os
import re
import sys

from gemeinsam import betrag_lesen, datum_lesen, tabelle_lesen, tabelle_schreiben

SPALTEN = ["datum", "betrag", "anbieter", "titel", "pfad", "ordner", "namensschema"]

BELEGENDUNGEN = {
    ".pdf", ".jpg", ".jpeg", ".png", ".heic", ".webp", ".tif", ".tiff",
    ".xml", ".zip", ".eml", ".msg",
}

# JJJJ-MM-TT am Namensanfang ist das Zielschema, der Rest wird geduldet.
SCHEMA_TREFFER = re.compile(r"^(\d{4})[-_.](\d{2})[-_.](\d{2})[_ -]+(.*)$")
DATUM_IRGENDWO = [
    re.compile(r"(\d{4})[-_.](\d{2})[-_.](\d{2})"),
    re.compile(r"(\d{2})[-_.](\d{2})[-_.](\d{4})"),
]
BETRAG_IM_NAMEN = re.compile(r"(\d+[.,]\d{2})\s*(?:eur|euro|€)", re.IGNORECASE)


def datum_aus_name(name: str) -> tuple[dt.date | None, str, bool]:
    """Gibt Datum, Restname und zurueck, ob der Name dem Zielschema folgt."""
    treffer = SCHEMA_TREFFER.match(name)
    if treffer:
        jahr, monat, tag, rest = treffer.groups()
        datum = datum_lesen(f"{jahr}-{monat}-{tag}")
        if datum:
            return datum, rest, True

    for muster in DATUM_IRGENDWO:
        treffer = muster.search(name)
        if not treffer:
            continue
        gruppen = treffer.groups()
        roh = f"{gruppen[0]}-{gruppen[1]}-{gruppen[2]}"
        if len(gruppen[0]) == 2:
            roh = f"{gruppen[2]}-{gruppen[1]}-{gruppen[0]}"
        datum = datum_lesen(roh)
        if datum:
            rest = (name[:treffer.start()] + " " + name[treffer.end():]).strip(" _-")
            return datum, rest, False

    return None, name, False


# Abschnitte, die keinen Anbieter benennen, sondern nur die Belegart.
GENERISCH = {
    "rechnung", "rechnungen", "invoice", "beleg", "quittung", "kassenbon", "bon",
    "gutschrift", "re", "rg", "eingangsrechnung", "ausgangsrechnung", "zahlung",
    "payment", "receipt", "img", "scan", "dokument", "pdf",
}

# Rechnungsnummern und Zeitstempel: viele Ziffern, kaum Bedeutung.
NUMMERNARTIG = re.compile(r"^[a-z]{0,4}[-_]?[\d][\d\-_.\/]*\d$", re.IGNORECASE)


def ist_aussagelos(abschnitt: str) -> bool:
    sauber = abschnitt.strip().lower()
    if not sauber:
        return True
    if sauber in GENERISCH:
        return True
    if NUMMERNARTIG.match(sauber):
        return True
    # Ueberwiegend Ziffern, etwa '20260909121632060' oder 'DRP158401129'.
    ziffern = sum(zeichen.isdigit() for zeichen in sauber)
    return ziffern >= 4 and ziffern / len(sauber) > 0.5


def anbieter_aus_rest(rest: str) -> str:
    """Sucht den Abschnitt, der tatsaechlich den Anbieter benennt.

    Per Konvention steht er vorn. Beginnt der Name aber mit der Belegart oder
    einer Rechnungsnummer - wie bei 'Rechnung_RE2026-326_31.08.2026_Kunde' -,
    wird weitergesucht, sonst hiesse jeder zweite Beleg 'Rechnung'.
    """
    rest = re.sub(r"\.[a-z0-9]{2,5}$", "", rest, flags=re.IGNORECASE).strip(" _-")
    teile = [t.strip() for t in re.split(r"[_]+", rest) if t.strip()]
    if not teile:
        return rest.strip()

    for abschnitt in teile:
        if not ist_aussagelos(abschnitt):
            return abschnitt
    return teile[0]


def eintrag_bauen(titel: str, pfad: str, ordner: str) -> dict | None:
    endung = os.path.splitext(titel)[1].lower()
    if endung and endung not in BELEGENDUNGEN:
        return None

    datum, rest, nach_schema = datum_aus_name(titel)
    betrag_treffer = BETRAG_IM_NAMEN.search(titel)
    betrag = betrag_lesen(betrag_treffer.group(1)) if betrag_treffer else None

    return {
        "datum": datum.isoformat() if datum else "",
        "betrag": f"{abs(betrag):.2f}" if betrag is not None else "",
        "anbieter": anbieter_aus_rest(rest),
        "titel": titel,
        "pfad": pfad,
        "ordner": ordner,
        "namensschema": "ok" if nach_schema else "abweichend",
    }


def aus_ordner(wurzel: str) -> list[dict]:
    eintraege = []
    for verzeichnis, _unterordner, dateien in os.walk(wurzel):
        for name in dateien:
            if name.startswith("."):
                continue
            vollpfad = os.path.join(verzeichnis, name)
            eintrag = eintrag_bauen(name, vollpfad, os.path.relpath(verzeichnis, wurzel))
            if eintrag:
                eintraege.append(eintrag)
    return eintraege


def aus_liste(pfad: str) -> list[dict]:
    eintraege = []
    for zeile in tabelle_lesen(pfad):
        gefunden = {schluessel.lower().strip(): wert for schluessel, wert in zeile.items()}
        titel = gefunden.get("titel") or gefunden.get("title") or gefunden.get("name") or ""
        if not titel:
            continue
        eintrag = eintrag_bauen(
            titel,
            gefunden.get("pfad") or gefunden.get("viewurl") or gefunden.get("url") or "",
            gefunden.get("ordner") or gefunden.get("folder") or "",
        )
        if eintrag:
            eintraege.append(eintrag)
    return eintraege


def main(argumente: list[str]) -> int:
    if not argumente:
        print(__doc__)
        return 1

    ausgabe = "belege.csv"
    if "--ausgabe" in argumente:
        ausgabe = argumente[argumente.index("--ausgabe") + 1]

    if "--ordner" in argumente:
        eintraege = aus_ordner(argumente[argumente.index("--ordner") + 1])
    elif "--liste" in argumente:
        eintraege = aus_liste(argumente[argumente.index("--liste") + 1])
    else:
        print(__doc__)
        return 1

    eintraege.sort(key=lambda e: (e["datum"] or "0000", e["titel"]))
    tabelle_schreiben(ausgabe, eintraege, SPALTEN)

    ohne_datum = sum(1 for e in eintraege if not e["datum"])
    abweichend = sum(1 for e in eintraege if e["namensschema"] == "abweichend")
    print(f"{len(eintraege)} Belege indiziert -> {ausgabe}")
    if ohne_datum:
        print(f"  davon {ohne_datum} ohne erkennbares Datum im Dateinamen")
    if abweichend:
        print(f"  davon {abweichend} nicht im Schema JJJJ-MM-TT_Anbieter_Beschreibung")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
