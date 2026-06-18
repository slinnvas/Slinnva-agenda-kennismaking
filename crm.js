const CRM_KEY = "slinnvaSamenActiefCrm.v1";

const menuItems = [
  ["dashboard", "Dashboard"], ["organisaties", "Organisaties"], ["pipeline", "Pipeline"],
  ["opvolging", "Opvolging"], ["gesprekken", "Gesprekken"], ["offertes", "Offertes"],
  ["templates", "Templates"], ["statistieken", "Statistieken"], ["notities", "Notities & kansen"],
  ["instellingen", "Instellingen"]
];

const defaults = {
  organizationTypes: ["School", "Basisschool", "Voortgezet onderwijs", "MBO", "Buurthuis", "Gemeente", "Jongerenwerk", "Bibliotheek", "Welzijnsorganisatie", "Maatschappelijke instelling", "Anders"],
  workshops: ["Sterk Online", "Mic On | School Editie", "Mic On | Buurt Editie", "Own Your Talent", "Samen Wegwijs in Nederland", "Nog onbekend", "Meerdere workshops"],
  statuses: ["Nieuwe aanvraag", "Nieuw", "Mail verstuurd", "Wachten op reactie", "Contact gelegd", "Kennismaking gepland", "Gesprek gevoerd", "Offerte verstuurd", "In behandeling", "Samenwerking gestart", "Later opnieuw benaderen", "Geen interesse"],
  actions: ["Eerste mail sturen", "Follow up mail sturen", "Bellen", "Brochure nasturen", "Kennismaking plannen", "Offerte maken", "Offerte opvolgen", "Later opnieuw benaderen", "Geen actie"],
  templateCategories: ["Koude mail", "Follow up mail", "Kennismakingsmail", "Brochure begeleidende tekst", "Telefonisch belscript", "Afwijzing netjes opvolgen", "Offerte begeleidende mail"],
  statusColors: {
    "Nieuwe aanvraag": "#b58a3b", "Nieuw": "#6f6258", "Mail verstuurd": "#326a8f", "Wachten op reactie": "#b86422", "Contact gelegd": "#277557",
    "Kennismaking gepland": "#7b5a98", "Gesprek gevoerd": "#87611f", "Offerte verstuurd": "#b58a3b",
    "In behandeling": "#4f6f52", "Samenwerking gestart": "#1f7a58", "Later opnieuw benaderen": "#6b7280", "Geen interesse": "#a33f35"
  }
};

const starterOrganizations = [
  ["Voorbeeld College Rotterdam", "Voortgezet onderwijs", "Rotterdam", "Sterk Online", "Mail verstuurd", "Mevrouw De Jong", "Zorgcoordinator", "info@voorbeeldcollege.nl"],
  ["Buurthuis De Verbinding", "Buurthuis", "Schiedam", "Mic On | Buurt Editie", "Kennismaking gepland", "Samira El Idrissi", "Programmamaker", "contact@deverbinding.nl"],
  ["Jongerenwerk Maassluis", "Jongerenwerk", "Maassluis", "Own Your Talent", "Wachten op reactie", "Dylan Vermeer", "Jongerenwerker", "info@jongerenwerkmaassluis.nl"],
  ["Bibliotheek Vlaardingen", "Bibliotheek", "Vlaardingen", "Samen Wegwijs in Nederland", "Contact gelegd", "Nadia Bakker", "Coordinator educatie", "educatie@bibliotheekvlaardingen.nl"]
];

const starterTemplates = [
  ["Koude mail Samen Actief & Verbonden", "Koude mail", "Beste {{naam}},\n\nMijn naam is Sharmilenka van Slinnva Professionals. Met Samen Actief & Verbonden bied ik praktische workshops en trajecten voor jongeren, ouders en bewoners.\n\nIk denk graag mee over een passend aanbod voor {{organisatie}}, bijvoorbeeld Sterk Online, Mic On of Samen Wegwijs in Nederland.\n\nZou een korte kennismaking binnenkort passen?\n\nHartelijke groet,\nSharmilenka"],
  ["Follow up na brochure", "Follow up mail", "Beste {{naam}},\n\nIk stuur u graag nog een korte opvolging op de brochure. Heeft u intern al kunnen kijken welk traject het beste aansluit?\n\nIk denk graag mee over doelgroep, planning en budget.\n\nHartelijke groet,\nSharmilenka"],
  ["Uitnodiging kennismaking", "Kennismakingsmail", "Beste {{naam}},\n\nDank voor uw interesse. Ik plan graag een kennismaking om de behoefte, doelgroep en mogelijkheden rustig door te nemen.\n\nWelke dag of tijd komt u goed uit?\n\nHartelijke groet,\nSharmilenka"],
  ["Bedankt voor gesprek", "Kennismakingsmail", "Beste {{naam}},\n\nDank voor het prettige gesprek. Ik vat de besproken behoefte kort samen en kom terug met een passend voorstel.\n\nHartelijke groet,\nSharmilenka"],
  ["Offerte nasturen", "Offerte begeleidende mail", "Beste {{naam}},\n\nZoals besproken stuur ik hierbij de offerte voor {{workshop}}. Ik hoor graag of dit aansluit of dat er nog iets aangepast moet worden.\n\nHartelijke groet,\nSharmilenka"]
];

let state;
let currentRoute = "dashboard";
let editingOrgId = null;
let simpleCallback = null;

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
const today = () => new Date().toISOString().slice(0, 10);
const addDays = days => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const nlDate = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString("nl-NL", { day: "2-digit", month: "short", year: "numeric" }) : "";

function freshOrg([name, type, city, workshop, status, contactName, contactRole, email], index) {
  const id = uid();
  const last = addDays(-12 + index * 3);
  const follow = addDays(index === 0 ? 2 : index === 1 ? 0 : index === 2 ? -1 : 6);
  return {
    id, name, type, address: "", city, website: "", email, phone: "", workshop, status,
    contactName, contactRole, lastContact: last, nextAction: index === 1 ? "Kennismaking plannen" : "Follow up mail sturen",
    followUpDate: follow,
    notes: index === 0 ? "Interesse in Sterk Online voor leerjaar 2." : index === 1 ? "Kennismaking staat gepland. Vooraf voorbeelden van Mic On meenemen." : "",
    contacts: [{ id: uid(), name: contactName, role: contactRole, email, phone: "", linkedin: "", remarks: "" }],
    interests: [workshop],
    need: "",
    timeline: [{ id: uid(), date: last, type: "Organisatie toegevoegd", description: "Voorbeeldorganisatie toegevoegd aan CRM.", nextAction: "Follow up mail sturen", attachment: "" }],
    actions: [{ id: uid(), title: index === 1 ? "Kennismaking voorbereiden" : "Follow up mail sturen", deadline: follow, status: "open", note: "" }]
  };
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CRM_KEY));
    if (parsed?.organizations) return { ...seedState(), ...parsed, settings: { ...seedState().settings, ...(parsed.settings || {}) } };
  } catch {}
  return seedState();
}

function seedState() {
  return {
    settings: structuredClone(defaults),
    organizations: starterOrganizations.map(freshOrg),
    meetings: [{
      id: uid(), orgId: "", organization: "Buurthuis De Verbinding", contact: "Samira El Idrissi", date: today(), time: "10:00",
      type: "online", workshop: "Mic On | Buurt Editie", prep: "Doelgroep en groepsgrootte uitvragen.", notes: "", next: "Offerte maken"
    }],
    quotes: [{
      id: uid(), organization: "Buurthuis De Verbinding", workshop: "Mic On | Buurt Editie", date: today(), amount: "1250",
      status: "Nog maken", number: "SAV-2026-001", link: "", notes: "", followUpDate: addDays(5)
    }],
    templates: starterTemplates.map(([title, category, text]) => ({ id: uid(), title, category, text })),
    opportunities: [{
      id: uid(), partner: "Gemeente Rotterdam", idea: "Preventie-aanbod rondom online weerbaarheid", collaboration: "Sterk Online als ouder-kind traject",
      subsidy: "Mogelijk via welzijn/preventie", remark: "Uitzoeken welke wijkteams aansluiten.", status: "Onderzoeken", next: "Contactpersoon zoeken"
    }]
  };
}

function save() {
  localStorage.setItem(CRM_KEY, JSON.stringify(state));
}

async function importBrochureLeads() {
  try {
    const response = await fetch("/api/contact-request", { cache: "no-store" });
    if (!response.ok) return;
    const { requests = [] } = await response.json();
    let imported = 0;
    for (const lead of requests) {
      if (!lead?.id || state.organizations.some(org => org.sourceLeadId === lead.id)) continue;
      const org = {
        id: uid(),
        sourceLeadId: lead.id,
        name: lead.organisatie || "Naam organisatie onbekend",
        type: lead.typeOrganisatie || "Anders",
        address: "",
        city: "",
        website: "",
        email: lead.email || "",
        phone: lead.telefoon || "",
        workshop: lead.workshop || lead.workshopinteresse || "Nog onbekend",
        status: "Nieuwe aanvraag",
        bron: "Interactieve brochure",
        contactName: lead.naam || "",
        contactRole: lead.functie || "",
        lastContact: today(),
        nextAction: lead.requestType === "offerte" ? "Offerte maken" : "Kennismaking plannen",
        followUpDate: today(),
        notes: [
          lead.requestType === "offerte" ? "Nieuwe offerte-aanvraag via interactieve brochure." : "Nieuwe aanvraag via interactieve brochure.",
          "",
          lead.doelgroep ? `Doelgroep: ${lead.doelgroep}` : "",
          lead.aantalDeelnemers ? `Aantal deelnemers: ${lead.aantalDeelnemers}` : "",
          lead.gewensteDatum ? `Gewenste datum: ${lead.gewensteDatum}` : "",
          lead.locatie ? `Locatie: ${lead.locatie}` : "",
          "",
          "Bericht:",
          lead.bericht || ""
        ].filter(line => line !== "").join("\n"),
        contacts: [{ id: uid(), name: lead.naam || "", role: lead.functie || "", email: lead.email || "", phone: lead.telefoon || "", linkedin: "", remarks: "" }],
        interests: [lead.workshop || lead.workshopinteresse || "Nog onbekend"],
        need: lead.bericht || "",
        timeline: [{ id: uid(), date: today(), type: "Nieuwe aanvraag", description: lead.requestType === "offerte" ? "Offerte-aanvraag ontvangen via interactieve brochure." : "Aanvraag ontvangen via interactieve brochure.", nextAction: lead.requestType === "offerte" ? "Offerte maken" : "Kennismaking plannen", attachment: "" }],
        actions: [{ id: uid(), title: lead.requestType === "offerte" ? "Offerte maken" : "Kennismaking plannen", deadline: today(), status: "open", note: "Leadstatus: Nieuwe aanvraag. Bron: Interactieve brochure." }]
      };
      state.organizations.unshift(org);
      imported += 1;
    }
    if (imported) {
      save();
      render();
      toast(`${imported} brochure-aanvraag geïmporteerd`);
    }
  } catch {}
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2200);
}

function statusColor(status) {
  return state.settings.statusColors[status] || "#6f6258";
}

function badge(status) {
  return `<span class="badge" style="background:${statusColor(status)}">${escapeHtml(status)}</span>`;
}

function selectOptions(items, selected = "") {
  return items.map(item => `<option value="${escapeHtml(item)}" ${item === selected ? "selected" : ""}>${escapeHtml(item)}</option>`).join("");
}

function routeTo(route) {
  currentRoute = route;
  $$(".page").forEach(page => page.classList.toggle("active", page.id === `page-${route}`));
  $$(".menu button").forEach(button => button.classList.toggle("active", button.dataset.route === route));
  document.body.classList.remove("menu-open");
  render();
}

function visibleOrganizations() {
  const query = $("#globalSearch")?.value.trim().toLowerCase() || "";
  if (!query) return state.organizations;
  return state.organizations.filter(org => [
    org.name, org.contactName, org.city, org.email, org.workshop, org.notes, org.type, org.status,
    ...(org.contacts || []).flatMap(contact => [contact.name, contact.email, contact.remarks])
  ].join(" ").toLowerCase().includes(query));
}

function counts() {
  const orgs = visibleOrganizations();
  const countStatus = name => orgs.filter(org => org.status === name).length;
  return [
    ["Organisaties totaal", orgs.length, "#2d2018"],
    ["Mail verstuurd", countStatus("Mail verstuurd"), statusColor("Mail verstuurd")],
    ["Wachten op reactie", countStatus("Wachten op reactie"), statusColor("Wachten op reactie")],
    ["Contact gelegd", countStatus("Contact gelegd"), statusColor("Contact gelegd")],
    ["Kennismaking gepland", countStatus("Kennismaking gepland"), statusColor("Kennismaking gepland")],
    ["Offerte verstuurd", countStatus("Offerte verstuurd"), statusColor("Offerte verstuurd")],
    ["Samenwerking gestart", countStatus("Samenwerking gestart"), statusColor("Samenwerking gestart")],
    ["Geen interesse", countStatus("Geen interesse"), statusColor("Geen interesse")],
    ["Later opnieuw benaderen", countStatus("Later opnieuw benaderen"), statusColor("Later opnieuw benaderen")]
  ];
}

function renderMenu() {
  $("#mainMenu").innerHTML = menuItems.map(([route, label], index) => `<button data-route="${route}" class="${route === currentRoute ? "active" : ""}"><span>${String(index + 1).padStart(2, "0")}</span>${label}</button>`).join("");
}

function pageHead(title, lead, actions = "") {
  return `<div class="page-head"><div><p class="eyebrow">Samen Actief & Verbonden CRM</p><h1>${title}</h1><p class="lead">${lead}</p></div><div class="actions-row">${actions}</div></div>`;
}

function renderDashboard() {
  const overdue = allActions().filter(item => item.action.status !== "afgerond" && item.action.deadline < today()).slice(0, 5);
  const hot = state.organizations.filter(org => ["Contact gelegd", "Kennismaking gepland", "Offerte verstuurd", "In behandeling"].includes(org.status)).slice(0, 5);
  $("#page-dashboard").innerHTML = `
    ${pageHead("Samen Actief & Verbonden CRM", "Outreach, opvolging en samenwerkingen. Een centrale plek voor scholen, buurthuizen, gemeenten, bibliotheken en maatschappelijke partners.", `<button class="btn primary" data-action="add-org">Organisatie toevoegen</button>`)}
    <div class="metric-grid">${counts().map(([label, value, color]) => `<article class="metric-card"><i style="background:${color}"></i><span>${label}</span><strong>${value}</strong></article>`).join("")}</div>
    <div class="dashboard-layout">
      <section class="panel"><div class="panel-head"><h2>Kansen in beweging</h2><button class="btn small secondary" data-route="pipeline">Pipeline bekijken</button></div><div class="panel-body list">
        ${hot.length ? hot.map(org => orgMini(org)).join("") : `<div class="empty">Nog geen actieve kansen.</div>`}
      </div></section>
      <section class="panel"><div class="panel-head"><h2>Opvolging</h2><button class="btn small secondary" data-route="opvolging">Alle acties</button></div><div class="panel-body list">
        ${overdue.length ? overdue.map(actionMini).join("") : `<div class="empty">Geen te late acties. Dat voelt netjes.</div>`}
      </div></section>
    </div>`;
}

function orgMini(org) {
  return `<article class="list-item"><div class="list-item-head"><strong>${escapeHtml(org.name)}</strong>${badge(org.status)}</div><span class="muted">${escapeHtml(org.type)} · ${escapeHtml(org.city)} · ${escapeHtml(org.workshop)}</span><span>${escapeHtml(org.nextAction || "Geen actie")} ${org.followUpDate ? `op ${nlDate(org.followUpDate)}` : ""}</span></article>`;
}

function actionMini(item) {
  return `<article class="list-item"><div class="list-item-head"><strong>${escapeHtml(item.action.title)}</strong><span class="chip">${nlDate(item.action.deadline)}</span></div><span class="muted">${escapeHtml(item.org.name)} · ${escapeHtml(item.action.note || item.org.nextAction || "")}</span></article>`;
}

function renderOrganizations() {
  const settings = state.settings;
  const filters = getOrgFilters();
  let orgs = visibleOrganizations().filter(org =>
    (!filters.status || org.status === filters.status) &&
    (!filters.type || org.type === filters.type) &&
    (!filters.city || org.city.toLowerCase().includes(filters.city.toLowerCase())) &&
    (!filters.workshop || org.workshop === filters.workshop) &&
    (!filters.followUpDate || org.followUpDate === filters.followUpDate)
  );
  orgs.sort((a, b) => filters.sort === "followUpDate" ? (a.followUpDate || "").localeCompare(b.followUpDate || "") : (b.lastContact || "").localeCompare(a.lastContact || ""));
  $("#page-organisaties").innerHTML = `
    ${pageHead("Organisaties", "Beheer alle benaderde organisaties, contactpersonen, interesses, statussen en opvolgacties.", `<button class="btn secondary" data-action="export-csv">CSV</button><button class="btn secondary" data-action="export-pdf">PDF</button><button class="btn primary" data-action="add-org">Toevoegen</button>`)}
    <div class="filter-grid">
      <select id="filterStatus"><option value="">Alle statussen</option>${selectOptions(settings.statuses, filters.status)}</select>
      <select id="filterType"><option value="">Alle types</option>${selectOptions(settings.organizationTypes, filters.type)}</select>
      <input id="filterCity" placeholder="Plaats" value="${escapeHtml(filters.city)}">
      <select id="filterWorkshop"><option value="">Alle workshops</option>${selectOptions(settings.workshops, filters.workshop)}</select>
      <input id="filterFollow" type="date" value="${escapeHtml(filters.followUpDate)}">
      <select id="filterSort"><option value="lastContact" ${filters.sort === "lastContact" ? "selected" : ""}>Laatste contact</option><option value="followUpDate" ${filters.sort === "followUpDate" ? "selected" : ""}>Datum opvolging</option></select>
    </div>
    <div class="table-wrap"><table><thead><tr>
      ${["Organisatie", "Type organisatie", "Plaats", "Contactpersoon", "Functie", "E-mailadres", "Telefoon", "Website", "Workshop", "Status", "Laatste contact", "Volgende actie", "Datum opvolging", "Notities", "Acties"].map(h => `<th>${h}</th>`).join("")}
    </tr></thead><tbody>
      ${orgs.map(org => `<tr>
        <td><button class="linklike" data-action="detail-org" data-id="${org.id}">${escapeHtml(org.name)}</button></td>
        <td>${escapeHtml(org.type)}</td><td>${escapeHtml(org.city)}</td><td>${escapeHtml(org.contactName)}</td><td>${escapeHtml(org.contactRole)}</td>
        <td>${escapeHtml(org.email)}</td><td>${escapeHtml(org.phone)}</td><td>${org.website ? `<a href="${escapeHtml(org.website)}" target="_blank" rel="noreferrer">Website</a>` : ""}</td>
        <td>${escapeHtml(org.workshop)}</td><td>${badge(org.status)}</td><td>${nlDate(org.lastContact)}</td><td>${escapeHtml(org.nextAction)}</td><td>${nlDate(org.followUpDate)}</td>
        <td>${escapeHtml(org.notes).slice(0, 120)}</td>
        <td class="cell-actions"><button class="btn small" data-action="edit-org" data-id="${org.id}">Bewerk</button><button class="btn small secondary" data-action="detail-org" data-id="${org.id}">Detail</button></td>
      </tr>`).join("")}
    </tbody></table></div>`;
}

function getOrgFilters() {
  return {
    status: $("#filterStatus")?.value || "", type: $("#filterType")?.value || "", city: $("#filterCity")?.value || "",
    workshop: $("#filterWorkshop")?.value || "", followUpDate: $("#filterFollow")?.value || "", sort: $("#filterSort")?.value || "lastContact"
  };
}

function renderPipeline() {
  const columns = ["Nieuw", "Mail verstuurd", "Wachten op reactie", "Contact gelegd", "Kennismaking gepland", "Offerte verstuurd", "Samenwerking gestart", "Geen interesse", "Later opnieuw benaderen"];
  $("#page-pipeline").innerHTML = `
    ${pageHead("Pipeline", "Sleep organisaties tussen fases. De status wordt automatisch bijgewerkt en het contactmoment komt in de tijdlijn.", `<button class="btn primary" data-action="add-org">Organisatie toevoegen</button>`)}
    <div class="pipeline">${columns.map(status => {
      const orgs = visibleOrganizations().filter(org => org.status === status);
      return `<section class="pipe-col" data-status="${escapeHtml(status)}"><div class="pipe-head"><span>${escapeHtml(status)}</span><span class="chip">${orgs.length}</span></div><div class="pipe-body">
        ${orgs.map(org => `<article class="pipe-card" draggable="true" data-id="${org.id}">
          <strong>${escapeHtml(org.name)}</strong><small>${escapeHtml(org.type)} · ${escapeHtml(org.city)}</small><small>${escapeHtml(org.workshop)}</small><small>${escapeHtml(org.nextAction || "Geen actie")} · ${nlDate(org.followUpDate)}</small>
        </article>`).join("")}
      </div></section>`;
    }).join("")}</div>`;
}

function allActions() {
  return state.organizations.flatMap(org => (org.actions || []).map(action => ({ org, action })));
}

function renderFollowUp() {
  const now = today();
  const week = addDays(7);
  const groups = [
    ["Te laat", item => item.action.status !== "afgerond" && item.action.deadline && item.action.deadline < now],
    ["Vandaag", item => item.action.status !== "afgerond" && item.action.deadline === now],
    ["Deze week", item => item.action.status !== "afgerond" && item.action.deadline > now && item.action.deadline <= week],
    ["Komende weken", item => item.action.status !== "afgerond" && item.action.deadline > week],
    ["Afgerond", item => item.action.status === "afgerond"]
  ];
  $("#page-opvolging").innerHTML = `
    ${pageHead("Opvolging", "Alle open acties op datum, zodat follow ups, belmomenten en offertes niet blijven liggen.")}
    <div class="split-grid">${groups.map(([title, test]) => {
      const items = allActions().filter(test).sort((a, b) => (a.action.deadline || "").localeCompare(b.action.deadline || ""));
      return `<section class="panel"><div class="panel-head"><h2>${title}</h2><span class="chip">${items.length}</span></div><div class="panel-body list">
        ${items.length ? items.map(item => `<article class="list-item check-row">
          <input type="checkbox" data-action="complete-action" data-org="${item.org.id}" data-id="${item.action.id}" ${item.action.status === "afgerond" ? "checked" : ""}>
          <div><strong>${escapeHtml(item.action.title)}</strong><p class="muted">${escapeHtml(item.org.name)} · ${nlDate(item.action.deadline)} · ${escapeHtml(item.action.note || "")}</p></div>
          <button class="btn small" data-action="detail-org" data-id="${item.org.id}">Open</button>
        </article>`).join("") : `<div class="empty">Geen acties.</div>`}
      </div></section>`;
    }).join("")}</div>`;
}

function renderMeetings() {
  $("#page-gesprekken").innerHTML = `
    ${pageHead("Gesprekken", "Overzicht van geplande kennismakingsgesprekken en vervolgacties.", `<button class="btn primary" data-action="add-meeting">Gesprek toevoegen</button>`)}
    ${simpleTable(["Organisatie", "Contactpersoon", "Datum", "Tijd", "Type gesprek", "Workshop interesse", "Vervolgactie", "Acties"], state.meetings.map(item => [
      item.organization, item.contact, nlDate(item.date), item.time, item.type, item.workshop, item.next,
      `<button class="btn small" data-action="edit-meeting" data-id="${item.id}">Bewerk</button>`
    ]))}`;
}

function renderQuotes() {
  $("#page-offertes").innerHTML = `
    ${pageHead("Offertes", "Volg offertes, bedragen, statussen en opvolgmomenten.", `<button class="btn primary" data-action="add-quote">Offerte toevoegen</button>`)}
    ${simpleTable(["Organisatie", "Workshop of traject", "Datum offerte", "Bedrag", "Status offerte", "Offertenummer", "Link", "Datum opvolging", "Acties"], state.quotes.map(item => [
      item.organization, item.workshop, nlDate(item.date), item.amount ? `€ ${escapeHtml(item.amount)}` : "", item.status, item.number,
      item.link ? `<a href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">Open</a>` : "", nlDate(item.followUpDate),
      `<button class="btn small" data-action="edit-quote" data-id="${item.id}">Bewerk</button>`
    ]))}`;
}

function simpleTable(headers, rows) {
  return `<div class="table-wrap"><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell ?? ""}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function renderTemplates() {
  $("#page-templates").innerHTML = `
    ${pageHead("Templates", "Standaardteksten voor koude mails, follow ups, kennismakingen, brochures, belscripts en offertes.", `<button class="btn primary" data-action="add-template">Template toevoegen</button>`)}
    <div class="template-grid">${state.templates.map(template => `<article class="panel template-card">
      <div class="panel-head"><div><h2>${escapeHtml(template.title)}</h2><span class="muted">${escapeHtml(template.category)}</span></div><button class="btn small secondary" data-action="copy-template" data-id="${template.id}">Kopieren</button></div>
      <div class="panel-body"><textarea data-template="${template.id}">${escapeHtml(template.text)}</textarea><div class="actions-row"><button class="btn small primary" data-action="save-template" data-id="${template.id}">Opslaan</button><button class="btn small" data-action="edit-template" data-id="${template.id}">Bewerk titel</button></div></div>
    </article>`).join("")}</div>`;
}

function renderStats() {
  const orgs = visibleOrganizations();
  const sent = orgs.filter(o => ["Mail verstuurd", "Wachten op reactie", "Contact gelegd", "Kennismaking gepland", "Gesprek gevoerd", "Offerte verstuurd", "In behandeling", "Samenwerking gestart", "Geen interesse", "Later opnieuw benaderen"].includes(o.status)).length;
  const responses = orgs.filter(o => ["Contact gelegd", "Kennismaking gepland", "Gesprek gevoerd", "Offerte verstuurd", "In behandeling", "Samenwerking gestart"].includes(o.status)).length;
  const meetings = orgs.filter(o => ["Kennismaking gepland", "Gesprek gevoerd", "Offerte verstuurd", "In behandeling", "Samenwerking gestart"].includes(o.status)).length;
  const quotes = orgs.filter(o => ["Offerte verstuurd", "In behandeling", "Samenwerking gestart"].includes(o.status)).length;
  const wins = orgs.filter(o => o.status === "Samenwerking gestart").length;
  const pct = (a, b) => b ? `${Math.round((a / b) * 100)}%` : "0%";
  const stats = [
    ["Totaal aantal organisaties", orgs.length], ["Aantal mails verstuurd", sent], ["Aantal reacties", responses],
    ["Aantal gesprekken gepland", meetings], ["Aantal offertes verstuurd", quotes], ["Aantal samenwerkingen gestart", wins],
    ["Aantal organisaties zonder reactie", orgs.filter(o => o.status === "Wachten op reactie").length],
    ["Conversie mail naar reactie", pct(responses, sent)], ["Conversie gesprek naar offerte", pct(quotes, meetings)], ["Conversie offerte naar samenwerking", pct(wins, quotes)]
  ];
  $("#page-statistieken").innerHTML = `
    ${pageHead("Statistieken", "Bekijk voortgang en conversie. De globale zoekbalk werkt ook als snelle filter op deze pagina.")}
    <div class="filter-grid"><select><option>Per maand</option><option>Per kwartaal</option></select><select><option>Per workshop</option>${selectOptions(state.settings.workshops)}</select><select><option>Per type organisatie</option>${selectOptions(state.settings.organizationTypes)}</select><input placeholder="Per plaats"></div>
    <div class="stats-grid">${stats.map(([label, value]) => `<article class="stat-card"><span class="muted">${label}</span><strong>${value}</strong></article>`).join("")}</div>`;
}

function renderNotes() {
  $("#page-notities").innerHTML = `
    ${pageHead("Notities & kansen", "Vrije pagina voor ideeen, subsidiekansen en mogelijke samenwerkingen.", `<button class="btn primary" data-action="add-opportunity">Kans toevoegen</button>`)}
    ${simpleTable(["Organisatie of partner", "Idee", "Mogelijke samenwerking", "Subsidiekans", "Opmerking", "Status", "Volgende stap", "Acties"], state.opportunities.map(item => [
      item.partner, item.idea, item.collaboration, item.subsidy, item.remark, item.status, item.next,
      `<button class="btn small" data-action="edit-opportunity" data-id="${item.id}">Bewerk</button>`
    ]))}`;
}

function renderSettings() {
  const s = state.settings;
  $("#page-instellingen").innerHTML = `
    ${pageHead("Instellingen", "Pas keuzelijsten en statuskleuren aan. Nieuwe waarden zijn direct beschikbaar in formulieren en filters.")}
    <div class="settings-grid">
      ${settingsText("Statusnamen", "statuses", s.statuses)}
      ${settingsText("Workshopnamen", "workshops", s.workshops)}
      ${settingsText("Type organisaties", "organizationTypes", s.organizationTypes)}
      ${settingsText("Actie opties", "actions", s.actions)}
      ${settingsText("Template categorieen", "templateCategories", s.templateCategories)}
      <article class="panel settings-card"><div class="panel-head"><h2>Statuskleuren</h2></div><div class="panel-body list">
        ${s.statuses.map(status => `<label>${escapeHtml(status)}<input type="color" data-color-status="${escapeHtml(status)}" value="${statusColor(status)}"></label>`).join("")}
      </div></article>
    </div>`;
}

function settingsText(title, key, values) {
  return `<article class="panel settings-card"><div class="panel-head"><h2>${title}</h2><button class="btn small primary" data-action="save-setting" data-key="${key}">Opslaan</button></div><div class="panel-body"><textarea data-setting="${key}">${escapeHtml(values.join("\n"))}</textarea></div></article>`;
}

function render() {
  renderMenu();
  const renderers = {
    dashboard: renderDashboard, organisaties: renderOrganizations, pipeline: renderPipeline, opvolging: renderFollowUp,
    gesprekken: renderMeetings, offertes: renderQuotes, templates: renderTemplates, statistieken: renderStats,
    notities: renderNotes, instellingen: renderSettings
  };
  renderers[currentRoute]();
}

function fillOrgSelects(org = {}) {
  const fields = $("#orgForm").elements;
  fields.type.innerHTML = selectOptions(state.settings.organizationTypes, org.type);
  fields.workshop.innerHTML = selectOptions(state.settings.workshops, org.workshop);
  fields.status.innerHTML = selectOptions(state.settings.statuses, org.status);
  fields.nextAction.innerHTML = selectOptions(state.settings.actions, org.nextAction);
}

function openOrgModal(id = null) {
  editingOrgId = id;
  const org = id ? state.organizations.find(item => item.id === id) : {};
  $("#orgModalTitle").textContent = id ? "Organisatie bewerken" : "Organisatie toevoegen";
  $("#deleteOrg").style.visibility = id ? "visible" : "hidden";
  fillOrgSelects(org);
  const fields = $("#orgForm").elements;
  ["name", "address", "city", "contactName", "contactRole", "email", "phone", "website", "lastContact", "followUpDate", "notes"].forEach(key => fields[key].value = org[key] || "");
  fields.type.value = org.type || state.settings.organizationTypes[0];
  fields.workshop.value = org.workshop || state.settings.workshops[0];
  fields.status.value = org.status || "Nieuw";
  fields.nextAction.value = org.nextAction || "Eerste mail sturen";
  $("#orgModal").showModal();
}

function saveOrgFromForm(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const data = Object.fromEntries(form.entries());
  if (editingOrgId) {
    const org = state.organizations.find(item => item.id === editingOrgId);
    Object.assign(org, data);
    org.contacts ||= [];
    if (!org.contacts.length) org.contacts.push({ id: uid() });
    Object.assign(org.contacts[0], { name: data.contactName, role: data.contactRole, email: data.email, phone: data.phone });
  } else {
    const org = {
      id: uid(), ...data,
      contacts: [{ id: uid(), name: data.contactName, role: data.contactRole, email: data.email, phone: data.phone, linkedin: "", remarks: "" }],
      interests: data.workshop ? [data.workshop] : [],
      need: "", timeline: [{ id: uid(), date: today(), type: "Organisatie toegevoegd", description: "Organisatie toegevoegd aan CRM.", nextAction: data.nextAction, attachment: "" }],
      actions: data.nextAction && data.nextAction !== "Geen actie" ? [{ id: uid(), title: data.nextAction, deadline: data.followUpDate || today(), status: "open", note: "" }] : []
    };
    state.organizations.unshift(org);
  }
  save();
  $("#orgModal").close();
  render();
  toast("Organisatie opgeslagen");
}

function deleteEditingOrg() {
  if (!editingOrgId) return;
  state.organizations = state.organizations.filter(org => org.id !== editingOrgId);
  save();
  $("#orgModal").close();
  render();
  toast("Organisatie verwijderd");
}

function openDetail(id) {
  const org = state.organizations.find(item => item.id === id);
  if (!org) return;
  $("#detailTitle").textContent = org.name;
  $("#detailContent").innerHTML = `
    <div class="detail-grid">
      <section class="detail-card"><h3>Basisgegevens</h3><div class="kv">
        ${kv("Naam organisatie", org.name)}${kv("Type organisatie", org.type)}${kv("Adres", org.address)}${kv("Plaats", org.city)}${kv("Website", org.website)}${kv("Algemeen e-mailadres", org.email)}${kv("Algemeen telefoonnummer", org.phone)}
      </div><div class="actions-row"><button class="btn small primary" data-action="edit-org" data-id="${org.id}">Basisgegevens bewerken</button></div></section>
      <section class="detail-card"><div class="list-item-head"><h3>Contactpersonen</h3><button class="btn small" data-action="add-contact" data-id="${org.id}">Toevoegen</button></div><div class="list">${(org.contacts || []).map(contact => `<article class="list-item"><strong>${escapeHtml(contact.name || "Naam onbekend")}</strong><span class="muted">${escapeHtml(contact.role || "")} · ${escapeHtml(contact.email || "")} · ${escapeHtml(contact.phone || "")}</span><span>${escapeHtml(contact.linkedin || "")}</span><p>${escapeHtml(contact.remarks || "")}</p></article>`).join("")}</div></section>
      <section class="detail-card"><h3>Interesse</h3><div class="list">${state.settings.workshops.filter(w => w !== "Meerdere workshops").map(w => `<label class="check-row"><input type="checkbox" data-action="toggle-interest" data-id="${org.id}" value="${escapeHtml(w)}" ${(org.interests || []).includes(w) ? "checked" : ""}><span>${escapeHtml(w)}</span></label>`).join("")}</div><label>Specifieke behoefte of vraag<textarea data-action="need" data-id="${org.id}">${escapeHtml(org.need || "")}</textarea></label></section>
      <section class="detail-card"><h3>Status</h3><p>${badge(org.status)}</p><label>Status<select data-action="status-detail" data-id="${org.id}">${selectOptions(state.settings.statuses, org.status)}</select></label></section>
      <section class="detail-card full"><div class="list-item-head"><h3>Tijdlijn</h3><button class="btn small" data-action="add-timeline" data-id="${org.id}">Item toevoegen</button></div><div class="timeline">${(org.timeline || []).sort((a,b) => (b.date || "").localeCompare(a.date || "")).map(item => `<article class="timeline-item"><strong>${nlDate(item.date)} · ${escapeHtml(item.type)}</strong><p>${escapeHtml(item.description)}</p><span class="muted">${escapeHtml(item.nextAction || "")} ${item.attachment ? `· ${escapeHtml(item.attachment)}` : ""}</span></article>`).join("")}</div></section>
      <section class="detail-card full"><div class="list-item-head"><h3>Acties</h3><button class="btn small" data-action="add-action" data-id="${org.id}">Actie toevoegen</button></div><div class="list">${(org.actions || []).map(action => `<article class="list-item check-row"><input type="checkbox" data-action="complete-action" data-org="${org.id}" data-id="${action.id}" ${action.status === "afgerond" ? "checked" : ""}><div><strong>${escapeHtml(action.title)}</strong><p class="muted">${nlDate(action.deadline)} · ${escapeHtml(action.status)} · ${escapeHtml(action.note || "")}</p></div><span></span></article>`).join("")}</div></section>
      <section class="detail-card full notes-card"><h3>Notities</h3><textarea data-action="notes" data-id="${org.id}">${escapeHtml(org.notes || "")}</textarea></section>
    </div>`;
  $("#detailModal").showModal();
}

function kv(label, value) {
  return `<div><span>${label}</span><strong>${value ? escapeHtml(value) : "<em class='muted'>Niet ingevuld</em>"}</strong></div>`;
}

function openSimple(title, eyebrow, fields, initial, callback) {
  simpleCallback = callback;
  $("#simpleTitle").textContent = title;
  $("#simpleEyebrow").textContent = eyebrow;
  $("#simpleFields").innerHTML = fields.map(field => {
    const value = initial?.[field.name] || "";
    if (field.type === "select") return `<label>${field.label}<select name="${field.name}">${selectOptions(field.options, value)}</select></label>`;
    if (field.type === "textarea") return `<label class="wide">${field.label}<textarea name="${field.name}" rows="4">${escapeHtml(value)}</textarea></label>`;
    return `<label>${field.label}<input name="${field.name}" type="${field.type || "text"}" value="${escapeHtml(value)}"></label>`;
  }).join("");
  $("#simpleModal").showModal();
}

function saveSimple(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  simpleCallback?.(data);
  simpleCallback = null;
  $("#simpleModal").close();
  save();
  render();
  toast("Opgeslagen");
}

function exportCsv() {
  const rows = visibleOrganizations().map(org => [org.name, org.type, org.city, org.contactName, org.contactRole, org.email, org.phone, org.website, org.workshop, org.status, org.lastContact, org.nextAction, org.followUpDate, org.notes]);
  const headers = ["Organisatie", "Type organisatie", "Plaats", "Contactpersoon", "Functie contactpersoon", "E-mailadres", "Telefoonnummer", "Website", "Workshop of traject", "Status", "Laatste contact", "Volgende actie", "Datum opvolging", "Notities"];
  const csv = [headers, ...rows].map(row => row.map(cell => `"${String(cell || "").replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `samen-actief-crm-${today()}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function exportPdf() {
  const printWindow = window.open("", "_blank");
  const rows = visibleOrganizations().map(org => `<tr><td>${escapeHtml(org.name)}</td><td>${escapeHtml(org.type)}</td><td>${escapeHtml(org.city)}</td><td>${escapeHtml(org.contactName)}</td><td>${escapeHtml(org.workshop)}</td><td>${escapeHtml(org.status)}</td><td>${nlDate(org.followUpDate)}</td></tr>`).join("");
  printWindow.document.write(`<!doctype html><title>Samen Actief & Verbonden CRM</title><style>body{font-family:Arial,sans-serif;padding:24px;color:#201711}table{width:100%;border-collapse:collapse}td,th{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f3eadc}</style><h1>Samen Actief & Verbonden CRM</h1><p>Export ${nlDate(today())}</p><table><thead><tr><th>Organisatie</th><th>Type</th><th>Plaats</th><th>Contactpersoon</th><th>Workshop</th><th>Status</th><th>Opvolging</th></tr></thead><tbody>${rows}</tbody></table>`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function meetingFields() {
  return [
    { name: "organization", label: "Organisatie" }, { name: "contact", label: "Contactpersoon" }, { name: "date", label: "Datum", type: "date" },
    { name: "time", label: "Tijd", type: "time" }, { name: "type", label: "Type gesprek", type: "select", options: ["telefonisch", "online", "fysiek"] },
    { name: "workshop", label: "Workshop interesse", type: "select", options: state.settings.workshops }, { name: "prep", label: "Voorbereidingsnotities", type: "textarea" },
    { name: "notes", label: "Gespreksnotities", type: "textarea" }, { name: "next", label: "Vervolgactie" }
  ];
}

function quoteFields() {
  return [
    { name: "organization", label: "Organisatie" }, { name: "workshop", label: "Workshop of traject", type: "select", options: state.settings.workshops },
    { name: "date", label: "Datum offerte", type: "date" }, { name: "amount", label: "Bedrag" },
    { name: "status", label: "Status offerte", type: "select", options: ["Nog maken", "Verstuurd", "In behandeling", "Goedgekeurd", "Afgewezen", "Aanpassen"] },
    { name: "number", label: "Offertenummer" }, { name: "link", label: "Link naar offerte", type: "url" }, { name: "followUpDate", label: "Datum opvolging", type: "date" }, { name: "notes", label: "Notities", type: "textarea" }
  ];
}

function opportunityFields() {
  return [
    { name: "partner", label: "Organisatie of partner" }, { name: "idea", label: "Idee" }, { name: "collaboration", label: "Mogelijke samenwerking" },
    { name: "subsidy", label: "Subsidiekans" }, { name: "remark", label: "Opmerking", type: "textarea" },
    { name: "status", label: "Status", type: "select", options: ["Idee", "Onderzoeken", "Interessant", "Later oppakken", "Actief"] }, { name: "next", label: "Volgende stap" }
  ];
}

function bindEvents() {
  document.addEventListener("click", event => {
    const target = event.target.closest("button");
    if (!target) return;
    if (target.dataset.closeModal) {
      document.getElementById(target.dataset.closeModal)?.close();
      return;
    }
    const action = target.dataset.action;
    if (target.dataset.route) routeTo(target.dataset.route);
    if (action === "add-org") openOrgModal();
    if (action === "edit-org") openOrgModal(target.dataset.id);
    if (action === "detail-org") openDetail(target.dataset.id);
    if (action === "export-csv") exportCsv();
    if (action === "export-pdf") exportPdf();
    if (action === "add-meeting") openSimple("Gesprek toevoegen", "Gesprekken", meetingFields(), { date: today(), type: "online" }, data => state.meetings.unshift({ id: uid(), ...data }));
    if (action === "edit-meeting") editCollection("Gesprek bewerken", "Gesprekken", meetingFields(), state.meetings, target.dataset.id);
    if (action === "add-quote") openSimple("Offerte toevoegen", "Offertes", quoteFields(), { date: today(), status: "Nog maken" }, data => state.quotes.unshift({ id: uid(), ...data }));
    if (action === "edit-quote") editCollection("Offerte bewerken", "Offertes", quoteFields(), state.quotes, target.dataset.id);
    if (action === "add-opportunity") openSimple("Kans toevoegen", "Notities & kansen", opportunityFields(), { status: "Idee" }, data => state.opportunities.unshift({ id: uid(), ...data }));
    if (action === "edit-opportunity") editCollection("Kans bewerken", "Notities & kansen", opportunityFields(), state.opportunities, target.dataset.id);
    if (action === "copy-template") copyTemplate(target.dataset.id);
    if (action === "save-template") saveTemplate(target.dataset.id);
    if (action === "edit-template") editTemplate(target.dataset.id);
    if (action === "add-template") addTemplate();
    if (action === "save-setting") saveSetting(target.dataset.key);
    if (action === "add-contact") addContact(target.dataset.id);
    if (action === "add-timeline") addTimeline(target.dataset.id);
    if (action === "add-action") addAction(target.dataset.id);
  });

  document.addEventListener("change", event => {
    const el = event.target;
    if (["filterStatus", "filterType", "filterCity", "filterWorkshop", "filterFollow", "filterSort"].includes(el.id)) renderOrganizations();
    if (el.dataset.action === "complete-action") completeAction(el.dataset.org, el.dataset.id, el.checked);
    if (el.dataset.action === "toggle-interest") toggleInterest(el.dataset.id, el.value, el.checked);
    if (el.dataset.action === "status-detail") updateOrg(el.dataset.id, { status: el.value, lastContact: today() }, "Status bijgewerkt");
    if (el.dataset.colorStatus) {
      state.settings.statusColors[el.dataset.colorStatus] = el.value;
      save();
      render();
    }
  });

  document.addEventListener("input", event => {
    const el = event.target;
    if (el.id === "globalSearch") render();
    if (["filterCity"].includes(el.id)) renderOrganizations();
    if (el.dataset.action === "notes") updateOrg(el.dataset.id, { notes: el.value }, null, false);
    if (el.dataset.action === "need") updateOrg(el.dataset.id, { need: el.value }, null, false);
  });

  document.addEventListener("dragstart", event => {
    const card = event.target.closest(".pipe-card");
    if (card) event.dataTransfer.setData("text/plain", card.dataset.id);
  });
  document.addEventListener("dragover", event => {
    const col = event.target.closest(".pipe-col");
    if (!col) return;
    event.preventDefault();
    col.classList.add("drag-over");
  });
  document.addEventListener("dragleave", event => event.target.closest(".pipe-col")?.classList.remove("drag-over"));
  document.addEventListener("drop", event => {
    const col = event.target.closest(".pipe-col");
    if (!col) return;
    event.preventDefault();
    col.classList.remove("drag-over");
    const id = event.dataTransfer.getData("text/plain");
    const org = state.organizations.find(item => item.id === id);
    if (org && org.status !== col.dataset.status) {
      org.status = col.dataset.status;
      org.lastContact = today();
      org.timeline ||= [];
      org.timeline.push({ id: uid(), date: today(), type: "Status gewijzigd", description: `Verplaatst naar ${col.dataset.status}.`, nextAction: org.nextAction || "", attachment: "" });
      save();
      renderPipeline();
      toast("Status bijgewerkt");
    }
  });

  $("#menuToggle").addEventListener("click", () => document.body.classList.toggle("menu-open"));
  $("#quickAdd").addEventListener("click", () => openOrgModal());
  $("#orgForm").addEventListener("submit", saveOrgFromForm);
  $("#deleteOrg").addEventListener("click", deleteEditingOrg);
  $("#simpleForm").addEventListener("submit", saveSimple);
  $("#closeDetail").addEventListener("click", () => $("#detailModal").close());
}

function editCollection(title, eyebrow, fields, collection, id) {
  const item = collection.find(entry => entry.id === id);
  openSimple(title, eyebrow, fields, item, data => Object.assign(item, data));
}

function updateOrg(id, patch, message, rerender = true) {
  const org = state.organizations.find(item => item.id === id);
  if (!org) return;
  Object.assign(org, patch);
  save();
  if (message) toast(message);
  if (rerender) {
    render();
    if ($("#detailModal").open) openDetail(id);
  }
}

function completeAction(orgId, actionId, checked) {
  const org = state.organizations.find(item => item.id === orgId);
  const action = org?.actions?.find(item => item.id === actionId);
  if (!action) return;
  action.status = checked ? "afgerond" : "open";
  if (checked) {
    org.timeline ||= [];
    org.timeline.push({ id: uid(), date: today(), type: "Follow up gedaan", description: `Actie afgerond: ${action.title}.`, nextAction: "", attachment: "" });
  }
  save();
  render();
}

function toggleInterest(orgId, workshop, checked) {
  const org = state.organizations.find(item => item.id === orgId);
  if (!org) return;
  org.interests ||= [];
  org.interests = checked ? [...new Set([...org.interests, workshop])] : org.interests.filter(item => item !== workshop);
  org.workshop = org.interests.length > 1 ? "Meerdere workshops" : (org.interests[0] || "Nog onbekend");
  save();
}

function addContact(orgId) {
  openSimple("Contactpersoon toevoegen", "Organisatie", [
    { name: "name", label: "Naam" }, { name: "role", label: "Functie" }, { name: "email", label: "E-mailadres", type: "email" },
    { name: "phone", label: "Telefoonnummer" }, { name: "linkedin", label: "LinkedIn" }, { name: "remarks", label: "Opmerkingen", type: "textarea" }
  ], {}, data => {
    const org = state.organizations.find(item => item.id === orgId);
    org.contacts ||= [];
    org.contacts.push({ id: uid(), ...data });
  });
}

function addTimeline(orgId) {
  openSimple("Tijdlijnitem toevoegen", "Contactmoment", [
    { name: "date", label: "Datum", type: "date" }, { name: "type", label: "Type contact", type: "select", options: ["Organisatie toegevoegd", "Mail verstuurd", "Reactie ontvangen", "Gebeld", "Kennismaking gepland", "Gesprek gevoerd", "Offerte verstuurd", "Follow up gedaan", "Samenwerking gestart", "Geen interesse"] },
    { name: "description", label: "Korte omschrijving", type: "textarea" }, { name: "nextAction", label: "Volgende actie", type: "select", options: state.settings.actions }, { name: "attachment", label: "Bijlage optioneel" }
  ], { date: today(), type: "Mail verstuurd" }, data => {
    const org = state.organizations.find(item => item.id === orgId);
    org.timeline ||= [];
    org.timeline.push({ id: uid(), ...data });
    org.lastContact = data.date;
    org.nextAction = data.nextAction;
  });
}

function addAction(orgId) {
  openSimple("Actie toevoegen", "Opvolging", [
    { name: "title", label: "Actietitel", type: "select", options: state.settings.actions }, { name: "deadline", label: "Deadline", type: "date" },
    { name: "status", label: "Status", type: "select", options: ["open", "afgerond", "uitgesteld"] }, { name: "note", label: "Notitie", type: "textarea" }
  ], { deadline: today(), status: "open" }, data => {
    const org = state.organizations.find(item => item.id === orgId);
    org.actions ||= [];
    org.actions.push({ id: uid(), ...data });
    org.nextAction = data.title;
    org.followUpDate = data.deadline;
  });
}

function copyTemplate(id) {
  const template = state.templates.find(item => item.id === id);
  navigator.clipboard.writeText(template.text);
  toast("Template gekopieerd");
}

function saveTemplate(id) {
  const template = state.templates.find(item => item.id === id);
  template.text = $(`textarea[data-template="${id}"]`).value;
  save();
  toast("Template opgeslagen");
}

function editTemplate(id) {
  const template = state.templates.find(item => item.id === id);
  openSimple("Template bewerken", "Templates", [
    { name: "title", label: "Titel" }, { name: "category", label: "Categorie", type: "select", options: state.settings.templateCategories }
  ], template, data => Object.assign(template, data));
}

function addTemplate() {
  openSimple("Template toevoegen", "Templates", [
    { name: "title", label: "Titel" }, { name: "category", label: "Categorie", type: "select", options: state.settings.templateCategories }, { name: "text", label: "Tekst", type: "textarea" }
  ], {}, data => state.templates.unshift({ id: uid(), ...data }));
}

function saveSetting(key) {
  const textarea = $(`textarea[data-setting="${key}"]`);
  state.settings[key] = textarea.value.split("\n").map(item => item.trim()).filter(Boolean);
  if (key === "statuses") {
    state.settings[key].forEach(status => state.settings.statusColors[status] ||= "#6f6258");
  }
  save();
  render();
  toast("Instelling opgeslagen");
}

state = loadState();
renderMenu();
bindEvents();
render();
importBrochureLeads();
