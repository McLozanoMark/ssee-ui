import { welcomeProfiles } from "./data.js";
import { getWelcomeState } from "./state.js";
import { renderNotifications, renderProfile, setNotificationPanel, showToast } from "./ui.js";

const refs = {
  accountName: document.getElementById("accountName"), accountRole: document.getElementById("accountRole"), accountInitial: document.getElementById("accountInitial"), welcomeTitle: document.getElementById("welcomeTitle"), projectCount: document.getElementById("projectCount"), projectList: document.getElementById("projectList"), quickAccessList: document.getElementById("quickAccessList"), userSummary: document.getElementById("userSummary"), notificationButton: document.getElementById("notificationButton"), notificationCount: document.getElementById("notificationCount"), notificationPanel: document.getElementById("notificationPanel"), notificationList: document.getElementById("notificationList"), closeNotifications: document.getElementById("closeNotifications"), toast: document.getElementById("toast")
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
