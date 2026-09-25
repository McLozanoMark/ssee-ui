import { downloadExcel, closeConfirm, escapeHtml, getParam, linkTo, openConfirm, qs, showToast } from "./common.js";
import { findUser, getAssignment, getRecord, getRecordVariables, isEditableAssignment, saveRecordVariables } from "./data.js";
import { attachTableSorting } from "../../design-system/table-sort.js";

const assignment = getAssignment(getParam("id"));
const record = assignment ? getRecord(assignment, getParam("record")) : null;
const editable = isEditableAssignment(assignment);
const restricted = !editable;
const user = findUser(record?.userId || assignment?.userId);
let variables = assignment && record ? getRecordVariables(assignment, record) : [];
let filtered = [...variables];
let page = 1;
let pendingAction = null;
let pendingCode = null;

function renderSummary() {
  if (!assignment || !record) return;
  qs("#recordSummary").innerHTML = `<div class="detail-field"><span>ID Unidad</span><strong>${escapeHtml(record.unitId)}</strong></div><div class="detail-field"><span>ID Informante</span><strong>${escapeHtml(record.informantId)}<small>${escapeHtml(user.name)}</small></strong></div><div class="detail-field"><span>IE / Sede</span><strong>${escapeHtml(record.institution)}<small>${escapeHtml(record.sede)}</small></strong></div><div class="detail-field"><span>Ubicación</span><strong>${escapeHtml(record.dre)}<small>${escapeHtml(record.ugel)}</small></strong></div><div class="detail-field"><span>Proyecto</span><strong>${escapeHtml(assignment.project)}</strong></div><div class="detail-field"><span>Instrumento</span><strong>${escapeHtml(assignment.instrument)}</strong></div><div class="detail-field"><span>Muestra</span><strong>${escapeHtml(assignment.sample)}</strong></div><div class="detail-field"><span>Fecha de asignación</span><strong>${escapeHtml(assignment.start)}</strong></div>`;
}

function render() {
  const size = Number(qs("#variablePageSize").value); page = Math.min(page, Math.max(1, Math.ceil(filtered.length / size))); const offset = (page - 1) * size; const visible = filtered.slice(offset, offset + size); const empty = filtered.length === 0;
  qs("#variableRows").innerHTML = visible.map((variable, index) => `<tr><td>${offset + index + 1}</td><td>${escapeHtml(variable.code)}</td><td>${escapeHtml(variable.name)}</td><td>${escapeHtml(variable.type)}</td><td>${escapeHtml(variable.value)}</td><td>${escapeHtml(variable.source)}</td><td>${restricted ? `<span class="table-readonly">Solo lectura</span>` : `<button class="row-action variable-remove-action" type="button" data-action="remove-variable" data-code="${escapeHtml(variable.code)}" title="Quitar variable" aria-label="Quitar variable ${escapeHtml(variable.name)}"><i class="fa-solid fa-trash-can" aria-hidden="true"></i><span class="visually-hidden">Quitar</span></button>`}</td></tr>`).join("");
  qs("#variableEmptyState").hidden = !empty; qs("#variableCount").textContent = `(${filtered.length})`; qs("#variableSummary").textContent = empty ? "Mostrando 0 variables" : `Mostrando ${offset + 1} a ${Math.min(offset + size, filtered.length)} de ${filtered.length} variables`; const pages = Math.max(1, Math.ceil(filtered.length / size)); qs("#variablePagination").innerHTML = Array.from({ length: pages }, (_, index) => `<button class="page-btn${index + 1 === page ? " is-current" : ""}" type="button" data-page="${index + 1}">${index + 1}</button>`).join("");
  qs("#addVariable").hidden = restricted; qs("#variablesPageDescription").textContent = restricted ? "Consulta las variables precargadas del registro seleccionado. La asignación está en solo lectura." : "Consulta y administra las variables precargadas del registro seleccionado."; qs("#variablesDescription").textContent = restricted ? "Se muestran las variables precargadas del registro seleccionado. La asignación está en solo lectura." : "Se muestran las variables precargadas para este registro. Puedes agregar o quitar variables según corresponda.";
}

function openAddVariable() {
  if (restricted) return showToast("La asignación está en solo lectura.", "warning");
  const available = [...new Set(["COD_MODULAR", "NOMBRE_IE", "GESTION_IE", "DRE", "UGEL", "DISTRITO", "PROVINCIA", "DEPARTAMENTO", "NIVEL_EDUCATIVO", "TURNO", "AREA_GEOGRAFICA", "DIRECCION", "TELEFONO", "CORREO_IE", "DIRECTOR", "COD_LOCAL", "CODIGO_UGEL", "REGION", "UBIGEO", "CENTRO_POBLADO", "RED_EDUCATIVA", "TIPO_SERVICIO", "MODALIDAD", "JORNADA", "NUMERO_AULAS", "NUMERO_DOCENTES", "NUMERO_ESTUDIANTES", "FECHA_CORTE", "PERIODO", "FUENTE_REGISTRO", "ID_PERSONA", "NOMBRE_COMPLETO", "TIPO_DOCUMENTO", "NUMERO_DOCUMENTO", "FECHA_REGISTRO"].filter((code) => !variables.some((variable) => variable.code === code)))];
  if (!available.length) return showToast("No hay más variables disponibles para este registro.", "info");
  pendingAction = "add"; pendingCode = null; qs("#confirmTitle").textContent = "Agregar variable"; openConfirm("Selecciona la variable que deseas asociar al registro.");
  qs("#confirmMessage").innerHTML = `<label class="filter-field" for="variableToAdd"><span>Variable disponible</span><select class="form-select" id="variableToAdd">${available.map((code) => `<option value="${escapeHtml(code)}">${escapeHtml(code)}</option>`).join("")}</select></label>`;
}

function persist(action) {
  const result = saveRecordVariables(assignment.id, record.unitId, variables, action); if (!result.ok) return showToast(result.error, "warning"); filtered = [...variables]; closeConfirm(); render(); showToast(action === "add-variable" ? "Variable agregada correctamente." : "Variable quitada correctamente.", "success");
}

qs("#variableFilters").addEventListener("submit", (event) => { event.preventDefault(); const query = qs("#variableQuery").value.trim().toLowerCase(); const type = qs("#variableType").value; filtered = variables.filter((item) => (!query || `${item.code} ${item.name}`.toLowerCase().includes(query)) && (!type || item.type === type)); page = 1; render(); showToast(filtered.length ? "Filtros aplicados." : "No se encontraron variables con los criterios de búsqueda seleccionados.", filtered.length ? "info" : "warning"); });
qs("#clearVariables").addEventListener("click", () => { qs("#variableFilters").reset(); filtered = [...variables]; page = 1; render(); showToast("Filtros limpiados.", "info"); });
qs("#variablePageSize").addEventListener("change", () => { page = 1; render(); });
qs("#variablePagination").addEventListener("click", (event) => { const button = event.target.closest("[data-page]"); if (button) { page = Number(button.dataset.page); render(); } });
qs("#variableRows").addEventListener("click", (event) => { const button = event.target.closest("[data-action='remove-variable']"); if (!button) return; pendingAction = "remove"; pendingCode = button.dataset.code; qs("#confirmTitle").textContent = "Confirmar acción"; openConfirm("¿Deseas quitar la variable seleccionada de este registro?"); });
qs("#confirmAction").addEventListener("click", () => {
  if (pendingAction === "add") { const selectedCode = qs("#variableToAdd")?.value; if (!selectedCode) return; const definition = [...getRecordVariables(assignment, record), ...variables].find((item) => item.code === selectedCode); if (!definition) return; variables.push({ ...definition, source: definition.source || "Censo Educativo MINEDU" }); pendingAction = null; return persist("add-variable"); }
  if (pendingAction === "remove") { variables = variables.filter((variable) => variable.code !== pendingCode); pendingAction = null; pendingCode = null; return persist("remove-variable"); }
});
qs("#exportVariables").addEventListener("click", () => { if (!filtered.length) return showToast("No existen variables para exportar.", "warning"); downloadExcel("variables-precargadas.xls", ["N.°", "Código de variable", "Nombre de variable", "Tipo de variable", "Valor precargado", "Fuente de datos"], filtered.map((variable, index) => [index + 1, variable.code, variable.name, variable.type, variable.value, variable.source])); showToast("Archivo Excel generado correctamente.", "success"); });
qs("#addVariable").addEventListener("click", openAddVariable);
qs("#helpVariables").addEventListener("click", () => showToast("Consulta las variables precargadas del registro seleccionado. Puedes administrarlas mientras la asignación sea editable.", "info"));
qs("#backDetail").href = assignment ? linkTo("detail.html", { id: assignment.id }) : "index.html";

if (assignment && record) { renderSummary(); render(); } else { qs("#variableDescription"); qs("#variableEmptyState").hidden = false; }
attachTableSorting(qs(".variable-table table"));
