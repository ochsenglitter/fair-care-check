/* DOSSIER PARIS – Saison 3: "RUECKBLENDE"
   Stoff: Klasse 8, Vergangenheit und Pronomen. */

window.CURRICULUM = window.CURRICULUM || [];

window.CURRICULUM.push(

{
  id: "m13", saison: 3, nr: 13,
  titel: "Die Nacht davor",
  thema: "Passé composé mit être",
  ziel: "Du weißt, welche Verben être statt avoir nehmen – und warum das Partizip sich verändert.",
  vocab: [
    ["aller", "gehen, fahren"],
    ["venir", "kommen"],
    ["partir", "abfahren, weggehen"],
    ["arriver", "ankommen"],
    ["entrer", "hineingehen"],
    ["sortir", "hinausgehen"],
    ["rester", "bleiben"],
    ["tomber", "fallen"],
    ["monter", "hinaufgehen, einsteigen"],
    ["descendre", "hinuntergehen, aussteigen"],
    ["retourner", "zurückkehren"],
    ["revenir", "wiederkommen"],
    ["devenir", "werden"],
    ["naître", "geboren werden"],
    ["mourir", "sterben"],
    ["passer", "vorbeigehen"]
  ],
  phrases: [
    ["Je suis allé au cinéma.", "Ich bin ins Kino gegangen."],
    ["Elle est partie à huit heures.", "Sie ist um acht losgefahren."],
    ["Nous sommes restés à la maison.", "Wir sind zu Hause geblieben."],
    ["Ils sont arrivés en retard.", "Sie sind zu spät gekommen."],
    ["Tu es né en quelle année ?", "In welchem Jahr bist du geboren?"],
    ["Je ne suis pas sorti hier.", "Ich bin gestern nicht rausgegangen."]
  ],
  grammar: [
    {
      id: "g1", titel: "Die être-Verben",
      regel: "Eine feste Gruppe von etwa 15 Verben bildet das Passé composé mit être. Es sind fast alle Verben der BEWEGUNG oder VERAENDERUNG. Und: das Partizip verhält sich dann wie ein Adjektiv.",
      tabelle: [
        ["aller / venir", "gehen / kommen"],
        ["arriver / partir", "ankommen / abfahren"],
        ["entrer / sortir", "rein / raus"],
        ["monter / descendre", "hoch / runter"],
        ["rester / tomber / passer", "bleiben / fallen / vorbeigehen"],
        ["naître / mourir / devenir", "geboren werden / sterben / werden"]
      ],
      tipp: "Stell dir ein Haus vor: du gehst rein, raus, hoch, runter, kommst an, fährst weg, bleibst, fällst hin. Alles am Haus = être. Alles andere = avoir.",
      drills: [
        ["Je ___ allé à Paris.", "suis", ["suis", "ai", "est"]],
        ["Elle ___ partie hier.", "est", ["est", "a", "sont"]],
        ["Nous ___ restés ici.", "sommes", ["sommes", "avons", "êtes"]],
        ["Ils ___ arrivés.", "sont", ["sont", "ont", "est"]],
        ["J'___ mangé une pizza.", "ai", ["ai", "suis", "est"]],
        ["Tu ___ tombé ?", "es", ["es", "as", "est"]],
        ["Il ___ vu le film.", "a", ["a", "est", "ont"]],
        ["Elle ___ venue avec nous.", "est", ["est", "a", "sont"]]
      ]
    },
    {
      id: "g2", titel: "Angleichung des Partizips",
      regel: "Bei être-Verben passt sich das Partizip an das Subjekt an – wie ein Adjektiv. Bei avoir passiert das NICHT.",
      tabelle: [
        ["Il est allé.", "männlich Einzahl"],
        ["Elle est allée.", "+ e"],
        ["Ils sont allés.", "+ s"],
        ["Elles sont allées.", "+ es"],
        ["Elle a mangé.", "avoir: KEINE Angleichung"]
      ],
      tipp: "Frag dich in der Arbeit immer nur zwei Dinge: 1. avoir oder être? 2. Wenn être: wer ist das Subjekt?",
      drills: [
        ["Elle est ___ (aller) au parc.", "allée"],
        ["Ils sont ___ (partir) tôt.", "partis"],
        ["Elles sont ___ (rester) à la maison.", "restées"],
        ["Marie est ___ (venir) hier.", "venue"],
        ["Léo et Paul sont ___ (arriver).", "arrivés"],
        ["Elle a ___ (manger) une pizza.", "mangé"],
        ["Was ist richtig?", "Elle est sortie.", ["Elle est sortie.", "Elle est sorti.", "Elle a sortie."]],
        ["Was ist richtig?", "Elles ont parlé.", ["Elles ont parlé.", "Elles ont parlées.", "Elles sont parlées."]]
      ]
    }
  ]
},

{
  id: "m14", saison: 3, nr: 14,
  titel: "Der Plan für morgen",
  thema: "Futur composé – die nahe Zukunft",
  ziel: "Du kannst über Pläne und Zukunft reden. Das ist die einfachste Zeitform überhaupt.",
  vocab: [
    ["le projet", "das Vorhaben"],
    ["le plan", "der Plan"],
    ["bientôt", "bald"],
    ["plus tard", "später"],
    ["l'année prochaine", "nächstes Jahr"],
    ["le mois prochain", "nächsten Monat"],
    ["ce soir", "heute Abend"],
    ["ce week-end", "dieses Wochenende"],
    ["peut-être", "vielleicht"],
    ["sûr", "sicher"],
    ["prêt", "bereit"],
    ["libre", "frei"],
    ["occupé", "beschäftigt"],
    ["l'idée", "die Idee"],
    ["le rendez-vous", "der Termin, die Verabredung"],
    ["le but", "das Ziel"]
  ],
  phrases: [
    ["Je vais partir demain.", "Ich werde morgen abfahren."],
    ["Qu'est-ce que tu vas faire ?", "Was wirst du machen?"],
    ["On va être en retard.", "Wir werden zu spät kommen."],
    ["Elle ne va pas venir.", "Sie wird nicht kommen."],
    ["Je vais te montrer quelque chose.", "Ich zeige dir gleich etwas."],
    ["Tout va bien se passer.", "Es wird alles gut gehen."]
  ],
  grammar: [
    {
      id: "g1", titel: "aller + Infinitiv",
      regel: "Du nimmst aller im Präsens und hängst den INFINITIV an. Fertig. Genau wie im Deutschen 'ich gehe gleich essen'.",
      tabelle: [
        ["je vais manger", "ich werde essen"],
        ["tu vas partir", "du wirst weggehen"],
        ["il va venir", "er wird kommen"],
        ["nous allons voir", "wir werden sehen"],
        ["vous allez comprendre", "ihr werdet verstehen"],
        ["ils vont arriver", "sie werden ankommen"]
      ],
      tipp: "Verneinung: Die Klammer geht um ALLER, nicht um den Infinitiv. 'Je ne vais pas venir.'",
      drills: [
        ["Je ___ partir. (werde)", "vais", ["vais", "vas", "va"]],
        ["Tu ___ voir. (wirst)", "vas", ["vas", "va", "vais"]],
        ["Il ___ comprendre.", "va", ["va", "vas", "vont"]],
        ["Nous ___ manger.", "allons", ["allons", "allez", "vont"]],
        ["Ils ___ arriver bientôt.", "vont", ["vont", "va", "allons"]],
        ["Setze ins Futur composé: 'Je mange.'", "Je vais manger."],
        ["Setze ins Futur composé: 'Elle part.'", "Elle va partir."],
        ["Verneine: 'Je vais venir.'", "Je ne vais pas venir."],
        ["Was ist richtig?", "Tu vas faire quoi ?", ["Tu vas faire quoi ?", "Tu vas fais quoi ?", "Tu va faire quoi ?"]]
      ]
    }
  ]
},

{
  id: "m15", saison: 3, nr: 15,
  titel: "Ich sehe ihn",
  thema: "Direkte Objektpronomen le, la, les",
  ziel: "Du kannst Wiederholungen vermeiden – wie ein Muttersprachler.",
  vocab: [
    ["voir", "sehen"],
    ["connaître", "kennen"],
    ["croire", "glauben"],
    ["savoir", "wissen"],
    ["dire", "sagen"],
    ["lire", "lesen"],
    ["écrire", "schreiben"],
    ["mettre", "legen, stellen, anziehen"],
    ["ouvrir", "öffnen"],
    ["fermer", "schließen"],
    ["appeler", "anrufen, nennen"],
    ["acheter", "kaufen"],
    ["aider", "helfen"],
    ["montrer", "zeigen"],
    ["cacher", "verstecken"],
    ["suivre", "folgen"]
  ],
  phrases: [
    ["Tu le connais ?", "Kennst du ihn?"],
    ["Je la vois.", "Ich sehe sie."],
    ["Je ne les trouve pas.", "Ich finde sie nicht."],
    ["Il m'aide beaucoup.", "Er hilft mir viel."],
    ["Je vais l'appeler.", "Ich werde ihn anrufen."],
    ["Regarde-moi !", "Schau mich an!"]
  ],
  grammar: [
    {
      id: "g1", titel: "Direkte Objektpronomen",
      regel: "Statt das Nomen zu wiederholen, setzt du ein Pronomen ein – und zwar VOR das Verb. Das ist der große Unterschied zum Deutschen.",
      tabelle: [
        ["me / te", "mich / dich"],
        ["le / la / l'", "ihn / sie / es"],
        ["nous / vous", "uns / euch"],
        ["les", "sie (Mehrzahl)"],
        ["Je vois Léo. → Je le vois.", "Position: vor dem Verb"],
        ["Je ne le vois pas.", "Verneinung: ne + Pronomen + Verb + pas"]
      ],
      tipp: "Deutsch: 'Ich sehe ihn.' Französisch: 'Ich IHN sehe.' Je le vois. Denk es dir als Yoda-Satz, dann vergisst du es nie.",
      drills: [
        ["Je vois Marie. → Je ___ vois.", "la", ["la", "le", "les"]],
        ["Tu connais Léo ? → Tu ___ connais ?", "le", ["le", "la", "les"]],
        ["Je cherche mes clés. → Je ___ cherche.", "les", ["les", "le", "la"]],
        ["J'aime cette chanson. → Je ___ aime.", "l'", ["l'", "la", "le"]],
        ["Ersetze: 'Il regarde le film.'", "Il le regarde."],
        ["Ersetze: 'Elle achète les billets.'", "Elle les achète."],
        ["Verneine: 'Je le connais.'", "Je ne le connais pas."],
        ["Was ist richtig?", "Je ne la vois pas.", ["Je ne la vois pas.", "Je ne vois pas la.", "Je la ne vois pas."]]
      ]
    },
    {
      id: "g2", titel: "Pronomen bei zwei Verben",
      regel: "Wenn zwei Verben zusammenstehen (z.B. Futur composé), steht das Pronomen vor dem INFINITIV – nicht vor dem ersten Verb.",
      tabelle: [
        ["Je vais le voir.", "Ich werde ihn sehen."],
        ["Tu peux m'aider ?", "Kannst du mir helfen?"],
        ["Elle veut les acheter.", "Sie will sie kaufen."],
        ["Je ne vais pas le faire.", "Ich werde es nicht tun."]
      ],
      tipp: "Faustregel: Das Pronomen klebt an dem Verb, zu dem es inhaltlich gehört. Das ist fast immer der Infinitiv.",
      drills: [
        ["Je vais ___ appeler. (ihn)", "l'", ["l'", "le", "la"]],
        ["Tu peux ___ aider ? (mir)", "m'", ["m'", "me", "te"]],
        ["Elle veut ___ voir. (sie, Mehrzahl)", "les", ["les", "le", "la"]],
        ["Ersetze: 'Je vais acheter le livre.'", "Je vais l'acheter."],
        ["Ersetze: 'Il peut faire les devoirs.'", "Il peut les faire."],
        ["Was ist richtig?", "Je vais le prendre.", ["Je vais le prendre.", "Je le vais prendre.", "Je vais prendre le."]]
      ]
    }
  ]
},

{
  id: "m16", saison: 3, nr: 16,
  titel: "Codewort",
  thema: "Indirekte Objektpronomen, y und en",
  ziel: "Du kannst lui, leur, y und en einsetzen.",
  vocab: [
    ["le numéro", "die Nummer"],
    ["le mail", "die E-Mail"],
    ["la lettre", "der Brief"],
    ["la photo", "das Foto"],
    ["le cadeau", "das Geschenk"],
    ["l'argent", "das Geld"],
    ["l'adresse", "die Adresse"],
    ["le secret", "das Geheimnis"],
    ["la vérité", "die Wahrheit"],
    ["le mensonge", "die Lüge"],
    ["la preuve", "der Beweis"],
    ["le code", "der Code"],
    ["le dossier", "die Akte"],
    ["expliquer", "erklären"],
    ["répondre", "antworten"],
    ["envoyer", "schicken"]
  ],
  phrases: [
    ["Je lui ai dit la vérité.", "Ich habe ihm die Wahrheit gesagt."],
    ["Tu leur as envoyé le message ?", "Hast du ihnen die Nachricht geschickt?"],
    ["J'y vais tout de suite.", "Ich gehe sofort hin."],
    ["Il en a trois.", "Er hat drei davon."],
    ["Je n'en veux pas.", "Ich will davon nichts."],
    ["Qu'est-ce que tu lui as dit ?", "Was hast du ihm gesagt?"]
  ],
  grammar: [
    {
      id: "g1", titel: "lui und leur – ihm / ihr / ihnen",
      regel: "Wenn im Französischen ein 'à' vor der Person steht, brauchst du das INDIREKTE Pronomen: lui (Einzahl) oder leur (Mehrzahl). Egal ob Mann oder Frau.",
      tabelle: [
        ["me / te", "mir / dir"],
        ["lui", "ihm ODER ihr"],
        ["nous / vous", "uns / euch"],
        ["leur", "ihnen"],
        ["Je parle à Marie. → Je lui parle.", "Beispiel"],
        ["dire à, parler à, répondre à, donner à", "typische Verben mit à"]
      ],
      tipp: "Test: Kannst du 'wem?' fragen → lui/leur. Kannst du 'wen/was?' fragen → le/la/les.",
      drills: [
        ["Je parle à Léo. → Je ___ parle.", "lui", ["lui", "le", "leur"]],
        ["Elle écrit à ses parents. → Elle ___ écrit.", "leur", ["leur", "lui", "les"]],
        ["Je dis la vérité à Marie. → Je ___ dis la vérité.", "lui", ["lui", "la", "leur"]],
        ["Tu connais Marie ? → Tu ___ connais ?", "la", ["la", "lui", "leur"]],
        ["Ersetze: 'Il répond à ses amis.'", "Il leur répond."],
        ["Ersetze: 'Je donne le livre à Paul.'", "Je lui donne le livre."],
        ["Was ist richtig?", "Je lui ai téléphoné.", ["Je lui ai téléphoné.", "Je l'ai téléphoné.", "Je leur ai téléphoné à lui."]]
      ]
    },
    {
      id: "g2", titel: "y und en",
      regel: "y ersetzt einen ORT (dorthin, dort). en ersetzt eine MENGE oder etwas mit 'de' (davon).",
      tabelle: [
        ["Je vais à Paris. → J'y vais.", "y = Ort"],
        ["Il est au cinéma. → Il y est.", "y = Ort"],
        ["J'ai trois frères. → J'en ai trois.", "en = Menge"],
        ["Je veux du pain. → J'en veux.", "en = de + Nomen"],
        ["Je n'en ai pas.", "Verneinung"]
      ],
      tipp: "'On y va !' heißt 'Los geht's!' – das ist genau dieses y. Und 'J'en ai marre' ('Ich hab's satt') ist genau dieses en.",
      drills: [
        ["Je vais à la gare. → J'___ vais.", "y", ["y", "en", "le"]],
        ["Il a deux chats. → Il ___ a deux.", "en", ["en", "y", "les"]],
        ["Tu veux du café ? → Tu ___ veux ?", "en", ["en", "y", "le"]],
        ["Elle habite à Lyon. → Elle ___ habite.", "y", ["y", "en", "la"]],
        ["Ersetze: 'Je pense à mon examen.'", "J'y pense."],
        ["Ersetze: 'Il parle de son problème.'", "Il en parle."],
        ["Was bedeutet 'On y va !'?", "Los geht's!", ["Los geht's!", "Er hat recht!", "Da ist es!"]]
      ]
    }
  ]
},

{
  id: "m17", saison: 3, nr: 17,
  titel: "Damals",
  thema: "Imparfait – die zweite Vergangenheit",
  ziel: "Du kannst das Imparfait bilden. Es ist die regelmäßigste Zeitform des Französischen.",
  vocab: [
    ["quand", "als, wenn"],
    ["toujours", "immer"],
    ["souvent", "oft"],
    ["d'habitude", "normalerweise"],
    ["chaque", "jeder, jede"],
    ["pendant", "während"],
    ["tous les jours", "jeden Tag"],
    ["autrefois", "früher"],
    ["l'enfance", "die Kindheit"],
    ["le village", "das Dorf"],
    ["le quartier", "das Viertel"],
    ["calme", "ruhig"],
    ["bruyant", "laut"],
    ["tranquille", "ruhig, friedlich"],
    ["l'ambiance", "die Stimmung"],
    ["le souvenir", "die Erinnerung"]
  ],
  phrases: [
    ["Quand j'étais petit, j'habitais à Lyon.", "Als ich klein war, wohnte ich in Lyon."],
    ["Il faisait beau.", "Das Wetter war schön."],
    ["On allait souvent au parc.", "Wir gingen oft in den Park."],
    ["Il y avait beaucoup de monde.", "Es waren viele Leute da."],
    ["Je ne savais pas.", "Ich wusste es nicht."],
    ["C'était génial.", "Das war super."]
  ],
  grammar: [
    {
      id: "g1", titel: "Imparfait bilden – ein Rezept",
      regel: "Nimm die nous-Form im Präsens, streich das -ons weg, häng die Endung an. Das funktioniert bei JEDEM Verb außer être.",
      tabelle: [
        ["nous parlons → parl-", "Schritt 1: Stamm"],
        ["je parlais / tu parlais / il parlait", "-ais, -ais, -ait"],
        ["nous parlions / vous parliez / ils parlaient", "-ions, -iez, -aient"],
        ["nous faisons → je faisais", "faire"],
        ["nous prenons → je prenais", "prendre"],
        ["être → j'étais", "einzige Ausnahme"]
      ],
      tipp: "Alle Endungen außer -ions und -iez klingen gleich: 'ä'. Beim Sprechen musst du also nur wissen, ob du nous/vous meinst.",
      drills: [
        ["Imparfait: je ___ (parler)", "parlais"],
        ["Imparfait: tu ___ (habiter)", "habitais"],
        ["Imparfait: il ___ (faire)", "faisait"],
        ["Imparfait: nous ___ (aller)", "allions"],
        ["Imparfait: vous ___ (prendre)", "preniez"],
        ["Imparfait: ils ___ (avoir)", "avaient"],
        ["Imparfait: je ___ (être)", "étais"],
        ["Imparfait: c'___ (être) super", "était"],
        ["Imparfait von 'il y a'", "il y avait"],
        ["Imparfait: elle ___ (savoir)", "savait"]
      ]
    }
  ]
},

{
  id: "m18", saison: 3, nr: 18,
  titel: "Der Zeuge",
  thema: "Imparfait oder Passé composé?",
  ziel: "Du triffst die Entscheidung, an der die meisten Klassenarbeiten hängen.",
  vocab: [
    ["soudain", "plötzlich"],
    ["tout à coup", "auf einmal"],
    ["alors", "also, da"],
    ["parce que", "weil"],
    ["mais", "aber"],
    ["donc", "also, deshalb"],
    ["pourtant", "dennoch"],
    ["heureusement", "zum Glück"],
    ["malheureusement", "leider"],
    ["étrange", "seltsam"],
    ["effrayant", "beängstigend"],
    ["le bruit", "das Geräusch"],
    ["l'ombre", "der Schatten"],
    ["le témoin", "der Zeuge"],
    ["se passer", "geschehen"],
    ["remarquer", "bemerken"]
  ],
  phrases: [
    ["Il faisait nuit quand je suis sorti.", "Es war Nacht, als ich rausging."],
    ["Je regardais la télé quand le téléphone a sonné.", "Ich sah fern, als das Telefon klingelte."],
    ["Tout à coup, j'ai entendu un bruit.", "Plötzlich hörte ich ein Geräusch."],
    ["Il était fatigué, alors il est rentré.", "Er war müde, also ging er heim."],
    ["Qu'est-ce qui s'est passé ?", "Was ist passiert?"],
    ["Je n'ai rien remarqué.", "Ich habe nichts bemerkt."]
  ],
  grammar: [
    {
      id: "g1", titel: "Die Film-Regel",
      regel: "Stell dir einen Film vor. Das IMPARFAIT ist die Kulisse: Wetter, Uhrzeit, Stimmung, wie es immer war. Das PASSÉ COMPOSÉ sind die Handlungen: was dann passiert ist, einmal, mit Knall.",
      tabelle: [
        ["Imparfait = Hintergrund", "Il faisait nuit."],
        ["Passé composé = Ereignis", "J'ai entendu un bruit."],
        ["Imparfait = Gewohnheit", "On allait souvent au parc."],
        ["Passé composé = einmalig", "Hier, on est allé au parc."],
        ["Imparfait = Zustand", "J'étais fatigué."],
        ["Signalwörter PC", "hier, soudain, tout à coup, une fois"]
      ],
      tipp: "Faustregel für die Arbeit: 'Was war gerade?' → Imparfait. 'Was passierte dann?' → Passé composé. Bei 'quand' steht meist beides: Kulisse + Knall.",
      drills: [
        ["Hintergrund oder Ereignis? 'Il ___ (faire) beau.'", "faisait"],
        ["'Soudain, il ___ (tomber).'", "est tombé"],
        ["'Quand j'___ (être) petit, j'habitais ici.'", "étais"],
        ["'Hier, j'___ (aller) au cinéma.'", "suis allé"],
        ["'Tous les jours, elle ___ (prendre) le bus.'", "prenait"],
        ["'Une fois, elle ___ (prendre) le train.'", "a pris"],
        ["Welche Zeit nach 'tout à coup'?", "Passé composé", ["Passé composé", "Imparfait"]],
        ["Welche Zeit nach 'd'habitude'?", "Imparfait", ["Imparfait", "Passé composé"]],
        ["'Je regardais la télé quand le téléphone ___ (sonner).'", "a sonné"],
        ["'Il ___ (être) fatigué, alors il est rentré.'", "était"]
      ]
    }
  ]
}

);
