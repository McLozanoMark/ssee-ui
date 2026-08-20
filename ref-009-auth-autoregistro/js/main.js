import { getMessage } from "../../design-system/messages.js";
import { hasRequiredValues, validateAutoregisterAccess } from "../../design-system/auth-validation.js";
import { recordAuthAttempt } from "../../design-system/auth-audit.js";

const refs = {
  form: document.getElementById("loginForm"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  feedback: document.getElementById("authFeedback"),
  success: document.getElementById("authSuccess"),
  toast: document.getElementById("toast"),
  banner: document.getElementById("periodBanner"),
  title: document.getElementById("periodTitle"),
  description: document.getElementById("periodDescription")
};

const account = { email: "ana.paredes@ejemplo.gob.pe", password: "ClaveSegura1", active: true };
const periodState = new URLSearchParams(window.location.search).get("period") || "open";

function showToast(message, type = "info") {
  refs.toast.className = `toast toast-${type}`;
  const icon = type === "success" ? "fa-circle-check" : type === "warning" ? "fa-triangle-exclamation" : "fa-circle-info";
  refs.toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  refs.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => refs.toast.classList.remove("is-visible"), 4500);
}

function configurePeriod() {
  const closed = periodState === "closed";
  const expired = periodState === "expired";
  if (!closed && !expired) return;
  refs.banner.className = `period-banner ${closed ? "is-warning" : "is-danger"}`;
  refs.banner.querySelector("i").className = `fa-solid ${closed ? "fa-triangle-exclamation" : "fa-calendar-xmark"}`;
  refs.title.textContent = closed ? "Proceso no habilitado" : "Periodo finalizado";
  refs.description.textContent = closed ? "El proceso no está habilitado para el acceso por autoregistro." : "El periodo asociado al registro ya finalizó.";
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
  showToast("Autenticación validada correctamente.", "success");
});

document.querySelector(".password-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const visible = refs.password.type === "text";
  refs.password.type = visible ? "password" : "text";
  button.querySelector("i").className = `fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}`;
  button.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña");
});

configurePeriod();
