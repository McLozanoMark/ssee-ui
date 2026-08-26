import { sources } from "./data.js";
import { state, createDraft, resetWizard } from "./state.js";
import { refs, initTooltips, showToast, showForm, showList, setWizardStep, syncGeneralFields, updateWizardFooter } from "./ui.js";
import { openConfirmModal, closeConfirmModal } from "../../design-system/interaction.js";
import { getMessage } from "../../design-system/messages.js";

const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

function statusClass(status) {
  return { Activa: "active", Inactiva: "inactive", Anulada: "expired", Borrador: "draft" }[status] || "";
}

function sortValue(source, key) {
  if (key === "records") return Number(String(source.records).replace(/,/g, ""));
  return String(source[key] || "").toLowerCase();
}

export function renderSources() {
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
        <label class="form-check form-switch switch row-state-toggle ${canToggle ? "" : "is-disabled"}" data-on-label="Activa" data-off-label="Inactiva" title="${canToggle ? `${nextAction} fuente` : "No disponible para este estado"}">
          <input class="form-check-input" type="checkbox" data-action="toggle" data-next-state="${nextAction}" data-index="${index}" ${source.status === "Activa" ? "checked" : ""} ${canToggle ? "" : "disabled"} aria-label="${nextAction} ${source.name}">
        </label>
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
  if (event.type === "click" && action.dataset.action === "toggle") return;
  const source = sources[Number(action.dataset.index)];
  if (action.dataset.action === "view") {
    showToast(`${source.name}: ${source.records} registros en estado ${source.status}.`, "info");
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
  if (action.dataset.action === "toggle") {
    if (action.disabled) return;
    state.pendingStatus = { index: sources.indexOf(source), next: source.status === "Activa" ? "Inactiva" : "Activa" };
    action.checked = source.status === "Activa";
    openConfirmModal("confirmModal", `${getMessage(state.pendingStatus.next === "Activa" ? "M5" : "M6")} ${source.name}?`);
  }
}

export function validateStep(step = state.step) {
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
  state.draft.originDetail = refs.sourceOriginDetail.value;
  state.draft.usage = refs.sourceUsage.filter((input) => input.checked).map((input) => input.value);
  state.dirty = true;
}

export function selectLoadMode(mode) {
  state.loadMode = mode;
  state.draft.loadMode = mode;
  state.dirty = true;
}

export function addField() {
  state.draft.fields.push({ name: "", type: "Texto", required: false, description: "" });
  state.dirty = true;
}

export function deleteField(index) {
  const removed = state.draft.fields.splice(index, 1)[0];
  state.draft.keyFields = state.draft.keyFields.filter((field) => field !== removed?.name);
  state.dirty = true;
}

export function addKeyField() {
  const value = refs.keyField.value;
  if (!value || state.draft.keyFields.includes(value)) return;
  if (state.draft.keyType === "simple") state.draft.keyFields = [value];
  else state.draft.keyFields.push(value);
  state.dirty = true;
}

export function removeKeyField(index) {
  state.draft.keyFields.splice(index, 1);
  state.dirty = true;
}

export function setKeyType(value) {
  state.draft.keyType = value;
  if (value === "simple" && state.draft.keyFields.length > 1) state.draft.keyFields = state.draft.keyFields.slice(0, 1);
  state.dirty = true;
}

export function registerFile(file) {
  if (!file) return;
  state.draft.fileName = file.name;
  refs.fileName.textContent = `${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB)`;
  state.dirty = true;
}
