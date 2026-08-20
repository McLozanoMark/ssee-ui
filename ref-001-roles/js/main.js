import { roles } from "./data.js";
import { state, resetEditingState } from "./state.js";
import { refs, clearErrors, closeActionMenus, setFormStep, showForm, showList, showToast } from "./ui.js";
import { renderPermissions, hasSelectedPermission, selectedPermissionLabels } from "./permissions.js";
import { applyFilters, handleRoleAction, renderRoles, confirmStatus } from "./roles.js";
import { getMessage } from "../../design-system/messages.js";

function validateInfo() {
  clearErrors();
  let valid = true;
  const name = refs.roleName.value.trim();
  const description = refs.roleDescription.value.trim();
  const duplicate = roles.some((role, index) => role.name.toLowerCase() === name.toLowerCase() && index !== state.editingIndex);

  if (!name) {
    refs.nameError.textContent = "Ingresa el nombre del rol.";
    valid = false;
  } else if (duplicate) {
    refs.nameError.textContent = getMessage("M10");
    valid = false;
  }
  if (!description) {
    refs.descriptionError.textContent = "Ingresa la descripción del rol.";
    valid = false;
  }
  refs.formAlert.querySelector("span").textContent = getMessage("M66");
  refs.formAlert.hidden = valid;
  return valid;
}

function openRoleForm(role = null, index = null) {
  state.editingIndex = index;
  showForm(role);
}

function saveRole() {
  if (!hasSelectedPermission()) {
    refs.permissionHint.classList.add("is-error");
    showToast(getMessage("M16"), "warning");
    return;
  }

  const selectedLabels = selectedPermissionLabels();
  const savedRole = {
    name: refs.roleName.value.trim(),
    description: refs.roleDescription.value.trim(),
    permissions: selectedLabels.length ? [...selectedLabels, "+1 adicional"] : ["Consulta"],
    permissionDetails: selectedLabels.length ? ["Permiso adicional de configuración inicial"] : [],
    users: state.editingIndex === null ? 0 : roles[state.editingIndex].users,
    status: state.editingIndex === null ? "Activo" : roles[state.editingIndex].status,
    updated: "18/08/2026 09:00"
  };
  const wasEditing = state.editingIndex !== null;
  if (wasEditing) roles[state.editingIndex] = savedRole;
  else roles.push(savedRole);
  const message = getMessage(wasEditing ? "M3" : "M2");
  applyFilters();
  showList();
  resetEditingState();
  showToast(message, "success");
}

refs.filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
  showToast("Filtros aplicados.", "info");
});
refs.filterName.addEventListener("input", applyFilters);
refs.filterToggle.addEventListener("click", () => refs.filterForm.classList.toggle("is-expanded"));
refs.stepInfo.addEventListener("click", () => setFormStep("info"));
refs.stepPerms.addEventListener("click", () => { if (validateInfo()) setFormStep("permissions"); });
document.getElementById("clearBtn").addEventListener("click", () => {
  refs.filterName.value = "";
  refs.filterDescription.value = "";
  refs.filterStatus.value = "Todos";
  applyFilters();
  showToast("Filtros limpiados.", "info");
});
document.getElementById("newRoleBtn").addEventListener("click", () => openRoleForm());
document.getElementById("exportBtn").addEventListener("click", () => showToast(getMessage("M67"), "success"));
refs.rolesBody.addEventListener("click", (event) => handleRoleAction(event, openRoleForm));
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) closeActionMenus(); });
document.getElementById("continueBtn").addEventListener("click", () => { if (validateInfo()) setFormStep("permissions"); });
document.getElementById("backBtn").addEventListener("click", () => setFormStep("info"));
document.getElementById("cancelInfoBtn").addEventListener("click", () => { showList(); resetEditingState(); });
document.getElementById("saveRoleBtn").addEventListener("click", saveRole);
document.getElementById("confirmBtn").addEventListener("click", confirmStatus);

renderPermissions();
renderRoles();
