import { assignmentState, findUser, getAssignment, isEditableAssignment, updateAssignment } from "./data.js";
import { closeConfirm, escapeHtml, getParam, linkTo, openConfirm, qs, showToast } from "./common.js";

const assignment = getAssignment(getParam("id"));
const editable = isEditableAssignment(assignment);
const initialActive = assignment?.active !== false;
let pendingActive = null;
let pendingAction = null;

function assignmentModeLabel(mode) { return mode === "without-sample" ? "Sin muestra" : "Con muestra"; }
function statusClass(status) { return status === "Activa" ? "active" : "inactive"; }
function hasUnsavedChanges() { return editable && qs("#activeAssignment").checked !== initialActive; }
function requestCancel() {
  if (!hasUnsavedChanges()) return window.location.href = "index.html";
  pendingAction = "discard"; qs("#confirmTitle").textContent = "Descartar cambios"; openConfirm("Tienes cambios sin guardar. ¿Deseas descartarlos?");
}

function render() {
  if (!assignment) return;
  const user = findUser(assignment.userId); const displayStatus = assignmentState(assignment);
  qs("#editSummary").innerHTML = `<div class="detail-field"><span>Proyecto</span><strong>${escapeHtml(assignment.project)}</strong></div><div class="detail-field"><span>Instrumento</span><strong>${escapeHtml(assignment.instrument)}</strong></div><div class="detail-field"><span>Tipo de asignación</span><strong>${assignmentModeLabel(assignment.mode)}</strong></div><div class="detail-field"><span>Usuario asignado</span><strong>${escapeHtml(user.name)}<small>${escapeHtml(user.id)}</small></strong></div><div class="detail-field"><span>Muestra</span><strong>${escapeHtml(assignment.sample)}</strong></div><div class="detail-field"><span>Periodo</span><strong>${escapeHtml(assignment.start)} - ${escapeHtml(assignment.end)}</strong></div>`;
  qs("#currentStatus").className = `status ${statusClass(displayStatus)}`; qs("#currentStatus").textContent = displayStatus; qs("#activeAssignment").checked = initialActive; qs("#operationalStatus").textContent = `${assignment.status} · ${assignment.progressGroup}`; qs("#originalDate").textContent = assignment.start;
  const variablesLink = qs("#variablesLink"); variablesLink.href = linkTo("detail.html", { id: assignment.id }); variablesLink.title = "Seleccionar un registro para consultar sus variables"; variablesLink.innerHTML = '<i class="fa-solid fa-list-check icon" aria-hidden="true"></i>Consultar variables por registro';
  if (!editable) {
    qs("#editRestriction").hidden = false; qs("#editRestriction").textContent = assignment.status === "En proceso" ? "La asignación ya inició y no admite cambios." : "La asignación no puede modificarse en su estado actual."; qs("#activeAssignment").disabled = true; qs("#saveEdit").disabled = true;
  }
}

qs("#editForm").addEventListener("submit", (event) => { event.preventDefault(); if (!editable) return showToast("La asignación no puede modificarse en su estado actual.", "warning"); pendingActive = qs("#activeAssignment").checked; pendingAction = "save"; qs("#confirmTitle").textContent = "Confirmar actualización"; openConfirm(`La asignación quedará ${pendingActive ? "activa" : "inactiva"}. ¿Deseas guardar el cambio?`); });
qs("#confirmAction").addEventListener("click", () => {
  if (pendingAction === "discard") { pendingAction = null; closeConfirm(); return window.location.href = "index.html"; }
  if (pendingAction !== "save" || pendingActive === null) return;
  const result = updateAssignment(assignment.id, { active: pendingActive }); if (!result.ok) return showToast(result.error, "warning"); pendingActive = null; pendingAction = null; closeConfirm(); window.location.href = "index.html?result=updated";
});
document.querySelectorAll("[data-edit-cancel]").forEach((control) => control.addEventListener("click", (event) => { event.preventDefault(); requestCancel(); }));

render();
