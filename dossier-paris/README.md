# DOSSIER PARIS

Französisch aufholen in 15 Minuten am Tag – für einen Neuntklässler, der zwei
Jahre Unterricht hinter sich hat und die Grundlagen nie richtig mitbekommen hat.

Keine App, die nach Nachhilfe aussieht. Ein Agenten-Thriller in 24 Folgen, bei
dem man nebenbei den kompletten Stoff aus Klasse 7 und 8 aufarbeitet.

---

## Warum das funktionieren kann

Das Problem bei Rückständen ist selten das Können. Es ist, dass Anfangen weh
tut. Also ist alles darauf ausgelegt, das Anfangen billig zu machen und das
Aufhören teuer:

| Prinzip | Umsetzung |
|---|---|
| **Kurz und begrenzt** | Eine Mission dauert 15 Minuten. Die Uhr läuft sichtbar. Wenn sie abläuft, springt die App zum Finale – das Versprechen wird gehalten. |
| **Cliffhanger** | Jede Mission endet mit einem Story-Beat, der nicht aufgelöst wird. Die Auflösung gibt es morgen. |
| **Keine Entscheidung nötig** | Ein Knopf. Die App weiß, was heute dran ist. Niemand muss ein Kapitel auswählen. |
| **Sofortige Rückmeldung** | Richtig, fast, falsch – innerhalb einer Sekunde, mit Ton und Punkten. |
| **Nie bloßgestellt** | Akzent- und Tippfehler zählen als „Fast" und geben Punkte. Die richtige Schreibweise steht daneben. Kein Rotstift. |
| **Serie ohne Drohung** | Wer einen Tag verpasst, verliert nichts: zwei „Alibis" pro Monat retten die Serie automatisch. |
| **Vergessen eingeplant** | Ein Wiederholungsalgorithmus holt jeden Inhalt genau dann zurück, wenn er zu kippen droht. |
| **Sichtbarer Rückstand-Abbau** | Die „Akte" zeigt 24 Module mit Fortschrittsbalken. Man sieht den Berg schrumpfen. |

Es gibt bewusst **keine Push-Nachrichten, keine Freundesliste, keinen Shop und
keine Herzen, die ausgehen**. Nichts, was Druck macht oder nach Abo riecht.

## Die Story

Bureau 9 rekrutiert einen Vierzehnjährigen ausgerechnet deshalb, weil er kein
Französisch kann – wer nichts versteht, fällt nicht auf. Über vier Staffeln
verfolgt er die Spur eines Jungen namens M, der zwei Jahre zuvor verschwand.

M hat dasselbe Problem gehabt. Das ist der Punkt der ganzen Geschichte, und er
wird in Modul 17 ausgesprochen:

> «Quand j'avais quatorze ans, j'étais nul en français. Ils me disaient que
> c'était trop tard. Ce n'était pas vrai.»

Am Ende stellt sich heraus: Es war nie eine Mission. Es war ein Französischkurs.

## Der Stoff

24 Module, vier Staffeln – das ist der übliche Lehrplan der ersten beiden
Lernjahre (Découvertes / À plus! Band 1 und 2):

**Saison 1 – Ankunft**
1. Begrüßen, sich vorstellen, Zahlen 0–20 · 2. Artikel, Nomen, Plural ·
3. Adjektive und Nationalitäten · 4. `-er`-Verben und Fragen ·
5. `avoir`, Familie, Possessivbegleiter · 6. Verneinung, Zahlen bis 100, Uhrzeit

**Saison 2 – Der Plan**
7. `aller`, `à + Artikel`, Stadt · 8. `faire`, `de + Artikel`, Hobbys ·
9. `prendre`, `venir`, `pouvoir`, `vouloir` · 10. Imperativ, Wegbeschreibung ·
11. Adjektivstellung · 12. Passé composé mit `avoir`

**Saison 3 – Rückblende**
13. Passé composé mit `être` · 14. Futur composé · 15. Direkte Objektpronomen ·
16. Indirekte Objektpronomen, `y` und `en` · 17. Imparfait ·
18. Imparfait oder Passé composé

**Saison 4 – Zugriff**
19. Relativsätze `qui/que/où` · 20. Vergleich und Superlativ ·
21. `-ir`/`-re`-Verben, `devoir`, `savoir`, `mettre` · 22. Reflexive Verben ·
23. Futur simple · 24. Conditionnel und `si`-Sätze

Daraus entstehen **386 Vokabeln, 146 Sätze und 332 Grammatikübungen**, die der
Generator zu rund **1.780 einzelnen Aufgaben** in fünf Formaten kombiniert:
Auswahl, Tippen mit Akzenttastatur, Hörverstehen, Satzbau und Paare-Zuordnen.

Bei 15 Minuten am Tag reicht das für ein komplettes Schuljahr, inklusive
Wiederholungen.

## Ablauf

Beim ersten Start steht eine **Einstufung**: 16 Fragen quer durch den Stoff.
Wer die ersten Module sicher beantwortet, überspringt sie – nach zwei Jahren
Unterricht ist eine Woche „bonjour" der schnellste Weg, wieder aufzuhören.
Was dabei zu großzügig eingeschätzt wurde, fällt in den Wiederholungen der
nächsten Tage auf und korrigiert sich selbst.

## Modi

- **Mission (15 min)** – der Normalfall. Aufwärmen, Rückblick auf Fälliges,
  neue Regel, Training, Entschlüsselung, Story.
- **Kurzeinsatz (5 min)** – für schlechte Tage. Hält die Serie am Leben.
- **Wiederholen** – nur das, was gerade fällig ist.
- **Thementraining** – über die Akte ein einzelnes Modul auswählen und zehn
  Minuten gezielt üben. Für die Woche vor der Klassenarbeit.
- **Prüfungssimulation** – 20 gemischte Aufgaben aus allem bisher Gelernten,
  mit grober Selbsteinschätzung.
- **Spickzettel** – alle Regeln, Wörter und Sätze eines Moduls zum Nachschlagen,
  jedes französische Wort antippbar zum Anhören.
- **Bericht** – Statistik zum Vorzeigen, als Text kopierbar.

## Tempo

Ein Modul dauert vier bis fünf Einsätze, bei rund 30 Aufgaben pro Mission. Wer
täglich fünfzehn Minuten macht, arbeitet sich in etwa drei bis vier Monaten
durch die 24 Module – ein Schulhalbjahr, mit Luft für Lücken. Wer in der
Einstufung schon etwas kann, ist schneller durch.

## Technik

Eine statische Seite. Kein Server, kein Build, keine Abhängigkeiten.

- Alles läuft im Browser, der Fortschritt liegt in `localStorage`
- Offline nutzbar (Service Worker), als PWA installierbar
- Französische Aussprache über die Sprachausgabe des Geräts – keine Audiodateien
- Kein Account, keine Anmeldung, kein Tracking, keine externen Anfragen
  außer den Schriftarten

```
index.html          Gerüst
css/style.css       Oberfläche
js/core.js          Speicherstand, Wiederholungsalgorithmus, Antwortprüfung
js/items.js         Aufgaben-Generator
js/audio.js         Aussprache und Signaltöne
js/session.js       Missionsaufbau
js/app.js           Ansichten
js/data/s1..s4.js   Lehrplan
js/data/story.js    Erzählstrang
sw.js               Offline-Cache
```

## Starten

Lokal reicht Doppelklick auf `index.html`. Für die Offline-Funktion und die
Installation aufs Handy braucht es HTTPS – zum Beispiel über GitHub Pages
(Settings → Pages → Branch auswählen → Save).

## Inhalte ändern

Neue Vokabeln oder Übungen kommen in die Dateien unter `js/data/`. Format:

```js
vocab:   [["le sac", "der Rucksack"], ...]
phrases: [["Je m'appelle Léo.", "Ich heiße Léo."], ...]
drills:  [["Je ___ français.", "parle"],                  // tippen
          ["Tu ___ sympa.", "es", ["es", "est", "suis"]]] // auswählen
```

Der Generator baut daraus automatisch alle Aufgabenformate. Nach Änderungen die
Versionsnummer in `sw.js` erhöhen, damit der Cache nachlädt.

## Für Eltern

Das Einzige, was diese App braucht, ist, dass niemand daran erinnert.

Die Serie, die Orden und die Story erledigen das Erinnern. Nachfragen wie „Hast
du schon deine 15 Minuten gemacht?" machen aus einer eigenen Sache wieder eine
fremde – und genau das ist das Einzige, was hier zuverlässig kaputtgehen kann.

Wenn du wissen willst, wie es läuft: Der Bericht zeigt Zeit, Trefferquote und
die drei größten Baustellen. Am besten, wenn er ihn selbst zeigt.

Die Notenschätzung in der Prüfungssimulation ist eine grobe Orientierung aus
den eigenen Antworten – keine Note und kein Ersatz für die Einschätzung der
Lehrerin.
