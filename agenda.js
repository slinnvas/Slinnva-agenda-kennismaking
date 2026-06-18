const bookingForm = document.querySelector("#bookingForm");
const durationSelect = document.querySelector("#durationSelect");
const selectedStart = document.querySelector("#selectedStart");
const slotList = document.querySelector("#slotList");
const slotSummary = document.querySelector("#slotSummary");
const calendarGrid = document.querySelector("#calendarGrid");
const calendarTitle = document.querySelector("#calendarTitle");
const prevMonth = document.querySelector("#prevMonth");
const nextMonth = document.querySelector("#nextMonth");
const bookingDetails = document.querySelector("#bookingDetails");
const bookingStatus = document.querySelector("#bookingStatus");
const loginForm = document.querySelector("#loginForm");
const loginIntro = document.querySelector("#loginIntro");
const loginStatus = document.querySelector("#loginStatus");
const resetForm = document.querySelector("#resetForm");
const resetStatus = document.querySelector("#resetStatus");
const adminDashboard = document.querySelector("#adminDashboard");
const currentAccount = document.querySelector("#currentAccount");
const logoutButton = document.querySelector("#logoutButton");
const adminStatus = document.querySelector("#adminStatus");
const availabilityForm = document.querySelector("#availabilityForm");
const availabilityList = document.querySelector("#availabilityList");
const unavailableForm = document.querySelector("#unavailableForm");
const unavailableList = document.querySelector("#unavailableList");
const bookingList = document.querySelector("#bookingList");
const accountForm = document.querySelector("#accountForm");
const accountList = document.querySelector("#accountList");
const auditList = document.querySelector("#auditList");
const resetPassword = document.querySelector("#resetPassword");
let adminToken = localStorage.getItem("slinnvaAgendaToken") || "";
let adminAccount = JSON.parse(localStorage.getItem("slinnvaAgendaAccount") || "null");
let currentMonth = new Date();
currentMonth.setDate(1);
let allSlots = [];
let selectedDate = "";
const hasBookingPage = Boolean(bookingForm && calendarGrid && slotList);
const hasAdminPage = Boolean(loginForm && adminDashboard);
const hasResetPage = Boolean(resetForm && resetStatus);

function nlDateTime(value) {
  return new Date(value).toLocaleString("nl-NL", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function setStatus(element, message, type = "") {
  if (!element) return;
  element.className = `status ${type}`.trim();
  element.innerHTML = message;
}

async function loadSlots() {
  if (!hasBookingPage) return;
  slotList.innerHTML = "";
  slotSummary.textContent = "Beschikbaarheid laden...";
  selectedStart.value = "";
  bookingDetails.hidden = true;
  const duration = durationSelect.value;
  const response = await fetch(`/api/agenda/slots?duration=${encodeURIComponent(duration)}`, { cache: "no-store" });
  if (!response.ok) {
    slotSummary.textContent = "Beschikbaarheid kon niet worden geladen";
    return;
  }
  const { slots = [] } = await response.json();
  allSlots = slots;
  if (!slots.length) {
    slotSummary.textContent = "Er zijn op dit moment geen tijden beschikbaar";
  }
  renderCalendar();
  renderDaySlots();
}

function dateKey(value) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function slotsForDate(dayKey) {
  return allSlots.filter(slot => dateKey(slot.start) === dayKey);
}

function renderCalendar() {
  if (!calendarGrid || !calendarTitle) return;
  const monthName = currentMonth.toLocaleDateString("nl-NL", { month: "long", year: "numeric" });
  calendarTitle.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i += 1) cells.push(`<span class="calendar-empty"></span>`);
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const key = dateKey(date);
    const count = slotsForDate(key).length;
    const isSelected = key === selectedDate;
    const disabled = count === 0;
    cells.push(`
      <button class="calendar-day ${isSelected ? "active" : ""}" type="button" data-date="${key}" ${disabled ? "disabled" : ""}>
        <strong>${day}</strong>
        <span>${count ? `${count} tijden` : "Vol"}</span>
      </button>
    `);
  }
  calendarGrid.innerHTML = cells.join("");
}

function renderDaySlots() {
  if (!slotList || !slotSummary) return;
  if (!selectedDate) {
    slotSummary.textContent = allSlots.length ? "Kies eerst een datum" : "Er zijn op dit moment geen tijden beschikbaar";
    slotList.innerHTML = "";
    return;
  }
  const slots = slotsForDate(selectedDate);
  slotSummary.textContent = slots.length ? `${slots.length} tijden op ${new Date(`${selectedDate}T12:00:00`).toLocaleDateString("nl-NL", { weekday: "long", day: "2-digit", month: "long" })}` : "Geen tijden beschikbaar";
  slotList.innerHTML = slots.map(slot => `
    <button class="slot" type="button" data-start="${slot.start}">
      <strong>${new Date(slot.start).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}</strong>
      <span>${slot.duration} minuten</span>
    </button>
  `).join("");
}

if (hasBookingPage) {
  window.addEventListener("focus", () => {
    loadSlots();
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) loadSlots();
  });

  window.setInterval(() => {
    if (!document.hidden) loadSlots();
  }, 60000);

  calendarGrid.addEventListener("click", event => {
    const day = event.target.closest(".calendar-day");
    if (!day || day.disabled) return;
    selectedDate = day.dataset.date;
    selectedStart.value = "";
    bookingDetails.hidden = true;
    renderCalendar();
    renderDaySlots();
  });

  slotList.addEventListener("click", event => {
    const slot = event.target.closest(".slot");
    if (!slot) return;
    document.querySelectorAll(".slot").forEach(item => item.classList.remove("active"));
    slot.classList.add("active");
    selectedStart.value = slot.dataset.start;
    bookingDetails.hidden = false;
    slotSummary.textContent = `Gekozen: ${nlDateTime(slot.dataset.start)}`;
  });

  durationSelect.addEventListener("change", () => {
    selectedDate = "";
    loadSlots();
  });

  prevMonth.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    selectedDate = "";
    selectedStart.value = "";
    bookingDetails.hidden = true;
    renderCalendar();
    renderDaySlots();
  });

  nextMonth.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    selectedDate = "";
    selectedStart.value = "";
    bookingDetails.hidden = true;
    renderCalendar();
    renderDaySlots();
  });

  bookingForm.addEventListener("submit", async event => {
    event.preventDefault();
    if (!bookingForm.reportValidity() || !selectedStart.value) {
      setStatus(bookingStatus, "Kies alstublieft een tijdstip en vul de verplichte velden in.", "error");
      return;
    }
    const data = Object.fromEntries(new FormData(bookingForm).entries());
    setStatus(bookingStatus, "Afspraak wordt aangevraagd...");
    const response = await fetch("/api/agenda/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setStatus(bookingStatus, result.error || "De afspraak kon niet worden aangevraagd. Probeer een ander tijdstip.", "error");
      await loadSlots();
      return;
    }
    bookingForm.reset();
    selectedDate = "";
    setStatus(bookingStatus, "Bedankt voor uw aanvraag. Wij sturen u een bevestigingsmail. Pas wanneer u deze bevestigingsmail heeft ontvangen, staat de afspraak definitief ingepland.", "success");
    await loadSlots();
  });
}

if (hasAdminPage) {
  adminDashboard.hidden = true;
  loginForm.hidden = false;
  if (loginIntro) loginIntro.hidden = false;

  loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    const response = await fetch("/api/agenda/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(loginForm).entries()))
    });
    if (!response.ok) {
      setStatus(loginStatus, "Inloggen mislukt. Controleer gebruikersnaam en wachtwoord.", "error");
      return;
    }
    const result = await response.json();
    adminToken = result.token;
    adminAccount = result.account;
    localStorage.setItem("slinnvaAgendaToken", adminToken);
    localStorage.setItem("slinnvaAgendaAccount", JSON.stringify(adminAccount));
    setStatus(loginStatus, "Ingelogd.", "success");
    loginForm.hidden = true;
    if (loginIntro) loginIntro.hidden = true;
    adminDashboard.hidden = false;
    await loadAdmin();
  });

  resetPassword.addEventListener("click", async () => {
    const username = loginForm.elements.username.value;
    if (!username.trim()) {
      setStatus(loginStatus, "Vul eerst uw gebruikersnaam in en klik daarna op wachtwoord resetten.", "error");
      return;
    }
    const response = await fetch("/api/agenda/admin/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    if (!response.ok) {
      setStatus(loginStatus, "De resetlink kon niet worden verstuurd. Probeer het opnieuw.", "error");
      return;
    }
    setStatus(loginStatus, "Als het account bestaat, is er een resetlink verstuurd naar het e-mailadres van dit account.", "success");
  });

  logoutButton.addEventListener("click", () => {
    adminToken = "";
    adminAccount = null;
    localStorage.removeItem("slinnvaAgendaToken");
    localStorage.removeItem("slinnvaAgendaAccount");
    adminDashboard.hidden = true;
    loginForm.hidden = false;
    if (loginIntro) loginIntro.hidden = false;
    setStatus(loginStatus, "U bent uitgelogd.", "success");
  });
}

if (hasResetPage) {
  resetForm.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(resetForm).entries());
    if (formData.password !== formData.passwordConfirm) {
      setStatus(resetStatus, "De wachtwoorden komen niet overeen.", "error");
      return;
    }
    const token = new URLSearchParams(window.location.search).get("token") || "";
    const response = await fetch("/api/agenda/admin/reset/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: formData.password })
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setStatus(resetStatus, result.error || "Het wachtwoord kon niet worden gewijzigd.", "error");
      return;
    }
    resetForm.reset();
    setStatus(resetStatus, "Uw wachtwoord is gewijzigd. U kunt nu opnieuw inloggen.", "success");
  });
}

async function adminFetch(path, options = {}) {
  return fetch(path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "application/json"
    }
  });
}

async function loadAdmin() {
  if (!hasAdminPage || !adminToken) return;
  const response = await adminFetch("/api/agenda/admin/overview");
  if (!response.ok) return;
  const data = await response.json();
  loginForm.hidden = true;
  if (loginIntro) loginIntro.hidden = true;
  adminDashboard.hidden = false;
  if (currentAccount && adminAccount) {
    currentAccount.textContent = `${adminAccount.username} · ${adminAccount.email}`;
  }
  availabilityList.innerHTML = data.availability.length ? data.availability.map(item => `
    <article class="list-item">
      <strong>${item.note || "Beschikbaar"}</strong>
      <span>${nlDateTime(item.start)} tot ${nlDateTime(item.end)}</span>
      <span>Toegevoegd door: ${item.createdByName || "Onbekend"}</span>
      <button class="button ghost" type="button" data-delete-available="${item.id}">Verwijderen</button>
    </article>
  `).join("") : "<p>Nog geen beschikbare tijden toegevoegd.</p>";
  bookingList.innerHTML = data.bookings.length ? data.bookings.map(item => `
    <article class="list-item">
      <strong>${item.name} · ${item.meetingType}</strong>
      <span>${nlDateTime(item.start)} · ${item.duration} min · ${item.status}</span>
      <span>${item.email} ${item.phone ? `· ${item.phone}` : ""}</span>
    </article>
  `).join("") : "<p>Nog geen afspraken.</p>";
  unavailableList.innerHTML = data.unavailable.length ? data.unavailable.map(item => `
    <article class="list-item">
      <strong>${item.reason}</strong>
      <span>${nlDateTime(item.start)} tot ${nlDateTime(item.end)}</span>
      <span>Toegevoegd door: ${item.createdByName || "Onbekend"}</span>
      <button class="button ghost" type="button" data-delete-block="${item.id}">Verwijderen</button>
    </article>
  `).join("") : "<p>Geen onbeschikbare blokken.</p>";
  accountList.innerHTML = data.accounts.map(item => `
    <article class="list-item">
      <strong>${item.username}</strong>
      <span>${item.email} · ${item.role}</span>
    </article>
  `).join("");
  auditList.innerHTML = data.auditLog.length ? data.auditLog.map(item => `
    <article class="list-item">
      <strong>${item.action}</strong>
      <span>${nlDateTime(item.createdAt)} · ${item.actorName} · ${item.actorEmail}</span>
      <span>${item.details || ""}</span>
    </article>
  `).join("") : "<p>Nog geen wijzigingen geregistreerd.</p>";
}

if (hasAdminPage) {
  availabilityForm.addEventListener("submit", async event => {
    event.preventDefault();
    const response = await adminFetch("/api/agenda/admin/availability", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(new FormData(availabilityForm).entries()))
    });
    if (response.ok) {
      availabilityForm.reset();
      await loadAdmin();
      await loadSlots();
      setStatus(adminStatus, "Beschikbaarheid is toegevoegd en staat nu in de klantagenda.", "success");
    } else {
      const result = await response.json().catch(() => ({}));
      setStatus(adminStatus, result.error || "Beschikbaarheid kon niet worden toegevoegd.", "error");
    }
  });

  availabilityList.addEventListener("click", async event => {
    const button = event.target.closest("[data-delete-available]");
    if (!button) return;
    const response = await adminFetch(`/api/agenda/admin/availability/${button.dataset.deleteAvailable}`, { method: "DELETE" });
    if (response.ok) {
      await loadAdmin();
      await loadSlots();
      setStatus(adminStatus, "Beschikbaarheid is verwijderd uit de klantagenda.", "success");
    } else {
      setStatus(adminStatus, "Beschikbaarheid kon niet worden verwijderd.", "error");
    }
  });

  unavailableForm.addEventListener("submit", async event => {
    event.preventDefault();
    const response = await adminFetch("/api/agenda/admin/unavailable", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(new FormData(unavailableForm).entries()))
    });
    if (response.ok) {
      unavailableForm.reset();
      await loadAdmin();
      await loadSlots();
      setStatus(adminStatus, "Onbeschikbare tijd is opgeslagen. Deze tijd wordt niet getoond in de klantagenda.", "success");
    } else {
      const result = await response.json().catch(() => ({}));
      setStatus(adminStatus, result.error || "Onbeschikbare tijd kon niet worden opgeslagen.", "error");
    }
  });

  unavailableList.addEventListener("click", async event => {
    const button = event.target.closest("[data-delete-block]");
    if (!button) return;
    const response = await adminFetch(`/api/agenda/admin/unavailable/${button.dataset.deleteBlock}`, { method: "DELETE" });
    if (response.ok) {
      await loadAdmin();
      await loadSlots();
      setStatus(adminStatus, "Onbeschikbare tijd is verwijderd.", "success");
    } else {
      setStatus(adminStatus, "Onbeschikbare tijd kon niet worden verwijderd.", "error");
    }
  });

  accountForm.addEventListener("submit", async event => {
    event.preventDefault();
    const response = await adminFetch("/api/agenda/admin/accounts", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(new FormData(accountForm).entries()))
    });
    if (response.ok) {
      accountForm.reset();
      await loadAdmin();
      setStatus(adminStatus, "Medewerkersaccount is aangemaakt.", "success");
    } else {
      const result = await response.json().catch(() => ({}));
      setStatus(adminStatus, result.error || "Account kon niet worden aangemaakt.", "error");
    }
  });
}

if (hasBookingPage) loadSlots();
if (hasAdminPage) loadAdmin();
