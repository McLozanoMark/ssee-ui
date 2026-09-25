import { assignmentState, findUser, getAssignment, getAssignmentRecords } from "./data.js";
import { escapeHtml, getParam, linkTo, qs, showToast } from "./common.js";
import { attachTableSorting } from "../../design-system/table-sort.js";

const assignment = getAssignment(getParam("id"));
const records = assignment ? getAssignmentRecords(assignment) : [];
let filtered = [...records];
let page = 1;

function statusClass(status) { return status === "Activa" ? "active" : "inactive"; }
function assignmentStatus() { return assignmentState(assignment); }

function renderSummary() {
  if (!assignment) return;
  const user = findUser(assignment.userId); const displayStatus = assignmentStatus();
  qs("#assignmentSummary").innerHTML = `<div class="detail-field"><span>Proyecto</span><strong>${escapeHtml(assignment.project)}</strong></div><div class="detail-field"><span>Instrumento</span><strong>${escapeHtml(assignment.instrument)}</strong></div><div class="detail-field"><span>Usuario asignado</span><strong>${escapeHtml(user.name)}<small>${escapeHtml(user.id)}</small></strong></div><div class="detail-field"><span>Muestra</span><strong>${escapeHtml(assignment.sample)}</strong></div><div class="detail-field"><span>Periodo</span><strong>${escapeHtml(assignment.start)} - ${escapeHtml(assignment.end)}</strong></div><div class="detail-field"><span>Progreso</span><strong>${escapeHtml(assignment.progress)}<small>${escapeHtml(assignment.progressGroup)}</small></strong></div>`;
  qs("#assignmentStatus").className = `status ${statusClass(displayStatus)}`; qs("#assignmentStatus").textContent = displayStatus;
}

function render() {
  const size = Number(qs("#detailPageSize").value); const offset = (page - 1) * size; const visible = filtered.slice(offset, offset + size); const status = assignmentStatus();
  qs("#recordRows").innerHTML = visible.map((record, index) => { const user = findUser(record.userId); const recordStatus = status; return `<tr><td>${offset + index + 1}</td><td>${escapeHtml(record.unitId)}</td><td>${escapeHtml(record.informantId)}</td><td><div class="cell-stack"><strong>${escapeHtml(user.name)}</strong><span>${escapeHtml(user.id)}</span></div></td><td>${escapeHtml(record.dre)}</td><td>${escapeHtml(record.ugel)}</td><td>${escapeHtml(assignment.start)}</td><td><span class="status ${statusClass(recordStatus)}">${escapeHtml(recordStatus)}</span></td><td><a class="row-action" href="${linkTo("variables.html", { id: assignment.id, record: record.unitId })}" title="Ver variables"><i class="fa-solid fa-eye" aria-hidden="true"></i><span>Ver variables</span></a></td></tr>`; }).join("");
  qs("#emptyState").hidden = filtered.length > 0; qs("#recordCount").textContent = `${filtered.length} registros`; qs("#detailSummary").textContent = filtered.length ? `Mostrando ${offset + 1} a ${Math.min(offset + size, filtered.length)} de ${filtered.length} registros` : "Mostrando 0 registros";
  const pages = Math.max(1, Math.ceil(filtered.length / size)); qs("#detailPagination").innerHTML = Array.from({ length: pages }, (_, index) => `<button class="page-btn${index + 1 === page ? " is-current" : ""}" type="button" data-page="${index + 1}">${index + 1}</button>`).join("");
}

function applyFilters() {
  const query = qs("#detailQuery").value.trim().toLowerCase(); const dre = qs("#detailDre").value; const ugel = qs("#detailUgel").value;
  filtered = records.filter((record) => { const user = findUser(record.userId); const searchable = [record.unitId, record.informantId, record.dre, record.ugel, user.id, user.name].join(" ").toLowerCase(); return (!query || searchable.includes(query)) && (!dre || record.dre === dre) && (!ugel || record.ugel === ugel); });
  page = 1; render(); return filtered.length;
}

qs("#detailFilters").addEventListener("submit", (event) => { event.preventDefault(); const count = applyFilters(); showToast(count ? "Filtros aplicados." : "No se encontraron registros con los criterios de búsqueda seleccionados.", count ? "info" : "warning"); });
qs("#clearDetail").addEventListener("click", () => { qs("#detailFilters").reset(); applyFilters(); showToast("Filtros limpiados.", "info"); });
qs("#detailFilterToggle").addEventListener("click", () => { const toggle = qs("#detailFilterToggle"); const form = qs("#detailFilters"); const expanded = toggle.getAttribute("aria-expanded") === "true"; toggle.setAttribute("aria-expanded", String(!expanded)); form.classList.toggle("is-expanded", !expanded); });
qs("#detailPageSize").addEventListener("change", () => { page = 1; render(); });
qs("#detailPagination").addEventListener("click", (event) => { const button = event.target.closest("[data-page]"); if (button) { page = Number(button.dataset.page); render(); } });

if (assignment) { renderSummary(); render(); } else { qs("#recordRows").innerHTML = ""; qs("#emptyState").hidden = false; qs("#detailSummary").textContent = "No se encontró la asignación seleccionada."; }
attachTableSorting(qs(".assignment-records-table table"));
