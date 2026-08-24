import { refs, showToast } from "./ui.js";
import { applyFilters, renderAssignments, handleAction, openNewAssignment, saveAssignment, confirmAction } from "./assignments.js";
import { getMessage } from "../../design-system/messages.js";
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
