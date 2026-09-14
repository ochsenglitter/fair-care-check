/* ============================================================
   Laufstart – Anwendungslogik
   Alles im Browser, alles in localStorage. Kein Build, kein Backend.
   ============================================================ */

(function () {
  "use strict";

  var SPEICHER = "laufstart.v1";   /* Schlüssel bleibt, Inhalt wird migriert */
  var TAGE_KURZ = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  var TAGE_LANG = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
  var GEFUEHLE  = ["😣", "😕", "🙂", "😃", "🤩"];
  var SEITEN    = ["heute", "plan", "fortschritt", "tipps"];

  /* ==========================================================
     1. Zustand
     ========================================================== */

  function standard() {
    return {
      version: 2,
      erledigt: {},        /* id -> { datum, kurz }  – Stand im Plan */
      verlauf: [],         /* alle gelaufenen Einheiten, auch Wiederholungen */
      tage: [0, 3],        /* Montag und Donnerstag */
      proWoche: 2,
      abzeichen: {},
      ton: true,
      stimme: true,
      vibration: true,
      wachhalten: true
    };
  }

  var zustand = laden();

  function laden() {
    try {
      var roh = localStorage.getItem(SPEICHER);
      if (!roh) return standard();
      return migriere(JSON.parse(roh));
    } catch (e) {
      return standard();
    }
  }

  /* Ältere Stände (nur „erledigt", kein Verlauf) übernehmen */
  function migriere(d) {
    var s = standard();
    for (var k in s) if (d[k] !== undefined) s[k] = d[k];

    if (!Array.isArray(s.verlauf) || (!s.verlauf.length && Object.keys(s.erledigt).length)) {
      s.verlauf = [];
      Object.keys(s.erledigt).forEach(function (id) {
        var e = einheitNachId(id);
        var alt = s.erledigt[id] || {};
        if (!e) return;
        s.verlauf.push({
          id: id, woche: e.woche, nr: e.nr,
          datum: alt.datum || null,
          dauer: alt.dauer || e.gesamtSek,
          laufSek: e.laufSek,
          laengstes: e.laengstesLaufSek,
          gefuehl: alt.gefuehl || null,
          notiz: alt.notiz || "",
          kurz: false
        });
      });
    }
    s.version = 2;
    return s;
  }

  function sichern() {
    try {
      localStorage.setItem(SPEICHER, JSON.stringify(zustand));
    } catch (e) { /* privater Modus o. ä. – die App läuft trotzdem */ }
  }

  /* ==========================================================
     2. Kleine Helfer
     ========================================================== */

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function mmss(sek) {
    sek = Math.max(0, Math.round(sek));
    var m = Math.floor(sek / 60), s = sek % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function minText(sek) {
    var m = Math.round(sek / 60);
    if (m < 60) return m + " min";
    var h = Math.floor(m / 60);
    return h + " h " + (m % 60) + " min";
  }

  function dauerText(sek) {
    if (sek < 60) return sek + " Sek.";
    var m = sek / 60;
    return (m % 1 === 0 ? m : m.toFixed(1).replace(".", ",")) + " Min.";
  }

  function isoVon(d) {
    return d.getFullYear() + "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
      ("0" + d.getDate()).slice(-2);
  }

  function heuteIso() { return isoVon(new Date()); }

  function datumHuebsch(iso) {
    var t = String(iso).split("-");
    return t.length === 3 ? t[2] + "." + t[1] + "." + t[0] : "";
  }

  function tageZwischen(isoA, isoB) {
    var a = new Date(isoA + "T00:00:00"), b = new Date(isoB + "T00:00:00");
    return Math.round((b - a) / 86400000);
  }

  /* Montag = 0 … Sonntag = 6 */
  function wochentagIndex(d) { return (d.getDay() + 6) % 7; }

  /* ==========================================================
     3. Ableitungen aus dem Plan
     ========================================================== */

  function alleEinheiten() {
    var raus = [];
    PLAN.forEach(function (w) { w.einheiten.forEach(function (e) { raus.push(e); }); });
    return raus;
  }

  function einheitNachId(id) {
    var alle = alleEinheiten();
    for (var i = 0; i < alle.length; i++) if (alle[i].id === id) return alle[i];
    return null;
  }

  function wocheVon(einheit) { return PLAN[einheit.woche - 1]; }

  function istErledigt(id) { return !!zustand.erledigt[id]; }

  function naechsteEinheit() {
    var alle = alleEinheiten();
    for (var i = 0; i < alle.length; i++) if (!istErledigt(alle[i].id)) return alle[i];
    return null;
  }

  function statistik() {
    var v = zustand.verlauf;
    var trainingsSek = 0, laufSek = 0, laengstes = 0, kurzAnzahl = 0;
    var daten = [];

    v.forEach(function (x) {
      trainingsSek += x.dauer || 0;
      laufSek += x.laufSek || 0;
      if ((x.laengstes || 0) > laengstes) laengstes = x.laengstes;
      if (x.kurz) kurzAnzahl++;
      if (x.datum) daten.push(x.datum);
    });

    daten.sort();
    var heute = heuteIso();
    var letzte = daten.length ? daten[daten.length - 1] : null;

    var letzte7 = daten.filter(function (iso) {
      var diff = tageZwischen(iso, heute);
      return diff >= 0 && diff < 7;
    }).length;

    /* längste Pause zwischen zwei Einheiten */
    var groessteLuecke = 0;
    for (var i = 1; i < daten.length; i++) {
      var l = tageZwischen(daten[i - 1], daten[i]);
      if (l > groessteLuecke) groessteLuecke = l;
    }

    return {
      anzahl: Object.keys(zustand.erledigt).length,
      gesamt: alleEinheiten().length,
      einheitenGelaufen: v.length,
      trainingsSek: trainingsSek,
      laufSek: laufSek,
      laengstes: laengstes,
      kurzAnzahl: kurzAnzahl,
      daten: daten,
      letztesDatum: letzte,
      tageSeitLetztem: letzte ? tageZwischen(letzte, heute) : null,
      inLetzten7Tagen: letzte7,
      groessteLuecke: groessteLuecke
    };
  }

  /* ==========================================================
     4. Abzeichen
     ========================================================== */

  function pruefeAbzeichen() {
    var st = statistik();
    var v = zustand.verlauf;

    var zweiInWoche = false;
    for (var i = 0; i + 1 < st.daten.length; i++) {
      if (tageZwischen(st.daten[i], st.daten[i + 1]) <= 6) { zweiInWoche = true; break; }
    }

    var bedingungen = {
      start:      st.einheitenGelaufen >= 1,
      gelaufen:   v.some(function (x) { return (x.laufSek || 0) > 0; }),
      vollewoche: zweiInWoche,
      fuenf:      st.einheitenGelaufen >= 5,
      kurz:       st.kurzAnzahl >= 1,
      fuenfmin:   st.laengstes >= 300,
      zurueck:    st.groessteLuecke >= 14,
      halbzeit:   st.anzahl >= Math.ceil(st.gesamt / 2),
      hundert:    st.laufSek >= 6000,
      fuenfzehn:  st.laengstes >= 900,
      ziel:       st.anzahl >= st.gesamt
    };

    var neu = [];
    ABZEICHEN.forEach(function (a) {
      if (bedingungen[a.id] && !zustand.abzeichen[a.id]) {
        zustand.abzeichen[a.id] = heuteIso();
        neu.push(a);
      }
    });
    if (neu.length) sichern();
    return neu;
  }

  /* ==========================================================
     5. Ton, Stimme, Vibration
     ========================================================== */

  var Klang = {
    ctx: null,

    wecken: function () {
      if (!zustand.ton) return;
      try {
        if (!this.ctx) {
          var AC = window.AudioContext || window.webkitAudioContext;
          if (!AC) return;
          this.ctx = new AC();
        }
        if (this.ctx.state === "suspended") this.ctx.resume();
      } catch (e) { this.ctx = null; }
    },

    piep: function (frequenz, dauer, verzug, laut) {
      if (!zustand.ton || !this.ctx) return;
      try {
        var t = this.ctx.currentTime + (verzug || 0);
        var osz = this.ctx.createOscillator();
        var hue = this.ctx.createGain();
        osz.type = "sine";
        osz.frequency.setValueAtTime(frequenz, t);
        hue.gain.setValueAtTime(0.0001, t);
        hue.gain.exponentialRampToValueAtTime(laut || 0.35, t + 0.02);
        hue.gain.exponentialRampToValueAtTime(0.0001, t + dauer);
        osz.connect(hue); hue.connect(this.ctx.destination);
        osz.start(t); osz.stop(t + dauer + 0.05);
      } catch (e) { /* Ton ist Zubehör, kein Muss */ }
    },

    signal: function (art) {
      this.wecken();
      if (art === "laufen")      { this.piep(880, .16, 0); this.piep(1174, .16, .17); this.piep(1568, .3, .34); }
      else if (art === "gehen")  { this.piep(660, .18, 0); this.piep(440, .3, .2); }
      else if (art === "tick")   { this.piep(760, .08, 0, .22); }
      else if (art === "fertig") { this.piep(660, .16, 0); this.piep(880, .16, .16); this.piep(1046, .16, .32); this.piep(1318, .5, .48); }
      else                       { this.piep(520, .25, 0); }
    },

    ruettel: function (muster) {
      if (!zustand.vibration) return;
      if (navigator.vibrate) { try { navigator.vibrate(muster); } catch (e) {} }
    },

    sprich: function (text) {
      if (!zustand.stimme || !window.speechSynthesis) return;
      try {
        var s = new SpeechSynthesisUtterance(text);
        s.lang = "de-DE"; s.rate = 1.05;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(s);
      } catch (e) {}
    }
  };

  /* ==========================================================
     6. Bausteine für die Anzeige einer Einheit
     ========================================================== */

  function streifenHtml(einheit) {
    var legende = einheit.laufSek
      ? '<span><b style="background:var(--lauf)"></b>Laufen</span>' +
        '<span><b style="background:var(--geh)"></b>Gehen</span>' +
        '<span><b style="background:#4a5462"></b>Auf- und Auslaufen</span>'
      : '<span><b style="background:var(--geh)"></b>Zügig gehen</span>' +
        '<span><b style="background:#4a5462"></b>Auf- und Auslaufen</span>';

    return '<div class="streifen">' + einheit.bloecke.map(function (b) {
      return '<i class="' + ARTEN[b.art].farbe + '" style="flex:' + b.sek + '"></i>';
    }).join("") + '</div><div class="legende">' + legende + '</div>';
  }

  function passt(bloecke, start, muster) {
    for (var k = 0; k < muster.length; k++) {
      var b = bloecke[start + k];
      if (!b || b.art !== muster[k].art || b.sek !== muster[k].sek) return false;
    }
    return true;
  }

  function bloeckeHtml(einheit) {
    var zeilen = [], i = 0;
    while (i < einheit.bloecke.length) {
      var b = einheit.bloecke[i];
      var muster = [b], j = i + 1;
      if (b.art === "laufen" && einheit.bloecke[j] && einheit.bloecke[j].art === "gehen") {
        muster.push(einheit.bloecke[j]); j++;
      }
      var n = 1, schritt = muster.length;
      while (passt(einheit.bloecke, i + n * schritt, muster)) n++;

      if (n > 1) {
        var summe = n * muster.reduce(function (a, m) { return a + m.sek; }, 0);
        zeilen.push('<li><span class="punkt lauf"></span><span>' + n + ' × ' +
          muster.map(function (m) { return dauerText(m.sek) + " " + ARTEN[m.art].name.toLowerCase(); }).join(" / ") +
          '</span><span class="dauer">' + minText(summe) + '</span></li>');
        i += n * schritt;
      } else {
        zeilen.push('<li><span class="punkt ' + ARTEN[b.art].farbe + '"></span><span>' +
          ARTEN[b.art].name + '</span><span class="dauer">' + dauerText(b.sek) + '</span></li>');
        i++;
      }
    }
    return '<ul class="bloecke">' + zeilen.join("") + '</ul>';
  }

  function zahlenHtml(einheit) {
    if (!einheit.laufSek) {
      return '<div class="zahlenzeile">' +
        '<div class="zahl"><b>' + Math.round(einheit.gesamtSek / 60) + '</b><span>Minuten gesamt</span></div>' +
        '<div class="zahl"><b>0</b><span>Minuten laufen</span></div>' +
        '<div class="zahl"><b>zügig</b><span>Gehtempo</span></div>' +
      '</div>';
    }
    return '<div class="zahlenzeile">' +
      '<div class="zahl"><b>' + Math.round(einheit.gesamtSek / 60) + '</b><span>Minuten gesamt</span></div>' +
      '<div class="zahl"><b>' + Math.round(einheit.laufSek / 60) + '</b><span>Minuten laufen</span></div>' +
      '<div class="zahl"><b>' + dauerText(einheit.laengstesLaufSek) + '</b><span>längstes Stück</span></div>' +
    '</div>';
  }

  /* ==========================================================
     7. Ansicht „Heute"
     ========================================================== */

  function naechsterTrainingstagText() {
    if (!zustand.tage.length) return "Keine Trainingstage gewählt.";
    var heute = wochentagIndex(new Date());
    if (zustand.tage.indexOf(heute) !== -1) return "Heute ist Trainingstag.";
    for (var i = 1; i <= 7; i++) {
      var t = (heute + i) % 7;
      if (zustand.tage.indexOf(t) !== -1) {
        return "Nächster Trainingstag: " + (i === 1 ? "morgen" : TAGE_LANG[t]) + ".";
      }
    }
    return "";
  }

  function zeichneHeute() {
    var e = naechsteEinheit();
    var st = statistik();

    $("wochenChip").textContent = e
      ? "Woche " + e.woche + " von " + PLAN.length
      : "Plan geschafft";

    var k = $("heuteKarte");

    if (!e) {
      k.innerHTML =
        '<div class="etikett">Geschafft</div>' +
        '<div class="heute-kopf"><span class="titel">Du läufst 25 Minuten am Stück.</span></div>' +
        '<p>' + PLAN.length + ' Wochen, ' + st.einheitenGelaufen + ' Einheiten, ' +
        minText(st.laufSek) + ' Laufzeit. Angefangen hast du mit einem Spaziergang.</p>' +
        '<p>Was jetzt kommt: dieselben zwei Einheiten pro Woche, nur ohne Plan im Nacken. ' +
        'Halt die 25 Minuten vier Wochen lang, dann häng alle zwei Wochen zwei Minuten dran – ' +
        'so kommst du bis Ostern auf 5 Kilometer.</p>' +
        '<div class="knopfzeile">' +
          '<button class="knopf" id="nochmal">Letzte Einheit noch einmal</button>' +
          '<button class="knopf zweit" data-zu="fortschritt">Fortschritt ansehen</button>' +
        '</div>';
      var letzte = alleEinheiten()[alleEinheiten().length - 1];
      $("nochmal").onclick = function () { Trainer.start(letzte, true); };
    } else {
      var w = wocheVon(e);
      var schonHeute = st.letztesDatum === heuteIso();
      var status = "";

      if (schonHeute) {
        status = '<div class="hinweis" style="margin-bottom:14px">Heute schon trainiert. ' +
                 'Der Ruhetag danach gehört zum Plan – die nächste Einheit wartet.</div>';
      } else if (st.tageSeitLetztem === 1) {
        status = '<div class="hinweis" style="margin-bottom:14px">Gestern bist du gelaufen. ' +
                 'Zwischen zwei Einheiten sollten ein bis zwei Tage liegen – wenn die Beine ' +
                 'schwer sind, heute lieber spazieren.</div>';
      } else if (st.tageSeitLetztem !== null && st.tageSeitLetztem >= 14) {
        status = '<div class="hinweis achtung" style="margin-bottom:14px">' +
                 '<b style="display:block">Deine letzte Einheit ist ' + st.tageSeitLetztem + ' Tage her.</b>' +
                 'Nach mehr als zwei Wochen Pause eine Woche zurückgehen und sie wiederholen. ' +
                 'Das ist kein Rückschritt, sondern der kürzere Weg.' +
                 (e.woche > 1 ? '<div class="knopfzeile" style="margin-top:10px">' +
                   '<button class="knopf zweit klein" id="zurueckWoche">Woche ' + (e.woche - 1) + ' wiederholen</button>' +
                 '</div>' : '') +
                 '</div>';
      }

      var istGehrunde = !e.laufSek;
      var kurz = kurzVariante(e);

      k.innerHTML =
        status +
        '<div class="etikett">Deine nächste Einheit</div>' +
        '<div class="heute-kopf">' +
          '<span class="titel">Woche ' + e.woche + ' · Einheit ' + e.nr + '</span>' +
          '<span class="meta">' + esc(w.titel) + (istGehrunde ? ' · Gehrunde' : '') + '</span>' +
        '</div>' +
        '<p style="color:var(--leise);margin-top:6px">' + esc(w.ziel) + '</p>' +
        zahlenHtml(e) +
        streifenHtml(e) +
        bloeckeHtml(e) +
        '<div class="knopfzeile" style="margin-top:18px">' +
          '<button class="knopf voll" id="start">▶︎ Training starten</button>' +
        '</div>' +
        '<div class="knopfzeile" style="margin-top:10px">' +
          '<button class="knopf zweit klein" id="startKurz">Nur ' +
            Math.round(kurz.gesamtSek / 60) + ' Min. Zeit? Kurzvariante</button>' +
          '<button class="knopf zweit klein" id="ohneTimer">Ohne Timer gelaufen</button>' +
        '</div>' +
        '<p style="margin-top:12px;font-size:.84rem;color:var(--leise)">' +
          'Die Kurzvariante ist kein halbes Training: ' +
          (kurz.laufSek ? Math.round(kurz.laufSek / 60) + ' Minuten laufen in ' +
            Math.round(kurz.gesamtSek / 60) + ' Minuten. ' : '') +
          'Sie zählt im Plan genauso.</p>';

      $("start").onclick = function () { Trainer.start(e); };
      $("startKurz").onclick = function () { Trainer.start(kurz); };
      $("ohneTimer").onclick = function () {
        var neu = einheitSpeichern(e, e.gesamtSek, null, "");
        zeichneAlles();
        if (neu.length) zeigeAbzeichen(neu);
        wechsle("fortschritt");
      };
      if ($("zurueckWoche")) {
        $("zurueckWoche").onclick = function () { wocheWiederholen(e.woche - 1); };
      }
    }

    /* --- Trainingstage --- */
    $("tageKarte").innerHTML =
      '<div class="etikett">Trainingstage</div>' +
      '<p style="font-size:.92rem;color:var(--leise)">Zwei Einheiten pro Woche mit ' +
      'mindestens zwei Tagen Pause dazwischen. Vorschlag: Montag und Donnerstag.</p>' +
      '<div class="tage">' + TAGE_KURZ.map(function (t, i) {
        return '<button data-tag="' + i + '" aria-pressed="' +
          (zustand.tage.indexOf(i) !== -1) + '">' + t + '</button>';
      }).join("") + '</div>' +
      '<p style="margin-top:12px;font-size:.92rem"><b>' + naechsterTrainingstagText() + '</b></p>';

    Array.prototype.forEach.call($("tageKarte").querySelectorAll("[data-tag]"), function (b) {
      b.onclick = function () {
        var i = +b.getAttribute("data-tag");
        var pos = zustand.tage.indexOf(i);
        if (pos === -1) zustand.tage.push(i); else zustand.tage.splice(pos, 1);
        zustand.tage.sort(function (a, b2) { return a - b2; });
        sichern();
        zeichneHeute();
      };
    });

    /* --- Motivation --- */
    var tagNr = Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000);
    var spruch = SPRUECHE[tagNr % SPRUECHE.length];
    var fokus = e ? wocheVon(e).fokus
                  : "Du hast den Plan durchgezogen. Das schafft kaum jemand beim ersten Anlauf.";

    $("spruchKarte").innerHTML =
      '<div class="etikett">Für heute</div>' +
      '<p class="spruch">' + esc(spruch) + '</p>' +
      '<div class="hinweis" style="margin-top:14px">' +
        '<b style="display:block;margin-bottom:4px">' +
        (e ? "Fokus in Woche " + e.woche : "Und jetzt?") + '</b>' + esc(fokus) +
      '</div>' +
      '<div class="knopfzeile" style="margin-top:14px">' +
        '<button class="knopf zweit klein" data-zu="tipps">Tipps für Anfängerinnen</button>' +
      '</div>';
  }

  /* ==========================================================
     8. Ansicht „Plan"
     ========================================================== */

  function zeichnePlan() {
    var aktiv = naechsteEinheit();

    var html = PLAN.map(function (w) {
      var fertigAnzahl = w.einheiten.filter(function (e) { return istErledigt(e.id); }).length;
      var kompl = fertigAnzahl === w.einheiten.length;
      var laeuft = aktiv && aktiv.woche === w.nr;

      var zeilen = w.einheiten.map(function (e) {
        var d = zustand.erledigt[e.id];
        var istNaechste = aktiv && aktiv.id === e.id;
        return '<div class="einheit-zeile">' +
          '<button class="haken" data-haken="' + e.id + '" aria-pressed="' + !!d + '" ' +
            'aria-label="Einheit ' + e.nr + ' abhaken">✓</button>' +
          '<div class="e-text">' +
            '<b>Einheit ' + e.nr + (e.laufSek ? '' : ' · Gehrunde') + '</b>' +
            '<span>' + Math.round(e.gesamtSek / 60) + ' Min.' +
              (e.laufSek ? ' · ' + Math.round(e.laufSek / 60) + ' Min. laufen · längstes Stück ' +
                dauerText(e.laengstesLaufSek) : ' · zügig gehen') +
              (d && d.datum ? ' · ' + datumHuebsch(d.datum) + (d.kurz ? ' (kurz)' : '') : '') +
            '</span>' +
          '</div>' +
          '<button class="knopf klein ' + (istNaechste ? '' : 'zweit') + '" data-start="' + e.id + '">' +
            (istNaechste ? '▶︎ Start' : 'Starten') + '</button>' +
        '</div>';
      }).join("");

      return '<details class="woche ' + (kompl ? 'fertig' : laeuft ? 'laeuft' : '') + '"' +
             (laeuft ? ' open' : '') + '>' +
        '<summary>' +
          '<span class="w-nr">' + (kompl ? '✓' : w.nr) + '</span>' +
          '<span class="w-text"><b>Woche ' + w.nr + ' · ' + esc(w.titel) + '</b>' +
            '<span>' + esc(w.ziel) + '</span></span>' +
          '<span class="w-punkte">' + w.einheiten.map(function (e) {
            return '<i class="' + (istErledigt(e.id) ? 'ok' : '') + '"></i>';
          }).join("") + '</span>' +
        '</summary>' +
        '<div class="inhalt">' + zeilen +
          '<div class="hinweis" style="margin-top:12px">' + esc(w.fokus) + '</div>' +
          (fertigAnzahl
            ? '<div class="knopfzeile" style="margin-top:12px">' +
                '<button class="knopf zweit klein" data-wdh="' + w.nr + '">Woche wiederholen</button>' +
              '</div>'
            : '') +
        '</div>' +
      '</details>';
    }).join("");

    var l = $("planListe");
    l.innerHTML = html;

    Array.prototype.forEach.call(l.querySelectorAll("[data-haken]"), function (b) {
      b.onclick = function () {
        var id = b.getAttribute("data-haken");
        if (zustand.erledigt[id]) {
          delete zustand.erledigt[id];
          sichern();
          zeichneAlles();
        } else {
          var e = einheitNachId(id);
          var neu = einheitSpeichern(e, e.gesamtSek, null, "");
          zeichneAlles();
          if (neu.length) zeigeAbzeichen(neu);
        }
      };
    });

    Array.prototype.forEach.call(l.querySelectorAll("[data-start]"), function (b) {
      b.onclick = function () {
        var id = b.getAttribute("data-start");
        Trainer.start(einheitNachId(id), istErledigt(id));
      };
    });

    Array.prototype.forEach.call(l.querySelectorAll("[data-wdh]"), function (b) {
      b.onclick = function () { wocheWiederholen(+b.getAttribute("data-wdh")); };
    });
  }

  /* Setzt die Haken einer Woche zurück. Der Verlauf und damit alle
     Zahlen und Abzeichen bleiben erhalten. */
  function wocheWiederholen(nr) {
    var w = PLAN[nr - 1];
    if (!w) return;
    if (!confirm("Woche " + nr + " noch einmal laufen?\n\nDie Haken dieser Woche werden " +
                 "entfernt. Deine gelaufenen Einheiten, Zahlen und Abzeichen bleiben erhalten.")) return;
    w.einheiten.forEach(function (e) { delete zustand.erledigt[e.id]; });
    sichern();
    zeichneAlles();
    wechsle("heute");
  }

  /* ==========================================================
     9. Ansicht „Fortschritt"
     ========================================================== */

  function zeichneFortschritt() {
    var st = statistik();
    var prozent = Math.round((st.anzahl / st.gesamt) * 100);
    var umfang = 2 * Math.PI * 48;

    $("fortschrittKarte").innerHTML =
      '<div class="ring-zeile">' +
        '<div class="ring">' +
          '<svg viewBox="0 0 108 108" width="108" height="108">' +
            '<circle cx="54" cy="54" r="48" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="9"></circle>' +
            '<circle cx="54" cy="54" r="48" fill="none" stroke="var(--ok)" stroke-width="9" stroke-linecap="round" ' +
              'stroke-dasharray="' + umfang.toFixed(1) + '" stroke-dashoffset="' +
              (umfang * (1 - st.anzahl / st.gesamt)).toFixed(1) + '"></circle>' +
          '</svg>' +
          '<div class="mitte"><b>' + prozent + '%</b><span>vom Plan</span></div>' +
        '</div>' +
        '<div>' +
          '<h2 style="margin-bottom:2px">' + st.anzahl + ' von ' + st.gesamt + ' Einheiten</h2>' +
          '<p style="color:var(--leise);font-size:.92rem">' + fortschrittSatz(st) + '</p>' +
        '</div>' +
      '</div>';

    $("statistikKarte").innerHTML =
      '<div class="etikett">Deine Zahlen</div>' +
      '<div class="kacheln">' +
        '<div class="kachel"><b>' + minText(st.trainingsSek) + '</b><span>Trainingszeit gesamt</span></div>' +
        '<div class="kachel"><b>' + minText(st.laufSek) + '</b><span>davon gelaufen</span></div>' +
        '<div class="kachel"><b>' + (st.laengstes ? dauerText(st.laengstes) : "–") + '</b><span>längstes Laufstück</span></div>' +
        '<div class="kachel"><b>' + st.inLetzten7Tagen + ' / ' + zustand.proWoche + '</b><span>Einheiten diese Woche</span></div>' +
      '</div>';

    $("heatKarte").innerHTML =
      '<div class="etikett">Die letzten acht Wochen</div>' + heatHtml(st) +
      '<p style="margin-top:12px;font-size:.85rem;color:var(--leise)">' +
        (st.letztesDatum
          ? "Letztes Training: " + datumHuebsch(st.letztesDatum) +
            (st.tageSeitLetztem === 0 ? " (heute)" : st.tageSeitLetztem === 1 ? " (gestern)" :
             " (vor " + st.tageSeitLetztem + " Tagen)")
          : "Noch kein Training eingetragen.") +
      '</p>';

    $("abzeichenKarte").innerHTML =
      '<div class="etikett">Abzeichen</div>' +
      '<div class="abzeichen">' + ABZEICHEN.map(function (a) {
        var hat = !!zustand.abzeichen[a.id];
        return '<div class="abz ' + (hat ? 'hat' : '') + '" title="' + esc(a.text) + '">' +
          '<span class="sym">' + a.symbol + '</span><b>' + esc(a.titel) + '</b>' +
          '<span>' + esc(hat ? a.text : "noch offen") + '</span></div>';
      }).join("") + '</div>';

    var eintraege = zustand.verlauf.slice().sort(function (a, b) {
      return String(b.datum || "").localeCompare(String(a.datum || ""));
    }).slice(0, 12);

    $("verlaufKarte").innerHTML =
      '<div class="etikett">Verlauf</div>' +
      (eintraege.length
        ? '<ul class="verlauf">' + eintraege.map(function (x) {
            return '<li>' +
              '<span class="gefuehl">' + (x.gefuehl ? GEFUEHLE[x.gefuehl - 1] : "👟") + '</span>' +
              '<span><b>W' + x.woche + ' · Einheit ' + x.nr + (x.kurz ? ' · kurz' : '') + '</b>' +
                (x.notiz ? '<br><span style="color:var(--leise);font-size:.84rem">' + esc(x.notiz) + '</span>' : '') +
              '</span>' +
              '<span class="datum">' + datumHuebsch(x.datum) + '</span>' +
            '</li>';
          }).join("") + '</ul>'
        : '<p style="color:var(--leise)">Hier stehen deine Einheiten, sobald die erste im Kasten ist.</p>');

    zeichneEinstellungen();
  }

  function fortschrittSatz(st) {
    if (st.anzahl === 0) {
      return "Noch nichts eingetragen. Die erste Einheit ist ein halbstündiger Spaziergang – " +
             "gelaufen wird erst ab Woche 2.";
    }
    if (st.anzahl >= st.gesamt) return "Plan komplett. 25 Minuten am Stück.";
    var e = naechsteEinheit();
    return "Als Nächstes: Woche " + e.woche + ", Einheit " + e.nr + ". Noch " +
      (st.gesamt - st.anzahl) + " Einheiten – bei zwei pro Woche etwa " +
      Math.ceil((st.gesamt - st.anzahl) / 2) + " Wochen.";
  }

  function heatHtml(st) {
    var heute = new Date(); heute.setHours(0, 0, 0, 0);
    var ende = new Date(heute);
    ende.setDate(ende.getDate() + (6 - wochentagIndex(heute)));
    var start = new Date(ende);
    start.setDate(start.getDate() - 55);

    var gesetzt = {};
    st.daten.forEach(function (d) { gesetzt[d] = true; });

    var zellen = [];
    for (var i = 0; i < 56; i++) {
      var d = new Date(start);
      d.setDate(start.getDate() + i);
      var iso = isoVon(d);
      var klassen = [];
      if (gesetzt[iso]) klassen.push("ok");
      if (iso === heuteIso()) klassen.push("heute");
      zellen.push('<i class="' + klassen.join(" ") + '" title="' + datumHuebsch(iso) + '"></i>');
    }

    return '<div class="heat-kopf">' + TAGE_KURZ.map(function (t) { return '<span>' + t + '</span>'; }).join("") + '</div>' +
           '<div class="heat">' + zellen.join("") + '</div>';
  }

  function zeichneEinstellungen() {
    $("einstellungenKarte").innerHTML =
      '<div class="etikett">Einstellungen</div>' +
      schalter("ton", "Signaltöne", "Piep beim Wechsel zwischen Laufen und Gehen") +
      schalter("stimme", "Ansagen", "Sagt an, was als Nächstes dran ist") +
      schalter("vibration", "Vibration", "Zusätzlich vibrieren (nur am Handy)") +
      schalter("wachhalten", "Bildschirm anlassen", "Verhindert das Sperren während des Trainings") +
      '<div class="knopfzeile" style="margin-top:16px">' +
        '<button class="knopf zweit klein" id="export">Daten sichern</button>' +
        '<button class="knopf zweit klein" id="importKnopf">Daten laden</button>' +
        '<button class="knopf zweit klein" id="reset">Zurücksetzen</button>' +
      '</div>' +
      '<input type="file" id="importDatei" accept="application/json" style="display:none">';

    ["ton", "stimme", "vibration", "wachhalten"].forEach(function (k) {
      var el = $("sch-" + k);
      el.onchange = function () { zustand[k] = el.checked; sichern(); };
    });

    $("export").onclick = function () {
      var blob = new Blob([JSON.stringify(zustand, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "laufstart-" + heuteIso() + ".json";
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    };

    $("importKnopf").onclick = function () { $("importDatei").click(); };
    $("importDatei").onchange = function () {
      var f = this.files[0];
      if (!f) return;
      var leser = new FileReader();
      leser.onload = function () {
        try {
          var d = JSON.parse(leser.result);
          if (!d || typeof d !== "object" || !d.erledigt) throw new Error("Format");
          zustand = migriere(d); sichern(); zeichneAlles();
          alert("Daten geladen.");
        } catch (e) {
          alert("Diese Datei passt nicht. Erwartet wird eine Sicherung aus Laufstart.");
        }
      };
      leser.readAsText(f);
      this.value = "";
    };

    $("reset").onclick = function () {
      if (confirm("Wirklich alles löschen? Alle Einheiten, Abzeichen und Notizen sind dann weg.")) {
        zustand = standard(); sichern(); zeichneAlles();
      }
    };
  }

  function schalter(schluessel, titel, text) {
    return '<label class="schalter"><span class="txt"><b>' + titel + '</b><span>' + text + '</span></span>' +
      '<input type="checkbox" id="sch-' + schluessel + '"' + (zustand[schluessel] ? " checked" : "") + '></label>';
  }

  /* ==========================================================
     10. Ansicht „Tipps"
     ========================================================== */

  function zeichneTipps() {
    $("tippsListe").innerHTML = TIPPS.map(function (gruppe, i) {
      return '<details class="woche"' + (i === 0 ? ' open' : '') + '>' +
        '<summary>' +
          '<span class="w-nr">' + gruppe.symbol + '</span>' +
          '<span class="w-text"><b>' + esc(gruppe.gruppe) + '</b>' +
            '<span>' + gruppe.punkte.length + ' Punkte</span></span>' +
        '</summary>' +
        '<div class="inhalt">' + gruppe.punkte.map(function (p) {
          return '<div class="tipp"><b>' + esc(p[0]) + '</b><p>' + esc(p[1]) + '</p></div>';
        }).join("") + '</div>' +
      '</details>';
    }).join("");
  }

  /* ==========================================================
     11. Einheit speichern
     ========================================================== */

  function einheitSpeichern(einheit, dauerSek, gefuehl, notiz) {
    zustand.verlauf.push({
      id: einheit.id,
      woche: einheit.woche,
      nr: einheit.nr,
      datum: heuteIso(),
      dauer: Math.round(dauerSek),
      laufSek: einheit.laufSek,
      laengstes: einheit.laengstesLaufSek,
      gefuehl: gefuehl || null,
      notiz: (notiz || "").slice(0, 300),
      kurz: !!einheit.kurz
    });
    zustand.erledigt[einheit.id] = { datum: heuteIso(), kurz: !!einheit.kurz };
    sichern();
    return pruefeAbzeichen();
  }

  /* ==========================================================
     12. Trainingsansicht
     ========================================================== */

  var UMFANG = 2 * Math.PI * 54;

  var Trainer = {
    einheit: null, idx: 0, restMs: 0, echtMs: 0,
    laeuft: false, letzterTick: 0, uhrId: null,
    wachlicht: null, letzteSekunde: null, wiederholung: false,

    start: function (einheit, wiederholung) {
      this.einheit = einheit;
      this.wiederholung = !!wiederholung;
      this.idx = 0;
      this.echtMs = 0;
      this.restMs = einheit.bloecke[0].sek * 1000;
      this.letzterTick = Date.now();
      this.laeuft = true;
      this.letzteSekunde = null;

      $("trainerLauf").style.display = "";
      $("trainerFertig").style.display = "none";
      $("trainer").classList.add("offen");
      $("tPause").textContent = "Pause";
      $("tEinheit").textContent = "Woche " + einheit.woche + " · Einheit " + einheit.nr +
        (einheit.kurz ? " · kurz" : "");

      Klang.wecken();
      this.ansagen(einheit.bloecke[0].art);
      this.wachHalten();
      this.zeichnen();

      var selbst = this;
      clearInterval(this.uhrId);
      this.uhrId = setInterval(function () { selbst.tick(); }, 200);
    },

    aktuell: function () { return this.einheit.bloecke[this.idx]; },

    planPosition: function () {
      var summe = 0;
      for (var i = 0; i < this.idx; i++) summe += this.einheit.bloecke[i].sek * 1000;
      return summe + (this.aktuell().sek * 1000 - this.restMs);
    },

    tick: function () {
      var jetzt = Date.now();
      var delta = jetzt - this.letzterTick;
      this.letzterTick = jetzt;
      if (!this.laeuft) return;

      this.restMs -= delta;
      this.echtMs += delta;

      var sek = Math.ceil(this.restMs / 1000);
      if (sek !== this.letzteSekunde) {
        if (sek > 0 && sek <= 3) Klang.signal("tick");
        this.letzteSekunde = sek;
      }

      if (this.restMs <= 0) {
        var ueberhang = this.restMs;
        if (this.idx + 1 >= this.einheit.bloecke.length) { this.fertig(); return; }
        this.idx++;
        this.restMs = this.aktuell().sek * 1000 + ueberhang;
        this.letzteSekunde = null;
        this.ansagen(this.aktuell().art);
      }

      this.zeichnen();
    },

    ansagen: function (art) {
      Klang.signal(art === "laufen" ? "laufen" : (art === "gehen" ? "gehen" : "sonst"));
      Klang.ruettel(art === "laufen" ? [120, 80, 120, 80, 220] : [300]);
      Klang.sprich(ARTEN[art].ansage);
    },

    zeichnen: function () {
      var b = this.aktuell();
      var art = ARTEN[b.art];
      var trainer = $("trainer");

      trainer.classList.remove("lauf", "geh", "warm");
      trainer.classList.add(art.farbe);

      $("tAktion").textContent = this.laeuft ? art.name : "Pause";
      $("tZeit").textContent = mmss(this.restMs / 1000);
      $("tBlockNr").textContent = "Block " + (this.idx + 1) + " von " + this.einheit.bloecke.length;

      var anteil = Math.max(0, Math.min(1, this.restMs / (b.sek * 1000)));
      var ring = $("tRing");
      ring.style.stroke = "var(--" + art.farbe + ")";
      ring.setAttribute("stroke-dashoffset", (UMFANG * (1 - anteil)).toFixed(1));

      var gesamtMs = this.einheit.gesamtSek * 1000;
      var pos = Math.max(0, Math.min(gesamtMs, this.planPosition()));
      $("tBalken").style.width = ((pos / gesamtMs) * 100).toFixed(1) + "%";
      $("tGesamt").textContent = "Einheit: " + mmss(pos / 1000) + " / " + mmss(this.einheit.gesamtSek);
      $("tRest").textContent = "noch " + minText(this.einheit.gesamtSek - pos / 1000);

      var n = this.einheit.bloecke[this.idx + 1];
      $("tNaechster").textContent = n
        ? "Danach: " + ARTEN[n.art].name + " (" + dauerText(n.sek) + ")"
        : "Letzter Block – gleich geschafft.";
    },

    pause: function () {
      this.laeuft = !this.laeuft;
      this.letzterTick = Date.now();
      $("tPause").textContent = this.laeuft ? "Pause" : "Weiter";
      if (this.laeuft) this.wachHalten(); else Klang.sprich("Pause");
      this.zeichnen();
    },

    blockUeberspringen: function () {
      if (this.idx + 1 >= this.einheit.bloecke.length) { this.fertig(); return; }
      this.idx++;
      this.restMs = this.aktuell().sek * 1000;
      this.letzteSekunde = null;
      this.ansagen(this.aktuell().art);
      this.zeichnen();
    },

    abbrechen: function () {
      var anteil = this.planPosition() / (this.einheit.gesamtSek * 1000);
      if (anteil >= 0.6) { this.fertig(); return; }
      if (!confirm("Training abbrechen? Diese Einheit wird nicht als erledigt gespeichert.")) return;
      this.schliessen();
    },

    fertig: function () {
      this.laeuft = false;
      clearInterval(this.uhrId);
      Klang.signal("fertig");
      Klang.ruettel([200, 100, 200, 100, 400]);
      Klang.sprich("Geschafft. Gut gemacht.");
      this.abschluss();
    },

    abschluss: function () {
      var einheit = this.einheit;
      var planSek = this.idx >= einheit.bloecke.length - 1
        ? einheit.gesamtSek
        : this.planPosition() / 1000;
      var dauerSek = Math.round(Math.max(this.echtMs / 1000, planSek));
      var selbst = this;
      var gewaehlt = null;

      $("trainerLauf").style.display = "none";
      var f = $("trainerFertig");
      f.style.display = "";

      f.innerHTML =
        '<div style="font-size:3rem;line-height:1">🎉</div>' +
        '<h1 style="margin-top:8px">' + (einheit.laufSek ? "Einheit geschafft" : "Runde geschafft") + '</h1>' +
        '<p style="color:var(--leise)">Woche ' + einheit.woche + ' · Einheit ' + einheit.nr +
          (einheit.kurz ? ' · Kurzvariante' : '') + ' · ' + minText(dauerSek) + ' unterwegs' +
          (einheit.laufSek ? ', ' + Math.round(einheit.laufSek / 60) + ' Minuten davon gelaufen' : '') + '.</p>' +
        '<div style="text-align:left;margin-top:18px">' +
          '<div class="etikett">Wie war es?</div>' +
          '<div class="gefuehl-wahl">' + GEFUEHLE.map(function (g, i) {
            return '<button data-gefuehl="' + (i + 1) + '" aria-pressed="false">' + g + '</button>';
          }).join("") + '</div>' +
          '<div class="etikett">Notiz (freiwillig)</div>' +
          '<textarea id="fNotiz" placeholder="Strecke, Wetter, wie sich die Beine angefühlt haben …"></textarea>' +
        '</div>' +
        '<div class="steuerung"><button class="knopf" id="fSpeichern">Eintragen und schließen</button></div>';

      Array.prototype.forEach.call(f.querySelectorAll("[data-gefuehl]"), function (b) {
        b.onclick = function () {
          gewaehlt = +b.getAttribute("data-gefuehl");
          Array.prototype.forEach.call(f.querySelectorAll("[data-gefuehl]"), function (x) {
            x.setAttribute("aria-pressed", x === b ? "true" : "false");
          });
        };
      });

      $("fSpeichern").onclick = function () {
        var neu = einheitSpeichern(einheit, dauerSek, gewaehlt, $("fNotiz").value);
        selbst.schliessen();
        zeichneAlles();
        if (neu.length) zeigeAbzeichen(neu);
        wechsle("fortschritt");
      };
    },

    schliessen: function () {
      clearInterval(this.uhrId);
      this.laeuft = false;
      $("trainer").classList.remove("offen");
      $("trainerFertig").style.display = "none";
      $("trainerLauf").style.display = "";
      if (window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (e) {} }
      this.wachFreigeben();
    },

    wachHalten: function () {
      if (!zustand.wachhalten || !navigator.wakeLock) return;
      var selbst = this;
      try {
        navigator.wakeLock.request("screen").then(function (w) { selbst.wachlicht = w; }, function () {});
      } catch (e) {}
    },

    wachFreigeben: function () {
      if (this.wachlicht) { try { this.wachlicht.release(); } catch (e) {} this.wachlicht = null; }
    }
  };

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && $("trainer").classList.contains("offen") && Trainer.laeuft) {
      Trainer.letzterTick = Date.now();
      Trainer.wachHalten();
    }
  });

  function zeigeAbzeichen(neu) {
    var text = neu.map(function (a) { return a.symbol + "  " + a.titel + " – " + a.text; }).join("\n");
    setTimeout(function () {
      alert((neu.length === 1 ? "Neues Abzeichen!\n\n" : "Neue Abzeichen!\n\n") + text);
    }, 250);
  }

  /* ==========================================================
     13. Navigation und Start
     ========================================================== */

  function wechsle(name) {
    SEITEN.forEach(function (n) {
      $("seite-" + n).classList.toggle("aktiv", n === name);
    });
    Array.prototype.forEach.call(document.querySelectorAll(".nav button"), function (b) {
      b.setAttribute("aria-selected", b.getAttribute("data-seite") === name ? "true" : "false");
    });
    window.scrollTo(0, 0);
  }

  function zeichneAlles() {
    zeichneHeute();
    zeichnePlan();
    zeichneFortschritt();
  }

  document.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest("[data-seite], [data-zu]") : null;
    if (!b) return;
    wechsle(b.getAttribute("data-seite") || b.getAttribute("data-zu"));
  });

  $("tPause").onclick       = function () { Trainer.pause(); };
  $("tWeiterBlock").onclick = function () { Trainer.blockUeberspringen(); };
  $("tBeenden").onclick     = function () { Trainer.abbrechen(); };

  document.addEventListener("keydown", function (ev) {
    if (!$("trainer").classList.contains("offen")) return;
    if (ev.code === "Space") { ev.preventDefault(); Trainer.pause(); }
    if (ev.code === "Escape") Trainer.abbrechen();
  });

  pruefeAbzeichen();
  zeichneTipps();
  zeichneAlles();
})();
