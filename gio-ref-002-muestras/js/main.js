import { state, createDraft } from "./state.js";
import { refs, showForm, showToast, setFormStep, updateDraft } from "./ui.js";
import { applyFilters, renderSamples, handleAction, validateStep, requestSaveStep, requestComplete, requestCancel, confirmPendingAction } from "./samples.js";
import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";

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
