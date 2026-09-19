# Offene Abgrenzungsfragen

Stand: 2026-09-17

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

## D. Neu durch das Master-Briefing vom 2026-09-17

Quelle: `../strategie/quelle/2026-09-17-master-briefing-businessstrategie.md`.
Diese Punkte entstehen dadurch, dass das Master-Briefing jünger ist als die
Produktarchitektur vom 12.09. und an einigen Stellen etwas anderes sagt.
Rangfolge siehe `../strategie/rangfolge-der-dokumente.md`.

### D1. Sarah Pro gegen die Regel „keine künstlichen Beschränkungen"

**Der Konflikt:** „Sarah Pro" (29–39 €) soll laut Briefing **Stundenpläne, OGS,
normale Schulzeiten und wiederkehrende Termine** enthalten. Genau diese Daten
stehen in der Architektur vom 12.09. bereits im **Setup der Basis-Sarah**
(„Stundenpläne", „OGS-/Betreuungszeiten"). Sarah **berücksichtigt Stundenpläne**
ist dort eine Kernleistung.

Ein Add-on, das diese Funktionen kostenpflichtig macht, wäre eine künstliche
Beschränkung – genau der Fehler, den `marke-und-philosophie.md` ausschließt.
Sarah wäre ohne Pro in ihrem eigenen Bereich unvollständig.

**Vorschlag:** Trennlinie nach **Zeithorizont**, nicht nach Datenart.
Basis-Sarah kennt den Stundenplan und die OGS-Zeiten und nutzt beides, um
einzelne Dokumente richtig einzuordnen („Dienstag hat sie Sport, Sportsachen
mitgeben"). **Sarah Pro** macht daraus **längerfristige Schulplanung**:
Abweichungen über Wochen erkennen, Muster über das Schuljahr, AGs und
wiederkehrende Strukturen aktiv verwalten. Damit fehlt der Basis nichts – Pro
ist ein neuer Bereich (Planungshorizont), kein freigeschaltetes Feature.

**Bis zur Entscheidung: Sarah Pro nicht bauen und nicht bewerben.**

### D2. Sarah Pro enthält „Ferien und schulfreie Tage" – das kollidiert mit A3

A3 hat die Ferien-Trennlinie vorgeschlagen: Sarah sagt *wann keine Schule ist*,
das School Holidays Add-on plant *was dann passiert*. Sarah Pro nennt jetzt
„Ferien, schulfreie Tage" als eigenen Inhalt. Damit stünde dieselbe Information
an drei Stellen.

**Vorschlag:** A3 bleibt gültig und gilt auch für Pro. Ferientermine **kennen**
bleibt in der Basis-Sarah (sie stehen in Elternbriefen). Sarah Pro bekommt sie
nicht zusätzlich. Ferien**planung** bleibt beim School Holidays Add-on.

### D3. Ist „wiederkehrende Termine" Sarah Pro oder Fenja?

„Wiederkehrende Termine" steht jetzt sowohl in der Liste von **Sarah Pro** als
auch in der Liste dessen, was **Fenja** kennt.

**Vorschlag:** Nach Objekt trennen, analog zu A5 und A7. Sarah (bzw. Pro) =
wiederkehrende **schulische** Termine (AGs, Schwimmunterricht, Elternabende).
Fenja = wiederkehrende **Familien**termine (Hobbys, Arbeitszeiten, Umgang).
Erkennen beim Fachbereich, Einplanen bei Fenja.

### D4. Wie sieht der Upgrade-Vorteil Sarah → Fenja konkret aus?

Das Briefing sagt: Sarah-Käuferinnen sollen beim Upgrade einen finanziellen
Vorteil bekommen. Höhe und Mechanik sind offen. Gleichzeitig soll Fenja **nicht**
von Sarah abhängig sein und eine Direktkäuferin darf sich nicht bestraft fühlen.

**Vorschlag:** Fester Rabattcode für Sarah-Käuferinnen in Höhe des
Sarah-Kaufpreises (39 € bzw. 49 €), gedeckelt und zeitlich unbefristet.
Wirkung: „Deine Sarah wird dir voll angerechnet." Einfach zu kommunizieren,
keine Preisverwirrung, kein Nachteil für Direkteinsteigerinnen.

### D5. Sind die fünf Fenja-Add-ons von der Parkregel erfasst?

Das Briefing parkt „weitere große digitale Produktlinien" und sagt: bis Sarah
und Fenja nachweislich verkaufen, wird kein weiteres digitales Hauptprodukt
gebaut. Die fünf Fenja-Add-ons (Meal Planning, Travel, Christmas, Home, School
Holidays) werden dabei nicht ausdrücklich genannt.

**Vorschlag – und so ist es aktuell dokumentiert:** Architektur bleibt gültig,
**Bau ist geparkt**. Ausnahme prüfen für **Christmas** als saisonalen
Einstieg (siehe C1) – aber nur, wenn Sarah zu diesem Zeitpunkt läuft und der
Aufwand klein bleibt. Bitte bestätigen oder korrigieren.

### D6. Was wird aus den Preisstufen Founding (29 €) und Evergreen (79 €)?

Die alte Leiter hatte vier Stufen (29 / 49 / 59 / 79 €). Das Briefing nennt nur
noch **39 € Early Access** und **49 € regulär**. Im Zeitplan steht aber für
November/Dezember „Sarah Richtung Evergreen entwickeln" – ohne Preis.

**Vorschlag:** 39 € EA und 49 € regulär gelten. Die Frage nach einem höheren
Evergreen-Preis erst stellen, wenn die 100 Kundinnen erreicht sind und
Conversion-Daten vorliegen. Vorher ist jede Preisstufe geraten.

### D7. Mental Load Reset und Fenja Complete liegen beide bei ca. 249 €

Das Briefing nennt „Mental Load Reset" (249–349 €) als möglichen späteren
Schritt. Die Architektur kennt bereits „Fenja Complete" (ca. 249 €). Zwei
Produkte auf derselben Preisstufe, ohne geklärtes Verhältnis.

**Vorschlag:** Beide bleiben geparkt. Wenn die Frage aktuell wird, zuerst
entscheiden, ob Mental Load Reset ein **Bundle** (dann ist es Fenja Complete
unter anderem Namen) oder ein **eigenes Produkt** (dann Filterfrage beantworten:
welchen konkreten Mental Load nimmt es ab?) sein soll.

### D8. Welche Zahl ist der Einführungspreis? — **dringend**

**Aktualisiert 2026-09-19, Zeitschiene von Antonia vorgegeben.** Warteliste bis
**Sa 26.09.**, Einführungspreis **So 27.09. bis So 11.10., 23:59**, danach
Evergreen.

Zwei Preise stehen als Platzhalter, nicht einer:

| | |
|---|---|
| **Einführungspreis** | 27.09.–11.10. — Arbeitsannahmen im Umlauf: 29 € und 49 € |
| **Preis ab 12.10.** | der Evergreen-Preis, noch offen — daran hängt die gesamte Schlussargumentation |

In der Preistabelle stehen bisher nur **39 € Early Access** und **49 € regulär**.

**Vorschlag:** Founding als eigene Stufe aufnehmen, nicht platzbegrenzt, sondern
datumsbegrenzt. Die Begründung trägt ohne künstliche Verknappung: Wer zuerst
kauft, kauft ohne eine einzige Bewertung, kauft ein Produkt mit Kanten, und
bekommt alles ohne Aufpreis, was daraus noch wird.

**Der Evergreen-Preis muss zum Januar-Preis passen** — im Januar kommt der große
Sarah-Launch mit Testimonials. Drei Stufen (Einführung · ab 12.10. · Januar)
müssen als Reihe erklärbar sein. Die Arbeitsannahmen aus `CLAUDE.md` sind
39 € Early Access und 49 € regulär.

⚠️ **Am 12.10. wird wirklich erhöht.** Steht der Preis am 13. noch unverändert,
ist die Begründung gegenüber genau den Käuferinnen gebrochen, die am meisten
vertraut haben.

### D9. Drei Entscheidungen, die den Verkaufsstart blockieren

**Stand 2026-09-18.** Keine davon ist eine Produktarchitekturfrage, alle drei
stehen aber als Platzhalter im Produkt und auf der Verkaufsseite:

1. **V10 — Claude-Stufe und Monatskosten.** Fertig, wenn der Satz steht:
   „Du brauchst [Stufe], ca. [X] € im Monat – das zahlst du an Claude, nicht an
   mich." Er gehört **vor** den Kaufbutton, nicht in die Zugangsmail.
2. **Antwortzeit für den Support.** Die Adresse ist entschieden (19.09.):
   `hallo@ochsenglitter.de`. Offen ist nur noch die Zusage — Vorschlag:
   „werktags innerhalb von 48 Stunden". Support ist ausdrücklich **keine
   Begleitung**: eine Adresse, eine Zusage, schriftlich.
3. **Live-Session ja oder nein.** `Produktionswochenende` führt sie als Bonus
   (Do 01.10.), `Launch-Choreografie` streicht sie ersatzlos. Der Tagesplan geht
   von **ohne Begleitung** aus; die Entscheidung muss vor dem 27.09. fallen,
   weil Verkaufsseite und alle Mails daran hängen.

### D10. Darf das Christmas Add-on ab 12.10. geteasert werden?

**Stand 2026-09-19.** Die vorgegebene Zeitschiene sieht ab dem 12.10. Evergreen
plus **Teaser für das Christmas Add-on** vor.

Das kollidiert mit der Produktregel in `CLAUDE.md`:

> Die Fenja-Add-ons sind architektonisch gültig, **ihr Bau ist geparkt**,
> solange Sarah und Fenja nicht nachweislich verkaufen.

Ein Teaser ab 12.10. kündigt damit ein Produkt an, dessen Bau noch nicht
freigegeben ist — und das Weihnachtsfenster verzeiht keine Verschiebung.

**Vorschlag:** ab 12.10. die **Frage** teasern, nicht das Produkt. „Wer denkt
bei euch eigentlich an die Geschenke?" sammelt Nachfrage und Adressen, ohne
eine Zusage zu machen. Verkauft Sarah im Einführungsfenster, ist die
Parkbedingung erfüllt — dann darf ab November aus dem Teaser ein Produkt
werden. Verkauft sie nicht, bleibt die Frage eine Content-Serie und kostet
nichts.

**Zusätzlich zu klären:** Das Christmas Add-on ist in der Produktarchitektur
ein **Fenja**-Add-on. Fenja gibt es im Oktober noch nicht. Wird es an Fenja
gekoppelt (dann frühestens Januar) oder als eigenständiges Produkt neben Sarah
verkauft (dann ist die Einordnungstabelle betroffen)? **Nicht eigenmächtig
verschieben** — das ist eine Architekturentscheidung.
