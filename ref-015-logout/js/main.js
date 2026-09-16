import { welcomeProfiles } from "../../ref-017-welcome/js/data.js";
import { getWelcomeState } from "../../ref-017-welcome/js/state.js";
import { renderNotifications, renderProfile, setNotificationPanel, showToast } from "../../ref-017-welcome/js/ui.js";
import { recordAuditEvent } from "../../design-system/auth-audit.js";
import { getPrototypeMessage } from "../../design-system/messages.js";

const refs = {
  accountName: document.getElementById("accountName"), accountRole: document.getElementById("accountRole"), accountInitial: document.getElementById("accountInitial"), welcomeTitle: document.getElementById("welcomeTitle"), projectCount: document.getElementById("projectCount"), projectList: document.getElementById("projectList"), quickAccessList: document.getElementById("quickAccessList"), userSummary: document.getElementById("userSummary"), notificationButton: document.getElementById("notificationButton"), notificationCount: document.getElementById("notificationCount"), notificationPanel: document.getElementById("notificationPanel"), notificationList: document.getElementById("notificationList"), closeNotifications: document.getElementById("closeNotifications"), accountMenuTrigger: document.getElementById("accountMenuTrigger"), accountMenu: document.getElementById("accountMenu"), logoutOption: document.getElementById("logoutOption"), welcomeShell: document.querySelector(".app-shell"), loginView: document.getElementById("loginView"), autoregisterLogin: document.getElementById("autoregisterLogin"), passportLogin: document.getElementById("passportLogin"), toast: document.getElementById("toast")
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
  recordAuditEvent({ user: profile.name, authType: profile.authType, operation: "Cierre de sesión", closureType: "Voluntario", result: "Exitosa" });
  try { sessionStorage.removeItem("ssee-demo-session"); } catch { /* demo continues without storage */ }
  setAccountMenu(false);
  showToast(refs, getPrototypeMessage("sessionClosed"), "success");
  refs.notificationPanel.hidden = true;
  refs.welcomeShell.hidden = true;
  refs.loginView.hidden = false;
  refs.autoregisterLogin.hidden = state.profileKey === "passport";
  refs.passportLogin.hidden = state.profileKey !== "passport";
});

try { sessionStorage.setItem("ssee-demo-session", "active"); } catch { /* demo continues without storage */ }
