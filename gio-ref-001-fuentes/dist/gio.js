
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

function showToast(element, message, type = "info") {
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
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => element.classList.remove("is-visible"), 4500);
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


/* source: gio-ref-001-fuentes/js/data.js */
const sources = [
  { id: "FDT-001", name: "Instituciones educativas", description: "Directorio validado de instituciones educativas.", origin: "Integración externa", intervention: "Seguimiento", period: "2026", records: "12,450", status: "Activa", updated: "18/08/2026 09:00" },
  { id: "FDT-002", name: "Directores registrados", description: "Directores asociados a cada institución.", origin: "Carga masiva", intervention: "Evaluación", period: "2026", records: "3,180", status: "En proceso", updated: "17/08/2026 16:45" },
  { id: "FDT-003", name: "Operativo piloto", description: "Registro sintético para pruebas del operativo.", origin: "Manual", intervention: "Operativo", period: "2026", records: "620", status: "Borrador", updated: "16/08/2026 11:20" },
  { id: "FDT-004", name: "Instituciones 2025", description: "Histórico de instituciones del periodo anterior.", origin: "Carga masiva", intervention: "Seguimiento", period: "2025", records: "11,890", status: "Inactiva", updated: "12/08/2026 10:05" },
  { id: "FDT-005", name: "Registro observado", description: "Fuente anulada luego de la revisión de calidad.", origin: "Manual", intervention: "Evaluación", period: "2025", records: "0", status: "Anulada", updated: "08/08/2026 14:05" }
];


/* source: gio-ref-001-fuentes/js/state.js */

const state = { filteredSources: [...sources], selectedIndex: null, editingIndex: null, pendingStatus: null, openMenu: null };


/* source: gio-ref-001-fuentes/js/ui.js */

const refs = {
  listView: document.getElementById("listView"), formView: document.getElementById("formView"), sourcesBody: document.getElementById("sourcesBody"), emptyState: document.getElementById("emptyState"), pageSummary: document.getElementById("pageSummary"), sourceCount: document.getElementById("sourceCount"), toast: document.getElementById("toast"), filterForm: document.getElementById("filterForm"), filterQuery: document.getElementById("filterQuery"), filterOrigin: document.getElementById("filterOrigin"), filterStatus: document.getElementById("filterStatus"), filterPeriod: document.getElementById("filterPeriod"), sourceName: document.getElementById("sourceName"), sourceDescription: document.getElementById("sourceDescription"), sourceOrigin: document.getElementById("sourceOrigin"), sourceIntervention: document.getElementById("sourceIntervention"), sourcePeriod: document.getElementById("sourcePeriod"), sourcePurpose: document.getElementById("sourcePurpose"), nameError: document.getElementById("nameError"), descriptionError: document.getElementById("descriptionError"), formTitle: document.getElementById("formTitle"), formBreadcrumb: document.getElementById("formBreadcrumb")
};
document.querySelectorAll(".location-card strong").forEach((node) => { node.textContent = "Ubicación"; });
document.querySelectorAll(".account-copy strong").forEach((node) => { node.textContent = "Administrador"; });

function showToast(first, second, third) {
  const hasElement = first && first.nodeType === 1;
  return renderToast(hasElement ? first : refs.toast, hasElement ? second : first, hasElement ? third : second);
}
{ enableTooltips };
function showList() { refs.listView.classList.add("is-active"); refs.formView.classList.remove("is-active"); }
function showForm(source = null) { refs.listView.classList.remove("is-active"); refs.formView.classList.add("is-active"); refs.formTitle.textContent = source ? "Editar fuente" : "Registrar nueva fuente"; refs.formBreadcrumb.textContent = `Gio / Fuentes de datos / ${source ? "Editar fuente" : "Nueva fuente"}`; refs.sourceName.value = source?.name || ""; refs.sourceDescription.value = source?.description || ""; refs.sourceOrigin.value = source?.origin || ""; refs.sourceIntervention.value = source?.intervention || ""; refs.sourcePeriod.value = source?.period || ""; refs.sourcePurpose.value = source?.purpose || ""; clearErrors(); }
function clearErrors() { refs.nameError.textContent = ""; refs.descriptionError.textContent = ""; }


/* source: gio-ref-001-fuentes/js/sources.js */






function statusClass(status) { return status === "Activa" ? "active" : status === "Anulada" ? "expired" : status === "Inactiva" ? "inactive" : status === "En proceso" ? "warning" : ""; }
refs.emptyState.textContent = getMessage("M9");
function actionLabel(source) { return source.status === "Activa" ? "Inactivar" : source.status === "Inactiva" ? "Activar" : "Cambiar estado"; }
function renderSources() {
  refs.sourcesBody.innerHTML = state.filteredSources.map((source) => {
    const index = sources.indexOf(source);
    const canToggle = ["Activa", "Inactiva"].includes(source.status);
    return `<tr><td><strong>${source.id}</strong></td><td><strong>${source.name}</strong><div class="description">${source.description}</div></td><td>${source.origin}</td><td>${source.intervention}</td><td>${source.period}</td><td>${source.records}</td><td><span class="status ${statusClass(source.status)}">${source.status}</span></td><td><div class="action-menu"><button class="menu-btn" type="button" data-menu-button="${index}" aria-expanded="false" aria-label="Abrir acciones de ${source.name}"><i class="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i></button><div class="legacy-dropdown" data-menu-panel="${index}" hidden><button type="button" data-action="view" data-index="${index}"><i class="fa-regular fa-eye"></i>Ver detalle</button><button type="button" data-action="edit" data-index="${index}"><i class="fa-regular fa-pen-to-square"></i>Editar</button>${canToggle ? `<button type="button" data-action="toggle" data-index="${index}"><i class="fa-solid fa-power-off"></i>${actionLabel(source)}</button>` : ""}</div></div></td></tr>`;
  }).join("");
  refs.emptyState.hidden = state.filteredSources.length > 0;
  refs.pageSummary.textContent = state.filteredSources.length ? `Mostrando 1 a ${state.filteredSources.length} de ${state.filteredSources.length} registros` : "Mostrando 0 registros";
  refs.sourceCount.textContent = `${sources.length} fuentes registradas`;
  enableTooltips();
}
function applyFilters() {
  const query = refs.filterQuery.value.trim().toLowerCase(); const origin = refs.filterOrigin.value; const status = refs.filterStatus.value; const period = refs.filterPeriod.value;
  state.filteredSources = sources.filter((source) => [source.id, source.name, source.origin, source.intervention, source.status].join(" ").toLowerCase().includes(query) && (origin === "Todos" || source.origin === origin) && (status === "Todos" || source.status === status) && (period === "Todos" || source.period === period)); renderSources();
}
function handleAction(event) {
  const menuButton = event.target.closest("[data-menu-button]"); const action = event.target.closest("[data-action]");
  if (menuButton) { const panel = refs.sourcesBody.querySelector(`[data-menu-panel='${menuButton.dataset.menuButton}']`); const opening = panel?.hidden; closeMenus(refs.sourcesBody); if (opening && panel) { panel.hidden = false; menuButton.setAttribute("aria-expanded", "true"); } return; }
  if (!action) return; closeMenus(refs.sourcesBody); const index = Number(action.dataset.index); const source = sources[index];
  if (action.dataset.action === "edit") { state.editingIndex = index; showForm(source); return; }
  if (action.dataset.action === "view") { showToast(`${source.name}: ${source.records} registros en estado ${source.status}.`, "info"); return; }
  if (action.dataset.action === "toggle") { state.pendingStatus = { index, next: source.status === "Activa" ? "Inactiva" : "Activa" }; openConfirmModal("confirmModal", `Vas a ${state.pendingStatus.next === "Activa" ? "activar" : "inactivar"} la fuente ${source.name}. ¿Deseas continuar?`); }
}
function confirmStatus() { if (!state.pendingStatus) return; const { index, next } = state.pendingStatus; sources[index].status = next; sources[index].updated = "18/08/2026 09:30"; state.pendingStatus = null; closeConfirmModal("confirmModal"); renderSources(); showToast(`Fuente ${next === "Activa" ? "activada" : "inactivada"} correctamente.`, "success"); }
function saveSource(event) { event.preventDefault(); refs.nameError.textContent = refs.sourceName.value.trim() ? "" : "Ingresa el nombre de la fuente."; refs.descriptionError.textContent = refs.sourceDescription.value.trim() ? "" : "Ingresa la descripción de la fuente."; if (!refs.sourceName.value.trim() || !refs.sourceDescription.value.trim() || !refs.sourceOrigin.value || !refs.sourceIntervention.value || !refs.sourcePeriod.value) { showToast("Completa los campos obligatorios.", "warning"); return; } const payload = { id: state.editingIndex === null ? `FDT-${String(sources.length + 1).padStart(3, "0")}` : sources[state.editingIndex].id, name: refs.sourceName.value.trim(), description: refs.sourceDescription.value.trim(), origin: refs.sourceOrigin.value, intervention: refs.sourceIntervention.value, period: refs.sourcePeriod.value, records: state.editingIndex === null ? "0" : sources[state.editingIndex].records, status: state.editingIndex === null ? "Borrador" : sources[state.editingIndex].status, updated: "18/08/2026 09:30", purpose: refs.sourcePurpose.value.trim() }; if (state.editingIndex === null) sources.unshift(payload); else sources[state.editingIndex] = payload; state.editingIndex = null; applyFilters(); showList(); showToast("Fuente registrada correctamente.", "success"); }


/* source: gio-ref-001-fuentes/js/main.js */




document.getElementById("filterForm").addEventListener("submit", (event) => { event.preventDefault(); applyFilters(); showToast(refs.toast, "Filtros aplicados.", "info"); });
["filterQuery", "filterOrigin", "filterStatus", "filterPeriod"].forEach((id) => document.getElementById(id).addEventListener("input", applyFilters));
document.getElementById("filterToggle").addEventListener("click", () => document.getElementById("filterForm").classList.toggle("is-expanded"));
document.getElementById("clearBtn").addEventListener("click", () => { refs.filterQuery.value = ""; refs.filterOrigin.value = "Todos"; refs.filterStatus.value = "Todos"; refs.filterPeriod.value = "Todos"; applyFilters(); showToast(refs.toast, "Filtros limpiados.", "info"); });
document.getElementById("newSourceBtn").addEventListener("click", () => { state.editingIndex = null; document.getElementById("sourceForm").reset(); showForm(); });
document.getElementById("cancelBtn").addEventListener("click", () => { state.editingIndex = null; showList(); });
document.getElementById("sourceForm").addEventListener("submit", saveSource);
refs.sourcesBody.addEventListener("click", handleAction);
document.getElementById("confirmBtn").addEventListener("click", confirmStatus);
document.getElementById("exportBtn").addEventListener("click", () => showToast(refs.toast, getMessage("M67"), "success"));
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) document.querySelectorAll("[data-menu-panel]").forEach((panel) => { panel.hidden = true; }); });
renderSources();
