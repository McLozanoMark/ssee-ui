import { welcomeProfiles } from "../../ref-017-welcome/js/data.js";
import { getWelcomeState } from "../../ref-017-welcome/js/state.js";
import { renderNotifications, renderProfile, setNotificationPanel, showToast } from "../../ref-017-welcome/js/ui.js";
import { recordAuditEvent } from "../../design-system/auth-audit.js";
import { getPrototypeMessage, getMessage } from "../../design-system/messages.js";

const refs = {
  welcomeShell: document.getElementById("welcomeShell"), accountName: document.getElementById("accountName"), accountRole: document.getElementById("accountRole"), accountInitial: document.getElementById("accountInitial"), welcomeTitle: document.getElementById("welcomeTitle"), welcomeSubtitle: document.getElementById("welcomeSubtitle"), processContext: document.getElementById("processContext"), processText: document.getElementById("processText"), moduleCount: document.getElementById("moduleCount"), projectCount: document.getElementById("projectCount"), moduleGrid: document.getElementById("moduleGrid"), projectList: document.getElementById("projectList"), userSummary: document.getElementById("userSummary"), notificationButton: document.getElementById("notificationButton"), notificationCount: document.getElementById("notificationCount"), notificationPanel: document.getElementById("notificationPanel"), notificationList: document.getElementById("notificationList"), closeNotifications: document.getElementById("closeNotifications"), accountMenuTrigger: document.getElementById("accountMenuTrigger"), accountMenu: document.getElementById("accountMenu"), logoutOption: document.getElementById("logoutOption"), authView: document.getElementById("authView"), authMessage: document.getElementById("authMessage"), sessionLoginForm: document.getElementById("sessionLoginForm"), autoregisterFields: document.getElementById("sessionAutoregisterFields"), passportFields: document.getElementById("sessionPassportFields"), sessionEmail: document.getElementById("sessionEmail"), sessionDocumentNumber: document.getElementById("sessionDocumentNumber"), sessionPassword: document.getElementById("sessionPassword"), confirmDialog: document.getElementById("confirmDialog"), closeConfirm: document.getElementById("closeConfirm"), cancelLogout: document.getElementById("cancelLogout"), confirmLogout: document.getElementById("confirmLogout"), inactivityAlert: document.getElementById("inactivityAlert"), toast: document.getElementById("toast")
};

const state = getWelcomeState(new URLSearchParams(window.location.search), welcomeProfiles);
let pendingAuthentication = null;
let inactivityTimer = null;

renderProfile(refs, state.profile);
renderNotifications(refs, state.profile.notifications);

function setAccountMenu(isOpen) {
  refs.accountMenu.hidden = !isOpen;
  refs.accountMenuTrigger.setAttribute("aria-expanded", String(isOpen));
}

function showAuthentication(message, reason) {
  pendingAuthentication = reason;
  refs.welcomeShell.hidden = true;
  refs.notificationPanel.hidden = true;
  refs.authView.hidden = false;
  refs.authMessage.textContent = message;
  refs.autoregisterFields.hidden = state.profile.authType === "Passport";
  refs.passportFields.hidden = state.profile.authType !== "Passport";
  refs.sessionEmail.required = state.profile.authType !== "Passport";
  refs.sessionDocumentNumber.required = state.profile.authType === "Passport";
  if (state.profile.authType === "Passport") refs.sessionDocumentNumber.value = "72184563";
}

function showWelcome() {
  refs.welcomeShell.hidden = false;
  refs.authView.hidden = true;
  refs.inactivityAlert.hidden = true;
  refs.sessionPassword.value = "demo";
  setAccountMenu(false);
}

function startNewSession() {
  showAuthentication("Autentícate nuevamente para iniciar una nueva sesión.", "new");
  window.dispatchEvent(new CustomEvent("ref016-auth-ready"));
}

function startInactivity() {
  window.clearTimeout(inactivityTimer);
  refs.inactivityAlert.hidden = false;
  window.dispatchEvent(new CustomEvent("ref016-session-warning"));
  inactivityTimer = window.setTimeout(() => {
    refs.inactivityAlert.hidden = true;
    showAuthentication(getMessage("M28"), "inactivity");
    showToast(refs, getMessage("M28"), "warning");
    window.dispatchEvent(new CustomEvent("ref016-session-ended", { detail: { reason: "inactivity" } }));
  }, 1200);
}

refs.notificationButton.addEventListener("click", () => {
  state.notificationsOpen = !state.notificationsOpen;
  setNotificationPanel(refs, state.notificationsOpen);
});
refs.closeNotifications.addEventListener("click", () => {
  state.notificationsOpen = false;
  setNotificationPanel(refs, false);
});
refs.accountMenuTrigger.addEventListener("click", () => setAccountMenu(refs.accountMenu.hidden));
document.addEventListener("click", (event) => {
  if (state.notificationsOpen && !refs.notificationPanel.contains(event.target) && !refs.notificationButton.contains(event.target)) {
    state.notificationsOpen = false;
    setNotificationPanel(refs, false);
  }
  if (!refs.accountMenu.contains(event.target) && !refs.accountMenuTrigger.contains(event.target)) setAccountMenu(false);
});
refs.moduleGrid.addEventListener("click", (event) => {
  const module = event.target.closest("[data-module]");
  if (!module) return;
  event.preventDefault();
  showToast(refs, `Acceso a ${module.dataset.module} disponible para revisión.`, "info");
});
refs.logoutOption.addEventListener("click", () => {
  setAccountMenu(false);
  refs.confirmDialog.hidden = false;
  refs.cancelLogout.focus();
});
function closeDialog() { refs.confirmDialog.hidden = true; }
refs.cancelLogout.addEventListener("click", closeDialog);
refs.closeConfirm.addEventListener("click", closeDialog);
refs.confirmDialog.addEventListener("click", (event) => { if (event.target === refs.confirmDialog) closeDialog(); });
refs.confirmLogout.addEventListener("click", () => {
  recordAuditEvent({ user: state.profile.name, authType: state.profile.authType, operation: "Cierre de sesión", closureType: "Voluntario", result: "Exitosa" });
  closeDialog();
  showAuthentication(getPrototypeMessage("sessionClosed"), "logout");
  showToast(refs, getPrototypeMessage("sessionInactive"), "success");
  window.dispatchEvent(new CustomEvent("ref016-session-ended", { detail: { reason: "logout" } }));
});
refs.sessionLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const reason = pendingAuthentication;
  pendingAuthentication = null;
  showWelcome();
  showToast(refs, reason === "new" ? getPrototypeMessage("previousSessionClosed") : getPrototypeMessage("sessionActive"), reason === "new" ? "info" : "success");
  window.dispatchEvent(new CustomEvent("ref016-authenticated", { detail: { reason } }));
});
refs.sessionLoginForm.querySelector(".password-toggle").addEventListener("click", () => {
  const showing = refs.sessionPassword.type === "text";
  refs.sessionPassword.type = showing ? "password" : "text";
  refs.sessionLoginForm.querySelector(".password-toggle").setAttribute("aria-label", showing ? "Mostrar contraseña" : "Ocultar contraseña");
});
window.addEventListener("ref016-guide-reset", showWelcome);
window.addEventListener("ref016-start-new-session", startNewSession);
window.addEventListener("ref016-start-inactivity", startInactivity);
