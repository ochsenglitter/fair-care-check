/* DOSSIER PARIS – Ansichten und Ablauf. */

(function () {
  const DP = window.DP;
  const app = document.getElementById("app");

  let ansicht = "basis";
  let mission = null;
  let schrittIndex = 0;
  let statistik = null;
  let uhrTimer = null;
  let restZeit = 0;
  let zeitAus = false;
  let beantwortet = false;

  /* ---------- Werkzeug ---------- */

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function zeit(sek) {
    const m = Math.floor(Math.max(0, sek) / 60), s = Math.max(0, sek) % 60;
    return m + ":" + String(s).padStart(2, "0");
  }

  function q(sel) { return app.querySelector(sel); }
  function qa(sel) { return Array.prototype.slice.call(app.querySelectorAll(sel)); }

  function auf(sel, ereignis, fn) {
    qa(sel).forEach(e => e.addEventListener(ereignis, fn));
  }

  function zeichnen(inhalt) {
    app.innerHTML = inhalt;
    app.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  function kopf(rechts) {
    return `<div class="kopf">
      <div class="marke">DOSSIER <span>PARIS</span></div>
      <div class="rest">${rechts || ""}</div>
    </div>`;
  }

  /* ---------- Startbildschirm: Prolog ---------- */

  function zeigeProlog() {
    ansicht = "prolog";
    const p = window.STORY_PROLOG;
    const zeilen = p.text.map((t, i) =>
      `<div class="zeile ${i === 0 ? "" : "de"}" style="animation-delay:${i * 0.9}s">${esc(t)}</div>`
    ).join("");

    zeichnen(`
      ${kopf()}
      <div class="label rot">// ${esc(p.titel)}</div>
      <div class="terminal">${zeilen}</div>
      <div id="frageblock" style="opacity:0;transition:opacity .6s">
        <div class="karte mt">
          <div class="label">${esc(p.frage)}</div>
          <input class="eingabe" id="codename" maxlength="18" placeholder="Deckname" autocomplete="off">
          <div class="klein grau mt">Der Name bleibt nur auf diesem Gerät. Es gibt keinen Account und keine Anmeldung.</div>
          <button class="btn btn-haupt mt" id="losgehts">Aufnehmen</button>
        </div>
      </div>
    `);

    setTimeout(() => {
      const f = q("#frageblock");
      if (f) f.style.opacity = "1";
    }, p.text.length * 900 + 200);

    auf("#losgehts", "click", () => {
      DP.audio.freischalten();
      const wert = (q("#codename").value || "").trim();
      DP.stand.codename = wert || "Agent";
      DP.stand.prolog = true;
      DP.speichern();
      DP.audio.aufstieg();
      zeigeEinstufungStart();
    });
    auf("#codename", "keydown", e => { if (e.key === "Enter") q("#losgehts").click(); });
  }

  /* ---------- Einstufung ---------- */

  let einstufung = null, einstufungIndex = 0, einstufungErgebnisse = null;

  function zeigeEinstufungStart() {
    ansicht = "einstufung-start";
    zeichnen(`
      ${kopf()}
      <div class="label rot">// EINSTUFUNG</div>
      <div class="karte akzent">
        <h2>Erst mal sehen, was du kannst</h2>
        <p class="mt">Du hattest zwei Jahre Unterricht. Irgendwas davon sitzt – auch
        wenn es sich gerade nicht so anfühlt.</p>
        <p>${DP.EINSTUFUNG_MODULE} Fragen, ungefähr fünf Minuten. Danach fängst du nicht
        bei null an, sondern da, wo es wirklich klemmt.</p>
        <p class="klein grau">Raten bringt nichts. Was du nicht weißt, einfach
        „Weiß ich nicht" tippen – das ist hier keine Schande, sondern die
        eigentliche Information.</p>
      </div>
      <button class="btn btn-haupt" id="los">Einstufung starten</button>
      <button class="btn btn-geist mt" id="ueberspringen">Überspringen, ich fange vorne an</button>`);
    auf("#los", "click", () => {
      DP.audio.freischalten();
      einstufung = DP.einstufungBauen();
      einstufungIndex = 0;
      einstufungErgebnisse = [];
      zeigeEinstufungFrage();
    });
    auf("#ueberspringen", "click", () => {
      DP.stand.einstufungGemacht = true;
      DP.speichern();
      zeigeBasis();
    });
  }

  function zeigeEinstufungFrage() {
    ansicht = "einstufung";
    if (einstufungIndex >= einstufung.length) return zeigeEinstufungErgebnis();
    const f = einstufung[einstufungIndex];
    const it = f.item;

    zeichnen(`
      <div class="missionskopf">
        <div class="missionsleiste">
          <span class="chip mono">Frage ${einstufungIndex + 1} / ${einstufung.length}</span>
        </div>
        <div class="fortschrittsleiste"><i style="width:${Math.round((einstufungIndex / einstufung.length) * 100)}%"></i></div>
      </div>
      <div class="fragetyp mt">${esc(it.thema)}</div>
      <div class="frage">${it.frage}</div>
      <div class="optionen">
        ${it.optionen.map(o => `<button class="option" data-w="${esc(o)}">${esc(o)}</button>`).join("")}
        <button class="option grau" data-w="__keine_ahnung__">Weiß ich nicht</button>
      </div>`);

    auf(".option", "click", ev => {
      const w = ev.currentTarget.dataset.w;
      const richtig = w !== "__keine_ahnung__" && DP.norm(w) === DP.norm(it.loesung);
      einstufungErgebnisse.push({ modulId: f.modul.id, titel: f.modul.titel, thema: f.modul.thema, richtig: richtig });
      if (richtig) DP.audio.richtig(); else DP.audio.tick();
      einstufungIndex++;
      setTimeout(zeigeEinstufungFrage, 160);
    });
  }

  function zeigeEinstufungErgebnis() {
    ansicht = "einstufung-ergebnis";
    const auswertung = DP.einstufungAuswerten(einstufungErgebnisse);
    const kann = einstufungErgebnisse.filter(e => e.richtig);
    const luecken = einstufungErgebnisse.filter(e => !e.richtig);
    const modul = DP.aktuellesModul();

    zeichnen(`
      ${kopf()}
      <div class="karte akzent zentriert">
        <div class="label">// EINSTUFUNG AUSGEWERTET</div>
        <div class="abschluss-zahl">${auswertung.gekonnt}<span style="font-size:24px;color:var(--grau)">/${auswertung.gesamt}</span></div>
        <div class="klein grau">richtig beantwortet</div>
      </div>

      ${kann.length ? `<div class="karte">
        <div class="label">// DAS KANNST DU SCHON</div>
        ${kann.map(e => `<div class="klein" style="padding:4px 0">&#10003; ${esc(e.thema)}</div>`).join("")}
        <div class="klein grau mt">Das musst du nicht neu lernen. Es taucht nur ab und zu
        zur Kontrolle auf.</div>
      </div>` : ""}

      ${luecken.length ? `<div class="karte warn">
        <div class="label rot">// HIER KLEMMT ES</div>
        ${luecken.slice(0, 6).map(e => `<div class="klein" style="padding:4px 0">${esc(e.thema)}</div>`).join("")}
        ${luecken.length > 6 ? `<div class="klein grau">und ${luecken.length - 6} weitere</div>` : ""}
      </div>` : ""}

      <div class="karte">
        <div class="label grau">// DEIN START</div>
        <h3>${esc(modul.titel)}</h3>
        <div class="klein grau">${esc(modul.thema)}</div>
      </div>

      <div class="story"><p>«On commence ici.» Wir fangen hier an.</p></div>
      <button class="btn btn-haupt" id="w">Zur Zentrale</button>`);

    DP.audio.aufstieg();
    auf("#w", "click", zeigeBasis);
  }

  /* ---------- Zentrale ---------- */

  function ringSvg(anteil, farbe) {
    const r = 46, u = 2 * Math.PI * r;
    return `<svg width="104" height="104" viewBox="0 0 104 104">
      <circle cx="52" cy="52" r="${r}" fill="none" stroke="#1a2436" stroke-width="8"/>
      <circle cx="52" cy="52" r="${r}" fill="none" stroke="${farbe}" stroke-width="8" stroke-linecap="round"
        stroke-dasharray="${u}" stroke-dashoffset="${u * (1 - Math.min(1, anteil))}"/>
    </svg>`;
  }

  function zeigeBasis() {
    ansicht = "basis";
    DP.tagWechseln();
    const s = DP.stand;
    const rang = DP.rang(s.xp);
    const naechst = DP.naechsterRang(s.xp);
    const ziel = (s.einstellungen.tagesziel || 15) * 60;
    const anteil = Math.min(1, s.tag.sekunden / ziel);
    const modul = DP.aktuellesModul();
    const faellig = DP.faelligeKeys().length;
    /* Bewusst nicht der Stapel offener Wiederholungen auf der Kachel: eine Zahl,
       die immer weiter waechst, sieht aus wie Schulden. Die hier wird nur groesser. */
    const sitzt = Object.values(s.srs).filter(k => k.r >= 3).length;
    const gesamt = Math.round(DP.gesamtFortschritt() * 100);
    const fertigHeute = s.tag.missionFertig;

    const rangAnteil = naechst
      ? (s.xp - rang.xp) / (naechst.xp - rang.xp)
      : 1;

    zeichnen(`
      ${kopf(`<span class="chip ${s.serie.tage > 0 ? "aktiv" : ""}">&#9650; ${s.serie.tage} Tage</span>
              <span class="chip cyan">${s.xp} XP</span>`)}

      <div class="karte akzent">
        <div class="ring-box">
          <div class="ring">
            ${ringSvg(anteil, fertigHeute ? "#46e08a" : "#2ee6d6")}
            <div class="innen">
              <div class="zahl">${fertigHeute ? "&#10003;" : Math.round(anteil * 100) + "%"}</div>
              <div class="unter">HEUTE</div>
            </div>
          </div>
          <div style="flex:1;min-width:0">
            <div class="label grau">AGENT</div>
            <h2>${esc(s.codename)}</h2>
            <div class="klein grau">${esc(rang.name)} &middot; ${esc(rang.de)}</div>
            <div class="balken mt"><i style="width:${Math.round(rangAnteil * 100)}%"></i></div>
            <div class="klein grau" style="margin-top:5px">
              ${naechst ? (naechst.xp - s.xp) + " XP bis " + esc(naechst.name) : "Höchster Rang erreicht."}
            </div>
          </div>
        </div>
        <div class="statreihe">
          <div class="stat"><div class="wert">${s.fortschritt.fertig.length}<span style="font-size:14px;color:var(--grau)">/${(window.CURRICULUM || []).length}</span></div><div class="titel">Akten gelöst</div></div>
          <div class="stat"><div class="wert">${sitzt}</div><div class="titel">sitzt sicher</div></div>
          <div class="stat"><div class="wert">${s.serie.beste}</div><div class="titel">Rekord</div></div>
        </div>
      </div>

      <div class="karte">
        <div class="label">AKTUELLE AKTE &middot; ${esc(modul.id.toUpperCase())}</div>
        <h3>${esc(modul.titel)}</h3>
        <div class="klein grau" style="margin-bottom:10px">${esc(modul.thema)}</div>
        <div class="balken"><i style="width:${Math.round(DP.modulStaerke(modul.id) * 100)}%"></i></div>
      </div>

      <button class="btn btn-haupt" id="start">
        ${fertigHeute ? "Noch eine Mission" : "Mission starten"}
        <span class="unter">${s.einstellungen.tagesziel || 15} Minuten &middot; ${esc(modul.titel)}</span>
      </button>

      <div class="btn-reihe mt">
        <button class="btn" id="kurz" style="flex:1">Kurzeinsatz<span class="unter">5 Minuten</span></button>
        <button class="btn" id="wdh" style="flex:1">Wiederholen<span class="unter">${faellig > 99 ? "99+" : faellig} warten</span></button>
      </div>

      <button class="btn mt" id="pruefung">Prüfungssimulation<span class="unter">20 Aufgaben aus allem, was du bisher hattest</span></button>

      <div class="btn-reihe mt">
        <button class="btn btn-geist" id="akte" style="flex:1">Akte</button>
        <button class="btn btn-geist" id="orden" style="flex:1">Orden</button>
        <button class="btn btn-geist" id="bericht" style="flex:1">Bericht</button>
      </div>

      <div class="fuss">
        <button class="btn-geist" id="einst" style="width:auto;padding:8px 16px;display:inline-block">Einstellungen</button>
      </div>
    `);

    auf("#start", "click", () => starteMission("mission"));
    auf("#kurz", "click", () => starteMission("kurz"));
    auf("#wdh", "click", () => starteMission("wiederholung"));
    auf("#pruefung", "click", () => starteMission("pruefung"));
    auf("#akte", "click", zeigeAkte);
    auf("#orden", "click", zeigeOrden);
    auf("#bericht", "click", zeigeBericht);
    auf("#einst", "click", zeigeEinstellungen);
  }

  /* ---------- Mission ---------- */

  function starteMission(modus) {
    DP.audio.freischalten();
    mission = DP.missionBauen(modus);
    if (!mission.schritte.length) {
      alert("Gerade ist nichts fällig. Starte eine normale Mission.");
      return;
    }
    schrittIndex = 0;
    zeitAus = false;
    DP.stand.kombo = 0;
    restZeit = mission.dauer;
    statistik = { gesamt: 0, richtig: 0, fast: 0, falsch: 0, boss: 0, bossGesamt: 0, start: Date.now(), themen: {} };
    ansicht = "mission";
    uhrStarten();
    zeigeSchritt();
  }

  function uhrStarten() {
    uhrStoppen();
    uhrTimer = setInterval(() => {
      restZeit--;
      DP.stand.tag.sekunden++;
      if (DP.stand.tag.sekunden % 20 === 0) DP.speichern();
      const u = q(".uhr");
      if (u) {
        u.textContent = restZeit >= 0 ? zeit(restZeit) : "+" + zeit(-restZeit);
        u.className = "uhr" + (restZeit <= 0 ? " aus" : restZeit <= 120 ? " knapp" : "");
      }
      if (restZeit === 0) {
        zeitAus = true;
        DP.audio.tick();
      }
    }, 1000);
  }

  function uhrStoppen() {
    if (uhrTimer) { clearInterval(uhrTimer); uhrTimer = null; }
  }

  function missionsKopf() {
    const anteil = schrittIndex / Math.max(1, mission.schritte.length);
    return `<div class="missionskopf">
      <div class="missionsleiste">
        <span class="uhr">${zeit(restZeit)}</span>
        <span class="chip mono">${esc(mission.titel)}</span>
        ${DP.stand.kombo >= 3 ? `<span class="chip aktiv">&#9889; ${DP.stand.kombo}</span>` : ""}
        <button class="abbrechen" id="raus">Abbrechen</button>
      </div>
      <div class="fortschrittsleiste"><i style="width:${Math.round(anteil * 100)}%"></i></div>
    </div>`;
  }

  function nachKopf() {
    auf("#raus", "click", () => {
      if (statistik.gesamt === 0 || confirm("Mission abbrechen? Der Fortschritt bis hierher bleibt gespeichert.")) {
        uhrStoppen();
        DP.audio.stopp();
        DP.speichern();
        zeigeBasis();
      }
    });
  }

  /* Wenn die Zeit um ist, ueberspringen wir das restliche Training und gehen
     direkt zum Finale. Das 15-Minuten-Versprechen gilt – die Story trotzdem auch. */
  function zeitSprung() {
    if (!zeitAus) return;
    const jetzt = mission.schritte[schrittIndex];
    if (!jetzt) return;
    const istFuellstoff = jetzt.art === "item" && (jetzt.phase === "training" || jetzt.phase === "rappel");
    if (!istFuellstoff) return;
    for (let i = schrittIndex; i < mission.schritte.length; i++) {
      const s = mission.schritte[i];
      if (s.art === "story" || s.phase === "boss" || (s.art === "karte" && s.stil === "boss")) {
        schrittIndex = i;
        return;
      }
    }
    schrittIndex = mission.schritte.length;
  }

  function weiter() {
    schrittIndex++;
    zeitSprung();
    zeigeSchritt();
  }

  function zeigeSchritt() {
    if (schrittIndex >= mission.schritte.length) return zeigeAbschluss();
    const s = mission.schritte[schrittIndex];
    beantwortet = false;

    if (s.art === "karte") return zeigeKarte(s);
    if (s.art === "regel") return zeigeRegel(s);
    if (s.art === "lernkarte") return zeigeLernkarte(s);
    if (s.art === "paare") return zeigePaare(s);
    if (s.art === "story") return zeigeStory(s);
    if (s.art === "item") return zeigeItem(s);
    return weiter();
  }

  function zeigeKarte(s) {
    const stilLabel = s.stil === "boss" ? "rot" : s.stil === "briefing" ? "" : "grau";
    zeichnen(`${missionsKopf()}
      <div class="karte ${s.stil === "boss" ? "warn" : "akzent"} mt">
        <div class="label ${stilLabel}">// ${esc(s.titel)}</div>
        ${s.thema ? `<div class="klein grau" style="margin-bottom:10px">${esc(s.thema)}</div>` : ""}
        ${s.text.map(t => `<p>${esc(t)}</p>`).join("")}
      </div>
      <button class="btn btn-haupt" id="w">Weiter</button>`);
    nachKopf();
    auf("#w", "click", weiter);
  }

  function zeigeRegel(s) {
    const g = s.grammatik;
    zeichnen(`${missionsKopf()}
      <div class="karte akzent regelkarte mt">
        <div class="label">// REGEL</div>
        <h3>${esc(g.titel)}</h3>
        <p class="mt">${esc(g.regel)}</p>
        <div class="tabelle">
          ${g.tabelle.map(z => `<div class="zeile"><div class="li">${esc(z[0])}</div><div class="re">${esc(z[1])}</div></div>`).join("")}
        </div>
        ${g.tipp ? `<div class="tipp"><b>Trick:</b> ${esc(g.tipp)}</div>` : ""}
      </div>
      <button class="btn btn-haupt" id="w">Verstanden</button>`);
    nachKopf();
    auf("#w", "click", weiter);
  }

  function zeigeLernkarte(s) {
    const v = s.vokabel;
    zeichnen(`${missionsKopf()}
      <div class="fragetyp mt">Neues Wort</div>
      <div class="lernkarte">
        <div class="fr">${esc(v.fr)}</div>
        <div class="de">${esc(v.de)}</div>
        <div class="hoeren"><button class="lautsprecher" id="hoer">&#9654;&#65038; anhören</button></div>
      </div>
      <button class="btn btn-haupt mt" id="w">Weiter</button>`);
    nachKopf();
    DP.audio.sprechen(v.fr);
    auf("#hoer", "click", () => DP.audio.sprechen(v.fr));
    auf("#w", "click", weiter);
  }

  /* ---------- Paare-Minispiel ---------- */

  function zeigePaare(s) {
    const paare = s.paare;
    if (!paare.length) return weiter();
    const links = DP.mische(paare.map((p, i) => ({ t: p.fr, i: i, seite: "fr" })));
    const rechts = DP.mische(paare.map((p, i) => ({ t: p.de, i: i, seite: "de" })));
    let gewaehlt = null, geloest = 0;

    zeichnen(`${missionsKopf()}
      <div class="fragetyp mt">Aufwärmen &middot; Paare finden</div>
      <div class="frage" style="font-size:18px">Tipp je ein französisches und das passende deutsche Wort an.</div>
      <div class="paare">
        <div id="sp-links">${links.map(x => `<div class="paar" data-i="${x.i}" data-s="fr">${esc(x.t)}</div>`).join("")}</div>
        <div id="sp-rechts">${rechts.map(x => `<div class="paar" data-i="${x.i}" data-s="de">${esc(x.t)}</div>`).join("")}</div>
      </div>
      <button class="btn btn-geist mt" id="w">Überspringen</button>`);
    nachKopf();

    qa(".paar").forEach(el => {
      el.addEventListener("click", () => {
        if (el.classList.contains("geloest")) return;
        if (!gewaehlt) {
          qa(".paar").forEach(x => x.classList.remove("gewaehlt"));
          el.classList.add("gewaehlt");
          gewaehlt = el;
          if (el.dataset.s === "fr") DP.audio.sprechen(el.textContent);
          return;
        }
        if (gewaehlt === el) { el.classList.remove("gewaehlt"); gewaehlt = null; return; }
        if (gewaehlt.dataset.s === el.dataset.s) {
          qa(".paar").forEach(x => x.classList.remove("gewaehlt"));
          el.classList.add("gewaehlt"); gewaehlt = el; return;
        }
        if (gewaehlt.dataset.i === el.dataset.i) {
          gewaehlt.classList.add("geloest"); el.classList.add("geloest");
          gewaehlt.classList.remove("gewaehlt");
          DP.audio.richtig();
          gewaehlt = null; geloest++;
          if (geloest >= paare.length) {
            DP.stand.xp += 15;
            DP.audio.kombo();
            setTimeout(weiter, 450);
          }
        } else {
          const a = gewaehlt, b = el;
          a.classList.add("fehler"); b.classList.add("fehler");
          DP.audio.falsch();
          DP.audio.vibrieren(40);
          setTimeout(() => {
            a.classList.remove("fehler", "gewaehlt");
            b.classList.remove("fehler");
          }, 320);
          gewaehlt = null;
        }
      });
    });
    auf("#w", "click", weiter);
  }

  /* ---------- Story ---------- */

  function zeigeStory(s) {
    const t = String(s.text || "");
    const markiert = t.replace(/«([^»]*)»/g, (m, inner) => `<span class="fr">«${esc(inner)}»</span>`);
    zeichnen(`${missionsKopf()}
      <div class="label" style="margin-top:22px">// ${esc(s.titel)}</div>
      <div class="story"><p>${markiert}</p></div>
      ${s.letzte ? `<div class="karte akzent"><div class="label gold">AKTE ABGESCHLOSSEN</div>
        <p class="klein grau" style="margin:0">Das nächste Dossier wird freigeschaltet, sobald der Stoff sitzt.</p></div>` : ""}
      <button class="btn btn-haupt" id="w">Weiter</button>`);
    nachKopf();
    auf("#w", "click", weiter);
  }

  /* ---------- Aufgaben ---------- */

  const AKZENTE = ["é", "è", "ê", "à", "â", "ç", "ù", "û", "î", "ô", "ï", "'"];

  function zeigeItem(s) {
    const it = s.item;
    const boss = s.phase === "boss";
    const kopfLabel = boss
      ? `Décodage ${(s.bossIndex || 0) + 1}/${s.bossGesamt}`
      : s.phase === "rappel" ? "Rappel &middot; " + esc(it.thema) : esc(it.thema);

    let koerper = "";

    if (it.typ === "hoeren") {
      const stumm = !(DP.stand.einstellungen.stimme && DP.audio.kannSprechen());
      koerper = `
        <div class="frage zentriert" style="margin-top:12px">
          ${stumm ? esc(it.sprechen) : `<button class="lautsprecher" id="hoer" style="font-size:16px;padding:16px 28px">&#9654;&#65038; nochmal hören</button>`}
        </div>
        <div class="optionen">${it.optionen.map(o => `<button class="option" data-w="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
    } else if (it.typ === "mc") {
      koerper = `
        <div class="frage">${it.frage}</div>
        <div class="optionen">${it.optionen.map(o => `<button class="option" data-w="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
    } else if (it.typ === "bauen") {
      koerper = `
        <div class="frage">${esc(it.frage)}</div>
        <div class="bauflaeche" id="bau"></div>
        <div class="teile" id="teile">${it.teile.map((t, i) => `<button class="teil" data-i="${i}">${esc(t)}</button>`).join("")}</div>
        <button class="btn btn-haupt mt" id="pruef">Prüfen</button>`;
    } else {
      koerper = `
        <div class="frage">${it.frage}</div>
        ${it.hinweis ? `<div class="klein grau">${esc(it.hinweis)}</div>` : ""}
        <input class="eingabe mt" id="ant" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Antwort">
        <div class="akzente">${AKZENTE.map(a => `<button class="akzenttaste" data-a="${a}">${a}</button>`).join("")}</div>
        <button class="btn btn-haupt mt" id="pruef">Prüfen</button>`;
    }

    zeichnen(`${missionsKopf()}
      <div class="fragetyp mt">${kopfLabel}</div>
      ${koerper}
      <div id="rueck"></div>`);
    nachKopf();

    if (it.typ === "hoeren") {
      setTimeout(() => DP.audio.sprechen(it.sprechen), 220);
      auf("#hoer", "click", () => DP.audio.sprechen(it.sprechen));
    }

    if (it.typ === "mc" || it.typ === "hoeren") {
      auf(".option", "click", e => {
        if (beantwortet) return;
        antworten(s, e.currentTarget.dataset.w, e.currentTarget);
      });
    } else if (it.typ === "bauen") {
      const gewaehlt = [];
      const bau = q("#bau");
      function neuZeichnen() {
        bau.innerHTML = gewaehlt.map((g, n) => `<button class="teil" data-n="${n}">${esc(g.t)}</button>`).join("");
        bau.querySelectorAll(".teil").forEach(b => b.addEventListener("click", () => {
          if (beantwortet) return;
          const n = Number(b.dataset.n);
          const zurueck = gewaehlt.splice(n, 1)[0];
          const orig = q('#teile .teil[data-i="' + zurueck.i + '"]');
          if (orig) orig.classList.remove("weg");
          neuZeichnen();
        }));
      }
      auf("#teile .teil", "click", e => {
        if (beantwortet) return;
        const b = e.currentTarget;
        if (b.classList.contains("weg")) return;
        b.classList.add("weg");
        gewaehlt.push({ t: b.textContent, i: b.dataset.i });
        neuZeichnen();
      });
      auf("#pruef", "click", () => {
        if (beantwortet) return;
        antworten(s, gewaehlt.map(g => g.t).join(" "), null);
      });
    } else {
      const feld = q("#ant");
      setTimeout(() => { try { feld.focus(); } catch (e) {} }, 120);
      auf(".akzenttaste", "click", e => {
        const pos = feld.selectionStart || feld.value.length;
        const a = e.currentTarget.dataset.a;
        feld.value = feld.value.slice(0, pos) + a + feld.value.slice(pos);
        feld.focus();
        try { feld.setSelectionRange(pos + 1, pos + 1); } catch (err) {}
      });
      auf("#pruef", "click", () => { if (!beantwortet) antworten(s, feld.value, null); });
      feld.addEventListener("keydown", e => {
        if (e.key === "Enter") { e.preventDefault(); if (!beantwortet) antworten(s, feld.value, null); }
      });
    }
  }

  function antworten(s, eingabe, knopf) {
    beantwortet = true;
    const it = s.item;
    const ergebnis = (it.typ === "mc" || it.typ === "hoeren")
      ? (DP.norm(eingabe) === DP.norm(it.loesung) ? "richtig" : "falsch")
      : DP.pruefe(eingabe, it.loesung);

    DP.bewerten(it.key, ergebnis);
    statistik.gesamt++;
    statistik[ergebnis === "richtig" ? "richtig" : ergebnis === "fast" ? "fast" : "falsch"]++;
    if (s.phase === "boss") { statistik.bossGesamt++; if (ergebnis !== "falsch") statistik.boss++; }
    const thema = it.thema || "Sonstiges";
    if (!statistik.themen[thema]) statistik.themen[thema] = { ok: 0, ko: 0 };
    statistik.themen[thema][ergebnis === "falsch" ? "ko" : "ok"]++;

    DP.stand.tag.aufgaben++;
    if (ergebnis !== "falsch") DP.stand.tag.richtig++;
    const p = DP.punkte(ergebnis);
    DP.speichern();

    /* Optische Rueckmeldung */
    if (knopf) {
      qa(".option").forEach(o => {
        if (DP.norm(o.dataset.w) === DP.norm(it.loesung)) o.classList.add("richtig");
        else if (o === knopf) o.classList.add("falsch");
        else o.classList.add("gedimmt");
      });
    }

    if (p > 0) {
      const f = document.createElement("div");
      f.className = "punkte-flug";
      f.textContent = "+" + p;
      document.body.appendChild(f);
      setTimeout(() => f.remove(), 1000);
    }

    if (ergebnis === "richtig") {
      DP.audio.richtig();
      if (DP.stand.kombo > 0 && DP.stand.kombo % 5 === 0) {
        DP.audio.kombo();
        const k = document.createElement("div");
        k.className = "kombo";
        k.textContent = DP.stand.kombo + "x";
        document.body.appendChild(k);
        setTimeout(() => k.remove(), 1100);
      }
    } else if (ergebnis === "fast") {
      DP.audio.fast();
    } else {
      DP.audio.falsch();
      DP.audio.vibrieren(60);
    }

    const r = q("#rueck");
    const codeblock = (s.phase === "boss" && s.codewort)
      ? `<div class="klein mono" style="margin-top:10px;letter-spacing:4px;color:var(--gold)">${
          s.codewort.split("").map((c, i) => i < Math.ceil(s.codewort.length * (statistik.boss / Math.max(1, s.bossGesamt))) ? esc(c) : "&middot;").join("")
        }</div>` : "";

    if (ergebnis === "richtig") {
      r.innerHTML = `<div class="rueckmeldung gut"><div class="kopfzeile">Richtig</div>
        ${it.sprechen ? `<div class="klein grau">${esc(it.sprechen)}</div>` : ""}${codeblock}</div>`;
      if (it.sprechen && it.typ !== "hoeren") DP.audio.sprechen(it.sprechen);
      setTimeout(() => { if (ansicht === "mission") weiter(); }, 850);
    } else if (ergebnis === "fast") {
      r.innerHTML = `<div class="rueckmeldung fast"><div class="kopfzeile">Fast</div>
        <div>Schreibweise: <span class="loesung">${esc(it.loesung)}</span></div>
        <div class="klein grau">Zählt trotzdem. Kommt aber bald nochmal.</div>${codeblock}</div>
        <button class="btn btn-haupt mt" id="w">Weiter</button>`;
      if (it.sprechen) DP.audio.sprechen(it.sprechen);
      auf("#w", "click", weiter);
    } else {
      r.innerHTML = `<div class="rueckmeldung schlecht"><div class="kopfzeile">Noch nicht</div>
        <div>Richtig ist: <span class="loesung">${esc(it.loesung)}</span></div>
        ${it.sprechen && it.sprechen !== it.loesung ? `<div class="klein grau">${esc(it.sprechen)}</div>` : ""}${codeblock}</div>
        <button class="btn btn-haupt mt" id="w">Weiter</button>`;
      if (it.sprechen) DP.audio.sprechen(it.sprechen);
      auf("#w", "click", weiter);
    }
  }

  /* ---------- Abschluss ---------- */

  function zeigeAbschluss() {
    uhrStoppen();
    ansicht = "abschluss";
    const dauer = Math.round((Date.now() - statistik.start) / 1000);
    const quote = statistik.gesamt ? Math.round(((statistik.richtig + statistik.fast) / statistik.gesamt) * 100) : 0;
    const neueOrden = DP.missionAbschliessen(mission, statistik);

    const schwach = Object.keys(statistik.themen)
      .map(t => ({ t: t, ko: statistik.themen[t].ko, ok: statistik.themen[t].ok }))
      .filter(x => x.ko > 0)
      .sort((a, b) => b.ko - a.ko).slice(0, 3);

    let extra = "";
    if (mission.modus === "pruefung") {
      const n = DP.noteSchaetzen(quote);
      extra = `<div class="karte warn">
        <div class="label rot">// SELBSTEINSCHÄTZUNG</div>
        <div class="abschluss-zahl" style="color:var(--gold)">${n.note}</div>
        <p class="klein grau" style="margin-top:6px">Läge diese Simulation als Klassenarbeit vor, entspräche das ungefähr ${esc(n.text)}.
        Das ist nur eine Orientierung aus deinen Antworten, keine echte Note.</p>
      </div>`;
    }

    const rang = DP.rang(DP.stand.xp);

    zeichnen(`
      ${kopf(`<span class="chip cyan">${DP.stand.xp} XP</span>`)}
      <div class="karte akzent zentriert">
        <div class="label">// MISSION ABGESCHLOSSEN</div>
        <div class="abschluss-zahl">${quote}%</div>
        <div class="klein grau">Trefferquote</div>
        <div class="statreihe">
          <div class="stat"><div class="wert">${statistik.gesamt}</div><div class="titel">Aufgaben</div></div>
          <div class="stat"><div class="wert">${zeit(dauer)}</div><div class="titel">Dauer</div></div>
          <div class="stat"><div class="wert">${DP.stand.serie.tage}</div><div class="titel">Tage Serie</div></div>
        </div>
      </div>
      ${extra}
      ${neueOrden.length ? `<div class="karte">
        <div class="label gold">// NEUE ORDEN</div>
        ${neueOrden.map(o => `<div class="modul"><div class="mitte"><div class="t">${esc(o.name)}</div><div class="s">${esc(o.text)}</div></div></div>`).join("")}
      </div>` : ""}
      ${schwach.length ? `<div class="karte">
        <div class="label grau">// NOCH WACKELIG</div>
        ${schwach.map(x => `<div class="klein" style="padding:5px 0">${esc(x.t)} &middot; <span class="grau">${x.ko} Fehler</span></div>`).join("")}
        <div class="klein grau mt">Kommt automatisch wieder. Du musst dir nichts merken.</div>
      </div>` : ""}
      <div class="karte">
        <div class="label grau">// RANG</div>
        <h3>${esc(rang.name)}</h3>
        <div class="klein grau">${esc(rang.de)}</div>
      </div>
      <div class="story"><p>${esc(DP.zufall(window.FUNK))}</p></div>
      <button class="btn btn-haupt" id="heim">Zurück zur Zentrale</button>
      <button class="btn btn-geist mt" id="nochmal">Noch eine Runde</button>
    `);

    DP.audio.aufstieg();
    auf("#heim", "click", zeigeBasis);
    auf("#nochmal", "click", () => starteMission("kurz"));
  }

  /* ---------- Akte ---------- */

  function zeigeAkte() {
    ansicht = "akte";
    const module = window.CURRICULUM || [];
    const saisons = { 1: "SAISON 1 – ANKUNFT", 2: "SAISON 2 – DER PLAN", 3: "SAISON 3 – RÜCKBLENDE", 4: "SAISON 4 – ZUGRIFF" };
    let inhalt = "";
    let letzteSaison = 0;

    module.forEach((m, i) => {
      if (m.saison !== letzteSaison) {
        letzteSaison = m.saison;
        inhalt += `<div class="saisonkopf">${saisons[m.saison]}</div>`;
      }
      const staerke = DP.modulStaerke(m.id);
      const fertig = DP.stand.fortschritt.fertig.indexOf(m.id) > -1;
      const gesperrt = i > DP.stand.fortschritt.modul;
      inhalt += `<div class="modul anklickbar ${fertig ? "fertig" : ""} ${gesperrt ? "gesperrt" : ""}" data-modul="${m.id}">
        <div class="nr">${fertig ? "&#10003;" : String(m.nr).padStart(2, "0")}</div>
        <div class="mitte">
          <div class="t">${esc(m.titel)}</div>
          <div class="s">${esc(m.thema)}</div>
          <div class="balken"><i style="width:${Math.round(staerke * 100)}%"></i></div>
        </div>
        <div class="prozent">${Math.round(staerke * 100)}%</div>
      </div>`;
    });

    zeichnen(`${kopf(`<span class="chip">${Math.round(DP.gesamtFortschritt() * 100)}% gesamt</span>`)}
      <h1>Die Akte</h1>
      <p class="klein grau">24 Module – der komplette Stoff aus zwei Jahren Französisch. Jeder Balken zeigt, wie sicher das Thema sitzt. Tipp ein Modul an, um Regeln und Wörter nachzuschlagen.</p>
      ${inhalt}
      <button class="btn btn-geist mt-gross" id="heim">Zurück</button>`);
    auf("#heim", "click", zeigeBasis);
    auf("[data-modul]", "click", ev => zeigeSpickzettel(ev.currentTarget.dataset.modul));
  }

  /* ---------- Spickzettel: alle Regeln und Woerter eines Moduls zum Nachschlagen ---------- */

  function zeigeSpickzettel(id) {
    ansicht = "spickzettel";
    const m = (window.CURRICULUM || []).find(x => x.id === id);
    if (!m) return zeigeAkte();

    zeichnen(`${kopf(`<span class="chip cyan">${Math.round(DP.modulStaerke(m.id) * 100)}%</span>`)}
      <div class="label">// SPICKZETTEL &middot; MODUL ${String(m.nr).padStart(2, "0")}</div>
      <h1>${esc(m.titel)}</h1>
      <p class="klein grau">${esc(m.ziel)}</p>

      ${m.grammar.map(g => `<div class="karte regelkarte">
        <div class="label">${esc(g.titel)}</div>
        <p class="klein">${esc(g.regel)}</p>
        <div class="tabelle">
          ${g.tabelle.map(z => `<div class="zeile"><div class="li">${esc(z[0])}</div><div class="re">${esc(z[1])}</div></div>`).join("")}
        </div>
        ${g.tipp ? `<div class="tipp"><b>Trick:</b> ${esc(g.tipp)}</div>` : ""}
      </div>`).join("")}

      <div class="karte">
        <div class="label grau">// WÖRTER</div>
        ${m.vocab.map(v => `<div class="zeile" style="display:flex;gap:12px;padding:7px 0;border-bottom:1px solid var(--linie)">
          <button class="li mono" data-sprich="${esc(v[0])}" style="flex:1;text-align:left;color:var(--cyan)">${esc(v[0])}</button>
          <div class="re grau klein" style="flex:1">${esc(v[1])}</div>
        </div>`).join("")}
      </div>

      <div class="karte">
        <div class="label grau">// SÄTZE</div>
        ${m.phrases.map(v => `<div style="padding:7px 0;border-bottom:1px solid var(--linie)">
          <button data-sprich="${esc(v[0])}" style="text-align:left;color:var(--cyan);font-weight:600">${esc(v[0])}</button>
          <div class="klein grau">${esc(v[1])}</div>
        </div>`).join("")}
      </div>

      <div class="klein grau zentriert">Tipp aufs Französische, um es zu hören.</div>
      <button class="btn btn-geist mt-gross" id="zurueck">Zurück zur Akte</button>`);

    auf("[data-sprich]", "click", ev => DP.audio.sprechen(ev.currentTarget.dataset.sprich));
    auf("#zurueck", "click", zeigeAkte);
  }

  function zeigeOrden() {
    ansicht = "orden";
    const hat = DP.stand.orden;
    zeichnen(`${kopf(`<span class="chip">${hat.length}/${DP.ORDEN.length}</span>`)}
      <h1>Orden</h1>
      <div class="orden-gitter">
        ${DP.ORDEN.map(o => `<div class="orden ${hat.indexOf(o.id) > -1 ? "" : "offen"}">
          <div class="n">${hat.indexOf(o.id) > -1 ? "&#9733; " : ""}${esc(o.name)}</div>
          <div class="t">${esc(o.text)}</div>
        </div>`).join("")}
      </div>
      <button class="btn btn-geist mt-gross" id="heim">Zurück</button>`);
    auf("#heim", "click", zeigeBasis);
  }

  /* ---------- Bericht ---------- */

  function zeigeBericht() {
    ansicht = "bericht";
    const s = DP.stand;
    const tage = s.verlauf.slice(-14);
    const heuteEintrag = { datum: s.tag.datum, sekunden: s.tag.sekunden, aufgaben: s.tag.aufgaben, richtig: s.tag.richtig };
    const reihe = tage.concat([heuteEintrag]).slice(-14);
    const max = Math.max(1, ...reihe.map(t => t.sekunden));
    const gesamtMin = Math.round((s.verlauf.reduce((a, t) => a + t.sekunden, 0) + s.tag.sekunden) / 60);
    const gesamtAufgaben = s.verlauf.reduce((a, t) => a + t.aufgaben, 0) + s.tag.aufgaben;
    const gesamtRichtig = s.verlauf.reduce((a, t) => a + t.richtig, 0) + s.tag.richtig;
    const quote = gesamtAufgaben ? Math.round((gesamtRichtig / gesamtAufgaben) * 100) : 0;
    const sicher = Object.values(s.srs).filter(k => k.r >= 3).length;

    const saisonStaerke = [1, 2, 3, 4].map(n => {
      const mods = (window.CURRICULUM || []).filter(m => m.saison === n);
      const w = mods.reduce((a, m) => a + DP.modulStaerke(m.id), 0) / Math.max(1, mods.length);
      return { n: n, w: w };
    });

    const schwach = (window.CURRICULUM || [])
      .filter(m => (s.fortschritt.beat[m.id] || 0) > 0)
      .map(m => ({ m: m, w: DP.modulStaerke(m.id) }))
      .sort((a, b) => a.w - b.w).slice(0, 3);

    zeichnen(`${kopf()}
      <h1>Bericht</h1>
      <p class="klein grau">Dein Stand in Zahlen. Kann man vorzeigen, muss man aber nicht.</p>

      <div class="karte">
        <div class="label grau">// LETZTE 14 TAGE</div>
        <div class="balkenreihe">
          ${reihe.map(t => `<i class="${t.sekunden > 0 ? "aktiv" : ""}" style="height:${Math.max(3, Math.round((t.sekunden / max) * 70))}px"></i>`).join("")}
        </div>
        <div class="statreihe">
          <div class="stat"><div class="wert">${gesamtMin}</div><div class="titel">Minuten gesamt</div></div>
          <div class="stat"><div class="wert">${gesamtAufgaben}</div><div class="titel">Aufgaben</div></div>
          <div class="stat"><div class="wert">${quote}%</div><div class="titel">Trefferquote</div></div>
        </div>
      </div>

      <div class="karte">
        <div class="label grau">// STOFF NACH SAISON</div>
        ${saisonStaerke.map(x => `<div style="margin-bottom:12px">
          <div class="klein" style="display:flex;justify-content:space-between">
            <span>Saison ${x.n}</span><span class="mono grau">${Math.round(x.w * 100)}%</span>
          </div>
          <div class="balken"><i style="width:${Math.round(x.w * 100)}%"></i></div>
        </div>`).join("")}
        <div class="klein grau">${sicher} Aufgaben sitzen sicher im Langzeitgedächtnis.</div>
      </div>

      ${schwach.length ? `<div class="karte">
        <div class="label grau">// GRÖSSTE BAUSTELLEN</div>
        ${schwach.map(x => `<div class="klein" style="padding:6px 0">
          <b>${esc(x.m.titel)}</b> &middot; ${esc(x.m.thema)} <span class="grau">(${Math.round(x.w * 100)}%)</span>
        </div>`).join("")}
      </div>` : ""}

      <button class="btn btn-geist" id="kopieren">Bericht als Text kopieren</button>
      <button class="btn btn-geist mt" id="heim">Zurück</button>`);

    auf("#kopieren", "click", () => {
      const text = [
        "DOSSIER PARIS – Stand " + DP.heute(),
        "Agent: " + s.codename + " (" + DP.rang(s.xp).name + ", " + s.xp + " XP)",
        "Serie: " + s.serie.tage + " Tage (Rekord " + s.serie.beste + ")",
        "Gesamtzeit: " + gesamtMin + " Minuten, " + gesamtAufgaben + " Aufgaben, " + quote + "% richtig",
        "Stoff abgedeckt: " + Math.round(DP.gesamtFortschritt() * 100) + "%",
        "",
        "Nach Saison:",
        ...saisonStaerke.map(x => "  Saison " + x.n + ": " + Math.round(x.w * 100) + "%"),
        "",
        "Baustellen: " + (schwach.map(x => x.m.titel).join(", ") || "keine")
      ].join("\n");
      try {
        navigator.clipboard.writeText(text);
        q("#kopieren").textContent = "Kopiert.";
      } catch (e) {
        alert(text);
      }
    });
    auf("#heim", "click", zeigeBasis);
  }

  /* ---------- Einstellungen ---------- */

  function zeigeEinstellungen() {
    ansicht = "einstellungen";
    const e = DP.stand.einstellungen;
    zeichnen(`${kopf()}
      <h1>Einstellungen</h1>
      <div class="karte">
        <div class="schalter"><div><div>Signaltöne</div><div class="klein grau">Kurze Rückmeldungen</div></div>
          <div class="schieber ${e.ton ? "an" : ""}" data-k="ton"><i></i></div></div>
        <div class="schalter"><div><div>Französische Aussprache</div><div class="klein grau">${DP.audio.kannSprechen() ? (DP.audio.hatFranzoesisch() ? "Französische Stimme gefunden." : "Keine französische Stimme auf diesem Gerät – klingt dann falsch.") : "Dieses Gerät kann nicht sprechen."}</div></div>
          <div class="schieber ${e.stimme ? "an" : ""}" data-k="stimme"><i></i></div></div>
        <div class="schalter" style="border:none">
          <div><div>Sprechtempo</div><div class="klein grau">Langsamer hilft am Anfang.</div></div>
          <div><button class="chip" data-tempo="0.7">langsam</button>
               <button class="chip" data-tempo="0.85">normal</button>
               <button class="chip" data-tempo="1">schnell</button></div>
        </div>
      </div>

      <div class="karte">
        <div class="label grau">// TAGESZIEL</div>
        <div class="btn-reihe">
          ${[10, 15, 20].map(m => `<button class="btn ${e.tagesziel === m ? "" : "btn-geist"}" data-ziel="${m}" style="flex:1;text-align:center">${m} min</button>`).join("")}
        </div>
        <div class="klein grau mt">15 Minuten sind der Plan. 10 ist besser als nichts, 20 nur, wenn du wirklich Lust hast.</div>
      </div>

      <div class="karte">
        <div class="label grau">// ALIBIS</div>
        <p class="klein grau" style="margin:0">Du hast ${DP.stand.serie.alibis} Alibis diesen Monat. Jedes rettet deine Serie für einen verpassten Tag – automatisch, ohne dass du etwas tun musst.</p>
      </div>

      <button class="btn btn-geist" id="neueEinstufung">Einstufung wiederholen</button>
      <button class="btn btn-geist mt" id="reset" style="color:var(--rot);border-color:rgba(255,77,106,.4)">Alles zurücksetzen</button>
      <button class="btn btn-geist mt" id="heim">Zurück</button>

      <div class="fuss">Alle Daten liegen nur in diesem Browser. Kein Server, kein Account, keine Werbung.</div>`);

    auf(".schieber", "click", ev => {
      const k = ev.currentTarget.dataset.k;
      DP.stand.einstellungen[k] = !DP.stand.einstellungen[k];
      DP.speichern();
      if (k === "ton" && DP.stand.einstellungen.ton) DP.audio.richtig();
      if (k === "stimme" && DP.stand.einstellungen.stimme) DP.audio.sprechen("Bonjour !");
      zeigeEinstellungen();
    });
    auf("[data-tempo]", "click", ev => {
      DP.stand.einstellungen.tempo = Number(ev.currentTarget.dataset.tempo);
      DP.speichern();
      DP.audio.sprechen("Je m'appelle " + DP.stand.codename);
    });
    auf("[data-ziel]", "click", ev => {
      DP.stand.einstellungen.tagesziel = Number(ev.currentTarget.dataset.ziel);
      DP.speichern();
      zeigeEinstellungen();
    });
    auf("#neueEinstufung", "click", zeigeEinstufungStart);
    auf("#reset", "click", () => {
      if (confirm("Wirklich alles löschen? Fortschritt, Serie und Orden sind dann weg.")) {
        if (confirm("Sicher? Das kann nicht rückgängig gemacht werden.")) {
          localStorage.removeItem("dossier-paris-v1");
          location.reload();
        }
      }
    });
    auf("#heim", "click", zeigeBasis);
  }

  /* ---------- Start ---------- */

  DP.laden();
  document.addEventListener("click", () => DP.audio.freischalten(), { once: true });
  window.addEventListener("beforeunload", () => DP.speichern());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { uhrStoppen(); DP.speichern(); }
    else if (ansicht === "mission" && !uhrTimer) uhrStarten();
  });

  if (!DP.stand.prolog) zeigeProlog();
  else if (!DP.stand.einstufungGemacht) zeigeEinstufungStart();
  else zeigeBasis();
})();
