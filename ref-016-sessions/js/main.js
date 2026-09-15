import { welcomeProfiles } from "../../ref-017-welcome/js/data.js";
import { getWelcomeState } from "../../ref-017-welcome/js/state.js";
import { renderNotifications, renderProfile, setNotificationPanel, showToast } from "../../ref-017-welcome/js/ui.js";
import { recordAuditEvent } from "../../design-system/auth-audit.js";
import { getPrototypeMessage, getMessage } from "../../design-system/messages.js";

const refs = {
  welcomeShell: document.getElementById("welcomeShell"), accountName: document.getElementById("accountName"), accountRole: document.getElementById("accountRole"), accountInitial: document.getElementById("accountInitial"), welcomeTitle: document.getElementById("welcomeTitle"), welcomeSubtitle: document.getElementById("welcomeSubtitle"), processContext: document.getElementById("processContext"), processText: document.getElementById("processText"), moduleCount: document.getElementById("moduleCount"), projectCount: document.getElementById("projectCount"), moduleGrid: document.getElementById("moduleGrid"), projectList: document.getElementById("projectList"), userSummary: document.getElementById("userSummary"), notificationButton: document.getElementById("notificationButton"), notificationCount: document.getElementById("notificationCount"), notificationPanel: document.getElementById("notificationPanel"), notificationList: document.getElementById("notificationList"), closeNotifications: document.getElementById("closeNotifications"), accountMenuTrigger: document.getElementById("accountMenuTrigger"), accountMenu: document.getElementById("accountMenu"), logoutOption: document.getElementById("logoutOption"), authView: document.getElementById("authView"), authMessage: document.getElementById("authMessage"), sessionAuthTabs: document.querySelectorAll("[data-session-auth-mode]"), sessionLoginForm: document.getElementById("sessionLoginForm"), authPanel: document.getElementById("sessionAuthPanel"), autoregisterFields: document.getElementById("sessionAutoregisterFields"), passportFields: document.getElementById("sessionPassportFields"), documentFields: document.getElementById("sessionDocumentFields"), passwordField: document.getElementById("sessionPasswordField"), authLinks: document.getElementById("sessionAuthLinks"), sessionEmail: document.getElementById("sessionEmail"), sessionDocumentNumber: document.getElementById("sessionDocumentNumber"), sessionDocumentNumberDocument: document.getElementById("sessionDocumentNumberDocument"), sessionBirthDate: document.getElementById("sessionBirthDate"), sessionIssueDate: document.getElementById("sessionIssueDate"), sessionPassword: document.getElementById("sessionPassword"), confirmDialog: document.getElementById("confirmDialog"), closeConfirm: document.getElementById("closeConfirm"), cancelLogout: document.getElementById("cancelLogout"), confirmLogout: document.getElementById("confirmLogout"), confirmTitle: document.getElementById("confirmTitle"), confirmMessage: document.getElementById("confirmMessage"), inactivityAlert: document.getElementById("inactivityAlert"), inactivityAlertTitle: document.getElementById("inactivityAlertTitle"), inactivityMessage: document.getElementById("inactivityMessage"), continueSession: document.getElementById("continueSession"), closeInactiveSession: document.getElementById("closeInactiveSession"), toast: document.getElementById("toast")
};

const state = getWelcomeState(new URLSearchParams(window.location.search), welcomeProfiles);
let pendingAuthentication = null;
let inactivityTimer = null;
let inactivityRemaining = 0;
let activeAuthMode = state.profile.authType === "Passport" ? "passport" : state.profile.authType === "Documento" ? "document" : "autoregistro";

renderProfile(refs, state.profile);
renderNotifications(refs, state.profile.notifications);

function setAccountMenu(isOpen) {
  refs.accountMenu.hidden = !isOpen;
  refs.accountMenuTrigger.setAttribute("aria-expanded", String(isOpen));
}

function setAuthenticationMode(mode) {
  activeAuthMode = ["passport", "document", "autoregistro"].includes(mode) ? mode : "passport";
  const isPassport = activeAuthMode === "passport";
  const isDocument = activeAuthMode === "document";
  const isAutoregister = activeAuthMode === "autoregistro";
  refs.passportFields.hidden = !isPassport;
  refs.documentFields.hidden = !isDocument;
  refs.autoregisterFields.hidden = !isAutoregister;
  refs.passwordField.hidden = isDocument;
  refs.authLinks.hidden = isDocument;
  refs.sessionEmail.required = isAutoregister;
  refs.sessionDocumentNumber.required = isPassport;
  refs.sessionDocumentNumberDocument.required = isDocument;
  refs.sessionBirthDate.required = isDocument;
  refs.sessionIssueDate.required = isDocument;
  refs.sessionPassword.required = !isDocument;
  refs.sessionAuthTabs.forEach((tab) => {
    const isActive = tab.dataset.sessionAuthMode === activeAuthMode;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

function showAuthentication(message, reason) {
  pendingAuthentication = reason;
  refs.welcomeShell.hidden = true;
  refs.notificationPanel.hidden = true;
  refs.authView.hidden = false;
  refs.authMessage.textContent = message;
  refs.authMessage.hidden = !message;
  setAuthenticationMode(activeAuthMode);
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
  inactivityRemaining = 5;
  refs.inactivityAlert.hidden = false;
  updateInactivityMessage();
  window.dispatchEvent(new CustomEvent("ref016-session-warning"));
  inactivityTimer = window.setInterval(() => {
    inactivityRemaining -= 1;
    updateInactivityMessage();
    if (inactivityRemaining <= 0) endInactivity();
  }, 1000);
}

function updateInactivityMessage() {
  const minutes = String(Math.floor(inactivityRemaining / 60)).padStart(2, "0");
  const seconds = String(inactivityRemaining % 60).padStart(2, "0");
  const [, message, question] = getMessage("M131", [`${minutes}:${seconds}`]).split("\n");
  refs.inactivityMessage.innerHTML = `${message}<br>${question}`;
}

function endInactivity() {
  window.clearInterval(inactivityTimer);
  refs.inactivityAlert.hidden = true;
  showAuthentication(getMessage("M28"), "inactivity");
  showToast(refs, getMessage("M28"), "warning");
  window.dispatchEvent(new CustomEvent("ref016-session-ended", { detail: { reason: "inactivity" } }));
}

function continueSession() {
  window.clearInterval(inactivityTimer);
  refs.inactivityAlert.hidden = true;
  showToast(refs, getPrototypeMessage("sessionActive"), "info");
  window.dispatchEvent(new CustomEvent("ref016-session-continued"));
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
refs.confirmTitle.textContent = getMessage("M130").split("\n")[0];
refs.confirmMessage.textContent = getMessage("M130").split("\n")[1];
refs.confirmLogout.addEventListener("click", () => {
  recordAuditEvent({ user: state.profile.name, authType: state.profile.authType, operation: "Cierre de sesión", closureType: "Voluntario", result: "Exitosa" });
  closeDialog();
  showAuthentication("", "logout");
  window.dispatchEvent(new CustomEvent("ref016-session-ended", { detail: { reason: "logout" } }));
});
refs.continueSession.addEventListener("click", continueSession);
refs.closeInactiveSession.addEventListener("click", endInactivity);
refs.sessionLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const reason = pendingAuthentication;
  pendingAuthentication = null;
  state.profile = welcomeProfiles[activeAuthMode];
  renderProfile(refs, state.profile);
  renderNotifications(refs, state.profile.notifications);
  showWelcome();
  showToast(refs, reason === "new" ? getMessage("M29") : getPrototypeMessage("sessionActive"), reason === "new" ? "info" : "success");
  window.dispatchEvent(new CustomEvent("ref016-authenticated", { detail: { reason } }));
});
refs.sessionAuthTabs.forEach((tab) => tab.addEventListener("click", () => setAuthenticationMode(tab.dataset.sessionAuthMode)));
refs.sessionLoginForm.querySelector(".password-toggle").addEventListener("click", () => {
  const showing = refs.sessionPassword.type === "text";
  refs.sessionPassword.type = showing ? "password" : "text";
  refs.sessionLoginForm.querySelector(".password-toggle").setAttribute("aria-label", showing ? "Mostrar contraseña" : "Ocultar contraseña");
});
window.addEventListener("ref016-guide-reset", showWelcome);
window.addEventListener("ref016-start-new-session", startNewSession);
window.addEventListener("ref016-start-inactivity", startInactivity);
