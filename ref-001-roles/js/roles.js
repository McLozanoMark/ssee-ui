import { roles } from "./data.js";
import { state } from "./state.js";
import { refs, closeActionMenus, enableTooltips, showToast } from "./ui.js";
import { getMessage } from "../../design-system/messages.js";
import { openConfirmModal, closeConfirmModal, getConfirmReason, validateConfirmReason } from "../../design-system/interaction.js";
import { toDateInputValue } from "../../design-system/date-range.js";

export function renderRoles() {
  refs.rolesBody.innerHTML = state.filteredRoles.map((role) => {
    const originalIndex = roles.findIndex((item) => item.name === role.name);
    const tooltip = role.permissionDetails.length
      ? ` data-bs-toggle="tooltip" data-bs-title="${role.permissionDetails.join(", ")}"`
      : "";
    const permissionTags = role.permissions.map((permission, index) => {
      const isMore = index > 1;
      return `<span class="tag ${isMore ? "more" : ""}"${isMore ? tooltip : ""}>${permission}</span>`;
    }).join("");

    return `
      <tr>
        <td>${originalIndex + 1}</td>
        <td><strong>${role.name}</strong></td>
        <td><div class="description">${role.description}</div></td>
        <td><div class="tags">${permissionTags}</div></td>
        <td><span class="users-count"><i class="fa-regular fa-user user-icon" aria-hidden="true"></i>${role.users}</span></td>
        <td><span class="status ${role.status === "Activo" ? "active" : "inactive"}">${role.status}</span></td>
        <td>${role.updated}</td>
        <td>
          <div class="row-actions">
            <button type="button" class="row-action" data-action="edit" data-edit="${originalIndex}" aria-label="Editar ${role.name}" title="Editar">
              <i class="fa-solid fa-pen" aria-hidden="true"></i><span>Editar</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  refs.emptyState.textContent = getMessage("M9");
  refs.emptyState.hidden = state.filteredRoles.length > 0;
  refs.pageSummary.textContent = state.filteredRoles.length
    ? `Mostrando 1 a ${state.filteredRoles.length} de ${state.filteredRoles.length} registros`
    : "Mostrando 0 registros";
  refs.roleCount.textContent = `${roles.length} roles registrados`;
  enableTooltips();
}

export function applyFilters() {
  const query = refs.filterName.value.trim().toLowerCase();
  const nameAdvanced = refs.filterNameAdvanced.value;
  const permission = document.getElementById("filterPermission").value;
  const updatedStart = refs.filterUpdatedStart.value;
  const updatedEnd = refs.filterUpdatedEnd.value;
  const status = refs.filterStatus.value;
  state.filteredRoles = roles.filter((role) => {
    const originalIndex = roles.findIndex((item) => item.id === role.id);
    const searchable = [originalIndex + 1, role.name, role.description, role.status, ...role.permissions].join(" ").toLowerCase();
    return searchable.includes(query)
      && (nameAdvanced === "Todos" || role.name === nameAdvanced)
      && (permission === "Todos" || role.permissions.includes(permission))
      && (!updatedStart || toDateInputValue(role.updated) >= updatedStart)
      && (!updatedEnd || toDateInputValue(role.updated) <= updatedEnd)
      && (status === "Todos" || role.status === status);
  });
  renderRoles();
}

export function handleRoleAction(event, onEdit) {
  const editButton = event.target.closest("[data-edit]");
  const menuButton = event.target.closest("[data-menu]");

  if (menuButton) {
    const index = menuButton.dataset.menu;
    const dropdown = refs.rolesBody.querySelector(`[data-dropdown='${index}']`);
    const shouldOpen = state.openActionMenu !== index;
    closeActionMenus();
    if (shouldOpen && dropdown) {
      dropdown.hidden = false;
      menuButton.setAttribute("aria-expanded", "true");
      state.openActionMenu = index;
    }
    return;
  }

  if (editButton) {
    const index = Number(editButton.dataset.edit);
    closeActionMenus();
    onEdit(roles[index], index);
    return;
  }

}

export function handleEditStatusToggle(event) {
  const role = roles[state.editingIndex];
  if (!role) return;
  if (role.users > 0) {
    showToast(getMessage("M15"), "warning");
    event.target.checked = role.status === "Activo";
    return;
  }
  const next = event.target.checked ? "Activo" : "Inactivo";
  refs.editStatusToggles.forEach((toggle) => { toggle.checked = role.status === "Activo"; });
  state.pendingEditStatus = { index: state.editingIndex, next };
  openConfirmModal("confirmModal", getMessage(next === "Activo" ? "M5" : "M6"), { requireReason: next === "Inactivo" });
}

export function confirmStatus() {
  const pending = state.pendingEditStatus;
  if (!pending) return;
  if (pending.next === "Inactivo" && !validateConfirmReason("confirmModal", getMessage("M11"))) return;
  const reason = pending.next === "Inactivo" ? getConfirmReason("confirmModal") : "";
  if (state.pendingEditStatus) {
    const { index, next } = state.pendingEditStatus;
    roles[index].status = next;
    roles[index].updated = "18/08/2026 09:00";
    if (reason) roles[index].inactivationReason = reason;
    state.pendingEditStatus = null;
    refs.editStatusToggles.forEach((toggle) => { toggle.checked = next === "Activo"; });
    refs.editStatusLabels.forEach((label) => { label.textContent = next; });
    closeConfirmModal("confirmModal");
    applyFilters();
    showToast(getMessage(next === "Activo" ? "M7" : "M8"), "success");
    return;
  }
}
