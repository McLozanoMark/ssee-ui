import { samples, sourceCatalog, projectCatalog } from "./data.js";

const defaultFields = [
  { name: "Código modular", unique: true, preload: true, informant: false, user: true },
  { name: "Nombre de la institución", unique: false, preload: true, informant: true, user: false },
  { name: "DRE", unique: false, preload: false, informant: false, user: false }
];

export const state = { filteredSamples: [...samples], editingIndex: null, openMenu: null, step: 1, dirty: false, pendingAction: null, pendingStatus: null, pendingCancel: false, pendingWizardStep: null, pendingUnitAction: null, replacementSelection: null, replacementCandidate: null, draft: null };

export function getSourceConfig(name) {
  return sourceCatalog.find((source) => source.name === name) || null;
}

export function getProjectConfig(name) {
  return projectCatalog.find((project) => project.name === name) || null;
}

export function createDraft(sample = null) {
  state.draft = {
    id: sample?.id || null,
    name: sample?.name || "",
    description: sample?.description || "",
    project: sample?.project || "",
    source: sample?.source || "",
    sampleSize: sample?.sampleSize || "",
    population: sample?.population || "0",
    unitTotal: sample?.unitTotal || sample?.sampleSize || "0",
    selectionMethod: sample?.selectionMethod || "Aleatoria",
    fields: sample?.fields?.length ? sample.fields.map((field, index) => ({ informant: false, user: index === 0, ...field })) : defaultFields.map((field) => ({ ...field })),
    units: sample?.unitList?.length ? sample.unitList.map((unit) => ({ ...unit })) : [],
    instruments: sample?.instruments?.length ? [...sample.instruments] : [],
    status: sample?.status || "Activo"
  };
  state.step = 1;
  state.dirty = false;
}

export function resetWizard() { state.editingIndex = null; state.openMenu = null; state.step = 1; state.dirty = false; state.pendingAction = null; state.pendingStatus = null; state.pendingCancel = false; state.pendingWizardStep = null; state.pendingUnitAction = null; state.replacementSelection = null; state.replacementCandidate = null; state.draft = null; }
