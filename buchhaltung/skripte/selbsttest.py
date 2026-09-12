"""Selbsttest. Prueft die Stellen, an denen frueher schon einmal etwas schiefging.

    python3 selbsttest.py

Nach jeder Aenderung an den Skripten oder am Regelkatalog ausfuehren.
"""

from __future__ import annotations

import os
import sys
import tempfile

import abgleich
import belegindex
import kontoauszug
import privatcheck
from gemeinsam import aehnlichkeit, betrag_lesen, datum_lesen, tabelle_schreiben

fehler: list[str] = []


def pruefe(bedingung: bool, beschreibung: str) -> None:
    if bedingung:
        print(f"  ok    {beschreibung}")
    else:
        print(f"  FEHLT {beschreibung}")
        fehler.append(beschreibung)


print("Betraege und Datumsangaben")
pruefe(betrag_lesen("-1.234,56 EUR") == -1234.56, "deutsches Format mit Tausenderpunkt")
pruefe(betrag_lesen("1,234.56") == 1234.56, "englisches Format")
pruefe(betrag_lesen("(49,99)") == -49.99, "Klammern bedeuten Minus")
pruefe(betrag_lesen("1,500") == 1500.0, "Komma mit drei Stellen ist ein Tausendertrenner")
pruefe(betrag_lesen("") is None, "leerer Betrag ergibt nichts")
pruefe(datum_lesen("18.12.24") == datum_lesen("2024-12-18"), "zweistellige Jahreszahl")
pruefe(datum_lesen("kein datum") is None, "unlesbares Datum ergibt nichts")

print("Anbieternamen vergleichen")
pruefe(aehnlichkeit("PAYPAL *CANVA PTY LTD", "Canva") > 0.9, "Zahlungsdienst davor stoert nicht")
pruefe(aehnlichkeit("Les Lunes GmbH", "LES LUNES") > 0.9, "Rechtsform stoert nicht")
pruefe(aehnlichkeit("ANTHROPIC PBC", "Anthorpic") > 0.55, "Tippfehler wird noch erkannt")
pruefe(aehnlichkeit("Aldi Sued", "Kaufland") == 0.0, "fremde Namen gelten nicht als aehnlich")
pruefe(aehnlichkeit("Hiscox", "Les Lunes") == 0.0, "kein Treffer durch zufaellige Buchstaben")
pruefe(aehnlichkeit("ANTHROPIC* CLAUDE SUB", "Anthropic") > 0.7, "Anbieter steht vor dem Stern")
pruefe(
    aehnlichkeit("Zahlung fuer Rechnung 1002-2017", "Rechnung_RE2026-322.1_Trueglow") == 0.0,
    "das Wort Rechnung allein verbindet nichts",
)

from gemeinsam import referenz_trifft
pruefe(referenz_trifft("RE2026-999 Musterkundin", "Rechnung_RE2026-999_Musterkundin.pdf"),
       "Rechnungsnummer trotz Bindestrich erkannt")
pruefe(referenz_trifft("Rechnung 20260016", "2026-08-10_Dienstleisterin_RE20260016_Firma.pdf"),
       "Rechnungsnummer ohne Trennzeichen erkannt")
pruefe(not referenz_trifft("Rechnung 20260016", "2026-08-31_Dienstleisterin_RE20260017_Firma.pdf"),
       "benachbarte Rechnungsnummer trifft nicht")

print("Belegnamen lesen")
eintrag = belegindex.eintrag_bauen("2026-08-29_Amazon_Bueromaterial 87,45EUR.pdf", "", "2026")
pruefe(eintrag["datum"] == "2026-08-29", "Datum aus dem Zielschema")
pruefe(eintrag["betrag"] == "87.45", "Betrag aus dem Dateinamen")
pruefe(eintrag["anbieter"] == "Amazon", "Anbieter aus dem Zielschema")

eintrag = belegindex.eintrag_bauen("Rechnung_RE2026-326_31.08.2026_Musterkundin.pdf", "", "")
pruefe(eintrag["anbieter"] == "Musterkundin", "Anbieter hinter Belegart und Rechnungsnummer")
pruefe(eintrag["datum"] == "2026-08-31", "Datum mitten im Namen")

eintrag = belegindex.eintrag_bauen("2026-09-07_StB Tewes_20260909121632060.pdf", "", "")
pruefe(eintrag["anbieter"] == "StB Tewes", "Zeitstempel wird nicht fuer den Anbieter gehalten")
pruefe(belegindex.eintrag_bauen("notizen.txt", "", "") is None, "fremde Dateiart wird uebergangen")

print("Bankformate erkennen")
with tempfile.TemporaryDirectory() as ordner:
    sparkasse = os.path.join(ordner, "sparkasse.csv")
    with open(sparkasse, "w", encoding="utf-8") as datei:
        datei.write(
            'Umsatzanzeige;erstellt am 01.09.2026\n\n'
            '"Buchungstag";"Verwendungszweck";"Beguenstigter/Zahlungspflichtiger";"Betrag"\n'
            '"03.08.2026";"Abo";"PAYPAL *CANVA";"-119,88"\n'
        )
    buchungen = kontoauszug.einlesen(sparkasse)
    pruefe(len(buchungen) == 1, "Vorspannzeilen der Bank werden uebersprungen")
    pruefe(buchungen[0]["richtung"] == "ausgabe", "Richtung wird aus dem Vorzeichen bestimmt")

    dkb = os.path.join(ordner, "dkb.csv")
    with open(dkb, "w", encoding="utf-8") as datei:
        datei.write(
            "Buchungsdatum,Zahlungspflichtige*r,Zahlungsempfänger*in,Verwendungszweck,Betrag (€)\n"
            "2026-08-03,Ich,Canva,Abo,-119.88\n"
            "2026-08-14,Sofatutor GmbH,Ich,Honorar,2320.50\n"
        )
    buchungen = kontoauszug.einlesen(dkb)
    pruefe(buchungen[0]["empfaenger"] == "Canva", "bei Ausgaben zaehlt der Empfaenger")
    pruefe(buchungen[1]["empfaenger"] == "Sofatutor GmbH", "bei Einnahmen der Zahlende")

    sollhaben = os.path.join(ordner, "sollhaben.csv")
    with open(sollhaben, "w", encoding="utf-8") as datei:
        datei.write("Datum;Name;Soll;Haben\n07.08.2026;Hiscox;231,00;\n21.08.2026;Finanzamt;;412,00\n")
    buchungen = kontoauszug.einlesen(sollhaben)
    pruefe(buchungen[0]["betrag"] == "-231.00", "getrennte Soll-Spalte wird negativ")
    pruefe(buchungen[1]["betrag"] == "412.00", "getrennte Haben-Spalte bleibt positiv")

print("Zuordnung")
buchungen = abgleich.vorbereiten([
    {"datum": "2026-08-05", "betrag": "1190.00", "richtung": "einnahme",
     "empfaenger": "Les Lunes GmbH", "verwendungszweck": "RE 041", "konto": "geschaeft"},
    {"datum": "2026-08-03", "betrag": "-119.88", "richtung": "ausgabe",
     "empfaenger": "PAYPAL *CANVA PTY", "verwendungszweck": "Abo", "konto": "geschaeft"},
], None, None)
belege = abgleich.belege_vorbereiten([
    {"datum": "2026-08-07", "betrag": "", "anbieter": "Hiscox", "titel": "Rechnung Hiscox.pdf", "pfad": ""},
    {"datum": "2026-08-03", "betrag": "", "anbieter": "Canva", "titel": "2026-08-03_Canva_Abo.pdf", "pfad": ""},
])
ergebnis = {zeile["empfaenger"]: zeile for zeile in abgleich.zuordnen(buchungen, belege)}
pruefe(ergebnis["PAYPAL *CANVA PTY"]["status"] == "zugeordnet", "Name und Datum ergeben eine Zuordnung")
pruefe(
    ergebnis["Les Lunes GmbH"]["status"] == "fehlt",
    "Datumsnaehe allein fuehrt zu keiner Zuordnung",
)

buchungen = abgleich.vorbereiten([
    {"datum": "2026-08-27", "betrag": "-3000.00", "richtung": "ausgabe",
     "empfaenger": "Inhaberin", "verwendungszweck": "Privatentnahme", "konto": "geschaeft"},
    {"datum": "2026-08-30", "betrag": "2000.00", "richtung": "einnahme",
     "empfaenger": "Von einer anderen Wallet uebertragen",
     "verwendungszweck": "Withdrawal transfer", "konto": "geschaeft"},
], None, None)
ergebnis = abgleich.zuordnen(buchungen, [])
pruefe(ergebnis[0]["status"] == "belegfrei", "Privatentnahme braucht keinen Beleg")
pruefe(ergebnis[1]["status"] == "belegfrei", "Umbuchung zwischen eigenen Konten ebenso")

print("Umbuchungen zwischen eigenen Konten")
import uebersicht
konten = {"firmenkonto": "geschaeft", "meinprivat": "privat", "sparbuch": "ruecklage"}
pruefe(uebersicht.konto_art("firmenkonto", konten) == "geschaeft", "Konto nach Namen eingeordnet")
pruefe(uebersicht.konto_art("meinprivat-2026-08", konten) == "privat", "Kontoname im Dateinamen")
pruefe(uebersicht.konto_art("unbekannt", konten) == "geschaeft", "im Zweifel geschaeftlich")

bewegungen = [
    {"datum": "2026-08-10", "betrag": "-2000.00", "empfaenger": "Uebertrag",
     "verwendungszweck": "", "konto": "firmenkonto"},
    {"datum": "2026-08-11", "betrag": "2000.00", "empfaenger": "Uebertrag",
     "verwendungszweck": "", "konto": "meinprivat"},
    {"datum": "2026-08-12", "betrag": "-49.99", "empfaenger": "Anbieter",
     "verwendungszweck": "Abo", "konto": "firmenkonto"},
]
for b in bewegungen:
    b["_datum"] = datum_lesen(b["datum"])
    b["_betrag"] = betrag_lesen(b["betrag"])
    b["_konto"] = b["konto"]
    b["_art"] = uebersicht.konto_art(b["konto"], konten)
ergebnis = uebersicht.auswerten(bewegungen)
pruefe(ergebnis["zahlen"]["umbuchungen"] == 1, "Gegenbuchung als Umbuchung erkannt")
pruefe(
    abs(ergebnis["zahlen"]["ausgaben_betrieb"] - 49.99) < 0.01,
    "Umbuchung zaehlt nicht als Betriebsausgabe",
)
pruefe(ergebnis["zahlen"]["ausgaben_privat"] == 0.0, "Gegenseite zaehlt auch nicht als privat")

print("Zeigen lohnt sich")
import story
werte = story.einstellungen()
pruefe(werte["anteil_prozent"] == 20.0, "Anteil aus der Betriebspruefung ist hinterlegt")
pruefe(werte["mindestbetrag"] > 0, "Mindestbetrag ist gesetzt")

print("Regelkatalog")
regeln = privatcheck.regeln_laden()
pruefe(len(regeln) > 15, "Regeln werden geladen")
treffer, _ = privatcheck.regel_finden("Restaurant Beispiel Bewirtung", regeln)
pruefe(treffer is not None and treffer["anteil_vorschlag"] == "70", "Bewirtung mit 70 Prozent")
treffer, _ = privatcheck.regel_finden("KITA Sonnenschein Beitrag", regeln)
pruefe(treffer is not None and treffer["art"] == "ausschluss", "Kinderbetreuung ist ausgeschlossen")
treffer, _ = privatcheck.regel_finden("Mueller Handel KG Schrauben", regeln)
pruefe(treffer is None, "kurzes Stichwort trifft nicht mitten im Wort")
treffer, _ = privatcheck.regel_finden("PAYPAL *OPENAI ChatGPT", regeln)
pruefe(treffer is not None and treffer["kategorie"].startswith("Software"), "Software wird erkannt")

print()
if fehler:
    print(f"{len(fehler)} Pruefungen fehlgeschlagen:")
    for eintrag in fehler:
        print(f"  - {eintrag}")
    sys.exit(1)
print("Alle Pruefungen bestanden.")
