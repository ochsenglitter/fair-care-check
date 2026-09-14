# Laufstart

Vom Spaziergang zu 25 Minuten am Stück – in 15 Wochen, mit zwei Einheiten pro
Woche.

Eine Lauf-App für den Wiedereinstieg nach langer Pause: fertiger Trainingsplan,
Intervall-Timer mit Ansage, eine 15-Minuten-Kurzvariante für Tage, an denen
alles dazwischenkommt, Fortschritt und Abzeichen. Kein Konto, kein Server, kein
Abo – die App liegt als Webseite auf dem Handy und merkt sich alles im Browser.

## Für wen das gebaut ist

Für Anfängerinnen, die lange nicht trainiert haben und zwei feste Termine pro
Woche unterbringen können. Deshalb:

- **Woche 1 wird nur gegangen.** Sehnen, Bänder und Gelenke brauchen nach einer
  langen Pause zwei bis drei Wochen Vorlauf, bevor Laufen ihnen guttut.
- **Das erste Laufintervall dauert 30 Sekunden**, nicht eine Minute.
- **Zwei Einheiten pro Woche**, je 25 bis 32 Minuten inklusive Auf- und
  Auslaufen.
- **Jede Woche ist wiederholbar** – ohne dass Zahlen oder Abzeichen verloren
  gehen.
- **Jede Einheit hat eine Kurzvariante** von 10 bis 15 Minuten, die im Plan voll
  zählt.

## Was drin ist

**Trainingsplan.** 15 Wochen, 30 Einheiten. Von einem halbstündigen Spaziergang
über 30-Sekunden-Intervalle bis zu 25 Minuten ohne Gehpause.

**Intervall-Timer.** Startet die Einheit Block für Block, zeigt die Restzeit als
Ring, sagt jeden Wechsel an (Ton, Sprachansage, Vibration) und piept die letzten
drei Sekunden herunter. Pause, Block überspringen und Abbrechen sind jederzeit
möglich; der Bildschirm bleibt während des Trainings an.

**Kurzvariante.** Jede Einheit auch als 10- bis 15-Minuten-Version: kurzes
Aufwärmen, etwa die halbe Laufzeit, kurzes Auslaufen. Für Tage, an denen sonst
gar nichts stattfinden würde.

**Trainingstage.** Wochentage auswählen (Vorschlag: Montag und Donnerstag). Die
Startseite sagt, ob heute Trainingstag ist, erinnert an den Ruhetag nach einer
Einheit und schlägt nach mehr als zwei Wochen Pause vor, eine Woche zurückzugehen
– mit einem Knopf, der genau das tut.

**Fortschritt.** Prozent vom Plan, Trainingszeit, reine Laufzeit, längstes
Laufstück, Einheiten der laufenden Woche, ein Kalender der letzten acht Wochen
und der Verlauf mit Stimmung und Notiz je Einheit.

**Tipps.** Vier Gruppen: Für den Anfang (Tempo, Schuhe, Muskelkater oder
Schmerz, Seitenstechen, Abbruchregel), Wenn's eng wird, Mit Kind (Buggy,
Laufrad, Spielplatzrunden) und Dunkel und kalt (Sichtbarkeit, Zwiebelprinzip,
Ersatz drinnen).

**Motivation.** Ein Spruch pro Tag, der Wochenfokus als Trainingstipp und elf
Abzeichen – vom ersten Losgehen über „Trotzdem raus" für die erste Kurzvariante
bis zu den 25 Minuten.

## Der Plan im Überblick

| Woche | Titel | Kern der Einheiten | Längstes Laufstück |
|---|---|---|---|
| 1 | Ankommen | 20 Min. zügig gehen | – |
| 2 | Die ersten 30 Sekunden | 6–8 × (30 Sek. laufen / 2 Min. gehen) | 30 Sek. |
| 3 | Zehn kurze Stücke | 10 × (30 Sek. / 1,5 Min.) | 30 Sek. |
| 4 | 45 Sekunden | 9 × (45 Sek. / 1,5 Min.) | 45 Sek. |
| 5 | Die erste Minute | 8 × (1 Min. / 1,5 Min.) | 1 Min. |
| 6 | Anderthalb Minuten | 6 × (1,5 Min. / 2 Min.) | 1,5 Min. |
| 7 | Zwei Minuten | 5 × (2 Min. / 2 Min.) | 2 Min. |
| 8 | Drei Minuten | 4 × (3 Min. / 2 Min.) | 3 Min. |
| 9 | Vier Minuten | 4 × (4 Min. / 2 Min.) | 4 Min. |
| 10 | Fünf, dann sechs | 3 × 5 Min. → 3 × 6 Min. | 6 Min. |
| 11 | Acht und zehn | 2 × 8 Min. → 2 × 10 Min. | 10 Min. |
| 12 | Der Übergang | 12 + 10 Min. → 15 + 8 Min. | 15 Min. |
| 13 | Am Stück | 18 Min. → 20 Min. ohne Pause | 20 Min. |
| 14 | Fast da | 22 Min. → 23 Min. | 23 Min. |
| 15 | Deine 25 Minuten | 24 Min. → 25 Min. | 25 Min. |

Jede Einheit beginnt mit Aufwärmen und endet mit Auslaufen (je 5 Minuten,
in den letzten Wochen kürzer, damit die Einheit in eine halbe Stunde passt).

## Dateien

    index.html      Grundgerüst, Navigation, Trainingsansicht
    styles.css      komplettes Design (dunkel, fürs Handy in der Hand)
    plan.js         Trainingsplan, Tipps, Sprüche, Abzeichen
    app.js          Timer, Fortschritt, Speicherung, Ansichten
    .nojekyll       verhindert Jekyll-Verarbeitung auf GitHub Pages

Statisch: HTML, CSS, zwei JavaScript-Dateien. Kein Build, keine Abhängigkeiten,
kein Backend.

## Auf GitHub Pages veröffentlichen

1. Im Repository auf **Settings › Pages**.
2. Unter *Build and deployment* → *Source*: **Deploy from a branch**.
3. Branch: `main`, Ordner: `/ (root)` → **Save**.
4. Nach ein bis zwei Minuten liegt die App unter
   `https://<benutzername>.github.io/laufstart/`.

Auf dem Handy die Seite öffnen und über *Teilen › Zum Home-Bildschirm* ablegen –
danach startet sie wie eine App.

## Lokal testen

Doppelklick auf `index.html` genügt. Wer einen Server möchte:

    python3 -m http.server 8000

## Daten

Alles bleibt in `localStorage` dieses Browsers: gelaufene Einheiten, Datum,
Stimmung, Notizen, Trainingstage, Abzeichen. Unter *Fortschritt › Einstellungen*
lassen sich die Daten als JSON sichern und auf einem anderen Gerät wieder laden.
„Zurücksetzen" löscht alles.

Der Plan merkt sich zwei Dinge getrennt: den Stand im Plan (welche Einheit
kommt als Nächstes) und den Verlauf (alles, was du gelaufen bist). Deshalb
kostet „Woche wiederholen" keine einzige Minute aus der Statistik.

## Anpassen

**Den Plan** ändern in `plan.js` unter `WOCHEN_ROH`. Jede Woche hat Titel, Ziel,
Fokus-Tipp, die Länge von Auf- und Auslaufen (`warm`, `aus`) und zwei Einheiten.
Eine Einheit ist eine Liste von Blöcken: `L(60)` sind 60 Sekunden laufen, `G(90)`
90 Sekunden Gehpause, `Z(1200)` 20 Minuten zügiges Gehen, und
`wdh(8, [L(60), G(90)])` wiederholt das Paar achtmal.

**Wie stark die Kurzvariante kürzt**, steht in `kurzVariante()` in `plan.js`
(Zielwert: etwa die halbe Laufzeit, höchstens zehn Minuten Kern).

**Tipps** stehen in `TIPPS`, **Sprüche** in `SPRUECHE`, **Abzeichen** in
`ABZEICHEN` – die zugehörige Bedingung in `app.js` in `pruefeAbzeichen()`.

**Farben** oben in `styles.css` unter `:root`.

## Hinweis

Der Plan ist ein üblicher Einsteigeraufbau, keine medizinische Beratung. Bei
Vorerkrankungen, längerer Pause mit Beschwerden oder anhaltenden Schmerzen
vorher ärztlich abklären.
