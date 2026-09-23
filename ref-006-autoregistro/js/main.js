import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { renderToast } from "../../design-system/interaction.js";

const registrationSuccessMessage = "Cuenta registrada correctamente. Se ha completado el proceso de registro del usuario. Actualmente, la solicitud de acceso se encuentra en validación por el administrador. 📧 Recibirás una confirmación a tu correo electrónico una vez verificado el perfil.";

const refs = {
  accessGate: document.getElementById("accessGate"),
  accessGateForm: document.getElementById("accessGateForm"),
  accessCode: document.getElementById("accessCode"),
  accessCodeError: document.getElementById("accessCodeError"),
  form: document.getElementById("registrationForm"),
  documentType: document.getElementById("documentType"),
  documentNumber: document.getElementById("documentNumber"),
  consult: document.getElementById("consultBtn"),
  identityFeedback: document.getElementById("identityFeedback"),
  givenNames: document.getElementById("givenNames"),
  paternalSurname: document.getElementById("paternalSurname"),
  maternalSurname: document.getElementById("maternalSurname"),
  email: document.getElementById("email"),
  securityCode: document.getElementById("securityCode"),
  password: document.getElementById("password"),
  passwordConfirm: document.getElementById("passwordConfirm"),
  cancel: document.getElementById("cancelBtn"),
  registrationLayout: document.getElementById("registrationLayout"),
  documentNumberError: document.getElementById("documentNumberError"),
  emailError: document.getElementById("emailError"),
  securityCodeError: document.getElementById("securityCodeError"),
  passwordError: document.getElementById("passwordError"),
  passwordConfirmError: document.getElementById("passwordConfirmError"),
  successCard: document.getElementById("successCard"),
  toast: document.getElementById("toast")
};

const identities = {
  DNI: { names: "Ana María", paternal: "Paredes", maternal: "García" },
  CE: { names: "Jean Pierre", paternal: "Rojas", maternal: "Vargas" }
};

let consulted = false;
let periodState = new URLSearchParams(window.location.search).get("period") || "open";

function showToast(message, type = "info") {
  renderToast(refs.toast, message, type);
}

function setFieldError(input, error, message) {
  if (!input || !error) return;
  input.classList.toggle("is-invalid", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
  error.textContent = message;
  error.hidden = !message;
}

function clearFieldErrors() {
  setFieldError(refs.accessCode, refs.accessCodeError, "");
  setFieldError(refs.documentNumber, refs.documentNumberError, "");
  setFieldError(refs.email, refs.emailError, "");
  setFieldError(refs.securityCode, refs.securityCodeError, "");
  setFieldError(refs.password, refs.passwordError, "");
  setFieldError(refs.passwordConfirm, refs.passwordConfirmError, "");
}

function openRegistration() {
  refs.accessGate.hidden = true;
  refs.registrationLayout.hidden = false;
  refs.documentType.focus();
}

function resetRegistration() {
  refs.form.reset();
  refs.givenNames.value = "";
  refs.paternalSurname.value = "";
  refs.maternalSurname.value = "";
  refs.identityFeedback.hidden = true;
  clearFieldErrors();
  consulted = false;
  refs.registrationLayout.hidden = true;
  refs.accessGate.hidden = false;
  refs.accessCode.focus();
}

function setPeriodState(state) {
  periodState = state;
  const closed = state === "closed";
  const expired = state === "expired";
  refs.form.querySelectorAll("input, select, button").forEach((control) => { control.disabled = closed || expired; });
  refs.accessGateForm.querySelectorAll("input, button").forEach((control) => { control.disabled = closed || expired; });
  if (closed || expired) {
    showToast(getMessage(closed ? "M23" : "M24"), "warning");
  }
}

function setFeedback(message, type) {
  refs.identityFeedback.hidden = false;
  refs.identityFeedback.className = `auth-feedback identity-feedback is-${type}`;
  refs.identityFeedback.textContent = message;
}

function setConsultLoading(loading) {
  refs.consult.disabled = loading;
  refs.consult.innerHTML = loading
    ? '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Consultando'
    : '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i> Consultar';
  refs.consult.setAttribute("aria-busy", loading ? "true" : "false");
}

async function consultIdentity() {
  const number = refs.documentNumber.value.trim();
  setFieldError(refs.documentNumber, refs.documentNumberError, "");
  if (!number || number.length < 8) {
    consulted = false;
    setFieldError(refs.documentNumber, refs.documentNumberError, getMessage("M12"));
    setFeedback(getMessage("M12"), "error");
    return;
  }
  setConsultLoading(true);
  await new Promise((resolve) => window.setTimeout(resolve, 900));
  if (number === "88888888") {
    consulted = false;
    setConsultLoading(false);
    setFieldError(refs.documentNumber, refs.documentNumberError, getMessage("M19"));
    setFeedback(getMessage("M19"), "error");
    return;
  }
  const identity = identities[refs.documentType.value];
  refs.givenNames.value = identity.names;
  refs.paternalSurname.value = identity.paternal;
  refs.maternalSurname.value = identity.maternal;
  consulted = true;
  setConsultLoading(false);
  refs.identityFeedback.hidden = true;
}

function passwordIsValid(value) {
  return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
}

function openConfirmation() {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.innerHTML = `<div class="modal-dialog modal-dialog-centered modal-sm"><div class="modal-content admission-modal"><div class="modal-header"><span class="modal-title-icon" aria-hidden="true"><i class="fa-solid fa-circle-question"></i></span><h2 class="modal-title">Confirmar acción</h2><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><p>${getMessage("M1")}</p></div><div class="modal-footer"><button type="button" class="btn btn-outline-ssee button button-secondary" data-bs-dismiss="modal">No</button><button type="button" class="btn btn-ssee button button-primary" data-confirm="registration">Sí</button></div></div></div>`;
  document.body.append(modal);
  const instance = new bootstrap.Modal(modal);
  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-confirm='registration']")) {
      instance.hide();
      refs.registrationLayout.hidden = true;
      refs.successCard.hidden = false;
      showToast(registrationSuccessMessage, "success");
    }
  });
  modal.addEventListener("hidden.bs.modal", () => modal.remove());
  instance.show();
}

refs.consult.addEventListener("click", consultIdentity);
refs.accessGateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = refs.accessCode.value.trim();
  if (!code) {
    setFieldError(refs.accessCode, refs.accessCodeError, "Ingresa el código o enlace de acceso.");
    return;
  }
  setFieldError(refs.accessCode, refs.accessCodeError, "");
  openRegistration();
});
refs.documentNumber.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); consultIdentity(); } });
refs.documentNumber.addEventListener("input", () => {
  consulted = false;
  refs.givenNames.value = "";
  refs.paternalSurname.value = "";
  refs.maternalSurname.value = "";
  refs.identityFeedback.hidden = true;
});
refs.documentType.addEventListener("change", () => { consulted = false; refs.identityFeedback.hidden = true; });
refs.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (periodState === "closed") return showToast(getMessage("M23"), "warning");
  if (periodState === "expired") return showToast(getMessage("M24"), "warning");
  clearFieldErrors();
  if (!consulted) {
    setFieldError(refs.documentNumber, refs.documentNumberError, "Consulta tu documento antes de continuar.");
    return showToast(getMessage("M12"), "warning");
  }
  let missing = false;
  [[refs.email, refs.emailError], [refs.securityCode, refs.securityCodeError], [refs.password, refs.passwordError], [refs.passwordConfirm, refs.passwordConfirmError]].forEach(([input, error]) => {
    if (!input.value.trim()) { setFieldError(input, error, getMessage("M11")); missing = true; }
  });
  if (missing) return showToast(getMessage("M11"), "warning");
  if (refs.email.value.trim().toLowerCase() === "duplicado@ejemplo.gob.pe") {
    setFieldError(refs.email, refs.emailError, getMessage("M20"));
    return showToast(getMessage("M20"), "warning");
  }
  if (!refs.email.checkValidity()) {
    setFieldError(refs.email, refs.emailError, "Ingresa un correo electrónico válido.");
    return showToast("Ingresa un correo electrónico válido.", "warning");
  }
  if (!passwordIsValid(refs.password.value)) {
    setFieldError(refs.password, refs.passwordError, getMessage("M31"));
    return showToast(getMessage("M31"), "warning");
  }
  if (refs.password.value !== refs.passwordConfirm.value) {
    setFieldError(refs.passwordConfirm, refs.passwordConfirmError, getMessage("M32"));
    return showToast(getMessage("M32"), "warning");
  }
  if (refs.securityCode.value.trim().toUpperCase() !== "8K4P2") {
    setFieldError(refs.securityCode, refs.securityCodeError, "El captcha ingresado no es correcto.");
    return showToast(getMessage("M12"), "warning");
  }
  openConfirmation();
});

refs.cancel.addEventListener("click", resetRegistration);

document.querySelectorAll("[data-password-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.passwordTarget);
    const visible = input.type === "text";
    input.type = visible ? "password" : "text";
    button.querySelector("i").className = `fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}`;
    button.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña");
  });
});

const accessCode = new URLSearchParams(window.location.search).get("codigo");
if (accessCode) {
  refs.accessCode.value = accessCode;
  openRegistration();
}
setPeriodState(periodState);
