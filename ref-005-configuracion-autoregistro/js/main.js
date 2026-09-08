const configs = [
  { project: "Operativo 2026", role: "Registrador", start: "01/09/2026", startIso: "2026-09-01", end: "30/09/2026", endIso: "2026-09-30", accountExpiry: "", status: "Activa", code: "K7P4X2M9" },
  { project: "Evaluación 2026", role: "Supervisor de Seguimiento", start: "15/09/2026", startIso: "2026-09-15", end: "15/10/2026", endIso: "2026-10-15", accountExpiry: "", status: "Inactiva", code: "R3N8C5Q1" }
];

const refs = {
  body: document.getElementById("configBody"),
  count: document.getElementById("configCount"),
  emptyState: document.getElementById("emptyState"),
  summary: document.getElementById("configSummary"),
  filterForm: document.getElementById("filterForm"),
  advancedFilters: document.getElementById("advancedFilters"),
  filterToggle: document.getElementById("filterToggle"),
  search: document.getElementById("filterSearch"),
  projectFilter: document.getElementById("filterProject"),
  roleFilter: document.getElementById("filterRole"),
  statusFilter: document.getElementById("filterStatus"),
  startFilter: document.getElementById("filterStart"),
  endFilter: document.getElementById("filterEnd"),
  form: document.getElementById("configForm"),
  configModal: document.getElementById("configModal"),
  modalTitle: document.getElementById("configModalTitle"),
  formGrid: document.querySelector("#configForm .form-grid"),
  formActions: document.getElementById("configFormActions"),
  editNote: document.getElementById("editNote"),
  generatedResult: document.getElementById("generatedResult"),
  resultActions: document.getElementById("resultActions"),
  generatedCode: document.getElementById("generatedCode"),
  generatedLink: document.getElementById("generatedLink"),
  toast: document.getElementById("toast"),
  confirmModal: document.getElementById("confirmModal"),
  confirmMessage: document.getElementById("confirmMessage"),
  confirmAction: document.getElementById("confirmAction")
};

let filteredConfigs = [...configs];
let editingIndex = null;
let pendingAction = null;
let sortKey = "";
let sortDirection = 1;

function showToast(message, type = "success") {
  renderToast(refs.toast, message, type);
}

function formatDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function randomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  do {
    code = Array.from({ length: 8 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  } while (configs.some((config) => config.code === code));
  return code;
}

function renderConfigs() {
  refs.body.innerHTML = filteredConfigs.length ? filteredConfigs.map((config) => {
    const index = configs.indexOf(config);
    const inactive = config.status === "Inactiva";
    return `<tr><td><strong>${config.project}</strong></td><td>${config.role}</td><td><div class="period"><strong>${config.start}</strong><span>hasta ${config.end}</span></div></td><td><span class="status ${inactive ? "inactive" : "active"}">${config.status}</span></td><td class="code-cell">${config.code}</td><td><div class="row-actions"><button class="row-action" type="button" data-action="edit" data-edit="${index}" data-config-action="edit" data-config-index="${index}" aria-label="Editar ${config.project}" title="Editar"><i class="fa-solid fa-pen" aria-hidden="true"></i><span>Editar</span></button><label class="form-check form-switch switch row-state-toggle" data-state="${index}" data-on-label="Activa" data-off-label="Inactiva" title="${inactive ? "Activar configuración" : "Inactivar configuración"}"><input class="form-check-input" type="checkbox" data-config-action="toggle" data-config-index="${index}" ${inactive ? "" : "checked"} aria-label="${inactive ? "Activar" : "Inactivar"} configuración de ${config.project}"></label></div></td></tr>`;
  }).join("") : "";
  refs.emptyState.hidden = filteredConfigs.length > 0;
  const total = filteredConfigs.length;
  refs.count.textContent = `${total} ${total === 1 ? "configuración" : "configuraciones"} registradas`;
  refs.summary.textContent = total ? `Mostrando 1 a ${total} de ${total} configuraciones` : "Mostrando 0 configuraciones";
}

function applyFilters(showMessage = false) {
  const query = refs.search.value.trim().toLowerCase();
  const project = refs.projectFilter.value;
  const role = refs.roleFilter.value;
  const status = refs.statusFilter.value;
  const start = refs.startFilter.value;
  const end = refs.endFilter.value;
  filteredConfigs = configs.filter((config) => {
    const searchable = `${config.project} ${config.role} ${config.code}`.toLowerCase();
    return (!query || searchable.includes(query)) &&
      (project === "Todos" || config.project === project) &&
      (role === "Todos" || config.role === role) &&
      (status === "Todos" || config.status === status) &&
      (!start || config.startIso === start) &&
      (!end || config.endIso === end);
  });
  renderConfigs();
  if (showMessage) showToast(filteredConfigs.length ? getPrototypeMessage("filtersApplied") : getMessage("M9"), filteredConfigs.length ? "info" : "warning");
}

function resetFilters() {
  refs.filterForm.reset();
  applyFilters(false);
  showToast(getPrototypeMessage("filtersCleared"), "info");
}

function setFormValue(id, value) {
  document.getElementById(id).value = value || "";
}

function openConfigModal(index = null) {
  editingIndex = index;
  const config = index === null ? null : configs[index];
  refs.form.reset();
  refs.formGrid.hidden = false;
  refs.formActions.hidden = false;
  refs.editNote.hidden = index === null;
  refs.generatedResult.hidden = true;
  refs.resultActions.hidden = true;
  refs.modalTitle.textContent = index === null ? "Configurar autoregistro" : "Editar configuración";
  setFormValue("project", config?.project);
  setFormValue("defaultRole", config?.role);
  setFormValue("startDate", config?.startIso);
  setFormValue("endDate", config?.endIso);
  setFormValue("accountExpiry", config?.accountExpiry);
  setFormValue("configStatus", config?.status || "Activa");
  ["startDate", "endDate", "accountExpiry"].forEach((id) => { document.getElementById(id).disabled = index !== null; });
  bootstrap.Modal.getOrCreateInstance(refs.configModal).show();
}

function showGeneratedResult(config) {
  refs.formGrid.hidden = true;
  refs.editNote.hidden = true;
  refs.formActions.hidden = true;
  refs.generatedCode.textContent = config.code;
  refs.generatedLink.textContent = `https://ssee.gob.pe/autoregistro/${config.code}`;
  refs.generatedResult.hidden = false;
  refs.resultActions.hidden = false;
}

function showConfirm(message, action) {
  pendingAction = action;
  refs.confirmMessage.textContent = message;
  bootstrap.Modal.getOrCreateInstance(refs.confirmModal).show();
}

function sortConfigs(key, type) {
  sortDirection = sortKey === key ? sortDirection * -1 : 1;
  sortKey = key;
  filteredConfigs.sort((left, right) => {
    const a = type === "date" ? left.startIso : left[key];
    const b = type === "date" ? right.startIso : right[key];
    return String(a).localeCompare(String(b), "es", { numeric: true }) * sortDirection;
  });
  document.querySelectorAll(".ssee-table th[aria-sort]").forEach((header) => header.setAttribute("aria-sort", "none"));
  const header = document.querySelector(`[data-sort-key="${key}"]`)?.closest("th");
  header?.setAttribute("aria-sort", sortDirection === 1 ? "ascending" : "descending");
  renderConfigs();
}

refs.filterToggle.addEventListener("click", () => {
  const isOpen = refs.filterForm.classList.toggle("is-expanded");
  refs.filterToggle.setAttribute("aria-expanded", String(isOpen));
  refs.filterToggle.setAttribute("aria-label", isOpen ? "Cerrar filtros" : "Abrir filtros");
});
refs.filterForm.addEventListener("submit", (event) => { event.preventDefault(); applyFilters(true); });
document.getElementById("clearFilters").addEventListener("click", resetFilters);
document.getElementById("newConfigBtn").addEventListener("click", () => openConfigModal());

refs.body.addEventListener("click", (event) => {
  const editButton = event.target.closest('[data-config-action="edit"]');
  if (editButton) openConfigModal(Number(editButton.dataset.configIndex));
});

refs.body.addEventListener("change", (event) => {
  const toggle = event.target.closest('[data-config-action="toggle"]');
  if (!toggle) return;
  const index = Number(toggle.dataset.configIndex);
  const config = configs[index];
  toggle.checked = config.status === "Activa";
  const nextStatus = config.status === "Activa" ? "Inactiva" : "Activa";
  showConfirm(getMessage(nextStatus === "Activa" ? "M5" : "M6"), () => {
    config.status = nextStatus;
    applyFilters(false);
    showToast(getMessage(nextStatus === "Activa" ? "M7" : "M8"));
  });
});

document.querySelectorAll(".sort-button").forEach((button) => button.addEventListener("click", () => sortConfigs(button.dataset.sortKey, button.dataset.sortType)));

refs.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = document.getElementById("project").value;
  const role = document.getElementById("defaultRole").value;
  const startIso = document.getElementById("startDate").value;
  const endIso = document.getElementById("endDate").value;
  if (!project || !role || (editingIndex === null && (!startIso || !endIso))) return showToast(getMessage("M11"), "warning");
  if (editingIndex === null && startIso > endIso) return showToast(getMessage("M12"), "warning");
  if (editingIndex !== null) {
    showConfirm(getMessage("M1"), () => {
      const config = configs[editingIndex];
      config.project = project;
      config.role = role;
      config.status = document.getElementById("configStatus").value;
      bootstrap.Modal.getOrCreateInstance(refs.configModal).hide();
      applyFilters(false);
      showToast(getMessage("M3"));
    });
    return;
  }
  const code = randomCode();
  const config = { project, role, start: formatDate(startIso), startIso, end: formatDate(endIso), endIso, accountExpiry: document.getElementById("accountExpiry").value, status: document.getElementById("configStatus").value, code };
  showConfirm(getMessage("M1"), () => {
    configs.unshift(config);
    applyFilters(false);
    showGeneratedResult(config);
    showToast(getMessage("M2"));
  });
});

refs.confirmAction.addEventListener("click", () => {
  const action = pendingAction;
  pendingAction = null;
  bootstrap.Modal.getOrCreateInstance(refs.confirmModal).hide();
  if (action) action();
});

document.querySelectorAll("[data-copy]").forEach((button) => button.addEventListener("click", async () => {
  const value = button.dataset.copy === "code" ? refs.generatedCode.textContent : refs.generatedLink.textContent;
  try { await navigator.clipboard.writeText(value); } catch { /* Copiar puede estar restringido al abrir el archivo local. */ }
}));

if (typeof enableTooltips === "function") enableTooltips();
renderConfigs();
