const demoIndexLink=document.createElement("a");demoIndexLink.className="demo-index-link";demoIndexLink.href="../index.html";demoIndexLink.textContent="← Volver al índice";document.body.append(demoIndexLink);
/* source: design-system/messages.js */
const MESSAGE_CATALOG = Object.freeze({
  M1: { text: "¿Está seguro que desea guardar esta información?", type: "Confirmación", scope: "General" },
  M2: { text: "La información se ha guardado correctamente.", type: "Información", scope: "General" },
  M3: { text: "La información se ha actualizado correctamente.", type: "Información", scope: "General" },
  M4: { text: "¿Está seguro que desea eliminar la información seleccionada?", type: "Confirmación", scope: "General" },
  M5: { text: "¿Está seguro que desea activar el registro seleccionado?", type: "Confirmación", scope: "General" },
  M6: { text: "¿Está seguro que desea inactivar el registro seleccionado?", type: "Confirmación", scope: "General" },
  M7: { text: "El registro se ha activado correctamente.", type: "Información", scope: "General" },
  M8: { text: "El registro se ha inactivado correctamente.", type: "Información", scope: "General" },
  M9: { text: "No se encontraron registros con los criterios de búsqueda seleccionados.", type: "Información", scope: "General" },
  M10: { text: "Ya existe un registro con los datos ingresados.", type: "Alerta", scope: "General" },
  M11: { text: "Debe completar los campos obligatorios.", type: "Alerta", scope: "General" },
  M12: { text: "Verifique la información ingresada.", type: "Alerta", scope: "General" },
  M13: { text: "Ocurrió un error inesperado al procesar la solicitud. Por favor, intente nuevamente.", type: "Alerta", scope: "General" },
  M14: { text: "¿Está seguro que desea cancelar?", type: "Confirmación", scope: "General" },
  M15: { text: "No es posible inactivar un rol que posee usuarios asociados.", type: "Alerta", scope: "General" },
  M16: { text: "Debe seleccionar al menos un permiso para asignar al rol.", type: "Alerta", scope: "General" },
  M17: { text: "No es posible realizar la operación porque el rol se encuentra inactivo.", type: "Alerta", scope: "General" },
  M18: { text: "Los permisos del rol se han actualizado correctamente.", type: "Información", scope: "General" },
  M19: { text: "Ya existe un usuario registrado con el documento ingresado.", type: "Alerta", scope: "General" },
  M20: { text: "Ya existe un usuario registrado con el correo electrónico ingresado.", type: "Alerta", scope: "General" },
  M21: { text: "No fue posible completar la sincronización con Passport.", type: "Alerta", scope: "General" },
  M22: { text: "La sincronización con Passport se ha realizado correctamente.", type: "Información", scope: "General" },
  M23: { text: "El periodo de autoregistro no se encuentra habilitado.", type: "Alerta", scope: "General" },
  M24: { text: "El periodo habilitado para el autoregistro ha finalizado.", type: "Alerta", scope: "General" },
  M25: { text: "El enlace de registro ha expirado.", type: "Alerta", scope: "General" },
  M26: { text: "Se ha enviado un mensaje al correo electrónico registrado para completar el registro.", type: "Información", scope: "General" },
  M27: { text: "Las credenciales ingresadas no son válidas.", type: "Alerta", scope: "General" },
  M28: { text: "Su sesión ha expirado. Inicie sesión nuevamente.", type: "Alerta", scope: "General" },
  M29: { text: "Su sesión ha sido cerrada debido al inicio de una nueva sesión.", type: "Información", scope: "General" },
  M30: { text: "No fue posible iniciar sesión. Intente nuevamente.", type: "Alerta", scope: "General" },
  M31: { text: "La nueva contraseña no cumple con las políticas de seguridad establecidas.", type: "Alerta", scope: "General" },
  M32: { text: "La nueva contraseña y su confirmación no coinciden.", type: "Alerta", scope: "General" },
  M33: { text: "La contraseña se ha actualizado correctamente.", type: "Información", scope: "General" },
  M34: { text: "El cambio de contraseña no pudo completarse. Intente nuevamente.", type: "Alerta", scope: "General" },
  M35: { text: "Si existe una cuenta asociada al correo ingresado, recibirá un enlace para recuperar su contraseña.", type: "Información", scope: "General" },
  M36: { text: "El enlace de recuperación ha expirado. Solicite uno nuevo.", type: "Alerta", scope: "General" },
  M37: { text: "La contraseña se ha restablecido correctamente.", type: "Información", scope: "General" },
  M38: { text: "No fue posible restablecer la contraseña. Intente nuevamente.", type: "Alerta", scope: "General" },
  M39: { text: "No tiene proyectos asignados para visualizar.", type: "Información", scope: "General" },
  M40: { text: "No tiene instrumentos pendientes de atención.", type: "Información", scope: "General" },
  M41: { text: "Tiene %s instrumentos asignados.", type: "Información", scope: "General" },
  M42: { text: "Tiene %s instrumentos pendientes de atención.", type: "Información", scope: "General" },
  M43: { text: "Tiene %s instrumentos enviados.", type: "Información", scope: "General" },
  M44: { text: "Tiene %s notificaciones pendientes.", type: "Información", scope: "General" },
  M45: { text: "Complete la información requerida para registrar la fuente de datos.", type: "Información", scope: "General" },
  M46: { text: "No fue posible guardar la estructura.", type: "Información", scope: "General" },
  M47: { text: "Seleccione el campo o conjunto de campos que identificarán las unidades muestrales.", type: "Información", scope: "General" },
  M48: { text: "Debe seleccionar al menos un campo válido.", type: "Error", scope: "General" },
  M49: { text: "Se detectaron registros con observaciones; revise el detalle.", type: "Advertencia", scope: "General" },
  M50: { text: "Ingrese los datos de las unidades muestrales según la estructura configurada.", type: "Advertencia", scope: "General" },
  M51: { text: "El archivo contiene observaciones que deberán revisarse.", type: "Advertencia", scope: "General" },
  M52: { text: "El archivo fue cargado correctamente.", type: "Información", scope: "General" },
  M53: { text: "El procesamiento finalizó. Procesados: %s. Aceptados: %s. Rechazados: %s. Duplicados: %s. Con errores: %s.", type: "Información", scope: "General" },
  M54: { text: "Ya existe una fuente con el mismo nombre para el periodo e intervención seleccionados.", type: "Advertencia", scope: "General" },
  M55: { text: "La fuente ya fue utilizada y su estructura no puede modificarse/eliminarse.", type: "Advertencia", scope: "General" },
  M56: { text: "El procesamiento finalizó con observaciones; revise los registros rechazados o duplicados.", type: "Advertencia", scope: "General" },
  M57: { text: "Se detectaron unidades muestrales con observaciones.", type: "Advertencia", scope: "General" },
  M58: { text: "El archivo fue generado correctamente.", type: "Información", scope: "General" },
  M59: { text: "La sincronización finalizó correctamente.", type: "Información", scope: "General" },
  M60: { text: "No fue posible completar la sincronización.", type: "Alerta", scope: "General" },
  M61: { text: "No fue posible consultar el detalle de la fuente.", type: "Alerta", scope: "General" },
  M62: { text: "La fuente ya fue utilizada y no puede modificarse.", type: "Alerta", scope: "General" },
  M63: { text: "No fue posible generar una nueva versión.", type: "Alerta", scope: "General" },
  M64: { text: "La fuente de datos fue eliminada correctamente.", type: "Información", scope: "General" },
  M65: { text: "No hay registros disponibles. Haz clic en \"Nuevo\" para empezar.", type: "Información", scope: "General" },
  M66: { text: "Complete los datos del rol para activar esta sección.", type: "Alerta", scope: "Roles" },
  M67: { text: "Registros exportados correctamente.", type: "Información", scope: "General" },
  M70: { text: "Se han detectado cambios sin guardar. ¿Desea guardar los cambios y continuar?", type: "Confirmación", scope: "General" }
});

// Confirmed prototype copy pending official codes in the stakeholder workbook.
const PROTOTYPE_MESSAGES = Object.freeze({
  identityLookupSuccess: "Información consultada correctamente.",
  authenticationSuccess: "Autenticación validada correctamente.",
  syncStarted: "Sincronización iniciada.",
  filtersApplied: "Filtros aplicados.",
  filtersCleared: "Filtros limpiados.",
  sessionClosed: "La sesión se cerró correctamente.",
  sessionInactive: "La sesión ya no está activa.",
  sessionActive: "La sesión continúa activa.",
  previousSessionClosed: "La sesión anterior fue finalizada automáticamente."
});

function getMessage(code, values = []) {
  const entry = MESSAGE_CATALOG[code];
  if (!entry) return "";
  let index = 0;
  return entry.text.replace(/%s/g, () => values[index++] ?? "");
}

function getPrototypeMessage(key) {
  return PROTOTYPE_MESSAGES[key] || "";
}


/* source: design-system/interaction.js */


const standardMessages = {
  "Completa los campos obligatorios.": "M11",
  "Fuente registrada correctamente.": "M2",
  "Muestra registrada correctamente.": "M2",
  "Asignación registrada correctamente.": "M2",
  "Asignación reasignada correctamente.": "M3",
  "Fuente activada correctamente.": "M7",
  "Fuente inactivada correctamente.": "M8",
  "Muestra clonada como borrador.": "M2",
};

function renderToast(element, message, type = "info") {
  message = standardMessages[message] ? getMessage(standardMessages[message]) : message;
  element.classList.remove("is-visible");
  void element.offsetWidth;
  const icons = {
    success: "fa-circle-check",
    error: "fa-circle-exclamation",
    warning: "fa-triangle-exclamation",
    info: "fa-circle-info"
  };
  element.className = `toast toast-${type}`;
  element.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}" aria-hidden="true"></i><span>${message}</span>`;
  element.classList.add("is-visible");
  window.clearTimeout(renderToast.timeoutId);
  renderToast.timeoutId = window.setTimeout(() => element.classList.remove("is-visible"), 4500);
}

function enableTooltips() {
  document.querySelectorAll(".filter-toggle").forEach((element) => {
    element.setAttribute("title", "Filtro Personalizado");
    element.setAttribute("data-bs-title", "Filtro Personalizado");
    element.setAttribute("data-bs-toggle", "tooltip");
  });
  if (!window.bootstrap) return;
  document.querySelectorAll("[data-bs-toggle='tooltip']").forEach((element) => {
    bootstrap.Tooltip.getOrCreateInstance(element);
  });
}

function closeMenus(root = document) {
  root.querySelectorAll("[data-menu-panel]").forEach((panel) => {
    panel.hidden = true;
  });
  root.querySelectorAll("[data-menu-button]").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function openConfirmModal(id, message) {
  const modal = document.getElementById(id);
  if (!modal || !window.bootstrap) return null;
  const messageNode = modal.querySelector("[data-confirm-message]");
  if (messageNode) messageNode.textContent = message;
  const instance = bootstrap.Modal.getOrCreateInstance(modal);
  instance.show();
  return instance;
}

function closeConfirmModal(id) {
  const modal = document.getElementById(id);
  if (modal && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modal).hide();
}


/* source: ref-004-admision/js/main.js */



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
