# ochsenglitter.de – Website der Kernmarke

Evergreen-Content- und SEO-Seite: Blog, Ressourcen, Lieblingsprodukte,
Newsletter. Kein Shop, kein Mitgliederbereich.

**Nicht verwechseln:** Die Verkaufsseiten für Sarah und Fenja sind ein
eigenes Projekt mit eigenem Designsystem – siehe
`../produktplanung/website-konzept.md`.

## Dateien

    styles.css              Designsystem, fertig für WordPress
    styleguide.html         Musterseite: jeder Baustein einmal in echt
    wordpress-umsetzung.md  Umsetzung Schritt für Schritt, Stand der Prüfung
    quelle/                 Originaldateien, unverändert

Musterseite ansehen: Doppelklick auf `styleguide.html`.

## Aufbau von `styles.css`

**Eine Datei, in Lesereihenfolge.** Nichts wird weiter unten wieder
zurückgenommen – was dort steht, gilt. Zum Einfügen ins WordPress-CSS-Feld
komplett kopieren.

| Abschnitt | Inhalt |
|---|---|
| Tokens | Farben, Textfarben, Schriften, Abstände, Lesespalten |
| Basis und Layout | Grundschrift, Überschriften, Container, Abstände |
| Komponenten | Säulen-Kennzeichnung, Karte, Newsletter-Block, Zwischenfazit, Werbekennzeichnung, Produktzeile, Schritte, Eingabefelder, Fußbereich |
| Anbindung an WordPress | alles `.wp-block-…` – Query Loop, Beitragstitel, Buttons, Zitat, Tabelle, Details-Block |
| Mobil | Anpassungen unter 640 px |

Der Unterschied zwischen den beiden mittleren Blöcken ist praktisch wichtig:

- Die **WordPress-Anbindung wirkt sofort**, ohne dass du im Editor etwas
  anfasst. Ohne sie gestaltet die Datei auf WordPress fast nichts, weil
  WordPress sein Markup selbst erzeugt (`.wp-block-post-title`,
  `.entry-content`, …) und die `.og-`Klassen dort nirgends stehen.
- Die **`.og-`Klassen** trägst du im Block unter *Erweitert › Zusätzliche
  CSS-Klasse* ein.

## Gestaltungsprinzip

Inhalt steht auf der Fläche, nicht in Kästen. Gruppen hält der Weißraum
zusammen, als Trennmittel bleibt die Haarlinie, als Auszeichnung der rosé
Strich – und der ist dem Zwischenfazit vorbehalten, damit er ein
Erkennungszeichen bleibt. Eingabefelder sind eine Linie, keine Box.
Schritt-Ziffern stehen frei, ohne Kreis.

Die Ursprungsfassung mit Füllungen und Rahmen liegt unverändert in `quelle/`.

## Die drei Designsysteme im Business

Sie bleiben absichtlich verschieden. Gemeinsamer Faden ist nur Playfair
Display für Headlines.

| System | Wofür |
|---|---|
| **Kernmarke** | diese Website |
| Produktseiten | Sarah, Fenja, Add-ons – steht noch aus |
| Care-Cards | Workbooks, Decks, Fair Care Check |

## Zwei offene Punkte an der Datei

- **Farbwerte sind geschätzt.** Der Kommentar oben in `styles.css` sagt es:
  aus dem Cover-Bild abgeleitet. Vor dem Launch gegen die Canva-Werte
  abgleichen.
- **Textkontrast.** Taupe und Rosé sind als Fläche richtig, als Textfarbe zu
  hell (2,2:1 bzw. 2,5:1 – nötig sind 4,5:1). Dafür gibt es
  `--og-taupe-text` und `--og-rose-text` im selben Farbton. Beim Canva-Abgleich
  mit anpassen, sonst ist die Seite auf dem Handy im Hellen schlecht lesbar.

## Regeln aus dem Briefing

- Editorial, viel Weißraum, ruhig, zeitlos.
- Keine Sticker, Emojis im Design, Cliparts, Farbverläufe, verspielten
  Elemente.
- Säulen-Kennzeichnung nur als Farbpunkt plus Kleinschrift, kein Badge.
- Kursive Playfair-Auszeichnung für **ein** Wort pro Headline, nicht mehr.
- Werbekennzeichnung sichtbar oben, nicht im Fußbereich.
- Ein Footer-Link auf `/datenschutz/` deckt Impressum und Datenschutz ab.
