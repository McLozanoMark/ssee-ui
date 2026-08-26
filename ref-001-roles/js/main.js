import { roles } from "./data.js";
import { state, resetEditingState, resetPermissionDraft } from "./state.js";
import { refs, clearErrors, closeActionMenus, setFormStep, showForm, showList, showToast } from "./ui.js";
import { renderPermissions, handlePermissionChange, hasSelectedPermission, selectedPermissionLabels } from "./permissions.js";
import { applyFilters, handleRoleAction, renderRoles, confirmStatus, handleEditStatusToggle } from "./roles.js";
import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { openConfirmModal, closeConfirmModal } from "../../design-system/interaction.js";

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

function openRoleForm(role = null, index = null, sourceRequirement = "ALI-REF-001") {
  state.editingIndex = index;
  resetPermissionDraft(role);
  showForm(role, sourceRequirement);
  renderPermissions();
}

function commitRoleSave({ stay = false } = {}) {
  const selectedLabels = selectedPermissionLabels();
  const savedRole = {
    id: state.editingIndex === null ? `role-${Date.now()}` : roles[state.editingIndex].id,
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
  if (stay && wasEditing) {
    showToast(message, "success");
    return;
  }
  showList();
  resetEditingState();
  showToast(message, "success");
}

function saveEditStep(step) {
  if (step === "info" && !validateInfo()) return;
  if (step === "permissions" && !hasSelectedPermission()) {
    refs.permissionHint.classList.add("is-error");
    showToast(getMessage("M16"), "warning");
    return;
  }
  state.pendingSaveStep = step;
  openConfirmModal("confirmModal", getMessage("M1"));
}

function saveRole() {
  if (!hasSelectedPermission()) {
    refs.permissionHint.classList.add("is-error");
    showToast(getMessage("M16"), "warning");
    return;
  }
  if (state.pendingSave) return;
  state.pendingSave = true;
  openConfirmModal("confirmModal", getMessage("M1"));
}

function cancelRoleForm() {
  if (state.pendingCancel) return;
  state.pendingCancel = true;
  openConfirmModal("confirmModal", getMessage("M14"));
}

function confirmPendingAction() {
  if (state.pendingSaveStep) {
    state.pendingSaveStep = null;
    closeConfirmModal("confirmModal");
    commitRoleSave({ stay: true });
    return;
  }
  if (state.pendingSave) {
    state.pendingSave = false;
    closeConfirmModal("confirmModal");
    commitRoleSave();
    return;
  }
  if (state.pendingCancel) {
    state.pendingCancel = false;
    closeConfirmModal("confirmModal");
    showList();
    resetEditingState();
    return;
  }
  confirmStatus();
}

refs.filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
  showToast(getPrototypeMessage("filtersApplied"), "info");
});
refs.filterToggle.addEventListener("click", () => {
  const expanded = refs.filterForm.classList.toggle("is-expanded");
  refs.filterToggle.setAttribute("aria-expanded", String(expanded));
  refs.filterToggle.setAttribute("aria-label", expanded ? "Cerrar filtros" : "Abrir filtros");
});
refs.stepInfo.addEventListener("click", () => setFormStep("info"));
refs.stepPerms.addEventListener("click", () => { if (validateInfo()) setFormStep("permissions"); });
document.getElementById("clearBtn").addEventListener("click", () => {
  refs.filterName.value = "";
  refs.filterDescription.value = "";
  document.getElementById("filterPermission").value = "";
  document.getElementById("filterUsers").value = "Todos";
  document.getElementById("filterUpdated").value = "";
  refs.filterStatus.value = "Todos";
  applyFilters();
  showToast(getPrototypeMessage("filtersCleared"), "info");
});
document.getElementById("newRoleBtn").addEventListener("click", () => openRoleForm());
document.getElementById("exportBtn").addEventListener("click", () => showToast(getMessage("M67"), "success"));
refs.rolesBody.addEventListener("click", (event) => handleRoleAction(event, openRoleForm));
refs.permissionBody.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[data-row][data-operation]");
  if (!checkbox) return;
  handlePermissionChange(checkbox.dataset.row, checkbox.dataset.operation, checkbox.checked);
  renderPermissions();
});
refs.editStatusToggles.forEach((toggle) => toggle.addEventListener("change", handleEditStatusToggle));
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) closeActionMenus(); });
document.getElementById("continueBtn").addEventListener("click", () => { if (validateInfo()) setFormStep("permissions"); });
document.getElementById("backBtn").addEventListener("click", () => setFormStep("info"));
document.getElementById("cancelInfoBtn").addEventListener("click", cancelRoleForm);
document.getElementById("saveRoleBtn").addEventListener("click", saveRole);
refs.saveStepButtons.forEach((button) => button.addEventListener("click", () => saveEditStep(button.dataset.saveStep)));
document.getElementById("confirmBtn").addEventListener("click", confirmPendingAction);
refs.confirmModal.addEventListener("hidden.bs.modal", () => {
  state.pendingSave = false;
  state.pendingSaveStep = null;
  state.pendingCancel = false;
  state.pendingEditStatus = null;
  state.pendingStatus = null;
});

renderPermissions();
renderRoles();

const deepLink = new URLSearchParams(window.location.search);
if (deepLink.get("step") === "permissions" && deepLink.get("role")) {
  const roleIndex = roles.findIndex((role) => role.id === deepLink.get("role"));
  if (roleIndex >= 0) {
    openRoleForm(roles[roleIndex], roleIndex, deepLink.get("source") || "ALI-REF-002");
    setFormStep("permissions");
  }
}
