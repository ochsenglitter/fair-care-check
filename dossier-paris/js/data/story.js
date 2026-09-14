/* DOSSIER PARIS – Erzählstrang.
   Pro Modul: ein Briefing zu Beginn, mehrere Beats (einer pro Mission)
   und ein Cliffhanger am Ende. Kurz halten. Niemand liest Textwände. */

window.STORY_PROLOG = {
  titel: "EINGEHENDE NACHRICHT",
  text: [
    "03:14 Uhr. Dein Handy leuchtet auf. Unbekannter Absender.",
    "«Bureau 9. Wir haben deine Akte gelesen. Zwei Jahre Französisch, und du verstehst kein Wort. Genau deshalb schreiben wir dir.»",
    "«Wer nichts versteht, wird nicht verdächtigt. Wer nichts versteht, fällt nicht auf. Du bist perfekt.»",
    "«Ein Problem: In vier Monaten musst du eine Nachricht lesen können, von der viel abhängt. Wir haben also genau so lange, dich auszubilden.»",
    "«15 Minuten am Tag. Mehr geben wir dir nicht. Mehr brauchst du nicht.»"
  ],
  frage: "Wie sollen wir dich nennen?"
};

window.STORY = {

  m01: {
    intro: "Gare du Nord, 16:40. Du sollst einen Kontakt treffen, aber du weißt nicht, wie er aussieht. Du weißt nur: Er wird dich ansprechen. Auf Französisch.",
    beats: [
      "Ein Mann im grauen Mantel setzt sich neben dich. «Bonjour.» Mehr sagt er nicht. Er wartet.",
      "Du antwortest. Er nickt kaum merklich. «Ça va ?» Test bestanden. Erster Teil.",
      "Er schiebt dir einen Umschlag zu. Darauf steht nur eine Zahl: 14. Dein Alter. Sie wissen alles über dich.",
      "«Comment tu t'appelles ?» fragt er. Du sagst deinen Namen. Er schüttelt den Kopf. «Nein. Deinen anderen Namen.»"
    ],
    ende: "Der Mann steht auf und verschwindet im Gedränge. Im Umschlag: ein Schlüssel und eine Adresse. Rue de Lille 47."
  },

  m02: {
    intro: "Rue de Lille 47. Eine leere Wohnung im dritten Stock. Auf dem Tisch liegen Gegenstände, ordentlich aufgereiht. Deine Aufgabe: Benenne jeden. Richtig.",
    beats: [
      "Ein Stift. Ein Heft. Ein Schlüssel. Du gehst die Reihe durch. Jedes Wort mit Artikel — das hat er zweimal betont.",
      "Ein Zettel unter dem Buch: «le sac». Du drehst dich um. Auf dem Stuhl liegt ein Rucksack, der vorhin noch nicht da war.",
      "Im Rucksack: ein Handy ohne SIM, zwanzig Euro und ein Foto von einem Gebäude, das du nicht kennst.",
      "Auf der Rückseite des Fotos, mit Kugelschreiber: «les clés sont dans la trousse». Du öffnest das Mäppchen."
    ],
    ende: "Drei Schlüssel. Nur einer passt irgendwo. Und irgendjemand war vor dir in dieser Wohnung — die Kaffeetasse ist noch warm."
  },

  m03: {
    intro: "Bureau 9 schickt dir eine Personenliste. Fünf Namen, fünf Beschreibungen — alle auf Französisch. Einer davon ist nicht, wer er vorgibt zu sein.",
    beats: [
      "«Il est grand, timide, très gentil.» Klingt harmlos. Zu harmlos.",
      "«Elle est française, drôle, un peu bizarre.» Du markierst sie. Bizarre ist ein Wort, das man nicht zufällig benutzt.",
      "Beim vierten Profil stockst du. Das Adjektiv hat kein -e am Ende. Also ein Mann. Aber der Name ist ein Frauenname.",
      "Du meldest den Fehler. Zurück kommt nur: «Bien. Tu n'es pas nul.» Nicht schlecht. Du grinst gegen deinen Willen."
    ],
    ende: "Die fünfte Person auf der Liste hat kein Foto. Nur ein Buchstabe steht in dem Feld: M."
  },

  m04: {
    intro: "M. Ein Buchstabe, keine Akte. Du sollst herausfinden, wer das ist — indem du Fragen stellst. Auf Französisch. Ohne aufzufallen.",
    beats: [
      "Im Café fragst du die Kellnerin: «Est-ce que vous connaissez quelqu'un ici ?» Sie schaut zu lange auf deine Hände.",
      "«Qu'est-ce que tu cherches ?» fragt sie zurück. Die Frage ist schneller als deine Antwort.",
      "Du sagst: «Je cherche M.» Sie stellt den Kaffee ab, ohne ein Wort, und geht nach hinten.",
      "Auf der Rechnung steht keine Zahl. Nur: «Ne demande plus. Pas ici.» Frag nicht weiter. Nicht hier."
    ],
    ende: "Als du aufstehst, liegt auf dem Nachbartisch eine Zeitung. Ein Artikel ist eingekreist. Es geht um eine Familie."
  },

  m05: {
    intro: "Der Artikel ist zwei Jahre alt. Eine Familie, ein verschwundener Sohn, keine Erklärung. Du sollst die Verwandtschaftsverhältnisse rekonstruieren.",
    beats: [
      "«Son père», «sa mère», «sa sœur». Du zeichnest einen Stammbaum. Eine Person passt nirgends hinein.",
      "«Il a un frère.» Der Bruder wird im Artikel genau einmal erwähnt. Danach nie wieder.",
      "Du rechnest: Wenn er damals vierzehn war, ist er jetzt sechzehn. Genau wie du in zwei Jahren.",
      "Ein neues Detail: Die Familie hat einen Hund. «Le chien s'appelle Malo.» Warum steht das in einem Vermisstenartikel?"
    ],
    ende: "Weil Malo der Name ist, den der Junge in seinen letzten Nachrichten benutzt hat. Nicht für den Hund. Für sich."
  },

  m06: {
    intro: "Bureau 9 funkt: «20:15. Nicht später. Nicht früher.» Du hast einen Termin und keine Ahnung, mit wem.",
    beats: [
      "Du wartest ab 20:00 an der Brücke. Um 20:10 kommt eine Nachricht: «Je ne suis pas là.» Ich bin nicht da.",
      "Um 20:14 die nächste: «Mais je te vois.» Aber ich sehe dich. Du drehst dich langsam im Kreis.",
      "20:15. Ein Junge, ungefähr in deinem Alter, lehnt zwanzig Meter weiter am Geländer und schaut aufs Wasser.",
      "Er sagt, ohne dich anzusehen: «Ils ne t'ont pas tout dit.» Sie haben dir nicht alles gesagt."
    ],
    ende: "Dann geht er. Du hast seine Stimme aufgenommen — reflexartig. Auf der Aufnahme sagt er am Ende noch drei Worte, die du live nicht gehört hast."
  },

  m07: {
    intro: "Die drei Worte: «Suis le plan.» Folge dem Plan. Im Rucksack findest du einen Stadtplan, in den jemand sechs Orte eingezeichnet hat.",
    beats: [
      "Erster Ort: le musée. Du gehst hin. Am Eingang klebt ein Aufkleber mit einem Pfeil nach rechts.",
      "Zweiter Ort: la piscine. Der Pfeil zeigt auf den Bahnhof. Jemand schickt dich im Kreis — oder testet, ob du die Orte überhaupt verstehst.",
      "Dritter Ort: la bibliothèque. Buch 447, Seite 47. Darin: ein zweiter Stadtplan, mit anderen Orten.",
      "Du legst beide Pläne übereinander. Die Linien kreuzen sich an genau einem Punkt: la gare."
    ],
    ende: "Am Bahnhof, Gleis 9, Schließfach 47. Der Schlüssel aus dem Umschlag passt. Auf Anhieb."
  },

  m08: {
    intro: "Im Schließfach: ein Trainingsplan. Wortwörtlich. Sport, Musik, Freizeit — die Tarnidentität, die du ab jetzt leben sollst.",
    beats: [
      "«Tu fais du foot. Tu joues de la guitare. Tu détestes les maths.» Zwei davon stimmen sogar.",
      "Du sollst die Legende auswendig können. Wer stolpert, fliegt auf. Und du stolperst dauernd über faire du und jouer au.",
      "Ein Anruf. Eine Frauenstimme fragt dich auf Französisch nach deinen Hobbys. Du antwortest. Sie legt wortlos auf.",
      "Zehn Minuten später: «Trop lent. Encore.» Zu langsam. Nochmal."
    ],
    ende: "Beim vierten Versuch sagt sie: «Bien.» Und dann: «Maintenant, la vraie mission commence.» Jetzt beginnt die echte Mission."
  },

  m09: {
    intro: "Letzter Zug um 23:47. Du musst drin sitzen. Und du musst auf Französisch erklären können, warum du drin sitzt.",
    beats: [
      "«Je prends le train de 23h47.» Du sagst es dir zwanzigmal vor. Prends, nicht prend.",
      "Der Schaffner fragt: «Vous venez d'où ?» Du antwortest zu schnell und zu perfekt. Er runzelt die Stirn.",
      "«Tu peux venir ?» — eine Nachricht, kein Absender. Der Zug fährt gerade an.",
      "Du willst aussteigen. Die Türen sind zu. «Je ne peux pas», tippst du. Ich kann nicht."
    ],
    ende: "Antwort: «Parfait. Reste dans le train.» Perfekt. Bleib im Zug. Jemand wollte genau das."
  },

  m10: {
    intro: "Endstation, halb eins nachts. Eine Stimme im Ohrhörer gibt dir den Weg an. Nur auf Französisch, nur einmal.",
    beats: [
      "«Tourne à droite. Va tout droit. Traverse la place.» Du übersetzt im Laufen und biegst zweimal falsch ab.",
      "«Non. À GAUCHE.» Die Stimme klingt jung. Und genervt.",
      "«L'immeuble est en face de la boulangerie.» Gegenüber der Bäckerei. Es gibt drei Bäckereien in dieser Straße.",
      "Du triffst eine Entscheidung und nimmst die mittlere. Die Tür steht einen Spalt offen."
    ],
    ende: "Im Treppenhaus brennt kein Licht. Aber im dritten Stock steht eine Tür offen, und dahinter brennt eine Lampe."
  },

  m11: {
    intro: "Die Wohnung ist bewohnt. Fotos an der Wand, Jacke über dem Stuhl. Du hast vier Minuten, um dir alles zu merken — und es später zu beschreiben.",
    beats: [
      "«Un manteau noir. Une vieille photo. Une belle maison blanche.» Du sprichst leise mit, um es zu behalten.",
      "Auf dem Foto: der Junge von der Brücke. Zwei Jahre jünger. Zwischen seinen Eltern.",
      "Daneben ein zweites Foto, dasselbe Haus, aber leer. Kein Mensch drauf.",
      "Schritte im Treppenhaus. Du beschreibst später alles korrekt — bis auf ein Detail, das dir erst im Bett einfällt."
    ],
    ende: "Der Junge auf dem Foto trug dieselbe Jacke, die heute Nacht über dem Stuhl hing. Er war vor dir da. Er ist vielleicht immer noch da."
  },

  m12: {
    intro: "Bureau 9 verlangt einen Bericht. Vollständig. Vergangenheitsform. «Écris ce que tu as fait.» Schreib, was du getan hast.",
    beats: [
      "«J'ai pris le train. J'ai trouvé l'immeuble. J'ai regardé les photos.» Es klingt harmloser, als es war.",
      "Ein Satz fehlt absichtlich in deinem Bericht. Du erwähnst die Jacke nicht.",
      "Antwort: «Tu as oublié quelque chose ?» Hast du etwas vergessen? Sie wissen es.",
      "Du schreibst: «Non.» Zum ersten Mal lügst du Bureau 9 an. Auf Französisch."
    ],
    ende: "Zwölf Stunden Funkstille. Dann eine einzige Zeile: «Bien. Tu apprends vite.» Gut. Du lernst schnell. Es klingt nicht wie ein Lob."
  },

  m13: {
    intro: "Akte 2247 wird freigegeben. Was vor zwei Jahren passierte, steht in einer Zeitform, die du bisher gemieden hast.",
    beats: [
      "«Il est parti à 6h. Il n'est jamais arrivé.» Er ist um sechs losgegangen. Er ist nie angekommen.",
      "«Elle est restée à la maison.» Die Schwester. Sie hat als Einzige nichts gesagt, damals.",
      "«Ils sont venus le chercher.» Sie kamen, um ihn zu holen. Wer sie sind, steht nirgends.",
      "Du merkst: Jeder Satz mit Bewegung nimmt être. Die ganze Akte besteht aus Bewegung."
    ],
    ende: "Der letzte Eintrag: «Le garçon est devenu M.» Der Junge wurde M. Der Junge von der Brücke ist M."
  },

  m14: {
    intro: "M schickt dir zum ersten Mal direkt eine Nachricht. Und er schreibt über morgen, nicht über gestern.",
    beats: [
      "«Ils vont te demander de choisir.» Sie werden dich vor eine Wahl stellen.",
      "«Tu vas dire oui. Tout le monde dit oui.» Du wirst ja sagen. Alle sagen ja.",
      "Du tippst: «Je ne vais pas dire oui.» Ich werde nicht ja sagen. Es dauert vier Minuten, bis er antwortet.",
      "«Alors on va se voir.» Dann sehen wir uns."
    ],
    ende: "Und darunter, wie ein Nachgedanke: «Apporte le dossier.» Bring die Akte mit. Du hast keine Akte. Noch nicht."
  },

  m15: {
    intro: "Bureau 9 will wissen, was M dir geschrieben hat. Du sollst antworten, ohne Namen zu nennen. Also mit Pronomen.",
    beats: [
      "«Tu le connais ?» Kennst du ihn? — «Je ne le connais pas.» Der zweite Satz ist gelogen und grammatisch korrekt.",
      "«Tu l'as vu ?» Hast du ihn gesehen? Du zögerst genau eine Sekunde zu lang.",
      "«Je vais le trouver», schreibst du. Ich werde ihn finden. Sie sollen glauben, du bist auf ihrer Seite.",
      "Antwort: «Nous aussi.» Wir auch."
    ],
    ende: "Zwei Parteien suchen jetzt denselben Jungen. Und beide halten dich für ihr Werkzeug."
  },

  m16: {
    intro: "Ein Code erreicht dich in drei Teilen, von drei verschiedenen Nummern. Jeder Teil ergibt allein keinen Sinn.",
    beats: [
      "Teil eins: «Je lui ai tout dit.» Ich habe ihm alles gesagt. Wem?",
      "Teil zwei: «Ils leur ont menti.» Sie haben ihnen gelogen. Zwei Gruppen, beide im Plural.",
      "Teil drei: «J'y serai.» Ich werde dort sein. Nur — wo ist dort?",
      "Du legst die drei Nachrichten nebeneinander. Die Anfangsbuchstaben ergeben ein Wort."
    ],
    ende: "TOIT. Dach. Und es gibt nur ein Dach, das in dieser Geschichte je erwähnt wurde."
  },

  m17: {
    intro: "Bevor du aufs Dach gehst, schickt M dir seine Geschichte. Sie steht komplett im Imparfait — so erzählt man, wie es früher war.",
    beats: [
      "«Quand j'avais quatorze ans, j'étais nul en français.» Als ich vierzehn war, war ich schlecht in Französisch.",
      "«Je ne comprenais rien. Je faisais semblant.» Ich verstand nichts. Ich tat so als ob.",
      "«Ils me disaient que c'était trop tard.» Sie sagten mir, es sei zu spät.",
      "«Ce n'était pas vrai.» Es war nicht wahr."
    ],
    ende: "Letzte Zeile: «Et pour toi non plus, ce n'est pas trop tard.» Und für dich ist es auch nicht zu spät."
  },

  m18: {
    intro: "Du sollst als Zeuge aussagen, was in jener Nacht passierte. Kulisse und Knall müssen auseinandergehalten werden. Sonst glaubt dir niemand.",
    beats: [
      "«Il faisait nuit. Il n'y avait personne.» Das ist der Hintergrund. Imparfait.",
      "«Tout à coup, j'ai entendu un bruit.» Das ist der Knall. Passé composé.",
      "Der Vernehmer unterbricht dich jedes Mal, wenn du die Zeiten verwechselst. Nach dem sechsten Mal nicht mehr.",
      "«Qu'est-ce qui s'est passé ensuite ?» Und dann? Du erzählst die Version, die stimmt."
    ],
    ende: "Am Ende sagt er leise: «Tu racontes mieux que la plupart des adultes.» Du erzählst besser als die meisten Erwachsenen."
  },

  m19: {
    intro: "Auf dem Dach ist niemand. Nur ein Umschlag, beschwert mit einem Stein. Darin: Sätze, die ineinandergreifen wie Zahnräder.",
    beats: [
      "«C'est l'homme qui t'a recruté.» Das ist der Mann, der dich rekrutiert hat. Foto anbei. Grauer Mantel.",
      "«C'est le dossier que tu cherches.» Das ist die Akte, die du suchst. Zweites Foto: ein Aktenschrank.",
      "«C'est l'endroit où tout a commencé.» Der Ort, wo alles begann. Drittes Foto: Rue de Lille 47.",
      "Die erste Wohnung. Die mit der warmen Kaffeetasse. Es war nie eine leere Wohnung."
    ],
    ende: "Du warst von Anfang an nicht der Erste. Du bist der Zweite. Und M war der Erste."
  },

  m20: {
    intro: "Zwei Leute, zwei Angebote. Du sollst vergleichen und entscheiden. Bureau 9 ist mächtiger. M ist schneller. Einer von beiden lügt weniger.",
    beats: [
      "«Nous sommes plus forts qu'eux.» Wir sind stärker als sie, schreibt Bureau 9.",
      "«Je suis moins dangereux qu'eux.» Ich bin weniger gefährlich als sie, schreibt M.",
      "«C'est le meilleur choix», schreiben beide. Wortgleich. Das ist der Moment, in dem du misstrauisch wirst.",
      "Du antwortest beiden dasselbe: «Je vais réfléchir.» Ich werde nachdenken."
    ],
    ende: "Zum ersten Mal führst du die Verhandlung. Auf Französisch. Und niemand merkt, dass du erst seit ein paar Wochen wirklich verstehst."
  },

  m21: {
    intro: "Der Aktenschrank steht in der Rue de Lille. Vier Schlösser, vier Zahlenreihen — und alle Hinweise stecken in Verben, die du bisher übersprungen hast.",
    beats: [
      "«Tu dois choisir.» Du musst wählen. Zwei Schubladen, eine Chance.",
      "«Je sais que tu es là.» Ich weiß, dass du da bist. Die Nachricht kommt, während du davorstehst.",
      "«Attends. Ne mets pas la clé.» Warte. Steck den Schlüssel nicht rein.",
      "Du wartest. Elf Sekunden später geht im Erdgeschoss eine Tür."
    ],
    ende: "Es ist der Mann im grauen Mantel. Und er weiß genau, in welchem Stockwerk du stehst."
  },

  m22: {
    intro: "Du hast sechs Stunden geschlafen und einen Plan. Er beginnt um sechs Uhr morgens und besteht aus lauter ganz normalen Handlungen.",
    beats: [
      "«Je me lève à six heures. Je m'habille. Je sors.» Nichts daran ist auffällig. Genau das ist der Punkt.",
      "«Ne te dépêche pas», schreibt M. Beeil dich nicht. Wer rennt, fällt auf.",
      "«Ils se sont trompés.» Sie haben sich geirrt. Sie erwarten dich am Bahnhof. Du gehst zu Fuß.",
      "«On se retrouve à sept heures.» Wir treffen uns um sieben."
    ],
    ende: "Um 6:58 siehst du ihn zum zweiten Mal. Diesmal dreht er sich um."
  },

  m23: {
    intro: "M erklärt dir, was passieren wird. Alles im Futur. Er klingt, als hätte er es schon einmal erlebt.",
    beats: [
      "«Ils viendront. Ils te demanderont le dossier.» Sie werden kommen. Sie werden nach der Akte fragen.",
      "«Tu leur donneras une copie.» Du wirst ihnen eine Kopie geben. Nicht das Original.",
      "«Et après, tout ira bien.» Und danach wird alles gut. Er sagt es zu schnell.",
      "«Tu seras libre», sagt er. Du wirst frei sein. Dann, leiser: «Moi, je ne le serai jamais.»"
    ],
    ende: "Ich werde es nie sein. Das ist der erste Satz, bei dem du sicher bist, dass er nicht lügt."
  },

  m24: {
    intro: "Letzte Mission. Du hast die Akte, du hast die Sprache, und zum ersten Mal hast du eine Wahl.",
    beats: [
      "«Si j'étais toi, je partirais», sagt M. Wenn ich du wäre, würde ich gehen.",
      "«Mais tu n'es pas moi», antwortest du. Aber du bist nicht ich. Er lacht. Das erste Mal.",
      "«Tu pourrais rester», sagt er. Du könntest bleiben. — «Je voudrais rentrer», sagst du. Ich möchte nach Hause.",
      "«Si tu rentres, ils te laisseront tranquille.» Wenn du heimgehst, lassen sie dich in Ruhe. Du glaubst ihm."
    ],
    ende: "Vier Monate. Du hast die Nachricht gelesen, von der alles abhing — und du hast jedes Wort verstanden. Die letzte Zeile lautete: «Ce n'était jamais une mission. C'était un cours de français.» Es war nie eine Mission. Es war ein Französischkurs. AKTE GESCHLOSSEN."
  }
};

/* Kurzfunk zwischendurch – wird zufällig eingestreut, wenn gerade kein Beat fällig ist. */
window.FUNK = [
  "«Encore cinq minutes. Tu peux.» Noch fünf Minuten. Du schaffst das.",
  "«Personne ne devient bon en un jour.» Niemand wird an einem Tag gut.",
  "«Ils ne savent pas que tu apprends.» Sie wissen nicht, dass du lernst.",
  "«Tu es plus fort qu'hier.» Du bist stärker als gestern.",
  "«Continue. Ne t'arrête pas maintenant.» Mach weiter. Hör jetzt nicht auf.",
  "«Chaque mot est une clé.» Jedes Wort ist ein Schlüssel.",
  "«Le silence est une réponse aussi.» Schweigen ist auch eine Antwort.",
  "«On t'attend demain.» Wir erwarten dich morgen."
];
