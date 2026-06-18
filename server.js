const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const AGENDA_FILE = path.join(ROOT, "agenda-data.json");
const CONTACT_EMAIL_TO = "info@slinnva.com";
const DEFAULT_PASSWORD = "Slinnva2026!";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

const sessions = new Map();

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

function defaultAgendaData() {
  return {
    settings: {
      durations: [45, 60],
      bufferMinutes: 50
    },
    accounts: [{
      id: "admin-sharmilenka",
      username: "sharmilenka",
      email: "info@slinnva.com",
      role: "admin",
      passwordHash: hashPassword(DEFAULT_PASSWORD),
      createdAt: new Date().toISOString()
    }],
    bookings: [],
    availability: [],
    unavailable: [],
    auditLog: [],
    passwordResets: []
  };
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

function readAgendaData() {
  const data = readJsonFile(AGENDA_FILE, null) || defaultAgendaData();
  data.settings ||= defaultAgendaData().settings;
  data.accounts ||= [];
  data.bookings ||= [];
  data.availability ||= [];
  data.unavailable ||= [];
  data.auditLog ||= [];
  data.passwordResets ||= [];
  if (!data.accounts.some(account => account.username === "sharmilenka")) {
    data.accounts.unshift(defaultAgendaData().accounts[0]);
  }
  return data;
}

function saveAgendaData(data) {
  writeJsonFile(AGENDA_FILE, data);
}

function addAudit(data, account, action, details = "") {
  data.auditLog ||= [];
  data.auditLog.unshift({
    id: uid("audit-"),
    action,
    details,
    actorId: account.id,
    actorName: account.username,
    actorEmail: account.email,
    createdAt: new Date().toISOString()
  });
  data.auditLog = data.auditLog.slice(0, 250);
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
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
    const roundedMinutes = Math.ceil(roundedStart.getMinutes() / 15) * 15;
    roundedStart.setMinutes(roundedMinutes, 0, 0);

    for (let start = roundedStart; start.getTime() + duration * 60000 <= blockEnd.getTime(); start = new Date(start.getTime() + 15 * 60000)) {
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

async function sendContactEmail({ to, subject, text, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  if (!apiKey || !from) {
    return {
      ok: false,
      provider: "resend",
      error: "E-mailverzending is nog niet geconfigureerd."
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

function authAccount(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const session = sessions.get(token);
  if (!session || session.expiresAt < Date.now()) return null;
  return readAgendaData().accounts.find(account => account.id === session.accountId) || null;
}

async function handleAgendaApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = url.pathname.replace("/api/agenda", "") || "/";
  const data = readAgendaData();

  if (route === "/slots" && req.method === "GET") {
    const duration = Number(url.searchParams.get("duration") || 45);
    const safeDuration = data.settings.durations.includes(duration) ? duration : 45;
    sendJson(res, 200, { slots: generateAgendaSlots(safeDuration), settings: data.settings });
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
    sessions.set(token, { accountId: account.id, expiresAt: Date.now() + 12 * 60 * 60 * 1000 });
    sendJson(res, 200, { token, account: { id: account.id, username: account.username, email: account.email, role: account.role } });
    return;
  }

  if (route === "/admin/reset" && req.method === "POST") {
    const payload = await parseBody(req);
    const account = data.accounts.find(item => item.username === payload.username);
    if (account) {
      const token = crypto.randomBytes(32).toString("hex");
      const resetLink = `${url.origin}/agenda-reset.html?token=${token}`;
      data.passwordResets = (data.passwordResets || []).filter(item => item.accountId !== account.id && new Date(item.expiresAt) > new Date());
      data.passwordResets.push({
        token,
        accountId: account.id,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString()
      });
      saveAgendaData(data);
      await sendContactEmail({
        to: account.email,
        subject: "Wachtwoord reset Slinnva agenda",
        text: [
          "Er is een wachtwoordreset aangevraagd voor de Slinnva agenda.",
          "",
          `Gebruikersnaam: ${account.username}`,
          "",
          "Klik op deze link om een nieuw wachtwoord in te stellen:",
          resetLink,
          "",
          "Deze link is 1 uur geldig.",
          "",
          "Heeft u dit niet aangevraagd? Dan hoeft u niets te doen."
        ].join("\n")
      });
    }
    sendJson(res, 200, { ok: true });
    return;
  }

  if (route === "/admin/reset/complete" && req.method === "POST") {
    const payload = await parseBody(req);
    const password = String(payload.password || "");
    if (!payload.token || password.length < 8) {
      sendJson(res, 400, { error: "Resetlink of wachtwoord is ongeldig." });
      return;
    }
    const reset = (data.passwordResets || []).find(item => item.token === payload.token);
    if (!reset || new Date(reset.expiresAt) <= new Date()) {
      sendJson(res, 400, { error: "Deze resetlink is verlopen of ongeldig." });
      return;
    }
    const accountToReset = data.accounts.find(item => item.id === reset.accountId);
    if (!accountToReset) {
      sendJson(res, 400, { error: "Account niet gevonden." });
      return;
    }
    accountToReset.passwordHash = hashPassword(password);
    data.passwordResets = data.passwordResets.filter(item => item.token !== payload.token);
    saveAgendaData(data);
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
      auditLog: data.auditLog,
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
    const item = {
      id: uid("available-"),
      start: start.toISOString(),
      end: end.toISOString(),
      note: String(payload.note || "Beschikbaar").trim(),
      createdById: account.id,
      createdByName: account.username,
      createdByEmail: account.email,
      createdAt: new Date().toISOString()
    };
    data.availability.unshift(item);
    addAudit(data, account, "Beschikbaarheid toegevoegd", `${item.note}: ${item.start} tot ${item.end}`);
    saveAgendaData(data);
    sendJson(res, 200, { ok: true });
    return;
  }

  if (route.startsWith("/admin/availability/") && req.method === "DELETE") {
    const id = route.split("/").pop();
    const item = data.availability.find(entry => entry.id === id);
    data.availability = data.availability.filter(item => item.id !== id);
    addAudit(data, account, "Beschikbaarheid verwijderd", item ? `${item.note || "Beschikbaar"}: ${item.start} tot ${item.end}` : id);
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
    const item = {
      id: uid("block-"),
      start: new Date(payload.start).toISOString(),
      end: new Date(payload.end).toISOString(),
      reason: String(payload.reason || "Onbeschikbaar").trim(),
      createdById: account.id,
      createdByName: account.username,
      createdByEmail: account.email,
      createdAt: new Date().toISOString()
    };
    data.unavailable.unshift(item);
    addAudit(data, account, "Onbeschikbare tijd toegevoegd", `${item.reason}: ${item.start} tot ${item.end}`);
    saveAgendaData(data);
    sendJson(res, 200, { ok: true });
    return;
  }

  if (route.startsWith("/admin/unavailable/") && req.method === "DELETE") {
    const id = route.split("/").pop();
    const item = data.unavailable.find(entry => entry.id === id);
    data.unavailable = data.unavailable.filter(item => item.id !== id);
    addAudit(data, account, "Onbeschikbare tijd verwijderd", item ? `${item.reason || "Onbeschikbaar"}: ${item.start} tot ${item.end}` : id);
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
    const newAccount = { id: uid("account-"), username: String(payload.username).trim(), email: String(payload.email).trim(), role: "medewerker", passwordHash: hashPassword(String(payload.password)), createdAt: new Date().toISOString() };
    data.accounts.push(newAccount);
    addAudit(data, account, "Medewerkersaccount aangemaakt", `${newAccount.username} · ${newAccount.email}`);
    saveAgendaData(data);
    sendJson(res, 200, { ok: true });
    return;
  }

  sendJson(res, 404, { error: "Niet gevonden" });
}

function safeFile(urlPath) {
  const pathname = decodeURIComponent(urlPath.split("?")[0]);
  const requested = pathname === "/" ? "agenda.html" : pathname.replace(/^\/+/, "");
  const file = path.resolve(ROOT, requested);
  return file.startsWith(ROOT) ? file : null;
}

const server = http.createServer((req, res) => {
  if (req.url.split("?")[0].startsWith("/api/agenda")) {
    handleAgendaApi(req, res);
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

server.listen(PORT, () => {
  console.log(`Slinnva agenda draait op poort ${PORT}`);
});
