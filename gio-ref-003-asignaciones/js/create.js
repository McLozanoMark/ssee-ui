import { createAssignment, findProject, findSample, projects, samples, users, validateCreateAssignment } from "./data.js";
import { downloadExcel, escapeHtml, openConfirm, qs, showToast, closeConfirm } from "./common.js";
import { createDateRangeFilter } from "../../design-system/date-range.js";

const range = createDateRangeFilter(qs("[data-date-range]"));
let mode = "with-sample";
let previewRecords = [];
let page = 1;
let pendingAction = null;

function populateProjects() {
  qs("#project").innerHTML = `<option value="">Selecciona un proyecto</option>${projects.map((project) => `<option>${escapeHtml(project.name)}</option>`).join("")}`;
  qs("#user").innerHTML = `<option value="">Selecciona un usuario</option>${users.filter((user) => user.active && user.canReceiveAssignments).map((user) => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name)} - ${escapeHtml(user.id)}</option>`).join("")}`;
}

function populateInstruments() {
  const project = findProject(qs("#project").value);
  qs("#instrument").innerHTML = `<option value="">Selecciona un instrumento</option>${project.instruments.map((instrument) => `<option>${escapeHtml(instrument)}</option>`).join("")}`;
  qs("#instrument").disabled = !qs("#project").value;
}

function populateSamples() {
  const project = qs("#project").value; const instrument = qs("#instrument").value;
  const availableSamples = samples.filter((sample) => sample.projects.includes(project) && sample.instruments.includes(instrument));
  qs("#sample").innerHTML = `<option value="">${availableSamples.length ? "Selecciona una muestra" : "No hay muestras disponibles"}</option>${availableSamples.map((sample) => `<option value="${escapeHtml(sample.name)}">${escapeHtml(sample.name)}</option>`).join("")}`;
  qs("#sample").disabled = !qs("#instrument").value;
}

function renderSampleInfo() {
  const sample = findSample(qs("#sample").value); const selectedUser = users.find((user) => user.id === qs("#user").value); const info = qs("#sampleInfo"); const visible = mode === "with-sample" ? Boolean(sample) : Boolean(selectedUser);
  info.hidden = !visible; if (!visible) return;
  if (mode === "with-sample") {
    info.setAttribute("aria-label", "Información de la muestra seleccionada");
    info.querySelectorAll("span")[0].textContent = "Total de registros"; info.querySelectorAll("span")[1].textContent = "Fuente de datos"; info.querySelectorAll("span")[2].textContent = "Campo usuario";
    qs("#sampleRecordTotal").textContent = `${sample.total} registros`; qs("#sampleSource").textContent = sample.source; qs("#sampleUserField").textContent = sample.userField;
  } else {
    info.setAttribute("aria-label", "Información del usuario seleccionado");
    info.querySelectorAll("span")[0].textContent = "Código de usuario"; info.querySelectorAll("span")[1].textContent = "Nombre completo"; info.querySelectorAll("span")[2].textContent = "Estado";
    qs("#sampleRecordTotal").textContent = selectedUser.id; qs("#sampleSource").textContent = selectedUser.name; qs("#sampleUserField").textContent = selectedUser.active ? "Activo" : "Inactivo";
  }
}

function setMode(nextMode) {
  mode = nextMode;
  document.querySelectorAll("[data-assignment-mode]").forEach((button) => { const selected = button.dataset.assignmentMode === mode; button.classList.toggle("is-selected", selected); button.setAttribute("aria-selected", String(selected)); });
  qs("#sampleField").hidden = mode !== "with-sample"; qs("#sample").required = mode === "with-sample"; qs("#userField").hidden = mode === "with-sample"; qs("#user").required = mode === "without-sample";
  if (mode === "with-sample") qs("#user").value = ""; else qs("#sample").value = "";
  qs("#sampleTotal").textContent = mode === "with-sample" ? "Selecciona una muestra para consultar sus datos." : "La asignación se asociará directamente al usuario seleccionado.";
  renderSampleInfo();
}

function buildPreview() {
  const selectedSample = findSample(qs("#sample").value); const selectedUser = users.find((user) => user.id === (mode === "with-sample" ? selectedSample?.userId : qs("#user").value)) || users[0];
  const total = mode === "with-sample" ? selectedSample?.total || 0 : 1;
  previewRecords = Array.from({ length: total }, (_, index) => { const recordUser = users.find((user) => user.id === (mode === "with-sample" ? selectedSample?.userIds?.[index] || selectedSample?.userId : qs("#user").value)) || selectedUser; return { number: index + 1, user: recordUser, identifier: mode === "with-sample" ? String(150001 + index).padStart(6, "0") : "SIN-MUESTRA-001", informantId: mode === "with-sample" ? `INF-${String(index + 1).padStart(6, "0")}` : "INF-SIN-MUESTRA" }; });
}

function dateLabel() { return qs("[data-date-range-label]").textContent; }

function renderPreview() {
  const size = Number(qs("#previewPageSize").value); const offset = (page - 1) * size; const visible = previewRecords.slice(offset, offset + size);
  qs("#previewRows").innerHTML = visible.map((record) => `<tr><td>${record.number}</td><td>${escapeHtml(record.user.name)}<br><span class="text-muted">${escapeHtml(record.user.id)}</span></td><td>${escapeHtml(record.identifier)}</td><td>${escapeHtml(dateLabel())}</td></tr>`).join("");
  qs("#previewSummary").textContent = `Mostrando ${previewRecords.length ? offset + 1 : 0} a ${Math.min(offset + size, previewRecords.length)} de ${previewRecords.length} registros`;
  const pages = Math.max(1, Math.ceil(previewRecords.length / size)); qs("#previewPagination").innerHTML = Array.from({ length: pages }, (_, index) => `<button class="page-btn${index + 1 === page ? " is-current" : ""}" type="button" data-page="${index + 1}">${index + 1}</button>`).join("");
}

function validate() {
  const required = ["#project", "#instrument"]; if (mode === "with-sample") required.push("#sample"); else required.push("#user");
  if (!required.every((selector) => qs(selector).value) || !range?.validate() || !qs("#start").value || !qs("#end").value) return showToast("Completa los campos obligatorios.", "warning");
  const selectedSample = findSample(qs("#sample").value); const selectedUser = users.find((user) => user.id === (mode === "with-sample" ? selectedSample?.userId : qs("#user").value));
  const errors = validateCreateAssignment({ mode, project: qs("#project").value, instrument: qs("#instrument").value, sample: mode === "with-sample" ? qs("#sample").value : "Sin muestra", userId: selectedUser?.id || "", start: qs("#start").value, end: qs("#end").value });
  if (errors.length) return showToast(errors[0], "warning"); return true;
}

function showStep(step) {
  qs("#dataStep").classList.toggle("is-active", step === 1); qs("#previewStep").classList.toggle("is-active", step === 2); qs("#stepData").classList.toggle("is-current", step === 1); qs("#stepPreview").classList.toggle("is-current", step === 2); qs("#backBtn").hidden = step === 1; qs("#continueBtn").hidden = step === 2; qs("#confirmCreateBtn").hidden = step === 1;
  if (step !== 2) return;
  buildPreview(); page = 1; const selectedUser = users.find((user) => user.id === qs("#user").value);
  qs("#assignmentSummary").innerHTML = `<div><span>Modalidad</span><strong>${mode === "with-sample" ? "Con muestra" : "Sin muestra"}</strong></div><div><span>Proyecto</span><strong>${escapeHtml(qs("#project").value)}</strong></div><div><span>Instrumento</span><strong>${escapeHtml(qs("#instrument").value)}</strong></div><div><span>${mode === "with-sample" ? "Muestra" : "Usuario"}</span><strong>${escapeHtml(mode === "with-sample" ? qs("#sample").value : selectedUser?.name || "")}</strong></div><div><span>Periodo</span><strong>${escapeHtml(dateLabel())}</strong></div>`;
  qs("#previewDescription").textContent = mode === "with-sample" ? `Se generarán ${previewRecords.length} asignaciones para los registros de la muestra seleccionada.` : "Se generará una asignación para el usuario seleccionado."; renderPreview();
}

function requestCancel() { pendingAction = "cancel"; qs("#confirmTitle").textContent = "Cancelar creación"; openConfirm("Se perderán los datos ingresados. ¿Deseas cancelar la creación de la asignación?"); }

qs("#assignmentModeTabs").addEventListener("click", (event) => { const button = event.target.closest("[data-assignment-mode]"); if (button) setMode(button.dataset.assignmentMode); });
qs("#project").addEventListener("change", () => { populateInstruments(); qs("#sample").innerHTML = "<option value=\"\">Selecciona un instrumento primero</option>"; qs("#sample").disabled = true; });
qs("#instrument").addEventListener("change", populateSamples);
qs("#sample").addEventListener("change", () => { const sample = findSample(qs("#sample").value); qs("#sampleTotal").textContent = sample ? `Población total: ${sample.total} registros.` : "Selecciona una muestra para consultar sus datos."; renderSampleInfo(); });
qs("#user").addEventListener("change", renderSampleInfo);
qs("#continueBtn").addEventListener("click", () => { if (validate()) showStep(2); });
qs("#backBtn").addEventListener("click", () => showStep(1));
qs("#previewPageSize").addEventListener("change", () => { page = 1; renderPreview(); });
qs("#previewPagination").addEventListener("click", (event) => { const button = event.target.closest("[data-page]"); if (button) { page = Number(button.dataset.page); renderPreview(); } });
qs("#exportPreview").addEventListener("click", () => { if (!previewRecords.length) return showToast("No existen registros para exportar.", "warning"); downloadExcel("asignaciones-preview.xls", ["N.°", "Usuario", "Identificador", "Fecha de asignación"], previewRecords.map((record) => [record.number, record.user.name, record.identifier, dateLabel()])); showToast("Archivo Excel generado correctamente.", "success"); });
qs("#confirmCreateBtn").addEventListener("click", () => { if (validate()) { pendingAction = "create"; qs("#confirmTitle").textContent = "Confirmar creación"; openConfirm("Se crearán las asignaciones con la configuración seleccionada."); } });
document.querySelectorAll('a[href="index.html"]').forEach((link) => link.addEventListener("click", (event) => { event.preventDefault(); requestCancel(); }));
qs("#confirmAction").addEventListener("click", () => {
  if (pendingAction === "cancel") { pendingAction = null; closeConfirm(); window.location.href = "index.html"; return; }
  if (pendingAction !== "create") return;
  const selectedSample = findSample(qs("#sample").value); const selectedUser = users.find((user) => user.id === (mode === "with-sample" ? selectedSample?.userId : qs("#user").value)) || users[0];
  createAssignment({ project: qs("#project").value, mode, instrument: qs("#instrument").value, userId: selectedUser.id, sample: mode === "with-sample" ? qs("#sample").value : "Sin muestra", start: qs("#start").value.split("-").reverse().join("/"), end: qs("#end").value.split("-").reverse().join("/"), records: previewRecords.map((record) => ({ unitId: record.identifier, informantId: record.informantId, userId: record.user.id })) });
  pendingAction = null; closeConfirm(); window.location.href = "index.html?result=created";
});

populateProjects(); populateInstruments(); setMode("with-sample");
