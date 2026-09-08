import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { renderToast } from "../../design-system/interaction.js";
import { hasRequiredValues, validatePassportAccess } from "../../design-system/auth-validation.js";
import { recordAuthAttempt } from "../../design-system/auth-audit.js";

const refs = {
  form: document.getElementById("loginForm"),
  number: document.getElementById("documentNumber"),
  password: document.getElementById("password"),
  feedback: document.getElementById("authFeedback"),
  success: document.getElementById("authSuccess"),
  toast: document.getElementById("toast")
};

const passportUsers = {
  "12345678": { documentNumber: "12345678", password: "ClaveSegura1", synchronized: true, active: true, projects: 1, roles: 1 },
  "87654321": { documentNumber: "87654321", password: "ClaveSegura1", synchronized: true, active: true, projects: 0, roles: 0 },
  "99999999": { documentNumber: "99999999", password: "ClaveSegura1", synchronized: true, active: false, projects: 1, roles: 1 }
};

function showToast(message, type = "info") {
  renderToast(refs.toast, message, type);
}

function showError(message) {
  refs.feedback.hidden = false;
  refs.feedback.textContent = message;
}

refs.form.addEventListener("submit", (event) => {
  event.preventDefault();
  refs.feedback.hidden = true;
  refs.success.hidden = true;
  if (!hasRequiredValues([refs.number.value, refs.password.value])) {
    recordAuthAttempt({ user: refs.number.value.trim() || "No identificado", authType: "Passport", result: "Fallida", reason: "Datos incompletos" });
    showError(getMessage("M11"));
    showToast(getMessage("M11"), "warning");
    return;
  }
  const user = passportUsers[refs.number.value.trim()];
  if (!validatePassportAccess({ documentNumber: refs.number.value.trim(), password: refs.password.value, user })) {
    recordAuthAttempt({ user: refs.number.value.trim(), authType: "Passport", result: "Fallida", reason: "Credenciales inválidas o acceso no autorizado" });
    showError(getMessage("M27"));
    showToast(getMessage("M27"), "warning");
    return;
  }
  refs.form.hidden = true;
  refs.success.hidden = false;
  recordAuthAttempt({ user: refs.number.value.trim(), authType: "Passport", result: "Exitosa" });
  showToast(getPrototypeMessage("authenticationSuccess"), "success");
});

document.querySelector(".password-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const visible = refs.password.type === "text";
  refs.password.type = visible ? "password" : "text";
  button.querySelector("i").className = `fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}`;
  button.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña");
});
