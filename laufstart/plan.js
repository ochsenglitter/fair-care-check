/* ============================================================
   Laufstart – Trainingsplan, Sprüche und Abzeichen
   8 Wochen, 3 Einheiten pro Woche, vom ersten Wechsel
   aus Gehen und Laufen bis 30 Minuten am Stück.
   ============================================================ */

/* --- Bausteine ------------------------------------------- */

var AUFWAERM_SEK = 300; /* 5 Minuten zügig gehen */
var AUSLAUF_SEK  = 300; /* 5 Minuten locker gehen */

function L(sek) { return { art: "laufen", sek: sek }; }
function G(sek) { return { art: "gehen",  sek: sek }; }

/* wiederholt eine Folge von Blöcken n mal */
function wdh(n, bloecke) {
  var raus = [];
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < bloecke.length; j++) {
      raus.push({ art: bloecke[j].art, sek: bloecke[j].sek });
    }
  }
  return raus;
}

/* --- Die acht Wochen ------------------------------------- */

var WOCHEN_ROH = [
  {
    nr: 1,
    titel: "Ankommen",
    ziel: "Achtmal eine Minute laufen. Mehr nicht.",
    fokus: "Lauf langsamer, als du denkst. Du sollst dich nebenher unterhalten " +
           "können. Wenn das nicht geht, bist du zu schnell.",
    einheiten: [
      wdh(8, [L(60), G(90)]),
      wdh(8, [L(60), G(90)]),
      wdh(8, [L(60), G(90)])
    ]
  },
  {
    nr: 2,
    titel: "Etwas länger",
    ziel: "Sechsmal 90 Sekunden laufen.",
    fokus: "Atme durch den Mund, tief in den Bauch. Kurze Schritte, " +
           "Füße unter dem Körper aufsetzen.",
    einheiten: [
      wdh(6, [L(90), G(120)]),
      wdh(6, [L(90), G(120)]),
      wdh(6, [L(90), G(120)])
    ]
  },
  {
    nr: 3,
    titel: "Drei Minuten am Stück",
    ziel: "Zweimal 90 Sekunden und zweimal drei Minuten.",
    fokus: "Die drei Minuten fühlen sich lang an. Sie sind trotzdem machbar. " +
           "Blick nach vorn, nicht auf die Füße.",
    einheiten: [
      wdh(2, [L(90), G(90), L(180), G(180)]),
      wdh(2, [L(90), G(90), L(180), G(180)]),
      wdh(2, [L(90), G(90), L(180), G(180)])
    ]
  },
  {
    nr: 4,
    titel: "Fünf Minuten",
    ziel: "Zum ersten Mal fünf Minuten ohne Gehpause.",
    fokus: "Wenn es eng wird: Tempo raus, aber weiterlaufen. Langsam laufen " +
           "ist besser als gehen.",
    einheiten: [
      [L(180), G(90), L(300), G(150), L(180), G(90), L(300)],
      [L(180), G(90), L(300), G(150), L(180), G(90), L(300)],
      [L(180), G(90), L(300), G(150), L(180), G(90), L(300)]
    ]
  },
  {
    nr: 5,
    titel: "Die große Woche",
    ziel: "Am Ende der Woche läufst du 20 Minuten am Stück.",
    fokus: "Die dritte Einheit ist ein Sprung. Er funktioniert, weil die " +
           "vier Wochen davor stattgefunden haben. Vertrau dem Plan.",
    einheiten: [
      [L(300), G(180), L(300), G(180), L(300)],
      [L(480), G(300), L(480)],
      [L(1200)]
    ]
  },
  {
    nr: 6,
    titel: "Stabil werden",
    ziel: "Von 18 Minuten Laufzeit auf 25 Minuten am Stück.",
    fokus: "Such dir eine Strecke, die du magst. Gewohnheit schlägt " +
           "Motivation an jedem grauen Dienstag.",
    einheiten: [
      [L(300), G(180), L(480), G(180), L(300)],
      [L(600), G(180), L(600)],
      [L(1500)]
    ]
  },
  {
    nr: 7,
    titel: "Routine",
    ziel: "Dreimal 25 Minuten. Ohne Drama.",
    fokus: "Diese Woche verändert nichts am Umfang. Sie macht ihn " +
           "selbstverständlich.",
    einheiten: [
      [L(1500)],
      [L(1500)],
      [L(1500)]
    ]
  },
  {
    nr: 8,
    titel: "Deine 30 Minuten",
    ziel: "28, 28 und dann 30 Minuten am Stück.",
    fokus: "Die letzte Einheit ist keine Prüfung. Du hast sie in den sieben " +
           "Wochen davor schon bestanden.",
    einheiten: [
      [L(1680)],
      [L(1680)],
      [L(1800)]
    ]
  }
];

/* --- Plan aufbauen --------------------------------------- */

function baueEinheit(wocheNr, einheitNr, kern) {
  var bloecke = [{ art: "aufwaermen", sek: AUFWAERM_SEK }]
    .concat(kern)
    .concat([{ art: "auslaufen", sek: AUSLAUF_SEK }]);

  var gesamt = 0, laufSek = 0, laengstes = 0, laufBloecke = 0;
  for (var i = 0; i < bloecke.length; i++) {
    gesamt += bloecke[i].sek;
    if (bloecke[i].art === "laufen") {
      laufSek += bloecke[i].sek;
      laufBloecke++;
      if (bloecke[i].sek > laengstes) laengstes = bloecke[i].sek;
    }
  }

  return {
    id: "w" + wocheNr + "e" + einheitNr,
    woche: wocheNr,
    nr: einheitNr,
    bloecke: bloecke,
    gesamtSek: gesamt,
    laufSek: laufSek,
    laufBloecke: laufBloecke,
    laengstesLaufSek: laengstes
  };
}

var PLAN = WOCHEN_ROH.map(function (w) {
  return {
    nr: w.nr,
    titel: w.titel,
    ziel: w.ziel,
    fokus: w.fokus,
    einheiten: w.einheiten.map(function (kern, i) {
      return baueEinheit(w.nr, i + 1, kern);
    })
  };
});

/* --- Beschriftung der Blockarten -------------------------- */

var ARTEN = {
  aufwaermen: { name: "Aufwärmen", kurz: "Warm", ansage: "Aufwärmen. Zügig gehen.",  farbe: "warm" },
  laufen:     { name: "Laufen",    kurz: "Lauf", ansage: "Jetzt laufen.",             farbe: "lauf" },
  gehen:      { name: "Gehen",     kurz: "Geh",  ansage: "Gehpause.",                 farbe: "geh"  },
  auslaufen:  { name: "Auslaufen", kurz: "Aus",  ansage: "Auslaufen. Locker gehen.",  farbe: "warm" }
};

/* --- Motivation ------------------------------------------ */

var SPRUECHE = [
  "Die ersten zehn Minuten lügen. Danach wird es besser.",
  "Du musst heute nicht schnell sein. Du musst nur rausgehen.",
  "Kein Lauf war je umsonst, auch der schlechte nicht.",
  "Langsam laufen ist laufen.",
  "Die Einheit, auf die du am wenigsten Lust hast, bringt am meisten.",
  "Dein Körper kann mehr, als dein Kopf ihm zutraut.",
  "Dreißig Minuten sind ein Prozent deines Tages.",
  "Es zählt nicht, wie weit. Es zählt, dass du losgehst.",
  "Niemand schaut. Und wenn: Die laufen selbst nicht.",
  "Du vergleichst dich mit dir von letzter Woche. Mit sonst niemandem.",
  "Wetter ist eine Frage der Kleidung.",
  "Nach dem Laufen hat noch nie jemand bereut, gelaufen zu sein.",
  "Fünf Minuten laufen und dann abbrechen ist immer noch besser als nicht loszugehen.",
  "Der Plan ist geduldiger als du. Halt dich dran.",
  "Pausen gehören zum Training, nicht zum Scheitern.",
  "Schwer heißt nicht falsch.",
  "Du baust gerade etwas auf, das man nicht sofort sieht.",
  "Das Unangenehme dauert Minuten. Das Gute bleibt den Tag.",
  "Heute die Schuhe anziehen reicht als Ziel.",
  "Aus 'ich kann nicht laufen' wird 'ich bin heute gelaufen'. Ein Schritt nach dem anderen.",
  "Wer regelmäßig langsam läuft, wird schnell. Wer immer schnell läuft, hört auf.",
  "Der Unterschied zwischen dir und Läuferinnen ist: Die sind dabeigeblieben.",
  "Zwei Einheiten pro Woche sind besser als drei geplante und null gelaufene.",
  "Seitenstechen? Tempo raus, tief ausatmen, weitergehen. Nicht heimgehen.",
  "Muskelkater in Woche eins ist eine Quittung, kein Warnsignal.",
  "Du bist keine Anfängerin mehr, sobald du das zweite Mal losgegangen bist."
];

/* --- Abzeichen ------------------------------------------- */

var ABZEICHEN = [
  { id: "start",     symbol: "👟", titel: "Losgelaufen",      text: "Erste Einheit geschafft." },
  { id: "woche1",    symbol: "📅", titel: "Erste Woche",      text: "Drei Einheiten in Woche 1." },
  { id: "fuenf",     symbol: "🔁", titel: "Fünf Einheiten",   text: "Fünf Trainings im Kasten." },
  { id: "fuenfmin",  symbol: "⏱️", titel: "Fünf am Stück",    text: "Fünf Minuten ohne Gehpause gelaufen." },
  { id: "halbzeit",  symbol: "🪜", titel: "Halbzeit",         text: "Die Hälfte des Plans liegt hinter dir." },
  { id: "zwanzig",   symbol: "🚀", titel: "20 Minuten",       text: "20 Minuten am Stück gelaufen." },
  { id: "hundert",   symbol: "💯", titel: "100 Laufminuten",  text: "Insgesamt 100 Minuten gelaufen." },
  { id: "dreimal",   symbol: "🔥", titel: "Volle Woche",      text: "Drei Einheiten in sieben Tagen." },
  { id: "dreissig",  symbol: "🏅", titel: "30 Minuten",       text: "Der ganze Plan. 30 Minuten am Stück." }
];
