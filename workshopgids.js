const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const demoDialog = document.querySelector("#demoDialog");
const demoTitle = document.querySelector("#demoTitle");
const demoContent = document.querySelector("#demoContent");
const closeDialog = document.querySelector(".dialog-close");
const interestForm = document.querySelector("#interestForm");
const formStatus = document.querySelector("#formStatus");
const quoteForm = document.querySelector("#offerteForm");
const quoteStatus = document.querySelector("#quoteStatus");
const storageKey = "slinnva-workshopgids-interesse";
const contentApi = "/api/workshopgids-content";
const editableSelector = [
  "main h1",
  "main h2",
  "main h3",
  "main p",
  "main li",
  "main address",
  ".workshop-card span",
  ".workshop-card b",
  ".tag-list span",
  ".benefit-grid span",
  ".week-flow span",
  ".demo-card strong",
  ".demo-card small"
].join(",");
const linkSelector = "a.button, a.workshop-card";
let editMode = false;
let guideContent = { texts: {}, links: {} };
let saveTimer;

const editorBar = document.createElement("aside");
editorBar.className = "editor-bar";
editorBar.innerHTML = `
  <button class="editor-toggle" type="button" aria-pressed="false">Bewerken</button>
  <button class="editor-save" type="button">Opslaan</button>
  <button class="editor-reset" type="button">Reset</button>
  <span class="editor-status" role="status"></span>
`;
document.body.appendChild(editorBar);

const linkEditor = document.createElement("dialog");
linkEditor.className = "link-editor";
linkEditor.innerHTML = `
  <form method="dialog">
    <button class="dialog-close" value="cancel" type="submit" aria-label="Sluiten">x</button>
    <p class="eyebrow">Knoplink</p>
    <h3>Link aanpassen</h3>
    <label>Knoptekst
      <input name="label" placeholder="Bijvoorbeeld: Plan een kennismaking">
    </label>
    <label>Link of e-mailadres
      <input name="href" placeholder="https://... of mailto:info@slinnva.com">
    </label>
    <div class="link-editor-actions">
      <button class="button ghost" value="cancel" type="submit">Annuleren</button>
      <button class="button primary" value="save" type="submit">Link opslaan</button>
    </div>
  </form>
`;
document.body.appendChild(linkEditor);

const editorToggle = editorBar.querySelector(".editor-toggle");
const editorSave = editorBar.querySelector(".editor-save");
const editorReset = editorBar.querySelector(".editor-reset");
const editorStatus = editorBar.querySelector(".editor-status");
const linkInput = linkEditor.querySelector("input[name='href']");
const linkLabelInput = linkEditor.querySelector("input[name='label']");
let activeLink = null;
let demoVideoTimer;

const demoVideos = {
  "Sterk Online": {
    eyebrow: "Demo video",
    title: "Sterk Online",
    scenes: [
      {
        title: "Sterk Online",
        subtitle: "Veilig, bewust en weerbaar online",
        label: "Deelnemers komen binnen",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=82",
        screen: "title"
      },
      {
        title: "Scan de QR-code",
        subtitle: "Iedereen doet direct mee via telefoon",
        label: "Interactieve start",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=82",
        screen: "qr"
      },
      {
        title: "Live poll",
        subtitle: "Wat kom jij online het vaakst tegen?",
        label: "Anoniem stemmen",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=82",
        screen: "poll"
      },
      {
        title: "Influencers & social media",
        subtitle: "Wat is echt, reclame of gespeeld?",
        label: "Kritisch kijken",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=82",
        screen: "influencer"
      },
      {
        title: "WhatsApp-oplichting",
        subtitle: "Herken de signalen voordat je reageert",
        label: "Zoek de fouten",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=82",
        screen: "chat"
      },
      {
        title: "Online pesten",
        subtitle: "Wat doe je als omstander?",
        label: "Gesprek in de groep",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=82",
        screen: "bullying"
      },
      {
        title: "Online gokken",
        subtitle: "Verleiding, risico's en groepsdruk",
        label: "Bewuste keuzes",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1600&q=82",
        screen: "risk"
      },
      {
        title: "AI & Nepnieuws",
        subtitle: "Herken AI-beelden, nepaccounts en misleidende berichten.",
        label: "Groepsdiscussie",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=82",
        screen: "news"
      },
      {
        title: "Samen Actief & Verbonden",
        subtitle: "Slinnva Professionals · www.slinnvaprofessionals.nl",
        label: "Napraten en afronden",
        image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1600&q=82",
        screen: "closing"
      }
    ]
  },
  "Mic On School": {
    eyebrow: "Demo video",
    title: "Mic On | School Editie",
    scenes: [
      {
        title: "Mic On",
        subtitle: "Jongeren aan het woord",
        label: "Podcastmicrofoons klaar",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=82",
        screen: "mic-title",
        guide: "Jongeren bouwen samen aan een eigen podcast."
      },
      {
        title: "Brainstormsessie",
        subtitle: "Ook inzetbaar als schoolproject voor burgerschap",
        label: "Burgerschap in praktijk",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=82",
        screen: "burgerschap",
        guide: "Dit past goed bij burgerschap: luisteren, meedoen en mening vormen."
      },
      {
        title: "Podcast naam bedenken",
        subtitle: "Samen kiezen wat past bij de groep",
        label: "Creatieve start",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=82",
        screen: "podcast-name"
      },
      {
        title: "Stemmen op ideeën",
        subtitle: "Iedere stem telt mee",
        label: "Keuzes maken",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=82",
        screen: "mic-vote"
      },
      {
        title: "Actief luisteren",
        subtitle: "Eerst begrijpen, dan reageren",
        label: "Luisteroefening",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=82",
        screen: "listen"
      },
      {
        title: "Interviewen",
        subtitle: "Goede vragen zorgen voor echte verhalen",
        label: "Interviewoefening",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=82",
        screen: "interview"
      },
      {
        title: "Podcastconcept bouwen",
        subtitle: "Rollen verdelen en samen voorbereiden",
        label: "Samenwerken",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1600&q=82",
        screen: "concept",
        guide: "Iedereen krijgt een rol, zodat samenwerken concreet wordt."
      },
      {
        title: "Oefenen achter de microfoon",
        subtitle: "Presenteren, formuleren en je stem laten horen",
        label: "Microfoonoefening",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=82",
        screen: "mic-practice"
      },
      {
        title: "Podcastopname",
        subtitle: "De groep luistert terug naar het resultaat",
        label: "Afsluiting",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=82",
        screen: "mic-closing"
      }
    ]
  },
  "Mic On Buurt": {
    eyebrow: "Demo video",
    title: "Mic On | Buurt Editie",
    scenes: [
      {
        title: "Mic On",
        subtitle: "Verhalen uit de buurt",
        label: "Buurthuis, koffie en wijkverhalen",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=82",
        screen: "buurt-title",
        guide: "In deze editie draait alles om verhalen uit de buurt."
      },
      {
        title: "Actuele buurtthema's",
        subtitle: "De groep brainstormt over wat er leeft in de wijk",
        label: "Onderwerpen kiezen",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=82",
        screen: "buurt-brainstorm",
        guide: "De groep kiest onderwerpen die nu spelen in de wijk."
      },
      {
        title: "Gast uitnodigen",
        subtitle: "Wie kan iets vertellen over dit onderwerp?",
        label: "Samen kiezen",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=82",
        screen: "guest",
        guide: "Samen bedenken ze welke gast het verhaal sterker maakt."
      },
      {
        title: "Iemand benaderen",
        subtitle: "Hoe vraag je iemand om gast te zijn in je podcast?",
        label: "Oefenen",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=82",
        screen: "approach",
        guide: "Ze oefenen hoe je respectvol contact legt met een gast."
      },
      {
        title: "Rollen verdelen",
        subtitle: "Host, interviewer, techniek en redactie",
        label: "Podcastteam maken",
        image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1600&q=82",
        screen: "roles",
        guide: "Met duidelijke rollen wordt het echt een gezamenlijk project."
      },
      {
        title: "Verhalen ophalen",
        subtitle: "Bewoners delen herinneringen, ervaringen en ideeën",
        label: "Gesprekken over de buurt",
        image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1600&q=82",
        screen: "stories"
      },
      {
        title: "Podcast voorbereiden",
        subtitle: "Vragen klaarzetten en volgorde bepalen",
        label: "Samenwerken",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=82",
        screen: "buurt-mic"
      },
      {
        title: "Podcast opnemen",
        subtitle: "De buurt vertelt haar eigen verhaal",
        label: "Opname",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=82",
        screen: "buurt-record"
      },
      {
        title: "Zelfgemaakte podcast",
        subtitle: "De groep luistert samen terug naar het eindresultaat",
        label: "Afsluiting",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=82",
        screen: "buurt-closing",
        guide: "Aan het einde luistert de groep naar hun zelfgemaakte podcast."
      }
    ]
  },
  "Own Your Talent": {
    eyebrow: "Demo video",
    title: "Own Your Talent",
    scenes: [
      {
        title: "Own Your Talent",
        subtitle: "Jouw talent ontdekken. Jouw keuzes ontwikkelen. Jouw toekomst bepalen.",
        label: "Jongeren werken samen",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=82",
        screen: "talent-title",
        guide: "Jongeren starten met ontdekken wie zij zijn en wat bij hen past."
      },
      {
        title: "Talentenkaart invullen",
        subtitle: "Wat kan ik goed? Waar krijg ik energie van?",
        label: "Talenten ontdekken",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=82",
        screen: "talent-card",
        guide: "De talentenkaart maakt kwaliteiten concreet en bespreekbaar."
      },
      {
        title: "Samenwerken",
        subtitle: "Deelnemers herkennen kwaliteiten bij elkaar",
        label: "Leren van elkaar",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=82",
        screen: "talent-team"
      },
      {
        title: "Reflectieoefening",
        subtitle: "Wat past bij mij en waar wil ik in groeien?",
        label: "Persoonlijke ontwikkeling",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=82",
        screen: "reflection",
        guide: "Reflectie helpt jongeren woorden te geven aan hun eigen ontwikkeling."
      },
      {
        title: "Toekomstdoelen bespreken",
        subtitle: "Opleiding, werk, keuzes en eerste stappen",
        label: "Toekomstoriëntatie",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=82",
        screen: "future"
      },
      {
        title: "Sterke punten ontdekken",
        subtitle: "Zelfvertrouwen groeit wanneer kwaliteiten zichtbaar worden",
        label: "Zelfvertrouwen",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=82",
        screen: "strengths"
      },
      {
        title: "Keuzes maken",
        subtitle: "Van inzicht naar een haalbare volgende stap",
        label: "Groei",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=82",
        screen: "choices"
      },
      {
        title: "Presentatiemoment",
        subtitle: "Jongeren presenteren hun inzichten aan elkaar",
        label: "Je verhaal delen",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1600&q=82",
        screen: "talent-present"
      },
      {
        title: "Samen Actief & Verbonden",
        subtitle: "Jongeren sluiten af met inzicht, richting en vertrouwen",
        label: "Afsluiting",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=82",
        screen: "talent-closing",
        guide: "Aan het einde nemen jongeren hun inzichten en volgende stap mee."
      }
    ]
  },
  "Samen Wegwijs": {
    eyebrow: "Demo video",
    title: "Samen Wegwijs in Nederland",
    scenes: [
      {
        title: "Samen Wegwijs in Nederland",
        subtitle: "Workshops én om de week een inloopspreekuur",
        label: "Ontvangstruimte",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=82",
        screen: "wegwijs-title",
        guide: "Samen Wegwijs combineert praktische workshops met een terugkerend inloopmoment."
      },
      {
        title: "Twee onderdelen in één",
        subtitle: "Leren in de workshop. Persoonlijke vragen in het inloopspreekuur.",
        label: "2-in-1 aanpak",
        image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1600&q=82",
        screen: "wegwijs-two",
        guide: "Zo krijgen deelnemers uitleg én een plek om later terug te komen."
      },
      {
        title: "Workshopmoment",
        subtitle: "Vaardigheden leren die je gebruikt in de maatschappij",
        label: "Samen leren",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=82",
        screen: "wegwijs-dashboard",
        guide: "In de workshops oefenen deelnemers met situaties uit het dagelijks leven."
      },
      {
        title: "Brieven begrijpen",
        subtitle: "Wat staat er? Wat moet ik doen? Hoe reageer ik netjes?",
        label: "Brief lezen en beantwoorden",
        image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1600&q=82",
        screen: "brieven"
      },
      {
        title: "Nette mail opstellen",
        subtitle: "Duidelijk, vriendelijk en met de juiste informatie",
        label: "E-mail oefenen",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=82",
        screen: "mail-opstellen"
      },
      {
        title: "Sollicitatieproces",
        subtitle: "Van vacature zoeken tot gesprek en onboarding",
        label: "Werk en toekomst",
        image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1600&q=82",
        screen: "sollicitatie"
      },
      {
        title: "Om de week inloopspreekuur",
        subtitle: "1-op-1 hulp bij eigen persoonlijke vraagstukken",
        label: "Terugkerende persoonlijke hulp",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=82",
        screen: "spreekuur",
        guide: "Tijdens de inloop kan er persoonlijk worden meegekeken met een brief, mail, formulier of sollicitatie."
      },
      {
        title: "Informatie delen",
        subtitle: "Wonen, werk, zorg, verzekeringen, financiën, taal en voorzieningen",
        label: "Praktische thema's",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=82",
        screen: "info-themas"
      },
      {
        title: "Gesprek met begeleider",
        subtitle: "Samen kijken welke volgende stap past",
        label: "Persoonlijke route",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=82",
        screen: "begeleider"
      },
      {
        title: "Samen Actief & Verbonden",
        subtitle: "Nieuwe contacten ontstaan. Deelnemers praten na.",
        label: "Afsluiting",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=82",
        screen: "wegwijs-closing",
        guide: "Na afloop weten deelnemers beter waar ze terechtkunnen."
      }
    ]
  }
};

menuToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const active = nav?.querySelector(`a[href="#${entry.target.id}"]`);
    navLinks.forEach(link => link.classList.toggle("active", link === active));
  });
}, {
  rootMargin: "-30% 0px -58% 0px",
  threshold: 0
});

sections.forEach(section => navObserver.observe(section));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  rootMargin: "0px 0px -8% 0px",
  threshold: .12
});

revealItems.forEach(item => revealObserver.observe(item));

document.querySelectorAll(".demo-card").forEach(card => {
  card.addEventListener("click", () => {
    const demoName = card.dataset.demo || "Bekijk een impressie";
    renderDemo(demoName);
    if (typeof demoDialog.showModal === "function") demoDialog.showModal();
  });
});

document.querySelectorAll("[data-open-demo]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    renderDemo(button.dataset.openDemo);
    if (typeof demoDialog.showModal === "function") demoDialog.showModal();
  });
});

closeDialog?.addEventListener("click", () => demoDialog.close());

demoDialog?.addEventListener("click", event => {
  if (event.target === demoDialog) demoDialog.close();
});

demoDialog?.addEventListener("close", stopDemoVideo);

function renderDemo(name) {
  stopDemoVideo();
  const video = demoVideos[name];
  demoTitle.textContent = name;
  demoDialog.querySelector(".eyebrow").textContent = "Impressie";
  if (!video) {
    demoContent.innerHTML = `
      <p>Hier kan later een video, presentatie of fotoreeks worden geplaatst.</p>
      <div class="video-placeholder">Video placeholder</div>
    `;
    return;
  }

  demoDialog.querySelector(".eyebrow").textContent = video.eyebrow;
  demoTitle.textContent = video.title;
  demoContent.innerHTML = `
    <div class="demo-video" data-playing="true">
      <div class="demo-video-frame" aria-live="polite"></div>
      <div class="demo-video-controls">
        <button class="demo-step demo-prev" type="button" aria-label="Vorige scene">Vorige</button>
        <button class="demo-play-toggle" type="button">Pauze</button>
        <button class="demo-step demo-next" type="button" aria-label="Volgende scene">Volgende</button>
        <div class="demo-progress" aria-hidden="true"><span></span></div>
        <span class="demo-time">00:00 / 01:12</span>
      </div>
    </div>
  `;
  startDemoVideo(video.scenes);
}

function renderScreen(type) {
  const screens = {
    title: `<div class="screen-card title-screen"><b>Sterk Online</b><span>Veilig, bewust en weerbaar online</span></div>`,
    qr: `<div class="screen-card qr-screen"><i></i><b>Scan & doe mee</b><span>Live vragen via je telefoon</span></div>`,
    poll: `<div class="screen-card poll-screen"><b>Live poll</b><span style="--bar:82%">Social media</span><span style="--bar:64%">Influencers</span><span style="--bar:48%">AI & Nepnieuws</span></div>`,
    influencer: `<div class="screen-card social-screen"><b>Influencer of reclame?</b><span>#sponsored</span><span>UGC</span><span>Content creators</span></div>`,
    chat: `<div class="screen-card chat-screen"><b>WhatsApp</b><p>Hoi mam, mijn telefoon is stuk. Kun je snel geld overmaken?</p><em>Zoek de fouten</em></div>`,
    bullying: `<div class="screen-card issue-screen"><b>Online pesten</b><span>Wat doe je als omstander?</span></div>`,
    risk: `<div class="screen-card issue-screen"><b>Online gokken</b><span>Verleiding · risico's · groepsdruk</span></div>`,
    news: `<div class="screen-card issue-screen"><b>AI & Nepnieuws</b><span>Check bron, beeld en afzender voordat je deelt</span></div>`,
    closing: `<div class="screen-card title-screen"><b>Samen Actief & Verbonden</b><span>Slinnva Professionals</span></div>`,
    "mic-title": `<div class="screen-card title-screen mic-screen"><b>Mic On</b><span>Jongeren aan het woord</span></div>`,
    brainstorm: `<div class="screen-card social-screen mic-screen"><b>Brainstorm</b><span>School</span><span>Vriendschap</span><span>Toekomst</span><span>Online</span></div>`,
    burgerschap: `<div class="screen-card social-screen mic-screen"><b>Burgerschap</b><span>Meedoen</span><span>Luisteren</span><span>Mening vormen</span><span>Samen beslissen</span></div>`,
    "podcast-name": `<div class="screen-card mic-screen"><b>Podcast naam</b><span>Onze Stem</span><span>Schoolpraat</span><span>Mic Check</span></div>`,
    "mic-vote": `<div class="screen-card poll-screen mic-screen"><b>Stemronde</b><span style="--bar:76%">Onze Stem</span><span style="--bar:58%">Mic Check</span><span style="--bar:42%">Schoolpraat</span></div>`,
    listen: `<div class="screen-card issue-screen mic-screen"><b>Actief luisteren</b><span>Samenvatten · doorvragen · aandacht</span></div>`,
    interview: `<div class="screen-card chat-screen mic-screen"><b>Interview</b><p>Wat wil je dat anderen echt van jou begrijpen?</p><em>Doorvragen</em></div>`,
    concept: `<div class="screen-card social-screen mic-screen"><b>Podcastconcept</b><span>Host</span><span>Gast</span><span>Intro</span><span>Vragen</span></div>`,
    "mic-practice": `<div class="screen-card issue-screen mic-screen"><b>Achter de microfoon</b><span>Communiceren · presenteren · stemgebruik</span></div>`,
    "mic-closing": `<div class="screen-card title-screen mic-screen"><b>Samen Actief & Verbonden</b><span>Slinnva Professionals</span></div>`,
    "buurt-title": `<div class="screen-card title-screen mic-screen"><b>Mic On</b><span>Verhalen uit de buurt</span></div>`,
    "buurt-brainstorm": `<div class="screen-card social-screen mic-screen"><b>Actueel in de buurt</b><span>Veiligheid</span><span>Ontmoeting</span><span>Jongeren</span><span>Voorzieningen</span></div>`,
    guest: `<div class="screen-card issue-screen mic-screen"><b>Gast kiezen</b><span>Wie heeft een verhaal dat de buurt moet horen?</span></div>`,
    approach: `<div class="screen-card chat-screen mic-screen"><b>Benaderen</b><p>Wij maken een podcast over de buurt. Zou u als gast mee willen doen?</p><em>Respectvol vragen</em></div>`,
    roles: `<div class="screen-card social-screen mic-screen"><b>Rollen</b><span>Host</span><span>Interviewer</span><span>Techniek</span><span>Redactie</span></div>`,
    stories: `<div class="screen-card social-screen mic-screen"><b>Verhalen</b><span>Herinneringen</span><span>Cultuur</span><span>Buurt</span><span>Ervaring</span></div>`,
    "buurt-mic": `<div class="screen-card social-screen mic-screen"><b>Voorbereiden</b><span>Vragen</span><span>Volgorde</span><span>Intro</span><span>Gast</span></div>`,
    "buurt-record": `<div class="screen-card issue-screen mic-screen"><b>Opnemen</b><span>De buurt vertelt haar eigen verhaal</span></div>`,
    "buurt-closing": `<div class="screen-card title-screen mic-screen"><b>Terugluisteren</b><span>Een zelfgemaakte podcast van de groep</span></div>`,
    "talent-title": `<div class="screen-card title-screen talent-screen"><b>Own Your Talent</b><span>Ontdekken · kiezen · groeien</span></div>`,
    "talent-card": `<div class="screen-card social-screen talent-screen"><b>Talentenkaart</b><span>Creatief</span><span>Zorgzaam</span><span>Doorzetter</span><span>Nieuwsgierig</span></div>`,
    "talent-team": `<div class="screen-card issue-screen talent-screen"><b>Samenwerken</b><span>Je ziet soms talenten bij elkaar die iemand zelf nog niet ziet.</span></div>`,
    reflection: `<div class="screen-card chat-screen talent-screen"><b>Reflectie</b><p>Waar ben ik trots op? Waar wil ik in groeien?</p><em>Persoonlijke ontwikkeling</em></div>`,
    future: `<div class="screen-card social-screen talent-screen"><b>Toekomst</b><span>Opleiding</span><span>Werk</span><span>Keuzes</span><span>Eerste stap</span></div>`,
    strengths: `<div class="screen-card issue-screen talent-screen"><b>Sterke punten</b><span>Zelfvertrouwen groeit door herkenning.</span></div>`,
    choices: `<div class="screen-card social-screen talent-screen"><b>Keuzes maken</b><span>Wat past bij mij?</span><span>Wat is haalbaar?</span><span>Wat doe ik nu?</span></div>`,
    "talent-present": `<div class="screen-card issue-screen talent-screen"><b>Presenteren</b><span>Jongeren delen hun inzichten en volgende stap.</span></div>`,
    "talent-closing": `<div class="screen-card title-screen talent-screen"><b>Samen Actief & Verbonden</b><span>Inzicht, richting en vertrouwen</span></div>`,
    "wegwijs-title": `<div class="screen-card title-screen wegwijs-screen"><b>Samen Wegwijs</b><span>Workshops + inloopspreekuur</span></div>`,
    "wegwijs-two": `<div class="screen-card social-screen wegwijs-screen"><b>2 onderdelen in 1</b><span>Praktische workshops</span><span>Om de week inloopspreekuur</span><span>Ontmoeting</span><span>Persoonlijke vragen</span></div>`,
    "wegwijs-dashboard": `<div class="screen-card dashboard-screen wegwijs-screen"><b>Workshopvaardigheden</b><span>Brieven · mail · solliciteren · maatschappij</span><i></i><em>Opdracht actief</em></div>`,
    brieven: `<div class="screen-card worksheet-screen wegwijs-screen"><b>Brief begrijpen</b><span>Wat wordt gevraagd?</span><span>Welke datum is belangrijk?</span><span>Hoe reageer ik?</span></div>`,
    "mail-opstellen": `<div class="screen-card worksheet-screen wegwijs-screen"><b>Nette e-mail</b><span>Onderwerp</span><span>Begroeting</span><span>Vraag duidelijk stellen</span><span>Afsluiting</span></div>`,
    sollicitatie: `<div class="screen-card social-screen wegwijs-screen"><b>Solliciteren</b><span>Vacature</span><span>CV</span><span>Motivatie</span><span>Gesprek</span><span>Onboarding</span></div>`,
    spreekuur: `<div class="screen-card worksheet-screen wegwijs-screen"><b>1-op-1 inloop</b><span>Eigen brief</span><span>Eigen formulier</span><span>Eigen sollicitatie</span><p>We kijken samen naar uw persoonlijke vraag.</p><em>Om de week</em></div>`,
    "help-elkaar": `<div class="screen-card issue-screen wegwijs-screen"><b>Elkaar helpen</b><span>Deelnemers wisselen tips en ervaringen uit.</span></div>`,
    "taal-werkblad": `<div class="screen-card worksheet-screen wegwijs-screen"><b>Werkblad taal</b><span>Ik wil een afspraak maken</span><span>Ik heb een vraag over...</span><span>Kunt u mij helpen?</span></div>`,
    "info-themas": `<div class="screen-card social-screen wegwijs-screen"><b>Thema's</b><span>Wonen</span><span>Werk</span><span>Zorg</span><span>Verzekeringen</span><span>Financiën</span><span>Taal</span><span>Voorzieningen</span></div>`,
    begeleider: `<div class="screen-card chat-screen wegwijs-screen"><b>Begeleider</b><p>Welke stap wil je na vandaag zetten?</p><em>Volgende stap</em></div>`,
    "wegwijs-closing": `<div class="screen-card title-screen wegwijs-screen"><b>Samen Actief & Verbonden</b><span>Slinnva Professionals</span></div>`
  };
  return screens[type] || "";
}

function startDemoVideo(scenes) {
  const player = demoContent.querySelector(".demo-video");
  const frame = demoContent.querySelector(".demo-video-frame");
  const progress = demoContent.querySelector(".demo-progress span");
  const toggle = demoContent.querySelector(".demo-play-toggle");
  const previous = demoContent.querySelector(".demo-prev");
  const next = demoContent.querySelector(".demo-next");
  const time = demoContent.querySelector(".demo-time");
  const sceneDuration = 4200;
  let sceneIndex = 0;
  let playing = true;

  const showScene = index => {
    const scene = scenes[index % scenes.length];
    sceneIndex = index % scenes.length;
    frame.style.backgroundImage = `linear-gradient(90deg, rgba(20, 13, 9, .86), rgba(20, 13, 9, .34)), url("${scene.image}")`;
    frame.innerHTML = `
      <div class="video-overlay-copy">
        <small>${scene.label}</small>
        <strong>${scene.title}</strong>
        <span>${scene.subtitle}</span>
      </div>
      <div class="slinnva-mascot" aria-label="Slinnva Professionals gids">
        <div class="mascot-mark">SP</div>
        <div class="mascot-bubble">
          <b>Slinnva gids</b>
          <span>${scene.guide || "Kijk mee naar wat deelnemers doen en leren."}</span>
        </div>
      </div>
      ${renderScreen(scene.screen)}
    `;
    progress.style.width = `${((sceneIndex + 1) / scenes.length) * 100}%`;
    if (time) time.textContent = `${String(sceneIndex + 1).padStart(2, "0")} / ${String(scenes.length).padStart(2, "0")}`;
  };

  const advance = () => showScene(sceneIndex + 1);
  const play = () => {
    stopDemoVideo();
    demoVideoTimer = setInterval(advance, sceneDuration);
  };

  showScene(0);
  play();

  toggle?.addEventListener("click", () => {
    playing = !playing;
    player.dataset.playing = String(playing);
    toggle.textContent = playing ? "Pauze" : "Afspelen";
    if (playing) play();
    else stopDemoVideo();
  });

  previous?.addEventListener("click", () => {
    showScene(sceneIndex - 1 + scenes.length);
    if (playing) play();
  });

  next?.addEventListener("click", () => {
    showScene(sceneIndex + 1);
    if (playing) play();
  });
}

function stopDemoVideo() {
  clearInterval(demoVideoTimer);
  demoVideoTimer = null;
}

function fillFormFromStorage() {
  if (!interestForm) return;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    Object.entries(saved).forEach(([name, value]) => {
      const field = interestForm.elements[name];
      if (field) field.value = value;
    });
    if (Object.keys(saved).length) {
      formStatus.textContent = "Eerder ingevulde interesse is geladen.";
    }
  } catch {
    localStorage.removeItem(storageKey);
  }
}

interestForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!interestForm.reportValidity()) {
    formStatus.textContent = "Vul alstublieft de verplichte velden in voordat u het formulier verstuurt.";
    return;
  }
  const formData = new FormData(interestForm);
  const data = Object.fromEntries(formData.entries());
  localStorage.setItem(storageKey, JSON.stringify(data));
  formStatus.className = "form-status";
  formStatus.textContent = "Aanvraag wordt verstuurd...";
  fetch("/api/contact-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) throw new Error("Versturen mislukt");
      localStorage.removeItem(storageKey);
      interestForm.reset();
      formStatus.className = "form-status success";
      formStatus.innerHTML = "Bedankt voor uw interesse in onze workshops!<br>Wij nemen zo spoedig mogelijk contact met u op.";
    })
    .catch(() => {
      formStatus.className = "form-status error";
      formStatus.innerHTML = 'Het formulier kon helaas niet worden verzonden. Probeer het opnieuw of mail ons direct via <a href="mailto:info@slinnva.com">info@slinnva.com</a>.';
    });
});

interestForm?.addEventListener("input", () => {
  if (formStatus.textContent) {
    formStatus.className = "form-status";
    formStatus.textContent = "";
  }
});

quoteForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) {
    quoteStatus.textContent = "Vul alstublieft de verplichte velden in voordat u het formulier verstuurt.";
    return;
  }
  const formData = new FormData(quoteForm);
  const data = {
    ...Object.fromEntries(formData.entries()),
    requestType: "offerte",
    typeOrganisatie: "Nog afstemmen",
    email: "",
    functie: "",
    telefoon: ""
  };
  quoteStatus.className = "form-status";
  quoteStatus.textContent = "Offerte-aanvraag wordt verstuurd...";
  fetch("/api/contact-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) throw new Error("Versturen mislukt");
      quoteForm.reset();
      quoteStatus.className = "form-status success";
      quoteStatus.innerHTML = "Bedankt voor uw offerte-aanvraag!<br>Wij nemen zo spoedig mogelijk contact met u op.";
    })
    .catch(() => {
      quoteStatus.className = "form-status error";
      quoteStatus.innerHTML = 'De offerte-aanvraag kon helaas niet worden verzonden. Probeer het opnieuw of mail ons direct via <a href="mailto:info@slinnva.com">info@slinnva.com</a>.';
    });
});

quoteForm?.addEventListener("input", () => {
  if (quoteStatus.textContent) {
    quoteStatus.className = "form-status";
    quoteStatus.textContent = "";
  }
});

fillFormFromStorage();

function editables() {
  return [...document.querySelectorAll(editableSelector)].filter(element => !element.closest(".editor-bar, .link-editor, dialog"));
}

function linkTargets() {
  return [...document.querySelectorAll(linkSelector)].filter(element => !element.closest(".editor-bar, .link-editor, dialog"));
}

function makeId(element, prefix, index) {
  const section = element.closest("section[id]")?.id || "site";
  const label = element.tagName.toLowerCase();
  return `${prefix}-${section}-${label}-${index}`;
}

function assignEditorIds() {
  editables().forEach((element, index) => {
    element.dataset.editId ||= makeId(element, "text", index);
  });
  linkTargets().forEach((element, index) => {
    element.dataset.linkId ||= makeId(element, "link", index);
  });
}

function applyGuideContent() {
  assignEditorIds();
  editables().forEach(element => {
    const saved = guideContent.texts?.[element.dataset.editId];
    if (typeof saved === "string") element.innerHTML = saved;
  });
  linkTargets().forEach(element => {
    const saved = guideContent.links?.[element.dataset.linkId];
    if (saved?.href) element.setAttribute("href", saved.href);
  });
}

function collectGuideContent() {
  assignEditorIds();
  const texts = {};
  const links = {};
  editables().forEach(element => {
    texts[element.dataset.editId] = element.innerHTML.trim();
  });
  linkTargets().forEach(element => {
    links[element.dataset.linkId] = { href: element.getAttribute("href") || "" };
  });
  guideContent = { texts, links };
  return guideContent;
}

function setEditorStatus(message) {
  editorStatus.textContent = message;
  clearTimeout(editorStatus.timer);
  editorStatus.timer = setTimeout(() => {
    editorStatus.textContent = "";
  }, 3200);
}

async function loadGuideContent() {
  try {
    const response = await fetch(contentApi, { cache: "no-store" });
    if (response.ok) guideContent = await response.json();
  } catch {
    try {
      guideContent = JSON.parse(localStorage.getItem("slinnva-workshopgids-content") || "{\"texts\":{},\"links\":{}}");
    } catch {
      guideContent = { texts: {}, links: {} };
    }
  }
  applyGuideContent();
}

async function saveGuideContent(showMessage = true) {
  const payload = collectGuideContent();
  localStorage.setItem("slinnva-workshopgids-content", JSON.stringify(payload));
  try {
    const response = await fetch(contentApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Save failed");
    if (showMessage) setEditorStatus("Opgeslagen");
  } catch {
    if (showMessage) setEditorStatus("Alleen in deze browser opgeslagen");
  }
}

function queueSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveGuideContent(false), 700);
}

function setEditMode(enabled) {
  editMode = enabled;
  body.classList.toggle("edit-mode", editMode);
  editorToggle.setAttribute("aria-pressed", String(editMode));
  editorToggle.textContent = editMode ? "Bewerken aan" : "Bewerken";
  assignEditorIds();
  editables().forEach(element => {
    element.contentEditable = editMode ? "true" : "false";
    element.spellcheck = true;
  });
  setEditorStatus(editMode ? "Klik tekst aan om te wijzigen. Klik een knop om de link te bewerken." : "");
}

editorToggle.addEventListener("click", () => setEditMode(!editMode));
editorSave.addEventListener("click", () => saveGuideContent(true));
editorReset.addEventListener("click", async () => {
  if (!confirm("Alle aangepaste teksten en links terugzetten?")) return;
  guideContent = { texts: {}, links: {} };
  localStorage.removeItem("slinnva-workshopgids-content");
  try {
    await fetch(contentApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guideContent)
    });
  } catch {}
  location.reload();
});

document.addEventListener("input", event => {
  if (!editMode || !event.target.closest("[data-edit-id]")) return;
  queueSave();
});

document.addEventListener("click", event => {
  const target = event.target.closest(linkSelector);
  if (!target || !editMode) return;
  if (event.target.closest("[data-edit-id]")) return;
  event.preventDefault();
  activeLink = target;
  linkInput.value = activeLink.getAttribute("href") || "";
  linkLabelInput.value = activeLink.classList.contains("button") ? activeLink.textContent.trim() : "";
  if (typeof linkEditor.showModal === "function") linkEditor.showModal();
});

linkEditor.addEventListener("close", () => {
  if (linkEditor.returnValue !== "save" || !activeLink) return;
  const value = linkInput.value.trim();
  activeLink.setAttribute("href", value || "#");
  if (activeLink.classList.contains("button") && linkLabelInput.value.trim()) {
    activeLink.textContent = linkLabelInput.value.trim();
  }
  saveGuideContent(true);
  activeLink = null;
});

assignEditorIds();
loadGuideContent();
