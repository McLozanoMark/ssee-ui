import { state } from "./state.js";
import { refs, showList, showToast } from "./ui.js";
import {
  applyFilters,
  renderUsers,
  openSelected,
  exportUsers,
  openRoles,
  saveRoles,
  confirmRoles,
  toggleStatus,
} from "./users.js";
document.getElementById("filterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
  showToast("Filtros aplicados.", "info");
});
document.getElementById("filterName").addEventListener("input", applyFilters);
document
  .getElementById("filterDescription")
  .addEventListener("input", applyFilters);
document.getElementById("filterTray").addEventListener("change", (event) => {
  state.tray = event.target.value;
  applyFilters();
});
document.getElementById("filterToggle").addEventListener("click", () => {
  document.getElementById("filterForm").classList.toggle("is-expanded");
});
document.getElementById("clearBtn").addEventListener("click", () => {
  [
    "filterName",
    "filterDescription",
    "filterTray",
    "filterRole",
    "filterStatus",
    "filterAuth",
  ].forEach(
    (id) =>
      (document.getElementById(id).value =
        id === "filterTray" ||
        id === "filterRole" ||
        id === "filterStatus" ||
        id === "filterAuth"
          ? "Todos"
          : ""),
  );
  state.tray = "Todos";
  applyFilters();
  showToast("Filtros limpiados.", "info");
});
refs.usersBody.addEventListener("click", (event) => {
  const roleButton = event.target.closest("[data-role-action='open']");
  if (roleButton) return openRoles(Number(roleButton.dataset.user));
  const action = event.target.closest("[data-user-action]");
  if (action) {
    if (action.dataset.userAction === "detail") openSelected(Number(action.dataset.user));
    if (action.dataset.userAction === "roles") openRoles(Number(action.dataset.user));
    if (action.dataset.userAction === "toggle-status") toggleStatus(Number(action.dataset.user));
    if (["edit", "renew"].includes(action.dataset.userAction)) showToast("Esta acción está pendiente de definición.", "info");
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
renderUsers();
