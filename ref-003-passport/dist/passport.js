const demoIndexLink=document.createElement("a");demoIndexLink.className="demo-index-link";demoIndexLink.href="../index.html";demoIndexLink.textContent="← Volver al índice";document.body.append(demoIndexLink);
/* source: design-system/messages.js */
const MESSAGE_CATALOG = Object.freeze({
  M1: { text: "¿Está seguro que desea guardar esta información?", type: "Confirmación", scope: "General" },
  M2: { text: "La información se ha guardado correctamente.", type: "Información", scope: "General" },
  M3: { text: "La información se ha actualizado correctamente.", type: "Información", scope: "General" },
  M4: { text: "¿Está seguro que desea eliminar la información seleccionada?", type: "Confirmación", scope: "General" },
  M5: { text: "¿Está seguro que desea activar el registro seleccionado?", type: "Confirmación", scope: "General" },
  M6: { text: "¿Está seguro que desea inactivar el registro seleccionado?", type: "Confirmación", scope: "General" },
  M7: { text: "El registro se ha activado correctamente.", type: "Información", scope: "General" },
  M8: { text: "El registro se ha inactivado correctamente.", type: "Información", scope: "General" },
  M9: { text: "No se encontraron registros con los criterios de búsqueda seleccionados.", type: "Información", scope: "General" },
  M10: { text: "Ya existe un registro con los datos ingresados.", type: "Alerta", scope: "General" },
  M11: { text: "Debe completar los campos obligatorios.", type: "Alerta", scope: "General" },
  M12: { text: "Verifique la información ingresada.", type: "Alerta", scope: "General" },
  M13: { text: "Ocurrió un error inesperado al procesar la solicitud. Por favor, intente nuevamente.", type: "Alerta", scope: "General" },
  M14: { text: "¿Está seguro que desea cancelar?", type: "Confirmación", scope: "General" },
  M15: { text: "No es posible inactivar un rol que posee usuarios asociados.", type: "Alerta", scope: "General" },
  M16: { text: "Debe seleccionar al menos un permiso para asignar al rol.", type: "Alerta", scope: "General" },
  M17: { text: "No es posible realizar la operación porque el rol se encuentra inactivo.", type: "Alerta", scope: "General" },
  M18: { text: "Los permisos del rol se han actualizado correctamente.", type: "Información", scope: "General" },
  M19: { text: "Ya existe un usuario registrado con el documento ingresado.", type: "Alerta", scope: "General" },
  M20: { text: "Ya existe un usuario registrado con el correo electrónico ingresado.", type: "Alerta", scope: "General" },
  M21: { text: "No fue posible completar la sincronización con Passport.", type: "Alerta", scope: "General" },
  M22: { text: "La sincronización con Passport se ha realizado correctamente.", type: "Información", scope: "General" },
  M23: { text: "El periodo de autoregistro no se encuentra habilitado.", type: "Alerta", scope: "General" },
  M24: { text: "El periodo habilitado para el autoregistro ha finalizado.", type: "Alerta", scope: "General" },
  M25: { text: "El enlace de registro ha expirado.", type: "Alerta", scope: "General" },
  M26: { text: "Se ha enviado un mensaje al correo electrónico registrado para completar el registro.", type: "Información", scope: "General" },
  M27: { text: "Las credenciales ingresadas no son válidas.", type: "Alerta", scope: "General" },
  M28: { text: "Su sesión ha expirado. Inicie sesión nuevamente.", type: "Alerta", scope: "General" },
  M29: { text: "Su sesión ha sido cerrada debido al inicio de una nueva sesión.", type: "Información", scope: "General" },
  M30: { text: "No fue posible iniciar sesión. Intente nuevamente.", type: "Alerta", scope: "General" },
  M31: { text: "La nueva contraseña no cumple con las políticas de seguridad establecidas.", type: "Alerta", scope: "General" },
  M32: { text: "La nueva contraseña y su confirmación no coinciden.", type: "Alerta", scope: "General" },
  M33: { text: "La contraseña se ha actualizado correctamente.", type: "Información", scope: "General" },
  M34: { text: "El cambio de contraseña no pudo completarse. Intente nuevamente.", type: "Alerta", scope: "General" },
  M35: { text: "Si existe una cuenta asociada al correo ingresado, recibirá un enlace para recuperar su contraseña.", type: "Información", scope: "General" },
  M36: { text: "El enlace de recuperación ha expirado. Solicite uno nuevo.", type: "Alerta", scope: "General" },
  M37: { text: "La contraseña se ha restablecido correctamente.", type: "Información", scope: "General" },
  M39: { text: "No tiene proyectos asignados para visualizar.", type: "Información", scope: "General" },
  M40: { text: "No tiene instrumentos pendientes de atención.", type: "Información", scope: "General" },
  M41: { text: "Tiene %s instrumentos asignados.", type: "Información", scope: "General" },
  M42: { text: "Tiene %s instrumentos pendientes de atención.", type: "Información", scope: "General" },
  M43: { text: "Tiene %s instrumentos enviados.", type: "Información", scope: "General" },
  M44: { text: "Tiene %s notificaciones pendientes.", type: "Información", scope: "General" },
  M45: { text: "Complete la información requerida para registrar la fuente de datos.", type: "Información", scope: "General" },
  M46: { text: "No fue posible guardar la estructura.", type: "Información", scope: "General" },
  M47: { text: "Seleccione el campo o conjunto de campos que identificarán las unidades muestrales.", type: "Información", scope: "General" },
  M48: { text: "Debe seleccionar al menos un campo válido.", type: "Error", scope: "General" },
  M49: { text: "Se detectaron registros con observaciones; revise el detalle.", type: "Advertencia", scope: "General" },
  M50: { text: "Ingrese los datos de las unidades muestrales según la estructura configurada.", type: "Advertencia", scope: "General" },
  M51: { text: "El archivo contiene observaciones que deberán revisarse.", type: "Advertencia", scope: "General" },
  M52: { text: "El archivo fue cargado correctamente.", type: "Información", scope: "General" },
  M53: { text: "El procesamiento finalizó. Procesados: %s. Aceptados: %s. Rechazados: %s. Duplicados: %s. Con errores: %s.", type: "Información", scope: "General" },
  M54: { text: "Ya existe una fuente con el mismo nombre para el periodo e intervención seleccionados.", type: "Advertencia", scope: "General" },
  M55: { text: "La fuente ya fue utilizada y su estructura no puede modificarse/eliminarse.", type: "Advertencia", scope: "General" },
  M56: { text: "El procesamiento finalizó con observaciones; revise los registros rechazados o duplicados.", type: "Advertencia", scope: "General" },
  M57: { text: "Se detectaron unidades muestrales con observaciones.", type: "Advertencia", scope: "General" },
  M58: { text: "El archivo fue generado correctamente.", type: "Información", scope: "General" },
  M59: { text: "La sincronización finalizó correctamente.", type: "Información", scope: "General" },
  M60: { text: "No fue posible completar la sincronización.", type: "Alerta", scope: "General" },
  M61: { text: "No fue posible consultar el detalle de la fuente.", type: "Alerta", scope: "General" },
  M62: { text: "La fuente ya fue utilizada y no puede modificarse.", type: "Alerta", scope: "General" },
  M63: { text: "No fue posible generar una nueva versión.", type: "Alerta", scope: "General" },
  M64: { text: "La fuente de datos fue eliminada correctamente.", type: "Información", scope: "General" },
  M65: { text: "No hay registros disponibles. Haz clic en \"Nuevo\" para empezar.", type: "Información", scope: "General" },
  M66: { text: "Complete los datos del rol para activar esta sección.", type: "Alerta", scope: "Roles" },
  M67: { text: "Registros exportados correctamente.", type: "Información", scope: "General" }
});

function getMessage(code, values = []) {
  const entry = MESSAGE_CATALOG[code];
  if (!entry) return "";
  let index = 0;
  return entry.text.replace(/%s/g, () => values[index++] ?? "");
}


/* source: ref-003-passport/js/main.js */


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
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fa-solid ${type === "success" ? "fa-circle-check" : type === "warning" ? "fa-triangle-exclamation" : "fa-circle-info"}"></i><span>${message}</span>`;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 4500);
}

function configureView() {
  document.querySelector(".side-nav .nav-item.is-active").textContent = "Usuarios";
  document.querySelector(".location-card strong").textContent = "Ubicación";
  document.querySelector(".account-copy strong").textContent = "Administrador";
  document.querySelector(".location-card").insertAdjacentHTML("beforeend", '<i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>');
  document.querySelector(".account").innerHTML = '<button class="bell" type="button" aria-label="Notificaciones"><i class="fa-regular fa-bell"></i></button><div class="account-separator" aria-hidden="true"></div><div class="account-copy"><strong>Administrador</strong><span>Superadmin</span></div><div class="avatar" aria-hidden="true">A</div><i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>';
  document.querySelector(".breadcrumb").textContent = "Administración / Usuarios / Passport";
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
      <td><button class="menu-btn" type="button" data-access-action="open-users" title="Administrar acceso" aria-label="Administrar acceso de ${record.name}"><i class="fa-solid fa-user-gear"></i></button></td></tr>`).join("");
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
  showToast("Sincronización iniciada.", "info");
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
