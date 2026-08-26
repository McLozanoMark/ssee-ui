
/* source: design-system/permission-catalog.js */
const sharedPermissionOperations = ["Consultar", "Registrar", "Modificar", "Eliminar", "Exportar", "Validar"];

const row = (id, level, type, name, parentId, checks, unavailable = []) => ({
  id,
  level,
  type,
  name,
  parentId,
  checks: { ...checks },
  unavailable: [...unavailable]
});

// Canonical prototype catalog shared by the role wizard and the REF-002 traceability route.
const sharedPermissionRows = [
  row("administracion", 1, "module", "Administración", null, { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }),
  row("usuarios", 2, "submenu", "Gestión de usuarios", "administracion", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }),
  row("usuarios-consulta", 3, "functionality", "Consultar usuarios", "usuarios", { Consultar: true, Registrar: false, Modificar: false, Eliminar: false, Exportar: true, Validar: false }, ["Registrar", "Modificar", "Eliminar", "Validar"]),
  row("usuarios-roles", 3, "functionality", "Asignar roles", "usuarios", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: false, Validar: false }, ["Eliminar", "Exportar", "Validar"]),
  row("roles", 2, "submenu", "Gestión de roles", "administracion", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }, ["Validar"]),
  row("roles-permisos", 3, "functionality", "Gestionar permisos de roles", "roles", { Consultar: true, Registrar: false, Modificar: true, Eliminar: false, Exportar: true, Validar: false }, ["Registrar", "Eliminar", "Validar"]),
  row("instrumentos", 1, "module", "Instrumentos", null, { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: true }),
  row("instrumentos-gestion", 2, "submenu", "Gestión de instrumentos", "instrumentos", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: true }),
  row("instrumentos-registro", 3, "functionality", "Registro de instrumentos", "instrumentos-gestion", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }, ["Validar"]),
  row("instrumentos-validacion", 3, "functionality", "Validación de instrumentos", "instrumentos-gestion", { Consultar: true, Registrar: false, Modificar: true, Eliminar: false, Exportar: false, Validar: true }, ["Eliminar", "Exportar"])
];


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


/* source: ref-002-permisos/js/data.js */


const operations = sharedPermissionOperations;

const roles = [
  { id: "admin", name: "Administrador USE", description: "Gestiona configuración general del sistema.", status: "Activo" },
  { id: "supervisor", name: "Supervisor de Seguimiento", description: "Consulta y supervisa avances de seguimiento.", status: "Activo" },
  { id: "evaluator", name: "Evaluador", description: "Registra y revisa información de evaluación.", status: "Activo" }
];

const permissionRows = sharedPermissionRows;


/* source: ref-002-permisos/js/state.js */


const cloneRows = () => permissionRows.map((item) => ({ ...item, checks: { ...item.checks } }));

const state = { selectedRoleId: roles[0].id, rows: cloneRows(), dirty: false, pendingAction: null, query: "" };

function selectedRole() { return roles.find((role) => role.id === state.selectedRoleId) || roles[0]; }
function resetDraft() { state.rows = cloneRows(); state.dirty = false; state.pendingAction = null; }


/* source: ref-002-permisos/js/permissions.js */



function descendants(rowId) {
  const result = [];
  const queue = [rowId];
  while (queue.length) {
    const parentId = queue.shift();
    state.rows.filter((row) => row.parentId === parentId).forEach((child) => { result.push(child); queue.push(child.id); });
  }
  return result;
}

function rowById(rowId) { return state.rows.find((row) => row.id === rowId); }

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

function isDisabled(row, operation) { return row.unavailable.includes(operation) || (operation !== "Consultar" && !row.checks.Consultar); }

function handlePermissionChange(rowId, operation, checked) {
  const source = rowById(rowId);
  if (!source || source.unavailable.includes(operation)) return;
  setRowOperation(source, operation, checked);
  descendants(rowId).forEach((child) => setRowOperation(child, operation, checked));
  state.dirty = true;
}

function visibleRows() {
  const query = state.query.trim().toLowerCase();
  return query ? state.rows.filter((row) => row.name.toLowerCase().includes(query)) : state.rows;
}

function hasChanges() { return state.dirty; }
function commitPermissions() { state.dirty = false; }


/* source: ref-002-permisos/js/ui.js */





const refs = { roleSelect: document.getElementById("roleSelect"), roleDescription: document.getElementById("roleDescription"), roleStatus: document.getElementById("roleStatus"), permissionBody: document.getElementById("permissionBody"), matrixSearch: document.getElementById("matrixSearch"), toast: document.getElementById("toast"), confirmModal: document.getElementById("confirmModal") };

function renderRoleContext(roles) {
  refs.roleSelect.innerHTML = roles.map((role) => `<option value="${role.id}">${role.name}</option>`).join("");
  refs.roleSelect.value = state.selectedRoleId;
  const role = selectedRole();
  refs.roleDescription.textContent = role.description;
  refs.roleStatus.textContent = role.status;
  refs.roleStatus.className = `status ${role.status === "Activo" ? "active" : "inactive"}`;
}

function renderPermissions() {
  refs.permissionBody.innerHTML = visibleRows().map((row) => `
    <tr class="is-${row.type}" data-row-id="${row.id}">
      <td><span class="permission-name level-${row.level}"><i class="fa-solid ${row.type === "functionality" ? "fa-file-lines" : "fa-folder-open"}" aria-hidden="true"></i>${row.name}</span></td>
      ${operations.map((operation) => {
        const disabled = isDisabled(row, operation);
        const unavailable = row.unavailable.includes(operation);
        const title = unavailable ? "Operación no aplicable para esta funcionalidad" : (disabled ? "Selecciona Consultar para habilitar esta operación" : "");
        return `<td><input class="form-check-input${unavailable ? " is-not-applicable" : ""}" type="checkbox" data-row="${row.id}" data-operation="${operation}" ${row.checks[operation] ? "checked" : ""} ${disabled ? "disabled" : ""} aria-label="${operation} en ${row.name}"${title ? ` title="${title}" data-bs-toggle="tooltip"` : ""}></td>`;
      }).join("")}
    </tr>
  `).join("");
  enableTooltips();
}

function showToast(message, type = "info") { renderToast(refs.toast, message, type); }


/* source: ref-002-permisos/js/main.js */







function rerender() { renderPermissions(); renderRoleContext(roles); }

function confirmAction() {
  if (state.pendingAction === "save") {
    commitPermissions();
    state.pendingAction = null;
    closeConfirmModal("confirmModal");
    showToast(getMessage("M18"), "success");
    return;
  }
  if (state.pendingAction === "cancel") {
    resetDraft();
    state.pendingAction = null;
    closeConfirmModal("confirmModal");
    window.location.href = "../ref-001-roles/index.html";
  }
}

refs.permissionBody.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[data-row][data-operation]");
  if (!checkbox) return;
  handlePermissionChange(checkbox.dataset.row, checkbox.dataset.operation, checkbox.checked);
  renderPermissions();
});

refs.roleSelect.addEventListener("change", () => { state.selectedRoleId = refs.roleSelect.value; resetDraft(); rerender(); });
refs.matrixSearch.addEventListener("input", () => { state.query = refs.matrixSearch.value; renderPermissions(); });

document.getElementById("saveBtn").addEventListener("click", () => { state.pendingAction = "save"; openConfirmModal("confirmModal", getMessage("M1")); });
document.getElementById("cancelBtn").addEventListener("click", () => {
  if (!hasChanges()) { window.location.href = "../ref-001-roles/index.html"; return; }
  state.pendingAction = "cancel";
  openConfirmModal("confirmModal", getMessage("M14"));
});
document.getElementById("confirmBtn").addEventListener("click", confirmAction);
refs.confirmModal.addEventListener("hidden.bs.modal", () => { state.pendingAction = null; });

renderRoleContext(roles);
renderPermissions();
