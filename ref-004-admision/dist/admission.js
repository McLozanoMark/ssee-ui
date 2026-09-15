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
    if (draftStart && draftEnd) summary.textContent = `${formatDisplayDate(draftStart)} a ${formatDisplayDate(draftEnd)}`;
    else if (draftStart) summary.textContent = `${formatDisplayDate(draftStart)} a ...`;
    else summary.textContent = "Selecciona una fecha inicial y final";
  }

  function updateTrigger() {
    if (start.value && end.value) label.textContent = `${formatDisplayDate(start.value)} - ${formatDisplayDate(end.value)}`;
    else if (start.value) label.textContent = `Desde ${formatDisplayDate(start.value)}`;
    else if (end.value) label.textContent = `Hasta ${formatDisplayDate(end.value)}`;
    else label.textContent = "Seleccionar rango";
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
    if (!draftStart || (draftStart && draftEnd)) {
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
    end.value = draftEnd;
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

  updateTrigger();
  renderCalendar();
  validate();
  return { start, end, validate, reset, open };
}

function toDateInputValue(value) {
  const date = String(value || "").split(" ")[0];
  const [day, month, year] = date.split("/");
  return day && month && year ? `${year}-${month}-${day}` : "";
}


/* source: ref-004-admision/js/main.js */




const roles = ["Administrador USE", "Supervisor de Seguimiento", "Evaluador", "Registrador"];
const projects = ["Operativo 2026", "Evaluación 2026", "Seguimiento 2026"];
const admissionParams = new URLSearchParams(window.location.search);
const editMode = admissionParams.get("mode") === "edit";
const returnTarget = admissionParams.get("return");
const refs = {
  title: document.getElementById("admissionTitle"),
  form: document.getElementById("identityForm"),
  number: document.getElementById("documentNumber"),
  clear: document.getElementById("clearBtn"),
  consultButton: document.getElementById("consultButton"),
  result: document.getElementById("identityResult"),
  prompt: document.getElementById("identityPrompt"),
  paternal: document.getElementById("identityPaternal"),
  maternal: document.getElementById("identityMaternal"),
  givenNames: document.getElementById("identityGivenNames"),
  cardType: document.getElementById("identityCardType"),
  admit: document.getElementById("admitBtn"),
  saveTooltipHost: document.querySelector(".save-tooltip-host"),
  rolePicker: document.getElementById("rolePicker"),
  roleSearch: document.getElementById("roleSearch"),
  selectedRoles: document.getElementById("selectedRoles"),
  projectPicker: document.getElementById("projectPicker"),
  projectSearch: document.getElementById("projectSearch"),
  selectedProjects: document.getElementById("selectedProjects"),
  toast: document.getElementById("toast"),
  modeTabs: document.getElementById("admissionModeTabs"),
  individualAdmission: document.getElementById("individualAdmission"),
  individualStepper: document.getElementById("individualStepper"),
  massStepper: document.getElementById("massStepper"),
  massAdmission: document.getElementById("massAdmission"),
  massFile: document.getElementById("massFileInput"),
  massFileName: document.getElementById("massFileName"),
  validateMass: document.getElementById("validateMassBtn"),
  massSummary: document.getElementById("massValidationSummary"),
  massTitle: document.getElementById("massValidationTitle"),
  massText: document.getElementById("massValidationText"),
  massResults: document.getElementById("massResults"),
  massResultsBody: document.getElementById("massResultsBody"),
  massStageUpload: document.getElementById("massStageUpload"),
  massStageReview: document.getElementById("massStageReview"),
  massStepUpload: document.getElementById("massStepUpload"),
  massStepReview: document.getElementById("massStepReview"),
  downloadErrors: document.getElementById("downloadErrorsBtn"),
  saveMass: document.getElementById("saveMassBtn"),
  uploadAnother: document.getElementById("uploadAnotherBtn"),
  massHistorySection: document.getElementById("massHistorySection"),
  massHistoryForm: document.getElementById("massHistoryFilterForm"),
  massHistoryFilterToggle: document.getElementById("massHistoryFilterToggle"),
  massHistoryQuery: document.getElementById("massHistoryQuery"),
  massHistoryFile: document.getElementById("massHistoryFile"),
  massHistoryStatus: document.getElementById("massHistoryStatus"),
  massHistoryClear: document.getElementById("massHistoryClear"),
  massHistoryBody: document.getElementById("massHistoryBody"),
  validity: document.getElementById("validity"),
  validityHelp: document.getElementById("validityHelp"),
  editStatusField: document.getElementById("editStatusField"),
  editStatusToggle: document.getElementById("editStatusToggle"),
  identityStep: document.getElementById("identityStep"),
  accessStep: document.getElementById("accessStep"),
  stepIdentity: document.getElementById("stepIdentity"),
  stepAccess: document.getElementById("stepAccess"),
  backButton: document.getElementById("backBtn"),
  continueButton: document.getElementById("continueBtn"),
};
const sharedMassHistory = document.getElementById("massHistorySection");
if (sharedMassHistory) document.getElementById("admissionView")?.append(sharedMassHistory);
let consulted = false;
let massReady = false;
let consultTimer = null;
let editTarget = null;
const massHistoryRange = createDateRangeFilter(document.querySelector("#massHistoryDate"));
const defaultMassHistory = [
  { file: "admission_inicial.xlsx", date: "2026-09-05", time: "10:24", status: "Completada", processed: 125, accepted: 125, observed: 0 },
  { file: "usuarios_agosto.csv", date: "2026-08-28", time: "16:18", status: "Con observaciones", processed: 240, accepted: 232, observed: 8 },
  { file: "usuarios_julio.xlsx", date: "2026-07-15", time: "09:42", status: "Completada", processed: 86, accepted: 86, observed: 0 },
];
const massHistoryStorageKey = "ssee-mass-history:ref-004-admision";
let massHistory = (() => {
  try {
    const stored = JSON.parse(localStorage.getItem(massHistoryStorageKey) || "null");
    return Array.isArray(stored) ? stored : [...defaultMassHistory];
  } catch {
    return [...defaultMassHistory];
  }
})();

function setAdmissionMode(mode = "individual") {
  const isMass = mode === "mass";
  refs.modeTabs.querySelectorAll("[data-admission-mode]").forEach((tab) => {
    const selected = tab.dataset.admissionMode === mode;
    tab.classList.toggle("is-selected", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  refs.individualStepper.hidden = isMass;
  refs.massStepper.hidden = !isMass;
  refs.individualAdmission.hidden = isMass;
  refs.massAdmission.hidden = !isMass;
  document.body.dataset.admissionMode = mode;
}

function validitySummary(value) {
  if (!value) return "Selecciona la fecha de vencimiento del acceso.";
  const expiry = new Date(`${value}T00:00:00`);
  return `El acceso vencerá el ${expiry.toLocaleDateString("es-PE")}. Al vencer, el acceso quedará inactivo.`;
}

function updateValidityHelp() {
  refs.validityHelp.textContent = validitySummary(refs.validity.value);
}

function toast(message, type = "info") {
  renderToast(refs.toast, message, type);
}

function setAdmissionStep(step) {
  const identityStep = step === "identity";
  refs.identityStep.classList.toggle("is-active", identityStep);
  refs.accessStep.classList.toggle("is-active", !identityStep);
  refs.stepIdentity.classList.toggle("is-current", identityStep);
  refs.stepAccess.classList.toggle("is-current", !identityStep);
  refs.stepIdentity.classList.toggle("is-complete", !identityStep);
  refs.backButton.hidden = identityStep;
  refs.continueButton.hidden = !identityStep;
  refs.admit.hidden = identityStep;
  refs.saveTooltipHost.hidden = identityStep;
  if (!identityStep) updateAdmit();
}

function requestAdmissionStep(step) {
  if (step === "access" && !consulted) {
    toast(getMessage("M12"), "warning");
    return;
  }
  setAdmissionStep(step);
}

function renderAssignmentPicker(picker, values, optionClass = "") {
  picker.innerHTML = values.map((value) => `<label class="role-option ${optionClass}"><span class="role-avatar">${value.charAt(0)}</span><span class="role-option-name">${value}</span><input type="checkbox" value="${value}"></label>`).join("");
}

function filterAssignmentOptions(input, picker) {
  const query = input.value.trim().toLowerCase();
  picker.querySelectorAll(".role-option").forEach((option) => {
    option.hidden = query && !option.textContent.toLowerCase().includes(query);
  });
}

function updateAssignmentTags(picker, selectedContainer) {
  const selected = [...picker.querySelectorAll("input:checked")].map((input) => input.value);
  const visible = selected.slice(0, 2);
  const hiddenCount = selected.length - visible.length;
  selectedContainer.innerHTML = visible.map((value) => `
    <span class="assignment-tag"><span>${value}</span><button type="button" class="selection-remove" data-remove-assignment data-picker="${picker.id}" data-value="${value}" aria-label="Quitar ${value}" title="Quitar"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></span>`).join("") + (hiddenCount > 0 ? `<span class="assignment-tag assignment-count">+${hiddenCount}</span>` : "");
  selectedContainer.hidden = selected.length === 0;
}

function removeAssignment(event) {
  const removeButton = event.target.closest("[data-remove-assignment]");
  if (!removeButton) return;
  const picker = document.getElementById(removeButton.dataset.picker);
  const input = [...picker.querySelectorAll("input")].find((item) => item.value === removeButton.dataset.value);
  if (!input) return;
  input.checked = false;
  updateAssignmentTags(picker, picker.id === "rolePicker" ? refs.selectedRoles : refs.selectedProjects);
}

function updateAdmit() {
  const disabled = !consulted
    || !document.querySelector("#rolePicker input:checked")
    || !document.querySelector("#projectPicker input:checked");
  refs.admit.disabled = disabled;
  if (!refs.saveTooltipHost || !window.bootstrap) return;
  const message = "Selecciona al menos un proyecto y un rol para habilitar el acceso.";
  const tooltip = bootstrap.Tooltip.getOrCreateInstance(refs.saveTooltipHost);
  if (disabled) {
    refs.saveTooltipHost.setAttribute("title", message);
    refs.saveTooltipHost.setAttribute("data-bs-title", message);
    refs.saveTooltipHost.setAttribute("data-bs-toggle", "tooltip");
    tooltip.enable();
  } else {
    tooltip.hide();
    tooltip.disable();
    refs.saveTooltipHost.removeAttribute("title");
    refs.saveTooltipHost.removeAttribute("data-bs-title");
    refs.saveTooltipHost.removeAttribute("data-bs-toggle");
  }
}

function resetIdentityLookup() {
  if (consultTimer) window.clearTimeout(consultTimer);
  refs.number.value = "";
  refs.clear.hidden = true;
  refs.paternal.textContent = "";
  refs.maternal.textContent = "";
  refs.givenNames.textContent = "";
  document.getElementById("identityBirth").textContent = "";
  refs.prompt.hidden = false;
  refs.result.hidden = true;
  refs.consultButton.disabled = false;
  refs.consultButton.removeAttribute("aria-busy");
  refs.consultButton.innerHTML = '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>Consultar';
  consulted = false;
  updateAdmit();
}

function resetForm() {
  refs.form.reset();
  document.querySelectorAll("#projectPicker input, #rolePicker input").forEach((input) => {
    input.checked = false;
  });
  updateAssignmentTags(refs.rolePicker, refs.selectedRoles);
  updateAssignmentTags(refs.projectPicker, refs.selectedProjects);
  document.getElementById("email").value = "";
  document.getElementById("siteType").selectedIndex = 0;
  document.getElementById("site").selectedIndex = 0;
  document.getElementById("validity").value = "";
  resetIdentityLookup();
  updateValidityHelp();
  resetMass();
  setAdmissionStep("identity");
}

function confirmAdmission(mode = "individual") {
  const isMass = mode === "mass";
  const requiresReason = editMode && editTarget && editTarget.status === "Activo" && !refs.editStatusToggle.checked;
  const modal = document.createElement("div");
  modal.className = "modal fade";
  const reasonField = requiresReason ? '<label class="confirm-reason-field" for="editInactivationReason"><span>Motivo de inactivación *</span><textarea class="form-control" id="editInactivationReason" rows="3" maxlength="240" required></textarea><small class="field-error" id="editInactivationReasonError" hidden>Debe completar los campos obligatorios.</small></label>' : "";
  modal.innerHTML = `<div class="modal-dialog modal-dialog-centered modal-sm"><div class="modal-content admission-modal"><div class="modal-header"><span class="modal-title-icon" aria-hidden="true"><i class="fa-solid fa-circle-question"></i></span><h2 class="modal-title">Confirmar acción</h2><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><p>${getMessage("M1")}</p>${reasonField}</div><div class="modal-footer"><button type="button" class="btn btn-outline-ssee button button-secondary" data-bs-dismiss="modal">No</button><button type="button" class="btn btn-ssee button button-primary" data-confirm="${isMass ? "mass-admission" : "admission"}">Sí</button></div></div></div>`;
  document.body.append(modal);
  const instance = new bootstrap.Modal(modal);
  modal.addEventListener("click", (event) => {
    if (event.target.closest(`[data-confirm='${isMass ? "mass-admission" : "admission"}']`)) {
      const reason = modal.querySelector("#editInactivationReason");
      if (reason && !reason.value.trim()) {
        modal.querySelector("#editInactivationReasonError").hidden = false;
        reason.focus();
        return;
      }
      instance.hide();
      const returnTarget = new URLSearchParams(window.location.search).get("return");
      if (isMass) recordMassHistory();
      if (!isMass) {
        if (returnTarget) {
          if (editMode) persistEditedUser(reason?.value.trim() || "");
          else persistAdmissionUser();
        } else if (!editMode) {
          persistAdmissionUser();
        }
      }
      if (returnTarget === "ref-007-users" || returnTarget === "ref-003-passport") {
        const result = editMode ? "updated=1" : isMass ? "mass=1" : "admitted=1";
        window.setTimeout(() => { window.location.href = `../${returnTarget}/index.html?${result}`; }, 350);
      } else if (returnTarget === "ref-004-admision") {
        const result = editMode ? "updated=1" : isMass ? "mass=1" : "admitted=1";
        window.setTimeout(() => { window.location.href = `index.html?${result}`; }, 350);
      } else if (!isMass && !editMode) {
        window.setTimeout(() => { window.location.href = "index.html?admitted=1"; }, 350);
      } else if (isMass && !editMode) {
        window.setTimeout(() => { window.location.href = "index.html?mass=1"; }, 350);
      } else {
        toast(getMessage(isMass ? "M52" : "M2"), "success");
      }
    }
  });
  modal.addEventListener("hidden.bs.modal", () => modal.remove());
  instance.show();
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
  downloadTextFile("plantilla-admision-usuarios.csv", "Tipo de documento,Número de documento,Correo electrónico,Tipo de sede,Sede,Vigencia,Proyecto,Rol\nDNI,00000000,usuario@ejemplo.gob.pe,DRE,Unidad de Seguimiento y Evaluación,2026-12-31,Operativo 2026,Registrador\n");
  toast(getMessage("M58"), "success");
}

function downloadErrors() {
  downloadTextFile("observaciones-admision.csv", "Fila,Campo,Observación\n3,Número de documento,El documento no pudo validarse\n");
  toast(getMessage("M58"), "success");
}

function formatHistoryDate(value) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function renderMassHistory(rows = massHistory) {
  if (!rows.length) {
    refs.massHistoryBody.innerHTML = '<tr><td class="mass-history-empty" colspan="8">No se encontraron cargas con esos criterios.</td></tr>';
    return;
  }

  refs.massHistoryBody.innerHTML = rows.map((row, index) => {
    const statusClass = row.status === "Completada" ? "is-active" : "is-warning";
    const observationAction = row.observed > 0
      ? '<button class="row-action" type="button" data-action="download" data-history-action="download" title="Descargar observaciones"><i class="fa-solid fa-download" aria-hidden="true"></i><span>Descargar</span></button>'
      : "";
    return `<tr data-history-date="${row.date}" data-history-file="${row.file.toLowerCase()}" data-history-status="${row.status.toLowerCase()}">
      <td>${index + 1}</td>
      <td title="${row.file}">${row.file}</td>
      <td>${formatHistoryDate(row.date)} ${row.time}</td>
      <td><span class="ssee-status ${statusClass}">${row.status}</span></td>
      <td>${row.processed.toLocaleString("es-PE")}</td>
      <td>${row.accepted.toLocaleString("es-PE")}</td>
      <td>${row.observed.toLocaleString("es-PE")}</td>
      <td><div class="row-actions">
        <button class="row-action" type="button" data-action="view" data-history-action="detail" title="Ver detalle"><i class="fa-solid fa-eye" aria-hidden="true"></i><span>Ver detalle</span></button>
        ${observationAction}
      </div></td>
    </tr>`;
  }).join("");
}

function filterMassHistory() {
  const query = refs.massHistoryQuery.value.trim().toLowerCase();
  const file = refs.massHistoryFile.value.trim().toLowerCase();
  const status = refs.massHistoryStatus.value;
  const start = massHistoryRange?.start.value || "";
  const end = massHistoryRange?.end.value || "";
  const filtered = massHistory.filter((row) => {
    const matchesQuery = !query || `${row.file} ${row.status}`.toLowerCase().includes(query);
    const matchesFile = !file || row.file.toLowerCase().includes(file);
    const matchesStatus = status === "Todos" || row.status === status;
    const matchesStart = !start || row.date >= start;
    const matchesEnd = !end || row.date <= end;
    return matchesQuery && matchesFile && matchesStatus && matchesStart && matchesEnd;
  });
  renderMassHistory(filtered);
}

function downloadHistoryObservations(row) {
  downloadTextFile(`observaciones-${row.file.replace(/\.[^.]+$/, "")}.csv`, "Fila,Campo,Observación\n3,Número de documento,El documento no pudo validarse\n");
  toast(getMessage("M58"), "success");
}

function recordMassHistory() {
  const file = refs.massFile.files[0];
  if (!file) return;
  const validation = refs.massTitle.textContent.toLowerCase().includes("observaciones")
    ? { status: "Con observaciones", processed: 4, accepted: 3, observed: 1 }
    : { status: "Completada", processed: 4, accepted: 4, observed: 0 };
  const now = new Date();
  const row = {
    file: file.name,
    date: now.toISOString().slice(0, 10),
    time: now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", hour12: false }),
    ...validation,
  };
  massHistory = [row, ...massHistory.filter((item) => item.file !== row.file)];
  try { localStorage.setItem(massHistoryStorageKey, JSON.stringify(massHistory)); } catch { /* El historial base sigue disponible en la demo. */ }
}

function formatAdmissionDate(value) {
  if (!value) return "-";
  return new Date(`${value}T00:00:00`).toLocaleDateString("es-PE");
}

function dateInputValue(value) {
  if (!value || value === "-") return "";
  const [day, month, year] = value.split("/");
  return year && month && day ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}` : "";
}

function readStoredUser() {
  try {
    const stored = sessionStorage.getItem("ssee-editing-user");
    if (stored) sessionStorage.removeItem("ssee-editing-user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function userIdentityParts(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 4) {
    return { givenNames: parts.slice(0, -2).join(" "), paternal: parts.at(-2), maternal: parts.at(-1) };
  }
  return { givenNames: parts[0] || "", paternal: parts.slice(1).join(" "), maternal: "" };
}

function setupEditMode() {
  if (!editMode) return;
  editTarget = readStoredUser();
  if (!editTarget) return;

  document.title = "SSEE - Editar usuario";
  refs.title.textContent = "Editar usuario";
  refs.modeTabs.hidden = true;
  refs.massAdmission.hidden = true;
  refs.editStatusField.hidden = false;
  refs.editStatusToggle.checked = editTarget.status === "Activo";

  const documentType = document.getElementById("documentType");
  documentType.value = editTarget.auth === "Documento" ? "DNI" : documentType.value;
  documentType.disabled = true;
  refs.number.value = editTarget.documentNumber || "";
  refs.number.readOnly = true;
  refs.clear.hidden = true;
  refs.consultButton.hidden = true;
  document.getElementById("authenticationType").value = editTarget.auth || "Documento";

  const identity = userIdentityParts(editTarget.name);
  refs.paternal.textContent = identity.paternal;
  refs.maternal.textContent = identity.maternal;
  refs.givenNames.textContent = identity.givenNames;
  document.getElementById("identityBirth").textContent = editTarget.birthDate || "-";
  refs.cardType.textContent = documentType.value;
  refs.prompt.hidden = true;
  refs.result.hidden = false;
  consulted = true;

  document.getElementById("email").value = editTarget.email || "";
  document.getElementById("email").readOnly = true;
  document.getElementById("siteType").value = editTarget.siteType || "DRE";
  document.getElementById("site").value = editTarget.site || document.getElementById("site").value;
  refs.validity.value = dateInputValue(editTarget.expires);
  [...refs.rolePicker.querySelectorAll("input")].forEach((input) => { input.checked = (editTarget.roles || []).includes(input.value); });
  [...refs.projectPicker.querySelectorAll("input")].forEach((input) => { input.checked = (editTarget.projects || []).includes(input.value); });
  updateAssignmentTags(refs.rolePicker, refs.selectedRoles);
  updateAssignmentTags(refs.projectPicker, refs.selectedProjects);
  updateValidityHelp();
}

function createAdmissionUser() {
  const givenNames = refs.givenNames.textContent.trim() || "Ana María";
  const paternal = refs.paternal.textContent.trim() || "Paredes";
  const maternal = refs.maternal.textContent.trim() || "García";
  const roles = [...refs.rolePicker.querySelectorAll("input:checked")].map((input) => input.value);
  const projects = [...refs.projectPicker.querySelectorAll("input:checked")].map((input) => input.value);
  const newUser = {
    username: `${givenNames.charAt(0).toLowerCase()}${paternal.toLowerCase().replace(/[^a-záéíóúñ]/gi, "")}`,
    name: editMode && editTarget ? editTarget.name : `${givenNames} ${paternal} ${maternal}`,
    email: document.getElementById("email").value.trim() || "usuario@ejemplo.gob.pe",
    auth: document.getElementById("authenticationType").value,
    documentNumber: refs.number.value.trim(),
    birthDate: document.getElementById("identityBirth").textContent.trim(),
    siteType: document.getElementById("siteType").value,
    site: document.getElementById("site").value,
    roles,
    projects,
    status: editMode && editTarget ? (refs.editStatusToggle.checked ? "Activo" : "Inactivo") : "Activo",
    expiresSoon: false,
    lastAccess: "-",
    created: new Date().toLocaleDateString("es-PE"),
    expires: formatAdmissionDate(document.getElementById("validity").value),
  };
  return editMode && editTarget ? { ...editTarget, ...newUser, username: editTarget.username } : newUser;
}

function persistAdmissionUser() {
  try {
    const serializedUser = JSON.stringify(createAdmissionUser());
    const target = ["ref-007-users", "ref-003-passport", "ref-004-admision"].includes(returnTarget) ? returnTarget : "ref-004-admision";
    const key = `ssee-pending-admission-user:${target}`;
    sessionStorage.setItem(key, serializedUser);
    localStorage.setItem(key, serializedUser);
  } catch {
    // The demo can still complete its flow when session storage is unavailable.
  }
}

function persistEditedUser(reason = "") {
  try {
    const updatedUser = createAdmissionUser();
    if (reason) updatedUser.inactivationReason = reason;
    sessionStorage.setItem("ssee-pending-user-update", JSON.stringify(updatedUser));
  } catch {
    // The demo can still complete its flow when session storage is unavailable.
  }
}

function returnToUserTray(result = "") {
  const suffix = result ? `?${result}` : "";
  if (returnTarget === "ref-004-admision") {
    window.location.href = `index.html${suffix}`;
  } else if (returnTarget === "ref-007-users" || returnTarget === "ref-003-passport") {
    window.location.href = `../${returnTarget}/index.html${suffix}`;
  } else {
    window.location.href = `index.html${suffix}`;
  }
}

function resetMass() {
  refs.massFile.value = "";
  refs.massFileName.textContent = "Ningún archivo seleccionado";
  refs.massSummary.hidden = true;
  refs.massResults.hidden = true;
  refs.massResultsBody.innerHTML = "";
  refs.downloadErrors.hidden = true;
  refs.validateMass.disabled = true;
  refs.saveMass.disabled = true;
  massReady = false;
  setMassStage("upload");
}

function setMassStage(stage) {
  const review = stage === "review";
  refs.massStageUpload.hidden = review;
  refs.massStageReview.hidden = !review;
  refs.uploadAnother.hidden = !review;
  refs.saveMass.hidden = !review;
  refs.massStepUpload.classList.toggle("is-current", !review);
  refs.massStepUpload.classList.toggle("is-complete", review);
  refs.massStepReview.classList.toggle("is-current", review);
}

function renderMassResults(hasObservations) {
  if (!refs.massResults || !refs.massResultsBody) return;
  const rows = hasObservations
    ? [
      ["1", "00000001", "Ana María Paredes García", "Aceptado", ""],
      ["2", "00000002", "Luis Alberto Rojas Díaz", "Aceptado", ""],
      ["3", "00000003", "María Elena Torres Ruiz", "Aceptado", ""],
      ["4", "00000004", "Carlos José Vega Soto", "Observado", "El documento no pudo validarse."],
    ]
    : [
      ["1", "00000001", "Ana María Paredes García", "Aceptado", ""],
      ["2", "00000002", "Luis Alberto Rojas Díaz", "Aceptado", ""],
      ["3", "00000003", "María Elena Torres Ruiz", "Aceptado", ""],
      ["4", "00000004", "Carlos José Vega Soto", "Aceptado", ""],
    ];
  refs.massResultsBody.innerHTML = rows.map(([number, documentNumber, name, status, observation]) => {
    const statusClass = status === "Aceptado" ? "is-active" : "is-warning";
    return `<tr><td>${number}</td><td>${documentNumber}</td><td>${name}</td><td><span class="ssee-status ${statusClass}">${status}</span></td><td>${observation || "-"}</td></tr>`;
  }).join("");
  refs.massResults.hidden = true;
}

function validateMassFile() {
  const file = refs.massFile.files[0];
  if (!file) return;
  refs.massFileName.textContent = file.name;
  refs.validateMass.disabled = false;
  refs.massSummary.hidden = true;
  refs.massResults.hidden = true;
  refs.downloadErrors.hidden = true;
  refs.saveMass.disabled = true;
  massReady = false;
}

function runMassValidation() {
  const file = refs.massFile.files[0];
  if (!file) return;
  const hasObservations = /error|observad|rechaz/i.test(file.name);
  setMassStage("review");
  if (file.size > 10 * 1024 * 1024) {
    showMassValidation(getMessage("M12"), "El archivo supera el tamaño máximo permitido de 10 MB.", "error");
    return;
  }
  renderMassResults(hasObservations);
  if (hasObservations) {
    refs.downloadErrors.hidden = false;
    showMassValidation(getMessage("M51"), "800 usuarios creados correctamente y 200 registros rechazados por errores.", "warning", true);
    recordMassHistory(true);
    renderMassHistory();
    toast(getMessage("M56"), "warning");
    return;
  }
  showMassValidation(getMessage("M52"), "800 usuarios creados correctamente y registrados automáticamente.", "success", true);
  recordMassHistory(false);
  renderMassHistory();
  toast(getMessage("M53", [4, 4, 0, 0, 0]), "success");
}

refs.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (refs.number.value.trim().length < 8) {
    toast(getMessage("M12"), "warning");
    return;
  }
  refs.consultButton.disabled = true;
  refs.consultButton.setAttribute("aria-busy", "true");
  refs.consultButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>Consultando...';
  refs.prompt.hidden = true;
  consultTimer = window.setTimeout(() => {
    consulted = true;
    refs.paternal.textContent = "Paredes";
    refs.maternal.textContent = "García";
    refs.givenNames.textContent = "Ana María";
    refs.cardType.textContent = document.getElementById("documentType").value;
    document.getElementById("identityBirth").textContent = "15/04/1988";
    refs.result.hidden = false;
    refs.consultButton.disabled = false;
    refs.consultButton.removeAttribute("aria-busy");
    refs.consultButton.innerHTML = '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>Consultar';
    consultTimer = null;
    updateAdmit();
  }, 550);
});

refs.number.addEventListener("input", () => {
  refs.clear.hidden = !refs.number.value;
});
document.addEventListener("input", updateAdmit);
refs.roleSearch.addEventListener("input", () => filterAssignmentOptions(refs.roleSearch, refs.rolePicker));
refs.projectSearch.addEventListener("input", () => filterAssignmentOptions(refs.projectSearch, refs.projectPicker));
refs.rolePicker.addEventListener("change", () => { updateAssignmentTags(refs.rolePicker, refs.selectedRoles); updateAdmit(); });
refs.projectPicker.addEventListener("change", () => { updateAssignmentTags(refs.projectPicker, refs.selectedProjects); updateAdmit(); });
refs.selectedRoles.addEventListener("click", removeAssignment);
refs.selectedProjects.addEventListener("click", removeAssignment);
refs.modeTabs.querySelectorAll("[data-admission-mode]").forEach((tab) => {
  tab.addEventListener("click", () => {
    if (editMode) return;
    setAdmissionMode(tab.dataset.admissionMode);
  });
});
refs.admit.addEventListener("click", confirmAdmission);
refs.stepIdentity.addEventListener("click", () => requestAdmissionStep("identity"));
refs.stepAccess.addEventListener("click", () => requestAdmissionStep("access"));
refs.continueButton.addEventListener("click", () => requestAdmissionStep("access"));
refs.backButton.addEventListener("click", () => requestAdmissionStep("identity"));
document.getElementById("clearBtn").addEventListener("click", resetIdentityLookup);
document.getElementById("cancelBtn").addEventListener("click", () => editMode ? returnToUserTray() : resetForm());
refs.validity.addEventListener("change", updateValidityHelp);
document.getElementById("cancelMassBtn").addEventListener("click", () => {
  resetMass();
  setAdmissionMode("individual");
});
refs.massFile.addEventListener("change", validateMassFile);
refs.validateMass.addEventListener("click", runMassValidation);
document.getElementById("downloadTemplateBtn").addEventListener("click", downloadTemplate);
refs.downloadErrors.addEventListener("click", downloadErrors);
refs.saveMass.addEventListener("click", () => { if (massReady) returnToUserTray("mass=1"); });
refs.uploadAnother.addEventListener("click", resetMass);
refs.massHistoryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (massHistoryRange && !massHistoryRange.validate()) {
    toast(getMessage("M12"), "warning");
    return;
  }
  filterMassHistory();
  toast(getPrototypeMessage("filtersApplied"), "info");
});
refs.massHistoryFilterToggle.addEventListener("click", () => {
  const expanded = refs.massHistoryForm.classList.toggle("is-expanded");
  refs.massHistoryFilterToggle.setAttribute("aria-expanded", String(expanded));
  refs.massHistoryFilterToggle.setAttribute("aria-label", expanded ? "Cerrar filtros" : "Abrir filtros");
});
refs.massHistoryClear.addEventListener("click", () => {
  refs.massHistoryQuery.value = "";
  refs.massHistoryFile.value = "";
  refs.massHistoryStatus.value = "Todos";
  massHistoryRange?.reset();
  renderMassHistory();
  toast(getPrototypeMessage("filtersCleared"), "info");
});
refs.massHistoryBody.addEventListener("click", (event) => {
  const action = event.target.closest("[data-history-action]");
  if (!action) return;
  const rowElement = action.closest("tr");
  const row = massHistory.find((item) => item.file.toLowerCase() === rowElement?.dataset.historyFile);
  if (!row) return;
  if (action.dataset.historyAction === "download") downloadHistoryObservations(row);
  if (action.dataset.historyAction === "detail") toast(`${row.file}: ${row.status}. ${row.processed.toLocaleString("es-PE")} registros procesados.`, "info");
});
resetIdentityLookup();
renderAssignmentPicker(refs.rolePicker, roles);
renderAssignmentPicker(refs.projectPicker, projects, "project-option");
updateAssignmentTags(refs.rolePicker, refs.selectedRoles);
updateAssignmentTags(refs.projectPicker, refs.selectedProjects);
renderMassHistory();
setupEditMode();
updateValidityHelp();
setAdmissionMode("individual");
setAdmissionStep("identity");
enableTooltips();
