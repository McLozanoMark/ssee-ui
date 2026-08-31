import { operations } from "./data.js";
import { state } from "./state.js";
import { refs } from "./ui.js";

function descendants(rowId) {
  const result = [];
  const queue = [rowId];
  while (queue.length) {
    const parentId = queue.shift();
    state.permissionRows
      .filter((row) => row.parentId === parentId)
      .forEach((child) => { result.push(child); queue.push(child.id); });
  }
  return result;
}

function rowById(rowId) {
  return state.permissionRows.find((row) => row.id === rowId);
}

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

export function isDisabled(row, operation) {
  return row.unavailable.includes(operation) || (operation !== "Consultar" && !row.checks.Consultar);
}

export function handlePermissionChange(rowId, operation, checked) {
  const source = rowById(rowId);
  if (!source || source.unavailable.includes(operation)) return;
  setRowOperation(source, operation, checked);
  descendants(rowId).forEach((child) => setRowOperation(child, operation, checked));
  state.permissionDirty = true;
}

export function renderPermissions() {
  refs.permissionBody.innerHTML = state.permissionRows.map((row) => `
    <tr class="is-${row.type}" data-row-id="${row.id}">
      <td><span class="permission-name level-${row.level}"><i class="fa-solid ${row.type === "functionality" ? "fa-file-lines" : "fa-folder-open"}" aria-hidden="true"></i>${row.name}</span></td>
      ${operations.map((operation) => {
        const disabled = isDisabled(row, operation);
        const unavailable = row.unavailable.includes(operation);
        const title = unavailable ? "Operación no aplicable para esta funcionalidad" : (disabled ? "Selecciona Consultar para habilitar esta operación" : "");
        if (unavailable) return `<td><span class="permission-na" title="${title}" data-bs-toggle="tooltip"><i class="fa-solid fa-ban" aria-hidden="true"></i><span>N/A</span></span></td>`;
        return `<td><input class="form-check-input" type="checkbox" data-row="${row.id}" data-operation="${operation}" ${row.checks[operation] ? "checked" : ""} ${disabled ? "disabled" : ""} aria-label="${operation} en ${row.name}"${title ? ` title="${title}" data-bs-toggle="tooltip"` : ""}></td>`;
      }).join("")}
    </tr>
  `).join("");
  if (window.bootstrap) {
    document.querySelectorAll("[data-bs-toggle='tooltip']").forEach((element) => bootstrap.Tooltip.getOrCreateInstance(element));
  }
}

export function hasSelectedPermission() {
  return state.permissionRows.some((row) => Object.values(row.checks).some(Boolean));
}

export function selectedPermissionLabels() {
  return state.permissionRows
    .filter((row) => row.type === "functionality" && Object.values(row.checks).some(Boolean))
    .slice(0, 2)
    .map((row) => row.name);
}
