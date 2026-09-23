import { welcomeProfiles } from "../../ref-018-welcome/js/data.js";
import { getWelcomeState } from "../../ref-018-welcome/js/state.js";
import { renderNotifications, renderProfile, setNotificationPanel, showToast } from "../../ref-018-welcome/js/ui.js";
import { recordAuditEvent } from "../../design-system/auth-audit.js";
import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";

const refs = {
  accountName: document.getElementById("accountName"), accountRole: document.getElementById("accountRole"), accountInitial: document.getElementById("accountInitial"), welcomeTitle: document.getElementById("welcomeTitle"), projectCount: document.getElementById("projectCount"), projectList: document.getElementById("projectList"), quickAccessList: document.getElementById("quickAccessList"), userSummary: document.getElementById("userSummary"), notificationButton: document.getElementById("notificationButton"), notificationCount: document.getElementById("notificationCount"), notificationPanel: document.getElementById("notificationPanel"), notificationList: document.getElementById("notificationList"), closeNotifications: document.getElementById("closeNotifications"), accountMenuTrigger: document.getElementById("accountMenuTrigger"), accountMenu: document.getElementById("accountMenu"), logoutOption: document.getElementById("logoutOption"), welcomeShell: document.querySelector(".app-shell"), authView: document.getElementById("authView"), authMessage: document.getElementById("authMessage"), sessionAuthTabs: document.querySelectorAll("[data-session-auth-mode]"), sessionLoginForm: document.getElementById("sessionLoginForm"), authPanel: document.getElementById("sessionAuthPanel"), autoregisterFields: document.getElementById("sessionAutoregisterFields"), passportFields: document.getElementById("sessionPassportFields"), documentFields: document.getElementById("sessionDocumentFields"), passwordField: document.getElementById("sessionPasswordField"), authLinks: document.getElementById("sessionAuthLinks"), sessionEmail: document.getElementById("sessionEmail"), sessionDocumentNumber: document.getElementById("sessionDocumentNumber"), sessionDocumentNumberDocument: document.getElementById("sessionDocumentNumberDocument"), sessionBirthDate: document.getElementById("sessionBirthDate"), sessionIssueDate: document.getElementById("sessionIssueDate"), sessionPassword: document.getElementById("sessionPassword"), confirmDialog: document.getElementById("confirmDialog"), closeConfirm: document.getElementById("closeConfirm"), cancelLogout: document.getElementById("cancelLogout"), confirmLogout: document.getElementById("confirmLogout"), confirmTitle: document.getElementById("confirmTitle"), confirmMessage: document.getElementById("confirmMessage"), toast: document.getElementById("toast")
};

const params = new URLSearchParams(window.location.search);
const state = getWelcomeState(params, welcomeProfiles);
const profile = state.profile;
renderProfile(refs, profile);
renderNotifications(refs, profile.notifications);

function setAccountMenu(isOpen) {
  refs.accountMenu.hidden = !isOpen;
  refs.accountMenuTrigger.setAttribute("aria-expanded", String(isOpen));
}

refs.notificationButton.addEventListener("click", () => {
  state.notificationsOpen = !state.notificationsOpen;
  setNotificationPanel(refs, state.notificationsOpen);
});
refs.closeNotifications.addEventListener("click", () => {
  state.notificationsOpen = false;
  setNotificationPanel(refs, false);
});
refs.accountMenuTrigger.addEventListener("click", () => {
  setAccountMenu(refs.accountMenu.hidden);
});
document.addEventListener("click", (event) => {
  if (state.notificationsOpen && !refs.notificationPanel.contains(event.target) && !refs.notificationButton.contains(event.target)) {
    state.notificationsOpen = false;
    setNotificationPanel(refs, false);
  }
  if (!refs.accountMenu.contains(event.target) && !refs.accountMenuTrigger.contains(event.target)) setAccountMenu(false);
});
refs.logoutOption.addEventListener("click", () => {
  setAccountMenu(false);
  refs.confirmDialog.hidden = false;
  refs.cancelLogout.focus();
});

function closeDialog() {
  refs.confirmDialog.hidden = true;
}

function setAuthenticationMode(mode) {
  const isPassport = mode === "passport";
  const isDocument = mode === "document";
  const isAutoregister = mode === "autoregistro";
  refs.passportFields.hidden = !isPassport;
  refs.documentFields.hidden = !isDocument;
  refs.autoregisterFields.hidden = !isAutoregister;
  refs.passwordField.hidden = isDocument;
  refs.authLinks.hidden = isDocument;
  const recoveryLink = refs.authLinks.querySelector(".auth-recovery-link");
  if (recoveryLink) recoveryLink.href = `../ref-013-password-recovery/index.html?auth=${mode}`;
  refs.sessionEmail.required = isAutoregister;
  refs.sessionDocumentNumber.required = isPassport;
  refs.sessionDocumentNumberDocument.required = isDocument;
  refs.sessionBirthDate.required = isDocument;
  refs.sessionIssueDate.required = isDocument;
  refs.sessionPassword.required = !isDocument;
  refs.sessionAuthTabs.forEach((tab) => {
    const active = tab.dataset.sessionAuthMode === mode;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
}

function showAuthentication() {
  refs.notificationPanel.hidden = true;
  refs.welcomeShell.hidden = true;
  refs.authView.hidden = false;
  refs.authMessage.hidden = false;
  setAuthenticationMode(profile.authType === "Passport" ? "passport" : profile.authType === "Documento" ? "document" : "autoregistro");
}

refs.closeConfirm.addEventListener("click", closeDialog);
refs.cancelLogout.addEventListener("click", closeDialog);
refs.confirmDialog.addEventListener("click", (event) => {
  if (event.target === refs.confirmDialog) closeDialog();
});
refs.confirmTitle.textContent = getMessage("M130").split("\n")[0];
refs.confirmMessage.textContent = getMessage("M130").split("\n")[1];
refs.confirmLogout.addEventListener("click", () => {
  recordAuditEvent({ user: profile.name, authType: profile.authType, operation: "Cierre de sesión", closureType: "Voluntario", result: "Exitosa" });
  try { sessionStorage.removeItem("ssee-demo-session"); } catch { /* demo continues without storage */ }
  closeDialog();
  showAuthentication();
  showToast(refs, getPrototypeMessage("sessionClosed"), "success");
});

refs.sessionAuthTabs.forEach((tab) => tab.addEventListener("click", () => setAuthenticationMode(tab.dataset.sessionAuthMode)));
refs.sessionLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  refs.authView.hidden = true;
  refs.welcomeShell.hidden = false;
  refs.authMessage.hidden = true;
});
refs.sessionLoginForm.querySelector(".password-toggle")?.addEventListener("click", () => {
  const showing = refs.sessionPassword.type === "text";
  refs.sessionPassword.type = showing ? "password" : "text";
  refs.sessionLoginForm.querySelector(".password-toggle").setAttribute("aria-label", showing ? "Mostrar contraseña" : "Ocultar contraseña");
});

try { sessionStorage.setItem("ssee-demo-session", "active"); } catch { /* demo continues without storage */ }
