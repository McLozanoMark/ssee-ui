import { permissionRows, roles } from "./data.js";

const clonePermissionRows = () => permissionRows.map((row) => ({
  ...row,
  checks: { ...row.checks },
  unavailable: [...row.unavailable]
}));

export const state = {
  filteredRoles: [...roles],
  permissionRows: clonePermissionRows(),
  permissionDirty: false,
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

export function resetPermissionDraft(role = null) {
  state.permissionRows = clonePermissionRows();
  if (!role) {
    state.permissionRows.forEach((row) => {
      Object.keys(row.checks).forEach((operation) => { row.checks[operation] = false; });
    });
  }
  state.permissionDirty = false;
}
