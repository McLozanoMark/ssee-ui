
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


/* source: gio-ref-003-asignaciones/js/data.js */
const assignments = [
  { id: "ASN-001", instrument: "Ficha de seguimiento", user: "Ana Paredes", sample: "Muestra nacional 2026", start: "18/08/2026", end: "18/09/2026", progress: "0%", progressGroup: "Sin iniciar", period: "2026", status: "Pendiente", updated: "18/08/2026 09:00" },
  { id: "ASN-002", instrument: "Instrumento de evaluación", user: "Vladimir Castro", sample: "Muestra de directores", start: "15/08/2026", end: "15/09/2026", progress: "42%", progressGroup: "En curso", period: "2026", status: "En proceso", updated: "18/08/2026 08:40" },
  { id: "ASN-003", instrument: "Lista de verificación", user: "Ernesto Guevara", sample: "Piloto operativo", start: "01/08/2026", end: "12/08/2026", progress: "100%", progressGroup: "Completado", period: "2026", status: "Finalizada", updated: "12/08/2026 17:10" },
  { id: "ASN-004", instrument: "Ficha de seguimiento", user: "Juan Palomino", sample: "Muestra histórica 2025", start: "05/08/2026", end: "30/08/2026", progress: "25%", progressGroup: "En curso", period: "2025", status: "Reasignada", updated: "11/08/2026 15:20" },
  { id: "ASN-005", instrument: "Instrumento de evaluación", user: "Johanna Gonzales", sample: "Muestra anulada", start: "20/07/2026", end: "20/08/2026", progress: "0%", progressGroup: "Sin iniciar", period: "2025", status: "Anulada", updated: "08/08/2026 14:05" }
];


/* source: gio-ref-003-asignaciones/js/state.js */

const state = { filteredAssignments: [...assignments], editingIndex: null, pendingAssignment: null };


/* source: gio-ref-003-asignaciones/js/ui.js */

const refs = { assignmentsBody: document.getElementById("assignmentsBody"), emptyState: document.getElementById("emptyState"), pageSummary: document.getElementById("pageSummary"), assignmentCount: document.getElementById("assignmentCount"), toast: document.getElementById("toast"), assignmentModal: document.getElementById("assignmentModal"), assignmentTitle: document.getElementById("assignmentTitle"), assignmentContext: document.getElementById("assignmentContext"), assignmentInstrument: document.getElementById("assignmentInstrument"), assignmentUser: document.getElementById("assignmentUser"), assignmentSample: document.getElementById("assignmentSample"), assignmentStart: document.getElementById("assignmentStart"), assignmentEnd: document.getElementById("assignmentEnd"), assignmentSaveBtn: document.getElementById("assignmentSaveBtn") };
document.querySelectorAll(".location-card strong").forEach((node) => { node.textContent = "Sede"; });
document.querySelectorAll(".account-copy strong").forEach((node) => { node.textContent = "Administrador"; });

function showToast(first, second, third) {
  const hasElement = first && first.nodeType === 1;
  return renderToast(hasElement ? first : refs.toast, hasElement ? second : first, hasElement ? third : second);
}
{ enableTooltips };


/* source: gio-ref-003-asignaciones/js/assignments.js */





refs.emptyState.textContent = getMessage("M9");
function statusClass(status) { return status === "Finalizada" ? "active" : status === "Anulada" ? "expired" : status === "En proceso" || status === "Reasignada" ? "warning" : ""; }
function renderAssignments() { refs.assignmentsBody.innerHTML = state.filteredAssignments.map((assignment) => { const index = assignments.indexOf(assignment); const canReassign = !["Finalizada", "Anulada"].includes(assignment.status); return `<tr><td><strong>${assignment.instrument}</strong></td><td>${assignment.user}</td><td>${assignment.sample}</td><td>${assignment.start}</td><td>${assignment.end}</td><td>${assignment.progress}</td><td><span class="status ${statusClass(assignment.status)}">${assignment.status}</span></td><td><div class="row-actions"><button class="row-action" type="button" data-action="view" data-index="${index}" title="Ver detalle"><i class="fa-regular fa-eye" aria-hidden="true"></i><span>Ver detalle</span></button>${canReassign ? `<button class="row-action" type="button" data-action="reassign" data-index="${index}" title="Reasignar"><i class="fa-solid fa-arrows-rotate" aria-hidden="true"></i><span>Reasignar</span></button><button class="row-action" type="button" data-action="remove" data-index="${index}" title="Anular"><i class="fa-solid fa-ban" aria-hidden="true"></i><span>Anular</span></button>` : ""}</div></td></tr>`; }).join(""); refs.emptyState.hidden = state.filteredAssignments.length > 0; refs.pageSummary.textContent = state.filteredAssignments.length ? `Mostrando 1 a ${state.filteredAssignments.length} de ${state.filteredAssignments.length} registros` : "Mostrando 0 registros"; refs.assignmentCount.textContent = `${assignments.length} asignaciones registradas`; enableTooltips(); }
function applyFilters() { const query = document.getElementById("filterQuery").value.trim().toLowerCase(); const instrument = document.getElementById("filterInstrument").value.trim().toLowerCase(); const user = document.getElementById("filterUser").value.trim().toLowerCase(); const sample = document.getElementById("filterSample").value.trim().toLowerCase(); const start = document.getElementById("filterStart").value; const end = document.getElementById("filterEnd").value; const status = document.getElementById("filterStatus").value; const period = document.getElementById("filterPeriod").value; const progress = document.getElementById("filterProgress").value; state.filteredAssignments = assignments.filter((assignment) => { const searchable = [assignment.id, assignment.instrument, assignment.user, assignment.sample, assignment.start, assignment.end, assignment.progress, assignment.status].join(" ").toLowerCase(); const startIso = assignment.start.split("/").reverse().join("-"); const endIso = assignment.end.split("/").reverse().join("-"); return searchable.includes(query) && assignment.instrument.toLowerCase().includes(instrument) && assignment.user.toLowerCase().includes(user) && assignment.sample.toLowerCase().includes(sample) && (!start || startIso === start) && (!end || endIso === end) && (status === "Todos" || assignment.status === status) && (period === "Todos" || assignment.period === period) && (progress === "Todos" || assignment.progressGroup === progress); }); renderAssignments(); }
 function openAssignment(index = null) { state.editingIndex = index; const assignment = index === null ? null : assignments[index]; refs.assignmentTitle.textContent = assignment ? "Reasignar instrumento" : "Registrar asignación"; refs.assignmentSaveBtn.textContent = "Guardar"; refs.assignmentContext.textContent = assignment ? `Actualiza la asignación de ${assignment.instrument} para ${assignment.user}.` : "Selecciona los elementos que participarán en la asignación."; refs.assignmentInstrument.value = assignment?.instrument || "Ficha de seguimiento"; refs.assignmentUser.value = assignment?.user || "Ana Paredes"; refs.assignmentSample.value = assignment?.sample || "Muestra nacional 2026"; refs.assignmentStart.value = assignment ? assignment.start.split("/").reverse().join("-") : "2026-08-18"; refs.assignmentEnd.value = assignment ? assignment.end.split("/").reverse().join("-") : "2026-09-18"; bootstrap.Modal.getOrCreateInstance(refs.assignmentModal).show(); }
function handleAction(event) { const action = event.target.closest("[data-action]"); if (!action) return; const index = Number(action.dataset.index); const assignment = assignments[index]; if (action.dataset.action === "view") showToast(refs.toast, `${assignment.instrument} está ${assignment.status} con un progreso de ${assignment.progress}.`, "info"); if (action.dataset.action === "reassign") openAssignment(index); if (action.dataset.action === "remove") { state.pendingAssignment = { index, remove: true }; openConfirmModal("confirmModal", `Vas a anular la asignación de ${assignment.instrument} para ${assignment.user}. ¿Deseas continuar?`); } }
function openNewAssignment() { openAssignment(); }
function saveAssignment(event) { event.preventDefault(); const payload = { instrument: refs.assignmentInstrument.value, user: refs.assignmentUser.value, sample: refs.assignmentSample.value, start: refs.assignmentStart.value.split("-").reverse().join("/"), end: refs.assignmentEnd.value.split("-").reverse().join("/"), period: refs.assignmentStart.value.slice(0, 4), progress: "0%", progressGroup: "Sin iniciar", status: "Pendiente", updated: "18/08/2026 09:30" }; if (state.editingIndex === null) { payload.id = `ASN-${String(assignments.length + 1).padStart(3, "0")}`; assignments.unshift(payload); bootstrap.Modal.getOrCreateInstance(refs.assignmentModal).hide(); renderAssignments(); showToast(refs.toast, "Asignación registrada correctamente.", "success"); return; } state.pendingAssignment = { index: state.editingIndex, payload }; openConfirmModal("confirmModal", `La reasignación cambiará el instrumento asignado a ${payload.user}. ¿Deseas continuar?`); }
function confirmAction() { if (!state.pendingAssignment) return; const pending = state.pendingAssignment; if (pending.remove) { assignments[pending.index].status = "Anulada"; assignments[pending.index].updated = "18/08/2026 09:30"; showToast(refs.toast, "Asignación anulada correctamente.", "success"); } else { assignments[pending.index] = { ...assignments[pending.index], ...pending.payload, status: "Reasignada", updated: "18/08/2026 09:30" }; bootstrap.Modal.getOrCreateInstance(refs.assignmentModal).hide(); showToast(refs.toast, "Asignación reasignada correctamente.", "success"); } state.pendingAssignment = null; closeConfirmModal("confirmModal"); renderAssignments(); }


/* source: gio-ref-003-asignaciones/js/main.js */



document.getElementById("filterForm").addEventListener("submit", (event) => { event.preventDefault(); applyFilters(); showToast(refs.toast, "Filtros aplicados.", "info"); });
document.getElementById("filterToggle").addEventListener("click", () => {
  const filterForm = document.getElementById("filterForm");
  const filterToggle = document.getElementById("filterToggle");
  const expanded = filterForm.classList.toggle("is-expanded");
  filterToggle.setAttribute("aria-expanded", String(expanded));
  filterToggle.setAttribute("aria-label", expanded ? "Cerrar filtros" : "Abrir filtros");
});
document.getElementById("clearBtn").addEventListener("click", () => { document.getElementById("filterQuery").value = ""; document.getElementById("filterInstrument").value = ""; document.getElementById("filterUser").value = ""; document.getElementById("filterSample").value = ""; document.getElementById("filterStart").value = ""; document.getElementById("filterEnd").value = ""; document.getElementById("filterStatus").value = "Todos"; document.getElementById("filterPeriod").value = "Todos"; document.getElementById("filterProgress").value = "Todos"; applyFilters(); showToast(refs.toast, "Filtros limpiados.", "info"); });
document.getElementById("newAssignmentBtn").addEventListener("click", openNewAssignment); refs.assignmentsBody.addEventListener("click", handleAction); document.getElementById("assignmentForm").addEventListener("submit", saveAssignment); document.getElementById("confirmBtn").addEventListener("click", confirmAction); document.getElementById("exportBtn").addEventListener("click", () => showToast(refs.toast, getMessage("M67"), "success")); document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) document.querySelectorAll("[data-menu-panel]").forEach((panel) => { panel.hidden = true; }); }); renderAssignments();
