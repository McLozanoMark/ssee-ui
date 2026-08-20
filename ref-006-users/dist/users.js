
/* source: design-system/messages.js */
const MESSAGE_CATALOG = Object.freeze({
  M1: { text: "¿Está seguro que desea guardar esta información?", type: "Confirmación", scope: "General" },
  M2: { text: "La información se ha guardado correctamente.", type: "Información", scope: "General" },
  M3: { text: "La información se ha actualizado correctamente.", type: "Información", scope: "General" },
  M4: { text: "¿Está seguro que desea eliminar la información seleccionada?", type: "Confirmación", scope: "General" },
  M5: { text: "¿Está seguro que desea activar el registro seleccionado?", type: "Confirmación", scope: "General" },
  M6: { text: "¿Está seguro que desea inactivar el registro seleccionado?", type: "Confirmación", scope: "General" },
  M7: { text: "El registro se ha activado correctamente.", type: "Información", scope: "General" },
  M8: { text: "El registro se ha inactivado correctamente.", type: "Información", scope: "General" },
  M9: { text: "No se encontraron registros con los criterios de búsqueda seleccionados.", type: "Información", scope: "General" },
  M10: { text: "Ya existe un registro con los datos ingresados.", type: "Alerta", scope: "General" },
  M11: { text: "Debe completar los campos obligatorios.", type: "Alerta", scope: "General" },
  M12: { text: "Verifique la información ingresada.", type: "Alerta", scope: "General" },
  M13: { text: "Ocurrió un error inesperado al procesar la solicitud. Por favor, intente nuevamente.", type: "Alerta", scope: "General" },
  M14: { text: "¿Está seguro que desea cancelar?", type: "Confirmación", scope: "General" },
  M15: { text: "No es posible inactivar un rol que posee usuarios asociados.", type: "Alerta", scope: "General" },
  M16: { text: "Debe seleccionar al menos un permiso para asignar al rol.", type: "Alerta", scope: "General" },
  M17: { text: "No es posible realizar la operación porque el rol se encuentra inactivo.", type: "Alerta", scope: "General" },
  M18: { text: "Los permisos del rol se han actualizado correctamente.", type: "Información", scope: "General" },
  M19: { text: "Ya existe un usuario registrado con el documento ingresado.", type: "Alerta", scope: "General" },
  M20: { text: "Ya existe un usuario registrado con el correo electrónico ingresado.", type: "Alerta", scope: "General" },
  M21: { text: "No fue posible completar la sincronización con Passport.", type: "Alerta", scope: "General" },
  M22: { text: "La sincronización con Passport se ha realizado correctamente.", type: "Información", scope: "General" },
  M23: { text: "El periodo de autoregistro no se encuentra habilitado.", type: "Alerta", scope: "General" },
  M24: { text: "El periodo habilitado para el autoregistro ha finalizado.", type: "Alerta", scope: "General" },
  M25: { text: "El enlace de registro ha expirado.", type: "Alerta", scope: "General" },
  M26: { text: "Se ha enviado un mensaje al correo electrónico registrado para completar el registro.", type: "Información", scope: "General" },
  M27: { text: "Las credenciales ingresadas no son válidas.", type: "Alerta", scope: "General" },
  M28: { text: "Su sesión ha expirado. Inicie sesión nuevamente.", type: "Alerta", scope: "General" },
  M29: { text: "Su sesión ha sido cerrada debido al inicio de una nueva sesión.", type: "Información", scope: "General" },
  M30: { text: "No fue posible iniciar sesión. Intente nuevamente.", type: "Alerta", scope: "General" },
  M31: { text: "La nueva contraseña no cumple con las políticas de seguridad establecidas.", type: "Alerta", scope: "General" },
  M32: { text: "La nueva contraseña y su confirmación no coinciden.", type: "Alerta", scope: "General" },
  M33: { text: "La contraseña se ha actualizado correctamente.", type: "Información", scope: "General" },
  M34: { text: "El cambio de contraseña no pudo completarse. Intente nuevamente.", type: "Alerta", scope: "General" },
  M35: { text: "Si existe una cuenta asociada al correo ingresado, recibirá un enlace para recuperar su contraseña.", type: "Información", scope: "General" },
  M36: { text: "El enlace de recuperación ha expirado. Solicite uno nuevo.", type: "Alerta", scope: "General" },
  M37: { text: "La contraseña se ha restablecido correctamente.", type: "Información", scope: "General" },
  M39: { text: "No tiene proyectos asignados para visualizar.", type: "Información", scope: "General" },
  M40: { text: "No tiene instrumentos pendientes de atención.", type: "Información", scope: "General" },
  M41: { text: "Tiene %s instrumentos asignados.", type: "Información", scope: "General" },
  M42: { text: "Tiene %s instrumentos pendientes de atención.", type: "Información", scope: "General" },
  M43: { text: "Tiene %s instrumentos enviados.", type: "Información", scope: "General" },
  M44: { text: "Tiene %s notificaciones pendientes.", type: "Información", scope: "General" },
  M45: { text: "Complete la información requerida para registrar la fuente de datos.", type: "Información", scope: "General" },
  M46: { text: "No fue posible guardar la estructura.", type: "Información", scope: "General" },
  M47: { text: "Seleccione el campo o conjunto de campos que identificarán las unidades muestrales.", type: "Información", scope: "General" },
  M48: { text: "Debe seleccionar al menos un campo válido.", type: "Error", scope: "General" },
  M49: { text: "Se detectaron registros con observaciones; revise el detalle.", type: "Advertencia", scope: "General" },
  M50: { text: "Ingrese los datos de las unidades muestrales según la estructura configurada.", type: "Advertencia", scope: "General" },
  M51: { text: "El archivo contiene observaciones que deberán revisarse.", type: "Advertencia", scope: "General" },
  M52: { text: "El archivo fue cargado correctamente.", type: "Información", scope: "General" },
  M53: { text: "El procesamiento finalizó. Procesados: %s. Aceptados: %s. Rechazados: %s. Duplicados: %s. Con errores: %s.", type: "Información", scope: "General" },
  M54: { text: "Ya existe una fuente con el mismo nombre para el periodo e intervención seleccionados.", type: "Advertencia", scope: "General" },
  M55: { text: "La fuente ya fue utilizada y su estructura no puede modificarse/eliminarse.", type: "Advertencia", scope: "General" },
  M56: { text: "El procesamiento finalizó con observaciones; revise los registros rechazados o duplicados.", type: "Advertencia", scope: "General" },
  M57: { text: "Se detectaron unidades muestrales con observaciones.", type: "Advertencia", scope: "General" },
  M58: { text: "El archivo fue generado correctamente.", type: "Información", scope: "General" },
  M59: { text: "La sincronización finalizó correctamente.", type: "Información", scope: "General" },
  M60: { text: "No fue posible completar la sincronización.", type: "Alerta", scope: "General" },
  M61: { text: "No fue posible consultar el detalle de la fuente.", type: "Alerta", scope: "General" },
  M62: { text: "La fuente ya fue utilizada y no puede modificarse.", type: "Alerta", scope: "General" },
  M63: { text: "No fue posible generar una nueva versión.", type: "Alerta", scope: "General" },
  M64: { text: "La fuente de datos fue eliminada correctamente.", type: "Información", scope: "General" },
  M65: { text: "No hay registros disponibles. Haz clic en \"Nuevo\" para empezar.", type: "Información", scope: "General" },
  M66: { text: "Complete los datos del rol para activar esta sección.", type: "Alerta", scope: "Roles" },
  M67: { text: "Registros exportados correctamente.", type: "Información", scope: "General" }
});

function getMessage(code, values = []) {
  const entry = MESSAGE_CATALOG[code];
  if (!entry) return "";
  let index = 0;
  return entry.text.replace(/%s/g, () => values[index++] ?? "");
}


/* source: ref-006-users/js/data.js */
const users = [
  {
    username: "mlozano",
    name: "María Lozano",
    email: "maria.lozano@ejemplo.gob.pe",
    auth: "Passport",
    site: "Unidad de Seguimiento y Evaluación",
    roles: ["Administrador USE"],
    projects: ["Operativo 2026"],
    status: "Activo",
    expiresSoon: false,
    lastAccess: "18/08/2026 09:10",
    created: "10/01/2026",
    expires: "-",
  },
  {
    username: "jcastro",
    name: "Juan Castro",
    email: "juan.castro@ejemplo.gob.pe",
    auth: "Documento",
    site: "Unidad de Seguimiento y Evaluación",
    roles: ["Supervisor de Seguimiento"],
    projects: ["Evaluación 2026"],
    status: "Activo",
    expiresSoon: true,
    lastAccess: "17/08/2026 16:40",
    created: "10/02/2026",
    expires: "12/09/2026",
  },
  {
    username: "aparedes",
    name: "Ana Paredes",
    email: "ana.paredes@ejemplo.gob.pe",
    auth: "Documento",
    site: "Oficina de Operaciones",
    roles: [],
    projects: [],
    status: "Activo",
    expiresSoon: false,
    lastAccess: "16/08/2026 11:20",
    created: "15/03/2026",
    expires: "-",
  },
  {
    username: "rquispe",
    name: "Rosa Quispe",
    email: "rosa.quispe@ejemplo.gob.pe",
    auth: "Autoregistro",
    site: "Unidad de Seguimiento y Evaluación",
    roles: ["Evaluador"],
    projects: ["Operativo 2026"],
    status: "Inactivo",
    expiresSoon: false,
    lastAccess: "01/06/2026 10:05",
    created: "05/01/2026",
    expires: "31/07/2026",
  },
  {
    username: "dhuaman",
    name: "Diego Huamán",
    email: "diego.huaman@ejemplo.gob.pe",
    auth: "Passport",
    site: "Oficina de Operaciones",
    roles: ["Registrador"],
    projects: ["Seguimiento 2026"],
    status: "Inactivo",
    expiresSoon: false,
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
  rolesModalTitle: document.getElementById("rolesModalTitle"),
  rolesModalContext: document.getElementById("rolesModalContext"),
  rolePicker: document.getElementById("rolePicker"),
  sitePicker: document.getElementById("sitePicker"),
  projectPicker: document.getElementById("projectPicker"),
  validitySelect: document.getElementById("validitySelect"),
  validityField: document.getElementById("validityField"),
  accessEditNote: document.getElementById("accessEditNote"),
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
  const projectTags = user.projects?.length
    ? user.projects.map((project) => `<span class="tag">${project}</span>`).join("")
    : '<span class="muted">Pendiente de asignación</span>';
  refs.listView.classList.remove("is-active");
  refs.detailView.classList.add("is-active");
  refs.detailCard.innerHTML = `
    <div class="detail-grid">
      <div class="detail-field"><span>Usuario</span><strong>${user.username}</strong></div>
      <div class="detail-field"><span>Tipo de autenticación</span><strong>${user.auth}</strong></div>
      <div class="detail-field"><span>Sede</span><strong>${user.site || "-"}</strong></div>
      <div class="detail-field"><span>Nombres y apellidos</span><strong>${user.name}</strong></div>
      <div class="detail-field"><span>Correo</span><strong>${user.email}</strong></div>
      <div class="detail-field"><span>Estado</span><strong>${user.status}</strong></div>
      <div class="detail-field"><span>Último acceso</span><strong>${user.lastAccess}</strong></div>
      <div class="detail-field"><span>Fecha de creación</span><strong>${user.created}</strong></div>
      <div class="detail-field"><span>Vigencia</span><strong>${user.expires}</strong></div>
    </div>
    <div class="detail-section"><h2>Roles asignados</h2><div class="user-role-tags">${roleTags}</div></div>
    <div class="detail-section"><h2>Proyectos asignados</h2><div class="user-role-tags">${projectTags}</div></div>
  `;
}


/* source: ref-006-users/js/users.js */




const availableRoles = ["Administrador USE", "Supervisor de Seguimiento", "Evaluador", "Registrador"];
const availableProjects = ["Operativo 2026", "Evaluación 2026", "Seguimiento 2026"];
const availableSites = ["Unidad de Seguimiento y Evaluación", "Oficina de Operaciones"];
let roleTarget = null;
let pendingRoles = null;
let pendingStatus = null;
function matchesTray(user) {
  return (
    state.tray === "Todos" ||
    (state.tray === "Pendientes de rol" && !user.roles.length) ||
    (state.tray === "Sin proyecto" && !user.projects?.length) ||
    (state.tray === "Por vencer" && user.expiresSoon)
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
        [user.username, user.name, user.email, user.auth, user.status, user.expires, ...user.roles]
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
            <li><div class="dropdown-switch"><span><i class="fa-solid fa-power-off" aria-hidden="true"></i>${user.status === "Activo" ? "Inactivar" : "Activar"}</span><label class="form-check form-switch switch ${canToggleStatus ? "" : "is-disabled"}" title="${canToggleStatus ? "" : "Estado administrado por Passport"}"><input class="form-check-input" type="checkbox" data-user="${index}" data-user-action="toggle-status" ${user.status === "Activo" ? "checked" : ""} ${canToggleStatus ? "" : "disabled"} aria-label="${user.status === "Activo" ? "Inactivar" : "Activar"} ${user.name}"></label></div></li>
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
  refs.pageSummary.textContent = `Mostrando 1 a ${state.filteredUsers.length} de ${state.filteredUsers.length} registros`;
  refs.userCount.textContent = `${users.length} usuarios registrados`;
  document.getElementById("expiringCount").textContent = users.filter((user) => user.expiresSoon).length;
  document.getElementById("noProjectCount").textContent = users.filter((user) => !user.projects?.length).length;
}
function openSelected(index) {
  const user = state.filteredUsers[index];
  if (user) {
    state.selectedUser = user;
    showDetail(user);
  }
}
function openRoles(index, mode = "roles") {
  roleTarget = state.filteredUsers[index];
  if (!roleTarget) return;
  const canEditRoles = ["Passport", "Documento"].includes(roleTarget.auth);
  const canEditProjects = canEditRoles;
  const canEditSite = roleTarget.auth === "Documento";
  const canEditValidity = roleTarget.auth === "Documento";
  const canEditAny = canEditRoles || canEditSite || canEditValidity;
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
  refs.roleModalFeedback.hidden = true;
  bootstrap.Modal.getOrCreateInstance(refs.rolesModal).show();
}
function saveRoles() {
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
  if (changed) {
    pendingRoles = { roles: selected, projects, validity, site };
    refs.confirmRolesMessage.textContent = `${getMessage("M1")} El cambio puede afectar los permisos y el acceso de ${roleTarget.name}.`;
    bootstrap.Modal.getOrCreateInstance(refs.rolesModal).hide();
    bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
    return;
  }
  applyRoles({ roles: selected, projects, validity, site });
}
function toggleStatus(index) {
  const user = state.filteredUsers[index];
  if (!user || !["Documento", "Autoregistro"].includes(user.auth) || !["Activo", "Inactivo"].includes(user.status)) return;
  const next = user.status === "Activo" ? "Inactivo" : "Activo";
  pendingStatus = { user, next };
  refs.confirmRolesMessage.textContent = `${getMessage(next === "Activo" ? "M5" : "M6")} ${user.name}?`;
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
function confirmRoles() {
  if (pendingStatus) {
    const { user, next } = pendingStatus;
    user.status = next;
    pendingStatus = null;
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
function exportUsers() {
  showToast(getMessage("M67"), "success");
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
    if (action.dataset.userAction === "edit") openRoles(Number(action.dataset.user), "edit");
    if (action.dataset.userAction === "toggle-status") toggleStatus(Number(action.dataset.user));
    if (action.dataset.userAction === "renew") showToast("Renovar vigencia queda pendiente de confirmación del flujo.", "info");
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
