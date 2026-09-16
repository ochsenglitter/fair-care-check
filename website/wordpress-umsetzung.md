# Umsetzung auf WordPress.com

Stand: 2026-09-16. Gehört zum Briefing in `quelle/`.

## 1. Was ich geprüft habe – und was blockiert

| Punkt | Ergebnis |
|---|---|
| WordPress.com-Verbindung | aktiv, aber **ohne Zugriff auf Sites** |
| Sites im verbundenen Konto | **null** |
| Zugriff auf `ochsenglitter.de` | abgelehnt: „You do not have permission to access this site" |
| Tarif von `ochsenglitter.de` | **nicht feststellbar**, weil kein Zugriff |
| Live-Seite ansehen | **nicht möglich**, die Domain ist in dieser Umgebung gesperrt |

Zwei Dinge sind nötig, bevor ich auf der Seite selbst etwas tun kann:

1. **WordPress.com neu verbinden – mit dem Konto, dem `ochsenglitter.de`
   gehört.** Die Verbindung antwortet zwar, das verbundene Konto sieht aber
   keine einzige Website. Entweder ist es ein anderes Konto, oder die
   Freigabe umfasst die Seite nicht.
2. **`ochsenglitter.de` in der Netzwerk-Freigabe dieser Arbeitsumgebung
   erlauben**, sonst kann ich nicht einmal nachsehen, welches Theme läuft.

Solange beides offen ist, arbeite ich blind – deshalb ist alles Folgende so
gebaut, dass es **unabhängig vom Tarif** funktioniert.

### Was der Tarif-Katalog hergibt

Abgefragt am 2026-09-16, Jahrespreise in Euro:

| Tarif | Preis/Jahr | Für uns entscheidend |
|---|---|---|
| Personal | 48 € | Plugins, Schriften und Farben seitenweit anpassen |
| Premium | 96 € | dazu Google Analytics, alle Premium-Themes |
| Business | 300 € | dazu **SFTP/SSH, WP-CLI, GitHub Deployments** |
| Commerce | 540 € | dazu Shop-Funktionen – für uns irrelevant |

Zwei Korrekturen am Briefing:

- **Ein eigenes Child-Theme über SFTP gibt es erst ab Business (300 €/Jahr).**
- „Schriften und Farben seitenweit anpassen" listet der Katalog schon ab
  Personal. Das Custom-CSS-Feld taucht in den Tarifkarten gar nicht auf – ob
  es im aktuellen Tarif vorhanden ist, sehe ich erst mit Zugriff.

**Empfehlung:** Kein Upgrade kaufen, bevor der Tarif feststeht. Für eine
Content- und SEO-Seite ohne Shop reicht der kleinste Tarif, in dem das
Custom-CSS-Feld verfügbar ist. Business lohnt sich nur, wenn wirklich ein
eigenes Theme gepflegt werden soll – für diese Seite ist das Aufwand ohne
Gegenwert.

## 2. Warum die CSS-Datei umgebaut werden musste

WordPress erzeugt sein Markup selbst. Eine Datei, die nur `.og-…`-Klassen
kennt, gestaltet auf einer WordPress-Seite **fast nichts** – die Klassen
stehen dort schlicht nirgends. Ein Blogartikel kommt als
`.wp-block-post-title`, `.entry-content`, `.wp-block-details` und so weiter.

`styles.css` hat deshalb jetzt drei Teile:

| Teil | Inhalt | Wirkt |
|---|---|---|
| 1 | Kernsystem, unverändert wie geliefert | – |
| 2 | Anbindung an die echten WordPress-Selektoren | sofort, ohne Handgriff im Editor |
| 3 | Helfer-Klassen für die Artikel-Bausteine | wenn du die Klasse im Block einträgst |

Das Original liegt unverändert in `quelle/`.

## 3. Umsetzung, je nach Tarif

### Weg A – Custom-CSS-Feld (falls im Tarif enthalten)

1. `styles.css` vollständig kopieren.
2. WordPress-Adminbereich → **Design › Customizer › Zusätzliches CSS**.
3. Einfügen, speichern.

Der `@import` für die Schriften steht in Zeile 8 und muss die **erste Zeile**
im Feld bleiben, sonst ignoriert der Browser ihn.

### Weg B – Global Styles (jedes Block-Theme)

Farben und Schriften zentral im **Site-Editor › Stile** setzen: Playfair
Display für Überschriften, Montserrat für Fließtext, die vier Farben als
Palette. Danach trotzdem Teil 2 und 3 der CSS-Datei ergänzen – Global Styles
kennt keine Zusammenfassungs-Kästen und keine Werbekennzeichnung.

### Weg C – Child-Theme über SFTP (ab Business)

Nur sinnvoll, wenn die Seite dauerhaft eigenständig gepflegt wird. Mehr
Aufwand, kein sichtbarer Unterschied für die Leserin.

## 4. Seiten und Menü anlegen

Reihenfolge im Hauptmenü genau so:

    Start · Blog · Ressourcen · Lieblingsprodukte · Über mich ·
    Newsletter · Kooperationen

Fußbereich: Link auf `/datenschutz/` (deckt Impressum und Datenschutz ab),
Instagram, Newsletter-Formular.

## 5. Blog-Kategorien

Als Kategorien anlegen, Slugs **exakt** so – sie müssen zur
Instagram-Struktur passen und später nicht mehr geändert werden, weil sonst
alle Links brechen:

| Kategorie | Slug | Inhalt |
|---|---|---|
| Weniger denken | `weniger-denken` | Mental Load, Organisation |
| Weniger machen | `weniger-machen` | Systeme, Produkte, Haushalt |
| Besser kaufen | `besser-kaufen` | Produkttests, Empfehlungen |
| Echtes Leben | `echtes-leben` | persönliche Geschichten |

Jede Kategorie bekommt einen kurzen Text ins **Beschreibungsfeld**. Der wird
auf der Archivseite ausgegeben und ist der einzige Ort, an dem eine
Kategorieseite für Google überhaupt Inhalt hat. Zwei bis drei Sätze, die das
Fokus-Keyword der Kategorie enthalten.

## 6. Pflichtstruktur eines Artikels – Block für Block

| # | Baustein | Block in WordPress | Klasse eintragen |
|---|---|---|---|
| 1 | Säulen-Kennzeichnung | Absatz | `og-pillar` |
| 2 | H1 = Fokus-Keyword | Titel | – |
| 3 | Teaser mit Nutzenversprechen | Absatz | `og-teaser` |
| 4 | Fließtext | Absatz, Überschrift H2/H3 | – |
| 5 | „Das Wichtigste in Kürze" | Gruppe | `og-summary` |
| 6 | Newsletter-CTA nach Abschnitt 2 | Gruppe mit Flodesk-Einbettung | `og-callout` |
| 7 | Anleitung in Schritten (optional) | Nummerierte Liste | `og-steps` |
| 8 | Lead-Magnet oder Produktlink | Absatz oder Button | – |
| 9 | FAQ, 3–4 Fragen | **Details-Block** (in WordPress enthalten) | – |

Zu Punkt 9: Der Details-Block bringt echtes `<details>`-Markup mit. Das ist
für Google auslesbar und braucht kein Plugin. Die Fragen an „Ähnliche Fragen"
in der Google-Suche orientieren, wie im Briefing vorgesehen.

Die Klasse trägst du im Editor rechts unter **Erweitert › Zusätzliche
CSS-Klasse** ein.

**Tipp:** Wenn der erste Artikel steht, ihn als **Vorlage** speichern
(Optionen › Als Muster speichern). Dann ist die Pflichtstruktur bei jedem
weiteren Artikel ein Klick statt neun.

## 7. Flodesk und Amazon

- **Flodesk:** Das Formular als Einbettungscode in einen **Individuelles
  HTML**-Block, den Block in eine Gruppe mit der Klasse `og-callout`. Die
  Feld- und Button-Gestaltung kommt dann aus unserer Datei.
- **Amazon:** Die Werbekennzeichnung steht **oben auf der Seite und oben im
  Artikel**, sichtbar vor dem ersten Link – nicht im Fußbereich. Dafür gibt es
  `og-ad-notice`. Auf der Seite „Lieblingsprodukte" gehört sie über die erste
  Produktkarte.

## 8. Was ich ohne Zugriff nicht liefern kann

- Prüfen, welches Theme läuft und ob es ein Block-Theme ist
- Kategorien, Seiten und Menü tatsächlich anlegen
- Das CSS auf der echten Seite gegentesten
- Sagen, ob der Tarif das Custom-CSS-Feld enthält

Sobald die Verbindung steht und die Domain freigegeben ist, ist das
Anlegen der Struktur eine Sache von einer Sitzung.
