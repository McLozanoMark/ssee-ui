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


/* source: design-system/date-range.js */
const DAY_NAMES = ["D", "L", "M", "X", "J", "V", "S"];
const MONTH_FORMATTER = new Intl.DateTimeFormat("es-PE", { month: "long", year: "numeric", timeZone: "UTC" });

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function formatInputDate(date) {
  if (!date) return "";
  return [date.getUTCFullYear(), String(date.getUTCMonth() + 1).padStart(2, "0"), String(date.getUTCDate()).padStart(2, "0")].join("-");
}

function formatDisplayDate(value) {
  const date = parseDate(value);
  return date ? `${String(date.getUTCDate()).padStart(2, "0")}/${String(date.getUTCMonth() + 1).padStart(2, "0")}/${date.getUTCFullYear()}` : "";
}

function monthStart(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function addMonths(date, amount) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1));
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function isSameMonth(left, right) {
  return left.getUTCFullYear() === right.getUTCFullYear() && left.getUTCMonth() === right.getUTCMonth();
}

function createDateRangeFilter(root) {
  if (!root) return null;
  const singleDate = root.dataset.singleDate === "true";
  const picker = root.querySelector(".date-range-picker");
  const start = root.querySelector("[data-date-range-start]");
  const end = root.querySelector("[data-date-range-end]");
  const trigger = root.querySelector("[data-date-range-trigger]");
  const label = root.querySelector("[data-date-range-label]");
  const clearButton = root.querySelector("[data-date-range-clear]");
  const popover = root.querySelector("[data-date-range-popover]");
  const summary = root.querySelector("[data-date-range-summary]");
  const months = root.querySelector("[data-date-range-months]");
  const monthLabels = root.querySelector("[data-date-range-month-labels]");
  const error = root.querySelector("[data-date-range-error]");
  if (!picker || !start || !end || !trigger || !label || !popover || !months || !monthLabels) return null;

  const today = new Date();
  let viewMonth = monthStart(parseDate(start.value) || new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1)));
  let draftStart = start.value;
  let draftEnd = end.value;

  function validate() {
    const invalid = Boolean(start.value && end.value && start.value > end.value);
    start.setAttribute("aria-invalid", String(invalid));
    end.setAttribute("aria-invalid", String(invalid));
    root.toggleAttribute("data-invalid", invalid);
    if (error) {
      if (invalid) error.removeAttribute("hidden");
      else error.setAttribute("hidden", "");
      error.textContent = invalid ? "La fecha inicial debe ser anterior o igual a la fecha final." : "";
    }
    return !invalid;
  }

  function updateSummary() {
    if (singleDate && draftStart) summary.textContent = formatDisplayDate(draftStart);
    else if (draftStart && draftEnd) summary.textContent = `${formatDisplayDate(draftStart)} a ${formatDisplayDate(draftEnd)}`;
    else if (draftStart) summary.textContent = `${formatDisplayDate(draftStart)} a ...`;
    else summary.textContent = singleDate ? "Selecciona una fecha" : "Selecciona una fecha inicial y final";
  }

  function updateTrigger() {
    if (singleDate && start.value) label.textContent = formatDisplayDate(start.value);
    else if (start.value && end.value) label.textContent = `${formatDisplayDate(start.value)} - ${formatDisplayDate(end.value)}`;
    else if (start.value) label.textContent = `Desde ${formatDisplayDate(start.value)}`;
    else if (end.value) label.textContent = `Hasta ${formatDisplayDate(end.value)}`;
    else label.textContent = singleDate ? "Seleccionar fecha" : "Seleccionar rango";
    clearButton.hidden = !(start.value || end.value);
  }

  function renderMonth(month) {
    const firstDay = month.getUTCDay();
    const weekdays = DAY_NAMES.map((day) => `<span class="date-range-weekday">${day}</span>`).join("");
    const dates = [];
    for (let day = 1; ; day += 1) {
      const date = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), day));
      if (date.getUTCMonth() !== month.getUTCMonth()) break;
      dates.push(date);
    }
    const dayCells = [
      ...Array.from({ length: firstDay }, () => `<span class="date-range-day is-empty" aria-hidden="true"></span>`),
      ...dates.map((date) => {
      const day = date.getUTCDate();
      const value = formatInputDate(date);
      const selectedStart = value === draftStart;
      const selectedEnd = value === draftEnd;
      const inRange = Boolean(draftStart && draftEnd && value > draftStart && value < draftEnd);
      const todayValue = formatInputDate(new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())));
      const classes = ["date-range-day", selectedStart || selectedEnd ? "is-selected" : "", inRange ? "is-in-range" : "", value === todayValue ? "is-today" : ""].filter(Boolean).join(" ");
      const labelText = `${day} de ${capitalize(MONTH_FORMATTER.format(month).split(" de ")[0])} de ${month.getUTCFullYear()}`;
      return `<button class="${classes}" type="button" data-date-range-day="${value}" aria-label="${labelText}"${selectedStart ? " aria-current=\"date\"" : ""}>${day}</button>`;
      })
    ].join("");
    return `<section class="date-range-month" aria-label="${capitalize(MONTH_FORMATTER.format(month))}"><h4>${capitalize(MONTH_FORMATTER.format(month))}</h4><div class="date-range-weekdays">${weekdays}</div><div class="date-range-day-grid">${dayCells}</div></section>`;
  }

  function renderCalendar() {
    monthLabels.innerHTML = `<span>${capitalize(MONTH_FORMATTER.format(viewMonth))}</span><span>${capitalize(MONTH_FORMATTER.format(addMonths(viewMonth, 1)))}</span>`;
    months.innerHTML = `${renderMonth(viewMonth)}${renderMonth(addMonths(viewMonth, 1))}`;
    updateSummary();
  }

  function positionPopover() {
    if (popover.hidden) return;
    const pickerRect = picker.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const popoverWidth = popover.offsetWidth;
    const viewportGutter = 12;
    const preferredLeft = triggerRect.left - pickerRect.left;
    const minimumLeft = viewportGutter - pickerRect.left;
    const maximumLeft = Math.max(minimumLeft, window.innerWidth - viewportGutter - popoverWidth - pickerRect.left);
    const boundedLeft = Math.min(Math.max(preferredLeft, minimumLeft), maximumLeft);

    popover.style.left = `${boundedLeft}px`;
    popover.style.right = "auto";
  }

  function open() {
    draftStart = start.value;
    draftEnd = end.value;
    const anchor = parseDate(draftStart) || parseDate(draftEnd);
    if (anchor) viewMonth = monthStart(anchor);
    renderCalendar();
    popover.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    positionPopover();
  }

  function close() {
    popover.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  function resetDraft() {
    draftStart = "";
    draftEnd = "";
    renderCalendar();
  }

  trigger.addEventListener("click", () => (popover.hidden ? open() : close()));
  clearButton.addEventListener("click", (event) => {
    event.stopPropagation();
    start.value = "";
    end.value = "";
    resetDraft();
    updateTrigger();
    validate();
  });
  root.querySelector("[data-date-range-prev]")?.addEventListener("click", () => { viewMonth = addMonths(viewMonth, -1); renderCalendar(); });
  root.querySelector("[data-date-range-next]")?.addEventListener("click", () => { viewMonth = addMonths(viewMonth, 1); renderCalendar(); });
  popover.addEventListener("click", (event) => event.stopPropagation());
  months.addEventListener("click", (event) => {
    const day = event.target.closest("[data-date-range-day]");
    if (!day) return;
    const value = day.dataset.dateRangeDay;
    if (singleDate) {
      draftStart = value;
      draftEnd = value;
    } else if (!draftStart || (draftStart && draftEnd)) {
      draftStart = value;
      draftEnd = "";
    } else if (value < draftStart) {
      draftEnd = draftStart;
      draftStart = value;
    } else {
      draftEnd = value;
    }
    renderCalendar();
  });
  root.querySelector("[data-date-range-cancel]")?.addEventListener("click", () => { draftStart = start.value; draftEnd = end.value; close(); });
  root.querySelector("[data-date-range-apply]")?.addEventListener("click", () => {
    start.value = draftStart;
    end.value = singleDate ? draftStart : draftEnd;
    updateTrigger();
    validate();
    close();
  });
  document.addEventListener("click", (event) => {
    if (!picker.contains(event.target)) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !popover.hidden) close();
  });
  window.addEventListener("resize", positionPopover);

  function reset() {
    start.value = "";
    end.value = "";
    resetDraft();
    updateTrigger();
    validate();
    close();
  }

  function setValues(startValue = "", endValue = "") {
    start.value = startValue || "";
    end.value = singleDate ? start.value : endValue || "";
    draftStart = start.value;
    draftEnd = end.value;
    const anchor = parseDate(draftStart) || parseDate(draftEnd);
    if (anchor) viewMonth = monthStart(anchor);
    updateTrigger();
    renderCalendar();
    validate();
  }

  function setDisabled(disabled) {
    root.toggleAttribute("data-disabled", Boolean(disabled));
    trigger.disabled = Boolean(disabled);
    clearButton.disabled = Boolean(disabled);
    root.querySelectorAll("button").forEach((button) => { button.disabled = Boolean(disabled); });
    if (disabled) close();
    trigger.setAttribute("aria-disabled", String(Boolean(disabled)));
  }

  updateTrigger();
  renderCalendar();
  validate();
  return { start, end, validate, reset, setValues, setDisabled, open };
}

function toDateInputValue(value) {
  const date = String(value || "").split(" ")[0];
  const [day, month, year] = date.split("/");
  return day && month && year ? `${year}-${month}-${day}` : "";
}
/* source: design-system/table-sort.js */
const collator = new Intl.Collator("es", { numeric: true, sensitivity: "base" });

function normalize(value, type) {
  const text = String(value || "").trim();
  if (type === "number") return Number(text.replace(/[^0-9.-]/g, "")) || 0;
  if (type === "date") {
    const parts = text.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    return parts ? new Date(`${parts[3]}-${parts[2]}-${parts[1]}`).getTime() : 0;
  }
  return text;
}

function attachTableSorting(table) {
  if (!table) return;
  const buttons = [...table.querySelectorAll("[data-sort-key]")];
  const state = { key: null, direction: null };

  buttons.forEach((button) => button.addEventListener("click", () => {
    const key = button.dataset.sortKey;
    state.direction = state.key === key && state.direction === "ascending" ? "descending" : "ascending";
    state.key = key;
    const header = button.closest("th");
    const columnIndex = [...header.parentElement.children].indexOf(header);
    const type = button.dataset.sortType || "text";
    const body = table.tBodies[0];
    if (!body) return;

    [...body.rows]
      .sort((left, right) => {
        const comparison = type === "number" || type === "date"
          ? normalize(left.cells[columnIndex]?.textContent, type) - normalize(right.cells[columnIndex]?.textContent, type)
          : collator.compare(normalize(left.cells[columnIndex]?.textContent, type), normalize(right.cells[columnIndex]?.textContent, type));
        return state.direction === "ascending" ? comparison : -comparison;
      })
      .forEach((row) => body.append(row));

    buttons.forEach((item) => {
      const itemHeader = item.closest("th");
      const active = item === button;
      itemHeader?.setAttribute("aria-sort", active ? state.direction : "none");
      const icon = item.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-arrow-up", active && state.direction === "ascending");
        icon.classList.toggle("fa-arrow-down", active && state.direction === "descending");
        icon.classList.toggle("fa-arrow-down-up", !active);
      }
    });
  }));
}


/* source: gio-ref-003-asignaciones/js/data.js */
const STORAGE_KEY = "ssee-rf-dis-001-state-v3";
const AUDIT_DATE = "24/09/2026";

const users = [
  { id: "AP1041044", name: "María López Pérez", active: true, canReceiveAssignments: true },
  { id: "AP2056789", name: "Juan Carlos Ramírez", active: true, canReceiveAssignments: true },
  { id: "AP3098765", name: "Ana Lucía Torres", active: true, canReceiveAssignments: true },
  { id: "AP4123456", name: "Pedro Miguel Silva", active: true, canReceiveAssignments: true },
  { id: "AP5234567", name: "Rosa Elena Vargas", active: true, canReceiveAssignments: true },
  { id: "AP6345678", name: "Luis Alberto Quispe", active: true, canReceiveAssignments: true },
];

const projects = [
  { name: "IIE PRIVADAS", instruments: ["Ficha de seguimiento", "Supervisión a Instituciones Educativas Privadas - Aspectos Económicos", "Supervisión a Instituciones Educativas Privadas - Aspectos Legales"] },
  { name: "Instituciones educativas", instruments: ["Instrumento de evaluación", "Lista de verificación"] },
];

const samples = [
  { name: "Muestra nacional 2026", total: 100, source: "Censo Educativo MINEDU", userField: "COD_USUARIO", userId: "AP1041044", projects: ["IIE PRIVADAS", "Instituciones educativas"], instruments: ["Ficha de seguimiento", "Instrumento de evaluación"] },
  { name: "Muestra de directores", total: 420, source: "Directores registrados", userField: "COD_USUARIO", userId: "AP2056789", projects: ["IIE PRIVADAS"], instruments: ["Ficha de seguimiento", "Supervisión a Instituciones Educativas Privadas - Aspectos Económicos"] },
  { name: "Piloto operativo", total: 80, source: "Operativo piloto", userField: "COD_USUARIO", userId: "AP3098765", projects: ["Instituciones educativas"], instruments: ["Instrumento de evaluación", "Lista de verificación"] },
];

const initialAssignments = [
  { id: "ASN-001", unitId: "150001", project: "IIE PRIVADAS", mode: "with-sample", instrument: "Ficha de seguimiento", userId: "AP1041044", sample: "Muestra nacional 2026", start: "18/08/2026", end: "18/09/2026", progress: "0%", progressGroup: "Sin iniciar", status: "Pendiente", dre: "Lima Metropolitana", ugel: "UGEL San Juan de Lurigancho", registrarId: "USR-0001", informantId: "INF-000001", recordCount: 100 },
  { id: "ASN-002", unitId: "150002", project: "IIE PRIVADAS", mode: "with-sample", instrument: "Supervisión a Instituciones Educativas Privadas - Aspectos Económicos", userId: "AP2056789", sample: "Muestra de directores", start: "15/08/2026", end: "15/09/2026", progress: "42%", progressGroup: "En curso", status: "En proceso", dre: "Arequipa", ugel: "UGEL Arequipa Sur", registrarId: "USR-0001", informantId: "INF-000002", recordCount: 420 },
  { id: "ASN-003", unitId: "150003", project: "Instituciones educativas", mode: "with-sample", instrument: "Lista de verificación", userId: "AP3098765", sample: "Piloto operativo", start: "01/08/2026", end: "12/08/2026", progress: "100%", progressGroup: "Completado", status: "Finalizada", dre: "Piura", ugel: "UGEL Piura", registrarId: "USR-0001", informantId: "INF-000003", recordCount: 80 },
  { id: "ASN-004", unitId: "150004", project: "Instituciones educativas", mode: "with-sample", instrument: "Instrumento de evaluación", userId: "AP4123456", sample: "Muestra histórica 2025", start: "05/08/2026", end: "30/08/2026", progress: "25%", progressGroup: "En curso", status: "Reasignada", active: false, dre: "Lima Metropolitana", ugel: "UGEL San Juan de Lurigancho", registrarId: "USR-0001", informantId: "INF-000004", recordCount: 100 },
  { id: "ASN-005", unitId: "150005", project: "Instituciones educativas", mode: "with-sample", instrument: "Instrumento de evaluación", userId: "AP5234567", sample: "Muestra anulada", start: "20/07/2026", end: "20/08/2026", progress: "0%", progressGroup: "Sin iniciar", status: "Anulada", active: false, dre: "Arequipa", ugel: "UGEL Arequipa Sur", registrarId: "USR-0001", informantId: "INF-000005", recordCount: 100 },
  { id: "ASN-006", unitId: "150006", project: "IIE PRIVADAS", mode: "with-sample", instrument: "Ficha de seguimiento", userId: "AP6345678", sample: "Muestra nacional 2026", start: "19/08/2026", end: "19/09/2026", progress: "10%", progressGroup: "En curso", status: "En proceso", dre: "Piura", ugel: "UGEL Piura", registrarId: "USR-0001", informantId: "INF-000006", recordCount: 100 },
  { id: "ASN-007", unitId: "150007", project: "IIE PRIVADAS", mode: "with-sample", instrument: "Ficha de seguimiento", userId: "AP1041044", sample: "Muestra de directores", start: "20/08/2026", end: "20/09/2026", progress: "0%", progressGroup: "Sin iniciar", status: "Pendiente", dre: "Lima Metropolitana", ugel: "UGEL San Juan de Lurigancho", registrarId: "USR-0001", informantId: "INF-000007", recordCount: 420 },
  { id: "ASN-008", unitId: "150008", project: "Instituciones educativas", mode: "with-sample", instrument: "Lista de verificación", userId: "AP2056789", sample: "Piloto operativo", start: "22/08/2026", end: "22/09/2026", progress: "65%", progressGroup: "En curso", status: "En proceso", dre: "Arequipa", ugel: "UGEL Arequipa Sur", registrarId: "USR-0001", informantId: "INF-000008", recordCount: 80 },
  { id: "ASN-009", unitId: "150009", project: "Instituciones educativas", mode: "with-sample", instrument: "Instrumento de evaluación", userId: "AP3098765", sample: "Muestra nacional 2026", start: "22/08/2026", end: "22/09/2026", progress: "100%", progressGroup: "Completado", status: "Finalizada", dre: "Piura", ugel: "UGEL Piura", registrarId: "USR-0001", informantId: "INF-000009", recordCount: 100 },
  { id: "ASN-010", unitId: "150010", project: "IIE PRIVADAS", mode: "with-sample", instrument: "Ficha de seguimiento", userId: "AP4123456", sample: "Muestra histórica 2025", start: "24/08/2026", end: "24/09/2026", progress: "35%", progressGroup: "En curso", status: "En proceso", dre: "Lima Metropolitana", ugel: "UGEL San Juan de Lurigancho", registrarId: "USR-0001", informantId: "INF-000010", recordCount: 100 },
  { id: "ASN-011", unitId: "150011", project: "IIE PRIVADAS", mode: "with-sample", instrument: "Ficha de seguimiento", userId: "AP5234567", sample: "Muestra de directores", start: "25/08/2026", end: "25/09/2026", progress: "0%", progressGroup: "Sin iniciar", status: "Pendiente", dre: "Arequipa", ugel: "UGEL Arequipa Sur", registrarId: "USR-0001", informantId: "INF-000011", recordCount: 420 },
  { id: "ASN-012", unitId: "150012", project: "Instituciones educativas", mode: "with-sample", instrument: "Instrumento de evaluación", userId: "AP6345678", sample: "Piloto operativo", start: "26/08/2026", end: "26/09/2026", progress: "100%", progressGroup: "Completado", status: "Finalizada", dre: "Piura", ugel: "UGEL Piura", registrarId: "USR-0001", informantId: "INF-000012", recordCount: 80 },
];

const variableCatalog = [
  ["COD_MODULAR", "Código modular", "Texto"], ["NOMBRE_IE", "Nombre de la institución", "Texto"], ["GESTION_IE", "Gestión de la institución", "Texto"], ["DRE", "Dirección regional", "Texto"], ["UGEL", "Unidad de gestión educativa", "Texto"], ["DISTRITO", "Distrito", "Texto"], ["PROVINCIA", "Provincia", "Texto"], ["DEPARTAMENTO", "Departamento", "Texto"], ["NIVEL_EDUCATIVO", "Nivel educativo", "Texto"], ["TURNO", "Turno", "Texto"], ["AREA_GEOGRAFICA", "Área geográfica", "Texto"], ["DIRECCION", "Dirección", "Texto"], ["TELEFONO", "Teléfono", "Texto"], ["CORREO_IE", "Correo institucional", "Texto"], ["DIRECTOR", "Director", "Texto"], ["COD_LOCAL", "Código de local", "Texto"], ["CODIGO_UGEL", "Código UGEL", "Texto"], ["REGION", "Región", "Texto"], ["UBIGEO", "Código ubigeo", "Texto"], ["CENTRO_POBLADO", "Centro poblado", "Texto"], ["RED_EDUCATIVA", "Red educativa", "Texto"], ["TIPO_SERVICIO", "Tipo de servicio", "Texto"], ["MODALIDAD", "Modalidad", "Texto"], ["JORNADA", "Jornada escolar", "Texto"], ["NUMERO_AULAS", "Número de aulas", "Número"], ["NUMERO_DOCENTES", "Número de docentes", "Número"], ["NUMERO_ESTUDIANTES", "Número de estudiantes", "Número"], ["FECHA_CORTE", "Fecha de corte", "Fecha"], ["PERIODO", "Periodo", "Texto"], ["FUENTE_REGISTRO", "Fuente del registro", "Texto"], ["ID_PERSONA", "Identificador de persona", "Texto"], ["NOMBRE_COMPLETO", "Nombre completo", "Texto"], ["TIPO_DOCUMENTO", "Tipo de documento", "Texto"], ["NUMERO_DOCUMENTO", "Número de documento", "Texto"], ["FECHA_REGISTRO", "Fecha de registro", "Fecha"],
];

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function sampleFor(assignment) { return samples.find((sample) => sample.name === assignment.sample) || null; }
function sampleUserId(sample, index = 0) { return sample?.userIds?.[index] || sample?.userId || ""; }
function baseUnitId(assignment) { return Number(assignment.unitId) || 150001; }
function recordStatus(assignment) { return assignment.active === false ? "Inactiva" : assignment.status; }

function makeRecord(assignment, index, source = {}) {
  const sample = sampleFor(assignment);
  const unitId = source.unitId || (assignment.mode === "without-sample" ? "SIN-MUESTRA-001" : String(baseUnitId(assignment) + index).padStart(6, "0"));
  const userId = source.userId || assignment.userId || sampleUserId(sample, index);
  return { unitId, informantId: source.informantId || (assignment.mode === "without-sample" ? "INF-SIN-MUESTRA" : `INF-${String(index + 1).padStart(6, "0")}`), userId, institution: source.institution || (index % 2 === 0 ? "I.E. 0001 José de la Riva" : "I.E. 0042 San Martín"), sede: source.sede || "San José", dre: source.dre || assignment.dre || "Lima Metropolitana", ugel: source.ugel || assignment.ugel || "UGEL San Juan de Lurigancho", status: source.status || recordStatus(assignment) };
}

function buildRecords(assignment, sourceRecords = []) {
  if (Array.isArray(sourceRecords) && sourceRecords.length) return sourceRecords.map((record, index) => makeRecord(assignment, index, record));
  const total = assignment.mode === "without-sample" ? 1 : assignment.recordCount || sampleFor(assignment)?.total || 1;
  return Array.from({ length: total }, (_, index) => makeRecord(assignment, index));
}

function normalizeAssignment(item) {
  const normalized = { ...item, active: item.active !== false && item.status !== "Anulada" && item.status !== "Reasignada", history: Array.isArray(item.history) ? item.history : [], audit: Array.isArray(item.audit) ? item.audit : [], variablesByRecord: item.variablesByRecord && typeof item.variablesByRecord === "object" ? item.variablesByRecord : {} };
  normalized.records = Array.isArray(item.records) && item.records.length ? item.records.map((record, index) => makeRecord(normalized, index, record)) : buildRecords(normalized);
  normalized.recordCount = normalized.records.length;
  if (!normalized.informantId) normalized.informantId = normalized.records[0]?.informantId || "INF-SIN-MUESTRA";
  return normalized;
}

function loadAssignments() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
    return Array.isArray(stored) ? stored.map(normalizeAssignment) : clone(initialAssignments).map(normalizeAssignment);
  } catch {
    return clone(initialAssignments).map(normalizeAssignment);
  }
}

function saveAssignments(nextAssignments) {
  const normalized = nextAssignments.map(normalizeAssignment);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

function nextAssignmentId(items = loadAssignments()) {
  const nextNumber = items.reduce((max, item) => Math.max(max, Number(String(item.id).replace("ASN-", "")) || 0), 0) + 1;
  return `ASN-${String(nextNumber).padStart(3, "0")}`;
}

function getAssignment(id) { return loadAssignments().find((item) => item.id === id) || null; }
function getAssignmentRecords(assignment) { return assignment?.records?.length ? assignment.records : buildRecords(assignment || {}); }
function getRecord(assignment, recordId) { const records = getAssignmentRecords(assignment); return records.find((record) => String(record.unitId) === String(recordId)) || records[0] || null; }
function assignmentState(assignment) { return assignment?.active === false ? "Inactiva" : "Activa"; }
function isReadOnlyAssignment(assignment) { return !assignment || assignment.active === false || ["Finalizada", "Anulada", "Reasignada"].includes(assignment.status); }
function isEditableAssignment(assignment) { return !isReadOnlyAssignment(assignment) && assignment.status !== "En proceso"; }

function createAssignment(input) {
  const items = loadAssignments();
  const draft = { id: nextAssignmentId(items), ...input, sample: input.sample || "Sin muestra", progress: "0%", progressGroup: "Sin iniciar", status: "Pendiente", active: true, dre: input.dre || "Lima Metropolitana", ugel: input.ugel || "UGEL San Juan de Lurigancho", registrarId: "USR-0001", history: [], audit: [{ action: "create", date: AUDIT_DATE, userId: "USR-0001" }] };
  draft.records = buildRecords(draft, input.records); draft.recordCount = draft.records.length; draft.informantId = draft.records[0]?.informantId || "INF-SIN-MUESTRA";
  saveAssignments([...items, draft]);
  return draft;
}

function normalizeDate(value) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return value;
  const [day, month, year] = String(value || "").split("/");
  return year && month && day ? `${year}-${month}-${day}` : "";
}

const instrumentValidity = { start: "01/01/2026", end: "31/12/2026" };
function isInstrumentValid(projectName, instrument, start, end) {
  const project = projects.find((item) => item.name === projectName);
  const periodStart = normalizeDate(start); const periodEnd = normalizeDate(end);
  return Boolean(project?.instruments.includes(instrument) && periodStart && periodEnd && periodStart >= normalizeDate(instrumentValidity.start) && periodEnd <= normalizeDate(instrumentValidity.end));
}

function validateCreateAssignment(input) {
  const errors = []; const project = projects.find((item) => item.name === input.project); const sample = input.sample && input.sample !== "Sin muestra" ? findSample(input.sample) : null; const user = input.userId ? findUser(input.userId) : null;
  if (!project || !project.instruments.includes(input.instrument)) errors.push("Selecciona un instrumento asociado al proyecto.");
  if (input.mode === "with-sample") { if (!sample) errors.push("Selecciona una muestra válida."); else if (!sample.projects.includes(input.project) || !sample.instruments.includes(input.instrument)) errors.push("La muestra no está disponible para el proyecto e instrumento seleccionados."); }
  if (input.mode === "without-sample" && (!user || !user.active || !user.canReceiveAssignments)) errors.push("Selecciona un usuario activo con permisos para recibir instrumentos.");
  const start = normalizeDate(input.start); const end = normalizeDate(input.end); if (!start || !end || start > end) errors.push("Selecciona un periodo de asignación válido.");
  if (start && end && !isInstrumentValid(input.project, input.instrument, input.start, input.end)) errors.push("El instrumento no se encuentra vigente para el periodo seleccionado.");
  const duplicate = loadAssignments().some((item) => item.active !== false && item.project === input.project && item.instrument === input.instrument && item.sample === (input.sample || "Sin muestra") && item.userId === input.userId && normalizeDate(item.start) === start && normalizeDate(item.end) === end);
  if (duplicate) errors.push("Ya existe una asignación con los mismos datos y periodo.");
  return errors;
}

function updateAssignment(id, changes) {
  const items = loadAssignments(); const current = items.find((item) => item.id === id); if (!current) return { ok: false, error: "No se encontró la asignación seleccionada." }; if (!isEditableAssignment(current)) return { ok: false, error: "La asignación no puede modificarse en su estado actual." };
  const active = Boolean(changes.active); const entry = { action: active ? "activate" : "inactivate", date: AUDIT_DATE, userId: "USR-0001" }; const updated = { ...current, active, audit: [...current.audit, entry], history: [...current.history, entry] };
  saveAssignments(items.map((item) => item.id === id ? updated : item)); return { ok: true, assignment: updated };
}

function cancelAssignment(id) {
  const items = loadAssignments(); const entry = { action: "cancel", date: AUDIT_DATE, userId: "USR-0001", reason: "Anulación de la asignación" };
  return saveAssignments(items.map((item) => item.id === id ? { ...item, active: false, status: "Anulada", progress: "0%", progressGroup: "Sin iniciar", audit: [...item.audit, entry], history: [...item.history, entry] } : item));
}

function validateReassignment(id, input) {
  const assignment = getAssignment(id); const user = findUser(input.userId); const errors = [];
  if (!assignment) errors.push("No se encontró la asignación seleccionada."); else if (assignment.active === false || ["Finalizada", "Anulada"].includes(assignment.status)) errors.push("La asignación no puede reasignarse en su estado actual.");
  if (!input.userId || !user?.id || !user.active || !user.canReceiveAssignments) errors.push("Selecciona un usuario activo con permisos para recibir instrumentos.");
  if (!input.reassignmentDate) errors.push("Selecciona la fecha de reasignación.");
  if (input.reassignmentDate && assignment && !isInstrumentValid(assignment.project, assignment.instrument, input.reassignmentDate, input.reassignmentDate)) errors.push("El instrumento no se encuentra vigente para la fecha de reasignación.");
  if (!input.reason?.trim()) errors.push("Ingresa el motivo de la reasignación."); return errors;
}

function reassignAssignment(id, input) {
  const items = loadAssignments(); const current = items.find((item) => item.id === id); if (!current) return { ok: false, error: "No se encontró la asignación seleccionada." }; if (current.active === false || ["Finalizada", "Anulada"].includes(current.status)) return { ok: false, error: "La asignación no puede reasignarse en su estado actual." };
  const entry = { action: "reassign", assignmentId: current.id, userId: current.userId, start: current.start, end: current.end, status: "Inactiva", reason: input.reason, notify: Boolean(input.notify), date: input.reassignmentDate || AUDIT_DATE };
  const reassigned = { ...current, id: nextAssignmentId(items), userId: input.userId, notifyUser: Boolean(input.notify), status: "Pendiente", active: true, progress: "0%", progressGroup: "Sin iniciar", reassignedFromId: current.id, reassignmentDate: input.reassignmentDate || AUDIT_DATE, history: [...current.history, entry], audit: [...current.audit, entry], records: current.records.map((record) => ({ ...record, userId: input.userId, status: "Pendiente" })) };
  const previous = { ...current, active: false, status: "Reasignada", history: [...current.history, entry], audit: [...current.audit, entry] }; saveAssignments([...items.map((item) => item.id === id ? previous : item), reassigned]); return { ok: true, assignment: reassigned };
}

function buildVariableDefinitions(assignment, record) {
  const user = findUser(record?.userId || assignment?.userId); const context = record || {}; const sample = findSample(assignment?.sample);
  const values = { COD_MODULAR: context.unitId, NOMBRE_IE: context.institution, DRE: context.dre, UGEL: context.ugel, REGION: context.dre, ID_PERSONA: user.id, NOMBRE_COMPLETO: user.name, FUENTE_REGISTRO: sample?.source || "Censo Educativo MINEDU" };
  const fallbacks = { GESTION_IE: "Pública", DISTRITO: "San José", PROVINCIA: "Lima", DEPARTAMENTO: "Lima", NIVEL_EDUCATIVO: "Secundaria", TURNO: "Mañana", AREA_GEOGRAFICA: "Urbana", DIRECCION: "Av. Principal 100", TELEFONO: "999 999 999", CORREO_IE: "contacto@ejemplo.edu.pe", DIRECTOR: "María López Pérez", COD_LOCAL: "L00150001", CODIGO_UGEL: "UGEL-001", UBIGEO: "150101", CENTRO_POBLADO: "San José", RED_EDUCATIVA: "Red Lima Centro", TIPO_SERVICIO: "Educación básica", MODALIDAD: "Presencial", JORNADA: "Regular", NUMERO_AULAS: "24", NUMERO_DOCENTES: "38", NUMERO_ESTUDIANTES: "620", FECHA_CORTE: "18/08/2026", PERIODO: "2026", TIPO_DOCUMENTO: "DNI", NUMERO_DOCUMENTO: "40123456", FECHA_REGISTRO: "18/08/2026" };
  return variableCatalog.map(([code, name, type]) => [code, name, type, values[code] ?? fallbacks[code] ?? ""]);
}

function getRecordVariables(assignment, record) {
  const defaults = buildVariableDefinitions(assignment, record).map(([code, name, type, value]) => ({ code, name, type, value, source: findSample(assignment.sample)?.source || "Censo Educativo MINEDU" }));
  return Array.isArray(assignment.variablesByRecord?.[record.unitId]) ? assignment.variablesByRecord[record.unitId] : defaults;
}

function saveRecordVariables(assignmentId, recordId, variables, action) {
  const items = loadAssignments(); const current = items.find((item) => item.id === assignmentId); if (!current || !isEditableAssignment(current)) return { ok: false, error: "La asignación está en solo lectura." };
  const entry = { action, recordId: String(recordId), date: AUDIT_DATE, userId: "USR-0001" }; const updated = { ...current, variablesByRecord: { ...current.variablesByRecord, [recordId]: clone(variables) }, audit: [...current.audit, entry], history: [...current.history, entry] };
  saveAssignments(items.map((item) => item.id === assignmentId ? updated : item)); return { ok: true, assignment: updated };
}

function findUser(id) { return users.find((user) => user.id === id) || { id: id || "", name: "Usuario no disponible", active: false, canReceiveAssignments: false }; }
function findProject(name) { return projects.find((project) => project.name === name) || projects[0]; }
function findSample(name) { return samples.find((sample) => sample.name === name) || null; }
/* source: gio-ref-003-asignaciones/js/common.js */
function qs(selector, root = document) { return root.querySelector(selector); }
function escapeHtml(value) { return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character])); }
function getParam(name) { return new URLSearchParams(window.location.search).get(name) || ""; }
function linkTo(path, params = {}) { const query = new URLSearchParams(params).toString(); return query ? `${path}?${query}` : path; }
function showToast(message, type = "info") { const element = qs("#toast"); if (element) renderToast(element, message, type); }

function bindConfirmDismissal(modal) {
  if (!modal || modal.dataset.confirmDismissBound) return;
  modal.addEventListener("click", (event) => {
    const dismissControl = event.target.closest?.("[data-bs-dismiss='modal']");
    if (!dismissControl) return;
    event.preventDefault();
    event.stopPropagation();
    closeConfirm();
  }, true);
  modal.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    closeConfirm();
  }, true);
  modal.dataset.confirmDismissBound = "true";
}

function openConfirm(message) {
  const modal = qs("#confirmModal");
  const legacyMessage = qs("#confirmMessage");
  if (legacyMessage) legacyMessage.textContent = message;
  bindConfirmDismissal(modal);
  const instance = openConfirmModal("confirmModal", message);
  if (!instance && modal) {
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());
    modal.dataset.fallbackModal = "true";
    modal.classList.add("show");
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
    document.body.classList.add("modal-open");
  }
  return instance;
}
function closeConfirm() {
  const modal = qs("#confirmModal");
  if (window.bootstrap) closeConfirmModal("confirmModal");
  if (modal) {
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    delete modal.dataset.fallbackModal;
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());
  }
}

function downloadCsv(filename, headers, rows) {
  const escapeCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(",")).join("\r\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadExcel(filename, headers, rows) {
  const escapeXml = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
  const cell = (value, header = false) => `<Cell${header ? " ss:StyleID=\"Header\"" : ""}><Data ss:Type=\"String\">${escapeXml(value)}</Data></Cell>`;
  const workbook = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="Header"><Font ss:Bold="1"/></Style></Styles><Worksheet ss:Name="Datos"><Table><Row>${headers.map((header) => cell(header, true)).join("")}</Row>${rows.map((row) => `<Row>${row.map((value) => cell(value)).join("")}</Row>`).join("")}</Table></Worksheet></Workbook>`;
  const blob = new Blob([workbook], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
/* source: gio-ref-003-asignaciones/js/edit.js */
const assignment = getAssignment(getParam("id"));
const editable = isEditableAssignment(assignment);
const initialActive = assignment?.active !== false;
let pendingActive = null;
let pendingAction = null;

function assignmentModeLabel(mode) { return mode === "without-sample" ? "Sin muestra" : "Con muestra"; }
function statusClass(status) { return status === "Activa" ? "active" : "inactive"; }
function hasUnsavedChanges() { return editable && qs("#activeAssignment").checked !== initialActive; }
function requestCancel() {
  if (!hasUnsavedChanges()) return window.location.href = "index.html";
  pendingAction = "discard"; qs("#confirmTitle").textContent = "Descartar cambios"; openConfirm("Tienes cambios sin guardar. ¿Deseas descartarlos?");
}

function render() {
  if (!assignment) return;
  const user = findUser(assignment.userId); const displayStatus = assignmentState(assignment);
  qs("#editSummary").innerHTML = `<div class="detail-field"><span>Proyecto</span><strong>${escapeHtml(assignment.project)}</strong></div><div class="detail-field"><span>Instrumento</span><strong>${escapeHtml(assignment.instrument)}</strong></div><div class="detail-field"><span>Tipo de asignación</span><strong>${assignmentModeLabel(assignment.mode)}</strong></div><div class="detail-field"><span>Usuario asignado</span><strong>${escapeHtml(user.name)}<small>${escapeHtml(user.id)}</small></strong></div><div class="detail-field"><span>Muestra</span><strong>${escapeHtml(assignment.sample)}</strong></div><div class="detail-field"><span>Periodo</span><strong>${escapeHtml(assignment.start)} - ${escapeHtml(assignment.end)}</strong></div>`;
  qs("#currentStatus").className = `status ${statusClass(displayStatus)}`; qs("#currentStatus").textContent = displayStatus; qs("#activeAssignment").checked = initialActive; qs("#operationalStatus").textContent = `${assignment.status} · ${assignment.progressGroup}`; qs("#originalDate").textContent = assignment.start;
  const variablesLink = qs("#variablesLink"); variablesLink.href = linkTo("detail.html", { id: assignment.id }); variablesLink.title = "Seleccionar un registro para consultar sus variables"; variablesLink.innerHTML = '<i class="fa-solid fa-list-check icon" aria-hidden="true"></i>Consultar variables por registro';
  if (!editable) {
    qs("#editRestriction").hidden = false; qs("#editRestriction").textContent = assignment.status === "En proceso" ? "La asignación ya inició y no admite cambios." : "La asignación no puede modificarse en su estado actual."; qs("#activeAssignment").disabled = true; qs("#saveEdit").disabled = true;
  }
}

qs("#editForm").addEventListener("submit", (event) => { event.preventDefault(); if (!editable) return showToast("La asignación no puede modificarse en su estado actual.", "warning"); pendingActive = qs("#activeAssignment").checked; pendingAction = "save"; qs("#confirmTitle").textContent = "Confirmar actualización"; openConfirm(`La asignación quedará ${pendingActive ? "activa" : "inactiva"}. ¿Deseas guardar el cambio?`); });
qs("#confirmAction").addEventListener("click", () => {
  if (pendingAction === "discard") { pendingAction = null; closeConfirm(); return window.location.href = "index.html"; }
  if (pendingAction !== "save" || pendingActive === null) return;
  const result = updateAssignment(assignment.id, { active: pendingActive }); if (!result.ok) return showToast(result.error, "warning"); pendingActive = null; pendingAction = null; closeConfirm(); window.location.href = "index.html?result=updated";
});
document.querySelectorAll("[data-edit-cancel]").forEach((control) => control.addEventListener("click", (event) => { event.preventDefault(); requestCancel(); }));

render();
