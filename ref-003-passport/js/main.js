import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { renderToast } from "../../design-system/interaction.js";
import { attachTableSorting } from "../../design-system/table-sort.js";

const records = [
  { username: "12345678", name: "María Lozano", type: "Passport", roles: ["Administrador USE"], projects: ["Operativo 2026"], status: "Activo" },
  { username: "87654321", name: "Juan Castro", type: "Documento", roles: ["Supervisor de Seguimiento"], projects: ["Evaluación 2026"], status: "Activo" },
  { username: "45871236", name: "Rosa Quispe", type: "Autoregistro", roles: [], projects: [], status: "Inactivo" },
  { username: "74125896", name: "Diego Huamán", type: "Passport", roles: ["Registrador"], projects: ["Seguimiento 2026"], status: "Activo" },
];

const body = document.getElementById("usersBody");
const toast = document.getElementById("toast");
const typeFilter = document.createElement("select");
let automaticSyncTimer;
let syncRunning = false;

function showToast(message, type = "info") {
  renderToast(toast, message, type);
}

function configureView() {
  document.querySelector(".side-nav .nav-item.is-active").textContent = "Usuarios";
  document.querySelector(".location-card strong").textContent = "Sede";
  document.querySelector(".account-copy strong").textContent = "Administrador";
  document.querySelector(".location-card").insertAdjacentHTML("beforeend", '<i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>');
  document.querySelector(".account").innerHTML = '<button class="bell" type="button" aria-label="Notificaciones"><i class="fa-regular fa-bell"></i></button><div class="account-separator" aria-hidden="true"></div><div class="account-copy"><strong>Administrador</strong><span>Superadministrador</span></div><div class="avatar" aria-hidden="true">A</div><i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>';
  document.querySelector(".breadcrumb").innerHTML = '<a href="../index.html">Índice de requerimientos</a> / ALI-REF-003 / Sincronización Passport';
  document.querySelector("h1").textContent = "Gestión de usuarios";
  document.querySelector(".page-subtitle").textContent = "Bandeja general de usuarios y sincronización con Passport.";
  document.getElementById("syncBtn").innerHTML = '<i class="fa-solid fa-rotate"></i> Sincronizar usuarios';
  document.querySelector(".source-notice span").textContent = "La sincronización automática mantiene los datos de Passport actualizados. Este botón permite forzarla de inmediato.";
  document.querySelector(".sync-status > div:first-child span").textContent = "Última sincronización con Passport";
  document.querySelector(".table-heading h2").textContent = "Bandeja general de usuarios";
  document.querySelector(".table-heading .muted").remove();
  document.querySelector(".ssee-table thead tr").innerHTML = '<th aria-sort="none"><button class="sort-button" type="button" data-sort-key="username" data-sort-type="text">Usuario <i class="fa-solid fa-arrow-down-up" aria-hidden="true"></i></button></th><th aria-sort="none"><button class="sort-button" type="button" data-sort-key="name" data-sort-type="text">Nombres y apellidos <i class="fa-solid fa-arrow-down-up" aria-hidden="true"></i></button></th><th aria-sort="none"><button class="sort-button" type="button" data-sort-key="type" data-sort-type="text">Tipo de autenticación <i class="fa-solid fa-arrow-down-up" aria-hidden="true"></i></button></th><th aria-sort="none"><button class="sort-button" type="button" data-sort-key="roles" data-sort-type="text">Roles <i class="fa-solid fa-arrow-down-up" aria-hidden="true"></i></button></th><th aria-sort="none"><button class="sort-button" type="button" data-sort-key="projects" data-sort-type="text">Proyectos <i class="fa-solid fa-arrow-down-up" aria-hidden="true"></i></button></th><th aria-sort="none"><button class="sort-button" type="button" data-sort-key="status" data-sort-type="text">Estado <i class="fa-solid fa-arrow-down-up" aria-hidden="true"></i></button></th><th>Acciones</th>';
  document.querySelector(".ssee-table thead tr").insertAdjacentHTML("afterbegin", '<th data-column="row-number">N.°</th>');
  document.querySelector(".result-grid").innerHTML = `
    <div class="result-card"><i class="fa-solid fa-users"></i><div><span>Total de usuarios</span><strong id="totalUsers">0</strong></div></div>
    <div class="result-card"><i class="fa-solid fa-user-check"></i><div><span>Activos</span><strong id="activeUsers">0</strong></div></div>
    <div class="result-card"><i class="fa-solid fa-user-slash"></i><div><span>Inactivos</span><strong id="inactiveUsers">0</strong></div></div>
    <div class="result-card"><i class="fa-solid fa-user-lock"></i><div><span>Pendientes de acceso</span><strong id="pendingUsers">0</strong></div></div>`;
  const label = document.createElement("label");
  label.className = "table-filter";
  label.innerHTML = "Tipo de autenticación";
  typeFilter.className = "form-select";
  typeFilter.innerHTML = "<option>Todos</option><option>Passport</option><option>Documento</option><option>Autoregistro</option>";
  label.append(typeFilter);
  document.querySelector(".table-heading").append(label);
  typeFilter.addEventListener("change", render);
}

function render() {
  const type = typeFilter.value || "Todos";
  const visible = records.filter((record) => type === "Todos" || record.type === type);
  body.innerHTML = visible.map((record) => `
    <tr><td>${records.indexOf(record) + 1}</td><td><strong>${record.username}</strong></td><td>${record.name}</td><td>${record.type}</td>
      <td>${record.roles.length ? record.roles.map((role) => `<span class="tag">${role}</span>`).join(" ") : '<span class="muted">Pendiente</span>'}</td>
      <td>${record.projects.length ? record.projects.map((project) => `<span class="tag">${project}</span>`).join(" ") : '<span class="muted">Pendiente</span>'}</td>
      <td><span class="status ${record.status === "Activo" ? "active" : "inactive"}">${record.status}</span></td>
      <td><div class="row-actions"><button class="row-action" type="button" data-action="roles" data-access-action="open-users" data-user-name="${record.name}" title="Asignar" aria-label="Asignar a ${record.name}"><i class="fa-solid fa-user-gear" aria-hidden="true"></i><span>Asignar</span></button></div></td></tr>`).join("");
  document.getElementById("totalUsers").textContent = visible.length;
  document.getElementById("activeUsers").textContent = visible.filter((record) => record.status === "Activo").length;
  document.getElementById("inactiveUsers").textContent = visible.filter((record) => record.status === "Inactivo").length;
  document.getElementById("pendingUsers").textContent = visible.filter((record) => !record.roles.length || !record.projects.length).length;
}

configureView();
attachTableSorting(document.querySelector(".ssee-table"));

function runSync() {
  if (syncRunning) return;
  const button = document.getElementById("syncBtn");
  const syncState = document.getElementById("syncState");
  syncRunning = true;
  button.disabled = true;
  syncState.textContent = "En proceso";
  syncState.className = "status warning";
  showToast(getPrototypeMessage("syncStarted"), "info");
  setTimeout(() => {
    syncState.textContent = "Completada";
    syncState.className = "status active";
    document.getElementById("lastSync").textContent = "18/08/2026 09:00";
    document.getElementById("processed").textContent = "28";
    button.disabled = false;
    syncRunning = false;
    showToast(getMessage("M22"), "success");
  }, 1200);
}

document.getElementById("syncBtn").addEventListener("click", () => {
  window.clearTimeout(automaticSyncTimer);
  runSync();
});

render();
automaticSyncTimer = window.setTimeout(runSync, 3500);
body.addEventListener("click", (event) => {
  if (event.target.closest("[data-access-action='open-users']")) {
    const button = event.target.closest("[data-access-action='open-users']");
    window.location.href = `../ref-006-users/index.html?accessName=${encodeURIComponent(button.dataset.userName)}`;
  }
});
