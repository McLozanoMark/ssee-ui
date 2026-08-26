import { samples } from "./data.js";
import { state, createDraft } from "./state.js";
import { refs, showForm, showToast, setFormStep, syncFormFields, updateDraft } from "./ui.js";
import { applyFilters, renderSamples, handleAction, validateStep, requestSaveStep, requestComplete, requestCancel, confirmPendingAction } from "./samples.js";
import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { openConfirmModal, closeConfirmModal } from "../../design-system/interaction.js";

const $ = (id) => document.getElementById(id);
function moveStep(step) { setFormStep(step); }

function discardSampleChanges() {
  const sample = state.editingIndex === null ? null : samples[state.editingIndex];
  if (!sample) return;
  createDraft(sample);
  syncFormFields();
}

function rejectWizardStepChange() {
  if (state.pendingWizardStep === null) return;
  const targetStep = state.pendingWizardStep;
  state.pendingWizardStep = null;
  discardSampleChanges();
  closeConfirmModal("confirmModal");
  moveStep(targetStep);
}

function requestWizardStep(step) {
  if (step === state.step) return;
  if (state.editingIndex !== null && state.dirty) {
    updateDraft();
    if (!validateStep(state.step)) { showToast(getMessage("M12"), "warning"); return; }
    state.pendingWizardStep = step;
    openConfirmModal("confirmModal", getMessage("M70"));
    return;
  }
  if (state.editingIndex === null && step > state.step && !validateStep(state.step)) { showToast(getMessage("M12"), "warning"); return; }
  moveStep(step);
}
refs.filterForm.addEventListener("submit", (event) => { event.preventDefault(); applyFilters(); showToast(getPrototypeMessage("filtersApplied"), "info"); });
$("filterToggle").addEventListener("click", () => { const expanded = refs.filterForm.classList.toggle("is-expanded"); $("filterToggle").setAttribute("aria-expanded", String(expanded)); $("filterToggle").setAttribute("aria-label", expanded ? "Cerrar filtros" : "Abrir filtros"); });
$("clearBtn").addEventListener("click", () => { refs.filterQuery.value = ""; $("filterId").value = ""; $("filterDescription").value = ""; $("filterSource").value = ""; refs.filterStatus.value = "Todos"; refs.filterPeriod.value = "Todos"; refs.filterIntervention.value = "Todos"; $("filterUnits").value = "Todos"; applyFilters(); showToast(getPrototypeMessage("filtersCleared"), "info"); });
$("newSampleBtn").addEventListener("click", () => { state.editingIndex = null; createDraft(); showForm(); });
$("cancelBtn").addEventListener("click", requestCancel);
$("backBtn").addEventListener("click", () => requestWizardStep(1));
$("saveStepBtn").addEventListener("click", requestSaveStep);
$("continueBtn").addEventListener("click", () => { updateDraft(); if (!validateStep()) { showToast(getMessage("M12"), "warning"); return; } requestWizardStep(2); });
$("completeBtn").addEventListener("click", () => state.editingIndex !== null ? requestSaveStep() : requestComplete());
$("sampleForm").addEventListener("input", updateDraft);
$("sampleForm").addEventListener("change", updateDraft);
refs.wizardSteps.forEach((button) => button.addEventListener("click", () => requestWizardStep(Number(button.dataset.wizardStep))));
refs.samplesBody.addEventListener("click", handleAction);
$("exportBtn").addEventListener("click", () => showToast(getMessage("M67"), "success"));
$("confirmBtn").addEventListener("click", confirmPendingAction);
refs.confirmModal.querySelector(".modal-footer [data-bs-dismiss='modal']").addEventListener("click", rejectWizardStepChange);
$("confirmModal").addEventListener("hidden.bs.modal", () => { state.pendingAction = null; state.pendingCancel = false; state.pendingWizardStep = null; });
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) document.querySelectorAll("[data-menu-panel]").forEach((panel) => { panel.hidden = true; }); });
renderSamples();
