import { roles } from "./data.js";
import { state, resetDraft } from "./state.js";
import { commitPermissions, handlePermissionChange, hasChanges } from "./permissions.js";
import { renderPermissions, renderRoleContext, refs, showToast } from "./ui.js";
import { getMessage } from "../../design-system/messages.js";
import { closeConfirmModal, openConfirmModal } from "../../design-system/interaction.js";

function rerender() { renderPermissions(); renderRoleContext(roles); }

function confirmAction() {
  if (state.pendingAction === "save") {
    commitPermissions();
    state.pendingAction = null;
    closeConfirmModal("confirmModal");
    showToast(getMessage("M18"), "success");
    return;
  }
  if (state.pendingAction === "cancel") {
    resetDraft();
    state.pendingAction = null;
    closeConfirmModal("confirmModal");
    window.location.href = "../ref-001-roles/index.html";
  }
}

refs.permissionBody.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[data-row][data-operation]");
  if (!checkbox) return;
  handlePermissionChange(checkbox.dataset.row, checkbox.dataset.operation, checkbox.checked);
  renderPermissions();
});

refs.roleSelect.addEventListener("change", () => { state.selectedRoleId = refs.roleSelect.value; resetDraft(); rerender(); });
refs.matrixSearch.addEventListener("input", () => { state.query = refs.matrixSearch.value; renderPermissions(); });

document.getElementById("saveBtn").addEventListener("click", () => { state.pendingAction = "save"; openConfirmModal("confirmModal", getMessage("M1")); });
document.getElementById("cancelBtn").addEventListener("click", () => {
  if (!hasChanges()) { window.location.href = "../ref-001-roles/index.html"; return; }
  state.pendingAction = "cancel";
  openConfirmModal("confirmModal", getMessage("M14"));
});
document.getElementById("confirmBtn").addEventListener("click", confirmAction);
refs.confirmModal.addEventListener("hidden.bs.modal", () => { state.pendingAction = null; });

renderRoleContext(roles);
renderPermissions();
