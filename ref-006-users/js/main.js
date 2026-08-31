import { state } from "./state.js";
import { refs, showList, showToast } from "./ui.js";
import { enableTooltips } from "../../design-system/interaction.js";
import { getPrototypeMessage } from "../../design-system/messages.js";
import { attachTableSorting } from "../../design-system/table-sort.js";
import {
  applyFilters,
  renderUsers,
  openSelected,
  exportUsers,
  openRoles,
  saveRoles,
  confirmRoles,
  toggleStatus,
  toggleEditedUserStatus,
  cancelRoleEdit,
  openReniecUpdate,
  consultReniec,
  saveReniec,
  dismissPendingConfirmation,
} from "./users.js";
document.getElementById("confirmRolesModal")?.querySelector(".modal-header")?.insertAdjacentHTML("afterbegin", '<span class="modal-title-icon" aria-hidden="true"><i class="fa-solid fa-circle-question"></i></span>');
document.getElementById("filterForm").addEventListener("submit", (event) => {
  event.preventDefault();
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
  [
    "filterName",
    "filterUsername",
    "filterDescription",
    "filterEmail",
    "filterTray",
    "filterRole",
    "filterStatus",
    "filterAuth",
    "filterProject",
    "filterValidity",
    "filterLastAccess",
  ].forEach(
    (id) =>
      (document.getElementById(id).value =
        id === "filterTray" ||
        id === "filterRole" ||
        id === "filterStatus" ||
        id === "filterAuth" ||
        id === "filterValidity"
          ? "Todos"
          : ""),
  );
  state.tray = "Todos";
  applyFilters();
  showToast(getPrototypeMessage("filtersCleared"), "info");
});
refs.usersBody.addEventListener("click", (event) => {
  const action = event.target.closest("[data-user-action]");
  if (action) {
    if (action.dataset.userAction === "detail") openSelected(Number(action.dataset.user));
    if (action.dataset.userAction === "roles") openRoles(Number(action.dataset.user));
    if (action.dataset.userAction === "toggle-status") toggleStatus(Number(action.dataset.user));
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
document.getElementById("saveRolesBtn").addEventListener("click", saveRoles);
document.getElementById("confirmRolesBtn").addEventListener("click", confirmRoles);
document.getElementById("confirmRolesModal").addEventListener("hidden.bs.modal", dismissPendingConfirmation);
refs.editUserStatusToggle.addEventListener("change", toggleEditedUserStatus);
document.getElementById("cancelRolesBtn").addEventListener("click", cancelRoleEdit);
refs.consultReniecBtn.addEventListener("click", consultReniec);
refs.saveReniecBtn.addEventListener("click", saveReniec);
renderUsers();
attachTableSorting(document.querySelector(".ssee-table"));
enableTooltips();

const accessName = new URLSearchParams(window.location.search).get("accessName");
if (accessName) {
  const userIndex = state.filteredUsers.findIndex((user) => user.name === accessName);
  if (userIndex >= 0) openRoles(userIndex);
}
