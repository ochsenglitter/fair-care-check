/* Stressfrei in den Advent · Ochsenglitter
   Statische App, kein Build-Schritt. Zustand lebt im localStorage.
   Nichts verlässt den Browser: kein Konto, kein Server, keine Übertragung. */

(function () {
  'use strict';

  var STORE = 'adventsplan.v1';
  var JAHR = 2026;
  var ADVENT1 = '2026-11-29';
  var HEILIGABEND = '2026-12-24';

  /* ---------------- Daten: 20 Tage Vorlauf ----------------
     ziel = Bereich, in dem das Ergebnis des Tages landet. */

  var TAGE = [
    { n: 1, d: '2026-11-09', t: 'Die Namensliste',
      s: 'Wer bekommt überhaupt ein Geschenk? Nur Namen, keine Ideen. Sie wird länger, als du denkst.',
      ziel: 'geschenke' },
    { n: 2, d: '2026-11-10', t: 'Budget festlegen',
      s: 'Kalender, Geschenke, Essen, Deko getrennt. Sonst merkst du es erst im Januar.',
      ziel: 'mehr' },
    { n: 3, d: '2026-11-11', t: 'Adventskalender entscheiden',
      s: 'Selbst füllen oder gekauft? Bei mehreren Kindern hängen die nächsten zwei Wochen an dieser Antwort.',
      ziel: 'advent' },
    { n: 4, d: '2026-11-12', t: 'Kalenderinhalte bestellen', marke: 'Lieferzeit',
      s: 'Alles, was kommen muss, geht heute raus. Im November werden die Lieferzeiten länger, nicht kürzer.',
      ziel: 'advent' },
    { n: 5, d: '2026-11-13', t: 'Die Türchen, die nichts kosten',
      s: 'Kinoabend, einmal später ins Bett, zusammen backen. Aufschreiben und dazulegen – meistens sind das die, an die sie sich erinnern.',
      ziel: 'advent' },
    { n: 6, d: '2026-11-14', t: 'Alle Feiern einsammeln',
      s: 'Kita, Schule, Verein, Arbeit, Familie. Erst wenn sie zusammen in einem Kalender stehen, siehst du, welche zwei sich überschneiden.',
      ziel: 'feiern' },
    { n: 7, d: '2026-11-15', t: 'Wer bringt was mit?',
      s: 'Zu jeder Feier gehört ein Blech, eine Tüte oder ein Wichtelgeschenk. Das steht selten in der Einladung.',
      ziel: 'feiern' },
    { n: 8, d: '2026-11-16', t: 'Zu jedem Namen eine Idee',
      s: 'Jetzt erst, nicht am Tag der Liste. Eine Idee pro Person reicht – die zweite findet sich beim Suchen.',
      ziel: 'geschenke' },
    { n: 9, d: '2026-11-17', t: 'Das Langsame bestellen', marke: 'Lieferzeit',
      s: 'Personalisiertes, Gravuren, Fotobücher. Alles mit Druck oder Namen hat eigene Fristen.',
      ziel: 'geschenke' },
    { n: 10, d: '2026-11-18', t: 'Getränke einkaufen', marke: 'schwer',
      s: 'Punsch, Kinderpunsch, Wein, Saft. Heute ist es Schleppen. Im Dezember ist es Schleppen und ausverkauft.' },
    { n: 11, d: '2026-11-19', t: 'Backvorrat',
      s: 'Mehl, Zucker, Nüsse, Mandeln. Butter kaufen und einfrieren, die wird im Dezember teuer.' },
    { n: 12, d: '2026-11-20', t: 'Dekokisten runterholen',
      s: 'Nicht aufstellen. Nur nachsehen, was fehlt und was kaputt ist – und die Lichterketten einmal einstecken.' },
    { n: 13, d: '2026-11-21', t: 'Kranz und Kerzen',
      s: 'Ab jetzt wird beides teurer und die Auswahl kleiner.' },
    { n: 14, d: '2026-11-22', t: 'Heiligabend entscheiden',
      s: 'Nicht kochen – entscheiden. Wer kommt, wie viele sind wir, was gibt es.',
      ziel: 'feiern' },
    { n: 15, d: '2026-11-23', t: 'Bestellungen aufgeben', marke: 'Frist',
      s: 'Metzger, Bäcker, Gemüsekiste. Die Fristen enden früher, als man denkt.' },
    { n: 16, d: '2026-11-24', t: 'Kalenderfüllung zählen',
      s: 'Heute, nicht am 28. Was fehlt, ist diese Woche noch zu holen.',
      ziel: 'advent' },
    { n: 17, d: '2026-11-25', t: 'Pakete vorbereiten',
      s: 'Für alle, die weiter weg wohnen: Geschenk, Karte, Adresse. Die Karte vergisst man, wenn das Paket schon zu ist.',
      ziel: 'geschenke' },
    { n: 18, d: '2026-11-26', t: 'Alle Termine eintragen',
      s: 'Vier Adventssonntage, Nikolaus, jede Feier. In den Kalender, nicht in den Kopf.',
      ziel: 'feiern' },
    { n: 19, d: '2026-11-27', t: 'Eine Sache streichen',
      s: 'Was war letztes Jahr zu viel? Genau das fällt dieses Jahr weg. Ohne schlechtes Gewissen – das ist der wichtigste Tag auf dieser Liste.',
      ziel: 'mehr' },
    { n: 20, d: '2026-11-28', t: 'Deko raus, Kalender befüllen',
      s: 'Tagsüber die Deko, mit Musik und mit den Kindern. Abends der Kalender, wenn sie im Bett sind – plan dafür eine Stunde ein.',
      ziel: 'advent' }
  ];

  var WOCHEN = [
    { von: 1, bis: 7, zeit: '9. bis 15. November', t: 'Woche eins: entscheiden' },
    { von: 8, bis: 14, zeit: '16. bis 22. November', t: 'Woche zwei: besorgen' },
    { von: 15, bis: 20, zeit: '23. bis 28. November', t: 'Woche drei: fertig machen' }
  ];

  var SCHLUESSEL = [
    ['6.12.', 'Nikolaus fällt auf den 2. Advent.', 'Zwei Anlässe an einem Tag – Stiefel und Kranz zusammen denken.'],
    ['11.12.', 'Letzte Bestellungen,', 'die sicher vor Weihnachten ankommen.'],
    ['15.12.', 'Pakete abschicken', '– die von Tag 17.'],
    ['23.12.', 'Frisches einkaufen.', 'Heiligabend ist ein Donnerstag, der 25. und 26. fallen auf Freitag und Samstag.']
  ];

  var STUFEN = ['offen', 'Idee steht', 'besorgt', 'verpackt'];

  var BUDGET_POSTEN = [
    ['kalender', 'Adventskalender'],
    ['geschenke', 'Geschenke'],
    ['essen', 'Essen'],
    ['deko', 'Deko']
  ];

  var BEREICHE = [
    ['heute', 'Heute'],
    ['plan', 'Plan'],
    ['geschenke', 'Geschenke'],
    ['feiern', 'Feiern'],
    ['advent', 'Kalender'],
    ['mehr', 'Mehr']
  ];

  /* ---------------- Zustand ---------------- */

  var state = {
    bereich: 'heute',
    tage: {},
    geschenke: [],
    feiern: [],
    tuerchen: [],
    budget: { kalender: '', geschenke: '', essen: '', deko: '' },
    vorsatz: '',
    streichen: ''
  };

  function load() {
    try {
      var roh = localStorage.getItem(STORE);
      if (!roh) return;
      uebernehmen(JSON.parse(roh));
    } catch (e) { /* dann eben leer starten */ }
  }

  function uebernehmen(gespeichert) {
    if (!gespeichert || typeof gespeichert !== 'object') return;
    if (gespeichert.tage && typeof gespeichert.tage === 'object') state.tage = gespeichert.tage;
    ['geschenke', 'feiern', 'tuerchen'].forEach(function (k) {
      if (Array.isArray(gespeichert[k])) state[k] = gespeichert[k];
    });
    if (gespeichert.budget && typeof gespeichert.budget === 'object') {
      BUDGET_POSTEN.forEach(function (p) {
        if (typeof gespeichert.budget[p[0]] === 'string') state.budget[p[0]] = gespeichert.budget[p[0]];
      });
    }
    ['vorsatz', 'streichen'].forEach(function (k) {
      if (typeof gespeichert[k] === 'string') state[k] = gespeichert[k];
    });
  }

  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(sicherung())); } catch (e) { /* egal */ }
  }

  function sicherung() {
    return {
      version: 1, jahr: JAHR,
      tage: state.tage, geschenke: state.geschenke, feiern: state.feiern,
      tuerchen: state.tuerchen, budget: state.budget,
      vorsatz: state.vorsatz, streichen: state.streichen
    };
  }

  /* ---------------- Kleinkram ---------------- */

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function id() { return 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  var WT = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var WT_KURZ = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  var MONAT = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli',
    'August', 'September', 'Oktober', 'November', 'Dezember'];

  function datum(iso) {
    var p = String(iso).split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  function heute() {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }

  function tageBis(iso) {
    return Math.round((datum(iso) - heute()) / 86400000);
  }

  function lang(dt) { return WT[dt.getDay()] + ', ' + dt.getDate() + '. ' + MONAT[dt.getMonth()]; }
  function kurz(dt) { return WT_KURZ[dt.getDay()] + ' ' + dt.getDate() + '.'; }

  function zahl(n) { return n.toLocaleString('de-DE'); }

  function euro(wert) {
    var n = parseFloat(String(wert).replace(/\./g, '').replace(',', '.'));
    return isFinite(n) ? n : 0;
  }

  function summeBudget() {
    return BUDGET_POSTEN.reduce(function (a, p) { return a + euro(state.budget[p[0]]); }, 0);
  }

  function summeGeschenke() {
    return state.geschenke.reduce(function (a, g) { return a + euro(g.budget); }, 0);
  }

  function tagFuerHeute() {
    var h = heute();
    for (var i = 0; i < TAGE.length; i++) if (+datum(TAGE[i].d) === +h) return TAGE[i];
    return null;
  }

  function offeneTage() {
    var h = heute();
    return TAGE.filter(function (t) { return datum(t.d) < h && !state.tage[t.n]; });
  }

  function erledigt() {
    return TAGE.filter(function (t) { return state.tage[t.n]; }).length;
  }

  function phase() {
    var h = heute(), start = datum(TAGE[0].d), ende = datum(TAGE[TAGE.length - 1].d);
    if (h > datum(JAHR + '-12-26')) return 'archiv';
    if (h >= datum(HEILIGABEND)) return 'fest';
    if (h > ende) return 'danach';
    if (h >= start) return 'laufend';
    if (h > datum(JAHR + '-01-01')) return 'vorher';
    return 'archiv';
  }

  /* ---------------- Bausteine ---------------- */

  function kopf(zusatz, titel, lede) {
    return '<div class="top">' +
      '<span class="wordmark">Ochsenglitter</span>' +
      '<div class="rule-row">' + esc(zusatz) + '</div>' +
      '<h1>' + titel + '</h1>' +
      (lede ? '<p class="lede">' + esc(lede) + '</p>' : '') +
      '</div>';
  }

  function fortschritt() {
    var fertig = erledigt(), pct = Math.round(fertig / TAGE.length * 100);
    return '<div class="card"><div class="fort">' +
      '<div class="fort__kopf"><span><b>' + fertig + '</b> von ' + TAGE.length + ' Tagen erledigt</span>' +
      '<span>' + pct + ' %</span></div>' +
      '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
      '</div></div>';
  }

  function tagZeile(t, extra) {
    var dt = datum(t.d), we = dt.getDay() === 0 || dt.getDay() === 6;
    var fertig = !!state.tage[t.n];
    var klassen = ['day'];
    if (we) klassen.push('day--weekend');
    if (fertig) klassen.push('day--fertig');
    if (extra) klassen.push(extra);
    return '<div class="' + klassen.join(' ') + '">' +
      '<span class="day__n">' + t.n + '<small>' + esc(kurz(dt)) + '</small></span>' +
      '<span class="day__t"><b>' + esc(t.t) +
      (t.marke ? '<span class="tag">' + esc(t.marke) + '</span>' : '') + '</b>' +
      '<span>' + esc(t.s) + '</span></span>' +
      '<input type="checkbox" class="hak" data-act="tag" data-n="' + t.n + '"' +
      (fertig ? ' checked' : '') + ' aria-label="Tag ' + t.n + ' erledigt: ' + esc(t.t) + '">' +
      '</div>';
  }

  function zielKnopf(t) {
    if (!t.ziel) return '';
    var beschriftung = {
      geschenke: 'Zur Geschenkeliste',
      feiern: 'Zu den Feiern',
      advent: 'Zum Adventskalender',
      mehr: t.n === 2 ? 'Zum Budget' : 'Zu den Notizen'
    }[t.ziel];
    return '<button type="button" class="btn btn--breit" data-act="zu" data-ziel="' + t.ziel + '">' +
      esc(beschriftung) + '</button>';
  }

  function countdown(iso, text) {
    var n = tageBis(iso);
    return '<div class="card card--ruhig"><div class="countdown">' +
      '<b>' + (n < 0 ? 0 : n) + '</b><span>' + (n === 1 ? 'Tag ' : 'Tage ') + esc(text) + '</span>' +
      '</div></div>';
  }

  function nachholen() {
    var offen = offeneTage();
    if (!offen.length) return '';
    return '<div class="card">' +
      '<p class="eyebrow">Liegen geblieben</p>' +
      '<h2>' + offen.length + (offen.length === 1 ? ' Tag' : ' Tage') + ' nachholen</h2>' +
      '<p class="note">Zwei Tage zusammen sind immer noch eine halbe Stunde. Was wirklich vorbei ist, hakst du einfach ab.</p>' +
      '<div class="days">' + offen.map(function (t) { return tagZeile(t, 'day--offen'); }).join('') + '</div>' +
      '</div>';
  }

  function leer(text) { return '<p class="leer">' + esc(text) + '</p>'; }

  /* ---------------- Ansicht: Heute ---------------- */

  function viewHeute() {
    var p = phase(), h = heute(), out = '';

    if (p === 'vorher') {
      var bis = tageBis(TAGE[0].d);
      out += kopf('20 Tage Vorlauf', 'Stressfrei in den <em>Advent</em>',
        'Ein To-do pro Tag, ab dem 9. November. Am 28. abends ist der Kalender gefüllt und die Deko steht – und am 1. Advent hast du nichts mehr zu erledigen.');
      out += '<div class="card card--ruhig"><div class="countdown"><b>' + bis + '</b>' +
        '<span>' + (bis === 1 ? 'Tag' : 'Tage') + ' bis Tag 1</span></div>' +
        '<p class="mini" style="text-align:center">Es geht los am ' + esc(lang(datum(TAGE[0].d))) + '.</p></div>';
      out += '<div class="card"><p class="note"><b>Jeden Tag eine Sache.</b> Die Reihenfolge ist nicht beliebig: ' +
        'Was Lieferzeit braucht, steht vorn, was Ruhe braucht, liegt auf dem Wochenende.</p>' +
        '<button type="button" class="btn btn--leise btn--breit" data-act="zu" data-ziel="plan">Den ganzen Plan ansehen</button></div>';
      out += vorsatzKarte();
      return out;
    }

    if (p === 'laufend') {
      var t = tagFuerHeute();
      out += '<div class="top"><span class="wordmark">Ochsenglitter</span>' +
        '<div class="rule-row">' + esc(lang(h)) + '</div></div>';

      if (t && !state.tage[t.n]) {
        out += '<div class="card">' +
          '<span class="heute__nr">' + t.n + '<small>von 20 · heute</small></span>' +
          '<h2>' + esc(t.t) + (t.marke ? '<span class="tag">' + esc(t.marke) + '</span>' : '') + '</h2>' +
          '<p class="lede">' + esc(t.s) + '</p>' +
          zielKnopf(t) +
          '<label class="zeile" style="cursor:pointer">' +
          '<input type="checkbox" class="hak" data-act="tag" data-n="' + t.n + '">' +
          '<span class="mini">Erledigt</span></label>' +
          '</div>';
      } else if (t) {
        var naechster = TAGE.filter(function (x) { return x.n > t.n; })[0];
        out += '<div class="card">' +
          '<p class="eyebrow">Tag ' + t.n + ' · erledigt</p>' +
          '<h2>Für heute war es das.</h2>' +
          '<p class="lede">' + esc(t.t) + ' steht. ' +
          (naechster ? 'Morgen: ' + esc(naechster.t) + '.' : 'Morgen ist der 1. Advent.') + '</p>' +
          '<label class="zeile" style="cursor:pointer">' +
          '<input type="checkbox" class="hak" data-act="tag" data-n="' + t.n + '" checked>' +
          '<span class="mini">Erledigt</span></label>' +
          '</div>';
      }

      out += nachholen();
      out += fortschritt();
      out += countdown(ADVENT1, 'bis zum 1. Advent');
      return out;
    }

    if (p === 'danach') {
      var offen = offeneTage().length;
      var unfertig = state.geschenke.filter(function (g) { return (g.stufe || 0) < 3; }).length;
      out += kopf('Der Vorlauf steht', 'Ab jetzt nur noch <em>Advent</em>', null);
      out += countdown(HEILIGABEND, 'bis Heiligabend');
      out += '<div class="card"><p class="eyebrow">Stand</p>' +
        '<h2>' + (offen ? offen + ' offene' + (offen === 1 ? 'r Tag' : ' Tage') : 'Alle 20 Tage erledigt') + '</h2>' +
        '<p class="lede">' +
        (unfertig ? unfertig + (unfertig === 1 ? ' Geschenk ist' : ' Geschenke sind') + ' noch nicht verpackt.'
          : 'Alle Geschenke sind verpackt.') + '</p>' +
        '<button type="button" class="btn btn--leise btn--breit" data-act="zu" data-ziel="geschenke">Zur Geschenkeliste</button></div>';
      out += schluesselKarte();
      return out;
    }

    if (p === 'fest') {
      out += kopf('24. bis 26. Dezember', 'Frohe <em>Weihnachten</em>', null);
      out += '<div class="card card--ruhig"><p class="lede" style="text-align:center">' +
        'Alles, was jetzt noch fehlt, fehlt eben. Das war der ganze Sinn.</p></div>';
      out += state.vorsatz
        ? '<div class="card"><p class="eyebrow">Das sollte dieses Jahr anders sein</p><p class="lede">' +
          esc(state.vorsatz) + '</p></div>'
        : '';
      return out;
    }

    out += kopf('Plan für ' + JAHR, 'Stressfrei in den <em>Advent</em>',
      'Der hinterlegte Plan läuft vom 9. bis 28. November ' + JAHR + '. Die Listen und Notizen bleiben trotzdem nutzbar.');
    out += '<div class="card"><button type="button" class="btn btn--breit" data-act="zu" data-ziel="plan">Den ganzen Plan ansehen</button></div>';
    out += fortschritt();
    return out;
  }

  /* ---------------- Ansicht: Plan ---------------- */

  function viewPlan() {
    var h = heute();
    var out = kopf('20 Tage Vorlauf', 'Der <em>Plan</em>',
      'Ein To-do pro Tag. Wer einen Tag verpasst, holt ihn am nächsten Abend nach.');
    out += fortschritt();

    WOCHEN.forEach(function (w) {
      var tage = TAGE.filter(function (t) { return t.n >= w.von && t.n <= w.bis; });
      out += '<div class="card"><p class="eyebrow">' + esc(w.zeit) + '</p><h2>' + esc(w.t) + '</h2>' +
        '<div class="days">' + tage.map(function (t) {
          return tagZeile(t, +datum(t.d) === +h ? 'day--heute' : '');
        }).join('') + '</div></div>';
    });

    out += '<div class="card card--ruhig"><p class="eyebrow eyebrow--gold">Sonntag, 29. November</p>' +
      '<p class="lede"><b>1. Advent.</b> Kerze an. Du hast nichts zu erledigen – das war der ganze Sinn.</p></div>';
    out += '<p class="foot">Teil 1 von 3 · Der Vorlauf</p>';
    return out;
  }

  /* ---------------- Ansicht: Geschenke ---------------- */

  function viewGeschenke() {
    var out = kopf('Tag 1, 8, 9 und 17', 'Die <em>Geschenke</em>',
      'Erst alle Namen, dann pro Name eine Idee. Der Status wandert mit einem Tippen weiter.');

    var zeilen = state.geschenke.map(function (g) {
      var stufe = g.stufe || 0;
      return '<div class="eintrag">' +
        '<div class="eintrag__kopf">' +
        '<input class="feld feld--name" data-art="geschenke" data-id="' + g.id + '" data-feld="name" ' +
        'value="' + esc(g.name) + '" placeholder="Name" aria-label="Name">' +
        '<button type="button" class="chip" data-act="stufe" data-id="' + g.id + '" data-stufe="' + stufe + '" ' +
        'aria-label="Status: ' + esc(STUFEN[stufe]) + '. Tippen für den nächsten Status.">' + esc(STUFEN[stufe]) + '</button>' +
        '</div>' +
        '<input class="feld feld--klein" data-art="geschenke" data-id="' + g.id + '" data-feld="idee" ' +
        'value="' + esc(g.idee) + '" placeholder="Idee" aria-label="Idee">' +
        '<div class="zeile">' +
        '<input class="feld feld--zahl" data-art="geschenke" data-id="' + g.id + '" data-feld="budget" ' +
        'inputmode="decimal" value="' + esc(g.budget) + '" placeholder="0" aria-label="Betrag in Euro">' +
        '<span class="mini">€</span>' +
        '<span style="flex:1"></span>' +
        '<button type="button" class="weg" data-act="weg" data-art="geschenke" data-id="' + g.id + '">Löschen</button>' +
        '</div></div>';
    }).join('');

    var offen = state.geschenke.filter(function (g) { return (g.stufe || 0) < 2; }).length;

    out += '<div class="card">' +
      '<p class="eyebrow">' + state.geschenke.length + ' Namen · ' + offen + ' noch nicht besorgt</p>' +
      '<div class="liste">' + (zeilen || leer('Noch keine Namen. Fang mit denen an, die dir sofort einfallen – der Rest kommt beim Schreiben.')) + '</div>' +
      '<button type="button" class="btn btn--leise btn--breit" data-act="neu" data-art="geschenke">Name hinzufügen</button>' +
      '<div class="summe"><span>Summe Geschenke</span><b id="summe-geschenke">' + zahl(summeGeschenke()) + ' €</b></div>' +
      '</div>';

    out += '<div class="card card--ruhig"><p class="note">' +
      '<b>Tag 17:</b> Für alle, die weiter weg wohnen, gehört die Karte ins Paket – die vergisst man, wenn es schon zu ist.</p></div>';
    return out;
  }

  /* ---------------- Ansicht: Feiern ---------------- */

  function viewFeiern() {
    var out = kopf('Tag 6, 7, 14 und 18', 'Feiern und <em>Termine</em>',
      'Erst wenn alle zusammen in einer Liste stehen, siehst du, welche zwei sich überschneiden.');

    var sortiert = state.feiern.slice().sort(function (a, b) {
      return (a.datum || '9999').localeCompare(b.datum || '9999');
    });

    var zeilen = sortiert.map(function (f) {
      return '<div class="eintrag">' +
        '<div class="eintrag__kopf">' +
        '<input class="feld feld--name" data-art="feiern" data-id="' + f.id + '" data-feld="was" ' +
        'value="' + esc(f.was) + '" placeholder="Was ist das?" aria-label="Anlass">' +
        '<input type="checkbox" class="hak" data-act="erledigt" data-art="feiern" data-id="' + f.id + '"' +
        (f.erledigt ? ' checked' : '') + ' aria-label="Erledigt">' +
        '</div>' +
        '<div class="zeile zeile--eng">' +
        '<input type="date" class="feld feld--datum" data-art="feiern" data-id="' + f.id + '" data-feld="datum" ' +
        'value="' + esc(f.datum) + '" aria-label="Datum">' +
        '<span class="mini">' + (f.datum ? esc(WT_KURZ[datum(f.datum).getDay()]) : '') + '</span>' +
        '</div>' +
        '<input class="feld feld--klein" data-art="feiern" data-id="' + f.id + '" data-feld="mit" ' +
        'value="' + esc(f.mit) + '" placeholder="Was bringen wir mit?" aria-label="Was mitbringen">' +
        '<div class="zeile"><span style="flex:1"></span>' +
        '<button type="button" class="weg" data-act="weg" data-art="feiern" data-id="' + f.id + '">Löschen</button>' +
        '</div></div>';
    }).join('');

    out += '<div class="card">' +
      '<p class="eyebrow">' + state.feiern.length + ' Termine</p>' +
      '<div class="liste">' + (zeilen || leer('Kita, Schule, Verein, Arbeit, Familie – und Heiligabend selbst.')) + '</div>' +
      '<button type="button" class="btn btn--leise btn--breit" data-act="neu" data-art="feiern">Termin hinzufügen</button>' +
      '</div>';

    out += schluesselKarte();
    return out;
  }

  /* ---------------- Ansicht: Adventskalender ---------------- */

  function viewAdvent() {
    var bereit = state.tuerchen.filter(function (x) { return x.bereit; }).length;
    var out = kopf('Tag 3, 4, 5, 16 und 20', 'Der <em>Adventskalender</em>',
      'Vierundzwanzig Türchen. Was nichts kostet, zählt genauso – meistens sind das die, an die sie sich erinnern.');

    var pct = Math.round(Math.min(state.tuerchen.length, 24) / 24 * 100);
    out += '<div class="card"><div class="fort">' +
      '<div class="fort__kopf"><span><b>' + state.tuerchen.length + '</b> von 24 Türchen geplant</span>' +
      '<span>' + bereit + ' liegt bereit</span></div>' +
      '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
      '</div></div>';

    var zeilen = state.tuerchen.map(function (x, i) {
      return '<div class="eintrag">' +
        '<div class="eintrag__kopf">' +
        '<span class="day__n" style="width:30px;flex:none">' + (i + 1) + '</span>' +
        '<input class="feld feld--name" data-art="tuerchen" data-id="' + x.id + '" data-feld="text" ' +
        'value="' + esc(x.text) + '" placeholder="Türchen-Idee" aria-label="Türchen ' + (i + 1) + '">' +
        '<input type="checkbox" class="hak" data-act="erledigt" data-art="tuerchen" data-id="' + x.id + '"' +
        (x.bereit ? ' checked' : '') + ' aria-label="Liegt bereit">' +
        '</div>' +
        '<div class="zeile"><span style="flex:1"></span>' +
        '<button type="button" class="weg" data-act="weg" data-art="tuerchen" data-id="' + x.id + '">Löschen</button>' +
        '</div></div>';
    }).join('');

    out += '<div class="card">' +
      '<div class="liste">' + (zeilen || leer('Kinoabend, einmal später ins Bett, zusammen backen, Frühstück im Bett, eine Vorlesegeschichte extra.')) + '</div>' +
      '<button type="button" class="btn btn--leise btn--breit" data-act="neu" data-art="tuerchen">Türchen hinzufügen</button>' +
      '</div>';

    out += '<div class="card card--ruhig"><p class="note">' +
      '<b>Tag 16:</b> Füllung zählen. Was fehlt, ist diese Woche noch zu holen – nicht am 28.</p></div>';
    return out;
  }

  /* ---------------- Ansicht: Mehr ---------------- */

  function vorsatzKarte() {
    return '<div class="card">' +
      '<p class="eyebrow eyebrow--gold">Bevor du anfängst</p>' +
      '<h2>Was dieses Jahr anders sein soll</h2>' +
      '<p class="note">Ein Satz. Er entscheidet mit, was du an Tag 19 streichst – und das ist der eigentliche Punkt.</p>' +
      '<textarea class="textarea" id="feld-vorsatz" data-feld="vorsatz" placeholder="Ein Satz genügt." ' +
      'aria-label="Was dieses Jahr anders sein soll">' + esc(state.vorsatz) + '</textarea>' +
      '</div>';
  }

  function schluesselKarte() {
    return '<div class="card"><p class="eyebrow eyebrow--gold">Gut zu wissen für ' + JAHR + '</p>' +
      SCHLUESSEL.map(function (r) {
        return '<div class="dl"><span class="w">' + esc(r[0]) + '</span>' +
          '<span class="t"><b>' + esc(r[1]) + '</b> ' + esc(r[2]) + '</span></div>';
      }).join('') + '</div>';
  }

  function viewMehr() {
    var out = kopf('Budget, Notizen, Daten', 'Der <em>Rest</em>', null);

    out += '<div class="card"><p class="eyebrow">Tag 2</p><h2>Budget festlegen</h2>' +
      '<p class="note">Getrennt eintragen. Sonst merkst du es erst im Januar.</p>' +
      BUDGET_POSTEN.map(function (p) {
        return '<div class="zeile"><span class="mini" style="flex:1">' + esc(p[1]) + '</span>' +
          '<input class="feld feld--zahl" data-feld="budget" data-posten="' + p[0] + '" inputmode="decimal" ' +
          'value="' + esc(state.budget[p[0]]) + '" placeholder="0" aria-label="Budget ' + esc(p[1]) + '">' +
          '<span class="mini">€</span></div>';
      }).join('') +
      '<div class="summe"><span>Zusammen</span><b id="summe-budget">' + zahl(summeBudget()) + ' €</b></div>' +
      '</div>';

    out += vorsatzKarte();

    out += '<div class="card"><p class="eyebrow">Tag 19</p><h2>Was dieses Jahr wegfällt</h2>' +
      '<p class="note">Was war letztes Jahr zu viel? Genau das fällt weg. Ohne schlechtes Gewissen.</p>' +
      '<textarea class="textarea" id="feld-streichen" data-feld="streichen" placeholder="Die eine Sache." ' +
      'aria-label="Was dieses Jahr wegfällt">' + esc(state.streichen) + '</textarea></div>';

    out += schluesselKarte();

    out += '<div class="card"><p class="eyebrow eyebrow--gold">Deine Daten</p><h2>Alles bleibt auf diesem Gerät</h2>' +
      '<p class="note">Kein Konto, kein Server. Wer die Liste auf ein zweites Gerät holen oder sichern will, ' +
      'kopiert diesen Text und fügt ihn dort wieder ein.</p>' +
      '<textarea class="textarea textarea--code" id="feld-daten" spellcheck="false" aria-label="Gesicherte Daten">' +
      esc(JSON.stringify(sicherung())) + '</textarea>' +
      '<div class="btn-reihe">' +
      '<button type="button" class="btn btn--leise" data-act="kopieren">Text kopieren</button>' +
      '<button type="button" class="btn btn--leise" data-act="einspielen">Daten einspielen</button>' +
      '</div>' +
      '<div class="btn-reihe">' +
      '<button type="button" class="btn btn--leise" data-act="drucken">Plan drucken</button>' +
      '<button type="button" class="btn btn--leise" data-act="loeschen">Alles löschen</button>' +
      '</div>' +
      '<p class="mini" id="daten-hinweis" role="status"></p></div>';

    out += '<p class="foot">Ochsenglitter · Teil 1 von 3</p>';
    return out;
  }

  /* ---------------- Rendern ---------------- */

  var app = document.getElementById('app');
  var nav = document.getElementById('nav');

  var ANSICHTEN = {
    heute: viewHeute, plan: viewPlan, geschenke: viewGeschenke,
    feiern: viewFeiern, advent: viewAdvent, mehr: viewMehr
  };

  var fokusAuf = null;

  function render() {
    app.innerHTML = '<div class="col">' + ANSICHTEN[state.bereich]() + '</div>';
    nav.innerHTML = BEREICHE.map(function (b) {
      return '<button type="button" class="nav__btn" data-act="zu" data-ziel="' + b[0] + '"' +
        (state.bereich === b[0] ? ' aria-current="true"' : '') + '><i></i>' + esc(b[1]) + '</button>';
    }).join('');

    if (fokusAuf) {
      var feld = app.querySelector('[data-id="' + fokusAuf + '"]');
      if (feld) feld.focus();
      fokusAuf = null;
    }
  }

  function wechsel(ziel) {
    if (!ANSICHTEN[ziel]) return;
    state.bereich = ziel;
    render();
    window.scrollTo(0, 0);
  }

  function finde(art, gesuchteId) {
    var liste = state[art] || [];
    for (var i = 0; i < liste.length; i++) if (liste[i].id === gesuchteId) return liste[i];
    return null;
  }

  function neu(art) {
    var frisch = { id: id() };
    if (art === 'geschenke') { frisch.name = ''; frisch.idee = ''; frisch.budget = ''; frisch.stufe = 0; }
    if (art === 'feiern') { frisch.was = ''; frisch.datum = ''; frisch.mit = ''; frisch.erledigt = false; }
    if (art === 'tuerchen') { frisch.text = ''; frisch.bereit = false; }
    state[art].push(frisch);
    save();
    fokusAuf = frisch.id;
    render();
  }

  function hinweis(text) {
    var el = document.getElementById('daten-hinweis');
    if (el) el.textContent = text;
  }

  /* ---------------- Klicks ---------------- */

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-act]');
    if (!btn || btn.type === 'checkbox') return;
    var act = btn.getAttribute('data-act');

    if (act === 'zu') { wechsel(btn.getAttribute('data-ziel')); return; }

    if (act === 'neu') { neu(btn.getAttribute('data-art')); return; }

    if (act === 'weg') {
      var art = btn.getAttribute('data-art'), weg = btn.getAttribute('data-id');
      state[art] = state[art].filter(function (x) { return x.id !== weg; });
      save(); render(); return;
    }

    if (act === 'stufe') {
      var g = finde('geschenke', btn.getAttribute('data-id'));
      if (g) { g.stufe = ((g.stufe || 0) + 1) % STUFEN.length; save(); render(); }
      return;
    }

    if (act === 'drucken') { state.bereich = 'plan'; render(); window.print(); return; }

    if (act === 'kopieren') {
      var feld = document.getElementById('feld-daten');
      if (!feld) return;
      feld.focus(); feld.select();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(feld.value);
          hinweis('Kopiert. Bewahr den Text irgendwo auf, wo du ihn wiederfindest.');
        } else {
          document.execCommand('copy');
          hinweis('Kopiert.');
        }
      } catch (err) { hinweis('Konnte nicht automatisch kopieren – markier den Text und kopier ihn von Hand.'); }
      return;
    }

    if (act === 'einspielen') {
      var quelle = document.getElementById('feld-daten');
      if (!quelle) return;
      try {
        var daten = JSON.parse(quelle.value);
        uebernehmen(daten);
        save(); render();
        hinweis('Eingespielt.');
      } catch (err) {
        hinweis('Das war kein gültiger Sicherungstext. Kopier ihn noch einmal vollständig herein.');
      }
      return;
    }

    if (act === 'loeschen') {
      if (!window.confirm('Alle Eintragungen dieser App löschen? Das lässt sich nicht rückgängig machen.')) return;
      state.tage = {}; state.geschenke = []; state.feiern = []; state.tuerchen = [];
      state.budget = { kalender: '', geschenke: '', essen: '', deko: '' };
      state.vorsatz = ''; state.streichen = '';
      save(); render();
      return;
    }
  });

  /* ---------------- Haken ---------------- */

  document.addEventListener('change', function (e) {
    var el = e.target;
    if (!el.matches || !el.matches('[data-act]')) return;
    var act = el.getAttribute('data-act');

    if (act === 'tag') {
      var n = el.getAttribute('data-n');
      if (el.checked) state.tage[n] = true; else delete state.tage[n];
      save(); render(); return;
    }

    if (act === 'erledigt') {
      var eintrag = finde(el.getAttribute('data-art'), el.getAttribute('data-id'));
      if (!eintrag) return;
      if (el.getAttribute('data-art') === 'tuerchen') eintrag.bereit = el.checked;
      else eintrag.erledigt = el.checked;
      save(); render(); return;
    }
  });

  /* ---------------- Eingaben (ohne Neuaufbau, sonst springt der Cursor) ---------------- */

  document.addEventListener('input', function (e) {
    var el = e.target;
    if (!el.getAttribute) return;
    var feld = el.getAttribute('data-feld');
    if (!feld) return;

    if (feld === 'vorsatz' || feld === 'streichen') { state[feld] = el.value; save(); return; }

    if (feld === 'budget' && el.getAttribute('data-posten')) {
      state.budget[el.getAttribute('data-posten')] = el.value;
      save();
      var s = document.getElementById('summe-budget');
      if (s) s.textContent = zahl(summeBudget()) + ' €';
      return;
    }

    var art = el.getAttribute('data-art');
    if (!art) return;
    var eintrag = finde(art, el.getAttribute('data-id'));
    if (!eintrag) return;
    eintrag[feld] = el.value;
    save();

    if (art === 'geschenke' && feld === 'budget') {
      var sg = document.getElementById('summe-geschenke');
      if (sg) sg.textContent = zahl(summeGeschenke()) + ' €';
    }
  });

  /* ---------------- Start ---------------- */

  load();
  render();
})();
