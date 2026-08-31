
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
  M38: { text: "No fue posible restablecer la contraseña. Intente nuevamente.", type: "Alerta", scope: "General" },
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
  M67: { text: "Registros exportados correctamente.", type: "Información", scope: "General" },
  M70: { text: "Se han detectado cambios sin guardar. ¿Desea guardar los cambios y continuar?", type: "Confirmación", scope: "General" }
});

// Confirmed prototype copy pending official codes in the stakeholder workbook.
const PROTOTYPE_MESSAGES = Object.freeze({
  identityLookupSuccess: "Información consultada correctamente.",
  authenticationSuccess: "Autenticación validada correctamente.",
  syncStarted: "Sincronización iniciada.",
  filtersApplied: "Filtros aplicados.",
  filtersCleared: "Filtros limpiados.",
  sessionClosed: "La sesión se cerró correctamente.",
  sessionInactive: "La sesión ya no está activa.",
  sessionActive: "La sesión continúa activa.",
  previousSessionClosed: "La sesión anterior fue finalizada automáticamente."
});

function getMessage(code, values = []) {
  const entry = MESSAGE_CATALOG[code];
  if (!entry) return "";
  let index = 0;
  return entry.text.replace(/%s/g, () => values[index++] ?? "");
}

function getPrototypeMessage(key) {
  return PROTOTYPE_MESSAGES[key] || "";
}


/* source: design-system/interaction.js */


const standardMessages = {
  "Completa los campos obligatorios.": "M11",
  "Fuente registrada correctamente.": "M2",
  "Muestra registrada correctamente.": "M2",
  "Asignación registrada correctamente.": "M2",
  "Asignación reasignada correctamente.": "M3",
  "Fuente activada correctamente.": "M7",
  "Fuente inactivada correctamente.": "M8",
  "Muestra clonada como borrador.": "M2",
};

function renderToast(element, message, type = "info") {
  message = standardMessages[message] ? getMessage(standardMessages[message]) : message;
  element.classList.remove("is-visible");
  void element.offsetWidth;
  const icons = {
    success: "fa-circle-check",
    error: "fa-circle-exclamation",
    warning: "fa-triangle-exclamation",
    info: "fa-circle-info"
  };
  element.className = `toast toast-${type}`;
  element.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}" aria-hidden="true"></i><span>${message}</span>`;
  element.classList.add("is-visible");
  window.clearTimeout(renderToast.timeoutId);
  renderToast.timeoutId = window.setTimeout(() => element.classList.remove("is-visible"), 4500);
}

function enableTooltips() {
  document.querySelectorAll(".filter-toggle").forEach((element) => {
    element.setAttribute("title", "Filtro Personalizado");
    element.setAttribute("data-bs-title", "Filtro Personalizado");
    element.setAttribute("data-bs-toggle", "tooltip");
  });
  if (!window.bootstrap) return;
  document.querySelectorAll("[data-bs-toggle='tooltip']").forEach((element) => {
    bootstrap.Tooltip.getOrCreateInstance(element);
  });
}

function closeMenus(root = document) {
  root.querySelectorAll("[data-menu-panel]").forEach((panel) => {
    panel.hidden = true;
  });
  root.querySelectorAll("[data-menu-button]").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function openConfirmModal(id, message) {
  const modal = document.getElementById(id);
  if (!modal || !window.bootstrap) return null;
  const messageNode = modal.querySelector("[data-confirm-message]");
  if (messageNode) messageNode.textContent = message;
  const instance = bootstrap.Modal.getOrCreateInstance(modal);
  instance.show();
  return instance;
}

function closeConfirmModal(id) {
  const modal = document.getElementById(id);
  if (modal && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modal).hide();
}


/* source: design-system/table-sort.js */
const collator = new Intl.Collator("es", { numeric: true, sensitivity: "base" });

function normalize(value, type) {
  const text = String(value || "").trim();
  if (type === "number") return Number(text.replace(/[^0-9.-]/g, "")) || 0;
  if (type === "date") {
    const parts = text.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    return parts ? new Date(`${parts[3]}-${parts[2]}-${parts[1]}`).getTime() : 0;
  }
  return text;
}

function attachTableSorting(table) {
  if (!table) return;
  const buttons = [...table.querySelectorAll("[data-sort-key]")];
  const state = { key: null, direction: null };

  buttons.forEach((button) => button.addEventListener("click", () => {
    const key = button.dataset.sortKey;
    state.direction = state.key === key && state.direction === "ascending" ? "descending" : "ascending";
    state.key = key;
    const header = button.closest("th");
    const columnIndex = [...header.parentElement.children].indexOf(header);
    const type = button.dataset.sortType || "text";
    const body = table.tBodies[0];
    if (!body) return;

    [...body.rows]
      .sort((left, right) => {
        const comparison = type === "number" || type === "date"
          ? normalize(left.cells[columnIndex]?.textContent, type) - normalize(right.cells[columnIndex]?.textContent, type)
          : collator.compare(normalize(left.cells[columnIndex]?.textContent, type), normalize(right.cells[columnIndex]?.textContent, type));
        return state.direction === "ascending" ? comparison : -comparison;
      })
      .forEach((row) => body.append(row));

    buttons.forEach((item) => {
      const itemHeader = item.closest("th");
      const active = item === button;
      itemHeader?.setAttribute("aria-sort", active ? state.direction : "none");
      const icon = item.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-arrow-up", active && state.direction === "ascending");
        icon.classList.toggle("fa-arrow-down", active && state.direction === "descending");
        icon.classList.toggle("fa-arrow-down-up", !active);
      }
    });
  }));
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
    documentNumber: "87654321",
    birthDate: "12/09/1986",
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
    documentNumber: "74125896",
    birthDate: "15/04/1988",
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
  reniecModal: document.getElementById("reniecModal"),
  reniecModalContext: document.getElementById("reniecModalContext"),
  reniecDocument: document.getElementById("reniecDocument"),
  reniecResult: document.getElementById("reniecResult"),
  reniecName: document.getElementById("reniecName"),
  reniecBirth: document.getElementById("reniecBirth"),
  consultReniecBtn: document.getElementById("consultReniecBtn"),
  saveReniecBtn: document.getElementById("saveReniecBtn"),
  confirmRolesModal: document.getElementById("confirmRolesModal"),
  confirmRolesMessage: document.getElementById("confirmRolesMessage"),
  editUserStatusControl: document.getElementById("editUserStatusControl"),
  editUserStatusToggle: document.getElementById("editUserStatusToggle"),
};
function showToast(message, type = "info") {
  renderToast(refs.toast, message, type);
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
      <div class="detail-field"><span>Documento</span><strong>${user.documentNumber || "-"}</strong></div>
      <div class="detail-field"><span>Fecha de nacimiento</span><strong>${user.birthDate || "-"}</strong></div>
      <div class="detail-field"><span>Correo</span><strong>${user.email}</strong></div>
      <div class="detail-field"><span>Estado</span><strong>${user.status}</strong></div>
      <div class="detail-field"><span>Último acceso</span><strong>${user.lastAccess}</strong></div>
      <div class="detail-field"><span>Fecha de creación</span><strong>${user.created}</strong></div>
      <div class="detail-field"><span>Vigencia</span><strong>${user.expires}</strong></div>
    </div>
    <div class="detail-section"><h2>Roles asignados</h2><div class="user-role-tags">${roleTags}</div></div>
    <div class="detail-section"><h2>Proyectos asignados</h2><div class="user-role-tags">${projectTags}</div></div>
    ${user.auth === "Documento" ? '<div class="detail-actions"><button class="btn btn-outline-ssee button button-secondary" type="button" data-detail-action="reniec"><i class="fa-solid fa-id-card" aria-hidden="true"></i>Actualizar datos RENIEC</button></div>' : ""}
  `;
}


/* source: ref-006-users/js/users.js */




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
function applyFilters() {
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
function renderUsers() {
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

function openReniecUpdate(index) {
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

function consultReniec() {
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

function saveReniec() {
  if (!reniecTarget || !pendingReniec) return;
  roleTarget = reniecTarget;
  refs.confirmRolesMessage.textContent = getMessage("M1");
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
function saveRoles() {
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
function toggleStatus(index) {
  const user = state.filteredUsers[index];
  if (!user || !["Documento", "Autoregistro"].includes(user.auth) || !["Activo", "Inactivo"].includes(user.status)) return;
  const next = user.status === "Activo" ? "Inactivo" : "Activo";
  pendingStatus = { user, next };
  renderUsers();
  refs.confirmRolesMessage.textContent = `${getMessage(next === "Activo" ? "M5" : "M6")} ${user.name}?`;
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
function toggleEditedUserStatus(event) {
  if (!roleTarget || !["Documento", "Autoregistro"].includes(roleTarget.auth)) return;
  const next = event.target.checked ? "Activo" : "Inactivo";
  refs.editUserStatusToggle.checked = roleTarget.status === "Activo";
  pendingStatus = { user: roleTarget, next };
  refs.confirmRolesMessage.textContent = `${getMessage(next === "Activo" ? "M5" : "M6")} ${roleTarget.name}?`;
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
function renewValidity(index) {
  const user = state.filteredUsers[index];
  if (!user || user.auth !== "Documento" || user.expires === "-") return;
  pendingRenewal = { user };
  refs.confirmRolesMessage.textContent = `${getMessage("M1")} Se ampliará la vigencia de ${user.name}.`;
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
function cancelRoleEdit() {
  pendingCancel = true;
  refs.confirmRolesMessage.textContent = getMessage("M14");
  bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).show();
}
function confirmRoles() {
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
function exportUsers() {
  showToast(getMessage("M67"), "success");
}

function dismissPendingConfirmation() {
  pendingRoles = null;
  pendingStatus = null;
  pendingRenewal = null;
  pendingReniec = null;
  pendingCancel = false;
}


/* source: ref-006-users/js/main.js */






document.getElementById("confirmRolesModal")?.querySelector(".modal-header")?.insertAdjacentHTML("afterbegin", '<span class="modal-title-icon" aria-hidden="true"><i class="fa-solid fa-circle-question"></i></span>');
document.getElementById("filterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
  showToast(getPrototypeMessage("filtersApplied"), "info");
});
document.getElementById("filterToggle").addEventListener("click", () => {
  const filterForm = document.getElementById("filterForm");
  const filterToggle = document.getElementById("filterToggle");
  const expanded = filterForm.classList.toggle("is-expanded");
  filterToggle.setAttribute("aria-expanded", String(expanded));
  filterToggle.setAttribute("aria-label", expanded ? "Cerrar filtros" : "Abrir filtros");
});
document.getElementById("clearBtn").addEventListener("click", () => {
  [
    "filterName",
    "filterUsername",
    "filterDescription",
    "filterEmail",
    "filterTray",
    "filterRole",
    "filterStatus",
    "filterAuth",
    "filterProject",
    "filterValidity",
    "filterLastAccess",
  ].forEach(
    (id) =>
      (document.getElementById(id).value =
        id === "filterTray" ||
        id === "filterRole" ||
        id === "filterStatus" ||
        id === "filterAuth" ||
        id === "filterValidity"
          ? "Todos"
          : ""),
  );
  state.tray = "Todos";
  applyFilters();
  showToast(getPrototypeMessage("filtersCleared"), "info");
});
refs.usersBody.addEventListener("click", (event) => {
  const action = event.target.closest("[data-user-action]");
  if (action) {
    if (action.dataset.userAction === "detail") openSelected(Number(action.dataset.user));
    if (action.dataset.userAction === "roles") openRoles(Number(action.dataset.user));
    if (action.dataset.userAction === "toggle-status") toggleStatus(Number(action.dataset.user));
    if (action.dataset.userAction === "reniec") openReniecUpdate(Number(action.dataset.user));
    return;
  }
});
refs.detailCard.addEventListener("click", (event) => {
  if (!event.target.closest("[data-detail-action='reniec']")) return;
  const index = state.filteredUsers.indexOf(state.selectedUser);
  if (index >= 0) openReniecUpdate(index);
});
document.getElementById("backBtn").addEventListener("click", showList);
document.getElementById("exportBtn").addEventListener("click", exportUsers);
document.getElementById("saveRolesBtn").addEventListener("click", saveRoles);
document.getElementById("confirmRolesBtn").addEventListener("click", confirmRoles);
document.getElementById("confirmRolesModal").addEventListener("hidden.bs.modal", dismissPendingConfirmation);
refs.editUserStatusToggle.addEventListener("change", toggleEditedUserStatus);
document.getElementById("cancelRolesBtn").addEventListener("click", cancelRoleEdit);
refs.consultReniecBtn.addEventListener("click", consultReniec);
refs.saveReniecBtn.addEventListener("click", saveReniec);
renderUsers();
attachTableSorting(document.querySelector(".ssee-table"));
enableTooltips();

const accessName = new URLSearchParams(window.location.search).get("accessName");
if (accessName) {
  const userIndex = state.filteredUsers.findIndex((user) => user.name === accessName);
  if (userIndex >= 0) openRoles(userIndex);
}
