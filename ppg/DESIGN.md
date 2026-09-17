# PPG – Designsystem

**Stand:** 2026-09-17
**Status:** verbindlich für **alle** PPG-Materialien – Website, Angebote,
Pitchdecks, Referenzblätter, Profil-PDFs. Referenzumsetzung: `index.html`.

Das System gilt **nur für PPG**. Ochsenglitter hat ein eigenes, warmes
Designsystem (Cormorant Garamond + Mulish, Creme/Terrakotta) – die beiden
werden nie vermischt.

---

## Haltung

Die Seite soll aussehen wie eine **Projektakte in einer guten Kanzlei**, nicht
wie eine Agentur-Landingpage. Teuer wirkt hier nicht Dekoration, sondern:

1. **Platz.** Große Abstände, wenig pro Bildschirm. Was sich Raum leisten kann,
   wirkt souverän.
2. **Kontrast der Flächen.** Dunkle und helle Abschnitte im Wechsel statt einer
   durchgehend hellen Seite.
3. **Ein einziger Akzent.** Messing. Keine zweite Akzentfarbe.
4. **Zurückhaltung.** Keine Schatten, keine abgerundeten Ecken, keine
   Verläufe außer dem Hero-Ground, keine Icons, keine Emoji.

---

## Farben

| Token | Hex | Verwendung |
|---|---|---|
| `--night` | `#0E1417` | dunkle Abschnitte, Hero, Fuß |
| `--night-2` | `#141C20` | Abstufung innerhalb dunkler Flächen |
| `--paper` | `#F7F5F1` | helle Abschnitte |
| `--paper-2` | `#EFEBE4` | Kacheln, Porträtflächen |
| `--ink` | `#16191B` | Text auf hell |
| `--ink-soft` | `#5C6469` | Fließtext zweiter Ordnung auf hell |
| `--paper-soft` | `#B7BFC3` | Fließtext zweiter Ordnung auf dunkel |
| `--brass` | `#C2A06B` | Akzent auf dunkel |
| `--brass-deep` | `#A5844F` | Akzent auf hell (Kontrast) |
| `--hair` | `#DCD6CC` | Haarlinien auf hell |
| `--hair-night` | `#2A353A` | Haarlinien auf dunkel |

**Regel:** Messing ist nie Fläche für Text außer im gefüllten Button. Es
markiert: Eyebrow, Linien, Ziffern, Zahlen, Hover.

## Schrift

| Rolle | Schrift | Einsatz |
|---|---|---|
| **Display** | Libre Caslon Display, 400 | alle Überschriften, große Zahlen, römische Ziffern |
| **Text / UI** | Jost, 300/400/500 | Fließtext, Navigation, Buttons, Labels |

- Fließtext `font-weight:300`, `line-height:1.75` – das leichte Gewicht trägt
  die Wertigkeit.
- Überschriften `line-height:1.14`, `letter-spacing:-.01em`, `text-wrap:balance`.
- Labels und Buttons: Versalien, `letter-spacing:.2em` bis `.24em`,
  Größe `.66rem`–`.74rem`.
- Zeilenlänge im Fließtext: `--measure: 38rem`. Überschriften auf `ch` begrenzen
  (`max-width:18ch`–`20ch`).

## Raster und Abstände

- Container `max-width:72rem`, Seitenabstand `--gutter: clamp(1.25rem,6vw,5rem)`.
- Abschnittshöhe `--sec: clamp(4.5rem,11vw,9rem)` als `padding-block`.
- Trennung zwischen Inhalten über **Haarlinien**, nicht über Karten.
- Alles bricht bei ~52rem auf eine Spalte um.

## Bausteine

| Baustein | Aufbau |
|---|---|
| **Eyebrow** | Versalien, Messing, `.24em` Laufweite, darüber eine 3,5rem-Messinglinie (`.rule`) |
| **Hero** | dunkel, Text unten ausgerichtet, Radialverläufe als Ground, optionales Foto über `--hero-image` mit `mix-blend-mode:luminosity` und `opacity:.28` |
| **Liste** | nummeriert `01`–`08` in Caslon/Messing, Haarlinie je Zeile |
| **Schritte** | römische Ziffern `I`–`IV` in Messing, Oberlinie |
| **Zahlenblock** | siehe unten – eigene Regel |
| **Dossier** | Label links, Text rechts, Haarlinien, letzte Zeile hervorgehoben |
| **Porträt** | 4:5, Monogramm in Caslon/Messing als Platzhalter statt leerer Fläche |
| **Button** | rechteckig, 1px Rahmen, Versalien, füllt sich beim Hover |

## Zahlenblock – bindende Regel

Die **große Zahl ist der Umfang** (identifiziert, angestoßen, umgesetzt), die
**kleine Zahl ist der Nachweis** (realisiert). Aufbau von oben nach unten:

    identifiziert          ← Bereichslabel, Versalien, Messing, klein
    400.000 €              ← große Caslon-Zahl
    Nachforderungen        ← was es ist
    ─────────────────
    davon rund 265.000 € realisiert, Stand nach sechs Monaten

**Die Bedingung, ohne die das nicht geht:** Das Bereichslabel steht **immer
direkt über** der großen Zahl, und die realisierte Zahl steht **immer** darunter.
Eine große Zahl ohne beides ist eine Falschaussage – siehe die Nachweisregel in
`../strategie/profil-und-positionierung.md`.

## Umgang mit Fotos

Die Seite funktioniert ohne Fotos, gewinnt aber deutlich mit ihnen.

- **Hero:** `<header class="hero night" style="--hero-image:url(bild.jpg)">`
- **Porträts:** ersetzen die Monogramm-Kacheln (`.portrait`)
- Kein Stockmaterial. Ein echtes Porträt schlägt jedes gekaufte Bild.

## Was nicht vorkommt

Abgerundete Ecken · Schatten · Icons · Emoji · zweite Akzentfarbe ·
Farbverläufe außerhalb des Hero-Grounds · Animationen außer Hover-Übergängen ·
zentrierter Fließtext · Karten mit Rahmen und Radius.
