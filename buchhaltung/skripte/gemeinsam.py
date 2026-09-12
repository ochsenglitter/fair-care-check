"""Gemeinsame Bausteine: CSV robust lesen und schreiben, Namen und Betraege normalisieren.

Bewusst ohne externe Bibliotheken, damit die Skripte ueberall sofort laufen.
"""

from __future__ import annotations

import csv
import datetime as dt
import io
import re
import unicodedata

# Excel und Numbers oeffnen Semikolon-CSV mit BOM ohne Rueckfrage.
TRENNER = ";"
KODIERUNG = "utf-8-sig"


# --------------------------------------------------------------------------
# Dateien lesen
# --------------------------------------------------------------------------

def text_lesen(pfad: str) -> str:
    """Liest eine Datei und faengt die ueblichen Bank-Export-Kodierungen ab."""
    rohdaten = open(pfad, "rb").read()
    for kodierung in ("utf-8-sig", "utf-8", "cp1252", "latin-1"):
        try:
            return rohdaten.decode(kodierung)
        except UnicodeDecodeError:
            continue
    return rohdaten.decode("latin-1", errors="replace")


def trenner_raten(text: str) -> str:
    """Bestimmt das Trennzeichen anhand der Zeile, die am gleichmaessigsten aufgeteilt ist."""
    zeilen = [z for z in text.splitlines() if z.strip()][:40]
    bester, beste_punktzahl = ";", -1.0
    for kandidat in (";", ",", "\t", "|"):
        anzahlen = [z.count(kandidat) for z in zeilen]
        if not anzahlen or max(anzahlen) == 0:
            continue
        haeufigste = max(set(anzahlen), key=anzahlen.count)
        if haeufigste == 0:
            continue
        # Viele Zeilen mit derselben Spaltenzahl sprechen fuer dieses Trennzeichen.
        punktzahl = anzahlen.count(haeufigste) * haeufigste
        if punktzahl > beste_punktzahl:
            bester, beste_punktzahl = kandidat, punktzahl
    return bester


def tabelle_lesen(pfad: str) -> list[dict[str, str]]:
    """Liest eine CSV auch dann, wenn ihr Vorspannzeilen der Bank vorangestellt sind."""
    text = text_lesen(pfad)
    trenner = trenner_raten(text)
    zeilen = list(csv.reader(io.StringIO(text), delimiter=trenner))
    zeilen = [z for z in zeilen if any(feld.strip() for feld in z)]
    if not zeilen:
        return []

    # Die Kopfzeile ist die erste Zeile, die so viele Spalten hat wie der Hauptteil.
    spaltenzahlen = [len(z) for z in zeilen]
    breite = max(set(spaltenzahlen), key=spaltenzahlen.count)
    kopf_index = next((i for i, z in enumerate(zeilen) if len(z) == breite), 0)

    kopf = [feld.strip().strip('"') for feld in zeilen[kopf_index]]
    kopf = [feld or f"spalte_{i}" for i, feld in enumerate(kopf)]

    ergebnis = []
    for zeile in zeilen[kopf_index + 1:]:
        if len(zeile) < breite:
            zeile = zeile + [""] * (breite - len(zeile))
        ergebnis.append({kopf[i]: zeile[i].strip() for i in range(breite)})
    return ergebnis


def tabelle_schreiben(pfad: str, zeilen: list[dict], spalten: list[str]) -> None:
    with open(pfad, "w", encoding=KODIERUNG, newline="") as datei:
        schreiber = csv.DictWriter(
            datei, fieldnames=spalten, delimiter=TRENNER, extrasaction="ignore"
        )
        schreiber.writeheader()
        for zeile in zeilen:
            schreiber.writerow(zeile)


# --------------------------------------------------------------------------
# Werte normalisieren
# --------------------------------------------------------------------------

DATUMSMUSTER = (
    "%d.%m.%Y", "%d.%m.%y", "%Y-%m-%d", "%d/%m/%Y", "%m/%d/%Y",
    "%Y/%m/%d", "%d-%m-%Y", "%Y%m%d",
)


def datum_lesen(wert: str) -> dt.date | None:
    wert = (wert or "").strip()
    if not wert:
        return None
    # Zeitanteil abschneiden, den manche Exporte anhaengen.
    wert = re.split(r"[ T]", wert)[0]
    for muster in DATUMSMUSTER:
        try:
            return dt.datetime.strptime(wert, muster).date()
        except ValueError:
            continue
    treffer = re.search(r"(\d{4})-(\d{2})-(\d{2})", wert)
    if treffer:
        try:
            return dt.date(*(int(g) for g in treffer.groups()))
        except ValueError:
            return None
    return None


def betrag_lesen(wert: str) -> float | None:
    """Versteht 1.234,56 / 1,234.56 / -49,99 EUR / (49,99) als Minusbetrag."""
    if wert is None:
        return None
    text = str(wert).strip()
    if not text:
        return None

    negativ = text.startswith("(") and text.endswith(")")
    text = re.sub(r"[^0-9,.\-+]", "", text)
    if not text or text in {"-", "+", ".", ","}:
        return None

    if "," in text and "." in text:
        # Das zuletzt stehende Zeichen trennt die Nachkommastellen.
        if text.rfind(",") > text.rfind("."):
            text = text.replace(".", "").replace(",", ".")
        else:
            text = text.replace(",", "")
    elif "," in text:
        # Ein Komma mit genau drei Folgeziffern ist ein Tausenderpunkt, sonst Dezimalkomma.
        ganzzahlig = re.fullmatch(r"-?\d{1,3}(,\d{3})+", text)
        text = text.replace(",", "") if ganzzahlig else text.replace(",", ".")

    try:
        betrag = float(text)
    except ValueError:
        return None
    return -betrag if negativ else betrag


def entschaerfen(text: str) -> str:
    """Klein, ohne Umlaute, ohne Sonderzeichen - fuer den Namensvergleich."""
    text = (text or "").lower()
    text = text.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")
    text = unicodedata.normalize("NFKD", text)
    text = "".join(z for z in text if not unicodedata.combining(z))
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9 ]+", " ", text)).strip()


# Rechtsformen und Zahlungsdienstleister sagen nichts ueber den Anbieter aus.
FUELLWOERTER = {
    # Rechtsformen und Orte
    "gmbh", "ug", "ag", "kg", "ohg", "gbr", "mbh", "co", "inc", "ltd", "llc", "bv",
    "sarl", "srl", "se", "eg", "ev", "haftungsbeschraenkt", "und", "der", "die", "das",
    "gmbhcokg", "deutschland", "germany", "europe", "int", "gmbhco", "com", "www",
    # Belegwoerter: stehen auf fast jedem Beleg und sagen nichts ueber den Anbieter.
    # Ohne sie wurde "Zahlung fuer Rechnung ..." schon einmal einer fremden
    # Rechnung zugeordnet, nur weil beide das Wort "Rechnung" enthielten.
    "rechnung", "rechnungsnr", "rechnungsnummer", "invoice", "zahlung", "beleg",
    "gutschrift", "quittung", "kunde", "kundennr", "kdnr", "nr", "vom", "fur", "fuer",
    "payment", "num", "sagt", "danke", "ihr", "einkauf", "bei", "limited", "abbuchung",
    "konto", "statement", "subscription", "sub", "bill", "na",
}
ZAHLUNGSDIENSTE = (
    "paypal", "klarna", "sumup", "stripe", "shopify", "amazon payments", "amzn mktp",
    "mollie", "adyen", "apple pay", "google pay", "sofortueberweisung", "sofort",
    "visa", "mastercard", "lastschrift", "kartenzahlung", "dauerauftrag",
)


def anbieter_kern(text: str) -> str:
    """Zieht aus einem Buchungstext den eigentlichen Anbieternamen heraus.

    'PAYPAL *CANVA PTY' wird zu 'canva pty', 'Sofatutor GmbH' zu 'sofatutor'.
    """
    roh = entschaerfen(text)
    if not roh:
        return ""

    # Nur wenn vorn wirklich ein Zahlungsdienstleister steht, ist der Anbieter
    # der Teil dahinter. Bei "ANTHROPIC* CLAUDE SUB" steht er davor, deshalb
    # wird der Stern sonst einfach wie ein Leerzeichen behandelt.
    for dienst in ZAHLUNGSDIENSTE:
        if roh.startswith(dienst + " "):
            roh = roh[len(dienst):].strip()
            break

    woerter = [w for w in roh.split() if w not in FUELLWOERTER and not w.isdigit()]
    # Sehr lange Verwendungszwecke auf den aussagekraeftigen Anfang kuerzen.
    return " ".join(woerter[:6])


def aehnlichkeit(links: str, rechts: str) -> float:
    """0 bis 1. Wortueberschneidung schlaegt Zeichenvergleich, weil Namen oft gekuerzt sind."""
    import difflib

    a, b = anbieter_kern(links), anbieter_kern(rechts)
    if not a or not b:
        return 0.0
    if a == b:
        return 1.0

    menge_a, menge_b = set(a.split()), set(b.split())
    gemeinsam = menge_a & menge_b
    # Ein gemeinsames Wort ab vier Zeichen ist ein starkes Signal (z.B. 'canva').
    if any(len(wort) >= 4 for wort in gemeinsam):
        anteil = len(gemeinsam) / min(len(menge_a), len(menge_b))
        return min(1.0, 0.75 + 0.25 * anteil)
    if a in b or b in a:
        return 0.8

    # Unter diesem Wert ist der Zeichenvergleich blosses Rauschen: zwei beliebige
    # deutsche Firmennamen kommen allein durch gemeinsame Buchstaben auf 0,3 bis 0,4.
    wert = difflib.SequenceMatcher(None, a, b).ratio()
    return wert if wert >= 0.55 else 0.0



REFERENZ = re.compile(r"\d{6,}")


def referenzen(text: str) -> set[str]:
    """Zieht Rechnungs- und Kundennummern aus einem Text.

    Trennzeichen fallen weg, damit 'RE2026-324' und 'RE2026324' dieselbe
    Nummer ergeben. Erst ab sechs Ziffern, sonst treffen zufaellige Zahlen.
    """
    verdichtet = re.sub(r"[^0-9a-zA-Z]", "", text or "")
    return set(REFERENZ.findall(verdichtet))


def referenz_trifft(links: str, rechts: str) -> bool:
    """Wahr, wenn eine Nummer aus dem einen Text im anderen wieder auftaucht."""
    verdichtet_rechts = re.sub(r"[^0-9a-zA-Z]", "", rechts or "")
    verdichtet_links = re.sub(r"[^0-9a-zA-Z]", "", links or "")
    for nummer in referenzen(links):
        if nummer in verdichtet_rechts:
            return True
    for nummer in referenzen(rechts):
        if nummer in verdichtet_links:
            return True
    return False


def euro(betrag: float | None) -> str:
    if betrag is None:
        return ""
    return f"{betrag:,.2f}".replace(",", "#").replace(".", ",").replace("#", ".")
