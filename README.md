# Fair Care Check

Der Care-Arbeit-Rechner für Familien. 44 Fragen aus sieben Lebensbereichen, drei
Eingabe-Varianten, und am Ende eine Care-Bilanz mit Wochenstunden, Geldwert,
Mental-Load-Anteil, Verteilung nach Bereich und drei konkreten
Umverteilungs-Vorschlägen. Als PDF druckbar, als CSV mit fertigen Formeln für
Google Sheets exportierbar.

Statisch: HTML, CSS, ein JavaScript. Kein Build, keine Abhängigkeiten, kein
Backend. Alle Antworten bleiben im Browser (`localStorage`).

## Dateien

    index.html      Grundgerüst und Schrift-Einbindung
    styles.css      komplettes Design (Cormorant Garamond + Mulish)
    app.js          Aufgabenkatalog, Berechnung, Ansichten, CSV-Export
    .nojekyll       verhindert Jekyll-Verarbeitung auf GitHub Pages

## Auf GitHub Pages veröffentlichen

1. Dateien in das Repository pushen (Branch `main`, Wurzelverzeichnis).
2. Im Repository auf **Settings › Pages**.
3. Unter *Build and deployment* → *Source*: **Deploy from a branch**.
4. Branch: `main`, Ordner: `/ (root)` → **Save**.
5. Nach ein bis zwei Minuten liegt die Seite unter
   `https://<benutzername>.github.io/<repository>/`.

Eigene Domain: unter *Settings › Pages › Custom domain* eintragen und beim
Domain-Anbieter einen CNAME auf `<benutzername>.github.io` setzen.

## Lokal testen

Doppelklick auf `index.html` genügt. Wer einen Server möchte:

    python3 -m http.server 8000

## Anpassen

**Aufgaben** stehen am Anfang von `app.js` in `CATS`. Format je Zeile:

    ['Aufgabe', 'Erklärung', Richtwert-Minuten-pro-Woche, Kopfarbeit 1/0]

`Kopfarbeit 1` bedeutet: zählt in den Mental-Load-Anteil.

**Farben und Schriften** stehen als CSS-Variablen oben in `styles.css`.

**Stundensatz** ist im Formular frei einstellbar; der Startwert steht in
`app.js` unter `rate`.

## Lizenz / Nutzung

© Ochsenglitter. Inhalte und Gestaltung sind nicht zur Weitergabe oder zum
Weiterverkauf bestimmt.
