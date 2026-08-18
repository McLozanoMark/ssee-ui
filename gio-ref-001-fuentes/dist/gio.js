
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
{ showToast, enableTooltips };
function showList() { refs.listView.classList.add("is-active"); refs.formView.classList.remove("is-active"); }
function showForm(source = null) { refs.listView.classList.remove("is-active"); refs.formView.classList.add("is-active"); refs.formTitle.textContent = source ? "Editar fuente" : "Registrar nueva fuente"; refs.formBreadcrumb.textContent = `Gio / Fuentes de datos / ${source ? "Editar fuente" : "Nueva fuente"}`; refs.sourceName.value = source?.name || ""; refs.sourceDescription.value = source?.description || ""; refs.sourceOrigin.value = source?.origin || ""; refs.sourceIntervention.value = source?.intervention || ""; refs.sourcePeriod.value = source?.period || ""; refs.sourcePurpose.value = source?.purpose || ""; clearErrors(); }
function clearErrors() { refs.nameError.textContent = ""; refs.descriptionError.textContent = ""; }


/* source: gio-ref-001-fuentes/js/sources.js */





function statusClass(status) { return status === "Activa" ? "active" : status === "Anulada" ? "expired" : status === "Inactiva" ? "inactive" : status === "En proceso" ? "warning" : ""; }
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
document.getElementById("exportBtn").addEventListener("click", () => showToast(refs.toast, "Exportación Excel generada para el prototipo.", "success"));
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) document.querySelectorAll("[data-menu-panel]").forEach((panel) => { panel.hidden = true; }); });
renderSources();
