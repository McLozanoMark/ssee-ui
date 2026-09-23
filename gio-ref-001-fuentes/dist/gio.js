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


/* source: gio-ref-001-fuentes/js/data.js */
const sources = [
  {
    id: "FDT-001",
    name: "Instituciones educativas",
    description: "Directorio validado de instituciones educativas.",
    origin: "Interna",
    originDetail: "NEXUS",
    usage: ["Precarga de variables"],
    records: "12,450",
    status: "Activo",
    updated: "18/08/2026 09:00",
    createdBy: "Administrador",
    updatedBy: "Administrador",
    createdAt: "15/08/2026 09:30",
    inUse: true,
    relations: "Relacionada con 2 muestras",
    previewRecords: [
      { "Código modular": "150101", "Nombre de la institución": "I.E. José María Arguedas", DRE: "Lima Metropolitana", UGEL: "UGEL 03" },
      { "Código modular": "150102", "Nombre de la institución": "I.E. República del Perú", DRE: "Lima Metropolitana", UGEL: "UGEL 04" }
    ],
    history: [
      { date: "15/08/2026 09:30", action: "Creación", user: "Administrador" },
      { date: "18/08/2026 09:00", action: "Actualización", user: "Administrador" }
    ],
    fields: [
      { name: "Código modular", type: "Texto", required: true, description: "Código oficial de la institución." },
      { name: "Nombre de la institución", type: "Texto", required: true, description: "Nombre registrado." },
      { name: "DRE", type: "Texto", required: true, description: "Dirección Regional de Educación." },
      { name: "UGEL", type: "Texto", required: false, description: "Unidad de Gestión Educativa Local." }
    ],
    keyFields: ["Código modular"]
  },
  {
    id: "FDT-002",
    name: "Directores registrados",
    description: "Directores asociados a cada institución.",
    origin: "Externa",
    originDetail: "Carga masiva",
    usage: ["Generación de fichas"],
    records: "3,180",
    status: "Activo",
    updated: "17/08/2026 16:45",
    createdBy: "Administrador",
    updatedBy: "Administrador",
    createdAt: "14/08/2026 11:10",
    inUse: false,
    relations: "Sin relaciones registradas",
    previewRecords: [
      { "DNI del director": "71234567", "Nombres y apellidos": "Juan Pérez López", "Código modular": "150101" },
      { "DNI del director": "71234568", "Nombres y apellidos": "María Fernández García", "Código modular": "150102" }
    ],
    history: [
      { date: "14/08/2026 11:10", action: "Creación", user: "Administrador" },
      { date: "17/08/2026 16:45", action: "Actualización", user: "Administrador" }
    ],
    fields: [
      { name: "DNI del director", type: "Texto", required: true, description: "Documento de identidad." },
      { name: "Nombres y apellidos", type: "Texto", required: true, description: "Nombre completo." },
      { name: "Código modular", type: "Texto", required: true, description: "Institución asociada." }
    ],
    keyFields: ["DNI del director"]
  },
  { id: "FDT-003", name: "Operativo piloto", description: "Registro sintético para pruebas del operativo.", origin: "Externa", originDetail: "Manual", usage: ["Generación de fichas"], records: "620", status: "Activo", updated: "16/08/2026 11:20", fields: [], keyFields: [] },
  { id: "FDT-004", name: "Instituciones 2025", description: "Histórico de instituciones del periodo anterior.", origin: "Externa", originDetail: "Carga masiva", usage: ["Precarga de variables"], records: "11,890", status: "Inactivo", updated: "12/08/2026 10:05", updatedBy: "Administrador", inactivatedBy: "Administrador", inactivationReason: "Cierre del periodo operativo.", fields: [], keyFields: [] },
  { id: "FDT-005", name: "Registro observado", description: "Fuente no disponible para nuevas operaciones.", origin: "Externa", originDetail: "Manual", usage: ["Generación de fichas"], records: "0", status: "Inactivo", updated: "08/08/2026 14:05", updatedBy: "Administrador", inactivatedBy: "Administrador", inactivationReason: "Fuente reemplazada.", fields: [], keyFields: [] }
];


/* source: gio-ref-001-fuentes/js/state.js */


const state = {
  filteredSources: [...sources],
  selectedIndex: null,
  editingIndex: null,
  pendingStatus: null,
  pendingAction: null,
  pendingCancel: false,
  pendingWizardStep: null,
  openMenu: null,
  step: 1,
  sortKey: "id",
  sortDirection: "asc",
  draft: null,
  dirty: false,
  loadMode: "manual",
  massValidation: { status: "idle", processed: 0, accepted: 0, observed: 0, issues: [] },
  editingRecordIndex: null,
  manualValidation: { status: "idle", issues: [] },
  manualRecords: [
    { code: "000123", dni: "71234567", name: "Juan Pérez López", date: "15/03/2012", sex: "Masculino", grade: "3° A", enrollment: "Matriculado" },
    { code: "000124", dni: "71234568", name: "María Fernández García", date: "22/07/2012", sex: "Femenino", grade: "3° A", enrollment: "Matriculado" }
  ]
};

function createDraft(source = null) {
  state.draft = {
    id: source?.id || null,
    name: source?.name || "",
    description: source?.description || "",
    origin: source?.origin || "",
    originDetail: source?.originDetail || "",
    usage: source?.usage || [],
    status: source?.status || "Activo",
    fields: source?.fields?.length ? source.fields.map((field) => ({ ...field })) : [
      { name: "Código modular", type: "Texto", required: true, description: "Código oficial de la unidad." },
      { name: "DNI del estudiante", type: "Texto", required: true, description: "Documento de identidad." },
      { name: "Nombres y apellidos", type: "Texto", required: true, description: "Nombre completo." }
    ],
    keyType: source?.keyFields?.length > 1 ? "compuesta" : "simple",
    keyFields: source?.keyFields?.length ? [...source.keyFields] : [],
    loadMode: "manual",
    fileName: "",
    fileValid: false,
    records: source?.records || "0",
    structureLocked: Boolean(source?.inUse),
    massValidation: { status: "idle", processed: 0, accepted: 0, observed: 0, issues: [] }
  };
  state.dirty = false;
}

function resetWizard() {
  state.selectedIndex = null;
  state.editingIndex = null;
  state.pendingStatus = null;
  state.pendingAction = null;
  state.pendingCancel = false;
  state.pendingWizardStep = null;
  state.step = 1;
  state.draft = null;
  state.editingRecordIndex = null;
  state.manualValidation = { status: "idle", issues: [] };
  state.dirty = false;
}

function getManualRecordValue(field, record) {
  const normalized = field.name.toLowerCase();
  if (/c[oó]digo|identific/.test(normalized)) return record.code || "";
  if (/dni|document/.test(normalized)) return record.dni || "";
  if (/nombre/.test(normalized)) return record.name || "";
  if (/fecha/.test(normalized)) return record.date || "";
  if (/sexo|g[eé]nero/.test(normalized)) return record.sex || "";
  if (/grado|nivel/.test(normalized)) return record.grade || "";
  if (/matr[ií]cula|estado/.test(normalized)) return record.enrollment || "";
  return record.values?.[field.name] || "";
}


/* source: gio-ref-001-fuentes/js/ui.js */



const uiEscapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

const refs = {
  listView: document.getElementById("listView"),
  formView: document.getElementById("formView"),
  sourcesBody: document.getElementById("sourcesBody"),
  emptyState: document.getElementById("emptyState"),
  pageSummary: document.getElementById("pageSummary"),
  sourceCount: document.getElementById("sourceCount"),
  toast: document.getElementById("toast"),
  filterForm: document.getElementById("filterForm"),
  filterQuery: document.getElementById("filterQuery"),
  filterOrigin: document.getElementById("filterOrigin"),
  filterStatus: document.getElementById("filterStatus"),
  sourceForm: document.getElementById("sourceForm"),
  sourceName: document.getElementById("sourceName"),
  sourceDescription: document.getElementById("sourceDescription"),
  sourceOrigin: document.getElementById("sourceOrigin"),
  sourceSystem: document.getElementById("sourceSystem"),
  sourceSystemField: document.getElementById("sourceSystemField"),
  sourceUsage: [...document.querySelectorAll("[data-usage]")],
  nameError: document.getElementById("nameError"),
  descriptionError: document.getElementById("descriptionError"),
  originError: document.getElementById("originError"),
  formTitle: document.getElementById("formTitle"),
  formBreadcrumb: document.getElementById("formBreadcrumb"),
  wizardSteps: [...document.querySelectorAll("[data-wizard-step]")],
  wizardPanels: [...document.querySelectorAll("[data-wizard-panel]")],
  fieldsBody: document.getElementById("fieldsBody"),
  fieldsCount: document.getElementById("fieldsCount"),
  keyType: [...document.querySelectorAll("[name='keyType']")],
  keyField: document.getElementById("keyField"),
  keyFieldsList: document.getElementById("keyFieldsList"),
  loadCards: [...document.querySelectorAll("[data-load-mode]")],
  manualPanel: document.getElementById("manualPanel"),
  massPanel: document.getElementById("massPanel"),
  manualHead: document.getElementById("manualHead"),
  manualBody: document.getElementById("manualBody"),
  fileName: document.getElementById("fileName"),
  fileInput: document.getElementById("fileInput"),
  validationSummary: document.getElementById("validationSummary"),
  manualValidationMessage: document.getElementById("manualValidationMessage"),
  detailModal: document.getElementById("detailModal"),
  detailContent: document.getElementById("detailContent"),
  confirmModal: document.getElementById("confirmModal")
};

function showToast(message, type = "info") {
  renderToast(refs.toast, message, type);
}
function initTooltips() {
  enableTooltips();
}

function showList() {
  refs.listView.classList.add("is-active");
  refs.formView.classList.remove("is-active");
}

function updateWizardFooter() {
  const editing = state.editingIndex !== null;
  const binaryStatus = ["Activo", "Inactivo"].includes(state.draft?.status);
  const sourceStatusSwitchWrap = document.getElementById("sourceStatusSwitchWrap");
  document.getElementById("backBtn").hidden = state.step === 1;
  document.getElementById("continueBtn").hidden = state.step === 4;
  document.getElementById("completeBtn").hidden = state.step !== 4;
  document.getElementById("saveStepBtn").hidden = !editing || state.step === 4;
  document.getElementById("editStatusControl").hidden = !editing;
  sourceStatusSwitchWrap.hidden = !binaryStatus;
  sourceStatusSwitchWrap.dataset.onLabel = "Activo";
  sourceStatusSwitchWrap.dataset.offLabel = "Inactivo";
  if (editing && state.draft) {
    document.getElementById("sourceStatusSwitch").checked = state.draft.status === "Activo";
  }
}

function showForm(source = null) {
  refs.listView.classList.remove("is-active");
  refs.formView.classList.add("is-active");
  refs.formTitle.textContent = source ? "Editar" : "Registrar";
  refs.formBreadcrumb.innerHTML = `<a href="../index.html">Índice de requerimientos</a> / RF-GFD-001 / Fuentes de datos / ${source ? "Editar" : "Registrar"}`;
  refs.sourceForm.reset();
  syncGeneralFields();
  setWizardStep(1);
  updateWizardFooter();
  clearErrors();
}

function setWizardStep(step) {
  state.step = step;
  refs.wizardSteps.forEach((item) => {
    const itemStep = Number(item.dataset.wizardStep);
    item.classList.toggle("is-current", itemStep === step);
    item.classList.toggle("is-complete", itemStep < step);
    item.disabled = false;
  });
  refs.wizardPanels.forEach((panel) => panel.classList.toggle("is-active", Number(panel.dataset.wizardPanel) === step));
  renderFields();
  renderKeyFields();
  renderManualRecords();
  updateLoadMode();
}

function isStepComplete(step) {
  if (step === 1) return Boolean(state.draft?.name && state.draft?.description && state.draft?.origin && state.draft?.usage?.length);
  if (step === 2) return Boolean(state.draft?.fields?.length);
  if (step === 3) return Boolean(state.draft?.keyFields?.length);
  return true;
}

function clearErrors() {
  refs.nameError.textContent = "";
  refs.descriptionError.textContent = "";
  refs.originError.textContent = "";
}

function syncGeneralFields() {
  const draft = state.draft || {};
  refs.sourceName.value = draft.name || "";
  refs.sourceDescription.value = draft.description || "";
  refs.sourceOrigin.value = draft.origin || "";
  refs.sourceSystem.value = draft.originDetail || "";
  refs.sourceSystemField.hidden = draft.origin !== "Interna";
  refs.sourceUsage.forEach((input) => { input.checked = draft.usage?.includes(input.value) || false; });
}

function renderFields() {
  const fields = state.draft?.fields || [];
  const locked = Boolean(state.draft?.structureLocked);
  refs.fieldsBody.innerHTML = fields.map((field, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><input class="form-control form-control-sm" data-field="name" data-index="${index}" value="${uiEscapeHtml(field.name)}" aria-label="Nombre del campo ${index + 1}" ${locked ? "disabled" : ""}></td>
      <td><select class="form-select form-select-sm" data-field="type" data-index="${index}" aria-label="Tipo de dato ${index + 1}" ${locked ? "disabled" : ""}>${["Texto", "Número", "Fecha", "Lista"].map((type) => `<option ${field.type === type ? "selected" : ""}>${type}</option>`).join("")}</select></td>
      <td class="text-center"><input class="form-check-input" type="checkbox" data-field="required" data-index="${index}" ${field.required ? "checked" : ""} aria-label="Campo obligatorio ${index + 1}" ${locked ? "disabled" : ""}></td>
      <td><input class="form-control form-control-sm" data-field="description" data-index="${index}" value="${uiEscapeHtml(field.description)}" aria-label="Descripción del campo ${index + 1}" ${locked ? "disabled" : ""}></td>
      <td><div class="row-actions"><button class="row-action" type="button" data-action="remove" data-delete-field="${index}" aria-label="Eliminar campo ${field.name}" title="Eliminar" ${locked ? "disabled" : ""}><i class="fa-solid fa-trash" aria-hidden="true"></i><span>Eliminar</span></button></div></td>
    </tr>`).join("");
  refs.fieldsCount.textContent = `Total de campos: ${fields.length}`;
  document.getElementById("addFieldBtn").disabled = locked;
  document.querySelector(".structure-note")?.remove();
  if (locked) refs.fieldsCount.insertAdjacentHTML("afterend", '<p class="structure-note"><i class="fa-solid fa-lock" aria-hidden="true"></i>La estructura está bloqueada porque la fuente ya tiene relaciones registradas.</p>');
}

function renderKeyFields() {
  const fields = state.draft?.fields || [];
  const selected = state.draft?.keyFields || [];
  const locked = Boolean(state.draft?.structureLocked);
  refs.keyField.innerHTML = `<option value="">Selecciona un campo</option>${fields.map((field) => `<option value="${uiEscapeHtml(field.name)}">${uiEscapeHtml(field.name)}</option>`).join("")}`;
  refs.keyField.disabled = locked;
  document.getElementById("addKeyFieldBtn").disabled = locked;
  refs.keyFieldsList.innerHTML = selected.map((fieldName, index) => `<li><span>${uiEscapeHtml(fieldName)}</span><button type="button" class="table-icon-button" data-remove-key="${index}" aria-label="Quitar ${uiEscapeHtml(fieldName)}" ${locked ? "disabled" : ""}><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></li>`).join("");
  refs.keyType.forEach((input) => { input.checked = input.value === state.draft?.keyType; });
  refs.keyType.forEach((input) => { input.disabled = locked; });
}

function renderManualRecords() {
  const fields = state.draft?.fields?.length ? state.draft.fields : [
    { name: "Código", type: "Texto" }, { name: "DNI", type: "Texto" }, { name: "Nombres y apellidos", type: "Texto" }
  ];
  refs.manualHead.innerHTML = ["#", ...fields.map((field) => field.name), "Acciones"].map((heading) => `<th>${uiEscapeHtml(heading)}</th>`).join("");
  refs.manualBody.innerHTML = state.manualRecords.map((record, index) => {
    const editing = state.editingRecordIndex === index;
    const values = fields.map((field) => `<td>${editing ? `<input class="form-control form-control-sm manual-record-input" data-manual-field="${uiEscapeHtml(field.name)}" data-index="${index}" value="${uiEscapeHtml(getManualRecordValue(field, record))}" aria-label="${uiEscapeHtml(field.name)} del registro ${index + 1}">` : uiEscapeHtml(getManualRecordValue(field, record))}</td>`).join("");
    const actions = editing
      ? `<button type="button" class="row-action" data-save-record="${index}" aria-label="Guardar registro" title="Guardar"><i class="fa-solid fa-check" aria-hidden="true"></i><span>Guardar</span></button><button type="button" class="row-action" data-cancel-record="${index}" aria-label="Cancelar edición" title="Cancelar"><i class="fa-solid fa-xmark" aria-hidden="true"></i><span>Cancelar</span></button>`
      : `<button type="button" class="row-action" data-action="edit" data-edit-record="${index}" aria-label="Editar registro" title="Editar"><i class="fa-solid fa-pen" aria-hidden="true"></i><span>Editar</span></button><button type="button" class="row-action" data-action="remove" data-delete-record="${index}" aria-label="Eliminar registro" title="Eliminar"><i class="fa-solid fa-trash" aria-hidden="true"></i><span>Eliminar</span></button>`;
    return `<tr><td>${index + 1}</td>${values}<td><div class="row-actions">${actions}</div></td></tr>`;
  }).join("");
  refs.manualValidationMessage.textContent = state.manualValidation?.status === "error" ? "Corrige los registros observados antes de guardar." : "";
}
function updateLoadMode() {
  refs.loadCards.forEach((card) => card.classList.toggle("is-selected", card.dataset.loadMode === state.loadMode));
  refs.manualPanel.hidden = state.loadMode !== "manual";
  refs.massPanel.hidden = state.loadMode !== "massive";
}


/* source: gio-ref-001-fuentes/js/sources.js */






const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

function showDetail(source) {
  const trace = [
    ["Creada por", source.createdBy || "Administrador"],
    ["Fecha de creación", source.createdAt || "No registrada"],
    ["Última modificación", `${source.updated || "No registrada"} · ${source.updatedBy || "Administrador"}`],
    ["Relaciones", source.relations || "Sin relaciones registradas"]
  ];
  if (source.status === "Inactivo") trace.push(["Inactivada por", source.inactivatedBy || "Administrador"], ["Motivo", source.inactivationReason || "No registrado"]);
  const fields = source.fields || [];
  const previewRows = source.previewRecords || [];
  const recordsMarkup = fields.length && previewRows.length
    ? `<div class="detail-table-wrap"><table class="table align-middle mb-0 ssee-table"><thead><tr>${fields.map((field) => `<th>${escapeHtml(field.name)}</th>`).join("")}</tr></thead><tbody>${previewRows.map((record) => `<tr>${fields.map((field) => `<td>${escapeHtml(record[field.name] || "Sin dato")}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="detail-trace">Vista previa de ${escapeHtml(String(previewRows.length))} registros.</p>`
    : '<p class="detail-trace">No hay registros de ejemplo disponibles para esta fuente.</p>';
  const history = source.history || [{ date: source.updated || "No registrada", action: "Actualización", user: source.updatedBy || "Administrador" }];
  refs.detailContent.innerHTML = `<div class="detail-summary"><div><span>Identificador</span><strong>${escapeHtml(source.id)}</strong></div><div><span>Estado</span><strong>${escapeHtml(source.status)}</strong></div><div><span>Registros</span><strong>${escapeHtml(source.records)}</strong></div><div><span>Origen</span><strong>${escapeHtml(source.origin)}</strong></div></div><p class="detail-description">${escapeHtml(source.description)}</p><p class="detail-trace">Sistema de origen: <strong>${escapeHtml(source.origin === "Interna" ? (source.originDetail || "Sin definir") : "No aplica")}</strong></p><h3 class="detail-section-title">Estructura</h3><div class="detail-table-wrap"><table class="table align-middle mb-0 ssee-table"><thead><tr><th>Campo</th><th>Tipo</th><th>Obligatorio</th><th>Descripción</th></tr></thead><tbody>${fields.map((field) => `<tr><td>${escapeHtml(field.name)}</td><td>${escapeHtml(field.type)}</td><td>${field.required ? "Sí" : "No"}</td><td>${escapeHtml(field.description)}</td></tr>`).join("") || '<tr><td colspan="4">No hay campos configurados.</td></tr>'}</tbody></table></div><h3 class="detail-section-title">Registros</h3>${recordsMarkup}<h3 class="detail-section-title">Trazabilidad</h3><div class="detail-trace-grid">${trace.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}</div><h3 class="detail-section-title">Historial</h3><div class="detail-table-wrap"><table class="table align-middle mb-0 ssee-table"><thead><tr><th>Fecha</th><th>Acción</th><th>Usuario</th></tr></thead><tbody>${history.map((entry) => `<tr><td>${escapeHtml(entry.date)}</td><td>${escapeHtml(entry.action)}</td><td>${escapeHtml(entry.user)}</td></tr>`).join("")}</tbody></table></div>`;
  bootstrap.Modal.getOrCreateInstance(refs.detailModal).show();
}

function statusClass(status) {
  return { Activo: "active", Inactivo: "inactive" }[status] || "";
}

function sortValue(source, key) {
  if (key === "records") return Number(String(source.records).replace(/,/g, ""));
  return String(source[key] || "").toLowerCase();
}

function isDateValue(value) {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(value) || /^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isNaN(Date.parse(value));
}

function validateManualRecords() {
  const fields = state.draft?.fields || [];
  const issues = [];
  const keys = new Set();
  state.manualRecords.forEach((record, recordIndex) => {
    fields.forEach((field) => {
      const value = getManualRecordValue(field, record);
      if (field.required && !String(value).trim()) issues.push({ record: String(recordIndex + 1), field: field.name, reason: "Campo obligatorio vacío." });
      if (value && field.type === "Número" && Number.isNaN(Number(value))) issues.push({ record: String(recordIndex + 1), field: field.name, reason: "El valor no corresponde al tipo Número." });
      if (value && field.type === "Fecha" && !isDateValue(String(value))) issues.push({ record: String(recordIndex + 1), field: field.name, reason: "El valor no corresponde al tipo Fecha." });
    });
    const key = (state.draft?.keyFields || []).map((fieldName) => {
      const field = fields.find((item) => item.name === fieldName) || { name: fieldName };
      return getManualRecordValue(field, record);
    }).join("|");
    if (key && keys.has(key)) issues.push({ record: String(recordIndex + 1), field: state.draft.keyFields.join(", "), reason: "La llave de identificación está duplicada." });
    if (key) keys.add(key);
  });
  state.manualValidation = { status: issues.length ? "error" : "success", issues };
  renderManualRecords();
  return { observed: issues.length, issues };
}

function beginManualRecordEdit(index) {
  state.editingRecordIndex = index;
  state.manualValidation = { status: "idle", issues: [] };
  renderManualRecords();
}

function updateManualRecordValue(index, fieldName, value) {
  const record = state.manualRecords[index];
  if (!record) return;
  const fields = state.draft?.fields || [];
  const field = fields.find((item) => item.name === fieldName);
  if (!field) return;
  const normalized = fieldName.toLowerCase();
  if (/c[oó]digo|identific/.test(normalized)) record.code = value;
  else if (/dni|document/.test(normalized)) record.dni = value;
  else if (/nombre/.test(normalized)) record.name = value;
  else if (/fecha/.test(normalized)) record.date = value;
  else if (/sexo|g[eé]nero/.test(normalized)) record.sex = value;
  else if (/grado|nivel/.test(normalized)) record.grade = value;
  else if (/matr[ií]cula|estado/.test(normalized)) record.enrollment = value;
  else record.values = { ...(record.values || {}), [fieldName]: value };
  state.dirty = true;
}

function saveManualRecord(index) {
  const result = validateManualRecords();
  const recordHasIssues = result.issues.some((issue) => issue.record === String(index + 1));
  if (recordHasIssues) return false;
  state.editingRecordIndex = null;
  renderManualRecords();
  return true;
}

function cancelManualRecordEdit() {
  state.editingRecordIndex = null;
  state.manualValidation = { status: "idle", issues: [] };
  renderManualRecords();
}

function exportSources() {
  const rows = state.filteredSources.map((source) => `<tr><td>${escapeHtml(source.id)}</td><td>${escapeHtml(source.name)}</td><td>${escapeHtml(source.origin)}</td><td>${escapeHtml(source.records)}</td><td>${escapeHtml(source.status)}</td></tr>`).join("");
  const content = `<!doctype html><html><meta charset="utf-8"><table><thead><tr><th>Identificador</th><th>Nombre</th><th>Origen</th><th>Registros</th><th>Estado</th></tr></thead><tbody>${rows}</tbody></table></html>`;
  const blob = new Blob([content], { type: "application/vnd.ms-excel;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "fuentes-de-datos.xls";
  link.click();
  URL.revokeObjectURL(link.href);
}

function downloadTemplate() {
  const fields = state.draft?.fields || [];
  const headers = fields.map((field) => field.name).join(",");
  const blob = new Blob([`${headers}\n`], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "plantilla-fuente-datos.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

function renderSources() {
  const header = refs.sourcesBody.closest("table")?.querySelector("thead tr");
  if (header && !header.querySelector("[data-column='row-number']")) header.insertAdjacentHTML("afterbegin", '<th data-column="row-number">N.°</th>');
  refs.sourcesBody.innerHTML = state.filteredSources.map((source) => {
    const index = sources.indexOf(source);
    return `<tr>
      <td>${index + 1}</td><td><strong>${escapeHtml(source.id)}</strong></td>
      <td><strong>${escapeHtml(source.name)}</strong><div class="description">${escapeHtml(source.description)}</div></td>
      <td><span class="origin-tag ${source.origin === "Interna" ? "internal" : "external"}">${escapeHtml(source.origin)}</span></td>
      <td>${escapeHtml(source.records)}</td>
      <td><span class="status ${statusClass(source.status)}">${escapeHtml(source.status)}</span></td>
      <td><div class="row-actions source-actions">
        <button type="button" class="row-action" data-action="view" data-index="${index}" title="Ver detalle"><i class="fa-regular fa-eye" aria-hidden="true"></i><span>Ver detalle</span></button>
        <button type="button" class="row-action" data-action="edit" data-index="${index}" title="Editar"><i class="fa-solid fa-pen" aria-hidden="true"></i><span>Editar</span></button>
      </div></td>
    </tr>`;
  }).join("");
  refs.emptyState.hidden = state.filteredSources.length > 0;
  refs.pageSummary.textContent = state.filteredSources.length ? `Mostrando 1 a ${state.filteredSources.length} de ${state.filteredSources.length} registros` : "Mostrando 0 registros";
  refs.sourceCount.textContent = `${sources.length} fuentes registradas`;
  initTooltips();
}

function applyFilters() {
  const query = refs.filterQuery.value.trim().toLowerCase();
  const description = document.getElementById("filterDescription").value.trim().toLowerCase();
  const origin = refs.filterOrigin.value;
  const status = refs.filterStatus.value;
  const records = document.getElementById("filterRecords").value;
  state.filteredSources = sources.filter((source) => {
    const searchable = [sources.indexOf(source) + 1, source.id, source.name, source.description, source.origin, source.originDetail, source.status].join(" ").toLowerCase();
    const recordCount = Number(String(source.records).replace(/,/g, ""));
    const recordsMatch = records === "Todos"
      || (records === "0" && recordCount === 0)
      || (records === "1-1000" && recordCount >= 1 && recordCount <= 1000)
      || (records === "1001-5000" && recordCount > 1000 && recordCount <= 5000)
      || (records === "5000+" && recordCount > 5000);
    return searchable.includes(query)
      && [source.id, source.description].join(" ").toLowerCase().includes(description)
      && (origin === "Todos" || source.origin === origin)
      && (status === "Todos" || source.status === status)
      && recordsMatch;
  });
  state.filteredSources.sort((left, right) => {
    const a = sortValue(left, state.sortKey);
    const b = sortValue(right, state.sortKey);
    const comparison = a > b ? 1 : a < b ? -1 : 0;
    return state.sortDirection === "asc" ? comparison : -comparison;
  });
  renderSources();
}

function handleSort(key) {
  if (state.sortKey === key) state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
  else { state.sortKey = key; state.sortDirection = "asc"; }
  document.querySelectorAll("[data-sort]").forEach((button) => {
    button.setAttribute("aria-sort", button.dataset.sort === state.sortKey ? state.sortDirection : "none");
    button.querySelector("i")?.classList.toggle("fa-arrow-up", button.dataset.sort === state.sortKey && state.sortDirection === "asc");
    button.querySelector("i")?.classList.toggle("fa-arrow-down", button.dataset.sort === state.sortKey && state.sortDirection === "desc");
  });
  applyFilters();
}

function handleAction(event) {
  const action = event.target.closest("[data-action]");
  if (!action) return;
  const source = sources[Number(action.dataset.index)];
  if (action.dataset.action === "view") {
    showDetail(source);
    return;
  }
  if (action.dataset.action === "edit") {
    state.editingIndex = sources.indexOf(source);
    createDraft(source);
    showForm(source);
    state.editingIndex = sources.indexOf(source);
    updateWizardFooter();
    return;
  }
}

function validateStep(step = state.step) {
  if (step === 1) {
    state.draft.name = refs.sourceName.value.trim();
    state.draft.description = refs.sourceDescription.value.trim();
    state.draft.origin = refs.sourceOrigin.value;
    state.draft.usage = refs.sourceUsage.filter((input) => input.checked).map((input) => input.value);
    const duplicateName = sources.some((source, index) => index !== state.editingIndex && source.name.trim().toLowerCase() === state.draft.name.toLowerCase());
    refs.nameError.textContent = !state.draft.name ? "Ingresa el nombre de la fuente." : duplicateName ? "Ya existe una fuente con este nombre." : "";
    refs.descriptionError.textContent = state.draft.description ? "" : "Ingresa la descripción de la fuente.";
    const sourceSystemValid = state.draft.origin !== "Interna" || Boolean(state.draft.originDetail);
    refs.originError.textContent = state.draft.origin && state.draft.usage.length && sourceSystemValid ? "" : "Completa el origen, el sistema interno si corresponde y la finalidad.";
    return Boolean(state.draft.name && !duplicateName && state.draft.description && state.draft.origin && state.draft.usage.length && sourceSystemValid);
  }
  if (step === 2) {
    const fields = state.draft.fields || [];
    return fields.length > 0 && fields.every((field) => field.name.trim());
  }
  if (step === 3) return state.draft.keyFields.length > 0;
  if (step === 4) {
    if (state.editingRecordIndex !== null) return false;
    return state.loadMode === "manual" ? validateManualRecords().observed === 0 : Boolean(state.draft.fileName && state.draft.fileValid);
  }
  return true;
}

function persistDraft() {
  const source = state.editingIndex === null ? null : sources[state.editingIndex];
  if (!source) return;
  Object.assign(source, {
    name: state.draft.name,
    description: state.draft.description,
    origin: state.draft.origin,
    originDetail: state.draft.originDetail,
    usage: [...state.draft.usage],
    fields: state.draft.fields.map((field) => ({ ...field })),
    keyFields: [...state.draft.keyFields],
    records: state.draft.records,
    updated: "21/08/2026 12:00",
    updatedBy: "Administrador"
  });
  source.history = [...(source.history || []), { date: "21/08/2026 12:00", action: "Actualización", user: "Administrador" }];
  state.dirty = false;
  applyFilters();
}

function requestSaveStep() {
  if (!validateStep()) { showToast(getMessage("M11"), "warning"); return; }
  state.pendingAction = { type: "saveStep" };
  openConfirmModal("confirmModal", getMessage("M1"));
}

function requestComplete() {
  if (!validateStep()) { showToast(getMessage("M12"), "warning"); return; }
  state.pendingAction = { type: "complete" };
  openConfirmModal("confirmModal", getMessage("M1"));
}

function requestCancel() {
  if (!state.dirty) { resetWizard(); showList(); return; }
  state.pendingCancel = true;
  openConfirmModal("confirmModal", getMessage("M14"));
}

function confirmPendingAction() {
  if (state.pendingWizardStep) {
    const targetStep = state.pendingWizardStep;
    state.pendingWizardStep = null;
    persistDraft();
    closeConfirmModal("confirmModal");
    showToast(getMessage("M3"), "success");
    showStepAfterSave(targetStep);
    return;
  }
  if (state.pendingCancel) {
    state.pendingCancel = false;
    state.pendingAction = null;
    closeConfirmModal("confirmModal");
    resetWizard();
    showList();
    return;
  }
  if (state.pendingStatus) {
    const { index, next } = state.pendingStatus;
    if (next === "Inactivo" && !validateConfirmReason("confirmModal", getMessage("M11"))) return;
    sources[index].status = next;
    sources[index].updated = "21/08/2026 12:00";
    sources[index].updatedBy = "Administrador";
    if (next === "Inactivo") {
      sources[index].inactivationReason = getConfirmReason("confirmModal");
      sources[index].inactivatedBy = "Administrador";
      sources[index].history = [...(sources[index].history || []), { date: "21/08/2026 12:00", action: "Inactivoción", user: "Administrador" }];
    }
    if (state.editingIndex === index && state.draft) {
      state.draft.status = next;
      document.getElementById("sourceStatusSwitch").checked = next === "Activo";
    }
    state.pendingStatus = null;
    closeConfirmModal("confirmModal");
    applyFilters();
    showToast(getMessage(next === "Activo" ? "M7" : "M8"), "success");
    return;
  }
  if (!state.pendingAction) return;
  const action = state.pendingAction;
  state.pendingAction = null;
  if (action.type === "saveStep") {
    persistDraft();
    closeConfirmModal("confirmModal");
    showToast(getMessage(state.editingIndex === null ? "M2" : "M3"), "success");
    return;
  }
  if (action.type === "complete") {
    const wasEditing = state.editingIndex !== null;
    const previewRecords = state.loadMode === "manual"
      ? state.manualRecords.slice(0, 5).map((record) => Object.fromEntries(state.draft.fields.map((field) => [field.name, getManualRecordValue(field, record)])))
      : [];
    const payload = {
      id: state.editingIndex === null ? `FDT-${String(sources.length + 1).padStart(3, "0")}` : sources[state.editingIndex].id,
      name: state.draft.name,
      description: state.draft.description,
      origin: state.draft.origin,
      originDetail: state.draft.originDetail,
      usage: [...state.draft.usage],
      records: state.loadMode === "manual" ? String(state.manualRecords.length) : String(state.draft.massValidation.processed),
      status: "Activo",
      updated: "21/08/2026 12:00",
      fields: state.draft.fields.map((field) => ({ ...field })),
      keyFields: [...state.draft.keyFields],
      createdBy: "Administrador",
      createdAt: "21/08/2026 12:00",
      updatedBy: "Administrador",
      inUse: false,
      relations: "Sin relaciones registradas",
      previewRecords,
      history: [{ date: "21/08/2026 12:00", action: "Creación", user: "Administrador" }]
    };
    if (state.editingIndex === null) sources.unshift(payload); else sources[state.editingIndex] = payload;
    closeConfirmModal("confirmModal");
    resetWizard();
    applyFilters();
    showList();
    showToast(getMessage(wasEditing ? "M3" : "M2"), "success");
  }
}

function showStepAfterSave(step) {
  setWizardStep(step);
  updateWizardFooter();
}

function updateDraftField(index, key, value) {
  if (!state.draft?.fields[index]) return;
  state.draft.fields[index][key] = key === "required" ? Boolean(value) : value;
  state.dirty = true;
}

function updateGeneralDraft() {
  if (!state.draft) return;
  state.draft.name = refs.sourceName.value.trim();
  state.draft.description = refs.sourceDescription.value.trim();
  state.draft.origin = refs.sourceOrigin.value;
  state.draft.originDetail = refs.sourceSystem.value;
  state.draft.usage = refs.sourceUsage.filter((input) => input.checked).map((input) => input.value);
  state.dirty = true;
}

function selectLoadMode(mode) {
  state.loadMode = mode;
  state.draft.loadMode = mode;
  state.dirty = true;
}

function addField() {
  if (state.draft?.structureLocked) return;
  state.draft.fields.push({ name: "", type: "Texto", required: false, description: "" });
  state.dirty = true;
}

function deleteField(index) {
  if (state.draft?.structureLocked) return;
  const removed = state.draft.fields.splice(index, 1)[0];
  state.draft.keyFields = state.draft.keyFields.filter((field) => field !== removed?.name);
  state.dirty = true;
}

function addKeyField() {
  if (state.draft?.structureLocked) return;
  const value = refs.keyField.value;
  if (!value || state.draft.keyFields.includes(value)) return;
  if (state.draft.keyType === "simple") state.draft.keyFields = [value];
  else state.draft.keyFields.push(value);
  state.dirty = true;
}

function removeKeyField(index) {
  if (state.draft?.structureLocked) return;
  state.draft.keyFields.splice(index, 1);
  state.dirty = true;
}

function setKeyType(value) {
  if (state.draft?.structureLocked) return;
  state.draft.keyType = value;
  if (value === "simple" && state.draft.keyFields.length > 1) state.draft.keyFields = state.draft.keyFields.slice(0, 1);
  state.dirty = true;
}

function parseCsvLine(line) {
  const values = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') { value += '"'; index += 1; }
      else quoted = !quoted;
    } else if (character === "," && !quoted) { values.push(value.trim()); value = ""; }
    else value += character;
  }
  values.push(value.trim());
  return values;
}

function validateRows(headers, rows) {
  const fields = state.draft?.fields || [];
  if (!headers.length) return { processed: 0, accepted: 0, observed: 1, issues: [{ record: "Estructura", field: "Archivo", value: "", reason: "El archivo no contiene encabezados ni registros." }] };
  const headerMap = new Map(headers.map((header, index) => [header.toLowerCase(), index]));
  const issues = [];
  fields.forEach((field) => {
    if (!headerMap.has(field.name.toLowerCase())) issues.push({ record: "Estructura", field: field.name, value: "", reason: "El campo configurado no existe en el archivo." });
  });
  const keys = new Set();
  rows.forEach((row, rowIndex) => {
    const rowIssues = [];
    fields.forEach((field) => {
      const column = headerMap.get(field.name.toLowerCase());
      const value = column === undefined ? "" : row[column] || "";
      if (field.required && !value) rowIssues.push({ field: field.name, value, reason: "Campo obligatorio vacío." });
      if (value && field.type === "Número" && Number.isNaN(Number(value))) rowIssues.push({ field: field.name, value, reason: "El valor no corresponde al tipo Número." });
      if (value && field.type === "Fecha" && Number.isNaN(Date.parse(value))) rowIssues.push({ field: field.name, value, reason: "El valor no corresponde al tipo Fecha." });
    });
    const key = (state.draft?.keyFields || []).map((fieldName) => {
      const column = headerMap.get(fieldName.toLowerCase());
      return column === undefined ? "" : row[column] || "";
    }).join("|");
    if (key && keys.has(key)) rowIssues.push({ field: state.draft.keyFields.join(", "), value: key, reason: "La llave de identificación está duplicada." });
    if (key) keys.add(key);
    rowIssues.forEach((issue) => issues.push({ record: String(rowIndex + 2), ...issue }));
  });
  const observedRows = new Set(issues.map((issue) => issue.record));
  return { processed: rows.length, accepted: Math.max(0, rows.length - observedRows.size), observed: observedRows.size, issues };
}

function validateCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return validateRows([], []);
  return validateRows(parseCsvLine(lines[0]), lines.slice(1).map(parseCsvLine));
}

function downloadValidationReport() {
  const rows = state.draft?.massValidation?.issues || [];
  const report = ["Registro,Campo,Valor,Motivo", ...rows.map((issue) => [issue.record, issue.field, issue.value, issue.reason].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))].join("\n");
  const blob = new Blob([report], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "reporte-inconsistencias.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

function renderValidationSummary(message = "La validación se mostrará al cargar un archivo.") {
  const result = state.draft?.massValidation || { status: "idle", issues: [] };
  refs.validationSummary.classList.toggle("is-error", result.status === "error");
  if (result.status === "idle") {
    refs.validationSummary.innerHTML = `<strong>Vista previa de validación</strong><span>${message}</span>`;
    return;
  }
  const title = result.status === "error" ? "Validación con observaciones" : "Archivo validado";
  const description = result.status === "error" ? (result.issues?.length ? "Corrige las observaciones antes de guardar la fuente." : message) : "La estructura y los registros cumplen las reglas configuradas.";
  const metrics = `<div class="validation-metrics"><span><b>${result.processed}</b> procesados</span><span><b>${result.accepted}</b> aceptados</span><span><b>${result.observed}</b> observaciones</span></div>`;
  const detail = result.issues?.length ? `<div class="validation-detail"><strong>Detalle</strong><div class="detail-table-wrap"><table class="table align-middle mb-0 ssee-table"><thead><tr><th>Registro</th><th>Campo</th><th>Valor</th><th>Motivo</th></tr></thead><tbody>${result.issues.map((issue) => `<tr><td>${escapeHtml(issue.record)}</td><td>${escapeHtml(issue.field)}</td><td>${escapeHtml(issue.value)}</td><td>${escapeHtml(issue.reason)}</td></tr>`).join("")}</tbody></table></div></div>` : "";
  const report = result.issues?.length ? `<button type="button" class="btn btn-outline-ssee button button-secondary" id="downloadReportBtn"><i class="fa-solid fa-download icon" aria-hidden="true"></i>Descargar</button>` : "";
  refs.validationSummary.innerHTML = `<strong>${title}</strong><span>${description}</span>${metrics}${detail}${report}`;
  document.getElementById("downloadReportBtn")?.addEventListener("click", downloadValidationReport);
}

async function registerFile(file) {
  if (!file) return;
  state.draft.fileName = file.name;
  refs.fileName.textContent = `${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB)`;
  const extensionValid = /\.(xlsx|xls|csv)$/i.test(file.name);
  const sizeValid = file.size <= 10 * 1024 * 1024;
  if (!extensionValid || !sizeValid) {
    state.draft.fileValid = false;
    state.draft.massValidation = { status: "error", processed: 0, accepted: 0, observed: 0, issues: [] };
    renderValidationSummary(extensionValid ? "El archivo supera el tamaño máximo de 10 MB." : "Usa un archivo Excel o CSV.");
    state.dirty = true;
    return;
  }
  let result;
  if (/\.csv$/i.test(file.name)) {
    result = validateCsv(await file.text());
  } else if (window.XLSX) {
    try {
      const workbook = window.XLSX.read(await file.arrayBuffer(), { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
      result = validateRows((rows.shift() || []).map(String), rows);
    } catch (error) {
      result = { processed: 0, accepted: 0, observed: 1, issues: [{ record: "Archivo", field: "Formato", value: file.name, reason: "No se pudo leer el archivo Excel." }] };
    }
  } else {
    result = { processed: 0, accepted: 0, observed: 1, issues: [{ record: "Archivo", field: "Formato", value: file.name, reason: "No está disponible el lector de archivos Excel." }] };
  }
  result.status = result.observed ? "error" : "success";
  state.draft.massValidation = result;
  state.draft.fileValid = result.observed === 0;
  renderValidationSummary();
  state.dirty = true;
}


/* source: gio-ref-001-fuentes/js/main.js */







const $ = (id) => document.getElementById(id);

function showStep(step) {
  setWizardStep(step);
  updateWizardFooter();
}

function requestWizardStep(step) {
  if (step === state.step) return;
  if (state.editingIndex !== null && state.dirty) {
    if (!validateStep(state.step)) { showToast(getMessage("M12"), "warning"); return; }
    state.pendingWizardStep = step;
    openConfirmModal("confirmModal", getMessage("M70"));
    return;
  }
  if (state.editingIndex === null && step > state.step) {
    for (let current = state.step; current < step; current += 1) {
      if (!validateStep(current)) { showToast(getMessage("M12"), "warning"); return; }
    }
  }
  showStep(step);
}

function markFormDirty() {
  state.dirty = true;
}

function rejectWizardStepChange() {
  if (state.pendingWizardStep === null) return;
  state.pendingWizardStep = null;
  closeConfirmModal("confirmModal");
}

refs.filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
  showToast(getPrototypeMessage("filtersApplied"), "info");
});
$("filterToggle").addEventListener("click", () => {
  const expanded = refs.filterForm.classList.toggle("is-expanded");
  $("filterToggle").setAttribute("aria-expanded", String(expanded));
  $("filterToggle").setAttribute("aria-label", expanded ? "Cerrar filtros" : "Abrir filtros");
});
$("clearBtn").addEventListener("click", () => {
  refs.filterQuery.value = "";
  document.getElementById("filterDescription").value = "";
  refs.filterOrigin.value = "Todos";
  refs.filterStatus.value = "Todos";
  document.getElementById("filterRecords").value = "Todos";
  applyFilters();
  showToast(getPrototypeMessage("filtersCleared"), "info");
});
$("newSourceBtn").addEventListener("click", () => {
  state.editingIndex = null;
  createDraft();
  showForm();
  updateWizardFooter();
});
$("cancelBtn").addEventListener("click", requestCancel);
$("backBtn").addEventListener("click", () => requestWizardStep(Math.max(1, state.step - 1)));
$("saveStepBtn").addEventListener("click", requestSaveStep);
$("continueBtn").addEventListener("click", () => {
  if (!validateStep()) { showToast(getMessage("M12"), "warning"); return; }
  requestWizardStep(Math.min(4, state.step + 1));
});
$("completeBtn").addEventListener("click", () => state.editingIndex !== null ? requestSaveStep() : requestComplete());
$("sourceForm").addEventListener("input", (event) => {
  if (event.target.matches("#sourceName, #sourceDescription")) updateGeneralDraft();
  if (event.target.matches("[data-field]")) updateDraftField(Number(event.target.dataset.index), event.target.dataset.field, event.target.value);
  markFormDirty();
});
$("sourceForm").addEventListener("change", (event) => {
  if (event.target.matches("#sourceOrigin, #sourceSystem, [data-usage]")) {
    updateGeneralDraft();
    if (event.target.id === "sourceOrigin") syncGeneralFields();
  }
  if (event.target.matches("[data-field]")) updateDraftField(Number(event.target.dataset.index), event.target.dataset.field, event.target.type === "checkbox" ? event.target.checked : event.target.value);
  if (event.target.matches("[name='keyType']")) setKeyType(event.target.value);
  if (event.target.matches("#fileInput")) registerFile(event.target.files[0]);
  markFormDirty();
});
$("sourceStatusSwitch").addEventListener("change", (event) => {
  const next = event.target.checked ? "Activo" : "Inactivo";
  event.target.checked = !event.target.checked;
  state.pendingStatus = { index: state.editingIndex, next };
  openConfirmModal("confirmModal", `${getMessage(next === "Activo" ? "M5" : "M6")} ${state.draft?.name || "esta fuente"}?`, { requireReason: next === "Inactivo" });
});
refs.wizardSteps.forEach((button) => button.addEventListener("click", () => requestWizardStep(Number(button.dataset.wizardStep))));
$("addFieldBtn").addEventListener("click", () => { addField(); renderFields(); markFormDirty(); });
refs.fieldsBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-field]");
  if (!button) return;
  deleteField(Number(button.dataset.deleteField));
  renderFields();
  renderKeyFields();
});
$("addKeyFieldBtn").addEventListener("click", () => { addKeyField(); renderKeyFields(); markFormDirty(); });
refs.keyFieldsList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-key]");
  if (!button) return;
  removeKeyField(Number(button.dataset.removeKey));
  renderKeyFields();
});
refs.loadCards.forEach((card) => card.addEventListener("click", () => { selectLoadMode(card.dataset.loadMode); updateLoadMode(); }));
$("downloadTemplateBtn").addEventListener("click", () => { downloadTemplate(); showToast(getMessage("M58"), "success"); });
$("addManualRecord").addEventListener("click", () => {
  state.manualRecords.push({ code: `000${state.manualRecords.length + 123}`, dni: `712345${state.manualRecords.length + 69}`, name: "Nuevo registro", date: "01/01/2012", sex: "Sin especificar", grade: "Pendiente", enrollment: "Pendiente" });
  renderManualRecords();
  markFormDirty();
});
refs.manualBody.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-record]");
  if (editButton) {
    beginManualRecordEdit(Number(editButton.dataset.editRecord));
    return;
  }
  const saveButton = event.target.closest("[data-save-record]");
  if (saveButton) {
    if (!saveManualRecord(Number(saveButton.dataset.saveRecord))) showToast(getMessage("M12"), "warning");
    return;
  }
  const cancelButton = event.target.closest("[data-cancel-record]");
  if (cancelButton) {
    cancelManualRecordEdit();
    return;
  }
  const button = event.target.closest("[data-delete-record]");
  if (!button) return;
  state.manualRecords.splice(Number(button.dataset.deleteRecord), 1);
  renderManualRecords();
  markFormDirty();
});
refs.manualBody.addEventListener("input", (event) => {
  const input = event.target.closest("[data-manual-field]");
  if (!input) return;
  updateManualRecordValue(Number(input.dataset.index), input.dataset.manualField, input.value);
});
document.querySelectorAll("[data-sort]").forEach((button) => button.addEventListener("click", () => handleSort(button.dataset.sort)));
refs.sourcesBody.addEventListener("click", handleAction);
$("exportBtn").addEventListener("click", () => { exportSources(); showToast(getMessage("M67"), "success"); });
$("confirmBtn").addEventListener("click", confirmPendingAction);
refs.confirmModal.querySelector(".modal-footer [data-bs-dismiss='modal']").addEventListener("click", rejectWizardStepChange);
$("confirmModal").addEventListener("hidden.bs.modal", () => { state.pendingAction = null; state.pendingCancel = false; state.pendingStatus = null; state.pendingWizardStep = null; });
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) document.querySelectorAll("[data-menu-panel]").forEach((panel) => { panel.hidden = true; }); });

renderManualRecords();
renderSources();
updateWizardFooter();
