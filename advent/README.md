# Stressfrei in den Advent

Die App zum 20-Tage-Vorlauf: ein To-do pro Tag ab dem 9. November, und an
allen Stellen, an denen ein Tag eine Antwort verlangt, steht die Liste dafür
gleich daneben.

**Produkteinordnung:** Bereich Weihnachten → **Christmas Add-on**
(`produktplanung/fenja/add-ons/christmas.md`). Nichts davon gehört zu Sarah
oder in den Fenja-Kern.

## Was die App macht

    Heute       Die Aufgabe von heute, liegen gebliebene Tage, Countdown
    Plan        Alle 20 Tage in drei Wochen, abhakbar
    Geschenke   Namen, Idee, Betrag, Status (offen → Idee → besorgt → verpackt)
    Feiern      Anlass, Datum, „wer bringt was mit", erledigt
    Kalender    24 Türchen planen, inklusive der Ideen, die nichts kosten
    Mehr        Budget in vier Posten, die beiden Notizen, Schlüsseldaten,
                Sicherungstext, Drucken

Die Ansicht „Heute" richtet sich nach dem echten Datum:

    vor dem 9.11.      Countdown bis Tag 1, Vorsatz-Feld
    9.–28.11.          Aufgabe des Tages, Nachholliste, Fortschritt
    29.11.–23.12.      Countdown bis Heiligabend, offene Geschenke, Schlüsseldaten
    24.–26.12.         Ruhe
    danach             Plan und Listen bleiben nutzbar

## Technik

Statisch: HTML, CSS, ein JavaScript. Kein Build, keine Abhängigkeiten, kein
Backend, kein Konto. Alle Eintragungen bleiben im Browser (`localStorage`) und
werden nirgendwohin übertragen.

    index.html            Grundgerüst, Schriften, Manifest-Einbindung
    styles.css            Design (Cormorant Garamond + Mulish, Ochsenglitter-Palette)
    app.js                Tagesdaten, Zustand, alle sechs Ansichten
    manifest.webmanifest  macht die Seite auf dem Handy zur Startbildschirm-App
    icon.svg              App-Symbol

Über *Teilen → Zum Home-Bildschirm* (iPhone) bzw. *Menü → App installieren*
(Android) liegt sie wie eine App auf dem Handy.

## Lokal testen

Doppelklick auf `index.html` genügt. Wer einen Server möchte:

    python3 -m http.server 8000

Dann `http://localhost:8000/advent/` aufrufen.

## Jahr wechseln

Der Plan ist auf **2026** datiert (9.–28. November, 1. Advent am 29.11.). Für
ein anderes Jahr in `app.js` oben anpassen:

    JAHR, ADVENT1, HEILIGABEND   die drei Konstanten
    TAGE[].d                     die zwanzig Tagesdaten
    SCHLUESSEL                   die Schlüsseldaten im Dezember

Der Text der zwanzig Tage steht ebenfalls in `TAGE` – Titel, Erklärung,
Merkzettel („Lieferzeit", „schwer", „Frist") und der Bereich, in den das
Ergebnis des Tages gehört.

## Daten sichern

Unter *Mehr → Deine Daten* steht der komplette Stand als Text. Kopieren,
irgendwo aufbewahren, auf einem zweiten Gerät wieder einfügen und
*Daten einspielen* drücken. Das ist der Ersatz für ein Konto – bewusst so.

## Lizenz / Nutzung

© Ochsenglitter. Inhalte und Gestaltung sind nicht zur Weitergabe oder zum
Weiterverkauf bestimmt.
