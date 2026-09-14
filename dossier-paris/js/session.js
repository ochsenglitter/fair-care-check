/* DOSSIER PARIS – Missionsaufbau.
   Eine Mission ist eine feste Dramaturgie: Aufwaermen, Rueckblick, Briefing,
   Training, Entschluesselung, Story. Immer gleich, damit der Kopf nicht
   entscheiden muss – und immer anderer Inhalt, damit es nicht langweilt. */

(function () {
  const DP = window.DP;

  /* Ohne franzoesische Stimme ist eine Hoeraufgabe nicht loesbar, sondern nur
     frustrierend. Auf solchen Geraeten fallen sie komplett weg. */
  function verfuegbar(item) {
    if (item.typ !== "hoeren") return true;
    return DP.stand.einstellungen.stimme && DP.audio.kannSprechen() && DP.audio.hatFranzoesisch();
  }
  DP.itemVerfuegbar = verfuegbar;

  function itemStaerke(item) {
    const k = DP.stand.srs[item.key];
    if (!k) return -1;            /* noch nie gesehen */
    return k.r;
  }

  /* Waehlt Aufgaben eines Moduls: erst was faellig ist, dann was neu ist,
     dann das Schwaechste. Nie zweimal dasselbe in einer Mission. */
  function waehlen(modulId, anzahl, benutzt) {
    const alle = DP.itemsFuerModul(modulId).filter(i => !benutzt.has(i.key) && verfuegbar(i));
    const heute = DP.heute();
    const faellig = [], neu = [], rest = [];
    alle.forEach(i => {
      const k = DP.stand.srs[i.key];
      if (!k) neu.push(i);
      else if (k.faellig <= heute) faellig.push(i);
      else rest.push(i);
    });
    faellig.sort((a, b) => (DP.stand.srs[a.key].r) - (DP.stand.srs[b.key].r));
    rest.sort((a, b) => itemStaerke(a) - itemStaerke(b));
    const out = faellig.concat(DP.mische(neu)).concat(rest).slice(0, anzahl);
    out.forEach(i => benutzt.add(i.key));
    return out;
  }

  /* Faellige Wiederholungen aus dem GESAMTEN bisherigen Stoff. Das ist der Teil,
     der verhindert, dass Gelerntes wieder verschwindet. */
  function rueckblick(anzahl, benutzt) {
    const heute = DP.heute();
    const keys = Object.keys(DP.stand.srs)
      .filter(k => DP.stand.srs[k].faellig <= heute && !benutzt.has(k));
    keys.sort((a, b) => {
      const d = DP.stand.srs[a].faellig.localeCompare(DP.stand.srs[b].faellig);
      return d !== 0 ? d : DP.stand.srs[a].r - DP.stand.srs[b].r;
    });
    const out = [];
    for (const k of keys) {
      const it = DP.itemFuerKey(k);
      if (it && verfuegbar(it)) { out.push(it); benutzt.add(k); }
      if (out.length >= anzahl) break;
    }
    return out;
  }

  function codewort(modul) {
    const kandidaten = modul.vocab
      .map(v => DP.ohneArtikel(v[0]).replace(/[^A-Za-zÀ-ÿ'-]/g, ""))
      .filter(w => w.length >= 4 && w.length <= 9 && w.indexOf("'") === -1);
    const w = kandidaten.length ? DP.zufall(kandidaten) : "PARIS";
    return w.toUpperCase();
  }

  function neueVokabeln(modul, anzahl, benutzt) {
    const out = [];
    modul.vocab.forEach((v, i) => {
      if (out.length >= anzahl) return;
      const key = modul.id + ":v" + i + ":fd";
      if (DP.stand.srs[key]) return;
      if (benutzt.has("lern:" + key)) return;
      benutzt.add("lern:" + key);
      out.push({ fr: v[0], de: v[1], index: i });
    });
    return out;
  }

  function grammatikKarte(modul) {
    const gezeigt = DP.stand.fortschritt.briefing[modul.id] || [];
    const offen = modul.grammar.find(g => gezeigt.indexOf(g.id) === -1);
    return offen || null;
  }

  /* ---------- Mission zusammenstellen ---------- */

  DP.missionBauen = function (modus, zielModulId) {
    const benutzt = new Set();
    const modul = zielModulId
      ? ((window.CURRICULUM || []).find(m => m.id === zielModulId) || DP.aktuellesModul())
      : DP.aktuellesModul();
    const schritte = [];
    const beatNr = DP.stand.fortschritt.beat[modul.id] || 0;
    const story = (window.STORY || {})[modul.id];

    if (modus === "wiederholung") {
      const items = rueckblick(40, benutzt);
      if (!items.length) {
        const ersatz = [];
        (DP.stand.fortschritt.fertig.concat([modul.id])).forEach(id => {
          waehlen(id, 6, benutzt).forEach(i => ersatz.push(i));
        });
        DP.mische(ersatz).slice(0, 25).forEach(i => schritte.push({ art: "item", item: i }));
      } else {
        items.forEach(i => schritte.push({ art: "item", item: i }));
      }
      return { modus: modus, modul: modul, schritte: schritte, titel: "WIEDERHOLUNG", dauer: 10 * 60 };
    }

    /* Gezieltes Training eines Themas – fuer die Woche vor der Klassenarbeit.
       Nur dieses Modul, keine Story, kein neuer Stoff. */
    if (modus === "thema") {
      const g = modul.grammar[0];
      if (g) schritte.push({ art: "regel", modul: modul.id, grammatik: g });
      waehlen(modul.id, 22, benutzt).forEach(i => schritte.push({ art: "item", item: i, phase: "training" }));
      return { modus: modus, modul: modul, schritte: schritte, titel: "TRAINING – " + modul.titel.toUpperCase(), dauer: 10 * 60 };
    }

    if (modus === "pruefung") {
      const module = (window.CURRICULUM || []);
      const bis = Math.min(DP.stand.fortschritt.modul + 1, module.length);
      const topf = [];
      for (let i = 0; i < bis; i++) {
        waehlen(module[i].id, 4, benutzt).forEach(x => topf.push(x));
      }
      DP.mische(topf).slice(0, 20).forEach(i => schritte.push({ art: "item", item: i, pruefung: true }));
      return { modus: modus, modul: modul, schritte: schritte, titel: "PRÜFUNGSSIMULATION", dauer: 12 * 60 };
    }

    const kurz = modus === "kurz";

    /* 1 – Briefing zur Modulgeschichte, nur beim ersten Einsatz im Modul */
    if (beatNr === 0 && story) {
      schritte.push({ art: "karte", stil: "briefing", titel: "BRIEFING – " + modul.titel, text: [story.intro], thema: modul.thema });
    }

    /* 2 – Aufwaermen: Paare zuordnen, 30 Sekunden, gute Laune */
    schritte.push({ art: "paare", paare: DP.paareBauen(modul.id, kurz ? 4 : 5) });

    /* 3 – Rueckblick auf faelligen Altstoff. Waechst der Stapel, verschiebt sich
       das Verhaeltnis zugunsten der Wiederholung: lieber sicher koennen, was
       schon dran war, als immer neuen Stoff obendrauf zu kippen. */
    const stapel = DP.faelligeKeys().length;
    const rueckblickAnzahl = kurz ? 5 : (stapel > 60 ? 14 : stapel > 25 ? 12 : 10);
    const alt = rueckblick(rueckblickAnzahl, benutzt);
    if (alt.length) {
      schritte.push({ art: "karte", stil: "phase", titel: "RAPPEL", text: ["Kurzer Rückblick. " + alt.length + " Sachen von früher, die heute wieder dran sind."] });
      alt.forEach(i => schritte.push({ art: "item", item: i, phase: "rappel" }));
    }

    /* 4 – Neuer Stoff: Regel plus neue Vokabeln als Lernkarten */
    const g = grammatikKarte(modul);
    if (g && !kurz) {
      schritte.push({ art: "regel", modul: modul.id, grammatik: g });
    }
    const neu = neueVokabeln(modul, kurz ? 3 : (stapel > 60 ? 4 : 6), benutzt);
    if (neu.length) {
      schritte.push({ art: "karte", stil: "phase", titel: "NOUVEAU", text: [neu.length + " neue Wörter. Erst anschauen, gleich brauchst du sie."] });
      neu.forEach(v => schritte.push({ art: "lernkarte", vokabel: v, modul: modul.id }));
    }

    /* 5 – Training */
    const training = waehlen(modul.id, kurz ? 8 : (stapel > 60 ? 12 : 16), benutzt);
    if (training.length) {
      schritte.push({ art: "karte", stil: "phase", titel: "ENTRAÎNEMENT", text: ["Jetzt du."] });
      DP.mische(training).forEach(i => schritte.push({ art: "item", item: i, phase: "training" }));
    }

    /* 6 – Entschluesselung: der Bossfight am Ende */
    if (!kurz) {
      const boss = waehlen(modul.id, 5, benutzt);
      if (boss.length) {
        const wort = codewort(modul);
        schritte.push({ art: "karte", stil: "boss", titel: "DÉCODAGE", text: ["Letzter Teil. Jede richtige Antwort gibt einen Buchstaben des Codeworts frei."] });
        boss.forEach((i, idx) => schritte.push({ art: "item", item: i, phase: "boss", bossIndex: idx, bossGesamt: boss.length, codewort: wort }));
      }
    }

    /* 7 – Story-Beat als Belohnung. Wer den Stoff schon kann, bekommt zwei auf
       einmal: sonst haengt jemand, der zwei Jahre Franzoesisch hatte, tagelang
       bei "bonjour" fest. */
    if (story) {
      const beats = story.beats || [];
      const schnell = DP.modulStaerke(modul.id) >= 0.5 && !kurz;
      const anzahl = schnell ? 2 : 1;
      for (let n = 0; n < anzahl; n++) {
        const i = beatNr + n;
        const letzte = i >= beats.length;
        const text = letzte ? story.ende : beats[i];
        schritte.push({
          art: "story", text: text,
          titel: letzte ? "AKTE " + modul.id.toUpperCase() + " – ABSCHLUSS" : "FUNKSPRUCH",
          letzte: letzte, modul: modul.id
        });
        if (letzte) break;
      }
      schritte.beats = anzahl;
    }

    return {
      modus: modus,
      modul: modul,
      schritte: schritte,
      titel: "MISSION " + String(modul.nr).padStart(2, "0"),
      dauer: (kurz ? 5 : DP.stand.einstellungen.tagesziel || 15) * 60
    };
  };

  /* ---------- Nach der Mission ---------- */

  DP.missionAbschliessen = function (mission, statistik) {
    const modulId = mission.modul.id;

    /* Nur die regulaere Mission treibt die Geschichte voran. Wiederholung,
       Pruefung und Thementraining zaehlen fuer Serie und Punkte, verschieben
       aber nichts im Erzaehlstrang. */
    if (mission.modus === "mission" || mission.modus === "kurz") {
      /* Gezeigte Regeln merken */
      mission.schritte.filter(s => s.art === "regel").forEach(s => {
        const liste = DP.stand.fortschritt.briefing[modulId] || [];
        if (liste.indexOf(s.grammatik.id) === -1) liste.push(s.grammatik.id);
        DP.stand.fortschritt.briefing[modulId] = liste;
      });

      const gezeigteBeats = mission.schritte.filter(x => x.art === "story").length || 1;
      DP.stand.fortschritt.beat[modulId] = (DP.stand.fortschritt.beat[modulId] || 0) + gezeigteBeats;

      /* Abgeschlossen, wenn die Story durch ist und der Stoff traegt. Der Rest
         kommt ueber die Wiederholungen von selbst zurueck – ein Modul auf 100
         Prozent zu polieren, bevor es weitergeht, kostet Wochen und bringt
         nichts fuer die naechste Klassenarbeit. Die Notbremse am Ende sorgt
         dafuer, dass niemand in einem Modul haengen bleibt. */
      const story = (window.STORY || {})[modulId];
      const beats = story ? (story.beats || []).length : 0;
      const staerke = DP.modulStaerke(modulId);
      const einsaetze = DP.stand.fortschritt.beat[modulId];
      const durch = einsaetze > beats;
      const notbremse = einsaetze > beats + 3;
      if (durch && (staerke >= 0.35 || notbremse) && DP.stand.fortschritt.fertig.indexOf(modulId) === -1) {
        DP.stand.fortschritt.fertig.push(modulId);
        const module = window.CURRICULUM || [];
        if (DP.stand.fortschritt.modul < module.length - 1) DP.stand.fortschritt.modul++;
      }
    }

    DP.stand.tag.missionFertig = true;
    DP.serieZaehlen();
    DP.stand.xp += (mission.modus === "kurz" || mission.modus === "thema") ? 25 : 50;
    const neueOrden = DP.ordenPruefen();
    DP.speichern();
    return neueOrden;
  };

  /* Notenschaetzung fuer die Pruefungssimulation.
     Ausdruecklich nur eine Selbsteinschaetzung, keine echte Note. */
  DP.noteSchaetzen = function (prozent) {
    if (prozent >= 92) return { note: 1, text: "sehr gut" };
    if (prozent >= 81) return { note: 2, text: "gut" };
    if (prozent >= 67) return { note: 3, text: "befriedigend" };
    if (prozent >= 50) return { note: 4, text: "ausreichend" };
    if (prozent >= 30) return { note: 5, text: "mangelhaft" };
    return { note: 6, text: "ungenügend" };
  };
})();

/* ---------- Einstufung ----------
   Er hatte zwei Jahre Unterricht. Irgendetwas ist haengen geblieben. Eine kurze
   Einstufung findet heraus, was – damit er nicht eine Woche lang "bonjour"
   ueben muss und am dritten Tag aufhoert.

   Bewusst grob: eine Frage pro Modul. Wer sie kann, bekommt das Modul auf
   mittlerer Stufe vorgemerkt und ist es in zwei, drei Einsaetzen los. Falls die
   Einschaetzung zu grosszuegig war, faellt das in den Wiederholungen innerhalb
   weniger Tage auf und korrigiert sich von selbst. */
(function () {
  const DP = window.DP;

  DP.EINSTUFUNG_MODULE = 16;

  DP.einstufungBauen = function () {
    const module = (window.CURRICULUM || []).slice(0, DP.EINSTUFUNG_MODULE);
    const fragen = [];
    module.forEach(m => {
      const items = DP.itemsFuerModul(m.id);
      const grammatik = items.filter(i => i.grammatik && i.optionen);
      const ersatz = items.filter(i => i.typ === "mc");
      const quelle = grammatik.length ? grammatik : ersatz;
      if (quelle.length) fragen.push({ modul: m, item: DP.zufall(quelle) });
    });
    return fragen;
  };

  /* Seedet ein ganzes Modul auf mittlere Stufe, zeitlich gestaffelt, damit nicht
     alles am selben Tag faellig wird. */
  DP.modulVormerken = function (modulId, stufe) {
    const items = DP.itemsFuerModul(modulId);
    items.forEach((it, i) => {
      if (DP.stand.srs[it.key]) return;
      DP.stand.srs[it.key] = {
        r: stufe,
        faellig: DP.tagePlus(3 + (i % 38)),
        gesehen: 1, ok: 1, ko: 0, neu: false, geschaetzt: true
      };
    });
  };

  DP.einstufungAuswerten = function (ergebnisse) {
    /* Startmodul: das erste, das nicht sass. */
    let start = 0;
    for (let i = 0; i < ergebnisse.length; i++) {
      if (!ergebnisse[i].richtig) { start = i; break; }
      start = i + 1;
    }

    let gekonnt = 0, letztesGekonnt = -1;
    ergebnisse.forEach((e, i) => {
      if (!e.richtig) return;
      gekonnt++;
      letztesGekonnt = i;
      /* Alles vor dem Startpunkt sass durchgehend – das wird als solide
         vorgemerkt. Ein einzelner Treffer weiter hinten kann auch Raten
         gewesen sein: der gibt nur einen kleinen Vorsprung, kein Freilos.
         Sonst waere ausgerechnet das Passé composé nach einem Glückstreffer
         in zwei Einsätzen "erledigt". */
      DP.modulVormerken(e.modulId, i < start ? 2 : 1);
    });
    start = Math.min(start, letztesGekonnt + 1, (window.CURRICULUM || []).length - 1);
    if (start < 0) start = 0;

    DP.stand.fortschritt.modul = Math.max(DP.stand.fortschritt.modul, start);
    for (let i = 0; i < start; i++) {
      const m = (window.CURRICULUM || [])[i];
      if (m && DP.stand.fortschritt.fertig.indexOf(m.id) === -1) DP.stand.fortschritt.fertig.push(m.id);
    }
    DP.stand.einstufungGemacht = true;
    DP.speichern();
    return { gekonnt: gekonnt, gesamt: ergebnisse.length, start: start };
  };
})();
