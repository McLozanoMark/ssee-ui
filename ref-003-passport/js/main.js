import { getMessage, getPrototypeMessage } from "../../design-system/messages.js";
import { renderToast } from "../../design-system/interaction.js";

const records = [
  { username: "12345678", name: "María Lozano", type: "Passport", roles: ["Administrador USE"], projects: ["Operativo 2026"], status: "Activo" },
  { username: "87654321", name: "Juan Castro", type: "Documento", roles: ["Supervisor de Seguimiento"], projects: ["Evaluación 2026"], status: "Activo" },
  { username: "45871236", name: "Rosa Quispe", type: "Autoregistro", roles: [], projects: [], status: "Inactivo" },
  { username: "74125896", name: "Diego Huamán", type: "Passport", roles: ["Registrador"], projects: ["Seguimiento 2026"], status: "Activo" },
];

const body = document.getElementById("usersBody");
const toast = document.getElementById("toast");
const typeFilter = document.createElement("select");

function showToast(message, type = "info") {
  renderToast(toast, message, type);
}

function configureView() {
  document.querySelector(".side-nav .nav-item.is-active").textContent = "Usuarios";
  document.querySelector(".location-card strong").textContent = "Sede";
  document.querySelector(".account-copy strong").textContent = "Administrador";
  document.querySelector(".location-card").insertAdjacentHTML("beforeend", '<i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>');
  document.querySelector(".account").innerHTML = '<button class="bell" type="button" aria-label="Notificaciones"><i class="fa-regular fa-bell"></i></button><div class="account-separator" aria-hidden="true"></div><div class="account-copy"><strong>Administrador</strong><span>Superadmin</span></div><div class="avatar" aria-hidden="true">A</div><i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>';
  document.querySelector(".breadcrumb").innerHTML = '<a href="../index.html">Índice de requerimientos</a> / ALI-REF-003 / Sincronización Passport';
  document.querySelector("h1").textContent = "Gestión de usuarios";
  document.querySelector(".page-subtitle").textContent = "Bandeja general de usuarios y sincronización con Passport.";
  document.getElementById("syncBtn").innerHTML = '<i class="fa-solid fa-rotate"></i> Sincronizar Passport';
  document.querySelector(".source-notice span").textContent = "La sincronización automática mantiene los datos de Passport actualizados. Este botón permite forzarla de inmediato.";
  document.querySelector(".table-heading h2").textContent = "Bandeja general de usuarios";
  document.querySelector(".table-heading .muted").remove();
  document.querySelector(".ssee-table thead tr").innerHTML = "<th>Usuario</th><th>Nombres y apellidos</th><th>Tipo de autenticación</th><th>Roles</th><th>Proyectos</th><th>Estado</th><th>Acciones</th>";
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
    <tr><td><strong>${record.username}</strong></td><td>${record.name}</td><td>${record.type}</td>
      <td>${record.roles.length ? record.roles.map((role) => `<span class="tag">${role}</span>`).join(" ") : '<span class="muted">Pendiente</span>'}</td>
      <td>${record.projects.length ? record.projects.map((project) => `<span class="tag">${project}</span>`).join(" ") : '<span class="muted">Pendiente</span>'}</td>
      <td><span class="status ${record.status === "Activo" ? "active" : "inactive"}">${record.status}</span></td>
      <td><div class="row-actions"><button class="row-action" type="button" data-action="roles" data-access-action="open-users" title="Administrar acceso" aria-label="Administrar acceso de ${record.name}"><i class="fa-solid fa-user-gear" aria-hidden="true"></i><span>Administrar acceso</span></button></div></td></tr>`).join("");
  document.getElementById("totalUsers").textContent = visible.length;
  document.getElementById("activeUsers").textContent = visible.filter((record) => record.status === "Activo").length;
  document.getElementById("inactiveUsers").textContent = visible.filter((record) => record.status === "Inactivo").length;
  document.getElementById("pendingUsers").textContent = visible.filter((record) => !record.roles.length || !record.projects.length).length;
}

configureView();
document.getElementById("syncBtn").addEventListener("click", () => {
  const button = document.getElementById("syncBtn");
  const syncState = document.getElementById("syncState");
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
    showToast(getMessage("M22"), "success");
  }, 1200);
});

render();
body.addEventListener("click", (event) => {
  if (event.target.closest("[data-access-action='open-users']")) {
    window.location.href = "../ref-006-users/index.html";
  }
});
