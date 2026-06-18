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
const closeBooking = document.querySelector("#closeBooking");
const chosenSlotText = document.querySelector("#chosenSlotText");
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
const availabilitySubmit = document.querySelector("#availabilitySubmit");
const availabilityCancel = document.querySelector("#availabilityCancel");
const unavailableForm = document.querySelector("#unavailableForm");
const unavailableList = document.querySelector("#unavailableList");
const unavailableSubmit = document.querySelector("#unavailableSubmit");
const unavailableCancel = document.querySelector("#unavailableCancel");
const bookingList = document.querySelector("#bookingList");
const bookingEditForm = document.querySelector("#bookingEditForm");
const bookingEditCancel = document.querySelector("#bookingEditCancel");
const accountForm = document.querySelector("#accountForm");
const accountList = document.querySelector("#accountList");
const accountSubmit = document.querySelector("#accountSubmit");
const accountCancel = document.querySelector("#accountCancel");
const auditList = document.querySelector("#auditList");
const followupForm = document.querySelector("#followupForm");
const followupList = document.querySelector("#followupList");
const followupSubmit = document.querySelector("#followupSubmit");
const followupCancel = document.querySelector("#followupCancel");
const resetPassword = document.querySelector("#resetPassword");
let adminToken = localStorage.getItem("slinnvaAgendaToken") || "";
let adminAccount = JSON.parse(localStorage.getItem("slinnvaAgendaAccount") || "null");
let currentMonth = new Date();
currentMonth.setDate(1);
let allSlots = [];
let selectedDate = "";
let latestAdminData = null;
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

function openBookingModal() {
  if (!bookingDetails) return;
  bookingDetails.hidden = false;
  document.body.classList.add("modal-open");
  bookingDetails.querySelector("input, select, textarea")?.focus();
}

function closeBookingModal() {
  if (!bookingDetails) return;
  bookingDetails.hidden = true;
  document.body.classList.remove("modal-open");
}

function toLocalInput(value) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function resetAdminForm(form, submitButton, defaultText, cancelButton) {
  form.reset();
  if (form.elements.id) form.elements.id.value = "";
  if (submitButton) submitButton.textContent = defaultText;
  if (cancelButton) cancelButton.hidden = true;
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
    closeBookingModal();
    renderCalendar();
    renderDaySlots();
  });

  slotList.addEventListener("click", event => {
    const slot = event.target.closest(".slot");
    if (!slot) return;
    document.querySelectorAll(".slot").forEach(item => item.classList.remove("active"));
    slot.classList.add("active");
    selectedStart.value = slot.dataset.start;
    if (chosenSlotText) {
      chosenSlotText.textContent = `Gekozen moment: ${nlDateTime(slot.dataset.start)}`;
    }
    slotSummary.textContent = `Gekozen: ${nlDateTime(slot.dataset.start)}`;
    openBookingModal();
  });

  closeBooking.addEventListener("click", () => {
    closeBookingModal();
  });

  bookingDetails.addEventListener("click", event => {
    if (event.target === bookingDetails) closeBookingModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeBookingModal();
  });

  durationSelect.addEventListener("change", () => {
    selectedDate = "";
    loadSlots();
  });

  prevMonth.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    selectedDate = "";
    selectedStart.value = "";
    closeBookingModal();
    renderCalendar();
    renderDaySlots();
  });

  nextMonth.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    selectedDate = "";
    selectedStart.value = "";
    closeBookingModal();
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
    closeBookingModal();
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
  latestAdminData = data;
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
      <button class="button ghost" type="button" data-edit-available="${item.id}">Bewerken</button>
      <button class="button ghost" type="button" data-delete-available="${item.id}">Verwijderen</button>
    </article>
  `).join("") : "<p>Nog geen beschikbare tijden toegevoegd.</p>";
  bookingList.innerHTML = data.bookings.length ? data.bookings.map(item => `
    <article class="list-item">
      <strong>${item.name} · ${item.meetingType}</strong>
      <span>${nlDateTime(item.start)} · ${item.duration} min · ${item.status}</span>
      <span>${item.email} ${item.phone ? `· ${item.phone}` : ""}</span>
      <button class="button ghost" type="button" data-edit-booking="${item.id}">Bewerken</button>
      <button class="button ghost" type="button" data-delete-booking="${item.id}">Verwijderen</button>
    </article>
  `).join("") : "<p>Nog geen afspraken.</p>";
  unavailableList.innerHTML = data.unavailable.length ? data.unavailable.map(item => `
    <article class="list-item">
      <strong>${item.reason}</strong>
      <span>${nlDateTime(item.start)} tot ${nlDateTime(item.end)}</span>
      <span>Toegevoegd door: ${item.createdByName || "Onbekend"}</span>
      <button class="button ghost" type="button" data-edit-block="${item.id}">Bewerken</button>
      <button class="button ghost" type="button" data-delete-block="${item.id}">Verwijderen</button>
    </article>
  `).join("") : "<p>Geen onbeschikbare blokken.</p>";
  accountList.innerHTML = data.accounts.map(item => `
    <article class="list-item">
      <strong>${item.username}</strong>
      <span>${item.email} · ${item.role}</span>
      <button class="button ghost" type="button" data-edit-account="${item.id}">Bewerken</button>
      <button class="button ghost" type="button" data-delete-account="${item.id}">Verwijderen</button>
    </article>
  `).join("");
  followupList.innerHTML = data.followUpTemplates.length ? data.followUpTemplates.map(item => `
    <article class="list-item">
      <strong>${item.name}</strong>
      <span>${item.subject}</span>
      <p>${item.body}</p>
      <span>Aangemaakt door: ${item.createdByName || "Onbekend"}</span>
      <button class="button ghost" type="button" data-edit-followup="${item.id}">Bewerken</button>
      <button class="button ghost" type="button" data-delete-followup="${item.id}">Verwijderen</button>
    </article>
  `).join("") : "<p>Nog geen follow-up templates opgeslagen.</p>";
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
    const data = Object.fromEntries(new FormData(availabilityForm).entries());
    const isEdit = Boolean(data.id);
    const response = await adminFetch(isEdit ? `/api/agenda/admin/availability/${data.id}` : "/api/agenda/admin/availability", {
      method: isEdit ? "PUT" : "POST",
      body: JSON.stringify(data)
    });
    if (response.ok) {
      resetAdminForm(availabilityForm, availabilitySubmit, "Beschikbaarheid toevoegen", availabilityCancel);
      await loadAdmin();
      await loadSlots();
      setStatus(adminStatus, isEdit ? "Beschikbaarheid is aangepast." : "Beschikbaarheid is toegevoegd en staat nu in de klantagenda.", "success");
    } else {
      const result = await response.json().catch(() => ({}));
      setStatus(adminStatus, result.error || "Beschikbaarheid kon niet worden toegevoegd.", "error");
    }
  });

  availabilityList.addEventListener("click", async event => {
    const editButton = event.target.closest("[data-edit-available]");
    if (editButton) {
      const item = latestAdminData.availability.find(entry => entry.id === editButton.dataset.editAvailable);
      if (!item) return;
      availabilityForm.elements.id.value = item.id;
      availabilityForm.elements.start.value = toLocalInput(item.start);
      availabilityForm.elements.end.value = toLocalInput(item.end);
      availabilityForm.elements.note.value = item.note || "";
      availabilitySubmit.textContent = "Beschikbaarheid opslaan";
      availabilityCancel.hidden = false;
      availabilityForm.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
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

  availabilityCancel.addEventListener("click", () => {
    resetAdminForm(availabilityForm, availabilitySubmit, "Beschikbaarheid toevoegen", availabilityCancel);
  });

  unavailableForm.addEventListener("submit", async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(unavailableForm).entries());
    const isEdit = Boolean(data.id);
    const response = await adminFetch(isEdit ? `/api/agenda/admin/unavailable/${data.id}` : "/api/agenda/admin/unavailable", {
      method: isEdit ? "PUT" : "POST",
      body: JSON.stringify(data)
    });
    if (response.ok) {
      resetAdminForm(unavailableForm, unavailableSubmit, "Blok toevoegen", unavailableCancel);
      await loadAdmin();
      await loadSlots();
      setStatus(adminStatus, isEdit ? "Onbeschikbare tijd is aangepast." : "Onbeschikbare tijd is opgeslagen. Deze tijd wordt niet getoond in de klantagenda.", "success");
    } else {
      const result = await response.json().catch(() => ({}));
      setStatus(adminStatus, result.error || "Onbeschikbare tijd kon niet worden opgeslagen.", "error");
    }
  });

  unavailableList.addEventListener("click", async event => {
    const editButton = event.target.closest("[data-edit-block]");
    if (editButton) {
      const item = latestAdminData.unavailable.find(entry => entry.id === editButton.dataset.editBlock);
      if (!item) return;
      unavailableForm.elements.id.value = item.id;
      unavailableForm.elements.start.value = toLocalInput(item.start);
      unavailableForm.elements.end.value = toLocalInput(item.end);
      unavailableForm.elements.reason.value = item.reason || "";
      unavailableSubmit.textContent = "Blok opslaan";
      unavailableCancel.hidden = false;
      unavailableForm.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
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

  unavailableCancel.addEventListener("click", () => {
    resetAdminForm(unavailableForm, unavailableSubmit, "Blok toevoegen", unavailableCancel);
  });

  bookingList.addEventListener("click", async event => {
    const editButton = event.target.closest("[data-edit-booking]");
    if (editButton) {
      const item = latestAdminData.bookings.find(entry => entry.id === editButton.dataset.editBooking);
      if (!item) return;
      bookingEditForm.hidden = false;
      bookingEditForm.elements.id.value = item.id;
      bookingEditForm.elements.name.value = item.name || "";
      bookingEditForm.elements.organization.value = item.organization || "";
      bookingEditForm.elements.email.value = item.email || "";
      bookingEditForm.elements.phone.value = item.phone || "";
      bookingEditForm.elements.start.value = toLocalInput(item.start);
      bookingEditForm.elements.duration.value = String(item.duration || 45);
      bookingEditForm.elements.meetingType.value = item.meetingType || "Videobellen";
      bookingEditForm.elements.status.value = item.status || "";
      bookingEditForm.elements.note.value = item.note || "";
      bookingEditForm.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const deleteButton = event.target.closest("[data-delete-booking]");
    if (!deleteButton) return;
    const response = await adminFetch(`/api/agenda/admin/bookings/${deleteButton.dataset.deleteBooking}`, { method: "DELETE" });
    if (response.ok) {
      await loadAdmin();
      await loadSlots();
      setStatus(adminStatus, "Afspraak is verwijderd.", "success");
    } else {
      setStatus(adminStatus, "Afspraak kon niet worden verwijderd.", "error");
    }
  });

  bookingEditForm.addEventListener("submit", async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(bookingEditForm).entries());
    const response = await adminFetch(`/api/agenda/admin/bookings/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
    if (response.ok) {
      bookingEditForm.reset();
      bookingEditForm.hidden = true;
      await loadAdmin();
      await loadSlots();
      setStatus(adminStatus, "Afspraak is aangepast.", "success");
    } else {
      const result = await response.json().catch(() => ({}));
      setStatus(adminStatus, result.error || "Afspraak kon niet worden aangepast.", "error");
    }
  });

  bookingEditCancel.addEventListener("click", () => {
    bookingEditForm.reset();
    bookingEditForm.hidden = true;
  });

  accountForm.addEventListener("submit", async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(accountForm).entries());
    const isEdit = Boolean(data.id);
    if (!isEdit && !String(data.password || "").trim()) {
      setStatus(adminStatus, "Vul een wachtwoord in voor een nieuw account.", "error");
      return;
    }
    const response = await adminFetch(isEdit ? `/api/agenda/admin/accounts/${data.id}` : "/api/agenda/admin/accounts", {
      method: isEdit ? "PUT" : "POST",
      body: JSON.stringify(data)
    });
    if (response.ok) {
      resetAdminForm(accountForm, accountSubmit, "Account aanmaken", accountCancel);
      await loadAdmin();
      setStatus(adminStatus, isEdit ? "Medewerkersaccount is aangepast." : "Medewerkersaccount is aangemaakt.", "success");
    } else {
      const result = await response.json().catch(() => ({}));
      setStatus(adminStatus, result.error || "Account kon niet worden aangemaakt.", "error");
    }
  });

  accountList.addEventListener("click", async event => {
    const editButton = event.target.closest("[data-edit-account]");
    if (editButton) {
      const item = latestAdminData.accounts.find(entry => entry.id === editButton.dataset.editAccount);
      if (!item) return;
      accountForm.elements.id.value = item.id;
      accountForm.elements.username.value = item.username || "";
      accountForm.elements.email.value = item.email || "";
      accountForm.elements.password.value = "";
      accountSubmit.textContent = "Account opslaan";
      accountCancel.hidden = false;
      accountForm.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const deleteButton = event.target.closest("[data-delete-account]");
    if (!deleteButton) return;
    const response = await adminFetch(`/api/agenda/admin/accounts/${deleteButton.dataset.deleteAccount}`, { method: "DELETE" });
    if (response.ok) {
      await loadAdmin();
      setStatus(adminStatus, "Medewerkersaccount is verwijderd.", "success");
    } else {
      const result = await response.json().catch(() => ({}));
      setStatus(adminStatus, result.error || "Account kon niet worden verwijderd.", "error");
    }
  });

  accountCancel.addEventListener("click", () => {
    resetAdminForm(accountForm, accountSubmit, "Account aanmaken", accountCancel);
  });

  followupForm.addEventListener("submit", async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(followupForm).entries());
    const isEdit = Boolean(data.id);
    const response = await adminFetch(isEdit ? `/api/agenda/admin/followups/${data.id}` : "/api/agenda/admin/followups", {
      method: isEdit ? "PUT" : "POST",
      body: JSON.stringify(data)
    });
    if (response.ok) {
      resetAdminForm(followupForm, followupSubmit, "Template opslaan", followupCancel);
      await loadAdmin();
      setStatus(adminStatus, isEdit ? "Follow-up e-mailtemplate is aangepast." : "Follow-up e-mailtemplate is opgeslagen.", "success");
    } else {
      const result = await response.json().catch(() => ({}));
      setStatus(adminStatus, result.error || "Template kon niet worden opgeslagen.", "error");
    }
  });

  followupList.addEventListener("click", async event => {
    const editButton = event.target.closest("[data-edit-followup]");
    if (editButton) {
      const item = latestAdminData.followUpTemplates.find(entry => entry.id === editButton.dataset.editFollowup);
      if (!item) return;
      followupForm.elements.id.value = item.id;
      followupForm.elements.name.value = item.name || "";
      followupForm.elements.subject.value = item.subject || "";
      followupForm.elements.body.value = item.body || "";
      followupSubmit.textContent = "Template opslaan";
      followupCancel.hidden = false;
      followupForm.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const button = event.target.closest("[data-delete-followup]");
    if (!button) return;
    const response = await adminFetch(`/api/agenda/admin/followups/${button.dataset.deleteFollowup}`, { method: "DELETE" });
    if (response.ok) {
      await loadAdmin();
      setStatus(adminStatus, "Follow-up e-mailtemplate is verwijderd.", "success");
    } else {
      setStatus(adminStatus, "Template kon niet worden verwijderd.", "error");
    }
  });

  followupCancel.addEventListener("click", () => {
    resetAdminForm(followupForm, followupSubmit, "Template opslaan", followupCancel);
  });
}

if (hasBookingPage) loadSlots();
if (hasAdminPage) loadAdmin();
