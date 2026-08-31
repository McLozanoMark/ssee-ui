import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { renderToast } from "../../design-system/interaction.js";

const roles = ["Administrador USE", "Supervisor de Seguimiento", "Evaluador", "Registrador"];
const refs = {
  form: document.getElementById("identityForm"),
  number: document.getElementById("documentNumber"),
  result: document.getElementById("identityResult"),
  admit: document.getElementById("admitBtn"),
  roles: document.getElementById("roleOptions"),
  projects: document.getElementById("projectOptions"),
  toast: document.getElementById("toast"),
  individualMode: document.getElementById("individualModeBtn"),
  massMode: document.getElementById("massModeTab"),
  massModeButton: document.getElementById("massModeBtn"),
  individualAdmission: document.getElementById("individualAdmission"),
  massAdmission: document.getElementById("massAdmission"),
  massFile: document.getElementById("massFileInput"),
  massFileName: document.getElementById("massFileName"),
  massSummary: document.getElementById("massValidationSummary"),
  massTitle: document.getElementById("massValidationTitle"),
  massText: document.getElementById("massValidationText"),
  downloadErrors: document.getElementById("downloadErrorsBtn"),
  saveMass: document.getElementById("saveMassBtn"),
  validity: document.getElementById("validity"),
  validityHelp: document.getElementById("validityHelp"),
};
let consulted = false;
let massReady = false;

function validitySummary(value) {
  if (value === "Sin fecha de vencimiento") return "El acceso no tendrá fecha de vencimiento.";
  const days = value === "30 días" ? 30 : value === "90 días" ? 90 : 365;
  const expiry = new Date();
  expiry.setHours(0, 0, 0, 0);
  expiry.setDate(expiry.getDate() + days);
  return `El acceso vencerá el ${expiry.toLocaleDateString("es-PE")}. Al vencer, el acceso quedará inactivo.`;
}

function updateValidityHelp() {
  refs.validityHelp.textContent = validitySummary(refs.validity.value);
}

function toast(message, type = "info") {
  renderToast(refs.toast, message, type);
}

function renderRoles() {
  refs.roles.innerHTML = roles.map((role) => `<label class="role-check"><input class="form-check-input" type="checkbox" value="${role}"><span>${role}</span></label>`).join("");
}

function updateAdmit() {
  refs.admit.disabled = !consulted
    || !document.querySelector("#roleOptions input:checked")
    || !document.querySelector("#projectOptions input:checked");
}

function resetForm() {
  refs.form.reset();
  document.querySelectorAll("#projectOptions input, #roleOptions input").forEach((input) => {
    input.checked = false;
  });
  document.getElementById("email").value = "";
  document.getElementById("site").value = "";
  document.getElementById("validity").value = "";
  refs.result.hidden = true;
  consulted = false;
  updateAdmit();
}

function confirmAdmission(mode = "individual") {
  const isMass = mode === "mass";
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.innerHTML = `<div class="modal-dialog modal-dialog-centered modal-sm"><div class="modal-content admission-modal"><div class="modal-header"><div><span class="modal-eyebrow">${isMass ? "Confirmar carga masiva" : "Confirmar admisión"}</span><h2 class="modal-title">Confirmar acción</h2></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><p>${getMessage("M1")}</p></div><div class="modal-footer"><button type="button" class="btn btn-outline-ssee button button-secondary" data-bs-dismiss="modal">No</button><button type="button" class="btn btn-ssee button button-primary" data-confirm="${isMass ? "mass-admission" : "admission"}">Sí</button></div></div></div>`;
  modal.querySelector(".modal-header")?.insertAdjacentHTML("afterbegin", '<span class="modal-title-icon" aria-hidden="true"><i class="fa-solid fa-circle-question"></i></span>');
  document.body.append(modal);
  const instance = new bootstrap.Modal(modal);
  modal.addEventListener("click", (event) => {
    if (event.target.closest(`[data-confirm='${isMass ? "mass-admission" : "admission"}']`)) {
      instance.hide();
      toast(getMessage(isMass ? "M52" : "M2"), "success");
    }
  });
  modal.addEventListener("hidden.bs.modal", () => modal.remove());
  instance.show();
}

function setMode(mode) {
  const isMass = mode === "mass";
  refs.individualAdmission.hidden = isMass;
  refs.massAdmission.hidden = !isMass;
  refs.individualMode.classList.toggle("is-active", !isMass);
  refs.massMode.classList.toggle("is-active", isMass);
  refs.individualMode.setAttribute("aria-selected", String(!isMass));
  refs.massMode.setAttribute("aria-selected", String(isMass));
}

function showMassValidation(title, text, type = "success", allowSave = false) {
  refs.massSummary.hidden = false;
  refs.massTitle.textContent = title;
  refs.massText.textContent = text;
  refs.massSummary.className = `validation-summary ${type}`;
  refs.saveMass.disabled = !allowSave;
  massReady = allowSave;
}

function downloadTextFile(filename, content) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function downloadTemplate() {
  downloadTextFile("plantilla-admision-usuarios.csv", "Tipo de documento,Número de documento,Correo electrónico,Sede,Vigencia,Proyecto,Rol\nDNI,00000000,usuario@ejemplo.gob.pe,Unidad de Seguimiento y Evaluación,Sin fecha de vencimiento,Operativo 2026,Registrador\n");
  toast(getMessage("M58"), "success");
}

function downloadErrors() {
  downloadTextFile("observaciones-admision.csv", "Fila,Campo,Observación\n3,Número de documento,El documento no pudo validarse\n");
  toast(getMessage("M58"), "success");
}

function validateMassFile() {
  const file = refs.massFile.files[0];
  if (!file) return;
  refs.massFileName.textContent = file.name;
  refs.downloadErrors.hidden = true;
  if (file.size > 10 * 1024 * 1024) {
    showMassValidation(getMessage("M12"), "El archivo supera el tamaño máximo permitido de 10 MB.", "error");
    return;
  }
  const hasObservations = /error|observad|rechaz/i.test(file.name);
  if (hasObservations) {
    refs.downloadErrors.hidden = false;
    showMassValidation(getMessage("M51"), "Se procesaron 4 registros: 3 aceptados y 1 con observaciones.", "warning", true);
    toast(getMessage("M56"), "warning");
    return;
  }
  showMassValidation(getMessage("M52"), "Se validaron 4 registros correctamente y están listos para guardar.", "success", true);
  toast(getMessage("M53", [4, 4, 0, 0, 0]), "success");
}

refs.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (refs.number.value.trim().length < 8) {
    toast(getMessage("M12"), "warning");
    return;
  }
  consulted = true;
  document.getElementById("identityName").textContent = "Ana María Paredes García";
  document.getElementById("identityDocument").textContent = `${document.getElementById("documentType").value} ${refs.number.value.trim()}`;
  document.getElementById("identityBirth").textContent = "15/04/1988";
  refs.result.hidden = false;
  updateAdmit();
  toast(getPrototypeMessage("identityLookupSuccess"), "success");
});

document.addEventListener("input", updateAdmit);
refs.admit.addEventListener("click", confirmAdmission);
document.getElementById("clearBtn").addEventListener("click", resetForm);
document.getElementById("cancelBtn").addEventListener("click", resetForm);
refs.validity.addEventListener("change", updateValidityHelp);
refs.individualMode.addEventListener("click", () => setMode("individual"));
refs.massMode.addEventListener("click", () => setMode("mass"));
refs.massModeButton.addEventListener("click", () => setMode("mass"));
document.getElementById("cancelMassBtn").addEventListener("click", () => { refs.massFile.value = ""; refs.massFileName.textContent = "Ningún archivo seleccionado"; refs.massSummary.hidden = true; refs.downloadErrors.hidden = true; refs.saveMass.disabled = true; massReady = false; setMode("individual"); });
refs.massFile.addEventListener("change", validateMassFile);
document.getElementById("downloadTemplateBtn").addEventListener("click", downloadTemplate);
refs.downloadErrors.addEventListener("click", downloadErrors);
refs.saveMass.addEventListener("click", () => { if (massReady) confirmAdmission("mass"); });
renderRoles();
updateValidityHelp();
