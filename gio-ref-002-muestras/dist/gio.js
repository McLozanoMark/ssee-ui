
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


/* source: gio-ref-002-muestras/js/data.js */
const samples = [
  { id: "MST-001", name: "Muestra nacional 2026", description: "Muestra principal para seguimiento institucional.", intervention: "Seguimiento", period: "2026", source: "Instituciones educativas", units: "1,250", status: "Publicada", updated: "18/08/2026 09:00" },
  { id: "MST-002", name: "Muestra de directores", description: "Unidades seleccionadas para evaluación de directores.", intervention: "Evaluación", period: "2026", source: "Directores registrados", units: "420", status: "Configurada", updated: "17/08/2026 16:45" },
  { id: "MST-003", name: "Piloto operativo", description: "Configuración sintética para validar reglas de selección.", intervention: "Operativo", period: "2026", source: "Operativo piloto", units: "80", status: "Borrador", updated: "16/08/2026 11:20" },
  { id: "MST-004", name: "Muestra histórica 2025", description: "Muestra cerrada del periodo anterior.", intervention: "Seguimiento", period: "2025", source: "Instituciones 2025", units: "980", status: "Cerrada", updated: "12/08/2026 10:05" },
  { id: "MST-005", name: "Muestra anulada", description: "Configuración anulada por validación de cobertura.", intervention: "Evaluación", period: "2025", source: "Directores registrados", units: "0", status: "Anulada", updated: "08/08/2026 14:05" }
];


/* source: gio-ref-002-muestras/js/state.js */

const state = { filteredSamples: [...samples], editingIndex: null, openMenu: null };


/* source: gio-ref-002-muestras/js/ui.js */

const refs = { listView: document.getElementById("listView"), formView: document.getElementById("formView"), samplesBody: document.getElementById("samplesBody"), emptyState: document.getElementById("emptyState"), pageSummary: document.getElementById("pageSummary"), sampleCount: document.getElementById("sampleCount"), toast: document.getElementById("toast"), filterQuery: document.getElementById("filterQuery"), filterStatus: document.getElementById("filterStatus"), filterPeriod: document.getElementById("filterPeriod"), filterIntervention: document.getElementById("filterIntervention"), sampleName: document.getElementById("sampleName"), sampleDescription: document.getElementById("sampleDescription"), sampleSource: document.getElementById("sampleSource"), sampleInstrument: document.getElementById("sampleInstrument"), sampleIntervention: document.getElementById("sampleIntervention"), samplePeriod: document.getElementById("samplePeriod"), nameError: document.getElementById("nameError"), descriptionError: document.getElementById("descriptionError"), formTitle: document.getElementById("formTitle"), formBreadcrumb: document.getElementById("formBreadcrumb") };
{ showToast, enableTooltips };
function showList() { refs.listView.classList.add("is-active"); refs.formView.classList.remove("is-active"); }
function showForm(sample = null) { refs.listView.classList.remove("is-active"); refs.formView.classList.add("is-active"); refs.formTitle.textContent = sample ? "Editar muestra" : "Registrar nueva muestra"; refs.formBreadcrumb.textContent = `Gio / Muestras / ${sample ? "Editar muestra" : "Nueva muestra"}`; refs.sampleName.value = sample?.name || ""; refs.sampleDescription.value = sample?.description || ""; refs.sampleSource.value = sample?.source || ""; refs.sampleIntervention.value = sample?.intervention || ""; refs.samplePeriod.value = sample?.period || ""; }


/* source: gio-ref-002-muestras/js/samples.js */




function statusClass(status) { return status === "Publicada" ? "active" : status === "Anulada" ? "expired" : status === "Configurada" ? "warning" : status === "Cerrada" ? "inactive" : ""; }
function renderSamples() { refs.samplesBody.innerHTML = state.filteredSamples.map((sample) => { const index = samples.indexOf(sample); return `<tr><td><strong>${sample.id}</strong></td><td><strong>${sample.name}</strong><div class="description">${sample.description}</div></td><td>${sample.intervention}</td><td>${sample.period}</td><td>${sample.source}</td><td>${sample.units}</td><td><span class="status ${statusClass(sample.status)}">${sample.status}</span></td><td><div class="action-menu"><button class="menu-btn" type="button" data-menu-button="${index}" aria-expanded="false" aria-label="Abrir acciones de ${sample.name}"><i class="fa-solid fa-ellipsis-vertical"></i></button><div class="legacy-dropdown" data-menu-panel="${index}" hidden><button type="button" data-action="view" data-index="${index}"><i class="fa-regular fa-eye"></i>Ver detalle</button><button type="button" data-action="edit" data-index="${index}"><i class="fa-regular fa-pen-to-square"></i>Editar</button><button type="button" data-action="clone" data-index="${index}"><i class="fa-regular fa-copy"></i>Clonar</button></div></div></td></tr>`; }).join(""); refs.emptyState.hidden = state.filteredSamples.length > 0; refs.pageSummary.textContent = state.filteredSamples.length ? `Mostrando 1 a ${state.filteredSamples.length} de ${state.filteredSamples.length} registros` : "Mostrando 0 registros"; refs.sampleCount.textContent = `${samples.length} muestras registradas`; enableTooltips(); }
function applyFilters() { const query = refs.filterQuery.value.trim().toLowerCase(); const status = refs.filterStatus.value; const period = refs.filterPeriod.value; const intervention = refs.filterIntervention.value; state.filteredSamples = samples.filter((sample) => [sample.id, sample.name, sample.intervention, sample.source, sample.status].join(" ").toLowerCase().includes(query) && (status === "Todos" || sample.status === status) && (period === "Todos" || sample.period === period) && (intervention === "Todos" || sample.intervention === intervention)); renderSamples(); }
function handleAction(event) { const menu = event.target.closest("[data-menu-button]"); const action = event.target.closest("[data-action]"); if (menu) { const panel = refs.samplesBody.querySelector(`[data-menu-panel='${menu.dataset.menuButton}']`); const opening = panel?.hidden; closeMenus(refs.samplesBody); if (opening && panel) { panel.hidden = false; menu.setAttribute("aria-expanded", "true"); } return; } if (!action) return; closeMenus(refs.samplesBody); const sample = samples[Number(action.dataset.index)]; if (action.dataset.action === "edit") { state.editingIndex = samples.indexOf(sample); showForm(sample); } else if (action.dataset.action === "clone") { samples.unshift({ ...sample, id: `MST-${String(samples.length + 1).padStart(3, "0")}`, name: `${sample.name} - copia`, status: "Borrador", updated: "18/08/2026 09:30" }); applyFilters(); showToast(refs.toast, "Muestra clonada como borrador.", "success"); } else { showToast(refs.toast, `${sample.name}: ${sample.units} unidades en estado ${sample.status}.`, "info"); } }
function saveSample(event) { event.preventDefault(); refs.nameError.textContent = refs.sampleName.value.trim() ? "" : "Ingresa el nombre de la muestra."; refs.descriptionError.textContent = refs.sampleDescription.value.trim() ? "" : "Ingresa la descripción de la muestra."; if (!refs.sampleName.value.trim() || !refs.sampleDescription.value.trim() || !refs.sampleSource.value || !refs.sampleIntervention.value || !refs.samplePeriod.value) { showToast(refs.toast, "Completa los campos obligatorios.", "warning"); return; } const previous = state.editingIndex === null ? null : samples[state.editingIndex]; const payload = { id: previous?.id || `MST-${String(samples.length + 1).padStart(3, "0")}`, name: refs.sampleName.value.trim(), description: refs.sampleDescription.value.trim(), source: refs.sampleSource.value, intervention: refs.sampleIntervention.value, period: refs.samplePeriod.value, units: previous?.units || "0", status: previous?.status || "Borrador", updated: "18/08/2026 09:30" }; if (previous) samples[state.editingIndex] = payload; else samples.unshift(payload); state.editingIndex = null; applyFilters(); showList(); showToast(refs.toast, "Muestra registrada correctamente.", "success"); }


/* source: gio-ref-002-muestras/js/main.js */



document.getElementById("filterForm").addEventListener("submit", (event) => { event.preventDefault(); applyFilters(); showToast(refs.toast, "Filtros aplicados.", "info"); });
["filterQuery", "filterStatus", "filterPeriod", "filterIntervention"].forEach((id) => document.getElementById(id).addEventListener("input", applyFilters));
document.getElementById("filterToggle").addEventListener("click", () => document.getElementById("filterForm").classList.toggle("is-expanded"));
document.getElementById("clearBtn").addEventListener("click", () => { refs.filterQuery.value = ""; refs.filterStatus.value = "Todos"; refs.filterPeriod.value = "Todos"; refs.filterIntervention.value = "Todos"; applyFilters(); showToast(refs.toast, "Filtros limpiados.", "info"); });
document.getElementById("newSampleBtn").addEventListener("click", () => { state.editingIndex = null; document.getElementById("sampleForm").reset(); showForm(); });
document.getElementById("cancelBtn").addEventListener("click", () => { state.editingIndex = null; showList(); });
document.getElementById("sampleForm").addEventListener("submit", saveSample);
refs.samplesBody.addEventListener("click", handleAction);
document.getElementById("exportBtn").addEventListener("click", () => showToast(refs.toast, "Exportación Excel generada para el prototipo.", "success"));
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) document.querySelectorAll("[data-menu-panel]").forEach((panel) => { panel.hidden = true; }); });
renderSamples();
