/* Fair Care Check · Ochsenglitter
   Statische App, kein Build-Schritt. Zustand lebt im localStorage. */

(function () {
  'use strict';

  var STORE = 'faircarecheck.v1';

  /* ---------------- Daten: 7 Bereiche, 44 Aufgaben ----------------
     [ Aufgabe, Erklärung, Richtwert Minuten/Woche, Kopfarbeit? ] */

  var CATS = [
    { n: 'Küche & Essen', t: [
      ['Wochenplanung: Was essen wir?', 'Der Kopf, der jeden Sonntag durchdenkt, was Montag auf dem Tisch steht.', 40, 1],
      ['Einkaufsliste führen', 'Wissen, dass die Milch alle ist – bevor sie alle ist.', 30, 1],
      ['Einkaufen gehen', 'Inklusive Wege, Schlange, Einräumen.', 120, 0],
      ['Kochen unter der Woche', 'Fünf Abende, fünf Meinungen.', 300, 0],
      ['Kochen am Wochenende', 'Auch das Brunch-Chaos zählt.', 120, 0],
      ['Spülmaschine & Abwasch', 'Ein- und wieder ausräumen. Und wieder.', 105, 0],
      ['Vorräte & Haltbarkeit', 'Was hinten im Kühlschrank vor sich hin lebt.', 25, 1]
    ]},
    { n: 'Wäsche & Kleidung', t: [
      ['Waschmaschine bestücken', 'Sortieren, starten, rechtzeitig rausholen.', 70, 0],
      ['Aufhängen & Trockner', 'Der Wäscheständer als Möbelstück.', 60, 0],
      ['Zusammenlegen & einräumen', 'Der undankbarste Teil.', 75, 0],
      ['Bügeln, Nähen, Flicken', 'Knopf ab, Naht auf.', 30, 0],
      ['Kleidergrößen im Blick', 'Wer merkt, dass die Hosen zu kurz sind?', 20, 1]
    ]},
    { n: 'Wohnung & Ordnung', t: [
      ['Aufräumen & Klarschiff', 'Die Runde, die nie fertig ist.', 140, 0],
      ['Staubsaugen & Wischen', 'Böden, Ecken, Krümel.', 80, 0],
      ['Bad putzen', 'Alles, was glänzen soll.', 45, 0],
      ['Müll & Recycling', 'Rausbringen, Tonne rausstellen, Pfand.', 35, 0],
      ['Pflanzen & Haustiere', 'Füttern, gießen, Gassi.', 60, 0],
      ['Reparaturen & Handwerk', 'Regal, Lampe, tropfender Hahn.', 45, 0]
    ]},
    { n: 'Kinder · Alltag', t: [
      ['Morgenroutine', 'Wecken, anziehen, Frühstück, Zähne, Jacke, Schuhe.', 175, 0],
      ['Bringen & Abholen', 'Kita, Schule, Sport, Musik.', 200, 0],
      ['Hausaufgaben & Üben', 'Geduld inklusive.', 90, 0],
      ['Abendroutine & Schlafen', 'Baden, Vorlesen, dreimal zurückgehen.', 175, 0],
      ['Spielen & Zeit schenken', 'Präsent sein, nicht nur anwesend.', 180, 0],
      ['Krankheitstage auffangen', 'Wer bleibt zuhause, wenn Fieber ist?', 90, 0],
      ['Körperpflege & Baden', 'Nägel, Haare, Zahnarztroutine.', 60, 0]
    ]},
    { n: 'Kinder · Organisation', t: [
      ['Kita- & Schulkommunikation', 'Elternchats, Apps, Zettel im Ranzen.', 60, 1],
      ['Arzt- und Therapietermine', 'Buchen, erinnern, hinbegleiten.', 50, 1],
      ['Kindergeburtstage & Geschenke', 'Eigene und die der anderen.', 45, 1],
      ['Ferien & Betreuung planen', 'Der Kalender-Tetris-Meister.', 40, 1],
      ['Ausrüstung & Nachkaufen', 'Turnbeutel, Gummistiefel, Bastelkram.', 40, 1],
      ['Elternabende & Ehrenamt', 'Kuchenbasar, Elternbeirat.', 35, 1]
    ]},
    { n: 'Geld & Papierkram', t: [
      ['Rechnungen & Kontostand', 'Fristen kennen, Mahnungen vermeiden.', 45, 1],
      ['Verträge & Versicherungen', 'Vergleichen, kündigen, wechseln.', 30, 1],
      ['Steuer & Belege', 'Das Jahresprojekt.', 25, 1],
      ['Behörden & Anträge', 'Kindergeld, Anmeldungen, Ämter.', 30, 1],
      ['Urlaub planen & buchen', 'Von der Idee bis zum Koffer.', 40, 1],
      ['Handwerker & Servicetermine', 'Anrufen, warten, dabei sein.', 35, 1]
    ]},
    { n: 'Beziehung & Gefühl', t: [
      ['Kontakt zur Familie halten', 'Anrufe, Besuche, Geburtstage der Großeltern.', 60, 1],
      ['Geschenke für Erwachsene', 'Auch für deine Seite der Familie.', 30, 1],
      ['Freundschaften & Playdates', 'Verabredungen für alle, auch für euch.', 45, 1],
      ['Streit schlichten & trösten', 'Emotionale Erste Hilfe.', 90, 1],
      ['Stimmung im Blick behalten', 'Merken, wenn es jemandem nicht gut geht.', 90, 1],
      ['Feste & Feiertage stemmen', 'Weihnachten macht sich nicht von selbst.', 60, 1],
      ['Woran sonst niemand denkt', 'Die Liste im Kopf, die nie leer wird.', 90, 1]
    ]}
  ];

  var TASKS = [];
  CATS.forEach(function (c, ci) {
    c.t.forEach(function (t, ti) {
      TASKS.push({ id: ci + '-' + ti, ci: ci, cat: c.n, label: t[0], hint: t[1], min: t[2], mental: !!t[3] });
    });
  });

  /* ---------------- Zustand ---------------- */

  var state = {
    screen: 'intro',
    variant: 'slider',
    step: 0,
    nameA: '',
    nameB: '',
    rate: 18,
    split: {},
    time: {}
  };

  TASKS.forEach(function (t) { state.split[t.id] = 50; state.time[t.id] = t.min; });

  function load() {
    try {
      var raw = localStorage.getItem(STORE);
      if (!raw) return;
      var s = JSON.parse(raw);
      ['screen', 'variant', 'step', 'nameA', 'nameB', 'rate'].forEach(function (k) {
        if (s[k] !== undefined && s[k] !== null) state[k] = s[k];
      });
      TASKS.forEach(function (t) {
        if (s.split && typeof s.split[t.id] === 'number') state.split[t.id] = s.split[t.id];
        if (s.time && typeof s.time[t.id] === 'number') state.time[t.id] = s.time[t.id];
      });
    } catch (e) { /* egal */ }
  }

  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) { /* egal */ }
  }

  /* ---------------- Helfer ---------------- */

  function nameA() { return state.nameA.trim() || 'Person A'; }
  function nameB() { return state.nameB.trim() || 'Person B'; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function fmtH(min) {
    var h = Math.floor(min / 60), m = Math.round(min % 60);
    if (min < 60) return m + ' min';
    return h + ' h' + (m ? ' ' + m + ' min' : '');
  }

  function fmtN(n, d) {
    return Number(n).toLocaleString('de-DE', {
      minimumFractionDigits: d || 0,
      maximumFractionDigits: d || 0
    });
  }

  function fmtE(n) { return fmtN(Math.round(n)) + ' €'; }

  function totalSteps() { return state.variant === 'list' ? CATS.length : TASKS.length; }

  function clampStep() {
    var max = totalSteps() - 1;
    if (state.step > max) state.step = max;
    if (state.step < 0) state.step = 0;
  }

  function choiceLabel(val) {
    return [
      'Nur ' + nameB(),
      'Meistens ' + nameB(),
      'Halbe-halbe',
      'Meistens ' + nameA(),
      'Nur ' + nameA()
    ][val / 25];
  }

  /* ---------------- Rechnen ---------------- */

  function compute() {
    var mA = 0, mB = 0, menA = 0, menB = 0;
    var perCat = CATS.map(function () { return { a: 0, b: 0 }; });

    TASKS.forEach(function (t) {
      var m = state.time[t.id], p = state.split[t.id] / 100;
      var a = m * p, b = m * (1 - p);
      mA += a; mB += b;
      if (t.mental) { menA += a; menB += b; }
      perCat[t.ci].a += a; perCat[t.ci].b += b;
    });

    var tot = mA + mB || 1;
    var shareA = Math.round(mA / tot * 100);
    var hA = mA / 60, hB = mB / 60;
    var mentalA = Math.round(menA / (menA + menB || 1) * 100);
    var gap = Math.abs(hA - hB);
    var lead = hA >= hB ? nameA() : nameB();
    var other = hA >= hB ? nameB() : nameA();

    return {
      mA: mA, mB: mB, menA: menA, menB: menB, perCat: perCat,
      shareA: shareA, shareB: 100 - shareA,
      hA: hA, hB: hB, mentalA: mentalA,
      gap: gap, lead: lead, other: other,
      balanced: gap < 1,
      totalH: (mA + mB) / 60
    };
  }

  function verdictText(r) {
    if (r.shareA === r.shareB) return 'Ausgeglichen. Selten, schön – und der Beweis, dass es geht.';
    if (r.gap < 3) return 'Fast auf Augenhöhe: ' + fmtN(r.gap, 1) + ' Stunden Unterschied pro Woche. Das ist Feinschliff, kein Systemfehler.';
    if (r.gap < 8) return r.lead + ' übernimmt ' + fmtN(r.gap, 1) + ' Stunden pro Woche mehr. Das sind ' + fmtN(r.gap * 52) + ' Stunden im Jahr – ein ganzer Arbeitsmonat Unterschied.';
    return r.lead + ' übernimmt ' + fmtN(r.gap, 1) + ' Stunden pro Woche mehr als ' + r.other + '. Auf ein Jahr gerechnet: ' + fmtN(r.gap * 52) + ' Stunden. Das ist keine Kleinigkeit, das ist ein zweiter Job.';
  }

  function swapPlan(r) {
    if (r.balanced) return { swaps: [], after: null };
    var leadIsA = r.hA >= r.hB;
    var cand = TASKS.map(function (t) {
      var load = leadIsA
        ? state.time[t.id] * state.split[t.id] / 100
        : state.time[t.id] * (1 - state.split[t.id] / 100);
      return { t: t, load: load };
    }).filter(function (x) { return x.load > 15; })
      .sort(function (x, y) { return y.load - x.load; })
      .slice(0, 3);

    var moved = cand.reduce(function (a, x) { return a + x.load; }, 0);
    var nA = leadIsA ? r.mA - moved : r.mA + moved;
    var nB = leadIsA ? r.mB + moved : r.mB - moved;
    var newShare = Math.round(nA / (nA + nB || 1) * 100);

    var swaps = cand.map(function (x, i) {
      var whole = x.load >= x.t.min * 0.85;
      var jahr = fmtN(x.load / 60 * 52, 0);
      return {
        n: i + 1,
        label: x.t.label,
        text: whole
          ? fmtH(Math.round(x.load)) + ' pro Woche, die fast komplett bei ' + r.lead + ' hängen. Wenn ' + r.other + ' das ganz übernimmt – nicht „mithilft", sondern zuständig ist – sind das ' + jahr + ' Stunden im Jahr, die frei werden.'
          : 'Hier stecken ' + fmtH(Math.round(x.load)) + ' pro Woche von ' + r.lead + ' drin. Der Posten ist groß genug, dass sich ein echter Tausch lohnt: ' + r.other + ' macht das ab jetzt allein, ' + jahr + ' Stunden im Jahr wechseln die Seite.'
      };
    });

    return { swaps: swaps, after: newShare + ' / ' + (100 - newShare) };
  }

  /* ---------------- Bausteine ---------------- */

  function bar(pct, width) {
    return '<span class="bar"' + (width ? ' style="width:' + width + 'px"' : '') +
      '><i style="width:' + pct + '%"></i></span>';
  }

  function choiceButtons(id, current, cls) {
    var out = '';
    [0, 25, 50, 75, 100].forEach(function (displayVal) {
      var aShare = 100 - displayVal;
      var on = current === aShare;
      var fill = displayVal;
      if (cls === 'mini') {
        out += '<button type="button" class="mini" aria-pressed="' + on + '" title="' + esc(choiceLabel(aShare)) +
          '" aria-label="' + esc(choiceLabel(aShare)) + '" data-act="pick" data-id="' + id + '" data-val="' + aShare + '">' +
          bar(fill) + '</button>';
      } else {
        out += '<button type="button" class="choice" aria-pressed="' + on + '" data-act="pick-next" data-id="' + id +
          '" data-val="' + aShare + '">' + bar(fill, 36) + '<span>' + esc(choiceLabel(aShare)) + '</span></button>';
      }
    });
    return out;
  }

  /* ---------------- Screens ---------------- */

  function viewIntro() {
    var variants = [
      { key: 'slider', t: 'Regler', s: 'Eine Aufgabe pro Karte, Verteilung frei schieben. Am genauesten.' },
      { key: 'taps', t: 'Fünf Stufen', s: 'Eine Aufgabe pro Karte, fünf Antworten, tippt sich von allein weiter.' },
      { key: 'list', t: 'Schnellliste', s: 'Ein Bereich pro Karte, alle Aufgaben untereinander. In 7 Schritten durch.' }
    ];

    return '' +
    '<div class="col" style="padding-top:52px">' +
      '<div style="display:flex;flex-direction:column;align-items:center;gap:8px">' +
        '<span class="wordmark" style="font-size:25px">Ochsenglitter</span>' +
        '<span class="rule-row"><span class="rule"></span>Fair Care Check<span class="rule"></span></span>' +
      '</div>' +
      '<h1 class="display">Wer macht<br><em>eigentlich was?</em></h1>' +
      '<p class="lede">44 Fragen, ehrlich beantwortet. Danach steht schwarz auf creme, wie viele Stunden und wie viel Denkarbeit eure unsichtbare Arbeit jeweils erfordert und wie viel monetären Wert sie hat – und am Ende bekommt ihr eine Auswertung zum Ausdrucken und Behalten.</p>' +

      '<div class="card" style="margin-top:32px">' +
        '<div class="eyebrow" style="margin-bottom:20px">Wer seid ihr zwei?</div>' +
        '<div style="display:flex;flex-direction:column;gap:16px">' +
          '<label class="field"><span class="field-label">Person A</span>' +
            '<input type="text" autocomplete="off" placeholder="Name" value="' + esc(state.nameA) + '" data-act="nameA"></label>' +
          '<label class="field"><span class="field-label">Person B</span>' +
            '<input type="text" autocomplete="off" placeholder="Name" value="' + esc(state.nameB) + '" data-act="nameB"></label>' +
          '<label class="rate"><span class="field-label">STUNDENSATZ ZUM BERECHNEN DES WERTS</span>' +
            '<span style="display:flex;align-items:baseline;gap:5px">' +
              '<input type="number" inputmode="numeric" min="1" step="1" value="' + state.rate + '" data-act="rate">' +
              '<span class="unit">€ / h</span></span></label>' +
        '</div>' +
        '<p style="font-size:12px;line-height:1.5;color:var(--gedaempft-2);margin:16px 0 0">18 € entspricht etwa einer bezahlten Haushaltshilfe. Wer den Wert der eigenen Zeit wirklich realistisch berechnen will, nimmt den eigenen Brutto-Stundenlohn.</p>' +
      '</div>' +

      '<div style="margin-top:26px">' +
        '<div class="eyebrow eyebrow--gold" style="text-align:center;margin-bottom:12px">Wie wollt ihr antworten?</div>' +
        '<div style="display:grid;gap:8px">' +
          variants.map(function (v) {
            return '<button type="button" class="option" aria-pressed="' + (state.variant === v.key) +
              '" data-act="variant" data-val="' + v.key + '"><span class="dot"></span><span>' +
              '<span class="t">' + v.t + '</span><span class="s">' + v.s + '</span></span></button>';
          }).join('') +
        '</div>' +
      '</div>' +

      '<button type="button" class="btn btn--primary" style="margin-top:26px" data-act="start">CARE CHECK STARTEN</button>' +
      '<p class="fineprint" style="margin-top:14px">ca. 6 Minuten · alles bleibt auf eurem Gerät</p>' +
    '</div>';
  }

  function viewCards() {
    clampStep();
    var isList = state.variant === 'list';
    var total = totalSteps();
    var step = state.step;
    var catName = isList ? CATS[step].n : TASKS[step].cat;
    var inner;

    if (isList) {
      inner =
        '<h2 class="q" style="margin-top:16px;font-size:29px">' + esc(catName) + '</h2>' +
        '<p class="q-hint" style="margin-bottom:2px">Links ist ' + esc(nameA()) + ', rechts ' + esc(nameB()) + '. Einmal tippen genügt.</p>' +
        CATS[step].t.map(function (t, ti) {
          var id = step + '-' + ti;
          return '<div class="list-task">' +
            '<div class="head"><span class="label">' + esc(t[0]) + '</span>' +
            '<span class="time">' + fmtH(state.time[id]) + '</span></div>' +
            '<div class="minis">' + choiceButtons(id, state.split[id], 'mini') + '</div>' +
          '</div>';
        }).join('');
    } else {
      var task = TASKS[step];
      var sp = state.split[task.id];
      var word = sp > 50 ? 'Mehr bei ' + nameA() : sp < 50 ? 'Mehr bei ' + nameB() : 'Genau geteilt';
      var control = state.variant === 'slider'
        ? '<div style="margin-top:24px">' +
            '<div class="split-head"><span class="n">' + esc(nameA()) + '</span><span class="n">' + esc(nameB()) + '</span></div>' +
            '<div class="split-pct"><span class="a">' + sp + ' %</span><span class="b">' + (100 - sp) + ' %</span></div>' +
            '<input type="range" min="0" max="100" step="5" value="' + (100 - sp) + '" aria-label="Verteilung" data-act="slider" data-id="' + task.id + '">' +
            '<div class="split-word">' + esc(word) + '</div>' +
          '</div>'
        : '<div class="choices">' + choiceButtons(task.id, sp, 'choice') + '</div>';

      inner =
        '<h2 class="q">' + esc(task.label) + '</h2>' +
        '<p class="q-hint">' + esc(task.hint) + '</p>' +
        '<div class="timerow"><span class="field-label">Zeit / Woche</span>' +
          '<span class="ctrl">' +
            '<button type="button" class="stepper" aria-label="weniger Zeit" data-act="time" data-id="' + task.id + '" data-val="-15">–</button>' +
            '<span class="time-value">' + fmtH(state.time[task.id]) + '</span>' +
            '<button type="button" class="stepper" aria-label="mehr Zeit" data-act="time" data-id="' + task.id + '" data-val="15">+</button>' +
          '</span></div>' + control;
    }

    return '' +
    '<div class="col" style="padding-top:24px">' +
      '<div class="topbar">' +
        '<button type="button" class="link-back" data-act="back">← zurück</button>' +
        '<span class="eyebrow eyebrow--muted">' + (step + 1) + ' / ' + total + '</span>' +
      '</div>' +
      '<div class="progress"><i style="width:' + Math.round((step + 1) / total * 100) + '%"></i></div>' +
      '<div class="card card--question" style="margin-top:20px">' +
        '<div class="cat-row"><span class="medallion">' + esc(catName.charAt(0)) + '</span>' +
        '<span class="eyebrow">' + esc(catName) + '</span></div>' +
        inner +
      '</div>' +
      '<div class="actions">' +
        '<button type="button" class="btn btn--ghost" data-act="skip">' + (isList ? 'Überspringen' : 'Betrifft uns nicht') + '</button>' +
        '<button type="button" class="btn btn--dark" data-act="next">' + (step >= total - 1 ? 'Ergebnis ansehen' : 'Weiter') + '</button>' +
      '</div>' +
    '</div>';
  }

  function viewResult() {
    var r = compute();
    var plan = swapPlan(r);
    var A = nameA(), B = nameB();

    var stats = [
      ['Care-Stunden / Woche', fmtN(r.totalH, 1), 'zusammen · ' + fmtN(r.totalH * 52) + ' h im Jahr'],
      ['Marktwert / Jahr', fmtE(r.totalH * 52 * state.rate), 'bei ' + state.rate + ' € pro Stunde'],
      ['Mental Load', r.mentalA + ' / ' + (100 - r.mentalA), A + ' gegenüber ' + B],
      ['Mehrarbeit / Jahr', fmtE(r.gap * 52 * state.rate), 'so viel mehr macht ' + r.lead + ' als ' + r.other + ' – in Euro']
    ];

    var rows = [
      ['Stunden / Woche', fmtN(r.hA, 1), fmtN(r.hB, 1)],
      ['Stunden / Monat', fmtN(r.hA * 4.33), fmtN(r.hB * 4.33)],
      ['Stunden / Jahr', fmtN(r.hA * 52), fmtN(r.hB * 52)],
      ['Anteil', r.shareA + ' %', r.shareB + ' %'],
      ['Wert / Monat', fmtE(r.hA * 4.33 * state.rate), fmtE(r.hB * 4.33 * state.rate)],
      ['Wert / Jahr', fmtE(r.hA * 52 * state.rate), fmtE(r.hB * 52 * state.rate)],
      ['davon Kopfarbeit', fmtN(r.menA / 60, 1) + ' h', fmtN(r.menB / 60, 1) + ' h'],
      ['Arbeitstage / Jahr (8 h)', fmtN(r.hA * 52 / 8), fmtN(r.hB * 52 / 8)]
    ];

    var mentalText = (r.mentalA > 60 || r.mentalA < 40)
      ? 'Kopfarbeit ist die Arbeit, die niemand sieht und die trotzdem müde macht. Bei euch liegt sie deutlich schiefer als die sichtbare Arbeit – ' + (r.mentalA > 50 ? A : B) + ' ist die Zentrale. Zuständigkeit abgeben heißt: ganze Bereiche übergeben, nicht Aufgaben zuteilen.'
      : 'Die Kopfarbeit ist bei euch erstaunlich fair verteilt. Haltet das – es ist der Teil, der als Erstes wieder kippt, wenn es stressig wird.';

    return '' +
    '<div class="col" style="padding-top:28px">' +
      '<div class="result-head" data-print="hide">' +
        '<button type="button" class="link-back" data-act="back">← ändern</button>' +
        '<button type="button" class="btn btn--pill is-rose" data-act="print">Als PDF drucken</button>' +
      '</div>' +

      '<div class="card">' +
        '<div class="wordmark" style="text-align:center;font-size:20px">Ochsenglitter</div>' +
        '<div class="eyebrow eyebrow--gold" style="text-align:center;margin-top:6px">Fair Care Check · Care-Bilanz</div>' +
        '<h2 class="serif" style="font-weight:500;font-size:33px;line-height:1.1;text-align:center;color:var(--espresso);margin:12px 0 0">' +
          esc(A) + ' <em style="color:var(--messing)">&amp;</em> ' + esc(B) + '</h2>' +
        '<div class="fineprint" style="margin-top:8px;letter-spacing:.14em">' +
          new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }) + '</div>' +
        '<div class="duo">' +
          '<div class="a"><div class="big">' + r.shareA + '</div><div class="who">' + esc(A) + '</div></div>' +
          '<div class="slash">/</div>' +
          '<div class="b"><div class="big">' + r.shareB + '</div><div class="who">' + esc(B) + '</div></div>' +
        '</div>' +
        '<div class="ratio"><i style="width:' + r.shareA + '%"></i></div>' +
        '<p class="verdict">' + esc(verdictText(r)) + '</p>' +
      '</div>' +

      '<div class="stats" style="margin-top:12px">' +
        stats.map(function (s) {
          return '<div class="stat"><div class="k">' + esc(s[0]) + '</div><div class="v">' + esc(s[1]) +
            '</div><div class="n">' + esc(s[2]) + '</div></div>';
        }).join('') +
      '</div>' +

      '<div class="card card--plain" style="margin-top:12px">' +
        '<div class="eyebrow">Die Zahlen im Detail</div>' +
        '<div class="table">' +
          '<div class="head"></div><div class="head num">' + esc(A) + '</div><div class="head num">' + esc(B) + '</div>' +
          rows.map(function (row) {
            return '<div>' + esc(row[0]) + '</div><div class="num a">' + esc(row[1]) + '</div><div class="num b">' + esc(row[2]) + '</div>';
          }).join('') +
        '</div>' +
      '</div>' +

      '<div class="card card--plain" style="margin-top:12px">' +
        '<div class="eyebrow">Verteilung nach Bereich</div>' +
        '<div class="names-row"><span>' + esc(A) + '</span><span>' + esc(B) + '</span></div>' +
        CATS.map(function (c, i) {
          var t = r.perCat[i].a + r.perCat[i].b || 1;
          var pct = Math.round(r.perCat[i].a / t * 100);
          var col = pct > 65 ? 'var(--rose)' : pct < 35 ? 'var(--messing)' : 'var(--linie-warm)';
          return '<div class="catrow"><div class="head"><span class="name">' + esc(c.n) + '</span>' +
            '<span class="h">' + fmtN(t / 60, 1) + ' h</span></div>' +
            '<div class="track"><i style="width:' + pct + '%;background:' + col + '"></i></div>' +
            '<div class="pcts"><span>' + pct + ' %</span><span>' + (100 - pct) + ' %</span></div></div>';
        }).join('') +
      '</div>' +

      '<div class="card card--dark" style="margin-top:12px">' +
        '<div class="eyebrow">Time Out · Mental Load</div>' +
        '<div class="mental-top"><div class="big">' + r.mentalA + '%</div>' +
          '<div class="cap">der Denk-, Plan- und Erinnerungsarbeit liegt bei ' + esc(A) + '.</div></div>' +
        '<p>' + esc(mentalText) + '</p>' +
        '<div class="mental-foot">' +
          '<div><div class="k">Kopfarbeit / Woche, gesamt</div><div class="v">' + fmtN((r.menA + r.menB) / 60, 1) + ' h</div></div>' +
          '<div><div class="k">Sichtbare Arbeit, gesamt</div><div class="v">' + fmtN((r.mA + r.mB - r.menA - r.menB) / 60, 1) + ' h</div></div>' +
        '</div>' +
      '</div>' +

      '<div class="card card--plain" style="margin-top:12px">' +
        '<div class="eyebrow">' + (r.balanced ? 'Wo ihr trotzdem hinschauen könnt' : 'Drei Züge, die viel bewegen') + '</div>' +
        '<p style="font-size:12.5px;line-height:1.55;color:var(--claim);margin:10px 0 0">' +
          (r.balanced
            ? 'Bei euch ist es fast ausgeglichen – da gibt es nichts umzuverteilen. Interessanter ist die Frage, wer bei jedem Punkt daran denkt, dass er gemacht werden muss. Redet über Zuständigkeit statt über Stunden, und rechnet in vier Wochen nochmal.'
            : 'Ihr müsst nicht alles umbauen. Diese drei Posten sind die größten Einzelstücke und lassen sich am leichtesten ganz abgeben.') +
        '</p>' +
        plan.swaps.map(function (s) {
          return '<div class="swap"><span class="n">' + s.n + '</span><span>' +
            '<span class="label">' + esc(s.label) + '</span><span class="text">' + esc(s.text) + '</span></span></div>';
        }).join('') +
        (plan.after ? '<div class="after"><span class="k">Danach steht ihr bei</span><span class="v">' + plan.after + '</span></div>' : '') +
      '</div>' +

      '<div class="card card--outline" style="margin-top:12px">' +
        '<div class="eyebrow eyebrow--gold">Abmachung</div>' +
        '<p style="font-size:12.5px;line-height:1.55;color:var(--claim);margin:10px 0 18px">Ausdrucken, unterschreiben, in vier Wochen nochmal rechnen.</p>' +
        '<div class="sign"><span class="line"></span><span class="line"></span></div>' +
        '<div class="sign-names"><span>' + esc(A) + '</span><span>' + esc(B) + '</span></div>' +
      '</div>' +

      '<div class="brandfoot"><div class="w">Ochsenglitter</div>' +
        '<div class="s">Fair Care Check · nur zur privaten Nutzung</div></div>' +

      '<button type="button" class="btn btn--ghost" style="width:100%;margin-top:20px" data-print="hide" data-act="restart">Von vorn beginnen</button>' +
    '</div>';
  }

  /* ---------------- CSV-Export ---------------- */

  function csvExport() {
    var q = function (x) {
      return /[",\n]/.test(String(x)) ? '"' + String(x).replace(/"/g, '""') + '"' : String(x);
    };
    var L = [];
    L.push(['OCHSENGLITTER · FAIR CARE CHECK']);
    L.push(['Wer macht eigentlich was?']);
    L.push([]);
    L.push(['Person A', nameA()]);
    L.push(['Person B', nameB()]);
    L.push(['Stundensatz (EUR/h)', state.rate]);
    L.push([]);
    L.push(['SO GEHT ES: Nur Spalte C (Minuten pro Woche) und Spalte D (Anteil Person A in Prozent) aendern. Alles andere rechnet sich selbst.']);
    L.push(['0 % = macht Person B allein · 50 % = halbe-halbe · 100 % = macht Person A allein']);
    L.push([]);
    L.push(['Bereich', 'Aufgabe', 'Minuten / Woche', 'Anteil Person A (%)', 'Stunden Person A', 'Stunden Person B', 'Kopfarbeit']);

    var first = L.length + 1;
    TASKS.forEach(function (t, i) {
      var row = first + i;
      L.push([t.cat, t.label, state.time[t.id], state.split[t.id],
        '=C' + row + '*D' + row + '/100/60',
        '=C' + row + '*(100-D' + row + ')/100/60',
        t.mental ? 1 : 0]);
    });
    var last = first + TASKS.length - 1;
    var E = 'E' + first + ':E' + last, F = 'F' + first + ':F' + last, G = 'G' + first + ':G' + last;

    L.push([]);
    L.push(['EURE CARE-BILANZ', '', '', '', '=B4', '=B5', 'Gesamt']);
    var b = L.length + 1;
    [
      ['Stunden / Woche', '=SUM(' + E + ')', '=SUM(' + F + ')', '=E' + b + '+F' + b],
      ['Stunden / Monat', '=E' + b + '*4.33', '=F' + b + '*4.33', '=G' + b + '*4.33'],
      ['Stunden / Jahr', '=E' + b + '*52', '=F' + b + '*52', '=G' + b + '*52'],
      ['Anteil (%)', '=ROUND(E' + b + '/G' + b + '*100)', '=ROUND(F' + b + '/G' + b + '*100)', 100],
      ['Wert / Monat (EUR)', '=ROUND(E' + b + '*4.33*$B$6)', '=ROUND(F' + b + '*4.33*$B$6)', '=ROUND(G' + b + '*4.33*$B$6)'],
      ['Wert / Jahr (EUR)', '=ROUND(E' + b + '*52*$B$6)', '=ROUND(F' + b + '*52*$B$6)', '=ROUND(G' + b + '*52*$B$6)'],
      ['Arbeitstage / Jahr (8 h)', '=ROUND(E' + b + '*52/8)', '=ROUND(F' + b + '*52/8)', '=ROUND(G' + b + '*52/8)'],
      ['Kopfarbeit Stunden / Woche', '=SUMIF(' + G + ',1,' + E + ')', '=SUMIF(' + G + ',1,' + F + ')', '=E' + (b + 7) + '+F' + (b + 7)],
      ['Mental-Load-Anteil (%)', '=ROUND(E' + (b + 7) + '/G' + (b + 7) + '*100)', '=ROUND(F' + (b + 7) + '/G' + (b + 7) + '*100)', 100],
      ['Sichtbare Arbeit Std / Woche', '=E' + b + '-E' + (b + 7), '=F' + b + '-F' + (b + 7), '=G' + b + '-G' + (b + 7)],
      ['Mehrarbeit Std / Woche', '=ABS(E' + b + '-F' + b + ')', '', ''],
      ['Mehrarbeit Std / Jahr', '=ABS(E' + b + '-F' + b + ')*52', '', ''],
      ['Mehrarbeit Wert / Jahr (EUR)', '=ROUND(ABS(E' + b + '-F' + b + ')*52*$B$6)', '', '']
    ].forEach(function (row) { L.push([row[0], '', '', '', row[1], row[2], row[3]]); });

    L.push([]);
    L.push(['VERTEILUNG NACH BEREICH', '', '', '', 'Std Person A', 'Std Person B', 'Anteil A (%)']);
    CATS.forEach(function (c) {
      var cr = L.length + 1;
      L.push([c.n, '', '', '',
        '=SUMIF($A$' + first + ':$A$' + last + ',A' + cr + ',' + E + ')',
        '=SUMIF($A$' + first + ':$A$' + last + ',A' + cr + ',' + F + ')',
        '=ROUND(E' + cr + '/(E' + cr + '+F' + cr + ')*100)']);
    });

    L.push([]);
    L.push(['ABMACHUNG: Welche zwei Zustaendigkeiten wandern ab heute komplett zur anderen Person?']);
    L.push(['1.', '']);
    L.push(['2.', '']);
    L.push(['Naechster Check-in am', '']);
    L.push([]);
    L.push(['© OCHSENGLITTER · Fair Care Check · nur zur privaten Nutzung']);

    var csv = '\uFEFF' + L.map(function (r) { return r.map(q).join(','); }).join('\r\n');
    var url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Fair-Care-Check-' + nameA().replace(/\s+/g, '-') + '-' + nameB().replace(/\s+/g, '-') + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  /* ---------------- Rendern & Events ---------------- */

  var app = document.getElementById('app');

  function render() {
    app.innerHTML = state.screen === 'intro' ? viewIntro()
      : state.screen === 'cards' ? viewCards()
      : viewResult();
    save();
  }

  function advance() {
    if (state.step >= totalSteps() - 1) state.screen = 'result';
    else state.step += 1;
    render();
    window.scrollTo(0, 0);
  }

  function goBack() {
    if (state.screen === 'result') {
      state.screen = 'cards';
      state.step = totalSteps() - 1;
    } else if (state.step === 0) {
      state.screen = 'intro';
    } else {
      state.step -= 1;
    }
    render();
    window.scrollTo(0, 0);
  }

  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');
    var id = el.getAttribute('data-id');
    var val = el.getAttribute('data-val');

    if (act === 'variant') { state.variant = val; state.step = 0; render(); }
    else if (act === 'start') { state.screen = 'cards'; state.step = 0; render(); window.scrollTo(0, 0); }
    else if (act === 'restart') {
      if (!confirm('Alle Antworten zurücksetzen?')) return;
      TASKS.forEach(function (t) { state.split[t.id] = 50; state.time[t.id] = t.min; });
      state.screen = 'intro'; state.step = 0; render(); window.scrollTo(0, 0);
    }
    else if (act === 'back') goBack();
    else if (act === 'next') advance();
    else if (act === 'skip') {
      if (state.variant !== 'list') state.time[TASKS[state.step].id] = 0;
      advance();
    }
    else if (act === 'time') {
      state.time[id] = Math.max(0, state.time[id] + Number(val));
      render();
    }
    else if (act === 'pick') { state.split[id] = Number(val); render(); }
    else if (act === 'pick-next') { state.split[id] = Number(val); advance(); }
    else if (act === 'print') window.print();
    else if (act === 'csv') csvExport();
  });

  app.addEventListener('input', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');

    if (act === 'nameA') { state.nameA = el.value; save(); }
    else if (act === 'nameB') { state.nameB = el.value; save(); }
    else if (act === 'rate') { state.rate = Math.max(1, Number(el.value) || 1); save(); }
    else if (act === 'slider') {
      var id = el.getAttribute('data-id');
      state.split[id] = 100 - Number(el.value);
      var wrap = el.parentNode;
      var pct = wrap.querySelector('.split-pct');
      var word = wrap.querySelector('.split-word');
      if (pct) {
        pct.children[0].textContent = state.split[id] + ' %';
        pct.children[1].textContent = (100 - state.split[id]) + ' %';
      }
      if (word) {
        word.textContent = state.split[id] > 50 ? 'Mehr bei ' + nameA()
          : state.split[id] < 50 ? 'Mehr bei ' + nameB() : 'Genau geteilt';
      }
      save();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (state.screen !== 'cards') return;
    if (e.target.matches('input')) return;
    if (e.key === 'ArrowRight') advance();
    if (e.key === 'ArrowLeft') goBack();
  });

  load();
  clampStep();
  render();
})();
