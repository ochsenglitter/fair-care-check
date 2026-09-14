/* DOSSIER PARIS – Kern: Speicherstand, Wiederholungs-Algorithmus, Antwortpruefung. */

const DP = {};
window.DP = DP;

/* ---------- Hilfsfunktionen ---------- */

DP.heute = function () {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};

DP.tagePlus = function (tage) {
  const d = new Date();
  d.setDate(d.getDate() + tage);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};

DP.tageDiff = function (a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
};

DP.mische = function (arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

DP.zufall = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };

/* ---------- Antwortpruefung ---------- */

DP.norm = function (s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[’‘´`]/g, "'")
    .replace(/\s*'\s*/g, "'")
    .replace(/[.!?;,:«»"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

DP.ohneAkzente = function (s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

DP.ohneArtikel = function (s) {
  return s.replace(/^(le |la |les |l'|un |une |des |der |die |das |ein |eine )/, "").trim();
};

DP.abstand = function (a, b) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 9;
  const v = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let vorher = v[0];
    v[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = v[j];
      v[j] = Math.min(v[j] + 1, v[j - 1] + 1, vorher + (a[i - 1] === b[j - 1] ? 0 : 1));
      vorher = tmp;
    }
  }
  return v[b.length];
};

/* Ergebnis: "richtig" | "fast" | "falsch"
   "fast" = inhaltlich verstanden, aber Akzent/Tippfehler. Zaehlt als Erfolg,
   kommt aber frueher zurueck. Das haelt die Motivation oben, ohne zu schummeln. */
DP.pruefe = function (eingabe, loesung) {
  const e = DP.norm(eingabe);
  const l = DP.norm(loesung);
  if (!e) return "falsch";
  if (e === l) return "richtig";

  /* Mehrere zulaessige Loesungen mit / getrennt */
  const alternativen = l.split(" / ").map(x => x.trim());
  if (alternativen.some(a => a === e)) return "richtig";
  if (alternativen.some(a => DP.ohneArtikel(a) === DP.ohneArtikel(e))) return "richtig";

  if (DP.ohneAkzente(e) === DP.ohneAkzente(l)) return "fast";
  if (alternativen.some(a => DP.ohneAkzente(a) === DP.ohneAkzente(e))) return "fast";
  if (DP.abstand(DP.ohneAkzente(e), DP.ohneAkzente(l)) <= 1) return "fast";
  return "falsch";
};

/* ---------- Speicherstand ---------- */

const SCHLUESSEL = "dossier-paris-v1";

DP.leererStand = function () {
  return {
    v: 1,
    codename: "",
    xp: 0,
    kombo: 0,
    serie: { tage: 0, letzterTag: null, beste: 0, alibis: 2, alibiMonat: null },
    tag: { datum: null, sekunden: 0, aufgaben: 0, richtig: 0, missionFertig: false },
    srs: {},
    fortschritt: { modul: 0, beat: {}, fertig: [], briefing: {} },
    orden: [],
    verlauf: [],
    prolog: false,
    einstufungGemacht: false,
    einstellungen: { ton: true, stimme: true, tempo: 0.85, tagesziel: 15 }
  };
};

DP.stand = DP.leererStand();

DP.laden = function () {
  try {
    const roh = localStorage.getItem(SCHLUESSEL);
    if (roh) {
      const s = JSON.parse(roh);
      DP.stand = Object.assign(DP.leererStand(), s);
      DP.stand.serie = Object.assign(DP.leererStand().serie, s.serie || {});
      DP.stand.tag = Object.assign(DP.leererStand().tag, s.tag || {});
      DP.stand.fortschritt = Object.assign(DP.leererStand().fortschritt, s.fortschritt || {});
      DP.stand.einstellungen = Object.assign(DP.leererStand().einstellungen, s.einstellungen || {});
    }
  } catch (e) {
    console.warn("Speicherstand nicht lesbar, starte neu.", e);
  }
  DP.tagWechseln();
  return DP.stand;
};

DP.speichern = function () {
  try {
    localStorage.setItem(SCHLUESSEL, JSON.stringify(DP.stand));
  } catch (e) {
    console.warn("Speichern fehlgeschlagen.", e);
  }
};

DP.tagWechseln = function () {
  const h = DP.heute();
  if (DP.stand.tag.datum !== h) {
    if (DP.stand.tag.datum && DP.stand.tag.aufgaben > 0) {
      DP.stand.verlauf.push({
        datum: DP.stand.tag.datum,
        sekunden: DP.stand.tag.sekunden,
        aufgaben: DP.stand.tag.aufgaben,
        richtig: DP.stand.tag.richtig
      });
      if (DP.stand.verlauf.length > 400) DP.stand.verlauf = DP.stand.verlauf.slice(-400);
    }
    DP.stand.tag = { datum: h, sekunden: 0, aufgaben: 0, richtig: 0, missionFertig: false };
    DP.stand.kombo = 0;
    DP.serieAktualisieren();
    DP.speichern();
  }
};

/* Serie: gestern trainiert -> weiter. Einen Tag verpasst -> Alibi wird automatisch
   eingesetzt, falls vorhanden. Kein Drama, keine Bestrafung. */
DP.serieAktualisieren = function () {
  const s = DP.stand.serie;
  const monat = DP.heute().slice(0, 7);
  if (s.alibiMonat !== monat) { s.alibiMonat = monat; s.alibis = 2; }
  if (!s.letzterTag) return;
  const luecke = DP.tageDiff(s.letzterTag, DP.heute());
  if (luecke <= 1) return;
  const verpasst = luecke - 1;
  if (verpasst <= s.alibis) {
    s.alibis -= verpasst;
    s.letzterTag = DP.tagePlus(-1);
  } else {
    s.tage = 0;
  }
};

DP.serieZaehlen = function () {
  const s = DP.stand.serie;
  const h = DP.heute();
  if (s.letzterTag === h) return;
  s.tage = (s.letzterTag && DP.tageDiff(s.letzterTag, h) === 1) ? s.tage + 1 : 1;
  s.letzterTag = h;
  if (s.tage > s.beste) s.beste = s.tage;
};

/* ---------- Wiederholungs-Algorithmus (angelehnt an SM-2, vereinfacht) ---------- */

/* Abstaende in Tagen. Bewusst nicht enger: mit 1-2-4 Tagen erzeugt jede neue
   Karte in der ersten Woche so viele Wiederholungen, dass sich bei 15 Minuten
   am Tag ein Berg aufbaut, den niemand mehr abtraegt. 1-3-7-16 ist der uebliche
   Rhythmus und haelt den Stapel in einer Groesse, die taeglich zu schaffen ist. */
const INTERVALLE = [0, 1, 3, 7, 16, 35, 70, 140];

DP.karte = function (key) {
  if (!DP.stand.srs[key]) {
    DP.stand.srs[key] = { r: 0, faellig: DP.heute(), gesehen: 0, ok: 0, ko: 0, neu: true };
  }
  return DP.stand.srs[key];
};

DP.bewerten = function (key, ergebnis) {
  const k = DP.karte(key);
  k.gesehen++;
  k.neu = false;
  if (ergebnis === "richtig") {
    k.ok++;
    k.r = Math.min(k.r + 1, INTERVALLE.length - 1);
  } else if (ergebnis === "fast") {
    k.ok++;
    k.r = Math.min(k.r + 1, INTERVALLE.length - 1);
    if (k.r > 1) k.r -= 1;
  } else {
    k.ko++;
    k.r = Math.max(0, k.r - 2);
  }
  k.faellig = DP.tagePlus(INTERVALLE[k.r]);
  return k;
};

DP.istFaellig = function (key) {
  const k = DP.stand.srs[key];
  if (!k) return false;
  return k.faellig <= DP.heute();
};

DP.faelligeKeys = function () {
  const h = DP.heute();
  return Object.keys(DP.stand.srs).filter(k => DP.stand.srs[k].faellig <= h);
};

/* ---------- Punkte, Raenge, Orden ---------- */

DP.RAENGE = [
  { xp: 0, name: "Stagiaire", de: "Praktikant" },
  { xp: 300, name: "Recrue", de: "Rekrut" },
  { xp: 800, name: "Agent", de: "Agent" },
  { xp: 1800, name: "Agent confirmé", de: "Erfahrener Agent" },
  { xp: 3200, name: "Agent spécial", de: "Spezialagent" },
  { xp: 5200, name: "Chef de section", de: "Abteilungsleiter" },
  { xp: 8000, name: "Commandant", de: "Kommandant" },
  { xp: 12000, name: "Légende", de: "Legende" }
];

DP.rang = function (xp) {
  let r = DP.RAENGE[0];
  for (const x of DP.RAENGE) if (xp >= x.xp) r = x;
  return r;
};

DP.naechsterRang = function (xp) {
  return DP.RAENGE.find(x => x.xp > xp) || null;
};

DP.punkte = function (ergebnis) {
  if (ergebnis === "richtig") {
    DP.stand.kombo++;
    let p = 10;
    if (DP.stand.kombo > 0 && DP.stand.kombo % 5 === 0) p += 15;
    DP.stand.xp += p;
    return p;
  }
  if (ergebnis === "fast") {
    DP.stand.kombo++;
    DP.stand.xp += 6;
    return 6;
  }
  DP.stand.kombo = 0;
  return 0;
};

DP.ORDEN = [
  { id: "start", name: "Erste Mission", text: "Eine Mission abgeschlossen.", pruef: s => s.verlauf.length + (s.tag.missionFertig ? 1 : 0) >= 1 },
  { id: "serie3", name: "Drei am Stück", text: "3 Tage in Folge.", pruef: s => s.serie.beste >= 3 },
  { id: "serie7", name: "Eine Woche", text: "7 Tage in Folge.", pruef: s => s.serie.beste >= 7 },
  { id: "serie14", name: "Zwei Wochen", text: "14 Tage in Folge.", pruef: s => s.serie.beste >= 14 },
  { id: "serie30", name: "Ein Monat", text: "30 Tage in Folge.", pruef: s => s.serie.beste >= 30 },
  { id: "w100", name: "100 Karten", text: "100 verschiedene Aufgaben gemeistert.", pruef: s => Object.values(s.srs).filter(k => k.r >= 2).length >= 100 },
  { id: "w300", name: "300 Karten", text: "300 verschiedene Aufgaben gemeistert.", pruef: s => Object.values(s.srs).filter(k => k.r >= 2).length >= 300 },
  { id: "w800", name: "800 Karten", text: "800 verschiedene Aufgaben gemeistert.", pruef: s => Object.values(s.srs).filter(k => k.r >= 2).length >= 800 },
  { id: "s1", name: "Saison 1 geknackt", text: "Alle Module der Saison 1 abgeschlossen.", pruef: s => ["m01","m02","m03","m04","m05","m06"].every(m => s.fortschritt.fertig.includes(m)) },
  { id: "s2", name: "Saison 2 geknackt", text: "Alle Module der Saison 2 abgeschlossen.", pruef: s => ["m07","m08","m09","m10","m11","m12"].every(m => s.fortschritt.fertig.includes(m)) },
  { id: "s3", name: "Saison 3 geknackt", text: "Alle Module der Saison 3 abgeschlossen.", pruef: s => ["m13","m14","m15","m16","m17","m18"].every(m => s.fortschritt.fertig.includes(m)) },
  { id: "s4", name: "Akte geschlossen", text: "Alle 24 Module abgeschlossen.", pruef: s => s.fortschritt.fertig.length >= 24 },
  { id: "pc", name: "Passé composé", text: "Die Vergangenheit sitzt.", pruef: s => DP.modulStaerke("m12") >= 0.8 && DP.modulStaerke("m13") >= 0.8 },
  { id: "kombo20", name: "Serie von 20", text: "20 richtige Antworten hintereinander.", pruef: s => s.kombo >= 20 },
  { id: "frueh", name: "Frühschicht", text: "Vor 8 Uhr morgens trainiert.", pruef: () => new Date().getHours() < 8 },
  { id: "spaet", name: "Nachtschicht", text: "Nach 22 Uhr trainiert.", pruef: () => new Date().getHours() >= 22 }
];

DP.ordenPruefen = function () {
  const neu = [];
  for (const o of DP.ORDEN) {
    if (DP.stand.orden.includes(o.id)) continue;
    let treffer = false;
    try { treffer = !!o.pruef(DP.stand); } catch (e) { treffer = false; }
    if (treffer) { DP.stand.orden.push(o.id); neu.push(o); }
  }
  return neu;
};

/* ---------- Fortschritt pro Modul ---------- */

DP.modulStaerke = function (modulId) {
  const keys = Object.keys(DP.stand.srs).filter(k => k.indexOf(modulId + ":") === 0);
  const gesamt = DP.itemsProModul(modulId);
  if (!gesamt) return 0;
  let summe = 0;
  for (const k of keys) summe += Math.min(DP.stand.srs[k].r, 4) / 4;
  return Math.min(1, summe / gesamt);
};

DP._itemZahl = {};
DP.itemsProModul = function (modulId) {
  if (DP._itemZahl[modulId] != null) return DP._itemZahl[modulId];
  const m = (window.CURRICULUM || []).find(x => x.id === modulId);
  if (!m) return 0;
  let n = m.vocab.length * 3 + m.phrases.length * 2;
  m.grammar.forEach(g => { n += g.drills.length; });
  DP._itemZahl[modulId] = n;
  return n;
};

/* Abgeschlossene Module zaehlen voll, das laufende anteilig. Ein Mittelwert ueber
   alle 24 Module wuerde monatelang bei 2 Prozent stehen – das demotiviert nur. */
DP.gesamtFortschritt = function () {
  const module = window.CURRICULUM || [];
  if (!module.length) return 0;
  const fertig = DP.stand.fortschritt.fertig.length;
  const aktuell = DP.modulStaerke(DP.aktuellesModul().id);
  return Math.min(1, (fertig + aktuell) / module.length);
};

DP.aktuellesModul = function () {
  const module = window.CURRICULUM || [];
  const i = Math.min(DP.stand.fortschritt.modul, module.length - 1);
  return module[i];
};
