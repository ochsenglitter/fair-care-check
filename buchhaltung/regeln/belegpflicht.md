# Was als Beleg zählt

Kurzfassung für den Alltag. Rechtsstand und Anwendung auf den eigenen Fall
gehören einmal mit der Steuerkanzlei durchgesprochen — besonders die
Aufbewahrungsfristen und die E-Rechnung, an denen sich zuletzt etwas geändert
hat.

## Grundsatz

Keine Buchung ohne Beleg. Das gilt für Ausgaben **und** für Einnahmen: Zu jeder
Gutschrift auf dem Konto gehört die eigene Ausgangsrechnung.

Der Beleg muss den Vorgang nachvollziehbar machen: wer, wann, was, wie viel.
Ein Kontoauszug allein ist kein Beleg — er zeigt, dass Geld geflossen ist, aber
nicht wofür.

## Pflichtangaben auf einer Rechnung

Ab 250 Euro brutto braucht eine Rechnung:

- Name und Anschrift von leistendem Unternehmen und Empfängerin
- Steuernummer oder Umsatzsteuer-Identifikationsnummer des Ausstellers
- Ausstellungsdatum
- fortlaufende Rechnungsnummer
- Menge und Art der Leistung
- Zeitpunkt der Leistung
- Entgelt, aufgeschlüsselt nach Steuersätzen
- Steuersatz und Steuerbetrag, oder Hinweis auf die Steuerbefreiung

Fehlt eine dieser Angaben, ist der Vorsteuerabzug gefährdet. Bei Rechnungen über
größere Beträge lohnt der kurze Blick vor dem Ablegen.

**Bis 250 Euro brutto** genügt die Kleinbetragsrechnung: Name und Anschrift des
Leistenden, Datum, Menge und Art, Bruttobetrag und Steuersatz. Der normale
Kassenbon erfüllt das in der Regel.

## E-Rechnung

Im Geschäftsverkehr zwischen Unternehmen in Deutschland gilt seit Anfang 2025
die Pflicht, strukturierte elektronische Rechnungen **empfangen** zu können. Ein
PDF ist in diesem Sinne keine E-Rechnung; gemeint sind Formate wie XRechnung
oder ZUGFeRD.

Praktisch heißt das: Die XML-Datei ist der eigentliche Beleg und muss im
Original aufbewahrt werden. Ein Ausdruck oder eine PDF-Ansicht daraus reicht
nicht. Deshalb nimmt der Belegindex auch `.xml` und `.zip` als Belegdateien an.

Für die eigene Rechnungs**ausstellung** greifen die Pflichten gestaffelt später.
Wann genau es für das eigene Unternehmen so weit ist, klärt die Kanzlei.

## Digitale Belege und Papier

Papierbelege dürfen gescannt und danach vernichtet werden, wenn das Verfahren
sauber beschrieben ist — wer scannt, wann, wie wird geprüft, wie wird gegen
Veränderung gesichert. Diese Verfahrensdokumentation ist ein kurzes Dokument,
das die Kanzlei meist als Muster vorliegen hat. Ohne sie ist das Vernichten der
Originale riskant.

Zwei Punkte, die in einer Prüfung regelmäßig auffallen:

- **Zeitnahe Erfassung.** Belege sollen laufend abgelegt werden, nicht gesammelt
  im Folgejahr. Der Monatslauf erledigt genau das.
- **Unveränderbarkeit.** Ein Beleg, der nachträglich bearbeitet werden kann,
  verliert an Beweiskraft. Deshalb Belege nach dem Ablegen nur noch umbenennen,
  nicht inhaltlich ändern.

## Aufbewahrung

Rechnungen und Buchungsbelege sind langfristig aufzubewahren; für
Buchungsbelege wurde die Frist zuletzt verkürzt, für Jahresabschlüsse und
Handelsbücher blieb sie bei zehn Jahren. Welche Frist auf welchen Belegtyp
zutrifft, einmal von der Kanzlei bestätigen lassen — und im Zweifel lieber
länger aufbewahren, Speicherplatz kostet nichts.

Wichtig: Läuft eine Betriebsprüfung oder ist ein Bescheid noch offen, darf für
die betroffenen Jahre nichts vernichtet werden, auch wenn die Frist abgelaufen
wäre.

## Wenn der Beleg weg ist: Eigenbeleg

Für kleine Beträge, deren Beleg sich nicht mehr beschaffen lässt, ist ein
Eigenbeleg der anerkannte Ausweg. Er muss enthalten: Datum, Empfänger, Art der
Ausgabe, Betrag, Grund für das Fehlen des Originals und die eigene Unterschrift.
Vorlage in `../vorlagen/eigenbeleg.md`.

Zwei Einschränkungen:

- **Kein Vorsteuerabzug.** Aus einem Eigenbeleg lässt sich keine Vorsteuer
  ziehen, es fehlt die ausgewiesene Steuer.
- **Die Ausnahme bleibt Ausnahme.** Ein paar Eigenbelege im Jahr sind normal.
  Viele davon, oder solche über größere Beträge, verlieren an Glaubwürdigkeit.

Bei Anbietern mit Kundenkonto ist der Eigenbeleg fast nie nötig: Rechnungen
liegen dort meist jahrelang zum Download bereit. Das ist immer der bessere Weg.

## Gemischte Ausgaben

Wird eine private Ausgabe betrieblich geltend gemacht, reicht der Zahlungsbeleg
nicht. Es braucht zusätzlich den Nachweis des betrieblichen Anlasses. Genau hier
setzt eine Prüfung an, und genau hier entscheidet sich, ob der Abzug hält.

Was jeweils nötig ist, steht in `betriebsausgaben-regeln.csv` in der Spalte
`nachweis`. Die drei Fälle, die im Content-Geschäft am häufigsten vorkommen:

| Fall | Nötiger Nachweis |
| --- | --- |
| Einkauf für eine Story oder Kooperation | Kassenbon **plus** Screenshot oder Link des Beitrags mit Datum |
| Bewirtung | Anlass und alle Teilnehmenden namentlich auf dem Beleg, sonst entfällt der Abzug ganz |
| Reise | Programm, Einladung oder Drehplan, der den betrieblichen Anlass zeigt |

Der Verwendungsnachweis wird am besten sofort erzeugt und direkt neben den Beleg
gelegt — Wochen später ist die Story gelöscht und der Zusammenhang nicht mehr
belegbar.
