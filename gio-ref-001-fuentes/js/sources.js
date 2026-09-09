import { sources } from "./data.js";
import { state, createDraft, resetWizard, getManualRecordValue } from "./state.js";
import { refs, initTooltips, showToast, showForm, showList, setWizardStep, syncGeneralFields, updateWizardFooter, renderManualRecords } from "./ui.js";
import { openConfirmModal, closeConfirmModal, getConfirmReason, validateConfirmReason } from "../../design-system/interaction.js";
import { getMessage } from "../../design-system/messages.js";

const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

function showDetail(source) {
  const trace = [
    ["Creada por", source.createdBy || "Administrador"],
    ["Fecha de creación", source.createdAt || "No registrada"],
    ["Última modificación", `${source.updated || "No registrada"} · ${source.updatedBy || "Administrador"}`],
    ["Relaciones", source.relations || "Sin relaciones registradas"]
  ];
  if (source.status === "Inactiva") trace.push(["Inactivada por", source.inactivatedBy || "Administrador"], ["Motivo", source.inactivationReason || "No registrado"]);
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
  return { Activa: "active", Inactiva: "inactive" }[status] || "";
}

function sortValue(source, key) {
  if (key === "records") return Number(String(source.records).replace(/,/g, ""));
  return String(source[key] || "").toLowerCase();
}

function isDateValue(value) {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(value) || /^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isNaN(Date.parse(value));
}

export function validateManualRecords() {
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

export function beginManualRecordEdit(index) {
  state.editingRecordIndex = index;
  state.manualValidation = { status: "idle", issues: [] };
  renderManualRecords();
}

export function updateManualRecordValue(index, fieldName, value) {
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

export function saveManualRecord(index) {
  const result = validateManualRecords();
  const recordHasIssues = result.issues.some((issue) => issue.record === String(index + 1));
  if (recordHasIssues) return false;
  state.editingRecordIndex = null;
  renderManualRecords();
  return true;
}

export function cancelManualRecordEdit() {
  state.editingRecordIndex = null;
  state.manualValidation = { status: "idle", issues: [] };
  renderManualRecords();
}

export function exportSources() {
  const rows = state.filteredSources.map((source) => `<tr><td>${escapeHtml(source.id)}</td><td>${escapeHtml(source.name)}</td><td>${escapeHtml(source.origin)}</td><td>${escapeHtml(source.records)}</td><td>${escapeHtml(source.status)}</td></tr>`).join("");
  const content = `<!doctype html><html><meta charset="utf-8"><table><thead><tr><th>Identificador</th><th>Nombre</th><th>Origen</th><th>Registros</th><th>Estado</th></tr></thead><tbody>${rows}</tbody></table></html>`;
  const blob = new Blob([content], { type: "application/vnd.ms-excel;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "fuentes-de-datos.xls";
  link.click();
  URL.revokeObjectURL(link.href);
}

export function downloadTemplate() {
  const fields = state.draft?.fields || [];
  const headers = fields.map((field) => field.name).join(",");
  const blob = new Blob([`${headers}\n`], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "plantilla-fuente-datos.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

export function renderSources() {
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

export function applyFilters() {
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

export function handleSort(key) {
  if (state.sortKey === key) state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
  else { state.sortKey = key; state.sortDirection = "asc"; }
  document.querySelectorAll("[data-sort]").forEach((button) => {
    button.setAttribute("aria-sort", button.dataset.sort === state.sortKey ? state.sortDirection : "none");
    button.querySelector("i")?.classList.toggle("fa-arrow-up", button.dataset.sort === state.sortKey && state.sortDirection === "asc");
    button.querySelector("i")?.classList.toggle("fa-arrow-down", button.dataset.sort === state.sortKey && state.sortDirection === "desc");
  });
  applyFilters();
}

export function handleAction(event) {
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

export function validateStep(step = state.step) {
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

export function requestSaveStep() {
  if (!validateStep()) { showToast(getMessage("M11"), "warning"); return; }
  state.pendingAction = { type: "saveStep" };
  openConfirmModal("confirmModal", getMessage("M1"));
}

export function requestComplete() {
  if (!validateStep()) { showToast(getMessage("M12"), "warning"); return; }
  state.pendingAction = { type: "complete" };
  openConfirmModal("confirmModal", getMessage("M1"));
}

export function requestCancel() {
  if (!state.dirty) { resetWizard(); showList(); return; }
  state.pendingCancel = true;
  openConfirmModal("confirmModal", getMessage("M14"));
}

export function confirmPendingAction() {
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
    if (next === "Inactiva" && !validateConfirmReason("confirmModal", getMessage("M11"))) return;
    sources[index].status = next;
    sources[index].updated = "21/08/2026 12:00";
    sources[index].updatedBy = "Administrador";
    if (next === "Inactiva") {
      sources[index].inactivationReason = getConfirmReason("confirmModal");
      sources[index].inactivatedBy = "Administrador";
      sources[index].history = [...(sources[index].history || []), { date: "21/08/2026 12:00", action: "Inactivación", user: "Administrador" }];
    }
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
      status: "Activa",
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

export function updateDraftField(index, key, value) {
  if (!state.draft?.fields[index]) return;
  state.draft.fields[index][key] = key === "required" ? Boolean(value) : value;
  state.dirty = true;
}

export function updateGeneralDraft() {
  if (!state.draft) return;
  state.draft.name = refs.sourceName.value.trim();
  state.draft.description = refs.sourceDescription.value.trim();
  state.draft.origin = refs.sourceOrigin.value;
  state.draft.originDetail = refs.sourceSystem.value;
  state.draft.usage = refs.sourceUsage.filter((input) => input.checked).map((input) => input.value);
  state.dirty = true;
}

export function selectLoadMode(mode) {
  state.loadMode = mode;
  state.draft.loadMode = mode;
  state.dirty = true;
}

export function addField() {
  if (state.draft?.structureLocked) return;
  state.draft.fields.push({ name: "", type: "Texto", required: false, description: "" });
  state.dirty = true;
}

export function deleteField(index) {
  if (state.draft?.structureLocked) return;
  const removed = state.draft.fields.splice(index, 1)[0];
  state.draft.keyFields = state.draft.keyFields.filter((field) => field !== removed?.name);
  state.dirty = true;
}

export function addKeyField() {
  if (state.draft?.structureLocked) return;
  const value = refs.keyField.value;
  if (!value || state.draft.keyFields.includes(value)) return;
  if (state.draft.keyType === "simple") state.draft.keyFields = [value];
  else state.draft.keyFields.push(value);
  state.dirty = true;
}

export function removeKeyField(index) {
  if (state.draft?.structureLocked) return;
  state.draft.keyFields.splice(index, 1);
  state.dirty = true;
}

export function setKeyType(value) {
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

export async function registerFile(file) {
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
