import { getMessage } from "../../design-system/messages.js";
import { hasRequiredValues, validateDocumentAccess } from "../../design-system/auth-validation.js";
import { recordAuthAttempt } from "../../design-system/auth-audit.js";

const refs = {
  form: document.getElementById("loginForm"),
  number: document.getElementById("documentNumber"),
  birthDate: document.getElementById("birthDate"),
  issueDate: document.getElementById("issueDate"),
  feedback: document.getElementById("authFeedback"),
  success: document.getElementById("authSuccess"),
  toast: document.getElementById("toast")
};

const registeredUser = {
  number: "74125896",
  birthDate: "1988-04-15",
  issueDate: "2020-06-20",
  active: true,
  valid: true,
  projects: 1,
  roles: 1
};

function showToast(message, type = "info") {
  refs.toast.className = `toast toast-${type}`;
  const icon = type === "success" ? "fa-circle-check" : type === "warning" ? "fa-triangle-exclamation" : "fa-circle-info";
  refs.toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  refs.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => refs.toast.classList.remove("is-visible"), 4500);
}

function showError(message) {
  refs.feedback.hidden = false;
  refs.feedback.textContent = message;
}

refs.form.addEventListener("submit", (event) => {
  event.preventDefault();
  refs.feedback.hidden = true;
  refs.success.hidden = true;
  if (!hasRequiredValues([refs.number.value, refs.birthDate.value, refs.issueDate.value])) {
    recordAuthAttempt({ user: refs.number.value.trim() || "No identificado", authType: "Documento de identidad", result: "Fallida", reason: "Datos incompletos" });
    showError(getMessage("M11"));
    showToast(getMessage("M11"), "warning");
    return;
  }
  const valid = validateDocumentAccess({
    documentNumber: refs.number.value.trim(),
    birthDate: refs.birthDate.value,
    issueDate: refs.issueDate.value,
    user: registeredUser
  });
  if (!valid) {
    recordAuthAttempt({ user: refs.number.value.trim(), authType: "Documento de identidad", result: "Fallida", reason: "Credenciales inválidas o acceso no autorizado" });
    showError(getMessage("M27"));
    showToast(getMessage("M27"), "warning");
    return;
  }
  refs.form.hidden = true;
  refs.success.hidden = false;
  recordAuthAttempt({ user: refs.number.value.trim(), authType: "Documento de identidad", result: "Exitosa" });
  showToast("Autenticación validada correctamente.", "success");
});
