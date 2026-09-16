# Bestandsaufnahme der Designwelten

Stand: 2026-09-16. Farbwerte **aus Screenshots der Live-Seiten ausgelesen**,
nicht geschätzt. Der Zugriff auf die Seiten selbst ist in der Arbeitsumgebung
gesperrt, die Screenshots stammen von Antonia.

## Was tatsächlich existiert

| Seite | Adresse | Stand |
|---|---|---|
| Fair Care Check | `ochsenglitter.github.io` | live |
| Sarah | `sarah-earlyaccess.netlify.app` | live, Early Access mit Warteliste |
| ochsenglitter.de | eigene Domain | live, Umfang unbekannt |
| Kernmarken-Website | `website/` im Repo | gebaut, nicht veröffentlicht |

**Sarah ist bereits online.** Nicht als Verkaufsseite, sondern als
Early-Access-Seite mit Anmeldung. Das verändert mehrere offene Fragen – siehe
unten.

## Die gemessenen Werte

### Hintergründe

| Seite | Wert |
|---|---|
| Fair Care Check | `#F5EDE1` |
| Sarah | `#FAF4F0` |
| neue Website | `#F7F3EE` |

Der größte Unterschied zwischen diesen drei Farben beträgt **15 von 255** in
einem einzelnen Kanal. Das ist mit bloßem Auge kaum zu trennen.

**Das ist der wichtigste Befund dieser Aufnahme:** Die Marke ist farblich
längst eine Familie. Was das Briefing als „drei bewusst getrennte Systeme"
beschreibt, ist in Wahrheit eine gemeinsame Grundfarbe mit drei
verschiedenen Akzenten.

### Akzentfarben

| Wert | Wo | Kontrast auf Creme |
|---|---|---|
| `#B27D5F` | Terrakotta – Wortmarke, Labels, kursive Headline im Fair Care Check | 3,2:1 |
| `#EB5086` | Pink – Buttons auf der Sarah-Seite | 3,2:1 |
| `#A12B50` | Beere – kursive Headline auf der Sarah-Seite | 6,4:1 |
| `#B6914C` | Gold – Kicker auf der Sarah-Seite | – |
| `#E3AFA6` | Rosé – Akzent der neuen Website | 1,7:1 |
| `#C98F86` | Rosé dunkel – Buttons der neuen Website | 2,5:1 |

Hier laufen die Welten auseinander, nicht beim Hintergrund.

### Weitere Unterschiede

- **Rundungen.** Fair Care Check: weich gerundete Karten. Sarah: vollrunde
  Pill-Buttons. Neue Website: `--og-radius: 2px`, laut Kommentar „bewusst
  fast kantig – editorial, nicht verspielt". Drei Formensprachen.
- **Schriften.** Fair Care Check: Cormorant Garamond + Mulish. Neue Website:
  Playfair Display + Montserrat. Sarah: Serifen-Display, genaue Schrift aus
  dem Screenshot nicht bestimmbar.
- **Gemeinsam in allen dreien:** cremefarbener Grund, Serifen-Display für
  Überschriften, **eine kursiv ausgezeichnete Zeile**, gesperrte
  Kleinkapitälchen als Label. Das ist bereits eine erkennbare Handschrift.

## Ein Lesbarkeitsproblem auf der Sarah-Seite

Weißer Text auf dem pinken Button `#EB5086` erreicht **3,49:1**.

Als großer Button-Text ist das zulässig – WCAG verlangt dort 3:1. Für jeden
kleineren Text auf dieser Farbe reicht es nicht, und viel Luft nach oben ist
auch beim großen Text nicht.

**Vorschlag ohne neue Farbe:** Das Beere `#A12B50` steht bereits auf der
Seite, in der kursiven Headline. Weißer Text darauf erreicht **7,05:1**.
Dieselbe Farbwelt, gleiche Wirkung, deutlich lesbarer – und die Seite wird
ruhiger, weil das laute Pink verschwindet.

## Was das für die offenen Fragen bedeutet

**D1 – Marke und Domain.** Sarah liegt auf einer `netlify.app`-Adresse. Das
ist faktisch eine Entscheidung gegen die Marken-Domain, die nie als solche
getroffen wurde. Eine Adresse wie `sarah-earlyaccess.netlify.app` wirkt
provisorisch, baut keinerlei Sichtbarkeit für `ochsenglitter.de` auf und
unterbricht den Weg Blog → Produkt an der auffälligsten Stelle.

**Vorschlag:** Auf `sarah.ochsenglitter.de` umziehen. Netlify bleibt als
technische Basis, es wird nur die eigene Domain davorgehängt – ein
CNAME-Eintrag. Ein Unterverzeichnis `ochsenglitter.de/sarah/` wäre für
Google noch etwas besser, ist bei WordPress-Hosting aber deutlich
aufwendiger. Die Subdomain ist der pragmatische Weg.

**D3 – Designsystem der Produktseiten.** Die Messung stützt den Vorschlag
„zwei Systeme statt drei": Die Grundfarbe ist bereits überall dieselbe. Was
die Marke uneinheitlich wirken lässt, sind die drei Akzente und die drei
Rundungssprachen – nicht die Struktur der Seiten.

**D7 – Sarah auf der Website.** Die Zeile „solange Sarah nicht live ist:
gar nichts" ist überholt. Es gibt eine Warteliste, und eine Warteliste darf
und soll beworben werden. Auf der Kernmarken-Website heißt das: kein
Verkauf, aber ein Hinweis mit Eintragung – idealerweise am Ende von
Artikeln, die von Schule handeln.

## Was an der Sarah-Seite inhaltlich richtig ist

Das gehört festgehalten, damit es beim Umbau nicht verloren geht:

- „Schulmail rein. Sarah macht den Rest." ist **Nutzen, nicht Funktion** –
  genau die Regel aus `marke-und-philosophie.md`.
- „Du musst nicht programmieren können und kein KI-Profi sein" nimmt den
  Haupteinwand vorweg.
- Es steht **kein konkreter Preis** auf der Seite. Das ist korrekt, solange
  die Preistabelle Arbeitsannahme ist (D5).
