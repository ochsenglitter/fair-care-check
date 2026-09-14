/* DOSSIER PARIS – Saison 1: "ANKUNFT"
   Stoff: Anfang Klasse 7, erstes Halbjahr.
   Drill-Format: [Frage, Lösung] = Tippen | [Frage, Lösung, [Optionen]] = Auswahl */

window.CURRICULUM = window.CURRICULUM || [];

window.CURRICULUM.push(

{
  id: "m01", saison: 1, nr: 1,
  titel: "Gare du Nord",
  thema: "Begrüßen, sich vorstellen, Zahlen 0-20",
  ziel: "Du kannst dich vorstellen, jemanden begrüßen und bis 20 zählen.",
  vocab: [
    ["bonjour", "guten Tag / hallo"],
    ["salut", "hi / tschau"],
    ["au revoir", "auf Wiedersehen"],
    ["merci", "danke"],
    ["s'il te plaît", "bitte (zu du)"],
    ["oui", "ja"],
    ["non", "nein"],
    ["le garçon", "der Junge"],
    ["la fille", "das Mädchen"],
    ["l'ami", "der Freund"],
    ["l'amie", "die Freundin"],
    ["la classe", "die Klasse"],
    ["le collège", "die Schule (Klasse 5-10)"],
    ["le prof", "der Lehrer"],
    ["et", "und"],
    ["aussi", "auch"],
    ["très", "sehr"],
    ["comment", "wie"]
  ],
  phrases: [
    ["Comment tu t'appelles ?", "Wie heißt du?"],
    ["Je m'appelle Léo.", "Ich heiße Léo."],
    ["Ça va ?", "Wie geht's?"],
    ["Ça va bien, merci.", "Gut, danke."],
    ["Et toi ?", "Und du?"],
    ["Tu as quel âge ?", "Wie alt bist du?"],
    ["J'ai quatorze ans.", "Ich bin vierzehn."],
    ["Enchanté !", "Freut mich!"]
  ],
  grammar: [
    {
      id: "g1", titel: "être – sein",
      regel: "être ist das wichtigste Verb im Französischen. Es ist unregelmäßig, also lernst du es einfach auswendig. Danach hast du für immer Ruhe.",
      tabelle: [
        ["je suis", "ich bin"], ["tu es", "du bist"], ["il / elle est", "er / sie ist"],
        ["nous sommes", "wir sind"], ["vous êtes", "ihr seid / Sie sind"], ["ils / elles sont", "sie sind"]
      ],
      tipp: "suis – es – est – sommes – êtes – sont. Sag es dir dreimal im Rhythmus vor, dann sitzt es.",
      drills: [
        ["Je ___ en classe.", "suis", ["suis", "es", "est"]],
        ["Tu ___ sympa.", "es", ["es", "est", "suis"]],
        ["Il ___ français.", "est", ["est", "es", "sont"]],
        ["Nous ___ au collège.", "sommes", ["sommes", "êtes", "sont"]],
        ["Vous ___ prof ?", "êtes", ["êtes", "es", "sommes"]],
        ["Elles ___ amies.", "sont", ["sont", "est", "sommes"]],
        ["Léo et moi, nous ___ dans la classe.", "sommes", ["sommes", "sont", "êtes"]],
        ["Tippe: 'ich bin'", "je suis"],
        ["Tippe: 'sie sind' (mehrere Mädchen)", "elles sont"],
        ["Tippe: 'du bist'", "tu es"]
      ]
    },
    {
      id: "g2", titel: "Zahlen 0-20",
      regel: "Die Zahlen bis 20 sind die Basis für Uhrzeit, Alter, Preise und Telefonnummern. Ohne die geht nichts.",
      tabelle: [
        ["0 zéro / 1 un / 2 deux", "3 trois / 4 quatre / 5 cinq"],
        ["6 six / 7 sept / 8 huit", "9 neuf / 10 dix"],
        ["11 onze / 12 douze / 13 treize", "14 quatorze / 15 quinze"],
        ["16 seize / 17 dix-sept", "18 dix-huit / 19 dix-neuf / 20 vingt"]
      ],
      tipp: "Ab 17 wird gerechnet: dix-sept = 10+7. Das machen die Franzosen später noch viel schlimmer.",
      drills: [
        ["Wie heißt 14 auf Französisch?", "quatorze"],
        ["Wie heißt 7 auf Französisch?", "sept"],
        ["Wie heißt 12 auf Französisch?", "douze"],
        ["Wie heißt 19 auf Französisch?", "dix-neuf"],
        ["Wie heißt 20 auf Französisch?", "vingt"],
        ["Was bedeutet 'quinze'?", "15", ["15", "5", "50"]],
        ["Was bedeutet 'seize'?", "16", ["16", "6", "13"]],
        ["Was bedeutet 'neuf'?", "9", ["9", "4", "19"]]
      ]
    }
  ]
},

{
  id: "m02", saison: 1, nr: 2,
  titel: "Der Rucksack",
  thema: "Artikel, Nomen, Plural",
  ziel: "Du weißt, wann le, la, les, un, une oder des steht.",
  vocab: [
    ["le sac", "der Rucksack / die Tasche"],
    ["le stylo", "der Stift"],
    ["le cahier", "das Heft"],
    ["le livre", "das Buch"],
    ["la trousse", "das Mäppchen"],
    ["la gomme", "der Radiergummi"],
    ["la règle", "das Lineal"],
    ["le crayon", "der Bleistift"],
    ["la porte", "die Tür"],
    ["la fenêtre", "das Fenster"],
    ["la table", "der Tisch"],
    ["la chaise", "der Stuhl"],
    ["le tableau", "die Tafel"],
    ["l'ordinateur", "der Computer"],
    ["le portable", "das Handy"],
    ["la clé", "der Schlüssel"]
  ],
  phrases: [
    ["C'est un stylo.", "Das ist ein Stift."],
    ["Ce sont des livres.", "Das sind Bücher."],
    ["Qu'est-ce que c'est ?", "Was ist das?"],
    ["Voilà la clé.", "Hier ist der Schlüssel."],
    ["Où est mon sac ?", "Wo ist mein Rucksack?"],
    ["Il y a un problème.", "Es gibt ein Problem."]
  ],
  grammar: [
    {
      id: "g1", titel: "Bestimmter und unbestimmter Artikel",
      regel: "Jedes französische Nomen hat ein Geschlecht – männlich oder weiblich. Es gibt kein 'das'. Lerne jedes Wort IMMER mit Artikel: nicht 'sac', sondern 'le sac'.",
      tabelle: [
        ["le sac (m.)", "der Rucksack – bestimmt"],
        ["la clé (f.)", "der Schlüssel – bestimmt"],
        ["l'ami (vor Vokal)", "der Freund"],
        ["les livres", "die Bücher – Plural"],
        ["un sac / une clé", "ein Rucksack / ein Schlüssel"],
        ["des livres", "Bücher (unbestimmt Plural)"]
      ],
      tipp: "Vor a, e, i, o, u und stummem h wird le/la zu l'. Also l'ordinateur, nicht 'le ordinateur'.",
      drills: [
        ["___ trousse est dans le sac.", "La", ["La", "Le", "Les"]],
        ["___ ordinateur est sur la table.", "L'", ["L'", "Le", "La"]],
        ["Il y a ___ crayon dans la trousse.", "un", ["un", "une", "des"]],
        ["J'ai ___ gomme.", "une", ["une", "un", "des"]],
        ["Ce sont ___ livres.", "des", ["des", "un", "le"]],
        ["___ fenêtre est ouverte.", "La", ["La", "Le", "L'"]],
        ["Tippe die Mehrzahl von 'le cahier'", "les cahiers"],
        ["Tippe die Mehrzahl von 'une règle'", "des règles"]
      ]
    },
    {
      id: "g2", titel: "Plural bilden",
      regel: "Meistens hängst du einfach ein -s an. Man hört es nicht, aber man schreibt es. Der Artikel zeigt den Plural: le/la wird zu les, un/une wird zu des.",
      tabelle: [
        ["le stylo → les stylos", "normal: + s"],
        ["le tableau → les tableaux", "auf -eau: + x"],
        ["le prix → les prix", "auf -s, -x, -z: bleibt gleich"]
      ],
      tipp: "Im Gespräch hörst du den Plural nur am Artikel. 'le livre' und 'les livres' klingen fast gleich – aber 'le' ist kurz, 'les' klingt wie 'le' mit einem 'ä'.",
      drills: [
        ["Plural von 'le tableau'", "les tableaux"],
        ["Plural von 'la porte'", "les portes"],
        ["Plural von 'un ami'", "des amis"],
        ["Plural von 'le bureau'", "les bureaux"],
        ["Was ist richtig?", "les chaises", ["les chaises", "les chaise", "la chaises"]]
      ]
    }
  ]
},

{
  id: "m03", saison: 1, nr: 3,
  titel: "Wer bist du wirklich?",
  thema: "Adjektive, Nationalitäten, Beschreibungen",
  ziel: "Du kannst Personen beschreiben und Adjektive richtig angleichen.",
  vocab: [
    ["français / française", "französisch"],
    ["allemand / allemande", "deutsch"],
    ["sympa", "nett, sympathisch"],
    ["gentil / gentille", "lieb, freundlich"],
    ["méchant", "gemein"],
    ["timide", "schüchtern"],
    ["drôle", "lustig"],
    ["fort", "stark, gut (in etwas)"],
    ["nul", "schlecht, mies"],
    ["cool", "cool"],
    ["fatigué", "müde"],
    ["content", "zufrieden, froh"],
    ["triste", "traurig"],
    ["génial", "genial, super"],
    ["bizarre", "komisch, seltsam"],
    ["méfiant", "misstrauisch"]
  ],
  phrases: [
    ["Elle est très sympa.", "Sie ist sehr nett."],
    ["Je suis allemand.", "Ich bin Deutscher."],
    ["Il est un peu bizarre.", "Er ist ein bisschen komisch."],
    ["Nous sommes fatigués.", "Wir sind müde."],
    ["Tu es fort en maths !", "Du bist gut in Mathe!"],
    ["C'est génial !", "Das ist super!"]
  ],
  grammar: [
    {
      id: "g1", titel: "Adjektive angleichen",
      regel: "Das Adjektiv richtet sich nach dem Nomen: weiblich bekommt ein -e, Plural ein -s. Beides zusammen: -es.",
      tabelle: [
        ["Il est grand.", "männlich Einzahl"],
        ["Elle est grande.", "weiblich: + e"],
        ["Ils sont grands.", "männlich Mehrzahl: + s"],
        ["Elles sont grandes.", "weiblich Mehrzahl: + es"],
        ["Il / Elle est timide.", "endet schon auf -e: bleibt gleich"]
      ],
      tipp: "Das -e am Ende macht den letzten Konsonanten hörbar: 'grand' klingt wie 'grã', 'grande' wie 'grãd'. Daran hörst du das Geschlecht.",
      drills: [
        ["Elle est ___ (français).", "française"],
        ["Ils sont ___ (allemand).", "allemands"],
        ["Marie est ___ (content).", "contente"],
        ["Les filles sont ___ (fatigué).", "fatiguées"],
        ["Il est ___ (timide).", "timide"],
        ["Elle est ___ (gentil).", "gentille"],
        ["Was ist richtig?", "Elles sont grandes.", ["Elles sont grandes.", "Elles sont grand.", "Elles sont grande."]],
        ["Was ist richtig?", "Il est drôle.", ["Il est drôle.", "Il est drôles.", "Il est drôlee."]]
      ]
    }
  ]
},

{
  id: "m04", saison: 1, nr: 4,
  titel: "Die erste Spur",
  thema: "-er-Verben und Fragen stellen",
  ziel: "Du kannst regelmäßige Verben im Präsens und drei Arten von Fragen.",
  vocab: [
    ["parler", "sprechen"],
    ["habiter", "wohnen"],
    ["aimer", "mögen, lieben"],
    ["adorer", "sehr gern mögen"],
    ["détester", "hassen"],
    ["jouer", "spielen"],
    ["chanter", "singen"],
    ["regarder", "anschauen"],
    ["écouter", "zuhören, hören"],
    ["travailler", "arbeiten"],
    ["rester", "bleiben"],
    ["chercher", "suchen"],
    ["trouver", "finden"],
    ["donner", "geben"],
    ["arriver", "ankommen"],
    ["demander", "fragen"]
  ],
  phrases: [
    ["Tu parles français ?", "Sprichst du Französisch?"],
    ["Est-ce que tu habites ici ?", "Wohnst du hier?"],
    ["Qu'est-ce que tu cherches ?", "Was suchst du?"],
    ["J'aime bien cette chanson.", "Ich mag dieses Lied."],
    ["Où est-ce qu'il travaille ?", "Wo arbeitet er?"],
    ["Pourquoi tu demandes ça ?", "Warum fragst du das?"]
  ],
  grammar: [
    {
      id: "g1", titel: "Verben auf -er im Präsens",
      regel: "Rund 90 Prozent aller französischen Verben enden auf -er. Du streichst das -er weg und hängst die Endung an. Einmal gelernt – tausend Verben können.",
      tabelle: [
        ["je parle", "-e"], ["tu parles", "-es"], ["il / elle parle", "-e"],
        ["nous parlons", "-ons"], ["vous parlez", "-ez"], ["ils / elles parlent", "-ent"]
      ],
      tipp: "Kleiner Trick: -e, -es, -e und -ent klingen ALLE gleich. Nur nous (-ons) und vous (-ez) hört man. Beim Sprechen kannst du also kaum was falsch machen.",
      drills: [
        ["Je ___ (parler) allemand.", "parle"],
        ["Tu ___ (habiter) à Paris.", "habites"],
        ["Elle ___ (chercher) la clé.", "cherche"],
        ["Nous ___ (jouer) au foot.", "jouons"],
        ["Vous ___ (écouter) la radio.", "écoutez"],
        ["Ils ___ (travailler) beaucoup.", "travaillent"],
        ["Léo et Marie ___ (rester) ici.", "restent"],
        ["Je ___ (adorer) ça.", "adore"],
        ["Was ist richtig?", "nous trouvons", ["nous trouvons", "nous trouvez", "nous trouvent"]]
      ]
    },
    {
      id: "g2", titel: "Fragen stellen – drei Wege",
      regel: "Du brauchst keine komplizierte Umstellung. Es reicht, wenn du EINEN Weg sicher kannst: est-ce que.",
      tabelle: [
        ["Tu viens ?", "1. Stimme heben – locker, mündlich"],
        ["Est-ce que tu viens ?", "2. est-ce que davor – immer richtig"],
        ["Viens-tu ?", "3. Umstellung – schriftlich, formell"],
        ["Qu'est-ce que tu fais ?", "Was machst du?"],
        ["Où est-ce que tu habites ?", "Wo wohnst du?"]
      ],
      tipp: "In der Klassenarbeit ist 'est-ce que' deine Versicherung. Es ist nie falsch.",
      drills: [
        ["Mach eine Frage mit est-ce que: 'Tu parles français.'", "Est-ce que tu parles français ?"],
        ["Mach eine Frage mit est-ce que: 'Il habite ici.'", "Est-ce qu'il habite ici ?"],
        ["Was bedeutet 'Qu'est-ce que c'est ?'", "Was ist das?", ["Was ist das?", "Wer ist das?", "Wo ist das?"]],
        ["Wie fragst du 'Wo wohnst du?'", "Où est-ce que tu habites ?"],
        ["Wie fragst du 'Warum?'", "pourquoi"],
        ["Was bedeutet 'quand' ?", "wann", ["wann", "wo", "wer"]],
        ["Was bedeutet 'qui' ?", "wer", ["wer", "was", "wie"]]
      ]
    }
  ]
},

{
  id: "m05", saison: 1, nr: 5,
  titel: "Die Akte Familie",
  thema: "avoir, Familie, mein/dein/sein",
  ziel: "Du kannst avoir und die Possessivbegleiter mon, ton, son.",
  vocab: [
    ["la famille", "die Familie"],
    ["le père", "der Vater"],
    ["la mère", "die Mutter"],
    ["les parents", "die Eltern"],
    ["le frère", "der Bruder"],
    ["la sœur", "die Schwester"],
    ["le fils", "der Sohn"],
    ["la fille", "die Tochter"],
    ["le grand-père", "der Großvater"],
    ["la grand-mère", "die Großmutter"],
    ["l'oncle", "der Onkel"],
    ["la tante", "die Tante"],
    ["le cousin", "der Cousin"],
    ["le chien", "der Hund"],
    ["le chat", "die Katze"],
    ["la maison", "das Haus"]
  ],
  phrases: [
    ["J'ai un frère et une sœur.", "Ich habe einen Bruder und eine Schwester."],
    ["Mon père s'appelle Marc.", "Mein Vater heißt Marc."],
    ["Elle a quinze ans.", "Sie ist fünfzehn."],
    ["Tu as un animal ?", "Hast du ein Haustier?"],
    ["Ma sœur est pénible.", "Meine Schwester ist nervig."],
    ["Nous avons un chien.", "Wir haben einen Hund."]
  ],
  grammar: [
    {
      id: "g1", titel: "avoir – haben",
      regel: "Das zweite Schlüsselverb. Achtung: Alter sagt man mit avoir, nicht mit être. 'J'ai 14 ans' – wörtlich: ich habe 14 Jahre.",
      tabelle: [
        ["j'ai", "ich habe"], ["tu as", "du hast"], ["il / elle a", "er / sie hat"],
        ["nous avons", "wir haben"], ["vous avez", "ihr habt"], ["ils / elles ont", "sie haben"]
      ],
      tipp: "ai – as – a – avons – avez – ont. Verwechsle 'ils ont' (sie haben) nicht mit 'ils sont' (sie sind). Das ist der Klassiker-Fehler in jeder Arbeit.",
      drills: [
        ["J'___ un frère.", "ai", ["ai", "as", "a"]],
        ["Tu ___ quel âge ?", "as", ["as", "a", "ai"]],
        ["Elle ___ un chat.", "a", ["a", "as", "ont"]],
        ["Nous ___ cours.", "avons", ["avons", "avez", "ont"]],
        ["Vous ___ raison.", "avez", ["avez", "avons", "ont"]],
        ["Ils ___ des problèmes.", "ont", ["ont", "sont", "a"]],
        ["Sie sind müde (elles): ___ fatiguées.", "elles sont", ["elles sont", "elles ont", "elles est"]],
        ["Tippe: 'ich habe 14 Jahre'", "j'ai quatorze ans"]
      ]
    },
    {
      id: "g2", titel: "mon, ma, mes – mein",
      regel: "Der Begleiter richtet sich nach dem NOMEN, nicht nach dem Besitzer. 'sa sœur' heißt seine ODER ihre Schwester – weil 'sœur' weiblich ist.",
      tabelle: [
        ["mon frère / ma sœur / mes parents", "mein, meine"],
        ["ton frère / ta sœur / tes parents", "dein, deine"],
        ["son frère / sa sœur / ses parents", "sein oder ihr"],
        ["notre / nos", "unser"],
        ["votre / vos", "euer"],
        ["leur / leurs", "ihr (mehrere Besitzer)"]
      ],
      tipp: "Vor Vokal immer die männliche Form: 'mon amie', nicht 'ma amie'. Klingt sonst furchtbar.",
      drills: [
        ["___ mère est prof. (meine)", "Ma", ["Ma", "Mon", "Mes"]],
        ["___ frère a 12 ans. (mein)", "Mon", ["Mon", "Ma", "Mes"]],
        ["___ parents sont sympas. (meine)", "Mes", ["Mes", "Mon", "Ma"]],
        ["___ amie s'appelle Zoé. (meine)", "Mon", ["Mon", "Ma", "Mes"]],
        ["C'est ___ sac ? (dein)", "ton", ["ton", "ta", "tes"]],
        ["Il cherche ___ clé. (seine)", "sa", ["sa", "son", "ses"]],
        ["Tippe 'unsere Eltern'", "nos parents"],
        ["Tippe 'ihre Schwester' (von ihm)", "sa sœur"]
      ]
    }
  ]
},

{
  id: "m06", saison: 1, nr: 6,
  titel: "20:15 Uhr",
  thema: "Verneinung, Zahlen bis 100, Uhrzeit",
  ziel: "Du kannst Sätze verneinen, bis 100 zählen und die Uhrzeit sagen.",
  vocab: [
    ["l'heure", "die Stunde / die Uhrzeit"],
    ["la minute", "die Minute"],
    ["le matin", "der Morgen"],
    ["l'après-midi", "der Nachmittag"],
    ["le soir", "der Abend"],
    ["la nuit", "die Nacht"],
    ["aujourd'hui", "heute"],
    ["demain", "morgen"],
    ["hier", "gestern"],
    ["le jour", "der Tag"],
    ["la semaine", "die Woche"],
    ["le week-end", "das Wochenende"],
    ["lundi", "Montag"],
    ["mercredi", "Mittwoch"],
    ["samedi", "Samstag"],
    ["dimanche", "Sonntag"]
  ],
  phrases: [
    ["Il est huit heures.", "Es ist acht Uhr."],
    ["Il est huit heures et quart.", "Es ist Viertel nach acht."],
    ["Il est huit heures et demie.", "Es ist halb neun."],
    ["Il est midi.", "Es ist zwölf Uhr mittags."],
    ["Je ne comprends pas.", "Ich verstehe nicht."],
    ["Il n'est pas là.", "Er ist nicht da."]
  ],
  grammar: [
    {
      id: "g1", titel: "Verneinung: ne ... pas",
      regel: "Die Verneinung ist eine Klammer um das Verb: ne + VERB + pas. Beide Teile gehören dazu.",
      tabelle: [
        ["Je parle. → Je ne parle pas.", "ich spreche nicht"],
        ["Il est là. → Il n'est pas là.", "vor Vokal: n'"],
        ["Tu as un chien. → Tu n'as pas de chien.", "un/une/des wird zu de!"],
        ["ne ... jamais", "nie"],
        ["ne ... plus", "nicht mehr"],
        ["ne ... rien", "nichts"]
      ],
      tipp: "Merk dir die Falle: nach einer Verneinung wird aus un/une/des immer 'de'. 'Je n'ai pas de frère.'",
      drills: [
        ["Verneine: 'Je parle italien.'", "Je ne parle pas italien."],
        ["Verneine: 'Il est français.'", "Il n'est pas français."],
        ["Verneine: 'Nous avons cours.'", "Nous n'avons pas cours."],
        ["Je ___ regarde ___ la télé.", "ne / pas", ["ne / pas", "pas / ne", "ne / plus"]],
        ["Tu n'as pas ___ frère ?", "de", ["de", "un", "des"]],
        ["Was heißt 'Je ne sais rien.'?", "Ich weiß nichts.", ["Ich weiß nichts.", "Ich weiß nicht mehr.", "Ich weiß nie."]],
        ["Wie sagst du 'nie'?", "ne ... jamais"]
      ]
    },
    {
      id: "g2", titel: "Zahlen 20-100 und Uhrzeit",
      regel: "Ab 70 rechnen die Franzosen: 70 = 60+10, 80 = 4x20, 90 = 4x20+10. Das ist verrückt, aber logisch.",
      tabelle: [
        ["20 vingt / 30 trente / 40 quarante", "einfach"],
        ["50 cinquante / 60 soixante", "einfach"],
        ["70 soixante-dix", "60 + 10"],
        ["80 quatre-vingts", "4 x 20"],
        ["90 quatre-vingt-dix", "4 x 20 + 10"],
        ["100 cent", "hundert"]
      ],
      tipp: "Uhrzeit: 'Il est ___ heures.' Viertel nach = et quart, halb = et demie, Viertel vor = moins le quart.",
      drills: [
        ["Wie heißt 40?", "quarante"],
        ["Wie heißt 60?", "soixante"],
        ["Wie heißt 80?", "quatre-vingts"],
        ["Wie heißt 71?", "soixante et onze"],
        ["Was bedeutet 'quatre-vingt-dix'?", "90", ["90", "80", "70"]],
        ["Es ist halb neun: Il est huit heures ___.", "et demie", ["et demie", "et quart", "moins le quart"]],
        ["Es ist Viertel vor sechs: Il est six heures ___.", "moins le quart", ["moins le quart", "et quart", "et demie"]]
      ]
    }
  ]
}

);
