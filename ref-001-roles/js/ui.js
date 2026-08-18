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
  summaryName: document.getElementById("summaryName"),
  summaryDescription: document.getElementById("summaryDescription"),
  formTitle: document.getElementById("formTitle"),
  formBreadcrumb: document.getElementById("formBreadcrumb"),
  toast: document.getElementById("toast")
};

export function showToast(message, type = "info") {
  refs.toast.classList.remove("is-visible");
  void refs.toast.offsetWidth;
  const icons = {
    success: "fa-circle-check",
    error: "fa-circle-exclamation",
    warning: "fa-triangle-exclamation",
    info: "fa-circle-info"
  };
  refs.toast.className = `toast toast-${type}`;
  refs.toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}" aria-hidden="true"></i><span>${message}</span>`;
  refs.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => refs.toast.classList.remove("is-visible"), 4500);
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

export function showForm(role = null) {
  refs.listView.classList.remove("is-active");
  refs.formView.classList.add("is-active");
  refs.roleName.value = role?.name || "";
  refs.roleDescription.value = role?.description || "";
  const label = role ? "Editar rol" : "Nuevo rol";
  refs.formTitle.textContent = role ? "Editar rol" : "Registrar nuevo rol";
  refs.formBreadcrumb.textContent = `Administración / Roles / ${label}`;
  setFormStep("info");
  clearErrors();
}

export function setFormStep(step) {
  const isInfo = step === "info";
  refs.infoStep.classList.toggle("is-active", isInfo);
  refs.permissionStep.classList.toggle("is-active", !isInfo);
  refs.stepInfo.classList.toggle("is-current", isInfo);
  refs.stepPerms.classList.toggle("is-current", !isInfo);
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
