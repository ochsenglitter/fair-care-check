# Produktplanung – KI-Systeme für Working Moms

Verbindliche Produktarchitektur für alle Produkt-, Website-, Funnel- und
technischen Entscheidungen.

**Marke:** Work smarter, not harder.

> **Übergeordnet:** `../strategie/` enthält die Businessstrategie. Die
> Produktfamilie ist **eine von vier Säulen**, nicht das Business. Was gebaut
> wird und was wartet, entscheidet die Strategieebene – siehe
> `../strategie/rangfolge-der-dokumente.md`.

## Die Produktfamilie

    SARAH  – KI-Schulassistentin     Schule            39 € EA / 49 €   aktiv
      ↓
    SARAH LERNEN                     Lernen              19–29 €   nur bei Bedarf
    SARAH PRO                        Schulplanung        29–39 €   nur bei Bedarf
      ↓
    FENJA  – KI-Familienmanagerin    Familienlogistik 119 € EA / 149 €  als Nächstes
      ↓
    FENJA ADD-ONS                    Spezialbereiche   je 19–29 €   Bau geparkt
      ├── Meal Planning              Essen
      ├── Travel & Packing           Reisen / Packen
      ├── Christmas                  Weihnachten
      ├── Home                       Haushalt
      └── School Holidays            Ferien

    FENJA COMPLETE = Fenja + Add-ons                  ca. 249 €     Bau geparkt

Alle Preise sind Arbeitsannahmen, noch nicht final.

**Kein Klassenfahrt-Add-on** – Klassenfahrten sind Kernfunktion von Sarah.

**„Bau geparkt"** heißt: architektonisch gültig, wird aber nicht gebaut, solange
Sarah und Fenja nicht nachweislich verkaufen. Erstes Ziel: **100 zahlende
Sarah-Kundinnen**.

**Fenja setzt Sarah nicht voraus.** Direkteinstieg ist möglich;
Sarah-Käuferinnen bekommen beim Upgrade einen finanziellen Vorteil.

## Die beiden Leitfragen

| | |
|---|---|
| **Sarah** | „Was müssen wir wegen Schule wissen und erledigen?" |
| **Fenja** | „Wie läuft unsere Familie heute und diese Woche?" |

Fenja ist **nicht** eine größere Sarah. Es sind zwei getrennte
Mental-Load-Bereiche.

## Dateien

| Datei | Inhalt |
|---|---|
| `marke-und-philosophie.md` | Leitsatz, Geschäftsmodell, Moat, UX-Prinzip |
| `produktleiter-und-preise.md` | Leiter, Preistabelle, Regeln der Leiter |
| `abgrenzung-und-arbeitsregeln.md` | **Einordnungstabelle und Verfahren – vor jeder Feature-Entscheidung lesen** |
| `offene-fragen.md` | Ungeklärte Abgrenzungen, Lücken, Produktentscheidungen |
| `sarah/README.md` | Vollständige Produktdefinition Sarah |
| `fenja/README.md` | Vollständige Produktdefinition Fenja |
| `fenja/add-ons/` | Die fünf Add-ons, je eine Datei |
| `quelle/` | Originalbriefings, datiert und unverändert |
| `../strategie/` | **Businessstrategie – übergeordnet** |

## Die zwei Regeln, die alles tragen

1. **Funktionen werden nicht eigenmächtig zwischen Produkten verschoben.**
   Jede neue Funktion wird zuerst eingeordnet (Tabelle in
   `abgrenzung-und-arbeitsregeln.md`). Betrifft sie mehrere Bereiche, wird
   nachgefragt statt entschieden.

2. **Kein Produkt wird künstlich beschränkt.** Jedes Produkt funktioniert in
   seinem Bereich vollständig. Upsells entstehen durch **neue Bereiche**, nie
   durch zurückgehaltene Funktionen.

## Die zwei Filterfragen für alles Neue

**Zuerst strategisch** (`../strategie/README.md`):

> „Kann das mit hoher Wahrscheinlichkeit bis Januar 2027 einen relevanten Teil
> der 14.000-€-Umsatzlücke ersetzen?" – Nein → parken.

**Dann produktlich:**

> „Welchen konkreten Mental Load muss eine Mutter danach nicht mehr selbst
> übernehmen?"

## Änderungen

Neue Briefings kommen als datierte Datei nach `quelle/` und werden dann in die
Arbeitsdokumente eingearbeitet. Die Quelldateien werden nie überschrieben.

Der Stand dieser Dateien berücksichtigt das Master-Briefing vom **2026-09-17**
(`../strategie/quelle/`). Wo es dem Briefing vom 12.09. widerspricht, gilt das
jüngere – die Liste der Änderungen steht in
`../strategie/rangfolge-der-dokumente.md`.
