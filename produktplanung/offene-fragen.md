# Offene Abgrenzungsfragen

Stand: 2026-09-16

Laut Arbeitsregel darf ich Funktionen, die mehrere Bereiche betreffen, nicht
selbst zuordnen. Die folgenden Punkte sind mir beim Aufbereiten der Architektur
aufgefallen. Jeder Punkt enthält einen **Vorschlag**, aber die Entscheidung
liegt bei Antonia. Entschiedene Punkte wandern in
`abgrenzung-und-arbeitsregeln.md`.

---

## A. Echte Überschneidungen zwischen bestehenden Produkten

### A1. Das tägliche Briefing – Sarah und Fenja liefern beide eins

Sarah erstellt **jeden Morgen ein persönliches Briefing**. Fenja erstellt
**Tages- und Wochenplanung**. Eine Kundin mit beiden Produkten bekommt morgens
zwei Nachrichten, die sich teilweise überschneiden. Das ist ein UX-Problem und
schwächt beide Produkte.

**Vorschlag:** Sarah behält ihr Briefing vollständig (sie muss allein
funktionieren). Fenja erkennt beim Setup, ob Sarah vorhanden ist, und bindet
deren Schul-Block als Abschnitt in ihr eigenes Tagesbriefing ein, statt
parallel zu senden. Ergebnis: **eine** Morgen-Nachricht, zwei Quellen. Das wird
zusätzlich zum Verkaufsargument für die Kombination.

### A2. Wem gehört der Kalender?

Sarah **überträgt Termine in den Kalender**. Fenja **koordiniert den
Familienkalender**. Ohne Regel schreiben beide hinein.

**Vorschlag:** Der Kalender ist gemeinsame Datenschicht, kein Produktbesitz.
Sarah schreibt Schultermine (klar als schulisch markiert). Fenja liest alles
und plant darauf, schreibt aber selbst keine Schultermine. Schreibrecht liegt
immer beim Fachbereich.

### A3. Schulferien – Sarah oder School Holidays Add-on?

Ferientermine sind schulische Information (stehen in Elternbriefen, betreffen
Schultage) – zugleich gibt es ein eigenes Ferien-Add-on.

**Vorschlag:** Sarah **kennt und nennt** Ferientermine („ab dem 20.12. keine
Schule"). Das Add-on übernimmt die **Planung** (Betreuungslücken, Aktivitäten,
Urlaub, Wochenplanung). Trennlinie: Sarah beantwortet *wann keine Schule ist*,
School Holidays beantwortet *was dann passiert*.

### A4. Doppelte Stammdaten – OGS- und Betreuungszeiten

Sarah erfasst im Setup OGS-/Betreuungszeiten, Fenja erfasst Betreuungszeiten.
Die Kundin gibt dieselben Daten zweimal ein – schlechter erster Eindruck beim
zweiten Kauf.

**Vorschlag:** Ein gemeinsames Format „Familien-Stammdaten", das beide Produkte
lesen. Einmal pflegen, überall gültig. Für Fenja verkürzt das das Setup
spürbar, wenn Sarah schon da ist.

### A5. „Zuständigkeiten" und „Routinen" stehen in Fenja *und* im Home Add-on

Beide Beschreibungen nennen Zuständigkeiten, Routinen und Aufgabenverteilung.
So wie es steht, kannibalisiert Home einen Teil von Fenja.

**Vorschlag:** Fenja = Zuständigkeit für **Termine und Personen** (wer fährt,
wer holt, wer ist wann da). Home = Zuständigkeit für **Haushaltsaufgaben** (wer
macht Wäsche, wer räumt die Spülmaschine aus). Unterschiedliche Objekte, keine
Überschneidung.

### A6. Vier Add-ons erzeugen Einkaufslisten

Meal Planning (Einkaufsliste), Home (notwendige Besorgungen), Christmas
(Einkäufe), Travel (notwendige Käufe). Die Kundin hätte vier Listen.

**Vorschlag:** Eine gemeinsame Einkaufsliste als Format. Jedes Add-on schreibt
mit Herkunfts-Kennzeichnung hinein. Die Kundin geht mit **einer** Liste
einkaufen.

### A7. Fahrdienste – Bedarf erkennen vs. zuweisen

Fahrdienste liegen bei Fenja. Aber Sarah erkennt Schulausflüge mit Fahrbedarf,
School Holidays nennt „Fahrten", Travel nennt Reise-Logistik.

**Vorschlag:** Generelle Regel für die ganze Familie:
**Bedarf erkennen** liegt beim Fachbereich (Sarah, Add-on).
**Zuweisen und einplanen** (wer fährt, passt das zu Arbeitszeiten) liegt immer
bei Fenja. Diese Regel löst gleich mehrere Grenzfälle auf einmal.

---

## B. Lücken – Kandidaten für spätere Add-ons

### B1. Geschenke außerhalb von Weihnachten

Christmas deckt Weihnachtsgeschenke ab. Kindergeburtstage, Mitbringsel für
eingeladene Kinder, Einschulung, Geschenke für Großeltern und Erzieherinnen
sind ein realer, wiederkehrender Mental Load – aktuell nirgends verortet.

**Vorschlag:** Eigenes Add-on „Feiern & Geschenke" prüfen, oder bewusst
verschieben. Nicht still in Christmas mit hineinnehmen.

### B2. Gesundheit und Arzttermine

U-Untersuchungen, Impfungen, Zahnarzt, Rezepte, Krankmeldungen. Liegt aktuell
implizit bei Fenja, aber ohne Fachtiefe.

**Vorschlag:** Als Add-on-Kandidat notieren. Vorher prüfen, wie stark der
Mental Load hier wirklich ist – und ob Datenschutz-Empfindlichkeit dagegen
spricht.

---

## C. Produktentscheidungen

### C1. Setzen Add-ons zwingend Fenja voraus?

Die Leiter sagt Sarah → Fenja → Add-ons. Was passiert, wenn eine
Sarah-Kundin direkt Meal Planning oder Christmas möchte?

Christmas und Meal Planning sind inhaltlich so eigenständig, dass sie technisch
auch ohne Fenja funktionieren würden. Saubere Leiter spricht dafür, sie an
Fenja zu binden; Umsatz und ein saisonaler Christmas-Launch sprechen dagegen.

**Vorschlag:** Grundsätzlich an Fenja binden, aber **Christmas** als möglichen
eigenständigen Saison-Einstieg offenhalten und separat entscheiden.

### C2. Wie werden Updates ausgeliefert?

Zum Lieferumfang gehören „Updates". Bei Einmalprodukten ohne SaaS ist offen,
über welchen Kanal die Kundin sie bekommt und wie lange.

**Vorschlag:** Vor dem ersten Launch festlegen und auf der Salespage konkret
benennen – die Frage kommt sonst im Verkaufsgespräch.

---

## D. Website

Aufgefallen beim Erstellen von `website-konzept.md` (2026-09-16). Alle fünf
Punkte blockieren den Bau bzw. den Launch der Seite.

### D1. Läuft die Produktfamilie unter Ochsenglitter oder unter eigener Marke?

Der Fair Care Check ist Ochsenglitter. Sarah und Fenja sind ein anderes
Angebot an dieselbe Zielgruppe. Davon hängen Domain, Design, Absender der
E-Mails und die Frage ab, ob die bestehende Reichweite überhaupt trägt.

**Vorschlag:** Unter Ochsenglitter, als eigener Bereich. Die vorhandene
Glaubwürdigkeit („die kennt meinen Alltag") ist der größte Startvorteil, und
eine zweite Marke müsste Vertrauen von null aufbauen. Eigene Domain nur, wenn
die Produktfamilie später klar eigenständig wird.

### D2. Zahlungsanbieter und Auslieferung

Die Kundin kauft einmalig und bekommt ein Paket aus Anleitung, Templates und
Prompts. Offen ist, worüber verkauft wird und in welcher Form ausgeliefert
wird (PDF, Notion-Duplikat, Download-Ordner). Hängt direkt an C2 (Updates):
Wie die Updates die Kundin erreichen, entscheidet die Wahl mit.

**Vorschlag:** Ein deutscher Anbieter mit Reverse-Charge- und
Widerrufs-Abwicklung (Digistore24 oder Copecart), Auslieferung als
duplizierbares Template plus PDF-Anleitung. Updates über dieselbe
Auslieferungsseite, damit kein zweiter Kanal entsteht.

### D3. Designsystem der Produktseite

Am 2026-09-16 kam das Designsystem der **Kernmarke** (Playfair Display +
Montserrat, Creme/Taupe/Anthrazit/Rosé) – zusammen mit der Festlegung, dass
im Business **drei Systeme nebeneinander** stehen und bewusst verschieden
bleiben: Kernmarke, Produktseiten, Care-Cards. Gemeinsamer Faden ist nur
Playfair Display für Headlines.

Damit ist die Frage **enger, nicht beantwortet:** Das Kernmarken-System ist
für einen Blog gebaut und nicht für Verkaufsseiten. Für Sarah und Fenja fehlt
das System noch.

**Vorschlag:** Kein drittes System von Grund auf. Playfair Display als
gemeinsame Headline-Schrift übernehmen, aber eine eigene Zweitschrift und
eine eigene Akzentfarbe wählen, damit Produktseiten und Blog auseinander zu
halten sind. Die Bausteinliste steht in `website-konzept.md`, Abschnitt 5.

### D4. Was braucht die Kundin technisch? (Blocker)

In der gesamten Produktarchitektur steht nicht, in welcher KI-Umgebung Sarah
gebaut wird und was die Kundin dafür haben muss – kostenpflichtiges Konto,
welcher Anbieter, welcher Kalender, welches Aufgaben-Tool. Ohne diese Antwort
lassen sich `/so-funktioniert-es`, die FAQ und die Abschnitte „Setup" und
„Was es nicht ist" auf keiner Salespage schreiben.

**Vorschlag:** Vor allem anderen festlegen und als eigene Datei in
`produktplanung/` dokumentieren (Voraussetzungen, Kosten für die Kundin,
unterstützte Alternativen). Auf der Seite gehört das offen und früh genannt,
nicht ins Kleingedruckte.

### D5. Preisfreigabe vor Launch

Die Preistabelle ist ausdrücklich Arbeitsannahme. Keine Seite darf mit einem
ungeprüften Preis live gehen.

**Vorschlag:** Vor Stufe 1 den Founding-Preis für Sarah final entscheiden und
in `produktleiter-und-preise.md` als final markieren. Alles andere bleibt
Arbeitsannahme, bis die jeweilige Stufe ansteht.

### D6. Fair Care Check – GEKLÄRT am 2026-09-16

Die optische Abweichung ist **gewollt**. Der Fair Care Check gehört zum
Care-Cards-System (Cormorant Garamond + Mulish), die Website zur Kernmarke.
Laut Briefing bleiben die Systeme absichtlich getrennt.

Bleibt ein praktischer Punkt, kein Designfehler: Wer von ochsenglitter.de in
den Rechner klickt, soll merken, dass er dieselbe Marke nicht verlässt. Dafür
genügt ein gemeinsamer Fußbereich mit demselben `/datenschutz/`-Link und ein
Rückweg zur Website – nicht dasselbe Aussehen.
