import { users } from "./data.js";
import { state } from "./state.js";
import { refs, showDetail, showToast } from "./ui.js";
import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { openConfirmModal } from "../../design-system/interaction.js";
import { toDateInputValue } from "../../design-system/date-range.js";
let reniecTarget = null;
let pendingReniec = null;

const reniecRecords = {
  jcastro: { documentNumber: "87654321", name: "Juan Carlos Castro Fernández", birthDate: "12/09/1986" },
  aparedes: { documentNumber: "74125896", name: "Ana María Paredes García", birthDate: "15/04/1988" },
};

function syncValidityState() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  users.forEach((user) => {
    if (user.expires === "-") return;
    const [day, month, year] = user.expires.split("/").map(Number);
    const expiry = new Date(year, month - 1, day);
    const daysRemaining = Math.ceil((expiry - today) / 86400000);
    if (daysRemaining < 0) {
      user.status = "Inactivo";
      user.expiresSoon = false;
    } else {
      user.expiresSoon = daysRemaining <= 30;
    }
  });
}

function calculateValidation(user, roles = user.roles, projects = user.projects || []) {
  if (!["Passport", "Documento"].includes(user.auth)) return user.validation || "Pendiente";
  return roles.length && projects.length ? "Validado" : "Pendiente";
}
export function applyFilters() {
  syncValidityState();
  const q = document.getElementById("filterName").value.trim().toLowerCase(),
    role = document.getElementById("filterRole").value,
    status = document.getElementById("filterStatus").value,
    auth = document.getElementById("filterAuth").value,
    project = document.getElementById("filterProject").value.trim().toLowerCase(),
    validity = document.getElementById("filterValidity").value,
    lastAccessStart = document.getElementById("filterLastAccessStart").value,
    lastAccessEnd = document.getElementById("filterLastAccessEnd").value;
  state.filteredUsers = users.filter(
    (user) =>
      matchesGlobalSearch(user, q) &&
      (role === "Todos" || user.roles.includes(role)) &&
      (status === "Todos" || user.status === status) &&
      (auth === "Todos" || user.auth === auth) &&
      (!project || (user.projects || []).join(" ").toLowerCase().includes(project)) &&
      (validity === "Todos"
        || (validity === "Sin vencimiento" && user.expires === "-")
        || (validity === "Por vencer" && user.expiresSoon)
        ) &&
      (!lastAccessStart || toDateInputValue(user.lastAccess) >= lastAccessStart) &&
      (!lastAccessEnd || toDateInputValue(user.lastAccess) <= lastAccessEnd),
  );
  renderUsers();
}
function matchesGlobalSearch(user, query) {
  if (!query) return true;
  const rowNumber = String(users.indexOf(user) + 1);
  const searchableFields = [
    user.username,
    user.name,
    user.email,
    user.auth,
    user.status,
    user.expires,
    user.lastAccess,
    ...user.roles,
    ...(user.projects || []),
  ];
  if (/^\d+$/.test(query) && users.some((item) => String(users.indexOf(item) + 1) === query)) {
    return rowNumber === query;
  }
  return [rowNumber, ...searchableFields].join(" ").toLowerCase().includes(query);
}
export function renderUsers() {
  syncValidityState();
  const header = refs.usersBody.closest("table")?.querySelector("thead tr");
  if (header && !header.querySelector("[data-column='row-number']")) header.insertAdjacentHTML("afterbegin", '<th data-column="row-number">N.°</th>');
  refs.usersBody.innerHTML = state.filteredUsers
    .map((user, index) => {
      const roleTags = user.roles.length
        ? user.roles.map((role) => `<span class="tag">${role}</span>`).join("")
        : '<span class="muted">Pendiente</span>';
      const statusClass = user.status === "Activo" ? "active" : "inactive";
      const statusControl = `<span class="status ${statusClass}">${user.status}</span>`;
      const actionMenu = `<div class="row-actions user-actions">
        <button class="row-action" type="button" data-action="edit" data-user="${index}" data-user-action="edit" title="Editar">
          <i class="fa-solid fa-pen" aria-hidden="true"></i><span>Editar</span>
        </button>
      </div>`;
      const projectTags = user.projects?.length
        ? user.projects.map((project) => `<span class="tag">${project}</span>`).join("")
        : '<span class="muted">Pendiente</span>';
      return `
      <tr>
        <td>${users.indexOf(user) + 1}</td><td><strong>${user.username}</strong></td><td>${user.name}</td><td>${user.email}</td><td>${user.auth}</td>
        <td><div class="user-role-tags">${roleTags}</div></td>
        <td><div class="user-role-tags">${projectTags}</div></td>
        <td>${user.expires}</td><td>${statusControl}</td><td>${user.lastAccess}</td>
        <td>${actionMenu}</td>
      </tr>`;
    })
    .join("");
  refs.emptyState.textContent = getMessage("M9");
  refs.emptyState.hidden = state.filteredUsers.length > 0;
  refs.pageSummary.textContent = state.filteredUsers.length
    ? `Mostrando 1 a ${state.filteredUsers.length} de ${state.filteredUsers.length} registros`
    : "Mostrando 0 registros";
  refs.userCount.textContent = `${users.length} usuarios registrados`;
  document.getElementById("expiringCount").textContent = users.filter((user) => user.expiresSoon).length;
  document.getElementById("noProjectCount").textContent = users.filter((user) => !user.projects?.length).length;
}
export function openSelected(index) {
  const user = state.filteredUsers[index];
  if (user) {
    state.selectedUser = user;
    showDetail(user);
  }
}
export function openEditUser(index) {
  const user = state.filteredUsers[index];
  if (!user) return;
  const demo = document.body.dataset.userDemo || "ref-007-users";
  try {
    sessionStorage.setItem("ssee-editing-user", JSON.stringify(user));
  } catch {
    showToast(getMessage("M12"), "warning");
    return;
  }
  const admissionPath = demo === "ref-004-admision" ? "admitir.html" : "../ref-004-admision/admitir.html";
  window.location.href = `${admissionPath}?mode=edit&user=${encodeURIComponent(user.username)}&return=${demo}`;
}

export function openReniecUpdate(index) {
  reniecTarget = state.filteredUsers[index];
  if (!reniecTarget || reniecTarget.auth !== "Documento") return;
  pendingReniec = null;
  refs.reniecModalContext.textContent = `Usuario: ${reniecTarget.name}`;
  refs.reniecDocument.value = reniecTarget.documentNumber || "";
  refs.reniecName.textContent = "";
  refs.reniecBirth.textContent = "";
  refs.reniecResult.hidden = true;
  refs.saveReniecBtn.disabled = true;
  bootstrap.Modal.getOrCreateInstance(refs.reniecModal).show();
}

export function consultReniec() {
  if (!reniecTarget) return;
  const result = reniecRecords[reniecTarget.username] || {
    documentNumber: reniecTarget.documentNumber || "00000000",
    name: reniecTarget.name,
    birthDate: reniecTarget.birthDate || "-",
  };
  refs.reniecDocument.value = result.documentNumber;
  refs.reniecName.textContent = result.name;
  refs.reniecBirth.textContent = result.birthDate;
  refs.reniecResult.hidden = false;
  pendingReniec = result;
  refs.saveReniecBtn.disabled = false;
  showToast(getPrototypeMessage("identityLookupSuccess"), "success");
}

export function saveReniec() {
  if (!reniecTarget || !pendingReniec) return;
  refs.confirmRolesMessage.textContent = getMessage("M1");
  openConfirmModal("confirmRolesModal", getMessage("M1"));
}
export function confirmRoles() {
  if (pendingReniec && reniecTarget) {
    reniecTarget.documentNumber = pendingReniec.documentNumber;
    reniecTarget.name = pendingReniec.name;
    reniecTarget.birthDate = pendingReniec.birthDate;
    pendingReniec = null;
    reniecTarget = null;
    bootstrap.Modal.getOrCreateInstance(refs.confirmRolesModal).hide();
    bootstrap.Modal.getOrCreateInstance(refs.reniecModal).hide();
    renderUsers();
    showToast(getMessage("M3"), "success");
    return;
  }
}
export function exportUsers() {
  showToast(getMessage("M67"), "success");
}

export function dismissPendingConfirmation() {
  pendingReniec = null;
}
