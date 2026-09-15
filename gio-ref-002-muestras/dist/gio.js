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


/* source: gio-ref-002-muestras/js/data.js */
const institutionFields = ["ID_PERSONA", "NOMBRE_COMPLETO", "FECHA_NACIMIENTO", "SEXO", "DEPARTAMENTO", "PROVINCIA", "DISTRITO", "DIRECCION", "TELEFONO", "CORREO", "COD_USUARIO", "ESTADO"];

const sourceCatalog = [
  { name: "Nexus", population: 12450, fields: institutionFields },
  { name: "Escale", population: 9820, fields: institutionFields },
  { name: "Directores registrados", population: 3180, fields: ["ID_PERSONA", "NOMBRE_COMPLETO", "FECHA_NACIMIENTO", "DNI", "REGION", "DISTRITO", "CORREO", "COD_USUARIO"] },
  { name: "Padrón RER", population: 620, fields: ["ID_UNIDAD", "ID_PERSONA", "NOMBRE_COMPLETO", "REGION", "DISTRITO", "FECHA_NACIMIENTO", "COD_USUARIO"] },
  { name: "Instituciones educativas", population: 12450, fields: institutionFields },
  { name: "Operativo piloto", population: 620, fields: ["ID_UNIDAD", "ID_PERSONA", "NOMBRE_COMPLETO", "REGION", "DISTRITO", "FECHA_NACIMIENTO", "COD_USUARIO"] },
  { name: "Instituciones 2025", population: 11890, fields: institutionFields }
];

const sampleUnitCatalog = [
  { id: "UM-0001", personId: "P000987654", name: "María López Pérez", region: "Lima", district: "San Juan de Lurigancho", birthDate: "12/05/1985" },
  { id: "UM-0002", personId: "P000987655", name: "Juan Carlos Ramírez", region: "Arequipa", district: "Cerro Colorado", birthDate: "23/11/1990" },
  { id: "UM-0003", personId: "P000987656", name: "Ana Lucía Torres", region: "Piura", district: "Castilla", birthDate: "07/03/1978" },
  { id: "UM-0004", personId: "P000987657", name: "Pedro Miguel Silva", region: "Cusco", district: "Santiago", birthDate: "19/08/1992" },
  { id: "UM-0005", personId: "P000987658", name: "Rosa Elena Vargas", region: "La Libertad", district: "Trujillo", birthDate: "30/01/1983" },
  { id: "UM-0006", personId: "P000987659", name: "Luis Alberto Pérez", region: "Lima", district: "Ate", birthDate: "15/02/1987" },
  { id: "UM-0007", personId: "P000987660", name: "Carla Medina Rojas", region: "Callao", district: "Callao", birthDate: "03/11/1988" },
  { id: "UM-0008", personId: "P000987661", name: "Diego Flores Quispe", region: "Junín", district: "Huancayo", birthDate: "26/06/1981" },
  { id: "UM-0009", personId: "P000987662", name: "Elena Salazar Díaz", region: "Lambayeque", district: "Chiclayo", birthDate: "18/09/1986" },
  { id: "UM-0010", personId: "P000987663", name: "Jorge Castillo León", region: "Ayacucho", district: "Huamanga", birthDate: "08/12/1979" },
  { id: "UM-0011", personId: "P000987664", name: "Sofía Campos Ruiz", region: "Lima", district: "Comas", birthDate: "22/08/1990" },
  { id: "UM-0012", personId: "P000987665", name: "Andrés Navarro Soto", region: "Tacna", district: "Tacna", birthDate: "14/04/1984" }
];

const samples = [
  { id: "MST-001", name: "Muestra nacional 2026", description: "Muestra principal para seguimiento institucional.", intervention: "Seguimiento", period: "2026", source: "Instituciones educativas", units: "1,250", sampleSize: "100", population: "1250", selectionMethod: "Aleatoria", fields: [{ name: "Código modular", unique: true, preload: true }, { name: "Nombre de la institución", unique: false, preload: true }, { name: "DRE", unique: false, preload: false }], unitList: [{ id: "IE-0001", name: "I.E. 0001 José de la Riva", status: "Seleccionada" }, { id: "IE-0042", name: "I.E. 0042 San Martín", status: "Seleccionada" }], instruments: ["Instrumento de seguimiento"], status: "Activo", updated: "18/08/2026 09:00" },
  { id: "MST-002", name: "Muestra de directores", description: "Unidades seleccionadas para evaluación de directores.", intervention: "Evaluación", period: "2026", source: "Directores registrados", units: "420", sampleSize: "60", population: "420", selectionMethod: "Sistemática", fields: [{ name: "DNI", unique: true, preload: true }, { name: "Nombre completo", unique: false, preload: true }], unitList: [{ id: "DIR-001", name: "Director registrado 001", status: "Seleccionada" }], instruments: ["Ficha de evaluación"], status: "Activo", updated: "17/08/2026 16:45" },
  { id: "MST-003", name: "Piloto operativo", description: "Configuración sintética para validar reglas de selección.", intervention: "Operativo", period: "2026", source: "Operativo piloto", units: "80", sampleSize: "20", population: "80", selectionMethod: "Total", fields: [{ name: "Código de unidad", unique: true, preload: false }], unitList: [{ id: "OP-001", name: "Unidad piloto 001", status: "Seleccionada" }], instruments: ["Lista de verificación"], status: "Activo", updated: "16/08/2026 11:20" },
  { id: "MST-004", name: "Muestra histórica 2025", description: "Muestra del periodo anterior conservada para consulta.", intervention: "Seguimiento", period: "2025", source: "Instituciones 2025", units: "980", sampleSize: "80", population: "980", selectionMethod: "Aleatoria", fields: [{ name: "Código modular", unique: true, preload: true }], unitList: [], instruments: ["Instrumento de seguimiento"], status: "Inactivo", updated: "12/08/2026 10:05" },
  { id: "MST-005", name: "Muestra de cobertura", description: "Muestra de cobertura para evaluación institucional.", intervention: "Evaluación", period: "2025", source: "Directores registrados", units: "0", sampleSize: "10", population: "0", selectionMethod: "Aleatoria", fields: [{ name: "DNI", unique: true, preload: true }], unitList: [], instruments: ["Ficha de evaluación"], status: "Inactivo", updated: "08/08/2026 14:05" }
];


/* source: gio-ref-002-muestras/js/state.js */


const defaultFields = [
  { name: "Código modular", unique: true, preload: true, informant: false, user: true },
  { name: "Nombre de la institución", unique: false, preload: true, informant: true, user: false },
  { name: "DRE", unique: false, preload: false, informant: false, user: false }
];

const state = { filteredSamples: [...samples], editingIndex: null, openMenu: null, step: 1, dirty: false, pendingAction: null, pendingStatus: null, pendingCancel: false, pendingWizardStep: null, pendingUnitAction: null, replacementSelection: null, replacementCandidate: null, draft: null };

function getSourceConfig(name) {
  return sourceCatalog.find((source) => source.name === name) || null;
}

function createDraft(sample = null) {
  state.draft = {
    id: sample?.id || null,
    name: sample?.name || "",
    description: sample?.description || "",
    source: sample?.source || "",
    sampleSize: sample?.sampleSize || "",
    population: sample?.population || "0",
    unitTotal: sample?.unitTotal || sample?.sampleSize || "0",
    selectionMethod: sample?.selectionMethod || "Aleatoria",
    fields: sample?.fields?.length ? sample.fields.map((field, index) => ({ informant: false, user: index === 0, ...field })) : defaultFields.map((field) => ({ ...field })),
    units: sample?.unitList?.length ? sample.unitList.map((unit) => ({ ...unit })) : [],
    instruments: sample?.instruments?.length ? [...sample.instruments] : [],
    status: sample?.status || "Activo"
  };
  state.step = 1;
  state.dirty = false;
}

function resetWizard() { state.editingIndex = null; state.openMenu = null; state.step = 1; state.dirty = false; state.pendingAction = null; state.pendingStatus = null; state.pendingCancel = false; state.pendingWizardStep = null; state.pendingUnitAction = null; state.replacementSelection = null; state.replacementCandidate = null; state.draft = null; }


/* source: gio-ref-002-muestras/js/ui.js */



const refs = {
  listView: document.getElementById("listView"), formView: document.getElementById("formView"), filterForm: document.getElementById("filterForm"), sampleForm: document.getElementById("sampleForm"), samplesBody: document.getElementById("samplesBody"), emptyState: document.getElementById("emptyState"), pageSummary: document.getElementById("pageSummary"), sampleCount: document.getElementById("sampleCount"), toast: document.getElementById("toast"), filterQuery: document.getElementById("filterQuery"), filterStatus: document.getElementById("filterStatus"), filterSource: document.getElementById("filterSource"), sampleName: document.getElementById("sampleName"), sampleDescription: document.getElementById("sampleDescription"), sampleSource: document.getElementById("sampleSource"), sampleSize: document.getElementById("sampleSize"), populationCount: document.getElementById("populationCount"), populationHint: document.getElementById("populationHint"), methodPopulation: document.getElementById("methodPopulation"), selectionMethod: document.getElementById("selectionMethod"), selectionInterval: document.getElementById("selectionInterval"), methodMessage: document.getElementById("methodMessage"), nameError: document.getElementById("nameError"), descriptionError: document.getElementById("descriptionError"), sourceError: document.getElementById("sourceError"), sizeError: document.getElementById("sizeError"), availableFields: document.getElementById("availableFields"), fieldSearch: document.getElementById("fieldSearch"), fieldsBody: document.getElementById("fieldsBody"), fieldsCount: document.getElementById("fieldsCount"), structureSummary: document.getElementById("structureSummary"), unitsBody: document.getElementById("unitsBody"), unitsCount: document.getElementById("unitsCount"), unitsSummary: document.getElementById("unitsSummary"), unitSearch: document.getElementById("unitSearch"), instrumentOptions: [...document.querySelectorAll("[data-instrument]")], formTitle: document.getElementById("formTitle"), formBreadcrumb: document.getElementById("formBreadcrumb"), editStatusControl: document.getElementById("editStatusControl"), sampleStatusSwitch: document.getElementById("sampleStatusSwitch"), wizardSteps: [...document.querySelectorAll("[data-wizard-step]")], wizardPanels: [...document.querySelectorAll("[data-wizard-panel]")], confirmModal: document.getElementById("confirmModal"), detailModal: document.getElementById("detailModal"), detailContent: document.getElementById("detailContent"), replacementModal: document.getElementById("replacementModal"), replacementCurrent: document.getElementById("replacementCurrent"), replacementBody: document.getElementById("replacementBody"), replacementSearch: document.getElementById("replacementSearch"), replacementSave: document.getElementById("replacementSave")
};

function showToast(message, type = "info") { renderToast(refs.toast, message, type); }
function showList() { refs.listView.classList.add("is-active"); refs.formView.classList.remove("is-active"); }
function showForm(sample = null) { refs.listView.classList.remove("is-active"); refs.formView.classList.add("is-active"); refs.formTitle.textContent = sample ? "Editar" : "Registrar"; refs.formBreadcrumb.innerHTML = `<a href="../index.html">Índice de requerimientos</a><span>/</span><span>GIO-REF-002</span><span>/</span><span>Muestras</span><span>/</span><span>${sample ? "Editar" : "Registrar"}</span>`; renderSourceOptions(); syncFormFields(); setFormStep(1); }
function renderSourceOptions() { const current = refs.sampleSource.value; const sourceNames = [...refs.sampleSource.options].map((option) => option.value); if (!sourceNames.includes("Nexus")) refs.sampleSource.insertAdjacentHTML("beforeend", `<option>Nexus</option><option>Escale</option><option>Directores registrados</option><option>Padrón RER</option><option>Instituciones educativas</option><option>Operativo piloto</option><option>Instituciones 2025</option>`); const filterNames = [...refs.filterSource.options].map((option) => option.value); if (!filterNames.includes("Nexus")) refs.filterSource.insertAdjacentHTML("beforeend", [...refs.sampleSource.querySelectorAll("option:not(:first-child)")].map((option) => `<option>${escapeUiHtml(option.value)}</option>`).join("")); refs.sampleSource.value = current; }
function syncFormFields() { const draft = state.draft || {}; refs.sampleName.value = draft.name || ""; refs.sampleDescription.value = draft.description || ""; refs.sampleSource.value = draft.source || ""; refs.sampleSize.value = draft.sampleSize || ""; refs.selectionMethod.value = draft.selectionMethod || "Aleatoria"; refs.editStatusControl.hidden = state.editingIndex === null; if (refs.sampleStatusSwitch) refs.sampleStatusSwitch.checked = draft.status === "Activo"; updateSourceSummary(); }
function updateDraft() { if (!state.draft) return; Object.assign(state.draft, { name: refs.sampleName.value.trim(), description: refs.sampleDescription.value.trim(), source: refs.sampleSource.value, sampleSize: refs.sampleSize.value, selectionMethod: refs.selectionMethod.value, instruments: refs.instrumentOptions.filter((input) => input.checked).map((input) => input.value) }); const source = getSourceConfig(state.draft.source); state.draft.population = String(source?.population || 0); state.dirty = true; updateSourceSummary(); }
function setFormStep(step) { state.step = Math.max(1, Math.min(3, step)); refs.wizardSteps.forEach((item) => { const itemStep = Number(item.dataset.wizardStep); item.classList.toggle("is-current", itemStep === state.step); item.classList.toggle("is-complete", itemStep < state.step); }); refs.wizardPanels.forEach((panel) => panel.classList.toggle("is-active", Number(panel.dataset.wizardPanel) === state.step)); document.getElementById("backBtn").hidden = state.step === 1; document.getElementById("continueBtn").hidden = state.step === 3; document.getElementById("completeBtn").hidden = state.step !== 3; document.getElementById("saveStepBtn").hidden = state.editingIndex === null || state.step === 3; renderAvailableFields(); renderFields(); renderUnits(); renderInstruments(); updateSourceSummary(); updateSelectionSummary(); }
function renderAvailableFields() { const source = getSourceConfig(state.draft?.source); const query = (refs.fieldSearch?.value || "").trim().toLowerCase(); const fields = (source?.fields || []).filter((field) => field.toLowerCase().includes(query)); refs.availableFields.innerHTML = fields.length ? fields.map((field) => { const selected = state.draft?.fields?.some((item) => item.name === field); return `<label class="available-field ${selected ? "is-selected" : ""}"><input type="checkbox" data-available-field="${escapeUiHtml(field)}" ${selected ? "checked" : ""}><span>${escapeUiHtml(field)}</span></label>`; }).join("") : `<p class="empty-inline">No se encontraron campos.</p>`; }
function renderFields() { const fields = state.draft?.fields || []; refs.fieldsBody.innerHTML = fields.map((field, index) => `<tr><td><div class="order-actions"><button class="icon-button table-icon" type="button" data-action="move-field-up" data-field-index="${index}" aria-label="Subir" title="Subir" ${index === 0 ? "disabled" : ""}><i class="fa-solid fa-chevron-up" aria-hidden="true"></i></button><span>${index + 1}</span><button class="icon-button table-icon" type="button" data-action="move-field-down" data-field-index="${index}" aria-label="Bajar" title="Bajar" ${index === fields.length - 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button></div></td><td><strong>${escapeUiHtml(field.name)}</strong></td><td><input class="form-check-input" type="checkbox" data-field-key="preload" data-field-index="${index}" ${field.preload ? "checked" : ""} aria-label="Usar ${escapeUiHtml(field.name)} como precarga"></td><td><input class="form-check-input" type="checkbox" data-field-key="informant" data-field-index="${index}" ${field.informant ? "checked" : ""} aria-label="Usar ${escapeUiHtml(field.name)} como informante"></td><td><input class="form-check-input" type="checkbox" data-field-key="user" data-field-index="${index}" ${field.user ? "checked" : ""} aria-label="Usar ${escapeUiHtml(field.name)} como usuario"></td><td><input class="form-check-input" type="checkbox" data-field-key="unique" data-field-index="${index}" ${field.unique ? "checked" : ""} aria-label="Usar ${escapeUiHtml(field.name)} como identificador"></td><td><button class="table-icon-button danger" type="button" data-action="remove-field" data-field-index="${index}" aria-label="Quitar ${escapeUiHtml(field.name)}" title="Quitar"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></td></tr>`).join(""); refs.fieldsCount.textContent = `${fields.length} campos seleccionados`; }
function renderUnits() { const query = (refs.unitSearch?.value || "").trim().toLowerCase(); const units = (state.draft?.units || []).filter((unit) => [unit.id, unit.personId, unit.name, unit.region, unit.district, unit.birthDate].join(" ").toLowerCase().includes(query)); refs.unitsBody.innerHTML = units.map((unit) => { const sourceIndex = state.draft.units.indexOf(unit); return `<tr><td><input class="form-check-input" type="checkbox" data-unit-select="${escapeUiHtml(unit.id)}" aria-label="Seleccionar ${escapeUiHtml(unit.id)}"></td><td>${sourceIndex + 1}</td><td><strong>${escapeUiHtml(unit.id)}</strong></td><td>${escapeUiHtml(unit.personId || "-")}</td><td>${escapeUiHtml(unit.name)}</td><td>${escapeUiHtml(unit.region || "-")}</td><td>${escapeUiHtml(unit.district || "-")}</td><td>${escapeUiHtml(unit.birthDate || "-")}</td><td><div class="row-actions"><button class="row-action" type="button" data-action="replace" data-unit-action="replace" data-unit-id="${escapeUiHtml(unit.id)}" title="Reemplazar"><i class="fa-solid fa-arrow-right-arrow-left" aria-hidden="true"></i><span>Reemplazar</span></button><button class="row-action" type="button" data-action="remove" data-unit-action="exclude" data-unit-id="${escapeUiHtml(unit.id)}" title="Excluir"><i class="fa-solid fa-minus-circle" aria-hidden="true"></i><span>Excluir</span></button></div></td></tr>`; }).join(""); refs.unitsCount.textContent = units.length ? `Mostrando ${units.length} de ${Number(state.draft?.unitTotal || state.draft?.units?.length || 0).toLocaleString("es-PE")} unidades muestrales` : "No hay unidades que coincidan con la búsqueda."; }
function renderInstruments() { refs.instrumentOptions.forEach((input) => { input.checked = Boolean(state.draft?.instruments?.includes(input.value)); }); }
function updateSourceSummary() { const source = getSourceConfig(refs.sampleSource.value); const population = Number(source?.population || 0); refs.populationCount.textContent = source ? population.toLocaleString("es-PE") : "Selecciona una fuente"; refs.populationHint.textContent = source ? "Registros disponibles en la fuente seleccionada." : "La población total se mostrará al seleccionar la fuente."; if (refs.structureSummary) refs.structureSummary.innerHTML = summaryMarkup(source, state.draft?.sampleSize); if (refs.unitsSummary) refs.unitsSummary.innerHTML = summaryMarkup(source, state.draft?.sampleSize, state.draft?.selectionMethod, state.draft?.description); }
function updateSelectionSummary() { const population = Number(state.draft?.population || 0); const sampleSize = Number(state.draft?.sampleSize || 0); const method = state.draft?.selectionMethod || "Aleatoria"; refs.methodPopulation.textContent = population ? population.toLocaleString("es-PE") : "Selecciona una fuente"; refs.selectionInterval.textContent = method === "Sistemática" && sampleSize ? (population / sampleSize).toFixed(1) : method === "Total" ? "1" : "No aplica"; refs.methodMessage.textContent = method === "Aleatoria" ? "Las unidades se seleccionarán aleatoriamente según el tamaño indicado." : method === "Sistemática" ? "El intervalo se calcula dividiendo la población entre el tamaño de la muestra." : "Se incluirán todas las unidades disponibles de la fuente."; const methodOption = document.querySelector(`[data-method-option="${method}"]`); if (methodOption) methodOption.checked = true; }
function clearErrors() { [refs.nameError, refs.descriptionError, refs.sourceError, refs.sizeError].forEach((error) => { error.textContent = ""; }); }
function summaryCard(icon, label, value) { return `<div><span class="summary-icon" aria-hidden="true"><i class="fa-solid ${icon}"></i></span><div><span>${label}</span><strong>${value}</strong></div></div>`; }
function summaryMarkup(source, size, method = "", description = "") { return source ? `${summaryCard("fa-database", "Fuente de datos", escapeUiHtml(source.name))}${summaryCard("fa-users", "Población total", source.population.toLocaleString("es-PE"))}${summaryCard("fa-chart-column", "Tamaño de muestra", escapeUiHtml(size || "Sin definir"))}${method ? summaryCard("fa-compass", "Método", escapeUiHtml(method)) : ""}${description ? summaryCard("fa-file-lines", "Descripción", escapeUiHtml(description)) : ""}` : `<div class="summary-empty">Selecciona una fuente para continuar.</div>`; }
function escapeUiHtml(value = "") { return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character])); }


/* source: gio-ref-002-muestras/js/samples.js */






const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
function statusClass(status) { return status === "Activo" ? "active" : status === "Inactivo" ? "inactive" : ""; }

function renderSamples() { const header = refs.samplesBody.closest("table")?.querySelector("thead tr"); if (header && !header.querySelector("[data-column='row-number']")) header.insertAdjacentHTML("afterbegin", '<th data-column="row-number">N.°</th>'); refs.samplesBody.innerHTML = state.filteredSamples.map((sample) => { const index = samples.indexOf(sample); return `<tr><td>${index + 1}</td><td><strong>${escapeHtml(sample.id)}</strong></td><td><strong>${escapeHtml(sample.name)}</strong><div class="description">${escapeHtml(sample.description)}</div></td><td>${escapeHtml(sample.source)}</td><td>${escapeHtml(sample.units)}</td><td><span class="status ${statusClass(sample.status)}">${escapeHtml(sample.status)}</span></td><td><div class="row-actions"><button class="row-action" type="button" data-action="view" data-index="${index}" title="Ver detalle"><i class="fa-regular fa-eye" aria-hidden="true"></i><span>Ver detalle</span></button><button class="row-action" type="button" data-action="edit" data-index="${index}" title="Editar"><i class="fa-solid fa-pen" aria-hidden="true"></i><span>Editar</span></button></div></td></tr>`; }).join(""); refs.emptyState.hidden = state.filteredSamples.length > 0; refs.pageSummary.textContent = state.filteredSamples.length ? `Mostrando 1 a ${state.filteredSamples.length} de ${state.filteredSamples.length} registros` : "Mostrando 0 registros"; refs.sampleCount.textContent = `${samples.length} muestras registradas`; enableTooltips(); }
function applyFilters() { const query = refs.filterQuery.value.trim().toLowerCase(); const source = refs.filterSource.value, status = refs.filterStatus.value; state.filteredSamples = samples.filter((sample) => { const searchable = [sample.id, sample.name, sample.description, sample.source, sample.units, sample.status].join(" ").toLowerCase(); return searchable.includes(query) && (source === "Todos" || sample.source === source) && (status === "Todos" || sample.status === status); }); renderSamples(); }

function prepareUnits() { if (!state.draft) return; const population = Number(state.draft.population || 0); const total = state.draft.selectionMethod === "Total" ? population : Number(state.draft.sampleSize || 0); const amount = Math.min(total, 10); const current = state.draft.units || []; const targetAmount = current.length ? current.length : amount; state.draft.unitTotal = total; state.draft.units = Array.from({ length: targetAmount }, (_, index) => ({ ...sampleUnitCatalog[index % sampleUnitCatalog.length], ...(current[index] || {}), id: current[index]?.id || sampleUnitCatalog[index % sampleUnitCatalog.length].id })); }

function handleAction(event) { const action = event.target.closest("[data-action]"); if (!action) return; if (["move-field-up", "move-field-down", "remove-field"].includes(action.dataset.action)) { const index = Number(action.dataset.fieldIndex); if (action.dataset.action === "remove-field") state.draft.fields.splice(index, 1); else { const next = action.dataset.action === "move-field-up" ? index - 1 : index + 1; if (state.draft.fields[next]) [state.draft.fields[index], state.draft.fields[next]] = [state.draft.fields[next], state.draft.fields[index]]; } state.dirty = true; renderAvailableFields(); renderFields(); return; } if (action.dataset.unitAction === "replace") { openReplacementModal(action.dataset.unitId); return; } if (action.dataset.unitAction === "exclude") { state.pendingUnitAction = { type: "exclude", unitId: action.dataset.unitId }; openConfirmModal("confirmModal", "¿Está seguro que desea excluir esta unidad de la muestra?"); return; } const sample = samples[Number(action.dataset.index)]; if (!sample) return; if (action.dataset.action === "view") { showDetail(sample); return; } if (action.dataset.action === "edit") { state.editingIndex = samples.indexOf(sample); state.draft = { ...sample, fields: sample.fields?.map((field, index) => ({ informant: false, user: index === 0, ...field })), units: sample.unitList?.map((unit) => ({ ...unit })), instruments: [...(sample.instruments || [])] }; showForm(sample); return; } }

function showDetail(sample) { const fields = sample.fields || [], units = sample.unitList || [], instruments = sample.instruments || []; refs.detailContent.innerHTML = `<div class="detail-summary"><div><span>Identificador</span><strong>${escapeHtml(sample.id)}</strong></div><div><span>Estado</span><strong>${escapeHtml(sample.status)}</strong></div><div><span>Fuente</span><strong>${escapeHtml(sample.source)}</strong></div><div><span>Unidades</span><strong>${escapeHtml(sample.units)}</strong></div></div><p class="detail-description">${escapeHtml(sample.description)}</p><h3 class="detail-section-title">Estructura</h3><div class="detail-table-wrap"><table class="table table-sm align-middle mb-0"><thead><tr><th>Campo</th><th>Identificador</th><th>Precarga</th><th>Informante</th><th>Usuario</th></tr></thead><tbody>${fields.map((field) => `<tr><td>${escapeHtml(field.name)}</td><td>${field.unique ? "Sí" : "No"}</td><td>${field.preload ? "Sí" : "No"}</td><td>${field.informant ? "Sí" : "No"}</td><td>${field.user ? "Sí" : "No"}</td></tr>`).join("") || '<tr><td colspan="5">Sin campos configurados.</td></tr>'}</tbody></table></div><h3 class="detail-section-title">Selección e instrumentos</h3><p class="detail-trace">Método: <strong>${escapeHtml(sample.selectionMethod || "Aleatoria")}</strong> · Instrumentos: <strong>${escapeHtml(instruments.join(", ") || "Sin instrumentos")}</strong> · Unidades visibles: <strong>${units.length}</strong></p><p class="detail-trace">Última actualización: ${escapeHtml(sample.updated || "Sin registro")}</p>`; bootstrap.Modal.getOrCreateInstance(refs.detailModal).show(); }

function validateStep(step = state.step) { clearErrors(); if (step === 1) { refs.nameError.textContent = refs.sampleName.value.trim() ? "" : "Ingresa el nombre de la muestra."; refs.descriptionError.textContent = refs.sampleDescription.value.trim() ? "" : "Ingresa la descripción de la muestra."; refs.sourceError.textContent = refs.sampleSource.value ? "" : "Selecciona una fuente activa."; const population = Number(state.draft?.population || 0), size = Number(refs.sampleSize.value); refs.sizeError.textContent = size > 0 && size <= population ? "" : population && size > population ? "El tamaño no puede superar la población." : "Ingresa un tamaño válido."; return Boolean(state.draft && refs.sampleName.value.trim() && refs.sampleDescription.value.trim() && refs.sampleSource.value && size > 0 && size <= population && refs.instrumentOptions.some((input) => input.checked)); } if (step === 2) return Boolean(state.draft?.fields?.length && state.draft.fields.some((field) => field.unique) && state.draft.fields.some((field) => field.informant) && state.draft.fields.some((field) => field.user)); if (step === 3) return Boolean(state.draft?.units?.length); return true; }
function persistDraft() { const previous = state.editingIndex === null ? null : samples[state.editingIndex]; if (!previous || !state.draft) return; Object.assign(previous, { ...state.draft, unitList: state.draft.units, units: previous.units || state.draft.sampleSize, updated: "21/08/2026 09:00" }); state.dirty = false; applyFilters(); }
function requestSaveStep() { updateDraft(); if (!validateStep()) { showToast(getMessage("M12"), "warning"); return; } state.pendingAction = "saveStep"; openConfirmModal("confirmModal", getMessage("M1")); }
function requestComplete() { updateDraft(); if (![1, 2, 3].every((step) => validateStep(step))) { showToast(getMessage("M12"), "warning"); return; } state.pendingAction = "complete"; openConfirmModal("confirmModal", getMessage("M1")); }
function requestCancel() { if (!state.dirty) { resetWizard(); showList(); return; } state.pendingCancel = true; openConfirmModal("confirmModal", getMessage("M14")); }

function confirmPendingAction() { if (state.pendingWizardStep) { const target = state.pendingWizardStep; state.pendingWizardStep = null; closeConfirmModal("confirmModal"); setFormStep(target); return; } if (state.pendingCancel) { closeConfirmModal("confirmModal"); resetWizard(); showList(); return; } if (state.pendingUnitAction?.type === "exclude") { state.draft.units = state.draft.units.filter((unit) => unit.id !== state.pendingUnitAction.unitId); state.dirty = true; state.pendingUnitAction = null; closeConfirmModal("confirmModal"); renderUnits(); showToast(getMessage("M3"), "success"); return; } if (state.pendingStatus) { const { index, next } = state.pendingStatus; if (next === "Inactivo" && !validateConfirmReason("confirmModal", getMessage("M11"))) return; samples[index].status = next; samples[index].updated = "21/08/2026 12:00"; if (next === "Inactivo") samples[index].inactivationReason = getConfirmReason("confirmModal"); state.pendingStatus = null; closeConfirmModal("confirmModal"); applyFilters(); showToast(getMessage(next === "Activo" ? "M7" : "M8"), "success"); return; } if (state.pendingAction === "saveStep") { persistDraft(); state.pendingAction = null; closeConfirmModal("confirmModal"); showToast(getMessage("M3"), "success"); return; } if (state.pendingAction === "complete") { const wasEditing = state.editingIndex !== null; const previous = wasEditing ? samples[state.editingIndex] : null; const payload = { id: previous?.id || `MST-${String(samples.length + 1).padStart(3, "0")}`, name: state.draft.name, description: state.draft.description, source: state.draft.source, sampleSize: state.draft.sampleSize, population: state.draft.population, unitTotal: state.draft.unitTotal, selectionMethod: state.draft.selectionMethod, fields: state.draft.fields, unitList: state.draft.units, units: previous?.units || state.draft.sampleSize, instruments: state.draft.instruments, status: "Activo", updated: "21/08/2026 09:00" }; if (wasEditing) samples[state.editingIndex] = payload; else samples.unshift(payload); state.pendingAction = null; closeConfirmModal("confirmModal"); resetWizard(); applyFilters(); showList(); showToast(getMessage(wasEditing ? "M3" : "M2"), "success"); } }

function openReplacementModal(unitId) { const current = state.draft?.units?.find((unit) => unit.id === unitId); if (!current || !refs.replacementModal) return; state.replacementSelection = unitId; refs.replacementCurrent.innerHTML = `<div class="replacement-unit-icon"><i class="fa-regular fa-user" aria-hidden="true"></i></div><div class="replacement-current-info"><div><span>ID unidad</span><strong>${escapeHtml(current.id)}</strong></div><div><span>ID persona</span><strong>${escapeHtml(current.personId || "-")}</strong></div><div><span>Nombre completo</span><strong>${escapeHtml(current.name)}</strong></div><div><span>Región</span><strong>${escapeHtml(current.region || "-")}</strong></div><div><span>Distrito</span><strong>${escapeHtml(current.district || "-")}</strong></div><div><span>Fecha de nacimiento</span><strong>${escapeHtml(current.birthDate || "-")}</strong></div></div>`; refs.replacementSearch.value = ""; renderReplacementCandidates(); bootstrap.Modal.getOrCreateInstance(refs.replacementModal).show(); }
function renderReplacementCandidates() { if (!refs.replacementBody || !state.draft) return; const query = (refs.replacementSearch?.value || "").trim().toLowerCase(); const currentIds = new Set(state.draft.units.map((unit) => unit.id)); const candidates = sampleUnitCatalog.filter((unit) => !currentIds.has(unit.id) && [unit.id, unit.personId, unit.name, unit.region, unit.district].join(" ").toLowerCase().includes(query)); refs.replacementBody.innerHTML = candidates.map((unit) => `<tr><td><input class="form-check-input" type="radio" name="replacementUnit" value="${escapeHtml(unit.id)}" ${state.replacementCandidate === unit.id ? "checked" : ""} aria-label="Seleccionar ${escapeHtml(unit.id)}"></td><td><strong>${escapeHtml(unit.id)}</strong></td><td>${escapeHtml(unit.personId)}</td><td>${escapeHtml(unit.name)}</td><td>${escapeHtml(unit.region)}</td><td>${escapeHtml(unit.district)}</td><td>${escapeHtml(unit.birthDate)}</td></tr>`).join("") || '<tr><td colspan="7" class="empty-inline">No hay unidades disponibles.</td></tr>'; }
function confirmReplacement() { const selected = state.replacementCandidate || refs.replacementBody?.querySelector("input[name='replacementUnit']:checked")?.value; if (!selected || !state.draft || !state.replacementSelection) { showToast("Selecciona una unidad disponible.", "warning"); return; } const index = state.draft.units.findIndex((unit) => unit.id === state.replacementSelection); const replacement = sampleUnitCatalog.find((unit) => unit.id === selected); if (index < 0 || !replacement) return; state.draft.units[index] = { ...replacement }; state.dirty = true; state.replacementSelection = null; state.replacementCandidate = null; bootstrap.Modal.getOrCreateInstance(refs.replacementModal).hide(); renderUnits(); showToast(getMessage("M3"), "success"); }
function exportRows(rows, filename, columns = [{ key: "id", label: "ID_UNIDAD" }, { key: "personId", label: "ID_PERSONA" }, { key: "name", label: "NOMBRE COMPLETO" }, { key: "region", label: "REGION" }, { key: "district", label: "DISTRITO" }, { key: "birthDate", label: "FECHA_NACIMIENTO" }]) { const headers = columns.map((column) => column.label); const csv = [headers, ...rows.map((row) => columns.map((column) => row[column.key] || ""))].map((line) => line.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n"); const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = filename; link.click(); URL.revokeObjectURL(link.href); }
function updateField(index, key, value) { if (!state.draft?.fields[index]) return; state.draft.fields[index][key] = Boolean(value); state.dirty = true; }
function addField() { if (!state.draft) return; state.draft.fields.push({ name: `Campo ${state.draft.fields.length + 1}`, unique: false, preload: false, informant: false, user: false }); state.dirty = true; }


/* source: gio-ref-002-muestras/js/main.js */






const $ = (id) => document.getElementById(id);

function requestWizardStep(step) { if (step === state.step) return; if (state.editingIndex !== null && state.dirty) { updateDraft(); state.pendingWizardStep = step; openConfirmModal("confirmModal", getMessage("M70")); return; } if (step > state.step) { for (let currentStep = state.step; currentStep < step; currentStep += 1) { updateDraft(); if (!validateStep(currentStep)) { showToast(getMessage("M12"), "warning"); return; } } } if (step === 3) prepareUnits(); setFormStep(step); }
refs.filterForm.addEventListener("submit", (event) => { event.preventDefault(); applyFilters(); showToast(getPrototypeMessage("filtersApplied"), "info"); });
$("filterToggle").addEventListener("click", () => { const expanded = refs.filterForm.classList.toggle("is-expanded"); $("filterToggle").setAttribute("aria-expanded", String(expanded)); });
$("clearBtn").addEventListener("click", () => { refs.filterQuery.value = ""; refs.filterSource.value = "Todos"; refs.filterStatus.value = "Todos"; applyFilters(); showToast(getPrototypeMessage("filtersCleared"), "info"); });
$("newSampleBtn").addEventListener("click", () => { state.editingIndex = null; createDraft(); showForm(); });
$("cancelBtn").addEventListener("click", requestCancel);
$("backBtn").addEventListener("click", () => requestWizardStep(state.step - 1));
$("saveStepBtn").addEventListener("click", requestSaveStep);
$("continueBtn").addEventListener("click", () => { updateDraft(); if (!validateStep(state.step)) { showToast(getMessage("M12"), "warning"); return; } if (state.step === 2) prepareUnits(); setFormStep(state.step + 1); });
$("completeBtn").addEventListener("click", requestComplete);
refs.sampleForm.addEventListener("input", (event) => { if (event.target === refs.fieldSearch) { renderAvailableFields(); return; } if (event.target === refs.unitSearch) { renderUnits(); return; } updateDraft(); });
refs.sampleForm.addEventListener("change", (event) => { const field = event.target.closest("[data-field-key]"); if (field) updateField(Number(field.dataset.fieldIndex), field.dataset.fieldKey, field.checked); if (event.target === refs.sampleSource) { state.draft.fields = []; state.draft.units = []; state.draft.unitTotal = 0; prepareUnits(); } updateDraft(); renderAvailableFields(); renderFields(); renderUnits(); updateSelectionSummary(); });
refs.availableFields.addEventListener("change", (event) => { const input = event.target.closest("[data-available-field]"); if (!input) return; const name = input.dataset.availableField; const index = state.draft.fields.findIndex((field) => field.name === name); if (input.checked && index < 0) state.draft.fields.push({ name, unique: state.draft.fields.length === 0, preload: false, informant: state.draft.fields.length === 1 }); if (!input.checked && index >= 0) state.draft.fields.splice(index, 1); state.dirty = true; renderAvailableFields(); renderFields(); });
refs.samplesBody.addEventListener("click", handleAction);
refs.fieldsBody.addEventListener("click", handleAction);
refs.unitsBody.addEventListener("click", handleAction);
refs.unitsBody.addEventListener("change", (event) => { if (event.target.matches("[data-unit-select]")) event.target.closest("tr")?.classList.toggle("is-selected", event.target.checked); });
document.querySelector("[data-unit-select-all]")?.addEventListener("change", (event) => { document.querySelectorAll("[data-unit-select]").forEach((input) => { input.checked = event.target.checked; input.closest("tr")?.classList.toggle("is-selected", event.target.checked); }); });
refs.wizardSteps.forEach((button) => button.addEventListener("click", () => requestWizardStep(Number(button.dataset.wizardStep))));
$("refreshUnitsBtn").addEventListener("click", () => { prepareUnits(); renderUnits(); showToast("La selección fue actualizada.", "success"); });
$("returnSelectionBtn").addEventListener("click", () => requestWizardStep(2));
$("unitExportBtn").addEventListener("click", () => exportRows(state.draft?.units || [], "unidades-muestrales.csv"));
refs.replacementSearch?.addEventListener("input", renderReplacementCandidates);
refs.replacementBody?.addEventListener("change", (event) => { const candidate = event.target.closest("input[name='replacementUnit']"); if (candidate) state.replacementCandidate = candidate.value; });
refs.replacementSave?.addEventListener("click", confirmReplacement);
refs.replacementModal?.addEventListener("hidden.bs.modal", () => { state.replacementSelection = null; state.replacementCandidate = null; });
$("exportBtn").addEventListener("click", () => exportRows(state.filteredSamples, "muestras.csv", [{ key: "id", label: "Identificador" }, { key: "name", label: "Nombre de muestra" }, { key: "source", label: "Fuente de datos" }, { key: "units", label: "Registros" }, { key: "status", label: "Estado" }]));
$("confirmBtn").addEventListener("click", confirmPendingAction);
refs.confirmModal.querySelector(".modal-footer [data-bs-dismiss='modal']").addEventListener("click", () => { state.pendingWizardStep = null; });
$("confirmModal").addEventListener("hidden.bs.modal", () => { state.pendingAction = null; state.pendingCancel = false; state.pendingStatus = null; state.pendingWizardStep = null; state.pendingUnitAction = null; });
refs.sampleStatusSwitch?.addEventListener("change", (event) => { if (state.editingIndex === null) return; state.pendingStatus = { index: state.editingIndex, next: event.target.checked ? "Activo" : "Inactivo" }; event.target.checked = !event.target.checked; openConfirmModal("confirmModal", `${getMessage(state.pendingStatus.next === "Activo" ? "M5" : "M6")} ${state.draft.name}?`, { requireReason: state.pendingStatus.next === "Inactivo" }); });
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) document.querySelectorAll("[data-menu-panel]").forEach((panel) => { panel.hidden = true; }); });
renderSourceOptions();
renderSamples();
attachTableSorting(document.querySelector(".ssee-table"));
