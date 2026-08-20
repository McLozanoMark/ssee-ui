import { roles } from "./data.js";

export const state = {
  filteredRoles: [...roles],
  editingIndex: null,
  openActionMenu: null,
  pendingStatus: null
};

export function resetEditingState() {
  state.editingIndex = null;
  state.openActionMenu = null;
  state.pendingStatus = null;
}
