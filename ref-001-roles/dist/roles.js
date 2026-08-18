
/* source: ref-001-roles/js/data.js */
const roles = [
  {
    name: "Administrador USE",
    description: "Gestiona configuración general del sistema.",
    permissions: ["Usuarios", "Configuración", "+8 adicionales"],
    permissionDetails: ["Seguimiento", "Evaluación", "Instrumentos", "Reportes", "Registro", "Consulta", "Auditoría", "Parámetros"],
    users: 3,
    status: "Activo",
    updated: "15/05/2024 10:30"
  },
  {
    name: "Supervisor de Seguimiento",
    description: "Consulta y supervisa avances de seguimiento.",
    permissions: ["Seguimiento", "Reportes", "+3 adicionales"],
    permissionDetails: ["Consulta", "Exportación", "Indicadores"],
    users: 7,
    status: "Activo",
    updated: "14/05/2024 16:45"
  },
  {
    name: "Evaluador",
    description: "Registra y revisa información de evaluación.",
    permissions: ["Evaluación", "Instrumentos", "+2 adicionales"],
    permissionDetails: ["Consulta", "Reportes"],
    users: 2,
    status: "Activo",
    updated: "13/05/2024 09:15"
  },
  {
    name: "Registrador",
    description: "Ingresa información operativa del sistema.",
    permissions: ["Registro", "Consulta"],
    permissionDetails: [],
    users: 0,
    status: "Inactivo",
    updated: "10/05/2024 11:20"
  },
  {
    name: "Consulta Estratégica",
    description: "Accede a reportes y tableros de seguimiento.",
    permissions: ["Visualización", "Reportes"],
    permissionDetails: [],
    users: 0,
    status: "Inactivo",
    updated: "08/05/2024 14:05"
  }
];

const permissionRows = [
  { level: 1, name: "Seguimiento", checks: [true, true, true, false, true, false] },
  { level: 2, name: "Gestión de seguimiento", checks: [true, true, true, false, true, false] },
  { level: 3, name: "Crear seguimiento", checks: [true, true, false, false, false, false] },
  { level: 3, name: "Editar seguimiento", checks: [true, false, true, false, false, false] },
  { level: 1, name: "Evaluación", checks: [true, true, true, false, true, true] },
  { level: 1, name: "Instrumentos", checks: [true, false, true, false, true, false] },
  { level: 1, name: "Reportes", checks: [true, false, false, false, true, false] },
  { level: 1, name: "Configuración", checks: [true, false, true, false, false, false] }
];


/* source: ref-001-roles/js/state.js */


const state = {
  filteredRoles: [...roles],
  editingIndex: null,
  openActionMenu: null
};

function resetEditingState() {
  state.editingIndex = null;
  state.openActionMenu = null;
}


/* source: ref-001-roles/js/ui.js */
const refs = {
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

function showToast(message, type = "info") {
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

function enableTooltips() {
  if (!window.bootstrap) return;
  document.querySelectorAll("[data-bs-toggle='tooltip']").forEach((element) => {
    bootstrap.Tooltip.getOrCreateInstance(element);
  });
}

function closeActionMenus() {
  refs.rolesBody.querySelectorAll(".legacy-dropdown").forEach((dropdown) => {
    dropdown.hidden = true;
  });
  refs.rolesBody.querySelectorAll("[data-menu]").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function showList() {
  refs.listView.classList.add("is-active");
  refs.formView.classList.remove("is-active");
}

function showForm(role = null) {
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

function setFormStep(step) {
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

function clearErrors() {
  refs.nameError.textContent = "";
  refs.descriptionError.textContent = "";
  refs.formAlert.hidden = true;
  refs.permissionHint.classList.remove("is-error");
}


/* source: ref-001-roles/js/permissions.js */



function renderPermissions() {
  refs.permissionBody.innerHTML = permissionRows.map((row, rowIndex) => {
    const checks = row.checks.map((checked, checkIndex) => `
      <td><input type="checkbox" data-permission="${rowIndex}-${checkIndex}" ${checked ? "checked" : ""} aria-label="${row.name} permiso ${checkIndex + 1}"></td>
    `).join("");
    const icon = row.level < 3 ? "fa-folder-open" : "fa-file-lines";
    return `
      <tr>
        <td><span class="permission-name level-${row.level}"><i class="fa-regular ${icon}" aria-hidden="true"></i>${row.name}</span></td>
        ${checks}
      </tr>
    `;
  }).join("");
}

function hasSelectedPermission() {
  return [...refs.permissionBody.querySelectorAll("input[type='checkbox']")]
    .some((checkbox) => checkbox.checked);
}

function selectedPermissionLabels() {
  return permissionRows
    .filter((_, rowIndex) => [...refs.permissionBody.querySelectorAll(`[data-permission^='${rowIndex}-']`)]
      .some((checkbox) => checkbox.checked))
    .slice(0, 2)
    .map((row) => row.name);
}


/* source: ref-001-roles/js/roles.js */




function renderRoles() {
  refs.rolesBody.innerHTML = state.filteredRoles.map((role) => {
    const originalIndex = roles.findIndex((item) => item.name === role.name);
    const hasUsers = role.status === "Activo" && role.users > 0;
    const tooltip = role.permissionDetails.length
      ? ` data-bs-toggle="tooltip" data-bs-title="${role.permissionDetails.join(", ")}"`
      : "";
    const permissionTags = role.permissions.map((permission, index) => {
      const isMore = index > 1;
      return `<span class="tag ${isMore ? "more" : ""}"${isMore ? tooltip : ""}>${permission}</span>`;
    }).join("");

    return `
      <tr>
        <td><strong>${role.name}</strong></td>
        <td><div class="description">${role.description}</div></td>
        <td><div class="tags">${permissionTags}</div></td>
        <td><span class="users-count"><i class="fa-regular fa-user user-icon" aria-hidden="true"></i>${role.users}</span></td>
        <td><span class="status ${role.status === "Activo" ? "active" : "inactive"}">${role.status}</span></td>
        <td>${role.updated}</td>
        <td>
          <div class="row-actions">
            <div class="action-menu">
              <button class="menu-btn" type="button" data-menu="${originalIndex}" aria-expanded="false" aria-label="Abrir acciones de ${role.name}">
                <i class="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i>
              </button>
              <div class="legacy-dropdown" data-dropdown="${originalIndex}" hidden>
                <button type="button" data-edit="${originalIndex}">
                  <i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>
                  Editar
                </button>
              </div>
            </div>
            <label class="form-check form-switch switch ${hasUsers ? "is-disabled" : ""}" data-state="${originalIndex}" title="${hasUsers ? "No disponible: el rol tiene usuarios asociados." : ""}">
              <input class="form-check-input" type="checkbox" ${role.status === "Activo" ? "checked" : ""} ${hasUsers ? "disabled" : ""} aria-label="${role.status === "Activo" ? "Inactivar" : "Activar"} ${role.name}">
            </label>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  refs.emptyState.hidden = state.filteredRoles.length > 0;
  refs.pageSummary.textContent = state.filteredRoles.length
    ? `Mostrando 1 a ${state.filteredRoles.length} de ${state.filteredRoles.length} registros`
    : "Mostrando 0 registros";
  refs.roleCount.textContent = `${roles.length} roles registrados`;
  enableTooltips();
}

function applyFilters() {
  const query = refs.filterName.value.trim().toLowerCase();
  const description = refs.filterDescription.value.trim().toLowerCase();
  const status = refs.filterStatus.value;
  state.filteredRoles = roles.filter((role) => {
    const searchable = [role.name, role.description, role.status, ...role.permissions].join(" ").toLowerCase();
    return searchable.includes(query)
      && role.description.toLowerCase().includes(description)
      && (status === "Todos" || role.status === status);
  });
  renderRoles();
}

function handleRoleAction(event, onEdit) {
  const editButton = event.target.closest("[data-edit]");
  const menuButton = event.target.closest("[data-menu]");
  const stateControl = event.target.closest(".switch[data-state]");

  if (menuButton) {
    const index = menuButton.dataset.menu;
    const dropdown = refs.rolesBody.querySelector(`[data-dropdown='${index}']`);
    const shouldOpen = state.openActionMenu !== index;
    closeActionMenus();
    if (shouldOpen && dropdown) {
      dropdown.hidden = false;
      menuButton.setAttribute("aria-expanded", "true");
      state.openActionMenu = index;
    }
    return;
  }

  if (editButton) {
    const index = Number(editButton.dataset.edit);
    closeActionMenus();
    onEdit(roles[index], index);
    return;
  }

  if (stateControl) {
    const input = stateControl.querySelector("input");
    const role = roles[Number(stateControl.dataset.state)];
    if (input.disabled || (role.status === "Activo" && role.users > 0)) {
      showToast("No disponible: el rol tiene usuarios asociados.", "warning");
      return;
    }
    role.status = role.status === "Activo" ? "Inactivo" : "Activo";
    role.updated = "18/08/2026 09:00";
    applyFilters();
    showToast(`Rol ${role.status === "Activo" ? "activado" : "inactivado"} correctamente.`, "success");
  }
}


/* source: ref-001-roles/js/main.js */






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
    refs.nameError.textContent = "Ya existe un rol con ese nombre.";
    valid = false;
  }
  if (!description) {
    refs.descriptionError.textContent = "Ingresa la descripción del rol.";
    valid = false;
  }
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
    showToast("Selecciona al menos un permiso para guardar el rol.", "warning");
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
  else roles.unshift(savedRole);
  const message = wasEditing ? "Rol actualizado correctamente." : "Rol registrado correctamente.";
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
document.getElementById("exportBtn").addEventListener("click", () => showToast("Exportación Excel generada para el prototipo."));
refs.rolesBody.addEventListener("click", (event) => handleRoleAction(event, openRoleForm));
document.addEventListener("click", (event) => { if (!event.target.closest(".action-menu")) closeActionMenus(); });
document.getElementById("continueBtn").addEventListener("click", () => { if (validateInfo()) setFormStep("permissions"); });
document.getElementById("backBtn").addEventListener("click", () => setFormStep("info"));
document.getElementById("cancelInfoBtn").addEventListener("click", () => { showList(); resetEditingState(); });
document.getElementById("saveRoleBtn").addEventListener("click", saveRole);

renderPermissions();
renderRoles();
