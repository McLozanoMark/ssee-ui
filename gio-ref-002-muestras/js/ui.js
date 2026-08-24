import { renderToast, enableTooltips, closeMenus } from "../../design-system/interaction.js";
import { state } from "./state.js";

export const refs = {
  listView: document.getElementById("listView"), formView: document.getElementById("formView"), filterForm: document.getElementById("filterForm"), samplesBody: document.getElementById("samplesBody"), emptyState: document.getElementById("emptyState"), pageSummary: document.getElementById("pageSummary"), sampleCount: document.getElementById("sampleCount"), toast: document.getElementById("toast"), filterQuery: document.getElementById("filterQuery"), filterStatus: document.getElementById("filterStatus"), filterPeriod: document.getElementById("filterPeriod"), filterIntervention: document.getElementById("filterIntervention"), sampleName: document.getElementById("sampleName"), sampleDescription: document.getElementById("sampleDescription"), sampleSource: document.getElementById("sampleSource"), sampleInstrument: document.getElementById("sampleInstrument"), sampleIntervention: document.getElementById("sampleIntervention"), samplePeriod: document.getElementById("samplePeriod"), nameError: document.getElementById("nameError"), descriptionError: document.getElementById("descriptionError"), formTitle: document.getElementById("formTitle"), formBreadcrumb: document.getElementById("formBreadcrumb"), wizardSteps: [...document.querySelectorAll("[data-wizard-step]")], wizardPanels: [...document.querySelectorAll("[data-wizard-panel]")], confirmModal: document.getElementById("confirmModal")
};

export function showToast(message, type = "info") { renderToast(refs.toast, message, type); }
export function showList() { refs.listView.classList.add("is-active"); refs.formView.classList.remove("is-active"); }
export function showForm(sample = null) {
  refs.listView.classList.remove("is-active");
  refs.formView.classList.add("is-active");
  refs.formTitle.textContent = sample ? "Editar muestra" : "Registrar muestra";
  refs.formBreadcrumb.innerHTML = `<a href="../index.html">Índice de requerimientos</a><span>/</span><span>GIO-REF-002</span><span>/</span><span>Muestras</span><span>/</span><span>${sample ? "Editar muestra" : "Registrar muestra"}</span>`;
  syncFormFields();
  setFormStep(1);
}
export function syncFormFields() {
  const draft = state.draft || {};
  refs.sampleName.value = draft.name || "";
  refs.sampleDescription.value = draft.description || "";
  refs.sampleSource.value = draft.source || "";
  refs.sampleInstrument.value = draft.instrument || "Instrumento de seguimiento";
  refs.sampleIntervention.value = draft.intervention || "";
  refs.samplePeriod.value = draft.period || "";
}
export function updateDraft() {
  if (!state.draft) return;
  Object.assign(state.draft, { name: refs.sampleName.value.trim(), description: refs.sampleDescription.value.trim(), source: refs.sampleSource.value, instrument: refs.sampleInstrument.value, intervention: refs.sampleIntervention.value, period: refs.samplePeriod.value });
  state.dirty = true;
}
export function setFormStep(step) {
  state.step = step;
  refs.wizardSteps.forEach((item) => { const itemStep = Number(item.dataset.wizardStep); item.classList.toggle("is-current", itemStep === step); item.classList.toggle("is-complete", itemStep < step); item.disabled = false; });
  refs.wizardPanels.forEach((panel) => panel.classList.toggle("is-active", Number(panel.dataset.wizardPanel) === step));
  document.getElementById("backBtn").hidden = step === 1;
  document.getElementById("continueBtn").hidden = step === 2;
  document.getElementById("completeBtn").hidden = step !== 2;
  document.getElementById("saveStepBtn").hidden = state.editingIndex === null;
}
export function clearErrors() { refs.nameError.textContent = ""; refs.descriptionError.textContent = ""; }
export { enableTooltips, closeMenus };
