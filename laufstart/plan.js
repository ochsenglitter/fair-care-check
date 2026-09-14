/* ============================================================
   Laufstart – Trainingsplan, Tipps, Sprüche und Abzeichen

   Gebaut für: Wiedereinstieg nach langer Pause, zwei Einheiten
   pro Woche, 25 bis 32 Minuten pro Einheit. Die erste Woche wird
   nur gegangen, das erste Laufintervall dauert 30 Sekunden.
   Ziel nach 15 Wochen: 25 Minuten am Stück.
   ============================================================ */

/* --- Bausteine ------------------------------------------- */

function L(sek) { return { art: "laufen", sek: sek }; }   /* laufen */
function G(sek) { return { art: "gehen",  sek: sek }; }   /* Gehpause */
function Z(sek) { return { art: "flott",  sek: sek }; }   /* zügig gehen */

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

/* --- Die fünfzehn Wochen ---------------------------------
   warm / aus = Auf- und Auslaufen in Sekunden. Beides wird
   kürzer, je länger am Stück gelaufen wird – sonst wird die
   Einheit zu lang für einen normalen Wochentag.
   --------------------------------------------------------- */

var WOCHEN_ROH = [
  {
    nr: 1, titel: "Ankommen", warm: 300, aus: 300,
    ziel: "Zwei Spaziergänge. Noch kein Laufen.",
    fokus: "Diese Woche ist kein Aufwärmprogramm, sondern der wichtigste Teil " +
           "des Plans: Sehnen, Bänder und Gelenke brauchen nach einer langen " +
           "Pause zwei bis drei Wochen Vorlauf, bevor Laufen ihnen guttut. " +
           "Zügig gehen heißt: Du kommst leicht außer Atem, kannst aber noch reden.",
    einheiten: [
      [Z(1200)],
      [Z(1200)]
    ]
  },
  {
    nr: 2, titel: "Die ersten 30 Sekunden", warm: 300, aus: 300,
    ziel: "Sechs- bis achtmal eine halbe Minute laufen.",
    fokus: "30 Sekunden klingen nach wenig. Genau darum geht es: Die Einheit " +
           "soll sich am Ende machbar anfühlen, nicht heldenhaft. Lauf so " +
           "langsam, dass zügiges Gehen kaum langsamer wäre.",
    einheiten: [
      wdh(6, [L(30), G(120)]),
      wdh(8, [L(30), G(105)])
    ]
  },
  {
    nr: 3, titel: "Zehn kurze Stücke", warm: 300, aus: 300,
    ziel: "Zehnmal 30 Sekunden laufen.",
    fokus: "Gleiche Länge, mehr Wiederholungen. Wenn die Waden ziehen: kürzere " +
           "Schritte, Füße flach unter dem Körper aufsetzen, nicht vorne " +
           "hinstampfen.",
    einheiten: [
      wdh(10, [L(30), G(90)]),
      wdh(10, [L(30), G(90)])
    ]
  },
  {
    nr: 4, titel: "45 Sekunden", warm: 300, aus: 300,
    ziel: "Neunmal 45 Sekunden laufen.",
    fokus: "Muskelkater am Tag danach ist normal und verschwindet mit jeder " +
           "Woche. Stechende Schmerzen in Knie, Schienbein oder Achillessehne " +
           "sind es nicht – bei denen pausierst du und gehst stattdessen.",
    einheiten: [
      wdh(9, [L(45), G(90)]),
      wdh(9, [L(45), G(90)])
    ]
  },
  {
    nr: 5, titel: "Die erste Minute", warm: 300, aus: 300,
    ziel: "Achtmal eine Minute laufen.",
    fokus: "Der Sprechtest: Wenn du beim Laufen keinen ganzen Satz sagen " +
           "kannst, bist du zu schnell. Fast alle Anfängerinnen laufen zu " +
           "schnell – langsamer ist hier tatsächlich besser.",
    einheiten: [
      wdh(8, [L(60), G(90)]),
      wdh(8, [L(60), G(90)])
    ]
  },
  {
    nr: 6, titel: "Anderthalb Minuten", warm: 300, aus: 300,
    ziel: "Sechsmal 90 Sekunden laufen.",
    fokus: "Atme in den Bauch statt flach in den Brustkorb: tief ein durch " +
           "Nase und Mund, betont lang aus. Das nimmt dem Seitenstechen die " +
           "Grundlage.",
    einheiten: [
      wdh(6, [L(90), G(120)]),
      wdh(6, [L(90), G(120)])
    ]
  },
  {
    nr: 7, titel: "Zwei Minuten", warm: 300, aus: 300,
    ziel: "Fünfmal zwei Minuten laufen.",
    fokus: "Ab hier zählt die Gewohnheit mehr als die Leistung. Zwei feste " +
           "Termine pro Woche im Kalender schlagen jeden guten Vorsatz.",
    einheiten: [
      wdh(5, [L(120), G(120)]),
      wdh(5, [L(120), G(120)])
    ]
  },
  {
    nr: 8, titel: "Drei Minuten", warm: 300, aus: 300,
    ziel: "Viermal drei Minuten laufen.",
    fokus: "Drei Minuten fühlen sich beim ersten Mal lang an. Das legt sich " +
           "innerhalb der Woche – der Körper gewöhnt sich schneller an Dauer " +
           "als an Tempo.",
    einheiten: [
      wdh(4, [L(180), G(120)]),
      wdh(4, [L(180), G(120)])
    ]
  },
  {
    nr: 9, titel: "Vier Minuten", warm: 300, aus: 300,
    ziel: "Viermal vier Minuten laufen.",
    fokus: "Halbzeit. Schau im Fortschritt nach, wo du vor zwei Monaten " +
           "standest: 30 Sekunden am Stück. Das ist der eigentliche Beweis, " +
           "dass der Plan funktioniert.",
    einheiten: [
      [L(240), G(120), L(240), G(120), L(240), G(120), L(240)],
      [L(240), G(120), L(240), G(120), L(240), G(120), L(240)]
    ]
  },
  {
    nr: 10, titel: "Fünf, dann sechs", warm: 240, aus: 240,
    ziel: "Drei Stücke zu fünf, dann zu sechs Minuten.",
    fokus: "Auf- und Auslaufen werden jetzt kürzer, damit die Einheit in " +
           "eine halbe Stunde passt. Dafür gehst du die letzten Meter nach " +
           "Hause bewusst langsam aus.",
    einheiten: [
      [L(300), G(150), L(300), G(150), L(300)],
      [L(360), G(120), L(360), G(120), L(360)]
    ]
  },
  {
    nr: 11, titel: "Acht und zehn", warm: 240, aus: 240,
    ziel: "Zwei lange Stücke: erst 8, dann 10 Minuten.",
    fokus: "Lange Stücke gelingen über das Tempo. Starte bewusst zu langsam – " +
           "die ersten zehn Minuten fühlen sich immer am schwersten an, danach " +
           "wird es leichter.",
    einheiten: [
      [L(480), G(180), L(480)],
      [L(600), G(180), L(600)]
    ]
  },
  {
    nr: 12, titel: "Der Übergang", warm: 240, aus: 180,
    ziel: "12 und 15 Minuten am Stück, mit einer kurzen Pause.",
    fokus: "Nur noch eine Gehpause pro Einheit. Wenn du sie nicht brauchst, " +
           "lauf durch – wenn doch, ist das kein Rückschritt.",
    einheiten: [
      [L(720), G(180), L(600)],
      [L(900), G(120), L(480)]
    ]
  },
  {
    nr: 13, titel: "Am Stück", warm: 240, aus: 180,
    ziel: "18 und 20 Minuten ohne Gehpause.",
    fokus: "Die erste Einheit ohne jede Pause. Sie ist kürzer als alles davor " +
           "und trotzdem der größte Schritt im ganzen Plan.",
    einheiten: [
      [L(1080)],
      [L(1200)]
    ]
  },
  {
    nr: 14, titel: "Fast da", warm: 240, aus: 180,
    ziel: "22 und 23 Minuten am Stück.",
    fokus: "Zwei Minuten mehr als letzte Woche. Mehr passiert nicht – und " +
           "genau deshalb funktioniert es.",
    einheiten: [
      [L(1320)],
      [L(1380)]
    ]
  },
  {
    nr: 15, titel: "Deine 25 Minuten", warm: 240, aus: 180,
    ziel: "24 und dann 25 Minuten am Stück.",
    fokus: "Die letzte Einheit ist keine Prüfung. Du hast sie in den vierzehn " +
           "Wochen davor längst bestanden.",
    einheiten: [
      [L(1440)],
      [L(1500)]
    ]
  }
];

/* --- Plan aufbauen --------------------------------------- */

function baueEinheit(wocheNr, einheitNr, kern, warm, aus) {
  var bloecke = [];
  if (warm) bloecke.push({ art: "aufwaermen", sek: warm });
  kern.forEach(function (b) { bloecke.push({ art: b.art, sek: b.sek }); });
  if (aus) bloecke.push({ art: "auslaufen", sek: aus });

  var gesamt = 0, laufSek = 0, laengstes = 0, laufBloecke = 0;
  bloecke.forEach(function (b) {
    gesamt += b.sek;
    if (b.art === "laufen") {
      laufSek += b.sek;
      laufBloecke++;
      if (b.sek > laengstes) laengstes = b.sek;
    }
  });

  return {
    id: "w" + wocheNr + "e" + einheitNr,
    woche: wocheNr,
    nr: einheitNr,
    bloecke: bloecke,
    gesamtSek: gesamt,
    laufSek: laufSek,
    laufBloecke: laufBloecke,
    laengstesLaufSek: laengstes,
    kurz: false
  };
}

var PLAN = WOCHEN_ROH.map(function (w) {
  return {
    nr: w.nr,
    titel: w.titel,
    ziel: w.ziel,
    fokus: w.fokus,
    einheiten: w.einheiten.map(function (kern, i) {
      return baueEinheit(w.nr, i + 1, kern, w.warm, w.aus);
    })
  };
});

/* --- Kurzvariante für Tage, an denen alles dazwischenkommt --
   Rund 15 Minuten: kurzes Aufwärmen, etwa die Hälfte der
   Laufzeit, kurzes Auslaufen. Zählt als erledigt.
   --------------------------------------------------------- */

function kurzVariante(einheit) {
  var kern = einheit.bloecke.filter(function (b) {
    return b.art !== "aufwaermen" && b.art !== "auslaufen";
  });
  var neu;

  if (einheit.laufSek === 0) {
    neu = [{ art: "flott", sek: 600 }];                      /* Gehwoche */
  } else if (einheit.laufBloecke === 1) {
    var ziel = Math.max(300, Math.round(einheit.laufSek / 2 / 60) * 60);
    neu = [{ art: "laufen", sek: Math.min(ziel, 600) }];     /* langes Stück kürzen */
  } else {
    var zielLauf = Math.max(60, einheit.laufSek / 2);
    neu = []; var lauf = 0, summe = 0;
    for (var i = 0; i < kern.length && lauf < zielLauf; i++) {
      /* höchstens zehn Minuten Kern, sonst wird die Kurzvariante nicht kurz */
      if (neu.length && summe + kern[i].sek > 600) break;
      neu.push({ art: kern[i].art, sek: kern[i].sek });
      summe += kern[i].sek;
      if (kern[i].art === "laufen") lauf += kern[i].sek;
    }
    while (neu.length && neu[neu.length - 1].art !== "laufen") neu.pop();
    /* ein einzelnes langes Laufstück wird gekappt statt weggelassen */
    if (neu.length === 1 && neu[0].art === "laufen" && neu[0].sek > 600) neu[0].sek = 600;
  }

  var kurz = baueEinheit(einheit.woche, einheit.nr, neu, 180, 120);
  kurz.kurz = true;
  return kurz;
}

/* --- Beschriftung der Blockarten -------------------------- */

var ARTEN = {
  aufwaermen: { name: "Aufwärmen",   kurz: "Warm", ansage: "Aufwärmen. Zügig gehen.", farbe: "warm" },
  laufen:     { name: "Laufen",      kurz: "Lauf", ansage: "Jetzt laufen.",            farbe: "lauf" },
  gehen:      { name: "Gehpause",    kurz: "Geh",  ansage: "Gehpause.",                farbe: "geh"  },
  flott:      { name: "Zügig gehen", kurz: "Geh",  ansage: "Zügig weitergehen.",       farbe: "geh"  },
  auslaufen:  { name: "Auslaufen",   kurz: "Aus",  ansage: "Auslaufen. Locker gehen.", farbe: "warm" }
};

/* --- Motivation ------------------------------------------ */

var SPRUECHE = [
  "Die ersten zehn Minuten lügen. Danach wird es besser.",
  "Du musst heute nicht schnell sein. Du musst nur rausgehen.",
  "Langsam laufen ist laufen.",
  "Zweimal die Woche reicht. Wirklich.",
  "Die Einheit, auf die du am wenigsten Lust hast, bringt am meisten.",
  "Fünfzehn Minuten sind besser als die perfekte halbe Stunde, die ausfällt.",
  "Dein Körper kann mehr, als dein Kopf ihm nach der langen Pause zutraut.",
  "Eine halbe Stunde ist zwei Prozent deines Tages.",
  "Es zählt nicht, wie weit. Es zählt, dass du losgehst.",
  "Niemand schaut. Und wenn: Die laufen selbst nicht.",
  "Du vergleichst dich mit dir von letzter Woche. Mit sonst niemandem.",
  "Wetter ist eine Frage der Kleidung.",
  "Nach dem Laufen hat noch nie jemand bereut, gelaufen zu sein.",
  "Der Plan ist geduldiger als du. Halt dich dran.",
  "Pausen gehören zum Training, nicht zum Scheitern.",
  "Schwer heißt nicht falsch.",
  "Du baust gerade etwas auf, das man erst in Wochen sieht.",
  "Das Unangenehme dauert Minuten. Das Gute bleibt den Tag.",
  "Heute die Schuhe anziehen reicht als Ziel.",
  "Eine ausgefallene Woche ist eine ausgefallene Woche. Kein Scheitern.",
  "Wer regelmäßig langsam läuft, wird schnell. Wer immer schnell läuft, hört auf.",
  "Der Unterschied zwischen dir und Läuferinnen ist: Die sind dabeigeblieben.",
  "Seitenstechen? Tempo raus, tief ausatmen, weitergehen. Nicht heimgehen.",
  "Die halbe Stunde gehört dir. Sonst gehört heute schon genug anderen.",
  "Du bist keine Anfängerin mehr, sobald du das zweite Mal losgegangen bist.",
  "Wiederholen ist kein Rückschritt. Aufhören wäre einer."
];

/* --- Abzeichen ------------------------------------------- */

var ABZEICHEN = [
  { id: "start",     symbol: "🚶", titel: "Losgegangen",     text: "Erste Einheit geschafft." },
  { id: "gelaufen",  symbol: "👟", titel: "Erste Schritte",  text: "Zum ersten Mal wieder gelaufen." },
  { id: "vollewoche",symbol: "🔥", titel: "Volle Woche",     text: "Zwei Einheiten in sieben Tagen." },
  { id: "fuenf",     symbol: "🔁", titel: "Fünf Einheiten",  text: "Fünf Trainings im Kasten." },
  { id: "kurz",      symbol: "⚡", titel: "Trotzdem raus",   text: "Erste Kurzvariante gelaufen." },
  { id: "fuenfmin",  symbol: "⏱️", titel: "Fünf am Stück",   text: "Fünf Minuten ohne Gehpause." },
  { id: "zurueck",   symbol: "💪", titel: "Wieder da",       text: "Nach über zwei Wochen Pause weitergemacht." },
  { id: "halbzeit",  symbol: "🪜", titel: "Halbzeit",        text: "Die Hälfte des Plans liegt hinter dir." },
  { id: "hundert",   symbol: "💯", titel: "100 Laufminuten", text: "Insgesamt 100 Minuten gelaufen." },
  { id: "fuenfzehn", symbol: "🚀", titel: "15 am Stück",     text: "15 Minuten ohne Gehpause." },
  { id: "ziel",      symbol: "🏅", titel: "25 Minuten",      text: "Der ganze Plan. 25 Minuten am Stück." }
];

/* --- Tipps ------------------------------------------------ */

var TIPPS = [
  {
    gruppe: "Für den Anfang",
    symbol: "🌱",
    punkte: [
      ["Tempo", "Der Sprechtest entscheidet, nicht die Uhr: Wenn du beim Laufen " +
       "keinen ganzen Satz sagen kannst, bist du zu schnell. Langsamer als Gehen " +
       "ist erlaubt und bringt trotzdem alles."],
      ["Schuhe", "Das Einzige, was du wirklich brauchst. Einmal in einen Laufladen " +
       "gehen und beraten lassen – alte Turnschuhe sind der häufigste Grund für " +
       "Knie- und Schienbeinschmerzen bei Anfängerinnen."],
      ["Muskelkater oder Schmerz", "Dumpfer Muskelkater am Tag danach gehört dazu. " +
       "Stechende oder einseitige Schmerzen in Knie, Schienbein oder Achillessehne " +
       "nicht: zwei Einheiten nur gehen, dann eine Woche zurück im Plan. Bleibt es, " +
       "ärztlich abklären."],
      ["Seitenstechen", "Tempo raus, weitergehen, betont lang ausatmen. Nicht " +
       "abbrechen und nicht heimgehen – es verschwindet innerhalb einer Minute."],
      ["Abbruchregel", "Wenn ein Intervall nicht geht: langsamer werden statt " +
       "stehen bleiben. Und wenn auch das nicht geht, die Einheit als Gehrunde " +
       "zu Ende bringen. Sie zählt trotzdem."]
    ]
  },
  {
    gruppe: "Wenn's eng wird",
    symbol: "⏳",
    punkte: [
      ["Kurzvariante", "Jede Einheit hat eine 15-Minuten-Version. Sie ist kein " +
       "halbes Training, sondern die Versicherung gegen ausgefallene Wochen – und " +
       "zählt im Plan voll."],
      ["Zwei feste Termine", "Zwei Einheiten pro Woche mit Datum im Kalender halten " +
       "besser als drei geplante ohne. Der Rest des Tages verplant sich von selbst."],
      ["Direkt losgehen", "Laufsachen am Abend vorher rauslegen. Die meisten " +
       "Einheiten fallen nicht am Laufen aus, sondern am Umziehen."],
      ["Ausgefallene Woche", "Bis zu zwei Wochen Pause: an derselben Stelle " +
       "weitermachen. Länger: eine Woche im Plan zurück. Dafür gibt es in der " +
       "Planansicht bei jeder Woche „Woche wiederholen“."]
    ]
  },
  {
    gruppe: "Mit Kind",
    symbol: "🧒",
    punkte: [
      ["Buggy", "Mit Kinderwagen laufen geht ab Woche 5 gut – vorher sind die " +
       "Intervalle zu kurz fürs Anfahren. Einhändig schieben und alle paar Minuten " +
       "die Seite wechseln, sonst zieht eine Schulter hoch."],
      ["Laufrad oder Roller", "Ab etwa vier Jahren die entspannteste Variante: Das " +
       "Kind fährt, du läufst. Die Gehpausen werden zu Wartepausen – die " +
       "Intervalllängen bleiben trotzdem."],
      ["Spielplatzrunden", "Runden um den Spielplatz statt Strecke. Funktioniert " +
       "bei jedem Intervall, und du bist nie weiter als dreißig Sekunden weg."],
      ["Einheit teilen", "Notfalls zwei Hälften am selben Tag: Aufwärmen plus " +
       "halbe Intervalle morgens, der Rest abends. Nicht ideal, aber besser als " +
       "ausfallen lassen."]
    ]
  },
  {
    gruppe: "Dunkel und kalt",
    symbol: "🌙",
    punkte: [
      ["Sichtbarkeit", "Reflektorweste oder Reflektorband, dazu eine kleine " +
       "Stirnlampe. Nicht wegen des Sehens – wegen des Gesehenwerdens an " +
       "Einfahrten und Kreuzungen."],
      ["Zwiebelprinzip", "Beim Losgehen soll dir leicht kalt sein. Als Faustregel: " +
       "anziehen, als wären es zehn Grad mehr. Was warm hält, sind Mütze und " +
       "Handschuhe, nicht die dicke Jacke."],
      ["Strecke", "Im Dunkeln beleuchtete Runden von zehn Minuten laufen statt " +
       "einer langen Strecke. Jemandem sagen, wo du läufst."],
      ["Ersatz drinnen", "Bei Glatteis oder Sturm: dieselbe Einheit im Stand – " +
       "Laufintervalle als Kniehebelauf oder Treppenhaus, Gehpausen als Gehen auf " +
       "der Stelle. Der Timer läuft genauso, die Einheit zählt."]
    ]
  }
];
