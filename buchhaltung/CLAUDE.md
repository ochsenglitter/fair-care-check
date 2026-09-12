# Arbeitsregeln für diesen Ordner

Dieser Ordner ist die private Buchhaltung. Er hat **nichts** mit Fair Care
Check, Sarah, Fenja oder den Add-ons zu tun. Die Produktregeln aus der
CLAUDE.md im Wurzelverzeichnis gelten hier nicht; die Einordnungstabelle der
Produktarchitektur ist auf diesen Ordner nicht anzuwenden.

## Datenschutz geht vor

- **Niemals** Kontoauszüge, Belege, Beträge oder Namen von Geschäftspartnern
  committen. `daten/` ist vollständig ignoriert und bleibt es.
- Werden zum Testen echte Daten gebraucht, bleiben sie in `daten/` oder im
  Arbeitsverzeichnis der Sitzung. Vor jedem Commit `git status` prüfen.
- Beispieldaten in Dokumentation und Tests sind erfunden.

## Keine Steuerberatung

Dieses Werkzeug macht Vorschläge, keine steuerlichen Beurteilungen. Es gibt
eine Steuerkanzlei, die entscheidet.

Deshalb gilt für jede Ausgabe von Claude:

- Einordnungen als Kandidaten benennen, nicht als Ergebnis.
- Bei Anteilen (Telefon, Arbeitszimmer, Fahrzeug) immer dazusagen, dass es eine
  Arbeitsannahme ist, die die Kanzlei festlegt.
- Keine Rechtsstände behaupten, die nicht geprüft sind. Bei Fristen, E-Rechnung
  und Pauschalen auf die Kanzlei verweisen, statt eine Jahreszahl zu raten.
- Läuft eine Betriebsprüfung, ist Zurückhaltung angebracht: nichts umbenennen
  oder verschieben, was zu einem geprüften Jahr gehört, ohne Rückfrage.

## Vorsicht bei Änderungen an vorhandenen Daten

Belege im Drive nur umbenennen oder verschieben, wenn ausdrücklich darum
gebeten wurde, und dann nachvollziehbar protokolliert. Ein verschobener Beleg,
den niemand mehr findet, ist schlimmer als ein schlecht benannter.

Löschen nie ohne Rückfrage.

## Am Regelkatalog arbeiten

`regeln/betriebsausgaben-regeln.csv` ist die Stellschraube. Neue Stichwörter
gern ergänzen, aber:

- Kurze Stichwörter treffen nur als ganzes Wort, lange auch als Teil. Vor dem
  Hinzufügen kurzer, häufiger Wörter überlegen, wo sie sonst noch vorkommen.
- Nach jeder Änderung `privatcheck.py` gegen echte Daten laufen lassen und die
  Trefferliste ansehen. Ein Fehlalarm kostet Vertrauen in die ganze Liste.
- Die Ausschlussliste ist genauso wichtig wie die Kandidatenliste. Sie
  verhindert, dass privat Gebliebenes versehentlich angesetzt wird.

## Sprache

Deutsch, in Dokumentation, Code-Kommentaren und Commits. Bezeichner in den
Skripten ebenfalls deutsch, das ist hier bewusst so.
