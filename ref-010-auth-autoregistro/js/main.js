import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { renderToast } from "../../design-system/interaction.js";
import { hasRequiredValues, validateAutoregisterAccess } from "../../design-system/auth-validation.js";
import { recordAuthAttempt } from "../../design-system/auth-audit.js";

const refs = {
  form: document.getElementById("loginForm"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  feedback: document.getElementById("authFeedback"),
  success: document.getElementById("authSuccess"),
  toast: document.getElementById("toast")
};

const account = { email: "ana.paredes@ejemplo.gob.pe", password: "ClaveSegura1", active: true };
const periodState = new URLSearchParams(window.location.search).get("period") || "open";

function showToast(message, type = "info") {
  renderToast(refs.toast, message, type);
}

function configurePeriod() {
  const closed = periodState === "closed";
  const expired = periodState === "expired";
  if (!closed && !expired) return;
  refs.form.querySelectorAll("input, button").forEach((control) => { control.disabled = true; });
  showToast(getMessage(closed ? "M23" : "M24"), "warning");
}

function showError(message) {
  refs.feedback.hidden = false;
  refs.feedback.textContent = message;
}

refs.form.addEventListener("submit", (event) => {
  event.preventDefault();
  refs.feedback.hidden = true;
  refs.success.hidden = true;
  if (periodState === "closed") {
    recordAuthAttempt({ user: refs.email.value.trim() || "No identificado", authType: "Autoregistro", result: "Fallida", reason: "Proceso no habilitado" });
    return showToast(getMessage("M23"), "warning");
  }
  if (periodState === "expired") {
    recordAuthAttempt({ user: refs.email.value.trim() || "No identificado", authType: "Autoregistro", result: "Fallida", reason: "Vigencia vencida" });
    return showToast(getMessage("M24"), "warning");
  }
  if (!hasRequiredValues([refs.email.value, refs.password.value])) {
    recordAuthAttempt({ user: refs.email.value.trim() || "No identificado", authType: "Autoregistro", result: "Fallida", reason: "Datos incompletos" });
    showError(getMessage("M11"));
    showToast(getMessage("M11"), "warning");
    return;
  }
  if (!validateAutoregisterAccess({ email: refs.email.value.trim().toLowerCase(), password: refs.password.value, account, periodState })) {
    recordAuthAttempt({ user: refs.email.value.trim(), authType: "Autoregistro", result: "Fallida", reason: "Credenciales inválidas o usuario inactivo" });
    showError(getMessage("M27"));
    showToast(getMessage("M27"), "warning");
    return;
  }
  refs.form.hidden = true;
  refs.success.hidden = false;
  recordAuthAttempt({ user: refs.email.value.trim(), authType: "Autoregistro", result: "Exitosa" });
  showToast(getPrototypeMessage("authenticationSuccess"), "success");
});

document.querySelector(".password-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const visible = refs.password.type === "text";
  refs.password.type = visible ? "password" : "text";
  button.querySelector("i").className = `fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}`;
  button.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña");
});

configurePeriod();
