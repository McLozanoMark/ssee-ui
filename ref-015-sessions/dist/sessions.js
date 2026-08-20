
/* source: design-system/auth-audit.js */
const AUDIT_STORAGE_KEY = "ssee-auth-audit";

function recordAuditEvent({ user, authType, operation = "Inicio de sesión", closureType = "", result, reason = "" }) {
  const entry = {
    timestamp: new Date().toISOString(),
    user,
    authenticationType: authType,
    operation,
    closureType,
    result,
    reason
  };
  try {
    const current = JSON.parse(sessionStorage.getItem(AUDIT_STORAGE_KEY) || "[]");
    sessionStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify([entry, ...current].slice(0, 50)));
  } catch {
    // The demo remains usable when browser storage is unavailable.
  }
  return entry;
}

function recordAuthAttempt(args) {
  return recordAuditEvent(args);
}


/* source: ref-015-sessions/js/data.js */
const sessionUsers = {
  Autoregistro: { name: "Ana Paredes", authType: "Autoregistro", role: "Administrador USE", authenticationUrl: "../ref-009-auth-autoregistro/index.html" },
  Passport: { name: "Luis Ramos", authType: "Passport", role: "Supervisor de Seguimiento", authenticationUrl: "../ref-007-auth-passport/index.html" }
};


/* source: ref-015-sessions/js/state.js */
function createSessionState({ authType, expired }) {
  return { authType, expired, active: !expired, lastInteraction: new Date() };
}


/* source: ref-015-sessions/js/session.js */
function createSessionMarker(user, role) {
  return { id: `demo-${Date.now()}`, user, role, createdAt: new Date().toISOString() };
}

function invalidateSession() {
  try {
    sessionStorage.removeItem("ssee-single-session");
  } catch {
    // The demo remains usable when browser storage is unavailable.
  }
}

function replaceActiveSession(marker) {
  try {
    sessionStorage.setItem("ssee-single-session", JSON.stringify(marker));
  } catch {
    // The demo remains usable when browser storage is unavailable.
  }
}


/* source: ref-015-sessions/js/ui.js */
function showToast(refs, message, type = "info") {
  const icon = type === "success" ? "fa-circle-check" : type === "warning" ? "fa-triangle-exclamation" : type === "error" ? "fa-circle-xmark" : "fa-circle-info";
  refs.toast.className = `toast toast-${type}`;
  refs.toast.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span>${message}</span>`;
  refs.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => refs.toast.classList.remove("is-visible"), 4500);
}

function showAuthView(refs, user, message) {
  refs.activeView.hidden = true;
  refs.authView.hidden = false;
  refs.logoutButton.hidden = true;
  refs.authMessage.textContent = message;
  refs.authLink.href = user.authenticationUrl;
}

function updateLastInteraction(refs, date) {
  refs.lastInteraction.textContent = date.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
}


/* source: ref-015-sessions/js/main.js */






const refs = {
  activeView: document.getElementById("activeView"), authView: document.getElementById("authView"), authMessage: document.getElementById("authMessage"), authLink: document.getElementById("authLink"), logoutButton: document.getElementById("logoutButton"), newSessionButton: document.getElementById("newSessionButton"), interactButton: document.getElementById("interactButton"), expireButton: document.getElementById("expireButton"), confirmDialog: document.getElementById("confirmDialog"), cancelLogout: document.getElementById("cancelLogout"), confirmLogout: document.getElementById("confirmLogout"), lastInteraction: document.getElementById("lastInteraction"), toast: document.getElementById("toast")
};

const params = new URLSearchParams(window.location.search);
const authType = params.get("auth") === "passport" ? "Passport" : "Autoregistro";
const expired = params.get("mode") === "expired";
const user = sessionUsers[authType];
const state = createSessionState({ authType, expired });

document.getElementById("accountName").textContent = user.name;
document.getElementById("authType").textContent = user.authType;
document.getElementById("detailUser").textContent = user.name;
document.getElementById("detailRole").textContent = user.role;

function closeDialog() { refs.confirmDialog.hidden = true; }

function endSession(message) {
  invalidateSession();
  state.active = false;
  closeDialog();
  showAuthView(refs, user, message);
  showToast(refs, "La sesión ya no está activa.", "success");
}

if (expired) {
  invalidateSession();
  showAuthView(refs, user, "La sesión finalizó por inactividad. Inicia sesión nuevamente para continuar.");
  showToast(refs, "La sesión ha expirado por inactividad.", "warning");
} else {
  replaceActiveSession(createSessionMarker(user.name, user.role));
  updateLastInteraction(refs, state.lastInteraction);
  refs.interactButton.addEventListener("click", () => {
    state.lastInteraction = new Date();
    updateLastInteraction(refs, state.lastInteraction);
    showToast(refs, "La sesión continúa activa.", "success");
  });
  refs.newSessionButton.addEventListener("click", () => {
    replaceActiveSession(createSessionMarker(user.name, user.role));
    state.lastInteraction = new Date();
    updateLastInteraction(refs, state.lastInteraction);
    showToast(refs, "La sesión anterior fue finalizada automáticamente.", "info");
  });
  refs.expireButton.addEventListener("click", () => endSession("La sesión finalizó por inactividad. Inicia sesión nuevamente para continuar."));
  refs.logoutButton.addEventListener("click", () => { refs.confirmDialog.hidden = false; refs.cancelLogout.focus(); });
  refs.cancelLogout.addEventListener("click", closeDialog);
  refs.confirmLogout.addEventListener("click", () => endSession("La sesión se cerró correctamente. Inicia sesión nuevamente para continuar."));
  refs.confirmDialog.addEventListener("click", (event) => { if (event.target === refs.confirmDialog) closeDialog(); });
}
