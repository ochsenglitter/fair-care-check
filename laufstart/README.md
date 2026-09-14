# Laufstart

In acht Wochen vom ersten Schritt zu 30 Minuten am Stück.

Eine Lauf-App für Anfängerinnen: fertiger Trainingsplan, Intervall-Timer mit
Ansage, Trainingstage, Fortschritt und Abzeichen. Kein Konto, kein Server, kein
Abo – die App liegt als Webseite auf dem Handy und merkt sich alles im Browser.

## Was drin ist

**Trainingsplan.** 8 Wochen, 3 Einheiten pro Woche, 24 Einheiten insgesamt.
Von „achtmal eine Minute laufen" bis „30 Minuten am Stück". Jede Einheit dauert
zwischen 28 und 40 Minuten inklusive Auf- und Auslaufen.

**Intervall-Timer.** Startet die Einheit Block für Block, zeigt die Restzeit als
Ring, sagt jeden Wechsel an (Ton, Sprachansage, Vibration) und piept die letzten
drei Sekunden herunter. Pause, Block überspringen und Abbrechen sind jederzeit
möglich; der Bildschirm bleibt während des Trainings an.

**Trainingstage.** Wochentage auswählen (Vorschlag: Mo/Mi/Fr). Die Startseite
sagt, ob heute Trainingstag ist, und erinnert an den Ruhetag nach einer Einheit.

**Fortschritt.** Prozent vom Plan, Trainingszeit, reine Laufzeit, längstes
Laufstück, Einheiten der laufenden Woche, ein Kalender der letzten acht Wochen
und der Verlauf mit Stimmung und Notiz je Einheit.

**Motivation.** Ein Spruch pro Tag, der Wochenfokus als Trainingstipp und neun
Abzeichen – vom ersten Losgehen bis zu den 30 Minuten.

## Der Plan im Überblick

| Woche | Titel | Kern der Einheiten | Laufzeit |
|---|---|---|---|
| 1 | Ankommen | 8 × (1 Min. laufen / 1,5 Min. gehen) | 8 Min. |
| 2 | Etwas länger | 6 × (1,5 Min. laufen / 2 Min. gehen) | 9 Min. |
| 3 | Drei Minuten am Stück | 2 × (1,5 + 3 Min. laufen mit Pausen) | 9 Min. |
| 4 | Fünf Minuten | 3 / 5 / 3 / 5 Min. laufen | 16 Min. |
| 5 | Die große Woche | 3 × 5 Min. → 2 × 8 Min. → 20 Min. am Stück | 15–20 Min. |
| 6 | Stabil werden | 5/8/5 Min. → 2 × 10 Min. → 25 Min. am Stück | 18–25 Min. |
| 7 | Routine | 3 × 25 Min. am Stück | 25 Min. |
| 8 | Deine 30 Minuten | 28, 28 und 30 Min. am Stück | 28–30 Min. |

Jede Einheit beginnt mit 5 Minuten zügigem Gehen und endet mit 5 Minuten
Auslaufen.

## Dateien

    index.html      Grundgerüst, Navigation, Trainingsansicht
    styles.css      komplettes Design (dunkel, fürs Handy in der Hand)
    plan.js         Trainingsplan, Sprüche, Abzeichen
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

Alles bleibt in `localStorage` dieses Browsers: erledigte Einheiten, Datum,
Stimmung, Notizen, Trainingstage, Abzeichen. Unter *Fortschritt › Einstellungen*
lassen sich die Daten als JSON sichern und auf einem anderen Gerät wieder laden.
„Zurücksetzen" löscht alles.

## Anpassen

**Den Plan** ändern in `plan.js` unter `WOCHEN_ROH`. Jede Woche hat einen Titel,
ein Ziel, einen Fokus-Tipp und drei Einheiten. Eine Einheit ist eine Liste von
Blöcken: `L(60)` sind 60 Sekunden laufen, `G(90)` sind 90 Sekunden gehen,
`wdh(8, [L(60), G(90)])` wiederholt das Paar achtmal. Auf- und Auslaufen kommen
automatisch dazu (`AUFWAERM_SEK`, `AUSLAUF_SEK`).

**Sprüche** stehen in `SPRUECHE`, **Abzeichen** in `ABZEICHEN` – die zugehörige
Bedingung dazu in `app.js` in `pruefeAbzeichen()`.

**Farben** oben in `styles.css` unter `:root`.

## Hinweis

Der Plan ist ein üblicher Einsteigeraufbau, keine medizinische Beratung. Bei
Vorerkrankungen, längerer Pause oder Beschwerden vorher ärztlich abklären.
