import { users } from "./data.js";
import { state } from "./state.js";
import { refs, showDetail, showToast } from "./ui.js";
const availableRoles = ["Administrador USE", "Supervisor de Seguimiento", "Evaluador", "Registrador"];
let roleTarget = null;
let pendingRoles = null;
let pendingStatus = null;
function matchesTray(user) {
  return (
    state.tray === "Todos" ||
    (state.tray === "Pendientes de rol" && !user.roles.length) ||
    (state.tray === "Por vencer" && user.status === "Por vencer")
  );
}
export function applyFilters() {
  const q = document.getElementById("filterName").value.trim().toLowerCase(),
    description = document
      .getElementById("filterDescription")
      .value.trim()
      .toLowerCase(),
    role = document.getElementById("filterRole").value,
    status = document.getElementById("filterStatus").value,
    auth = document.getElementById("filterAuth").value;
  state.filteredUsers = users.filter(
    (user) =>
      matchesTray(user) &&
      (!q ||
        [user.username, user.name, user.email, ...user.roles]
          .join(" ")
          .toLowerCase()
          .includes(q)) &&
      (!description || user.name.toLowerCase().includes(description)) &&
      (role === "Todos" || user.roles.includes(role)) &&
      (status === "Todos" || user.status === status) &&
      (auth === "Todos" || user.auth === auth),
  );
  renderUsers();
}
export function renderUsers() {
  refs.usersBody.innerHTML = state.filteredUsers
    .map((user, index) => {
      const roleTags = user.roles.length
        ? user.roles.map((role) => `<span class="tag">${role}</span>`).join("")
        : '<span class="muted">Pendiente</span>';
      const statusClass =
        user.status === "Por vencer"
          ? "warning"
          : user.status === "Vencido"
            ? "expired"
            : user.status === "Activo"
              ? "active"
              : "inactive";
      const statusControl = `<span class="status ${statusClass}">${user.status}</span>`;
      const canToggleStatus = ["Activo", "Inactivo"].includes(user.status);
      const statusAction = canToggleStatus
        ? `<li><button class="dropdown-item status-action ${user.status === "Activo" ? "status-action-danger" : "status-action-success"}" type="button" data-user="${index}" data-user-action="toggle-status"><i class="fa-solid fa-power-off"></i><span>${user.status === "Inactivo" ? "Activar" : "Inactivar"}</span></button></li>`
        : "";
      return `
      <tr>
        <td><strong>${user.username}</strong></td><td>${user.name}</td><td>${user.email}</td><td>${user.auth}</td>
        <td><div class="user-role-tags">${roleTags}<button class="tag tag-add" type="button" data-role-action="open" data-user="${index}" aria-label="Añadir roles a ${user.name}"><i class="fa-solid fa-plus" aria-hidden="true"></i></button></div></td>
        <td>${statusControl}</td><td>${user.lastAccess}</td>
        <td><div class="dropdown action-menu"><button class="menu-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Acciones de ${user.name}"><i class="fa-solid fa-ellipsis-vertical"></i></button><ul class="dropdown-menu dropdown-menu-end"><li><button class="dropdown-item" type="button" data-user="${index}" data-user-action="detail"><i class="fa-regular fa-eye"></i><span>Ver detalle</span></button></li><li><button class="dropdown-item" type="button" data-user="${index}" data-user-action="edit"><i class="fa-solid fa-pen"></i><span>Editar</span></button></li><li><button class="dropdown-item" type="button" data-user="${index}" data-user-action="roles"><i class="fa-solid fa-user-tag"></i><span>Asignar rol</span></button></li><li><button class="dropdown-item" type="button" data-user="${index}" data-user-action="renew"><i class="fa-solid fa-arrows-rotate"></i><span>Renovar vigencia</span></button></li>${statusAction}</ul></div></td>
      </tr>`;
    })
    .join("");
  refs.emptyState.hidden = state.filteredUsers.length > 0;
  refs.pageSummary.textContent = `Mostrando 1 a ${state.filteredUsers.length} de ${state.filteredUsers.length} registros`;
  refs.userCount.textContent = `${users.length} usuarios registrados`;
}
export function openSelected(index) {
  const user = state.filteredUsers[index];
  if (user) {
    state.selectedUser = user;
    showDetail(user);
  }
}
export function openRoles(index) {
  roleTarget = state.filteredUsers[index];
  if (!roleTarget) return;
  refs.rolesModalContext.textContent = `Selecciona los roles activos de ${roleTarget.name}.`;
  refs.rolePicker.innerHTML = availableRoles.map((role) => `<label class="role-option"><span class="role-avatar">${role.charAt(0)}</span><span class="role-option-name">${role}</span><input type="checkbox" value="${role}" ${roleTarget.roles.includes(role) ? "checked" : ""}></label>`).join("");
  refs.roleModalFeedback.hidden = true;
  bootstrap.Modal.getOrCreateInstance(refs.rolesModal).show();
}
export function saveRoles() {
  if (!roleTarget) return;
  const selected = [...refs.rolePicker.querySelectorAll("input:checked")].map((input) => input.value);
  if (!selected.length) {
    refs.roleModalFeedback.textContent = "El usuario debe conservar al menos un rol activo.";
    refs.roleModalFeedback.hidden = false;
    showToast("Selecciona al menos un rol activo.", "warning");
    return;
  }
  const changed = selected.join("|") !== roleTarget.roles.join("|");
  if (changed) {
    pendingRoles = selected;
    refs.confirmRolesMessage.textContent = `El cambio puede afectar los permisos y el acceso de ${roleTarget.name}. ¿Está seguro de continuar?`;
    bootstrap.Modal.getOrCreateInstance(refs.rolesModal).hide();
    bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
    return;
  }
  applyRoles(selected);
}
export function toggleStatus(index) {
  const user = state.filteredUsers[index];
  if (!user || !["Activo", "Inactivo"].includes(user.status)) return;
  const next = user.status === "Activo" ? "Inactivo" : "Activo";
  pendingStatus = { user, next };
  refs.confirmRolesMessage.textContent = `Vas a ${next === "Inactivo" ? "inactivar" : "activar"} a ${user.name}. Este cambio puede afectar su acceso al sistema. ¿Deseas continuar?`;
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
export function confirmRoles() {
  if (pendingStatus) {
    const { user, next } = pendingStatus;
    user.status = next;
    pendingStatus = null;
    bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).hide();
    renderUsers();
    showToast(`Usuario ${next === "Activo" ? "activado" : "inactivado"} correctamente.`, "success");
    return;
  }
  if (!roleTarget || !pendingRoles) return;
  applyRoles(pendingRoles);
  pendingRoles = null;
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).hide();
}
function applyRoles(selected) {
  roleTarget.roles = selected;
  renderUsers();
  bootstrap.Modal.getOrCreateInstance(refs.rolesModal).hide();
  showToast("Roles actualizados correctamente.", "success");
}
export function exportUsers() {
  showToast("Exportación Excel generada para el prototipo.", "success");
}
