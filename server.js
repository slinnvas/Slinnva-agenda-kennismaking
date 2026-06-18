const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const { WebSocketServer } = require("ws");

const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, ".workshop-data.json");
const GUIDE_CONTENT_FILE = path.join(ROOT, ".workshopgids-content.json");
const CONTACT_REQUESTS_FILE = path.join(ROOT, ".workshopgids-aanvragen.json");
const AGENDA_FILE = path.join(ROOT, ".slinnva-agenda.json");
const CONTACT_EMAIL_TO = "info@slinnva.com";
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function emptySession() {
  return {
    status: "waiting",
    sessionId: "",
    responseOpen: false,
    responseGeneration: 0,
    activityIndex: 0,
    revealResults: false,
    statementIndex: 0,
    timer: { running: false, duration: 5, endsAt: 0 },
    connected: {},
    responses: {
      wordcloud: [],
      findSomeone: [],
      listenDetective: [],
      opinion: [],
      postits: [],
      votes: [],
      battle: [],
      reflection: [],
      quiz: [],
      vote: [],
      actionPlan: [],
      impact: [],
      sterkPoll: [],
      sterkScenario: [],
      sterkReflection: [],
      bingoCard: []
    },
    participants: {},
    participantNotes: {},
    stepNotes: {},
    observations: [],
    updatedAt: Date.now()
  };
}

let rooms = {};
try {
  rooms = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
} catch {
  rooms = {};
}

function roomState(room) {
  if (!rooms[room]) rooms[room] = emptySession();
  else {
    const defaults = emptySession();
    rooms[room] = {
      ...defaults,
      ...rooms[room],
      timer: { ...defaults.timer, ...(rooms[room].timer || {}) },
      connected: rooms[room].connected || {},
      participants: rooms[room].participants || {},
      responses: { ...defaults.responses, ...(rooms[room].responses || {}) }
    };
  }
  return rooms[room];
}

let saveTimer;
function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fs.writeFile(DATA_FILE, JSON.stringify(rooms, null, 2), () => {});
  }, 120);
}

function safeFile(urlPath) {
  const pathname = decodeURIComponent(urlPath.split("?")[0]);
  const requested = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const file = path.resolve(ROOT, requested);
  return file.startsWith(ROOT) ? file : null;
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(payload));
}

function readJsonFile(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJsonFile(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function uid(prefix = "") {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const check = hashPassword(password, salt).split(":")[1];
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(check, "hex"));
}

function readGuideContent() {
  try {
    return JSON.parse(fs.readFileSync(GUIDE_CONTENT_FILE, "utf8"));
  } catch {
    return { texts: {}, links: {} };
  }
}

function handleGuideContent(req, res) {
  if (req.method === "GET") {
    sendJson(res, 200, readGuideContent());
    return;
  }
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Methode niet toegestaan" });
    return;
  }

  let body = "";
  req.on("data", chunk => {
    body += chunk;
    if (body.length > 2 * 1024 * 1024) req.destroy();
  });
  req.on("end", () => {
    try {
      const payload = JSON.parse(body || "{}");
      const clean = {
        texts: payload.texts && typeof payload.texts === "object" ? payload.texts : {},
        links: payload.links && typeof payload.links === "object" ? payload.links : {}
      };
      fs.writeFile(GUIDE_CONTENT_FILE, JSON.stringify(clean, null, 2), error => {
        if (error) sendJson(res, 500, { error: "Opslaan mislukt" });
        else sendJson(res, 200, { ok: true });
      });
    } catch {
      sendJson(res, 400, { error: "Ongeldige gegevens" });
    }
  });
}

async function sendContactEmail({ to, subject, text, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM || process.env.RESEND_FROM;
  if (!apiKey || !from) {
    return {
      ok: false,
      provider: "resend",
      error: "E-mailverzending is nog niet geconfigureerd. Stel RESEND_API_KEY en CONTACT_EMAIL_FROM in op de server."
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {})
      })
    });
    if (!response.ok) {
      const detail = await response.text();
      return { ok: false, provider: "resend", error: detail || "Resend kon de e-mail niet verzenden." };
    }
    return { ok: true, provider: "resend" };
  } catch (error) {
    return { ok: false, provider: "resend", error: error.message || "E-mailverzending mislukt." };
  }
}

function handleContactRequest(req, res) {
  if (req.method === "GET") {
    try {
      const requests = JSON.parse(fs.readFileSync(CONTACT_REQUESTS_FILE, "utf8"));
      sendJson(res, 200, { requests: Array.isArray(requests) ? requests : [] });
    } catch {
      sendJson(res, 200, { requests: [] });
    }
    return;
  }
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Methode niet toegestaan" });
    return;
  }

  let body = "";
  req.on("data", chunk => {
    body += chunk;
    if (body.length > 256 * 1024) req.destroy();
  });
  req.on("end", () => {
    try {
      const payload = JSON.parse(body || "{}");
      const requestType = payload.requestType === "offerte" ? "offerte" : "contact";
      const required = requestType === "offerte" ? ["organisatie", "naam", "workshop"] : ["organisatie", "naam", "email", "workshop"];
      const missing = required.filter(key => !String(payload[key] || "").trim());
      if (missing.length) {
        sendJson(res, 400, { error: "Niet alle velden zijn ingevuld" });
        return;
      }
      const createdAt = new Date().toISOString();
      const request = {
        id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
        organisatie: String(payload.organisatie).trim(),
        naam: String(payload.naam).trim(),
        functie: String(payload.functie || "").trim(),
        email: String(payload.email).trim(),
        telefoon: String(payload.telefoon || "").trim(),
        typeOrganisatie: String(payload.typeOrganisatie || "").trim(),
        workshop: String(payload.workshop).trim(),
        doelgroep: String(payload.doelgroep || "").trim(),
        aantalDeelnemers: String(payload.aantalDeelnemers || "").trim(),
        gewensteDatum: String(payload.gewensteDatum || "").trim(),
        locatie: String(payload.locatie || "").trim(),
        bericht: String(payload.bericht || "").trim(),
        requestType,
        subject: requestType === "offerte" ? "Nieuwe offerte-aanvraag Samen Actief & Verbonden" : "Nieuwe aanvraag Samen Actief & Verbonden",
        to: CONTACT_EMAIL_TO,
        status: "Nieuwe aanvraag",
        bron: "Interactieve brochure",
        workshopinteresse: String(payload.workshop).trim(),
        emailStatus: "pending",
        createdAt
      };
      const emailText = [
        requestType === "offerte"
          ? "Nieuwe offerte-aanvraag via de interactieve brochure van Samen Actief & Verbonden."
          : "Nieuwe aanvraag via de interactieve brochure van Samen Actief & Verbonden.",
        "",
        "Organisatie:",
        request.organisatie,
        "",
        "Contactpersoon:",
        request.naam,
        "",
        "Functie:",
        request.functie,
        "",
        "E-mailadres:",
        request.email,
        "",
        "Telefoonnummer:",
        request.telefoon,
        "",
        "Type organisatie:",
        request.typeOrganisatie,
        "",
        "Interesse in:",
        request.workshop,
        ...(requestType === "offerte" ? [
          "",
          "Doelgroep:",
          request.doelgroep,
          "",
          "Aantal deelnemers:",
          request.aantalDeelnemers,
          "",
          "Gewenste datum:",
          request.gewensteDatum,
          "",
          "Locatie:",
          request.locatie
        ] : []),
        "",
        "Bericht:",
        request.bericht
      ].join("\n");
      let requests = [];
      try {
        requests = JSON.parse(fs.readFileSync(CONTACT_REQUESTS_FILE, "utf8"));
        if (!Array.isArray(requests)) requests = [];
      } catch {
        requests = [];
      }
      const saveAndRespond = (status, payload) => {
        requests.unshift({ ...request, ...payload });
        fs.writeFile(CONTACT_REQUESTS_FILE, JSON.stringify(requests, null, 2), error => {
          if (error) sendJson(res, 500, { error: "Aanvraag opslaan mislukt" });
          else sendJson(res, status, payload.ok ? { ok: true } : { error: payload.error || "Verzenden mislukt" });
        });
      };

      sendContactEmail({
        to: CONTACT_EMAIL_TO,
        subject: request.subject,
        text: emailText,
        replyTo: request.email
      }).then(result => {
        if (result.ok) saveAndRespond(200, { ok: true, emailStatus: "sent", emailProvider: result.provider });
        else saveAndRespond(502, { ok: false, emailStatus: "failed", emailError: result.error, error: result.error });
      });
    } catch {
      sendJson(res, 400, { error: "Ongeldige gegevens" });
    }
  });
}

const agendaSessions = new Map();
const defaultAgendaPassword = "Slinnva2026!";

function defaultAgendaData() {
  return {
    settings: {
      workDays: [1, 2, 3, 4, 5, 6],
      startTime: "10:00",
      endTime: "19:00",
      durations: [45, 60],
      bufferMinutes: 50
    },
    accounts: [{
      id: "admin-sharmilenka",
      username: "sharmilenka",
      email: "info@slinnva.com",
      role: "admin",
      passwordHash: hashPassword(defaultAgendaPassword),
      createdAt: new Date().toISOString()
    }],
    bookings: [],
    availability: [],
    unavailable: []
  };
}

function readAgendaData() {
  const data = readJsonFile(AGENDA_FILE, null) || defaultAgendaData();
  data.settings ||= defaultAgendaData().settings;
  data.accounts ||= [];
  data.bookings ||= [];
  data.availability ||= [];
  data.unavailable ||= [];
  if (!data.accounts.some(account => account.username === "sharmilenka")) {
    data.accounts.unshift(defaultAgendaData().accounts[0]);
    writeJsonFile(AGENDA_FILE, data);
  }
  return data;
}

function saveAgendaData(data) {
  writeJsonFile(AGENDA_FILE, data);
}

function parseBody(req, limit = 512 * 1024) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > limit) {
        reject(new Error("Te veel data"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("Ongeldige gegevens"));
      }
    });
  });
}

function minutesFromTime(time) {
  const [hours, minutes] = String(time).split(":").map(Number);
  return hours * 60 + minutes;
}

function dateAtMinutes(date, minutes) {
  const result = new Date(`${date}T00:00:00`);
  result.setMinutes(minutes);
  return result;
}

function overlaps(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function hasAgendaConflict(data, start, duration) {
  const buffer = data.settings.bufferMinutes || 50;
  const end = new Date(start.getTime() + duration * 60000);
  const guardedEnd = new Date(end.getTime() + buffer * 60000);
  return [...data.bookings, ...data.unavailable].some(item => {
    const itemStart = new Date(item.start);
    const itemEnd = new Date(item.end);
    return overlaps(start, guardedEnd, itemStart, itemEnd);
  });
}

function hasAgendaAvailability(data, start, duration) {
  const end = new Date(start.getTime() + duration * 60000);
  return data.availability.some(item => {
    const itemStart = new Date(item.start);
    const itemEnd = new Date(item.end);
    return start >= itemStart && end <= itemEnd;
  });
}

function generateAgendaSlots(duration = 45) {
  const data = readAgendaData();
  const slots = [];
  const now = new Date();
  const availability = data.availability
    .map(item => ({ ...item, startDate: new Date(item.start), endDate: new Date(item.end) }))
    .filter(item => item.endDate > now)
    .sort((a, b) => a.startDate - b.startDate);
  for (const block of availability) {
    const blockStart = new Date(Math.max(block.startDate.getTime(), now.getTime()));
    const blockEnd = block.endDate;
    const roundedStart = new Date(blockStart);
    const minutes = roundedStart.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 15) * 15;
    roundedStart.setMinutes(roundedMinutes, 0, 0);
    for (let start = roundedStart; start.getTime() + duration * 60000 <= blockEnd.getTime(); start = new Date(start.getTime() + 15 * 60000)) {
      if (start <= now) continue;
      if (hasAgendaConflict(data, start, duration)) continue;
      slots.push({
        start: start.toISOString(),
        end: new Date(start.getTime() + duration * 60000).toISOString(),
        duration
      });
      if (slots.length >= 160) return slots;
    }
  }
  return slots;
}

function authAccount(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const session = agendaSessions.get(token);
  if (!session || session.expiresAt < Date.now()) return null;
  const data = readAgendaData();
  return data.accounts.find(account => account.id === session.accountId) || null;
}

async function handleAgendaApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = url.pathname.replace("/api/agenda", "") || "/";
  const data = readAgendaData();

  if (route === "/slots" && req.method === "GET") {
    const duration = Number(url.searchParams.get("duration") || 45);
    sendJson(res, 200, { slots: generateAgendaSlots(data.settings.durations.includes(duration) ? duration : 45), settings: data.settings });
    return;
  }

  if (route === "/book" && req.method === "POST") {
    try {
      const payload = await parseBody(req);
      const required = ["name", "email", "meetingType", "start", "duration"];
      if (required.some(key => !String(payload[key] || "").trim())) {
        sendJson(res, 400, { error: "Niet alle verplichte velden zijn ingevuld." });
        return;
      }
      const duration = Number(payload.duration);
      const start = new Date(payload.start);
      if (!data.settings.durations.includes(duration) || Number.isNaN(start.getTime()) || !hasAgendaAvailability(data, start, duration) || hasAgendaConflict(data, start, duration)) {
        sendJson(res, 409, { error: "Dit tijdstip is helaas niet meer beschikbaar." });
        return;
      }
      const booking = {
        id: uid("booking-"),
        name: String(payload.name).trim(),
        organization: String(payload.organization || "").trim(),
        email: String(payload.email).trim(),
        phone: String(payload.phone || "").trim(),
        meetingType: String(payload.meetingType).trim(),
        note: String(payload.note || "").trim(),
        start: start.toISOString(),
        end: new Date(start.getTime() + duration * 60000).toISOString(),
        duration,
        status: "Wacht op bevestigingsmail",
        createdAt: new Date().toISOString()
      };
      data.bookings.unshift(booking);
      saveAgendaData(data);
      const emailResult = await sendContactEmail({
        to: CONTACT_EMAIL_TO,
        subject: "Nieuwe kennismaking ingepland via Slinnva agenda",
        replyTo: booking.email,
        text: [
          "Nieuwe aanvraag voor een kennismakingsgesprek.",
          "",
          `Naam: ${booking.name}`,
          `Organisatie: ${booking.organization}`,
          `E-mail: ${booking.email}`,
          `Telefoon: ${booking.phone}`,
          `Vorm: ${booking.meetingType}`,
          `Start: ${booking.start}`,
          `Duur: ${booking.duration} minuten`,
          "",
          "Let op: de afspraak staat pas definitief ingepland nadat de bevestigingsmail door de boeker is ontvangen.",
          "",
          `Opmerking: ${booking.note}`
        ].join("\n")
      });
      if (!emailResult.ok) {
        sendJson(res, 502, { error: "De afspraak is ontvangen, maar de e-mail kon niet automatisch worden doorgestuurd. Probeer het opnieuw of mail ons direct via info@slinnva.com." });
        return;
      }
      sendJson(res, 200, { ok: true, booking });
    } catch {
      sendJson(res, 400, { error: "Afspraak kon niet worden verwerkt." });
    }
    return;
  }

  if (route === "/admin/login" && req.method === "POST") {
    const payload = await parseBody(req);
    const account = data.accounts.find(item => item.username === payload.username);
    if (!account || !verifyPassword(String(payload.password || ""), account.passwordHash)) {
      sendJson(res, 401, { error: "Ongeldige inloggegevens" });
      return;
    }
    const token = crypto.randomBytes(32).toString("hex");
    agendaSessions.set(token, { accountId: account.id, expiresAt: Date.now() + 12 * 60 * 60 * 1000 });
    sendJson(res, 200, { token, account: { id: account.id, username: account.username, email: account.email, role: account.role } });
    return;
  }

  if (route === "/admin/reset" && req.method === "POST") {
    const payload = await parseBody(req);
    const account = data.accounts.find(item => item.email === payload.email || item.username === payload.username);
    if (account) {
      const tempPassword = `Slinnva${Math.floor(100000 + Math.random() * 899999)}!`;
      account.passwordHash = hashPassword(tempPassword);
      account.resetPasswordHint = "Tijdelijk wachtwoord is aangemaakt op de server.";
      saveAgendaData(data);
      await sendContactEmail({
        to: account.email,
        subject: "Wachtwoord reset Slinnva agenda",
        text: `Er is een tijdelijk wachtwoord aangemaakt voor de Slinnva agenda.\n\nGebruikersnaam: ${account.username}\nTijdelijk wachtwoord: ${tempPassword}\n\nWijzig dit wachtwoord na het inloggen.`
      });
    }
    sendJson(res, 200, { ok: true });
    return;
  }

  const account = authAccount(req);
  if (!account) {
    sendJson(res, 401, { error: "Niet ingelogd" });
    return;
  }

  if (route === "/admin/overview" && req.method === "GET") {
    sendJson(res, 200, {
      bookings: data.bookings,
      availability: data.availability,
      unavailable: data.unavailable,
      accounts: data.accounts.map(item => ({ id: item.id, username: item.username, email: item.email, role: item.role, createdAt: item.createdAt })),
      settings: data.settings
    });
    return;
  }

  if (route === "/admin/availability" && req.method === "POST") {
    const payload = await parseBody(req);
    const start = new Date(payload.start);
    const end = new Date(payload.end);
    if (!payload.start || !payload.end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
      sendJson(res, 400, { error: "Vul een geldige start- en eindtijd in" });
      return;
    }
    data.availability.unshift({ id: uid("available-"), start: start.toISOString(), end: end.toISOString(), note: String(payload.note || "Beschikbaar").trim() });
    saveAgendaData(data);
    sendJson(res, 200, { ok: true });
    return;
  }

  if (route.startsWith("/admin/availability/") && req.method === "DELETE") {
    const id = route.split("/").pop();
    data.availability = data.availability.filter(item => item.id !== id);
    saveAgendaData(data);
    sendJson(res, 200, { ok: true });
    return;
  }

  if (route === "/admin/unavailable" && req.method === "POST") {
    const payload = await parseBody(req);
    if (!payload.start || !payload.end) {
      sendJson(res, 400, { error: "Start en einde zijn verplicht" });
      return;
    }
    data.unavailable.unshift({ id: uid("block-"), start: new Date(payload.start).toISOString(), end: new Date(payload.end).toISOString(), reason: String(payload.reason || "Onbeschikbaar").trim() });
    saveAgendaData(data);
    sendJson(res, 200, { ok: true });
    return;
  }

  if (route.startsWith("/admin/unavailable/") && req.method === "DELETE") {
    const id = route.split("/").pop();
    data.unavailable = data.unavailable.filter(item => item.id !== id);
    saveAgendaData(data);
    sendJson(res, 200, { ok: true });
    return;
  }

  if (route === "/admin/accounts" && req.method === "POST") {
    const payload = await parseBody(req);
    if (!payload.username || !payload.email || !payload.password) {
      sendJson(res, 400, { error: "Gebruikersnaam, e-mail en wachtwoord zijn verplicht" });
      return;
    }
    if (data.accounts.some(item => item.username === payload.username || item.email === payload.email)) {
      sendJson(res, 409, { error: "Account bestaat al" });
      return;
    }
    data.accounts.push({ id: uid("account-"), username: String(payload.username).trim(), email: String(payload.email).trim(), role: "medewerker", passwordHash: hashPassword(String(payload.password)), createdAt: new Date().toISOString() });
    saveAgendaData(data);
    sendJson(res, 200, { ok: true });
    return;
  }

  sendJson(res, 404, { error: "Niet gevonden" });
}

const server = http.createServer((req, res) => {
  if (req.url.split("?")[0].startsWith("/api/agenda")) {
    handleAgendaApi(req, res);
    return;
  }
  if (req.url.split("?")[0] === "/api/contact-request") {
    handleContactRequest(req, res);
    return;
  }
  if (req.url.split("?")[0] === "/api/workshopgids-content") {
    handleGuideContent(req, res);
    return;
  }
  if (req.url.split("?")[0] === "/api/network-info") {
    const addresses = Object.values(os.networkInterfaces()).flat().filter(item => item && item.family === "IPv4" && !item.internal).map(item => item.address);
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
    res.end(JSON.stringify({ host: addresses[0] || "127.0.0.1", addresses, port: PORT }));
    return;
  }
  const file = safeFile(req.url);
  if (!file) {
    res.writeHead(403).end("Niet toegestaan");
    return;
  }
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) {
      res.writeHead(404).end("Niet gevonden");
      return;
    }
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    fs.createReadStream(file).pipe(res);
  });
});

const wss = new WebSocketServer({ server, path: "/ws", maxPayload: 12 * 1024 * 1024 });

function send(socket, payload) {
  if (socket.readyState === socket.OPEN) socket.send(JSON.stringify(payload));
}

function broadcast(room) {
  const state = roomState(room);
  state.updatedAt = Date.now();
  for (const client of wss.clients) {
    if (client.room === room) send(client, { type: "snapshot", state });
  }
  persist();
}

function replaceParticipantEntry(list, clientId, value) {
  const index = list.findIndex(item => item.clientId === clientId);
  const entry = { ...value, clientId, updatedAt: Date.now() };
  if (index >= 0) list[index] = entry;
  else list.push(entry);
}

function applyAction(socket, message) {
  const state = roomState(socket.room);
  const payload = message.payload || {};
  if (message.action === "control" && socket.role === "trainer") {
    Object.assign(state, payload);
  }
  if (message.action === "open-response" && socket.role === "trainer") {
    state.responseOpen = true;
    state.revealResults = false;
    state.responseGeneration = Number(state.responseGeneration || 0) + 1;
    if (payload.activity) state.activeResponseKey = payload.activity;
  }
  if (message.action === "close-response" && socket.role === "trainer") {
    state.responseOpen = false;
    state.revealResults = payload.revealResults !== false;
    state.timer = { running: false, duration: state.timer?.duration || 5, endsAt: 0 };
  }
  if (message.action === "activity" && socket.role === "trainer") {
    state.activityIndex = Math.max(0, Math.min(Number(payload.maxIndex) || 19, Number(payload.index) || 0));
    state.revealResults = false;
    state.responseOpen = false;
    state.timer = { running: false, duration: 5, endsAt: 0 };
  }
  if (message.action === "timer" && socket.role === "trainer") {
    const duration = Math.max(1, Number(payload.duration) || 5);
    state.timer = {
      running: Boolean(payload.running),
      duration,
      endsAt: payload.running ? Date.now() + duration * 1000 : 0
    };
    state.responseOpen = Boolean(payload.running);
    state.revealResults = false;
  }
  if (message.action === "submit") {
    const activity = payload.activity;
    const timerExpired = state.timer?.running && state.timer.endsAt && Date.now() >= state.timer.endsAt;
    if (!state.responseOpen || timerExpired || (state.activeResponseKey && state.activeResponseKey !== activity)) {
      send(socket, { type: "submission-rejected", reason: timerExpired ? "timer-ended" : "closed" });
      return;
    }
    if (!state.responses[activity]) state.responses[activity] = [];
    const participantName = state.participants?.[socket.clientId]?.name || payload.value.name || "Deelnemer";
    if (["opinion", "quiz", "vote", "impact", "battle", "sterkPoll"].some(type => activity === type || activity.startsWith(`${type}-`))) {
      const questionIndex = payload.value.questionIndex ?? payload.value.statementIndex ?? 0;
      const key = `${socket.clientId}-${questionIndex}-${state.responseGeneration || 0}`;
      const list = state.responses[activity];
      const index = list.findIndex(item => item.key === key);
      const entry = {
        ...payload.value,
        name: participantName,
        key,
        generation: state.responseGeneration || 0,
        clientId: socket.clientId,
        sessionId: socket.clientId,
        updatedAt: Date.now()
      };
      if (index >= 0) list[index] = entry;
      else list.push(entry);
    } else {
      replaceParticipantEntry(state.responses[activity], socket.clientId, {
        ...payload.value,
        generation: state.responseGeneration || 0,
        name: participantName,
        sessionId: socket.clientId
      });
    }
  }
  if (message.action === "participant-register" && socket.role === "participant") {
    const name = String(payload.name || "").trim().slice(0, 80);
    if (name) {
      state.participants ||= {};
      state.participants[socket.clientId] = { name, registeredAt: Date.now(), online: true };
      if (state.connected[socket.clientId]) state.connected[socket.clientId].name = name;
    }
  }
  if (message.action === "postit-move" && socket.role === "trainer") {
    const item = state.responses.postits.find(entry => entry.id === payload.id);
    if (item) Object.assign(item, { x: payload.x, y: payload.y, category: payload.category || item.category });
  }
  if (message.action === "participant-note" && socket.role === "trainer") {
    state.participantNotes[payload.clientId] = payload.text || "";
  }
  if (message.action === "step-note" && socket.role === "trainer") {
    state.stepNotes ||= {};
    state.stepNotes[payload.stepId] = {
      text: payload.text || "",
      workshop: payload.workshop || "Mic On",
      week: payload.week || 1,
      stepId: payload.stepId,
      group: payload.group || "",
      date: payload.date || new Date().toISOString()
    };
  }
  if (message.action === "observation" && socket.role === "trainer") {
    state.observations.unshift({ text: payload.text || "", createdAt: Date.now() });
  }
  if (message.action === "reset-activity" && socket.role === "trainer") {
    const activity = payload.activity;
    if (Object.prototype.hasOwnProperty.call(state.responses, activity)) state.responses[activity] = [];
  }
  if (message.action === "timer-expired" && socket.role === "trainer") {
    state.responseOpen = false;
    state.revealResults = true;
    state.timer = { running: false, duration: state.timer?.duration || 5, endsAt: 0 };
  }
  if (message.action === "reset-session" && socket.role === "trainer") {
    rooms[socket.room] = emptySession();
  }
  broadcast(socket.room);
}

wss.on("connection", socket => {
  socket.on("message", raw => {
    let message;
    try {
      message = JSON.parse(raw.toString());
    } catch {
      return;
    }
    if (message.type === "join") {
      socket.room = String(message.room || "mic-on-school-week-1");
      socket.clientId = String(message.clientId || `participant-${Date.now()}`);
      socket.role = message.role === "trainer" ? "trainer" : message.role === "screen" ? "screen" : "participant";
      const state = roomState(socket.room);
      const knownName = state.participants?.[socket.clientId]?.name || String(message.name || "").trim();
      if (knownName && socket.role === "participant") {
        state.participants ||= {};
        state.participants[socket.clientId] = { ...(state.participants[socket.clientId] || {}), name: knownName, online: true, lastSeen: Date.now() };
      }
      state.connected[socket.clientId] = { role: socket.role, name: knownName || "", lastSeen: Date.now() };
      broadcast(socket.room);
      return;
    }
    if (message.type === "action" && socket.room) applyAction(socket, message);
  });
  socket.on("close", () => {
    if (!socket.room || !socket.clientId) return;
    const state = roomState(socket.room);
    if (state.participants?.[socket.clientId]) state.participants[socket.clientId].online = false;
    delete state.connected[socket.clientId];
    broadcast(socket.room);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Slinnva workshopserver actief op http://0.0.0.0:${PORT}`);
});
