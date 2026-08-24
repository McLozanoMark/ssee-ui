
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


/* source: gio-ref-002-muestras/js/data.js */
const samples = [
  { id: "MST-001", name: "Muestra nacional 2026", description: "Muestra principal para seguimiento institucional.", intervention: "Seguimiento", period: "2026", source: "Instituciones educativas", units: "1,250", status: "Publicada", updated: "18/08/2026 09:00" },
  { id: "MST-002", name: "Muestra de directores", description: "Unidades seleccionadas para evaluación de directores.", intervention: "Evaluación", period: "2026", source: "Directores registrados", units: "420", status: "Configurada", updated: "17/08/2026 16:45" },
  { id: "MST-003", name: "Piloto operativo", description: "Configuración sintética para validar reglas de selección.", intervention: "Operativo", period: "2026", source: "Operativo piloto", units: "80", status: "Borrador", updated: "16/08/2026 11:20" },
  { id: "MST-004", name: "Muestra histórica 2025", description: "Muestra cerrada del periodo anterior.", intervention: "Seguimiento", period: "2025", source: "Instituciones 2025", units: "980", status: "Cerrada", updated: "12/08/2026 10:05" },
  { id: "MST-005", name: "Muestra anulada", description: "Configuración anulada por validación de cobertura.", intervention: "Evaluación", period: "2025", source: "Directores registrados", units: "0", status: "Anulada", updated: "08/08/2026 14:05" }
];


/* source: gio-ref-002-muestras/js/state.js */

const state = {
  filteredSamples: [...samples],
  editingIndex: null,
  openMenu: null,
  step: 1,
  dirty: false,
  pendingAction: null,
  pendingCancel: false,
  draft: null
};

function createDraft(sample = null) {
  state.draft = {
    id: sample?.id || null,
    name: sample?.name || "",
    description: sample?.description || "",
    source: sample?.source || "",
    instrument: sample?.instrument || "Instrumento de seguimiento",
    intervention: sample?.intervention || "",
    period: sample?.period || "",
    units: sample?.units || "0",
    status: sample?.status || "Borrador"
  };
  state.step = 1;
  state.dirty = false;
}

function resetWizard() {
  state.editingIndex = null;
  state.openMenu = null;
  state.step = 1;
  state.dirty = false;
  state.pendingAction = null;
  state.pendingCancel = false;
  state.draft = null;
}


/* source: gio-ref-002-muestras/js/ui.js */



const refs = {
  listView: document.getElementById("listView"), formView: document.getElementById("formView"), filterForm: document.getElementById("filterForm"), samplesBody: document.getElementById("samplesBody"), emptyState: document.getElementById("emptyState"), pageSummary: document.getElementById("pageSummary"), sampleCount: document.getElementById("sampleCount"), toast: document.getElementById("toast"), filterQuery: document.getElementById("filterQuery"), filterStatus: document.getElementById("filterStatus"), filterPeriod: document.getElementById("filterPeriod"), filterIntervention: document.getElementById("filterIntervention"), sampleName: document.getElementById("sampleName"), sampleDescription: document.getElementById("sampleDescription"), sampleSource: document.getElementById("sampleSource"), sampleInstrument: document.getElementById("sampleInstrument"), sampleIntervention: document.getElementById("sampleIntervention"), samplePeriod: document.getElementById("samplePeriod"), nameError: document.getElementById("nameError"), descriptionError: document.getElementById("descriptionError"), formTitle: document.getElementById("formTitle"), formBreadcrumb: document.getElementById("formBreadcrumb"), wizardSteps: [...document.querySelectorAll("[data-wizard-step]")], wizardPanels: [...document.querySelectorAll("[data-wizard-panel]")], confirmModal: document.getElementById("confirmModal")
};

function showToast(message, type = "info") { renderToast(refs.toast, message, type); }
function showList() { refs.listView.classList.add("is-active"); refs.formView.classList.remove("is-active"); }
function showForm(sample = null) {
  refs.listView.classList.remove("is-active");
  refs.formView.classList.add("is-active");
  refs.formTitle.textContent = sample ? "Editar muestra" : "Registrar muestra";
  refs.formBreadcrumb.innerHTML = `<a href="../index.html">Índice de requerimientos</a><span>/</span><span>GIO-REF-002</span><span>/</span><span>Muestras</span><span>/</span><span>${sample ? "Editar muestra" : "Registrar muestra"}</span>`;
  syncFormFields();
  setFormStep(1);
}
function syncFormFields() {
  const draft = state.draft || {};
  refs.sampleName.value = draft.name || "";
  refs.sampleDescription.value = draft.description || "";
  refs.sampleSource.value = draft.source || "";
  refs.sampleInstrument.value = draft.instrument || "Instrumento de seguimiento";
  refs.sampleIntervention.value = draft.intervention || "";
  refs.samplePeriod.value = draft.period || "";
}
function updateDraft() {
  if (!state.draft) return;
  Object.assign(state.draft, { name: refs.sampleName.value.trim(), description: refs.sampleDescription.value.trim(), source: refs.sampleSource.value, instrument: refs.sampleInstrument.value, intervention: refs.sampleIntervention.value, period: refs.samplePeriod.value });
  state.dirty = true;
}
function setFormStep(step) {
  state.step = step;
  refs.wizardSteps.forEach((item) => { const itemStep = Number(item.dataset.wizardStep); item.classList.toggle("is-current", itemStep === step); item.classList.toggle("is-complete", itemStep < step); item.disabled = false; });
  refs.wizardPanels.forEach((panel) => panel.classList.toggle("is-active", Number(panel.dataset.wizardPanel) === step));
  document.getElementById("backBtn").hidden = step === 1;
  document.getElementById("continueBtn").hidden = step === 2;
  document.getElementById("completeBtn").hidden = step !== 2;
  document.getElementById("saveStepBtn").hidden = state.editingIndex === null;
}
function clearErrors() { refs.nameError.textContent = ""; refs.descriptionError.textContent = ""; }
{ enableTooltips, closeMenus };


/* source: gio-ref-002-muestras/js/samples.js */






const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
function statusClass(status) { return status === "Publicada" ? "active" : status === "Anulada" ? "expired" : status === "Configurada" ? "draft" : status === "Cerrada" ? "inactive" : ""; }

function renderSamples() {
  refs.samplesBody.innerHTML = state.filteredSamples.map((sample) => {
    const index = samples.indexOf(sample);
    return `<tr><td><strong>${escapeHtml(sample.id)}</strong></td><td><strong>${escapeHtml(sample.name)}</strong><div class="description">${escapeHtml(sample.description)}</div></td><td>${escapeHtml(sample.intervention)}</td><td>${escapeHtml(sample.period)}</td><td>${escapeHtml(sample.source)}</td><td>${escapeHtml(sample.units)}</td><td><span class="status ${statusClass(sample.status)}">${escapeHtml(sample.status)}</span></td><td><div class="row-actions"><button class="row-action" type="button" data-action="view" data-index="${index}" title="Ver detalle"><i class="fa-regular fa-eye" aria-hidden="true"></i><span>Ver detalle</span></button><button class="row-action" type="button" data-action="edit" data-index="${index}" title="Editar"><i class="fa-solid fa-pen" aria-hidden="true"></i><span>Editar</span></button><button class="row-action" type="button" data-action="clone" data-index="${index}" title="Clonar"><i class="fa-regular fa-copy" aria-hidden="true"></i><span>Clonar</span></button></div></td></tr>`;
  }).join("");
  refs.emptyState.hidden = state.filteredSamples.length > 0;
  refs.pageSummary.textContent = state.filteredSamples.length ? `Mostrando 1 a ${state.filteredSamples.length} de ${state.filteredSamples.length} registros` : "Mostrando 0 registros";
  refs.sampleCount.textContent = `${samples.length} muestras registradas`;
  enableTooltips();
}
function applyFilters() { const query = refs.filterQuery.value.trim().toLowerCase(); const id = document.getElementById("filterId").value.trim().toLowerCase(); const description = document.getElementById("filterDescription").value.trim().toLowerCase(); const source = document.getElementById("filterSource").value.trim().toLowerCase(); const status = refs.filterStatus.value; const period = refs.filterPeriod.value; const intervention = refs.filterIntervention.value; const units = document.getElementById("filterUnits").value; state.filteredSamples = samples.filter((sample) => { const searchable = [sample.id, sample.name, sample.description, sample.intervention, sample.period, sample.source, sample.units, sample.status].join(" ").toLowerCase(); const unitCount = Number(String(sample.units).replace(/,/g, "")); const unitsMatch = units === "Todos" || (units === "0" && unitCount === 0) || (units === "1-500" && unitCount >= 1 && unitCount <= 500) || (units === "501-1000" && unitCount > 500 && unitCount <= 1000) || (units === "1000+" && unitCount > 1000); return searchable.includes(query) && sample.id.toLowerCase().includes(id) && sample.description.toLowerCase().includes(description) && sample.source.toLowerCase().includes(source) && (status === "Todos" || sample.status === status) && (period === "Todos" || sample.period === period) && (intervention === "Todos" || sample.intervention === intervention) && unitsMatch; }); renderSamples(); }
function handleAction(event) { const action = event.target.closest("[data-action]"); if (!action) return; const sample = samples[Number(action.dataset.index)]; if (action.dataset.action === "edit") { state.editingIndex = samples.indexOf(sample); state.dirty = false; state.draft = { id: sample.id, name: sample.name, description: sample.description, source: sample.source, instrument: sample.instrument || "Instrumento de seguimiento", intervention: sample.intervention, period: sample.period, units: sample.units, status: sample.status }; showForm(sample); } else if (action.dataset.action === "clone") { samples.unshift({ ...sample, id: `MST-${String(samples.length + 1).padStart(3, "0")}`, name: `${sample.name} - copia`, status: "Borrador", updated: "21/08/2026 09:00" }); applyFilters(); showToast("Muestra clonada como borrador.", "success"); } else { showToast(`${sample.name}: ${sample.units} unidades en estado ${sample.status}.`, "info"); } }
function validateStep(step = state.step) { if (step === 1) { clearErrors(); const validName = refs.sampleName.value.trim(); const validDescription = refs.sampleDescription.value.trim(); refs.nameError.textContent = validName ? "" : "Ingresa el nombre de la muestra."; refs.descriptionError.textContent = validDescription ? "" : "Ingresa la descripción de la muestra."; return Boolean(validName && validDescription && refs.sampleSource.value && refs.sampleIntervention.value && refs.samplePeriod.value); } return true; }
function persistDraft() { const previous = state.editingIndex === null ? null : samples[state.editingIndex]; if (!previous) return; Object.assign(previous, state.draft, { updated: "21/08/2026 09:00" }); state.dirty = false; applyFilters(); }
function requestSaveStep() { updateDraft(); if (!validateStep()) { showToast(getMessage("M12"), "warning"); return; } state.pendingAction = "saveStep"; openConfirmModal("confirmModal", getMessage("M1")); }
function requestComplete() { updateDraft(); if (!validateStep(1)) { showToast(getMessage("M12"), "warning"); return; } state.pendingAction = "complete"; openConfirmModal("confirmModal", getMessage("M1")); }
function requestCancel() { if (!state.dirty) { resetWizard(); showList(); return; } state.pendingCancel = true; openConfirmModal("confirmModal", getMessage("M14")); }
function confirmPendingAction() { if (state.pendingCancel) { closeConfirmModal("confirmModal"); resetWizard(); showList(); return; } if (state.pendingAction === "saveStep") { persistDraft(); state.pendingAction = null; closeConfirmModal("confirmModal"); showToast(getMessage("M3"), "success"); return; } if (state.pendingAction === "complete") { const wasEditing = state.editingIndex !== null; const previous = wasEditing ? samples[state.editingIndex] : null; const payload = { id: previous?.id || `MST-${String(samples.length + 1).padStart(3, "0")}`, name: state.draft.name, description: state.draft.description, source: state.draft.source, instrument: state.draft.instrument, intervention: state.draft.intervention, period: state.draft.period, units: previous?.units || "0", status: previous?.status || "Borrador", updated: "21/08/2026 09:00" }; if (wasEditing) samples[state.editingIndex] = payload; else samples.unshift(payload); state.pendingAction = null; closeConfirmModal("confirmModal"); resetWizard(); applyFilters(); showList(); showToast(getMessage(wasEditing ? "M3" : "M2"), "success"); } }
function updateSampleField() { updateDraft(); }


/* source: gio-ref-002-muestras/js/main.js */





const $ = (id) => document.getElementById(id);
function moveStep(step) { setFormStep(step); }
refs.filterForm.addEventListener("submit", (event) => { event.preventDefault(); applyFilters(); showToast(getPrototypeMessage("filtersApplied"), "info"); });
$("filterToggle").addEventListener("click", () => { const expanded = refs.filterForm.classList.toggle("is-expanded"); $("filterToggle").setAttribute("aria-expanded", String(expanded)); $("filterToggle").setAttribute("aria-label", expanded ? "Cerrar filtros" : "Abrir filtros"); });
$("clearBtn").addEventListener("click", () => { refs.filterQuery.value = ""; $("filterId").value = ""; $("filterDescription").value = ""; $("filterSource").value = ""; refs.filterStatus.value = "Todos"; refs.filterPeriod.value = "Todos"; refs.filterIntervention.value = "Todos"; $("filterUnits").value = "Todos"; applyFilters(); showToast(getPrototypeMessage("filtersCleared"), "info"); });
$("newSampleBtn").addEventListener("click", () => { state.editingIndex = null; createDraft(); showForm(); });
$("cancelBtn").addEventListener("click", requestCancel);
$("backBtn").addEventListener("click", () => moveStep(1));
$("saveStepBtn").addEventListener("click", requestSaveStep);
$("continueBtn").addEventListener("click", () => { updateDraft(); if (!validateStep()) { showToast(getMessage("M12"), "warning"); return; } moveStep(2); });
$("completeBtn").addEventListener("click", requestComplete);
$("sampleForm").addEventListener("input", updateDraft);
$("sampleForm").addEventListener("change", updateDraft);
refs.wizardSteps.forEach((button) => button.addEventListener("click", () => { const step = Number(button.dataset.wizardStep); if (step === 2 && !validateStep()) { showToast(getMessage("M12"), "warning"); return; } moveStep(step); }));
refs.samplesBody.addEventListener("click", handleAction);
$("exportBtn").addEventListener("click", () => showToast(getMessage("M67"), "success"));
$("confirmBtn").addEventListener("click", confirmPendingAction);
$("confirmModal").addEventListener("hidden.bs.modal", () => { state.pendingAction = null; state.pendingCancel = false; });
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) document.querySelectorAll("[data-menu-panel]").forEach((panel) => { panel.hidden = true; }); });
renderSamples();
