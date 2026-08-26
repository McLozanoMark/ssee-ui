import { renderToast } from "../../design-system/interaction.js";
import { state } from "./state.js";

export const refs = {
  listView: document.getElementById("listView"),
  formView: document.getElementById("formView"),
  rolesBody: document.getElementById("rolesBody"),
  emptyState: document.getElementById("emptyState"),
  pageSummary: document.getElementById("pageSummary"),
  filterForm: document.getElementById("filterForm"),
  filterName: document.getElementById("filterName"),
  filterDescription: document.getElementById("filterDescription"),
  filterStatus: document.getElementById("filterStatus"),
  filterToggle: document.getElementById("filterToggle"),
  roleCount: document.getElementById("roleCount"),
  roleName: document.getElementById("roleName"),
  roleDescription: document.getElementById("roleDescription"),
  nameError: document.getElementById("nameError"),
  descriptionError: document.getElementById("descriptionError"),
  formAlert: document.getElementById("formAlert"),
  permissionBody: document.getElementById("permissionBody"),
  permissionHint: document.getElementById("permissionHint"),
  infoStep: document.getElementById("infoStep"),
  permissionStep: document.getElementById("permissionStep"),
  stepInfo: document.getElementById("stepInfo"),
  stepPerms: document.getElementById("stepPerms"),
  backButton: document.getElementById("backBtn"),
  continueButton: document.getElementById("continueBtn"),
  saveRoleButton: document.getElementById("saveRoleBtn"),
  summaryName: document.getElementById("summaryName"),
  summaryDescription: document.getElementById("summaryDescription"),
  formTitle: document.getElementById("formTitle"),
  formBreadcrumb: document.getElementById("formBreadcrumb"),
  toast: document.getElementById("toast"),
  confirmModal: document.getElementById("confirmModal"),
  editStatusControls: [...document.querySelectorAll("[data-edit-status-control]")],
  editStatusToggles: [...document.querySelectorAll("[data-edit-status-toggle]")],
  editStatusLabels: [...document.querySelectorAll("[data-edit-status-label]")],
  saveStepButtons: [...document.querySelectorAll("[data-save-step]")]
};

export function showToast(message, type = "info") {
  renderToast(refs.toast, message, type);
}

export function enableTooltips() {
  if (!window.bootstrap) return;
  document.querySelectorAll("[data-bs-toggle='tooltip']").forEach((element) => {
    bootstrap.Tooltip.getOrCreateInstance(element);
  });
}

export function closeActionMenus() {
  refs.rolesBody.querySelectorAll(".legacy-dropdown").forEach((dropdown) => {
    dropdown.hidden = true;
  });
  refs.rolesBody.querySelectorAll("[data-menu]").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

export function showList() {
  refs.listView.classList.add("is-active");
  refs.formView.classList.remove("is-active");
}

export function showForm(role = null, sourceRequirement = "ALI-REF-001") {
  refs.listView.classList.remove("is-active");
  refs.formView.classList.add("is-active");
  refs.roleName.value = role?.name || "";
  refs.roleDescription.value = role?.description || "";
  const label = role ? "Editar rol" : "Registrar rol";
  refs.formTitle.textContent = role ? "Editar rol" : "Registrar rol";
  refs.formBreadcrumb.innerHTML = `<a href="../index.html">Índice de requerimientos</a> / ${sourceRequirement} / Gestión de roles / ${label}`;
  refs.editStatusControls.forEach((control) => { control.hidden = !role; });
  const statusBlocked = Boolean(role && role.users > 0);
  refs.editStatusToggles.forEach((toggle) => {
    toggle.checked = role?.status === "Activo";
    toggle.disabled = statusBlocked;
    const switchLabel = toggle.closest(".switch");
    if (switchLabel) {
      switchLabel.classList.toggle("is-disabled", statusBlocked);
      switchLabel.title = statusBlocked ? "No disponible: el rol tiene usuarios asociados." : "";
    }
  });
  refs.editStatusLabels.forEach((label) => { label.textContent = role?.status || "Activo"; });
  setFormStep("info");
  clearErrors();
}

export function setFormStep(step) {
  const isInfo = step === "info";
  refs.infoStep.classList.toggle("is-active", isInfo);
  refs.permissionStep.classList.toggle("is-active", !isInfo);
  refs.stepInfo.classList.toggle("is-current", isInfo);
  refs.stepPerms.classList.toggle("is-current", !isInfo);
  refs.stepInfo.classList.toggle("is-complete", !isInfo);
  refs.backButton.hidden = isInfo;
  refs.continueButton.hidden = !isInfo;
  refs.saveRoleButton.hidden = isInfo || state.editingIndex !== null;
  refs.saveStepButtons.forEach((button) => {
    button.hidden = state.editingIndex === null || button.dataset.saveStep !== step;
  });
  if (!isInfo) {
    refs.summaryName.textContent = refs.roleName.value.trim();
    refs.summaryDescription.textContent = refs.roleDescription.value.trim();
  }
}

export function clearErrors() {
  refs.nameError.textContent = "";
  refs.descriptionError.textContent = "";
  refs.formAlert.hidden = true;
  refs.permissionHint.classList.remove("is-error");
}
