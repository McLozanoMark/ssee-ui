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
    button.innerHTML = `${icon}Sincronizar Passport`;
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
  const titles = {
    success: "Operación completada",
    error: "No se pudo completar",
    warning: "Revisa la información",
    info: "Información"
  };
  element.className = `toast toast-${type}`;
  element.setAttribute("role", "status");
  element.setAttribute("aria-live", type === "error" || type === "warning" ? "assertive" : "polite");
  element.setAttribute("aria-hidden", "false");
  element.innerHTML = `<span class="toast-icon" aria-hidden="true"><i class="fa-solid ${icons[type] || icons.info}"></i></span><span class="toast-content"><strong class="toast-title">${titles[type] || titles.info}</strong><span class="toast-message"></span></span><button class="toast-close" type="button" aria-label="Cerrar aviso"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button><span class="toast-progress" aria-hidden="true"></span>`;
  element.querySelector(".toast-message").textContent = message;
  const dismiss = () => {
    window.clearTimeout(renderToast.timeoutId);
    element.classList.remove("is-visible");
    element.setAttribute("aria-hidden", "true");
  };
  element.querySelector(".toast-close")?.addEventListener("click", dismiss, { once: true });
  element.classList.add("is-visible");
  window.clearTimeout(renderToast.timeoutId);
  renderToast.timeoutId = window.setTimeout(dismiss, 4500);
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


/* source: ref-018-welcome/js/data.js */
const welcomeProfiles = {
  passport: {
    name: "Ana Paredes",
    role: "Supervisor de Seguimiento",
    authType: "Passport",
    site: "Unidad de Seguimiento y Evaluación",
    institution: "Ministerio de Educación",
    process: "",
    quickAccess: [
      { name: "Cambiar contraseña", icon: "fa-key" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 12, pending: 4, sent: 8, contact: { name: "Equipo de Seguimiento", email: "seguimiento@ejemplo.gob.pe" } }],
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
    quickAccess: [
      { name: "Cambiar contraseña", icon: "fa-key" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 12, pending: 4, sent: 8, contact: { name: "Equipo de Seguimiento", email: "seguimiento@ejemplo.gob.pe" } }],
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
    quickAccess: [
      { name: "Registrar usuario", icon: "fa-user-plus" },
      { name: "Cambiar contraseña", icon: "fa-key" },
      { name: "Crear rol", icon: "fa-user-shield" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 8, pending: 2, sent: 6, contact: { name: "Mesa de ayuda USE", email: "mesa.ayuda@ejemplo.gob.pe", phone: "(01) 615-5800" } }],
    notifications: [
      { title: "Instrumentos pendientes", text: "Tienes 2 instrumentos pendientes de atención.", icon: "fa-clipboard-list" },
      { title: "Registro habilitado", text: "Tu acceso al proceso Autoregistro 2026 está habilitado.", icon: "fa-circle-check" }
    ]
  }
};


/* source: ref-018-welcome/js/state.js */
function getWelcomeState(params, profiles) {
  const requested = ["passport", "document", "autoregistro"].includes(params.get("auth")) ? params.get("auth") : "autoregistro";
  return { profileKey: requested, profile: profiles[requested], notificationsOpen: false };
}


/* source: ref-018-welcome/js/ui.js */


function showToast(refs, message, type = "info") {
  renderToast(refs.toast, message, type);
}

function renderProjectContact(contact) {
  if (!contact) return "";
  const details = typeof contact === "string"
    ? [{ icon: "fa-address-book", text: `Contacto: ${contact}` }]
    : [
        contact.name && { icon: "fa-address-book", text: `Contacto: ${contact.name}` },
        contact.email && { icon: "fa-envelope", text: contact.email },
        contact.phone && { icon: "fa-phone", text: contact.phone }
      ].filter(Boolean);
  if (!details.length) return "";
  return `<div class="project-contact">${details.map((detail) => `<span><i class="fa-solid ${detail.icon}" aria-hidden="true"></i>${detail.text}</span>`).join("")}</div>`;
}

function renderQuickAccess(items = []) {
  return items.map((item) => `<div class="quick-access-item" role="listitem"><span class="quick-access-icon"><i class="fa-solid ${item.icon}" aria-hidden="true"></i></span><strong>${item.name}</strong></div>`).join("");
}

function renderProfile(refs, profile) {
  refs.accountName.textContent = profile.name;
  refs.accountRole.textContent = profile.role;
  refs.accountInitial.textContent = profile.name.charAt(0);
  refs.welcomeTitle.textContent = `Bienvenido, ${profile.name}`;
  refs.projectCount.textContent = `${profile.projects.length} ${profile.projects.length === 1 ? "proyecto" : "proyectos"}`;
  refs.projectList.innerHTML = profile.projects.map((project) => `<article class="project-item"><div class="project-item-head"><strong>${project.name}</strong><span class="count-label">Periodo ${project.period}</span></div><div class="project-meta"><span class="metric"><i class="fa-solid fa-layer-group" aria-hidden="true"></i>${project.assigned} asignados</span><span class="metric pending"><i class="fa-solid fa-clock" aria-hidden="true"></i>${project.pending} pendientes</span><span class="metric sent"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i>${project.sent} enviados</span></div>${renderProjectContact(project.contact)}</article>`).join("");
  refs.quickAccessList.innerHTML = renderQuickAccess(profile.quickAccess);
  refs.userSummary.innerHTML = `<div><span>Tipo de autenticación</span><strong>${profile.authType}</strong></div><div><span>Estado</span><strong>Acceso habilitado</strong></div>`;
}

function renderNotifications(refs, notifications) {
  refs.notificationCount.textContent = notifications.length;
  refs.notificationList.innerHTML = notifications.map((notification) => `<article class="notification-item"><span class="notification-icon"><i class="fa-solid ${notification.icon}" aria-hidden="true"></i></span><div><strong>${notification.title}</strong><span>${notification.text}</span></div></article>`).join("");
}

function setNotificationPanel(refs, isOpen) {
  refs.notificationPanel.hidden = !isOpen;
  refs.notificationButton.setAttribute("aria-expanded", String(isOpen));
}


/* source: ref-018-welcome/js/main.js */




const refs = {
  accountName: document.getElementById("accountName"), accountRole: document.getElementById("accountRole"), accountInitial: document.getElementById("accountInitial"), welcomeTitle: document.getElementById("welcomeTitle"), projectCount: document.getElementById("projectCount"), projectList: document.getElementById("projectList"), quickAccessList: document.getElementById("quickAccessList"), userSummary: document.getElementById("userSummary"), notificationButton: document.getElementById("notificationButton"), notificationCount: document.getElementById("notificationCount"), notificationPanel: document.getElementById("notificationPanel"), notificationList: document.getElementById("notificationList"), closeNotifications: document.getElementById("closeNotifications"), toast: document.getElementById("toast")
};

const state = getWelcomeState(new URLSearchParams(window.location.search), welcomeProfiles);
renderProfile(refs, state.profile);
renderNotifications(refs, state.profile.notifications);

refs.notificationButton.addEventListener("click", () => {
  state.notificationsOpen = !state.notificationsOpen;
  setNotificationPanel(refs, state.notificationsOpen);
});
refs.closeNotifications.addEventListener("click", () => {
  state.notificationsOpen = false;
  setNotificationPanel(refs, false);
});
document.addEventListener("click", (event) => {
  if (state.notificationsOpen && !refs.notificationPanel.contains(event.target) && !refs.notificationButton.contains(event.target)) {
    state.notificationsOpen = false;
    setNotificationPanel(refs, false);
  }
});
