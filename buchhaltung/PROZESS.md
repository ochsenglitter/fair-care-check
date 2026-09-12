# Der Prozess

Wer macht was, damit nichts verlorengeht. Vier Beteiligte, vier klar getrennte
Aufgaben.

---

## Die eiserne Regel: an der bestehenden Ablage wird nichts verändert

Claude fasst die gewachsene Ordnerstruktur im Drive **nicht** an. Nichts wird
umbenannt, verschoben, überschrieben oder gelöscht — auch nicht „zum
Aufräumen". Der Grund ist nicht Vorsicht um ihrer selbst willen: Nadine und die
Steuerkanzlei arbeiten mit dieser Struktur, und eine Betriebsprüfung hat sie
gesehen.

Claude schreibt ausschließlich an **einen** neuen Ort:

```
Buchhaltung/Abgleich/<Jahr-Monat>/
```

Dort entstehen Listen und Berichte. Sonst nirgendwo. Wenn dir selbst das zu
viel ist, bekommst du die Listen einfach im Chat und legst sie selbst ab.

---

## Die Rollen

| Wer | Aufgabe | Wann |
| --- | --- | --- |
| **Du** | Kontoauszüge als CSV in den Auszugsordner legen | monatlich, ca. 5 Minuten |
| **Nadine** | Belege ablegen und an die Kanzlei geben — wie bisher | laufend |
| **Claude** | Abgleich rechnen, vier Listen erzeugen | auf Zuruf |
| **Steuerkanzlei** | Kandidaten freigeben, Anteile festlegen | quartalsweise |

Niemand übernimmt die Aufgabe eines anderen. Claude ersetzt Nadine nicht — er
sagt ihr, welche Belege noch fehlen.

---

## Schritt 1 — Was du lieferst

**Kontoauszüge als CSV**, nicht als PDF. Das ist der einzige Punkt, an dem es
wirklich auf dich ankommt.

Warum CSV: Aus einer CSV sind Datum, Betrag und Empfänger eindeutig lesbar. Aus
einem PDF müssen sie geraten werden, und beim Raten entstehen genau die Fehler,
die man in der Buchhaltung nicht brauchen kann. Jede Bank bietet den
CSV-Export im Online-Banking an, meist neben dem PDF-Download.

Ablage in den Kontoauszugsordner, ein Unterordner je Monat. Dateiname nach
diesem Muster:

```
<kontoname>_<jahr>-<monat>.csv

finom_2026-08.csv
dkb-privat_2026-08.csv
tagesgeld_2026-08.csv
```

Der Kontoname vorn ist wichtig: Daran erkennt Claude, ob ein Konto
geschäftlich, privat oder eine Rücklage ist. Welcher Name zu welcher Art
gehört, steht in `regeln/konten.csv` und wird einmal gemeinsam festgelegt.

**Alle Konten, auch die privaten.** Ohne die privaten Auszüge gibt es keine
Story-Liste und keine Prüfung auf betrieblichen Anteil.

---

## Schritt 2 — Was Claude daraus macht

Ein Befehl, vier Ergebnisse:

### 1. Fehlende Belege

Jede Buchung wird gegen den Belegbestand geprüft. Was keinen Beleg hat, landet
in einer Liste — **gebündelt nach Anbieter**, größte Summen zuerst. Aus vierzig
Einzelposten werden so etwa zehn Aufgaben, denn bei Abos holt man im Kundenkonto
ohnehin alle Rechnungen auf einmal.

Diese Liste geht an Nadine. Sie ist der einzige Punkt, an dem jemand
hinterhertelefonieren muss.

### 2. Übersicht über Einnahmen und Ausgaben

Die eigene Buchhaltung: was reinkam, was rausging, was übrig bleibt — getrennt
nach Betrieb und privat.

Entscheidend dabei: **Umbuchungen zwischen deinen eigenen Konten werden
herausgerechnet.** Wenn du 2.000 € vom Geschäfts- aufs Privatkonto überträgst,
ist das keine Ausgabe und keine Einnahme, sondern dasselbe Geld an einem anderen
Ort. Erkannt wird das an der Gegenbuchung: gleicher Betrag, entgegengesetztes
Vorzeichen, wenige Tage Abstand. Das ist zuverlässiger, als im Verwendungszweck
nach Wörtern zu suchen — deshalb brauche ich auch alle Konten, sonst fehlt die
jeweils andere Seite.

Privatentnahmen zählen aus demselben Grund nicht als Betriebsausgabe.

### 3. Zeigen lohnt sich

Die Liste für die 20-Prozent-Regel aus deiner Betriebsprüfung.

Alle privaten Ausgaben ab einer Schwelle (voreingestellt 50 €, änderbar),
sortiert nach Wirkung: Bei 249 € Kaufpreis sind 20 % gleich 49,80 € abziehbare
Kosten. Dazu steht, wie lange das Zeitfenster noch läuft.

**Diese Liste ist der Grund, warum der Rhythmus nicht nur monatlich sein
sollte.** Eine Ausgabe vom 3. August erfährst du beim Monatslauf Anfang
September — dann ist der Kauf fünf Wochen her und das Zeigen wirkt konstruiert.
Deshalb: einmal pro Woche ein kurzer Lauf nur für diese Liste. Dafür genügt der
private Auszug, und die Frage „was zeige ich diese Woche?" ist damit beantwortet,
bevor sie dich einholt.

Ohne Nachweis trägt der Abzug nicht. Zu jedem gezeigten Produkt gehören zwei
Dateien in den Belegordner: der Kaufbeleg und ein Screenshot der Story mit
sichtbarem Datum.

### 4. Rücklagen

Wie sich die Sparkonten entwickeln — Zuflüsse, Abflüsse, Veränderung im
Zeitraum.

**Dafür fehlt noch etwas:** Aus Kontobewegungen ergibt sich die Veränderung,
aber nicht der Stand. Für den Stand brauche ich je Rücklagenkonto den
Anfangssaldo — eine Zeile genügt:

```
kontoname;datum;saldo
tagesgeld;2026-01-01;12500.00
steuerruecklage;2026-01-01;8000.00
```

Als `salden.csv` in den Auszugsordner. Danach rechnet sich der Stand fort.

Wenn du mir zusätzlich sagst, welchen Anteil du zurücklegen willst (üblich sind
30 bis 40 % der Einnahmen für Steuern), kann die Übersicht auch sagen, ob die
Rücklage zum Ergebnis passt.

---

## Schritt 3 — Der Rhythmus

| Wann | Was | Dauer |
| --- | --- | --- |
| **Wöchentlich** | Privatauszug hochladen, Story-Liste abrufen | 5 Minuten |
| **Monatlich** | Alle Auszüge hochladen, vier Listen abrufen, Fehlliste an Nadine | 20 Minuten |
| **Quartalsweise** | Kandidatenliste an die Steuerkanzlei zur Freigabe | 15 Minuten |
| **Einmalig** | Kontenliste festlegen, Anfangssalden liefern, Gmail-Filter | 30 Minuten |

Der wöchentliche Lauf ist der einzige, der wirklich zeitkritisch ist — alles
andere verträgt auch mal eine Woche Verzug.

---

## Was das System ausdrücklich nicht tut

- **Es ändert nichts an deiner Ablage.** Siehe oben.
- **Es entscheidet nicht steuerlich.** Es erzeugt Kandidatenlisten für die
  Kanzlei. Die 20-Prozent-Regel stammt aus deiner Betriebsprüfung und ist als
  deine Vorgabe hinterlegt, nicht als allgemeines Steuerrecht.
- **Es ersetzt keinen Jahresabschluss.** Die Übersicht ist eine
  Überschlagsrechnung aus Kontobewegungen. Abschreibungen, offene Rechnungen und
  die Umsatzsteuer sind nicht enthalten.
- **Es bucht nicht.** Gebucht wird bei der Kanzlei, in DATEV.

---

## Woran es scheitern könnte

Drei ehrliche Risiken, damit sie nicht überraschen:

**Die Auszüge kommen nicht regelmäßig.** Dann ist die Story-Liste wertlos, weil
die Frist abgelaufen ist, bevor du die Liste siehst. Das ist der Punkt, an dem
das System steht und fällt.

**Nur PDFs statt CSV.** Für Januar bis Juli 2026 liegen bisher nur PDFs vor.
Daraus lässt sich Text ziehen, aber mit Unsicherheiten bei Beträgen und
Empfängern. Wenn die CSVs im Online-Banking noch abrufbar sind, ist das der
deutlich bessere Weg — rückwirkend meist zwölf Monate.

**Bar bezahlt.** Was bar bezahlt wird, steht auf keinem Auszug und kann von
keinem Abgleich gefunden werden. Solche Belege müssen von Hand in den
Belegordner, sonst existieren sie für dieses System nicht.
