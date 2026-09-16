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

### B3. Content- und Story-Planung – gehört sie überhaupt in die Familie?

Aufgekommen am 2026-09-14 beim Bau des Story-Plans in `content/`. Antonia
lässt sich ihr tägliches Story-Briefing von ihrer eigenen Fenja erstellen,
weil Fenja ihren Kalender kennt.

Content-Planung ist **kein Bereich aus der Einordnungstabelle**. Sie betrifft
Antonias Arbeit, nicht den Mental Load einer Familie. Nach Verfahrensschritt 4
wäre sie damit ein Add-on-Kandidat – die Filterfrage („Welchen konkreten Mental
Load muss eine Mutter danach nicht mehr selbst übernehmen?") beantwortet sie
aber nicht. Eine Mutter ohne Instagram-Konto hat hier gar kein Problem.

**Vorschlag:** Nicht aufnehmen. Weder in Fenja noch als Add-on. Für Antonias
eigenen Gebrauch bleibt der Story-Plan ein externes Dokument, das Fenja als
Kontext liest – Fenja liefert dabei ausschließlich das, wofür sie ohnehin
zuständig ist (Tagesplanung, Termine, Vorbereitungsbedarf). Damit wandert
keine Funktion in Fenja hinein.

Falls daraus später doch ein Produkt werden soll, wäre es **kein Familien-,
sondern ein Business-Produkt** und gehört in eine eigene Linie – nicht in die
Leiter Sarah → Fenja → Add-ons. Das wäre eine strategische Entscheidung, keine
Einordnungsfrage.

### B4. Was passiert mit „Senke den Mental Load"?

Aufgekommen am 16.09.2026 bei der Planung des Sarah-Launches.

Es gibt ein verkauftes Produkt außerhalb der Architektur: **„Senke den Mental
Load"**, ein Online-Kurs mit Gruppenprogramm, über 200 €. Warteliste 463,
verkauft 15 beim ersten Launch und 6 danach – insgesamt 21 Kundinnen.

Das Format widerspricht gleich drei bindenden Regeln: **kein Kurs**, keine
Gruppe, keine Logik, die auf Termine und Begleitung baut.

Zugleich liefert es die vermutlich beste Erkenntnis der ganzen Produktfamilie:

> Ein Kurs gegen Mental Load kostet Zeit. Zeit ist genau das, was die
> Zielgruppe nicht hat. 448 von 463 haben deshalb nein gesagt.

**Vorschlag:** Das Programm nicht weiterführen. Die Erkenntnis daraus wird zur
Copy für Sarah („Ich wollte mich nicht besser organisieren, ich wollte weniger
organisieren müssen") – belegt statt behauptet.

**Vorher zu klären:** Gibt es gegenüber den 21 Kundinnen noch laufende
Verpflichtungen (Zugang, Gruppe, Betreuung, Updates)? Falls ja, müssen die
erfüllt oder sauber beendet werden, bevor das Programm eingestellt wird. Das
ist eine Entscheidung für Antonia, keine Einordnungsfrage.

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

Hängt unmittelbar am Auslieferungsformat von Sarah (Download-Paket oder
ThriveCart Learn). Siehe `sarah/bauplan.md`, Abschnitt 7.

### C3. Für welche KI-Umgebung wird Sarah geschrieben?

Aufgekommen am 16.09.2026 beim Bauplan für Sarah.

Die Kundin baut in ihrer **eigenen** KI-Umgebung – das ist gesetzt. Offen ist,
für welche Umgebung die Klick-Anleitung geschrieben wird: ChatGPT, Claude oder
Gemini. Die Bausteine (Stammdaten-Vorlage, Instruction, Kalenderübergabe) sind
plattformunabhängig, die Anleitung ist es nicht.

Das ist keine technische Frage. Entscheidend ist, was die Zielgruppe schon auf
dem Handy hat: Eine Anleitung für eine App, die erst installiert werden muss,
verliert Käuferinnen vor dem ersten Schritt.

**Vorschlag:** Nicht raten, sondern messen. Sticker-Umfrage an **Tag 26
(10.10.2026)**: „Welche KI hast du auf dem Handy?" Das Ergebnis liegt vor,
bevor die Anleitung ab 15.10. geschrieben wird. Fällt die Antwort uneindeutig
aus, wird die Anleitung für die stärkste Option geschrieben und für die
zweitstärkste als Variante nachgezogen – nicht drei Anleitungen parallel.

---

**Entschieden und umgezogen:** C4 („Early Access" bezeichnete zwei Preisstufen)
wurde am 16.09.2026 entschieden und steht jetzt unter „Entschiedene Punkte" in
`abgrenzung-und-arbeitsregeln.md`.
