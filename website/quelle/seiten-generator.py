# -*- coding: utf-8 -*-
"""Erzeugt die statischen Seiten der Ochsenglitter-Website aus dem Briefing."""
import os, html

OUT = '/home/user/fair-care-check/website'

NAV = [
    ('index.html', 'Start'),
    ('blog.html', 'Blog'),
    ('ressourcen.html', 'Ressourcen'),
    ('lieblingsprodukte.html', 'Lieblingsprodukte'),
    ('ueber-mich.html', 'Über mich'),
    ('newsletter.html', 'Newsletter'),
    ('kooperationen.html', 'Kooperationen'),
]

FAVICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'"
           "%3E%3Crect width='64' height='64' fill='%23F7F3EE'/%3E%3Ccircle cx='32' cy='32' r='8'"
           " fill='%23E3AFA6'/%3E%3C/svg%3E")

def form(note='Kein Spam. Abmeldung jederzeit.', button='Eintragen', left=False, idx='mail'):
    cls = 'og-form og-form--left' if left else 'og-form'
    return f'''<form class="{cls}" action="#" method="post">
        <label class="og-skip" for="{idx}">E-Mail-Adresse</label>
        <input id="{idx}" type="email" name="email" placeholder="deine@mailadresse.de" required>
        <button class="og-button" type="submit">{button}</button>
        <p class="og-form__note">{note}</p>
      </form>'''

def page(filename, title, description, body, active=None):
    def nav_item(h, t):
        cur = ' aria-current="page"' if h == active else ''
        return '<a href="%s"%s>%s</a>' % (h, cur, html.escape(t))
    nav = '\n      '.join(nav_item(h, t) for h, t in NAV)
    doc = f'''<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>{html.escape(title)} · Ochsenglitter</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#F7F3EE">
<meta name="description" content="{html.escape(description)}">
<meta property="og:title" content="{html.escape(title)} · Ochsenglitter">
<meta property="og:description" content="{html.escape(description)}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="styles.css">
<link rel="icon" href="{FAVICON}">
</head>
<body>

<a class="og-skip" href="#inhalt">Zum Inhalt springen</a>

<header class="og-header">
  <div class="og-container og-container--wide og-header__inner">
    <a class="og-logo" href="index.html">Ochsenglitter</a>
    <nav class="og-nav" aria-label="Hauptmenü">
      {nav}
    </nav>
  </div>
</header>

<main id="inhalt">
{body}
</main>

<footer class="og-footer">
  <div class="og-container">
    <h3>Der Newsletter</h3>
    <p>Einmal die Woche ein Gedanke, der dir Arbeit abnimmt.</p>
    {form(idx='mail-footer')}
    <hr class="og-divider">
    <p><a href="/datenschutz/">Impressum &amp; Datenschutz</a> ·
       <a href="https://www.instagram.com/ochsenglitter/" rel="me noopener">Instagram</a></p>
    <p>© Ochsenglitter</p>
  </div>
</footer>

</body>
</html>
'''
    with open(os.path.join(OUT, filename), 'w', encoding='utf-8') as f:
        f.write(doc)
    return filename

# ---------------------------------------------------------------- Startseite

ARTIKEL = [
    ('Weniger denken', 'Mental Load reduzieren: der erste Schritt',
     'Warum Listen allein nichts ändern – und was stattdessen hilft.',
     'artikel-mental-load-reduzieren.html'),
    ('Weniger machen', 'Die Wäsche-Routine, die bei uns wirklich hält',
     'Ein System für fünf Personen, das auch ohne mich weiterläuft.', '#'),
    ('Besser kaufen', 'Saugroboter im Alltagstest: nach zwei Jahren',
     'Was ich heute wieder kaufen würde und was nicht.', '#'),
]

karten = '\n      '.join(
    f'''<a class="og-card" href="{link}">
        <span class="og-pillar">{pil}</span>
        <h3>{t}</h3>
        <p>{te}</p>
      </a>''' for pil, t, te, link in ARTIKEL)

page('index.html', 'Work smarter. Not harder.',
     'Weniger im Kopf behalten, weniger selbst machen, besser kaufen. Mental Load, '
     'Familienorganisation und Haushaltshelfer – aus dem echten Alltag mit drei Kindern.',
     f'''<section class="og-hero">
  <div class="og-container">
    <h1>Work smarter. <em class="og-highlight">Not harder.</em></h1>
    <p class="og-hero__lead">Weniger im Kopf behalten, weniger selbst machen,
    besser kaufen – und trotzdem ein echtes Leben mit drei Kindern.</p>
    <div class="og-hero__actions">
      <a class="og-button" href="newsletter.html">Newsletter abonnieren</a>
      <a class="og-button og-button--outline" href="blog.html">Zum Blog</a>
    </div>
  </div>
</section>

<section class="og-section">
  <div class="og-container">
    <div class="og-callout">
      <h3>Einmal die Woche, sonntags</h3>
      <p>Ein Gedanke, der dir Arbeit abnimmt. Keine Ratgeber-Sprüche,
      sondern was bei uns tatsächlich funktioniert hat.</p>
      {form(idx='mail-start')}
    </div>
  </div>
</section>

<section class="og-section">
  <div class="og-container og-container--wide">
    <h2>Neu im Blog</h2>
    <div class="og-grid">
      {karten}
    </div>
  </div>
</section>

<section class="og-section">
  <div class="og-container">
    <h2>Und täglich auf Instagram</h2>
    <p>Dort entsteht der Alltag, aus dem die Artikel hier werden: Systeme,
    die halten, Produkte, die sich lohnen, und die Tage, an denen nichts
    davon klappt.</p>
    <p><a class="og-button og-button--outline"
      href="https://www.instagram.com/ochsenglitter/" rel="me noopener">@ochsenglitter</a></p>
  </div>
</section>''', active='index.html')

# ---------------------------------------------------------------- Blog

KATEGORIEN = [
    ('weniger-denken', 'Weniger denken', 'Mental Load und Organisation',
     'Wer trägt was, wer denkt woran – und wie man Denkarbeit tatsächlich abgibt, '
     'statt sie nur aufzuschreiben.'),
    ('weniger-machen', 'Weniger machen', 'Systeme, Produkte, Haushalt',
     'Routinen und Helfer, die Arbeit wirklich abnehmen. Getestet im Alltag '
     'einer fünfköpfigen Familie.'),
    ('besser-kaufen', 'Besser kaufen', 'Produkttests und Empfehlungen',
     'Was sich gelohnt hat, was im Schrank verstaubt – und woran man das vorher erkennt.'),
    ('echtes-leben', 'Echtes Leben', 'Persönliche Geschichten',
     'Trennung, Neuanfang, Muttersein zwischen Job und Chaos. Die Texte, '
     'die keine Anleitung sind.'),
]

kat_karten = '\n      '.join(
    f'''<a class="og-card" href="kategorie-{slug}.html">
        <span class="og-pillar">{name}</span>
        <h3>{unter}</h3>
        <p>{txt}</p>
      </a>''' for slug, name, unter, txt in KATEGORIEN)

page('blog.html', 'Blog',
     'Vier Themenbereiche: weniger denken, weniger machen, besser kaufen, echtes Leben.',
     f'''<section class="og-hero">
  <div class="og-container">
    <h1>Blog</h1>
    <p class="og-hero__lead">Vier Bereiche. Einer nimmt dir Denkarbeit ab,
    einer Handarbeit, einer Fehlkäufe – und einer ist einfach ehrlich.</p>
  </div>
</section>

<section class="og-section">
  <div class="og-container og-container--wide">
    <div class="og-grid">
      {kat_karten}
    </div>
  </div>
</section>

<section class="og-section">
  <div class="og-container og-container--wide">
    <h2>Zuletzt erschienen</h2>
    <div class="og-grid">
      {karten}
    </div>
  </div>
</section>''', active='blog.html')

# ---------------------------------------------------------------- Kategorieseiten

# Der Einleitungstext jeder Kategorie steht auf WordPress im
# Beschreibungsfeld der Kategorie. Er ist der einzige eigene Inhalt, den
# eine Archivseite fuer Google hat - deshalb gehoert das Fokus-Keyword hinein.
KAT_TEXTE = {
 'weniger-denken': (
   'Mental Load ist die Arbeit, die niemand sieht: daran denken, dass die '
   'Sportsachen mitmüssen. Wissen, wann der Beitrag abgebucht wird. Hier sammeln '
   'sich die Artikel, die diese Denkarbeit sichtbar machen – und die zeigen, wie '
   'sie tatsächlich die Person wechselt, statt nur auf eine Liste zu wandern.',
   [('Mental Load reduzieren: der erste Schritt',
     'Warum Listen allein nichts ändern – und was stattdessen hilft.',
     'artikel-mental-load-reduzieren.html'),
    ('Der Sonntagabend-Check in zehn Minuten',
     'Die Woche einmal durchgehen, damit sie nicht dich durchgeht.', '#'),
    ('Zuständigkeit statt Aufgabe übergeben',
     'Der Unterschied entscheidet, ob du weiter erinnern musst.', '#')]),
 'weniger-machen': (
   'Haushalt und Familienlogistik lassen sich nicht wegorganisieren, aber sie '
   'lassen sich anders bauen. Routinen, die ohne Erinnerung laufen, und Helfer, '
   'die wirklich Arbeit abnehmen – getestet im Alltag einer fünfköpfigen Familie.',
   [('Die Wäsche-Routine, die bei uns wirklich hält',
     'Ein System für fünf Personen, das auch ohne mich weiterläuft.', '#'),
    ('Morgens ohne Diskussion aus dem Haus',
     'Was wir abends vorbereiten, damit früh nichts mehr verhandelt wird.', '#'),
    ('Der Wochenplan, der auch bei Chaos funktioniert',
     'Struktur mit eingebautem Puffer statt perfektem Zeitplan.', '#')]),
 'besser-kaufen': (
   'Jeder Fehlkauf kostet zweimal: einmal Geld und einmal Platz. Hier steht, '
   'welche Haushaltshelfer und Familienprodukte sich im Dauerbetrieb bewährt '
   'haben, welche im Schrank verstauben – und woran man das vorher erkennt.',
   [('Saugroboter im Alltagstest: nach zwei Jahren',
     'Was ich heute wieder kaufen würde und was nicht.', '#'),
    ('Fünf Küchenhelfer, die geblieben sind',
     'Und drei, die nach vier Wochen wieder weg waren.', '#'),
    ('Woran du einen Fehlkauf vorher erkennst',
     'Drei Fragen, die mir viel Geld gespart haben.', '#')]),
 'echtes-leben': (
   'Nicht jeder Text ist eine Anleitung. Hier geht es um Trennung, Neuanfang '
   'und Muttersein zwischen Job und Chaos – ohne Filter, ohne Ratgeber-Ton und '
   'ohne das Versprechen, dass am Ende alles ordentlich ist.',
   [('Als die Ehe endete, endete auch mein System',
     'Warum ich alles noch einmal neu bauen musste.', '#'),
    ('Alleinerziehend und berufstätig: die ersten Monate',
     'Was wirklich geholfen hat und was nur gut klang.', '#'),
    ('Der Tag, an dem ich alles hingeschmissen habe',
     'Und was ich daraus über Belastungsgrenzen gelernt habe.', '#')]),
}

for slug, name, unter, kurz in KATEGORIEN:
    text, artikel = KAT_TEXTE[slug]
    kart = '\n      '.join(
        f'''<a class="og-card" href="{link}">
        <span class="og-pillar">{name}</span>
        <h3>{t}</h3>
        <p>{te}</p>
      </a>''' for t, te, link in artikel)
    page(f'kategorie-{slug}.html', name,
         f'{unter}: {kurz}',
         f'''<section class="og-hero">
  <div class="og-container">
    <span class="og-pillar">{name}</span>
    <h1>{unter}</h1>
    <p class="og-teaser">{text}</p>
  </div>
</section>

<section class="og-section">
  <div class="og-container og-container--wide">
    <div class="og-grid">
      {kart}
    </div>
  </div>
</section>''', active='blog.html')

# ---------------------------------------------------------------- Artikel

page('artikel-mental-load-reduzieren.html', 'Mental Load reduzieren',
     'Mental Load reduzieren: Warum Listen nichts ändern und wie du Zuständigkeiten '
     'statt Aufgaben abgibst.',
     f'''<article class="og-section og-article">
  <div class="og-container">

    <span class="og-pillar">Weniger denken</span>
    <h1>Mental Load reduzieren</h1>
    <p class="og-meta">16. September 2026 · 6 Minuten</p>

    <p class="og-teaser">Nach diesem Artikel weißt du, welche drei Aufgaben du
    diese Woche abgeben kannst – ohne dass danach jemand bei dir nachfragen muss.</p>

    <h2>Warum Listen das Problem nicht lösen</h2>
    <p>Eine Liste verschiebt die Denkarbeit nicht, sie schreibt sie nur auf.
    Wer die Liste führt, denkt weiter an alles darauf. Das Tragen bleibt also,
    wo es vorher war – es ist nur besser dokumentiert.</p>
    <p>Deshalb fühlt sich das neue System nach zwei Wochen wieder an wie vorher.
    Nicht, weil du es falsch machst. Sondern weil eine Liste die falsche
    Stellschraube ist.</p>

    <blockquote>Ich wollte mich nicht besser organisieren. Ich wollte weniger
    organisieren müssen.</blockquote>

    <h2>Was stattdessen funktioniert</h2>
    <p>Nicht die Aufgabe abgeben, sondern die Zuständigkeit. „Kannst du heute
    die Wäsche machen?" ist eine Aufgabe – du denkst weiter daran. „Wäsche
    gehört dir, komplett" ist eine Zuständigkeit. Der Unterschied entscheidet,
    ob du weiter erinnern musst.</p>

    <div class="og-summary">
      <strong>Das Wichtigste in Kürze:</strong> Aufgaben abgeben entlastet für
      einen Tag. Zuständigkeiten abgeben entlastet dauerhaft – weil das
      Mitdenken mitgeht.
    </div>

    <div class="og-callout">
      <h3>Hol dir die Zuständigkeiten-Übersicht</h3>
      <p>Eine Seite zum gemeinsamen Ausfüllen. Kostenlos, direkt per Mail.</p>
      {form(button='Schicken', idx='mail-artikel')}
    </div>

    <h2>In drei Schritten</h2>
    <ol class="og-steps">
      <li><strong>Aufschreiben</strong>Eine Woche lang alles notieren, woran nur
      du denkst. Nicht bewerten, nur sammeln.</li>
      <li><strong>Sortieren</strong>Was davon muss wirklich von dir kommen? Bei
      den meisten Punkten lautet die ehrliche Antwort: nein.</li>
      <li><strong>Übergeben</strong>Nicht die Aufgabe, die Zuständigkeit. Inklusive
      der Entscheidung, wann und wie sie erledigt wird.</li>
    </ol>

    <h2>Womit du diese Woche anfangen kannst</h2>
    <p>Nimm einen einzigen Bereich – nicht alles gleichzeitig. Wäsche, Essen
    oder Kita-Kommunikation sind gute Kandidaten, weil sie klar abgrenzbar sind.</p>
    <p><strong>Passend dazu:</strong>
    <a href="ressourcen.html">die Zuständigkeiten-Übersicht als PDF</a> –
    oder die <a href="lieblingsprodukte.html">Helfer, die bei uns im Einsatz sind</a>.</p>

    <h2>Häufige Fragen</h2>
    <div class="og-faq">
      <details open>
        <summary>Wie fange ich an, wenn ich schon überfordert bin?</summary>
        <p>Mit einer einzigen Kategorie. Der Versuch, alles auf einmal zu
        sortieren, ist selbst wieder Mental Load.</p>
      </details>
      <details>
        <summary>Was, wenn mein Partner nicht mitzieht?</summary>
        <p>Dann ist die Übergabe das Thema, nicht die Liste. Eine Zuständigkeit
        muss vollständig wechseln – halb abgegeben heißt weiter mitdenken.</p>
      </details>
      <details>
        <summary>Wie lange dauert es, bis das hält?</summary>
        <p>Die Bestandsaufnahme eine Woche. Bis es sich normal anfühlt, eher
        zwei Monate. Rückfälle gehören dazu.</p>
      </details>
      <details>
        <summary>Funktioniert das auch, wenn ich alleinerziehend bin?</summary>
        <p>Ja, aber anders: Dann geht es weniger ums Abgeben an Erwachsene und
        mehr darum, Aufgaben ganz zu streichen oder an die Kinder zu übergeben.</p>
      </details>
    </div>

  </div>
</article>''', active='blog.html')

# ---------------------------------------------------------------- Ressourcen

LEADS = [
    ('Juli', 'Zuständigkeiten-Übersicht', 'Wer trägt was – auf einer Seite, zum Ausfüllen zu zweit.'),
    ('August', 'Schulstart-Checkliste', 'Damit in der ersten Woche nichts hinterherläuft.'),
    ('September', 'Wochenplan-Vorlage', 'Eine Struktur, die auch hält, wenn die Woche kippt.'),
    ('Oktober', 'Herbstferien-Planer', 'Betreuung, Aktivitäten und freie Tage auf einen Blick.'),
    ('November', 'Geschenke-Liste', 'Alle Anlässe bis Weihnachten, einmal durchdacht.'),
    ('Dezember', 'Advents-Countdown', 'Vier Wochen ohne das Gefühl, etwas vergessen zu haben.'),
]
lead_karten = '\n      '.join(
    f'''<div class="og-card">
        <span class="og-pillar">{m}</span>
        <h3>{t}</h3>
        <p>{te}</p>
        {form(note='Kommt sofort per Mail.', button='Holen', left=True, idx='mail-' + t.lower().replace(' ', '-').replace('ä','ae').replace('ü','ue').replace('ö','oe'))}
      </div>''' for m, t, te in LEADS)

page('ressourcen.html', 'Ressourcen',
     'Kostenlose Vorlagen und Checklisten für Familienorganisation – eine pro Monat.',
     f'''<section class="og-hero">
  <div class="og-container">
    <h1>Alles zum <em class="og-highlight">Mitnehmen</em></h1>
    <p class="og-hero__lead">Jeden Monat eine Vorlage, die genau das Problem
    löst, das gerade dran ist. Kostenlos, direkt per Mail.</p>
  </div>
</section>

<section class="og-section">
  <div class="og-container og-container--wide">
    <div class="og-grid">
      {lead_karten}
    </div>
  </div>
</section>''', active='ressourcen.html')

# ---------------------------------------------------------------- Lieblingsprodukte

PRODUKTE = [
    ('Der Fensterroboter', 'Seit zwei Jahren im Einsatz. Nimmt mir die Aufgabe ab, die ich am '
     'längsten vor mir hergeschoben habe. Laut, aber gründlich.'),
    ('Die Beschriftungsmaschine', 'Klingt übertrieben, hat aber die Frage „wo gehört das hin" '
     'aus unserem Haushalt entfernt. Kinder räumen ein, ohne zu fragen.'),
    ('Der Wäscheständer mit zwei Ebenen', 'Unspektakulär, aber er hat eine komplette '
     'Wäscheladung Platz. Das spart pro Woche einen Durchgang.'),
    ('Die Brotdosen mit Fächern', 'Drei Kinder, drei Vorlieben, ein Deckel. Seit dem Wechsel '
     'kommt nichts mehr ungegessen zurück.'),
]
prod = '\n    '.join(
    f'''<div class="og-product">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23EDE8E0'/%3E%3C/svg%3E" alt="">
      <div>
        <h3>{t}</h3>
        <p>{te}</p>
        <a class="og-product__link" href="#">Bei Amazon ansehen →</a>
      </div>
    </div>''' for t, te in PRODUKTE)

page('lieblingsprodukte.html', 'Lieblingsprodukte',
     'Die Haushaltshelfer, die bei uns wirklich im Einsatz sind – mit ehrlicher Einschätzung '
     'nach echtem Gebrauch.',
     f'''<section class="og-hero">
  <div class="og-container">
    <h1>Was bei uns <em class="og-highlight">wirklich</em> im Einsatz ist</h1>
    <p class="og-hero__lead">Keine Bestenliste aus dem Internet. Nur Dinge, die
    hier stehen, benutzt werden und Arbeit abnehmen.</p>
  </div>
</section>

<section class="og-section">
  <div class="og-container">
    <p class="og-ad-notice"><strong>Werbung</strong><br>
    Die Links führen zu meinem Amazon-Storefront. Kaufst du darüber, bekomme
    ich eine kleine Provision – für dich ändert sich am Preis nichts. Hier
    steht ausschließlich, was bei uns tatsächlich in Gebrauch ist.</p>

    {prod}

    <div class="og-callout">
      <h3>Bevor du kaufst</h3>
      <p>Im Newsletter schreibe ich auch, was sich <em>nicht</em> gelohnt hat.
      Das spart meistens mehr Geld als jede Empfehlung.</p>
      {form(idx='mail-produkte')}
    </div>
  </div>
</section>''', active='lieblingsprodukte.html')

# ---------------------------------------------------------------- Über mich

page('ueber-mich.html', 'Über mich',
     'Antonia, drei Kinder, Projektmanagerin. Warum es Ochsenglitter gibt.',
     f'''<section class="og-hero">
  <div class="og-container">
    <span class="og-pillar">Über mich</span>
    <h1>Hallo, ich bin <em class="og-highlight">Antonia</em></h1>
    <p class="og-hero__lead">Drei Kinder, ein Job im Projektmanagement und die
    feste Überzeugung, dass Familienorganisation kein Charakterzug ist,
    sondern ein System.</p>
  </div>
</section>

<section class="og-section og-article">
  <div class="og-container">
    <h2>Wie das hier angefangen hat</h2>
    <p>Im Job habe ich jahrelang Projekte strukturiert: Zuständigkeiten klären,
    Abhängigkeiten sichtbar machen, Dinge aus Köpfen in Systeme holen. Zuhause
    habe ich genau das nicht gemacht – da habe ich alles selbst im Kopf
    behalten und mich gewundert, warum ich müde bin.</p>

    <div class="og-summary">
      <strong>Der Satz, der alles ausgelöst hat:</strong> Ich wollte mich nicht
      besser organisieren. Ich wollte weniger organisieren müssen.
    </div>

    <h2>Die Trennung</h2>
    <p>Als meine Ehe zu Ende ging, ist das Thema vom Nebenschauplatz zur
    Hauptsache geworden. Plötzlich gab es keine zweite Person mehr, an die sich
    etwas abgeben ließ – und trotzdem musste alles laufen. Darüber schreibe ich
    in <a href="kategorie-weniger-denken.html">Echtes Leben</a>, ohne Filter
    und ohne Ratgeber-Ton.</p>

    <h2>Was du hier findest</h2>
    <ul>
      <li><strong>Weniger denken</strong> – Mental Load sichtbar machen und abgeben.</li>
      <li><strong>Weniger machen</strong> – Routinen und Helfer, die halten.</li>
      <li><strong>Besser kaufen</strong> – was sich gelohnt hat, was nicht.</li>
      <li><strong>Echtes Leben</strong> – die Texte ohne Anleitung.</li>
    </ul>

    <div class="og-callout">
      <h3>Wenn du magst, bleib in Kontakt</h3>
      <p>Einmal die Woche ein Gedanke, der dir Arbeit abnimmt.</p>
      {form(idx='mail-ueber')}
    </div>
  </div>
</section>''', active='ueber-mich.html')

# ---------------------------------------------------------------- Newsletter

page('newsletter.html', 'Newsletter',
     'Einmal die Woche ein Gedanke, der dir Arbeit abnimmt – aus dem echten Familienalltag.',
     f'''<section class="og-hero">
  <div class="og-container">
    <h1>Einmal die Woche <em class="og-highlight">weniger</em> im Kopf</h1>
    <p class="og-hero__lead">Sonntags eine Mail. Ein konkreter Handgriff, ein
    System oder ein Fehlkauf, den du dir sparen kannst.</p>
  </div>
</section>

<section class="og-section og-article">
  <div class="og-container">
    <h2>Was drin ist</h2>
    <ul>
      <li>Eine Sache, die diese Woche bei uns Arbeit gespart hat.</li>
      <li>Ein Produkt mit ehrlicher Einschätzung – auch wenn sie negativ ist.</li>
      <li>Die Vorlage des Monats, bevor sie öffentlich wird.</li>
    </ul>

    <h2>Was nicht drin ist</h2>
    <ul>
      <li>Tägliche Mails.</li>
      <li>Ratgeber-Sprüche über Selbstfürsorge.</li>
      <li>Produkte, die ich nicht selbst benutze.</li>
    </ul>

    <div class="og-callout">
      <h3>Jetzt eintragen</h3>
      <p>Kostenlos. Eine Mail pro Woche. Abmeldung mit einem Klick.</p>
      {form(idx='mail-nl')}
    </div>

    <div class="og-summary">
      <strong>Datenschutz:</strong> Deine Adresse geht an Flodesk, meinen
      Newsletter-Anbieter, und wird für nichts anderes verwendet. Details in
      der <a href="/datenschutz/">Datenschutzerklärung</a>.
    </div>
  </div>
</section>''', active='newsletter.html')

# ---------------------------------------------------------------- Kooperationen

page('kooperationen.html', 'Kooperationen',
     'Zusammenarbeit mit Ochsenglitter: Reichweite, Formate und Kontakt für Marken.',
     f'''<section class="og-hero">
  <div class="og-container">
    <span class="og-pillar">Für Marken</span>
    <h1>Zusammenarbeit</h1>
    <p class="og-hero__lead">Ich arbeite mit Marken, deren Produkte bei uns
    tatsächlich im Alltag bestehen. Alles andere kostet uns beide nur Zeit.</p>
  </div>
</section>

<section class="og-section og-article">
  <div class="og-container">
    <h2>Formate</h2>
    <ul>
      <li>Instagram: Reels, Stories, Karussells</li>
      <li>Langfristige Produktbegleitung statt Einmal-Post</li>
      <li>Blogartikel mit Verlinkung</li>
      <li>Newsletter-Platzierung</li>
    </ul>

    <h2>Wie ich auswähle</h2>
    <p>Ich teste vor der Zusage. Passt das Produkt nicht in unseren Alltag,
    sage ich ab – das ist für beide Seiten günstiger als eine Kampagne, der
    man ansieht, dass sie eine ist.</p>

    <div class="og-summary">
      <strong>Mediakit:</strong> Reichweiten, Zielgruppe und Konditionen
      schicke ich auf Anfrage direkt zu.
    </div>

    <div class="og-callout">
      <h3>Anfrage senden</h3>
      <p>Am schnellsten per Mail – mit Produkt, Zeitraum und gewünschtem Format.</p>
      <p><a class="og-button" href="mailto:hallo@ochsenglitter.de">hallo@ochsenglitter.de</a></p>
    </div>
  </div>
</section>''', active='kooperationen.html')

print('Seiten erzeugt:', len([f for f in os.listdir(OUT) if f.endswith('.html')]))
