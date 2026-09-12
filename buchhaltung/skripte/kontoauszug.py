"""Macht aus einem beliebigen Bank-CSV-Export eine einheitliche Buchungsliste.

Die Spalten werden am Namen erkannt, daher braucht es kein Profil je Bank.
Getestet gegen die Exportformate von Sparkasse, DKB, Commerzbank, ING, N26,
Holvi, Qonto und PayPal.

Aufruf:  python3 kontoauszug.py <export.csv> <ausgabe.csv> [--konto geschaeft|privat]
"""

from __future__ import annotations

import sys

from gemeinsam import (
    betrag_lesen, datum_lesen, tabelle_lesen, tabelle_schreiben,
)

SPALTEN = [
    "datum", "betrag", "richtung", "empfaenger", "verwendungszweck", "konto", "herkunft",
]

# Je Feld: Spaltennamen-Bruchstuecke, das erste passende gewinnt.
ERKENNUNG = {
    "datum": [
        "buchungstag", "buchungsdatum", "wertstellung", "valuta", "booking date",
        "value date", "datum", "date",
    ],
    "betrag": [
        "betrag", "umsatz", "amount (eur)", "amount", "soll/haben", "wert",
    ],
    # Bei Ausgaben ist der Geschaeftspartner der Empfaenger, bei Einnahmen der
    # Zahlungspflichtige. Exporte wie der von DKB fuehren beide in eigenen Spalten.
    "empfaenger_ausgabe": [
        "beguenstigter", "zahlungsempf", "empfaenger", "payee", "beneficiary",
    ],
    "empfaenger_einnahme": [
        "zahlungspflichtige", "auftraggeber", "zahler", "payer", "absender",
    ],
    "empfaenger": [
        "beguenstigter", "zahlungsempf", "zahlungspflichtige", "auftraggeber",
        "empfaenger", "payee", "beneficiary", "partner name", "counterparty",
        "transaktionsbeteiligter", "name",
    ],
    "verwendungszweck": [
        "verwendungszweck", "buchungstext", "vorgang", "beschreibung", "referenz",
        "reference", "description", "payment reference", "subject", "hinweis",
    ],
}


def spalte_finden(kopf: list[str], schluessel: str) -> str | None:
    vereinfacht = {
        spalte: spalte.lower().replace("ä", "a").replace("ö", "o").replace("ü", "u")
        for spalte in kopf
    }
    for bruchstueck in ERKENNUNG[schluessel]:
        for spalte, klein in vereinfacht.items():
            if bruchstueck in klein:
                return spalte
    return None


def betrag_aus_zeile(zeile: dict, betragsspalte: str | None, kopf: list[str]) -> float | None:
    """Beruecksichtigt Exporte, die Soll und Haben in getrennten Spalten fuehren."""
    soll = next((s for s in kopf if s.lower().startswith(("soll", "belastung", "debit"))), None)
    haben = next((s for s in kopf if s.lower().startswith(("haben", "gutschrift", "credit"))), None)
    if soll and haben and soll != betragsspalte:
        aus = betrag_lesen(zeile.get(soll, ""))
        ein = betrag_lesen(zeile.get(haben, ""))
        if aus:
            return -abs(aus)
        if ein:
            return abs(ein)

    if not betragsspalte:
        return None
    betrag = betrag_lesen(zeile.get(betragsspalte, ""))
    if betrag is None:
        return None

    # Manche Exporte halten das Vorzeichen in einer eigenen Spalte.
    vorzeichen = next((s for s in kopf if s.lower().replace(" ", "") in {"soll/haben", "s/h", "debitcredit"}), None)
    if vorzeichen:
        kennung = (zeile.get(vorzeichen) or "").strip().upper()
        if kennung in {"S", "D", "SOLL", "DEBIT"}:
            return -abs(betrag)
        if kennung in {"H", "C", "HABEN", "CREDIT"}:
            return abs(betrag)
    return betrag


def partner_waehlen(
    zeile: dict,
    betrag: float,
    spalte_ausgabe: str | None,
    spalte_einnahme: str | None,
    ersatzspalte: str | None,
) -> str:
    """Waehlt je nach Richtung die Spalte, in der der Geschaeftspartner steht."""
    if betrag < 0:
        reihenfolge = (spalte_ausgabe, ersatzspalte, spalte_einnahme)
    else:
        reihenfolge = (spalte_einnahme, ersatzspalte, spalte_ausgabe)
    for spalte in reihenfolge:
        if spalte:
            wert = (zeile.get(spalte) or "").strip()
            if wert:
                return wert
    return ""


def einlesen(pfad: str, konto: str = "geschaeft") -> list[dict]:
    rohzeilen = tabelle_lesen(pfad)
    if not rohzeilen:
        return []

    kopf = list(rohzeilen[0].keys())
    datumsspalte = spalte_finden(kopf, "datum")
    betragsspalte = spalte_finden(kopf, "betrag")
    empfaengerspalte = spalte_finden(kopf, "empfaenger")
    spalte_ausgabe = spalte_finden(kopf, "empfaenger_ausgabe")
    spalte_einnahme = spalte_finden(kopf, "empfaenger_einnahme")
    zweckspalte = spalte_finden(kopf, "verwendungszweck")

    if not datumsspalte or not (betragsspalte or len(kopf) > 2):
        raise SystemExit(
            f"In {pfad} wurden keine Datums- und Betragsspalte erkannt.\n"
            f"Gefundene Spalten: {', '.join(kopf)}"
        )

    buchungen = []
    for nummer, zeile in enumerate(rohzeilen, start=2):
        datum = datum_lesen(zeile.get(datumsspalte, ""))
        betrag = betrag_aus_zeile(zeile, betragsspalte, kopf)
        if datum is None or betrag is None:
            continue  # Summen- und Leerzeilen der Bank

        buchungen.append({
            "datum": datum.isoformat(),
            "betrag": f"{betrag:.2f}",
            "richtung": "ausgabe" if betrag < 0 else "einnahme",
            "empfaenger": partner_waehlen(
                zeile, betrag, spalte_ausgabe, spalte_einnahme, empfaengerspalte
            ),
            "verwendungszweck": (zeile.get(zweckspalte) or "").strip() if zweckspalte else "",
            "konto": konto,
            "herkunft": f"{pfad.split('/')[-1]}:{nummer}",
        })

    buchungen.sort(key=lambda b: (b["datum"], b["betrag"]))
    return buchungen


def main(argumente: list[str]) -> int:
    if len(argumente) < 2:
        print(__doc__)
        return 1
    konto = "geschaeft"
    if "--konto" in argumente:
        konto = argumente[argumente.index("--konto") + 1]
    quelle, ziel = argumente[0], argumente[1]

    buchungen = einlesen(quelle, konto)
    tabelle_schreiben(ziel, buchungen, SPALTEN)

    ausgaben = sum(1 for b in buchungen if b["richtung"] == "ausgabe")
    print(f"{len(buchungen)} Buchungen gelesen ({ausgaben} Ausgaben) -> {ziel}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
