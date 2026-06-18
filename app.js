const STORAGE_KEY = "slinnva-workshop-platform-v1";

const bingoStatements = [
  "Je krijgt een WhatsApp-bericht van een familielid met een nieuw nummer en een dringend betaalverzoek.",
  "Een winactie vraagt eerst om je bankgegevens voordat je de prijs kunt ontvangen.",
  "Een account met bijna dezelfde naam als een bekende stuurt je een privébericht.",
  "In een video lijkt een bekende Nederlander een investering aan te raden.",
  "Een influencer deelt alleen gewonnen weddenschappen en nooit de verliezen.",
  "Een game biedt een betaalde verrassingsdoos waarvan je de inhoud vooraf niet kent.",
  "Een sms over een pakket bevat een korte, onbekende link.",
  "Een webshop verkoopt populaire schoenen met negentig procent korting.",
  "Een thuiswerkvacature belooft veel geld zonder gesprek of ervaring.",
  "Een online contact zegt dat jullie gesprekken geheim moeten blijven.",
  "Een onbekend nummer belt meerdere keren en laat geen bericht achter.",
  "Een stem klinkt precies als die van je kind, maar het telefoonnummer klopt niet.",
  "Een aanbieding lijkt zo goed dat je bang bent hem mis te lopen.",
  "Een bankmedewerker vraagt om je verificatiecode.",
  "Een QR-code over de originele code op een betaalautomaat leidt naar een website.",
  "Een verkoopsite vraagt je buiten het platform verder te praten.",
  "Iemand wil geld naar je overmaken, maar zegt dat jij eerst één cent moet betalen.",
  "Een bericht gebruikt dreigende taal en zegt dat je account vandaag wordt gesloten.",
  "Een profiel heeft alleen perfecte foto’s en weigert te videobellen.",
  "Een online liefde vraagt na korte tijd geld voor een noodgeval.",
  "Een zogenaamde klantenservice vraagt om een foto van je bankpas.",
  "Een e-mail van school vraagt je opnieuw in te loggen via een onbekend webadres.",
  "Een vriend vraagt of je een zescijferige code wilt doorsturen.",
  "Een advertentie gebruikt een aftelklok die steeds opnieuw begint.",
  "Een influencer noemt reclame een persoonlijke tip zonder duidelijk te zeggen dat die betaald is.",
  "Een game laat zien dat je bijna een zeldzame prijs had gewonnen.",
  "Een goksite geeft een bonus die je pas na veel inzetten kunt opnemen.",
  "Een livestreamer moedigt minderjarigen aan om mystery boxes te kopen.",
  "Een nepnieuwsbericht heeft een schokkende titel maar noemt geen betrouwbare bron.",
  "Een AI-chatbot doet alsof hij een echte medewerker van een bedrijf is.",
  "Een video heeft vreemde mondbewegingen die niet helemaal bij de stem passen.",
  "Een foto van een ramp wordt gedeeld zonder datum of locatie.",
  "Een bericht vraagt je meteen te handelen voordat je iemand kunt bellen.",
  "Een onbekende vraagt in een game om naar een privé-app over te stappen.",
  "Iemand geeft digitale cadeaus en verwacht later persoonlijke foto’s terug.",
  "Een contact wordt boos wanneer je niet direct reageert.",
  "Een profiel vraagt om je locatie om een prijs te bezorgen.",
  "Een app vraagt toegang tot je contacten terwijl dat niet nodig lijkt.",
  "Je krijgt een melding van een login uit een land waar je niet bent.",
  "Je gebruikt voor je e-mail hetzelfde wachtwoord als voor een game.",
  "Een openbaar profiel toont school, woonplaats en dagelijkse locaties.",
  "Een foto wordt zonder toestemming uit een groepschat doorgestuurd.",
  "Een anoniem account plaatst kwetsende polls over iemand.",
  "Iemand dreigt privébeelden te verspreiden als je niet betaalt.",
  "Een bericht zegt: als je mij vertrouwt, stuur je een foto.",
  "Een online bekende vertelt steeds verschillende verhalen over leeftijd en woonplaats.",
  "Een modelscout wil alleen via privéberichten contact en vraagt om geheimhouding.",
  "Een nep-influencer vraagt administratiekosten voor een samenwerking.",
  "Een cryptoadvertentie belooft gegarandeerd rendement zonder risico.",
  "Een donatieverzoek gebruikt heftige beelden maar noemt geen officiële organisatie.",
  "Een nep-bezorgdienst vraagt een klein bedrag voor een pakket dat je niet verwacht.",
  "Een helpdesk belt onverwacht en wil op afstand je computer overnemen.",
  "Een bericht bevat veel taalfouten én gebruikt het logo van een bekende organisatie.",
  "Een website heeft geen adres, retourinformatie of normaal contactadres.",
  "Een betaalverzoek heeft een andere naam dan de persoon met wie je praat.",
  "Een populaire post heeft veel likes, maar de reacties lijken allemaal hetzelfde.",
  "Een video knipt vlak voor het belangrijkste bewijs weg.",
  "Een account vraagt je om herstelwoorden van een digitale portemonnee.",
  "Een online spel moedigt je aan direct opnieuw te betalen na verlies.",
  "Een onbekende weet opvallend veel door informatie op je openbare profiel."
];

const seed = {
  currentModule: 0,
  currentSlide: 0,
  screenMode: "slides",
  participantState: "join",
  selectedBingoCard: null,
  bingoCards: [],
  bingoPromptIndex: 0,
  bingoMarked: [],
  bingoStatus: "idle",
  bingoWinner: null,
  currentParticipantName: "",
  adminTab: "content",
  session: { organization: "Demo-organisatie", audience: "Gemengde groep", date: new Date().toISOString().slice(0, 10) },
  participants: [
    { name: "Fatima", age: 22, online: true },
    { name: "Jesse", age: 16, online: true },
    { name: "Meryem", age: 38, online: true },
    { name: "Henk", age: 67, online: true },
    { name: "Noah", age: 19, online: true },
    { name: "Samira", age: 44, online: true }
  ],
  poll: {
    question: "Waar maak jij je online het meeste zorgen over?",
    options: ["Oplichting", "Sociale media", "AI en nepbeelden", "Privacy", "Online pesten", "Anders"],
    votes: [5, 3, 4, 2, 1, 1]
  },
  bingoItems: [
    "Neppe winactie", "WhatsApp-fraude", "Nepaccount", "Deepfake", "Online gokken",
    "Loot box", "Vreemde link", "Nepwebshop", "Nepvacature", "Geheim houden",
    "Onbekend nummer", "AI-stem", "Te mooi om waar te zijn", "Phishingmail", "Betaalverzoek",
    "Nepklantenservice", "Romance scam", "QR-codefraude", "Verificatiecode", "Tijdsdruk",
    "Cryptobelofte", "Gestolen foto", "Onbekende login", "Openbaar profiel", "Mystery box",
    "Nepbezorger", "Gokbonus", "Privéchat", "Bankpasfoto", "Valse samenwerking"
  ],
  notes: [
    { date: new Date().toLocaleDateString("nl-NL"), module: "Algemeen", text: "Vraag bij de start welke online onderwerpen in deze groep leven." }
  ],
  versions: [
    { version: "1.0", status: "Definitief", date: "8 juni 2026" },
    { version: "1.1", status: "Concept", date: "Vandaag" }
  ],
  modules: [
    {
      id: "intro", title: "Welkom & verbinding", short: "Intro", duration: 5, enabled: true, type: "intro",
      goal: "Zorg voor een veilige, open sfeer en leg uit hoe deelnemers anoniem als groep meedoen.",
      script: `Welkom allemaal.\n\nMijn naam is Sharmilenka en ik ben de oprichter van Slinnva Professionals en Samen Actief & Verbonden.\n\nVandaag gaan we samen kijken naar wat er online speelt, hoe je risico’s herkent en hoe je sterker in je schoenen staat op internet en sociale media.\n\nJullie antwoorden worden alleen als groepsresultaat getoond. Het doel is niet om elkaar te beoordelen, maar om samen te ontdekken.`,
      background: ["De workshop is een gesprek, geen toets.", "Niemand hoeft persoonlijke ervaringen te delen.", "Gebruik fictieve namen bij voorbeelden."],
      questions: ["Wat betekent ‘sterk online’ voor jullie?", "Welk onderwerp hopen jullie vandaag te bespreken?"],
      terms: [{ term: "Online weerbaarheid", meaning: "Kunnen herkennen wat er gebeurt en bewust kiezen wat je doet." }]
    },
    {
      id: "poll", title: "Wat speelt er online?", short: "Openingspoll", duration: 5, enabled: true, type: "poll",
      goal: "Ontdek wat deelnemers bezighoudt en stem het gesprek af op de groep.",
      script: "Kijk rustig naar de onderwerpen op je telefoon. Kies waar jij je online het meeste zorgen over maakt. Er is geen goed of fout antwoord.",
      background: ["Benoem de top twee van de groep.", "Vraag één vrijwilliger waarom een onderwerp opvalt.", "Bewaar ruimte voor ‘anders’."],
      questions: ["Wat maakt dit onderwerp lastig?", "Is dit de afgelopen jaren veranderd?"],
      terms: []
    },
    {
      id: "social", title: "Sociale media & beïnvloeding", short: "Sociale media", duration: 8, enabled: true, type: "case",
      goal: "Herken hoe scrollgedrag, influencers, reclame en vergelijking online druk kunnen geven.",
      script: "Je ziet een korte video van een populaire influencer. Die vertelt enthousiast over een product, maar pas onderaan staat klein ‘betaalde samenwerking’. Hoe vrij is je keuze als reclame niet direct als reclame voelt?",
      background: ["Platforms kiezen wat aandacht vasthoudt.", "Veel likes zeggen niets over betrouwbaarheid.", "Vergelijken gebeurt vaak met zorgvuldig gekozen hoogtepunten."],
      questions: ["Wanneer voelt inspiratie als druk?", "Hoe herken je reclame bij een influencer?", "Wat helpt om bewust te stoppen met scrollen?"],
      terms: [{ term: "Algoritme", meaning: "Een systeem dat kiest welke berichten en video’s jij te zien krijgt." }]
    },
    {
      id: "gambling", title: "Online gokken", short: "Online gokken", duration: 7, enabled: true, type: "case",
      goal: "Maak zichtbaar hoe casino’s, sportweddenschappen en loot boxes spanning en verlies normaliseren.",
      script: "Een voetbalinfluencer deelt een ‘zekere weddenschap’ en geeft een bonuscode. Je ziet vooral winsten, nooit de verliezen. Wat doet zo’n voorbeeld met de grens tussen sport kijken en gokken?",
      background: ["Een loot box is een betaalde verrassingsbeloning in een game.", "Bonussen zijn gemaakt om te laten beginnen, niet om gratis geld te geven.", "Influencers kunnen betaald worden voor nieuwe spelers."],
      questions: ["Wanneer is een spel eigenlijk gokken?", "Waarom delen mensen hun winst vaker dan hun verlies?"],
      terms: [{ term: "Loot box", meaning: "Een digitaal verrassingspakket waarvoor je betaalt zonder vooraf te weten wat je krijgt." }]
    },
    {
      id: "ai", title: "AI & deepfakes", short: "AI & deepfakes", duration: 7, enabled: true, type: "case",
      goal: "Laat deelnemers vertragen en controleren wanneer beeld, stem of tekst overtuigend maar mogelijk nep is.",
      script: "Je krijgt een spraakbericht van een familielid dat in paniek om geld vraagt. De stem klinkt echt. Toch klopt het nummer niet. Wat controleer je voordat je handelt?",
      background: ["Stemmen en gezichten kunnen overtuigend worden nagemaakt.", "Niet elk vreemd beeld is een deepfake; controle blijft belangrijk.", "Bel via een nummer dat je al kende."],
      questions: ["Wat maakt een stem betrouwbaar voor jou?", "Welke tweede bron kun je gebruiken?"],
      terms: [{ term: "Deepfake", meaning: "Beeld of geluid dat met AI is gemaakt of veranderd, waardoor iemand iets lijkt te doen of zeggen." }]
    },
    {
      id: "fraud", title: "Online oplichting", short: "Oplichting", duration: 9, enabled: true, type: "case",
      goal: "Oefen met stoppen, controleren en hulp inschakelen bij WhatsApp-fraude, phishing en nepwebshops.",
      script: "Je ontvangt: ‘Hoi mam, dit is mijn nieuwe nummer. Mijn telefoon is kapot. Kun je deze rekening vandaag betalen?’ Wat doe je als eerste?",
      background: ["Oplichters gebruiken haast, vertrouwen en angst.", "Open nooit de link om te controleren; ga zelf naar de officiële app.", "Schaamte helpt de oplichter. Bespreken helpt het slachtoffer."],
      questions: ["Welke rode vlag zie je?", "Hoe controleer je dit zonder risico?", "Wie kun je bellen als je al hebt betaald?"],
      terms: [{ term: "Phishing", meaning: "Een nepbericht waarmee iemand je naar een valse website lokt om gegevens te stelen." }]
    },
    {
      id: "bingo", title: "Sterk Online Bingo", short: "Bingo", duration: 9, enabled: true, type: "bingo",
      goal: "Herhaal herkenbare signalen op een ontspannen manier en bespreek waarom vakjes risico’s kunnen zijn.",
      script: "Iedereen heeft een unieke digitale bingokaart. Ik lees situaties voor. Herken je het signaal op je kaart? Streep het af. Bij bingo controleer ik de kaart voordat we een winnaar bekendmaken.",
      background: ["Bingo is het spelelement; maak er geen kennistoets van.", "Vraag bij een vakje altijd: waarom is dit een signaal?", "Meerdere winnaars zijn mogelijk."],
      questions: ["Welk signaal herken je het snelst?", "Welk signaal wordt vaak onderschat?"],
      terms: []
    },
    {
      id: "finish", title: "Sterk afsluiten", short: "Afsluiting", duration: 5, enabled: true, type: "finish",
      goal: "Laat iedereen één concrete, haalbare actie kiezen en sluit hoopvol af.",
      script: "Sterk online zijn betekent niet dat je alles moet weten. Het betekent dat je durft te vertragen, te controleren en hulp te vragen. Kies één actie die jij vanaf vandaag wilt meenemen.",
      background: ["Herhaal: stop, check, praat.", "Deel passende hulpkanalen.", "Bedank deelnemers zonder prestaties te beoordelen."],
      questions: ["Welke kleine stap neem jij mee?", "Wie kun je om hulp vragen?"],
      terms: [{ term: "Digitale voetafdruk", meaning: "Alles wat iemand online over jou kan terugvinden." }]
    }
  ]
};

function defaultPresentation(id) {
  const presentations = {
    intro: [
      { kind:"headline", label:"Welkom", title:"Sterk Online", question:"Veilig, bewust en weerbaar online." },
      { kind:"question", label:"Startvraag", title:"Wat speelt er online?", question:"Waar denk jij als eerste aan?" },
      { kind:"join", label:"Meedoen", title:"Scan de QR-code", question:"Alleen voor aanmelden, de openingspoll en bingo." }
    ],
    poll: [
      { kind:"question", label:"Openingspoll", title:"Waar maak jij je online het meeste zorgen over?", question:"Kies één antwoord op je telefoon." },
      { kind:"question", label:"Gesprek", title:"Wat valt op?", question:"Waarom leeft dit onderwerp in deze groep?" }
    ],
    social: [
      { kind:"device", device:"instagram", label:"Instagram", title:"Wat zie je hier?", question:"Tip of reclame?" },
      { kind:"quote", label:"Influencer", title:"“Ik verdien €15.000 per maand met mijn telefoon.”", question:"Wat valt jou op?" },
      { kind:"question", label:"Gesprek", title:"Wanneer wordt inspiratie druk?", question:"Wie bepaalt wat jij blijft bekijken?" }
    ],
    gambling: [
      { kind:"device", device:"tiktok", label:"TikTok", title:"Wat blijft buiten beeld?", question:"Je ziet alleen de winst." },
      { kind:"quote", label:"Online gokken", title:"“Deze weddenschap kan bijna niet misgaan.”", question:"Waarom klinkt dit overtuigend?" },
      { kind:"question", label:"Gesprek", title:"Wanneer wordt een spel gokken?", question:"Denk ook aan loot boxes en mystery boxes." }
    ],
    ai: [
      { kind:"ai-compare", label:"AI & deepfake", title:"Welke is echt?", question:"Wat gebruik jij om dat te bepalen?" },
      { kind:"device", device:"ai", label:"AI-stem", title:"De stem klinkt echt.", question:"Wat controleer je eerst?" },
      { kind:"question", label:"Gesprek", title:"Kun je beeld en geluid nog vertrouwen?", question:"Welke tweede route gebruik je?" }
    ],
    fraud: [
      { kind:"device", device:"whatsapp", label:"WhatsApp", title:"Wat zou jij als eerste doen?", question:"“Hoi mam, dit is mijn nieuwe nummer.”" },
      { kind:"quote", label:"Oplichting", title:"“Het moet vandaag nog.”", question:"Wat doet haast met jouw keuze?" },
      { kind:"question", label:"Gesprek", title:"Waar gaat het hier mis?", question:"Stop. Controleer. Praat." }
    ],
    bingo: [
      { kind:"question", label:"Bingo", title:"Luister. Herken. Streep af.", question:"Wie heeft dit vakje kunnen afstrepen?" }
    ],
    finish: [
      { kind:"question", label:"Terugblik", title:"Wat neem jij mee?", question:"Noem één kleine stap." },
      { kind:"headline", label:"Afsluiting", title:"Blijf sterk online.", question:"Stop. Controleer. Praat." }
    ]
  };
  return structuredClone(presentations[id] || [
    { kind:"question", label:"Praktijksituatie", title:"Wat valt je op?", question:"Wat zou jij doen?" }
  ]);
}

function hydrateModule(module) {
  return {
    practicalTips: ["Vertraag voordat je klikt, betaalt of deelt.", "Controleer via een route die je zelf al kende.", "Vraag iemand om mee te kijken."],
    help: ["Fraudehelpdesk: fraudehelpdesk.nl", "Politie: 0900-8844, bij spoed 112", "Slachtofferhulp Nederland: slachtofferhulp.nl"],
    presentation: defaultPresentation(module.id),
    ...module,
    presentation: Array.isArray(module.presentation) && module.presentation.length ? module.presentation : defaultPresentation(module.id)
  };
}

function createStoryWorkshop() {
  const sharedHelp = ["Bewaak vrijwilligheid: niemand hoeft een persoonlijk verhaal te delen.", "Spreek vooraf af wat wel en niet in de uiteindelijke aflevering komt.", "Vraag altijd toestemming voordat een opname wordt gepubliceerd."];
  const weeks = [
    {
      id:"voice", title:"Ontdek jouw stem", short:"Jouw stem", duration:75,
      goal:"Deelnemers ontdekken wat een podcast is en welk verhaal zij willen vertellen.",
      script:"Open de bijeenkomst in de podcaststudio-sfeer. Leg uit dat dit traject niet draait om perfecte stemmen of technische kennis, maar om verhalen die ertoe doen. Bespreek kort verschillende vormen: interview, gesprek, reportage en persoonlijk verhaal. Laat deelnemers daarna drie ingangen invullen: iets waar ik graag over praat, iets wat mensen vaak verkeerd begrijpen en een verhaal dat verteld moet worden.",
      planning:["10 min welkom en studio-intro","15 min luisteren naar korte podcastvormen","25 min persoonlijk verhalenwerkblad","20 min delen in kleine groepen","5 min vooruitblik"],
      questions:["Welk verhaal hoor je zelden?","Wanneer luister jij echt naar iemand?","Wat maakt een stem prettig om naar te luisteren?"],
      exercises:["Individueel verhalenwerkblad","Delen in drietallen","Kies één verhaalzin die blijft hangen"],
      responses:["Deelnemers noemen vaak familie, school, cultuur, vriendschap of een belangrijke verandering.","Sommigen denken dat hun verhaal niet bijzonder genoeg is; benadruk dat herkenning juist krachtig kan zijn."],
      quiet:["Laat eerst schrijven voordat iemand spreekt.","Laat deelnemers kiezen of een ander hun zin voorleest."],
      busy:["Werk met een zichtbare spreektijd per persoon.","Gebruik een voorwerp als praatmicrofoon."],
      slides:[
        {kind:"studio",label:"Week 1",title:"Welk verhaal verdient het om gehoord te worden?",question:"Ontdek jouw stem."},
        {kind:"prompt",label:"Jouw verhaal",title:"Wat begrijpen mensen vaak verkeerd?",question:"Schrijf één zin op."}
      ]
    },
    {
      id:"listen", title:"Leren luisteren", short:"Luisteren", duration:75,
      goal:"Deelnemers leren luisteren en doorvragen als interviewer.",
      script:"Maak het verschil voelbaar tussen horen en luisteren. Demonstreer eerst een slecht interview en daarna een aandachtig gesprek. Behandel open en gesloten vragen, doorvragen, samenvatten, stiltes en respectvol reageren. Laat tweetallen vijf minuten interviewen en daarna wisselen. De luisteraar mag niet meteen een eigen verhaal vertellen.",
      planning:["10 min luisterdemonstratie","15 min vraagsoorten","30 min interviews in tweetallen","15 min nabespreking","5 min afronding"],
      questions:["Wanneer voel jij dat iemand echt luistert?","Welke vraag nodigde uit tot een verhaal?","Wat deed een stilte met het gesprek?"],
      exercises:["Automatische oefenkaart trekken","Interview van vijf minuten","Vat het verhaal van de ander samen in één zin"],
      responses:["Open vragen leveren langere antwoorden op.","Stilte voelt eerst ongemakkelijk, maar geeft vaak verdieping."],
      quiet:["Geef vragen vooraf op papier.","Laat de deelnemer starten als interviewer in plaats van verteller."],
      busy:["Gebruik een timer en vaste wisselmomenten.","Laat observatoren één luisterkwaliteit noteren."],
      slides:[
        {kind:"wave",label:"Week 2",title:"Horen en luisteren zijn niet hetzelfde.",question:"Wat merk jij aan een goede luisteraar?"},
        {kind:"prompt",label:"Interview",title:"Vraag door op één woord.",question:"Vijf minuten. Daarna wisselen."}
      ]
    },
    {
      id:"topic", title:"Wat speelt er echt?", short:"Onderwerp", duration:75,
      goal:"De groep haalt onderwerpen op, clustert ideeën en kiest een podcastthema.",
      script:"Start breed en zonder oordeel. Iedereen schrijft ideeën op digitale post-its. Lees ze hardop, zoek overeenkomsten en cluster samen. Nodig stille deelnemers uit door eerst individueel te laten schrijven. Sluit af met een stemronde waarbij deelnemers niet alleen op populariteit, maar ook op haalbaarheid en betekenis letten.",
      planning:["10 min centrale startvraag","20 min digitale post-its","20 min clusteren","15 min stemronde","10 min keuze en motivatie"],
      questions:["Wat leeft er echt in deze groep?","Welk onderwerp verdient meer aandacht?","Wie moeten we hierover horen?"],
      exercises:["Digitale brainstormwand","Ideeën clusteren","Stemronde met twee stemmen per persoon"],
      responses:["Onderwerpen lopen vaak uiteen; zoek een gedeelde vraag in plaats van één identieke ervaring.","Een concreet onderwerp werkt beter dan een heel breed thema."],
      quiet:["Laat anoniem post-its toevoegen.","Vraag welke post-it iemand nieuwsgierig maakt, niet welke van henzelf is."],
      busy:["Cluster pas nadat iedereen heeft geschreven.","Beperk de eindkeuze tot drie haalbare thema’s."],
      slides:[
        {kind:"wall",label:"Week 3",title:"Wat speelt er echt?",question:"Zet jouw idee op de wand."},
        {kind:"prompt",label:"Kiezen",title:"Welk onderwerp brengt mensen in gesprek?",question:"Geef twee stemmen."}
      ]
    },
    {
      id:"concept", title:"Maak je podcast", short:"Podcastcanvas", duration:90,
      goal:"De groep maakt een helder podcastconcept met naam, rollen en opbouw.",
      script:"Vertaal het gekozen onderwerp naar een aflevering. Werk van groot naar concreet: voor wie maken we dit, welke centrale vraag beantwoorden we en wat moet een luisteraar voelen of begrijpen? Vul daarna naam, intro, outro, rollen en structuur in. Houd het concept uitvoerbaar binnen één opname.",
      planning:["10 min gekozen thema terughalen","20 min doelgroep en centrale vraag","30 min podcastcanvas","20 min rollen verdelen","10 min pitch"],
      questions:["Waarom zou iemand blijven luisteren?","Welke titel maakt nieuwsgierig zonder te overdrijven?","Wat moet na afloop blijven hangen?"],
      exercises:["Podcastcanvas invullen","Titelstorm","Pitch het concept in dertig seconden"],
      responses:["Titels zijn eerst vaak te algemeen; zoek een concreet beeld, citaat of vraag.","Een aflevering wordt sterker met één centrale lijn."],
      quiet:["Laat rollen ook achter de schermen kiezen.","Gebruik schrijven of redactie als volwaardige bijdrage."],
      busy:["Benoem één eindredacteur die keuzes samenvat.","Zet ideeën op een parkeerplaats voor een volgende aflevering."],
      slides:[
        {kind:"canvas",label:"Week 4",title:"Van idee naar aflevering.",question:"Naam · onderwerp · rollen · opbouw"},
        {kind:"prompt",label:"Podcastpitch",title:"Waarom wil iemand dit horen?",question:"Vertel het in dertig seconden."}
      ]
    },
    {
      id:"record", title:"Opnemen", short:"Opnamestudio", duration:90,
      goal:"De groep neemt samen een echte podcastaflevering op.",
      script:"Maak van de ruimte een studio. Verdeel host, co-host, interviewer, gast, techniek, tijdsbewaker en redactie. Oefen microfoonafstand, ademhaling, volume en een rustige start. Neem eerst een korte proef op en luister samen terug. Start daarna de echte opname. Laat kleine stiltes bestaan; die zijn later makkelijker te monteren dan door elkaar praten.",
      planning:["15 min studio en rollen klaarzetten","15 min stem- en microfoonoefening","10 min proefopname","40 min echte opname","10 min eerste terugluistering"],
      questions:["Wat helpt tegen zenuwen?","Wanneer klinkt een gesprek natuurlijk?","Wie bewaakt de rode draad?"],
      exercises:["Microfooncheck","Proefintro opnemen","Volledige aflevering opnemen"],
      responses:["De eerste minuut klinkt vaak gespannen; een korte warming-up helpt.","De techniekrol heeft ook verantwoordelijkheid voor rust in de ruimte."],
      quiet:["Bied redactie, techniek of tijdsbewaking als gelijkwaardige rol.","Neem een korte bijdrage apart op."],
      busy:["Gebruik duidelijke handsignalen voor tijd en stilte.","Pauzeer wanneer meerdere mensen door elkaar spreken."],
      slides:[
        {kind:"record",label:"Week 5",title:"Studio klaar. Adem in.",question:"Opname over 3 · 2 · 1"},
        {kind:"prompt",label:"Tijdens de opname",title:"Praat met elkaar, niet tegen de microfoon.",question:"Laat stiltes bestaan."}
      ]
    },
    {
      id:"publish", title:"Van opname naar aflevering", short:"Publiceren", duration:90,
      goal:"Deelnemers ronden de aflevering af, reflecteren en ontvangen een certificaat.",
      script:"Luister gericht terug en kies wat de aflevering nodig heeft. Behandel alleen de basis: een duidelijke intro, een passende outro, storende stukken inkorten, titel en beschrijving schrijven. Bespreek opnieuw toestemming voor publicatie. Laat iedere deelnemer reflecteren op wat is geleerd, wat moeilijk was en waar diegene trots op is. Rond af met de podcast en certificaten.",
      planning:["20 min gericht terugluisteren","25 min basismontage en keuzes","15 min titel en beschrijving","15 min reflectie","15 min première en certificaten"],
      questions:["Welk moment moet zeker blijven?","Wat kan korter zonder het verhaal te verliezen?","Waar ben jij trots op?"],
      exercises:["Maak titel en beschrijving","Eindreflectie invullen","Gezamenlijke première"],
      responses:["De groep wil vaak alles bewaren; laat de centrale vraag leidend zijn.","Trots kan ook zitten in luisteren, techniek of samenwerking."],
      quiet:["Laat reflectie eerst schriftelijk invullen.","Geef de keuze om trots via de trainer te laten voorlezen."],
      busy:["Werk met één gezamenlijke beslisregel.","Plan verbeterideeën voor een volgende aflevering."],
      slides:[
        {kind:"publish",label:"Week 6",title:"Jullie verhaal wordt een aflevering.",question:"Wat moet de luisteraar onthouden?"},
        {kind:"prompt",label:"Terugblik",title:"Waar ben jij trots op?",question:"Dit hebben jullie samen gemaakt."}
      ]
    }
  ];
  return {
    variant:"school", currentWeek:0, currentSlide:0, participantState:"profile", adminTab:"content",
    session:{organization:"Demo-school",audience:"Jongeren",weeks:6,duration:75},
    participants:[
      {name:"Aya",progress:4,forms:3,certificate:false},{name:"Milan",progress:4,forms:3,certificate:false},
      {name:"Yara",progress:3,forms:2,certificate:false},{name:"Omar",progress:4,forms:3,certificate:false}
    ],
    profile:{name:"",talkAbout:"",misunderstood:"",story:""},
    postIts:[], canvas:{name:"",subject:"",intro:"",outro:"",roles:"",structure:""},
    reflection:{learned:"",difficult:"",proud:""}, notes:[], recordings:[], certificates:[],
    variantTopics:{school:["Schoolervaringen","Sociale media","Prestatiedruk","Mentale gezondheid","Vriendschap","Toekomst","Respect","Diversiteit"],community:["Verhalen uit de buurt","Tradities","Eenzaamheid","Vrijwilligerswerk","Generaties","Cultuur","Dromen voor de buurt"]},
    guestSpeakers:{school:["Docent","Mentor","Schoolleider","Conciërge","Oud-leerling","Jongerenwerker"],community:["Buurtbewoner","Vrijwilliger","Wijkagent","Lokale ondernemer","Gemeentemedewerker","Jongerenwerker"]},
    versions:[{version:"1.0",status:"Concept",date:"Vandaag"}],
    certificateText:"Heeft met inzet deelgenomen aan Verhalen die Verbinden – Van gesprek naar podcast.",
    help:sharedHelp, weeks
  };
}

function storySlideBlueprints() {
  return {
    voice:[
      {kind:"studio",interaction:"discover",trainerTitle:"Wat is een podcast?",trainerBlock:"Gebruik de studio om vier podcastvormen zichtbaar te maken: storytelling, gesprek, interview en persoonlijk verhaal. Leg niet eerst een definitie uit. Vraag wat deelnemers herkennen en verbind hun antwoorden aan de vormen rond de microfoon."},
      {kind:"prompt",interaction:"story-cards",trainerTitle:"Een verhaal vinden",trainerBlock:"Laat deelnemers kiezen welke ingang het makkelijkst voelt: iets waar je graag over praat, iets wat vaak verkeerd wordt begrepen of een verhaal dat gehoord moet worden. Geef denktijd voordat iemand deelt."}
    ],
    listen:[
      {kind:"wave",interaction:"listen-compare",trainerTitle:"Horen of luisteren",trainerBlock:"Vergelijk twee interviewers aan dezelfde podcasttafel. Benoem daarna aandacht, oogcontact, stilte, samenvatten en doorvragen. Vraag eerst wat de groep zelf in de scène ziet."},
      {kind:"prompt",interaction:"question-sort",trainerTitle:"Open en gesloten vragen",trainerBlock:"Laat de groep de vraagkaartjes sorteren. Een gesloten vraag levert vaak een kort antwoord op. Een open vraag begint bijvoorbeeld met wat, hoe of vertel eens en nodigt uit tot een verhaal."}
    ],
    topic:[
      {kind:"wall",interaction:"postit-vote",trainerTitle:"Onderwerpen ophalen",trainerBlock:"Gebruik de muur als gezamenlijke inventarisatie. Lees ideeën zonder oordeel voor, zoek overeenkomsten en voeg post-its samen. Zorg dat eerst iedereen zelfstandig een idee kan toevoegen."},
      {kind:"prompt",interaction:"topic-cluster",trainerTitle:"Van ideeën naar één onderwerp",trainerBlock:"Laat deelnemers kiezen welk cluster betekenisvol, haalbaar en interessant is voor een luisteraar. Populariteit alleen is niet genoeg; zoek een centrale vraag die meerdere ervaringen verbindt."}
    ],
    concept:[
      {kind:"canvas",interaction:"canvas-cards",trainerTitle:"Het podcastconcept",trainerBlock:"Open de productiekaartjes één voor één: naam, doelgroep, gast, onderwerp en belangrijkste vraag. Laat de groep per kaart één duidelijke keuze maken. Bewaak dat alles dezelfde centrale lijn ondersteunt."},
      {kind:"prompt",interaction:"episode-timeline",trainerTitle:"De aflevering opbouwen",trainerBlock:"Bouw samen de tijdlijn van opening naar gesprek en afsluiting. Leg uit dat een goede aflevering de luisteraar snel laat weten waar het over gaat en eindigt met iets dat blijft hangen."}
    ],
    record:[
      {kind:"record",interaction:"role-cards",trainerTitle:"Rollen in de studio",trainerBlock:"Verdeel de rollen zichtbaar. Benadruk dat host, gast, techniek, redactie en tijdsbewaker allemaal nodig zijn. Laat deelnemers een rol kiezen die past, ook als zij liever niet spreken."},
      {kind:"prompt",interaction:"host-scenario",trainerTitle:"Doorvragen tijdens de opname",trainerBlock:"Lees het antwoord van de gast en laat de groep kiezen wat de host hierna vraagt. Bespreek waarom nieuwsgierig doorvragen sterker is dan meteen een eigen ervaring vertellen."}
    ],
    publish:[
      {kind:"publish",interaction:"mixing-panel",trainerTitle:"Van opname naar aflevering",trainerBlock:"Gebruik het mixing panel om alleen de basis te behandelen: intro, gesprek, storende pauzes en outro. Laat de centrale vraag bepalen wat blijft en wat korter kan."},
      {kind:"prompt",interaction:"launch",trainerTitle:"Première en reflectie",trainerBlock:"Vier wat de groep samen heeft gemaakt. Speel een fragment af, laat deelnemers benoemen waarop zij trots zijn en controleer toestemming voordat de aflevering wordt gedeeld."}
    ]
  };
}

function hydrateStoryWorkshop(story) {
  const defaults=createStoryWorkshop();
  const merged={...defaults,...story};
  if (story?.contentVersion==="mic-on-v1") return applyMicOnContent(merged);
  merged.weeks=(story.weeks||defaults.weeks).map((week,weekIndex)=>{
    const blueprint=storySlideBlueprints()[week.id]||[];
    return {...defaults.weeks[weekIndex],...week,slides:(week.slides||defaults.weeks[weekIndex].slides).map((slide,slideIndex)=>({...slide,...blueprint[slideIndex]}))};
  });
  return applyMicOnContent(merged);
}

function applyMicOnContent(story) {
  if (story.contentVersion==="mic-on-v1") {
    story.qrResults ||= {};
    story.qrActiveWeek ??= null;
    story.qrMode ||= "idle";
    return story;
  }
  const editions = {
    school: {
      label:"School editie",
      brainstorm:"Als jij één ding op school mocht veranderen, wat zou dat zijn?",
      topics:["Wat speelt er op school","Wat studenten willen veranderen","Prestatiedruk","Sociale media","Vriendschap","Pesten","Mentale gezondheid","Toekomst","Stages","Geld","Respect","Veiligheid op school","Wat volwassenen niet begrijpen van jongeren"],
      guests:["Docent","Mentor","Schoolleider","Conciërge","Jongerenwerker","Oud-leerling","Gastspreker","Wijkagent"]
    },
    community: {
      label:"Buurthuis editie",
      brainstorm:"Welk verhaal uit deze buurt mag niet verloren gaan?",
      topics:["Verhalen uit de buurt","Vroeger en nu","Opgroeien in de wijk","Cultuur","Familieverhalen","Eenzaamheid","Ontmoeting","Vrijwilligerswerk","Dromen voor de buurt","Generaties","Wat jongeren en ouderen van elkaar kunnen leren"],
      guests:["Buurtbewoner","Vrijwilliger","Wijkagent","Jongerenwerker","Lokale ondernemer","Ouderenwerker","Gemeentemedewerker"]
    }
  };
  const weeks = [
    {
      id:"voice",title:"Iedereen heeft een verhaal",short:"Jouw verhaal",duration:75,
      goal:"Deelnemers begrijpen hoe het zesweekse traject van gesprek naar echte podcastaflevering wordt opgebouwd.",
      script:"Een podcast is meer dan praten in een microfoon. Een goede podcast begint met een goed gesprek. Een goed gesprek begint met luisteren, nieuwsgierigheid en respect.\n\nLeg uit dat de groep in zes weken ontdekt waarover zij wil praten, wie zij wil interviewen, welke vragen nodig zijn, welke rollen bij hen passen, hoe een aflevering wordt opgebouwd en hoe zij opnemen, terugluisteren en verbeteren. Benadruk dat samenwerking nodig is: niet iedereen hoeft host te zijn om belangrijk te zijn voor de podcast.",
      planning:["10 min welkom en terugblik","10 min Podcast Radar via QR","20 min wat maakt een goede podcast?","20 min droomaflevering en editiebrainstorm","10 min reflectie","5 min opdracht voor week 2"],
      questions:["Waarom luisteren mensen graag naar echte gesprekken?","Wat maakt een verhaal interessant?","Over welk onderwerp kun jij een uur praten?"],
      exercises:["Podcast Radar","Puzzel van een goede podcast","Mijn droomaflevering","Editiebrainstorm"],
      responses:["Nieuwsgierigheid, herkenning, emotie en een duidelijke vraag maken gesprekken interessant.","Een goede podcast vraagt samenwerking tussen sprekers en mensen achter de schermen."],
      quiet:["Laat deelnemers eerst individueel een droomaflevering invullen.","Maak delen vrijwillig en laat ideeën anoniem via QR binnenkomen."],
      busy:["Gebruik de zeven puzzelstukken als vaste gesprekspunten.","Bewaar extra onderwerpen in de onderwerpbibliotheek."],
      mixed:["Laat voorbeelden uit verschillende leeftijden en leefwerelden naast elkaar bestaan.","Maak duo’s waarin deelnemers elkaar helpen hun idee concreet te maken."],
      qr:{title:"Podcast Radar",question:"Over welk soort gesprek zou jij willen luisteren?",type:"poll",options:["Een spannend verhaal","Een grappig gesprek","Een eerlijk interview","Iets waar ik iets van leer","Verhalen uit mijn school of buurt","Iets over de toekomst","Anders"]},
      worksheet:["Titel","Onderwerp","Gast","Waarom moeten mensen luisteren?"],
      slides:[
        {kind:"studio",interaction:"discover",label:"Mic On",title:"Mic On",question:"Van gesprek naar podcast",trainerTitle:"Welkom bij Mic On",trainerBlock:"Introduceer Mic On als een creatieve reis van zes weken. Vertel dat de groep samen toewerkt naar een echte aflevering."},
        {kind:"prompt",interaction:"story-cards",label:"Jouw stem",title:"Over welk onderwerp zou jij een uur kunnen praten?",question:"Kies één verhaalrichting.",trainerTitle:"Verhalen ophalen",trainerBlock:"Geef denktijd. Laat deelnemers kiezen vanuit interesse, ervaring of nieuwsgierigheid; het hoeft nog geen definitief podcastonderwerp te zijn."},
        {kind:"studio",interaction:"podcast-puzzle",label:"De podcastpuzzel",title:"Wat heeft een goede podcast nodig?",question:"Zeven stukken. Eén sterk gesprek.",trainerTitle:"De bouwstenen",trainerBlock:"Bespreek luisteren, goede vragen, respect, samenwerking, een duidelijk onderwerp, nieuwsgierigheid en echte verhalen. Koppel ieder puzzelstuk aan het traject."},
        {kind:"prompt",interaction:"conversation-choice",label:"Gesprek",title:"Wat maakt een gesprek interessant?",question:"Kies wat volgens jullie het verschil maakt.",trainerTitle:"Een interessant gesprek",trainerBlock:"Laat de groep eerst kiezen. Leg daarna uit dat een interessant gesprek niet ontstaat door veel praten, maar door aandacht, een echte vraag en ruimte voor een onverwacht antwoord."},
        {kind:"canvas",interaction:"dream-episode",label:"Werkblad",title:"Mijn droomaflevering",question:"Titel · onderwerp · gast · waarom luisteren?",trainerTitle:"Droomaflevering",trainerBlock:"Laat deelnemers hun eerste podcastidee vastleggen. Gebruik daarna de editiebrainstorm als extra bron voor mogelijke onderwerpen."}
      ]
    },
    {
      id:"listen",title:"Luisteren als een maker",short:"Luisteren",duration:75,
      goal:"Deelnemers ervaren het verschil tussen horen en echt luisteren.",
      script:"Een podcastmaker luistert niet alleen naar woorden. Die let ook op wat iemand bedoelt, waar emotie zit en waar een nieuwe vraag ontstaat. Demonstreer onderbreken, direct advies geven en aandachtig samenvatten. Laat daarna tweetallen drie minuten praten en luisteren zonder onderbreking.",
      planning:["10 min welkom en terugblik","10 min Luistercheck via QR","15 min horen versus luisteren","25 min oefening in tweetallen","10 min werkblad","5 min opdracht week 3"],
      questions:["Wanneer voel je dat iemand echt luistert?","Wat hoor je letterlijk en wat bedoelt iemand misschien?"],
      exercises:["Luistercheck","Drie minuten zonder onderbreken","Samenvatten in één zin"],
      responses:["Niet onderbreken, aandacht, samenvatten en doorvragen worden vaak genoemd.","Meteen advies geven kan maken dat iemand zich minder gehoord voelt."],
      quiet:["Laat deelnemers een vertrouwd onderwerp kiezen.","Werk eventueel in drietallen met een observator."],
      busy:["Gebruik een zichtbare timer.","Spreek af dat de luisteraar geen eigen verhaal toevoegt."],
      mixed:["Laat deelnemers zelf bepalen hoeveel persoonlijkheid zij delen.","Koppel mensen op basis van comfort, niet alleen leeftijd."],
      qr:{title:"Luistercheck",question:"Wat maakt iemand een goede luisteraar?",type:"multi",options:["Niet onderbreken","Doorvragen","Samenvatten","Aandacht hebben","Niet meteen advies geven"]},
      worksheet:["Wat hoorde ik letterlijk?","Wat bedoelde de ander misschien?","Welke vraag wilde ik nog stellen?"],
      slides:[
        {kind:"wave",interaction:"listen-compare",label:"Week 2",title:"Horen en luisteren zijn niet hetzelfde.",question:"Wat is volgens jou het verschil?",trainerTitle:"Horen en luisteren",trainerBlock:"Gebruik de twee personen in de studio om zichtbaar gedrag te vergelijken. Vraag eerst wat deelnemers opvalt."},
        {kind:"prompt",interaction:"listen-check",label:"Luistercheck",title:"Wat doet een goede luisteraar?",question:"Kies de signalen die jij belangrijk vindt.",trainerTitle:"Luistergedrag",trainerBlock:"Bespreek de QR-resultaten en verbind ze aan de duo-oefening."},
        {kind:"prompt",interaction:"worksheet-cards",label:"Werkblad",title:"Luister achter de woorden.",question:"Letterlijk · bedoeling · vervolgvraag",trainerTitle:"Luisterwerkblad",trainerBlock:"Laat deelnemers na het gesprek eerst opschrijven voordat zij feedback geven."}
      ]
    },
    {
      id:"questions",title:"De kunst van goede vragen",short:"Vragen",duration:75,
      goal:"Deelnemers maken open, persoonlijke en verdiepende interviewvragen.",
      script:"Goede vragen openen een gesprek. Behandel het verschil tussen een vraag waarop alleen ja of nee volgt en een vraag die uitnodigt tot een verhaal. Oefen met doorvragen op woorden uit het antwoord en bouw daarna een interviewset van hoofdvraag tot afsluitvraag.",
      planning:["10 min terugblik","10 min Vraag of geen vraag via QR","20 min open vragen en doorvragen","25 min interviewspel","5 min reflectie","5 min opdracht week 4"],
      questions:["Welke vraag maakt jou nieuwsgierig?","Wanneer voelt een persoonlijke vraag respectvol?"],
      exercises:["Vraag of geen vraag?","Vijf vragen bij één onderwerp","Vervolgvraag op één woord"],
      responses:["Vragen met wat, hoe en vertel eens leveren meestal meer verhaal op.","Een persoonlijke vraag vraagt vertrouwen en toestemming."],
      quiet:["Geef voorbeeldstarters.","Laat vragen eerst schriftelijk maken."],
      busy:["Beperk ieder team tot vijf sterke vragen.","Laat teams één vraag schrappen en uitleggen waarom."],
      mixed:["Controleer of taal eenvoudig en respectvol blijft.","Laat deelnemers moeilijke vragen samen herschrijven."],
      qr:{title:"Vraag of geen vraag?",question:"Welke vraag levert het beste gesprek op?",type:"choice",options:["Vond je het leuk?","Waarom deed je dat?","Kun je vertellen wat er toen veranderde?","Was je boos?"]},
      worksheet:["Hoofdvraag","Vervolgvraag","Persoonlijke vraag","Verdiepende vraag","Afsluitvraag"],
      slides:[
        {kind:"prompt",interaction:"question-sort",label:"Week 3",title:"Welke vraag opent een verhaal?",question:"Vraag of geen vraag?",trainerTitle:"Open vragen",trainerBlock:"Laat deelnemers sorteren en bespreek het effect van iedere formulering."},
        {kind:"prompt",interaction:"host-scenario",label:"Doorvragen",title:"Je bent interviewer. Wat vraag je hierna?",question:"Luister naar het antwoord, niet naar je lijst.",trainerTitle:"Doorvragen",trainerBlock:"Benadruk dat de beste vervolgvraag vaak ontstaat uit één woord dat de gast net gebruikt."},
        {kind:"canvas",interaction:"question-cards",label:"Werkblad",title:"Bouw je interview.",question:"Hoofdvraag tot afsluitvraag",trainerTitle:"Interviewset",trainerBlock:"Laat teams vijf vragen maken en controleer op variatie, respect en een logische opbouw."}
      ]
    },
    {
      id:"concept",title:"Bouw je podcast",short:"Podcastcanvas",duration:90,
      goal:"Deelnemers bouwen een compleet podcastconcept en verdelen de rollen.",
      script:"Van losse ideeën maken we één productie. Laat de groep kiezen voor wie de podcast is, welk onderwerp centraal staat, wie de gast wordt en welke hoofdvraag de aflevering draagt. Daarna worden intro, outro en rollen verdeeld.",
      planning:["10 min terugblik","15 min Podcastnaam Battle","20 min conceptkeuzes","30 min podcastcanvas","10 min rollen","5 min opdracht week 5"],
      questions:["Welke naam maakt nieuwsgierig?","Wat moet de luisteraar na afloop begrijpen of voelen?"],
      exercises:["Podcastnaam Battle","Podcastcanvas","Rollenverdeling"],
      responses:["Een sterke naam is kort, herkenbaar en passend bij het onderwerp.","Eén hoofdvraag voorkomt dat de aflevering alle kanten op gaat."],
      quiet:["Bied rollen achter de schermen als volwaardige keuze.","Laat naamideeën anoniem insturen."],
      busy:["Gebruik een stemronde met een duidelijke deadline.","Benoem één redacteur die besluiten vastlegt."],
      mixed:["Verdeel rollen op talent en voorkeur.","Controleer of alle deelnemers een betekenisvolle bijdrage hebben."],
      qr:{title:"Podcastnaam Battle",question:"Welke podcastnaam is het sterkst?",type:"battle",options:["Mic On Stories","Echte Gesprekken","Stem uit de Groep","Nog te bepalen"]},
      worksheet:["Podcastnaam","Onderwerp","Doelgroep","Gast","Hoofdvraag","Afleveringstitel","Intro","Outro","Rollenverdeling"],
      slides:[
        {kind:"canvas",interaction:"canvas-cards",label:"Week 4",title:"Bouw je podcast.",question:"Van idee naar productie",trainerTitle:"Podcastcanvas",trainerBlock:"Open de productiekaartjes één voor één en laat iedere keuze aansluiten op de hoofdvraag."},
        {kind:"prompt",interaction:"name-battle",label:"Naam battle",title:"Welke naam blijft hangen?",question:"Stem op de sterkste podcastnaam.",trainerTitle:"Podcastnaam kiezen",trainerBlock:"Bespreek waarom een naam duidelijk, nieuwsgierig en passend moet zijn."},
        {kind:"prompt",interaction:"role-cards",label:"Rollen",title:"Wie doet wat?",question:"Iedere bijdrage telt.",trainerTitle:"Rollen verdelen",trainerBlock:"Verdeel host, co-host, interviewer, techniek, redactie, tijdsbewaker en gastbegeleider."}
      ]
    },
    {
      id:"record",title:"Mic On: opnemen",short:"Opnemen",duration:90,
      goal:"Deelnemers oefenen met stem, microfoon, rollen en een korte opname.",
      script:"Zet de studio in opnamemodus. Oefen rustig spreken, microfoonafstand, ademhaling, tempo en een duidelijke opening. Leg uit dat fouten normaal zijn: stop kort en begin de zin opnieuw. Stiltes hoeven niet meteen gevuld te worden. Neem daarna per groep een mini-podcast van drie tot vijf minuten op.",
      planning:["10 min terugblik","10 min rollenkeuze via QR","20 min stem en microfoon","15 min opnamesimulatie","25 min mini-opnames","5 min reflectie","5 min opdracht week 6"],
      questions:["Wat helpt tegen zenuwen?","Wat maakt een opening duidelijk?"],
      exercises:["Rollenkeuze","Microfooncheck","Mini-podcast van 3–5 minuten"],
      responses:["Rustiger spreken klinkt vaak zekerder.","Een korte stilte is makkelijker te monteren dan door elkaar praten."],
      quiet:["Bied techniek, redactie en tijdsbewaking.","Laat een bijdrage apart opnemen."],
      busy:["Gebruik handsignalen voor stilte en tijd.","Neem per groep in duidelijke blokken op."],
      mixed:["Laat ervaren sprekers ondersteunen zonder over te nemen.","Wissel rollen tijdens de simulatie."],
      qr:{title:"Wie pakt welke rol?",question:"Welke rol wil jij proberen?",type:"roles",options:["Host","Co-host","Interviewer","Techniek","Redactie","Tijdsbewaker","Gastbegeleider"]},
      worksheet:["Mijn rol","Mijn openingszin","Mijn belangrijkste vraag","Waar let ik op tijdens de opname?"],
      slides:[
        {kind:"record",interaction:"role-cards",label:"Week 5",title:"Mic On.",question:"Wie pakt welke rol?",trainerTitle:"Studio en rollen",trainerBlock:"Gebruik de rolkaarten en de QR-resultaten om de productieploeg samen te stellen."},
        {kind:"prompt",interaction:"mic-check",label:"Microfooncheck",title:"Rustig. Duidelijk. Dichtbij.",question:"Test stem, afstand en tempo.",trainerTitle:"Opnametechniek",trainerBlock:"Demonstreer de microfoonafstand en laat deelnemers een openingszin oefenen."},
        {kind:"prompt",interaction:"host-scenario",label:"Tijdens opname",title:"Wat vraag je hierna?",question:"Blijf luisteren terwijl de microfoon aanstaat.",trainerTitle:"Interviewen tijdens opname",trainerBlock:"Oefen doorvragen en omgaan met fouten zonder de energie uit het gesprek te halen."}
      ]
    },
    {
      id:"publish",title:"Laat je horen",short:"Lancering",duration:90,
      goal:"De groep luistert terug, rondt de podcast af en reflecteert op het traject.",
      script:"Luister samen naar de opname of fragmenten. Begin met wat goed ging. Bespreek daarna één verbetering voor een volgende keer. Laat deelnemers benoemen wat zij geleerd hebben en waarop zij trots zijn. Controleer toestemming voor delen en sluit af met de première en certificaten.",
      planning:["10 min terugblik","10 min Trots moment via QR","30 min luistersessie","20 min reflectie","10 min titel en presentatie","10 min première en certificaten"],
      questions:["Wat ging goed?","Wat zou je volgende keer anders doen?","Wat neem je mee uit Mic On?"],
      exercises:["Trots-woordwolk","Luistersessie","Eindreflectie","Podcastpremière"],
      responses:["Trots kan zitten in spreken, luisteren, techniek, vragen of samenwerking.","Feedback begint met wat al werkt."],
      quiet:["Laat trots eerst via QR invullen.","Bied de mogelijkheid dat de trainer een antwoord voorleest."],
      busy:["Gebruik één feedbackregel per persoon.","Houd montagebespreking bij de centrale vraag."],
      mixed:["Laat iedere rol benoemen wat die heeft bijgedragen.","Vier verschillen in groei en bijdrage."],
      qr:{title:"Trots moment",question:"Waar ben jij trots op?",type:"wordcloud",options:[]},
      worksheet:["Wat ging goed?","Wat hebben we geleerd?","Wat zou ik anders doen?","Wat neem ik mee?"],
      slides:[
        {kind:"publish",interaction:"mixing-panel",label:"Week 6",title:"Laat je horen.",question:"Luister terug. Kies wat blijft.",trainerTitle:"Luistersessie",trainerBlock:"Luister gericht terug en begin met wat werkt. Gebruik het mixing panel als visuele ondersteuning voor eenvoudige keuzes."},
        {kind:"prompt",interaction:"word-cloud",label:"Trots moment",title:"Waar ben jij trots op?",question:"Jullie woorden vullen de studio.",trainerTitle:"Trots en reflectie",trainerBlock:"Toon de QR-antwoorden als woordwolk en laat enkele deelnemers toelichten als zij dat willen."},
        {kind:"prompt",interaction:"launch",label:"Première",title:"Mic On. Jullie podcast is klaar.",question:"Dit hebben jullie samen gemaakt.",trainerTitle:"Première",trainerBlock:"Vier de aflevering, bedank alle rollen en genereer de certificaten."}
      ]
    }
  ];
  story.name="Mic On";
  story.subtitle="Van gesprek naar podcast";
  story.weeks=weeks;
  story.editions=editions;
  story.variantTopics={school:editions.school.topics,community:editions.community.topics};
  story.guestSpeakers={school:editions.school.guests,community:editions.community.guests};
  story.certificateText="Heeft met inzet deelgenomen aan Mic On – Van gesprek naar podcast.";
  story.qrResults ||= {};
  story.qrActiveWeek ??= null;
  story.qrMode ||= "idle";
  story.contentVersion="mic-on-v1";
  return story;
}

const MIC_ON_WORKSHOPS = ["story-school","story-community"];

function isStoryWorkshop(workshop=data.activeWorkshop) {
  return MIC_ON_WORKSHOPS.includes(workshop);
}

function micOnEditionFor(workshop=data.activeWorkshop) {
  return workshop==="story-community" ? "community" : "school";
}

function createMicOnEdition(edition, source) {
  const story=structuredClone(source||hydrateStoryWorkshop(createStoryWorkshop()));
  const school=edition==="school";
  story.contentVersion=`mic-on-${edition}-v2`;
  story.variant=edition;
  story.editions[edition].label=school ? "School Editie" : "Buurt Editie";
  story.name=school ? "Mic On | School Editie" : "Mic On | Buurt Editie";
  story.subtitle=school ? "Jongeren aan het woord" : "Verhalen uit de buurt";
  story.description=school
    ? "Een 6 weken traject waarin leerlingen leren luisteren, interviewen en samenwerken terwijl zij onderzoeken wat er speelt onder jongeren. Het eindresultaat is een echte podcastaflevering."
    : "Een 6 weken traject waarin buurtbewoners verhalen ophalen, naar elkaar luisteren en samen een podcastaflevering maken over de buurt.";
  story.centralQuestion=school ? "Wat speelt er onder jongeren?" : "Welke verhalen leven in deze buurt?";
  story.audience=school
    ? "Leerlingen, studenten, voortgezet onderwijs en MBO"
    : "Jongeren, volwassenen, senioren, buurtbewoners, nieuwkomers en vrijwilligers";
  story.focus=school
    ? ["Jongerenparticipatie","Burgerschap","Mediawijsheid","Sociale veiligheid","Communicatievaardigheden","Zelfvertrouwen","Presenteren","Interviewen","Kritisch nadenken"]
    : ["Ontmoeting","Verbinding","Participatie","Generaties verbinden","Verhalen ophalen","Cultuur","Buurtidentiteit","Activering","Sociale samenhang"];
  story.variantTopics[edition]=school
    ? ["Schoolstress","Sociale media","Toekomst","Vriendschap","Pesten","Mentale gezondheid","Geld","Bijbaantjes","Relaties","Respect","Diversiteit","Wat volwassenen niet begrijpen van jongeren","Wat jongeren willen veranderen op school"]
    : ["Opgroeien vroeger en nu","Verhalen uit de wijk","Culturen in de buurt","Jongeren en ouderen in gesprek","Vrijwilligerswerk","Lokale ondernemers","Verandering in de wijk","Eenzaamheid","Dromen voor de buurt","Wat jong en oud van elkaar kunnen leren","Herinneringen die niet verloren mogen gaan"];
  story.guestSpeakers[edition]=school
    ? ["Docent","Mentor","Schoolleider","Conciërge","Jongerenwerker","Oud-leerling","Gastspreker","Wijkagent"]
    : ["Buurtbewoner","Vrijwilliger","Wijkagent","Jongerenwerker","Ouderenwerker","Lokale ondernemer","Gemeentemedewerker","Bibliotheekmedewerker"];
  story.session={
    ...story.session,
    organization:school?"Demo-school":"Demo-buurthuis",
    audience:school?"Leerlingen en studenten":"Gemengde buurtgroep"
  };
  story.certificateText=school
    ? "Heeft deelgenomen aan het 6 weken traject Mic On en gewerkt aan luisteren, interviewen, samenwerken, presenteren en podcast maken."
    : "Heeft deelgenomen aan het 6 weken traject Mic On en gewerkt aan luisteren, verhalen delen, samenwerken en podcast maken.";
  story.visualTheme=edition;
  story.currentWeek=Math.min(story.currentWeek||0,5);
  story.currentSlide=0;
  story.qrActiveWeek=null;
  story.qrMode="idle";
  story.weeks=buildMicOnEditionWeeks(edition,story.weeks);
  return story;
}

function hydrateMicOnEdition(story,edition) {
  if(!story||!story.contentVersion?.startsWith(`mic-on-${edition}-`)) return createMicOnEdition(edition,story);
  const school=edition==="school";
  story.editions[edition].label=school ? "School Editie" : "Buurt Editie";
  story.contentVersion=`mic-on-${edition}-v2`;
  story.weeks.forEach(week=>{
    week.materials ||= school
      ? ["Telefoons voor de korte QR-opdracht","Post-its","Podcastmicrofoon","Koptelefoon","Werkbladen"]
      : ["Telefoons voor de korte QR-opdracht","Buurtkaart","Fotokaarten","Podcastmicrofoon","Koffie- of theesetting","Werkbladen"];
    week.deepQuestions ||= school
      ? ["Waarom is dit onderwerp belangrijk voor jongeren?","Wat zouden volwassenen hierover beter moeten begrijpen?","Welke verandering zou verschil maken?"]
      : ["Welke herinnering of ervaring zit achter dit antwoord?","Wat verbindt dit verhaal met de buurt van nu?","Wat mogen volgende generaties hiervan meenemen?"];
    week.worksheetInstructions ||= school
      ? "Laat leerlingen eerst zelfstandig schrijven. Bespreek daarna in duo’s welke formulering het duidelijkst laat horen wat jongeren belangrijk vinden."
      : "Geef deelnemers rustig de tijd om te schrijven of laat iemand helpen met noteren. Delen is vrijwillig; het verhaal blijft van de deelnemer.";
  });
  return story;
}

function buildMicOnEditionWeeks(edition, baseWeeks) {
  const weeks=structuredClone(baseWeeks);
  const school=edition==="school";
  const definitions=school ? [
    {
      title:"Wat speelt er onder jongeren?",short:"Jongerenstem",
      goal:"Leerlingen ontdekken welke onderwerpen zij belangrijk vinden en wat zij met hun podcast willen onderzoeken.",
      script:"Open met de centrale vraag: wat speelt er onder jongeren? Maak duidelijk dat de podcast hun perspectief zichtbaar mag maken. Haal onderwerpen op zonder ze direct te beoordelen. Vraag steeds waarom een onderwerp belangrijk is, wie erover gehoord moet worden en wat de luisteraar moet begrijpen.",
      qr:{title:"Jongeren Radar",question:"Welk onderwerp verdient een plek in jullie podcast?",type:"poll",options:["Schoolstress","Sociale media","Toekomst","Vriendschap","Mentale gezondheid","Geld en bijbaantjes","Respect","Wat volwassenen niet begrijpen"]},
      worksheet:["Mijn onderwerp","Waarom is dit belangrijk?","Wie zou hierover iets moeten zeggen?","Wat wil ik de luisteraar meegeven?"],
      slide:["Als jij één ding op school mocht bespreken, wat zou dat zijn?","Jullie onderwerp. Jullie stem."]
    },
    {
      title:"Luisteren als superkracht",short:"Luisteren",
      goal:"Leerlingen leren het verschil tussen horen en echt luisteren.",
      script:"Leg uit dat goed interviewen begint voordat de volgende vraag wordt gesteld. Laat leerlingen in tweetallen luisteren zonder te onderbreken, daarna samenvatten en één nieuwsgierige vervolgvraag stellen.",
      qr:{title:"Luistercheck",question:"Wanneer merk jij dat iemand echt luistert?",type:"multi",options:["Niet onderbreken","Aankijken","Samenvatten","Doorvragen","Geen direct advies geven"]},
      worksheet:["Wat hoorde ik letterlijk?","Wat was belangrijk voor de ander?","Hoe vatte ik dit samen?","Welke vraag stelde ik daarna?"],
      slide:["Luisteren is een superkracht.","Kun jij samenvatten zonder je eigen verhaal toe te voegen?"]
    },
    {
      title:"De kunst van goede vragen",short:"Vragen",
      goal:"Leerlingen leren open vragen maken en doorvragen.",
      script:"Vergelijk een korte ja-of-nee-vraag met een vraag die ruimte maakt voor een ervaring. Herschrijf samen simpele vragen naar sterke podcastvragen en laat leerlingen doorvragen op één opvallend woord.",
      qr:{title:"Sterkste vraag",question:"Welke vraag levert het beste verhaal op?",type:"choice",options:["Vind je school leuk?","Is school soms stressvol?","Wat zou school voor jou fijner maken?","Heb je veel huiswerk?"]},
      worksheet:["Simpele vraag","Sterkere open vraag","Vervolgvraag","Persoonlijke vraag","Afsluitvraag"],
      slide:["Van simpele vraag naar sterk gesprek.","Wat zou school voor jou fijner maken?"]
    },
    {
      title:"Bouw je aflevering",short:"Aflevering",
      goal:"Leerlingen kiezen podcastnaam, onderwerp, gast, rollen en afleveringstructuur.",
      script:"Breng alle keuzes samen in het Podcast Canvas School Editie. Bewaak één hoofdvraag en zorg dat iedere leerling een betekenisvolle rol krijgt, voor of achter de microfoon.",
      qr:{title:"Podcastnaam Battle",question:"Welke naam past het best bij jullie jongerenpodcast?",type:"battle",options:["Mic On Jongeren","Ongefilterd","Onze Stem","Tussen de Lessen"]},
      worksheet:["Podcastnaam","Onderwerp","Hoofdvraag","Gast","Intro","Rollen","Afsluitvraag"],
      slide:["Bouw jullie aflevering.","Welke naam laat jongeren luisteren?"]
    },
    {
      title:"Mic On: opname",short:"Opname",
      goal:"Leerlingen nemen samen de podcastaflevering op.",
      script:"Zet duidelijke rollen neer: host, co-host, interviewer, techniek, redactie, tijdsbewaker en gastbegeleider. Oefen de opening, microfoonafstand en rustig doorvragen voordat de echte opname begint.",
      qr:{title:"Rollencheck",question:"Welke rol wil jij tijdens de opname proberen?",type:"roles",options:["Host","Co-host","Interviewer","Techniek","Redactie","Tijdsbewaker","Gastbegeleider"]},
      worksheet:["Mijn rol","Mijn openingszin","Mijn belangrijkste vraag","Waar let ik op?"],
      slide:["Mic On. Jullie zijn aan zet.","Praat met elkaar, niet tegen de microfoon."]
    },
    {
      title:"Laat je horen",short:"Première",
      goal:"Leerlingen luisteren terug, reflecteren en ronden hun jongerenpodcast af.",
      script:"Luister terug vanuit groei. Bespreek wat leerlingen leerden over luisteren, samenwerken en hun stem gebruiken. Laat hen formuleren wat zij jongeren of volwassenen willen meegeven.",
      qr:{title:"Mijn stem",question:"Waar ben jij trots op in dit traject?",type:"wordcloud",options:[]},
      worksheet:["Wat heb ik geleerd over luisteren?","Wat heb ik geleerd over mijn stem gebruiken?","Wat wil ik jongeren of volwassenen meegeven?"],
      slide:["Laat je horen.","Wat wil jij dat volwassenen begrijpen?"]
    }
  ] : [
    {
      title:"Welke verhalen leven in de buurt?",short:"Buurtverhalen",
      goal:"Deelnemers ontdekken welke verhalen, herinneringen en onderwerpen in de buurt leven.",
      script:"Open met de vraag welk verhaal uit deze buurt niet verloren mag gaan. Nodig herinneringen, actuele onderwerpen en dromen uit. Zorg dat verschillende leeftijden, culturen en ervaringen naast elkaar mogen bestaan.",
      qr:{title:"Buurtverhalen",question:"Welk verhaal of onderwerp uit de buurt verdient aandacht?",type:"poll",options:["Vroeger en nu","Opgroeien in de buurt","Cultuur en familie","Vrijwilligerswerk","Ontmoeting","Eenzaamheid","Jong en oud","Dromen voor de buurt"]},
      worksheet:["Mijn buurtverhaal","Waarom is dit belangrijk?","Wie zou hierover kunnen vertellen?","Wat moet de buurt hiervan onthouden?"],
      slide:["Welk verhaal uit deze buurt mag niet verloren gaan?","Herinneringen. Mensen. Een gedeelde plek."]
    },
    {
      title:"Luisteren naar elkaar",short:"Ontmoeting",
      goal:"Deelnemers luisteren naar mensen met andere leeftijden, achtergronden of ervaringen.",
      script:"Maak veilige tweetallen of kleine groepen. Laat één persoon vertellen over een herinnering die is bijgebleven. De ander luistert, vat samen en vraagt rustig door zonder een eigen ervaring over te nemen.",
      qr:{title:"Luisteren naar elkaar",question:"Wat helpt om je verhaal veilig te kunnen delen?",type:"multi",options:["Tijd krijgen","Niet onderbroken worden","Respect","Een rustige vraag","Zelf bepalen wat je deelt"]},
      worksheet:["Welke herinnering hoorde ik?","Wat betekende dit voor de ander?","Wat verraste mij?","Welke vraag stelde ik daarna?"],
      slide:["Luisteren maakt ruimte.","Wat is een herinnering die jou is bijgebleven?"]
    },
    {
      title:"Het verhaal achter de persoon",short:"Verdiepen",
      goal:"Deelnemers leren dieper vragen stellen en verhalen achter mensen ontdekken.",
      script:"Gebruik interviewkaartjes die uitnodigen tot betekenis, verandering en hoop. Let op eenvoudige taal en geef deelnemers altijd ruimte om een vraag niet te beantwoorden.",
      qr:{title:"Vraagkaart",question:"Welke vraag zou jij aan een buurtbewoner stellen?",type:"choice",options:["Wat heeft deze buurt voor jou betekend?","Wat is hier veranderd?","Wat hoop je dat blijft?","Wat kunnen jong en oud van elkaar leren?"]},
      worksheet:["Hoofdvraag","Vraag over vroeger","Vraag over verandering","Vraag over de toekomst","Afsluitvraag"],
      slide:["Achter ieder mens zit een verhaal.","Wat hoop je dat in deze buurt blijft?"]
    },
    {
      title:"Onze buurtpodcast bouwen",short:"Buurtpodcast",
      goal:"Deelnemers kiezen podcastnaam, onderwerp, gast, rollen en verhaalvorm.",
      script:"Maak samen het Podcast Canvas Buurt Editie. Kies een verhaalvorm die past bij de groep: interview, rondetafel of meerdere korte buurtstemmen. Houd de hoofdvraag herkenbaar.",
      qr:{title:"Podcastnaam Battle",question:"Welke naam past bij jullie buurtpodcast?",type:"battle",options:["Stemmen uit de Buurt","Aan de Keukentafel","Onze Wijk Vertelt","Hier Gebeurt Het"]},
      worksheet:["Podcastnaam","Buurtonderwerp","Hoofdvraag","Gast","Verhaalvorm","Intro","Rollen","Afsluitvraag"],
      slide:["Bouw jullie buurtpodcast.","Welke naam voelt als deze buurt?"]
    },
    {
      title:"Mic On: opname",short:"Opname",
      goal:"Deelnemers nemen de buurtpodcast op in een veilige en rustige sfeer.",
      script:"Werk rustig en voorspelbaar. Leg rollen eenvoudig uit en laat mensen op hun eigen manier bijdragen. Begin met een korte proefopname en geef tijd om opnieuw te beginnen.",
      qr:{title:"Mijn bijdrage",question:"Hoe wil jij bijdragen aan de opname?",type:"roles",options:["Gesprek begeleiden","Een verhaal delen","Vragen stellen","Techniek","Redactie","Tijd bewaken","Gast ontvangen"]},
      worksheet:["Mijn bijdrage","Mijn openingszin of verhaal","Mijn belangrijkste vraag","Wat heb ik nodig om prettig mee te doen?"],
      slide:["Mic On. De buurt vertelt.","Iedere bijdrage telt."]
    },
    {
      title:"Samen terugluisteren",short:"Terugluisteren",
      goal:"Deelnemers luisteren terug, reflecteren en ronden de buurtpodcast samen af.",
      script:"Luister in een warme setting terug. Begin met wat raakt en wat herkenbaar is. Vraag welk verhaal blijft hangen, wat iemand verraste en wat deelnemers meenemen uit de ontmoeting.",
      qr:{title:"Wat blijft bij?",question:"Welk woord past bij wat jij meeneemt?",type:"wordcloud",options:[]},
      worksheet:["Wat heb ik geleerd over luisteren?","Welk verhaal blijft mij bij?","Wat heeft mij verrast aan iemand anders?","Wat neem ik mee uit dit traject?"],
      slide:["Samen terugluisteren.","Welke stem uit de buurt blijft bij jou?"]
    }
  ];
  return weeks.map((week,index)=>{
    const def=definitions[index];
    const slides=week.slides.map((slide,slideIndex)=>({
      ...slide,
      label:`Week ${index+1}`,
      title:slideIndex===0?def.slide[0]:slide.title,
      question:slideIndex===0?def.slide[1]:slide.question,
      trainerBlock:slideIndex===0?def.script:slide.trainerBlock
    }));
    return {
      ...week,
      title:def.title,short:def.short,goal:def.goal,script:def.script,qr:def.qr,worksheet:def.worksheet,slides,
      planning:[`10 min welkom en terugblik`,`10 min ${def.qr.title} via QR`,"20 min hoofdonderwerp","20 min verdiepende oefening","10 min werkblad en reflectie","5 min opdracht voor volgende week"],
      questions:[def.slide[0],def.slide[1],"Wat valt je op in de reacties van de groep?"],
      exercises:[def.qr.title,def.title,`Werkblad ${index+1}`],
      responses:school
        ? ["Geef ruimte aan verschillende jongerenperspectieven.","Maak duidelijk dat ervaringen niet goed of fout zijn."]
        : ["Ervaringen kunnen per generatie en achtergrond verschillen.","Vraag door op herkenning zonder verschillen glad te strijken."],
      deepQuestions:school
        ? ["Waarom is dit onderwerp belangrijk voor jongeren?","Wat zouden volwassenen hierover beter moeten begrijpen?","Welke verandering zou verschil maken?"]
        : ["Welke herinnering of ervaring zit achter dit antwoord?","Wat verbindt dit verhaal met de buurt van nu?","Wat mogen volgende generaties hiervan meenemen?"],
      worksheetInstructions:school
        ? "Laat leerlingen eerst zelfstandig schrijven. Bespreek daarna in duo’s welke formulering het duidelijkst laat horen wat jongeren belangrijk vinden."
        : "Geef deelnemers rustig de tijd om te schrijven of laat iemand helpen met noteren. Delen is vrijwillig; het verhaal blijft van de deelnemer.",
      quiet:school?["Laat eerst individueel schrijven.","Delen blijft vrijwillig."]:["Geef extra denktijd.","Laat iemand een bijdrage ook opschrijven."],
      busy:school?["Werk met een zichtbare timer.","Geef teams één duidelijke opdracht."]:["Vat regelmatig samen.","Werk in kleine gespreksrondes."],
      mixed:school?["Gebruik voorbeelden uit VO en MBO.","Laat deelnemers zelf passende woorden kiezen."]:["Maak duo’s over generaties heen als dat veilig voelt.","Gebruik eenvoudige taal en leg begrippen uit."],
      materials:school?["Telefoons voor de korte QR-opdracht","Post-its","Podcastmicrofoon","Koptelefoon","Werkbladen"]:["Telefoons voor de korte QR-opdracht","Buurtkaart","Fotokaarten","Podcastmicrofoon","Koffie- of theesetting","Werkbladen"]
    };
  });
}

function attachActiveStory(target) {
  target.story=target.activeWorkshop==="story-community" ? target.micOnCommunity : target.micOnSchool;
}

let data = loadData();
const launchParams = new URLSearchParams(location.search);
const launchMode = launchParams.get("mode");
const launchWorkshop = launchParams.get("workshop");
const launchSession = launchParams.get("session");
const launchWeek = launchParams.get("week");
if (["sterk","wegwijs","talent",...MIC_ON_WORKSHOPS].includes(launchWorkshop)) {
  data.activeWorkshop = launchWorkshop;
  if (isStoryWorkshop(launchWorkshop)) attachActiveStory(data);
}
ensureWegwijsData();
ensureTalentData();
data.liveSessions ||= {};
if(launchSession&&launchWorkshop) data.liveSessions[launchWorkshop]=launchSession;
if(launchWeek&&launchWorkshop==="wegwijs") data.wegwijs.currentWeek=Math.max(0,Number(launchWeek)-1);
if(launchWeek&&launchWorkshop==="talent") data.talent.currentWeek=Math.max(0,Number(launchWeek)-1);
const participantClientId = getParticipantClientId();

function getParticipantClientId() {
  let id = sessionStorage.getItem("slinnva-participant-id");
  if (!id) {
    id = `participant-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem("slinnva-participant-id", id);
  }
  return id;
}

function getParticipantName() {
  return sessionStorage.getItem("slinnva-participant-name") || data.currentParticipantName || "Deelnemer";
}

function getMicParticipantName() {
  return sessionStorage.getItem("slinnva-mic-participant-name") || "";
}

function getWegwijsParticipantName() {
  return sessionStorage.getItem("slinnva-wegwijs-participant-name") || "";
}

function getTalentParticipantName() {
  return sessionStorage.getItem("slinnva-talent-participant-name") || "";
}

function createSessionId(workshop=data.activeWorkshop) {
  const prefix={sterk:"SO",wegwijs:"SW",talent:"TT","story-school":"MS","story-community":"MB"}[workshop]||"WS";
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
}

function activeSessionId(workshop=data.activeWorkshop) {
  data.liveSessions ||= {};
  if(!data.liveSessions[workshop]) {
    data.liveSessions[workshop]=createSessionId(workshop);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
  }
  return data.liveSessions[workshop];
}

function startNewLiveSession(workshop=data.activeWorkshop) {
  data.liveSessions ||= {};
  data.liveSessions[workshop]=createSessionId(workshop);
  saveData();
  updatePresentationLink();
  return data.liveSessions[workshop];
}

function liveRoom(base,workshop=data.activeWorkshop) {
  return `${base}-${activeSessionId(workshop)}`;
}

function compatibleLiveMessage(action,payload,state) {
  if(action==="open-response")return {action:"control",payload:{responseOpen:true,revealResults:false,responseGeneration:Number(state?.responseGeneration||0)+1,activeResponseKey:payload.activity||""}};
  if(action==="close-response")return {action:"control",payload:{responseOpen:false,revealResults:payload.revealResults!==false,timer:{running:false,duration:state?.timer?.duration||5,endsAt:0}}};
  if(action==="timer-expired")return {action:"control",payload:{responseOpen:false,revealResults:true,timer:{running:false,duration:state?.timer?.duration||5,endsAt:0}}};
  if(action==="submit")return {action,payload:{...payload,value:{...(payload.value||{}),generation:Number(state?.responseGeneration||0)}}};
  return {action,payload};
}

function loadData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored) {
      const fresh = structuredClone(seed);
      fresh.modules = fresh.modules.map(hydrateModule);
      fresh.masterModules = structuredClone(fresh.modules);
      fresh.sessionOverrides = {};
      fresh.activeWorkshop = "sterk";
      const micOnBase=hydrateStoryWorkshop(createStoryWorkshop());
      fresh.micOnSchool=createMicOnEdition("school",micOnBase);
      fresh.micOnCommunity=createMicOnEdition("community",micOnBase);
      attachActiveStory(fresh);
      return fresh;
    }
    const merged = { ...structuredClone(seed), ...stored, currentSlide: stored.currentSlide || 0, screenMode: stored.screenMode || "slides" };
    if (!Array.isArray(merged.bingoItems) || merged.bingoItems.length < 25) merged.bingoItems = structuredClone(seed.bingoItems);
    if (!Array.isArray(merged.bingoCards)) merged.bingoCards = [];
    if (!Array.isArray(merged.bingoMarked)) merged.bingoMarked = [];
    if (!merged.bingoStatus) merged.bingoStatus = "idle";
    merged.modules = merged.modules.map(hydrateModule);
    if (!Array.isArray(merged.masterModules)) merged.masterModules = structuredClone(merged.modules);
    if (!merged.sessionOverrides) merged.sessionOverrides = {};
    if (merged.activeWorkshop==="story") merged.activeWorkshop=`story-${merged.story?.variant==="community"?"community":"school"}`;
    if (!merged.activeWorkshop) merged.activeWorkshop = "sterk";
    const legacyStory=hydrateStoryWorkshop(merged.story||createStoryWorkshop());
    merged.micOnSchool=hydrateMicOnEdition(merged.micOnSchool||createMicOnEdition("school",legacyStory),"school");
    merged.micOnCommunity=hydrateMicOnEdition(merged.micOnCommunity||createMicOnEdition("community",legacyStory),"community");
    attachActiveStory(merged);
    return merged;
  } catch {
    const fresh = structuredClone(seed);
    fresh.modules = fresh.modules.map(hydrateModule);
    fresh.masterModules = structuredClone(fresh.modules);
    fresh.sessionOverrides = {};
    fresh.activeWorkshop = "sterk";
    const micOnBase=hydrateStoryWorkshop(createStoryWorkshop());
    fresh.micOnSchool=createMicOnEdition("school",micOnBase);
    fresh.micOnCommunity=createMicOnEdition("community",micOnBase);
    attachActiveStory(fresh);
    return fresh;
  }
}

function saveData(message) {
  if (isStoryWorkshop()) {
    if(data.activeWorkshop==="story-community") data.micOnCommunity=data.story;
    else data.micOnSchool=data.story;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  if (message) toast(message);
}

function activeModules() { return data.modules.filter(module => module.enabled); }
function currentModule() {
  const modules = activeModules();
  data.currentModule = Math.min(data.currentModule, modules.length - 1);
  return modules[data.currentModule];
}

const wegwijsImpactStatements=[
  "Ik weet waar ik terechtkan met vragen.",
  "Ik begrijp officiële brieven meestal.",
  "Ik durf hulp te vragen.",
  "Ik weet hoe ik online zaken met de overheid regel.",
  "Ik voel mij zekerder in Nederland."
];
const wegwijsScale=["Helemaal eens","Eens","Neutraal","Oneens","Helemaal oneens"];
const wegwijsWeeks=[
  {
    id:"omgeving",title:"Nederland om mij heen",question:"Hoe werkt Nederland eigenlijk?",duration:"60–75 min",
    goals:["Belangrijke instanties herkennen","Weten waar je terechtkunt","Hulp durven vragen","Samen keuzes oefenen"],
    steps:[
      ["Welkom","Welkom bij Samen Wegwijs","Samen ontdekken. Samen oefenen. Samen sterker.",3,"Zorg voor een rustige start. Benoem dat niemand alles hoeft te weten en dat hulp vragen juist een vaardigheid is.","cover"],
      ["Intro","Wat is Samen Wegwijs?","Praktisch ontdekken, regelen en meedoen.",5,"Leg uit dat dit geen les of toets is. De groep oefent met situaties die mensen in het dagelijks leven tegenkomen.","route"],
      ["Vandaag","Wat gaan we vandaag doen?","Eerst een korte beginmeting.",6,"Vertel hoe de vier weken zijn opgebouwd. Open daarna de beginmeting; antwoorden worden alleen als groepsbeeld gebruikt.","impact","impact"],
      ["Woordwolk","Wat vind jij ingewikkeld in Nederland?","Eén woord of korte zin.",7,"Geef ruimte aan alles wat deelnemers lastig vinden. Corrigeer niet en groepeer nog niet.","wordcloud","wordcloud"],
      ["Bespreken","Bespreking woordwolk","Wat valt ons samen op?",5,"Benoem terugkerende woorden en vraag welke hulp deelnemers hierbij zouden wensen.","wordcloud-results"],
      ["Loketten","Nederland heeft veel loketten","Niet alles wordt op dezelfde plek geregeld.",7,"Leg in eenvoudige taal uit dat gemeente, Belastingdienst, zorgverzekeraar en UWV verschillende taken hebben.","institutions"],
      ["Quiz","Live quiz: Waar moet je zijn?","Kies de instantie die past.",10,"Laat iedere vraag vijf seconden lopen. Bespreek na elke uitslag waarom het antwoord klopt.","quiz","quiz"],
      ["Scenario","Verhuisd, wat regel je?","Wat doe je eerst, en wat daarna?",8,"Loop samen de praktische stappen langs: adres doorgeven, post controleren, verzekeringen en belangrijke organisaties informeren.","home"],
      ["Teamopdracht","Instantie Estafette","Koppel iedere situatie aan een passende plek.",10,"Laat teams situaties koppelen aan gemeente, Belastingdienst, zorgverzekeraar, UWV, woningcorporatie, wijkteam, buurthuis en Juridisch Loket.","team"],
      ["Nabespreking","Welke route onthouden we?","Hulp vragen mag op meer dan één plek.",5,"Bespreek twijfelgevallen. Benadruk dat een buurthuis of sociaal loket kan helpen om de juiste route te vinden.","conversation"],
      ["Reflectie","Mijn eerste wegwijsstap","Wat wil jij na vandaag beter begrijpen?",5,"Laat deelnemers één persoonlijke hulpvraag of actie invullen.","reflection","reflection"],
      ["Afsluiting","Je hoeft het niet alleen te regelen","Openen · controleren · hulp vragen.",3,"Vat de drie belangrijkste stappen samen en geef een vooruitblik op post en administratie.","finish"]
    ],
    quiz:[
      ["Je bent verhuisd. Waar geef je dit door?",["Gemeente","Politie","Huisarts","Supermarkt"],0,"Een verhuizing geef je door aan de gemeente."],
      ["Je wilt online iets regelen met de overheid. Wat heb je vaak nodig?",["Bonuskaart","DigiD","Bankpas van iemand anders","Bibliotheekpas"],1,"DigiD is je persoonlijke digitale inlog voor veel overheidszaken."],
      ["Je krijgt een bericht in MijnOverheid. Wat is dat meestal?",["Reclame","Een officieel overheidsbericht","Een schoolbericht","Een familiebericht"],1,"MijnOverheid bevat persoonlijke berichten van overheidsorganisaties."],
      ["Je begrijpt een formulier van de gemeente niet. Wat kun je doen?",["Niets","Weggooien","Hulp vragen bij gemeente, buurthuis of sociaal loket","Afwachten"],2,"Vraag op tijd hulp en neem de brief of het formulier mee."]
    ]
  },
  {
    id:"administratie",title:"Geld, post en administratie",question:"Wat doe je als er een belangrijke brief op de mat valt?",duration:"60–75 min",
    goals:["Belangrijke post herkennen","Op tijd actie ondernemen","Hulp bij geldvragen vinden","Prioriteiten oefenen"],
    steps:[
      ["Welkom","Welkom terug","Wat weet je nog van vorige week?",4,"Laat twee deelnemers een praktische ontdekking delen.","cover"],
      ["Terugblik","Wat bleef hangen?","Welke instantie weet jij nu beter te vinden?",5,"Herhaal kort gemeente, DigiD en hulp vragen.","conversation"],
      ["Woordwolk","Welke post vind jij spannend of lastig?","Deel één woord of soort brief.",6,"Normaliseer dat officiële post ingewikkeld kan voelen.","wordcloud","wordcloud"],
      ["Uitleg","Niet elke brief is hetzelfde","Kijk naar afzender, datum en wat er van je wordt gevraagd.",7,"Laat zien hoe deelnemers een brief stap voor stap bekijken.","mail"],
      ["Stemspel","Post of Prullenbak","Belangrijk · niet belangrijk · twijfel",10,"Toon verschillende soorten post. Bespreek dat een onbekende incassobrief wel gecontroleerd moet worden.","vote","vote"],
      ["Scenario","De blauwe envelop","Wat doe je als eerste?",8,"Openmaken en rustig lezen is de eerste stap. Vraag daarna hulp als iets onduidelijk is.","quiz","quiz"],
      ["Budgetspel","€1.000 voor deze maand","Wat moet eerst?",15,"Laat teams keuzes maken tussen huur, zorgverzekering, telefoon, boodschappen, reizen, sparen, vrije tijd en een onverwachte rekening.","money"],
      ["Gesprek","Geldstress en hulp vragen","Waarom wachten mensen soms te lang?",7,"Bespreek schaamte zonder oordeel en benoem sociaal wijkteam en gemeentelijke schuldhulp.","conversation"],
      ["Actiekaart","Mijn administratie-actie","Welke brief of geldzaak pak jij aan?",5,"Laat deelnemers één haalbare stap formuleren.","action","actionPlan"],
      ["Reflectie","Wat begrijp je nu beter?","Wat wil je nog oefenen?",4,"Verzamel een korte reflectie.","reflection","reflection"],
      ["Afsluiting","Bewaren · lezen · reageren","Vraag hulp vóór een termijn verloopt.",3,"Sluit af met drie praktische gewoontes.","finish"]
    ],
    quiz:[["Je krijgt een blauwe envelop en begrijpt hem niet. Wat doe je eerst?",["Wegleggen","Openmaken en rustig lezen","Weggooien","Aan niemand laten zien"],1,"Open de brief, controleer de datum en vraag hulp als dat nodig is."]],
    vote:[
      ["Brief van de Belastingdienst",["Belangrijk","Niet belangrijk","Twijfel"],0],
      ["Reclamefolder",["Belangrijk","Niet belangrijk","Twijfel"],1],
      ["Brief van de zorgverzekering",["Belangrijk","Niet belangrijk","Twijfel"],0],
      ["Onbekende incassobrief",["Belangrijk","Niet belangrijk","Twijfel"],2]
    ]
  },
  {
    id:"basiszaken",title:"Wonen, zorg en werk",question:"Wat regel je als volwassene in Nederland?",duration:"60–75 min",
    goals:["Zorgroute begrijpen","Basisstappen rond wonen kennen","Instanties rond werk herkennen","Praktische scenario’s oplossen"],
    steps:[
      ["Welkom","Welkom terug","Vandaag: wonen, zorg en werk.",4,"Maak de drie thema’s zichtbaar en vraag welk thema het meest leeft.","cover"],
      ["Energizer","Wie bel je?","Kies snel de eerste passende plek.",6,"Gebruik korte mondelinge situaties als energizer.","phone"],
      ["Zorgroute","Zorg werkt in stappen","Huisarts · huisartsenpost · 112",7,"Leg uit dat de huisarts meestal het eerste aanspreekpunt is wanneer het geen acute noodsituatie is.","care"],
      ["Quiz","Huisarts, spoed of 112?","Wat past bij deze situatie?",10,"Laat vijf seconden per vraag lopen en bespreek de veilige vervolgstap.","quiz","quiz"],
      ["Woonroute","Van zoeken naar inschrijven","Zet de stappen in logische volgorde.",10,"Bespreek inschrijven, reageren, bezichtigen, contract lezen, borg, verhuizen en gemeente.","home"],
      ["Stellingen","Werk of niet?","Waar · niet waar · twijfel",10,"Bespreek contracten, UWV, vrijwilligerswerk en loonstroken.","vote","vote"],
      ["Teams","Los het scenario op","Welke stap zet je en wie kan helpen?",10,"Geef teams een woon-, zorg- of werksituatie en laat een route maken.","team"],
      ["Bespreking","Wat maakte de keuze lastig?","Er kunnen meerdere veilige tussenstappen zijn.",6,"Vraag teams hun redenering uit te leggen.","conversation"],
      ["Actiekaart","Mijn praktische volgende stap","Wat wil jij regelen of uitzoeken?",5,"Laat deelnemers één concrete actie opslaan.","action","actionPlan"],
      ["Reflectie","Wat geeft meer zekerheid?","Welke organisatie onthoud je?",4,"Gebruik een korte reflectie.","reflection","reflection"],
      ["Afsluiting","Eerst bepalen: is het spoed?","Daarna de juiste route kiezen.",3,"Vat zorg, wonen en werk samen.","finish"]
    ],
    quiz:[
      ["Je hebt drie dagen koorts maar bent aanspreekbaar. Wie bel je meestal eerst?",["Huisarts","112","Politie","Gemeente"],0,"Bij niet-acute gezondheidsklachten bel je meestal de huisarts."],
      ["Iemand is bewusteloos. Wat doe je?",["Huisarts","112","Wachten","Apotheek"],1,"Bewusteloosheid is een noodsituatie: bel 112."],
      ["Je medicijn is op. Waar ga je meestal heen?",["Apotheek","Gemeente","Woningcorporatie","Belastingdienst"],0,"Medicijnen haal je bij de apotheek, vaak met een recept."]
    ],
    vote:[
      ["Je mag altijd zwart werken als je weinig geld hebt.",["Waar","Niet waar","Twijfel"],1],
      ["Lees een contract goed voordat je tekent.",["Waar","Niet waar","Twijfel"],0],
      ["UWV kan helpen bij werkloosheid.",["Waar","Niet waar","Twijfel"],0],
      ["Vrijwilligerswerk kan ervaring opleveren.",["Waar","Niet waar","Twijfel"],0],
      ["Loonstroken hoef je niet te bewaren.",["Waar","Niet waar","Twijfel"],1]
    ]
  },
  {
    id:"meedoen",title:"Zelfstandig en actief meedoen",question:"Hoe kan ik sterker deelnemen aan de samenleving?",duration:"60–75 min",
    goals:["Hulpbronnen vinden","Hulp durven vragen","Mogelijkheden om mee te doen kennen","Een persoonlijk Wegwijs Plan maken"],
    steps:[
      ["Welkom","De laatste bijeenkomst","Wat heb je al in beweging gezet?",4,"Vier kleine stappen en maak ruimte voor vragen.","cover"],
      ["Terugblik","Wat heb je geleerd?","Welke kennis gebruik je al?",6,"Laat deelnemers in tweetallen terugkijken.","conversation"],
      ["Hulpkaart","Waar kun je hulp vinden?","Geld · zorg · werk · wonen · taal · contact",10,"Verzamel digitaal welke plekken deelnemers kennen.","postits","postits"],
      ["Meedoen","Wat zou jij willen doen?","Kies wat bij jou past.",8,"Laat deelnemers stemmen op vrijwilligerswerk, cursus, taal, sport, ontmoeting of organiseren.","vote","vote"],
      ["Eindquiz","Wat weet je nu?","Vijf vragen uit het hele traject.",12,"Gebruik de quiz om kennis te vieren, niet om mensen te beoordelen.","quiz","quiz"],
      ["Wegwijs Plan","Mijn persoonlijke plan","Van vraag naar eerste stap.",12,"Laat iedereen het actieplan invullen en bied hulp bij formuleren.","action","actionPlan"],
      ["Tweetallen","Vertel je eerste stap","Wat heb je nodig om te beginnen?",7,"Delen is vrijwillig. Laat de luisteraar één helpende vraag stellen.","conversation"],
      ["Reflectie","Eindmeting","Wat is er veranderd sinds Week 1?",8,"Laat dezelfde vijf stellingen invullen en toon daarna het groepsverschil.","impact","impact"],
      ["Afsluiting","Je weet meer én je weet waar je kunt vragen","Zelfstandig betekent niet: alles alleen.",5,"Sluit warm af en benoem lokale hulpbronnen.","finish"]
    ],
    quiz:[
      ["Waar geef je een verhuizing door?",["Gemeente","Huisarts","Politie","School"],0,"Bij de gemeente."],
      ["Wat gebruik je vaak voor online overheidszaken?",["DigiD","Bonuskaart","Bibliotheekpas","Rijbewijs van iemand anders"],0,"Je persoonlijke DigiD."],
      ["Wie bel je meestal eerst als je ziek bent en het is geen spoed?",["Huisarts","112","Gemeente","Werkgever"],0,"Meestal de huisarts."],
      ["Wat doe je met een brief die je niet begrijpt?",["Weggooien","Openmaken, bewaren en hulp vragen","Negeren","Online delen"],1,"Openen, bewaren en op tijd hulp vragen."],
      ["Waar vind je vaak buurtactiviteiten?",["Buurthuis of wijkorganisatie","Belastingdienst","Apotheek","Rechtbank"],0,"Bij een buurthuis of wijkorganisatie."]
    ],
    vote:[["Wat zou jij willen doen?",["Vrijwilligerswerk","Cursus volgen","Taal oefenen","Sporten","Mensen ontmoeten","Iets organiseren"],0]]
  }
];

function normalizeWegwijsSteps(week) {
  return week.steps.map((step,index)=>({
    id:`${week.id}-${index+1}`,short:step[0],title:step[1],question:step[2],duration:step[3],
    trainerText:step[4],visual:step[5],type:step[6]||null,
    interactive:Boolean(step[6]),results:["wordcloud","quiz","vote","postits","impact"].includes(step[6]),
    goal:week.goals[Math.min(index,week.goals.length-1)]||week.goals[0],
    questions:["Wat valt je op?","Welke stap zou jij als eerste zetten?"],
    attention:"Gebruik eenvoudige taal, geef denktijd en laat deelnemers elkaar helpen zonder antwoorden over te nemen.",
    instructions:step[6]?"Beantwoord de actieve opdracht op je telefoon.":"Doe mee in de zaal; je telefoon mag even weg."
  }));
}

function ensureWegwijsData() {
  data.wegwijs ||= {currentWeek:0,notes:[],versions:[{version:"1.0",status:"Concept"}]};
}

function isWegwijs() { return data.activeWorkshop==="wegwijs"; }
function wegwijsWeek() { ensureWegwijsData();return wegwijsWeeks[data.wegwijs.currentWeek||0]; }
function wegwijsSteps() { return normalizeWegwijsSteps(wegwijsWeek()); }

const talentScale=["Helemaal eens","Eens","Neutraal","Oneens","Helemaal oneens"];
const talentImpactStatements=[
  "Ik kan mijn talenten benoemen.",
  "Ik weet waar ik goed in ben.",
  "Ik weet welke richting bij mij past.",
  "Ik durf hulp te vragen voor mijn toekomst.",
  "Ik weet welke eerste stap ik kan zetten."
];
const talentCards=["Creatief","Sociaal","Doorzetter","Behulpzaam","Grappig","Rustig","Leider","Denker","Maker","Organisator","Zorgzaam","Nieuwsgierig"];
const talentInterests=["Mensen helpen","Dingen maken","Techniek","Organiseren","Verkopen","Zorgen","Creatief","Sport","Media","Beauty","Horeca","Dieren","Kinderen","Veiligheid","Ondernemen"];
const talentWeeks=[
  {
    id:"ontdekken",title:"Ontdek je talent",question:"Waar ben ik eigenlijk goed in?",duration:"60–75 min",status:"Actief",
    goals:["Eigen kwaliteiten herkennen","Talenten koppelen aan gedrag","Positieve feedback geven","Een eerste persoonlijk plan maken"],
    steps:[
      ["Welkom","Welkom bij Van Talent naar Toekomst","Jouw talent is meer dan waar je de beste in bent.",4,"Start rustig. Leg uit dat talent ook zichtbaar wordt in kleine dingen die iemand vaak vanzelf doet.","cover"],
      ["Intro","Wat is Van Talent naar Toekomst?","Ontdekken wie je bent, wat je kunt en wat bij je past.",5,"Maak duidelijk dat dit geen sollicitatietraining of beroepskeuzetest is.","route"],
      ["Vandaag","Wat gaan we vandaag doen?","Kijken naar jezelf én naar wat anderen in jou zien.",5,"Bespreek de vaste route en open daarna de beginmeting.","impact","impact"],
      ["Talentkaart","Kies je talentkaart","Welke kaart past al bij jou?",8,"Laat deelnemers één talent kiezen dat zij herkennen en één talent dat zij willen ontwikkelen.","cards","cards"],
      ["Bingo","Talenten Bingo","Wie herken jij in de ruimte?",10,"Laat deelnemers rondlopen en concrete voorbeelden vragen. Een naam alleen is niet genoeg.","bingo","bingo"],
      ["Bespreken","Wat viel je op?","Talenten zien er bij iedereen anders uit.",5,"Vraag welke talenten vaak voorkwamen en welke minder zichtbaar waren.","conversation"],
      ["Spiegel","Talent Spiegel","Wat zien anderen positief bij jou?",10,"Laat deelnemers respectvol één positieve kwaliteit voor een ander kiezen of schrijven.","mirror","mirror"],
      ["Compliment","Complimenten Challenge","Noem gedrag, niet alleen een mooi woord.",7,"Oefen concrete feedback: wat zag je iemand doen en welke kwaliteit laat dat zien?","feedback","feedback"],
      ["Trots","Mijn Trots Moment","Wanneer was jij trots op iets dat je deed?",8,"Laat deelnemers een echt moment beschrijven en daar een kwaliteit aan koppelen.","reflection","reflection"],
      ["Plan","Eerste Talent naar Toekomst Plan","Dit weet ik nu al over mezelf.",7,"Laat talenten, interesses en eerste ontwikkelwens opslaan.","plan","plan"],
      ["Reflectie","Wat verraste je?","Welke kwaliteit wil je onthouden?",4,"Verzamel een korte terugblik.","reflection","reflection"],
      ["Afsluiting","Talent groeit wanneer je het gebruikt","Volgende week onderzoeken we mogelijkheden.",3,"Benoem één opbrengst van de groep en kijk vooruit.","finish"]
    ]
  },
  {
    id:"mogelijkheden",title:"Ontdek je mogelijkheden",question:"Welke kansen en mogelijkheden passen bij mij?",duration:"60–75 min",status:"Actief",
    goals:["Interesses aan richtingen koppelen","Meerdere routes herkennen","Mogelijkheden onderzoeken","Een persoonlijke top drie kiezen"],
    steps:[
      ["Welkom","Welkom terug","Welke kwaliteit heb je deze week gebruikt?",5,"Laat deelnemers kort terugkijken.","cover"],
      ["Terugblik","Wat bleef hangen?","Wat weet je nu beter over jezelf?",5,"Haal talenten uit Week 1 terug.","conversation"],
      ["Interesses","Interesse Check","Waar krijg jij energie van?",8,"Laat deelnemers thema’s kiezen zonder direct over een beroep te praten.","cards","cards"],
      ["Carrousel","Mogelijkheden Carrousel","School · stage · werk · cursus · ondernemen",12,"Laat kleine groepen routes onderzoeken en één voordeel en vraag verzamelen.","team"],
      ["Match","Beroepen Match","Welke richting past bij dit talent?",10,"Koppel talenten aan meerdere richtingen. Voorkom dat één talent maar bij één beroep zou passen.","match","match"],
      ["Route","Welke route kies jij?","Je weet nog niet wat je wilt, maar je wilt wel iets doen.",8,"Laat deelnemers een haalbare verkenningsroute kiezen.","vote","vote"],
      ["Stellingen","Toekomst: eens of oneens","Er is nooit maar één route naar succes.",10,"Laat vijf seconden per stelling lopen en bespreek verschillende ervaringen.","quiz","quiz"],
      ["Top 3","Mijn mogelijkheden top 3","Wat wil jij verder onderzoeken?",7,"Laat iedere deelnemer drie richtingen bewaren.","plan","plan"],
      ["Reflectie","Wat wil je nog uitzoeken?","Wie kan jou daarbij helpen?",4,"Verzamel vragen voor Week 3.","reflection","reflection"],
      ["Afsluiting","Kiezen begint met onderzoeken","Je hoeft nog niet alles zeker te weten.",3,"Sluit af zonder druk om nu al definitief te kiezen.","finish"]
    ],
    vote:[["Welke route zou jij als eerste proberen?",["Opleiding zoeken","Stage lopen","Vrijwilligerswerk","Baan zoeken","Meelopen","Cursus volgen","Met een coach praten"],0]],
    quiz:[
      ["Je moet jong al precies weten wat je wilt worden.",["Eens","Oneens","Twijfel"],1,"Ontwikkeling verloopt via proberen, leren en bijstellen."],
      ["Een diploma is de enige weg naar succes.",["Eens","Oneens","Twijfel"],1,"Er zijn meerdere routes, al kan een diploma voor sommige richtingen nodig zijn."],
      ["Ondernemen is alleen voor mensen met veel geld.",["Eens","Oneens","Twijfel"],1,"Ondernemen begint ook met vaardigheden, een idee, netwerk en kleine stappen."],
      ["Vrijwilligerswerk kan je toekomst helpen.",["Eens","Oneens","Twijfel"],0,"Je kunt ervaring, contacten en zelfvertrouwen opbouwen."],
      ["Fouten maken hoort bij ontdekken wat bij je past.",["Eens","Oneens","Twijfel"],0,"Proberen en bijstellen horen bij ontwikkeling."]
    ]
  },
  {
    id:"bouwen",title:"Toekomst bouwen",question:"Hoe kom ik van droom naar plan?",duration:"60–75 min",status:"Actief",
    goals:["Doelen concreet maken","Obstakels herkennen","Kleine haalbare stappen bedenken","Hulpbronnen kiezen"],
    steps:[
      ["Welkom","Welkom terug","Welke richting spreekt je nu aan?",5,"Maak ruimte voor veranderde ideeën.","cover"],
      ["Richting","Mijn richting tot nu toe","Wat wil je verder onderzoeken?",6,"Laat deelnemers hun top drie erbij pakken.","compass"],
      ["Doel","Van droom naar doel","Wat wil ik, waarom en wat heb ik nodig?",10,"Vertaal een brede wens naar een concreet doel.","target","plan"],
      ["Obstakels","Obstakel Challenge","Wat helpt wanneer je vastloopt?",12,"Laat teams oplossingen bedenken voor twijfel, uitstel, geld, weinig steun en angst om te falen.","team","obstacles"],
      ["Pad","Mijn Toekomstpad","Vandaag · deze week · deze maand · drie maanden",10,"Laat deelnemers stappen klein en zichtbaar maken.","path","plan"],
      ["Scenario","Wat zou jij doen?","Je twijfelt of je een opleiding aankunt.",10,"Laat deelnemers stemmen en bespreek waarom informatie zoeken, praten of meelopen kan helpen.","vote","vote"],
      ["Drie stappen","Mijn eerste drie stappen","Wat ga je echt doen?",9,"Laat acties voorzien van moment en hulpbron.","plan","plan"],
      ["Reflectie","Wat kan jou tegenhouden?","Wat helpt jou om toch te beginnen?",5,"Normaliseer obstakels en maak steun concreet.","reflection","reflection"],
      ["Afsluiting","Een plan begint klein","De eerste stap hoeft niet perfect te zijn.",3,"Kijk vooruit naar presenteren en afronden.","finish"]
    ],
    vote:[["Je wilt een opleiding volgen, maar twijfelt of je het aankunt. Wat doe je eerst?",["Niets doen","Informatie opzoeken","Met iemand praten","Direct opgeven","Meelopen of een open dag bezoeken"],4]]
  },
  {
    id:"stap",title:"Mijn volgende stap",question:"Wat ga ik na vandaag doen?",duration:"60–75 min",status:"Actief",
    goals:["Persoonlijk plan afronden","Kort presenteren","Feedback geven en ontvangen","Eén concrete vervolgstap vastleggen"],
    steps:[
      ["Welkom","De laatste bijeenkomst","Wat heb je over jezelf ontdekt?",5,"Vier ontwikkeling zonder deelnemers met elkaar te vergelijken.","cover"],
      ["Terugblik","Dit heb ik ontdekt","Welk talent herken je nu sterker?",6,"Laat deelnemers één ontdekking delen.","conversation"],
      ["Plan","Talent naar Toekomst Plan","Van talent en interesse naar actie.",15,"Laat deelnemers het volledige persoonlijke plan afronden.","plan","plan"],
      ["Pitch","Mijn Toekomst Pitch","Dit ben ik. Dit kan ik. Dit wil ik ontdekken.",12,"Geef een helder format en laat presenteren vrijwillig of in kleine groepen.","pitch","reflection"],
      ["Feedback","Feedback Cirkel","Ik zie bij jou dat…",10,"Bewaar feedback concreet, respectvol en bruikbaar.","feedback","feedback"],
      ["Muur","Toekomst Muur","Welke stap zet jij na vandaag?",8,"Laat iedere deelnemer één concrete stap plaatsen.","wall","postits"],
      ["Reflectie","Eindreflectie en impactmeting","Wat is veranderd sinds Week 1?",9,"Open dezelfde vijf stellingen en bespreek alleen het groepsverschil.","impact","impact"],
      ["Afsluiting","Jouw volgende stap begint nu","Wie of wat helpt jou om te starten?",5,"Sluit warm af en benadruk dat hulp vragen onderdeel is van vooruitgaan.","finish"]
    ]
  }
];

function normalizeTalentSteps(week) {
  return week.steps.map((step,index)=>({
    id:`talent-${week.id}-${index+1}`,short:step[0],title:step[1],question:step[2],duration:step[3],trainerText:step[4],visual:step[5],type:step[6]||null,
    interactive:Boolean(step[6]),results:["cards","bingo","mirror","feedback","quiz","vote","postits","impact","match","obstacles"].includes(step[6]),
    goal:week.goals[Math.min(index,week.goals.length-1)]||week.goals[0],
    questions:["Wat herken je hierin?","Welk concreet voorbeeld hoort hierbij?","Welke kleine stap past nu?"],
    attention:"Laat deelnemers zelf woorden kiezen, voorkom etiketten en vergelijk niemand met een ander.",
    instructions:step[6]?"Beantwoord alleen de actieve opdracht op je telefoon.":"Doe mee in de zaal; je telefoon mag weg."
  }));
}
function ensureTalentData(){data.talent||={currentWeek:0,versions:[{version:"1.0",status:"Actief"}]};}
function isTalent(){return data.activeWorkshop==="talent";}
function talentWeek(){ensureTalentData();return talentWeeks[data.talent.currentWeek||0];}
function talentSteps(){return normalizeTalentSteps(talentWeek());}

const workshops = [
  { id:"mic-on", title:"Mic On", description:"Van gesprek naar podcast. Een creatief traject waarin deelnemers samen een echte podcastaflevering maken.", audience:"School en buurt", weeks:"6 weken", status:"Beschikbaar", available:true },
  { id:"sterk", title:"Sterk Online", description:"Interactieve workshop over sociale media, AI, online druk, oplichting en bewuste keuzes.", audience:"13 jaar en ouder", weeks:"45–60 minuten", status:"Beschikbaar", available:true },
  { id:"wegwijs", title:"Samen Wegwijs in Nederland", subtitle:"Praktisch ontdekken, regelen en meedoen", description:"Een warm en interactief traject over instanties, geld, post, wonen, zorg, werk en actief meedoen.", audience:"Nieuwe Nederlanders, jongeren 16+, volwassenen, buurthuizen en maatschappelijke organisaties", weeks:"4 weken · 60–75 min", status:"Beschikbaar", available:true },
  { id:"talent", title:"Van Talent naar Toekomst", subtitle:"Ontdek wie je bent, wat je kunt en welke stap bij jou past", description:"Een interactief talentontwikkelingstraject richting school, werk, ondernemerschap of persoonlijke groei.", audience:"Jongeren 12–27 jaar, scholen, MBO, jongerenwerk en buurthuizen", weeks:"4 weken · 60–75 min", status:"Actief", available:true },
];

function init() {
  detectWorkshopNetworkHost();
  connectMicOnWeek1();
  connectWegwijs();
  connectTalent();
  connectSterkLive();
  renderWorkshops();
  updateWorkshopChrome();
  renderTrainer();
  renderScreen();
  renderParticipant();
  renderLibrary();
  renderAdmin();
  bindStaticEvents();
  updateSessionMeta();
  updatePresentationLink();
  applyLaunchMode();
}

function bindStaticEvents() {
  document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
  document.querySelectorAll("[data-open-workshop]").forEach(button => button.addEventListener("click", () => openWorkshop(button.dataset.workshop || "sterk")));
  document.getElementById("viewWorkshopProgram")?.addEventListener("click",()=>document.getElementById("workshopGrid")?.scrollIntoView({behavior:"smooth"}));
  document.getElementById("mobileMenu").addEventListener("click", () => document.querySelector(".rail").classList.toggle("open"));
  document.getElementById("resetDemo").addEventListener("click", resetDemo);
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modal").addEventListener("click", event => { if (event.target.id === "modal") closeModal(); });
  document.getElementById("prevModule").addEventListener("click", () => stepSlide(-1));
  document.getElementById("nextModule").addEventListener("click", () => stepSlide(1));
  document.getElementById("screenPrev").addEventListener("click", () => stepSlide(-1));
  document.getElementById("screenNext").addEventListener("click", () => stepSlide(1));
  document.getElementById("presentCurrent").addEventListener("click", openPresentationWindow);
  document.getElementById("copyPresentationUrl").addEventListener("click", copyPresentationLink);
  document.getElementById("sendToScreen").addEventListener("click", sendCurrentSlide);
  document.getElementById("screenFullscreen").addEventListener("click", togglePresentationFullscreen);
  document.getElementById("sessionSettings").addEventListener("click", openSessionSettings);
  document.getElementById("showParticipants")?.addEventListener("click", openParticipants);
  document.getElementById("startPoll")?.addEventListener("click", startPoll);
  document.getElementById("openPoll")?.addEventListener("click", showSterkResults);
  document.getElementById("openBingo")?.addEventListener("click", startBingo);
  document.getElementById("openBingoStatements")?.addEventListener("click", openBingoStatements);
  document.getElementById("resumeSlides")?.addEventListener("click", resumePresentation);
  document.getElementById("addNote")?.addEventListener("click", openNoteModal);
  document.getElementById("publishVersion").addEventListener("click", publishVersion);
  document.getElementById("exportMenu").addEventListener("click", () => setAdminTab("exports"));
  document.querySelectorAll("[data-admin-tab]").forEach(button => button.addEventListener("click", () => setAdminTab(button.dataset.adminTab)));
  document.addEventListener("keydown", event => {
    const typing=["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName);
    if (typing) return;
    if (event.key === "Escape" && document.fullscreenElement) {
      document.exitFullscreen?.();
      return;
    }
    if (isWegwijs() && (launchMode==="screen" || document.getElementById("trainerView")?.classList.contains("active"))) {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();wegwijsAction("activity",{index:(wegwijsState?.activityIndex||0)+1,maxIndex:wegwijsSteps().length-1});
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();wegwijsAction("activity",{index:(wegwijsState?.activityIndex||0)-1,maxIndex:wegwijsSteps().length-1});
      }
      return;
    }
    if (isTalent() && (launchMode==="screen" || document.getElementById("trainerView")?.classList.contains("active"))) {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();talentAction("activity",{index:(talentState?.activityIndex||0)+1,maxIndex:talentSteps().length-1});
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();talentAction("activity",{index:(talentState?.activityIndex||0)-1,maxIndex:talentSteps().length-1});
      }
      return;
    }
    if (isMicOnWeek1() && (launchMode==="screen" || document.getElementById("trainerView")?.classList.contains("active"))) {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        micWeek1Action("activity",{index:(micWeek1State?.activityIndex||0)+1});
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        micWeek1Action("activity",{index:(micWeek1State?.activityIndex||0)-1});
      }
      return;
    }
    if (launchMode !== "screen") return;
    if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      stepSlide(1);
    }
    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      stepSlide(-1);
    }
    if (event.key.toLowerCase() === "f") {
      event.preventDefault();
      togglePresentationFullscreen();
    }
  });
}

function applyLaunchMode() {
  const requestedMode = new URLSearchParams(window.location.search).get("mode");
  if (requestedMode === "screen") {
    document.body.classList.add("standalone-screen");
    showView("screen");
  }
  if (requestedMode === "participant") {
    document.body.classList.add("standalone-participant");
    showView("participant");
  }
}

function openPresentationWindow() {
  sendCurrentSlide();
  const screen = window.open(getPresentationUrl(), "slinnva-presentatie");
  if (screen) screen.focus();
  else toast("Sta pop-ups toe om het presentatiescherm apart te openen");
}

function getPresentationUrl() {
  const url = new URL(location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("mode", "screen");
  url.searchParams.set("workshop", data.activeWorkshop);
  url.searchParams.set("session",activeSessionId());
  if(isWegwijs())url.searchParams.set("week",(data.wegwijs.currentWeek||0)+1);
  if(isTalent())url.searchParams.set("week",(data.talent.currentWeek||0)+1);
  return url.href;
}

const DEFAULT_WORKSHOP_HOST = "192.168.2.25";

async function detectWorkshopNetworkHost() {
  if(!location.host||(!["localhost","127.0.0.1"].includes(location.hostname)))return;
  try {
    const response=await fetch("/api/network-info",{cache:"no-store"});
    const info=await response.json();
    if(info.host&&info.host!=="127.0.0.1"){
      localStorage.setItem("slinnva-workshop-host",info.host);
      updatePresentationLink();
      if(document.getElementById("screenView")?.classList.contains("active"))renderScreen();
    }
  } catch{}
}

function getWorkshopNetworkBase() {
  const saved=(localStorage.getItem("slinnva-workshop-host")||DEFAULT_WORKSHOP_HOST).trim().replace(/^https?:\/\//,"").replace(/\/.*$/,"");
  if(location.protocol.startsWith("http")&&!["localhost","127.0.0.1"].includes(location.hostname)) return `${location.protocol}//${location.host}/`;
  return `http://${saved}:4173/`;
}

function getParticipantUrl() {
  const url=new URL(getWorkshopNetworkBase());
  url.searchParams.set("mode","participant");
  url.searchParams.set("workshop",data.activeWorkshop);
  url.searchParams.set("session",activeSessionId());
  if(isWegwijs())url.searchParams.set("week",(data.wegwijs.currentWeek||0)+1);
  if(isTalent())url.searchParams.set("week",(data.talent.currentWeek||0)+1);
  return url.href;
}

function getParticipantUrlLabel() {
  return getParticipantUrl().replace(/^https?:\/\//,"").replace(/\/\?/,"?");
}

function updatePresentationLink() {
  document.getElementById("presentationUrl").value = getPresentationUrl();
}

async function copyPresentationLink() {
  const url = getPresentationUrl();
  try {
    await navigator.clipboard.writeText(url);
    toast("Presentatielink gekopieerd");
  } catch {
    const input = document.getElementById("presentationUrl");
    input.focus();
    input.select();
    toast("Presentatielink geselecteerd");
  }
}

function togglePresentationFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}

function sendCurrentSlide() {
  saveData();
  localStorage.setItem(`${STORAGE_KEY}-signal`, String(Date.now()));
  toast("Slide staat klaar op het presentatiescherm");
}

window.addEventListener("storage", event => {
  if (event.key === STORAGE_KEY || event.key === `${STORAGE_KEY}-signal`) {
    data = loadData();
    renderScreen();
    renderParticipant();
    renderLivePanel();
  }
});

function showView(view) {
  document.querySelectorAll(".view").forEach(section => section.classList.toggle("active", section.id === `${view}View`));
  document.querySelectorAll(".main-nav [data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === view));
  document.getElementById("crumbTitle").textContent = {
    dashboard: "Workshopplatform", micOn:"Mic On", wegwijs:"Samen Wegwijs", talent:"Van Talent naar Toekomst", trainer: "Trainersregie", screen: "Presentatiescherm", participant: "Telefoon deelnemer", library:"Bibliotheek", admin: "Beheermodus"
  }[view];
  document.querySelector(".rail").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (view === "trainer") renderTrainer();
  if (view === "micOn") renderMicOnDashboard();
  if (view === "wegwijs") renderWegwijsDashboard();
  if (view === "talent") renderTalentDashboard();
  if (view === "screen") renderScreen();
  if (view === "participant") renderParticipant();
  if (view === "library") renderLibrary();
  if (view === "admin") renderAdmin();
}

function renderWorkshops() {
  document.getElementById("workshopGrid").innerHTML = workshops.map((workshop, index) => `
    <article class="workshop-card ${workshop.available ? "available" : ""} ${workshop.id==="mic-on"?"story-card":""}">
      <span class="number">0${index + 1}</span>
      <span class="status">${workshop.status}</span>
      <h3>${workshop.title}</h3>${workshop.subtitle?`<h4 class="workshop-subtitle">${workshop.subtitle}</h4>`:""}<p>${workshop.description}</p>
      <dl><div><dt>Doelgroep</dt><dd>${workshop.audience}</dd></div><div><dt>Duur</dt><dd>${workshop.weeks}</dd></div></dl>
      <button class="workshop-open" data-open-card="${workshop.id}" ${workshop.available?"":"disabled"}>${workshop.available?"Open workshop":"Binnenkort"}</button>
    </article>`).join("");
  document.querySelectorAll("[data-open-card]").forEach(button=>button.addEventListener("click",()=>openWorkshop(button.dataset.openCard)));
}

function openWorkshop(workshop) {
  if(workshop==="mic-on") {
    renderMicOnDashboard();
    showView("micOn");
    return;
  }
  if(workshop==="wegwijs") {
    data.activeWorkshop="wegwijs";
    ensureWegwijsData();
    saveData();
    connectWegwijs();
    updateWorkshopChrome();
    updatePresentationLink();
    renderWegwijsDashboard();
    showView("wegwijs");
    return;
  }
  if(workshop==="talent") {
    data.activeWorkshop="talent";
    ensureTalentData();
    saveData();
    connectTalent();
    updateWorkshopChrome();
    updatePresentationLink();
    renderTalentDashboard();
    showView("talent");
    return;
  }
  data.activeWorkshop = workshop;
  if(workshop==="sterk")startNewLiveSession("sterk");
  if (isStoryWorkshop(workshop)) {
    attachActiveStory(data);
    data.story.currentWeek = Math.min(data.story.currentWeek, data.story.weeks.length - 1);
    data.story.currentSlide = 0;
  }
  saveData();
  connectMicOnWeek1();
  connectSterkLive();
  updateWorkshopChrome();
  updatePresentationLink();
  renderTrainer();
  renderScreen();
  renderParticipant();
  renderAdmin();
  showView("trainer");
}

function renderMicOnDashboard() {
  const target=document.getElementById("micOnDashboard");
  if(!target)return;
  const editions=[
    {id:"story-school",label:"School Editie",subtitle:"Jongeren aan het woord",description:data.micOnSchool.description,audience:"VO en MBO",tone:"school"},
    {id:"story-community",label:"Buurt Editie",subtitle:"Verhalen uit de buurt",description:data.micOnCommunity.description,audience:"Jongeren, volwassenen en senioren",tone:"community"}
  ];
  target.innerHTML=`<div class="mic-edition-grid">${editions.map(edition=>`
    <section class="mic-edition-card ${edition.tone}">
      <div class="mic-edition-intro"><p class="eyebrow">Mic On</p><h2>${edition.label}</h2><h3>${edition.subtitle}</h3><p>${edition.description}</p><span>${edition.audience}</span></div>
      <div class="mic-week-grid">${Array.from({length:6},(_,index)=>{
        const story=edition.id==="story-school"?data.micOnSchool:data.micOnCommunity;
        const week=story.weeks[index];
        return `<article class="${index===0?"ready":""}"><b>0${index+1}</b><div><strong>${escapeHtml(week.title)}</strong><small>${index===0?"Volledig interactief":"Trajectweek beschikbaar"}</small></div><button data-start-mic-week="${edition.id}" data-week="${index}">Start trainermodus</button></article>`;
      }).join("")}</div>
    </section>`).join("")}</div>`;
  document.querySelectorAll("[data-start-mic-week]").forEach(button=>button.addEventListener("click",()=>{
    data.activeWorkshop=button.dataset.startMicWeek;
    startNewLiveSession(data.activeWorkshop);
    attachActiveStory(data);
    data.story.currentWeek=Number(button.dataset.week);
    data.story.currentSlide=0;
    saveData();
    connectMicOnWeek1();
    updateWorkshopChrome();
    updatePresentationLink();
    renderTrainer();
    renderScreen();
    renderParticipant();
    showView("trainer");
    if(data.activeWorkshop==="story-school"&&data.story.currentWeek===0) {
      setTimeout(()=>{
        micWeek1Action("activity",{index:0});
        micWeek1Action("control",{status:"waiting",revealResults:false});
      },150);
    }
  }));
}

function renderWegwijsDashboard() {
  const target=document.getElementById("wegwijsDashboard");
  if(!target)return;
  target.innerHTML=wegwijsWeeks.map((week,index)=>`
    <article class="wegwijs-week-card">
      <div class="wegwijs-week-number">0${index+1}</div>
      <div>
        <p class="eyebrow">Week ${index+1} · ${week.duration} minuten</p>
        <h2>${escapeHtml(week.title)}</h2>
        <blockquote>${escapeHtml(week.question)}</blockquote>
        <ul>${week.goals.slice(0,3).map(goal=>`<li>${escapeHtml(goal)}</li>`).join("")}</ul>
      </div>
      <div class="wegwijs-week-actions">
        <button class="button dark" data-start-wegwijs="${index}">Start trainermodus</button>
        <button class="button light" data-prepare-wegwijs="${index}">Bekijk voorbereiding</button>
        <button class="button light" data-results-wegwijs="${index}">Bekijk resultaten</button>
      </div>
    </article>`).join("");
  document.querySelectorAll("[data-start-wegwijs]").forEach(button=>button.addEventListener("click",()=>startWegwijsWeek(Number(button.dataset.startWegwijs))));
  document.querySelectorAll("[data-prepare-wegwijs]").forEach(button=>button.addEventListener("click",()=>openWegwijsPreparation(Number(button.dataset.prepareWegwijs))));
  document.querySelectorAll("[data-results-wegwijs]").forEach(button=>button.addEventListener("click",()=>openWegwijsResults(Number(button.dataset.resultsWegwijs))));
}

function startWegwijsWeek(index) {
  data.activeWorkshop="wegwijs";
  startNewLiveSession("wegwijs");
  ensureWegwijsData();
  data.wegwijs.currentWeek=index;
  saveData();
  connectWegwijs();
  updateWorkshopChrome();
  updatePresentationLink();
  wegwijsAction("control",{weekIndex:index,status:"waiting",revealResults:false});
  wegwijsAction("activity",{index:0,maxIndex:wegwijsSteps().length-1});
  renderTrainer();renderScreen();renderParticipant();showView("trainer");
}

function openWegwijsPreparation(index) {
  const week=wegwijsWeeks[index];
  openModal(`<p class="eyebrow">Voorbereiding · Week ${index+1}</p><h2>${escapeHtml(week.title)}</h2>
    <p class="lead">${escapeHtml(week.question)}</p>
    <h3>Leerdoelen</h3><ul>${week.goals.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <h3>Vaste workshopflow</h3><ol>${normalizeWegwijsSteps(week).map(item=>`<li>${escapeHtml(item.title)} · ${item.duration} min</li>`).join("")}</ol>
    <p><strong>Voorbereiden:</strong> laptop, beamer, lokale workshopserver, telefoons voor korte opdrachten en de geprinte actiekaart uit de bibliotheek.</p>`);
}

function openWegwijsResults(index) {
  const state=wegwijsState||createLocalWegwijsState();
  const weekId=wegwijsWeeks[index].id;
  const rows=Object.entries(state.responses||{}).filter(([key])=>key.endsWith(`-${weekId}`)).flatMap(([key,items])=>items.map(item=>({key,...item})));
  openModal(`<p class="eyebrow">Resultaten · Week ${index+1}</p><h2>${escapeHtml(wegwijsWeeks[index].title)}</h2>
    <p>${rows.length} opgeslagen antwoorden in deze sessie.</p>
    <div class="result-list">${rows.slice(0,30).map(item=>`<article class="version-card"><strong>${escapeHtml(item.name||"Deelnemer")}</strong><span>${escapeHtml(wegwijsResponseSummary(item))}</span></article>`).join("")||"<p>Nog geen resultaten.</p>"}</div>`);
}

function renderTalentDashboard() {
  const target=document.getElementById("talentDashboard");
  if(!target)return;
  target.innerHTML=talentWeeks.map((week,index)=>`
    <article class="talent-week-card">
      <div class="talent-week-number">0${index+1}</div>
      <div>
        <div class="talent-week-meta"><p class="eyebrow">Week ${index+1} · ${week.duration}</p><span>${week.status}</span></div>
        <h2>${escapeHtml(week.title)}</h2>
        <blockquote>${escapeHtml(week.question)}</blockquote>
        <ul>${week.goals.slice(0,3).map(goal=>`<li>${escapeHtml(goal)}</li>`).join("")}</ul>
      </div>
      <div class="talent-week-actions">
        <button class="button dark" data-start-talent="${index}">Start trainermodus</button>
        <button class="button light" data-prepare-talent="${index}">Bekijk voorbereiding</button>
        <button class="button light" data-results-talent="${index}">Bekijk resultaten</button>
      </div>
    </article>`).join("");
  document.querySelectorAll("[data-start-talent]").forEach(button=>button.addEventListener("click",()=>startTalentWeek(Number(button.dataset.startTalent))));
  document.querySelectorAll("[data-prepare-talent]").forEach(button=>button.addEventListener("click",()=>openTalentPreparation(Number(button.dataset.prepareTalent))));
  document.querySelectorAll("[data-results-talent]").forEach(button=>button.addEventListener("click",()=>openTalentResults(Number(button.dataset.resultsTalent))));
}

function startTalentWeek(index) {
  data.activeWorkshop="talent";
  startNewLiveSession("talent");
  ensureTalentData();
  data.talent.currentWeek=index;
  saveData();
  connectTalent();
  updateWorkshopChrome();
  updatePresentationLink();
  talentAction("control",{weekIndex:index,status:"waiting",revealResults:false});
  talentAction("activity",{index:0,maxIndex:talentSteps().length-1});
  renderTrainer();renderScreen();renderParticipant();showView("trainer");
}

function openTalentPreparation(index) {
  const week=talentWeeks[index];
  openModal(`<p class="eyebrow">Voorbereiding · Week ${index+1}</p><h2>${escapeHtml(week.title)}</h2><p class="lead">${escapeHtml(week.question)}</p>
    <h3>Leerdoelen</h3><ul>${week.goals.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <h3>Vaste workshopflow</h3><ol>${normalizeTalentSteps(week).map(item=>`<li>${escapeHtml(item.title)} · ${item.duration} min</li>`).join("")}</ol>
    <p><strong>Voorbereiden:</strong> laptop, beamer, lokale workshopserver, telefoons voor korte opdrachten en de Talent-materialen uit de bibliotheek.</p>`);
}

function openTalentResults(index) {
  const state=talentState||createLocalTalentState();
  const weekId=talentWeeks[index].id;
  const rows=Object.entries(state.responses||{}).filter(([key])=>key.endsWith(`-${weekId}`)).flatMap(([key,items])=>items.map(item=>({activity:key,...item})));
  openModal(`<p class="eyebrow">Resultaten · Week ${index+1}</p><h2>${escapeHtml(talentWeeks[index].title)}</h2><p>${rows.length} opgeslagen antwoorden.</p>
    <div class="result-list">${rows.slice(0,40).map(item=>`<article class="version-card"><strong>${escapeHtml(item.name||"Deelnemer")}</strong><span>${escapeHtml(talentResponseSummary(item))}</span></article>`).join("")||"<p>Nog geen resultaten.</p>"}</div>`);
}

function updateWorkshopChrome() {
  if(isTalent()) {
    const week=talentWeek();
    document.getElementById("versionChip").textContent="Van Talent naar Toekomst · v1.0";
    document.getElementById("trainerWorkshopTitle").textContent=`Van Talent naar Toekomst · Week ${(data.talent.currentWeek||0)+1}`;
    document.getElementById("trainerWorkshopLead").textContent=`${week.duration} · ${week.title}`;
    document.getElementById("participantInfoTitle").textContent="Alleen de actieve Talent-opdracht.";
    document.getElementById("participantInfoText").textContent="Deelnemers zien geen menu. Groepsresultaten zijn anoniem; individuele antwoorden blijven alleen voor de trainer zichtbaar.";
    return;
  }
  if(isWegwijs()) {
    const week=wegwijsWeek();
    document.getElementById("versionChip").textContent="Samen Wegwijs · v1.0";
    document.getElementById("trainerWorkshopTitle").textContent=`Samen Wegwijs · Week ${(data.wegwijs.currentWeek||0)+1}`;
    document.getElementById("trainerWorkshopLead").textContent=`${week.duration} minuten · ${week.title}`;
    document.getElementById("participantInfoTitle").textContent="Alleen de actieve Wegwijs-opdracht.";
    document.getElementById("participantInfoText").textContent="Deelnemers zien geen menu en geen volgende onderdelen. Resultaten verschijnen anoniem op het presentatiescherm.";
    return;
  }
  const isStory = isStoryWorkshop();
  document.getElementById("versionChip").textContent = isStory ? `${data.story.name} · v${data.story.versions[0]?.version||"1.0"}` : "Sterk Online · v1.0";
  document.getElementById("trainerWorkshopTitle").textContent = isStory ? data.story.name : "Sterk Online";
  document.getElementById("trainerWorkshopLead").textContent = isStory ? `6 weken · ${data.story.subtitle}.` : "45–60 minuten · Veilig, bewust en weerbaar online.";
  document.getElementById("participantInfoTitle").textContent = isStory ? data.story.subtitle : "Meedoen via je telefoon.";
  document.getElementById("participantInfoText").textContent = isStory
    ? "Werkbladen, ideeën, reflecties en jouw voortgang worden lokaal in dit traject bewaard."
    : "Deze weergave laat zien wat deelnemers na het scannen van de QR-code ervaren. Antwoorden worden alleen als groepsresultaat getoond.";
}

function storyWeek() {
  return data.story.weeks[data.story.currentWeek];
}

function storyTopics() {
  return data.story.variantTopics[data.story.variant];
}

function renderStoryTrainer() {
  updateWorkshopChrome();
  const story = data.story;
  const week = storyWeek();
  document.getElementById("durationTotal").textContent = `${story.session.weeks} weken`;
  document.getElementById("moduleList").innerHTML = story.weeks.map((item,index) => `
    <button class="module-row ${index === story.currentWeek ? "active" : ""}" data-story-week="${index}">
      <span class="step">W${index + 1}</span>
      <span><strong>${item.short}</strong><small>${item.title}</small></span><time>${item.duration} min</time>
    </button>`).join("");
  document.querySelectorAll("[data-story-week]").forEach(button => button.addEventListener("click", () => {
    story.currentWeek = Number(button.dataset.storyWeek);
    story.currentSlide = 0;
    saveData();
    renderStoryTrainer();
    renderStoryScreen();
    renderStoryParticipant();
  }));
  const slideNumber = story.weeks.slice(0,story.currentWeek).reduce((sum,item)=>sum+item.slides.length,0) + story.currentSlide + 1;
  const slideTotal = story.weeks.reduce((sum,item)=>sum+item.slides.length,0);
  document.getElementById("stageCounter").textContent = `Studioslide ${slideNumber} van ${slideTotal}`;
  document.getElementById("trainerModule").innerHTML = `
    <div class="stage-content story-trainer-content">
      <div class="story-week-kicker"><span>Week ${story.currentWeek + 1}</span><strong>${story.editions[story.variant].label}</strong></div>
      <p class="eyebrow">${week.duration} minuten · Creatieve podcastreis</p>
      <h2>${week.title}</h2>
      <div class="goal"><strong>Leerdoel</strong><br>${week.goal}</div>
      <div class="trainer-tabs story-tabs">
        <button class="active" data-story-tab="script">Spreektekst</button>
        <button data-story-tab="planning">Tijdsplanning</button>
        <button data-story-tab="exercises">Oefeningen</button>
        <button data-story-tab="questions">Vragen</button>
        <button data-story-tab="deepQuestions">Verdieping</button>
        <button data-story-tab="responses">Reacties</button>
        <button data-story-tab="worksheet">Werkblad</button>
        <button data-story-tab="terms">Begrippen</button>
        <button data-story-tab="materials">Benodigdheden</button>
        <button data-story-tab="groups">Groepstips</button>
        <button data-story-tab="note">Notitie</button>
      </div>
      <div class="script-box" id="trainerTabContent">${storyTrainerTab("script")}</div>
    </div>`;
  document.querySelectorAll("[data-story-tab]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-story-tab]").forEach(item => item.classList.toggle("active",item===button));
    document.getElementById("trainerTabContent").innerHTML = storyTrainerTab(button.dataset.storyTab);
    bindStoryNote();
  }));
  document.getElementById("slideSelector").innerHTML = week.slides.map((slide,index)=>`
    <button class="${index===story.currentSlide?"active":""}" data-story-slide="${index}">
      <strong>${index+1}. ${slide.label}</strong>${slide.kind}
    </button>`).join("");
  document.querySelectorAll("[data-story-slide]").forEach(button => button.addEventListener("click", () => {
    story.currentSlide=Number(button.dataset.storySlide); saveData(); renderStoryTrainer(); renderStoryScreen();
  }));
  const completed = Math.round((story.currentWeek / story.weeks.length) * 100);
  document.querySelector(".live-panel").innerHTML = `
    <div class="live-head"><i></i><strong>Podcasttraject</strong></div>
    <div class="metric"><strong>${story.participants.length}</strong><span>deelnemers</span></div>
    <div class="story-progress"><i style="width:${completed}%"></i></div>
    <p class="label">Voortgang · ${completed}%</p>
    <hr>
    <div class="trajectory-identity"><span>${story.variant==="school"?"SCHOOL EDITIE":"BUURT EDITIE"}</span><strong>${escapeHtml(story.centralQuestion)}</strong></div>
    <p class="label">Studioacties</p>
    <button class="quick-action primary-action" id="storyStartQr"><span>⌁</span>${story.qrActiveWeek===story.currentWeek&&story.qrMode==="active"?"QR-opdracht actief":"Start QR-opdracht"}</button>
    <button class="quick-action" id="storyShowQr"><span>▥</span>Toon QR-resultaten</button>
    <button class="quick-action" id="storyResumeSlides"><span>▶</span>Terug naar slides</button>
    <button class="quick-action primary-action" id="storyParticipantForm"><span>✎</span>Open werkblad</button>
    <button class="quick-action" id="storyPracticeCard"><span>◇</span>Genereer oefenkaart</button>
    <button class="quick-action ${story.currentWeek===4?"primary-action":""}" id="storyRecord"><span>●</span>${story.recordingActive?"Stop opname":"Start opname"}</button>
    <button class="quick-action" id="storyCertificate"><span>□</span>Certificaten</button>
    <button class="quick-action" id="addNote"><span>＋</span>Notitie toevoegen</button>`;
  bindStoryTrainerActions();
  if (isMicOnWeek1()) renderMicOnWeek1Trainer();
}

function storyTrainerTab(tab) {
  const week = storyWeek();
  const slide=week.slides[data.story.currentSlide];
  const lists = {
    planning:week.planning, exercises:week.exercises, questions:week.questions, deepQuestions:week.deepQuestions||[], responses:week.responses, materials:week.materials||[]
  };
  if (tab === "script") return `<p class="label">Trainersblok bij deze slide</p><h3>${escapeHtml(slide.trainerTitle||week.title)}</h3>
    ${formatParagraphs(slide.trainerBlock||week.script)}
    <div class="trainer-slide-prompt"><strong>Op het scherm</strong><br>${escapeHtml(slide.title)}<br><small>${escapeHtml(slide.question)}</small></div>
    <div class="trainer-slide-prompt interaction-cue"><strong>Werkvorm</strong><br>${storyInteractionLabel(slide.interaction)}</div>`;
  if (lists[tab]) return `<ul>${lists[tab].map(item=>`<li>${item}</li>`).join("")}</ul>`;
  if (tab === "terms") return `<h4>Begrippen in eenvoudige taal</h4><ul>
    ${storyTerms(data.story.currentWeek).map(item=>`<li><strong>${item[0]}</strong><br>${item[1]}</li>`).join("")}</ul>`;
  if (tab === "groups") return `<h4>Stille deelnemers</h4><ul>${week.quiet.map(item=>`<li>${item}</li>`).join("")}</ul>
    <h4>Drukke groepen</h4><ul>${week.busy.map(item=>`<li>${item}</li>`).join("")}</ul>
    <h4>Gemengde leeftijden</h4><ul>${week.mixed.map(item=>`<li>${item}</li>`).join("")}</ul>`;
  if (tab === "worksheet") return `<h4>Werkbladinstructie</h4><p>${escapeHtml(week.worksheetInstructions||"Laat deelnemers het werkblad rustig invullen en bespreek alleen wat zij willen delen.")}</p>
    <h4>Velden</h4><ul>${week.worksheet.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  return `<textarea class="note-area" id="storyInlineNote" placeholder="Wat wil je onthouden over week ${data.story.currentWeek+1}?"></textarea>
    <button class="button dark" id="saveStoryNote">Notitie opslaan</button>`;
}

function bindStoryNote() {
  document.getElementById("saveStoryNote")?.addEventListener("click",()=>{
    const text=document.getElementById("storyInlineNote").value.trim(); if(!text)return;
    data.story.notes.unshift({week:data.story.currentWeek+1,date:new Date().toLocaleDateString("nl-NL"),text});
    saveData("Notitie opgeslagen");
    document.getElementById("storyInlineNote").value="";
  });
}

function bindStoryTrainerActions() {
  document.getElementById("storyParticipantForm")?.addEventListener("click",()=>showView("participant"));
  document.getElementById("storyStartQr")?.addEventListener("click",startStoryQr);
  document.getElementById("storyShowQr")?.addEventListener("click",showStoryQrResults);
  document.getElementById("storyResumeSlides")?.addEventListener("click",()=>{
    data.story.qrMode="idle";saveData("Presentatie hervat");renderStoryTrainer();renderStoryScreen();sendCurrentSlide();
  });
  document.getElementById("storyPracticeCard")?.addEventListener("click",openStoryPracticeCard);
  document.getElementById("storyRecord")?.addEventListener("click",toggleStoryRecording);
  document.getElementById("storyCertificate")?.addEventListener("click",openStoryCertificates);
  document.getElementById("addNote")?.addEventListener("click",()=> {
    openModal(`<p class="eyebrow">Trainernotitie</p><h2>${storyWeek().title}</h2><textarea class="note-area" id="storyModalNote"></textarea><button class="button dark" id="saveStoryModalNote">Opslaan</button>`);
    document.getElementById("saveStoryModalNote").addEventListener("click",()=>{
      const text=document.getElementById("storyModalNote").value.trim(); if(!text)return;
      data.story.notes.unshift({week:data.story.currentWeek+1,date:new Date().toLocaleDateString("nl-NL"),text}); saveData("Notitie opgeslagen"); closeModal();
    });
  });
}

function storyTerms(weekIndex) {
  return [
    [["Podcast","Een gesprek of verhaal dat je kunt terugluisteren."],["Host","De persoon die het gesprek begeleidt."],["Aflevering","Eén opgenomen deel van een podcast."]],
    [["Samenvatten","In je eigen woorden kort vertellen wat je hoorde."],["Doorvragen","Een extra vraag stellen op iets dat de ander net zei."]],
    [["Open vraag","Een vraag die uitnodigt tot een langer antwoord."],["Hoofdvraag","De belangrijkste vraag die richting geeft aan het gesprek."]],
    [["Doelgroep","De mensen voor wie je de podcast maakt."],["Intro en outro","De opening en afsluiting van de aflevering."]],
    [["Microfoonafstand","De ruimte tussen je mond en de microfoon."],["Redactie","De mensen die inhoudelijke keuzes bewaken."]],
    [["Montage","De opname inkorten en onderdelen in de juiste volgorde zetten."],["Publiceren","De aflevering beschikbaar maken voor luisteraars."]]
  ][weekIndex] || [];
}

function startStoryQr() {
  const story=data.story;
  if(story.qrMode!=="active"||story.qrActiveWeek!==story.currentWeek) story.qrResults[storyWeek().id]=[];
  story.qrActiveWeek=story.currentWeek;
  story.qrMode="active";
  saveData(`${storyWeek().qr.title} gestart`);
  renderStoryTrainer();
  renderStoryParticipant();
  renderStoryScreen();
  sendCurrentSlide();
}

function showStoryQrResults() {
  data.story.qrActiveWeek=data.story.currentWeek;
  data.story.qrMode="results";
  saveData("QR-resultaten op het scherm");
  renderStoryTrainer();
  renderStoryScreen();
  sendCurrentSlide();
}

function renderStoryScreen() {
  const story=data.story, week=storyWeek(), slide=week.slides[story.currentSlide];
  if (isMicOnWeek1()) {
    renderMicOnWeek1Screen();
    return;
  }
  const before=story.weeks.slice(0,story.currentWeek).reduce((sum,item)=>sum+item.slides.length,0);
  const total=story.weeks.reduce((sum,item)=>sum+item.slides.length,0);
  document.getElementById("screenProgress").textContent=`${before+story.currentSlide+1} / ${total}`;
  document.getElementById("presentationProgressBar").style.width=`${((before+story.currentSlide+1)/total)*100}%`;
  document.getElementById("screenParticipants").textContent=story.participants.length;
  const publicScreen=document.getElementById("publicScreen");
  publicScreen.dataset.theme="story";
  publicScreen.dataset.edition=story.variant;
  if (story.qrActiveWeek===story.currentWeek && story.qrMode!=="idle") {
    publicScreen.innerHTML=renderStoryQrScreen(week);
    return;
  }
  publicScreen.innerHTML=`<div class="podcast-studio ${story.variant==="school"?"school-studio":"community-studio"}">
    <div class="studio-light light-left"></div><div class="studio-light light-right"></div>
    <div class="studio-wave">${Array.from({length:18},(_,i)=>`<i style="height:${18+(i%6)*12}px"></i>`).join("")}</div>
    <div class="studio-mic"><i></i><b></b><span></span></div>
    <div class="studio-headphones"><i></i><b></b></div>
    <div class="studio-table"></div>
    ${storyEditionDecor(story.variant)}
    ${storySlideVisual(slide)}
    <div class="story-journey">${story.weeks.map((item,index)=>`<span class="${index===story.currentWeek?"active":index<story.currentWeek?"done":""}"><b>0${index+1}</b>${item.short}</span>`).join("")}</div>
    <div class="story-slide-copy ${slide.interaction?"with-interaction":""}"><p class="eyebrow">${escapeHtml(slide.label)} · ${story.variant==="school"?"School":"Buurthuis"}</p>
      <h1>${escapeHtml(slide.title)}</h1><p>${escapeHtml(slide.question)}</p></div>
    ${renderStoryInteraction(slide)}
    <div class="story-week-number">0${story.currentWeek+1}</div>
  </div>`;
  bindStoryScreenInteractions(slide);
}

function storyEditionDecor(edition) {
  return edition==="school"
    ? `<div class="school-lightbox">MIC ON</div><div class="school-backpack"><i></i></div><div class="school-phone"></div>`
    : `<div class="community-plant"><i></i><i></i><i></i><b></b></div><div class="community-cups"><i></i><i></i></div><div class="community-frames"><i></i><i></i></div>`;
}

function renderStoryQrScreen(week) {
  const story=data.story;
  const results=story.qrResults[week.id]||[];
  const isResults=story.qrMode==="results";
  return `<div class="podcast-studio qr-studio ${story.variant==="school"?"school-studio":"community-studio"}">
    <div class="studio-light light-left"></div><div class="studio-light light-right"></div>
    <div class="studio-wave">${Array.from({length:18},(_,i)=>`<i style="height:${22+(i%7)*10}px"></i>`).join("")}</div>
    <div class="story-journey">${story.weeks.map((item,index)=>`<span class="${index===story.currentWeek?"active":index<story.currentWeek?"done":""}"><b>0${index+1}</b>${item.short}</span>`).join("")}</div>
    ${storyEditionDecor(story.variant)}
    <section class="story-qr-stage">
      <div class="story-qr-copy"><p class="eyebrow">Week ${story.currentWeek+1} · ${escapeHtml(week.qr.title)}</p>
        <h1>${escapeHtml(week.qr.question)}</h1>
        <p>${isResults?"Dit koos de groep.":"Scan de QR-code en kies kort jouw antwoord."}</p></div>
      ${isResults?renderStoryQrResults(week.qr,results):`<div class="story-qr-code">${fakeQr()}<strong>DOE MEE</strong><small>${escapeHtml(getParticipantUrlLabel())}</small><span>${results.length} antwoord${results.length===1?"":"en"} ontvangen</span></div>`}
    </section>
  </div>`;
}

function renderStoryQrResults(qr,results) {
  if (qr.type==="wordcloud") {
    const words=results.map(item=>item.value).filter(Boolean);
    return `<div class="mic-wordcloud">${words.length?words.map((word,index)=>`<span style="--s:${1+(index%4)*.22}">${escapeHtml(word)}</span>`).join(""):"<p>De eerste woorden verschijnen hier.</p>"}</div>`;
  }
  const counts=qr.options.map((option,index)=>({option,count:results.filter(item=>item.values?.includes(index)||item.value===index).length}));
  const max=Math.max(1,...counts.map(item=>item.count));
  return `<div class="story-qr-results">${counts.map(item=>`<article><div><strong>${escapeHtml(item.option)}</strong><span>${item.count}</span></div><i style="width:${item.count/max*100}%"></i></article>`).join("")}</div>`;
}

function storySlideVisual(slide) {
  if (slide.interaction==="discover") return `<div class="studio-prop central-mic"><i></i><b></b></div>
    <div class="format-orbit"><span>Verhaal</span><span>Storytelling</span><span>Gesprek</span><span>Interview</span></div>`;
  if (slide.interaction==="listen-compare") return `<div class="studio-prop interview-table"><div class="studio-person distracted"><i></i><b></b><span>Horen</span></div><div class="mini-table"></div><div class="studio-person attentive"><i></i><b></b><span>Luisteren</span></div></div>`;
  if (slide.kind==="wall") return `<div class="studio-prop postit-wall">${storyTopics().slice(0,6).map((item,i)=>`<span style="--r:${(i-2)*3}deg">${item}</span>`).join("")}</div>`;
  if (slide.kind==="canvas") return `<div class="studio-prop production-table"><div class="coffee-mug"><i></i></div><div class="mixing-mini">${Array.from({length:6},()=>"<i></i>").join("")}</div></div>`;
  if (slide.kind==="record") return `<div class="studio-prop record-lamp"><i></i><strong>REC</strong></div>`;
  if (slide.kind==="publish") return `<div class="studio-prop publish-screen"><i>▶</i><strong>${escapeHtml(data.story.canvas.name||"AFLEVERING 01")}</strong><span>Klaar om terug te luisteren</span></div>`;
  if (slide.kind==="wave") return `<div class="studio-prop listening-card"><strong>...</strong><span>Laat de stilte werken</span></div>`;
  return `<div class="studio-prop notebook"><span>VERHAAL</span><i></i><i></i><i></i></div>`;
}

function storyInteractionLabel(type) {
  return {
    discover:"Ontdek samen de vier podcastvormen rond de microfoon.",
    "story-cards":"Klik een verhaalkaart als startpunt voor het werkblad.",
    "listen-compare":"Vergelijk twee interviewers en benoem zichtbaar gedrag.",
    "question-sort":"Sorteer vragen als open of gesloten.",
    "postit-vote":"Klik post-its om onderwerpen te markeren.",
    "topic-cluster":"Kies het sterkste onderwerpcluster.",
    "canvas-cards":"Open de productiekaartjes één voor één.",
    "episode-timeline":"Zet de aflevering in de juiste volgorde.",
    "role-cards":"Kies en verdeel studiorollen.",
    "host-scenario":"Kies de beste vervolgvraag van de host.",
    "mixing-panel":"Zet onderdelen van de montage aan of uit.",
    launch:"Start de gezamenlijke podcastlancering."
    ,"podcast-puzzle":"Bouw samen de zeven onderdelen van een goed gesprek."
    ,"conversation-choice":"Kies welke eigenschappen een gesprek interessant maken."
    ,"dream-episode":"Vul de eerste vier productiekaarten in."
    ,"listen-check":"Maak zichtbaar welk luistergedrag de groep herkent."
    ,"worksheet-cards":"Gebruik drie kaarten om achter de woorden te luisteren."
    ,"question-cards":"Bouw een interview van hoofdvraag tot afsluiting."
    ,"name-battle":"Vergelijk podcastnamen en kies wat blijft hangen."
    ,"mic-check":"Oefen afstand, tempo en een duidelijke opening."
    ,"word-cloud":"Laat trotswoorden uit de QR-opdracht de studio vullen."
  }[type]||"Bespreek de centrale vraag met de groep.";
}

function renderStoryInteraction(slide) {
  const selected=data.story.interactionState?.[`${storyWeek().id}-${data.story.currentSlide}`]||[];
  if(slide.interaction==="story-cards") return `<div class="story-interaction story-card-deck">${["Hier praat ik graag over","Dit begrijpen mensen verkeerd","Dit verhaal moet gehoord worden"].map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}">${item}</button>`).join("")}</div>`;
  if(slide.interaction==="question-sort") return `<div class="story-interaction question-sort">
    ${["Ben je hier opgegroeid?","Wat maakte deze plek belangrijk?","Vond je dat moeilijk?","Hoe veranderde dat jouw kijk?"].map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}"><span>${item}</span><b>${selected.includes(String(index))?(index%2?"OPEN":"GESLOTEN"):"KIES"}</b></button>`).join("")}</div>`;
  if(slide.interaction==="postit-vote"||slide.interaction==="topic-cluster") return `<div class="story-interaction topic-votes">${storyTopics().slice(0,6).map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}">${item}<b>${selected.includes(String(index))?"✓":"+"}</b></button>`).join("")}</div>`;
  if(slide.interaction==="canvas-cards") return `<div class="story-interaction canvas-card-deck">${["Naam","Doelgroep","Gast","Onderwerp","Belangrijkste vraag"].map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}"><small>KAART 0${index+1}</small>${item}</button>`).join("")}</div>`;
  if(slide.interaction==="episode-timeline") return `<div class="story-interaction episode-line">${["Intro","Centrale vraag","Gesprek","Verdieping","Outro"].map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}"><b>${index+1}</b>${item}</button>`).join("")}</div>`;
  if(slide.interaction==="role-cards") return `<div class="story-interaction role-deck">${[["Host","🎙"],["Techniek","🎧"],["Redactie","✎"],["Gast","●"],["Tijd","◷"]].map(([item,icon],index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}"><i>${icon}</i>${item}</button>`).join("")}</div>`;
  if(slide.interaction==="host-scenario") return `<div class="story-interaction host-scenario"><blockquote>“Ik voelde me toen eigenlijk helemaal niet gehoord.”</blockquote>${["Waarom niet?","Dat heb ik ook gehad.","Kun je vertellen wanneer je dat merkte?"].map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}">${item}</button>`).join("")}</div>`;
  if(slide.interaction==="mixing-panel") return `<div class="story-interaction mixing-panel">${["Intro","Stemmen","Muziek","Pauzes","Outro"].map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}"><i></i><span>${item}</span></button>`).join("")}</div>`;
  if(slide.interaction==="launch") return `<div class="story-interaction launch-panel"><button data-story-launch class="${selected.length?"launched":""}">${selected.length?"PODCAST GELANCEERD":"START PREMIÈRE"}</button>${selected.length?'<div class="confetti">'+Array.from({length:18},(_,i)=>`<i style="--x:${(i%9)*11}%;--d:${i%5}"></i>`).join("")+"</div>":""}</div>`;
  if(slide.interaction==="podcast-puzzle") return `<div class="story-interaction mic-puzzle">${["Luisteren","Goede vragen","Respect","Samenwerking","Duidelijk onderwerp","Nieuwsgierigheid","Echte verhalen"].map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}">${item}</button>`).join("")}</div>`;
  if(slide.interaction==="conversation-choice") return `<div class="story-interaction mic-choice">${["Aandacht","Een echte vraag","Ruimte voor stilte","Een onverwacht antwoord"].map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}">${item}</button>`).join("")}</div>`;
  if(slide.interaction==="dream-episode") return `<div class="story-interaction canvas-card-deck">${["Titel","Onderwerp","Gast","Waarom luisteren?"].map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}"><small>PRODUCTIEKAART</small>${item}</button>`).join("")}</div>`;
  if(slide.interaction==="listen-check") return `<div class="story-interaction mic-choice">${storyWeek().qr.options.map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}">${item}</button>`).join("")}</div>`;
  if(slide.interaction==="worksheet-cards") return `<div class="story-interaction story-card-deck">${["Wat hoorde ik?","Wat bedoelde de ander?","Wat vraag ik hierna?"].map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}">${item}</button>`).join("")}</div>`;
  if(slide.interaction==="question-cards") return `<div class="story-interaction episode-line">${["Hoofdvraag","Vervolgvraag","Persoonlijk","Verdiepend","Afsluiting"].map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}"><b>${index+1}</b>${item}</button>`).join("")}</div>`;
  if(slide.interaction==="name-battle") return `<div class="story-interaction story-card-deck">${storyWeek().qr.options.slice(0,4).map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}">${escapeHtml(item)}</button>`).join("")}</div>`;
  if(slide.interaction==="mic-check") return `<div class="story-interaction mic-check">${["Een handbreedte","Rustig tempo","Adem voor je begint","Kijk naar je gast"].map((item,index)=>`<button data-story-choice="${index}" class="${selected.includes(String(index))?"selected":""}"><i></i>${item}</button>`).join("")}</div>`;
  if(slide.interaction==="word-cloud") return `<div class="story-interaction mic-wordcloud">${(data.story.qrResults.publish||[]).slice(-12).map((item,index)=>`<span style="--s:${1+(index%4)*.22}">${escapeHtml(item.value)}</span>`).join("")||"<span>Trots</span><span>Samenwerking</span><span>Stem</span>"}</div>`;
  return "";
}

function bindStoryScreenInteractions(slide) {
  data.story.interactionState ||= {};
  const key=`${storyWeek().id}-${data.story.currentSlide}`;
  document.querySelectorAll("[data-story-choice]").forEach(button=>button.addEventListener("click",()=>{
    const current=data.story.interactionState[key]||[];
    const value=button.dataset.storyChoice;
    data.story.interactionState[key]=current.includes(value)?current.filter(item=>item!==value):[...current,value];
    saveData();renderStoryScreen();
  }));
  document.querySelector("[data-story-launch]")?.addEventListener("click",()=>{data.story.interactionState[key]=["launched"];saveData();renderStoryScreen();});
}

function stepStorySlide(direction) {
  const story=data.story;
  const deck=story.weeks.flatMap((week,weekIndex)=>week.slides.map((_,slideIndex)=>({weekIndex,slideIndex})));
  const current=deck.findIndex(item=>item.weekIndex===story.currentWeek&&item.slideIndex===story.currentSlide);
  const target=Math.max(0,Math.min(deck.length-1,current+direction));
  story.currentWeek=deck[target].weekIndex; story.currentSlide=deck[target].slideIndex;
  saveData(); renderStoryTrainer(); renderStoryScreen(); renderStoryParticipant();
}

function renderTrainer() {
  document.getElementById("trainerView")?.classList.remove("mic-director-mode");
  document.getElementById("trainerView")?.classList.remove("wegwijs-director-mode");
  document.getElementById("trainerView")?.classList.remove("talent-director-mode");
  if (isTalent()) {
    renderTalentTrainer();
    return;
  }
  if (isWegwijs()) {
    renderWegwijsTrainer();
    return;
  }
  if (isStoryWorkshop()) {
    renderStoryTrainer();
    return;
  }
  ensureSterkTrainerControls();
  const modules = activeModules();
  const module = currentModule();
  document.getElementById("durationTotal").textContent = `${modules.reduce((sum, item) => sum + item.duration, 0)} min`;
  document.getElementById("moduleList").innerHTML = modules.map((item, index) => `
    <button class="module-row ${index === data.currentModule ? "active" : ""}" data-module-index="${index}">
      <span class="step">${String(index + 1).padStart(2, "0")}</span>
      <span><strong>${item.short}</strong><small>${item.title}</small></span><time>${item.duration} min</time>
    </button>`).join("");
  document.querySelectorAll("[data-module-index]").forEach(button => button.addEventListener("click", () => {
    data.currentModule = Number(button.dataset.moduleIndex); data.currentSlide = 0; data.screenMode = "slides"; saveData(); renderTrainer(); renderScreen();
  }));
  const deck = getPresentationDeck();
  const deckIndex = deck.findIndex(item => item.moduleIndex === data.currentModule && item.slideIndex === data.currentSlide);
  document.getElementById("stageCounter").textContent = deckIndex >= 0 ? `Presentatieslide ${deckIndex + 1} van ${deck.length}` : "Apart traineronderdeel";
  document.getElementById("trainerModule").innerHTML = `
    <div class="stage-content">
      <p class="eyebrow">${module.duration} minuten · ${module.type === "case" ? "Gesprekssituatie" : "Workshoponderdeel"}</p>
      <h2>${module.title}</h2>
      <div class="goal"><strong>Doel</strong><br>${module.goal}</div>
      <div class="trainer-tabs">
        <button class="active" data-trainer-tab="script">Spreektekst</button>
        <button data-trainer-tab="background">Achtergrond</button>
        <button data-trainer-tab="questions">Verdiepingsvragen</button>
        <button data-trainer-tab="tips">Praktische tips</button>
        <button data-trainer-tab="help">Hulp in Nederland</button>
        <button data-trainer-tab="terms">Moeilijke woorden</button>
        <button data-trainer-tab="note">Notitie</button>
      </div>
      <div class="script-box" id="trainerTabContent">${renderTrainerCue(module, data.currentSlide)}</div>
    </div>`;
  document.querySelectorAll("[data-trainer-tab]").forEach(button => button.addEventListener("click", () => showTrainerTab(button.dataset.trainerTab)));
  renderSlideSelector();
  renderLivePanel();
}

function renderSlideSelector() {
  const slides = getModuleSlides(currentModule());
  data.currentSlide = Math.min(data.currentSlide, slides.length - 1);
  document.getElementById("slideSelector").innerHTML = slides.map((slide, index) => `
    <button class="${index === data.currentSlide ? "active" : ""}" data-slide-index="${index}">
      <strong>${index + 1}. ${slide.label}</strong>${slide.hint}
    </button>`).join("");
  document.querySelectorAll("[data-slide-index]").forEach(button => button.addEventListener("click", () => {
    data.currentSlide = Number(button.dataset.slideIndex);
    data.screenMode = "slides";
    saveData();
    renderSlideSelector();
    renderScreen();
  }));
}

function showTrainerTab(tab) {
  document.querySelectorAll("[data-trainer-tab]").forEach(button => button.classList.toggle("active", button.dataset.trainerTab === tab));
  const module = currentModule();
  const content = {
    script: renderTrainerCue(module, data.currentSlide),
    background: `<ul>${module.background.map(item => `<li>${item}</li>`).join("")}</ul>`,
    questions: `<ul>${module.questions.map(item => `<li>${item}</li>`).join("")}</ul>`,
    tips: `<ul>${module.practicalTips.map(item => `<li>${item}</li>`).join("")}</ul>`,
    help: `<ul>${module.help.map(item => `<li>${item}</li>`).join("")}</ul>`,
    terms: module.terms.length ? module.terms.map(item => `<p><strong>${item.term}</strong><br>${item.meaning}</p>`).join("") : "<p>In dit onderdeel staan geen moeilijke woorden.</p>",
    note: `<textarea class="note-area" id="inlineNote" placeholder="Schrijf hier een notitie voor ${module.title}..."></textarea><button class="button dark" id="saveInlineNote">Notitie opslaan</button>`
  };
  document.getElementById("trainerTabContent").innerHTML = content[tab];
  if (tab === "note") document.getElementById("saveInlineNote").addEventListener("click", () => {
    const text = document.getElementById("inlineNote").value.trim();
    if (!text) return;
    data.notes.unshift({ date: new Date().toLocaleDateString("nl-NL"), module: module.title, text });
    saveData("Notitie opgeslagen"); document.getElementById("inlineNote").value = "";
  });
}

function formatParagraphs(text) { return text.split("\n\n").map(p => `<p>${p}</p>`).join(""); }

function renderTrainerCue(module, slideIndex) {
  const slide = module.presentation[Math.min(slideIndex, module.presentation.length - 1)];
  return `<p class="label">Volledige spreektekst</p>${formatParagraphs(module.script)}
    ${slide ? `<div class="trainer-slide-prompt"><strong>Vraag op het scherm</strong><br>${escapeHtml(slide.title)}${slide.question ? `<br><small>${escapeHtml(slide.question)}</small>` : ""}</div>` : ""}`;
}

function getTrainerCues(module) {
  if (module.id === "intro") return [
    "Welkom allemaal. Mijn naam is Sharmilenka en ik ben de oprichter van Slinnva Professionals en Samen Actief & Verbonden.\n\nVandaag gaat niet over goed of fout. We ontdekken samen hoe het moderne online leven werkt.",
    "We gaan kijken naar sociale media, beïnvloeding, AI, oplichting en online gokken.\n\nNiemand hoeft persoonlijke ervaringen te delen. We werken met herkenbare voorbeelden en praten zonder oordeel.",
    "Pak je telefoon en scan de code. Je antwoorden worden alleen als groepsresultaat getoond.\n\nJe naam helpt mij zien wie verbonden is, maar andere deelnemers zien niet wat jij kiest."
  ];
  if (module.id === "poll") return [
    "Ik start nu de openingspoll. Kies op je telefoon waar jij je online het meeste zorgen over maakt.\n\nNeem het antwoord dat het dichtst bij jouw gevoel komt. Er is geen goed of fout.",
    "Dank jullie wel. Ik laat de uitslag alleen zien wanneer iedereen klaar is.\n\nKijk straks vooral naar wat in deze groep leeft, niet naar wie welk antwoord gaf."
  ];
  const topicCues = {
    social: [
      "Sociale media zijn gemaakt om onze aandacht vast te houden. Dat is niet automatisch slecht, maar het helpt om te herkennen wanneer een platform of maker je gedrag probeert te sturen.",
      "Bekijk dit Instagrambericht eerst alsof het echt op je telefoon verschijnt.\n\nVraag de groep wat betrouwbaar voelt en waar de betaalde beïnvloeding zichtbaar wordt.",
      "Benoem drie signalen: iemand heeft een betaald belang, een bericht geeft druk en je keuze wordt automatisch gestuurd door wat steeds opnieuw verschijnt.",
      "Laat verschillende antwoorden toe. Vraag wanneer sociale media inspirerend zijn en wanneer deelnemers merken dat vergelijken of blijven scrollen druk geeft."
    ],
    gambling: [
      "Online gokken wordt vaak verpakt als sport, spanning of een spel. De aanbieder verdient uiteindelijk aan mensen die blijven inzetten.",
      "Deze TikTokvideo toont een winst en een bonuscode. Vraag wat buiten beeld blijft: eerdere verliezen, betaalde promotie en de voorwaarden van de bonus.",
      "Benoem alleen winst laten zien, tijdsdruk en het gevoel dat je bij een volgende poging bijna zeker wint.",
      "Vraag wanneer een spel verandert in gokken. Leg uit dat betalen voor een willekeurige beloning, zoals een loot box, dezelfde mechanismen kan gebruiken."
    ],
    ai: [
      "AI kan nuttig zijn, maar maakt het moeilijker om alleen op beeld en geluid te vertrouwen. Sterk online betekent daarom: vertragen en via een tweede route controleren.",
      "Lees het WhatsAppgesprek rustig voor. De stem klinkt bekend, maar het nummer is onbekend en er is haast.\n\nVraag wat deelnemers zouden controleren voordat ze handelen.",
      "Benoem de onverwachte vraag, de tijdsdruk en de noodzaak van een tweede bekende route.",
      "Bespreek een eenvoudige familieafspraak: terugbellen op een bekend nummer of een persoonlijk codewoord gebruiken."
    ],
    fraud: [
      "Online oplichting verandert steeds van verhaal, maar gebruikt vaak dezelfde drukmiddelen: vertrouwen, emotie, haast en een verzoek om geld of gegevens.",
      "Laat de groep de rode vlaggen in het WhatsAppgesprek aanwijzen. Geef het antwoord nog niet meteen weg.",
      "Benoem het nieuwe nummer, het niet mogen controleren en de onveilige betaalroute.",
      "Herhaal de praktische regel: stop, controleer via een route die je zelf kent en praat met iemand voordat je betaalt."
    ]
  };
  if (topicCues[module.id]) return topicCues[module.id];
  if (module.id === "finish") return [
    "Sterk online zijn betekent niet dat je alles moet weten. Het betekent dat je durft te stoppen, controleren en hulp vragen.",
    "Vraag iedereen om één kleine stap te kiezen die haalbaar voelt. Bijvoorbeeld meldingen uitzetten, tweestapsverificatie aanzetten of eerst bellen bij een vreemd betaalverzoek."
  ];
  return [module.script];
}

const STERK_ROOM="sterk-online-live";
let sterkLiveSocket;
let sterkLiveState;
let sterkConnectedRoom="";
let sterkReconnect;
let sterkTimerLoop;

function createLocalSterkState() {
  const empty={
    status:"waiting",activeType:"slides",responseOpen:false,responseGeneration:0,activeResponseKey:"",
    revealResults:false,questionIndex:0,timer:{running:false,duration:5,endsAt:0},connected:{},participants:{},
    poll:{question:data.poll.question,options:[...data.poll.options],correctIndex:null,explanation:""},
    bingo:{promptIndex:0,status:"idle",pendingWinner:null,approvedWinner:false},
    responses:{sterkPoll:[],sterkScenario:[],sterkReflection:[],bingoCard:[]}
  };
  try {
    const stored=JSON.parse(localStorage.getItem(`${STORAGE_KEY}-sterk-live`));
    return stored?{...empty,...stored,responses:{...empty.responses,...stored.responses},bingo:{...empty.bingo,...stored.bingo}}:empty;
  } catch{return empty;}
}

function sterkRole(){return launchMode==="screen"?"screen":launchMode==="participant"?"participant":"trainer";}
function sterkParticipantCount(){return Object.values(sterkLiveState?.connected||{}).filter(item=>item.role==="participant").length;}

function connectSterkLive() {
  clearTimeout(sterkReconnect);
  sterkLiveState ||= createLocalSterkState();
  if(!("WebSocket" in window)||!location.host)return;
  const targetRoom=liveRoom(STERK_ROOM,"sterk");
  if(sterkLiveSocket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(sterkLiveSocket.readyState)&&sterkConnectedRoom===targetRoom)return;
  if(sterkLiveSocket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(sterkLiveSocket.readyState))sterkLiveSocket.close();
  const protocol=location.protocol==="https:"?"wss":"ws";
  sterkLiveSocket=new WebSocket(`${protocol}://${location.host}/ws`);
  sterkLiveSocket.addEventListener("open",()=>{
    sterkConnectedRoom=targetRoom;
    sterkLiveSocket.send(JSON.stringify({type:"join",room:targetRoom,clientId:participantClientId,role:sterkRole(),name:getParticipantName()}));
  });
  sterkLiveSocket.addEventListener("message",event=>{
    const message=JSON.parse(event.data);
    if(message.type==="submission-rejected"){toast("Deze antwoordronde is gesloten");return;}
    if(message.type!=="snapshot")return;
    sterkLiveState=message.state;
    renderSterkLive();
  });
  sterkLiveSocket.addEventListener("close",()=>{sterkLiveSocket=null;sterkConnectedRoom="";sterkReconnect=setTimeout(connectSterkLive,1200);});
}

function sterkAction(action,payload={}) {
  if(sterkLiveSocket?.readyState===WebSocket.OPEN){const message=compatibleLiveMessage(action,payload,sterkLiveState);sterkLiveSocket.send(JSON.stringify({type:"action",...message}));}
  else if(!location.host){applyLocalSterkAction(action,payload);renderSterkLive();}
  else {toast("De live sessie maakt opnieuw verbinding");connectSterkLive();}
}

function applyLocalSterkAction(action,payload) {
  sterkLiveState ||= createLocalSterkState();
  const state=sterkLiveState;
  if(action==="control")Object.assign(state,payload);
  if(action==="open-response"){state.responseOpen=true;state.revealResults=false;state.responseGeneration=(state.responseGeneration||0)+1;state.activeResponseKey=payload.activity||"";}
  if(action==="close-response"||action==="timer-expired"){state.responseOpen=false;state.revealResults=payload.revealResults!==false;state.timer={running:false,duration:state.timer?.duration||5,endsAt:0};}
  if(action==="timer"){const duration=Math.max(1,Number(payload.duration)||5);state.timer={running:Boolean(payload.running),duration,endsAt:payload.running?Date.now()+duration*1000:0};state.responseOpen=Boolean(payload.running);state.revealResults=false;}
  if(action==="participant-register"){state.participants[participantClientId]={name:payload.name,online:true};state.connected[participantClientId]={role:"participant",name:payload.name};}
  if(action==="submit"&&state.responseOpen&&(!state.activeResponseKey||state.activeResponseKey===payload.activity)){
    state.responses[payload.activity]||=[];
    const value={...payload.value,generation:state.responseGeneration||0,name:getParticipantName(),clientId:participantClientId,sessionId:participantClientId,updatedAt:Date.now()};
    const list=state.responses[payload.activity];
    const index=list.findIndex(item=>item.clientId===participantClientId&&item.generation===value.generation);
    if(index>=0)list[index]=value;else list.push(value);
  }
  localStorage.setItem(`${STORAGE_KEY}-sterk-live`,JSON.stringify(state));
}

function renderSterkLive() {
  if(data.activeWorkshop!=="sterk")return;
  if(document.getElementById("trainerView")?.classList.contains("active"))renderTrainer();
  if(document.getElementById("screenView")?.classList.contains("active")||launchMode==="screen")renderScreen();
  if(document.getElementById("participantView")?.classList.contains("active")||launchMode==="participant")renderParticipant();
  startSterkTimerLoop();
}

function sterkPollResponses(){return sterkLiveState?.responses?.sterkPoll||[];}
function sterkBingoResponses(){return sterkLiveState?.responses?.bingoCard||[];}
function sterkTimerRemaining(){return sterkLiveState?.timer?.running?Math.max(0,Math.ceil((sterkLiveState.timer.endsAt-Date.now())/1000)):0;}

function renderSterkResultChart() {
  const poll=sterkLiveState.poll||data.poll;
  const entries=sterkPollResponses().filter(item=>item.questionIndex===(sterkLiveState.questionIndex||0));
  const total=entries.length;
  const correct=poll.correctIndex;
  return `<div class="sterk-result-chart"><p class="eyebrow">Live resultaten · ${total} stemmen</p><h2>${escapeHtml(poll.question)}</h2>${poll.options.map((option,index)=>{
    const count=entries.filter(item=>item.choice===index).length;
    const percent=total?Math.round(count/total*100):0;
    return `<article class="${correct===index?"correct":""}"><div><strong>${String.fromCharCode(65+index)}. ${escapeHtml(option)}</strong><span>${count} stem${count===1?"":"men"} · ${percent}%</span></div><i style="width:${percent}%"></i></article>`;
  }).join("")}${Number.isInteger(correct)?`<div class="quiz-summary"><strong>Juiste antwoord: ${String.fromCharCode(65+correct)}. ${escapeHtml(poll.options[correct])}</strong><span>${entries.filter(item=>item.choice===correct).length} goed · ${entries.filter(item=>item.choice!==correct).length} fout</span>${poll.explanation?`<p>${escapeHtml(poll.explanation)}</p>`:""}</div>`:""}</div>`;
}

function renderSterkLiveScreen() {
  const screen=document.getElementById("publicScreen");
  document.getElementById("screenParticipants").textContent=sterkParticipantCount();
  screen.dataset.theme=sterkLiveState.activeType==="bingo"?"bingo":"poll";
  if(sterkLiveState.activeType==="bingo"){
    const bingo=sterkLiveState.bingo||{};
    const markedCounts={};
    sterkBingoResponses().forEach(item=>(item.marked||[]).forEach(index=>{const label=item.card?.[index];if(label)markedCounts[label]=(markedCounts[label]||0)+1;}));
    const popular=Object.entries(markedCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);
    screen.innerHTML=decorateSlide(`<div class="public-slide sterk-bingo-live"><p class="eyebrow">Fraude Bingo · situatie ${(bingo.promptIndex||0)+1}</p><h2>${escapeHtml(bingoStatements[bingo.promptIndex||0])}</h2>${bingo.approvedWinner?`<div class="bingo-public-win"><strong>BINGO!</strong><span>De trainer heeft de kaart gecontroleerd.</span></div>`:`<div class="bingo-live-stats"><strong>${sterkBingoResponses().length}</strong><span>spelers actief</span></div><div class="bingo-popular">${popular.map(([label,count])=>`<span>${escapeHtml(label)} · ${count}</span>`).join("")}</div>`}</div>`,"bingo");
    return;
  }
  if(sterkLiveState.activeType==="poll"||sterkLiveState.activeType==="quiz"||sterkLiveState.activeType==="scenario"){
    screen.innerHTML=decorateSlide(sterkLiveState.revealResults?renderSterkResultChart():`<div class="public-slide sterk-live-question"><p class="eyebrow">${sterkLiveState.activeType==="quiz"?"Quiz":"Live vraag"}</p><h1>${escapeHtml(sterkLiveState.poll?.question||"")}</h1><div class="sterk-live-options">${(sterkLiveState.poll?.options||[]).map((option,index)=>`<span><b>${String.fromCharCode(65+index)}</b>${escapeHtml(option)}</span>`).join("")}</div>${sterkLiveState.timer?.running?`<div class="mic-countdown">${sterkTimerRemaining()}</div>`:fakeQr()}<small>${sterkPollResponses().length} antwoorden ontvangen</small></div>`,"poll");
  }
}

function startSterkTimerLoop() {
  clearInterval(sterkTimerLoop);
  if(!sterkLiveState?.timer?.running)return;
  sterkTimerLoop=setInterval(()=>{
    const remaining=sterkTimerRemaining();
    document.querySelectorAll(".mic-countdown,.sterk-phone-timer").forEach(item=>item.textContent=remaining);
    if(remaining<=0){clearInterval(sterkTimerLoop);if(sterkRole()==="trainer")sterkAction("timer-expired",{});}
  },250);
}

function showSterkResults(){sterkAction("close-response",{revealResults:true});}

function openSterkBingoValidation() {
  const pending=sterkBingoResponses().filter(item=>item.hasBingo);
  openModal(`<p class="eyebrow">Alleen zichtbaar voor trainer</p><h2>Bingo controleren</h2>${pending.map((item,index)=>`<article class="version-card"><div><strong>Deelnemer ${index+1}</strong><p>Anonieme sessie ${escapeHtml((item.clientId||"").slice(-8))} · ${(item.marked||[]).length} vakjes</p></div><div class="button-row"><button class="small-button" data-reject-bingo="${escapeHtml(item.clientId)}">Afwijzen</button><button class="small-button" data-approve-bingo="${escapeHtml(item.clientId)}">Goedkeuren</button></div></article>`).join("")||"<p>Er is nog geen zigzagbingo gemeld.</p>"}`);
  document.querySelectorAll("[data-approve-bingo]").forEach(button=>button.addEventListener("click",()=>{
    sterkAction("control",{responseOpen:false,bingo:{...(sterkLiveState.bingo||{}),status:"approved",pendingWinner:button.dataset.approveBingo,approvedWinner:true}});
    closeModal();
  }));
  document.querySelectorAll("[data-reject-bingo]").forEach(button=>button.addEventListener("click",()=>{
    sterkAction("control",{bingo:{...(sterkLiveState.bingo||{}),status:"active",pendingWinner:null,approvedWinner:false}});
    sterkAction("open-response",{activity:"bingoCard"});
    closeModal();
  }));
}

function liveTestRows() {
  const state=data.activeWorkshop==="sterk"?sterkLiveState:isMicOnWeek1()?micWeek1State:isWegwijs()?wegwijsState:talentState;
  const socket=data.activeWorkshop==="sterk"?sterkLiveSocket:isMicOnWeek1()?micWeek1Socket:isWegwijs()?wegwijsSocket:talentSocket;
  const participants=Object.values(state?.connected||{}).filter(item=>item.role==="participant").length;
  const results=Object.values(state?.responses||{}).reduce((sum,items)=>sum+(Array.isArray(items)?items.length:0),0);
  return [
    ["QR-code",Boolean(getParticipantUrl()),getParticipantUrlLabel()],
    ["Actieve sessie",Boolean(activeSessionId(data.activeWorkshop)),activeSessionId(data.activeWorkshop)],
    ["Live verbinding",!location.host||socket?.readyState===WebSocket.OPEN,!location.host?"Lokale testmodus":"WebSocket"],
    ["Deelnemer verbonden",participants>0,participants?`${participants} verbonden`:"Geen deelnemers verbonden"],
    ["Vraag gestart",Boolean(state?.responseOpen),state?.responseOpen?"Antwoorden open":"Vraag niet gestart"],
    ["Resultaten",results>0,results?`${results} resultaten geladen`:"Resultaten niet geladen"],
    ["Presentatiescherm",Boolean(getPresentationUrl()),getPresentationUrl()]
  ];
}

function openLiveTestMode() {
  openModal(`<p class="eyebrow">Technische testmodus</p><h2>Live workshopcontrole</h2><div class="live-test-list">${liveTestRows().map(([label,works,detail])=>`<article class="${works?"works":"warning"}"><strong>${works?"Werkt":"Controleren"} · ${escapeHtml(label)}</strong><span>${escapeHtml(detail)}</span></article>`).join("")}</div><div class="button-row"><button class="button light" id="testOpenParticipant">Test QR / deelnemer</button><button class="button light" id="testOpenScreen">Test presentatiescherm</button><button class="button dark" id="testRefresh">Opnieuw testen</button></div>`);
  document.getElementById("testOpenParticipant")?.addEventListener("click",()=>window.open(getParticipantUrl(),"_blank"));
  document.getElementById("testOpenScreen")?.addEventListener("click",openPresentationWindow);
  document.getElementById("testRefresh")?.addEventListener("click",openLiveTestMode);
}

function renderLivePanel() {
  if (isStoryWorkshop()||isWegwijs()||isTalent()) return;
  const participants=Object.values(sterkLiveState?.participants||{});
  document.getElementById("participantCount").textContent = sterkParticipantCount();
  document.getElementById("screenParticipants").textContent = sterkParticipantCount();
  document.getElementById("participantStack").innerHTML = participants.slice(0, 6).map(person => `<span title="${escapeHtml(person.name)}">${initials(person.name)}</span>`).join("");
  const status=document.getElementById("sterkAnswerStatus");
  if(status)status.textContent=sterkLiveState?.responseOpen?`${sterkPollResponses().length} antwoorden binnen`:"Geen antwoordronde actief";
  const sessionCode=document.getElementById("sterkSessionCode");
  if(sessionCode)sessionCode.textContent=`Sessie ${activeSessionId("sterk")}`;
}

function renderScreen() {
  if (isTalent()) {
    renderTalentScreen();
    return;
  }
  if (isWegwijs()) {
    renderWegwijsScreen();
    return;
  }
  if (isStoryWorkshop()) {
    renderStoryScreen();
    return;
  }
  if(sterkLiveState?.activeType&&sterkLiveState.activeType!=="slides") {
    renderSterkLiveScreen();
    return;
  }
  const module = currentModule();
  const slides = getModuleSlides(module);
  const publicScreen = document.getElementById("publicScreen");
  data.currentSlide = Math.min(data.currentSlide, slides.length - 1);
  const deck = getPresentationDeck();
  const deckIndex = deck.findIndex(item => item.moduleIndex === data.currentModule && item.slideIndex === data.currentSlide);
  document.getElementById("screenProgress").textContent = data.screenMode === "slides" && deckIndex >= 0 ? `${deckIndex + 1} / ${deck.length}` : "Apart scherm";
  document.getElementById("presentationProgressBar").style.width = data.screenMode === "slides" && deckIndex >= 0 ? `${((deckIndex + 1) / deck.length) * 100}%` : "100%";
  document.getElementById("screenParticipants").textContent = data.participants.length;
  if (data.screenMode === "poll-results") {
    publicScreen.dataset.theme = "poll";
    publicScreen.innerHTML = decorateSlide(renderPollResults(), "poll");
    return;
  }
  if (data.screenMode === "bingo") {
    publicScreen.dataset.theme = "bingo";
    publicScreen.innerHTML = decorateSlide(renderBingoBoard(), "bingo");
    return;
  }
  if (data.screenMode === "bingo-winner") {
    publicScreen.dataset.theme = "bingo";
    publicScreen.innerHTML = decorateSlide(renderBingoWinner(), "bingo");
    return;
  }
  publicScreen.dataset.theme = module.id;
  publicScreen.innerHTML = decorateSlide(slides[data.currentSlide].html, module.id);
}

function decorateSlide(content, theme) {
  const deck = getPresentationDeck();
  const deckIndex = deck.findIndex(item => item.moduleIndex === data.currentModule && item.slideIndex === data.currentSlide);
  return `<div class="slide-grid-pattern"></div>
  <div class="slide-depth theme-${theme}">
    <i class="depth-shape depth-orb"></i>
    <i class="depth-shape depth-cube"></i>
    <i class="depth-shape depth-ring"></i>
    ${renderThemeSculpture(theme)}
  </div>
  <div class="slide-number">${deckIndex >= 0 ? String(deckIndex + 1).padStart(2, "0") : "LIVE"}</div>
  <div class="slide-content-layer theme-${theme}">${content}</div>`;
}

function renderThemeSculpture(theme) {
  if (theme === "social") return `<div class="social-sculpture">
    <div class="float-post post-one"><span>♡ 12,8K</span><strong>Voor jou</strong></div>
    <div class="float-post post-two"><span>AD</span><strong>Shop nu</strong></div>
    <div class="float-post post-three"><span>↗</span><strong>Delen</strong></div>
  </div>`;
  if (theme === "gambling") return `<div class="gambling-sculpture">
    <div class="gold-coin">€</div><div class="dice-cube"><i>●</i><i>● ●</i><i>● ● ●</i></div>
  </div>`;
  if (theme === "ai") return `<div class="ai-sculpture">
    <div class="ai-face"><i></i><i></i><span></span></div>
    <div class="voice-wave">${Array.from({length:12},(_,index)=>`<i style="height:${16 + (index % 4) * 13}px"></i>`).join("")}</div>
  </div>`;
  if (theme === "fraud") return `<div class="fraud-sculpture">
    <div class="mini-phone-3d"><span>Nieuw nummer</span><strong>€ 480?</strong><i>!</i></div>
    <div class="shield-3d">STOP</div>
  </div>`;
  if (theme === "bingo") return `<div class="bingo-sculpture">${[0,1,2,3,4,5].map((_,index)=>`<i style="--r:${index * 31}deg"></i>`).join("")}</div>`;
  if (theme === "finish") return `<div class="finish-sculpture"><i></i><i></i><strong>✓</strong></div>`;
  if (theme === "poll") return `<div class="poll-sculpture"><i></i><i></i><i></i><i></i></div>`;
  return `<div class="intro-sculpture"><div>SO</div><i></i><span></span></div>`;
}

function getModuleSlides(module) {
  return module.presentation.map(item => slide(item.label, item.kind, renderPresentationItem(item, module)));
}

function slide(label, hint, html) { return { label, hint, html }; }

function renderPresentationItem(item, module) {
  const label = escapeHtml(item.label || module.short);
  const title = escapeHtml(item.title || "");
  const question = escapeHtml(item.question || "");
  if (item.image) return `<div class="image-question-slide">
    <img src="${item.image}" alt="${escapeHtml(item.imageAlt || item.label || "Workshopvoorbeeld")}">
    <div><p class="eyebrow">${label}</p><h2>${title}</h2><p class="slide-question">${question}</p></div>
  </div>`;
  if (item.kind === "join") return `<div class="public-slide five-second-slide">
    <p class="eyebrow">${label}</p><h2>${title}</h2>
    <div class="join-code">${fakeQr()}<div class="join-text"><small>SCAN OM MEE TE DOEN</small><strong>482 913</strong><span>${question}</span><em>${escapeHtml(getParticipantUrlLabel())}</em></div></div>
  </div>`;
  if (item.kind === "device") return `<div class="visual-case-slide">
    <div class="visual-case-device">${renderDeviceExample(item.device || "whatsapp")}</div>
    <div class="visual-case-question"><p class="eyebrow">${label}</p><h2>${title}</h2><p>${question}</p></div>
  </div>`;
  if (item.kind === "ai-compare") return `<div class="ai-compare-slide">
    <p class="eyebrow">${label}</p><h2>${title}</h2>
    <div class="ai-photo-pair"><div class="ai-photo natural"><span>A</span><i></i></div><div class="ai-photo synthetic"><span>B</span><i></i></div></div>
    <p class="slide-question">${question}</p>
  </div>`;
  if (item.kind === "quote") return `<div class="quote-slide">
    <p class="eyebrow">${label}</p><blockquote>${title}</blockquote><p class="slide-question">${question}</p>
  </div>`;
  return `<div class="public-slide five-second-slide">
    <p class="eyebrow">${label}</p><h1>${title}</h1><p class="slide-question">${question}</p>
  </div>`;
}
function renderPollResults() {
  const total = data.poll.votes.reduce((a,b)=>a+b,0);
  return `<div class="public-slide"><p class="eyebrow">Live resultaten · ${total} stemmen</p><h2>${data.poll.question}</h2>
    <div class="poll-options">${data.poll.options.map((option,index)=>{
      const count=data.poll.votes[index]||0;
      const percent=total?Math.round(count/total*100):0;
      return `<div class="poll-option"><div><strong>${escapeHtml(option)}</strong><div class="bar-value" style="width:${Math.max(percent*2,4)}px"></div></div><b>${count} stemmen · ${percent}%</b></div>`;
    }).join("")}</div></div>`;
}
function renderBingoBoard() {
  const statement = bingoStatements[data.bingoPromptIndex] || bingoStatements[0];
  return `<div class="public-slide bingo-presentation"><p class="eyebrow">Sterk Online Bingo · stelling ${data.bingoPromptIndex + 1}</p>
    <h2>Luister. Herken. Streep af.</h2>
    <div class="bingo-instructions"><span><b>1</b> Luister naar de stelling</span><span><b>2</b> Zoek het signaal op je kaart</span><span><b>3</b> Tik het vakje aan</span></div>
    <div class="bingo-statement"><span>Voorleesstelling</span><strong>${statement}</strong></div></div>`;
}

function renderBingoWinner() {
  const winner = data.bingoWinner?.name || "Een deelnemer";
  return `<div class="public-slide bingo-winner-slide">
    <p class="eyebrow">Bingo gedetecteerd</p>
    <h1>BINGO!</h1>
    <p class="lead">Het spel is automatisch gestopt voor alle deelnemers.</p>
    <div class="winner-card"><strong>${escapeHtml(winner)}</strong><p>heeft een geldige zigzaglijn. De trainer kan de kaart nu controleren.</p></div>
  </div>`;
}
function topicContent(id) {
  return {
    social: {
      label:"Sociale media & beïnvloeding", heading:"Jouw aandacht is waardevol.", intro:"Wat jij ziet, is gekozen om je te laten kijken, voelen of kopen.",
      points:[["01","Scrollgedrag","Platforms leren waar jij bij blijft hangen."],["02","Vergelijken","Je ziet vaak hoogtepunten, niet het hele verhaal."],["03","Reclame","Een persoonlijke tip kan betaalde beïnvloeding zijn."]],
      signals:[["Betaald belang","Krijgt iemand geld, korting of producten voor deze boodschap?"],["Online druk","Geeft de post je het gevoel dat je tekortschiet of iets mist?"],["Automatische keuze","Kies jij bewust, of blijf je kijken omdat de volgende video al start?"]],
      question:"Wanneer voelt sociale media voor jou inspirerend, en wanneer geeft het druk?", deviceLabel:"Instagrambericht"
    },
    gambling: {
      label:"Online gokken", heading:"Het huis wint op de lange termijn.", intro:"Gokreclame verkoopt spanning en winst, maar laat verlies meestal buiten beeld.",
      points:[["01","Bonus","Gratis geld is bedoeld om je te laten beginnen."],["02","Loot boxes","Je betaalt zonder te weten wat je krijgt."],["03","Influencers","Promotie kan eruitzien als persoonlijk succes."]],
      signals:[["Alleen winst","Je ziet gewonnen bedragen, maar niet alle eerdere inzetten."],["Tijdsdruk","Een bonus of weddenschap lijkt maar heel kort beschikbaar."],["Doorgaan","Bijna winnen kan voelen alsof de volgende poging wél lukt."]],
      question:"Wanneer verandert een onschuldig spel in gokken?", deviceLabel:"TikTokvideo"
    },
    ai: {
      label:"AI & deepfakes", heading:"Zien en horen is niet altijd geloven.", intro:"AI kan stemmen, foto’s en video’s overtuigend namaken.",
      points:[["01","Stem","Een bekend geluid kan kunstmatig zijn."],["02","Beeld","Een echt gezicht kan in een nepvideo staan."],["03","Tekst","Een chatbot kan menselijk en overtuigend overkomen."]],
      signals:[["Onverwachte vraag","Past het verzoek bij hoe deze persoon normaal doet?"],["Haast","Moet je handelen voordat je rustig kunt controleren?"],["Tweede route","Bel via een nummer dat je al kende of spreek een codewoord af."]],
      question:"Wat heb jij nodig voordat je een online bericht echt vertrouwt?", deviceLabel:"AI-spraakbericht"
    },
    fraud: {
      label:"Online oplichting", heading:"Oplichters gebruiken emotie en haast.", intro:"Het verhaal verandert, maar de drukmiddelen lijken vaak op elkaar.",
      points:[["01","Vertrouwen","De afzender doet zich voor als iemand die je kent."],["02","Haast","Je krijgt weinig tijd om na te denken."],["03","Geld of codes","Er volgt een betaalverzoek, link of vraag om gegevens."]],
      signals:[["Nieuw kanaal","Een bekend persoon benadert je plots vanaf een onbekend nummer."],["Niet mogen controleren","Bellen, overleggen of wachten zou zogenaamd niet kunnen."],["Onveilige route","Je moet via een meegestuurde link betalen of inloggen."]],
      question:"Welke veilige controle doe je voordat je klikt, betaalt of gegevens deelt?", deviceLabel:"WhatsAppgesprek"
    }
  }[id] || {
    label:"Online situatie",heading:"Kijk, controleer en kies.",intro:"Onderzoek eerst wat je ziet voordat je reageert.",
    points:[["01","Kijken","Wat valt je op?"],["02","Controleren","Wat weet je zeker?"],["03","Handelen","Welke stap is veilig?"]],
    signals:[["Stop","Neem tijd."],["Check","Controleer via een bekende route."],["Praat","Vraag iemand om mee te kijken."]],
    question:"Wat zou jij doen?",deviceLabel:"Praktijkvoorbeeld"
  };
}

function renderSocialExample(module) {
  const examples = {
    social: {
      label: "Instagramvoorbeeld",
      title: "Is dit een tip of reclame?",
      description: "Bekijk eerst alleen het bericht. Wat valt je op?",
      device: "instagram",
      prompt: "Welke details beïnvloeden jouw vertrouwen in deze post?"
    },
    gambling: {
      label: "TikTokvoorbeeld",
      title: "Je ziet alleen de winst.",
      description: "Een influencer noemt deze weddenschap ‘bijna zeker’.",
      device: "tiktok",
      prompt: "Wat wordt hier wel getoond, en wat juist niet?"
    },
    ai: {
      label: "WhatsAppvoorbeeld",
      title: "De stem klinkt echt.",
      description: "Het nummer is onbekend en er is haast.",
      device: "ai",
      prompt: "Hoe kun je dit controleren zonder geld of gegevens te delen?"
    },
    fraud: {
      label: "WhatsAppvoorbeeld",
      title: "‘Hoi mam, nieuw nummer.’",
      description: "Een vertrouwd verhaal met een dringend betaalverzoek.",
      device: "whatsapp",
      prompt: "Welke rode vlaggen zie je in dit gesprek?"
    }
  };
  const example = examples[module.id] || examples.fraud;
  return `<div class="example-layout">
    <div class="example-copy"><p class="eyebrow">${example.label}</p><h2>${example.title}</h2><p class="lead">${example.description}</p><div class="example-prompt">${example.prompt}</div></div>
    ${renderDeviceExample(example.device)}
  </div>`;
}

function renderDeviceExample(type) {
  if (type === "instagram") return `
    <div class="social-device">
      <div class="device-status"><span>09:41</span><span>● ● ●</span></div>
      <div class="ig-header"><span class="device-avatar">NV</span><span><strong>nouravibes</strong><small>Rotterdam</small></span><span class="sponsored">Betaalde samenwerking</span></div>
      <div class="ig-post-image">GLOW</div>
      <div class="ig-actions">♡ ◯ ↗</div>
      <div class="ig-caption"><strong>nouravibes</strong> Dit gebruik ik echt élke ochtend. Met mijn code NOURA20 krijg je vandaag korting. #morningroutine</div>
    </div>`;
  if (type === "tiktok") return `
    <div class="social-device">
      <div class="device-status"><span>Voor jou</span><span>Zoeken</span></div>
      <div class="tiktok-video">
        <div class="tiktok-copy"><strong>@voetbalmetjay</strong>Deze combo kan bijna niet misgaan. Ik heb zelf €250 gewonnen. Gebruik mijn bonuscode JAY50.</div>
        <div class="tiktok-side"><span>♡<small>18,4K</small></span><span>◯<small>936</small></span><span>↗<small>Delen</small></span></div>
      </div>
    </div>`;
  if (type === "ai") return `
    <div class="social-device">
      <div class="device-status"><span>09:41</span><span>● ● ●</span></div>
      <div class="chat-header"><span class="device-avatar">M</span><span><strong>Milan nieuw</strong><small>onbekend nummer</small></span></div>
      <div class="chat-thread">
        <div class="message">Mam, ik kan nu niet bellen. Luister even naar dit spraakbericht.<time>14:31</time></div>
        <div class="message">▶︎ ━━━━━━━ 0:18<br><small>“Ik heb echt dringend hulp nodig...”</small><time>14:32</time></div>
        <div class="message">Kun je €480 overmaken? Het moet binnen een uur.<time>14:33</time></div>
      </div>
    </div>`;
  return `
    <div class="social-device">
      <div class="device-status"><span>09:41</span><span>● ● ●</span></div>
      <div class="chat-header"><span class="device-avatar">?</span><span><strong>+31 6 28 41 93 07</strong><small>WhatsApp</small></span></div>
      <div class="chat-thread">
        <div class="message">Hoi mam, dit is mijn nieuwe nummer. Mijn telefoon is kapot.<time>13:08</time></div>
        <div class="message">Ik moet vandaag nog een rekening betalen. Kun jij dat even doen?<time>13:09</time></div>
        <div class="message sent">Waarom bel je niet even?<time>13:10 ✓✓</time></div>
        <div class="message">Microfoon is ook stuk. Het heeft echt haast.<time>13:10</time></div>
      </div>
      <div class="typing-bar">Bericht typen…</div>
    </div>`;
}

function caseHeadline(id) {
  return { social: "Is dit een tip of reclame?", gambling: "Een ‘zekere’ weddenschap?", ai: "De stem klinkt precies echt.", fraud: "‘Hoi mam, nieuw nummer.’" }[id] || "Wat zou jij doen?";
}
function caseDescription(id) {
  return {
    social: "Een populaire influencer raadt een product aan. Alleen onderaan staat klein ‘betaalde samenwerking’.",
    gambling: "Een influencer deelt alleen winst en geeft volgers een bonuscode voor een goksite.",
    ai: "Een familielid vraagt in een spraakbericht dringend om geld, maar het nummer is onbekend.",
    fraud: "Iemand zegt je kind te zijn en vraagt of je vandaag een rekening kunt betalen."
  }[id] || currentModule().script;
}
function fakeQr() {
  const url=getParticipantUrl();
  const graphic=window.SlinnvaQr?.svg ? window.SlinnvaQr.svg(url) : "";
  return `<a class="qr real-qr" href="${escapeHtml(url)}" target="_blank" aria-label="Open deelnemersscherm">${graphic}</a>`;
}

function renderStoryParticipant() {
  updateWorkshopChrome();
  const app=document.getElementById("participantApp");
  const story=data.story, week=storyWeek();
  if (isMicOnWeek1()) {
    renderMicOnWeek1Participant(app);
    return;
  }
  if (story.qrActiveWeek===story.currentWeek && story.qrMode==="active") {
    renderStoryQrParticipant(app,week);
    return;
  }
  story.weekForms ||= {};
  const saved=story.weekForms[week.id]||{};
  const edition=story.editions[story.variant];
  const extra=story.currentWeek===0
    ? `<div class="field"><label>Naam</label><input id="micOnName" value="${escapeHtml(story.profile.name||"")}"></div>
       <div class="field"><label>${escapeHtml(edition.brainstorm)}</label><textarea id="micOnBrainstorm">${escapeHtml(saved.brainstorm||"")}</textarea></div>`
    : "";
  const recording=story.currentWeek===4?`<div class="recording-status ${story.recordingActive?"active":""}"><i></i>${story.recordingActive?"De studio neemt op":"Wacht op het startsein van de trainer"}</div>`:"";
  app.innerHTML=`<div class="mobile-content story-mobile"><div class="mobile-logo">MIC ON</div>
    <p class="eyebrow">Week ${story.currentWeek+1} · ${escapeHtml(week.title)}</p>
    <h3>${story.currentWeek===5?"Jouw terugblik":"Jouw werkblad"}</h3>${recording}${extra}
    ${week.worksheet.map((label,index)=>`<div class="field"><label>${escapeHtml(label)}</label><textarea data-mic-field="${index}">${escapeHtml(saved[index]||"")}</textarea></div>`).join("")}
    <button class="mobile-button" id="saveMicOnWorksheet">${story.currentWeek===5?"Afronden en certificaat maken":"Werkblad opslaan"}</button></div>`;
  document.getElementById("saveMicOnWorksheet").addEventListener("click",()=>{
    const form={};
    document.querySelectorAll("[data-mic-field]").forEach(input=>form[input.dataset.micField]=input.value.trim());
    if(story.currentWeek===0) {
      story.profile.name=valueOf("micOnName");
      form.brainstorm=valueOf("micOnBrainstorm");
      if(form.brainstorm&&!story.postIts.some(item=>item.text===form.brainstorm)) story.postIts.push({text:form.brainstorm,votes:0,variant:story.variant,source:"week-1"});
    }
    story.weekForms[week.id]=form;
    if(story.currentWeek===3) story.canvas={...story.canvas,name:form[0]||"",subject:form[1]||"",audience:form[2]||"",guest:form[3]||"",mainQuestion:form[4]||"",episodeTitle:form[5]||"",intro:form[6]||"",outro:form[7]||"",roles:form[8]||""};
    if(story.currentWeek===5) {
      story.reflection={learned:form[1]||"",difficult:form[2]||"",proud:form[0]||""};
      const name=story.profile.name||"Deelnemer";
      if(!story.certificates.some(item=>item.name===name)) story.certificates.push({name,date:new Date().toLocaleDateString("nl-NL")});
      saveData("Reflectie en certificaat opgeslagen");
      downloadStoryCertificate(name);
    } else saveData("Werkblad opgeslagen");
    app.innerHTML=participantMessage("✓","Opgeslagen.","Leg je telefoon weg en doe weer mee met de groep.");
  });
}

function renderStoryQrParticipant(app,week) {
  const story=data.story;
  const results=story.qrResults[week.id]||[];
  if(results.some(item=>item.clientId===participantClientId)) {
    app.innerHTML=participantMessage("✓","Bedankt voor je antwoord.","Leg je telefoon weg en doe weer mee met de groep.");
    return;
  }
  const qr=week.qr;
  if(qr.type==="wordcloud") {
    app.innerHTML=`<div class="mobile-content story-mobile"><div class="mobile-logo">MIC ON</div><p class="eyebrow">${escapeHtml(qr.title)}</p><h3>${escapeHtml(qr.question)}</h3>
      <div class="field"><label>Jouw antwoord</label><input id="micQrWord" maxlength="60"></div><button class="mobile-button" id="submitMicQrWord">Versturen</button></div>`;
    document.getElementById("submitMicQrWord").addEventListener("click",()=>submitStoryQr({value:valueOf("micQrWord")}));
    return;
  }
  const multi=qr.type==="multi";
  app.innerHTML=`<div class="mobile-content story-mobile"><div class="mobile-logo">MIC ON</div><p class="eyebrow">${escapeHtml(qr.title)}</p><h3>${escapeHtml(qr.question)}</h3>
    <div class="mic-qr-options">${qr.options.map((option,index)=>`<button class="mobile-button" data-mic-qr="${index}">${escapeHtml(option)}</button>`).join("")}</div>
    ${multi?'<button class="mobile-button mic-submit" id="submitMicQrMulti">Keuzes versturen</button>':""}</div>`;
  document.querySelectorAll("[data-mic-qr]").forEach(button=>button.addEventListener("click",()=>{
    if(!multi) return submitStoryQr({value:Number(button.dataset.micQr)});
    button.classList.toggle("selected");
  }));
  document.getElementById("submitMicQrMulti")?.addEventListener("click",()=>{
    const values=[...document.querySelectorAll("[data-mic-qr].selected")].map(button=>Number(button.dataset.micQr));
    if(values.length) submitStoryQr({values});
  });
}

function submitStoryQr(answer) {
  const story=data.story,week=storyWeek();
  if("value" in answer&&(answer.value===""||answer.value==null))return;
  story.qrResults[week.id] ||= [];
  story.qrResults[week.id].push({clientId:participantClientId,name:getParticipantName(),...answer});
  saveData("Antwoord ontvangen");
  renderStoryParticipant();
  renderStoryScreen();
}

function valueOf(id) {
  return document.getElementById(id).value.trim();
}

function openStoryPracticeCard() {
  const questions=["Waar ben je trots op?","Wat heeft jou gevormd?","Wat zou meer mensen mogen weten?","Welke plek betekent veel voor jou?","Wat wil jij later doorgeven?"];
  const question=questions[Math.floor(Math.random()*questions.length)];
  openModal(`<p class="eyebrow">Oefenkaart</p><h2>${question}</h2><p class="lead">Luister vijf minuten. Vraag door op één woord. Vat daarna samen wat je hoorde.</p>`);
}

let storyRecorder=null;
let storyAudioChunks=[];

async function toggleStoryRecording() {
  if (data.story.recordingActive && storyRecorder) {
    storyRecorder.stop();
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) return toast("Audio-opname wordt in deze browser niet ondersteund");
  try {
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    storyAudioChunks=[];
    storyRecorder=new MediaRecorder(stream);
    storyRecorder.ondataavailable=event=>storyAudioChunks.push(event.data);
    storyRecorder.onstop=async()=>{
      const blob=new Blob(storyAudioChunks,{type:storyRecorder.mimeType||"audio/webm"});
      const id=`podcast-${Date.now()}`;
      await saveStoryAudio(id,blob);
      data.story.recordings.unshift({id,name:`Opname week ${data.story.currentWeek+1}`,date:new Date().toLocaleString("nl-NL"),size:blob.size});
      data.story.recordingActive=false;
      stream.getTracks().forEach(track=>track.stop());
      saveData("Podcastopname lokaal opgeslagen"); renderStoryTrainer(); renderStoryParticipant(); renderStoryAdmin();
    };
    storyRecorder.start();
    data.story.recordingActive=true; saveData("Opname gestart"); renderStoryTrainer(); renderStoryParticipant();
  } catch {
    toast("Microfoontoegang is nodig om op te nemen");
  }
}

function storyAudioDb() {
  return new Promise((resolve,reject)=>{
    const request=indexedDB.open("slinnva-podcast-audio",1);
    request.onupgradeneeded=()=>request.result.createObjectStore("recordings");
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error);
  });
}

async function saveStoryAudio(id,blob) {
  const db=await storyAudioDb();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction("recordings","readwrite");
    tx.objectStore("recordings").put(blob,id);
    tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error);
  });
}

async function downloadStoryAudio(id,name) {
  const db=await storyAudioDb();
  const blob=await new Promise((resolve,reject)=>{
    const request=db.transaction("recordings").objectStore("recordings").get(id);
    request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error);
  });
  if(!blob)return toast("Opname niet gevonden");
  const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download=`${name}.webm`;link.click();URL.revokeObjectURL(link.href);
}

function openStoryCertificates() {
  openModal(`<p class="eyebrow">Certificaten</p><h2>${escapeHtml(data.story.name)}</h2>
    <div class="result-list">${data.story.participants.map(person=>`<button class="version-card story-certificate-row" data-certificate-name="${escapeHtml(person.name)}"><strong>${escapeHtml(person.name)}</strong><span>Genereer certificaat →</span></button>`).join("")}</div>`);
  document.querySelectorAll("[data-certificate-name]").forEach(button=>button.addEventListener("click",()=>downloadStoryCertificate(button.dataset.certificateName)));
}

function downloadStoryCertificate(name) {
  if(!data.story.certificates.some(item=>item.name===name)) data.story.certificates.push({name,date:new Date().toLocaleDateString("nl-NL")});
  saveData();
  const html=`<!doctype html><html lang="nl"><meta charset="utf-8"><title>Certificaat ${escapeHtml(name)}</title><style>body{margin:0;background:#f2eee9;color:#1a1a1a;font-family:Arial}main{width:1000px;height:700px;margin:30px auto;padding:70px;border:12px double #bd9760;background:white;text-align:center;box-sizing:border-box}small{letter-spacing:.3em;color:#755c48}h1{font:76px Georgia;margin:45px 0 10px}h2{font:38px Georgia;color:#755c48}p{font-size:20px;line-height:1.7}.line{width:260px;margin:55px auto 12px;border-top:1px solid #1a1a1a}@media print{body{background:white}main{margin:0}}</style><main><small>SLINNVA PROFESSIONALS · SAMEN ACTIEF & VERBONDEN</small><h2>${escapeHtml(data.story.name)}</h2><p>Dit certificaat is voor</p><h1>${escapeHtml(name)}</h1><p>${escapeHtml(data.story.certificateText)}</p><strong>${escapeHtml(data.story.subtitle)}</strong><div class="line"></div><p>${new Date().toLocaleDateString("nl-NL")}</p></main></html>`;
  const blob=new Blob([html],{type:"text/html;charset=utf-8"});const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download=`certificaat-${name.toLowerCase().replace(/\s+/g,"-")}.html`;link.click();URL.revokeObjectURL(link.href);
  toast("Certificaat gegenereerd");
}

function renderParticipant() {
  if (isTalent()) {
    renderTalentParticipant(document.getElementById("participantApp"));
    return;
  }
  if (isWegwijs()) {
    renderWegwijsParticipant(document.getElementById("participantApp"));
    return;
  }
  if (isStoryWorkshop()) {
    renderStoryParticipant();
    return;
  }
  renderSterkParticipant(document.getElementById("participantApp"));
}

function getSterkBingoCard() {
  const session=activeSessionId("sterk");
  const key=`slinnva-sterk-bingo-${session}-${participantClientId}`;
  try {
    const saved=JSON.parse(sessionStorage.getItem(key));
    if(Array.isArray(saved)&&saved.length===16)return saved;
  } catch{}
  const card=seededShuffle(data.bingoItems,`${session}-${participantClientId}-fraude-bingo`).slice(0,16);
  sessionStorage.setItem(key,JSON.stringify(card));
  return card;
}

function renderSterkParticipant(app) {
  sterkLiveState ||= createLocalSterkState();
  const state=sterkLiveState;
  const name=sessionStorage.getItem("slinnva-sterk-participant-name")||"";
  if(!name){
    app.innerHTML=`<div class="mobile-content"><div class="mobile-logo">STERK ONLINE</div><p class="eyebrow">Veilig, bewust en weerbaar online</p><h2>Welkom.</h2><p>Vul je naam in. Op het grote scherm blijven alle antwoorden anoniem.</p><form id="sterkLiveJoin"><div class="field"><label>Naam</label><input id="sterkLiveName" required autocomplete="name"></div><button class="mobile-button">Deelnemen</button></form></div>`;
    document.getElementById("sterkLiveJoin")?.addEventListener("submit",event=>{event.preventDefault();const value=valueOf("sterkLiveName");if(!value)return;sessionStorage.setItem("slinnva-sterk-participant-name",value);sessionStorage.setItem("slinnva-participant-name",value);sterkAction("participant-register",{name:value});renderSterkParticipant(app);});
    return;
  }
  if(state.status!=="running"||state.activeType==="slides"||!state.activeType){
    app.innerHTML=participantMessage("…","Wacht op de trainer.","De actieve opdracht verschijnt hier automatisch.");
    return;
  }
  if(state.activeType==="bingo"){
    const card=getSterkBingoCard();
    const saved=sterkBingoResponses().find(item=>item.clientId===participantClientId);
    const marked=saved?.marked||[];
    const pattern=findZigzagBingo(marked);
    if(state.bingo?.status==="pending"&&!state.bingo?.approvedWinner&&!pattern){
      app.innerHTML=participantMessage("◇","Bingo wordt gecontroleerd.","Het spel is tijdelijk gestopt voor alle deelnemers.");
      return;
    }
    if(state.bingo?.approvedWinner){
      app.innerHTML=participantMessage(pattern?"BINGO":"◇",pattern?"Jij hebt bingo!":"Het spel is afgerond.",pattern?"Laat je zigzaglijn aan de trainer zien.":"De trainer heeft een bingo gecontroleerd.");
      return;
    }
    app.innerHTML=`<div class="mobile-content bingo-mobile"><div class="mobile-logo">FRAUDE BINGO</div><p class="eyebrow">Situatie ${(state.bingo?.promptIndex||0)+1}</p><h3>${escapeHtml(bingoStatements[state.bingo?.promptIndex||0])}</h3><p>Tik de signalen aan die jij herkent.</p><div class="mobile-bingo-board">${card.map((item,index)=>`<button data-sterk-bingo-cell="${index}" class="${marked.includes(index)?"marked":""} ${pattern?.includes(index)?"winning":""}">${escapeHtml(item)}</button>`).join("")}</div>${pattern?`<div class="bingo-phone-win"><strong>BINGO!</strong><span>Je zigzaglijn is gevonden. Wacht op controle van de trainer.</span></div>`:""}</div>`;
    document.querySelectorAll("[data-sterk-bingo-cell]").forEach(button=>button.addEventListener("click",()=>{
      if(!state.responseOpen||pattern)return;
      const index=Number(button.dataset.sterkBingoCell);
      const next=marked.includes(index)?marked.filter(item=>item!==index):[...marked,index];
      const winning=findZigzagBingo(next);
      sterkAction("submit",{activity:"bingoCard",value:{card,marked:next,hasBingo:Boolean(winning),pattern:winning||[]}});
      if(winning)sterkAction("control",{responseOpen:false,bingo:{...(state.bingo||{}),pendingWinner:participantClientId,status:"pending"}});
    }));
    return;
  }
  const entries=sterkPollResponses();
  const submitted=entries.some(item=>item.clientId===participantClientId&&item.generation===(state.responseGeneration||0));
  if(!state.responseOpen||submitted){
    app.innerHTML=participantMessage(submitted?"✓":"…",submitted?"Bedankt voor je antwoord.":"Wacht op de trainer.",submitted?"Je antwoord is ontvangen en blijft anoniem op het scherm.":"De antwoordronde is nog niet geopend.");
    return;
  }
  app.innerHTML=`<div class="mobile-content"><div class="mobile-logo">STERK ONLINE</div><p class="eyebrow">${state.activeType==="quiz"?"Quiz":"Live vraag"}</p><h3>${escapeHtml(state.poll?.question||"")}</h3>${state.timer?.running?`<div class="sterk-phone-timer">${sterkTimerRemaining()}</div>`:""}<div class="wegwijs-phone-options">${(state.poll?.options||[]).map((option,index)=>`<button data-sterk-choice="${index}"><b>${String.fromCharCode(65+index)}.</b> ${escapeHtml(option)}</button>`).join("")}</div></div>`;
  document.querySelectorAll("[data-sterk-choice]").forEach(button=>button.addEventListener("click",()=>sterkAction("submit",{activity:"sterkPoll",value:{questionIndex:state.questionIndex||0,choice:Number(button.dataset.sterkChoice)}})));
}

/*
 * De oude lokale deelnemerweergave blijft hieronder bewust buiten gebruik.
 * Bestaande opgeslagen demoresultaten kunnen daardoor nog wel worden geëxporteerd.
 */
function renderLegacySterkParticipant() {
  const app = document.getElementById("participantApp");
  if (data.participantState === "waiting") {
    app.innerHTML = participantMessage("✓", "Je bent aangemeld.", "Wacht op de volgende activiteit van de trainer.");
  } else if (data.participantState === "poll") {
    app.innerHTML = `<div class="mobile-content"><div class="mobile-logo">STERK ONLINE</div><p class="eyebrow">Live vraag</p><h3>${data.poll.question}</h3>
      <div class="field">${data.poll.options.map((option,index) => `<button class="mobile-button poll-vote" data-vote="${index}">${option}</button>`).join("")}</div></div>`;
    document.querySelectorAll("[data-vote]").forEach(button => button.addEventListener("click", () => {
      data.poll.votes[Number(button.dataset.vote)] += 1;
      data.participantState = "poll-thanks";
      saveData("Antwoord ontvangen");
      renderParticipant();
      renderScreen();
    }));
  } else if (data.participantState === "poll-thanks") {
    app.innerHTML = participantMessage("✓", "Bedankt voor je antwoord.", "Je antwoord is ontvangen en wordt alleen in het groepsresultaat getoond.");
  } else if (data.participantState === "bingo-choose") {
    app.innerHTML = `<div class="mobile-content bingo-mobile"><div class="mobile-logo">STERK ONLINE BINGO</div><p class="eyebrow">Kies je kaart</p>
      <h3>Kies één willekeurige bingokaart.</h3><p>Iedere kaart is anders. Je kunt je keuze daarna niet meer veranderen.</p>
      <div class="bingo-card-choices">${data.bingoCards.map((card,index)=>`
        <button class="bingo-card-choice" data-card-choice="${index}">
          <strong>Kaart ${String.fromCharCode(65+index)}</strong>
          <span>${card.slice(0,4).map(()=>"<i></i>").join("")}</span>
        </button>`).join("")}</div></div>`;
    document.querySelectorAll("[data-card-choice]").forEach(button => button.addEventListener("click", () => {
      data.selectedBingoCard = Number(button.dataset.cardChoice);
      data.participantState = "bingo-play";
      saveData("Bingokaart gekozen");
      renderParticipant();
    }));
  } else if (data.participantState === "bingo-play") {
    const card = data.bingoCards[data.selectedBingoCard] || [];
    app.innerHTML = `<div class="mobile-content bingo-mobile"><div class="mobile-logo">STERK ONLINE BINGO</div><p class="eyebrow">Jouw kaart</p>
      <h3>Maak een zigzaglijn.</h3><p>Tik vakjes aan. Vier aangrenzende vakjes moeten om en om omhoog en omlaag lopen.</p>
      <div class="zigzag-example"><i></i><i></i><i></i><i></i></div>
      <div class="mobile-bingo-board">${card.map((item,index)=>`
        <button data-bingo-cell="${index}" class="${data.bingoMarked.includes(index) ? "marked" : ""} ${data.bingoWinner?.pattern?.includes(index) ? "winning" : ""}">${item}</button>`).join("")}</div>
      <p class="bingo-auto-note">Bingo wordt automatisch herkend. Je hoeft niets te melden.</p></div>`;
    document.querySelectorAll("[data-bingo-cell]").forEach(button => button.addEventListener("click", () => toggleBingoCell(Number(button.dataset.bingoCell))));
  } else if (data.participantState === "bingo-stopped") {
    const winner = data.bingoWinner?.name || "Een deelnemer";
    if (data.bingoWinner?.participantId === participantClientId) {
      app.innerHTML = `<div class="mobile-content bingo-result winner-result">
        <div class="mobile-logo">STERK ONLINE BINGO</div>
        <div class="bingo-burst"><i></i><i></i><i></i><i></i><strong>BINGO!</strong></div>
        <h2>Jij hebt bingo!</h2>
        <p>Je zigzaglijn is automatisch herkend. Laat je telefoon aan de trainer zien voor controle.</p>
      </div>`;
    } else {
      app.innerHTML = participantMessage("◇", "Het spel is gestopt.", `${escapeHtml(winner)} heeft bingo. De trainer controleert de zigzaglijn.`);
    }
  } else {
    app.innerHTML = `<div class="mobile-content"><div class="mobile-logo">SLINNVA</div><p class="eyebrow">Sterk Online</p><h2>Welkom.<br>Doe je mee?</h2><p>Vul je naam in. Leeftijd en organisatie zijn niet verplicht.</p>
      <form id="joinForm">
        <div class="field"><label for="joinName">Naam</label><input id="joinName" required placeholder="Hoe mogen we je noemen?"></div>
        <div class="field"><label for="joinAge">Leeftijd (optioneel)</label><input id="joinAge" type="number" min="13" max="110" placeholder="Bijvoorbeeld 24"></div>
        <div class="field"><label for="joinOrg">Organisatie (optioneel)</label><input id="joinOrg" placeholder="Naam organisatie"></div>
        <button class="mobile-button" type="submit">Aanmelden voor workshop</button>
      </form><p style="font-size:11px;margin-top:22px">Je antwoorden worden alleen als groepsresultaat getoond.</p></div>`;
    document.getElementById("joinForm").addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("joinName").value.trim();
      data.participants.push({ name, age: document.getElementById("joinAge").value || null, online: true });
      data.currentParticipantName = name;
      sessionStorage.setItem("slinnva-participant-name", name);
      data.participantState = "waiting"; saveData("Deelnemer aangemeld"); renderParticipant(); renderTrainer();
    });
  }
}

function participantMessage(mark, title, text) {
  return `<div class="mobile-content"><div class="mobile-logo">SLINNVA</div><div class="waiting"><div class="waiting-mark">${mark}</div><h2>${title}</h2><p>${text}</p></div></div>`;
}

function startPoll() {
  sterkAction("control",{status:"running",activeType:"poll",questionIndex:0,revealResults:false,poll:{question:data.poll.question,options:[...data.poll.options],correctIndex:null,explanation:""}});
  sterkAction("open-response",{activity:"sterkPoll"});
  data.screenMode = "slides";
  const pollIndex = activeModules().findIndex(module => module.type === "poll");
  if (pollIndex >= 0) {
    data.currentModule = pollIndex;
    data.currentSlide = 0;
  }
  saveData("Openingspoll gestart");
  sendCurrentSlide();
  renderTrainer();
  renderParticipant();
  renderScreen();
}

function startSterkCurrentInteraction() {
  const module=currentModule();
  const presets={
    social:{question:"Wat valt jou als eerste op aan deze influencerpost?",options:["Het lijkt spontaan","Er zit reclame in","De hoeveelheid likes","Ik twijfel wat echt is"]},
    gambling:{question:"Wat zou jij bij deze gokpromotie als eerste controleren?",options:["Alleen de winst","De voorwaarden en risico's","Hoe bekend de influencer is","Of vrienden meedoen"]},
    ai:{question:"Een bekende stem vraagt dringend om geld. Wat doe je eerst?",options:["Meteen betalen","Terugbellen via een bekend nummer","Het bericht doorsturen","Alleen op de stem vertrouwen"],correctIndex:1,explanation:"Controleer altijd via een tweede, bekende route."},
    fraud:{question:"‘Hoi mam, dit is mijn nieuwe nummer.’ Wat doe je eerst?",options:["Geld overmaken","Op de link klikken","Bellen via het oude nummer","De code doorsturen"],correctIndex:2,explanation:"Neem zelf contact op via een nummer dat je al kende."},
    finish:{question:"Welke stap helpt jou om sterker online te handelen?",options:["Stoppen en controleren","Alles direct verwijderen","Nooit meer online gaan","Altijd alleen beslissen"],correctIndex:0,explanation:"Vertragen, controleren en erover praten verkleint het risico."}
  };
  const preset=presets[module.id]||{question:module.questions?.[0]||"Wat zou jij doen?",options:["Stoppen en controleren","Doorgaan zonder check","Iemand om hulp vragen","Ik twijfel"]};
  sterkAction("control",{status:"running",activeType:Number.isInteger(preset.correctIndex)?"quiz":"scenario",questionIndex:(sterkLiveState?.questionIndex||0)+1,revealResults:false,poll:preset});
  sterkAction("open-response",{activity:"sterkPoll"});
}

function startBingo() {
  sterkAction("control",{status:"running",activeType:"bingo",revealResults:false,bingo:{promptIndex:0,status:"active",pendingWinner:null,approvedWinner:false}});
  sterkAction("open-response",{activity:"bingoCard"});
  data.screenMode = "slides";
  saveData("Bingo gestart");
  sendCurrentSlide();
  renderParticipant();
  renderScreen();
}

function toggleBingoCell(index) {
  if (data.bingoStatus !== "active") return;
  data.bingoMarked = data.bingoMarked.includes(index)
    ? data.bingoMarked.filter(item => item !== index)
    : [...data.bingoMarked, index];

  const winningPattern = findZigzagBingo(data.bingoMarked);
  if (winningPattern) {
    data.bingoMarked = [...new Set([...data.bingoMarked, ...winningPattern])];
    data.bingoStatus = "stopped";
    data.bingoWinner = {
      name: getParticipantName(),
      participantId: participantClientId,
      cardIndex: data.selectedBingoCard,
      pattern: winningPattern
    };
    data.participantState = "bingo-stopped";
    data.screenMode = "bingo-winner";
    saveData("Bingo automatisch gedetecteerd");
    sendCurrentSlide();
    renderParticipant();
    renderScreen();
    toast("Bingo gedetecteerd: spel gestopt");
    return;
  }

  saveData();
  renderParticipant();
}

function findZigzagBingo(markedIndexes) {
  const marked = new Set(markedIndexes);
  const patterns = getZigzagPatterns();
  return patterns.find(pattern => pattern.every(index => marked.has(index))) || null;
}

function getZigzagPatterns() {
  const patterns = [];

  // Horizontaal: één vakje per kolom, steeds diagonaal aangrenzend
  // en met afwisselend omhoog/omlaag bewegen.
  for (let startRow = 0; startRow < 4; startRow += 1) {
    for (const firstDirection of [-1, 1]) {
      const rows = [startRow];
      let row = startRow;
      let direction = firstDirection;
      for (let column = 1; column < 4; column += 1) {
        row += direction;
        if (row < 0 || row > 3) break;
        rows.push(row);
        direction *= -1;
      }
      if (rows.length === 4) patterns.push(rows.map((item, column) => item * 4 + column));
    }
  }

  // Verticaal: één vakje per rij, steeds diagonaal aangrenzend
  // en met afwisselend links/rechts bewegen.
  for (let startColumn = 0; startColumn < 4; startColumn += 1) {
    for (const firstDirection of [-1, 1]) {
      const columns = [startColumn];
      let column = startColumn;
      let direction = firstDirection;
      for (let row = 1; row < 4; row += 1) {
        column += direction;
        if (column < 0 || column > 3) break;
        columns.push(column);
        direction *= -1;
      }
      if (columns.length === 4) patterns.push(columns.map((item, row) => row * 4 + item));
    }
  }

  return patterns;
}

function openBingoStatements() {
  openModal(`<p class="eyebrow">Trainerbibliotheek</p><h2>60 bingostellingen</h2>
    <p class="lead">Kies een stelling om voor te lezen en op het presentatiescherm te tonen.</p>
    <div class="statement-library">${bingoStatements.map((statement,index)=>`
      <button data-bingo-statement="${index}"><span>${String(index+1).padStart(2,"0")}</span>${statement}</button>`).join("")}</div>`);
  document.querySelectorAll("[data-bingo-statement]").forEach(button => button.addEventListener("click", () => {
    if (data.bingoStatus === "stopped") {
      toast("Het spel is gestopt. Start een nieuw bingospel om verder te gaan.");
      return;
    }
    data.bingoPromptIndex = Number(button.dataset.bingoStatement);
    data.screenMode = "bingo";
    saveData(`Stelling ${data.bingoPromptIndex + 1} staat klaar`);
    sendCurrentSlide();
    renderScreen();
    document.querySelectorAll("[data-bingo-statement]").forEach(item => item.classList.toggle("active", item === button));
  }));
}

function renderStoryAdmin() {
  updateWorkshopChrome();
  const story=data.story;
  const nav=[["content","Weken & inhoud"],["polls","Werkbladen"],["bingo","Traject & gasten"],["notes","Notities"],["versions","Versiebeheer"],["exports","Dashboard"]];
  document.querySelectorAll("[data-admin-tab]").forEach(button=>{
    const item=nav.find(([id])=>id===button.dataset.adminTab);
    if(item) button.textContent=item[1];
    button.classList.toggle("active",button.dataset.adminTab===story.adminTab);
  });
  const completedForms=Object.keys(story.weekForms||{}).length;
  const qrAnswerCount=Object.values(story.qrResults||{}).reduce((sum,items)=>sum+items.length,0);
  const views={
    content:`<p class="eyebrow">Zesweekse creatieve reis</p><h2>Weken & trainerinhoud</h2><p class="lead">Pas doelen, spreektekst, QR-opdrachten, werkbladen en studioslides aan.</p>
      ${story.weeks.map((week,index)=>`<article class="version-card story-week-admin"><div><strong>Week ${index+1} · ${week.title}</strong><p>${week.duration} minuten · ${week.slides.length} presentatieslides</p></div><button class="small-button" data-edit-story-week="${index}">Bewerken</button></article>`).join("")}`,
    polls:`<p class="eyebrow">Deelnemerswerk</p><h2>QR-resultaten & werkbladen</h2>
      ${story.weeks.map((week,index)=>`<article class="story-data-card"><strong>Week ${index+1} · ${escapeHtml(week.qr.title)}</strong><p>${(story.qrResults[week.id]||[]).length} antwoorden · ${story.weekForms?.[week.id]?"Werkblad ingevuld":"Werkblad nog leeg"}</p></article>`).join("")}`,
    bingo:`<p class="eyebrow">${story.variant==="school"?"School Editie":"Buurt Editie"}</p><h2>Trajectinstellingen & gasten</h2>
      <div class="form-grid"><div class="field"><label>Workshopnaam</label><input id="storyWorkshopName" value="${escapeHtml(story.name)}"></div><div class="field"><label>Ondertitel</label><input id="storyWorkshopSubtitle" value="${escapeHtml(story.subtitle)}"></div>
      <div class="field wide"><label>Korte beschrijving dashboard</label><textarea id="storyWorkshopDescription">${escapeHtml(story.description)}</textarea></div></div>
      <div class="form-grid"><div><h3>Mogelijke onderwerpen</h3><div class="bingo-editor">${storyTopics().map((item,index)=>`<button class="bingo-tag" data-remove-story-topic="${index}">${item} ×</button>`).join("")}</div>
      <div class="field"><label>Onderwerp toevoegen</label><input id="newStoryTopic"></div><button class="small-button" id="addStoryTopic">Toevoegen</button></div>
      <div><h3>Gastsprekers</h3><div class="bingo-editor">${story.guestSpeakers[story.variant].map((item,index)=>`<button class="bingo-tag" data-remove-story-guest="${index}">${item} ×</button>`).join("")}</div>
      <div class="field"><label>Gastspreker toevoegen</label><input id="newStoryGuest"></div><button class="small-button" id="addStoryGuest">Toevoegen</button></div></div>
      <div class="field" style="margin-top:25px"><label>Certificaattekst</label><textarea id="storyCertificateText">${escapeHtml(story.certificateText)}</textarea></div><button class="button dark" id="saveStorySettings">Instellingen opslaan</button>`,
    notes:`<p class="eyebrow">Trainer</p><h2>Notities per week</h2>${story.notes.length?story.notes.map(note=>`<article class="note-card"><strong>Week ${note.week}</strong><p>${note.date} · ${escapeHtml(note.text)}</p></article>`).join(""):"<p>Er zijn nog geen notities.</p>"}`,
    versions:`<p class="eyebrow">Publiceren</p><h2>Versiebeheer</h2>${story.versions.map(version=>`<article class="version-card"><div><strong>Versie ${version.version}</strong><p>${version.date}</p></div><span class="status">${version.status}</span></article>`).join("")}<button class="button light" id="newStoryVersion">Nieuwe conceptversie</button>`,
    exports:`<p class="eyebrow">Trajectdashboard</p><h2>Voortgang & bestanden</h2>
      <div class="story-dashboard-grid">
        ${storyMetric(story.participants.length,"Deelnemers")}
        ${storyMetric(story.variant==="school"?"School":"Buurt","Traject")}
        ${storyMetric(`${data.story.currentWeek+1}/6`,"Huidige week")}
        ${storyMetric(completedForms,"Ingevulde formulieren")}
        ${storyMetric(qrAnswerCount,"QR-antwoorden")}
        ${storyMetric(story.reflection.proud?1:0,"Reflecties")}
        ${storyMetric(story.notes.length,"Notities")}
        ${storyMetric(story.recordings.length,"Podcastbestanden")}
        ${storyMetric(story.certificates.length,"Certificaten")}
      </div>
      <h3 style="margin-top:30px">Podcastopnames</h3>
      ${story.recordings.length?story.recordings.map(item=>`<article class="version-card"><div><strong>${item.name}</strong><p>${item.date} · ${Math.round(item.size/1024)} KB</p></div><button class="small-button" data-download-story-audio="${item.id}">Download</button></article>`).join(""):"<p>Nog geen opname opgeslagen.</p>"}
      <button class="button dark" id="adminStoryCertificates" style="margin-top:20px">Certificaten genereren</button>`
  };
  document.getElementById("adminContent").innerHTML=views[story.adminTab]||views.content;
  bindStoryAdmin();
}

function storyMetric(value,label) {
  return `<article><strong>${value}</strong><span>${label}</span></article>`;
}

function bindStoryAdmin() {
  document.querySelectorAll("[data-edit-story-week]").forEach(button=>button.addEventListener("click",()=>editStoryWeek(Number(button.dataset.editStoryWeek))));
  document.getElementById("saveStorySettings")?.addEventListener("click",()=>{
    data.story.name=valueOf("storyWorkshopName");
    data.story.subtitle=valueOf("storyWorkshopSubtitle");
    data.story.description=valueOf("storyWorkshopDescription");
    data.story.certificateText=valueOf("storyCertificateText");
    saveData("Trajectinstellingen opgeslagen");
    renderWorkshops();updateWorkshopChrome();renderStoryAdmin();
  });
  document.querySelectorAll("[data-remove-story-topic]").forEach(button=>button.addEventListener("click",()=>{data.story.variantTopics[data.story.variant].splice(Number(button.dataset.removeStoryTopic),1);saveData("Onderwerp verwijderd");renderStoryAdmin();}));
  document.querySelectorAll("[data-remove-story-guest]").forEach(button=>button.addEventListener("click",()=>{data.story.guestSpeakers[data.story.variant].splice(Number(button.dataset.removeStoryGuest),1);saveData("Gastspreker verwijderd");renderStoryAdmin();}));
  document.getElementById("addStoryTopic")?.addEventListener("click",()=>{const value=valueOf("newStoryTopic");if(!value)return;data.story.variantTopics[data.story.variant].push(value);saveData("Onderwerp toegevoegd");renderStoryAdmin();});
  document.getElementById("addStoryGuest")?.addEventListener("click",()=>{const value=valueOf("newStoryGuest");if(!value)return;data.story.guestSpeakers[data.story.variant].push(value);saveData("Gastspreker toegevoegd");renderStoryAdmin();});
  document.getElementById("newStoryVersion")?.addEventListener("click",()=>{
    const current=data.story.versions[0]?.version||"1.0";const [major,minor]=current.split(".").map(Number);
    data.story.versions.unshift({version:`${major}.${minor+1}`,status:"Concept",date:"Vandaag"});saveData("Nieuwe conceptversie gemaakt");renderStoryAdmin();
  });
  document.querySelectorAll("[data-download-story-audio]").forEach(button=>button.addEventListener("click",()=>{
    const recording=data.story.recordings.find(item=>item.id===button.dataset.downloadStoryAudio);downloadStoryAudio(recording.id,recording.name);
  }));
  document.getElementById("adminStoryCertificates")?.addEventListener("click",openStoryCertificates);
}

function editStoryWeek(index) {
  const week=data.story.weeks[index];
  openModal(`<p class="eyebrow">Week ${index+1} bewerken</p><h2>${week.title}</h2>
    <div class="form-grid">
      <div class="field"><label>Titel</label><input id="storyWeekTitle" value="${escapeHtml(week.title)}"></div>
      <div class="field"><label>Duur in minuten</label><input id="storyWeekDuration" type="number" min="60" max="90" value="${week.duration}"></div>
      <div class="field wide"><label>Leerdoel</label><textarea id="storyWeekGoal">${escapeHtml(week.goal)}</textarea></div>
      <div class="field wide"><label>Volledige spreektekst</label><textarea id="storyWeekScript" style="min-height:220px">${escapeHtml(week.script)}</textarea></div>
      <div class="field wide"><label>Tijdsplanning, één regel per onderdeel</label><textarea id="storyWeekPlanning">${escapeHtml(week.planning.join("\n"))}</textarea></div>
      <div class="field wide"><label>Oefeningen, één per regel</label><textarea id="storyWeekExercises">${escapeHtml(week.exercises.join("\n"))}</textarea></div>
      <div class="field wide"><label>Gespreksvragen, één per regel</label><textarea id="storyWeekQuestions">${escapeHtml(week.questions.join("\n"))}</textarea></div>
      <div class="field wide"><label>Verdiepingsvragen, één per regel</label><textarea id="storyWeekDeepQuestions">${escapeHtml((week.deepQuestions||[]).join("\n"))}</textarea></div>
      <div class="field wide"><label>Werkbladinstructie</label><textarea id="storyWeekWorksheetInstructions">${escapeHtml(week.worksheetInstructions||"")}</textarea></div>
      <div class="field"><label>QR-opdracht titel</label><input id="storyWeekQrTitle" value="${escapeHtml(week.qr.title)}"></div>
      <div class="field wide"><label>QR-vraag</label><textarea id="storyWeekQrQuestion">${escapeHtml(week.qr.question)}</textarea></div>
      <div class="field wide"><label>QR-antwoorden, één per regel</label><textarea id="storyWeekQrOptions">${escapeHtml(week.qr.options.join("\n"))}</textarea></div>
      <div class="field wide"><label>Werkbladvelden, één per regel</label><textarea id="storyWeekWorksheet">${escapeHtml(week.worksheet.join("\n"))}</textarea></div>
      <div class="field wide"><label>Benodigdheden, één per regel</label><textarea id="storyWeekMaterials">${escapeHtml((week.materials||[]).join("\n"))}</textarea></div>
    </div>
    <div class="slide-editor-block"><p class="eyebrow">Gekoppelde presentatieslides</p>${week.slides.map((slide,slideIndex)=>`<article class="slide-edit-card"><strong>Slide ${slideIndex+1} · ${escapeHtml(slide.trainerTitle||slide.label)}</strong><div class="field"><label>Korte hoofdvraag op het scherm</label><textarea data-story-slide-title="${slideIndex}">${escapeHtml(slide.title)}</textarea></div><div class="field"><label>Korte tweede regel</label><input data-story-slide-question="${slideIndex}" value="${escapeHtml(slide.question)}"></div><div class="field"><label>Wat vertelt de trainer bij deze slide?</label><textarea data-story-slide-trainer="${slideIndex}" style="min-height:150px">${escapeHtml(slide.trainerBlock||week.script)}</textarea></div></article>`).join("")}</div>
    <button class="button dark" id="saveStoryWeek">Week opslaan</button>`);
  document.getElementById("saveStoryWeek").addEventListener("click",()=>{
    week.title=valueOf("storyWeekTitle");week.duration=Number(valueOf("storyWeekDuration"));week.goal=valueOf("storyWeekGoal");week.script=valueOf("storyWeekScript");
    week.planning=linesFrom("storyWeekPlanning");week.exercises=linesFrom("storyWeekExercises");week.questions=linesFrom("storyWeekQuestions");
    week.deepQuestions=linesFrom("storyWeekDeepQuestions");week.worksheetInstructions=valueOf("storyWeekWorksheetInstructions");
    week.qr.title=valueOf("storyWeekQrTitle");week.qr.question=valueOf("storyWeekQrQuestion");week.qr.options=linesFrom("storyWeekQrOptions");
    week.worksheet=linesFrom("storyWeekWorksheet");
    week.materials=linesFrom("storyWeekMaterials");
    week.slides.forEach((slide,slideIndex)=>{
      slide.title=document.querySelector(`[data-story-slide-title="${slideIndex}"]`).value.trim();
      slide.question=document.querySelector(`[data-story-slide-question="${slideIndex}"]`).value.trim();
      slide.trainerBlock=document.querySelector(`[data-story-slide-trainer="${slideIndex}"]`).value.trim();
    });
    saveData("Weekinhoud opgeslagen");closeModal();renderStoryAdmin();renderStoryTrainer();renderStoryScreen();
  });
}

function renderAdmin() {
  if (isTalent()) {
    renderTalentAdmin();
    return;
  }
  if (isWegwijs()) {
    renderWegwijsAdmin();
    return;
  }
  if (isStoryWorkshop()) {
    renderStoryAdmin();
    return;
  }
  [["content","Workshopinhoud"],["polls","Polls & casussen"],["bingo","Bingo"],["notes","Notities"],["versions","Versiebeheer"],["exports","Exports"]].forEach(([id,label])=>{
    const button=document.querySelector(`[data-admin-tab="${id}"]`); if(button)button.textContent=label;
  });
  const content = document.getElementById("adminContent");
  document.querySelectorAll("[data-admin-tab]").forEach(button => button.classList.toggle("active", button.dataset.adminTab === data.adminTab));
  const views = {
    content: `<p class="eyebrow">Workshopinhoud</p><h2>Onderdelen beheren</h2><p class="lead">Bepaal de volgorde en welke optionele onderdelen in deze versie zichtbaar zijn.</p>
      <table class="admin-table"><thead><tr><th>Actief</th><th>Onderdeel</th><th>Duur</th><th>Type</th><th></th></tr></thead><tbody>
      ${data.modules.map((module,index) => `<tr><td><button class="switch ${module.enabled ? "on":""}" data-toggle-module="${index}" aria-label="${module.title} aan- of uitzetten"></button></td><td><strong>${module.title}</strong></td><td>${module.duration} min</td><td>${module.type}</td><td><button class="small-button" data-edit-module="${index}">Bewerken</button></td></tr>`).join("")}
      </tbody></table>`,
    polls: `<p class="eyebrow">Interacties</p><h2>Polls & casussen</h2><p class="lead">Maak onbeperkt nieuwe gespreksvragen en realistische situaties.</p>
      <div class="version-card"><div><strong>${data.poll.question}</strong><p>${data.poll.options.length} antwoordmogelijkheden · live resultaten</p></div><button class="small-button" id="editPoll">Bewerken</button></div>
      ${data.modules.filter(m=>m.type==="case").map((m,i)=>`<div class="version-card"><div><strong>${m.title}</strong><p>${caseDescription(m.id)}</p></div><button class="small-button" data-edit-module="${data.modules.indexOf(m)}">Bewerken</button></div>`).join("")}
      <button class="button dark" style="margin-top:20px" id="newCase">Nieuwe casus</button>`,
    bingo: `<p class="eyebrow">Spelonderdeel</p><h2>Bingovakjes</h2><p class="lead">Iedere deelnemer krijgt automatisch een unieke kaart uit deze verzameling.</p>
      <div class="bingo-editor">${data.bingoItems.map((item,index)=>`<button class="bingo-tag" data-remove-bingo="${index}">${item} ×</button>`).join("")}</div>
      <div class="field" style="max-width:420px;margin-top:24px"><label for="newBingoItem">Nieuw vakje</label><input id="newBingoItem" placeholder="Bijvoorbeeld: verdachte QR-code"></div><button class="button dark" id="addBingoItem">Vakje toevoegen</button>`,
    notes: `<p class="eyebrow">Terugblik</p><h2>Trainingsnotities</h2><p class="lead">${data.session.organization} · ${data.session.audience}</p>
      ${data.notes.map(note=>`<article class="note-card"><strong>${note.module}</strong><p>${note.date} · ${note.text}</p></article>`).join("")}
      <button class="button dark" style="margin-top:20px" id="adminAddNote">Notitie toevoegen</button>`,
    versions: `<p class="eyebrow">Publiceren</p><h2>Versiebeheer</h2><p class="lead">Werk veilig in concept en publiceer pas wanneer de workshop klaar is.</p>
      ${data.versions.map(version=>`<article class="version-card"><div><strong>Versie ${version.version}</strong><p>${version.date}</p></div><span class="status">${version.status}</span></article>`).join("")}
      <button class="button light" style="margin-top:20px" id="newVersion">Nieuwe conceptversie</button>`,
    exports: `<p class="eyebrow">Rapportage</p><h2>Exporteren</h2><p class="lead">Download gegevens uit deze lokale demosessie.</p>
      ${[["Deelnemerslijst","Namen, leeftijd en verbonden status","participants"],["Resultaten","Pollresultaten van de groep","results"],["Notities","Notities per workshoponderdeel","notes"],["Workshoprapport","Sessie, resultaten en notities samen","report"],["Workshopdata","Volledige inhoud voor overdracht","json"]].map(([title,desc,type])=>`<article class="export-card"><strong>${title}</strong><p>${desc}</p><button class="small-button" data-export="${type}" style="margin-top:12px">Download</button></article>`).join("")}`
  };
  content.innerHTML = views[data.adminTab];
  bindAdminContent();
}

function renderWegwijsAdmin() {
  const nav=[["content","Weken & inhoud"],["polls","Live opdrachten"],["bingo","Materialen"],["notes","Notities"],["versions","Versiebeheer"],["exports","Exports"]];
  document.querySelectorAll("[data-admin-tab]").forEach(button=>{
    const item=nav.find(([id])=>id===button.dataset.adminTab);
    if(item)button.textContent=item[1];
    button.classList.toggle("active",button.dataset.adminTab===data.adminTab);
  });
  const responseGroups=Object.entries(wegwijsState?.responses||{}).filter(([key])=>["omgeving","administratie","basiszaken","meedoen"].some(id=>key.endsWith(`-${id}`)));
  const views={
    content:`<p class="eyebrow">Eigen trajectinhoud</p><h2>Samen Wegwijs in Nederland</h2><p class="lead">Vier zelfstandige weken met een vaste presentatie- en trainerflow.</p>
      ${wegwijsWeeks.map((week,index)=>`<article class="version-card"><div><strong>Week ${index+1} · ${escapeHtml(week.title)}</strong><p>${escapeHtml(week.question)} · ${week.steps.length} onderdelen</p></div><button class="small-button" data-admin-start-wegwijs="${index}">Open week</button></article>`).join("")}`,
    polls:`<p class="eyebrow">Anonieme groepsinteractie</p><h2>Live opdrachten</h2>${responseGroups.map(([key,items])=>`<article class="version-card"><strong>${escapeHtml(key)}</strong><span>${items.length} antwoorden</span></article>`).join("")||"<p>Nog geen resultaten opgeslagen.</p>"}`,
    bingo:`<p class="eyebrow">Bibliotheek</p><h2>Werkbladen en printmateriaal</h2><p class="lead">De Instantie Estafette, briefkaart, budgetspel, zorgroutes en het Wegwijs Plan staan als aparte materialen klaar.</p><button class="button dark" id="openWegwijsLibrary">Open bibliotheek</button>`,
    notes:`<p class="eyebrow">Automatisch gekoppeld</p><h2>Trainernotities</h2>${Object.values(wegwijsState?.stepNotes||{}).map(note=>`<article class="note-card"><strong>${escapeHtml(note.stepId)}</strong><p>${escapeHtml(note.text||"")}</p><small>Week ${note.week} · ${escapeHtml(note.group||"Workshopgroep")}</small></article>`).join("")||"<p>Nog geen notities.</p>"}`,
    versions:`<p class="eyebrow">Publiceren</p><h2>Versiebeheer</h2>${data.wegwijs.versions.map(version=>`<article class="version-card"><strong>Versie ${escapeHtml(version.version)}</strong><span class="status">${escapeHtml(version.status)}</span></article>`).join("")}<button class="button light" id="newWegwijsVersion">Nieuwe conceptversie</button>`,
    exports:`<p class="eyebrow">Rapportage</p><h2>Exports Samen Wegwijs</h2><p class="lead">Resultaten, actiepunten, impactmeting en trainernotities blijven gescheiden van andere workshops.</p><button class="button dark" id="openWegwijsExports">Exportmogelijkheden openen</button>`
  };
  document.getElementById("adminContent").innerHTML=views[data.adminTab]||views.content;
  document.querySelectorAll("[data-admin-start-wegwijs]").forEach(button=>button.addEventListener("click",()=>startWegwijsWeek(Number(button.dataset.adminStartWegwijs))));
  document.getElementById("openWegwijsLibrary")?.addEventListener("click",()=>showView("library"));
  document.getElementById("openWegwijsExports")?.addEventListener("click",openWegwijsExport);
  document.getElementById("newWegwijsVersion")?.addEventListener("click",()=>{
    const version=(Number(data.wegwijs.versions[0]?.version||1)+.1).toFixed(1);
    data.wegwijs.versions.unshift({version,status:"Concept"});
    saveData("Nieuwe conceptversie gemaakt");
    renderWegwijsAdmin();
  });
}

function renderTalentAdmin() {
  const nav=[["content","Weken & inhoud"],["polls","Live opdrachten"],["bingo","Materialen"],["notes","Notities"],["versions","Versiebeheer"],["exports","Exports"]];
  document.querySelectorAll("[data-admin-tab]").forEach(button=>{
    const item=nav.find(([id])=>id===button.dataset.adminTab);
    if(item)button.textContent=item[1];
    button.classList.toggle("active",button.dataset.adminTab===data.adminTab);
  });
  const responseGroups=Object.entries(talentState?.responses||{}).filter(([key])=>talentWeeks.some(week=>key.endsWith(`-${week.id}`)));
  const views={
    content:`<p class="eyebrow">Eigen trajectinhoud</p><h2>Van Talent naar Toekomst</h2><p class="lead">Vier zelfstandige weken met eigen opdrachten, plannen en resultaten.</p>${talentWeeks.map((week,index)=>`<article class="version-card"><div><strong>Week ${index+1} · ${escapeHtml(week.title)}</strong><p>${escapeHtml(week.question)} · ${week.steps.length} onderdelen</p></div><button class="small-button" data-admin-start-talent="${index}">Open week</button></article>`).join("")}`,
    polls:`<p class="eyebrow">Anonieme interactie</p><h2>Live opdrachten</h2>${responseGroups.map(([key,items])=>`<article class="version-card"><strong>${escapeHtml(key)}</strong><span>${items.length} antwoorden</span></article>`).join("")||"<p>Nog geen resultaten.</p>"}`,
    bingo:`<p class="eyebrow">Bibliotheek</p><h2>Talentkaarten, bingo en plannen</h2><p class="lead">Alle printbare werkvormen en persoonlijke planbladen staan in de bibliotheek.</p><button class="button dark" id="openTalentLibrary">Open bibliotheek</button>`,
    notes:`<p class="eyebrow">Per onderdeel</p><h2>Trainernotities</h2>${Object.values(talentState?.stepNotes||{}).map(note=>`<article class="note-card"><strong>${escapeHtml(note.stepId)}</strong><p>${escapeHtml(note.text||"")}</p><small>Week ${note.week}</small></article>`).join("")||"<p>Nog geen notities.</p>"}`,
    versions:`<p class="eyebrow">Publiceren</p><h2>Versiebeheer</h2>${data.talent.versions.map(version=>`<article class="version-card"><strong>Versie ${escapeHtml(version.version)}</strong><span class="status">${escapeHtml(version.status)}</span></article>`).join("")}<button class="button light" id="newTalentVersion">Nieuwe conceptversie</button>`,
    exports:`<p class="eyebrow">Eigen rapportage</p><h2>Exports Talent naar Toekomst</h2><p class="lead">Plannen, reflecties, impact, talenten, richtingen en obstakels blijven gescheiden van andere workshops.</p><button class="button dark" id="openTalentExports">Exportmogelijkheden openen</button>`
  };
  document.getElementById("adminContent").innerHTML=views[data.adminTab]||views.content;
  document.querySelectorAll("[data-admin-start-talent]").forEach(button=>button.addEventListener("click",()=>startTalentWeek(Number(button.dataset.adminStartTalent))));
  document.getElementById("openTalentLibrary")?.addEventListener("click",()=>showView("library"));
  document.getElementById("openTalentExports")?.addEventListener("click",openTalentExport);
  document.getElementById("newTalentVersion")?.addEventListener("click",()=>{
    const version=(Number(data.talent.versions[0]?.version||1)+.1).toFixed(1);
    data.talent.versions.unshift({version,status:"Concept"});saveData("Nieuwe Talent-conceptversie gemaakt");renderTalentAdmin();
  });
}

function ensureSterkTrainerControls() {
  const panel=document.querySelector(".live-panel");
  if (panel.querySelector("#sterkTestMode")) return;
  panel.innerHTML=`<div class="live-head"><i></i><strong>Live sessie</strong></div>
    <div class="metric"><strong id="participantCount">${sterkParticipantCount()}</strong><span>deelnemers verbonden</span></div>
    <div class="sterk-live-status"><span id="sterkSessionCode">Sessie ${escapeHtml(activeSessionId("sterk"))}</span><span id="sterkAnswerStatus">${sterkLiveState?.responseOpen?"Antwoorden open":"Geen opdracht actief"}</span></div>
    <div class="participant-stack" id="participantStack"></div>
    <button class="button light full" id="showParticipants">Deelnemers bekijken</button><hr>
    <p class="label">Snelle acties</p>
    <div class="sterk-timer-control"><select id="sterkTimerDuration"><option value="5">5 seconden</option><option value="10">10 seconden</option><option value="20">20 seconden</option><option value="30">30 seconden</option><option value="0">Handmatig sluiten</option></select><button class="button light" id="startSterkTimer">Start tijd</button></div>
    <button class="quick-action primary-action" id="startPoll"><span>▶</span>Start openingspoll</button>
    <button class="quick-action primary-action" id="startSterkCurrent"><span>▶</span>Start vraag van deze slide</button>
    <button class="quick-action" id="openPoll"><span>↗</span>Toon polluitslag</button>
    <button class="quick-action primary-action" id="openBingo"><span>▶</span>Start bingo</button>
    <button class="quick-action" id="nextBingoPrompt"><span>→</span>Volgende bingositatie</button>
    <button class="quick-action" id="validateBingo"><span>✓</span>Controleer bingo</button>
    <button class="quick-action" id="resetParticipants"><span>↻</span>Deelnemersscherm resetten</button>
    <button class="quick-action" id="reopenSterk"><span>↺</span>Opdracht opnieuw openen</button>
    <button class="quick-action" id="sterkTestMode"><span>◇</span>Test live verbinding</button>
    <button class="quick-action" id="openBingoStatements"><span>◇</span>Open 60 bingostellingen</button>
    <button class="quick-action" id="resumeSlides"><span>▶</span>Terug naar presentatie</button>
    <button class="quick-action" id="addNote"><span>＋</span>Notitie toevoegen</button>`;
  document.getElementById("showParticipants").addEventListener("click",openParticipants);
  document.getElementById("startPoll").addEventListener("click",startPoll);
  document.getElementById("startSterkCurrent").addEventListener("click",startSterkCurrentInteraction);
  document.getElementById("startSterkTimer").addEventListener("click",()=>{const duration=Number(document.getElementById("sterkTimerDuration").value);sterkAction("open-response",{activity:sterkLiveState?.activeType==="bingo"?"bingoCard":"sterkPoll"});if(duration>0)sterkAction("timer",{running:true,duration});});
  document.getElementById("openPoll").addEventListener("click",showSterkResults);
  document.getElementById("openBingo").addEventListener("click",startBingo);
  document.getElementById("nextBingoPrompt").addEventListener("click",()=>sterkAction("control",{bingo:{...(sterkLiveState?.bingo||{}),promptIndex:Math.min(bingoStatements.length-1,(sterkLiveState?.bingo?.promptIndex||0)+1)}}));
  document.getElementById("validateBingo").addEventListener("click",openSterkBingoValidation);
  document.getElementById("resetParticipants").addEventListener("click",()=>sterkAction("control",{activeType:"slides",responseOpen:false,revealResults:false}));
  document.getElementById("reopenSterk").addEventListener("click",()=>sterkAction("open-response",{activity:sterkLiveState?.activeType==="bingo"?"bingoCard":"sterkPoll"}));
  document.getElementById("sterkTestMode").addEventListener("click",openLiveTestMode);
  document.getElementById("openBingoStatements").addEventListener("click",openBingoStatements);
  document.getElementById("resumeSlides").addEventListener("click",resumePresentation);
  document.getElementById("addNote").addEventListener("click",openNoteModal);
}

function bindAdminContent() {
  document.querySelectorAll("[data-toggle-module]").forEach(button => button.addEventListener("click", () => {
    data.modules[Number(button.dataset.toggleModule)].enabled = !data.modules[Number(button.dataset.toggleModule)].enabled;
    saveData("Module-instelling opgeslagen"); renderAdmin(); renderTrainer(); renderScreen();
  }));
  document.querySelectorAll("[data-edit-module]").forEach(button => button.addEventListener("click", () => editModule(Number(button.dataset.editModule))));
  document.querySelectorAll("[data-remove-bingo]").forEach(button => button.addEventListener("click", () => {
    data.bingoItems.splice(Number(button.dataset.removeBingo),1); saveData("Bingovakje verwijderd"); renderAdmin();
  }));
  document.querySelectorAll("[data-export]").forEach(button => button.addEventListener("click", () => exportData(button.dataset.export)));
  document.getElementById("addBingoItem")?.addEventListener("click", () => {
    const value = document.getElementById("newBingoItem").value.trim(); if (!value) return;
    data.bingoItems.push(value); saveData("Bingovakje toegevoegd"); renderAdmin();
  });
  document.getElementById("editPoll")?.addEventListener("click", editPoll);
  document.getElementById("newCase")?.addEventListener("click", createCase);
  document.getElementById("adminAddNote")?.addEventListener("click", openNoteModal);
  document.getElementById("newVersion")?.addEventListener("click", () => {
    const last = data.versions[0].version.split(".").map(Number); const version = `${last[0]}.${last[1]+1}`;
    data.versions.unshift({ version, status:"Concept", date:"Vandaag" }); saveData("Nieuwe conceptversie gemaakt"); renderAdmin();
  });
}

function setAdminTab(tab) {
  if (isStoryWorkshop()) data.story.adminTab=tab;
  else data.adminTab=tab;
  saveData(); renderAdmin(); showView("admin");
}

function editModule(index) {
  const module = data.modules[index];
  openModal(`<p class="eyebrow">Inhoud bewerken</p><h2>${module.title}</h2>
    <div class="form-grid">
      <div class="field"><label>Titel</label><input id="editTitle" value="${escapeHtml(module.title)}"></div>
      <div class="field"><label>Duur in minuten</label><input id="editDuration" type="number" min="1" value="${module.duration}"></div>
      <div class="field wide"><label>Doel</label><textarea id="editGoal">${escapeHtml(module.goal)}</textarea></div>
      <div class="field wide"><label>Volledige spreektekst</label><textarea id="editScript" style="min-height:220px">${escapeHtml(module.script)}</textarea></div>
      <div class="field wide"><label>Achtergrondinformatie, één punt per regel</label><textarea id="editBackground">${escapeHtml(module.background.join("\n"))}</textarea></div>
      <div class="field wide"><label>Gespreks- en verdiepingsvragen, één per regel</label><textarea id="editQuestions">${escapeHtml(module.questions.join("\n"))}</textarea></div>
      <div class="field wide"><label>Praktische tips, één per regel</label><textarea id="editTips">${escapeHtml(module.practicalTips.join("\n"))}</textarea></div>
      <div class="field wide"><label>Hulp in Nederland, één per regel</label><textarea id="editHelp">${escapeHtml(module.help.join("\n"))}</textarea></div>
    </div>
    <div class="slide-editor-block">
      <p class="eyebrow">Deelnemerspresentatie</p>
      <h3>Korte gesprekstarters</h3>
      <p>Houd iedere slide binnen vijf seconden begrijpelijk. Uitleg hoort in de spreektekst.</p>
      ${module.presentation.map((item, slideIndex) => `
        <article class="slide-edit-card">
          <strong>Slide ${slideIndex + 1} · ${escapeHtml(item.label)}</strong>
          <div class="field"><label>Grote tekst of vraag</label><textarea data-edit-slide-title="${slideIndex}">${escapeHtml(item.title)}</textarea></div>
          <div class="field"><label>Korte tweede regel</label><input data-edit-slide-question="${slideIndex}" value="${escapeHtml(item.question)}"></div>
          <div class="field"><label>Afbeelding vervangen (optioneel)</label><input type="file" accept="image/png,image/jpeg,image/webp" data-edit-slide-image="${slideIndex}"></div>
        </article>`).join("")}
    </div>
    <div class="field"><label>Deze wijziging gebruiken voor</label>
      <select id="editScope"><option value="future">Alle toekomstige workshops</option><option value="session">Alleen deze sessie</option></select>
    </div>
    <button class="button dark" id="saveModuleEdit">Wijzigingen opslaan</button>`);
  document.getElementById("saveModuleEdit").addEventListener("click", async () => {
    module.title = document.getElementById("editTitle").value.trim();
    module.duration = Number(document.getElementById("editDuration").value);
    module.goal = document.getElementById("editGoal").value.trim();
    module.script = document.getElementById("editScript").value.trim();
    module.background = linesFrom("editBackground");
    module.questions = linesFrom("editQuestions");
    module.practicalTips = linesFrom("editTips");
    module.help = linesFrom("editHelp");
    for (const [slideIndex, item] of module.presentation.entries()) {
      item.title = document.querySelector(`[data-edit-slide-title="${slideIndex}"]`).value.trim();
      item.question = document.querySelector(`[data-edit-slide-question="${slideIndex}"]`).value.trim();
      const imageFile = document.querySelector(`[data-edit-slide-image="${slideIndex}"]`).files[0];
      if (imageFile) {
        item.image = await fileToDataUrl(imageFile);
        item.imageAlt = `${module.title} - ${item.label}`;
      }
    }
    module.lastEditScope = document.getElementById("editScope").value;
    if (module.lastEditScope === "future") {
      const masterIndex = data.masterModules.findIndex(item => item.id === module.id);
      if (masterIndex >= 0) data.masterModules[masterIndex] = structuredClone(module);
      else data.masterModules.push(structuredClone(module));
      delete data.sessionOverrides[module.id];
    } else {
      data.sessionOverrides[module.id] = structuredClone(module);
    }
    saveData(module.lastEditScope === "session" ? "Aanpassing voor deze sessie opgeslagen" : "Definitieve workshopinhoud bijgewerkt");
    closeModal(); renderAdmin(); renderTrainer(); renderScreen();
  });
}

function linesFrom(id) {
  return document.getElementById(id).value.split("\n").map(item => item.trim()).filter(Boolean);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function editPoll() {
  openModal(`<p class="eyebrow">Live poll</p><h2>Poll bewerken</h2>
    <div class="field"><label>Vraag</label><input id="pollQuestion" value="${escapeHtml(data.poll.question)}"></div>
    <div class="field"><label>Antwoorden, één per regel</label><textarea id="pollOptions" style="min-height:170px">${data.poll.options.join("\n")}</textarea></div>
    <button class="button dark" id="savePoll">Poll opslaan</button>`);
  document.getElementById("savePoll").addEventListener("click", () => {
    data.poll.question = document.getElementById("pollQuestion").value.trim();
    data.poll.options = document.getElementById("pollOptions").value.split("\n").map(s=>s.trim()).filter(Boolean);
    data.poll.votes = data.poll.options.map((_,i)=>data.poll.votes[i] || 0);
    const pollModule = data.modules.find(module => module.id === "poll");
    if (pollModule?.presentation?.[0]) pollModule.presentation[0].title = data.poll.question;
    saveData("Poll opgeslagen"); closeModal(); renderAdmin(); renderScreen();
  });
}

function createCase() {
  openModal(`<p class="eyebrow">Nieuwe inhoud</p><h2>Casus toevoegen</h2>
    <div class="field"><label>Titel</label><input id="caseTitle" placeholder="Bijvoorbeeld: De verdachte vacature"></div>
    <div class="field"><label>Situatie</label><textarea id="caseScript" placeholder="Beschrijf een korte, realistische situatie."></textarea></div>
    <button class="button dark" id="saveCase">Casus toevoegen</button>`);
  document.getElementById("saveCase").addEventListener("click", () => {
    const title = document.getElementById("caseTitle").value.trim(), script = document.getElementById("caseScript").value.trim();
    if (!title || !script) return;
    const newModule = hydrateModule({ id:`case-${Date.now()}`,title,short:title,duration:6,enabled:true,type:"case",goal:"Bespreek signalen en veilige vervolgstappen.",script,background:["Laat deelnemers eerst zelf signalen noemen."],questions:["Wat valt je op?","Wat zou je controleren?"],terms:[] });
    data.modules.splice(data.modules.length-2,0,newModule);
    data.masterModules.splice(data.masterModules.length-2,0,structuredClone(newModule));
    saveData("Casus toegevoegd"); closeModal(); renderAdmin(); renderTrainer();
  });
}

function stepModule(direction, view) {
  const count = activeModules().length;
  data.currentModule = Math.max(0, Math.min(count - 1, data.currentModule + direction));
  data.currentSlide = 0;
  data.screenMode = "slides";
  saveData(); renderTrainer(); renderScreen(); if (view) showView(view);
}

function stepSlide(direction) {
  if (isTalent()) {
    talentAction("activity",{index:(talentState?.activityIndex||0)+direction,maxIndex:talentSteps().length-1});
    return;
  }
  if (isWegwijs()) {
    wegwijsAction("activity",{index:(wegwijsState?.activityIndex||0)+direction,maxIndex:wegwijsSteps().length-1});
    return;
  }
  if (isMicOnWeek1()) {
    micWeek1Action("activity",{index:(micWeek1State?.activityIndex||0)+direction});
    return;
  }
  if (isStoryWorkshop()) {
    stepStorySlide(direction);
    return;
  }
  if (data.screenMode !== "slides") {
    resumePresentation();
    return;
  }
  const deck = getPresentationDeck();
  const current = deck.findIndex(item => item.moduleIndex === data.currentModule && item.slideIndex === data.currentSlide);
  const target = Math.max(0, Math.min(deck.length - 1, current + direction));
  data.currentModule = deck[target].moduleIndex;
  data.currentSlide = deck[target].slideIndex;
  saveData();
  renderTrainer();
  renderScreen();
}

function getPresentationDeck() {
  return activeModules().flatMap((module, moduleIndex) => {
    if (module.type === "bingo") return [];
    return getModuleSlides(module).map((_, slideIndex) => ({ moduleIndex, slideIndex }));
  });
}

function showSpecialScreen(mode) {
  data.screenMode = mode;
  saveData();
  renderScreen();
  sendCurrentSlide();
}

function resumePresentation() {
  data.screenMode = "slides";
  saveData();
  renderTrainer();
  renderScreen();
  sendCurrentSlide();
}

function jumpToType(type) {
  const index = activeModules().findIndex(module => module.type === type);
  if (index >= 0) { data.currentModule = index; data.currentSlide = 0; data.screenMode = "slides"; saveData(); renderTrainer(); renderScreen(); showView("screen"); }
}

function openSessionSettings() {
  if (isStoryWorkshop()) {
    openModal(`<p class="eyebrow">Traject instellen</p><h2>${escapeHtml(data.story.name)}</h2>
      <div class="form-grid">
        <div class="field"><label>Organisatie</label><input id="storySessionOrg" value="${escapeHtml(data.story.session.organization)}"></div>
        <div class="field"><label>Doelgroep</label><input id="storySessionAudience" value="${escapeHtml(data.story.session.audience)}"></div>
        <div class="field"><label>Traject</label><input value="${escapeHtml(data.story.name)}" disabled></div>
        <div class="field"><label>Aantal weken</label><input id="storySessionWeeks" type="number" min="1" max="12" value="${data.story.session.weeks}"></div>
        <div class="field"><label>Duur per bijeenkomst</label><select id="storySessionDuration">${[60,75,90].map(value=>`<option ${value===data.story.session.duration?"selected":""}>${value}</option>`).join("")}</select></div>
      </div><button class="button dark" id="saveStorySession">Traject opslaan</button>`);
    document.getElementById("saveStorySession").addEventListener("click",()=>{
      data.story.session={organization:valueOf("storySessionOrg"),audience:valueOf("storySessionAudience"),weeks:Number(valueOf("storySessionWeeks")),duration:Number(document.getElementById("storySessionDuration").value)};
      data.story.weeks.forEach(week=>week.duration=data.story.session.duration);
      saveData("Trajectinstellingen opgeslagen");closeModal();renderStoryTrainer();renderStoryParticipant();renderStoryAdmin();
    });
    return;
  }
  openModal(`<p class="eyebrow">Voorbereiding</p><h2>Sessie instellen</h2>
    <div class="form-grid">
      <div class="field"><label>Organisatie</label><input id="sessionOrg" value="${escapeHtml(data.session.organization)}"></div>
      <div class="field"><label>Doelgroep</label><select id="sessionAudience">${["Jongeren (13–17)","Jongvolwassenen (18–30)","Volwassenen","Senioren","Gemengde groep"].map(item=>`<option ${item===data.session.audience?"selected":""}>${item}</option>`).join("")}</select></div>
      <div class="field"><label>Datum</label><input id="sessionDate" type="date" value="${data.session.date}"></div>
    </div><button class="button dark" id="saveSession">Sessie opslaan</button>`);
  document.getElementById("saveSession").addEventListener("click", () => {
    data.session.organization=document.getElementById("sessionOrg").value.trim();
    data.session.audience=document.getElementById("sessionAudience").value;
    data.session.date=document.getElementById("sessionDate").value;
    saveData("Sessie-instellingen opgeslagen"); updateSessionMeta(); closeModal();
  });
}

function openParticipants() {
  openModal(`<p class="eyebrow">Live sessie</p><h2>${data.participants.length} deelnemers</h2>
    <table class="admin-table"><thead><tr><th>Naam</th><th>Leeftijd</th><th>Status</th></tr></thead><tbody>${data.participants.map(p=>`<tr><td><strong>${p.name}</strong></td><td>${p.age||"Niet ingevuld"}</td><td>● Verbonden</td></tr>`).join("")}</tbody></table>`);
}

function openNoteModal() {
  openModal(`<p class="eyebrow">Trainer</p><h2>Notitie toevoegen</h2>
    <div class="field"><label>Onderdeel</label><select id="noteModule">${activeModules().map(m=>`<option>${m.title}</option>`).join("")}<option>Algemeen</option></select></div>
    <div class="field"><label>Notitie</label><textarea id="noteText" placeholder="Wat wil je onthouden voor een volgende sessie?"></textarea></div>
    <button class="button dark" id="saveNote">Notitie opslaan</button>`);
  document.getElementById("saveNote").addEventListener("click", () => {
    const text=document.getElementById("noteText").value.trim(); if(!text)return;
    data.notes.unshift({date:new Date().toLocaleDateString("nl-NL"),module:document.getElementById("noteModule").value,text});
    saveData("Notitie opgeslagen"); closeModal(); renderAdmin();
  });
}

function publishVersion() {
  if (isTalent()) {
    const concept=data.talent.versions.find(version=>version.status==="Concept");
    if(!concept)return toast("Er is geen conceptversie");
    data.talent.versions.forEach(version=>{if(version.status==="Actief")version.status="Vorige versie";});
    concept.status="Actief";saveData(`Talent-versie ${concept.version} geactiveerd`);renderTalentAdmin();return;
  }
  if (isWegwijs()) {
    const concept=data.wegwijs.versions.find(version=>version.status==="Concept");
    if(!concept)return toast("Er is geen conceptversie");
    data.wegwijs.versions.forEach(version=>{if(version.status==="Definitief")version.status="Vorige versie";});
    concept.status="Definitief";saveData(`Wegwijs-versie ${concept.version} gepubliceerd`);renderWegwijsAdmin();return;
  }
  if (isStoryWorkshop()) {
    const concept=data.story.versions.find(version=>version.status==="Concept");
    if(!concept)return toast("Er is geen conceptversie");
    data.story.versions.forEach(version=>{if(version.status==="Definitief")version.status="Vorige versie";});
    concept.status="Definitief";concept.date="Vandaag";saveData(`Versie ${concept.version} gepubliceerd`);renderStoryAdmin();return;
  }
  const concept = data.versions.find(v=>v.status==="Concept");
  if (!concept) return toast("Er is geen conceptversie");
  concept.status="Definitief"; concept.date="Vandaag";
  data.versions.forEach(v=>{ if(v!==concept && v.status==="Definitief") v.status="Vorige versie"; });
  saveData(`Versie ${concept.version} gepubliceerd`); renderAdmin();
}

function exportData(type) {
  const payloads = {
    participants: data.participants,
    results: { poll:data.poll, participants:data.participants.length },
    notes: data.notes,
    report: { session:data.session, participants:data.participants, poll:data.poll, notes:data.notes },
    json: data
  };
  const content = type === "json" ? JSON.stringify(payloads[type],null,2) : toCsvOrText(type,payloads[type]);
  const blob = new Blob([content], { type: type === "json" ? "application/json" : "text/plain;charset=utf-8" });
  const link = document.createElement("a"); link.href=URL.createObjectURL(blob); link.download=`sterk-online-${type}.${type==="json"?"json":"txt"}`; link.click(); URL.revokeObjectURL(link.href);
  toast("Export gedownload");
}
function toCsvOrText(type,payload) {
  if(type==="participants") return ["Naam\tLeeftijd\tStatus",...payload.map(p=>`${p.name}\t${p.age||""}\tVerbonden`)].join("\n");
  if(type==="notes") return payload.map(n=>`${n.date} | ${n.module}\n${n.text}`).join("\n\n");
  return JSON.stringify(payload,null,2);
}

function updateSessionMeta() {
  document.getElementById("sessionMeta").textContent = `${formatDate(data.session.date)} · ${data.session.organization} · ${data.session.audience}`;
}
function formatDate(value) { return new Date(`${value}T12:00:00`).toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"}); }
function initials(name) { return name.split(/\s+/).map(n=>n[0]).join("").slice(0,2).toUpperCase(); }
function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function seededNumber(seed) {
  let hash=2166136261;
  for(const character of String(seed)) {
    hash^=character.charCodeAt(0);
    hash=Math.imul(hash,16777619);
  }
  return hash>>>0;
}

function seededShuffle(items,seed) {
  const copy=[...items];
  let value=seededNumber(seed)||1;
  for(let index=copy.length-1;index>0;index-=1) {
    value=(Math.imul(value,1664525)+1013904223)>>>0;
    const randomIndex=value%(index+1);
    [copy[index],copy[randomIndex]]=[copy[randomIndex],copy[index]];
  }
  return copy;
}
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char])); }
function openModal(html) { document.getElementById("modalContent").innerHTML=html; document.getElementById("modal").classList.add("open"); document.getElementById("modal").setAttribute("aria-hidden","false"); }
function closeModal() { document.getElementById("modal").classList.remove("open"); document.getElementById("modal").setAttribute("aria-hidden","true"); }
function toast(message) { const el=document.getElementById("toast"); el.textContent=message; el.classList.add("show"); clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>el.classList.remove("show"),2200); }

const WEGWIJS_ROOM="samen-wegwijs-traject";
let wegwijsSocket;
let wegwijsConnectedRoom="";
let wegwijsState;
let wegwijsReconnect;
let wegwijsTimerLoop;

function createLocalWegwijsState() {
  const empty={status:"waiting",weekIndex:0,activityIndex:0,revealResults:false,responseOpen:false,responseGeneration:0,activeResponseKey:"",statementIndex:0,timer:{running:false,duration:5,endsAt:0},connected:{},responses:{},participants:{},participantNotes:{},stepNotes:{},observations:[],updatedAt:Date.now()};
  try {
    const stored=JSON.parse(localStorage.getItem(`${STORAGE_KEY}-wegwijs`));
    return stored?{...empty,...stored,responses:stored.responses||{},stepNotes:stored.stepNotes||{}}:empty;
  } catch { return empty; }
}

function wegwijsRole() {
  return launchMode==="screen"?"screen":launchMode==="participant"?"participant":"trainer";
}

function connectWegwijs() {
  clearTimeout(wegwijsReconnect);
  wegwijsState ||= createLocalWegwijsState();
  if(!("WebSocket" in window)||!location.host)return;
  const targetRoom=liveRoom(WEGWIJS_ROOM,"wegwijs");
  if(wegwijsSocket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(wegwijsSocket.readyState)&&wegwijsConnectedRoom===targetRoom)return;
  if(wegwijsSocket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(wegwijsSocket.readyState))wegwijsSocket.close();
  const networkUrl=new URL(location.href);
  const protocol=networkUrl.protocol==="https:"?"wss":"ws";
  wegwijsSocket=new WebSocket(`${protocol}://${networkUrl.host}/ws`);
  wegwijsSocket.addEventListener("open",()=>{
    wegwijsConnectedRoom=targetRoom;
    wegwijsSocket.send(JSON.stringify({type:"join",room:targetRoom,clientId:participantClientId,role:wegwijsRole(),name:getWegwijsParticipantName()}));
  });
  wegwijsSocket.addEventListener("message",event=>{
    const message=JSON.parse(event.data);
    if(message.type==="submission-rejected"){toast("Deze antwoordronde is gesloten");return;}
    if(message.type!=="snapshot")return;
    wegwijsState=message.state;
    if(Number.isInteger(wegwijsState.weekIndex)) {
      data.wegwijs.currentWeek=wegwijsState.weekIndex;
      saveData();
    }
    renderWegwijsLive();
  });
  wegwijsSocket.addEventListener("close",()=>{wegwijsSocket=null;wegwijsConnectedRoom="";wegwijsReconnect=setTimeout(connectWegwijs,1200);});
}

function wegwijsAction(action,payload={}) {
  if(wegwijsSocket?.readyState===WebSocket.OPEN){const message=compatibleLiveMessage(action,payload,wegwijsState);wegwijsSocket.send(JSON.stringify({type:"action",...message}));}
  else if(!location.host) {
    applyLocalWegwijsAction(action,payload);
    renderWegwijsLive();
  } else {
    toast("De live sessie maakt opnieuw verbinding");
    connectWegwijs();
  }
}

function applyLocalWegwijsAction(action,payload) {
  wegwijsState ||= createLocalWegwijsState();
  const state=wegwijsState;
  if(action==="control")Object.assign(state,payload);
  if(action==="open-response"){state.responseOpen=true;state.revealResults=false;state.responseGeneration=(state.responseGeneration||0)+1;state.activeResponseKey=payload.activity||"";}
  if(action==="close-response"||action==="timer-expired"){state.responseOpen=false;state.revealResults=payload.revealResults!==false;state.timer={running:false,duration:state.timer?.duration||5,endsAt:0};}
  if(action==="activity") {
    state.activityIndex=Math.max(0,Math.min(Number(payload.maxIndex)||20,Number(payload.index)||0));
    state.revealResults=false;
    state.statementIndex=0;
    state.responseOpen=false;
    state.timer={running:false,duration:5,endsAt:0};
  }
  if(action==="timer") {
    const duration=Math.max(1,Number(payload.duration)||5);
    state.timer={running:Boolean(payload.running),duration,endsAt:payload.running?Date.now()+duration*1000:0};
    state.responseOpen=Boolean(payload.running);
    state.revealResults=false;
  }
  if(action==="submit") {
    if(!state.responseOpen||(state.activeResponseKey&&state.activeResponseKey!==payload.activity))return;
    state.responses[payload.activity] ||= [];
    const list=state.responses[payload.activity];
    const value={...payload.value,generation:state.responseGeneration||0,name:getWegwijsParticipantName(),clientId:participantClientId,sessionId:participantClientId,updatedAt:Date.now()};
    const questionType=["quiz","vote","impact"].some(type=>payload.activity.startsWith(type));
    const questionIndex=value.questionIndex??0;
    const index=list.findIndex(item=>item.clientId===participantClientId&&item.generation===value.generation&&(!questionType||item.questionIndex===questionIndex));
    if(index>=0)list[index]=value;else list.push(value);
  }
  if(action==="participant-register") {
    state.participants[participantClientId]={name:payload.name,registeredAt:Date.now(),online:true};
    state.connected[participantClientId]={role:"participant",name:payload.name,lastSeen:Date.now()};
  }
  if(action==="step-note")state.stepNotes[payload.stepId]={...payload};
  state.updatedAt=Date.now();
  localStorage.setItem(`${STORAGE_KEY}-wegwijs`,JSON.stringify(state));
}

function renderWegwijsLive() {
  if(!isWegwijs())return;
  if(document.getElementById("trainerView")?.classList.contains("active"))renderWegwijsTrainer();
  if(document.getElementById("screenView")?.classList.contains("active")||launchMode==="screen")renderWegwijsScreen();
  const focused=document.activeElement;
  const typing=focused&&["INPUT","TEXTAREA","SELECT"].includes(focused.tagName)&&document.getElementById("participantApp")?.contains(focused);
  if(!typing&&(document.getElementById("participantView")?.classList.contains("active")||launchMode==="participant"))renderWegwijsParticipant(document.getElementById("participantApp"));
  startWegwijsTimerLoop();
}

function wegwijsCurrentStep() {
  return wegwijsSteps()[Math.min(wegwijsState?.activityIndex||0,wegwijsSteps().length-1)];
}

function wegwijsResponseKey(step=wegwijsCurrentStep()) {
  return step?.type?`${step.type}-${wegwijsWeek().id}`:null;
}

function wegwijsResponses(step=wegwijsCurrentStep()) {
  return wegwijsState?.responses?.[wegwijsResponseKey(step)]||[];
}

function wegwijsQuestions(step=wegwijsCurrentStep()) {
  if(step?.type==="quiz")return wegwijsWeek().quiz||[];
  if(step?.type==="vote")return wegwijsWeek().vote||[];
  if(step?.type==="impact")return wegwijsImpactStatements.map(statement=>[statement,wegwijsScale]);
  return [];
}

function wegwijsParticipantCount() {
  return Object.values(wegwijsState?.connected||{}).filter(item=>item.role==="participant").length;
}

function renderWegwijsTrainer() {
  wegwijsState ||= createLocalWegwijsState();
  const state=wegwijsState;
  const steps=wegwijsSteps();
  const step=wegwijsCurrentStep();
  const next=steps[state.activityIndex+1];
  const questions=wegwijsQuestions(step);
  const currentQuestion=questions[state.statementIndex]||null;
  document.getElementById("trainerView").classList.add("mic-director-mode","wegwijs-director-mode");
  document.getElementById("stageCounter").textContent=`Week ${(data.wegwijs.currentWeek||0)+1} · onderdeel ${state.activityIndex+1} van ${steps.length}`;
  document.getElementById("trainerModule").innerHTML=`
    <div class="mic-director wegwijs-director">
      <header class="mic-session-head"><div><p class="eyebrow">Samen Wegwijs in Nederland</p><h2>${escapeHtml(wegwijsWeek().title)}</h2></div><div><span class="live-dot ${state.status}"></span>${wegwijsParticipantCount()} deelnemers</div></header>
      <div class="mic-director-grid">
        <section class="mic-director-panel mic-preview-panel"><div class="panel-label"><span>Presentatiescherm</span><button class="mini-action" id="wegwijsFullscreen">Fullscreen ↗</button></div><div class="mic-preview-frame">${renderWegwijsSlide(state,step,true)}</div></section>
        <section class="mic-director-panel mic-private-panel"><div class="panel-label">Alleen voor trainer</div>
          <p class="eyebrow">${step.duration} minuten · ${escapeHtml(step.goal)}</p><h3>${escapeHtml(step.title)}</h3>
          ${currentQuestion?`<div class="wegwijs-answer-key"><strong>Actieve vraag</strong><p>${escapeHtml(currentQuestion[0])}</p>${step.type==="quiz"?`<small>Juiste antwoord: ${escapeHtml(currentQuestion[1][currentQuestion[2]])}<br>${escapeHtml(currentQuestion[3]||"")}</small>`:""}</div>`:""}
          <div class="trainer-script"><strong>Wat vertel ik?</strong><p>${escapeHtml(step.trainerText)}</p></div>
          <div class="trainer-questions"><strong>Vragen aan de groep</strong><ul>${step.questions.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
          <div class="trainer-attention"><strong>Let op</strong><p>${escapeHtml(step.attention)}</p></div>
          <label class="wegwijs-note-label">Notitie bij dit onderdeel<textarea id="wegwijsStepNote" placeholder="Observaties, hulpvragen of vervolgacties...">${escapeHtml(state.stepNotes?.[step.id]?.text||"")}</textarea></label>
          <button class="button light" id="saveWegwijsNote">Notitie opslaan</button>
        </section>
        <aside class="mic-director-panel mic-action-panel"><div class="panel-label">Live bediening</div>
          <div class="mic-active-card"><div><small>NU</small><strong>${escapeHtml(step.short)}</strong></div><span>${state.activityIndex+1}/${steps.length}</span></div>
          <p class="next-activity">Hierna: <strong>${escapeHtml(next?.title||"Einde")}</strong></p>
          ${questions.length?`<div class="wegwijs-question-picker">${questions.map((item,index)=>`<button class="${index===state.statementIndex?"active":""}" data-wegwijs-question="${index}">${index+1}</button>`).join("")}</div>`:""}
          <div class="mic-timer-control"><strong id="wegwijsTimerValue">${wegwijsTimerRemaining(state)||5}</strong><span>seconden</span><select id="wegwijsTimerDuration"><option value="5">5 sec</option><option value="10">10 sec</option><option value="20">20 sec</option><option value="30">30 sec</option><option value="0">Handmatig</option></select><button id="startWegwijsTimer">Start ronde</button></div>
          <button class="director-button primary" id="startWegwijsActivity">${step.interactive?(state.responseOpen?"Opdracht actief":"Start opdracht"):"Start onderdeel"}</button>
          ${step.results?`<button class="director-button" id="showWegwijsResults">${state.revealResults?"Verberg resultaten":"Toon resultaten"} · ${wegwijsResponses(step).length}</button>`:""}
          <div class="director-split"><button id="prevWegwijs">← Vorige</button><button id="nextWegwijs">Volgende →</button></div>
          <button class="director-button quiet" id="pauseWegwijs">Pauze</button>
          <button class="director-button quiet" id="wegwijsIndividual">Individuele antwoorden</button>
          <button class="director-button quiet" id="wegwijsTestMode">Test live verbinding</button>
          <button class="director-button quiet" id="exportWegwijs">Export na afloop</button>
        </aside>
      </div>
      <nav class="mic-activity-rail">${steps.map((item,index)=>`<button class="${index===state.activityIndex?"active":""}" data-wegwijs-step="${index}"><b>${String(index+1).padStart(2,"0")}</b><span>${escapeHtml(item.short)}</span></button>`).join("")}</nav>
    </div>`;
  document.getElementById("wegwijsFullscreen")?.addEventListener("click",openPresentationWindow);
  document.getElementById("startWegwijsActivity")?.addEventListener("click",()=>{wegwijsAction("control",{status:"running"});if(step.interactive)wegwijsAction("open-response",{activity:wegwijsResponseKey(step)});});
  document.getElementById("showWegwijsResults")?.addEventListener("click",()=>wegwijsAction(state.revealResults?"control":"close-response",{revealResults:!state.revealResults}));
  document.getElementById("startWegwijsTimer")?.addEventListener("click",()=>{const duration=Number(document.getElementById("wegwijsTimerDuration")?.value||5);wegwijsAction("open-response",{activity:wegwijsResponseKey(step)});if(duration>0)wegwijsAction("timer",{running:true,duration});});
  document.getElementById("prevWegwijs")?.addEventListener("click",()=>wegwijsAction("activity",{index:state.activityIndex-1,maxIndex:steps.length-1}));
  document.getElementById("nextWegwijs")?.addEventListener("click",()=>wegwijsAction("activity",{index:state.activityIndex+1,maxIndex:steps.length-1}));
  document.getElementById("pauseWegwijs")?.addEventListener("click",()=>wegwijsAction("control",{status:"paused"}));
  document.getElementById("wegwijsIndividual")?.addEventListener("click",openWegwijsIndividualAnswers);
  document.getElementById("wegwijsTestMode")?.addEventListener("click",openLiveTestMode);
  document.getElementById("exportWegwijs")?.addEventListener("click",openWegwijsExport);
  document.querySelectorAll("[data-wegwijs-step]").forEach(button=>button.addEventListener("click",()=>wegwijsAction("activity",{index:Number(button.dataset.wegwijsStep),maxIndex:steps.length-1})));
  document.querySelectorAll("[data-wegwijs-question]").forEach(button=>button.addEventListener("click",()=>wegwijsAction("control",{statementIndex:Number(button.dataset.wegwijsQuestion),revealResults:false,responseOpen:false})));
  document.getElementById("saveWegwijsNote")?.addEventListener("click",()=>wegwijsAction("step-note",{stepId:step.id,text:valueOf("wegwijsStepNote"),workshop:"Samen Wegwijs in Nederland",week:(data.wegwijs.currentWeek||0)+1,group:"Workshopgroep",date:new Date().toISOString()}));
}

function renderWegwijsSlide(state,step,compact=false) {
  const question=wegwijsQuestions(step)[state.statementIndex];
  const activeQuestion=question?.[0]||step.question;
  const responseCount=wegwijsResponses(step).length;
  const results=state.revealResults&&step.results?renderWegwijsResultsVisual(state,step):renderWegwijsInteractionPrompt(state,step,responseCount);
  return `<div class="wegwijs-slide ${compact?"compact":""} visual-${step.visual}">
    <div class="wegwijs-slide-brand">SAMEN WEGWIJS <span>IN NEDERLAND</span></div>
    <div class="wegwijs-scene">${renderWegwijsScene(step.visual)}</div>
    <div class="wegwijs-slide-copy"><p>Week ${(data.wegwijs.currentWeek||0)+1} · ${escapeHtml(step.short)}</p><h1>${escapeHtml(activeQuestion)}</h1>${!step.interactive?`<span>${escapeHtml(step.title)}</span>`:""}</div>
    ${results?`<div class="wegwijs-slide-result">${results}</div>`:""}
  </div>`;
}

function renderWegwijsScene(visual) {
  const labels={
    cover:["NL","SAMEN"],route:["1","2","3"],impact:["↗","5"],wordcloud:["?","…"],institutions:["G","D","B"],quiz:["A","B","C"],home:["⌂","✓"],team:["↔","+"],
    mail:["POST","!"],vote:["✓","?"],money:["€","1000"],action:["1","→"],care:["+","112"],phone:["☎","?"],postits:["HULP","BUURT"],finish:["✓","NL"]
  }[visual]||["NL","✓"];
  return `<i>${labels[0]}</i><i>${labels[1]}</i><b></b>`;
}

function renderWegwijsInteractionPrompt(state,step,count) {
  if(!step.interactive)return "";
  if(step.type==="team")return `<div class="wegwijs-room-task"><strong>Werk samen in teams</strong><span>${escapeHtml(step.instructions)}</span></div>`;
  return `<div class="wegwijs-qr-prompt">${fakeQr()}<div><strong>Doe mee op je telefoon</strong><span>${count} antwoord${count===1?"":"en"} ontvangen</span></div>${["quiz","vote"].includes(step.type)?`<b class="mic-countdown">${wegwijsTimerRemaining(state)||5}</b>`:""}</div>`;
}

function renderWegwijsResultsVisual(state,step) {
  const items=wegwijsResponses(step);
  if(step.type==="wordcloud")return renderMicWordcloud(items);
  if(["quiz","vote"].includes(step.type)) {
    const current=items.filter(item=>item.questionIndex===state.statementIndex);
    const question=wegwijsQuestions(step)[state.statementIndex]||[];
    return renderWegwijsChoiceChart(current,question[1]||[],step.type==="quiz"?question[2]:null,question[3]||"");
  }
  if(step.type==="postits")return `<div class="wegwijs-postits">${items.slice(-12).map((item,index)=>`<article style="--r:${(index%5-2)*2}deg"><small>${escapeHtml(item.category||"Hulpvraag")}</small>${escapeHtml(item.text||item.value||"")}</article>`).join("")||"<p>De eerste antwoorden verschijnen hier.</p>"}</div>`;
  if(step.type==="impact")return renderWegwijsImpact(items);
  return "";
}

function renderWegwijsChoiceChart(items,options,correctIndex=null,explanation="") {
  const total=items.length;
  return `<div class="mic-opinion-chart wegwijs-choice-chart">${options.map((option,index)=>{
    const count=items.filter(item=>item.choice===index).length;
    const percent=total?Math.round(count/total*100):0;
    return `<article class="${correctIndex===index?"correct":""}"><div><strong>${String.fromCharCode(65+index)}. ${escapeHtml(option)}</strong><span>${count} stem${count===1?"":"men"} · ${percent}%</span></div><i style="width:${percent}%"></i></article>`;
  }).join("")}${Number.isInteger(correctIndex)?`<div class="quiz-summary"><strong>Juiste antwoord: ${String.fromCharCode(65+correctIndex)}. ${escapeHtml(options[correctIndex])}</strong><span>${items.filter(item=>item.choice===correctIndex).length} goed · ${items.filter(item=>item.choice!==correctIndex).length} fout</span>${explanation?`<p>${escapeHtml(explanation)}</p>`:""}</div>`:""}</div>`;
}

function renderWegwijsImpact(items) {
  const answers=items.filter(item=>Array.isArray(item.answers));
  return `<div class="wegwijs-impact">${wegwijsImpactStatements.map((statement,index)=>{
    const values=answers.map(item=>Number(item.answers[index])).filter(Number.isFinite);
    const score=values.length?(5-(values.reduce((sum,value)=>sum+value,0)/values.length)).toFixed(1):"–";
    return `<article><span>${escapeHtml(statement)}</span><strong>${score}</strong></article>`;
  }).join("")}</div>`;
}

function renderWegwijsScreen() {
  wegwijsState ||= createLocalWegwijsState();
  const state=wegwijsState;
  const step=wegwijsCurrentStep();
  document.getElementById("screenParticipants").textContent=wegwijsParticipantCount();
  document.getElementById("screenProgress").textContent=`${state.activityIndex+1} / ${wegwijsSteps().length}`;
  document.getElementById("presentationProgressBar").style.width=`${((state.activityIndex+1)/wegwijsSteps().length)*100}%`;
  const screen=document.getElementById("publicScreen");
  screen.dataset.theme="wegwijs";
  if(state.status==="paused") {
    screen.innerHTML=`<div class="wegwijs-slide visual-cover"><div class="wegwijs-slide-brand">SAMEN WEGWIJS <span>IN NEDERLAND</span></div><div class="wegwijs-scene">${renderWegwijsScene("cover")}</div><div class="wegwijs-slide-copy"><p>Even pauze</p><h1>We gaan zo verder.</h1></div></div>`;
    return;
  }
  screen.innerHTML=renderWegwijsSlide(state,step,false);
  startWegwijsTimerLoop();
}

function renderWegwijsParticipant(app) {
  if(!app)return;
  wegwijsState ||= createLocalWegwijsState();
  const state=wegwijsState;
  const name=getWegwijsParticipantName();
  if(!name) {
    app.innerHTML=`<div class="mobile-content wegwijs-phone"><div class="mobile-logo">SAMEN WEGWIJS</div><p class="eyebrow">Praktisch ontdekken, regelen en meedoen</p><h2>Welkom.</h2><p>Vul je naam in. Op het grote scherm blijven alle antwoorden anoniem.</p><form id="wegwijsJoin"><div class="field"><label>Naam</label><input id="wegwijsName" required autocomplete="name"></div><button class="mobile-button">Deelnemen</button></form></div>`;
    document.getElementById("wegwijsJoin")?.addEventListener("submit",event=>{event.preventDefault();const value=valueOf("wegwijsName");if(!value)return;sessionStorage.setItem("slinnva-wegwijs-participant-name",value);wegwijsAction("participant-register",{name:value});renderWegwijsParticipant(app);});
    return;
  }
  if(state.status!=="running") {
    app.innerHTML=participantMessage("…",state.status==="paused"?"Even pauze":"Wacht op de trainer.",state.status==="paused"?"De workshop gaat zo verder.":"De volgende opdracht verschijnt hier automatisch.");
    return;
  }
  const step=wegwijsCurrentStep();
  if(step.interactive&&!state.responseOpen){app.innerHTML=participantMessage("…","Wacht op de trainer.",state.revealResults?"De resultaten worden besproken.":"De opdracht is nog niet geopend.");return;}
  const submitted=wegwijsResponses(step).some(item=>item.clientId===participantClientId&&item.generation===(state.responseGeneration||0)&&(!["quiz","vote"].includes(step.type)||item.questionIndex===state.statementIndex));
  if(step.interactive&&submitted) {
    app.innerHTML=participantMessage("✓","Bedankt voor je antwoord.","Je antwoord is ontvangen. Wacht op de trainer.");
    return;
  }
  app.innerHTML=`<div class="mobile-content wegwijs-phone"><div class="mobile-logo">SAMEN WEGWIJS</div><p class="eyebrow">Week ${(data.wegwijs.currentWeek||0)+1} · ${escapeHtml(step.short)}</p><h2>${escapeHtml(wegwijsQuestions(step)[state.statementIndex]?.[0]||step.question)}</h2>${renderWegwijsParticipantTask(state,step)}<small class="privacy-note">Je naam is alleen voor de trainer zichtbaar.</small></div>`;
  bindWegwijsParticipant(step);
}

function renderWegwijsParticipantTask(state,step) {
  const key=wegwijsResponseKey(step);
  if(!step.interactive)return `<div class="mic-instruction"><strong>Doe mee in de zaal</strong><p>${escapeHtml(step.instructions)}</p></div>`;
  if(step.type==="wordcloud")return `<div class="field"><label>Mijn antwoord</label><input id="wegwijsText" maxlength="80"></div><button class="mobile-button" data-wegwijs-submit="wordcloud">Versturen</button>`;
  if(["quiz","vote"].includes(step.type)) {
    const options=wegwijsQuestions(step)[state.statementIndex]?.[1]||[];
    return `<div class="wegwijs-phone-options">${options.map((option,index)=>`<button data-wegwijs-choice="${index}">${escapeHtml(option)}</button>`).join("")}</div>`;
  }
  if(step.type==="postits")return `<div class="field"><label>Onderwerp</label><select id="wegwijsCategory">${wegwijsPostitCategories().map(item=>`<option>${escapeHtml(item)}</option>`).join("")}</select></div><div class="field"><label>Jouw antwoord</label><textarea id="wegwijsText" maxlength="160"></textarea></div><button class="mobile-button" data-wegwijs-submit="postits">Plaatsen</button>`;
  if(step.type==="impact")return `${wegwijsImpactStatements.map((statement,index)=>`<div class="field"><label>${escapeHtml(statement)}</label><select data-impact-answer="${index}">${wegwijsScale.map((item,value)=>`<option value="${value}">${item}</option>`).join("")}</select></div>`).join("")}<button class="mobile-button" data-wegwijs-submit="impact">Metingen opslaan</button>`;
  if(step.type==="reflection")return `<div class="field"><label>Wat begrijp je nu beter?</label><textarea id="wegwijsLearned"></textarea></div><div class="field"><label>Waar wil je nog hulp bij?</label><textarea id="wegwijsHelp"></textarea></div><button class="mobile-button" data-wegwijs-submit="reflection">Reflectie opslaan</button>`;
  if(step.type==="actionPlan") {
    const fields=(data.wegwijs.currentWeek||0)===3?["Dit begrijp ik nu beter","Dit wil ik nog regelen","Hier wil ik hulp bij vragen","Deze organisatie kan mij helpen","Mijn eerste stap na vandaag is"]:["Dit ga ik regelen","Hier kan ik hulp vragen","Mijn eerste stap"];
    return `${fields.map((label,index)=>`<div class="field"><label>${label}</label><textarea data-action-field="${index}"></textarea></div>`).join("")}<button class="mobile-button" data-wegwijs-submit="actionPlan">Actiekaart opslaan</button>`;
  }
  return `<div class="mic-instruction"><strong>Werk samen</strong><p>${escapeHtml(step.instructions)}</p></div>`;
}

function wegwijsPostitCategories() {
  if((data.wegwijs.currentWeek||0)===3)return["Geldvragen","Zorgvragen","Werkvragen","Woonvragen","Juridische vragen","Taal oefenen","Sociale activiteiten","Eenzaamheid"];
  return["Belangrijk","Twijfel","Hulpvraag","Mijn ervaring"];
}

function bindWegwijsParticipant(step) {
  document.querySelectorAll("[data-wegwijs-choice]").forEach(button=>button.addEventListener("click",()=>{
    submitWegwijs(step.type,{questionIndex:wegwijsState.statementIndex,choice:Number(button.dataset.wegwijsChoice)});
  }));
  document.querySelector("[data-wegwijs-submit='wordcloud']")?.addEventListener("click",()=>submitWegwijs("wordcloud",{value:valueOf("wegwijsText").toLowerCase()}));
  document.querySelector("[data-wegwijs-submit='postits']")?.addEventListener("click",()=>submitWegwijs("postits",{id:`wegwijs-${participantClientId}-${Date.now()}`,category:document.getElementById("wegwijsCategory").value,text:valueOf("wegwijsText")}));
  document.querySelector("[data-wegwijs-submit='impact']")?.addEventListener("click",()=>submitWegwijs("impact",{questionIndex:0,answers:[...document.querySelectorAll("[data-impact-answer]")].map(input=>Number(input.value))}));
  document.querySelector("[data-wegwijs-submit='reflection']")?.addEventListener("click",()=>submitWegwijs("reflection",{learned:valueOf("wegwijsLearned"),help:valueOf("wegwijsHelp")}));
  document.querySelector("[data-wegwijs-submit='actionPlan']")?.addEventListener("click",()=>submitWegwijs("actionPlan",{answers:[...document.querySelectorAll("[data-action-field]")].map(input=>input.value.trim())}));
}

function submitWegwijs(type,value) {
  if(!value||Object.values(value).every(item=>item===""||item==null))return;
  wegwijsAction("submit",{activity:`${type}-${wegwijsWeek().id}`,value:{...value,name:getWegwijsParticipantName()}});
  const app=document.getElementById("participantApp");
  if(app)app.innerHTML=participantMessage("✓","Bedankt voor je antwoord.","Je antwoord is ontvangen. Wacht op de trainer.");
}

function wegwijsTimerRemaining(state=wegwijsState) {
  if(!state?.timer?.running)return 0;
  return Math.max(0,Math.ceil((state.timer.endsAt-Date.now())/1000));
}

function startWegwijsTimerLoop() {
  clearInterval(wegwijsTimerLoop);
  if(!wegwijsState?.timer?.running)return;
  wegwijsTimerLoop=setInterval(()=>{
    const remaining=wegwijsTimerRemaining();
    document.querySelectorAll(".mic-countdown,#wegwijsTimerValue").forEach(item=>item.textContent=remaining);
    if(remaining<=0) {
      clearInterval(wegwijsTimerLoop);
      if(wegwijsRole()==="trainer")wegwijsAction("timer-expired",{});
    }
  },250);
}

function wegwijsResponseSummary(item) {
  if(item.value)return item.value;
  if(item.text)return item.text;
  if(Array.isArray(item.answers))return item.answers.join(" · ");
  if(Number.isInteger(item.choice))return `Keuze ${item.choice+1}`;
  return [item.learned,item.help].filter(Boolean).join(" · ")||"Ingevuld";
}

function openWegwijsIndividualAnswers() {
  const rows=allWegwijsResponses();
  openModal(`<p class="eyebrow">Alleen zichtbaar voor trainer</p><h2>Individuele antwoorden</h2>
    <div class="mic-individual-list">${rows.map(item=>`<article><strong>${escapeHtml(item.name||wegwijsState?.participants?.[item.clientId]?.name||"Deelnemer")}</strong><span>${escapeHtml(item.activity)}</span><p>${escapeHtml(wegwijsResponseSummary(item))}</p><small>Sessie ${escapeHtml((item.sessionId||item.clientId||"").slice(-8))}</small></article>`).join("")||"<p>Nog geen antwoorden.</p>"}</div>`);
}

function allWegwijsResponses() {
  return Object.entries(wegwijsState?.responses||{}).filter(([key])=>["omgeving","administratie","basiszaken","meedoen"].some(id=>key.endsWith(`-${id}`))).flatMap(([activity,items])=>items.map(item=>({activity,...item})));
}

function openWegwijsExport() {
  openModal(`<p class="eyebrow">Export na afloop</p><h2>Samen Wegwijs</h2><div class="export-grid">
    <button class="version-card" id="wegwijsPdf"><strong>PDF trainersverslag</strong><span>Notities, aantallen en antwoorden</span></button>
    <button class="version-card" id="wegwijsCsv"><strong>Excel resultaten</strong><span>CSV voor Excel</span></button>
    <button class="version-card" id="wegwijsActions"><strong>Actiepuntenoverzicht</strong><span>Persoonlijke actiekaarten</span></button>
    <button class="version-card" id="wegwijsImpact"><strong>Impactmeting</strong><span>Begin- en eindmeting vergelijken</span></button>
    <button class="version-card" id="wegwijsReflections"><strong>Reflecties & hulpvragen</strong><span>Veelgenoemde leerpunten en vragen</span></button></div>`);
  document.getElementById("wegwijsPdf")?.addEventListener("click",exportWegwijsPdf);
  document.getElementById("wegwijsCsv")?.addEventListener("click",exportWegwijsCsv);
  document.getElementById("wegwijsActions")?.addEventListener("click",exportWegwijsActions);
  document.getElementById("wegwijsImpact")?.addEventListener("click",exportWegwijsImpact);
  document.getElementById("wegwijsReflections")?.addEventListener("click",exportWegwijsReflections);
}

function wegwijsCsv(rows,name) {
  downloadMicFile(name,rows.map(row=>row.map(value=>`"${String(value??"").replace(/"/g,'""')}"`).join(";")).join("\n"),"text/csv;charset=utf-8");
}

function exportWegwijsCsv() {
  wegwijsCsv([["Week/activiteit","Naam","Sessie-ID","Antwoord"],...allWegwijsResponses().map(item=>[item.activity,item.name||"Deelnemer",item.sessionId||item.clientId,wegwijsResponseSummary(item)])],"samen-wegwijs-resultaten.csv");
}

function exportWegwijsActions() {
  const rows=allWegwijsResponses().filter(item=>item.activity.startsWith("actionPlan"));
  wegwijsCsv([["Week","Naam","Actieplan"],...rows.map(item=>[item.activity,item.name||"Deelnemer",(item.answers||[]).join(" | ")])],"samen-wegwijs-actiepunten.csv");
}

function impactAverages(key) {
  const items=wegwijsState?.responses?.[key]||[];
  return wegwijsImpactStatements.map((_,index)=>{
    const values=items.filter(item=>Array.isArray(item.answers)).map(item=>Number(item.answers[index])).filter(Number.isFinite);
    return values.length?5-(values.reduce((sum,value)=>sum+value,0)/values.length):null;
  });
}

function exportWegwijsImpact() {
  const begin=impactAverages("impact-omgeving");
  const end=impactAverages("impact-meedoen");
  wegwijsCsv([["Stelling","Beginmeting","Eindmeting","Verschil"],...wegwijsImpactStatements.map((statement,index)=>[statement,begin[index]?.toFixed(2)||"",end[index]?.toFixed(2)||"",begin[index]!=null&&end[index]!=null?(end[index]-begin[index]).toFixed(2):""])],"samen-wegwijs-impactmeting.csv");
}

function exportWegwijsReflections() {
  const rows=allWegwijsResponses().filter(item=>item.activity.startsWith("reflection")||item.activity.startsWith("wordcloud")||item.activity.startsWith("postits"));
  wegwijsCsv([["Soort","Week","Deelnemer","Leeropbrengst of hulpvraag"],...rows.map(item=>[item.activity.split("-")[0],item.activity,item.name||"Deelnemer",wegwijsResponseSummary(item)])],"samen-wegwijs-reflecties-en-hulpvragen.csv");
}

function exportWegwijsPdf() {
  const report=window.open("","samen-wegwijs-rapport");
  if(!report)return toast("Sta pop-ups toe voor de PDF-export");
  report.document.write(`<!doctype html><html lang="nl"><meta charset="utf-8"><title>Samen Wegwijs trainersverslag</title><style>body{font-family:Arial;margin:45px;color:#1a1a1a}h1,h2{font-family:Georgia;color:#755c48}table{width:100%;border-collapse:collapse}td,th{padding:9px;border-bottom:1px solid #ddd;text-align:left}.note{padding:12px;background:#f2eee9;margin:8px 0}@media print{button{display:none}}</style><h1>Samen Wegwijs in Nederland</h1><p>${allWegwijsResponses().length} antwoorden · ${wegwijsParticipantCount()} verbonden deelnemers</p><h2>Resultaten</h2><table><tr><th>Activiteit</th><th>Deelnemer</th><th>Antwoord</th></tr>${allWegwijsResponses().map(item=>`<tr><td>${escapeHtml(item.activity)}</td><td>${escapeHtml(item.name||"Deelnemer")}</td><td>${escapeHtml(wegwijsResponseSummary(item))}</td></tr>`).join("")}</table><h2>Trainernotities</h2>${Object.values(wegwijsState?.stepNotes||{}).map(note=>`<div class="note"><strong>${escapeHtml(note.stepId)}</strong><p>${escapeHtml(note.text||"")}</p><small>${escapeHtml(note.group||"")} · ${new Date(note.date).toLocaleString("nl-NL")}</small></div>`).join("")||"<p>Geen notities.</p>"}<button onclick="print()">Opslaan als PDF</button>`);
  report.document.close();
}

const TALENT_ROOM="van-talent-naar-toekomst";
let talentSocket;
let talentConnectedRoom="";
let talentState;
let talentReconnect;
let talentTimerLoop;

function createLocalTalentState() {
  const empty={status:"waiting",weekIndex:0,activityIndex:0,revealResults:false,responseOpen:false,responseGeneration:0,activeResponseKey:"",statementIndex:0,timer:{running:false,duration:5,endsAt:0},connected:{},responses:{},participants:{},participantNotes:{},stepNotes:{},observations:[],updatedAt:Date.now()};
  try {
    const stored=JSON.parse(localStorage.getItem(`${STORAGE_KEY}-talent`));
    return stored?{...empty,...stored,responses:stored.responses||{},stepNotes:stored.stepNotes||{}}:empty;
  } catch {return empty;}
}

function talentRole(){return launchMode==="screen"?"screen":launchMode==="participant"?"participant":"trainer";}

function connectTalent() {
  clearTimeout(talentReconnect);
  talentState ||= createLocalTalentState();
  if(!("WebSocket" in window)||!location.host)return;
  const targetRoom=liveRoom(TALENT_ROOM,"talent");
  if(talentSocket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(talentSocket.readyState)&&talentConnectedRoom===targetRoom)return;
  if(talentSocket&&[WebSocket.OPEN,WebSocket.CONNECTING].includes(talentSocket.readyState))talentSocket.close();
  const networkUrl=new URL(location.href);
  const protocol=networkUrl.protocol==="https:"?"wss":"ws";
  talentSocket=new WebSocket(`${protocol}://${networkUrl.host}/ws`);
  talentSocket.addEventListener("open",()=>{
    talentConnectedRoom=targetRoom;
    talentSocket.send(JSON.stringify({type:"join",room:targetRoom,clientId:participantClientId,role:talentRole(),name:getTalentParticipantName()}));
  });
  talentSocket.addEventListener("message",event=>{
    const message=JSON.parse(event.data);
    if(message.type==="submission-rejected"){toast("Deze antwoordronde is gesloten");return;}
    if(message.type!=="snapshot")return;
    talentState=message.state;
    if(Number.isInteger(talentState.weekIndex)){data.talent.currentWeek=talentState.weekIndex;saveData();}
    renderTalentLive();
  });
  talentSocket.addEventListener("close",()=>{talentSocket=null;talentConnectedRoom="";talentReconnect=setTimeout(connectTalent,1200);});
}

function talentAction(action,payload={}) {
  if(talentSocket?.readyState===WebSocket.OPEN){const message=compatibleLiveMessage(action,payload,talentState);talentSocket.send(JSON.stringify({type:"action",...message}));}
  else if(!location.host){applyLocalTalentAction(action,payload);renderTalentLive();}
  else {toast("De live sessie maakt opnieuw verbinding");connectTalent();}
}

function applyLocalTalentAction(action,payload) {
  talentState ||= createLocalTalentState();
  const state=talentState;
  if(action==="control")Object.assign(state,payload);
  if(action==="open-response"){state.responseOpen=true;state.revealResults=false;state.responseGeneration=(state.responseGeneration||0)+1;state.activeResponseKey=payload.activity||"";}
  if(action==="close-response"||action==="timer-expired"){state.responseOpen=false;state.revealResults=payload.revealResults!==false;state.timer={running:false,duration:state.timer?.duration||5,endsAt:0};}
  if(action==="activity"){
    state.activityIndex=Math.max(0,Math.min(Number(payload.maxIndex)||20,Number(payload.index)||0));
    state.revealResults=false;state.responseOpen=false;state.statementIndex=0;state.timer={running:false,duration:5,endsAt:0};
  }
  if(action==="timer"){
    const duration=Math.max(1,Number(payload.duration)||5);
    state.timer={running:Boolean(payload.running),duration,endsAt:payload.running?Date.now()+duration*1000:0};
    state.responseOpen=Boolean(payload.running);state.revealResults=false;
  }
  if(action==="submit"){
    if(!state.responseOpen||(state.activeResponseKey&&state.activeResponseKey!==payload.activity))return;
    state.responses[payload.activity]||=[];
    const list=state.responses[payload.activity];
    const value={...payload.value,generation:state.responseGeneration||0,name:getTalentParticipantName(),clientId:participantClientId,sessionId:participantClientId,updatedAt:Date.now()};
    const questionType=["quiz","vote","impact"].some(type=>payload.activity.startsWith(type));
    const questionIndex=value.questionIndex??0;
    const index=list.findIndex(item=>item.clientId===participantClientId&&item.generation===value.generation&&(!questionType||item.questionIndex===questionIndex));
    if(index>=0)list[index]=value;else list.push(value);
  }
  if(action==="participant-register"){
    state.participants[participantClientId]={name:payload.name,registeredAt:Date.now(),online:true};
    state.connected[participantClientId]={role:"participant",name:payload.name,lastSeen:Date.now()};
  }
  if(action==="step-note")state.stepNotes[payload.stepId]={...payload};
  state.updatedAt=Date.now();
  localStorage.setItem(`${STORAGE_KEY}-talent`,JSON.stringify(state));
}

function renderTalentLive() {
  if(!isTalent())return;
  if(document.getElementById("trainerView")?.classList.contains("active"))renderTalentTrainer();
  if(document.getElementById("screenView")?.classList.contains("active")||launchMode==="screen")renderTalentScreen();
  const focused=document.activeElement;
  const typing=focused&&["INPUT","TEXTAREA","SELECT"].includes(focused.tagName)&&document.getElementById("participantApp")?.contains(focused);
  if(!typing&&(document.getElementById("participantView")?.classList.contains("active")||launchMode==="participant"))renderTalentParticipant(document.getElementById("participantApp"));
  startTalentTimerLoop();
}

function talentCurrentStep(){return talentSteps()[Math.min(talentState?.activityIndex||0,talentSteps().length-1)];}
function talentResponseKey(step=talentCurrentStep()){return step?.type?`${step.type}-${talentWeek().id}`:null;}
function talentResponses(step=talentCurrentStep()){return talentState?.responses?.[talentResponseKey(step)]||[];}
function talentQuestions(step=talentCurrentStep()){
  if(step?.type==="quiz")return talentWeek().quiz||[];
  if(step?.type==="vote")return talentWeek().vote||[];
  if(step?.type==="impact")return talentImpactStatements.map(statement=>[statement,talentScale]);
  return [];
}
function talentParticipantCount(){return Object.values(talentState?.connected||{}).filter(item=>item.role==="participant").length;}

function renderTalentTrainer() {
  talentState ||= createLocalTalentState();
  const state=talentState,steps=talentSteps(),step=talentCurrentStep(),next=steps[state.activityIndex+1];
  const questions=talentQuestions(step),currentQuestion=questions[state.statementIndex]||null;
  document.getElementById("trainerView").classList.add("mic-director-mode","talent-director-mode");
  document.getElementById("stageCounter").textContent=`Week ${(data.talent.currentWeek||0)+1} · onderdeel ${state.activityIndex+1} van ${steps.length}`;
  document.getElementById("trainerModule").innerHTML=`
    <div class="mic-director talent-director">
      <header class="mic-session-head"><div><p class="eyebrow">Van Talent naar Toekomst</p><h2>${escapeHtml(talentWeek().title)}</h2></div><div><span class="live-dot ${state.status}"></span>${talentParticipantCount()} deelnemers</div></header>
      <div class="mic-director-grid">
        <section class="mic-director-panel mic-preview-panel"><div class="panel-label"><span>Presentatiescherm</span><button class="mini-action" id="talentFullscreen">Fullscreen ↗</button></div><div class="mic-preview-frame">${renderTalentSlide(state,step,true)}</div></section>
        <section class="mic-director-panel mic-private-panel"><div class="panel-label">Alleen voor trainer</div>
          <p class="eyebrow">${step.duration} minuten · ${escapeHtml(step.goal)}</p><h3>${escapeHtml(step.title)}</h3>
          ${currentQuestion?`<div class="talent-answer-key"><strong>Actieve vraag</strong><p>${escapeHtml(currentQuestion[0])}</p>${step.type==="quiz"?`<small>Voorkeursantwoord: ${escapeHtml(currentQuestion[1][currentQuestion[2]])}<br>${escapeHtml(currentQuestion[3]||"")}</small>`:""}</div>`:""}
          <div class="trainer-script"><strong>Wat vertel ik?</strong><p>${escapeHtml(step.trainerText)}</p></div>
          <div class="trainer-questions"><strong>Vervolgvragen</strong><ul>${step.questions.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
          <div class="trainer-attention"><strong>Let op</strong><p>${escapeHtml(step.attention)}</p></div>
          <label class="wegwijs-note-label">Notitie bij dit onderdeel<textarea id="talentStepNote" placeholder="Observaties, talenten of vervolgacties...">${escapeHtml(state.stepNotes?.[step.id]?.text||"")}</textarea></label>
          <button class="button light" id="saveTalentNote">Notitie opslaan</button>
        </section>
        <aside class="mic-director-panel mic-action-panel"><div class="panel-label">Live bediening</div>
          <div class="mic-active-card"><div><small>NU</small><strong>${escapeHtml(step.short)}</strong></div><span>${state.activityIndex+1}/${steps.length}</span></div>
          <p class="next-activity">Hierna: <strong>${escapeHtml(next?.title||"Einde")}</strong></p>
          ${questions.length?`<div class="wegwijs-question-picker">${questions.map((item,index)=>`<button class="${index===state.statementIndex?"active":""}" data-talent-question="${index}">${index+1}</button>`).join("")}</div>`:""}
          <div class="mic-timer-control"><strong id="talentTimerValue">${talentTimerRemaining(state)||5}</strong><span>seconden</span><select id="talentTimerDuration"><option value="5">5 sec</option><option value="10">10 sec</option><option value="20">20 sec</option><option value="30">30 sec</option><option value="0">Handmatig</option></select><button id="startTalentTimer">Start ronde</button></div>
          <button class="director-button primary" id="startTalentActivity">${step.interactive?(state.responseOpen?"Opdracht actief":"Start opdracht"):"Start onderdeel"}</button>
          ${step.results?`<button class="director-button" id="showTalentResults">${state.revealResults?"Verberg resultaten":"Toon resultaten"} · ${talentResponses(step).length}</button>`:""}
          <div class="director-split"><button id="prevTalent">← Vorige</button><button id="nextTalent">Volgende →</button></div>
          <button class="director-button quiet" id="pauseTalent">Pauze</button>
          <button class="director-button quiet" id="talentIndividual">Individuele antwoorden</button>
          <button class="director-button quiet" id="talentTestMode">Test live verbinding</button>
          <button class="director-button quiet" id="exportTalent">Export na afloop</button>
        </aside>
      </div>
      <nav class="mic-activity-rail">${steps.map((item,index)=>`<button class="${index===state.activityIndex?"active":""}" data-talent-step="${index}"><b>${String(index+1).padStart(2,"0")}</b><span>${escapeHtml(item.short)}</span></button>`).join("")}</nav>
    </div>`;
  document.getElementById("talentFullscreen")?.addEventListener("click",openPresentationWindow);
  document.getElementById("startTalentActivity")?.addEventListener("click",()=>{talentAction("control",{status:"running"});if(step.interactive)talentAction("open-response",{activity:talentResponseKey(step)});});
  document.getElementById("showTalentResults")?.addEventListener("click",()=>talentAction(state.revealResults?"control":"close-response",{revealResults:!state.revealResults}));
  document.getElementById("startTalentTimer")?.addEventListener("click",()=>{const duration=Number(document.getElementById("talentTimerDuration")?.value||5);talentAction("open-response",{activity:talentResponseKey(step)});if(duration>0)talentAction("timer",{running:true,duration});});
  document.getElementById("prevTalent")?.addEventListener("click",()=>talentAction("activity",{index:state.activityIndex-1,maxIndex:steps.length-1}));
  document.getElementById("nextTalent")?.addEventListener("click",()=>talentAction("activity",{index:state.activityIndex+1,maxIndex:steps.length-1}));
  document.getElementById("pauseTalent")?.addEventListener("click",()=>talentAction("control",{status:"paused"}));
  document.getElementById("talentIndividual")?.addEventListener("click",openTalentIndividualAnswers);
  document.getElementById("talentTestMode")?.addEventListener("click",openLiveTestMode);
  document.getElementById("exportTalent")?.addEventListener("click",openTalentExport);
  document.querySelectorAll("[data-talent-step]").forEach(button=>button.addEventListener("click",()=>talentAction("activity",{index:Number(button.dataset.talentStep),maxIndex:steps.length-1})));
  document.querySelectorAll("[data-talent-question]").forEach(button=>button.addEventListener("click",()=>talentAction("control",{statementIndex:Number(button.dataset.talentQuestion),revealResults:false,responseOpen:false})));
  document.getElementById("saveTalentNote")?.addEventListener("click",()=>talentAction("step-note",{stepId:step.id,text:valueOf("talentStepNote"),workshop:"Van Talent naar Toekomst",week:(data.talent.currentWeek||0)+1,group:"Workshopgroep",date:new Date().toISOString()}));
}

function renderTalentSlide(state,step,compact=false) {
  const current=talentQuestions(step)[state.statementIndex];
  const activeQuestion=current?.[0]||step.question;
  const results=state.revealResults&&step.results?renderTalentResultsVisual(state,step):renderTalentPrompt(state,step);
  return `<div class="talent-slide ${compact?"compact":""} visual-${step.visual}">
    <div class="talent-slide-brand">VAN TALENT <span>NAAR TOEKOMST</span></div>
    <div class="talent-scene">${renderTalentScene(step.visual)}</div>
    <div class="talent-slide-copy"><p>Week ${(data.talent.currentWeek||0)+1} · ${escapeHtml(step.short)}</p><h1>${escapeHtml(activeQuestion)}</h1>${!step.interactive?`<span>${escapeHtml(step.title)}</span>`:""}</div>
    ${results?`<div class="talent-slide-result">${results}</div>`:""}
  </div>`;
}

function renderTalentScene(visual) {
  const labels={cover:["★","IK"],route:["1","→"],impact:["5","↗"],cards:["TALENT","+"],bingo:["BINGO","✓"],mirror:["IK","JIJ"],feedback:["+","…"],reflection:["TROTS","★"],plan:["PLAN","1"],team:["SAMEN","+"],match:["↔","?"] ,vote:["A","B"],quiz:["?","✓"],compass:["N","→"],target:["DOEL","◎"],path:["NU","LATER"],pitch:["IK","→"],wall:["STAP","✓"],finish:["NU","→"]}[visual]||["★","→"];
  return `<i>${labels[0]}</i><i>${labels[1]}</i><b></b>`;
}

function renderTalentPrompt(state,step) {
  if(!step.interactive)return "";
  if(["team","obstacles"].includes(step.type))return `<div class="talent-room-task"><strong>Werk samen</strong><span>${escapeHtml(step.instructions)}</span></div>`;
  return `<div class="talent-qr-prompt">${fakeQr()}<div><strong>Doe mee op je telefoon</strong><span>${talentResponses(step).length} antwoord${talentResponses(step).length===1?"":"en"} ontvangen</span></div>${["quiz","vote"].includes(step.type)?`<b class="mic-countdown">${talentTimerRemaining(state)||5}</b>`:""}</div>`;
}

function renderTalentResultsVisual(state,step) {
  const items=talentResponses(step);
  if(["quiz","vote"].includes(step.type)){
    const current=items.filter(item=>item.questionIndex===state.statementIndex);
    const question=talentQuestions(step)[state.statementIndex]||[];
    return renderWegwijsChoiceChart(current,question[1]||[],step.type==="quiz"?question[2]:null,question[3]||"");
  }
  if(step.type==="impact")return renderTalentImpact(items);
  if(step.type==="postits")return `<div class="talent-wall">${items.slice(-14).map(item=>`<article>${escapeHtml(item.text||item.value||"")}</article>`).join("")||"<p>De eerste stappen verschijnen hier.</p>"}</div>`;
  if(["cards","mirror","feedback","match","bingo","obstacles"].includes(step.type))return renderTalentTags(items,step.type);
  return "";
}

function renderTalentTags(items,type) {
  const values=items.flatMap(item=>item.selected||item.matches||[item.value||item.text]).filter(Boolean);
  const counts={};values.forEach(value=>counts[value]=(counts[value]||0)+1);
  return `<div class="talent-result-tags">${Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,16).map(([value,count])=>`<span>${escapeHtml(value)} <b>${count}</b></span>`).join("")||`<p>Nog geen ${escapeHtml(type)}-resultaten.</p>`}</div>`;
}

function renderTalentImpact(items) {
  const answers=items.filter(item=>Array.isArray(item.answers));
  return `<div class="wegwijs-impact talent-impact">${talentImpactStatements.map((statement,index)=>{
    const values=answers.map(item=>Number(item.answers[index])).filter(Number.isFinite);
    const score=values.length?(5-(values.reduce((sum,value)=>sum+value,0)/values.length)).toFixed(1):"–";
    return `<article><span>${escapeHtml(statement)}</span><strong>${score}</strong></article>`;
  }).join("")}</div>`;
}

function renderTalentScreen() {
  talentState ||= createLocalTalentState();
  const state=talentState,step=talentCurrentStep();
  document.getElementById("screenParticipants").textContent=talentParticipantCount();
  document.getElementById("screenProgress").textContent=`${state.activityIndex+1} / ${talentSteps().length}`;
  document.getElementById("presentationProgressBar").style.width=`${((state.activityIndex+1)/talentSteps().length)*100}%`;
  const screen=document.getElementById("publicScreen");screen.dataset.theme="talent";
  if(state.status==="paused"){
    screen.innerHTML=`<div class="talent-slide"><div class="talent-slide-brand">VAN TALENT <span>NAAR TOEKOMST</span></div><div class="talent-scene">${renderTalentScene("cover")}</div><div class="talent-slide-copy"><p>Even pauze</p><h1>We gaan zo verder.</h1></div></div>`;
    return;
  }
  screen.innerHTML=renderTalentSlide(state,step,false);startTalentTimerLoop();
}

function renderTalentParticipant(app) {
  if(!app)return;
  talentState ||= createLocalTalentState();
  const state=talentState,name=getTalentParticipantName();
  if(!name){
    app.innerHTML=`<div class="mobile-content talent-phone"><div class="mobile-logo">TALENT → TOEKOMST</div><p class="eyebrow">Ontdek wie je bent en welke stap past</p><h2>Welkom.</h2><p>Vul je naam in. Op het grote scherm zijn je antwoorden anoniem.</p><form id="talentJoin"><div class="field"><label>Naam</label><input id="talentName" required autocomplete="name"></div><button class="mobile-button">Deelnemen</button></form></div>`;
    document.getElementById("talentJoin")?.addEventListener("submit",event=>{event.preventDefault();const value=valueOf("talentName");if(!value)return;sessionStorage.setItem("slinnva-talent-participant-name",value);talentAction("participant-register",{name:value});renderTalentParticipant(app);});
    return;
  }
  if(state.status!=="running"){app.innerHTML=participantMessage("…",state.status==="paused"?"Even pauze":"Wacht op de trainer.",state.status==="paused"?"De workshop gaat zo verder.":"De volgende opdracht verschijnt automatisch.");return;}
  const step=talentCurrentStep();
  if(step.interactive&&!state.responseOpen){app.innerHTML=participantMessage("…","Wacht op de trainer.",state.revealResults?"De resultaten worden besproken.":"De opdracht is nog niet geopend.");return;}
  const submitted=talentResponses(step).some(item=>item.clientId===participantClientId&&item.generation===(state.responseGeneration||0)&&(!["quiz","vote"].includes(step.type)||item.questionIndex===state.statementIndex));
  if(step.interactive&&submitted){app.innerHTML=participantMessage("✓","Bedankt voor je antwoord.","Je antwoord is opgeslagen. Wacht op de trainer.");return;}
  app.innerHTML=`<div class="mobile-content talent-phone"><div class="mobile-logo">TALENT → TOEKOMST</div><p class="eyebrow">Week ${(data.talent.currentWeek||0)+1} · ${escapeHtml(step.short)}</p><h2>${escapeHtml(talentQuestions(step)[state.statementIndex]?.[0]||step.question)}</h2>${renderTalentParticipantTask(state,step)}<small class="privacy-note">Je naam is alleen voor de trainer zichtbaar.</small></div>`;
  bindTalentParticipant(step);
}

function renderTalentParticipantTask(state,step) {
  if(!step.interactive)return `<div class="mic-instruction"><strong>Doe mee in de zaal</strong><p>${escapeHtml(step.instructions)}</p></div>`;
  if(step.type==="impact")return `${talentImpactStatements.map((statement,index)=>`<div class="field"><label>${escapeHtml(statement)}</label><select data-talent-impact="${index}">${talentScale.map((item,value)=>`<option value="${value}">${item}</option>`).join("")}</select></div>`).join("")}<button class="mobile-button" data-talent-submit="impact">Opslaan</button>`;
  if(["quiz","vote"].includes(step.type)){
    const options=talentQuestions(step)[state.statementIndex]?.[1]||[];
    return `<div class="wegwijs-phone-options">${options.map((option,index)=>`<button data-talent-choice="${index}">${escapeHtml(option)}</button>`).join("")}</div>`;
  }
  if(step.type==="cards"){
    const options=(data.talent.currentWeek||0)===1?talentInterests:talentCards;
    return `<p>Kies wat bij jou past.</p><div class="talent-phone-cards">${options.map(item=>`<button data-talent-card="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join("")}</div><button class="mobile-button" data-talent-submit="cards">Keuzes opslaan</button>`;
  }
  if(step.type==="bingo")return `<div class="talent-bingo-list">${["Goed luisteren","Graag dingen maken","Goed met kinderen","Mensen laten lachen","Rustig bij stress","Graag helpen","Creatief","Goed plannen","Sportief","Graag leren"].map((item,index)=>`<label><span>${item}</span><input data-talent-bingo="${index}" placeholder="Voornaam"></label>`).join("")}</div><button class="mobile-button" data-talent-submit="bingo">Bingo opslaan</button>`;
  if(["mirror","feedback","match","obstacles","reflection"].includes(step.type))return `<div class="field"><label>${step.type==="reflection"?"Jouw reflectie":"Jouw bijdrage"}</label><textarea id="talentText" maxlength="400"></textarea></div><button class="mobile-button" data-talent-submit="${step.type}">Opslaan</button>`;
  if(step.type==="postits")return `<div class="field"><label>Mijn concrete stap</label><textarea id="talentText" maxlength="160"></textarea></div><button class="mobile-button" data-talent-submit="postits">Plaatsen</button>`;
  if(step.type==="plan"){
    const fields=(data.talent.currentWeek||0)===3?["Mijn talenten zijn","Mijn kwaliteiten zijn","Ik krijg energie van","Dit past misschien bij mij","Mijn top 3 mogelijkheden","Mensen of plekken die mij helpen","Mijn eerste stap","Wanneer zet ik die stap?"]:["Dit weet ik over mezelf","Dit wil ik onderzoeken","Mijn mogelijkheden","Mijn volgende stap"];
    return `${fields.map((label,index)=>`<div class="field"><label>${label}</label><textarea data-talent-plan="${index}"></textarea></div>`).join("")}<button class="mobile-button" data-talent-submit="plan">Plan opslaan</button>`;
  }
  return `<div class="mic-instruction"><strong>Werk samen</strong><p>${escapeHtml(step.instructions)}</p></div>`;
}

function bindTalentParticipant(step) {
  document.querySelectorAll("[data-talent-card]").forEach(button=>button.addEventListener("click",()=>{button.classList.toggle("selected");}));
  document.querySelector("[data-talent-submit='cards']")?.addEventListener("click",()=>submitTalent("cards",{selected:[...document.querySelectorAll("[data-talent-card].selected")].map(item=>item.dataset.talentCard)}));
  document.querySelector("[data-talent-submit='bingo']")?.addEventListener("click",()=>submitTalent("bingo",{selected:[...document.querySelectorAll("[data-talent-bingo]")].map((input,index)=>input.value.trim()?`${input.previousElementSibling.textContent}: ${input.value.trim()}`:"").filter(Boolean)}));
  document.querySelectorAll("[data-talent-choice]").forEach(button=>button.addEventListener("click",()=>submitTalent(step.type,{questionIndex:talentState.statementIndex,choice:Number(button.dataset.talentChoice)})));
  ["mirror","feedback","match","obstacles","reflection","postits"].forEach(type=>document.querySelector(`[data-talent-submit="${type}"]`)?.addEventListener("click",()=>submitTalent(type,{text:valueOf("talentText")})));
  document.querySelector("[data-talent-submit='impact']")?.addEventListener("click",()=>submitTalent("impact",{questionIndex:0,answers:[...document.querySelectorAll("[data-talent-impact]")].map(input=>Number(input.value))}));
  document.querySelector("[data-talent-submit='plan']")?.addEventListener("click",()=>submitTalent("plan",{answers:[...document.querySelectorAll("[data-talent-plan]")].map(input=>input.value.trim())}));
}

function submitTalent(type,value) {
  if(!value||Object.values(value).every(item=>item===""||item==null||(Array.isArray(item)&&!item.length)))return;
  talentAction("submit",{activity:`${type}-${talentWeek().id}`,value:{...value,name:getTalentParticipantName()}});
  const app=document.getElementById("participantApp");if(app)app.innerHTML=participantMessage("✓","Bedankt voor je antwoord.","Je antwoord is opgeslagen. Wacht op de trainer.");
}

function talentTimerRemaining(state=talentState){if(!state?.timer?.running)return 0;return Math.max(0,Math.ceil((state.timer.endsAt-Date.now())/1000));}
function startTalentTimerLoop(){
  clearInterval(talentTimerLoop);if(!talentState?.timer?.running)return;
  talentTimerLoop=setInterval(()=>{const remaining=talentTimerRemaining();document.querySelectorAll(".mic-countdown,#talentTimerValue").forEach(item=>item.textContent=remaining);if(remaining<=0){clearInterval(talentTimerLoop);if(talentRole()==="trainer")talentAction("timer-expired",{});}},250);
}

function talentResponseSummary(item){
  if(item.value)return item.value;if(item.text)return item.text;
  if(Array.isArray(item.selected))return item.selected.join(" · ");
  if(Array.isArray(item.answers))return item.answers.join(" · ");
  if(Number.isInteger(item.choice))return `Keuze ${item.choice+1}`;
  return "Ingevuld";
}
function allTalentResponses(){return Object.entries(talentState?.responses||{}).filter(([key])=>talentWeeks.some(week=>key.endsWith(`-${week.id}`))).flatMap(([activity,items])=>items.map(item=>({activity,...item})));}
function openTalentIndividualAnswers(){
  const rows=allTalentResponses();
  openModal(`<p class="eyebrow">Alleen zichtbaar voor trainer</p><h2>Individuele antwoorden</h2><div class="mic-individual-list">${rows.map(item=>`<article><strong>${escapeHtml(item.name||talentState?.participants?.[item.clientId]?.name||"Deelnemer")}</strong><span>${escapeHtml(item.activity)}</span><p>${escapeHtml(talentResponseSummary(item))}</p><small>Sessie ${escapeHtml((item.sessionId||item.clientId||"").slice(-8))}</small></article>`).join("")||"<p>Nog geen antwoorden.</p>"}</div>`);
}

function talentCsv(rows,name){downloadMicFile(name,rows.map(row=>row.map(value=>`"${String(value??"").replace(/"/g,'""')}"`).join(";")).join("\n"),"text/csv;charset=utf-8");}
function openTalentExport(){
  openModal(`<p class="eyebrow">Export na afloop</p><h2>Van Talent naar Toekomst</h2><div class="export-grid">
    <button class="version-card" id="talentPdf"><strong>PDF trainersverslag</strong><span>Resultaten en notities</span></button>
    <button class="version-card" id="talentCsv"><strong>Excel resultaten</strong><span>Alle opdrachten</span></button>
    <button class="version-card" id="talentPlans"><strong>Persoonlijke plannen</strong><span>Talent naar Toekomst Plan per deelnemer</span></button>
    <button class="version-card" id="talentImpact"><strong>Impactmeting</strong><span>Begin en eind vergelijken</span></button>
    <button class="version-card" id="talentThemes"><strong>Talenten, richtingen en obstakels</strong><span>Veelgenoemde thema’s</span></button></div>`);
  document.getElementById("talentPdf")?.addEventListener("click",exportTalentPdf);
  document.getElementById("talentCsv")?.addEventListener("click",()=>talentCsv([["Activiteit","Naam","Sessie","Antwoord"],...allTalentResponses().map(item=>[item.activity,item.name||"Deelnemer",item.sessionId||item.clientId,talentResponseSummary(item)])],"talent-naar-toekomst-resultaten.csv"));
  document.getElementById("talentPlans")?.addEventListener("click",exportTalentPlans);
  document.getElementById("talentImpact")?.addEventListener("click",exportTalentImpact);
  document.getElementById("talentThemes")?.addEventListener("click",exportTalentThemes);
}
function exportTalentPlans(){
  const rows=allTalentResponses().filter(item=>item.activity.startsWith("plan-"));
  talentCsv([["Week","Naam","Plan"],...rows.map(item=>[item.activity,item.name||"Deelnemer",(item.answers||[]).join(" | ")])],"talent-naar-toekomst-plannen.csv");
}
function talentImpactAverages(key){
  const items=talentState?.responses?.[key]||[];
  return talentImpactStatements.map((_,index)=>{const values=items.filter(item=>Array.isArray(item.answers)).map(item=>Number(item.answers[index])).filter(Number.isFinite);return values.length?5-(values.reduce((sum,value)=>sum+value,0)/values.length):null;});
}
function exportTalentImpact(){
  const begin=talentImpactAverages("impact-ontdekken"),end=talentImpactAverages("impact-stap");
  talentCsv([["Stelling","Begin","Eind","Verschil"],...talentImpactStatements.map((statement,index)=>[statement,begin[index]?.toFixed(2)||"",end[index]?.toFixed(2)||"",begin[index]!=null&&end[index]!=null?(end[index]-begin[index]).toFixed(2):""])],"talent-naar-toekomst-impact.csv");
}
function exportTalentThemes(){
  const rows=allTalentResponses().filter(item=>["cards","mirror","match","obstacles","postits"].some(type=>item.activity.startsWith(type)));
  talentCsv([["Thema","Naam","Inhoud"],...rows.map(item=>[item.activity,item.name||"Deelnemer",talentResponseSummary(item)])],"talenten-richtingen-obstakels.csv");
}
function exportTalentPdf(){
  const report=window.open("","talent-rapport");if(!report)return toast("Sta pop-ups toe voor de PDF-export");
  report.document.write(`<!doctype html><html lang="nl"><meta charset="utf-8"><title>Van Talent naar Toekomst</title><style>body{font-family:Arial;margin:45px;color:#1a1a1a}h1,h2{font-family:Georgia;color:#755c48}table{width:100%;border-collapse:collapse}td,th{padding:9px;border-bottom:1px solid #ddd;text-align:left}.note{padding:12px;background:#f2eee9;margin:8px 0}@media print{button{display:none}}</style><h1>Van Talent naar Toekomst</h1><p>${allTalentResponses().length} antwoorden · ${talentParticipantCount()} verbonden deelnemers</p><table><tr><th>Activiteit</th><th>Deelnemer</th><th>Antwoord</th></tr>${allTalentResponses().map(item=>`<tr><td>${escapeHtml(item.activity)}</td><td>${escapeHtml(item.name||"Deelnemer")}</td><td>${escapeHtml(talentResponseSummary(item))}</td></tr>`).join("")}</table><h2>Trainernotities</h2>${Object.values(talentState?.stepNotes||{}).map(note=>`<div class="note"><strong>${escapeHtml(note.stepId)}</strong><p>${escapeHtml(note.text||"")}</p></div>`).join("")||"<p>Geen notities.</p>"}<button onclick="print()">Opslaan als PDF</button>`);report.document.close();
}

const MIC_WEEK1_ROOM = "mic-on-school-week-1";
const micWeek1Activities = [
  {id:"welcome",short:"Welkom",title:"Welkom bij Mic On",question:"MIC ON",subtitle:"Jongeren aan het woord",goal:"Zorg voor een ontspannen en veilige start.",duration:3,trainerText:"Welkom bij Mic On. Vandaag draait niet om perfecte antwoorden, maar om nieuwsgierigheid, luisteren en durven zeggen wat jij belangrijk vindt.",questions:["Wat heb je nodig om vandaag prettig mee te doen?"],instructions:"Neem plaats. Je telefoon heb je pas nodig wanneer de trainer een opdracht opent.",attention:"Begroet deelnemers persoonlijk en houd de opening rustig.",visual:"cover"},
  {id:"what-is",short:"Intro",title:"Wat is Mic On?",question:"Een goed gesprek begint vóór de microfoon aangaat.",goal:"Leg uit wat Mic On is en waar de groep naartoe werkt.",duration:4,trainerText:"Mic On is geen gewone podcastles. We oefenen hoe je luistert, sterke vragen stelt en samen een gesprek maakt dat iemand echt wil horen.",questions:["Wanneer blijf jij naar een gesprek luisteren?","Wat maakt een stem geloofwaardig?"],instructions:"Kijk mee en reageer vanuit je eigen ervaring.",attention:"Geef nog geen lange technische uitleg.",visual:"microphone"},
  {id:"today",short:"Vandaag",title:"Wat gaan we vandaag doen?",question:"Van kennismaken naar jullie podcastonderwerp.",goal:"Maak de route van de bijeenkomst voorspelbaar.",duration:3,trainerText:"We leren elkaar kennen, oefenen met luisteren, delen meningen en verzamelen onderwerpen die later een podcast kunnen worden.",questions:["Naar welk onderdeel ben je het meest benieuwd?"],instructions:"Onthoud één onderdeel waar je nieuwsgierig naar bent.",attention:"Benoem dat niet alles via de telefoon gaat.",visual:"route"},
  {id:"agreements",short:"Afspraken",title:"Groepsafspraken",question:"Nieuwsgierig. Respectvol. Eerlijk.",goal:"Maak samen heldere afspraken voor een veilig gesprek.",duration:4,trainerText:"Je mag een andere mening hebben. We luisteren uit, lachen niemand uit en persoonlijke verhalen blijven van degene die ze deelt.",questions:["Welke afspraak ontbreekt nog?","Hoe merken we dat iemand ruimte nodig heeft?"],instructions:"Steek je hand op als je een afspraak wilt toevoegen.",attention:"Maak duidelijk dat delen altijd vrijwillig is.",visual:"agreements"},
  {id:"wordcloud",responseKey:"wordcloud",interactive:true,results:true,short:"Woordwolk",title:"Omschrijf jezelf in één woord",question:"Wie ben jij vandaag?",goal:"Laat iedereen laagdrempelig iets van zichzelf delen.",duration:5,trainerText:"Kies één woord dat vandaag bij jou past. Het hoeft niet bijzonder of grappig te zijn. Op het scherm verschijnen alleen woorden, geen namen.",questions:["Welk woord verrast je?","Welke woorden lijken op elkaar?"],instructions:"Open de opdracht op je telefoon en stuur één woord in.",attention:"Lees geen individuele deelnemer uit de groep af.",visual:"wordcloud"},
  {id:"wordcloud-talk",responseKey:"wordcloud",results:true,short:"Bespreken",title:"Bespreking woordwolk",question:"Wat vertelt deze woordwolk over onze groep?",goal:"Gebruik de woordwolk als korte kennismaking.",duration:5,trainerText:"Kijk eerst samen zonder meteen te verklaren. Vraag welke patronen en verschillen deelnemers zelf zien.",questions:["Welke woorden passen bij samenwerken?","Welk woord zou je aan het einde willen toevoegen?"],instructions:"Telefoon weg. Bespreek de woorden samen in de zaal.",attention:"Vraag door, maar laat niemand zijn woord opeisen of uitleggen.",visual:"wordcloud"},
  {id:"find-someone",responseKey:"findSomeone",interactive:true,short:"Zoek iemand",title:"Zoek iemand die…",question:"Wie in de ruimte past bij deze kaart?",goal:"Breng deelnemers in beweging en laat hen korte gesprekken voeren.",duration:8,trainerText:"Loop rond en zoek voor iedere omschrijving iemand. Vraag altijd eerst, vul niets voor een ander in en voer meer dan alleen een naam in je hoofd.",questions:["Welke overeenkomst had je niet verwacht?"],instructions:"Loop rond, stel vragen en vul voornamen in op je telefoon.",attention:"Help deelnemers die moeilijk op iemand durven afstappen.",visual:"people"},
  {id:"find-talk",responseKey:"findSomeone",short:"Nabespreking",title:"Nabespreking kennismaken",question:"Wat ontdekte je dat je nog niet wist?",goal:"Maak van de opdracht meer dan een namenlijst.",duration:4,trainerText:"Vraag om ontdekkingen, niet om prestaties. Laat twee of drie deelnemers kort vertellen wat hen opviel.",questions:["Wat maakte het makkelijk om iemand aan te spreken?","Welke vraag werkte goed?"],instructions:"Telefoon weg. Deel alleen wat je prettig vindt.",attention:"Voorkom dat steeds dezelfde deelnemers antwoorden.",visual:"conversation"},
  {id:"listen-detective",responseKey:"listenDetective",interactive:true,short:"Luisteren",title:"Luister Detective",question:"Kun jij luisteren zonder je eigen verhaal over te nemen?",goal:"Oefen aandachtig luisteren, samenvatten en doorvragen.",duration:10,trainerText:"Persoon A praat negentig seconden. Persoon B onderbreekt niet, vat daarna samen en stelt één nieuwsgierige vraag. Vervolgens wisselen jullie.",questions:["Wat hoorde je letterlijk?","Wat dacht je dat de ander bedoelde?"],instructions:"Werk in tweetallen. Vul na beide rondes de korte reflectie in.",attention:"Een stilte is niet fout; geef de verteller tijd.",visual:"listen"},
  {id:"listen-talk",responseKey:"listenDetective",short:"Nabespreking",title:"Nabespreking actief luisteren",question:"Wanneer voelde je dat iemand echt luisterde?",goal:"Vertaal de oefening naar interviewvaardigheden.",duration:5,trainerText:"Een goede interviewer denkt niet alleen aan de volgende vraag. Die hoort woorden, tempo, twijfel en enthousiasme en durft daarop door te vragen.",questions:["Wat was lastiger: praten of luisteren?","Wanneer werd een samenvatting een interpretatie?"],instructions:"Bespreek de ervaring in de groep.",attention:"Normaliseer dat niet onderbreken ongemakkelijk kan voelen.",visual:"listen"},
  {id:"opinion",responseKey:"opinion",interactive:true,results:true,short:"Stemmen",title:"Eens of oneens",question:"Toetsen geven te veel stress.",goal:"Maak verschillende perspectieven snel zichtbaar.",duration:8,trainerText:"We beginnen met een onderwerp dat veel jongeren raakt. Stem eerlijk. Er is geen goed of fout antwoord.",questions:["Waarom denken jullie dat zoveel mensen dit hebben gekozen?","Wie ziet dit anders?","Wanneer wordt toetsstress te veel?"],instructions:"Kies binnen vijf seconden jouw positie op je telefoon.",attention:"Laat deelnemers op elkaar reageren zonder het gesprek te laten ontsporen.",visual:"opinion"},
  {id:"opinion-talk",responseKey:"opinion",results:true,short:"Verdiepen",title:"Verdiepend gesprek",question:"Een uitslag is het begin van het gesprek.",goal:"Onderzoek argumenten achter de stemuitslag.",duration:9,trainerText:"Vraag altijd eerst door voordat je zelf uitleg geeft. Verschil van mening is bruikbaar zolang mensen nieuwsgierig blijven.",questions:["Wat zou school anders kunnen doen?","Welke ervaring zit achter jouw mening?","Is je antwoord voor iedereen hetzelfde?"],instructions:"Telefoon weg. Reageer op ideeën, niet op personen.",attention:"Bescherm minderheidsstemmen en vat neutraal samen.",visual:"opinion"},
  {id:"break",short:"Pauze",title:"Pauze",question:"Even opladen. We gaan zo verder.",goal:"Geef de groep een duidelijk rustmoment.",duration:10,trainerText:"We nemen tien minuten pauze. Na de pauze verzamelen we onderwerpen voor jullie eigen podcast.",questions:[],instructions:"Laat je telefoon gerust liggen. We starten weer op het afgesproken tijdstip.",attention:"Zet een zichtbare timer en benoem de exacte hervattingstijd.",visual:"break"},
  {id:"topics-intro",short:"Onderwerpen",title:"Wat speelt er onder jullie?",question:"Wat verdient volgens jullie een echt gesprek?",goal:"Open de inhoudelijke brainstorm zonder onderwerpen te beoordelen.",duration:4,trainerText:"Een sterk podcastonderwerp begint bij iets waar mensen vragen, ervaringen of verschillende meningen over hebben.",questions:["Waar praten jongeren te weinig eerlijk over?","Wat zouden volwassenen beter moeten begrijpen?"],instructions:"Denk alvast aan één onderwerp uit school, thuis, online of de toekomst.",attention:"Laat ook kleine en positieve onderwerpen toe.",visual:"postits"},
  {id:"postits",responseKey:"postits",interactive:true,results:true,short:"Post-its",title:"Digitale post-its",question:"Plaats één onderwerp dat aandacht verdient.",goal:"Verzamel breed wat er in de groep leeft.",duration:7,trainerText:"Schrijf kort en duidelijk. Eén onderwerp per post-it. Namen en persoonlijke details zijn niet nodig.",questions:["Welke categorie krijgt veel reacties?","Wat ontbreekt nog?"],instructions:"Kies een categorie, schrijf je onderwerp en plaats de post-it.",attention:"Verwijder of herformuleer herkenbare persoonlijke informatie.",visual:"postits"},
  {id:"cluster",responseKey:"postits",results:true,short:"Clusteren",title:"Onderwerpen clusteren",question:"Welke ideeën horen bij elkaar?",goal:"Breng structuur aan in de verzamelde onderwerpen.",duration:6,trainerText:"We groeperen vergelijkbare ideeën. De bedoeling is niet om iets weg te strepen, maar om grotere thema’s zichtbaar te maken.",questions:["Welke post-its vertellen eigenlijk hetzelfde verhaal?","Welke combinatie levert een verrassend onderwerp op?"],instructions:"Kijk mee en help de trainer categorieën benoemen.",attention:"Bewaar afwijkende ideeën; die kunnen juist origineel zijn.",visual:"postits"},
  {id:"votes",responseKey:"votes",interactive:true,results:true,short:"Verkiezing",title:"Podcastonderwerpen verkiezing",question:"Welke onderwerpen verdienen een aflevering?",goal:"Maak samen een eerste inhoudelijke prioriteit.",duration:7,trainerText:"Iedereen krijgt drie stemmen. Je mag ze verdelen of meerdere stemmen aan één onderwerp geven. Kies wat belangrijk én interessant genoeg is om verder te onderzoeken.",questions:["Waarom staat nummer één bovenaan?","Welk onderwerp heeft een gast of extra onderzoek nodig?"],instructions:"Verdeel precies drie stemmen via je telefoon.",attention:"Een lage score betekent niet dat een onderwerp onbelangrijk is.",visual:"ranking"},
  {id:"topic-battle",responseKey:"battle",interactive:true,results:true,short:"Battle",title:"Onderwerpen Battle",question:"Welk onderwerp verdient het volgende gesprek?",goal:"Geef deelnemers eigenaarschap over de onderwerpen die in het traject terugkomen.",duration:8,trainerText:"Open steeds één battle. Deelnemers kiezen tussen twee onderwerpen. Laat na iedere ronde kort de winnaar zien en vraag wat dit onderwerp voor de groep relevant maakt.",questions:["Waarom wint dit onderwerp?","Welke vraag zouden jullie hierover in een podcast stellen?","Welk onderwerp nemen we mee naar Week 2?"],instructions:"Kies per ronde het onderwerp waar jij het liefst verder over praat.",attention:"Een verliezend onderwerp is niet onbelangrijk. Gebruik de eindranglijst als richting, niet als definitief besluit.",visual:"battle"},
  {id:"reflection",responseKey:"reflection",interactive:true,results:true,short:"Reflectie",title:"Korte terugblik",question:"Hoe was deze eerste bijeenkomst voor jou?",goal:"Verzamel leerpunten, sfeer en wensen voor de volgende week.",duration:5,trainerText:"Kijk kort terug. Schrijf wat je echt meenam en waar je volgende week meer mee wilt doen.",questions:["Wat moeten we volgende week behouden?","Waar wil de groep meer oefentijd voor?"],instructions:"Vul de korte anonieme reflectie op je telefoon in.",attention:"Gebruik de uitkomst om Week 2 voor te bereiden.",visual:"reflection"},
  {id:"finish",short:"Afsluiting",title:"Afsluiting",question:"Jullie stemmen vormen de basis van de podcast.",goal:"Sluit positief af en maak de verbinding met Week 2.",duration:3,trainerText:"Vandaag hebben jullie kennisgemaakt, geluisterd, meningen gedeeld en onderwerpen verzameld. Volgende week maken we van luisteren een echte makersvaardigheid.",questions:["Welk woord past nu bij deze groep?"],instructions:"Bedankt voor je bijdrage. Je hoeft niets meer op je telefoon te doen.",attention:"Benoem één concrete opbrengst van de groep.",visual:"finish"}
];
const micOpinionStatements = [
  "Toetsen geven te veel stress.",
  "Sociale media doet meer kwaad dan goed.",
  "Iedereen moet kunnen zeggen wat hij denkt.",
  "AI maakt school makkelijker.",
  "School bereidt jongeren onvoldoende voor op het echte leven."
];
const micOpinionChoices = ["Helemaal eens","Eens","Neutraal","Oneens","Helemaal oneens"];
const micBattleRounds = [
  ["Toetsstress","Sociale media"],
  ["AI op school","Prestatiedruk"],
  ["Vrienden en groepsdruk","Online meningen"],
  ["Nieuws en nepnieuws","School en toekomst"],
  ["Mentale gezondheid","Geld en bijbaantjes"],
  ["Respect op school","Wat volwassenen niet begrijpen"]
];
const micBattleTopics=[...new Set(micBattleRounds.flat())];

function getMicParticipantBattlePair(state=micWeek1State,clientId=participantClientId) {
  const round=Number(state?.battleRoundIndex||0);
  const generation=Number(state?.responseGeneration||0);
  const session=activeSessionId(data.activeWorkshop);
  return seededShuffle(micBattleTopics,`${session}-${clientId}-${round}-${generation}-mic-battle`).slice(0,2);
}
const micPostitCategories = ["School","Sociale media","Nieuws","Familie","Vrienden","Toekomst","Geld","Mentale gezondheid","Vrije categorie"];
const micFindPrompts = ["Heeft een onverwacht talent","Kan goed luisteren","Heeft een bijbaantje","Wil iets veranderen op school","Weet al een podcastonderwerp"];
let micWeek1Socket;
let micWeek1ConnectedRoom="";
let micWeek1State;
let micWeek1Reconnect;
let micWeek1TimerLoop;

function createLocalMicWeek1State() {
  const empty={
    status:"waiting",
    activityIndex:0,
    revealResults:false,
    responseOpen:false,
    responseGeneration:0,
    activeResponseKey:"",
    statementIndex:0,
    battleRoundIndex:0,
    timer:{running:false,duration:5,endsAt:0},
    connected:{},
    responses:{
      wordcloud:[],findSomeone:[],listenDetective:[],opinion:[],
      postits:[],votes:[],battle:[],reflection:[]
    },
    participants:{},
    participantNotes:{},
    stepNotes:{},
    observations:[],
    updatedAt:Date.now()
  };
  try {
    const stored=JSON.parse(localStorage.getItem(`${STORAGE_KEY}-mic-week1`));
    return stored ? {...empty,...stored,responses:{...empty.responses,...stored.responses},stepNotes:stored.stepNotes||{}} : empty;
  } catch {
    return empty;
  }
}

function isMicOnWeek1() {
  return data.activeWorkshop==="story-school" && data.story?.currentWeek===0;
}

function micWeek1Role() {
  return launchMode==="screen" ? "screen" : launchMode==="participant" ? "participant" : "trainer";
}

function connectMicOnWeek1() {
  clearTimeout(micWeek1Reconnect);
  if (!("WebSocket" in window)) {
    micWeek1State ||= createLocalMicWeek1State();
    return;
  }
  if(!location.host) micWeek1State ||= createLocalMicWeek1State();
  const targetRoom=liveRoom(MIC_WEEK1_ROOM,data.activeWorkshop);
  if (micWeek1Socket && [WebSocket.OPEN,WebSocket.CONNECTING].includes(micWeek1Socket.readyState)&&micWeek1ConnectedRoom===targetRoom) return;
  if (micWeek1Socket && [WebSocket.OPEN,WebSocket.CONNECTING].includes(micWeek1Socket.readyState))micWeek1Socket.close();
  const networkUrl=new URL(location.host?location.href:getWorkshopNetworkBase());
  const protocol=networkUrl.protocol==="https:"?"wss":"ws";
  micWeek1Socket=new WebSocket(`${protocol}://${networkUrl.host}/ws`);
  micWeek1Socket.addEventListener("open",()=>{
    micWeek1ConnectedRoom=targetRoom;
    micWeek1Socket.send(JSON.stringify({type:"join",room:targetRoom,clientId:participantClientId,role:micWeek1Role(),name:getMicParticipantName()}));
  });
  micWeek1Socket.addEventListener("message",event=>{
    const message=JSON.parse(event.data);
    if(message.type==="submission-rejected"){toast("Deze antwoordronde is gesloten");return;}
    if(message.type!=="snapshot")return;
    micWeek1State=message.state;
    renderMicOnWeek1Live();
  });
  micWeek1Socket.addEventListener("close",()=>{
    micWeek1Socket=null;
    micWeek1ConnectedRoom="";
    micWeek1Reconnect=setTimeout(connectMicOnWeek1,1200);
  });
}

function micWeek1Action(action,payload={}) {
  if(micWeek1Socket?.readyState===WebSocket.OPEN) {
    const message=compatibleLiveMessage(action,payload,micWeek1State);
    micWeek1Socket.send(JSON.stringify({type:"action",...message}));
  } else if(!location.host) {
    applyLocalMicWeek1Action(action,payload);
    renderMicOnWeek1Live();
  } else {
    toast("De live sessie maakt opnieuw verbinding");
    connectMicOnWeek1();
  }
}

function applyLocalMicWeek1Action(action,payload) {
  micWeek1State ||= createLocalMicWeek1State();
  const state=micWeek1State;
  if(action==="control") Object.assign(state,payload);
  if(action==="open-response"){state.responseOpen=true;state.revealResults=false;state.responseGeneration=(state.responseGeneration||0)+1;state.activeResponseKey=payload.activity||"";}
  if(action==="close-response"||action==="timer-expired"){state.responseOpen=false;state.revealResults=payload.revealResults!==false;state.timer={running:false,duration:state.timer?.duration||5,endsAt:0};}
  if(action==="activity") {
    state.activityIndex=Math.max(0,Math.min(micWeek1Activities.length-1,Number(payload.index)||0));
    state.revealResults=false;
    state.responseOpen=false;
    state.timer={running:false,duration:5,endsAt:0};
  }
  if(action==="timer") {
    const duration=Math.max(1,Number(payload.duration)||5);
    state.timer={running:Boolean(payload.running),duration,endsAt:payload.running?Date.now()+duration*1000:0};
    state.responseOpen=Boolean(payload.running);
    state.revealResults=false;
  }
  if(action==="submit"&&state.responses[payload.activity]) {
    if(!state.responseOpen||(state.activeResponseKey&&state.activeResponseKey!==payload.activity))return;
    const list=state.responses[payload.activity];
    const value={...payload.value,generation:state.responseGeneration||0,name:getMicParticipantName(),clientId:participantClientId,sessionId:participantClientId,updatedAt:Date.now()};
    if(["opinion","battle"].includes(payload.activity)) {
      const questionIndex=value.questionIndex??value.statementIndex??0;
      const index=list.findIndex(item=>item.clientId===participantClientId&&item.generation===value.generation&&(item.questionIndex??item.statementIndex??0)===questionIndex);
      if(index>=0)list[index]=value;else list.push(value);
    } else {
      const index=list.findIndex(item=>item.clientId===participantClientId);
      if(index>=0)list[index]=value;else list.push(value);
    }
  }
  if(action==="participant-register") {
    state.participants ||= {};
    state.participants[participantClientId]={name:payload.name,registeredAt:Date.now(),online:true};
    state.connected[participantClientId]={role:"participant",name:payload.name,lastSeen:Date.now()};
  }
  if(action==="step-note") state.stepNotes[payload.stepId]={...payload};
  if(action==="participant-note") state.participantNotes[payload.clientId]=payload.text||"";
  if(action==="observation") state.observations.unshift({text:payload.text||"",createdAt:Date.now()});
  if(action==="postit-move") {
    const item=state.responses.postits.find(entry=>entry.id===payload.id);
    if(item)Object.assign(item,payload);
  }
  state.updatedAt=Date.now();
  localStorage.setItem(`${STORAGE_KEY}-mic-week1`,JSON.stringify(state));
}

function renderMicOnWeek1Live() {
  if(!isMicOnWeek1())return;
  if(document.getElementById("trainerView")?.classList.contains("active")) renderMicOnWeek1Trainer();
  if(document.getElementById("screenView")?.classList.contains("active")||launchMode==="screen") renderMicOnWeek1Screen();
  const focused=document.activeElement;
  const typing=focused&&["INPUT","TEXTAREA"].includes(focused.tagName)&&document.getElementById("participantApp")?.contains(focused);
  if(!typing&&(document.getElementById("participantView")?.classList.contains("active")||launchMode==="participant")) renderMicOnWeek1Participant(document.getElementById("participantApp"));
  startMicWeek1TimerLoop();
}

function micCurrentActivity() {
  return micWeek1Activities[micWeek1State?.activityIndex||0];
}

function micResponseKey(activity=micCurrentActivity()) {
  return activity?.responseKey || null;
}

function micActivityResponses(state,activity=micCurrentActivity()) {
  const key=micResponseKey(activity);
  return key ? state.responses[key] || [] : [];
}

function micParticipantCount() {
  if(!micWeek1State)return 0;
  return Object.values(micWeek1State.connected||{}).filter(item=>item.role==="participant").length;
}

function micRegisteredParticipants(state=micWeek1State) {
  return Object.entries(state?.participants||{}).map(([clientId,item])=>({clientId,...item}));
}

function renderMicOnWeek1Trainer() {
  if(!micWeek1State)return;
  const state=micWeek1State;
  const activity=micCurrentActivity();
  const responseCount=micActivityResponses(state,activity).length;
  const next=micWeek1Activities[state.activityIndex+1];
  const note=state.stepNotes?.[activity.id]?.text||"";
  document.getElementById("trainerView").classList.add("mic-director-mode");
  document.getElementById("stageCounter").textContent=`Week 1 · onderdeel ${state.activityIndex+1} van ${micWeek1Activities.length}`;
  document.getElementById("trainerModule").innerHTML=`
    <div class="mic-director">
      <header class="mic-director-head">
        <div><p class="eyebrow">Mic On | School Editie · Week 1</p><h2>Wie zijn wij?</h2></div>
        <div class="mic-session-status ${state.status}"><i></i>${state.status==="running"?"Live":state.status==="paused"?"Gepauzeerd":"Niet gestart"}</div>
      </header>
      <div class="mic-director-progress"><i style="width:${((state.activityIndex+1)/micWeek1Activities.length)*100}%"></i><span>${state.activityIndex+1}/${micWeek1Activities.length}</span></div>
      <div class="mic-director-grid">
        <section class="mic-director-panel mic-preview-panel">
          <div class="panel-label"><span>1</span> Presentatiescherm <small>Dit ziet de zaal</small></div>
          <div class="mic-trainer-preview">${renderMicSlideVisual(state,activity,true)}</div>
          <div class="mic-preview-actions"><button class="button light" id="micOpenScreen">Open beamer ↗</button><button class="button light" id="micFullscreen">Fullscreen</button></div>
        </section>
        <section class="mic-director-panel mic-script-panel">
          <div class="panel-label"><span>2</span> Trainerpaneel <small>Alleen voor jou</small></div>
          <p class="eyebrow">${activity.duration} minuten · ${escapeHtml(activity.short)}</p>
          <h3>${escapeHtml(activity.title)}</h3>
          <div class="mic-trainer-block"><strong>Doel</strong><p>${escapeHtml(activity.goal)}</p></div>
          <div class="mic-trainer-block"><strong>Wat zeg ik?</strong><p>${escapeHtml(activity.trainerText)}</p></div>
          ${activity.questions.length?`<div class="mic-trainer-block"><strong>Verdiepende vragen</strong><ul>${activity.questions.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`:""}
          <div class="mic-trainer-block warning"><strong>Let op</strong><p>${escapeHtml(activity.attention)}</p></div>
          <label class="mic-note-label">Notitie bij dit onderdeel<textarea id="micStepNote" placeholder="Automatisch gekoppeld aan workshop, week, groep en datum">${escapeHtml(note)}</textarea></label>
          <small id="micNoteStatus">Automatisch opslaan</small>
        </section>
        <aside class="mic-director-panel mic-action-panel">
          <div class="panel-label"><span>3</span> Activiteitenpaneel</div>
          <p class="eyebrow">Huidig onderdeel</p><h3>${state.activityIndex+1}. ${escapeHtml(activity.title)}</h3>
          <p class="mic-next-label">Hierna</p><strong class="mic-next-step">${next?`${state.activityIndex+2}. ${escapeHtml(next.title)}`:"Einde workshop"}</strong>
          <div class="mic-action-metric"><strong>${responseCount}</strong><span>${activity.results?"reacties ontvangen":"deelnemers verbonden: "+micParticipantCount()}</span></div>
          <div class="mic-name-list">${micRegisteredParticipants(state).slice(0,8).map(item=>`<span class="${item.online===false?"offline":""}">${escapeHtml(item.name)}</span>`).join("")||"<small>Nog niemand aangemeld</small>"}</div>
          ${activity.id==="opinion"?renderMicTimer(state):""}
          ${["opinion","opinion-talk"].includes(activity.id)?`<div class="mic-statement-picker compact-picker">${micOpinionStatements.map((item,index)=>`<button class="${index===state.statementIndex?"active":""}" data-mic-statement="${index}">${index+1}. ${escapeHtml(item)}</button>`).join("")}</div>`:""}
          ${activity.id==="topic-battle"?`<div class="mic-statement-picker compact-picker">${micBattleRounds.map((_,index)=>`<button class="${index===state.battleRoundIndex?"active":""}" data-mic-battle-round="${index}">Ronde ${index+1} · persoonlijke duels</button>`).join("")}</div>`:""}
          <button class="button dark full" id="micStartActivity">${activity.interactive?(state.responseOpen?"Opdracht actief":"Start opdracht"):(state.status==="running"?"Onderdeel actief":"Start onderdeel")}</button>
          ${activity.results?`<button class="button light full" id="micRevealResults">${state.revealResults?"Verberg resultaten":"Toon resultaten"}</button>`:""}
          ${["opinion","topic-battle"].includes(activity.id)?`<label class="mic-timer-choice">Antwoordtijd<select id="micTimerDuration"><option value="5">5 seconden</option><option value="10">10 seconden</option><option value="20">20 seconden</option><option value="30">30 seconden</option><option value="0">Handmatig sluiten</option></select></label><button class="button light full" id="micStartTimer">Start antwoordronde</button>`:""}
          ${activity.interactive&&state.responseOpen?`<button class="button light full" id="micCloseActivity">Sluit opdracht</button>`:""}
          <div class="mic-nav-buttons"><button class="button light" data-mic-activity-step="-1">← Vorige</button><button class="button dark" data-mic-activity-step="1">Volgende →</button></div>
          <p class="mic-key-help">Toetsen: ← vorige · → of spatie volgende · Esc sluit fullscreen</p>
          <div class="mic-network-card ${location.protocol==="file:"?"warning":""}"><strong>Deelnemerslink</strong><span>${escapeHtml(getParticipantUrlLabel())}</span><button id="micNetworkSettings">Netwerk instellen</button></div>
          <hr><button class="quick-action" id="micIndividualAnswers">Individuele antwoorden</button>
          <button class="quick-action" id="micParticipantNotes">Notities per deelnemer</button>
          <button class="quick-action" id="micObservation">Observatie opslaan</button>
          <button class="quick-action" id="micTestMode">Test live verbinding</button>
          <button class="quick-action" id="micExportPdf">PDF trainersverslag</button>
          <button class="quick-action" id="micExportExcel">Excel resultaten</button>
          <button class="quick-action" id="micExportTopics">Podcastonderwerpen</button>
        </aside>
      </div>
      <details class="mic-flow-overview"><summary>Bekijk alle 20 onderdelen</summary><div class="mic-activity-rail">${micWeek1Activities.map((item,index)=>`<button class="${index===state.activityIndex?"active":""}" data-mic-activity="${index}"><span>${index+1}</span><strong>${item.short}</strong></button>`).join("")}</div></details>
    </div>`;
  document.getElementById("slideSelector").innerHTML="";
  bindMicWeek1Trainer();
}

function renderMicTrainerActivity(state,activity) {
  const key=micResponseKey(activity);
  if(key==="opinion") return `<div class="mic-control-panel"><label>Stelling</label><div class="mic-statement-picker">${micOpinionStatements.map((item,index)=>`<button class="${index===state.statementIndex?"active":""}" data-mic-statement="${index}">${index+1}. ${item}</button>`).join("")}</div>
    ${renderMicOpinionResults(state)}<div class="mic-timer-admin">${renderMicTimer(state)}</div></div>`;
  if(key==="postits") return `<div class="mic-control-panel"><p class="label">Sleep onderwerpen naar een categorie</p>${renderMicPostitBoard(state,true)}</div>`;
  if(key==="votes") return `<div class="mic-control-panel">${renderMicTopicRanking(state)}</div>`;
  if(key==="battle") return `<div class="mic-control-panel">${renderMicBattleResults(state,true)}</div>`;
  if(key==="wordcloud") return renderMicWordcloud(state.responses.wordcloud);
  if(key==="reflection") return renderMicReflectionSummary(state.responses.reflection);
  return key?`<div class="mic-response-preview">${(state.responses[key]||[]).slice(-8).map(item=>`<article><strong>${escapeHtml(item.sessionId)}</strong><p>${escapeHtml(micResponseSummary(key,item))}</p></article>`).join("")||"<p>Nog geen reacties.</p>"}</div>`:"";
}

function renderMicSlideVisual(state,activity,compact=false) {
  const key=micResponseKey(activity);
  const statement=key==="opinion"?micOpinionStatements[state.statementIndex]:key==="battle"?"Iedere telefoon krijgt een ander duel.":activity.question;
  const content=(()=>{
    if(activity.interactive&&!state.revealResults) return `<div class="mic-slide-participate">${fakeQr()}<strong>Scan om mee te doen</strong><span>${escapeHtml(getParticipantUrlLabel())}</span><small>${micActivityResponses(state,activity).length} reacties ontvangen</small>${key==="opinion"?renderMicTimer(state):""}</div>`;
    if(activity.visual==="cover") return `<div class="mic-cover-mark"><span>SLINNVA PROFESSIONALS</span><strong>MIC<br>ON</strong><i></i><p>${escapeHtml(activity.subtitle)}</p></div>`;
    if(activity.visual==="route") return `<div class="mic-route-visual">${["Kennen","Luisteren","Kiezen","Opnemen"].map((item,index)=>`<span><b>0${index+1}</b>${item}</span>`).join("")}</div>`;
    if(activity.visual==="agreements") return `<div class="mic-agreement-cards">${["Luister uit","Verschillen mogen","Delen is vrijwillig"].map(item=>`<span>${item}</span>`).join("")}</div>`;
    if(activity.visual==="wordcloud" && state.revealResults) return renderMicWordcloud(state.responses.wordcloud);
    if(activity.visual==="opinion" && state.revealResults) return renderMicOpinionResults(state);
    if(activity.visual==="postits" && state.revealResults) return renderMicPostitBoard(state,false);
    if(activity.visual==="ranking" && state.revealResults) return renderMicTopicRanking(state);
    if(activity.visual==="battle") return state.revealResults?renderMicBattleResults(state):renderMicBattlePair(state);
    if(activity.visual==="listen") return `<div class="mic-duo-instruction"><article><b>A</b><strong>Praat</strong></article><article><b>B</b><strong>Luister</strong></article><i>Daarna wisselen</i></div>`;
    if(activity.visual==="break") return `<div class="mic-break-clock">10:00</div>`;
    if(activity.visual==="finish") return `<div class="mic-finish-wave"><i></i><i></i><i></i><i></i><i></i></div>`;
    return `<div class="mic-slide-object ${activity.visual||"microphone"}"><i></i><b></b><span></span></div>`;
  })();
  return `<div class="mic-slide-canvas ${compact?"compact":""} visual-${activity.visual||"default"}">
    <div class="mic-slide-brand">MIC ON <span>WEEK 1</span></div>
    <div class="mic-slide-copy"><p>${escapeHtml(activity.short)}</p><h1>${escapeHtml(statement)}</h1>${activity.subtitle?`<h2>${escapeHtml(activity.subtitle)}</h2>`:""}${activity.interactive&&!state.revealResults?`<small>Doe mee via je telefoon</small>`:""}</div>
    <div class="mic-slide-visual">${content}</div>
  </div>`;
}

function bindMicWeek1Trainer() {
  document.querySelectorAll("[data-mic-control]").forEach(button=>button.addEventListener("click",()=>micWeek1Action("control",{status:button.dataset.micControl})));
  document.querySelectorAll("[data-mic-activity]").forEach(button=>button.addEventListener("click",()=>micWeek1Action("activity",{index:Number(button.dataset.micActivity)})));
  document.querySelectorAll("[data-mic-activity-step]").forEach(button=>button.addEventListener("click",()=>micWeek1Action("activity",{index:(micWeek1State.activityIndex||0)+Number(button.dataset.micActivityStep)})));
  document.querySelectorAll("[data-mic-statement]").forEach(button=>button.addEventListener("click",()=>micWeek1Action("control",{statementIndex:Number(button.dataset.micStatement),revealResults:false})));
  document.querySelectorAll("[data-mic-battle-round]").forEach(button=>button.addEventListener("click",()=>micWeek1Action("control",{battleRoundIndex:Number(button.dataset.micBattleRound),revealResults:false,responseOpen:false})));
  document.getElementById("micRevealResults")?.addEventListener("click",()=>micWeek1Action(micWeek1State.revealResults?"control":"close-response",{revealResults:!micWeek1State.revealResults}));
  document.getElementById("micStartTimer")?.addEventListener("click",()=>{
    const duration=Number(document.getElementById("micTimerDuration")?.value||5);
    const activity=micCurrentActivity();
    const key=micResponseKey(activity);
    micWeek1Action("open-response",{activity:key});
    if(duration>0)micWeek1Action("timer",{running:true,duration});
  });
  document.getElementById("micStartActivity")?.addEventListener("click",()=>{
    const activity=micCurrentActivity();
    micWeek1Action("control",{status:"running",revealResults:false});
    if(activity.interactive)micWeek1Action("open-response",{activity:micResponseKey(activity)});
  });
  document.getElementById("micCloseActivity")?.addEventListener("click",()=>micWeek1Action("close-response",{revealResults:true}));
  document.getElementById("micOpenScreen")?.addEventListener("click",openPresentationWindow);
  document.getElementById("micFullscreen")?.addEventListener("click",()=>document.querySelector(".mic-trainer-preview")?.requestFullscreen?.());
  document.getElementById("micNetworkSettings")?.addEventListener("click",openWorkshopNetworkSettings);
  document.getElementById("micIndividualAnswers")?.addEventListener("click",openMicIndividualAnswers);
  document.getElementById("micParticipantNotes")?.addEventListener("click",openMicParticipantNotes);
  document.getElementById("micObservation")?.addEventListener("click",openMicObservation);
  document.getElementById("micTestMode")?.addEventListener("click",openLiveTestMode);
  document.getElementById("micExportPdf")?.addEventListener("click",exportMicWeek1Pdf);
  document.getElementById("micExportExcel")?.addEventListener("click",exportMicWeek1Excel);
  document.getElementById("micExportTopics")?.addEventListener("click",exportMicWeek1Topics);
  const note=document.getElementById("micStepNote");
  if(note) note.addEventListener("input",()=>{
    clearTimeout(window.micStepNoteTimer);
    const status=document.getElementById("micNoteStatus");
    if(status)status.textContent="Opslaan…";
    window.micStepNoteTimer=setTimeout(()=>{
      micWeek1Action("step-note",{
        stepId:micCurrentActivity().id,
        text:note.value,
        workshop:"Mic On | School Editie",
        week:1,
        group:data.story?.session?.audience||"Jongerengroep",
        date:new Date().toISOString()
      });
      if(status)status.textContent="Opgeslagen";
    },500);
  });
  document.querySelectorAll("[data-postit-id]").forEach(card=>{
    card.addEventListener("dragstart",event=>event.dataTransfer.setData("text/plain",card.dataset.postitId));
  });
  document.querySelectorAll("[data-postit-category]").forEach(column=>{
    column.addEventListener("dragover",event=>event.preventDefault());
    column.addEventListener("drop",event=>{
      event.preventDefault();
      micWeek1Action("postit-move",{id:event.dataTransfer.getData("text/plain"),category:column.dataset.postitCategory});
    });
  });
}

function openWorkshopNetworkSettings() {
  const current=(localStorage.getItem("slinnva-workshop-host")||DEFAULT_WORKSHOP_HOST).replace(/^https?:\/\//,"").replace(/:.*/,"");
  openModal(`<p class="eyebrow">QR-verbinding</p><h2>Deelnemers laten verbinden</h2>
    <div class="network-explanation"><strong>Belangrijk</strong><p>Start eerst <b>Start Workshopplatform.command</b> vanuit de workshopmap. Laptop en telefoons moeten met hetzelfde wifi-netwerk verbonden zijn.</p></div>
    <div class="field"><label>Netwerkadres van deze laptop</label><input id="workshopNetworkHost" value="${escapeHtml(current)}" placeholder="Bijvoorbeeld 192.168.2.25"></div>
    <p class="network-preview">De QR-code opent: <strong id="workshopNetworkPreview">${escapeHtml(getParticipantUrlLabel())}</strong></p>
    <button class="button dark" id="saveWorkshopNetwork">Adres opslaan</button>`);
  document.getElementById("workshopNetworkHost")?.addEventListener("input",event=>{
    const host=event.target.value.trim().replace(/^https?:\/\//,"").replace(/\/.*$/,"");
    document.getElementById("workshopNetworkPreview").textContent=`${host}:4173/?mode=participant&workshop=${data.activeWorkshop}`;
  });
  document.getElementById("saveWorkshopNetwork")?.addEventListener("click",()=>{
    const host=valueOf("workshopNetworkHost").replace(/^https?:\/\//,"").replace(/\/.*$/,"");
    if(!host)return;
    localStorage.setItem("slinnva-workshop-host",host);
    closeModal();
    renderTrainer();
    renderScreen();
    toast("QR-adres bijgewerkt");
  });
}

function renderMicOnWeek1Participant(app) {
  if(!micWeek1State) {
    app.innerHTML=participantMessage("⌁","Verbinding maken...","De live workshopsessie wordt geopend.");
    return;
  }
  const state=micWeek1State;
  const participantName=getMicParticipantName();
  if(!participantName) {
    app.innerHTML=`<div class="mobile-content mic-register">
      <div class="mobile-logo">MIC ON</div>
      <p class="eyebrow">Welkom bij Week 1</p>
      <h2>Hoe mogen we je noemen?</h2>
      <p>Vul je voornaam in. De trainer kan zien wie verbonden is. Jouw antwoorden worden op het presentatiescherm altijd anoniem getoond.</p>
      <form id="micParticipantRegistration">
        <div class="field"><label for="micParticipantName">Voornaam</label><input id="micParticipantName" maxlength="80" autocomplete="given-name" placeholder="Jouw voornaam" required></div>
        <button class="mobile-button" type="submit">Meedoen met Mic On</button>
      </form>
      <div class="privacy-note mic-privacy"><span>✓</span><p><strong>Privacy</strong><br>Andere deelnemers zien nooit wie welk antwoord heeft gegeven.</p></div>
    </div>`;
    document.getElementById("micParticipantRegistration")?.addEventListener("submit",event=>{
      event.preventDefault();
      const name=valueOf("micParticipantName");
      if(!name) {
        document.getElementById("micParticipantName")?.focus();
        return;
      }
      sessionStorage.setItem("slinnva-mic-participant-name",name);
      sessionStorage.setItem("slinnva-participant-name",name);
      micWeek1Action("participant-register",{name});
      renderMicOnWeek1Participant(app);
    });
    return;
  }
  if(state.status==="waiting") {
    app.innerHTML=participantMessage("MIC",`Welkom, ${escapeHtml(participantName)}.`,`Je bent aangemeld. Wacht tot de trainer de eerste opdracht opent.`);
    return;
  }
  if(state.status==="paused") {
    app.innerHTML=participantMessage("Ⅱ","Even pauze.","Wacht op het volgende teken van de trainer.");
    return;
  }
  const activity=micCurrentActivity();
  const key=micResponseKey(activity);
  if(!activity.interactive) {
    app.innerHTML=`<div class="mobile-content mic-week1-mobile mic-room-mode">
      <div class="mobile-logo">MIC ON</div>
      <div class="mic-mobile-progress"><i style="width:${((state.activityIndex+1)/micWeek1Activities.length)*100}%"></i></div>
      <p class="eyebrow">Week 1 · ${state.activityIndex+1}/${micWeek1Activities.length}</p>
      <span class="mic-room-icon">○</span><h3>${escapeHtml(participantName)}, doe mee in de zaal.</h3>
      <p>${escapeHtml(activity.instructions)}</p><small>Je telefoon mag even weg. De trainer opent de volgende opdracht wanneer die klaarstaat.</small>
    </div>`;
    return;
  }
  if(!state.responseOpen) {
    app.innerHTML=participantMessage("…","Wacht op de trainer.",state.revealResults?"De resultaten worden nu in de zaal besproken.":"De opdracht staat klaar, maar is nog niet geopend.");
    return;
  }
  const questionIndex=key==="opinion"?state.statementIndex:key==="battle"?state.battleRoundIndex:0;
  const done=(state.responses[key]||[]).some(item=>item.clientId===participantClientId&&item.generation===(state.responseGeneration||0)&&(item.questionIndex??item.statementIndex??0)===questionIndex);
  if(done&&key!=="votes") {
    app.innerHTML=participantMessage("✓","Antwoord ontvangen.","Je antwoord blijft anoniem voor de groep. Wacht op de volgende activiteit.");
    return;
  }
  app.innerHTML=`<div class="mobile-content mic-week1-mobile">
    <div class="mobile-logo">MIC ON</div>
    <div class="mic-mobile-progress"><i style="width:${((state.activityIndex+1)/micWeek1Activities.length)*100}%"></i></div>
    <p class="eyebrow">Week 1 · ${state.activityIndex+1}/${micWeek1Activities.length}</p>
    <h3>${escapeHtml(activity.title)}</h3><p>${escapeHtml(key==="opinion"?micOpinionStatements[state.statementIndex]:key==="battle"?"Kies het onderwerp dat jij verder wilt bespreken.":activity.question)}</p>
    ${renderMicParticipantActivity(state,activity)}
    <small class="session-id">${escapeHtml(participantName)} · sessie ${escapeHtml(participantClientId.slice(-8))}</small>
  </div>`;
  bindMicWeek1Participant(activity);
}

function renderMicParticipantActivity(state,activity) {
  const key=micResponseKey(activity);
  if(key==="wordcloud") return `<div class="field"><label>Mijn woord</label><input id="micWord" maxlength="30" autocomplete="off"></div><button class="mobile-button" data-mic-submit="wordcloud">Versturen</button>`;
  if(key==="findSomeone") return `<div class="mic-find-list">${micFindPrompts.map((prompt,index)=>`<label><span>${escapeHtml(prompt)}</span><input data-find-person="${index}" placeholder="Voornaam"></label>`).join("")}</div><button class="mobile-button" data-mic-submit="findSomeone">Werkblad opslaan</button>`;
  if(key==="listenDetective") return `<div class="mic-instruction"><strong>90 seconden</strong><p>Persoon A praat. Persoon B luistert zonder te onderbreken. Daarna wisselen.</p></div>
    ${[["micRemembered","Wat heb je onthouden?"],["micDifficult","Wat was lastig?"],["micLearned","Wat heb je geleerd?"]].map(([id,label])=>`<div class="field"><label>${label}</label><textarea id="${id}"></textarea></div>`).join("")}
    <button class="mobile-button" data-mic-submit="listenDetective">Reflectie versturen</button>`;
  if(key==="opinion") {
    const remaining=micTimerRemaining(state);
    return `<div class="mic-phone-timer">${remaining>0?remaining:"Kies nu"}</div><p class="mic-statement">${escapeHtml(micOpinionStatements[state.statementIndex])}</p>
      <div class="mic-opinion-buttons">${micOpinionChoices.map((choice,index)=>`<button data-opinion-choice="${index}">${choice}</button>`).join("")}</div>`;
  }
  if(key==="postits") return `<div class="field"><label>Categorie</label><select id="micPostitCategory">${micPostitCategories.map(item=>`<option>${item}</option>`).join("")}</select></div>
    <div class="field"><label>Onderwerp</label><textarea id="micPostitText" maxlength="120"></textarea></div><button class="mobile-button" data-mic-submit="postits">Post-it plaatsen</button>`;
  if(key==="votes") return renderMicParticipantVoting(state);
  if(key==="battle") {
    const pair=getMicParticipantBattlePair(state);
    return `<div class="mic-battle-phone"><button data-mic-battle-choice="0">${escapeHtml(pair[0])}</button><strong>VS</strong><button data-mic-battle-choice="1">${escapeHtml(pair[1])}</button></div>`;
  }
  if(key==="reflection") return `<div class="field"><label>Wat vond je leuk?</label><textarea id="micFun"></textarea></div>
    <div class="field"><label>Wat heb je geleerd?</label><textarea id="micReflectionLearned"></textarea></div>
    <div class="field"><label>Waar wil je meer over leren?</label><textarea id="micMore"></textarea></div>
    <label>Hoe voelde je je vandaag?</label><div class="mic-emoji-scale">${["😟","😐","🙂","😊","🤩"].map((emoji,index)=>`<button data-mic-emoji="${index+1}">${emoji}</button>`).join("")}</div>
    <button class="mobile-button" data-mic-submit="reflection">Reflectie versturen</button>`;
  return `<div class="mic-instruction"><strong>Doe mee in de zaal</strong><p>${escapeHtml(activity.instructions)}</p></div>`;
}

function bindMicWeek1Participant(activity) {
  document.querySelector("[data-mic-submit='wordcloud']")?.addEventListener("click",()=>submitMicWeek1("wordcloud",{value:valueOf("micWord").toLowerCase()}));
  document.querySelector("[data-mic-submit='findSomeone']")?.addEventListener("click",()=>{
    const entries=[...document.querySelectorAll("[data-find-person]")].map((input,index)=>({prompt:micFindPrompts[index],name:input.value.trim()}));
    submitMicWeek1("findSomeone",{entries});
  });
  document.querySelector("[data-mic-submit='listenDetective']")?.addEventListener("click",()=>submitMicWeek1("listenDetective",{remembered:valueOf("micRemembered"),difficult:valueOf("micDifficult"),learned:valueOf("micLearned")}));
  document.querySelectorAll("[data-opinion-choice]").forEach(button=>button.addEventListener("click",()=>submitMicWeek1("opinion",{statementIndex:micWeek1State.statementIndex,choice:Number(button.dataset.opinionChoice)})));
  document.querySelectorAll("[data-mic-battle-choice]").forEach(button=>button.addEventListener("click",()=>{
    const pair=getMicParticipantBattlePair(micWeek1State);
    const choice=Number(button.dataset.micBattleChoice);
    submitMicWeek1("battle",{questionIndex:micWeek1State.battleRoundIndex,choice,pair,selectedTopic:pair[choice]});
  }));
  document.querySelector("[data-mic-submit='postits']")?.addEventListener("click",()=>submitMicWeek1("postits",{id:`postit-${participantClientId}-${Date.now()}`,category:document.getElementById("micPostitCategory").value,text:valueOf("micPostitText")}));
  document.querySelectorAll("[data-vote-topic]").forEach(button=>button.addEventListener("click",()=>updateMicVote(button.dataset.voteTopic,Number(button.dataset.voteDelta))));
  document.getElementById("submitMicVotes")?.addEventListener("click",()=>submitMicWeek1("votes",{allocations:micVoteDraft()}));
  document.querySelectorAll("[data-mic-emoji]").forEach(button=>button.addEventListener("click",()=>{
    document.querySelectorAll("[data-mic-emoji]").forEach(item=>item.classList.toggle("selected",item===button));
  }));
  document.querySelector("[data-mic-submit='reflection']")?.addEventListener("click",()=>{
    const emoji=Number(document.querySelector("[data-mic-emoji].selected")?.dataset.micEmoji||0);
    submitMicWeek1("reflection",{fun:valueOf("micFun"),learned:valueOf("micReflectionLearned"),more:valueOf("micMore"),emoji});
  });
}

function submitMicWeek1(activity,value) {
  if(!value||Object.values(value).every(item=>item===""||item==null))return;
  micWeek1Action("submit",{activity,value:{...value,name:getMicParticipantName()}});
}

function renderMicOnWeek1Screen() {
  if(!micWeek1State)return;
  const state=micWeek1State;
  const activity=micCurrentActivity();
  document.getElementById("screenParticipants").textContent=micParticipantCount();
  document.getElementById("screenProgress").textContent=`${state.activityIndex+1} / ${micWeek1Activities.length}`;
  document.getElementById("presentationProgressBar").style.width=`${((state.activityIndex+1)/micWeek1Activities.length)*100}%`;
  const publicScreen=document.getElementById("publicScreen");
  publicScreen.dataset.theme="story";
  publicScreen.dataset.edition="school";
  if(state.status!=="running" && state.status!=="waiting") {
    publicScreen.innerHTML=`<div class="podcast-studio school-studio">${storyEditionDecor("school")}<div class="mic-wait-screen"><p class="eyebrow">Mic On | School Editie</p><h1>${state.status==="paused"?"Even pauze":"Wie zijn wij?"}</h1><p>${state.status==="paused"?"We gaan zo verder.":"Scan de QR-code en wacht op de trainer."}</p>${fakeQr()}</div></div>`;
    return;
  }
  publicScreen.innerHTML=renderMicSlideVisual(state,activity,false);
  startMicWeek1TimerLoop();
}

function renderMicScreenActivity(state,activity) {
  const key=micResponseKey(activity);
  if(!key)return "";
  if(!state.revealResults&&activity.results) return `<div class="mic-screen-prompt">${fakeQr()}<strong>Doe mee op je telefoon</strong><span>${micActivityResponses(state,activity).length} reacties ontvangen</span>${key==="opinion"?renderMicTimer(state):""}</div>`;
  if(key==="wordcloud") return renderMicWordcloud(state.responses.wordcloud);
  if(key==="opinion") return `${renderMicTimer(state)}${renderMicOpinionResults(state)}`;
  if(key==="postits") return renderMicPostitBoard(state,false);
  if(key==="votes") return renderMicTopicRanking(state);
  if(key==="reflection") return renderMicReflectionSummary(state.responses.reflection);
  if(key==="battle") return state.revealResults?renderMicBattleResults(state):renderMicBattlePair(state);
  if(key==="listenDetective") return `<div class="mic-duo-instruction"><article><b>A</b><strong>Praat 90 seconden</strong></article><article><b>B</b><strong>Luister zonder onderbreken</strong></article><i>Daarna wisselen</i></div>`;
  return `<div class="mic-screen-prompt">${fakeQr()}<strong>Vul de opdracht in</strong><span>${micActivityResponses(state,activity).length} deelnemers klaar</span></div>`;
}

function renderMicWordcloud(items=[]) {
  const counts={};
  items.forEach(item=>{const word=(item.value||"").trim();if(word)counts[word]=(counts[word]||0)+1;});
  const entries=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  return `<div class="mic-live-wordcloud">${entries.length?entries.map(([word,count],index)=>`<span style="--weight:${Math.min(3.2,1+count*.45)};--turn:${(index%5-2)*2}deg">${escapeHtml(word)}</span>`).join(""):"<p>De eerste woorden verschijnen hier.</p>"}</div>`;
}

function opinionEntriesForCurrent(state) {
  return (state.responses.opinion||[]).filter(item=>item.statementIndex===state.statementIndex);
}

function renderMicOpinionResults(state) {
  const entries=opinionEntriesForCurrent(state);
  const total=entries.length;
  return `<div class="mic-opinion-chart">${micOpinionChoices.map((choice,index)=>{
    const count=entries.filter(item=>item.choice===index).length;
    const percent=total?Math.round(count/total*100):0;
    return `<article><div><strong>${choice}</strong><span>${count} stem${count===1?"":"men"} · ${percent}%</span></div><i style="width:${percent}%"></i></article>`;
  }).join("")}</div>`;
}

function renderMicBattlePair(state) {
  return `<div class="mic-battle-pair personal-battle"><article><span>A</span><strong>Persoonlijk onderwerp</strong></article><b>VS</b><article><span>B</span><strong>Persoonlijk onderwerp</strong></article><small>Iedere deelnemer ziet een andere combinatie op de telefoon.</small></div>`;
}

function micBattleRanking(state=micWeek1State) {
  const totals={};
  (state?.responses?.battle||[]).forEach(item=>{
    const topic=item.selectedTopic||item.pair?.[item.choice]||micBattleRounds[item.questionIndex]?.[item.choice];
    if(topic)totals[topic]=(totals[topic]||0)+1;
  });
  return Object.entries(totals).map(([topic,votes])=>({topic,votes})).sort((a,b)=>b.votes-a.votes);
}

function renderMicBattleResults(state,showTopFive=false) {
  const round=state.battleRoundIndex||0;
  const entries=(state.responses.battle||[]).filter(item=>item.questionIndex===round);
  const total=entries.length;
  const roundTotals={};
  entries.forEach(item=>{
    const topic=item.selectedTopic||item.pair?.[item.choice]||micBattleRounds[item.questionIndex]?.[item.choice];
    if(topic)roundTotals[topic]=(roundTotals[topic]||0)+1;
  });
  const roundCards=Object.entries(roundTotals).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([topic,count],index)=>{
    const percent=total?Math.round(count/total*100):0;
    return `<article class="${index===0&&total?"winner":""}"><strong>${escapeHtml(topic)}</strong><span>${count} stemmen · ${percent}%</span><i style="width:${percent}%"></i></article>`;
  }).join("");
  const ranking=micBattleRanking(state).slice(0,5);
  return `<div class="mic-battle-results">${roundCards||"<p>De persoonlijke duels zijn gestart. De eerste keuzes verschijnen hier.</p>"}${showTopFive||round===micBattleRounds.length-1?`<h3>Top 5 onderwerpen</h3><ol>${ranking.map(item=>`<li><strong>${escapeHtml(item.topic)}</strong><span>${item.votes} stemmen</span></li>`).join("")||"<li>Nog geen stemmen</li>"}</ol>`:""}</div>`;
}

function micTimerRemaining(state=micWeek1State) {
  if(!state?.timer?.running)return 0;
  return Math.max(0,Math.ceil((state.timer.endsAt-Date.now())/1000));
}

function renderMicTimer(state) {
  const remaining=micTimerRemaining(state);
  return `<div class="mic-countdown ${remaining<=2&&remaining>0?"urgent":""}">${remaining||0}</div>`;
}

function startMicWeek1TimerLoop() {
  clearInterval(micWeek1TimerLoop);
  if(!micWeek1State?.timer?.running)return;
  micWeek1TimerLoop=setInterval(()=>{
    const remaining=micTimerRemaining();
    document.querySelectorAll(".mic-countdown,.mic-phone-timer").forEach(item=>item.textContent=remaining);
    if(remaining<=0) {
      clearInterval(micWeek1TimerLoop);
      if(micWeek1Role()==="trainer") micWeek1Action("timer-expired",{});
    }
  },250);
}

function renderMicPostitBoard(state,draggable) {
  const items=state.responses.postits||[];
  return `<div class="mic-postit-board">${micPostitCategories.map(category=>`<section data-postit-category="${escapeHtml(category)}"><h4>${category}</h4>${items.filter(item=>item.category===category).map((item,index)=>`<article ${draggable?'draggable="true"':""} data-postit-id="${item.id}" style="--r:${(index%5-2)*2}deg">${escapeHtml(item.text)}</article>`).join("")}</section>`).join("")}</div>`;
}

function micTopicTotals(state=micWeek1State) {
  const topics=state?.responses?.postits||[];
  const totals={};
  (state?.responses?.votes||[]).forEach(item=>Object.entries(item.allocations||{}).forEach(([id,count])=>totals[id]=(totals[id]||0)+Number(count)));
  return topics.map(topic=>({...topic,votes:totals[topic.id]||0})).sort((a,b)=>b.votes-a.votes);
}

function renderMicTopicRanking(state) {
  return `<div class="mic-topic-ranking">${micTopicTotals(state).slice(0,10).map((topic,index)=>`<article><b>${index+1}</b><strong>${escapeHtml(topic.text)}</strong><span>${topic.votes} stem${topic.votes===1?"":"men"}</span><i style="width:${Math.min(100,topic.votes*12)}%"></i></article>`).join("")||"<p>Voeg eerst onderwerpen toe bij activiteit 5.</p>"}</div>`;
}

function renderMicParticipantVoting(state) {
  const saved=(state.responses.votes||[]).find(item=>item.clientId===participantClientId)?.allocations||{};
  return `<div class="mic-vote-counter">Nog te verdelen: <strong id="micVotesLeft">${Math.max(0,3-Object.values(saved).reduce((sum,value)=>sum+Number(value),0))}</strong></div>
    <div class="mic-topic-votes">${micTopicTotals(state).map(topic=>`<article data-vote-row="${topic.id}"><strong>${escapeHtml(topic.text)}</strong><div><button data-vote-topic="${topic.id}" data-vote-delta="-1">−</button><span>${saved[topic.id]||0}</span><button data-vote-topic="${topic.id}" data-vote-delta="1">+</button></div></article>`).join("")}</div>
    <button class="mobile-button" id="submitMicVotes">Stemmen opslaan</button>`;
}

function micVoteDraft() {
  const allocations={};
  document.querySelectorAll("[data-vote-row]").forEach(row=>{
    const count=Number(row.querySelector("span").textContent);
    if(count)allocations[row.dataset.voteRow]=count;
  });
  return allocations;
}

function updateMicVote(topicId,delta) {
  const row=document.querySelector(`[data-vote-row="${CSS.escape(topicId)}"]`);
  if(!row)return;
  const span=row.querySelector("span");
  const current=Number(span.textContent);
  const total=Object.values(micVoteDraft()).reduce((sum,value)=>sum+Number(value),0);
  if(delta>0&&total>=3)return;
  span.textContent=Math.max(0,current+delta);
  document.getElementById("micVotesLeft").textContent=Math.max(0,3-Object.values(micVoteDraft()).reduce((sum,value)=>sum+Number(value),0));
}

function renderMicReflectionSummary(items=[]) {
  const valid=items.filter(item=>item.emoji);
  const average=valid.length?(valid.reduce((sum,item)=>sum+item.emoji,0)/valid.length).toFixed(1):"–";
  return `<div class="mic-reflection-summary"><div><strong>${average}</strong><span>gemiddeld gevoel / 5</span></div><div class="mic-emoji-results">${[1,2,3,4,5].map((value,index)=>`<article><b>${["😟","😐","🙂","😊","🤩"][index]}</b><span>${valid.filter(item=>item.emoji===value).length}</span></article>`).join("")}</div></div>`;
}

function micResponseSummary(activity,item) {
  if(activity==="findSomeone")return (item.entries||[]).filter(entry=>entry.name).map(entry=>`${entry.prompt}: ${entry.name}`).join(" · ");
  if(activity==="listenDetective")return `${item.remembered||""} ${item.learned||""}`.trim();
  return item.value||item.text||"Ingevuld";
}

function allMicResponses() {
  return Object.entries(micWeek1State?.responses||{}).flatMap(([activity,items])=>items.map(item=>({activity,...item})));
}

function openMicIndividualAnswers() {
  const rows=allMicResponses();
  openModal(`<p class="eyebrow">Alleen zichtbaar voor trainer</p><h2>Individuele antwoorden</h2><div class="mic-individual-list">${rows.map(item=>`<article><strong>${escapeHtml(item.name||micWeek1State.participants?.[item.clientId]?.name||"Deelnemer")}</strong><span>${escapeHtml(item.activity)}</span><p>${escapeHtml(micResponseSummary(item.activity,item))}</p><small>Sessie ${escapeHtml((item.sessionId||item.clientId).slice(-8))}</small></article>`).join("")||"<p>Nog geen antwoorden.</p>"}</div>`);
}

function openMicParticipantNotes() {
  const participants=micRegisteredParticipants();
  openModal(`<p class="eyebrow">Alleen zichtbaar voor trainer</p><h2>Notities per deelnemer</h2>${participants.map(item=>`<div class="field"><label>${escapeHtml(item.name)} <small>· ${escapeHtml(item.clientId.slice(-8))}</small></label><textarea data-participant-note="${item.clientId}">${escapeHtml(micWeek1State.participantNotes?.[item.clientId]||"")}</textarea></div>`).join("")||"<p>Nog niemand aangemeld.</p>"}<button class="button dark" id="saveMicParticipantNotes">Notities opslaan</button>`);
  document.getElementById("saveMicParticipantNotes")?.addEventListener("click",()=>{
    document.querySelectorAll("[data-participant-note]").forEach(input=>micWeek1Action("participant-note",{clientId:input.dataset.participantNote,text:input.value.trim()}));
    closeModal();
  });
}

function openMicObservation() {
  openModal(`<p class="eyebrow">Trainerobservatie</p><h2>Wat valt je op?</h2><textarea class="note-area" id="micObservationText"></textarea><button class="button dark" id="saveMicObservation">Opslaan</button>`);
  document.getElementById("saveMicObservation")?.addEventListener("click",()=>{
    const text=valueOf("micObservationText");if(!text)return;
    micWeek1Action("observation",{text});closeModal();
  });
}

function downloadMicFile(name,content,type="text/plain;charset=utf-8") {
  const blob=new Blob([content],{type});
  const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download=name;link.click();URL.revokeObjectURL(link.href);
}

function exportMicWeek1Excel() {
  const rows=[["Activiteit","Naam","Sessie-ID","Antwoord"]];
  allMicResponses().forEach(item=>rows.push([item.activity,item.name||micWeek1State.participants?.[item.clientId]?.name||"Deelnemer",item.sessionId||item.clientId,micResponseSummary(item.activity,item)]));
  Object.values(micWeek1State?.stepNotes||{}).forEach(note=>rows.push([`Trainernotitie · ${note.stepId}`,"",note.group||"",note.text||""]));
  downloadMicFile("mic-on-week-1-resultaten.csv",rows.map(row=>row.map(value=>`"${String(value||"").replace(/"/g,'""')}"`).join(";")).join("\n"),"text/csv;charset=utf-8");
}

function exportMicWeek1Topics() {
  const rows=[["Rang","Onderwerp","Categorie","Stemmen"],...micTopicTotals().map((item,index)=>[index+1,item.text,item.category,item.votes])];
  downloadMicFile("mic-on-podcastonderwerpen.csv",rows.map(row=>row.map(value=>`"${String(value||"").replace(/"/g,'""')}"`).join(";")).join("\n"),"text/csv;charset=utf-8");
}

function exportMicWeek1Pdf() {
  const report=window.open("","mic-on-week1-rapport");
  if(!report)return toast("Sta pop-ups toe voor de PDF-export");
  report.document.write(`<!doctype html><html lang="nl"><meta charset="utf-8"><title>Mic On Week 1</title><style>body{font-family:Arial;margin:45px;color:#1a1a1a}h1,h2{font-family:Georgia;color:#755c48}table{width:100%;border-collapse:collapse}td,th{padding:9px;border-bottom:1px solid #ddd;text-align:left}small{color:#777}.note{padding:12px;margin:8px 0;background:#f2eee9}@media print{button{display:none}}</style><h1>Mic On | School Editie</h1><h2>Week 1 · Wie zijn wij?</h2><p>${allMicResponses().length} antwoorden · ${micParticipantCount()} verbonden</p><table><thead><tr><th>Activiteit</th><th>Naam</th><th>Sessie</th><th>Antwoord</th></tr></thead><tbody>${allMicResponses().map(item=>`<tr><td>${escapeHtml(item.activity)}</td><td>${escapeHtml(item.name||micWeek1State.participants?.[item.clientId]?.name||"Deelnemer")}</td><td>${escapeHtml((item.sessionId||item.clientId).slice(-8))}</td><td>${escapeHtml(micResponseSummary(item.activity,item))}</td></tr>`).join("")}</tbody></table><h2>Notities per onderdeel</h2>${Object.values(micWeek1State.stepNotes||{}).map(note=>`<div class="note"><strong>${escapeHtml(note.stepId)}</strong><p>${escapeHtml(note.text)}</p><small>${escapeHtml(note.group||"")} · ${new Date(note.date).toLocaleString("nl-NL")}</small></div>`).join("")||"<p>Geen notities.</p>"}<h2>Observaties</h2>${(micWeek1State.observations||[]).map(item=>`<p>${escapeHtml(item.text)}</p>`).join("")}<button onclick="print()">Opslaan als PDF</button>`);
  report.document.close();
}

let libraryFilter="Alles";
let libraryQuery="";

function getLibraryMaterials() {
  const talentMaterials=[
    {id:"talent-cards",workshop:"Van Talent naar Toekomst",week:"Week 1",type:"Printmateriaal",title:"Talentkaarten",description:"Losse kaarten om talenten te herkennen en bespreekbaar te maken.",fields:talentCards},
    {id:"talent-bingo",workshop:"Van Talent naar Toekomst",week:"Week 1",type:"Spelmateriaal",title:"Talenten Bingo",description:"Kennismakingsbingo met talenten en ervaringen.",fields:["Goed luisteren","Graag dingen maken","Goed met kinderen","Mensen laten lachen","Rustig blijven bij stress","Graag helpen","Creatief zijn","Goed plannen","Sportief zijn","Graag leren"]},
    {id:"talent-mirror",workshop:"Van Talent naar Toekomst",week:"Week 1",type:"Werkblad",title:"Talent Spiegel",description:"Positieve kwaliteiten verzamelen die anderen bij de deelnemer zien.",fields:["Deze kwaliteit zie ik bij jou","Dit gedrag laat dat zien","Deze kwaliteit verraste mij","Dit wil ik verder ontwikkelen"]},
    {id:"talent-proud",workshop:"Van Talent naar Toekomst",week:"Week 1",type:"Reflectieformulier",title:"Mijn Trots Moment",description:"Een ervaring koppelen aan gebruikte kwaliteiten.",fields:["Wat deed je?","Wat ging goed?","Welke kwaliteit gebruikte je?","Wat zegt dit over jou?"]},
    {id:"talent-possibilities",workshop:"Van Talent naar Toekomst",week:"Week 2",type:"Werkblad",title:"Mijn mogelijkheden top 3",description:"Interesses en mogelijke routes naast elkaar zetten.",fields:["Hier krijg ik energie van","Mogelijkheid 1","Mogelijkheid 2","Mogelijkheid 3","Dit wil ik als eerste onderzoeken"]},
    {id:"talent-future-path",workshop:"Van Talent naar Toekomst",week:"Week 3",type:"Werkblad",title:"Mijn Toekomstpad",description:"Van wens naar kleine haalbare stappen.",fields:["Vandaag","Deze week","Deze maand","Binnen drie maanden","Later","Wie kan mij helpen?"]},
    {id:"talent-plan",workshop:"Van Talent naar Toekomst",week:"Week 4",type:"Werkblad",title:"Talent naar Toekomst Plan",description:"Het persoonlijke eindproduct van het traject.",fields:["Mijn talenten zijn","Mijn kwaliteiten zijn","Ik krijg energie van","Dit past misschien bij mij","Mijn top 3 mogelijkheden","Mensen of plekken die mij helpen","Mijn eerste stap","Wanneer zet ik die stap?"]},
    {id:"talent-pitch",workshop:"Van Talent naar Toekomst",week:"Week 4",type:"Oefenblad",title:"Mijn Toekomst Pitch",description:"Kort en krachtig vertellen wie je bent en wat je volgende stap is.",fields:["Dit ben ik","Dit kan ik","Dit wil ik ontdekken","Dit is mijn eerste stap"]}
  ];
  const wegwijsMaterials=[
    {id:"wegwijs-week-1-route",workshop:"Samen Wegwijs in Nederland",week:"Week 1",type:"Werkblad",title:"Waar moet je zijn?",description:"Praktische routekaart voor gemeente, DigiD, MijnOverheid en hulp vragen.",fields:["Mijn vraag of situatie","Welke instantie past hierbij?","Wat neem ik mee?","Wie kan mij helpen?","Mijn eerste stap"]},
    {id:"wegwijs-instantie-estafette",workshop:"Samen Wegwijs in Nederland",week:"Week 1",type:"Spelmateriaal",title:"Instantie Estafette",description:"Uitknipkaarten om situaties aan passende instanties te koppelen.",fields:["Paspoort kwijt · Gemeente","Verhuizen · Gemeente","Belastingbrief · Belastingdienst","Zorgverzekering · Zorgverzekeraar","Werk zoeken · UWV","Geldzorgen · Sociaal wijkteam","Huurwoning · Woningcorporatie","Brief niet begrijpen · Buurthuis of sociaal loket"]},
    {id:"wegwijs-week-2-post",workshop:"Samen Wegwijs in Nederland",week:"Week 2",type:"Werkblad",title:"Brief stap voor stap",description:"Rustig bekijken wat een brief vraagt en wanneer actie nodig is.",fields:["Wie is de afzender?","Wat is de datum?","Wat wordt van mij gevraagd?","Voor wanneer moet ik reageren?","Waar kan ik hulp vragen?"]},
    {id:"wegwijs-week-2-budget",workshop:"Samen Wegwijs in Nederland",week:"Week 2",type:"Spelmateriaal",title:"Budgetspel €1.000",description:"Keuzekaarten voor vaste lasten, boodschappen, reizen, sparen en onverwachte kosten.",fields:["Huur","Zorgverzekering","Telefoon","Boodschappen","Reizen","Sparen","Vrije tijd","Onverwachte rekening"]},
    {id:"wegwijs-week-3-route",workshop:"Samen Wegwijs in Nederland",week:"Week 3",type:"Werkblad",title:"Wonen, zorg en werk",description:"Actiekaart om een praktische situatie, route en hulporganisatie vast te leggen.",fields:["Mijn situatie","Is het spoed?","Wie bel of bezoek ik eerst?","Welke informatie heb ik nodig?","Mijn volgende stap"]},
    {id:"wegwijs-week-4-plan",workshop:"Samen Wegwijs in Nederland",week:"Week 4",type:"Reflectieformulier",title:"Mijn Wegwijs Plan",description:"Persoonlijk plan voor de eerste stap na het traject.",fields:["Dit begrijp ik nu beter","Dit wil ik nog regelen","Hier wil ik hulp bij vragen","Deze organisatie kan mij helpen","Mijn eerste stap na vandaag is"]},
    {id:"wegwijs-hulpkaart",workshop:"Samen Wegwijs in Nederland",week:"Alle weken",type:"Printmateriaal",title:"Hulpkaart Nederland",description:"Invulbare overzichtskaart voor veelvoorkomende hulpvragen.",fields:["Geldvragen","Zorgvragen","Werkvragen","Woonvragen","Juridische vragen","Taal oefenen","Sociale activiteiten","Eenzaamheid"]}
  ];
  const storyMaterials=[
    ...data.micOnSchool.weeks.map((week,index)=>({
      id:`school-week-${index+1}`,workshop:"Mic On | School Editie",week:`Week ${index+1}`,
      type:index===5?"Reflectieformulier":"Werkblad",title:week.title,
      description:week.worksheetInstructions||"Digitaal en geprint te gebruiken tijdens de workshop.",
      fields:week.worksheet
    })),
    ...data.micOnCommunity.weeks.map((week,index)=>({
      id:`community-week-${index+1}`,workshop:"Mic On | Buurt Editie",week:`Week ${index+1}`,
      type:index===5?"Reflectieformulier":"Werkblad",title:week.title,
      description:week.worksheetInstructions||"Digitaal en geprint te gebruiken tijdens de workshop.",
      fields:week.worksheet
    }))
  ];
  return [
    ...talentMaterials,
    ...wegwijsMaterials,
    ...storyMaterials,
    {id:"mic-find-someone",workshop:"Mic On | School Editie",week:"Week 1",type:"Oefenblad",title:"Zoek iemand die…",description:"Kennismakingsblad om deelnemers met elkaar in gesprek te brengen.",fields:micFindPrompts},
    {id:"mic-listen-detective",workshop:"Mic On | School Editie",week:"Week 1",type:"Reflectieformulier",title:"Luister Detective",description:"Korte reflectie na de luisteroefening in tweetallen.",fields:["Wat heb je onthouden?","Wat was lastig?","Wat heb je geleerd?","Welke vervolgvraag wilde je stellen?"]},
    {id:"mic-group-agreements",workshop:"Mic On | School Editie",week:"Week 1",type:"Printmateriaal",title:"Groepsafspraken",description:"A4-poster voor een veilige en respectvolle workshopruimte.",fields:["We luisteren elkaar uit","Verschillen mogen er zijn","Delen is vrijwillig","We reageren op ideeën, niet op personen","Persoonlijke verhalen blijven van de verteller"]},
    {id:"mic-topic-cards",workshop:"Mic On | School Editie",week:"Week 1",type:"Printmateriaal",title:"Podcastonderwerp-kaarten",description:"Losse kaarten voor een analoge brainstorm of stemronde.",fields:micPostitCategories},
    {id:"sterk-action",workshop:"Sterk Online",week:"Workshop",type:"Werkblad",title:"Stop · Check · Praat",description:"Praktisch actieblad voor verdachte online situaties.",fields:["Wat valt mij op?","Wat controleer ik eerst?","Met wie kan ik dit bespreken?","Welke actie neem ik nu?"]},
    {id:"sterk-signals",workshop:"Sterk Online",week:"Workshop",type:"Printmateriaal",title:"Herken de signalen",description:"Gesprekskaart met herkenbare signalen van online beïnvloeding en oplichting.",fields:["Tijdsdruk","Onbekende link","Te mooi om waar te zijn","Geheimhouding","Onverwacht betaalverzoek","Onbekend account","Stem of beeld kan zijn nagemaakt"]},
    {id:"sterk-bingo",workshop:"Sterk Online",week:"Workshop",type:"Spelmateriaal",title:"Sterk Online Bingo",description:"Printbare set met bingovakjes voor gebruik zonder telefoon.",fields:data.bingoItems.slice(0,25)}
  ];
}

function renderLibrary() {
  const grid=document.getElementById("libraryGrid");
  if(!grid)return;
  const materials=getLibraryMaterials();
  const filters=["Alles","Van Talent naar Toekomst","Samen Wegwijs in Nederland","Mic On | School Editie","Mic On | Buurt Editie","Sterk Online","Werkblad","Reflectieformulier","Printmateriaal"];
  document.getElementById("libraryFilters").innerHTML=filters.map(item=>`<button class="${libraryFilter===item?"active":""}" data-library-filter="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join("");
  const query=libraryQuery.toLowerCase();
  const visible=materials.filter(item=>(libraryFilter==="Alles"||item.workshop===libraryFilter||item.type===libraryFilter)&&`${item.title} ${item.workshop} ${item.week} ${item.type}`.toLowerCase().includes(query));
  document.getElementById("libraryCount").textContent=materials.length;
  grid.innerHTML=visible.map(item=>`
    <article class="library-card">
      <div class="library-document"><span>${item.type==="Werkblad"?"WB":item.type==="Reflectieformulier"?"RF":item.type==="Spelmateriaal"?"SP":"A4"}</span><i></i><i></i><i></i></div>
      <div class="library-card-copy"><p class="eyebrow">${escapeHtml(item.workshop)} · ${escapeHtml(item.week)}</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p>
      <div class="library-meta"><span>${escapeHtml(item.type)}</span><span>${item.fields.length} onderdelen</span></div></div>
      <div class="library-actions"><button class="button light" data-library-preview="${item.id}">Bekijken</button><button class="button dark" data-library-print="${item.id}">Printen</button></div>
    </article>`).join("")||`<div class="library-empty"><strong>Geen materiaal gevonden.</strong><p>Probeer een andere zoekterm of filter.</p></div>`;
  document.querySelectorAll("[data-library-filter]").forEach(button=>button.addEventListener("click",()=>{libraryFilter=button.dataset.libraryFilter;renderLibrary();}));
  const search=document.getElementById("librarySearch");
  if(search) {
    search.value=libraryQuery;
    search.oninput=event=>{libraryQuery=event.target.value;renderLibrary();document.getElementById("librarySearch")?.focus();};
  }
  document.querySelectorAll("[data-library-preview]").forEach(button=>button.addEventListener("click",()=>openLibraryMaterial(button.dataset.libraryPreview)));
  document.querySelectorAll("[data-library-print]").forEach(button=>button.addEventListener("click",()=>printLibraryMaterial(button.dataset.libraryPrint)));
}

function libraryMaterialPage(item,printMode=false) {
  return `<article class="print-sheet ${item.type==="Printmateriaal"?"poster-sheet":""}">
    <header><small>SLINNVA PROFESSIONALS · SAMEN ACTIEF & VERBONDEN</small><p>${escapeHtml(item.workshop)} · ${escapeHtml(item.week)}</p><h1>${escapeHtml(item.title)}</h1><span>${escapeHtml(item.type)}</span></header>
    <p class="print-intro">${escapeHtml(item.description)}</p>
    <div class="print-fields">${item.fields.map((field,index)=>`<section><b>${String(index+1).padStart(2,"0")}</b><label>${escapeHtml(field)}</label>${item.type==="Printmateriaal"||item.type==="Spelmateriaal"?"":`<div class="write-lines"><i></i><i></i><i></i></div>`}</section>`).join("")}</div>
    <footer>Naam: ______________________________ <span>Datum: __________________</span></footer>
  </article>${printMode?"":"<div class=\"button-row\"><button class=\"button dark\" id=\"printLibraryPreview\">Print dit materiaal</button></div>"}`;
}

function openLibraryMaterial(id) {
  const item=getLibraryMaterials().find(material=>material.id===id);
  if(!item)return;
  openModal(`<p class="eyebrow">Materiaal bekijken</p>${libraryMaterialPage(item)}`);
  document.getElementById("printLibraryPreview")?.addEventListener("click",()=>printLibraryMaterial(id));
}

function printLibraryMaterial(id) {
  const item=getLibraryMaterials().find(material=>material.id===id);
  if(!item)return;
  const printWindow=window.open("","slinnva-printmateriaal");
  if(!printWindow)return toast("Sta pop-ups toe om het materiaal te printen");
  printWindow.document.write(`<!doctype html><html lang="nl"><meta charset="utf-8"><title>${escapeHtml(item.title)}</title><style>
    *{box-sizing:border-box}body{margin:0;background:#eee9e2;color:#1a1a1a;font-family:Arial,sans-serif}.print-sheet{width:210mm;min-height:297mm;margin:10mm auto;padding:20mm;background:white}.print-sheet header{padding-bottom:12mm;border-bottom:2px solid #bd9760}.print-sheet header small{letter-spacing:.18em;color:#755c48}.print-sheet header p{margin:12px 0 5px;color:#755c48}.print-sheet h1{margin:0;font:38px Georgia,serif}.print-sheet header span{display:inline-block;margin-top:8px;padding:5px 8px;border:1px solid #bd9760;font-size:10px}.print-intro{margin:12mm 0;line-height:1.6}.print-fields{display:grid;gap:6mm}.print-fields section{padding:6mm;border:1px solid #d8d0c6}.print-fields b{color:#bd9760;margin-right:8px}.print-fields label{font-weight:bold}.write-lines i{display:block;height:9mm;border-bottom:1px solid #d8d0c6}.print-sheet footer{margin-top:16mm;padding-top:6mm;border-top:1px solid #d8d0c6}.print-sheet footer span{float:right}.poster-sheet .print-fields{grid-template-columns:1fr 1fr}.poster-sheet .print-fields section{min-height:28mm;display:flex;align-items:center;font-size:17px}@media print{body{background:white}.print-sheet{margin:0;box-shadow:none}@page{size:A4;margin:0}}</style>${libraryMaterialPage(item,true)}<script>window.onload=()=>window.print()<\/script>`);
  printWindow.document.close();
}

function resetDemo() {
  if(!confirm("Wil je alle lokale demo-aanpassingen herstellen?")) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(`${STORAGE_KEY}-mic-week1`);
  localStorage.removeItem(`${STORAGE_KEY}-wegwijs`);
  localStorage.removeItem(`${STORAGE_KEY}-talent`);
  data=structuredClone(seed);
  data.modules=data.modules.map(hydrateModule);
  data.masterModules=structuredClone(data.modules);
  data.sessionOverrides={};
  data.activeWorkshop="sterk";
  const micOnBase=hydrateStoryWorkshop(createStoryWorkshop());
  data.micOnSchool=createMicOnEdition("school",micOnBase);
  data.micOnCommunity=createMicOnEdition("community",micOnBase);
  attachActiveStory(data);
  init();
  toast("Demo hersteld");
}

init();
