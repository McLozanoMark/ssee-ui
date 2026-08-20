
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


/* source: ref-014-logout/js/data.js */
const sessionUsers = {
  Autoregistro: { name: "Ana Paredes", authType: "Autoregistro", authenticationUrl: "../ref-009-auth-autoregistro/index.html" },
  Passport: { name: "Luis Ramos", authType: "Passport", authenticationUrl: "../ref-007-auth-passport/index.html" }
};


/* source: ref-014-logout/js/state.js */
function createSessionState({ authType, expired }) {
  return { authType, expired, active: !expired };
}


/* source: ref-014-logout/js/session.js */
function invalidateSession() {
  try {
    sessionStorage.removeItem("ssee-demo-session");
  } catch {
    // The demo remains usable when browser storage is unavailable.
  }
}


/* source: ref-014-logout/js/ui.js */
function showToast(refs, message, type = "info") {
  const icon = type === "success" ? "fa-circle-check" : type === "warning" ? "fa-triangle-exclamation" : type === "error" ? "fa-circle-xmark" : "fa-circle-info";
  refs.toast.className = `toast toast-${type}`;
  refs.toast.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span>${message}</span>`;
  refs.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => refs.toast.classList.remove("is-visible"), 4500);
}

function showAuthView(refs, user, expired) {
  refs.activeView.hidden = true;
  refs.authView.hidden = false;
  refs.authTitle.textContent = expired ? "Sesión expirada" : "Sesión cerrada";
  refs.authMessage.textContent = expired ? "Tu sesión ha expirado. Inicia sesión nuevamente para continuar." : "La sesión se cerró correctamente. Inicia sesión nuevamente para continuar.";
  refs.authLink.href = user.authenticationUrl;
}


/* source: ref-014-logout/js/main.js */






const refs = {
  activeView: document.getElementById("activeView"), authView: document.getElementById("authView"), authTitle: document.getElementById("authTitle"), authMessage: document.getElementById("authMessage"), authLink: document.getElementById("authLink"), logoutButton: document.getElementById("logoutButton"), confirmDialog: document.getElementById("confirmDialog"), cancelLogout: document.getElementById("cancelLogout"), confirmLogout: document.getElementById("confirmLogout"), toast: document.getElementById("toast")
};

const params = new URLSearchParams(window.location.search);
const authType = params.get("auth") === "passport" ? "Passport" : "Autoregistro";
const expired = params.get("mode") === "expired";
const user = sessionUsers[authType];
const state = createSessionState({ authType, expired });

document.getElementById("accountName").textContent = user.name;
document.getElementById("authType").textContent = user.authType;
document.getElementById("activeAuthType").textContent = user.authType;

function closeDialog() {
  refs.confirmDialog.hidden = true;
}

function finishLogout(closureType) {
  invalidateSession();
  state.active = false;
  closeDialog();
  recordAuditEvent({ user: user.name, authType: state.authType, operation: "Cierre de sesión", closureType, result: "Exitosa" });
  showAuthView(refs, user, false);
  showToast(refs, "La sesión se cerró correctamente.", "success");
}

if (expired) {
  invalidateSession();
  recordAuditEvent({ user: user.name, authType: state.authType, operation: "Cierre de sesión", closureType: "Por expiración de sesión", result: "Exitosa" });
  showAuthView(refs, user, true);
  showToast(refs, "Tu sesión ha expirado. Inicia sesión nuevamente.", "warning");
} else {
  try { sessionStorage.setItem("ssee-demo-session", "active"); } catch { /* demo continues without storage */ }
  refs.logoutButton.addEventListener("click", () => { refs.confirmDialog.hidden = false; refs.cancelLogout.focus(); });
  refs.cancelLogout.addEventListener("click", closeDialog);
  refs.confirmLogout.addEventListener("click", () => finishLogout("Voluntario"));
  refs.confirmDialog.addEventListener("click", (event) => { if (event.target === refs.confirmDialog) closeDialog(); });
}
