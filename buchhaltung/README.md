# Belegabgleich

Zweck: für jede Buchung liegt ein Beleg vor, und private Ausgaben mit
betrieblichem Anteil gehen nicht verloren.

Das hier hat nichts mit Fair Care Check, Sarah oder Fenja zu tun. Es ist ein
eigenständiges Werkzeug für die eigene Buchhaltung.

---

**Wie der Prozess im Alltag läuft — wer was wann macht — steht in
[PROZESS.md](PROZESS.md).** Dieses Dokument beschreibt das Werkzeug selbst.

## Der einfachste Weg in vier Regeln

Belege fehlen fast nie, weil jemand schlampt. Sie fehlen, weil sie gar nicht
erst an einem Ort entstehen. Genau da setzen die vier Regeln an.

### Regel 1 — Ein Konto für alles Betriebliche

Jede betriebliche Zahlung läuft über das Geschäftskonto. Auch der 12-Euro-Einkauf
für eine Story.

Das ist der größte Hebel überhaupt: Wenn alles Betriebliche über ein Konto läuft,
**ist der Kontoauszug die vollständige Liste aller Buchungen**. Dann ist die Frage
„habe ich alle Belege?" beantwortbar, statt nur gefühlt zu sein.

Umgekehrt gilt: Was über das Privatkonto läuft, ist Sonderarbeit. Regel 4
kümmert sich darum, aber jeder Posten dort kostet Zeit.

### Regel 2 — Der Beleg entsteht beim Kauf, nicht im Januar

Zwei Wege, mehr braucht es nicht:

**Rechnungen per E-Mail.** Ein Gmail-Filter für Absender wie `*rechnung*`,
`*invoice*`, `*billing*` vergibt das Label `Beleg` und leitet an die
Belegadresse weiter. Einmal eingerichtet, läuft für immer.

**Papierbelege und Kassenbons.** Direkt an der Kasse mit der Google-Drive-App
abfotografieren, in den Ordner `Buchhaltung Belege/<Jahr>/Ausgaben`. Der
Thermobon im Portemonnaie ist in drei Monaten leer — und vor Gericht wertlos.

Bei Einkäufen für Kooperationen kommt der Verwendungsnachweis sofort dazu:
Screenshot der Story oder Link zum Beitrag, in denselben Ordner, gleicher
Dateiname mit dem Zusatz `_nachweis`. Ohne diesen Nachweis ist der Einkauf
privat — siehe `regeln/belegpflicht.md`.

### Regel 3 — Einmal im Monat 20 Minuten Abgleich

Am Monatsanfang den Kontoauszug des Vormonats exportieren, in
`daten/eingang/` legen, einen Befehl ausführen:

```
cd skripte
python3 run.py 2026-08
```

Heraus kommt `daten/export/2026-08/bericht.md`: welche Buchungen noch keinen
Beleg haben, **gebündelt nach Anbieter**. Aus 40 Einzelposten werden so meist
acht Aufgaben — bei Abos holt man im Kundenkonto ohnehin alle Rechnungen auf
einmal.

Nur diese Liste abarbeiten. Nicht den Ordner durchsuchen, nicht alles neu
sortieren.

### Regel 4 — Einmal im Quartal das Privatkonto durchs Raster

Den Privatkontoauszug als `daten/eingang/privatkonto-*.csv` dazulegen. Der
gleiche Befehl erzeugt zusätzlich `privat-bericht.md`: alle Ausgaben, die nach
dem Regelkatalog betrieblich sein könnten, mit Kategorie, Anteilsvorschlag und
dem jeweils nötigen Nachweis.

Diese Liste ist ein **Vorschlag zur Prüfung, keine steuerliche Beurteilung**.
Was davon tatsächlich abziehbar ist, entscheidet die Steuerkanzlei. Die Liste
ist das Mittel, um mit ihr darüber zu sprechen, statt es zu vergessen.

---

## Einrichtung

Einmalig, dauert etwa zehn Minuten.

**Schritt 1.** Diesen Ordner an einen Ort legen, an dem er bleibt. Er enthält
absichtlich keine Buchhaltungsdaten, nur das Werkzeug.

**Schritt 2.** Belegquelle verbinden. Zwei Möglichkeiten:

- Google Drive for Desktop installieren und den Ordner `Buchhaltung Belege`
  synchronisieren. Dann einen Verweis anlegen:
  `ln -s "<Pfad zum Drive-Ordner>" daten/belege`
- Oder ohne Installation: Claude bitten, den Belegindex direkt aus Drive zu
  ziehen. Das Ergebnis landet als `daten/eingang/belege-liste.csv`.

**Schritt 3.** Kontoauszug testen. Eine Export-CSV der Bank nach
`daten/eingang/geschaeftskonto-test.csv` legen und `python3 run.py alles`
ausführen. Die Spalten werden automatisch erkannt; getestet gegen die Formate
von Sparkasse, DKB, Commerzbank, ING, N26, Holvi, Qonto und PayPal. Wird eine
Spalte nicht erkannt, meldet das Skript, welche Spalten es gefunden hat.

**Schritt 4.** Gmail-Filter aus Regel 2 anlegen.

Python 3.9 oder neuer genügt, es werden keine weiteren Pakete gebraucht.

**Ohne eigene Daten ausprobieren.** Im Ordner `beispiel/` liegen erfundene
Kontoauszüge und eine Belegliste:

```
cd skripte
python3 kontoauszug.py ../beispiel/geschaeftskonto-beispiel.csv /tmp/b.csv
python3 belegindex.py --liste ../beispiel/belege-liste-beispiel.csv --ausgabe /tmp/l.csv
python3 abgleich.py /tmp/b.csv /tmp/l.csv --ausgabe /tmp/ergebnis
python3 privatcheck.py ../beispiel/privatkonto-beispiel.csv --ausgabe /tmp/ergebnis
```

---

## Was wo liegt

```
skripte/       die vier Arbeitsschritte, run.py ruft sie der Reihe nach auf
regeln/        Belegpflicht, Ablageschema, Katalog der Betriebsausgaben
vorlagen/      Textbausteine zum Anfordern von Belegen und für Eigenbelege
daten/         Arbeitsverzeichnis, bleibt aus dem Repository heraus
  eingang/     hier kommen Kontoauszüge und Belegliste hinein
  export/      hier entstehen die Berichte
```

`daten/` ist vollständig von der Versionierung ausgenommen. Kontoauszüge und
Belege gehören nicht in ein Repository, auch nicht in ein privates.

---

## Die einzelnen Schritte

`run.py` genügt im Alltag. Wer einen Schritt einzeln braucht:

| Befehl | Zweck |
| --- | --- |
| `python3 kontoauszug.py export.csv buchungen.csv` | Bankformat vereinheitlichen |
| `python3 belegindex.py --ordner PFAD --ausgabe belege.csv` | Belege indizieren |
| `python3 abgleich.py buchungen.csv belege.csv --ausgabe ORDNER` | zuordnen und Lücken finden |
| `python3 privatcheck.py privat.csv --ausgabe ORDNER` | Privatkonto prüfen |
| `python3 selbsttest.py` | prüft, ob nach einer Änderung noch alles stimmt |

Nach jeder Änderung an den Skripten oder am Regelkatalog `selbsttest.py`
ausführen. Er deckt die Stellen ab, an denen beim Bauen schon einmal etwas
falsch lief — etwa Zuordnungen, die allein auf Datumsnähe beruhten.

### Wie der Abgleich zuordnet

Ein Beleg wird einer Buchung zugeordnet, wenn Betrag, Anbietername und Datum
zusammenpassen. Der Betrag wiegt am schwersten, das Datum am wenigsten —
Rechnungsdatum und Buchungstag liegen regelmäßig Wochen auseinander.

Wichtig: **Datumsnähe allein reicht nie.** Ohne Namens- oder Betragsbezug gibt
es keine Zuordnung. Lieber eine Lücke zu viel melden als zwei Vorgänge falsch
verheiraten.

Jeder Beleg wird höchstens einmal vergeben. Ergebnisse:

- `zugeordnet` — passt, nichts zu tun
- `prüfen` — Vorschlag, bei dem Name oder Datum abweicht; kurz bestätigen
- `fehlt` — kein Beleg gefunden

---

## Grenzen

Dieses Werkzeug ersetzt keine Steuerberatung und keine Buchhaltungssoftware. Es
beantwortet genau zwei Fragen: Welche Buchung hat noch keinen Beleg? Und welche
private Ausgabe sollte die Kanzlei sich ansehen?

Die Einordnung im Regelkatalog beruht auf Stichwörtern und liegt manchmal
daneben. Deshalb heißt die Ausgabe Kandidatenliste und nicht Buchungsvorschlag.
Sie ist als Grundlage für das Gespräch mit der Kanzlei gedacht, nicht als
Ersatz dafür.
