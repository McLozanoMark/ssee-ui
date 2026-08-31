import { enableTooltips, renderToast } from "../../design-system/interaction.js";
import { operations } from "./data.js";
import { state, selectedRole } from "./state.js";
import { isDisabled, visibleRows } from "./permissions.js";

export const refs = { roleSelect: document.getElementById("roleSelect"), roleDescription: document.getElementById("roleDescription"), roleStatus: document.getElementById("roleStatus"), permissionBody: document.getElementById("permissionBody"), matrixSearch: document.getElementById("matrixSearch"), toast: document.getElementById("toast"), confirmModal: document.getElementById("confirmModal") };

export function renderRoleContext(roles) {
  refs.roleSelect.innerHTML = roles.map((role) => `<option value="${role.id}">${role.name}</option>`).join("");
  refs.roleSelect.value = state.selectedRoleId;
  const role = selectedRole();
  refs.roleDescription.textContent = role.description;
  refs.roleStatus.textContent = role.status;
  refs.roleStatus.className = `status ${role.status === "Activo" ? "active" : "inactive"}`;
}

export function renderPermissions() {
  refs.permissionBody.innerHTML = visibleRows().map((row) => `
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
  enableTooltips();
}

export function showToast(message, type = "info") { renderToast(refs.toast, message, type); }
