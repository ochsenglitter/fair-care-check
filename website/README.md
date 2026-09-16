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

| Teil | Inhalt | Wirkt |
|---|---|---|
| 1 | Kernsystem, unverändert wie geliefert | – |
| 2 | Anbindung an die WordPress-Selektoren (`.wp-block-…`) | sofort |
| 3 | Helfer-Klassen für die Artikel-Bausteine (`.og-…`) | wenn im Block eingetragen |
| 4 | Ruhigere Gestaltung: Flächen und Rahmen raus, Weißraum rein | sofort |

Teil 2 ist der Grund, warum die Datei umgebaut wurde: WordPress erzeugt sein
Markup selbst. Eine Datei, die nur `.og-`-Klassen kennt, gestaltet auf einer
WordPress-Seite fast nichts.

Teil 4 ist der Aufräum-Schritt: Inhalt steht auf der Fläche statt in Kästen,
Gruppen hält der Weißraum zusammen, als Trennmittel bleibt die Haarlinie.
Farben, Schriften und Abstände stammen weiter allein aus dem Kernsystem –
geändert ist nur, wie viel davon sichtbar ist. Wer die kastigere Variante
zurück will, löscht Teil 4.

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
