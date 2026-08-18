import { roles } from "./data.js";

export const state = {
  filteredRoles: [...roles],
  editingIndex: null,
  openActionMenu: null
};

export function resetEditingState() {
  state.editingIndex = null;
  state.openActionMenu = null;
}
