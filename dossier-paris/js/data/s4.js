/* DOSSIER PARIS – Saison 4: "ZUGRIFF"
   Stoff: Ende Klasse 8 / Anschluss Klasse 9. */

window.CURRICULUM = window.CURRICULUM || [];

window.CURRICULUM.push(

{
  id: "m19", saison: 4, nr: 19,
  titel: "Der Mann, der zu viel wusste",
  thema: "Relativsätze mit qui, que, où",
  ziel: "Du kannst zwei Sätze zu einem verbinden – das hebt dein Niveau sofort sichtbar.",
  vocab: [
    ["l'homme", "der Mann"],
    ["la femme", "die Frau"],
    ["la personne", "die Person"],
    ["le type", "der Typ"],
    ["l'endroit", "der Ort"],
    ["le moment", "der Moment"],
    ["la chose", "die Sache"],
    ["le bâtiment", "das Gebäude"],
    ["l'appartement", "die Wohnung"],
    ["l'immeuble", "das Mietshaus"],
    ["l'étage", "das Stockwerk"],
    ["l'escalier", "die Treppe"],
    ["l'ascenseur", "der Aufzug"],
    ["le couloir", "der Flur"],
    ["le toit", "das Dach"],
    ["la fenêtre", "das Fenster"]
  ],
  phrases: [
    ["C'est l'homme qui habite ici.", "Das ist der Mann, der hier wohnt."],
    ["Voilà le livre que je cherchais.", "Da ist das Buch, das ich suchte."],
    ["C'est l'endroit où on s'est rencontrés.", "Das ist der Ort, wo wir uns getroffen haben."],
    ["Je connais quelqu'un qui peut aider.", "Ich kenne jemanden, der helfen kann."],
    ["Le jour où tout a changé.", "Der Tag, an dem sich alles änderte."],
    ["C'est tout ce que je sais.", "Das ist alles, was ich weiß."]
  ],
  grammar: [
    {
      id: "g1", titel: "qui, que oder où?",
      regel: "Es gibt einen simplen Test. Schau, was NACH der Lücke kommt: kommt ein Verb → qui. Kommt ein Subjekt (je, tu, Marie...) → que.",
      tabelle: [
        ["qui + VERB", "l'homme qui parle"],
        ["que + SUBJEKT", "l'homme que je vois"],
        ["où = Ort oder Zeit", "la ville où j'habite"],
        ["que wird zu qu' vor Vokal", "le film qu'il aime"],
        ["qui bleibt immer qui", "nie 'qu'il' für qui"]
      ],
      tipp: "Merksatz: qui hat keinen eigenen Körper, es braucht sofort ein Verb. que bringt sein eigenes Subjekt mit.",
      drills: [
        ["C'est l'homme ___ travaille ici.", "qui", ["qui", "que", "où"]],
        ["C'est le livre ___ j'ai lu.", "que", ["que", "qui", "où"]],
        ["La ville ___ je suis né.", "où", ["où", "qui", "que"]],
        ["Le film ___ est génial.", "qui", ["qui", "que", "où"]],
        ["La fille ___ tu connais.", "que", ["que", "qui", "où"]],
        ["Le moment ___ tout a changé.", "où", ["où", "que", "qui"]],
        ["Le message ___ il a envoyé.", "qu'", ["qu'", "qui", "où"]],
        ["Verbinde: 'Je connais un type. Il parle russe.'", "Je connais un type qui parle russe."],
        ["Verbinde: 'Voilà le dossier. Je le cherchais.'", "Voilà le dossier que je cherchais."]
      ]
    }
  ]
},

{
  id: "m20", saison: 4, nr: 20,
  titel: "Schneller als der Rest",
  thema: "Vergleich und Superlativ",
  ziel: "Du kannst vergleichen und sagen, was am besten ist.",
  vocab: [
    ["plus", "mehr"],
    ["moins", "weniger"],
    ["aussi", "genauso, auch"],
    ["meilleur", "besser (Adjektiv)"],
    ["mieux", "besser (Adverb)"],
    ["pire", "schlimmer"],
    ["rapide", "schnell"],
    ["lent", "langsam"],
    ["facile", "leicht"],
    ["difficile", "schwierig"],
    ["cher", "teuer"],
    ["important", "wichtig"],
    ["dangereux", "gefährlich"],
    ["faible", "schwach"],
    ["haut", "hoch"],
    ["bas", "niedrig"]
  ],
  phrases: [
    ["Il est plus grand que moi.", "Er ist größer als ich."],
    ["C'est moins cher qu'à Paris.", "Das ist billiger als in Paris."],
    ["Elle est aussi rapide que lui.", "Sie ist genauso schnell wie er."],
    ["C'est le meilleur film de l'année.", "Das ist der beste Film des Jahres."],
    ["Je joue mieux que toi.", "Ich spiele besser als du."],
    ["C'est le plus important.", "Das ist das Wichtigste."]
  ],
  grammar: [
    {
      id: "g1", titel: "Vergleich: plus / moins / aussi ... que",
      regel: "Eine feste Formel, in die du nur das Adjektiv einsetzt. 'que' heißt hier 'als' oder 'wie'.",
      tabelle: [
        ["plus ... que", "mehr / -er als"],
        ["moins ... que", "weniger als"],
        ["aussi ... que", "genauso wie"],
        ["bon → meilleur que", "besser als (Adjektiv)"],
        ["bien → mieux que", "besser als (Adverb)"],
        ["Achtung: nicht 'plus bon'", "immer meilleur"]
      ],
      tipp: "meilleur beschreibt ein NOMEN (ein besserer Film). mieux beschreibt ein VERB (ich spiele besser).",
      drills: [
        ["Il est ___ grand ___ moi. (größer als)", "plus / que", ["plus / que", "plus / de", "moins / que"]],
        ["C'est ___ cher ___ ici. (billiger als)", "moins / que", ["moins / que", "plus / que", "aussi / que"]],
        ["Elle court ___ vite ___ lui. (genauso)", "aussi / que", ["aussi / que", "plus / que", "moins / que"]],
        ["C'est ___ que l'autre film. (besser, Adjektiv)", "meilleur", ["meilleur", "mieux", "plus bon"]],
        ["Je joue ___ que toi. (besser, Verb)", "mieux", ["mieux", "meilleur", "plus bien"]],
        ["Übersetze: 'Er ist kleiner als ich.'", "Il est plus petit que moi."]
      ]
    },
    {
      id: "g2", titel: "Superlativ: der / die / das ...ste",
      regel: "Du setzt einfach den bestimmten Artikel vor den Vergleich: le plus, la plus, les plus.",
      tabelle: [
        ["le plus grand", "der größte"],
        ["la plus rapide", "die schnellste"],
        ["les plus importants", "die wichtigsten"],
        ["le moins cher", "der billigste"],
        ["le meilleur", "der beste"],
        ["... de la classe", "'von' heißt hier de"]
      ],
      tipp: "Im Deutschen sagst du 'der beste IN der Klasse'. Im Französischen immer 'DE la classe'.",
      drills: [
        ["C'est ___ grand bâtiment de la ville.", "le plus", ["le plus", "la plus", "plus"]],
        ["C'est ___ rapide de la classe. (weiblich)", "la plus", ["la plus", "le plus", "les plus"]],
        ["C'est ___ film de l'année. (der beste)", "le meilleur", ["le meilleur", "le plus bon", "le mieux"]],
        ["Übersetze: 'der billigste'", "le moins cher"],
        ["'Der beste Schüler der Klasse'", "le meilleur élève de la classe"]
      ]
    }
  ]
},

{
  id: "m21", saison: 4, nr: 21,
  titel: "Alle Schlösser öffnen",
  thema: "Verben auf -ir und -re, devoir, savoir, mettre",
  ziel: "Du deckst die letzten großen Verbgruppen ab.",
  vocab: [
    ["finir", "beenden"],
    ["choisir", "wählen"],
    ["réussir", "schaffen, bestehen"],
    ["remplir", "ausfüllen"],
    ["dormir", "schlafen"],
    ["servir", "dienen, servieren"],
    ["attendre", "warten"],
    ["entendre", "hören"],
    ["répondre", "antworten"],
    ["perdre", "verlieren"],
    ["vendre", "verkaufen"],
    ["devoir", "müssen"],
    ["savoir", "wissen, können"],
    ["mettre", "legen, setzen, anziehen"],
    ["boire", "trinken"],
    ["recevoir", "bekommen"]
  ],
  phrases: [
    ["Je dois partir.", "Ich muss gehen."],
    ["Tu sais nager ?", "Kannst du schwimmen?"],
    ["Il a réussi son examen.", "Er hat seine Prüfung bestanden."],
    ["Nous attendons depuis une heure.", "Wir warten seit einer Stunde."],
    ["Mets ta veste !", "Zieh deine Jacke an!"],
    ["Je n'ai pas entendu.", "Ich habe nicht gehört."]
  ],
  grammar: [
    {
      id: "g1", titel: "Zwei Muster: finir und attendre",
      regel: "Verben auf -ir und -re sind fast so regelmäßig wie -er. Es sind nur zwei Endungsreihen mehr.",
      tabelle: [
        ["je finis / tu finis / il finit", "-is, -is, -it"],
        ["nous finissons / vous finissez / ils finissent", "-issons, -issez, -issent"],
        ["j'attends / tu attends / il attend", "-s, -s, - (nichts!)"],
        ["nous attendons / vous attendez / ils attendent", "-ons, -ez, -ent"],
        ["choisir, réussir, remplir", "gehen wie finir"],
        ["répondre, perdre, vendre, entendre", "gehen wie attendre"]
      ],
      tipp: "Bei 'il attend' steht NICHTS am Ende – kein t. Das ist ein beliebter Fehler und ein leichter Punkt in der Arbeit.",
      drills: [
        ["Je ___ (finir) mes devoirs.", "finis"],
        ["Il ___ (choisir) un livre.", "choisit"],
        ["Nous ___ (finir) à cinq heures.", "finissons"],
        ["Ils ___ (réussir) toujours.", "réussissent"],
        ["J'___ (attendre) le bus.", "attends"],
        ["Il ___ (attendre) devant la gare.", "attend"],
        ["Nous ___ (répondre) à la question.", "répondons"],
        ["Ils ___ (perdre) souvent.", "perdent"],
        ["Tu ___ (entendre) ça ?", "entends"]
      ]
    },
    {
      id: "g2", titel: "devoir, savoir, mettre",
      regel: "Drei sehr häufige unregelmäßige Verben. devoir und savoir stehen wie pouvoir mit Infinitiv.",
      tabelle: [
        ["je dois / tu dois / il doit", "müssen – Einzahl"],
        ["nous devons / vous devez / ils doivent", "müssen – Mehrzahl"],
        ["je sais / tu sais / il sait", "wissen – Einzahl"],
        ["nous savons / vous savez / ils savent", "wissen – Mehrzahl"],
        ["je mets / tu mets / il met", "legen – Einzahl"],
        ["nous mettons / vous mettez / ils mettent", "legen – Mehrzahl"]
      ],
      tipp: "savoir = wissen ODER eine erlernte Fähigkeit können ('je sais nager'). connaître = jemanden/etwas kennen.",
      drills: [
        ["Je ___ (devoir) partir.", "dois"],
        ["Il ___ (devoir) travailler.", "doit"],
        ["Nous ___ (devoir) attendre.", "devons"],
        ["Ils ___ (devoir) venir.", "doivent"],
        ["Je ne ___ (savoir) pas.", "sais"],
        ["Tu ___ (savoir) nager ?", "sais"],
        ["Elle ___ (savoir) tout.", "sait"],
        ["Je ___ (mettre) mon manteau.", "mets"],
        ["Ils ___ (mettre) la table.", "mettent"],
        ["Kennen einer Person: 'Je ___ Marie.'", "connais", ["connais", "sais"]]
      ]
    }
  ]
},

{
  id: "m22", saison: 4, nr: 22,
  titel: "Sechs Uhr morgens",
  thema: "Reflexive Verben und Tagesablauf",
  ziel: "Du kannst deinen Tagesablauf beschreiben – ein Klassiker in jeder Prüfung.",
  vocab: [
    ["se lever", "aufstehen"],
    ["se laver", "sich waschen"],
    ["s'habiller", "sich anziehen"],
    ["se dépêcher", "sich beeilen"],
    ["se reposer", "sich ausruhen"],
    ["s'amuser", "sich amüsieren"],
    ["se coucher", "ins Bett gehen"],
    ["se réveiller", "aufwachen"],
    ["se souvenir", "sich erinnern"],
    ["se tromper", "sich irren"],
    ["s'arrêter", "anhalten"],
    ["se cacher", "sich verstecken"],
    ["se rencontrer", "sich treffen"],
    ["tôt", "früh"],
    ["tard", "spät"],
    ["le petit déjeuner", "das Frühstück"]
  ],
  phrases: [
    ["Je me lève à six heures.", "Ich stehe um sechs auf."],
    ["Tu te dépêches ?", "Beeilst du dich?"],
    ["Il s'est couché tard.", "Er ist spät ins Bett gegangen."],
    ["Nous nous sommes bien amusés.", "Wir haben uns gut amüsiert."],
    ["Je ne me souviens pas.", "Ich erinnere mich nicht."],
    ["Ne t'inquiète pas.", "Mach dir keine Sorgen."]
  ],
  grammar: [
    {
      id: "g1", titel: "Reflexive Verben im Präsens",
      regel: "Das Reflexivpronomen passt sich der Person an und steht VOR dem Verb. Nur die Pronomen sind neu – das Verb selbst konjugierst du ganz normal.",
      tabelle: [
        ["je me lève", "ich stehe auf"],
        ["tu te lèves", "du stehst auf"],
        ["il / elle se lève", "er / sie steht auf"],
        ["nous nous levons", "wir stehen auf"],
        ["vous vous levez", "ihr steht auf"],
        ["ils / elles se lèvent", "sie stehen auf"]
      ],
      tipp: "Verneinung umklammert BEIDES: 'Je ne me lève pas.' Das ne kommt ganz nach vorn, vor das Pronomen.",
      drills: [
        ["Je ___ lève à sept heures.", "me", ["me", "te", "se"]],
        ["Tu ___ dépêches ?", "te", ["te", "se", "me"]],
        ["Il ___ couche tard.", "se", ["se", "me", "te"]],
        ["Nous ___ reposons.", "nous", ["nous", "se", "vous"]],
        ["Ils ___ amusent.", "s'", ["s'", "se", "nous"]],
        ["Konjugiere: 'elle' + se laver", "elle se lave"],
        ["Verneine: 'Je me souviens.'", "Je ne me souviens pas."]
      ]
    },
    {
      id: "g2", titel: "Reflexive Verben im Passé composé",
      regel: "Reflexive Verben nehmen IMMER être. Ohne Ausnahme. Und das Partizip gleicht sich an.",
      tabelle: [
        ["je me suis levé(e)", "ich bin aufgestanden"],
        ["tu t'es levé(e)", "du bist aufgestanden"],
        ["il s'est levé / elle s'est levée", "er / sie"],
        ["nous nous sommes levé(e)s", "wir"],
        ["ils se sont levés / elles se sont levées", "sie"],
        ["Je ne me suis pas levé.", "Verneinung"]
      ],
      tipp: "Wenn ein Verb ein 'se' im Infinitiv hat, brauchst du im Passé composé nie über avoir nachzudenken. Immer être.",
      drills: [
        ["Je ___ suis levé tôt.", "me", ["me", "m'ai", "se"]],
        ["Elle ___ couchée à minuit. (s'est/a)", "s'est", ["s'est", "a", "est"]],
        ["Nous nous ___ amusés.", "sommes", ["sommes", "avons", "êtes"]],
        ["Ils ___ sont dépêchés.", "se", ["se", "s'", "nous"]],
        ["Setze ins Passé composé: 'Je me lève.'", "Je me suis levé."],
        ["Setze ins Passé composé: 'Elle se repose.'", "Elle s'est reposée."],
        ["Was ist richtig?", "Il s'est trompé.", ["Il s'est trompé.", "Il a se trompé.", "Il s'a trompé."]]
      ]
    }
  ]
},

{
  id: "m23", saison: 4, nr: 23,
  titel: "Was passieren wird",
  thema: "Futur simple",
  ziel: "Du kannst die echte Zukunft bilden – das erwartet die Klassenarbeit in Klasse 9.",
  vocab: [
    ["l'avenir", "die Zukunft"],
    ["un jour", "eines Tages"],
    ["dans deux jours", "in zwei Tagen"],
    ["la suite", "die Fortsetzung"],
    ["la fin", "das Ende"],
    ["le début", "der Anfang"],
    ["la mission", "der Auftrag"],
    ["le danger", "die Gefahr"],
    ["la chance", "das Glück, die Chance"],
    ["échouer", "scheitern"],
    ["promettre", "versprechen"],
    ["protéger", "beschützen"],
    ["changer", "ändern"],
    ["décider", "entscheiden"],
    ["espérer", "hoffen"],
    ["continuer", "weitermachen"]
  ],
  phrases: [
    ["Je partirai demain.", "Ich werde morgen abreisen."],
    ["Tu verras, ça ira.", "Du wirst sehen, es wird gehen."],
    ["On se reverra.", "Wir werden uns wiedersehen."],
    ["Quand j'aurai le temps, je t'appellerai.", "Wenn ich Zeit habe, rufe ich dich an."],
    ["Il ne reviendra pas.", "Er wird nicht zurückkommen."],
    ["Tout ira bien.", "Alles wird gut."]
  ],
  grammar: [
    {
      id: "g1", titel: "Futur simple bilden",
      regel: "Nimm den INFINITIV und häng die Endungen von avoir an. Bei -re-Verben fällt das -e weg. Die Endungen sind für alle Verben identisch.",
      tabelle: [
        ["je parlerai", "-ai"], ["tu parleras", "-as"], ["il parlera", "-a"],
        ["nous parlerons", "-ons"], ["vous parlerez", "-ez"], ["ils parleront", "-ont"],
        ["finir → je finirai", "-ir bleibt"],
        ["attendre → j'attendrai", "-re verliert das e"]
      ],
      tipp: "Die Endungen sind genau ai, as, a, ons, ez, ont – das ist avoir. Wenn du avoir kannst, kannst du das Futur.",
      drills: [
        ["Futur: je ___ (parler)", "parlerai"],
        ["Futur: tu ___ (finir)", "finiras"],
        ["Futur: il ___ (attendre)", "attendra"],
        ["Futur: nous ___ (jouer)", "jouerons"],
        ["Futur: vous ___ (partir)", "partirez"],
        ["Futur: ils ___ (choisir)", "choisiront"]
      ]
    },
    {
      id: "g2", titel: "Die unregelmäßigen Stämme",
      regel: "Etwa zehn häufige Verben haben einen eigenen Stamm. Die Endungen bleiben aber genau gleich. Lern die Stämme als Liste.",
      tabelle: [
        ["être → je serai", "aller → j'irai"],
        ["avoir → j'aurai", "faire → je ferai"],
        ["venir → je viendrai", "voir → je verrai"],
        ["pouvoir → je pourrai", "vouloir → je voudrai"],
        ["devoir → je devrai", "savoir → je saurai"],
        ["il y a → il y aura", "falloir → il faudra"]
      ],
      tipp: "Fast alle unregelmäßigen Stämme haben ein doppeltes r oder ein -dr-: aurai, serai, ferai, irai, viendrai, verrai, pourrai. Das Ohr merkt sich das.",
      drills: [
        ["Futur: je ___ (être)", "serai"],
        ["Futur: j'___ (avoir)", "aurai"],
        ["Futur: j'___ (aller)", "irai"],
        ["Futur: je ___ (faire)", "ferai"],
        ["Futur: je ___ (venir)", "viendrai"],
        ["Futur: je ___ (voir)", "verrai"],
        ["Futur: je ___ (pouvoir)", "pourrai"],
        ["Futur: tu ___ (savoir)", "sauras"],
        ["Futur: il y ___ (avoir)", "aura"],
        ["'Alles wird gut.' → Tout ___ bien.", "ira", ["ira", "allera", "irait"]]
      ]
    }
  ]
},

{
  id: "m24", saison: 4, nr: 24,
  titel: "Wenn ich du wäre",
  thema: "Conditionnel und si-Sätze",
  ziel: "Du kannst höflich formulieren und Bedingungen ausdrücken.",
  vocab: [
    ["si", "wenn, falls"],
    ["à ta place", "an deiner Stelle"],
    ["au cas où", "für den Fall, dass"],
    ["sans", "ohne"],
    ["avec", "mit"],
    ["contre", "gegen"],
    ["pour", "für"],
    ["malgré", "trotz"],
    ["quand même", "trotzdem"],
    ["franchement", "ehrlich gesagt"],
    ["vraiment", "wirklich"],
    ["peut-être", "vielleicht"],
    ["dommage", "schade"],
    ["d'accord", "einverstanden"],
    ["bien sûr", "natürlich"],
    ["en fait", "eigentlich"]
  ],
  phrases: [
    ["Je voudrais un café, s'il vous plaît.", "Ich hätte gern einen Kaffee, bitte."],
    ["Tu pourrais m'aider ?", "Könntest du mir helfen?"],
    ["À ta place, je partirais.", "An deiner Stelle würde ich gehen."],
    ["Si j'avais le temps, je viendrais.", "Wenn ich Zeit hätte, würde ich kommen."],
    ["Si tu veux, on peut y aller.", "Wenn du willst, können wir hingehen."],
    ["Ce serait génial.", "Das wäre super."]
  ],
  grammar: [
    {
      id: "g1", titel: "Conditionnel présent",
      regel: "Gleicher Stamm wie das Futur – aber die Endungen des Imparfait. Wenn du Futur und Imparfait kannst, kannst du das Conditionnel geschenkt.",
      tabelle: [
        ["Stamm vom Futur", "Endungen vom Imparfait"],
        ["je parlerais", "-ais"], ["tu parlerais", "-ais"], ["il parlerait", "-ait"],
        ["nous parlerions", "-ions"], ["vous parleriez", "-iez"], ["ils parleraient", "-aient"],
        ["être → je serais / avoir → j'aurais", "unregelmäßige Stämme bleiben"]
      ],
      tipp: "je parlerai (Futur, sicher) gegen je parlerais (Conditionnel, hypothetisch). Ein einziges s macht den Unterschied – in der Arbeit ein beliebter Fehler.",
      drills: [
        ["Conditionnel: je ___ (aimer)", "aimerais"],
        ["Conditionnel: tu ___ (pouvoir)", "pourrais"],
        ["Conditionnel: il ___ (être)", "serait"],
        ["Conditionnel: nous ___ (avoir)", "aurions"],
        ["Conditionnel: ils ___ (venir)", "viendraient"],
        ["Höflich: 'Ich hätte gern' = Je ___", "voudrais"],
        ["Was ist Conditionnel?", "je ferais", ["je ferais", "je ferai", "je faisais"]]
      ]
    },
    {
      id: "g2", titel: "Die si-Sätze",
      regel: "Zwei Typen, zwei feste Formeln. Nach 'si' steht NIE ein Futur und NIE ein Conditionnel.",
      tabelle: [
        ["Typ 1: si + présent → futur", "Si tu viens, on ira au cinéma."],
        ["Typ 1 auch mit Präsens", "Si tu veux, on peut y aller."],
        ["Typ 2: si + imparfait → conditionnel", "Si j'avais le temps, je viendrais."],
        ["FALSCH: Si je serais...", "nach si nie Conditionnel!"],
        ["FALSCH: Si tu viendras...", "nach si nie Futur!"]
      ],
      tipp: "Merksatz für die Arbeit: 'Nach si kein rai und kein rais.' Wenn du das beachtest, kannst du bei si-Sätzen kaum noch Punkte verlieren.",
      drills: [
        ["Si tu ___ (venir), on ira au cinéma.", "viens"],
        ["Si j'___ (avoir) le temps, je viendrais.", "avais"],
        ["Si j'avais de l'argent, j'___ (acheter) une moto.", "achèterais"],
        ["Si tu veux, on ___ (pouvoir) sortir.", "peut"],
        ["Si elle ___ (être) là, elle nous aiderait.", "était"],
        ["Was ist richtig?", "Si j'étais riche, je voyagerais.", ["Si j'étais riche, je voyagerais.", "Si je serais riche, je voyagerais."]],
        ["Was ist richtig?", "Si tu viens, je serai content.", ["Si tu viens, je serai content.", "Si tu viendras, je serai content."]]
      ]
    }
  ]
}

);
