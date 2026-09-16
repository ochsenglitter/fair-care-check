# Website

Die neue Website der Produktfamilie (Sarah, Fenja, Add-ons). Struktur,
Seitenaufbau und Ausbaureihenfolge stehen in
`../produktplanung/website-konzept.md` – **vor dem Bauen lesen.**

## Dateien

    styles.css        Designsystem der Kernmarke. Verbindlich für alle Seiten.
    styleguide.html   Musterseite: jeder Baustein einmal in echt.

Die Musterseite im Browser öffnen (Doppelklick genügt) oder:

    python3 -m http.server 8000

## Aufbau von `styles.css`

Die Datei hat zwei Teile:

1. **Kernsystem** (oben, unverändert wie geliefert) – Farben, Typografie,
   Buttons, Karten, Callout, Zwischenfazit, Footer.
2. **Ergänzungen für die Website-Struktur** – Kopf und Navigation, Hero,
   Raster, Zuständigkeits-Tabelle, Setup-Schritte, Briefing-Mock, Preisblock,
   FAQ, Formular, Mobil-Anpassungen, Kontrastkorrekturen.

Der zweite Teil nutzt ausschließlich vorhandene Tokens. Neue Seiten bringen
keine eigenen Farben oder Schriften mit. Fehlt ein Baustein, wird er hier
ergänzt, nicht in der Seite.

## Zwei offene Punkte an der Datei

- **Farbwerte sind geschätzt.** Der Kommentar oben in `styles.css` sagt es:
  aus dem Cover-Bild abgeleitet. Vor dem Launch gegen die Canva-Werte
  abgleichen.
- **Textkontrast.** Taupe und Rosé sind als Fläche richtig, als Textfarbe zu
  hell (2,2:1 bzw. 2,5:1 – nötig sind 4,5:1). Dafür gibt es
  `--og-taupe-text` und `--og-rose-text` im selben Farbton. Beim Canva-Abgleich
  mit anpassen, sonst ist die Seite auf dem Handy im Hellen schlecht lesbar.

## Regeln, die aus der Produktarchitektur kommen

- Navigation nach **Lebensbereich**, nie nach Produktstufe.
- **Keine Vergleichsmatrix** Sarah gegen Fenja. Stattdessen die
  Zuständigkeits-Tabelle (`.og-table`).
- **Kein Preis auf einer Seite**, solange er Arbeitsannahme ist.
- „einmalig" steht **am Betrag**, nicht im Kleingedruckten.
- Kein Login, kein Kundenkonto, kein Mitgliederbereich.
