import { renderToast } from "../../design-system/interaction.js";

export function showToast(refs, message, type = "info") {
  renderToast(refs.toast, message, type);
}

export function showAuthView(refs, user, message) {
  refs.activeView.hidden = true;
  refs.authView.hidden = false;
  refs.logoutButton.hidden = true;
  refs.authMessage.textContent = message;
  refs.authLink.href = user.authenticationUrl;
}

export function updateLastInteraction(refs, date) {
  refs.lastInteraction.textContent = date.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
}
