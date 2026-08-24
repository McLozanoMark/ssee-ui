import { state } from "./state.js";
import { refs, showList, showToast } from "./ui.js";
import { getPrototypeMessage } from "../../design-system/messages.js";
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
} from "./users.js";
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
  const roleButton = event.target.closest("[data-role-action='open']");
  if (roleButton) return openRoles(Number(roleButton.dataset.user));
  const action = event.target.closest("[data-user-action]");
  if (action) {
    if (action.dataset.userAction === "detail") openSelected(Number(action.dataset.user));
    if (action.dataset.userAction === "roles") openRoles(Number(action.dataset.user));
    if (action.dataset.userAction === "edit") openRoles(Number(action.dataset.user), "edit");
    if (action.dataset.userAction === "toggle-status") toggleStatus(Number(action.dataset.user));
    if (action.dataset.userAction === "renew") showToast("Renovar vigencia queda pendiente de confirmación del flujo.", "info");
    return;
  }
  const button = event.target.closest("[data-user]");
  if (button) {
    openSelected(Number(button.dataset.user));
    showToast("Detalle de usuario abierto.", "info");
  }
});
document.getElementById("backBtn").addEventListener("click", showList);
document.getElementById("exportBtn").addEventListener("click", exportUsers);
document.getElementById("saveRolesBtn").addEventListener("click", saveRoles);
document.getElementById("confirmRolesBtn").addEventListener("click", confirmRoles);
refs.editUserStatusToggle.addEventListener("change", toggleEditedUserStatus);
document.getElementById("cancelRolesBtn").addEventListener("click", cancelRoleEdit);
renderUsers();
