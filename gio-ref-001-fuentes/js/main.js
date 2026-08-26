import { sources } from "./data.js";
import { state, createDraft } from "./state.js";
import { refs, showForm, showToast, setWizardStep, syncGeneralFields, renderFields, renderKeyFields, renderManualRecords, updateLoadMode, updateWizardFooter } from "./ui.js";
import { applyFilters, renderSources, handleAction, handleSort, validateStep, requestSaveStep, requestComplete, requestCancel, confirmPendingAction, updateDraftField, updateGeneralDraft, addField, deleteField, addKeyField, removeKeyField, setKeyType, selectLoadMode, registerFile } from "./sources.js";
import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { openConfirmModal, closeConfirmModal } from "../../design-system/interaction.js";

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

function discardSourceChanges() {
  const source = state.editingIndex === null ? null : sources[state.editingIndex];
  if (!source) return;
  createDraft(source);
  state.loadMode = "manual";
  syncGeneralFields();
  renderFields();
  renderKeyFields();
  renderManualRecords();
  updateLoadMode();
  updateWizardFooter();
}

function rejectWizardStepChange() {
  if (state.pendingWizardStep === null) return;
  const targetStep = state.pendingWizardStep;
  state.pendingWizardStep = null;
  discardSourceChanges();
  closeConfirmModal("confirmModal");
  showStep(targetStep);
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
  if (event.target.matches("#sourceOrigin, [data-usage]")) {
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
refs.sourcesBody.addEventListener("change", handleAction);
$("exportBtn").addEventListener("click", () => showToast(getMessage("M67"), "success"));
$("confirmBtn").addEventListener("click", confirmPendingAction);
refs.confirmModal.querySelector(".modal-footer [data-bs-dismiss='modal']").addEventListener("click", rejectWizardStepChange);
$("confirmModal").addEventListener("hidden.bs.modal", () => { state.pendingAction = null; state.pendingCancel = false; state.pendingStatus = null; state.pendingWizardStep = null; });
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) document.querySelectorAll("[data-menu-panel]").forEach((panel) => { panel.hidden = true; }); });

renderManualRecords();
renderSources();
updateWizardFooter();
