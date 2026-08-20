import { permissionRows } from "./data.js";
import { refs } from "./ui.js";

export function renderPermissions() {
  refs.permissionBody.innerHTML = permissionRows.map((row, rowIndex) => {
    const checks = row.checks.map((checked, checkIndex) => `
      <td>${row.level < 3 ? '<span class="permission-scope" aria-label="No aplica">-</span>' : `<input type="checkbox" data-permission="${rowIndex}-${checkIndex}" ${checked ? "checked" : ""} aria-label="${row.name} permiso ${checkIndex + 1}">`}</td>
    `).join("");
    const icon = row.level < 3 ? "fa-folder-open" : "fa-file-lines";
    return `
      <tr>
        <td><span class="permission-name level-${row.level}"><i class="fa-regular ${icon}" aria-hidden="true"></i>${row.name}</span></td>
        ${checks}
      </tr>
    `;
  }).join("");
}

export function hasSelectedPermission() {
  return [...refs.permissionBody.querySelectorAll("input[type='checkbox']")]
    .some((checkbox) => checkbox.checked);
}

export function selectedPermissionLabels() {
  return permissionRows
    .filter((_, rowIndex) => [...refs.permissionBody.querySelectorAll(`[data-permission^='${rowIndex}-']`)]
      .some((checkbox) => checkbox.checked))
    .slice(0, 2)
    .map((row) => row.name);
}
