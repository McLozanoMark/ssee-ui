import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { renderToast } from "../../design-system/interaction.js";

export function showToast(refs, message, type = "info") {
  renderToast(refs.toast, message, type);
}

export function showAuthView(refs, user, expired) {
  refs.activeView.hidden = true;
  refs.authView.hidden = false;
  refs.authTitle.textContent = expired ? "Sesión expirada" : "Sesión cerrada";
  refs.authMessage.textContent = expired ? getMessage("M28") : `${getPrototypeMessage("sessionClosed")} Inicia sesión nuevamente para continuar.`;
  refs.authLink.href = user.authenticationUrl;
}
