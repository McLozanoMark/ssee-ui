import { users } from "./data.js";
import { state } from "./state.js";
import { refs, showDetail, showToast } from "./ui.js";
import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
const availableRoles = ["Administrador USE", "Supervisor de Seguimiento", "Evaluador", "Registrador"];
const availableProjects = ["Operativo 2026", "Evaluación 2026", "Seguimiento 2026"];
const availableSites = ["Unidad de Seguimiento y Evaluación", "Oficina de Operaciones"];
let roleTarget = null;
let pendingRoles = null;
let pendingStatus = null;
let pendingRenewal = null;
let reniecTarget = null;
let pendingReniec = null;
let pendingCancel = false;

const reniecRecords = {
  jcastro: { documentNumber: "87654321", name: "Juan Carlos Castro Fernández", birthDate: "12/09/1986" },
  aparedes: { documentNumber: "74125896", name: "Ana María Paredes García", birthDate: "15/04/1988" },
};

function syncValidityState() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  users.forEach((user) => {
    if (user.expires === "-") return;
    const [day, month, year] = user.expires.split("/").map(Number);
    const expiry = new Date(year, month - 1, day);
    const daysRemaining = Math.ceil((expiry - today) / 86400000);
    if (daysRemaining < 0) {
      user.status = "Inactivo";
      user.expiresSoon = false;
    } else {
      user.expiresSoon = daysRemaining <= 30;
    }
  });
}

function calculateExpiry(validity) {
  if (validity === "Sin fecha de vencimiento") return "-";
  const days = validity === "30 días" ? 30 : validity === "90 días" ? 90 : 365;
  const expiry = new Date();
  expiry.setHours(0, 0, 0, 0);
  expiry.setDate(expiry.getDate() + days);
  return expiry.toLocaleDateString("es-PE");
}
function matchesTray(user, tray = state.tray) {
  return (
    tray === "Todos" ||
    (tray === "Pendientes de rol" && !user.roles.length) ||
    (tray === "Sin proyecto" && !user.projects?.length) ||
    (tray === "Por vencer" && user.expiresSoon)
  );
}
export function applyFilters() {
  syncValidityState();
  const tray = document.getElementById("filterTray").value;
  state.tray = tray;
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
      matchesTray(user, tray) &&
      (!username || user.username.toLowerCase().includes(username)) &&
      (!q ||
        [users.indexOf(user) + 1, user.username, user.name, user.email, user.auth, user.status, user.expires, user.lastAccess, ...user.roles, ...(user.projects || [])]
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
        ) &&
      (!lastAccess || user.lastAccess.slice(0, 10).split("/").reverse().join("-") === lastAccess),
  );
  renderUsers();
}
export function renderUsers() {
  syncValidityState();
  const header = refs.usersBody.closest("table")?.querySelector("thead tr");
  if (header && !header.querySelector("[data-column='row-number']")) header.insertAdjacentHTML("afterbegin", '<th data-column="row-number">N.°</th>');
  refs.usersBody.innerHTML = state.filteredUsers
    .map((user, index) => {
      const roleTags = user.roles.length
        ? user.roles.map((role) => `<span class="tag">${role}</span>`).join("")
        : '<span class="muted">Pendiente</span>';
      const statusClass = user.status === "Activo" ? "active" : "inactive";
      const canToggleStatus = ["Documento", "Autoregistro"].includes(user.auth);
      const statusControl = `<span class="status ${statusClass}">${user.status}</span>`;
      const nextStatus = user.status === "Activo" ? "Inactivo" : "Activo";
      const actionMenu = `<div class="row-actions user-actions">
        <button class="row-action" type="button" data-action="view" data-user="${index}" data-user-action="detail" title="Ver detalle">
          <i class="fa-regular fa-eye" aria-hidden="true"></i><span>Ver detalle</span>
        </button>
        <button class="row-action" type="button" data-action="roles" data-user="${index}" data-user-action="roles" title="Asignar">
          <i class="fa-solid fa-user-tag" aria-hidden="true"></i><span>Asignar</span>
        </button>
        <label class="form-check form-switch switch row-state-toggle ${canToggleStatus ? "" : "is-disabled"}" data-user="${index}" data-user-action="toggle-status" data-next-state="${nextStatus}" data-on-label="Activo" data-off-label="Inactivo" title="${canToggleStatus ? nextStatus : "Estado administrado por Passport"}">
          <input class="form-check-input" type="checkbox" ${user.status === "Activo" ? "checked" : ""} ${canToggleStatus ? "" : "disabled"} aria-label="${canToggleStatus ? `${nextStatus} ${user.name}` : `Estado administrado por Passport para ${user.name}`}" />
        </label>
      </div>`;
      const projectTags = user.projects?.length
        ? user.projects.map((project) => `<span class="tag">${project}</span>`).join("")
        : '<span class="muted">Pendiente</span>';
      return `
      <tr>
        <td>${users.indexOf(user) + 1}</td><td><strong>${user.username}</strong></td><td>${user.name}</td><td>${user.email}</td><td>${user.auth}</td>
        <td><div class="user-role-tags">${roleTags}</div></td>
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
  const canEditRoles = true;
  const canEditProjects = true;
  const canEditSite = roleTarget.auth === "Documento";
  const canEditValidity = roleTarget.auth === "Documento";
  const canEditAny = canEditRoles || canEditSite || canEditValidity;
  const canToggleStatus = ["Documento", "Autoregistro"].includes(roleTarget.auth);
  refs.rolesModalTitle.textContent = "Asignar roles";
  document.getElementById("saveRolesBtn").textContent = "Guardar";
  document.getElementById("saveRolesBtn").hidden = !canEditAny;
  refs.rolesModalContext.textContent = mode === "edit"
    ? `Actualiza los datos permitidos para ${roleTarget.name}.`
    : `Selecciona los roles y proyectos activos de ${roleTarget.name}.`;
  refs.accessEditNote.hidden = true;
  refs.sitePicker.innerHTML = canEditSite ? `<label class="modal-label" for="siteSelect">Sede<select class="form-select" id="siteSelect">${availableSites.map((site) => `<option ${site === roleTarget.site ? "selected" : ""}>${site}</option>`).join("")}</select></label>` : "";
  refs.rolePicker.innerHTML = canEditRoles ? `<span class="modal-label-text">Roles</span>${availableRoles.map((role) => `<label class="role-option"><span class="role-avatar">${role.charAt(0)}</span><span class="role-option-name">${role}</span><input type="checkbox" value="${role}" ${roleTarget.roles.includes(role) ? "checked" : ""}></label>`).join("")}` : "";
  refs.projectPicker.innerHTML = canEditProjects ? `<span class="modal-label-text">Proyectos</span>${availableProjects.map((project) => `<label class="role-option project-option"><span class="role-avatar">${project.charAt(0)}</span><span class="role-option-name">${project}</span><input type="checkbox" value="${project}" ${roleTarget.projects?.includes(project) ? "checked" : ""}></label>`).join("")}` : "";
  refs.validityField.hidden = !canEditValidity;
  refs.validitySelect.value = roleTarget.expires === "-" ? "Sin fecha de vencimiento" : "90 días";
  refs.editUserStatusControl.hidden = !(mode === "edit" && canToggleStatus);
  refs.editUserStatusToggle.checked = roleTarget.status === "Activo";
  refs.roleModalFeedback.hidden = true;
  bootstrap.Modal.getOrCreateInstance(refs.rolesModal).show();
}

export function openReniecUpdate(index) {
  reniecTarget = state.filteredUsers[index];
  if (!reniecTarget || reniecTarget.auth !== "Documento") return;
  pendingReniec = null;
  refs.reniecModalContext.textContent = `Usuario: ${reniecTarget.name}`;
  refs.reniecDocument.value = reniecTarget.documentNumber || "";
  refs.reniecName.textContent = "";
  refs.reniecBirth.textContent = "";
  refs.reniecResult.hidden = true;
  refs.saveReniecBtn.disabled = true;
  bootstrap.Modal.getOrCreateInstance(refs.reniecModal).show();
}

export function consultReniec() {
  if (!reniecTarget) return;
  const result = reniecRecords[reniecTarget.username] || {
    documentNumber: reniecTarget.documentNumber || "00000000",
    name: reniecTarget.name,
    birthDate: reniecTarget.birthDate || "-",
  };
  refs.reniecDocument.value = result.documentNumber;
  refs.reniecName.textContent = result.name;
  refs.reniecBirth.textContent = result.birthDate;
  refs.reniecResult.hidden = false;
  pendingReniec = result;
  refs.saveReniecBtn.disabled = false;
  showToast(getPrototypeMessage("identityLookupSuccess"), "success");
}

export function saveReniec() {
  if (!reniecTarget || !pendingReniec) return;
  roleTarget = reniecTarget;
  refs.confirmRolesMessage.textContent = getMessage("M1");
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
export function saveRoles() {
  if (!roleTarget) return;
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
  pendingRoles = { roles: selected, projects, validity, site, preserveValidity: validity === currentValidity };
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
  renderUsers();
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
export function renewValidity(index) {
  const user = state.filteredUsers[index];
  if (!user || user.auth !== "Documento" || user.expires === "-") return;
  pendingRenewal = { user };
  refs.confirmRolesMessage.textContent = `${getMessage("M1")} Se ampliará la vigencia de ${user.name}.`;
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
    pendingRenewal = null;
    pendingReniec = null;
    reniecTarget = null;
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
  if (pendingRenewal) {
    pendingRenewal.user.expires = "12/09/2027";
    pendingRenewal.user.expiresSoon = false;
    pendingRenewal = null;
    bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).hide();
    renderUsers();
    showToast(getMessage("M3"), "success");
    return;
  }
  if (pendingReniec && reniecTarget) {
    reniecTarget.documentNumber = pendingReniec.documentNumber;
    reniecTarget.name = pendingReniec.name;
    reniecTarget.birthDate = pendingReniec.birthDate;
    pendingReniec = null;
    reniecTarget = null;
    bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).hide();
    bootstrap.Modal.getOrCreateInstance(refs.reniecModal).hide();
    renderUsers();
    showToast(getMessage("M3"), "success");
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
  if (!selected.preserveValidity) roleTarget.expires = calculateExpiry(selected.validity);
  renderUsers();
  bootstrap.Modal.getOrCreateInstance(refs.rolesModal).hide();
  showToast(getMessage("M3"), "success");
}
export function exportUsers() {
  showToast(getMessage("M67"), "success");
}

export function dismissPendingConfirmation() {
  pendingRoles = null;
  pendingStatus = null;
  pendingRenewal = null;
  pendingReniec = null;
  pendingCancel = false;
}
