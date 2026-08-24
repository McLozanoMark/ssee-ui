import { operations } from "./data.js";
import { state } from "./state.js";

function descendants(rowId) {
  const result = [];
  const queue = [rowId];
  while (queue.length) {
    const parentId = queue.shift();
    state.rows.filter((row) => row.parentId === parentId).forEach((child) => { result.push(child); queue.push(child.id); });
  }
  return result;
}

function rowById(rowId) { return state.rows.find((row) => row.id === rowId); }

function setRowOperation(row, operation, checked) {
  if (row.unavailable.includes(operation)) return;
  if (operation === "Consultar" && !checked) {
    row.checks.Consultar = false;
    operations.filter((item) => item !== "Consultar").forEach((item) => { row.checks[item] = false; });
    return;
  }
  row.checks[operation] = checked;
  if (checked && operation !== "Consultar") row.checks.Consultar = true;
}

export function isDisabled(row, operation) { return row.unavailable.includes(operation) || (operation !== "Consultar" && !row.checks.Consultar); }

export function handlePermissionChange(rowId, operation, checked) {
  const source = rowById(rowId);
  if (!source || source.unavailable.includes(operation)) return;
  setRowOperation(source, operation, checked);
  descendants(rowId).forEach((child) => setRowOperation(child, operation, checked));
  state.dirty = true;
}

export function visibleRows() {
  const query = state.query.trim().toLowerCase();
  return query ? state.rows.filter((row) => row.name.toLowerCase().includes(query)) : state.rows;
}

export function hasChanges() { return state.dirty; }
export function commitPermissions() { state.dirty = false; }
