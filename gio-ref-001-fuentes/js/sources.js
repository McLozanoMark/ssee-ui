import { sources } from "./data.js";
import { state } from "./state.js";
import { refs, enableTooltips, showToast, showForm, showList } from "./ui.js";
import { closeMenus, openConfirmModal, closeConfirmModal } from "../../design-system/interaction.js";
import { getMessage } from "../../design-system/messages.js";

function statusClass(status) { return status === "Activa" ? "active" : status === "Anulada" ? "expired" : status === "Inactiva" ? "inactive" : status === "En proceso" ? "warning" : ""; }
refs.emptyState.textContent = getMessage("M9");
function actionLabel(source) { return source.status === "Activa" ? "Inactivar" : source.status === "Inactiva" ? "Activar" : "Cambiar estado"; }
export function renderSources() {
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
export function applyFilters() {
  const query = refs.filterQuery.value.trim().toLowerCase(); const origin = refs.filterOrigin.value; const status = refs.filterStatus.value; const period = refs.filterPeriod.value;
  state.filteredSources = sources.filter((source) => [source.id, source.name, source.origin, source.intervention, source.status].join(" ").toLowerCase().includes(query) && (origin === "Todos" || source.origin === origin) && (status === "Todos" || source.status === status) && (period === "Todos" || source.period === period)); renderSources();
}
export function handleAction(event) {
  const menuButton = event.target.closest("[data-menu-button]"); const action = event.target.closest("[data-action]");
  if (menuButton) { const panel = refs.sourcesBody.querySelector(`[data-menu-panel='${menuButton.dataset.menuButton}']`); const opening = panel?.hidden; closeMenus(refs.sourcesBody); if (opening && panel) { panel.hidden = false; menuButton.setAttribute("aria-expanded", "true"); } return; }
  if (!action) return; closeMenus(refs.sourcesBody); const index = Number(action.dataset.index); const source = sources[index];
  if (action.dataset.action === "edit") { state.editingIndex = index; showForm(source); return; }
  if (action.dataset.action === "view") { showToast(`${source.name}: ${source.records} registros en estado ${source.status}.`, "info"); return; }
  if (action.dataset.action === "toggle") { state.pendingStatus = { index, next: source.status === "Activa" ? "Inactiva" : "Activa" }; openConfirmModal("confirmModal", `Vas a ${state.pendingStatus.next === "Activa" ? "activar" : "inactivar"} la fuente ${source.name}. ¿Deseas continuar?`); }
}
export function confirmStatus() { if (!state.pendingStatus) return; const { index, next } = state.pendingStatus; sources[index].status = next; sources[index].updated = "18/08/2026 09:30"; state.pendingStatus = null; closeConfirmModal("confirmModal"); renderSources(); showToast(`Fuente ${next === "Activa" ? "activada" : "inactivada"} correctamente.`, "success"); }
export function saveSource(event) { event.preventDefault(); refs.nameError.textContent = refs.sourceName.value.trim() ? "" : "Ingresa el nombre de la fuente."; refs.descriptionError.textContent = refs.sourceDescription.value.trim() ? "" : "Ingresa la descripción de la fuente."; if (!refs.sourceName.value.trim() || !refs.sourceDescription.value.trim() || !refs.sourceOrigin.value || !refs.sourceIntervention.value || !refs.sourcePeriod.value) { showToast("Completa los campos obligatorios.", "warning"); return; } const payload = { id: state.editingIndex === null ? `FDT-${String(sources.length + 1).padStart(3, "0")}` : sources[state.editingIndex].id, name: refs.sourceName.value.trim(), description: refs.sourceDescription.value.trim(), origin: refs.sourceOrigin.value, intervention: refs.sourceIntervention.value, period: refs.sourcePeriod.value, records: state.editingIndex === null ? "0" : sources[state.editingIndex].records, status: state.editingIndex === null ? "Borrador" : sources[state.editingIndex].status, updated: "18/08/2026 09:30", purpose: refs.sourcePurpose.value.trim() }; if (state.editingIndex === null) sources.unshift(payload); else sources[state.editingIndex] = payload; state.editingIndex = null; applyFilters(); showList(); showToast("Fuente registrada correctamente.", "success"); }
