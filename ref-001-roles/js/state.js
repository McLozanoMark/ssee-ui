import { roles } from "./data.js";

export const state = {
  filteredRoles: [...roles],
  editingIndex: null,
  openActionMenu: null,
  pendingStatus: null,
  pendingEditStatus: null,
  pendingSave: false,
  pendingSaveStep: null,
  pendingCancel: false
};

export function resetEditingState() {
  state.editingIndex = null;
  state.openActionMenu = null;
  state.pendingStatus = null;
  state.pendingEditStatus = null;
  state.pendingSave = false;
  state.pendingSaveStep = null;
  state.pendingCancel = false;
}
