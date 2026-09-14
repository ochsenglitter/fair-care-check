/* DOSSIER PARIS – Aufgaben-Generator.
   Aus jedem Vokabelpaar werden drei Aufgabentypen, aus jedem Satz zwei.
   So entstehen aus ueberschaubaren Daten knapp 1800 einzelne Uebungen. */

(function () {
  const DP = window.DP;

  let ALLE = null;
  let NACH_KEY = null;
  let NACH_MODUL = null;

  function deutschPool(modul, ausser) {
    const pool = modul.vocab.map(v => v[1]).filter(x => x !== ausser);
    return pool;
  }

  function globalerPool(ausser) {
    const p = [];
    (window.CURRICULUM || []).forEach(m => m.vocab.forEach(v => { if (v[1] !== ausser) p.push(v[1]); }));
    return p;
  }

  /* Welche deutschen Bedeutungen gehoeren zu welchem franzoesischen Wort?
     "la fille" heisst in Modul 1 "das Mädchen" und in Modul 5 "die Tochter".
     Beides nebeneinander als Antwortmöglichkeit waere schlicht unfair – also
     wird jede Bedeutung ausgeschlossen, die zum selben franzoesischen Wort
     gehoert wie die richtige Loesung. */
  let BEDEUTUNGEN = null;
  function bedeutungenZu(deutsch) {
    if (!BEDEUTUNGEN) {
      BEDEUTUNGEN = {};
      (window.CURRICULUM || []).forEach(m => m.vocab.forEach(v => {
        const fr = DP.norm(v[0]);
        (BEDEUTUNGEN[DP.norm(v[1])] = BEDEUTUNGEN[DP.norm(v[1])] || []).push(fr);
      }));
    }
    return BEDEUTUNGEN[DP.norm(deutsch)] || [];
  }

  function optionenBauen(richtig, pool, global, anzahl, franzoesisch) {
    const gesehen = new Set([DP.norm(richtig)]);
    const verboten = franzoesisch ? DP.norm(franzoesisch) : null;
    const out = [richtig];
    const quellen = DP.mische(pool).concat(DP.mische(global));
    for (const q of quellen) {
      if (out.length >= anzahl) break;
      const n = DP.norm(q);
      if (gesehen.has(n)) continue;
      if (verboten && bedeutungenZu(q).indexOf(verboten) > -1) continue;
      gesehen.add(n);
      out.push(q);
    }
    return DP.mische(out);
  }

  function bauen() {
    ALLE = [];
    NACH_KEY = {};
    NACH_MODUL = {};

    const module = window.CURRICULUM || [];

    module.forEach(modul => {
      const liste = [];
      const globalDe = globalerPool(null);

      /* --- Vokabeln --- */
      modul.vocab.forEach((v, i) => {
        const fr = v[0], de = v[1];
        const poolDe = deutschPool(modul, de);

        liste.push({
          key: modul.id + ":v" + i + ":fd",
          modul: modul.id, thema: "Wortschatz", typ: "mc",
          frage: "Was bedeutet <b>" + fr + "</b>?",
          loesung: de,
          optionen: optionenBauen(de, poolDe, globalDe, 4, fr),
          sprechen: fr
        });

        liste.push({
          key: modul.id + ":v" + i + ":df",
          modul: modul.id, thema: "Wortschatz", typ: "tippen",
          frage: "Wie heißt <b>" + de + "</b> auf Französisch?",
          loesung: fr,
          hinweis: fr.indexOf(" ") > -1 ? "Zwei Wörter." : null,
          sprechen: fr
        });

        liste.push({
          key: modul.id + ":v" + i + ":hoer",
          modul: modul.id, thema: "Hören", typ: "hoeren",
          frage: "Hör zu. Was bedeutet das?",
          loesung: de,
          optionen: optionenBauen(de, poolDe, globalDe, 4, fr),
          sprechen: fr
        });
      });

      /* --- Saetze --- */
      modul.phrases.forEach((p, j) => {
        const fr = p[0], de = p[1];
        const teile = fr.replace(/\s*[.!?]+$/, "").split(" ").filter(Boolean);

        liste.push({
          key: modul.id + ":p" + j + ":fd",
          modul: modul.id, thema: "Sätze", typ: "mc",
          frage: "Was bedeutet <b>" + fr + "</b>?",
          loesung: de,
          optionen: optionenBauen(de, modul.phrases.map(x => x[1]).filter(x => x !== de), globalDe, 4),
          sprechen: fr
        });

        if (teile.length >= 2 && teile.length <= 8) {
          liste.push({
            key: modul.id + ":p" + j + ":bau",
            modul: modul.id, thema: "Sätze", typ: "bauen",
            frage: de,
            loesung: fr,
            teile: DP.mische(teile),
            sprechen: fr
          });
        }
      });

      /* --- Grammatik-Drills --- */
      modul.grammar.forEach(g => {
        g.drills.forEach((d, k) => {
          const frage = d[0], loesung = d[1], optionen = d[2];
          liste.push({
            key: modul.id + ":" + g.id + ":d" + k,
            modul: modul.id, thema: g.titel, typ: optionen ? "mc" : "tippen",
            frage: frage.replace(/___/g, '<span class="luecke">_____</span>'),
            loesung: loesung,
            optionen: optionen ? DP.mische(optionen) : null,
            grammatik: g.id
          });
        });
      });

      NACH_MODUL[modul.id] = liste;
      liste.forEach(it => { NACH_KEY[it.key] = it; ALLE.push(it); });
    });
  }

  DP.alleItems = function () { if (!ALLE) bauen(); return ALLE; };
  DP.itemsFuerModul = function (id) { if (!ALLE) bauen(); return NACH_MODUL[id] || []; };
  DP.itemFuerKey = function (key) { if (!ALLE) bauen(); return NACH_KEY[key] || null; };

  /* Paare-Minispiel zum Aufwaermen: fuenf Vokabelpaare aus dem, was gerade dran ist. */
  DP.paareBauen = function (modulId, anzahl) {
    const modul = (window.CURRICULUM || []).find(m => m.id === modulId);
    if (!modul) return [];
    return DP.mische(modul.vocab).slice(0, anzahl || 5).map(v => ({ fr: v[0], de: v[1] }));
  };
})();
