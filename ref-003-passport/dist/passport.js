const demoIndexLink=document.createElement("a");demoIndexLink.className="demo-index-link";demoIndexLink.href="../index.html";demoIndexLink.textContent="← Volver al índice";document.body.append(demoIndexLink);
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


/* source: ref-003-passport/js/main.js */




const records = [
  { username: "12345678", name: "María Lozano", type: "Passport", roles: ["Administrador USE"], projects: ["Operativo 2026"], status: "Activo" },
  { username: "87654321", name: "Juan Castro", type: "Documento", roles: ["Supervisor de Seguimiento"], projects: ["Evaluación 2026"], status: "Activo" },
  { username: "45871236", name: "Rosa Quispe", type: "Autoregistro", roles: [], projects: [], status: "Inactivo" },
  { username: "74125896", name: "Diego Huamán", type: "Passport", roles: ["Registrador"], projects: ["Seguimiento 2026"], status: "Activo" },
];

const body = document.getElementById("usersBody");
const toast = document.getElementById("toast");
const typeFilter = document.createElement("select");
let automaticSyncTimer;
let syncRunning = false;

function showToast(message, type = "info") {
  renderToast(toast, message, type);
}

function configureView() {
  document.querySelector(".side-nav .nav-item.is-active").textContent = "Usuarios";
  document.querySelector(".location-card strong").textContent = "Sede";
  document.querySelector(".account-copy strong").textContent = "Administrador";
  document.querySelector(".location-card").insertAdjacentHTML("beforeend", '<i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>');
  document.querySelector(".account").innerHTML = '<button class="bell" type="button" aria-label="Notificaciones"><i class="fa-regular fa-bell"></i></button><div class="account-separator" aria-hidden="true"></div><div class="account-copy"><strong>Administrador</strong><span>Superadministrador</span></div><div class="avatar" aria-hidden="true">A</div><i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>';
  document.querySelector(".breadcrumb").innerHTML = '<a href="../index.html">Índice de requerimientos</a> / ALI-REF-003 / Sincronización Passport';
  document.querySelector("h1").textContent = "Gestión de usuarios";
  document.querySelector(".page-subtitle").textContent = "Bandeja general de usuarios y sincronización con Passport.";
  document.getElementById("syncBtn").innerHTML = '<i class="fa-solid fa-rotate"></i> Sincronizar usuarios';
  document.querySelector(".source-notice span").textContent = "La sincronización automática mantiene los datos de Passport actualizados. Este botón permite forzarla de inmediato.";
  document.querySelector(".sync-status > div:first-child span").textContent = "Última sincronización con Passport";
  document.querySelector(".table-heading h2").textContent = "Bandeja general de usuarios";
  document.querySelector(".table-heading .muted").remove();
  document.querySelector(".ssee-table thead tr").innerHTML = '<th aria-sort="none"><button class="sort-button" type="button" data-sort-key="username" data-sort-type="text">Usuario <i class="fa-solid fa-arrow-down-up" aria-hidden="true"></i></button></th><th aria-sort="none"><button class="sort-button" type="button" data-sort-key="name" data-sort-type="text">Nombres y apellidos <i class="fa-solid fa-arrow-down-up" aria-hidden="true"></i></button></th><th aria-sort="none"><button class="sort-button" type="button" data-sort-key="type" data-sort-type="text">Tipo de autenticación <i class="fa-solid fa-arrow-down-up" aria-hidden="true"></i></button></th><th aria-sort="none"><button class="sort-button" type="button" data-sort-key="roles" data-sort-type="text">Roles <i class="fa-solid fa-arrow-down-up" aria-hidden="true"></i></button></th><th aria-sort="none"><button class="sort-button" type="button" data-sort-key="projects" data-sort-type="text">Proyectos <i class="fa-solid fa-arrow-down-up" aria-hidden="true"></i></button></th><th aria-sort="none"><button class="sort-button" type="button" data-sort-key="status" data-sort-type="text">Estado <i class="fa-solid fa-arrow-down-up" aria-hidden="true"></i></button></th><th>Acciones</th>';
  document.querySelector(".ssee-table thead tr").insertAdjacentHTML("afterbegin", '<th data-column="row-number">N.°</th>');
  document.querySelector(".result-grid").innerHTML = `
    <div class="result-card"><i class="fa-solid fa-users"></i><div><span>Total de usuarios</span><strong id="totalUsers">0</strong></div></div>
    <div class="result-card"><i class="fa-solid fa-user-check"></i><div><span>Activos</span><strong id="activeUsers">0</strong></div></div>
    <div class="result-card"><i class="fa-solid fa-user-slash"></i><div><span>Inactivos</span><strong id="inactiveUsers">0</strong></div></div>
    <div class="result-card"><i class="fa-solid fa-user-lock"></i><div><span>Pendientes de acceso</span><strong id="pendingUsers">0</strong></div></div>`;
  const label = document.createElement("label");
  label.className = "table-filter";
  label.innerHTML = "Tipo de autenticación";
  typeFilter.className = "form-select";
  typeFilter.innerHTML = "<option>Todos</option><option>Passport</option><option>Documento</option><option>Autoregistro</option>";
  label.append(typeFilter);
  document.querySelector(".table-heading").append(label);
  typeFilter.addEventListener("change", render);
}

function render() {
  const type = typeFilter.value || "Todos";
  const visible = records.filter((record) => type === "Todos" || record.type === type);
  body.innerHTML = visible.map((record) => `
    <tr><td>${records.indexOf(record) + 1}</td><td><strong>${record.username}</strong></td><td>${record.name}</td><td>${record.type}</td>
      <td>${record.roles.length ? record.roles.map((role) => `<span class="tag">${role}</span>`).join(" ") : '<span class="muted">Pendiente</span>'}</td>
      <td>${record.projects.length ? record.projects.map((project) => `<span class="tag">${project}</span>`).join(" ") : '<span class="muted">Pendiente</span>'}</td>
      <td><span class="status ${record.status === "Activo" ? "active" : "inactive"}">${record.status}</span></td>
      <td><div class="row-actions"><button class="row-action" type="button" data-action="roles" data-access-action="open-users" data-user-name="${record.name}" title="Asignar" aria-label="Asignar a ${record.name}"><i class="fa-solid fa-user-gear" aria-hidden="true"></i><span>Asignar</span></button></div></td></tr>`).join("");
  document.getElementById("totalUsers").textContent = visible.length;
  document.getElementById("activeUsers").textContent = visible.filter((record) => record.status === "Activo").length;
  document.getElementById("inactiveUsers").textContent = visible.filter((record) => record.status === "Inactivo").length;
  document.getElementById("pendingUsers").textContent = visible.filter((record) => !record.roles.length || !record.projects.length).length;
}

configureView();
attachTableSorting(document.querySelector(".ssee-table"));

function runSync() {
  if (syncRunning) return;
  const button = document.getElementById("syncBtn");
  const syncState = document.getElementById("syncState");
  syncRunning = true;
  button.disabled = true;
  syncState.textContent = "En proceso";
  syncState.className = "status warning";
  showToast(getPrototypeMessage("syncStarted"), "info");
  setTimeout(() => {
    syncState.textContent = "Completada";
    syncState.className = "status active";
    document.getElementById("lastSync").textContent = "18/08/2026 09:00";
    document.getElementById("processed").textContent = "28";
    button.disabled = false;
    syncRunning = false;
    showToast(getMessage("M22"), "success");
  }, 1200);
}

document.getElementById("syncBtn").addEventListener("click", () => {
  window.clearTimeout(automaticSyncTimer);
  runSync();
});

render();
automaticSyncTimer = window.setTimeout(runSync, 3500);
body.addEventListener("click", (event) => {
  if (event.target.closest("[data-access-action='open-users']")) {
    const button = event.target.closest("[data-access-action='open-users']");
    window.location.href = `../ref-006-users/index.html?accessName=${encodeURIComponent(button.dataset.userName)}`;
  }
});
