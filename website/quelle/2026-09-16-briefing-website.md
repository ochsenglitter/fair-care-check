# Ochsenglitter Website – Briefing für Claude Code

Plattform: WordPress.com (ochsenglitter.de). Aktueller Tarif noch offen zu klären
(bestimmt, ob Custom-CSS-Panel, Full Site Editing / Global Styles, oder volles
Theme-Filesystem via SFTP zur Verfügung steht — siehe Abschnitt "Offene Punkte").

Bereits vorhanden: eine Seite unter ochsenglitter.de/datenschutz/, die sowohl
Impressum als auch Datenschutz abdeckt. Dieser eine Link wird im Footer aller
Seiten wiederverwendet.

## 1. Ziel der Website

Evergreen-SEO-Baustein der Marke Ochsenglitter (Instagram-Content wird hier
langfristig auffindbar gemacht: Newsletter, Blogartikel, Pinterest-Pins,
Lead-Magneten). Kein Shop, kein Mitgliederbereich — reine Content- und
Funnel-Seite mit Anbindung an Flodesk (Newsletter) und Amazon Storefront
(Affiliate).

## 2. Sitemap / Navigation

Reihenfolge im Hauptmenü:

1. **Start**
2. **Blog** (mit vier Unterkategorien, siehe unten)
3. **Ressourcen** (Lead-Magnet-Übersicht)
4. **Lieblingsprodukte** (Affiliate-Hub)
5. **Über mich**
6. **Newsletter** (eigene Landingpage)
7. **Kooperationen** (Kontaktseite für Marken)

Footer: Link auf /datenschutz/ (deckt Impressum + Datenschutz ab), Social-Icons
(Instagram), Newsletter-Formular.

## 3. Seiten im Detail

### 3.1 Startseite
- Kurze Positionierung / Claim ("Work smarter. Not harder.")
- Die 3 neuesten Blogartikel als Karten (Komponente `.og-card`)
- Newsletter-Anmeldung oberhalb des Falzes
- Verweis/Link auf Instagram

### 3.2 Blog — Kategorien (= die vier Content-Säulen)
Slugs exakt so anlegen, damit sie zur Instagram-Struktur passen:
- `weniger-denken` — Mental Load, Organisation
- `weniger-machen` — Systeme, Produkte, Haushalt
- `besser-kaufen` — Produkttests, Empfehlungen
- `echtes-leben` — persönliche Geschichten

Jede Kategorie erhält einen kurzen SEO-Text im Kategorie-Beschreibungsfeld.

### 3.3 Pflichtstruktur jedes Blogartikels
1. H1 = Fokus-Keyword
2. Teaser-Absatz mit Nutzenversprechen
3. Fließtext, gegliedert mit H2/H3
4. Zwischenfazit-Kasten "Das Wichtigste in Kürze" (Komponente `.og-summary`)
5. Newsletter-CTA nach dem zweiten Abschnitt (Komponente `.og-callout`)
6. Passender Lead-Magnet- oder Produktlink am Artikelende
7. FAQ-Block (3–4 Fragen) am Ende, orientiert an "Ähnliche Fragen" bei Google
8. Säulen-Kennzeichnung oben im Artikel (Komponente `.og-pillar`) — Farbpunkt +
   Kleinschrift, bewusst **kein** Sticker/Badge

### 3.4 Ressourcen-Seite
Eine Karte pro Lead-Magnet (Bild, ein Satz Nutzenversprechen, Flodesk-Formular
dahinter), sortiert nach Monat entsprechend dem bestehenden Redaktionsplan
(Juli–Dezember 2026, siehe Content-Kalender).

### 3.5 Lieblingsprodukte
Kuratierte Liste der Hero-Produkte aus der Produktbibliothek, verlinkt zum
Amazon Storefront. Klare Werbekennzeichnung, keine reine Verkaufsseite —
Fokus auf eigene Erfahrung.

### 3.6 Über mich
Persönliche Geschichte (u. a. Scheidungs-Serie), PM-Hintergrund, drei Kinder —
Vertrauensaufbau für Besucher:innen, die über Google/Pinterest kommen und die
Marke noch nicht kennen.

### 3.7 Newsletter-Landingpage
Eigene Seite mit klarem Nutzenversprechen (nicht nur ein Formularfeld).

### 3.8 Kooperationen
Kontaktseite für Markenanfragen, Link zum Mediakit.

## 4. Design-System

Eigenständiges Kernmarken-System — **bewusst getrennt** von den anderen
beiden Design-Systemen im Ochsenglitter-Business (Sarah/Fenja-Produktseiten
und die Care-Cards-Workbooks). Alle drei bleiben absichtlich unterschiedlich;
gemeinsamer Faden ist nur die Schrift Playfair Display für Headlines.

- Fonts: Playfair Display (Headlines) + Montserrat (Fließtext)
- Farben: Cream / Taupe / Anthrazit / Rosé (siehe CSS-Datei für Hex-Werte —
  aktuell aus dem Cover-Referenzbild geschätzt, noch mit den exakten
  Canva-Werten abzugleichen)
- Stil: editorial, viel Weißraum, ruhig, zeitlos — keine Sticker, Emojis im
  Design, Cliparts, Farbverläufe oder verspielten Elemente
- CSS-Basis: `ochsenglitter-website.css` (bereits erstellt, enthält
  Farbvariablen, Typografie, Button-, Karten-, Callout- und
  Zusammenfassungs-Komponenten)

## 5. Offene Punkte / für Claude Code zu klären

- **WordPress.com-Tarif von ochsenglitter.de**: bestimmt die Umsetzungsmethode
  - Premium: Custom-CSS-Panel → `ochsenglitter-website.css` direkt einfügen
  - Business/Commerce (Full Site Editing): Global Styles / theme.json-artige
    Struktur — Farben/Fonts zentral über Site-Editing-Tools setzen
  - Atomic (SFTP): volle Freiheit für eigenes Child-Theme
- WordPress.com-Verbindung war beim letzten Check nicht aktiv/kein Standort
  sichtbar — vor Umsetzung erneut prüfen bzw. neu autorisieren
- Exakte Hex-Werte der Marktenfarben aus Canva/Brand-Kit noch zu bestätigen
