import { state } from "./state.js";
import { refs, showList, showToast } from "./ui.js";
import { enableTooltips } from "../../design-system/interaction.js";
import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { attachTableSorting } from "../../design-system/table-sort.js";
import { createDateRangeFilter } from "../../design-system/date-range.js";
import {
  applyFilters,
  renderUsers,
  openSelected,
  exportUsers,
  openEditUser,
  confirmRoles,
  openReniecUpdate,
  consultReniec,
  saveReniec,
  dismissPendingConfirmation,
} from "./users.js";
const lastAccessRange = createDateRangeFilter(document.querySelector("[data-date-range]"));
document.getElementById("filterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (lastAccessRange && !lastAccessRange.validate()) {
    showToast(getMessage("M12"), "warning");
    return;
  }
  applyFilters();
  showToast(getPrototypeMessage("filtersApplied"), "info");
});
document.getElementById("filterToggle").addEventListener("click", () => {
  const filterForm = document.getElementById("filterForm");
  const filterToggle = document.getElementById("filterToggle");
  const expanded = filterForm.classList.toggle("is-expanded");
  filterToggle.setAttribute("aria-expanded", String(expanded));
  filterToggle.setAttribute("aria-label", expanded ? "Cerrar filtros" : "Abrir filtros");
});
document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("filterName").value = "";
  document.getElementById("filterRole").value = "Todos";
  document.getElementById("filterStatus").value = "Todos";
  document.getElementById("filterAuth").value = "Todos";
  document.getElementById("filterProject").value = "";
  document.getElementById("filterValidity").value = "Todos";
  lastAccessRange?.reset();
  applyFilters();
  showToast(getPrototypeMessage("filtersCleared"), "info");
});
refs.usersBody.addEventListener("click", (event) => {
  const action = event.target.closest("[data-user-action]");
  if (action) {
    if (action.dataset.userAction === "detail") openSelected(Number(action.dataset.user));
    if (action.dataset.userAction === "edit") openEditUser(Number(action.dataset.user));
    if (action.dataset.userAction === "reniec") openReniecUpdate(Number(action.dataset.user));
    return;
  }
});
refs.detailCard.addEventListener("click", (event) => {
  if (!event.target.closest("[data-detail-action='reniec']")) return;
  const index = state.filteredUsers.indexOf(state.selectedUser);
  if (index >= 0) openReniecUpdate(index);
});
document.getElementById("backBtn").addEventListener("click", showList);
document.getElementById("exportBtn").addEventListener("click", exportUsers);
document.getElementById("confirmRolesBtn").addEventListener("click", confirmRoles);
document.getElementById("confirmRolesModal").addEventListener("hidden.bs.modal", dismissPendingConfirmation);
refs.consultReniecBtn.addEventListener("click", consultReniec);
refs.saveReniecBtn.addEventListener("click", saveReniec);
renderUsers();
attachTableSorting(document.querySelector(".ssee-table"));
enableTooltips();

const accessName = new URLSearchParams(window.location.search).get("accessName");
if (accessName) {
  const userIndex = state.filteredUsers.findIndex((user) => user.name === accessName);
  if (userIndex >= 0) openEditUser(userIndex);
}
