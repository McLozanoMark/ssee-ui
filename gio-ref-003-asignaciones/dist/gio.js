const demoIndexLink=document.createElement("a");demoIndexLink.className="demo-index-link";demoIndexLink.href="../index.html";demoIndexLink.textContent="← Volver al índice";document.body.append(demoIndexLink);
/* source: design-system/interaction.js */
function showToast(element, message, type = "info") {
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
{ showToast, enableTooltips };


/* source: gio-ref-003-asignaciones/js/assignments.js */




function statusClass(status) { return status === "Finalizada" ? "active" : status === "Anulada" ? "expired" : status === "En proceso" || status === "Reasignada" ? "warning" : ""; }
function renderAssignments() { refs.assignmentsBody.innerHTML = state.filteredAssignments.map((assignment) => { const index = assignments.indexOf(assignment); const canReassign = !["Finalizada", "Anulada"].includes(assignment.status); return `<tr><td><strong>${assignment.instrument}</strong></td><td>${assignment.user}</td><td>${assignment.sample}</td><td>${assignment.start}</td><td>${assignment.end}</td><td>${assignment.progress}</td><td><span class="status ${statusClass(assignment.status)}">${assignment.status}</span></td><td><div class="action-menu"><button class="menu-btn" type="button" data-menu-button="${index}" aria-expanded="false" aria-label="Abrir acciones de ${assignment.instrument} para ${assignment.user}"><i class="fa-solid fa-ellipsis-vertical"></i></button><div class="legacy-dropdown" data-menu-panel="${index}" hidden><button type="button" data-action="view" data-index="${index}"><i class="fa-regular fa-eye"></i>Ver detalle</button>${canReassign ? `<button type="button" data-action="reassign" data-index="${index}"><i class="fa-solid fa-arrows-rotate"></i>Reasignar</button>` : ""}${canReassign ? `<button type="button" data-action="remove" data-index="${index}"><i class="fa-solid fa-ban"></i>Anular</button>` : ""}</div></div></td></tr>`; }).join(""); refs.emptyState.hidden = state.filteredAssignments.length > 0; refs.pageSummary.textContent = state.filteredAssignments.length ? `Mostrando 1 a ${state.filteredAssignments.length} de ${state.filteredAssignments.length} registros` : "Mostrando 0 registros"; refs.assignmentCount.textContent = `${assignments.length} asignaciones registradas`; enableTooltips(); }
function applyFilters() { const query = document.getElementById("filterQuery").value.trim().toLowerCase(); const status = document.getElementById("filterStatus").value; const period = document.getElementById("filterPeriod").value; const progress = document.getElementById("filterProgress").value; state.filteredAssignments = assignments.filter((assignment) => [assignment.id, assignment.instrument, assignment.user, assignment.sample, assignment.status].join(" ").toLowerCase().includes(query) && (status === "Todos" || assignment.status === status) && (period === "Todos" || assignment.period === period) && (progress === "Todos" || assignment.progressGroup === progress)); renderAssignments(); }
function openAssignment(index = null) { state.editingIndex = index; const assignment = index === null ? null : assignments[index]; refs.assignmentTitle.textContent = assignment ? "Reasignar instrumento" : "Nueva asignación"; refs.assignmentSaveBtn.textContent = assignment ? "Reasignar" : "Guardar asignación"; refs.assignmentContext.textContent = assignment ? `Actualiza la asignación de ${assignment.instrument} para ${assignment.user}.` : "Selecciona los elementos que participarán en la asignación."; refs.assignmentInstrument.value = assignment?.instrument || "Ficha de seguimiento"; refs.assignmentUser.value = assignment?.user || "Ana Paredes"; refs.assignmentSample.value = assignment?.sample || "Muestra nacional 2026"; refs.assignmentStart.value = assignment ? assignment.start.split("/").reverse().join("-") : "2026-08-18"; refs.assignmentEnd.value = assignment ? assignment.end.split("/").reverse().join("-") : "2026-09-18"; bootstrap.Modal.getOrCreateInstance(refs.assignmentModal).show(); }
function handleAction(event) { const menu = event.target.closest("[data-menu-button]"); const action = event.target.closest("[data-action]"); if (menu) { const panel = refs.assignmentsBody.querySelector(`[data-menu-panel='${menu.dataset.menuButton}']`); const opening = panel?.hidden; closeMenus(refs.assignmentsBody); if (opening && panel) { panel.hidden = false; menu.setAttribute("aria-expanded", "true"); } return; } if (!action) return; closeMenus(refs.assignmentsBody); const index = Number(action.dataset.index); const assignment = assignments[index]; if (action.dataset.action === "view") showToast(refs.toast, `${assignment.instrument} está ${assignment.status} con un progreso de ${assignment.progress}.`, "info"); if (action.dataset.action === "reassign") openAssignment(index); if (action.dataset.action === "remove") { state.pendingAssignment = { index, remove: true }; openConfirmModal("confirmModal", `Vas a anular la asignación de ${assignment.instrument} para ${assignment.user}. ¿Deseas continuar?`); } }
function openNewAssignment() { openAssignment(); }
function saveAssignment(event) { event.preventDefault(); const payload = { instrument: refs.assignmentInstrument.value, user: refs.assignmentUser.value, sample: refs.assignmentSample.value, start: refs.assignmentStart.value.split("-").reverse().join("/"), end: refs.assignmentEnd.value.split("-").reverse().join("/"), period: refs.assignmentStart.value.slice(0, 4), progress: "0%", progressGroup: "Sin iniciar", status: "Pendiente", updated: "18/08/2026 09:30" }; if (state.editingIndex === null) { payload.id = `ASN-${String(assignments.length + 1).padStart(3, "0")}`; assignments.unshift(payload); bootstrap.Modal.getOrCreateInstance(refs.assignmentModal).hide(); renderAssignments(); showToast(refs.toast, "Asignación registrada correctamente.", "success"); return; } state.pendingAssignment = { index: state.editingIndex, payload }; openConfirmModal("confirmModal", `La reasignación cambiará el instrumento asignado a ${payload.user}. ¿Deseas continuar?`); }
function confirmAction() { if (!state.pendingAssignment) return; const pending = state.pendingAssignment; if (pending.remove) { assignments[pending.index].status = "Anulada"; assignments[pending.index].updated = "18/08/2026 09:30"; showToast(refs.toast, "Asignación anulada correctamente.", "success"); } else { assignments[pending.index] = { ...assignments[pending.index], ...pending.payload, status: "Reasignada", updated: "18/08/2026 09:30" }; bootstrap.Modal.getOrCreateInstance(refs.assignmentModal).hide(); showToast(refs.toast, "Asignación reasignada correctamente.", "success"); } state.pendingAssignment = null; closeConfirmModal("confirmModal"); renderAssignments(); }


/* source: gio-ref-003-asignaciones/js/main.js */


document.getElementById("filterForm").addEventListener("submit", (event) => { event.preventDefault(); applyFilters(); showToast(refs.toast, "Filtros aplicados.", "info"); });
["filterQuery", "filterStatus", "filterPeriod", "filterProgress"].forEach((id) => document.getElementById(id).addEventListener("input", applyFilters));
document.getElementById("filterToggle").addEventListener("click", () => document.getElementById("filterForm").classList.toggle("is-expanded"));
document.getElementById("clearBtn").addEventListener("click", () => { document.getElementById("filterQuery").value = ""; document.getElementById("filterStatus").value = "Todos"; document.getElementById("filterPeriod").value = "Todos"; document.getElementById("filterProgress").value = "Todos"; applyFilters(); showToast(refs.toast, "Filtros limpiados.", "info"); });
document.getElementById("newAssignmentBtn").addEventListener("click", openNewAssignment); refs.assignmentsBody.addEventListener("click", handleAction); document.getElementById("assignmentForm").addEventListener("submit", saveAssignment); document.getElementById("confirmBtn").addEventListener("click", confirmAction); document.getElementById("exportBtn").addEventListener("click", () => showToast(refs.toast, "Exportación Excel generada para el prototipo.", "success")); document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) document.querySelectorAll("[data-menu-panel]").forEach((panel) => { panel.hidden = true; }); }); renderAssignments();
