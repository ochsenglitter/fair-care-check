# Website-Konzept

Stand: 2026-09-16

**Achtung, zwei verschiedene Websites.** Diese Datei beschreibt die
**Produktseite** für Sarah, Fenja und die Add-ons. Die Kernmarken-Website
ochsenglitter.de (Blog, Ressourcen, Lieblingsprodukte, Newsletter) ist ein
eigenes Projekt und liegt unter `website/` – mit einem **bewusst anderen**
Designsystem.

Verbindliche Struktur, Gestaltung und Ausbaureihenfolge der Produktseite.
Abgeleitet aus `marke-und-philosophie.md`, `produktleiter-und-preise.md` und
`abgrenzung-und-arbeitsregeln.md`. Bei Widersprüchen gelten die drei Dateien,
nicht diese.

## 1. Was die Website leisten muss

Die Website hat genau drei Aufgaben:

1. **Sarah verkaufen.** Sarah trägt die Neukundengewinnung. Alles andere ist
   nachgelagert.
2. **Den Mental Load sichtbar machen**, bevor ein Produkt genannt wird. Der
   Fair Care Check tut das bereits – er gehört in den Funnel, nicht auf ein
   Nebengleis.
3. **Die Produktfamilie verständlich trennen.** Wer auf der Seite nicht in
   zehn Sekunden versteht, dass Sarah Schule ist und Fenja Familienlogistik,
   kauft entweder falsch oder gar nicht.

Was die Website ausdrücklich **nicht** leisten muss: ein Mitgliederbereich, ein
Login, ein Dashboard, ein Kundenkonto. Das Geschäftsmodell ist Einmalprodukt
ohne SaaS – die Website ist Verkaufs- und Auslieferungsseite, kein Produkt.

## 2. Das Navigationsprinzip: Lebensbereiche, keine Produktstufen

**Das ist die wichtigste Strukturentscheidung der ganzen Seite.**

Die Navigation ordnet nach **Bereich**, nie nach Größe, Stufe oder Preis.

| Erlaubt | Verboten |
|---|---|
| „Schule", „Familienalltag", „Spezialbereiche" | „Basic / Pro / Premium" |
| Sarah und Fenja gleichrangig nebeneinander | Fenja als „das große Paket" |
| „Wofür ist was zuständig?" | Feature-Vergleichstabelle Sarah vs. Fenja |

Begründung: Regel 3 der Produktleiter – *Fenja ist kein Upgrade von Sarah*.
Eine klassische Tarif-Tabelle behauptet optisch das Gegenteil, egal was der
Text sagt. Sobald Sarah und Fenja in einem Raster mit Häkchen und Kreuzen
stehen, liest jede Besucherin Sarah als beschnittene Version – und genau das
ist der Fehler „künstliche Beschränkung", nur auf der Designebene.

**Ersatz für die Vergleichstabelle:** eine Zuständigkeits-Tabelle mit zwei
Spalten und ohne Häkchen.

| Frage im Kopf | Zuständig |
|---|---|
| „Was müssen wir wegen Schule wissen und erledigen?" | Sarah |
| „Wie läuft unsere Familie heute und diese Woche?" | Fenja |
| „Was essen wir diese Woche?" | Meal Planning |
| „Was muss für die Reise vorbereitet und gepackt werden?" | Travel & Packing |
| „Wie kommen wir durch die Adventszeit?" | Christmas |
| „Wer macht was im Haushalt?" | Home |
| „Wie überstehen wir die Ferienwochen?" | School Holidays |

Diese Tabelle steht auf der Startseite, auf jeder Salespage im Abschnitt
„Abgrenzung" und in der FAQ. Sie ist die Kaufberatung der Seite.

## 3. Seitenstruktur (Sitemap)

    /                        Startseite – Marke und Bereichseinstiege
    /fair-care-check         Care-Arbeit-Rechner (kostenlos, Lead-Magnet)
    /sarah                   Salespage Schule
    /fenja                   Salespage Familienlogistik
    /fenja/meal-planning     Add-on Essen
    /fenja/travel            Add-on Reisen und Packen
    /fenja/christmas         Add-on Weihnachten
    /fenja/home              Add-on Haushalt
    /fenja/ferien            Add-on Ferien
    /fenja/complete          Bundle
    /so-funktioniert-es      Einrichten → personalisieren → benutzen
    /ueber-mich              Antonia, Glaubwürdigkeit, Warum es das gibt
    /faq                     Einwände zentral
    /danke                   Nach dem Kauf: Auslieferung und erster Schritt
    /impressum /datenschutz /agb /widerruf

### Startseite

Kein Produktkatalog. Reihenfolge:

1. **Leitsatz und Versprechen.** „Work smarter, not harder." Darunter der
   Mental-Load-Satz, nicht die Technik.
2. **Problem-Spiegel.** Der Alltag, den die Besucherin wiedererkennt.
3. **Der ehrliche Einstieg: Fair Care Check.** „Bevor du irgendetwas kaufst –
   schau dir an, wie viel du eigentlich trägst." Kostenlos, ohne Verkauf.
4. **Die Bereichs-Tabelle** aus Abschnitt 2.
5. **Was das hier ist – und was nicht.** Kein Kurs. Kein Abo. Kein Login. Drei
   Sätze, sehr früh. Das ist der stärkste Vertrauensbaustein der Marke.
6. **Ein CTA, nicht fünf.** In Stufe 1 führt er zu Sarah.

### So funktioniert es

Eigene Seite, weil sie auf jeder Salespage verlinkt wird und den größten
Kaufeinwand löst („Kann ich das überhaupt?"):

- Die drei Schritte: Einrichten → mit den eigenen Familiendaten
  personalisieren → benutzen.
- Der Ton der Anleitung wird gezeigt, nicht behauptet: ein echter Ausschnitt im
  Muster „Mach Schritt 1. Kopiere das. Trage hier deine Daten ein."
- Was du technisch brauchst (siehe offene Frage D4 – das muss vor dem Launch
  beantwortet sein, sonst kann diese Seite nicht geschrieben werden).
- Wie lange das Setup dauert.
- Was du bekommst: Architektur, getestete Workflows, Templates, Prompts,
  Setup-Anleitung, Troubleshooting, Updates.

## 4. Aufbau jeder Salespage (ein Muster für alle)

Alle Produktseiten folgen derselben Reihenfolge. Das macht sie schnell baubar
und die Familie als Familie erkennbar.

| # | Abschnitt | Regel |
|---|---|---|
| 1 | Hero | Mental-Load-Satz, nie Funktion. Sarah: „Ich wollte mich nicht noch besser organisieren. Ich wollte weniger organisieren müssen." |
| 2 | Problem-Spiegel | Der konkrete Alltag ohne das Produkt |
| 3 | **Was du danach nicht mehr selbst machst** | Die Filterfrage als Abschnitt. Nutzen, nicht Feature |
| 4 | Ein Tag mit … | Das Morgen-Briefing im Original zeigen. Demo schlägt Featureliste |
| 5 | Was drin ist | Lieferumfang konkret |
| 6 | Setup in Schritten | Zeitangabe, Screenshot-Charakter |
| 7 | Was es nicht ist | Kein Kurs, kein Abo, kein Login, keine KI-Vorkenntnisse |
| 8 | **Abgrenzung** | Was bewusst woanders hingehört, mit Link. Ehrlich und zugleich der einzige zulässige Upsell-Weg |
| 9 | FAQ | produktspezifisch, Rest verlinkt |
| 10 | Preis und Kauf | „einmalig" steht am Preis, nicht im Kleingedruckten |
| 11 | Widerruf / Sicherheit | digitale Produkte sauber geregelt |

Zwei Copy-Regeln, die auf jeder Seite gelten:

- **Nie die Einzelfunktion verkaufen.** Nicht „KI liest einen Elternbrief",
  sondern „Ich muss den Schulalltag meiner Kinder nicht mehr selbst im Kopf
  behalten."
- **Abschnitt 8 wird nie als Mangel formuliert.** „Fenja kann das" – nicht
  „Dafür brauchst du zusätzlich Fenja".

### Besonderheit Add-on-Seiten

Add-ons setzen Fenja voraus (Leiter-Regel 4). Jede Add-on-Seite braucht daher
oben einen unübersehbaren Hinweis „Erweiterung für Fenja" – sonst entstehen
Fehlkäufe und Rückabwicklungen. Ausnahme möglicherweise Christmas als
saisonaler Einstieg, das ist noch nicht entschieden (offene Frage C1).

Add-on-Seiten sind kurz: Hero, Problem, Was du abgibst, Umfang, Voraussetzung,
Preis. Kein voller Salespage-Apparat bei 19–29 €.

## 5. Gestaltung

**Noch offen – und zwar bewusst.** Das Briefing zur Kernmarken-Website vom
2026-09-16 legt fest, dass im Ochsenglitter-Business **drei eigenständige
Designsysteme** nebeneinander stehen und absichtlich unterschiedlich bleiben:

| System | Wofür | Stand |
|---|---|---|
| Kernmarke | ochsenglitter.de – Blog, Ressourcen, Newsletter | steht, liegt unter `website/` |
| Produktseiten | Sarah, Fenja, Add-ons | **fehlt noch** |
| Care-Cards | Workbooks, Decks, Fair Care Check | steht |

Gemeinsamer Faden aller drei ist allein **Playfair Display** für Headlines.

Für die Produktseite ist damit noch nichts entschieden. Das
Kernmarken-System darf nicht einfach übernommen werden – es ist für einen
Blog gebaut, nicht für Verkaufsseiten.

### Was unabhängig vom System gilt

- **Mobil zuerst.** Die Zielgruppe liest zwischen Tür und Angel auf dem Handy.
- **Ein Screenshot sagt mehr als drei Absätze.** Das Morgen-Briefing als Bild
  einer echten Nachricht ist das stärkste Verkaufselement, das es gibt.
- **Keine Roboter-, Gehirn- oder Chip-Bildsprache.** Familienalltag zeigen.
- **Ruhe statt Dringlichkeit.** Countdown-Balken und Verknappungs-Banner
  widersprechen dem Markenversprechen „weniger im Kopf".
- **Preisdarstellung immer mit „einmalig"** direkt am Betrag.
- **Textkontrast prüfen.** Beim Kernmarken-System erreichten die hellen
  Palettentöne als Textfarbe nur 2,2:1 statt der nötigen 4,5:1. Derselbe
  Fehler passiert in jeder warmen Palette – vor dem Launch messen.

### Bausteine, die die Produktseite braucht

Beim Aufbau des Kernmarken-Styleguides entstanden, dort aber wieder entfernt,
weil sie nicht zu einem Blog gehören. Für die Produktseite gelten sie weiter
als Anforderungsliste:

Hero mit Mental-Load-Satz · Zuständigkeits-Tabelle (zwei Spalten, keine
Häkchen) · Morgen-Briefing als Nachrichten-Mock · nummerierte Setup-Schritte ·
„Was es nicht ist"-Liste · Preisblock mit „einmalig" am Betrag · FAQ-Aufklapper.

## 6. Technik

Statisch, wie der Fair Care Check: HTML, CSS, ein JS pro Seite. Kein Build,
keine Abhängigkeiten, kein Backend. Hosting auf GitHub Pages mit eigener
Domain.

Das ist keine Sparlösung, sondern Folge des Geschäftsmodells: Kein Login, kein
Abo, kein laufender Dienst heißt auch keine Serverarchitektur.

- **Eine gemeinsame CSS-Datei** für alle Produktseiten, sobald das
  Designsystem steht. Verhindert das Auseinanderlaufen bei acht Seiten.
  Einzelne Seiten bringen keine eigenen Farben oder Schriften mit.
- **Preise an genau einer Stelle** pro Seite, klar markiert. Solange die
  Preistabelle Arbeitsannahme ist, darf keine Seite mit Preis live gehen.
- **Zahlung und Auslieferung über einen externen Anbieter**
  (Digistore24 / Copecart / elopage o. Ä.). Das widerspricht „kein SaaS"
  nicht – die Regel betrifft das Produkt, nicht die Kaufabwicklung. Die
  Auswahl ist offen, siehe D2.
- **E-Mail-Einsammlung** am Fair Care Check und in der FAQ. Ohne E-Mail-Liste
  ist der Rechner ein Geschenk ohne Rückweg.
- **Analytics datenschutzarm** (z. B. Plausible). Die Zielgruppe ist bei
  Familiendaten empfindlich – Tracking-Banner kosten hier mehr Vertrauen, als
  die Daten wert sind.
- **Kein Kundendatenspeicher.** Der Fair Care Check rechnet im Browser. Dieses
  Versprechen gilt für die ganze Seite und gehört sichtbar auf sie drauf.

## 7. Der Funnel

    Fair Care Check          Mental Load wird in Stunden und Euro sichtbar
        ↓  Ergebnisseite
    „Das ist deine Zahl. Hier ist der erste Bereich, den du abgeben kannst."
        ↓
    Sarah (Schule)           Einstiegsprodukt, trägt die Neukundengewinnung
        ↓  nach dem Setup, nicht am Kauftag
    Fenja (Familienlogistik) neuer Bereich, kein Upgrade
        ↓
    Add-ons                  weitere Bereiche

Der Fair Care Check ist der stärkste Aktivposten, der schon existiert: Er
quantifiziert exakt das Problem, das die Produkte lösen. Auf der Ergebnisseite
fehlt bisher die Brücke. Der Rechner zeigt „du trägst X Stunden und Y % der
Denkarbeit" – der nächste Satz muss lauten, welchen Teil davon sie abgeben
kann. Das ist der erste konkrete Umsetzungsschritt am Bestand.

**Wichtig beim Übergang Sarah → Fenja:** Fenja wird Bestandskundinnen erst
angeboten, wenn Sarah läuft und entlastet – nicht im Kaufprozess. Sonst wirkt
Sarah unvollständig, und das verletzt die Markenregel direkt.

## 8. Ausbaureihenfolge

Die Seite wird nicht komplett gebaut und dann gelauncht. Vier Stufen:

### Stufe 1 – Sarah-Launch (das Minimum, das verkauft)

Startseite · `/sarah` · `/so-funktioniert-es` · `/faq` · `/fair-care-check`
mit CTA · `/danke` · Rechtliches.

Fenja und die Add-ons kommen hier **noch nicht** vor – auch nicht als
„demnächst". Eine angekündigte größere Schwester verschiebt Käufe, selbst wenn
sie inhaltlich etwas völlig anderes ist. Erst wenn Sarah steht, wird die
Familie sichtbar.

### Stufe 2 – Fenja

`/fenja` · Zuständigkeits-Tabelle in die Navigation · Bestandskundinnen-Mail.
Ab hier trägt die Seite zwei gleichrangige Produkte, und die Navigation aus
Abschnitt 2 wird zur Pflicht.

### Stufe 3 – Add-ons, beginnend mit Christmas

Christmas ist saisonal und eignet sich für einen eigenen Launch im Herbst.
**Zeitkritisch:** ein Weihnachts-Launch braucht die Seite im Oktober, sonst
fällt das Fenster ein Jahr weit aus. Dann die übrigen vier Add-ons im
gleichen, kurzen Seitenmuster.

### Stufe 4 – Fenja Complete und Ausbau

Bundle-Seite, Kundinnenstimmen, optional Inhalte für Sichtbarkeit.
Kundinnenstimmen erst hier – vorher gibt es keine echten.

## 9. Was auf der Seite nie stehen darf

- „Abo", „Mitgliedschaft", „monatlich", „Zugang läuft"
- „Kurs", „Modul", „Lektion", „Curriculum"
- eine Feature-Matrix, die Sarah und Fenja gegeneinanderstellt
- ein Preis, solange er Arbeitsannahme ist
- ein Nutzenversprechen, das keine Mental-Load-Abgabe benennt

## 10. Offene Punkte

Vor dem Bau zu klären, siehe Abschnitt D in `offene-fragen.md`:
Marke und Domain (D1), Zahlung und Auslieferung (D2), Designsystem der
Produktseite (D3), technische Voraussetzungen der Kundin (D4, Blocker),
Preisfreigabe (D5).
