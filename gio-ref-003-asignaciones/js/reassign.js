import { assignmentState, findUser, getAssignment, reassignAssignment, users, validateReassignment } from "./data.js";
import { escapeHtml, getParam, openConfirm, closeConfirm, qs, showToast } from "./common.js";
import { createDateRangeFilter } from "../../design-system/date-range.js";

const assignment = getAssignment(getParam("id"));
const currentUser = findUser(assignment?.userId);
const range = createDateRangeFilter(qs("[data-date-range]"));
let pendingData = null;
const displayStatus = assignmentState(assignment);
const restricted = !assignment || assignment.active === false || ["Finalizada", "Anulada"].includes(assignment.status);

function statusClass(status) { return status === "Activa" ? "active" : "inactive"; }
function renderHistory() {
  if (!assignment) return;
  const historic = (assignment.history || []).filter((entry) => entry.action === "reassign");
  const rows = [...historic.map((entry) => ({ ...entry, state: "Inactiva" })), { userId: assignment.userId, start: assignment.start, end: assignment.end, state: displayStatus, reason: "-" }];
  qs("#historyRows").innerHTML = rows.map((entry, index) => `<tr><td>${index + 1}</td><td>${escapeHtml(findUser(entry.userId).name)}<small class="table-subtext">${escapeHtml(entry.userId)}</small></td><td>${escapeHtml(entry.start || "-")}</td><td>${escapeHtml(entry.end || "-")}</td><td><span class="status ${statusClass(entry.state)}">${escapeHtml(entry.state)}</span></td><td>${escapeHtml(entry.reason || "-")}</td></tr>`).join("");
}

if (assignment) {
  qs("#currentStatus").className = `status ${statusClass(displayStatus)}`; qs("#currentStatus").textContent = displayStatus;
  qs("#currentAssignment").innerHTML = `<div class="detail-field"><span>Proyecto</span><strong>${escapeHtml(assignment.project)}</strong></div><div class="detail-field"><span>Instrumento</span><strong>${escapeHtml(assignment.instrument)}</strong></div><div class="detail-field"><span>Usuario actual</span><strong>${escapeHtml(currentUser.name)}<small>${escapeHtml(currentUser.id)}</small></strong></div><div class="detail-field"><span>Muestra</span><strong>${escapeHtml(assignment.sample)}</strong></div><div class="detail-field"><span>Periodo</span><strong>${escapeHtml(assignment.start)} - ${escapeHtml(assignment.end)}</strong></div><div class="detail-field"><span>Registros de la muestra</span><strong>${escapeHtml(assignment.recordCount ?? 0)}</strong></div><div class="detail-field"><span>Última actividad</span><strong>${escapeHtml(assignment.lastActivity || "Sin actividad registrada")}</strong></div><div class="detail-field"><span>Encuestas registradas</span><strong>${escapeHtml(assignment.completedRecords ?? 0)}</strong></div>`;
  qs("#newUser").innerHTML = `<option value="">Selecciona un usuario</option>${users.filter((user) => user.id !== assignment.userId && user.active && user.canReceiveAssignments).map((user) => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name)} - ${escapeHtml(user.id)}</option>`).join("")}`;
  renderHistory();
}

if (restricted) { qs("#reassignRestriction").hidden = false; qs("#reassignRestriction").textContent = !assignment ? "No se encontró la asignación seleccionada." : "Esta asignación no puede reasignarse porque está inactiva, finalizada o anulada."; qs("#reassignForm").querySelectorAll("select, input, textarea, button[type=submit]").forEach((control) => { control.disabled = true; }); range?.setDisabled(true); }
qs("#reason").addEventListener("input", (event) => { qs("#reasonCount").textContent = event.target.value.length; });
qs("#reassignForm").addEventListener("submit", (event) => { event.preventDefault(); if (restricted || !range?.validate() || !qs("#start").value) return showToast(restricted ? "La asignación no puede reasignarse en su estado actual." : "Completa los campos obligatorios.", "warning"); pendingData = { userId: qs("#newUser").value, reassignmentDate: qs("#start").value.split("-").reverse().join("/"), reason: qs("#reason").value.trim(), notify: qs("#notifyUser").checked }; const errors = validateReassignment(assignment.id, pendingData); if (errors.length) return showToast(errors[0], "warning"); openConfirm("La asignación actual se inactivará y se registrará una nueva asignación para el usuario seleccionado."); });
qs("#confirmAction").addEventListener("click", () => { if (!pendingData) return; const result = reassignAssignment(assignment.id, pendingData); if (!result.ok) return showToast(result.error, "warning"); pendingData = null; closeConfirm(); window.location.href = "index.html?result=reassigned"; });
