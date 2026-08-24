
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
  M67: { text: "Registros exportados correctamente.", type: "Información", scope: "General" }
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


/* source: ref-005-autoregistro/js/main.js */



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
