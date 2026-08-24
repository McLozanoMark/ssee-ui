
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
    status: "Activa",
    updated: "18/08/2026 09:00",
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
    status: "Borrador",
    updated: "17/08/2026 16:45",
    fields: [
      { name: "DNI del director", type: "Texto", required: true, description: "Documento de identidad." },
      { name: "Nombres y apellidos", type: "Texto", required: true, description: "Nombre completo." },
      { name: "Código modular", type: "Texto", required: true, description: "Institución asociada." }
    ],
    keyFields: ["DNI del director"]
  },
  { id: "FDT-003", name: "Operativo piloto", description: "Registro sintético para pruebas del operativo.", origin: "Externa", originDetail: "Manual", usage: ["Generación de fichas"], records: "620", status: "Borrador", updated: "16/08/2026 11:20", fields: [], keyFields: [] },
  { id: "FDT-004", name: "Instituciones 2025", description: "Histórico de instituciones del periodo anterior.", origin: "Externa", originDetail: "Carga masiva", usage: ["Precarga de variables"], records: "11,890", status: "Inactiva", updated: "12/08/2026 10:05", fields: [], keyFields: [] },
  { id: "FDT-005", name: "Registro observado", description: "Fuente anulada luego de la revisión de calidad.", origin: "Externa", originDetail: "Manual", usage: ["Generación de fichas"], records: "0", status: "Anulada", updated: "08/08/2026 14:05", fields: [], keyFields: [] }
];


/* source: gio-ref-001-fuentes/js/state.js */


const state = {
  filteredSources: [...sources],
  selectedIndex: null,
  editingIndex: null,
  pendingStatus: null,
  pendingAction: null,
  pendingCancel: false,
  openMenu: null,
  step: 1,
  sortKey: "id",
  sortDirection: "asc",
  draft: null,
  dirty: false,
  loadMode: "manual",
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
    status: source?.status || "Borrador",
    fields: source?.fields?.length ? source.fields.map((field) => ({ ...field })) : [
      { name: "Código modular", type: "Texto", required: true, description: "Código oficial de la unidad." },
      { name: "DNI del estudiante", type: "Texto", required: true, description: "Documento de identidad." },
      { name: "Nombres y apellidos", type: "Texto", required: true, description: "Nombre completo." }
    ],
    keyType: source?.keyFields?.length > 1 ? "compuesta" : "simple",
    keyFields: source?.keyFields?.length ? [...source.keyFields] : [],
    loadMode: "manual",
    fileName: "",
    records: source?.records || "0"
  };
  state.dirty = false;
}

function resetWizard() {
  state.selectedIndex = null;
  state.editingIndex = null;
  state.pendingStatus = null;
  state.pendingAction = null;
  state.pendingCancel = false;
  state.step = 1;
  state.draft = null;
  state.dirty = false;
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
  sourceOriginDetail: document.getElementById("sourceOriginDetail"),
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
  manualBody: document.getElementById("manualBody"),
  fileName: document.getElementById("fileName"),
  fileInput: document.getElementById("fileInput"),
  validationSummary: document.getElementById("validationSummary"),
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

function showForm(source = null) {
  refs.listView.classList.remove("is-active");
  refs.formView.classList.add("is-active");
  refs.formTitle.textContent = source ? "Editar fuente" : "Registrar fuente";
  refs.formBreadcrumb.innerHTML = `<a href="../index.html">Índice de requerimientos</a> / GIO-REF-001 / Fuentes de datos / ${source ? "Editar fuente" : "Registrar fuente"}`;
  refs.sourceForm.reset();
  syncGeneralFields();
  setWizardStep(1);
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
  refs.sourceOriginDetail.innerHTML = draft.origin === "Interna"
    ? "<option value=\"\">Selecciona el sistema institucional</option><option>NEXUS</option><option>ESCALE</option><option>SIAGIE</option>"
    : "<option value=\"\">Selecciona el tipo de carga</option><option>Manual</option><option>Carga masiva</option>";
  refs.sourceOriginDetail.value = draft.originDetail || "";
  refs.sourceUsage.forEach((input) => { input.checked = draft.usage?.includes(input.value) || false; });
}

function renderFields() {
  const fields = state.draft?.fields || [];
  refs.fieldsBody.innerHTML = fields.map((field, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><input class="form-control form-control-sm" data-field="name" data-index="${index}" value="${uiEscapeHtml(field.name)}" aria-label="Nombre del campo ${index + 1}"></td>
      <td><select class="form-select form-select-sm" data-field="type" data-index="${index}" aria-label="Tipo de dato ${index + 1}">${["Texto", "Número", "Fecha", "Lista"].map((type) => `<option ${field.type === type ? "selected" : ""}>${type}</option>`).join("")}</select></td>
      <td class="text-center"><input class="form-check-input" type="checkbox" data-field="required" data-index="${index}" ${field.required ? "checked" : ""} aria-label="Campo obligatorio ${index + 1}"></td>
      <td><input class="form-control form-control-sm" data-field="description" data-index="${index}" value="${uiEscapeHtml(field.description)}" aria-label="Descripción del campo ${index + 1}"></td>
      <td><button class="table-icon-button danger" type="button" data-delete-field="${index}" aria-label="Eliminar campo ${field.name}" title="Eliminar"><i class="fa-solid fa-trash" aria-hidden="true"></i></button></td>
    </tr>`).join("");
  refs.fieldsCount.textContent = `Total de campos: ${fields.length}`;
}

function renderKeyFields() {
  const fields = state.draft?.fields || [];
  const selected = state.draft?.keyFields || [];
  refs.keyField.innerHTML = `<option value="">Selecciona un campo</option>${fields.map((field) => `<option value="${uiEscapeHtml(field.name)}">${uiEscapeHtml(field.name)}</option>`).join("")}`;
  refs.keyFieldsList.innerHTML = selected.map((fieldName, index) => `<li><span>${uiEscapeHtml(fieldName)}</span><button type="button" class="table-icon-button" data-remove-key="${index}" aria-label="Quitar ${uiEscapeHtml(fieldName)}"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></li>`).join("");
  refs.keyType.forEach((input) => { input.checked = input.value === state.draft?.keyType; });
}

function renderManualRecords() {
  refs.manualBody.innerHTML = state.manualRecords.map((record, index) => `<tr><td>${index + 1}</td><td>${record.code}</td><td>${record.dni}</td><td>${record.name}</td><td>${record.date}</td><td>${record.sex}</td><td>${record.grade}</td><td><button type="button" class="table-icon-button" data-edit-record="${index}" aria-label="Editar registro"><i class="fa-solid fa-pen" aria-hidden="true"></i></button><button type="button" class="table-icon-button danger" data-delete-record="${index}" aria-label="Eliminar registro"><i class="fa-solid fa-trash" aria-hidden="true"></i></button></td></tr>`).join("");
}

function updateLoadMode() {
  refs.loadCards.forEach((card) => card.classList.toggle("is-selected", card.dataset.loadMode === state.loadMode));
  refs.manualPanel.hidden = state.loadMode !== "manual";
  refs.massPanel.hidden = state.loadMode !== "massive";
}


/* source: gio-ref-001-fuentes/js/sources.js */






const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

function statusClass(status) {
  return { Activa: "active", Inactiva: "inactive", Anulada: "expired", Borrador: "draft" }[status] || "";
}

function sortValue(source, key) {
  if (key === "records") return Number(String(source.records).replace(/,/g, ""));
  return String(source[key] || "").toLowerCase();
}

function renderSources() {
  refs.sourcesBody.innerHTML = state.filteredSources.map((source) => {
    const index = sources.indexOf(source);
    const canToggle = ["Activa", "Inactiva"].includes(source.status);
    const nextAction = source.status === "Activa" ? "Inactivar" : "Activar";
    return `<tr>
      <td><strong>${escapeHtml(source.id)}</strong></td>
      <td><strong>${escapeHtml(source.name)}</strong><div class="description">${escapeHtml(source.description)}</div></td>
      <td><span class="origin-tag ${source.origin === "Interna" ? "internal" : "external"}">${escapeHtml(source.origin)}${source.originDetail ? ` · ${escapeHtml(source.originDetail)}` : ""}</span></td>
      <td>${escapeHtml(source.records)}</td>
      <td><span class="status ${statusClass(source.status)}">${escapeHtml(source.status)}</span></td>
      <td><div class="row-actions source-actions">
        <button type="button" class="row-action" data-action="view" data-index="${index}" title="Ver detalle"><i class="fa-regular fa-eye" aria-hidden="true"></i><span>Ver detalle</span></button>
        <button type="button" class="row-action" data-action="edit" data-index="${index}" title="Editar"><i class="fa-solid fa-pen" aria-hidden="true"></i><span>Editar</span></button>
        <button type="button" class="row-action ${canToggle ? "" : "is-disabled"}" data-action="toggle" data-next-state="${nextAction}" data-index="${index}" title="${canToggle ? nextAction : "No disponible para este estado"}" ${canToggle ? "" : "disabled"}><i class="fa-solid fa-power-off" aria-hidden="true"></i><span>${nextAction}</span></button>
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
    const searchable = [source.id, source.name, source.description, source.origin, source.originDetail, source.status].join(" ").toLowerCase();
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
    showToast(`${source.name}: ${source.records} registros en estado ${source.status}.`, "info");
    return;
  }
  if (action.dataset.action === "edit") {
    state.editingIndex = sources.indexOf(source);
    createDraft(source);
    showForm(source);
    return;
  }
  if (action.dataset.action === "toggle") {
    state.pendingStatus = { index: sources.indexOf(source), next: source.status === "Activa" ? "Inactiva" : "Activa" };
    openConfirmModal("confirmModal", `${getMessage(state.pendingStatus.next === "Activa" ? "M5" : "M6")} ${source.name}?`);
  }
}

function validateStep(step = state.step) {
  if (step === 1) {
    state.draft.name = refs.sourceName.value.trim();
    state.draft.description = refs.sourceDescription.value.trim();
    state.draft.origin = refs.sourceOrigin.value;
    state.draft.originDetail = refs.sourceOriginDetail.value;
    state.draft.usage = refs.sourceUsage.filter((input) => input.checked).map((input) => input.value);
    refs.nameError.textContent = state.draft.name ? "" : "Ingresa el nombre de la fuente.";
    refs.descriptionError.textContent = state.draft.description ? "" : "Ingresa la descripción de la fuente.";
    refs.originError.textContent = state.draft.origin && state.draft.originDetail && state.draft.usage.length ? "" : "Completa el origen y selecciona al menos un tipo de uso.";
    return Boolean(state.draft.name && state.draft.description && state.draft.origin && state.draft.originDetail && state.draft.usage.length);
  }
  if (step === 2) {
    const fields = state.draft.fields || [];
    return fields.length > 0 && fields.every((field) => field.name.trim());
  }
  if (step === 3) return state.draft.keyFields.length > 0;
  if (step === 4) return state.loadMode === "manual" || Boolean(state.draft.fileName);
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
    updated: "21/08/2026 12:00"
  });
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
    sources[index].status = next;
    sources[index].updated = "21/08/2026 12:00";
    if (state.editingIndex === index && state.draft) {
      state.draft.status = next;
      document.getElementById("sourceStatusSwitch").checked = next === "Activa";
      document.getElementById("sourceStatusLabel").textContent = next;
    }
    state.pendingStatus = null;
    closeConfirmModal("confirmModal");
    applyFilters();
    showToast(getMessage(next === "Activa" ? "M7" : "M8"), "success");
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
    const payload = {
      id: state.editingIndex === null ? `FDT-${String(sources.length + 1).padStart(3, "0")}` : sources[state.editingIndex].id,
      name: state.draft.name,
      description: state.draft.description,
      origin: state.draft.origin,
      originDetail: state.draft.originDetail,
      usage: [...state.draft.usage],
      records: state.loadMode === "manual" ? String(state.manualRecords.length) : "12,458",
      status: state.editingIndex === null ? "Borrador" : state.draft.status,
      updated: "21/08/2026 12:00",
      fields: state.draft.fields.map((field) => ({ ...field })),
      keyFields: [...state.draft.keyFields]
    };
    if (state.editingIndex === null) sources.unshift(payload); else sources[state.editingIndex] = payload;
    closeConfirmModal("confirmModal");
    resetWizard();
    applyFilters();
    showList();
    showToast(getMessage(wasEditing ? "M3" : "M2"), "success");
  }
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
  state.draft.originDetail = refs.sourceOriginDetail.value;
  state.draft.usage = refs.sourceUsage.filter((input) => input.checked).map((input) => input.value);
  state.dirty = true;
}

function selectLoadMode(mode) {
  state.loadMode = mode;
  state.draft.loadMode = mode;
  state.dirty = true;
}

function addField() {
  state.draft.fields.push({ name: "", type: "Texto", required: false, description: "" });
  state.dirty = true;
}

function deleteField(index) {
  const removed = state.draft.fields.splice(index, 1)[0];
  state.draft.keyFields = state.draft.keyFields.filter((field) => field !== removed?.name);
  state.dirty = true;
}

function addKeyField() {
  const value = refs.keyField.value;
  if (!value || state.draft.keyFields.includes(value)) return;
  if (state.draft.keyType === "simple") state.draft.keyFields = [value];
  else state.draft.keyFields.push(value);
  state.dirty = true;
}

function removeKeyField(index) {
  state.draft.keyFields.splice(index, 1);
  state.dirty = true;
}

function setKeyType(value) {
  state.draft.keyType = value;
  if (value === "simple" && state.draft.keyFields.length > 1) state.draft.keyFields = state.draft.keyFields.slice(0, 1);
  state.dirty = true;
}

function registerFile(file) {
  if (!file) return;
  state.draft.fileName = file.name;
  refs.fileName.textContent = `${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB)`;
  state.dirty = true;
}


/* source: gio-ref-001-fuentes/js/main.js */






const $ = (id) => document.getElementById(id);

function updateFooter() {
  const editing = state.editingIndex !== null;
  $("backBtn").hidden = state.step === 1;
  $("continueBtn").hidden = state.step === 4;
  $("completeBtn").hidden = state.step !== 4;
  $("saveStepBtn").hidden = !editing;
  $("editStatusControl").hidden = !editing;
  if (editing && state.draft) {
    $("sourceStatusSwitch").checked = state.draft.status === "Activa";
    $("sourceStatusLabel").textContent = state.draft.status;
  }
}

function showStep(step) {
  setWizardStep(step);
  updateFooter();
}

function markFormDirty() {
  state.dirty = true;
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
  updateFooter();
});
$("cancelBtn").addEventListener("click", requestCancel);
$("backBtn").addEventListener("click", () => showStep(Math.max(1, state.step - 1)));
$("saveStepBtn").addEventListener("click", requestSaveStep);
$("continueBtn").addEventListener("click", () => {
  if (!validateStep()) { showToast(getMessage("M12"), "warning"); return; }
  showStep(Math.min(4, state.step + 1));
});
$("completeBtn").addEventListener("click", requestComplete);
$("sourceForm").addEventListener("input", (event) => {
  if (event.target.matches("#sourceName, #sourceDescription")) updateGeneralDraft();
  if (event.target.matches("[data-field]")) updateDraftField(Number(event.target.dataset.index), event.target.dataset.field, event.target.value);
  markFormDirty();
});
$("sourceForm").addEventListener("change", (event) => {
  if (event.target.matches("#sourceOrigin, #sourceOriginDetail, [data-usage]")) {
    updateGeneralDraft();
    if (event.target.id === "sourceOrigin") syncGeneralFields();
  }
  if (event.target.matches("[data-field]")) updateDraftField(Number(event.target.dataset.index), event.target.dataset.field, event.target.type === "checkbox" ? event.target.checked : event.target.value);
  if (event.target.matches("[name='keyType']")) setKeyType(event.target.value);
  if (event.target.matches("#fileInput")) registerFile(event.target.files[0]);
  markFormDirty();
});
$("sourceStatusSwitch").addEventListener("change", (event) => {
  const next = event.target.checked ? "Activa" : "Inactiva";
  event.target.checked = !event.target.checked;
  state.pendingStatus = { index: state.editingIndex, next };
  openConfirmModal("confirmModal", `${getMessage(next === "Activa" ? "M5" : "M6")} ${state.draft?.name || "esta fuente"}?`);
});
refs.wizardSteps.forEach((button) => button.addEventListener("click", () => {
  const step = Number(button.dataset.wizardStep);
  if (step > state.step) {
    for (let current = state.step; current < step; current += 1) {
      if (!validateStep(current)) { showToast(getMessage("M12"), "warning"); return; }
    }
  }
  showStep(step);
}));
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
$("downloadTemplateBtn").addEventListener("click", () => showToast(getMessage("M58"), "success"));
$("addManualRecord").addEventListener("click", () => {
  state.manualRecords.push({ code: `000${state.manualRecords.length + 123}`, dni: `712345${state.manualRecords.length + 69}`, name: "Nuevo registro", date: "01/01/2012", sex: "Sin especificar", grade: "Pendiente", enrollment: "Pendiente" });
  renderManualRecords();
  markFormDirty();
});
refs.manualBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-record]");
  if (!button) return;
  state.manualRecords.splice(Number(button.dataset.deleteRecord), 1);
  renderManualRecords();
  markFormDirty();
});
document.querySelectorAll("[data-sort]").forEach((button) => button.addEventListener("click", () => handleSort(button.dataset.sort)));
refs.sourcesBody.addEventListener("click", handleAction);
$("exportBtn").addEventListener("click", () => showToast(getMessage("M67"), "success"));
$("confirmBtn").addEventListener("click", confirmPendingAction);
$("confirmModal").addEventListener("hidden.bs.modal", () => { state.pendingAction = null; state.pendingCancel = false; state.pendingStatus = null; });
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) document.querySelectorAll("[data-menu-panel]").forEach((panel) => { panel.hidden = true; }); });

renderManualRecords();
renderSources();
updateFooter();
