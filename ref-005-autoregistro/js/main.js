import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { renderToast } from "../../design-system/interaction.js";

const refs = {
  form: document.getElementById("registrationForm"),
  periodBanner: document.getElementById("periodBanner"),
  periodTitle: document.getElementById("periodTitle"),
  periodDescription: document.getElementById("periodDescription"),
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
  clear: document.getElementById("clearBtn"),
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

function setPeriodState(state) {
  periodState = state;
  const closed = state === "closed";
  const expired = state === "expired";
  refs.periodBanner.className = `period-banner ${closed ? "is-warning" : expired ? "is-danger" : "is-enabled"}`;
  refs.periodBanner.querySelector("i").className = `fa-solid ${closed ? "fa-triangle-exclamation" : expired ? "fa-calendar-xmark" : "fa-circle-check"}`;
  refs.periodTitle.textContent = closed ? "Periodo de autoregistro no habilitado" : expired ? "Periodo de autoregistro finalizado" : "Periodo de autoregistro habilitado";
  refs.periodDescription.textContent = closed ? "El proceso no está habilitado para recibir nuevos registros." : expired ? "El periodo definido para el proceso ya finalizó." : "Puedes completar tu registro durante el periodo vigente.";
  refs.form.querySelectorAll("input, select, button").forEach((control) => { control.disabled = closed || expired; });
  if (closed || expired) {
    showToast(getMessage(closed ? "M23" : "M24"), "warning");
  }
}

function setFeedback(message, type) {
  refs.identityFeedback.hidden = false;
  refs.identityFeedback.className = `identity-feedback is-${type}`;
  refs.identityFeedback.textContent = message;
}

function consultIdentity() {
  const number = refs.documentNumber.value.trim();
  if (!number || number.length < 8) {
    consulted = false;
    setFeedback(getMessage("M12"), "error");
    return;
  }
  if (number === "88888888") {
    consulted = false;
    setFeedback(getMessage("M19"), "error");
    return;
  }
  const identity = identities[refs.documentType.value];
  refs.givenNames.value = identity.names;
  refs.paternalSurname.value = identity.paternal;
  refs.maternalSurname.value = identity.maternal;
  consulted = true;
  setFeedback(getPrototypeMessage("identityLookupSuccess"), "success");
  showToast(getPrototypeMessage("identityLookupSuccess"), "success");
}

function passwordIsValid(value) {
  return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);
}

function openConfirmation() {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.innerHTML = `<div class="modal-dialog modal-dialog-centered modal-sm"><div class="modal-content admission-modal"><div class="modal-header"><div><span class="modal-eyebrow">Confirmar registro</span><h2 class="modal-title">Crear cuenta</h2></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><p>${getMessage("M1")}</p><p>La cuenta se registrará como Autoregistro y recibirá el rol predeterminado del proceso.</p></div><div class="modal-footer"><button type="button" class="btn btn-outline-ssee button button-secondary" data-bs-dismiss="modal">No, cancelar</button><button type="button" class="btn btn-ssee button button-primary" data-confirm="registration">Sí, continuar</button></div></div></div>`;
  document.body.append(modal);
  const instance = new bootstrap.Modal(modal);
  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-confirm='registration']")) {
      instance.hide();
      refs.form.hidden = true;
      refs.successCard.hidden = false;
      showToast(getMessage("M2"), "success");
    }
  });
  modal.addEventListener("hidden.bs.modal", () => modal.remove());
  instance.show();
}

refs.consult.addEventListener("click", consultIdentity);
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
  if (!consulted) return showToast(getMessage("M12"), "warning");
  if (!refs.email.value.trim() || !refs.securityCode.value.trim() || !refs.password.value || !refs.passwordConfirm.value) return showToast(getMessage("M11"), "warning");
  if (refs.email.value.trim().toLowerCase() === "duplicado@ejemplo.gob.pe") return showToast(getMessage("M20"), "warning");
  if (!passwordIsValid(refs.password.value)) return showToast(getMessage("M31"), "warning");
  if (refs.password.value !== refs.passwordConfirm.value) return showToast(getMessage("M32"), "warning");
  if (refs.securityCode.value.trim().toUpperCase() !== "8K4P2") return showToast(getMessage("M12"), "warning");
  openConfirmation();
});

refs.clear.addEventListener("click", () => {
  refs.form.reset();
  refs.givenNames.value = "";
  refs.paternalSurname.value = "";
  refs.maternalSurname.value = "";
  refs.identityFeedback.hidden = true;
  consulted = false;
});

document.querySelectorAll("[data-password-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.passwordTarget);
    const visible = input.type === "text";
    input.type = visible ? "password" : "text";
    button.querySelector("i").className = `fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}`;
    button.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña");
  });
});

setPeriodState(periodState);
