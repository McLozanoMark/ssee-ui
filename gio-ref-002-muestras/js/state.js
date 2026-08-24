import { samples } from "./data.js";
export const state = {
  filteredSamples: [...samples],
  editingIndex: null,
  openMenu: null,
  step: 1,
  dirty: false,
  pendingAction: null,
  pendingCancel: false,
  draft: null
};

export function createDraft(sample = null) {
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

export function resetWizard() {
  state.editingIndex = null;
  state.openMenu = null;
  state.step = 1;
  state.dirty = false;
  state.pendingAction = null;
  state.pendingCancel = false;
  state.draft = null;
}
