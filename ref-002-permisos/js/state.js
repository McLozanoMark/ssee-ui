import { permissionRows, roles } from "./data.js";

const cloneRows = () => permissionRows.map((item) => ({ ...item, checks: { ...item.checks } }));

export const state = { selectedRoleId: roles[0].id, rows: cloneRows(), dirty: false, pendingAction: null, query: "" };

export function selectedRole() { return roles.find((role) => role.id === state.selectedRoleId) || roles[0]; }
export function resetDraft() { state.rows = cloneRows(); state.dirty = false; state.pendingAction = null; }
