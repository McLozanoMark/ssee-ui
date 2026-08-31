
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
  row("usuarios", 2, "submenu", "Usuarios", "administracion", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }),
  row("usuarios-consulta", 3, "functionality", "Consultar usuarios", "usuarios", { Consultar: true, Registrar: false, Modificar: false, Eliminar: false, Exportar: true, Validar: false }, ["Registrar", "Modificar", "Eliminar", "Validar"]),
  row("usuarios-roles", 3, "functionality", "Asignar roles", "usuarios", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: false, Validar: false }, ["Eliminar", "Exportar", "Validar"]),
  row("roles", 2, "submenu", "Roles", "administracion", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }, ["Validar"]),
  row("roles-permisos", 3, "functionality", "Gestionar permisos de roles", "roles", { Consultar: true, Registrar: false, Modificar: true, Eliminar: false, Exportar: true, Validar: false }, ["Registrar", "Eliminar", "Validar"]),
  row("registro", 1, "module", "Registro", null, { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: true }, ["Eliminar"]),
  row("registro-instrumento", 2, "submenu", "Registro de instrumento", "registro", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }, ["Eliminar", "Validar"]),
  row("registro-validacion", 3, "functionality", "Validación de instrumento", "registro-instrumento", { Consultar: true, Registrar: false, Modificar: false, Eliminar: false, Exportar: false, Validar: true }, ["Registrar", "Modificar", "Eliminar", "Exportar"])
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


/* source: ref-001-roles/js/data.js */


const roles = [
  {
    id: "admin",
    name: "Administrador USE",
    description: "Gestiona configuración general del sistema.",
    permissions: ["Usuarios", "Configuración", "+8 adicionales"],
    permissionDetails: ["Seguimiento", "Evaluación", "Instrumentos", "Reportes", "Registro", "Consulta", "Auditoría", "Parámetros"],
    users: 3,
    status: "Activo",
    updated: "15/05/2024 10:30"
  },
  {
    id: "supervisor",
    name: "Supervisor de Seguimiento",
    description: "Consulta y supervisa avances de seguimiento.",
    permissions: ["Seguimiento", "Reportes", "+3 adicionales"],
    permissionDetails: ["Consulta", "Exportación", "Indicadores"],
    users: 7,
    status: "Activo",
    updated: "14/05/2024 16:45"
  },
  {
    id: "evaluator",
    name: "Evaluador",
    description: "Registra y revisa información de evaluación.",
    permissions: ["Evaluación", "Instrumentos", "+2 adicionales"],
    permissionDetails: ["Consulta", "Reportes"],
    users: 2,
    status: "Activo",
    updated: "13/05/2024 09:15"
  },
  {
    id: "registrador",
    name: "Registrador",
    description: "Ingresa información operativa del sistema.",
    permissions: ["Registro", "Consulta"],
    permissionDetails: [],
    users: 0,
    status: "Inactivo",
    updated: "10/05/2024 11:20"
  },
  {
    id: "consulta",
    name: "Consulta Estratégica",
    description: "Accede a reportes y tableros de seguimiento.",
    permissions: ["Visualización", "Reportes"],
    permissionDetails: [],
    users: 0,
    status: "Inactivo",
    updated: "08/05/2024 14:05"
  }
];

const operations = sharedPermissionOperations;
const permissionRows = sharedPermissionRows;


/* source: ref-001-roles/js/state.js */


const clonePermissionRows = () => permissionRows.map((row) => ({
  ...row,
  checks: { ...row.checks },
  unavailable: [...row.unavailable]
}));

const state = {
  filteredRoles: [...roles],
  permissionRows: clonePermissionRows(),
  permissionDirty: false,
  editingIndex: null,
  openActionMenu: null,
  pendingStatus: null,
  pendingEditStatus: null,
  pendingSave: false,
  pendingSaveStep: null,
  pendingCancel: false,
  pendingWizardStep: null,
  dirty: false
};

function resetEditingState() {
  state.editingIndex = null;
  state.openActionMenu = null;
  state.pendingStatus = null;
  state.pendingEditStatus = null;
  state.pendingSave = false;
  state.pendingSaveStep = null;
  state.pendingCancel = false;
  state.pendingWizardStep = null;
  state.dirty = false;
}

function resetPermissionDraft(role = null) {
  state.permissionRows = clonePermissionRows();
  if (!role) {
    state.permissionRows.forEach((row) => {
      Object.keys(row.checks).forEach((operation) => { row.checks[operation] = false; });
    });
  }
  state.permissionDirty = false;
}


/* source: ref-001-roles/js/ui.js */



const refs = {
  listView: document.getElementById("listView"),
  formView: document.getElementById("formView"),
  rolesBody: document.getElementById("rolesBody"),
  emptyState: document.getElementById("emptyState"),
  pageSummary: document.getElementById("pageSummary"),
  filterForm: document.getElementById("filterForm"),
  filterName: document.getElementById("filterName"),
  filterNameAdvanced: document.getElementById("filterNameAdvanced"),
  filterStatus: document.getElementById("filterStatus"),
  filterToggle: document.getElementById("filterToggle"),
  roleCount: document.getElementById("roleCount"),
  roleName: document.getElementById("roleName"),
  roleDescription: document.getElementById("roleDescription"),
  nameError: document.getElementById("nameError"),
  descriptionError: document.getElementById("descriptionError"),
  formAlert: document.getElementById("formAlert"),
  permissionBody: document.getElementById("permissionBody"),
  permissionHint: document.getElementById("permissionHint"),
  infoStep: document.getElementById("infoStep"),
  permissionStep: document.getElementById("permissionStep"),
  stepInfo: document.getElementById("stepInfo"),
  stepPerms: document.getElementById("stepPerms"),
  backButton: document.getElementById("backBtn"),
  continueButton: document.getElementById("continueBtn"),
  saveRoleButton: document.getElementById("saveRoleBtn"),
  summaryName: document.getElementById("summaryName"),
  summaryDescription: document.getElementById("summaryDescription"),
  formTitle: document.getElementById("formTitle"),
  formBreadcrumb: document.getElementById("formBreadcrumb"),
  toast: document.getElementById("toast"),
  confirmModal: document.getElementById("confirmModal"),
  inactivationReasonWrap: document.getElementById("inactivationReasonWrap"),
  inactivationReason: document.getElementById("inactivationReason"),
  inactivationReasonError: document.getElementById("inactivationReasonError"),
  editStatusControls: [...document.querySelectorAll("[data-edit-status-control]")],
  editStatusToggles: [...document.querySelectorAll("[data-edit-status-toggle]")],
  editStatusLabels: [...document.querySelectorAll("[data-edit-status-label]")],
  saveStepButtons: [...document.querySelectorAll("[data-save-step]")]
};

function showToast(message, type = "info") {
  renderToast(refs.toast, message, type);
}

function enableTooltips() {
  if (!window.bootstrap) return;
  document.querySelectorAll("[data-bs-toggle='tooltip']").forEach((element) => {
    bootstrap.Tooltip.getOrCreateInstance(element);
  });
}

function closeActionMenus() {
  refs.rolesBody.querySelectorAll(".legacy-dropdown").forEach((dropdown) => {
    dropdown.hidden = true;
  });
  refs.rolesBody.querySelectorAll("[data-menu]").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function showList() {
  refs.listView.classList.add("is-active");
  refs.formView.classList.remove("is-active");
}

function showForm(role = null, sourceRequirement = "ALI-REF-001") {
  refs.listView.classList.remove("is-active");
  refs.formView.classList.add("is-active");
  refs.roleName.value = role?.name || "";
  refs.roleDescription.value = role?.description || "";
  const label = role ? "Editar rol" : "Registrar rol";
  refs.formTitle.textContent = role ? "Editar rol" : "Registrar rol";
  refs.formBreadcrumb.innerHTML = `<a href="../index.html">Índice de requerimientos</a> / ${sourceRequirement} / Gestión de roles / ${label}`;
  refs.editStatusControls.forEach((control) => { control.hidden = !role; });
  const statusBlocked = Boolean(role && role.users > 0);
  refs.editStatusToggles.forEach((toggle) => {
    toggle.checked = role?.status === "Activo";
    toggle.disabled = statusBlocked;
    const switchLabel = toggle.closest(".switch");
    if (switchLabel) {
      switchLabel.classList.toggle("is-disabled", statusBlocked);
      switchLabel.title = statusBlocked ? "No disponible: el rol tiene usuarios asociados." : "";
    }
  });
  refs.editStatusLabels.forEach((label) => { label.textContent = role?.status || "Activo"; });
  setFormStep("info");
  clearErrors();
}

function setFormStep(step) {
  const isInfo = step === "info";
  refs.infoStep.classList.toggle("is-active", isInfo);
  refs.permissionStep.classList.toggle("is-active", !isInfo);
  refs.stepInfo.classList.toggle("is-current", isInfo);
  refs.stepPerms.classList.toggle("is-current", !isInfo);
  refs.stepInfo.classList.toggle("is-complete", !isInfo);
  refs.backButton.hidden = isInfo;
  refs.continueButton.hidden = !isInfo;
  refs.saveRoleButton.hidden = isInfo;
  refs.saveStepButtons.forEach((button) => {
    button.hidden = state.editingIndex === null || step === "permissions" || button.dataset.saveStep !== step;
  });
  if (!isInfo) {
    refs.summaryName.textContent = refs.roleName.value.trim();
    refs.summaryDescription.textContent = refs.roleDescription.value.trim();
  }
}

function clearErrors() {
  refs.nameError.textContent = "";
  refs.descriptionError.textContent = "";
  refs.formAlert.hidden = true;
  refs.permissionHint.classList.remove("is-error");
}


/* source: ref-001-roles/js/permissions.js */




function descendants(rowId) {
  const result = [];
  const queue = [rowId];
  while (queue.length) {
    const parentId = queue.shift();
    state.permissionRows
      .filter((row) => row.parentId === parentId)
      .forEach((child) => { result.push(child); queue.push(child.id); });
  }
  return result;
}

function rowById(rowId) {
  return state.permissionRows.find((row) => row.id === rowId);
}

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

function isDisabled(row, operation) {
  return row.unavailable.includes(operation) || (operation !== "Consultar" && !row.checks.Consultar);
}

function handlePermissionChange(rowId, operation, checked) {
  const source = rowById(rowId);
  if (!source || source.unavailable.includes(operation)) return;
  setRowOperation(source, operation, checked);
  descendants(rowId).forEach((child) => setRowOperation(child, operation, checked));
  state.permissionDirty = true;
}

function renderPermissions() {
  refs.permissionBody.innerHTML = state.permissionRows.map((row) => `
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
  if (window.bootstrap) {
    document.querySelectorAll("[data-bs-toggle='tooltip']").forEach((element) => bootstrap.Tooltip.getOrCreateInstance(element));
  }
}

function hasSelectedPermission() {
  return state.permissionRows.some((row) => Object.values(row.checks).some(Boolean));
}

function selectedPermissionLabels() {
  return state.permissionRows
    .filter((row) => row.type === "functionality" && Object.values(row.checks).some(Boolean))
    .slice(0, 2)
    .map((row) => row.name);
}


/* source: ref-001-roles/js/roles.js */






function renderRoles() {
  refs.rolesBody.innerHTML = state.filteredRoles.map((role) => {
    const originalIndex = roles.findIndex((item) => item.name === role.name);
    const hasUsers = role.status === "Activo" && role.users > 0;
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
            <label class="form-check form-switch switch row-state-toggle ${hasUsers ? "is-disabled" : ""}" data-state="${originalIndex}" data-on-label="Activo" data-off-label="Inactivo" title="${hasUsers ? "No disponible: el rol tiene usuarios asociados." : ""}">
              <input class="form-check-input" type="checkbox" ${role.status === "Activo" ? "checked" : ""} ${hasUsers ? "disabled" : ""} aria-label="${role.status === "Activo" ? "Inactivar" : "Activar"} ${role.name}">
            </label>
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

function applyFilters() {
  const query = refs.filterName.value.trim().toLowerCase();
  const nameAdvanced = refs.filterNameAdvanced.value;
  const permission = document.getElementById("filterPermission").value;
  const updated = document.getElementById("filterUpdated").value;
  const status = refs.filterStatus.value;
  state.filteredRoles = roles.filter((role) => {
    const originalIndex = roles.findIndex((item) => item.id === role.id);
    const searchable = [originalIndex + 1, role.name, role.description, role.status, ...role.permissions].join(" ").toLowerCase();
    return searchable.includes(query)
      && (nameAdvanced === "Todos" || role.name === nameAdvanced)
      && (permission === "Todos" || role.permissions.includes(permission))
      && (updated === "Todos" || role.updated === updated)
      && (status === "Todos" || role.status === status);
  });
  renderRoles();
}

function handleRoleAction(event, onEdit) {
  const editButton = event.target.closest("[data-edit]");
  const menuButton = event.target.closest("[data-menu]");
  const stateControl = event.target.closest(".switch[data-state]");

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

  if (stateControl) {
    const input = stateControl.querySelector("input");
    const role = roles[Number(stateControl.dataset.state)];
    if (input.disabled || (role.status === "Activo" && role.users > 0)) {
      showToast(getMessage("M15"), "warning");
      return;
    }
    state.pendingStatus = { index: Number(stateControl.dataset.state), next: role.status === "Activo" ? "Inactivo" : "Activo" };
    prepareInactivationReason(state.pendingStatus.next === "Inactivo");
    openConfirmModal("confirmModal", getMessage(state.pendingStatus.next === "Activo" ? "M5" : "M6"));
  }
}

function handleEditStatusToggle(event) {
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
  prepareInactivationReason(next === "Inactivo");
  openConfirmModal("confirmModal", getMessage(next === "Activo" ? "M5" : "M6"));
}

function prepareInactivationReason(required) {
  refs.inactivationReasonWrap.hidden = !required;
  refs.inactivationReason.value = "";
  refs.inactivationReasonError.textContent = "";
}

function confirmStatus() {
  const pending = state.pendingEditStatus || state.pendingStatus;
  if (pending?.next === "Inactivo" && !refs.inactivationReason.value.trim()) {
    refs.inactivationReasonError.textContent = "Ingresa el motivo de inactivación.";
    refs.inactivationReason.focus();
    return;
  }
  if (state.pendingEditStatus) {
    const { index, next } = state.pendingEditStatus;
    roles[index].status = next;
    roles[index].inactivationReason = refs.inactivationReason.value.trim();
    roles[index].updated = "18/08/2026 09:00";
    state.pendingEditStatus = null;
    refs.editStatusToggles.forEach((toggle) => { toggle.checked = next === "Activo"; });
    refs.editStatusLabels.forEach((label) => { label.textContent = next; });
    closeConfirmModal("confirmModal");
    applyFilters();
    showToast(getMessage(next === "Activo" ? "M7" : "M8"), "success");
    return;
  }
  if (!state.pendingStatus) return;
  const { index, next } = state.pendingStatus;
  roles[index].status = next;
  roles[index].inactivationReason = refs.inactivationReason.value.trim();
  roles[index].updated = "18/08/2026 09:00";
  state.pendingStatus = null;
  closeConfirmModal("confirmModal");
  applyFilters();
  showToast(getMessage(next === "Activo" ? "M7" : "M8"), "success");
}


/* source: ref-001-roles/js/main.js */









function validateInfo() {
  clearErrors();
  let valid = true;
  const name = refs.roleName.value.trim();
  const description = refs.roleDescription.value.trim();
  const duplicate = roles.some((role, index) => role.name.toLowerCase() === name.toLowerCase() && index !== state.editingIndex);

  if (!name) {
    refs.nameError.textContent = "Ingresa el nombre del rol.";
    valid = false;
  } else if (duplicate) {
    refs.nameError.textContent = getMessage("M10");
    valid = false;
  }
  if (!description) {
    refs.descriptionError.textContent = "Ingresa la descripción del rol.";
    valid = false;
  }
  refs.formAlert.querySelector("span").textContent = getMessage("M66");
  refs.formAlert.hidden = valid;
  return valid;
}

function openRoleForm(role = null, index = null, sourceRequirement = "ALI-REF-001") {
  state.editingIndex = index;
  state.dirty = false;
  state.pendingWizardStep = null;
  resetPermissionDraft(role);
  showForm(role, sourceRequirement);
  renderPermissions();
}

function commitRoleSave({ stay = false } = {}) {
  const selectedLabels = selectedPermissionLabels();
  const savedRole = {
    id: state.editingIndex === null ? `role-${Date.now()}` : roles[state.editingIndex].id,
    name: refs.roleName.value.trim(),
    description: refs.roleDescription.value.trim(),
    permissions: selectedLabels.length ? [...selectedLabels, "+1 adicional"] : ["Consulta"],
    permissionDetails: selectedLabels.length ? ["Permiso adicional de configuración inicial"] : [],
    users: state.editingIndex === null ? 0 : roles[state.editingIndex].users,
    status: state.editingIndex === null ? "Activo" : roles[state.editingIndex].status,
    updated: "18/08/2026 09:00"
  };
  const wasEditing = state.editingIndex !== null;
  if (wasEditing) roles[state.editingIndex] = savedRole;
  else roles.push(savedRole);
  const message = getMessage(wasEditing ? "M3" : "M2");
  applyFilters();
  if (stay && wasEditing) {
    state.dirty = false;
    state.permissionDirty = false;
    showToast(message, "success");
    return;
  }
  state.dirty = false;
  state.permissionDirty = false;
  showList();
  resetEditingState();
  showToast(message, "success");
}

function saveEditStep(step) {
  if (step === "info" && !validateInfo()) return;
  if (step === "permissions" && !hasSelectedPermission()) {
    refs.permissionHint.classList.add("is-error");
    showToast(getMessage("M16"), "warning");
    return;
  }
  state.pendingSaveStep = step;
  openConfirmModal("confirmModal", getMessage("M1"));
}

function saveRole() {
  if (!hasSelectedPermission()) {
    refs.permissionHint.classList.add("is-error");
    showToast(getMessage("M16"), "warning");
    return;
  }
  if (state.pendingSave) return;
  state.pendingSave = true;
  openConfirmModal("confirmModal", getMessage("M1"));
}

function requestRoleStep(step) {
  const currentStep = refs.infoStep.classList.contains("is-active") ? "info" : "permissions";
  if (step === currentStep) return;
  if (state.editingIndex !== null && state.dirty) {
    const valid = currentStep === "info" ? validateInfo() : hasSelectedPermission();
    if (!valid) {
      if (currentStep === "permissions") refs.permissionHint.classList.add("is-error");
      showToast(getMessage("M12"), "warning");
      return;
    }
    state.pendingWizardStep = step;
    openConfirmModal("confirmModal", getMessage("M70"));
    return;
  }
  if (step === "permissions" && !validateInfo()) return;
  setFormStep(step);
}

function cancelRoleForm() {
  if (state.pendingCancel) return;
  state.pendingCancel = true;
  openConfirmModal("confirmModal", getMessage("M14"));
}

function rejectWizardStepChange() {
  if (state.pendingWizardStep === null) return;
  state.pendingWizardStep = null;
  closeConfirmModal("confirmModal");
}

function confirmPendingAction() {
  if (state.pendingWizardStep) {
    const targetStep = state.pendingWizardStep;
    state.pendingWizardStep = null;
    closeConfirmModal("confirmModal");
    commitRoleSave({ stay: true });
    setFormStep(targetStep);
    return;
  }
  if (state.pendingSaveStep) {
    state.pendingSaveStep = null;
    closeConfirmModal("confirmModal");
    commitRoleSave({ stay: true });
    return;
  }
  if (state.pendingSave) {
    state.pendingSave = false;
    closeConfirmModal("confirmModal");
    commitRoleSave({ stay: state.editingIndex !== null });
    return;
  }
  if (state.pendingCancel) {
    state.pendingCancel = false;
    closeConfirmModal("confirmModal");
    showList();
    resetEditingState();
    return;
  }
  confirmStatus();
}

refs.filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
  showToast(getPrototypeMessage("filtersApplied"), "info");
});
refs.filterToggle.addEventListener("click", () => {
  const expanded = refs.filterForm.classList.toggle("is-expanded");
  refs.filterToggle.setAttribute("aria-expanded", String(expanded));
  refs.filterToggle.setAttribute("aria-label", expanded ? "Cerrar filtros" : "Abrir filtros");
});
refs.stepInfo.addEventListener("click", () => requestRoleStep("info"));
refs.stepPerms.addEventListener("click", () => requestRoleStep("permissions"));
document.getElementById("clearBtn").addEventListener("click", () => {
  refs.filterName.value = "";
  refs.filterNameAdvanced.value = "Todos";
  document.getElementById("filterPermission").value = "Todos";
  document.getElementById("filterUpdated").value = "Todos";
  refs.filterStatus.value = "Todos";
  applyFilters();
  showToast(getPrototypeMessage("filtersCleared"), "info");
});
document.getElementById("newRoleBtn").addEventListener("click", () => openRoleForm());
document.getElementById("exportBtn").addEventListener("click", () => showToast(getMessage("M67"), "success"));
refs.rolesBody.addEventListener("click", (event) => handleRoleAction(event, openRoleForm));
refs.permissionBody.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[data-row][data-operation]");
  if (!checkbox) return;
  handlePermissionChange(checkbox.dataset.row, checkbox.dataset.operation, checkbox.checked);
  state.dirty = true;
  renderPermissions();
});
refs.roleName.addEventListener("input", () => { state.dirty = true; });
refs.roleDescription.addEventListener("input", () => { state.dirty = true; });
refs.editStatusToggles.forEach((toggle) => toggle.addEventListener("change", handleEditStatusToggle));
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) closeActionMenus(); });
document.getElementById("continueBtn").addEventListener("click", () => requestRoleStep("permissions"));
document.getElementById("backBtn").addEventListener("click", () => requestRoleStep("info"));
document.getElementById("cancelInfoBtn").addEventListener("click", cancelRoleForm);
document.getElementById("saveRoleBtn").addEventListener("click", saveRole);
refs.saveStepButtons.forEach((button) => button.addEventListener("click", () => saveEditStep(button.dataset.saveStep)));
document.getElementById("confirmBtn").addEventListener("click", confirmPendingAction);
refs.confirmModal.querySelector(".modal-footer [data-bs-dismiss='modal']").addEventListener("click", rejectWizardStepChange);
refs.confirmModal.addEventListener("hidden.bs.modal", () => {
  refs.inactivationReasonWrap.hidden = true;
  refs.inactivationReason.value = "";
  refs.inactivationReasonError.textContent = "";
  state.pendingSave = false;
  state.pendingSaveStep = null;
  state.pendingCancel = false;
  state.pendingWizardStep = null;
  state.pendingEditStatus = null;
  state.pendingStatus = null;
});

renderPermissions();
renderRoles();
attachTableSorting(document.querySelector("#listView .ssee-table"));

const deepLink = new URLSearchParams(window.location.search);
if (deepLink.get("step") === "permissions" && deepLink.get("role")) {
  const roleIndex = roles.findIndex((role) => role.id === deepLink.get("role"));
  if (roleIndex >= 0) {
    openRoleForm(roles[roleIndex], roleIndex, deepLink.get("source") || "ALI-REF-002");
    setFormStep("permissions");
  }
}
