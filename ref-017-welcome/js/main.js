import { welcomeProfiles } from "./data.js";
import { getWelcomeState } from "./state.js";
import { renderNotifications, renderProfile, setNotificationPanel, showToast } from "./ui.js";

const refs = {
  accountName: document.getElementById("accountName"), accountRole: document.getElementById("accountRole"), accountInitial: document.getElementById("accountInitial"), welcomeTitle: document.getElementById("welcomeTitle"), welcomeSubtitle: document.getElementById("welcomeSubtitle"), processContext: document.getElementById("processContext"), processText: document.getElementById("processText"), moduleCount: document.getElementById("moduleCount"), projectCount: document.getElementById("projectCount"), moduleGrid: document.getElementById("moduleGrid"), projectList: document.getElementById("projectList"), userSummary: document.getElementById("userSummary"), notificationButton: document.getElementById("notificationButton"), notificationCount: document.getElementById("notificationCount"), notificationPanel: document.getElementById("notificationPanel"), notificationList: document.getElementById("notificationList"), closeNotifications: document.getElementById("closeNotifications"), toast: document.getElementById("toast")
};

const state = getWelcomeState(new URLSearchParams(window.location.search), welcomeProfiles);
renderProfile(refs, state.profile);
renderNotifications(refs, state.profile.notifications);

refs.notificationButton.addEventListener("click", () => {
  state.notificationsOpen = !state.notificationsOpen;
  setNotificationPanel(refs, state.notificationsOpen);
});
refs.closeNotifications.addEventListener("click", () => {
  state.notificationsOpen = false;
  setNotificationPanel(refs, false);
});
document.addEventListener("click", (event) => {
  if (state.notificationsOpen && !refs.notificationPanel.contains(event.target) && !refs.notificationButton.contains(event.target)) {
    state.notificationsOpen = false;
    setNotificationPanel(refs, false);
  }
});
refs.moduleGrid.addEventListener("click", (event) => {
  const module = event.target.closest("[data-module]");
  if (!module) return;
  event.preventDefault();
  showToast(refs, `Acceso a ${module.dataset.module} disponible para revisión.`, "info");
});
