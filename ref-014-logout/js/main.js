import { recordAuditEvent } from "../../design-system/auth-audit.js";
import { sessionUsers } from "./data.js";
import { createSessionState } from "./state.js";
import { invalidateSession } from "./session.js";
import { showAuthView, showToast } from "./ui.js";

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
