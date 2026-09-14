/* DOSSIER PARIS – Ton: franzoesische Sprachausgabe und kurze Signale.
   Keine Audiodateien noetig, alles laeuft ueber die Browser-Schnittstellen. */

(function () {
  const DP = window.DP;
  const A = {};
  DP.audio = A;

  /* ---------- Sprachausgabe ---------- */

  let stimmen = [];
  let frStimme = null;

  function stimmenLaden() {
    if (!("speechSynthesis" in window)) return;
    stimmen = window.speechSynthesis.getVoices() || [];
    frStimme =
      stimmen.find(v => v.lang === "fr-FR" && /google|premium|enhanced|amelie|thomas|audrey/i.test(v.name)) ||
      stimmen.find(v => v.lang === "fr-FR") ||
      stimmen.find(v => (v.lang || "").toLowerCase().indexOf("fr") === 0) ||
      null;
  }

  if ("speechSynthesis" in window) {
    stimmenLaden();
    window.speechSynthesis.onvoiceschanged = stimmenLaden;
  }

  A.kannSprechen = function () {
    return "speechSynthesis" in window;
  };

  A.hatFranzoesisch = function () {
    if (!frStimme) stimmenLaden();
    return !!frStimme;
  };

  A.sprechen = function (text, tempo) {
    if (!DP.stand.einstellungen.stimme) return;
    if (!("speechSynthesis" in window) || !text) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text).replace(/<[^>]+>/g, ""));
      if (!frStimme) stimmenLaden();
      if (frStimme) u.voice = frStimme;
      u.lang = "fr-FR";
      u.rate = tempo || DP.stand.einstellungen.tempo || 0.85;
      u.pitch = 1;
      window.speechSynthesis.speak(u);
    } catch (e) { /* stumm scheitern, nie die Mission blockieren */ }
  };

  A.stopp = function () {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  };

  /* ---------- Signale ---------- */

  let ctx = null;
  function kontext() {
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      ctx = new C();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function ton(frequenz, dauer, typ, lautstaerke, verzoegerung) {
    if (!DP.stand.einstellungen.ton) return;
    const c = kontext();
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = typ || "sine";
    o.frequency.value = frequenz;
    const t = c.currentTime + (verzoegerung || 0);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(lautstaerke || 0.08, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dauer);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dauer + 0.02);
  }

  A.richtig = function () { ton(880, 0.09, "sine", 0.07); ton(1320, 0.12, "sine", 0.05, 0.07); };
  A.fast = function () { ton(700, 0.1, "sine", 0.06); ton(880, 0.1, "sine", 0.05, 0.08); };
  A.falsch = function () { ton(200, 0.16, "square", 0.05); };
  A.kombo = function () { ton(660, 0.07, "triangle", 0.06); ton(990, 0.07, "triangle", 0.06, 0.06); ton(1320, 0.14, "triangle", 0.06, 0.12); };
  A.aufstieg = function () { [523, 659, 784, 1046].forEach((f, i) => ton(f, 0.18, "triangle", 0.07, i * 0.09)); };
  A.tick = function () { ton(1200, 0.03, "square", 0.02); };
  A.alarm = function () { ton(320, 0.2, "sawtooth", 0.05); ton(260, 0.25, "sawtooth", 0.05, 0.18); };

  A.vibrieren = function (muster) {
    try { if (navigator.vibrate) navigator.vibrate(muster); } catch (e) {}
  };

  /* Erste Nutzerinteraktion schaltet den Audiokontext frei. */
  A.freischalten = function () {
    kontext();
    if ("speechSynthesis" in window && !frStimme) stimmenLaden();
  };
})();
