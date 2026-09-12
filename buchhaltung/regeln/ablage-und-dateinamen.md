# Ablage und Dateinamen

Das Namensschema ist kein Selbstzweck: Der Abgleich liest Datum und Anbieter
aus dem Dateinamen. Je sauberer die Namen, desto weniger bleibt manuell zu
prüfen.

## Namensschema

```
JJJJ-MM-TT_Anbieter_Kurzbeschreibung.pdf
```

Das Datum ist das **Rechnungsdatum**, nicht der Tag des Scannens.

Beispiele:

```
2026-08-03_Canva_Abo August.pdf
2026-08-11_Vodafone_Rechnung 07-2026.pdf
2026-08-04_Aldi_Einkauf Story 04.08.pdf
2026-08-04_Aldi_Einkauf Story 04.08_nachweis.png
```

Drei Regeln dazu:

1. **Datum immer vorn.** Dadurch sortiert jeder Dateimanager chronologisch.
2. **Anbietername wie auf dem Kontoauszug.** Steht dort `PAYPAL *CANVA`, ist
   `Canva` der richtige Name — der Abgleich erkennt den Zusammenhang.
3. **Verwendungsnachweise enden auf `_nachweis`.** Gleicher Name wie der Beleg
   davor, damit beide nebeneinander stehen.

Optional, aber hilfreich: den Betrag in den Namen schreiben, etwa
`..._Buerobedarf 87,45EUR.pdf`. Ein übereinstimmender Betrag ist das stärkste
Zuordnungsmerkmal und macht den Abgleich praktisch fehlerfrei.

## Ordnerstruktur

Die im Drive vorhandene Struktur bleibt, sie ist tragfähig:

```
Buchhaltung Belege/
  2026/
    Ausgaben/
    Einnahmen/
    Gutschriften/
    Gestellungen/
    Kontoauszüge/
```

Ein Beleg gehört in genau einen Ordner. Der Rest ergibt sich aus dem Dateinamen
— Unterordner nach Anbieter oder Monat sind unnötig und machen das Suchen eher
schwerer.

## Der Eingangsordner

Belege, die noch keinen Namen haben, kommen in einen einzigen Eingangsordner.
Nicht in mehrere. Die heute im Drive nebeneinander liegenden Sammelordner
(`Scans unsortiert`, `Belege ungescannt neu`, `evtl bereits übermittelte
Belege`, `Fehlende Belege 2023`) sind genau das Problem, das ein einzelner
Eingang löst: Solange es mehrere Halden gibt, ist nie klar, ob ein Beleg fehlt
oder nur woanders liegt.

Empfehlung: **ein** Ordner `Eingang`. Beim Monatslauf wird er geleert — jeder
Beleg bekommt seinen Namen und wandert ins Jahresverzeichnis. Die bestehenden
Sammelordner werden einmal aufgelöst und danach gelöscht.

## Umgang mit Altbeständen

Alles rückwirkend umzubenennen lohnt nicht. Der Belegindex erkennt Datumsangaben
auch in abweichenden Dateinamen und markiert solche Dateien in der Spalte
`namensschema` als `abweichend`.

Sinnvoll ist der umgekehrte Weg: Erst den Abgleich laufen lassen, und nur die
Belege umbenennen, die tatsächlich zu einer offenen Buchung gehören. Alle
anderen dürfen bleiben, wie sie sind.
