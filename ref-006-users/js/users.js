import { users } from "./data.js";
import { state } from "./state.js";
import { refs, showDetail, showToast } from "./ui.js";
import { getMessage } from "../../design-system/messages.js";
const availableRoles = ["Administrador USE", "Supervisor de Seguimiento", "Evaluador", "Registrador"];
const availableProjects = ["Operativo 2026", "Evaluación 2026", "Seguimiento 2026"];
const availableSites = ["Unidad de Seguimiento y Evaluación", "Oficina de Operaciones"];
let roleTarget = null;
let pendingRoles = null;
let pendingStatus = null;
let pendingCancel = false;
function matchesTray(user) {
  return (
    state.tray === "Todos" ||
    (state.tray === "Pendientes de rol" && !user.roles.length) ||
    (state.tray === "Sin proyecto" && !user.projects?.length) ||
    (state.tray === "Por vencer" && user.expiresSoon)
  );
}
export function applyFilters() {
  const q = document.getElementById("filterName").value.trim().toLowerCase(),
    username = document.getElementById("filterUsername").value.trim().toLowerCase(),
    description = document
      .getElementById("filterDescription")
      .value.trim()
      .toLowerCase(),
    email = document.getElementById("filterEmail").value.trim().toLowerCase(),
    role = document.getElementById("filterRole").value,
    status = document.getElementById("filterStatus").value,
    auth = document.getElementById("filterAuth").value,
    project = document.getElementById("filterProject").value.trim().toLowerCase(),
    validity = document.getElementById("filterValidity").value,
    lastAccess = document.getElementById("filterLastAccess").value;
  state.filteredUsers = users.filter(
    (user) =>
      matchesTray(user) &&
      (!username || user.username.toLowerCase().includes(username)) &&
      (!q ||
        [user.username, user.name, user.email, user.auth, user.status, user.expires, user.lastAccess, ...user.roles, ...(user.projects || [])]
          .join(" ")
          .toLowerCase()
          .includes(q)) &&
      (!description || user.name.toLowerCase().includes(description)) &&
      (!email || user.email.toLowerCase().includes(email)) &&
      (role === "Todos" || user.roles.includes(role)) &&
      (status === "Todos" || user.status === status) &&
      (auth === "Todos" || user.auth === auth) &&
      (!project || (user.projects || []).join(" ").toLowerCase().includes(project)) &&
      (validity === "Todos"
        || (validity === "Sin vencimiento" && user.expires === "-")
        || (validity === "Por vencer" && user.expiresSoon)
        || (validity === "Vencido" && user.expires !== "-" && !user.expiresSoon)) &&
      (!lastAccess || user.lastAccess.slice(0, 10).split("/").reverse().join("-") === lastAccess),
  );
  renderUsers();
}
export function renderUsers() {
  refs.usersBody.innerHTML = state.filteredUsers
    .map((user, index) => {
      const roleTags = user.roles.length
        ? user.roles.map((role) => `<span class="tag">${role}</span>`).join("")
        : '<span class="muted">Pendiente</span>';
      const statusClass = user.status === "Activo" ? "active" : "inactive";
      const canToggleStatus = ["Documento", "Autoregistro"].includes(user.auth);
      const statusControl = `<span class="status ${statusClass}">${user.status}</span>`;
      const actionMenu = `
        <div class="dropdown action-menu">
          <button class="menu-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Acciones de ${user.name}"><i class="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i></button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><button class="dropdown-item" type="button" data-user="${index}" data-user-action="detail"><i class="fa-regular fa-eye" aria-hidden="true"></i><span>Ver detalle</span></button></li>
            <li><button class="dropdown-item" type="button" data-user="${index}" data-user-action="edit"><i class="fa-solid fa-pen" aria-hidden="true"></i><span>Editar</span></button></li>
            <li><button class="dropdown-item" type="button" data-user="${index}" data-user-action="roles"><i class="fa-solid fa-user-tag" aria-hidden="true"></i><span>Asignar rol</span></button></li>
            <li><button class="dropdown-item" type="button" data-user="${index}" data-user-action="renew"><i class="fa-solid fa-calendar-plus" aria-hidden="true"></i><span>Renovar vigencia</span></button></li>
            <li><div class="dropdown-switch ${canToggleStatus ? "" : "is-disabled"} ${user.status === "Activo" ? "will-deactivate" : "will-activate"}"><span><i class="fa-solid fa-power-off" aria-hidden="true"></i>${user.status === "Activo" ? "Inactivar" : "Activar"}</span><label class="form-check form-switch switch ${canToggleStatus ? "" : "is-disabled"}" title="${canToggleStatus ? "" : "Estado administrado por Passport"}"><input class="form-check-input" type="checkbox" data-user="${index}" data-user-action="toggle-status" ${user.status === "Activo" ? "checked" : ""} ${canToggleStatus ? "" : "disabled"} aria-label="${user.status === "Activo" ? "Inactivar" : "Activar"} ${user.name}"></label></div></li>
          </ul>
        </div>`;
      const projectTags = user.projects?.length
        ? user.projects.map((project) => `<span class="tag">${project}</span>`).join("")
        : '<span class="muted">Pendiente</span>';
      return `
      <tr>
        <td><strong>${user.username}</strong></td><td>${user.name}</td><td>${user.email}</td><td>${user.auth}</td>
        <td><div class="user-role-tags">${roleTags}${["Passport", "Documento"].includes(user.auth) ? `<button class="tag tag-add" type="button" data-role-action="open" data-user="${index}" aria-label="Asignar roles a ${user.name}"><i class="fa-solid fa-plus" aria-hidden="true"></i></button>` : ""}</div></td>
        <td><div class="user-role-tags">${projectTags}</div></td>
        <td>${user.expires}</td><td>${statusControl}</td><td>${user.lastAccess}</td>
        <td>${actionMenu}</td>
      </tr>`;
    })
    .join("");
  refs.emptyState.textContent = getMessage("M9");
  refs.emptyState.hidden = state.filteredUsers.length > 0;
  refs.pageSummary.textContent = state.filteredUsers.length
    ? `Mostrando 1 a ${state.filteredUsers.length} de ${state.filteredUsers.length} registros`
    : "Mostrando 0 registros";
  refs.userCount.textContent = `${users.length} usuarios registrados`;
  document.getElementById("expiringCount").textContent = users.filter((user) => user.expiresSoon).length;
  document.getElementById("noProjectCount").textContent = users.filter((user) => !user.projects?.length).length;
}
export function openSelected(index) {
  const user = state.filteredUsers[index];
  if (user) {
    state.selectedUser = user;
    showDetail(user);
  }
}
export function openRoles(index, mode = "roles") {
  roleTarget = state.filteredUsers[index];
  if (!roleTarget) return;
  const canEditRoles = ["Passport", "Documento"].includes(roleTarget.auth);
  const canEditProjects = canEditRoles;
  const canEditSite = roleTarget.auth === "Documento";
  const canEditValidity = roleTarget.auth === "Documento";
  const canEditAny = canEditRoles || canEditSite || canEditValidity;
  const canToggleStatus = ["Documento", "Autoregistro"].includes(roleTarget.auth);
  refs.rolesModalTitle.textContent = mode === "edit" ? "Editar acceso" : "Asignar roles";
  document.getElementById("saveRolesBtn").textContent = mode === "edit" ? "Guardar" : "Reasignar";
  document.getElementById("saveRolesBtn").hidden = !canEditAny;
  refs.rolesModalContext.textContent = mode === "edit"
    ? `Actualiza los datos permitidos para ${roleTarget.name}.`
    : `Selecciona los roles y proyectos activos de ${roleTarget.name}.`;
  refs.accessEditNote.hidden = canEditAny;
  refs.accessEditNote.textContent = "Para Autoregistro solo está permitida la modificación del estado del usuario.";
  refs.sitePicker.innerHTML = canEditSite ? `<label class="modal-label" for="siteSelect">Sede<select class="form-select" id="siteSelect">${availableSites.map((site) => `<option ${site === roleTarget.site ? "selected" : ""}>${site}</option>`).join("")}</select></label>` : "";
  refs.rolePicker.innerHTML = canEditRoles ? availableRoles.map((role) => `<label class="role-option"><span class="role-avatar">${role.charAt(0)}</span><span class="role-option-name">${role}</span><input type="checkbox" value="${role}" ${roleTarget.roles.includes(role) ? "checked" : ""}></label>`).join("") : "";
  refs.projectPicker.innerHTML = canEditProjects ? `<span class="modal-label-text">Proyectos</span>${availableProjects.map((project) => `<label class="role-option project-option"><span class="role-avatar">${project.charAt(0)}</span><span class="role-option-name">${project}</span><input type="checkbox" value="${project}" ${roleTarget.projects?.includes(project) ? "checked" : ""}></label>`).join("")}` : "";
  refs.validityField.hidden = !canEditValidity;
  refs.validitySelect.value = roleTarget.expires === "-" ? "Sin fecha de vencimiento" : "90 días";
  refs.editUserStatusControl.hidden = !(mode === "edit" && canToggleStatus);
  refs.editUserStatusToggle.checked = roleTarget.status === "Activo";
  refs.roleModalFeedback.hidden = true;
  bootstrap.Modal.getOrCreateInstance(refs.rolesModal).show();
}
export function saveRoles() {
  if (!roleTarget) return;
  if (roleTarget.auth === "Autoregistro") return;
  const selected = [...refs.rolePicker.querySelectorAll("input:checked")].map((input) => input.value);
  const projects = [...refs.projectPicker.querySelectorAll("input:checked")].map((input) => input.value);
  const validity = roleTarget.auth === "Documento" ? refs.validitySelect.value : "Sin fecha de vencimiento";
  const site = roleTarget.auth === "Documento" ? document.getElementById("siteSelect")?.value || roleTarget.site : roleTarget.site;
  if (!selected.length) {
    refs.roleModalFeedback.textContent = "El usuario debe conservar al menos un rol activo.";
    refs.roleModalFeedback.hidden = false;
    showToast(getMessage("M11"), "warning");
    return;
  }
  const currentValidity = roleTarget.expires === "-" ? "Sin fecha de vencimiento" : "90 días";
  const changed = selected.join("|") !== roleTarget.roles.join("|") || projects.join("|") !== (roleTarget.projects || []).join("|") || validity !== currentValidity || site !== roleTarget.site;
  pendingRoles = { roles: selected, projects, validity, site };
  refs.confirmRolesMessage.textContent = changed
    ? `${getMessage("M1")} El cambio puede afectar los permisos y el acceso de ${roleTarget.name}.`
    : `${getMessage("M1")} No se detectaron cambios en el acceso de ${roleTarget.name}.`;
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
export function toggleStatus(index) {
  const user = state.filteredUsers[index];
  if (!user || !["Documento", "Autoregistro"].includes(user.auth) || !["Activo", "Inactivo"].includes(user.status)) return;
  const next = user.status === "Activo" ? "Inactivo" : "Activo";
  pendingStatus = { user, next };
  refs.confirmRolesMessage.textContent = `${getMessage(next === "Activo" ? "M5" : "M6")} ${user.name}?`;
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
export function toggleEditedUserStatus(event) {
  if (!roleTarget || !["Documento", "Autoregistro"].includes(roleTarget.auth)) return;
  const next = event.target.checked ? "Activo" : "Inactivo";
  refs.editUserStatusToggle.checked = roleTarget.status === "Activo";
  pendingStatus = { user: roleTarget, next };
  refs.confirmRolesMessage.textContent = `${getMessage(next === "Activo" ? "M5" : "M6")} ${roleTarget.name}?`;
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
export function cancelRoleEdit() {
  pendingCancel = true;
  refs.confirmRolesMessage.textContent = getMessage("M14");
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
export function confirmRoles() {
  if (pendingCancel) {
    pendingCancel = false;
    pendingRoles = null;
    pendingStatus = null;
    bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).hide();
    bootstrap.Modal.getOrCreateInstance(refs.rolesModal).hide();
    return;
  }
  if (pendingStatus) {
    const { user, next } = pendingStatus;
    user.status = next;
    pendingStatus = null;
    refs.editUserStatusToggle.checked = next === "Activo";
    bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).hide();
    renderUsers();
    showToast(getMessage(next === "Activo" ? "M7" : "M8"), "success");
    return;
  }
  if (!roleTarget || !pendingRoles) return;
  applyRoles(pendingRoles);
  pendingRoles = null;
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).hide();
}
function applyRoles(selected) {
  roleTarget.roles = selected.roles;
  roleTarget.projects = selected.projects;
  roleTarget.site = selected.site;
  roleTarget.expires = selected.validity === "Sin fecha de vencimiento" ? "-" : selected.validity;
  renderUsers();
  bootstrap.Modal.getOrCreateInstance(refs.rolesModal).hide();
  showToast(getMessage("M3"), "success");
}
export function exportUsers() {
  showToast(getMessage("M67"), "success");
}
