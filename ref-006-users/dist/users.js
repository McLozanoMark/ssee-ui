
/* source: ref-006-users/js/data.js */
const users = [
  {
    username: "mlozano",
    name: "María Lozano",
    email: "maria.lozano@ejemplo.gob.pe",
    auth: "Passport",
    roles: ["Administrador USE"],
    status: "Activo",
    lastAccess: "18/08/2026 09:10",
    created: "10/01/2026",
    expires: "-",
  },
  {
    username: "jcastro",
    name: "Juan Castro",
    email: "juan.castro@ejemplo.gob.pe",
    auth: "Documento",
    roles: ["Supervisor de Seguimiento"],
    status: "Por vencer",
    lastAccess: "17/08/2026 16:40",
    created: "10/02/2026",
    expires: "12/09/2026",
  },
  {
    username: "aparedes",
    name: "Ana Paredes",
    email: "ana.paredes@ejemplo.gob.pe",
    auth: "Documento",
    roles: [],
    status: "Activo",
    lastAccess: "16/08/2026 11:20",
    created: "15/03/2026",
    expires: "-",
  },
  {
    username: "rquispe",
    name: "Rosa Quispe",
    email: "rosa.quispe@ejemplo.gob.pe",
    auth: "Autoregistro",
    roles: ["Evaluador"],
    status: "Vencido",
    lastAccess: "01/06/2026 10:05",
    created: "05/01/2026",
    expires: "31/07/2026",
  },
  {
    username: "dhuaman",
    name: "Diego Huamán",
    email: "diego.huaman@ejemplo.gob.pe",
    auth: "Passport",
    roles: ["Registrador"],
    status: "Inactivo",
    lastAccess: "20/07/2026 14:30",
    created: "18/02/2026",
    expires: "-",
  },
];


/* source: ref-006-users/js/state.js */

const state = {
  tray: "Todos",
  filteredUsers: [...users],
  selectedUser: null,
};


/* source: ref-006-users/js/ui.js */
const refs = {
  usersBody: document.getElementById("usersBody"),
  emptyState: document.getElementById("emptyState"),
  pageSummary: document.getElementById("pageSummary"),
  userCount: document.getElementById("userCount"),
  listView: document.getElementById("listView"),
  detailView: document.getElementById("detailView"),
  detailCard: document.getElementById("detailCard"),
  toast: document.getElementById("toast"),
  rolesModal: document.getElementById("rolesModal"),
  rolesModalContext: document.getElementById("rolesModalContext"),
  rolePicker: document.getElementById("rolePicker"),
  roleModalFeedback: document.getElementById("roleModalFeedback"),
  confirmRolesModal: document.getElementById("confirmRolesModal"),
  confirmRolesMessage: document.getElementById("confirmRolesMessage"),
};
function showToast(message, type = "info") {
  refs.toast.classList.remove("is-visible");
  void refs.toast.offsetWidth;
  const icons = {
    success: "fa-circle-check",
    error: "fa-circle-exclamation",
    warning: "fa-triangle-exclamation",
    info: "fa-circle-info"
  };
  refs.toast.className = `toast toast-${type}`;
  refs.toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}" aria-hidden="true"></i><span>${message}</span>`;
  refs.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => refs.toast.classList.remove("is-visible"), 4500);
}
function showList() {
  refs.listView.classList.add("is-active");
  refs.detailView.classList.remove("is-active");
}
function showDetail(user) {
  const roleTags = user.roles.length
    ? user.roles.map((role) => `<span class="tag">${role}</span>`).join("")
    : '<span class="muted">Pendiente de asignación</span>';
  refs.listView.classList.remove("is-active");
  refs.detailView.classList.add("is-active");
  refs.detailCard.innerHTML = `
    <div class="detail-grid">
      <div class="detail-field"><span>Usuario</span><strong>${user.username}</strong></div>
      <div class="detail-field"><span>Tipo de autenticación</span><strong>${user.auth}</strong></div>
      <div class="detail-field"><span>Nombres y apellidos</span><strong>${user.name}</strong></div>
      <div class="detail-field"><span>Correo</span><strong>${user.email}</strong></div>
      <div class="detail-field"><span>Estado</span><strong>${user.status}</strong></div>
      <div class="detail-field"><span>Último acceso</span><strong>${user.lastAccess}</strong></div>
      <div class="detail-field"><span>Fecha de creación</span><strong>${user.created}</strong></div>
      <div class="detail-field"><span>Vigencia</span><strong>${user.expires}</strong></div>
    </div>
    <div class="detail-section"><h2>Roles asignados</h2><div class="user-role-tags">${roleTags}</div></div>
  `;
}


/* source: ref-006-users/js/users.js */



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
function applyFilters() {
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
function renderUsers() {
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
function openSelected(index) {
  const user = state.filteredUsers[index];
  if (user) {
    state.selectedUser = user;
    showDetail(user);
  }
}
function openRoles(index) {
  roleTarget = state.filteredUsers[index];
  if (!roleTarget) return;
  refs.rolesModalContext.textContent = `Selecciona los roles activos de ${roleTarget.name}.`;
  refs.rolePicker.innerHTML = availableRoles.map((role) => `<label class="role-option"><span class="role-avatar">${role.charAt(0)}</span><span class="role-option-name">${role}</span><input type="checkbox" value="${role}" ${roleTarget.roles.includes(role) ? "checked" : ""}></label>`).join("");
  refs.roleModalFeedback.hidden = true;
  bootstrap.Modal.getOrCreateInstance(refs.rolesModal).show();
}
function saveRoles() {
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
function toggleStatus(index) {
  const user = state.filteredUsers[index];
  if (!user || !["Activo", "Inactivo"].includes(user.status)) return;
  const next = user.status === "Activo" ? "Inactivo" : "Activo";
  pendingStatus = { user, next };
  refs.confirmRolesMessage.textContent = `Vas a ${next === "Inactivo" ? "inactivar" : "activar"} a ${user.name}. Este cambio puede afectar su acceso al sistema. ¿Deseas continuar?`;
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
function confirmRoles() {
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
function exportUsers() {
  showToast("Exportación Excel generada para el prototipo.", "success");
}


/* source: ref-006-users/js/main.js */



document.getElementById("filterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
  showToast("Filtros aplicados.", "info");
});
document.getElementById("filterName").addEventListener("input", applyFilters);
document
  .getElementById("filterDescription")
  .addEventListener("input", applyFilters);
document.getElementById("filterTray").addEventListener("change", (event) => {
  state.tray = event.target.value;
  applyFilters();
});
document.getElementById("filterToggle").addEventListener("click", () => {
  document.getElementById("filterForm").classList.toggle("is-expanded");
});
document.getElementById("clearBtn").addEventListener("click", () => {
  [
    "filterName",
    "filterDescription",
    "filterTray",
    "filterRole",
    "filterStatus",
    "filterAuth",
  ].forEach(
    (id) =>
      (document.getElementById(id).value =
        id === "filterTray" ||
        id === "filterRole" ||
        id === "filterStatus" ||
        id === "filterAuth"
          ? "Todos"
          : ""),
  );
  state.tray = "Todos";
  applyFilters();
  showToast("Filtros limpiados.", "info");
});
refs.usersBody.addEventListener("click", (event) => {
  const roleButton = event.target.closest("[data-role-action='open']");
  if (roleButton) return openRoles(Number(roleButton.dataset.user));
  const action = event.target.closest("[data-user-action]");
  if (action) {
    if (action.dataset.userAction === "detail") openSelected(Number(action.dataset.user));
    if (action.dataset.userAction === "roles") openRoles(Number(action.dataset.user));
    if (action.dataset.userAction === "toggle-status") toggleStatus(Number(action.dataset.user));
    if (["edit", "renew"].includes(action.dataset.userAction)) showToast("Esta acción está pendiente de definición.", "info");
    return;
  }
  const button = event.target.closest("[data-user]");
  if (button) {
    openSelected(Number(button.dataset.user));
    showToast("Detalle de usuario abierto.", "info");
  }
});
document.getElementById("backBtn").addEventListener("click", showList);
document.getElementById("exportBtn").addEventListener("click", exportUsers);
document.getElementById("saveRolesBtn").addEventListener("click", saveRoles);
document.getElementById("confirmRolesBtn").addEventListener("click", confirmRoles);
renderUsers();
