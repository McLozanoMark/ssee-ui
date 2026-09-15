/* source: design-system/demo-navigation.js */
const CURRENT_DEMO_USER = "Ana Paredes";

function applyCurrentDemoUser() {
  document.querySelectorAll(".account-copy strong, #accountName").forEach((node) => {
    node.textContent = CURRENT_DEMO_USER;
  });
}

function mountClearableFields(root = document) {
  root.querySelectorAll('input[type="search"], [data-clearable-input]').forEach((input) => {
    if (input.closest(".clearable-field")) return;
    const wrapper = document.createElement("span");
    wrapper.className = "clearable-field";
    input.parentNode.insertBefore(wrapper, input);
    wrapper.append(input);
    const clear = document.createElement("button");
    clear.className = "field-clear";
    clear.type = "button";
    clear.setAttribute("aria-label", "Borrar contenido");
    clear.title = "Borrar contenido";
    clear.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    wrapper.append(clear);

    const syncVisibility = () => {
      clear.hidden = !input.value;
    };
    input.addEventListener("input", syncVisibility);
    clear.addEventListener("click", () => {
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    });
    syncVisibility();
  });
}

function normalizeSharedControls(root = document) {
  root.querySelectorAll(".filter-actions [id^='clear'], .filter-actions [id^='reset']").forEach((button) => {
    button.classList.add("filter-reset");
    button.setAttribute("aria-label", "Restablecer filtros");
    button.title = "Restablecer filtros";
    button.innerHTML = '<i class="fa-solid fa-xmark icon" aria-hidden="true"></i>';
  });

  root.querySelectorAll("#newUserBtn, #newSourceBtn, #newSampleBtn, #newAssignmentBtn, #newConfigBtn, #newRoleBtn").forEach((button) => {
    const icon = button.querySelector("i")?.outerHTML || "";
    button.innerHTML = `${icon}Nuevo`;
  });
  root.querySelectorAll("#syncBtn").forEach((button) => {
    if (button.dataset.syncRunning === "true") return;
    const icon = button.querySelector("i")?.outerHTML || "";
    button.innerHTML = `${icon}Sincronizar`;
  });

  const identityForm = root.querySelector("#identityForm");
  const identityClear = identityForm?.querySelector("#clearBtn");
  const documentNumber = identityForm?.querySelector("#documentNumber");
  if (identityClear && documentNumber && !identityClear.closest(".clearable-field")) {
    const wrapper = document.createElement("span");
    wrapper.className = "clearable-field";
    documentNumber.parentNode.insertBefore(wrapper, documentNumber);
    wrapper.append(documentNumber, identityClear);
    identityClear.className = "field-clear";
    identityClear.removeAttribute("id");
    identityClear.setAttribute("aria-label", "Borrar contenido");
    identityClear.title = "Borrar contenido";
    identityClear.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    const syncVisibility = () => { identityClear.hidden = !documentNumber.value; };
    documentNumber.addEventListener("input", syncVisibility);
    syncVisibility();
  }

  root.querySelectorAll(".form-actions > #clearBtn").forEach((button) => {
    button.classList.add("form-reset");
    button.setAttribute("aria-label", "Restablecer formulario");
    button.title = "Restablecer formulario";
    button.innerHTML = '<i class="fa-solid fa-xmark icon" aria-hidden="true"></i>';
  });
}

function mountDemoIndexLink() {
  applyCurrentDemoUser();
  mountClearableFields();
  normalizeSharedControls();
  if (document.querySelector(".demo-index-link")) return;
  const link = document.createElement("a");
  link.className = "demo-index-link";
  link.href = "../index.html";
  link.setAttribute("aria-label", "Volver al índice");
  link.innerHTML = '<i class="fa-solid fa-list" aria-hidden="true"></i><span>Volver al índice</span>';
  document.body.append(link);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountDemoIndexLink, { once: true });
} else {
  mountDemoIndexLink();
}


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
  M70: { text: "Se han detectado cambios sin guardar. ¿Desea guardar los cambios y continuar?", type: "Confirmación", scope: "General" },
  M130: { text: "¿Está seguro que desea cerrar sesión?\nSe finalizará tu sesión actual. Tendrás que ingresar tus datos nuevamente para acceder.", type: "Confirmación", scope: "Sesiones" },
  M131: { text: "Sesión próxima a finalizar\nLa sesión se cerrará automáticamente en %s por inactividad.\n¿Deseas continuar en el sistema?", type: "Alerta", scope: "Sesiones" }
});

// Confirmed prototype copy pending official codes in the stakeholder workbook.
const PROTOTYPE_MESSAGES = Object.freeze({
  identityLookupSuccess: "La información fue consultada correctamente.",
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

const INACTIVATION_REASON_MAX_LENGTH = 240;

function resetConfirmReason(modal, required) {
  const wrapper = modal.querySelector("[data-confirm-reason-wrap]");
  const field = modal.querySelector("[data-confirm-reason]");
  const error = modal.querySelector("[data-confirm-reason-error]");
  if (!wrapper || !field) return;
  wrapper.hidden = !required;
  field.required = required;
  field.maxLength = INACTIVATION_REASON_MAX_LENGTH;
  field.setAttribute("aria-required", String(required));
  field.setAttribute("aria-invalid", "false");
  field.value = "";
  if (error) {
    error.hidden = true;
    error.textContent = "";
  }
  modal.dataset.requireReason = String(required);
}

function openConfirmModal(id, message, { requireReason = false } = {}) {
  const modal = document.getElementById(id);
  if (!modal || !window.bootstrap) return null;
  const messageNode = modal.querySelector("[data-confirm-message]");
  if (messageNode) messageNode.textContent = message;
  resetConfirmReason(modal, requireReason);
  const instance = bootstrap.Modal.getOrCreateInstance(modal);
  instance.show();
  return instance;
}

function getConfirmReason(id) {
  return document.getElementById(id)?.querySelector("[data-confirm-reason]")?.value.trim() || "";
}

function validateConfirmReason(id, message = "Debe completar los campos obligatorios.") {
  const modal = document.getElementById(id);
  const field = modal?.querySelector("[data-confirm-reason]");
  if (!modal || !field || modal.dataset.requireReason !== "true") return true;
  const error = modal.querySelector("[data-confirm-reason-error]");
  const valid = Boolean(field.value.trim());
  field.setAttribute("aria-invalid", String(!valid));
  if (error) {
    error.textContent = valid ? "" : message;
    error.hidden = valid;
  }
  if (!valid) field.focus();
  return valid;
}

function closeConfirmModal(id) {
  const modal = document.getElementById(id);
  if (modal && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modal).hide();
}


/* source: design-system/auth-audit.js */
const AUDIT_STORAGE_KEY = "ssee-auth-audit";

function recordAuditEvent({ user, authType, operation = "Inicio de sesión", closureType = "", result, reason = "" }) {
  const entry = {
    timestamp: new Date().toISOString(),
    user,
    authenticationType: authType,
    operation,
    closureType,
    result,
    reason
  };
  try {
    const current = JSON.parse(sessionStorage.getItem(AUDIT_STORAGE_KEY) || "[]");
    sessionStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify([entry, ...current].slice(0, 50)));
  } catch {
    // The demo remains usable when browser storage is unavailable.
  }
  return entry;
}

function recordAuthAttempt(args) {
  return recordAuditEvent(args);
}


/* source: ref-017-welcome/js/data.js */
const welcomeProfiles = {
  passport: {
    name: "Ana Paredes",
    role: "Supervisor de Seguimiento",
    authType: "Passport",
    site: "Unidad de Seguimiento y Evaluación",
    institution: "Ministerio de Educación",
    process: "",
    modules: [
      { name: "Seguimiento", description: "Consulta y supervisa avances.", icon: "fa-chart-line" },
      { name: "Evaluación", description: "Revisa resultados e indicadores.", icon: "fa-clipboard-check" },
      { name: "Instrumentos", description: "Atiende instrumentos asignados.", icon: "fa-file-lines" },
      { name: "Reportes", description: "Consulta reportes disponibles.", icon: "fa-chart-column" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 12, pending: 4, sent: 8, contact: "Equipo de Seguimiento" }],
    notifications: [
      { title: "Instrumentos pendientes", text: "Tienes 4 instrumentos pendientes de atención.", icon: "fa-clipboard-list" },
      { title: "Nuevo reporte disponible", text: "El reporte de avance del periodo 2026 está disponible.", icon: "fa-file-lines" },
      { title: "Actualización de proyecto", text: "Se actualizó la información de Seguimiento 2026.", icon: "fa-circle-info" }
    ]
  },
  document: {
    name: "Ana Paredes",
    role: "Supervisor de Seguimiento",
    authType: "Documento",
    site: "Unidad de Seguimiento y Evaluación",
    institution: "Ministerio de Educación",
    process: "",
    modules: [
      { name: "Seguimiento", description: "Consulta y supervisa avances.", icon: "fa-chart-line" },
      { name: "Evaluación", description: "Revisa resultados e indicadores.", icon: "fa-clipboard-check" },
      { name: "Instrumentos", description: "Atiende instrumentos asignados.", icon: "fa-file-lines" },
      { name: "Reportes", description: "Consulta reportes disponibles.", icon: "fa-chart-column" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 12, pending: 4, sent: 8, contact: "Equipo de Seguimiento" }],
    notifications: [
      { title: "Instrumentos pendientes", text: "Tienes 4 instrumentos pendientes de atención.", icon: "fa-clipboard-list" },
      { title: "Nuevo reporte disponible", text: "El reporte de avance del periodo 2026 está disponible.", icon: "fa-file-lines" },
      { title: "Actualización de proyecto", text: "Se actualizó la información de Seguimiento 2026.", icon: "fa-circle-info" }
    ]
  },
  autoregistro: {
    name: "Ana Paredes",
    role: "Administrador USE",
    authType: "Autoregistro",
    site: "Unidad de Seguimiento y Evaluación",
    institution: "Ministerio de Educación",
    process: "Autoregistro 2026",
    modules: [
      { name: "Seguimiento", description: "Consulta el avance de tu proceso.", icon: "fa-chart-line" },
      { name: "Instrumentos", description: "Revisa los instrumentos asignados.", icon: "fa-file-lines" },
      { name: "Reportes", description: "Consulta reportes disponibles.", icon: "fa-chart-column" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 8, pending: 2, sent: 6, contact: "Mesa de ayuda USE" }],
    notifications: [
      { title: "Instrumentos pendientes", text: "Tienes 2 instrumentos pendientes de atención.", icon: "fa-clipboard-list" },
      { title: "Registro habilitado", text: "Tu acceso al proceso Autoregistro 2026 está habilitado.", icon: "fa-circle-check" }
    ]
  }
};


/* source: ref-017-welcome/js/state.js */
function getWelcomeState(params, profiles) {
  const requested = ["passport", "document", "autoregistro"].includes(params.get("auth")) ? params.get("auth") : "autoregistro";
  return { profileKey: requested, profile: profiles[requested], notificationsOpen: false };
}


/* source: ref-017-welcome/js/ui.js */


function showToast(refs, message, type = "info") {
  renderToast(refs.toast, message, type);
}

function renderProfile(refs, profile) {
  refs.accountName.textContent = profile.name;
  refs.accountRole.textContent = profile.role;
  refs.accountInitial.textContent = profile.name.charAt(0);
  refs.welcomeTitle.textContent = `Bienvenido, ${profile.name}`;
  refs.welcomeSubtitle.textContent = profile.authType === "Autoregistro" ? "Consulta las opciones disponibles para tu proceso de registro." : "Consulta los módulos y proyectos disponibles para tu acceso.";
  refs.processContext.hidden = !profile.process;
  refs.processText.textContent = profile.process;
  refs.moduleCount.textContent = `${profile.modules.length} módulos`;
  refs.projectCount.textContent = `${profile.projects.length} ${profile.projects.length === 1 ? "proyecto" : "proyectos"}`;
  refs.moduleGrid.innerHTML = profile.modules.map((module) => `<a href="#" class="module-item" data-module="${module.name}"><span class="module-icon"><i class="fa-solid ${module.icon}" aria-hidden="true"></i></span><span><strong>${module.name}</strong><span>${module.description}</span></span><i class="fa-solid fa-chevron-right module-arrow" aria-hidden="true"></i></a>`).join("");
  refs.projectList.innerHTML = profile.projects.map((project) => `<article class="project-item"><div class="project-item-head"><strong>${project.name}</strong><span class="count-label">Periodo ${project.period}</span></div><div class="project-meta"><span class="metric"><i class="fa-solid fa-layer-group" aria-hidden="true"></i>${project.assigned} asignados</span><span class="metric pending"><i class="fa-solid fa-clock" aria-hidden="true"></i>${project.pending} pendientes</span><span class="metric sent"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i>${project.sent} enviados</span></div><div class="project-contact"><i class="fa-regular fa-address-book" aria-hidden="true"></i><span>Contacto: ${project.contact}</span></div></article>`).join("");
  refs.userSummary.innerHTML = `<div><span>Nombre completo</span><strong>${profile.name}</strong></div><div><span>Tipo de autenticación</span><strong>${profile.authType}</strong></div><div><span>Rol referencial</span><strong>${profile.role}</strong></div><div><span>Sede</span><strong>${profile.site}</strong></div>`;
}

function renderNotifications(refs, notifications) {
  refs.notificationCount.textContent = notifications.length;
  refs.notificationList.innerHTML = notifications.map((notification) => `<article class="notification-item"><span class="notification-icon"><i class="fa-solid ${notification.icon}" aria-hidden="true"></i></span><div><strong>${notification.title}</strong><span>${notification.text}</span></div></article>`).join("");
}

function setNotificationPanel(refs, isOpen) {
  refs.notificationPanel.hidden = !isOpen;
  refs.notificationButton.setAttribute("aria-expanded", String(isOpen));
}


/* source: ref-016-sessions/js/main.js */






const refs = {
  welcomeShell: document.getElementById("welcomeShell"), accountName: document.getElementById("accountName"), accountRole: document.getElementById("accountRole"), accountInitial: document.getElementById("accountInitial"), welcomeTitle: document.getElementById("welcomeTitle"), welcomeSubtitle: document.getElementById("welcomeSubtitle"), processContext: document.getElementById("processContext"), processText: document.getElementById("processText"), moduleCount: document.getElementById("moduleCount"), projectCount: document.getElementById("projectCount"), moduleGrid: document.getElementById("moduleGrid"), projectList: document.getElementById("projectList"), userSummary: document.getElementById("userSummary"), notificationButton: document.getElementById("notificationButton"), notificationCount: document.getElementById("notificationCount"), notificationPanel: document.getElementById("notificationPanel"), notificationList: document.getElementById("notificationList"), closeNotifications: document.getElementById("closeNotifications"), accountMenuTrigger: document.getElementById("accountMenuTrigger"), accountMenu: document.getElementById("accountMenu"), logoutOption: document.getElementById("logoutOption"), authView: document.getElementById("authView"), authMessage: document.getElementById("authMessage"), sessionAuthTabs: document.querySelectorAll("[data-session-auth-mode]"), sessionLoginForm: document.getElementById("sessionLoginForm"), authPanel: document.getElementById("sessionAuthPanel"), autoregisterFields: document.getElementById("sessionAutoregisterFields"), passportFields: document.getElementById("sessionPassportFields"), documentFields: document.getElementById("sessionDocumentFields"), passwordField: document.getElementById("sessionPasswordField"), authLinks: document.getElementById("sessionAuthLinks"), sessionEmail: document.getElementById("sessionEmail"), sessionDocumentNumber: document.getElementById("sessionDocumentNumber"), sessionDocumentNumberDocument: document.getElementById("sessionDocumentNumberDocument"), sessionBirthDate: document.getElementById("sessionBirthDate"), sessionIssueDate: document.getElementById("sessionIssueDate"), sessionPassword: document.getElementById("sessionPassword"), confirmDialog: document.getElementById("confirmDialog"), closeConfirm: document.getElementById("closeConfirm"), cancelLogout: document.getElementById("cancelLogout"), confirmLogout: document.getElementById("confirmLogout"), confirmTitle: document.getElementById("confirmTitle"), confirmMessage: document.getElementById("confirmMessage"), inactivityAlert: document.getElementById("inactivityAlert"), inactivityAlertTitle: document.getElementById("inactivityAlertTitle"), inactivityMessage: document.getElementById("inactivityMessage"), continueSession: document.getElementById("continueSession"), closeInactiveSession: document.getElementById("closeInactiveSession"), toast: document.getElementById("toast")
};

const state = getWelcomeState(new URLSearchParams(window.location.search), welcomeProfiles);
let pendingAuthentication = null;
let inactivityTimer = null;
let inactivityRemaining = 0;
let activeAuthMode = state.profile.authType === "Passport" ? "passport" : state.profile.authType === "Documento" ? "document" : "autoregistro";

renderProfile(refs, state.profile);
renderNotifications(refs, state.profile.notifications);

function setAccountMenu(isOpen) {
  refs.accountMenu.hidden = !isOpen;
  refs.accountMenuTrigger.setAttribute("aria-expanded", String(isOpen));
}

function setAuthenticationMode(mode) {
  activeAuthMode = ["passport", "document", "autoregistro"].includes(mode) ? mode : "passport";
  const isPassport = activeAuthMode === "passport";
  const isDocument = activeAuthMode === "document";
  const isAutoregister = activeAuthMode === "autoregistro";
  refs.passportFields.hidden = !isPassport;
  refs.documentFields.hidden = !isDocument;
  refs.autoregisterFields.hidden = !isAutoregister;
  refs.passwordField.hidden = isDocument;
  refs.authLinks.hidden = isDocument;
  refs.sessionEmail.required = isAutoregister;
  refs.sessionDocumentNumber.required = isPassport;
  refs.sessionDocumentNumberDocument.required = isDocument;
  refs.sessionBirthDate.required = isDocument;
  refs.sessionIssueDate.required = isDocument;
  refs.sessionPassword.required = !isDocument;
  refs.sessionAuthTabs.forEach((tab) => {
    const isActive = tab.dataset.sessionAuthMode === activeAuthMode;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

function showAuthentication(message, reason) {
  pendingAuthentication = reason;
  refs.welcomeShell.hidden = true;
  refs.notificationPanel.hidden = true;
  refs.authView.hidden = false;
  refs.authMessage.textContent = message;
  refs.authMessage.hidden = !message;
  setAuthenticationMode(activeAuthMode);
}

function showWelcome() {
  refs.welcomeShell.hidden = false;
  refs.authView.hidden = true;
  refs.inactivityAlert.hidden = true;
  refs.sessionPassword.value = "demo";
  setAccountMenu(false);
}

function startNewSession() {
  showAuthentication("Autentícate nuevamente para iniciar una nueva sesión.", "new");
  window.dispatchEvent(new CustomEvent("ref016-auth-ready"));
}

function startInactivity() {
  window.clearTimeout(inactivityTimer);
  inactivityRemaining = 5;
  refs.inactivityAlert.hidden = false;
  updateInactivityMessage();
  window.dispatchEvent(new CustomEvent("ref016-session-warning"));
  inactivityTimer = window.setInterval(() => {
    inactivityRemaining -= 1;
    updateInactivityMessage();
    if (inactivityRemaining <= 0) endInactivity();
  }, 1000);
}

function updateInactivityMessage() {
  const minutes = String(Math.floor(inactivityRemaining / 60)).padStart(2, "0");
  const seconds = String(inactivityRemaining % 60).padStart(2, "0");
  const [, message, question] = getMessage("M131", [`${minutes}:${seconds}`]).split("\n");
  refs.inactivityMessage.innerHTML = `${message}<br>${question}`;
}

function endInactivity() {
  window.clearInterval(inactivityTimer);
  refs.inactivityAlert.hidden = true;
  showAuthentication(getMessage("M28"), "inactivity");
  showToast(refs, getMessage("M28"), "warning");
  window.dispatchEvent(new CustomEvent("ref016-session-ended", { detail: { reason: "inactivity" } }));
}

function continueSession() {
  window.clearInterval(inactivityTimer);
  refs.inactivityAlert.hidden = true;
  showToast(refs, getPrototypeMessage("sessionActive"), "info");
  window.dispatchEvent(new CustomEvent("ref016-session-continued"));
}

refs.notificationButton.addEventListener("click", () => {
  state.notificationsOpen = !state.notificationsOpen;
  setNotificationPanel(refs, state.notificationsOpen);
});
refs.closeNotifications.addEventListener("click", () => {
  state.notificationsOpen = false;
  setNotificationPanel(refs, false);
});
refs.accountMenuTrigger.addEventListener("click", () => setAccountMenu(refs.accountMenu.hidden));
document.addEventListener("click", (event) => {
  if (state.notificationsOpen && !refs.notificationPanel.contains(event.target) && !refs.notificationButton.contains(event.target)) {
    state.notificationsOpen = false;
    setNotificationPanel(refs, false);
  }
  if (!refs.accountMenu.contains(event.target) && !refs.accountMenuTrigger.contains(event.target)) setAccountMenu(false);
});
refs.moduleGrid.addEventListener("click", (event) => {
  const module = event.target.closest("[data-module]");
  if (!module) return;
  event.preventDefault();
  showToast(refs, `Acceso a ${module.dataset.module} disponible para revisión.`, "info");
});
refs.logoutOption.addEventListener("click", () => {
  setAccountMenu(false);
  refs.confirmDialog.hidden = false;
  refs.cancelLogout.focus();
});
function closeDialog() { refs.confirmDialog.hidden = true; }
refs.cancelLogout.addEventListener("click", closeDialog);
refs.closeConfirm.addEventListener("click", closeDialog);
refs.confirmDialog.addEventListener("click", (event) => { if (event.target === refs.confirmDialog) closeDialog(); });
refs.confirmTitle.textContent = getMessage("M130").split("\n")[0];
refs.confirmMessage.textContent = getMessage("M130").split("\n")[1];
refs.confirmLogout.addEventListener("click", () => {
  recordAuditEvent({ user: state.profile.name, authType: state.profile.authType, operation: "Cierre de sesión", closureType: "Voluntario", result: "Exitosa" });
  closeDialog();
  showAuthentication("", "logout");
  window.dispatchEvent(new CustomEvent("ref016-session-ended", { detail: { reason: "logout" } }));
});
refs.continueSession.addEventListener("click", continueSession);
refs.closeInactiveSession.addEventListener("click", endInactivity);
refs.sessionLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const reason = pendingAuthentication;
  pendingAuthentication = null;
  state.profile = welcomeProfiles[activeAuthMode];
  renderProfile(refs, state.profile);
  renderNotifications(refs, state.profile.notifications);
  showWelcome();
  showToast(refs, reason === "new" ? getMessage("M29") : getPrototypeMessage("sessionActive"), reason === "new" ? "info" : "success");
  window.dispatchEvent(new CustomEvent("ref016-authenticated", { detail: { reason } }));
});
refs.sessionAuthTabs.forEach((tab) => tab.addEventListener("click", () => setAuthenticationMode(tab.dataset.sessionAuthMode)));
refs.sessionLoginForm.querySelector(".password-toggle").addEventListener("click", () => {
  const showing = refs.sessionPassword.type === "text";
  refs.sessionPassword.type = showing ? "password" : "text";
  refs.sessionLoginForm.querySelector(".password-toggle").setAttribute("aria-label", showing ? "Mostrar contraseña" : "Ocultar contraseña");
});
window.addEventListener("ref016-guide-reset", showWelcome);
window.addEventListener("ref016-start-new-session", startNewSession);
window.addEventListener("ref016-start-inactivity", startInactivity);


/* source: ref-016-sessions/js/session-guide.js */
(function () {
  const guide = document.getElementById("sessionGuide");
  const title = document.getElementById("sessionGuideTitle");
  const copy = document.getElementById("sessionGuideCopy");
  const options = document.getElementById("sessionGuideOptions");
  const cursor = document.getElementById("sessionCursor");
  if (!guide || !title || !copy || !options || !cursor) return;

  const scenarios = {
    main: {
      label: "flujo principal",
      startEvents: [],
      steps: [
        { target: "#accountName", title: "Sesión autenticada", copy: "Ahora iniciaremos el flujo principal. Esta bienvenida se muestra después de una autenticación exitosa y refleja el usuario, su rol y sus módulos habilitados.", auto: 1800 }
      ]
    },
    new: {
      label: "flujo de nueva sesión",
      startEvents: ["ref016-start-new-session"],
      steps: [
        { target: "#sessionLoginSubmit", title: "Inicia sesión nuevamente", copy: "Ahora iniciaremos el flujo de nueva sesión. La pantalla de autenticación pertenece a este REF-016 y representa el nuevo acceso del mismo usuario.", event: "ref016-authenticated" },
        { target: "#welcome", title: "Sesión reemplazada", copy: "La sesión anterior finalizó automáticamente y la nueva sesión queda activa en la bienvenida.", auto: 1100 }
      ]
    },
    inactive: {
      label: "flujo de inactividad",
      startEvents: ["ref016-start-inactivity"],
      steps: [
        { target: "#inactivityAlert .confirm-modal", title: "Alerta de inactividad", copy: "La sesión muestra un contador y pregunta si deseas continuar trabajando o cerrar sesión.", auto: 1200 },
        { target: "#continueSession", title: "Decide sobre la sesión", copy: "Selecciona Continuar trabajando para conservar la sesión o Cerrar sesión para volver a autenticación.", click: true },
        { target: "#welcome", title: "Sesión continúa activa", copy: "La sesión se mantiene activa porque elegiste continuar trabajando.", auto: 900 }
      ]
    },
    logout: {
      label: "flujo de cierre voluntario",
      startEvents: [],
      steps: [
        { target: "#accountMenuTrigger", title: "Abre tu cuenta", copy: "Ahora iniciaremos el flujo de cierre voluntario. Selecciona el nombre del usuario para abrir sus opciones.", click: true },
        { target: "#logoutOption", title: "Cierra sesión", copy: "Selecciona Cerrar sesión para finalizar voluntariamente la sesión activa.", click: true },
        { target: "#confirmLogout", title: "Confirma el cierre", copy: "Confirma la acción para finalizar inmediatamente la sesión.", event: "ref016-session-ended" },
        { target: "#authView", title: "Vuelve al login", copy: "La sesión queda invalidada y el usuario permanece dentro de este REF-016 en la pantalla de autenticación.", auto: 900 }
      ]
    }
  };

  let scenarioKey = null;
  let stepIndex = 0;
  let runId = 0;

  function isVisible(element) {
    return element && !element.hidden && getComputedStyle(element).display !== "none";
  }

  function hideCursor() { cursor.classList.remove("is-visible"); }

  function positionCursor(element) {
    const box = element.getBoundingClientRect();
    cursor.style.left = `${box.left + box.width / 2 - 10}px`;
    cursor.style.top = `${box.top + box.height / 2 - 10}px`;
    hideCursor();
    requestAnimationFrame(() => cursor.classList.add("is-visible"));
  }

  function finish() {
    title.textContent = "Recorrido completo";
    copy.textContent = `El ${scenarios[scenarioKey].label} terminó dentro del REF-016. Puedes seleccionar otro flujo.`;
    options.hidden = false;
    hideCursor();
  }

  function showStep() {
    const steps = scenarios[scenarioKey].steps;
    if (stepIndex >= steps.length) return finish();
    const step = steps[stepIndex];
    const element = document.querySelector(step.target);
    if (!isVisible(element)) return window.setTimeout(showStep, 80);

    title.textContent = step.title;
    copy.textContent = step.copy;
    positionCursor(element);
    const currentRun = runId;
    const advance = () => window.setTimeout(() => {
      if (currentRun !== runId) return;
      stepIndex += 1;
      showStep();
    }, 80);
    if (step.event) window.addEventListener(step.event, advance, { once: true });
    else if (step.auto) window.setTimeout(advance, step.auto);
    else if (step.click) element.addEventListener("click", advance, { once: true });
  }

  function startScenario(nextScenario) {
    if (!scenarios[nextScenario]) return;
    scenarioKey = nextScenario;
    stepIndex = 0;
    runId += 1;
    guide.hidden = false;
    options.hidden = true;
    title.textContent = `Ahora iniciaremos el ${scenarios[nextScenario].label}`;
    copy.textContent = "La guía externa te indicará cada paso y permanecerá dentro de este requerimiento.";
    hideCursor();
    window.dispatchEvent(new CustomEvent("ref016-guide-reset"));
    scenarios[nextScenario].startEvents.forEach((eventName) => window.dispatchEvent(new CustomEvent(eventName)));
    window.setTimeout(showStep, 140);
  }

  document.querySelectorAll("[data-session-scenario]").forEach((option) => option.addEventListener("click", () => startScenario(option.dataset.sessionScenario)));
  window.addEventListener("resize", () => {
    if (!scenarioKey || !scenarios[scenarioKey].steps[stepIndex]) return;
    const element = document.querySelector(scenarios[scenarioKey].steps[stepIndex].target);
    if (isVisible(element)) positionCursor(element);
  });
})();
