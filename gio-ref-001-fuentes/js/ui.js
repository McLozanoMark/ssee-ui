import { renderToast, enableTooltips } from "../../design-system/interaction.js";
import { state } from "./state.js";

const uiEscapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

export const refs = {
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

export function showToast(message, type = "info") {
  renderToast(refs.toast, message, type);
}

export function initTooltips() {
  enableTooltips();
}

export function showList() {
  refs.listView.classList.add("is-active");
  refs.formView.classList.remove("is-active");
}

export function updateWizardFooter() {
  const editing = state.editingIndex !== null;
  const binaryStatus = ["Activa", "Inactiva"].includes(state.draft?.status);
  const sourceStatusSwitchWrap = document.getElementById("sourceStatusSwitchWrap");
  const sourceStatusLabel = document.getElementById("sourceStatusLabel");
  document.getElementById("backBtn").hidden = state.step === 1;
  document.getElementById("continueBtn").hidden = state.step === 4;
  document.getElementById("completeBtn").hidden = state.step !== 4;
  document.getElementById("saveStepBtn").hidden = !editing;
  document.getElementById("editStatusControl").hidden = !editing;
  sourceStatusSwitchWrap.hidden = !binaryStatus;
  sourceStatusSwitchWrap.dataset.onLabel = "Activa";
  sourceStatusSwitchWrap.dataset.offLabel = "Inactiva";
  sourceStatusLabel.hidden = binaryStatus;
  if (editing && state.draft) {
    document.getElementById("sourceStatusSwitch").checked = state.draft.status === "Activa";
    sourceStatusLabel.className = `status ${binaryStatus ? (state.draft.status === "Activa" ? "active" : "inactive") : (state.draft.status === "Borrador" ? "draft" : "expired")}`;
    sourceStatusLabel.textContent = state.draft.status;
  }
}

export function showForm(source = null) {
  refs.listView.classList.remove("is-active");
  refs.formView.classList.add("is-active");
  refs.formTitle.textContent = source ? "Editar fuente" : "Registrar fuente";
  refs.formBreadcrumb.innerHTML = `<a href="../index.html">Índice de requerimientos</a> / GIO-REF-001 / Fuentes de datos / ${source ? "Editar fuente" : "Registrar fuente"}`;
  refs.sourceForm.reset();
  syncGeneralFields();
  setWizardStep(1);
  updateWizardFooter();
  clearErrors();
}

export function setWizardStep(step) {
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

export function clearErrors() {
  refs.nameError.textContent = "";
  refs.descriptionError.textContent = "";
  refs.originError.textContent = "";
}

export function syncGeneralFields() {
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

export function renderFields() {
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

export function renderKeyFields() {
  const fields = state.draft?.fields || [];
  const selected = state.draft?.keyFields || [];
  refs.keyField.innerHTML = `<option value="">Selecciona un campo</option>${fields.map((field) => `<option value="${uiEscapeHtml(field.name)}">${uiEscapeHtml(field.name)}</option>`).join("")}`;
  refs.keyFieldsList.innerHTML = selected.map((fieldName, index) => `<li><span>${uiEscapeHtml(fieldName)}</span><button type="button" class="table-icon-button" data-remove-key="${index}" aria-label="Quitar ${uiEscapeHtml(fieldName)}"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></li>`).join("");
  refs.keyType.forEach((input) => { input.checked = input.value === state.draft?.keyType; });
}

export function renderManualRecords() {
  refs.manualBody.innerHTML = state.manualRecords.map((record, index) => `<tr><td>${index + 1}</td><td>${record.code}</td><td>${record.dni}</td><td>${record.name}</td><td>${record.date}</td><td>${record.sex}</td><td>${record.grade}</td><td><button type="button" class="table-icon-button" data-edit-record="${index}" aria-label="Editar registro"><i class="fa-solid fa-pen" aria-hidden="true"></i></button><button type="button" class="table-icon-button danger" data-delete-record="${index}" aria-label="Eliminar registro"><i class="fa-solid fa-trash" aria-hidden="true"></i></button></td></tr>`).join("");
}

export function updateLoadMode() {
  refs.loadCards.forEach((card) => card.classList.toggle("is-selected", card.dataset.loadMode === state.loadMode));
  refs.manualPanel.hidden = state.loadMode !== "manual";
  refs.massPanel.hidden = state.loadMode !== "massive";
}
