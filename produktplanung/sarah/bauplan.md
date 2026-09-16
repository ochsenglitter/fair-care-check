# Sarah bauen – Bauplan und Zeitplan

Stand: 16.09.2026

Dieses Dokument beantwortet eine einzige Frage: **Wie entsteht Sarah konkret,
und bis wann?** Es ist kein Produktkonzept – das steht in `README.md` –,
sondern die Bauanleitung für Antonia.

Alle bindenden Regeln aus `../../CLAUDE.md` gelten unverändert: kein SaaS,
keine Abos, kein Login bei uns, kein Kurs, keine künstlichen Beschränkungen,
Sarah bleibt ausschließlich bei Schule.

---

## 1. Die echte Deadline ist der 08.10., nicht der 02.11.

Der Cart öffnet am **02.11.2026**. Das ist der Verkaufstermin, nicht der
Bautermin.

Der Bautermin steht in der Story-Serie: An **Tag 24 (08.10.2026)** fällt zum
ersten Mal der Name Sarah. Und schon in Woche 1 und 2 sieht man in den
„unerklärten Momenten" Ergebnisse von Sarah – Antonia weiß morgens etwas,
ohne zu erklären, woher.

Das heißt: Man kann kein Ergebnis zeigen, das es nicht gibt.

> **Sarah muss diese Woche laufen.** Nicht fertig, nicht verkaufsfertig –
> aber benutzbar.

Die Rohfassung ist kein Produkt. Sie ist Antonias Arbeitsgerät für die
nächsten vier Wochen. Das Produkt entsteht erst daraus.

## 2. Der Zeitplan rückwärts

| Wann | Was | Ergebnis |
|---|---|---|
| **diese Woche (16.–20.09.)** | Rohfassung bauen und selbst benutzen | Sarah liefert morgens ein Briefing |
| **20.09.–07.10.** | täglich benutzen, nichts dokumentieren, nur Fehler ausbessern | Sarah ist verlässlich |
| **08.10. (Tag 24)** | Sarah ist vorzeigbar | erste Nennung in der Story möglich |
| **15.–18.10.** | Anleitung schreiben – aus vier Wochen echter Nutzung | Text, Vorlage, Screenshots |
| **19.–30.10. (Ferien)** | eine nicht-technische Freundin baut Sarah nach der Anleitung nach | die Anleitung ist erprobt |
| **02.–08.11.** | Cart offen, 50 Early-Access-Plätze | Verkauf |

### Die Reihenfolge ist der Kern

> **Erst vier Wochen selbst benutzen, dann die Anleitung schreiben.**
> Andersherum schreibst du auf, was du glaubst – nicht, was wirklich passiert.

Vier Wochen Alltag liefern genau das, was eine geschriebene Anleitung nie
enthält: die Stelle, an der man hängen bleibt, der Zettel, den Sarah falsch
liest, die Frage, die morgens wirklich kommt. Das sind die Stellen, an denen
eine Käuferin sonst aussteigt.

### Der Freundinnen-Test in den Ferien

Die Ferienwochen sind bewusst Puffer. Eine Person, die Sarah nicht kennt und
nicht technisch ist, baut sie allein nach der Anleitung auf. Antonia schaut zu
und sagt **nichts**. Jede Stelle, an der sie nachfragen muss, ist ein Fehler in
der Anleitung – nicht bei der Freundin.

Abbruchkriterium: **Dauert das Setup länger als 60 Minuten, ist die Anleitung
zu lang, nicht die Kundin zu langsam.**

---

## 3. Die vier Bausteine

Sarah besteht aus genau vier Teilen. Mehr nicht.

### Baustein 1: Die Stammdaten-Vorlage

Eine ausfüllbare Datei: Kinder, Klassen, Schulen, Stundenpläne, OGS- und
Betreuungszeiten, wiederkehrende schulische Informationen (Ranzentag,
Schwimmtag, Vorlesetag, Elternvertretung).

> **Nicht der Prompt ist das Produkt – diese Vorlage ist es.**

Der Prompt ist in zehn Minuten nachgebaut. Die Vorlage ist die Arbeit: Sie
entscheidet, ob Sarah ab Tag 1 etwas Sinnvolles sagt oder ob die Kundin drei
Wochen lang nachfüttert. Sie ist auch das, was die Kundin behält, wenn sie die
Plattform wechselt.

Format: eine strukturierte Textdatei, die eine Mutter am Küchentisch ausfüllen
kann. Keine Tabelle mit 40 Spalten.

Wegen A4 in `../offene-fragen.md`: Die Vorlage wird so geschnitten, dass Fenja
sie später mitlesen kann – gemeinsames Format „Familien-Stammdaten", Schulteil
klar abgegrenzt. Das kostet jetzt nichts und spart beim zweiten Kauf das
doppelte Setup.

### Baustein 2: Die Instruction

Der feste Auftrag, den die Kundin in ihrer eigenen KI-Umgebung hinterlegt.
Enthält: Rolle, Stammdaten-Bezug, wie eingehendes Material behandelt wird, das
feste Briefing-Format, die Uhrzeit.

Wird als **fertiger Block zum Kopieren** ausgeliefert – nicht als Erklärung,
wie man ihn selbst schreibt. Das wäre ein Kurs.

### Baustein 3: Der Eingabeweg – Foto in den Chat

Die Mutter fotografiert den Zettel und schickt ihn in den Chat. Fertig.

Kein Mail-Weiterleiten, keine Automatisierung, kein Zwischenschritt. Dieser
Weg funktioniert auf jedem Handy, in jeder KI-Umgebung, ohne Einrichtung und
ohne dass irgendwo etwas kaputtgehen kann.

Er ist außerdem der einzige Weg, der die Regel „kein Login bei uns" nicht
verletzt: Es gibt nichts, wo man sich einloggen könnte.

### Baustein 4: Der Ausgabeweg – Briefing auf Stichwort, Termine zur Übergabe

Zwei getrennte Dinge:

**Das Briefing.** Die Kundin schreibt morgens ein Stichwort in den Chat
(z. B. „Schule heute") und bekommt das Tagesbriefing. Kein Automatismus, keine
Push-Nachricht, nichts, was serverseitig laufen müsste.

**Die Termine.** Hier liegt der entscheidende Kniff:

> **Keine Kalenderanbindung, sondern Kalenderübergabe.**

Sarah erzeugt für einen erkannten Termin eine `.ics`-Datei oder einen
vorausgefüllten Kalenderlink. Die Kundin tippt einmal darauf, der Termin steht
in ihrem Kalender – in **ihrem** Konto, mit **ihren** Rechten.

Warum nicht echte Integration: Eine echte Kalenderanbindung bräuchte einen
Dienst, der dauerhaft läuft, Zugriff auf ihr Konto hat und von uns betrieben
wird. Das ist SaaS. Damit wären drei bindende Regeln auf einmal verletzt. Die
Übergabe kostet einen Fingertipp und ist dafür unkaputtbar.

---

## 4. Was ausdrücklich nicht gebaut wird

- **Keine Mail-Weiterleitung**, keine Postfach-Anbindung.
- **Kein Make, kein Zapier, keine Automation-Plattform.** Jede davon ist ein
  laufender Dienst, den die Kundin einrichten, bezahlen und reparieren muss.
- **Keine echte Kalenderintegration** (siehe Baustein 4).
- **Keine App, keine Datenbank, kein Login bei uns.**
- **Nichts, was im Setup länger als 60 Minuten dauert.**
- **Keine Erklärung, wie KI funktioniert.** Sarah erklärt, was nötig ist, um
  Sarah zu benutzen – davon alles, darüber hinaus nichts.

Jeder dieser Punkte kommt irgendwann als „das wäre doch komfortabler" zurück.
Die Antwort ist jedes Mal dieselbe: Komfort, der einen laufenden Dienst
braucht, ist kein Komfort, sondern ein Abo.

---

## 5. Warnung: Fenja nicht um Schule erweitern

Der naheliegende Abkürzungsweg wäre, Antonias eigene Fenja einfach um
Schulwissen zu ergänzen – sie kennt den Kalender ja schon.

Das darf nicht passieren, aus zwei Gründen:

1. **Dann gibt es nichts mehr zu verkaufen.** Sarah ist das Einstiegsprodukt.
   Wenn Schule in Fenja steckt, ist der Einstieg weg.
2. **Fenja würde zur Alleskönnerin.** Genau das ist Fehler 1 in den eigenen
   Regeln: Fenja ist nicht eine größere Sarah.

Richtig ist der Weg aus A1 in `../offene-fragen.md`: Sarah baut man
**getrennt**, als eigene Umgebung mit eigener Instruction. Antonia benutzt in
den nächsten Wochen beide nebeneinander. Erst wenn Sarah steht, wird der
Schul-Block in Fenjas Morgennachricht eingehängt – als Abschnitt, nicht als
Funktion.

Nebeneffekt: Antonia erlebt dabei selbst, wie sich die Kombination anfühlt.
Das ist später das Verkaufsargument für den Schritt Sarah → Fenja.

---

## 6. Die Plattformfrage wird nicht geraten, sondern gemessen

Offen ist, für welche KI-Umgebung die Anleitung geschrieben wird – ChatGPT,
Claude oder Gemini. Die Entscheidung hängt nicht an technischen Vorlieben,
sondern daran, was die Zielgruppe schon auf dem Handy hat. Eine Anleitung für
eine App, die die Kundin erst installieren und einrichten muss, verliert die
Hälfte der Käuferinnen vor dem ersten Schritt.

**Deshalb: Umfrage an Tag 26 (10.10.2026).**

> „Welche KI hast du auf dem Handy?"

Vier Sticker-Optionen, offene Zählung. Das Ergebnis liegt gut drei Wochen vor
dem Cart und damit rechtzeitig, bevor die Anleitung fertig geschrieben ist.

**Bis dahin:** Die Rohfassung wird in der Umgebung gebaut, die Antonia selbst
am besten kennt. Für das eigene Arbeitsgerät spielt die Plattform keine Rolle –
die drei Bausteine 1, 2 und 4 sind ohnehin plattformunabhängig. Nur die
Klick-Anleitung (wo lege ich die Instruction ab, wo lade ich die Stammdaten
hoch) wird plattformspezifisch, und die entsteht erst ab 15.10.

Diese Frage ist als **C3** in `../offene-fragen.md` eingetragen.

---

## 7. Was vor dem Verkauf noch entschieden werden muss

- **Auslieferungsformat**: Download-Paket oder ThriveCart Learn? Hängt
  unmittelbar an **C2** in `../offene-fragen.md` (Wie kommen Updates zur
  Kundin?). Beides ist mit „kein SaaS, kein Login bei uns" vereinbar, solange
  die Kundin die Dateien tatsächlich besitzt. Vor dem 02.11. festlegen und auf
  der Salespage benennen.
- **Preis**: 29 € Early Access ist Arbeitsannahme, vor der Salespage gegenprüfen.
  Die Stufennamen sind entschieden (`../abgrenzung-und-arbeitsregeln.md`).
- **Umfang der Anleitung**: Richtwert ist das 60-Minuten-Kriterium, nicht eine
  Seitenzahl.

---

## 8. Die Prüffrage für jede Bauentscheidung

Bei jeder Idee, die während des Bauens auftaucht:

> **Funktioniert das noch, wenn wir morgen nicht mehr da sind?**

Wenn nein, ist es ein Dienst und gehört nicht in Sarah. Die Kundin hat nach
dem Kauf eine Vorlage, eine Instruction und einen Ablauf – alles in ihrer
eigenen Umgebung, alles ohne uns lauffähig. Das ist die technische Fassung von
„Einmalprodukt".
