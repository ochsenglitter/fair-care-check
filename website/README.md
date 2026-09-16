# ochsenglitter.de – Website der Kernmarke

Evergreen-Content- und SEO-Seite: Blog, Ressourcen, Lieblingsprodukte,
Newsletter. Kein Shop, kein Mitgliederbereich. Gebaut nach dem Briefing in
`quelle/2026-09-16-briefing-website.md`.

**Nicht verwechseln:** Die Verkaufsseiten für Sarah und Fenja sind ein eigenes
Projekt mit eigenem Designsystem – siehe
`../produktplanung/website-konzept.md`.

## Die Seiten

    index.html                          Start
    blog.html                           Blogübersicht mit den vier Säulen
    kategorie-weniger-denken.html       Mental Load, Organisation
    kategorie-weniger-machen.html       Systeme, Produkte, Haushalt
    kategorie-besser-kaufen.html        Produkttests, Empfehlungen
    kategorie-echtes-leben.html         persönliche Geschichten
    artikel-mental-load-reduzieren.html Musterartikel mit der Pflichtstruktur
    ressourcen.html                     Lead-Magneten, Juli bis Dezember
    lieblingsprodukte.html              Affiliate-Hub mit Werbekennzeichnung
    ueber-mich.html                     Antonia
    newsletter.html                     eigene Landingpage
    kooperationen.html                  Kontakt für Marken

Ansehen: Doppelklick auf `index.html`. Oder `python3 -m http.server 8000`.

Statisch, kein Build, keine Abhängigkeiten. Kopf und Fuß sind auf allen
Seiten identisch; der Fuß enthält den einen `/datenschutz/`-Link, Instagram
und das Newsletter-Formular.

**Alle Texte sind Entwürfe.** Sie sitzen in der Struktur richtig, damit du am
fertigen Bild entscheiden kannst – ersetzen musst du sie trotzdem, besonders
auf „Über mich".

## Aufbau von `styles.css`

| Abschnitt | Inhalt |
|---|---|
| Kernsystem | unverändert wie geliefert – nur gegen Canva anzupassen |
| Ergänzungen | Kopf, Navigation, Hero, Raster, Werbekennzeichnung, Produktkarte, Schritte, FAQ, Formulare, Artikel-Fließtext |
| Anbindung an WordPress | alles `.wp-block-…` |
| Mobil | unter 640 px |

Die Ergänzungen halten sich an den Stil des Kernsystems: Flächen in Creme-2,
Rahmen in Taupe, 2 px Radius. Keine neuen Farben, keine neuen Schriften.

Die WordPress-Anbindung ist nötig, weil WordPress sein Markup selbst erzeugt
(`.wp-block-post-title`, `.entry-content`, …). Eine Datei, die nur
`.og-`Klassen kennt, gestaltet dort fast nichts.

## Ein Punkt, der vor dem Launch geklärt sein muss

**Textkontrast.** Taupe und Rosé stimmen als Fläche, als Textfarbe sind sie zu
hell: 2,2:1 bzw. 2,5:1, nötig sind 4,5:1. Dafür gibt es `--og-taupe-text` und
`--og-rose-text` im selben Farbton, nur tiefer. Beim Canva-Abgleich mit
anpassen – sonst ist die Seite auf dem Handy im Hellen schlecht lesbar. Wer
die Originaltöne auch im Text will, löscht den markierten Block in
`styles.css`.

Dazu: Die Farbwerte sind laut Kommentar oben in der Datei aus dem Cover-Bild
geschätzt und noch gegen Canva zu prüfen.

## Regeln aus dem Briefing

- Editorial, viel Weißraum, ruhig, zeitlos.
- Keine Sticker, Emojis im Design, Cliparts, Farbverläufe, verspielten
  Elemente.
- Säulen-Kennzeichnung nur als Farbpunkt plus Kleinschrift, kein Badge.
- Kursive Playfair-Auszeichnung für **ein** Wort pro Headline, nicht mehr.
- Werbekennzeichnung sichtbar oben, nie im Fußbereich.
- Ein Footer-Link auf `/datenschutz/` deckt Impressum und Datenschutz ab.

## Die drei Designsysteme im Business

Sie bleiben absichtlich verschieden. Gemeinsamer Faden ist nur Playfair
Display für Headlines.

| System | Wofür |
|---|---|
| **Kernmarke** | diese Website |
| Produktseiten | Sarah, Fenja, Add-ons – steht noch aus |
| Care-Cards | Workbooks, Decks, Fair Care Check |
