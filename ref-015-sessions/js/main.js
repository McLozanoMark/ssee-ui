import { recordAuditEvent } from "../../design-system/auth-audit.js";
import { sessionUsers } from "./data.js";
import { createSessionState } from "./state.js";
import { createSessionMarker, invalidateSession, replaceActiveSession } from "./session.js";
import { showAuthView, showToast, updateLastInteraction } from "./ui.js";

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
