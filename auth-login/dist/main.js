/* source: design-system/demo-navigation.js */
const CURRENT_DEMO_USER = "Ana Paredes";

function applyCurrentDemoUser() {
  document.querySelectorAll(".account-copy strong, #accountName").forEach((node) => {
    node.textContent = CURRENT_DEMO_USER;
  });
}

function mountClearableFields(root = document) {
  root.querySelectorAll('input[type="search"], [data-clearable-input]').forEach((input) => {
    if (input.closest(".clearable-field")) return;
    const wrapper = document.createElement("span");
    wrapper.className = "clearable-field";
    input.parentNode.insertBefore(wrapper, input);
    wrapper.append(input);
    const clear = document.createElement("button");
    clear.className = "field-clear";
    clear.type = "button";
    clear.setAttribute("aria-label", "Borrar contenido");
    clear.title = "Borrar contenido";
    clear.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    wrapper.append(clear);

    const syncVisibility = () => {
      clear.hidden = !input.value;
    };
    input.addEventListener("input", syncVisibility);
    clear.addEventListener("click", () => {
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    });
    syncVisibility();
  });
}

function normalizeSharedControls(root = document) {
  root.querySelectorAll(".filter-actions [id^='clear'], .filter-actions [id^='reset']").forEach((button) => {
    button.classList.add("filter-reset");
    button.setAttribute("aria-label", "Restablecer filtros");
    button.title = "Restablecer filtros";
    button.innerHTML = '<i class="fa-solid fa-xmark icon" aria-hidden="true"></i>';
  });

  root.querySelectorAll("#newUserBtn, #newSourceBtn, #newSampleBtn, #newAssignmentBtn, #newConfigBtn, #newRoleBtn").forEach((button) => {
    const icon = button.querySelector("i")?.outerHTML || "";
    button.innerHTML = `${icon}Nuevo`;
  });
  root.querySelectorAll("#syncBtn").forEach((button) => {
    if (button.dataset.syncRunning === "true") return;
    const icon = button.querySelector("i")?.outerHTML || "";
    button.innerHTML = `${icon}Sincronizar`;
  });

  const identityForm = root.querySelector("#identityForm");
  const identityClear = identityForm?.querySelector("#clearBtn");
  const documentNumber = identityForm?.querySelector("#documentNumber");
  if (identityClear && documentNumber && !identityClear.closest(".clearable-field")) {
    const wrapper = document.createElement("span");
    wrapper.className = "clearable-field";
    documentNumber.parentNode.insertBefore(wrapper, documentNumber);
    wrapper.append(documentNumber, identityClear);
    identityClear.className = "field-clear";
    identityClear.removeAttribute("id");
    identityClear.setAttribute("aria-label", "Borrar contenido");
    identityClear.title = "Borrar contenido";
    identityClear.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    const syncVisibility = () => { identityClear.hidden = !documentNumber.value; };
    documentNumber.addEventListener("input", syncVisibility);
    syncVisibility();
  }

  root.querySelectorAll(".form-actions > #clearBtn").forEach((button) => {
    button.classList.add("form-reset");
    button.setAttribute("aria-label", "Restablecer formulario");
    button.title = "Restablecer formulario";
    button.innerHTML = '<i class="fa-solid fa-xmark icon" aria-hidden="true"></i>';
  });
}

function mountDemoIndexLink() {
  applyCurrentDemoUser();
  mountClearableFields();
  normalizeSharedControls();
  if (document.querySelector(".demo-index-link")) return;
  const link = document.createElement("a");
  link.className = "demo-index-link";
  link.href = "../index.html";
  link.setAttribute("aria-label", "Volver al índice");
  link.innerHTML = '<i class="fa-solid fa-list" aria-hidden="true"></i><span>Volver al índice</span>';
  document.body.append(link);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountDemoIndexLink, { once: true });
} else {
  mountDemoIndexLink();
}


/* source: ref-017-welcome/js/data.js */
const welcomeProfiles = {
  passport: {
    name: "Ana Paredes",
    role: "Supervisor de Seguimiento",
    authType: "Passport",
    site: "Unidad de Seguimiento y Evaluación",
    institution: "Ministerio de Educación",
    process: "",
    quickAccess: [
      { name: "Cambiar contraseña", icon: "fa-key" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 12, pending: 4, sent: 8, contact: { name: "Equipo de Seguimiento", email: "seguimiento@ejemplo.gob.pe" } }],
    notifications: [
      { title: "Instrumentos pendientes", text: "Tienes 4 instrumentos pendientes de atención.", icon: "fa-clipboard-list" },
      { title: "Nuevo reporte disponible", text: "El reporte de avance del periodo 2026 está disponible.", icon: "fa-file-lines" },
      { title: "Actualización de proyecto", text: "Se actualizó la información de Seguimiento 2026.", icon: "fa-circle-info" }
    ]
  },
  document: {
    name: "Ana Paredes",
    role: "Supervisor de Seguimiento",
    authType: "Documento",
    site: "Unidad de Seguimiento y Evaluación",
    institution: "Ministerio de Educación",
    process: "",
    quickAccess: [
      { name: "Cambiar contraseña", icon: "fa-key" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 12, pending: 4, sent: 8, contact: { name: "Equipo de Seguimiento", email: "seguimiento@ejemplo.gob.pe" } }],
    notifications: [
      { title: "Instrumentos pendientes", text: "Tienes 4 instrumentos pendientes de atención.", icon: "fa-clipboard-list" },
      { title: "Nuevo reporte disponible", text: "El reporte de avance del periodo 2026 está disponible.", icon: "fa-file-lines" },
      { title: "Actualización de proyecto", text: "Se actualizó la información de Seguimiento 2026.", icon: "fa-circle-info" }
    ]
  },
  autoregistro: {
    name: "Ana Paredes",
    role: "Administrador USE",
    authType: "Autoregistro",
    site: "Unidad de Seguimiento y Evaluación",
    institution: "Ministerio de Educación",
    process: "Autoregistro 2026",
    quickAccess: [
      { name: "Registrar usuario", icon: "fa-user-plus" },
      { name: "Cambiar contraseña", icon: "fa-key" },
      { name: "Crear rol", icon: "fa-user-shield" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 8, pending: 2, sent: 6, contact: { name: "Mesa de ayuda USE", email: "mesa.ayuda@ejemplo.gob.pe", phone: "(01) 615-5800" } }],
    notifications: [
      { title: "Instrumentos pendientes", text: "Tienes 2 instrumentos pendientes de atención.", icon: "fa-clipboard-list" },
      { title: "Registro habilitado", text: "Tu acceso al proceso Autoregistro 2026 está habilitado.", icon: "fa-circle-check" }
    ]
  }
};


/* source: design-system/auth-welcome.js */
function mountAuthWelcome(container, authType) {
  if (!container || typeof welcomeProfiles === "undefined") return;

  const profile = welcomeProfiles[authType] || welcomeProfiles.autoregistro;
  container.innerHTML = `
    <div class="app-shell auth-welcome-shell">
      <aside class="sidebar" aria-label="Navegación principal">
        <div class="side-brand">
          <div class="logo-symbol" aria-hidden="true">S</div>
          <div><strong>S.S.E.E.</strong><span>Seguimiento y Evaluación Estratégica</span></div>
        </div>
        <nav class="side-nav" aria-label="Menú lateral">
          <a href="#welcome" class="nav-item is-active"><i class="fa-solid fa-house me-2" aria-hidden="true"></i>Inicio</a>
        </nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <button class="icon-button top-menu" type="button" aria-label="Abrir menú"><span></span><span></span><span></span></button>
          <div class="top-divider" aria-hidden="true"></div>
          <div class="top-info">
            <div class="info-card">
              <span class="info-icon" aria-hidden="true"><i class="fa-regular fa-clock"></i></span>
              <div><strong>Último acceso</strong><span>5:00 PM - 25/12/2024</span></div>
            </div>
            <div class="info-card location-card">
              <span class="info-icon" aria-hidden="true"><i class="fa-solid fa-location-dot"></i></span>
              <div><strong>Sede</strong><span>${profile.site}</span></div>
              <i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>
            </div>
          </div>
          <div class="top-divider" aria-hidden="true"></div>
          <div class="account">
            <button class="bell notification-trigger" id="welcomeNotificationButton" type="button" aria-label="Ver notificaciones" aria-expanded="false">
              <i class="fa-regular fa-bell" aria-hidden="true"></i><span class="notification-badge" id="welcomeNotificationCount">0</span>
            </button>
            <div class="account-separator" aria-hidden="true"></div>
            <div class="account-copy"><strong>${profile.name}</strong><span>${profile.role}</span></div>
            <div class="avatar" aria-hidden="true">${profile.name.charAt(0)}</div>
            <i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>
          </div>
        </header>

        <section class="view is-active" id="welcome" aria-labelledby="welcomeTitle">
          <div class="page-head welcome-head">
            <div>
              <nav class="breadcrumb" aria-label="Ruta"><a href="../index.html">Índice de requerimientos</a> / REF-IDE-018 / Bienvenida y módulos</nav>
              <div class="title-row">
                <div class="title-icon" aria-hidden="true"><i class="fa-solid fa-house"></i></div>
                <div><h1 id="welcomeTitle" tabindex="-1">Bienvenido, ${profile.name}</h1></div>
              </div>
            </div>
          </div>

          <div class="welcome-grid">
            <section class="surface-card project-card" aria-labelledby="welcomeProjectsTitle">
              <div class="section-heading"><div><p class="eyebrow">Asignaciones vigentes</p><h2 id="welcomeProjectsTitle">Mis proyectos</h2></div><span class="count-label" id="welcomeProjectCount">0 proyectos</span></div>
              <div id="welcomeProjectList" class="project-list"></div>
            </section>
            <section class="surface-card quick-access-card" aria-labelledby="welcomeQuickAccessTitle">
              <div class="section-heading"><div><p class="eyebrow">Accesos disponibles</p><h2 id="welcomeQuickAccessTitle">Accesos rápidos</h2></div></div>
              <div id="welcomeQuickAccessList" class="quick-access-list" role="list"></div>
            </section>
          </div>
          <section class="welcome-status-strip" aria-labelledby="welcomeSummaryTitle">
            <div class="status-strip-title"><p class="eyebrow">Información del acceso</p><h2 id="welcomeSummaryTitle">Estado de acceso</h2></div>
            <div class="user-summary" id="welcomeUserSummary"></div>
            <span class="status-chip"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Acceso habilitado</span>
          </section>
        </section>

        <footer class="footer"><div class="minedu-mark"><img class="minedu-logo" src="../assets/minedu.jpg" alt="Ministerio de Educación"></div><div><p>2026. Todos los derechos reservados.</p><p>Ministerio de Educación - S.S.E.E. - Versión 0.1</p></div></footer>
      </main>
    </div>
    <aside class="notification-panel" id="welcomeNotificationPanel" aria-labelledby="welcomeNotificationTitle" hidden>
      <div class="notification-panel-head"><div><p class="eyebrow">Centro de avisos</p><h2 id="welcomeNotificationTitle">Notificaciones</h2></div><button class="panel-close" id="welcomeCloseNotifications" type="button" aria-label="Cerrar notificaciones"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></div>
      <div id="welcomeNotificationList"></div>
    </aside>`;

  const refs = {
    projectList: container.querySelector("#welcomeProjectList"),
    quickAccessList: container.querySelector("#welcomeQuickAccessList"),
    userSummary: container.querySelector("#welcomeUserSummary"),
    projectCount: container.querySelector("#welcomeProjectCount"),
    notificationButton: container.querySelector("#welcomeNotificationButton"),
    notificationCount: container.querySelector("#welcomeNotificationCount"),
    notificationPanel: container.querySelector("#welcomeNotificationPanel"),
    notificationList: container.querySelector("#welcomeNotificationList"),
    closeNotifications: container.querySelector("#welcomeCloseNotifications"),
    toast: document.getElementById("toast")
  };

  refs.projectCount.textContent = `${profile.projects.length} ${profile.projects.length === 1 ? "proyecto" : "proyectos"}`;
  const renderContact = (contact) => {
    if (!contact) return "";
    const details = typeof contact === "string"
      ? [{ icon: "fa-address-book", text: `Contacto: ${contact}` }]
      : [
          contact.name && { icon: "fa-address-book", text: `Contacto: ${contact.name}` },
          contact.email && { icon: "fa-envelope", text: contact.email },
          contact.phone && { icon: "fa-phone", text: contact.phone }
        ].filter(Boolean);
    return details.length ? `<div class="project-contact">${details.map((detail) => `<span><i class="fa-solid ${detail.icon}" aria-hidden="true"></i>${detail.text}</span>`).join("")}</div>` : "";
  };
  refs.projectList.innerHTML = profile.projects.map((project) => `<article class="project-item"><div class="project-item-head"><strong>${project.name}</strong><span class="count-label">Periodo ${project.period}</span></div><div class="project-meta"><span class="metric"><i class="fa-solid fa-layer-group" aria-hidden="true"></i>${project.assigned} asignados</span><span class="metric pending"><i class="fa-solid fa-clock" aria-hidden="true"></i>${project.pending} pendientes</span><span class="metric sent"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i>${project.sent} enviados</span></div>${renderContact(project.contact)}</article>`).join("");
  refs.quickAccessList.innerHTML = (profile.quickAccess || []).map((item) => `<div class="quick-access-item" role="listitem"><span class="quick-access-icon"><i class="fa-solid ${item.icon}" aria-hidden="true"></i></span><strong>${item.name}</strong></div>`).join("");
  refs.userSummary.innerHTML = `<div><span>Tipo de autenticación</span><strong>${profile.authType}</strong></div><div><span>Estado</span><strong>Acceso habilitado</strong></div>`;
  refs.notificationCount.textContent = profile.notifications.length;
  refs.notificationList.innerHTML = profile.notifications.map((notification) => `<article class="notification-item"><span class="notification-icon"><i class="fa-solid ${notification.icon}" aria-hidden="true"></i></span><div><strong>${notification.title}</strong><span>${notification.text}</span></div></article>`).join("");

  refs.notificationButton.addEventListener("click", () => {
    const isOpen = refs.notificationPanel.hidden;
    refs.notificationPanel.hidden = !isOpen;
    refs.notificationButton.setAttribute("aria-expanded", String(isOpen));
  });
  refs.closeNotifications.addEventListener("click", () => {
    refs.notificationPanel.hidden = true;
    refs.notificationButton.setAttribute("aria-expanded", "false");
  });
  container.hidden = false;
  container.querySelector("#welcomeTitle")?.focus({ preventScroll: true });
  window.dispatchEvent(new CustomEvent("auth:welcome-ready"));
}



/* source: auth-login/main.js */
const messages = { M11: "Completa los campos obligatorios.", M23: "El periodo de autoregistro no se encuentra habilitado.", M24: "El periodo habilitado para el autoregistro ha finalizado.", M27: "Las credenciales ingresadas no son válidas." };
const getMessage = (key) => messages[key] || key;
const getPrototypeMessage = (key) => key === "authenticationSuccess" ? "Autenticación validada correctamente." : key;
function renderToast(element, message, type = "info") { element.className = `toast toast-${type} is-visible`; element.innerHTML = `<i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-triangle-exclamation"}" aria-hidden="true"></i><span>${message}</span>`; window.clearTimeout(renderToast.timeoutId); renderToast.timeoutId = window.setTimeout(() => element.classList.remove("is-visible"), 4500); }
function recordAuthAttempt(args) { try { const key = "ssee-auth-audit"; const current = JSON.parse(sessionStorage.getItem(key) || "[]"); sessionStorage.setItem(key, JSON.stringify([{ ...args, timestamp: new Date().toISOString(), operation: "Inicio de sesión" }, ...current].slice(0, 50))); } catch { /* La demo sigue disponible si el almacenamiento está bloqueado. */ } }
function hasRequiredValues(values) { return values.every((value) => String(value ?? "").trim().length > 0); }
function validatePassportAccess({ documentNumber, password, user }) { return Boolean(user) && user.password === password && user.documentNumber === documentNumber && user.active && user.synchronized && user.projects > 0 && user.roles > 0; }
function validateDocumentAccess({ documentNumber, birthDate, issueDate, user }) { return Boolean(user) && user.number === documentNumber && user.birthDate === birthDate && user.issueDate === issueDate && user.active && user.valid && user.projects > 0 && user.roles > 0; }
function validateAutoregisterAccess({ email, password, account, periodState }) { return periodState === "open" && Boolean(account) && account.email === email && account.password === password && account.active; }

const refs = { panel: document.getElementById("authPanel"), feedback: document.getElementById("authFeedback"), success: document.getElementById("authSuccess"), successCopy: document.getElementById("authSuccessCopy"), continueButton: document.getElementById("continueBtn"), authWelcome: document.getElementById("authWelcome"), authPage: document.querySelector(".auth-page"), toast: document.getElementById("toast"), guide: document.getElementById("authGuide"), guideTitle: document.getElementById("authGuideTitle"), guideCopy: document.getElementById("authGuideCopy"), cursor: document.getElementById("authCursor") };

const modes = {
  passport: { label: "Passport", example: "Documento: 12345678 · Contraseña: ClaveSegura1", success: "Las credenciales Passport fueron validadas y tu cuenta cumple las condiciones de acceso.", fields: `<div class="field-grid"><label class="field-label" for="documentType">Tipo de documento <span>*</span><select class="form-select" id="documentType"><option>DNI</option><option>CE</option></select></label><label class="field-label" for="documentNumber">Número de documento <span>*</span><input class="form-control" id="documentNumber" autocomplete="username" placeholder="Ingresa tu número" required></label></div><label class="field-label password-field" for="password">Contraseña <span>*</span><span class="password-input"><input class="form-control" id="password" type="password" autocomplete="current-password" required><button class="password-toggle" type="button" aria-label="Mostrar contraseña"><i class="fa-regular fa-eye"></i></button></span></label><div class="auth-secondary-actions"><a class="auth-recovery-link" href="../ref-014-password-recovery/index.html?auth=passport">Recuperar contraseña</a></div>` },
  document: { label: "Documento", example: "DNI: 74125896 · Nacimiento: 15/04/1988 · Emisión: 20/06/2020", success: "Los datos del documento fueron validados y tu cuenta cumple las condiciones de acceso.", fields: `<div class="document-grid"><label class="field-label" for="documentType">Tipo de documento <span>*</span><select class="form-select" id="documentType"><option>DNI</option><option>CE</option></select></label><label class="field-label" for="documentNumber">Número de documento <span>*</span><input class="form-control" id="documentNumber" autocomplete="username" placeholder="Ingresa tu número" required></label><label class="field-label" for="birthDate">Fecha de nacimiento <span>*</span><input class="form-control" id="birthDate" type="date" required></label><label class="field-label" for="issueDate">Fecha de emisión <span>*</span><input class="form-control" id="issueDate" type="date" required></label></div>` },
  autoregistro: { label: "Autoregistro", example: "Correo: ana.paredes@ejemplo.gob.pe · Contraseña: ClaveSegura1", success: "La cuenta y el proceso asociado están habilitados para ingresar a S.S.E.E.", fields: `<label class="field-label" for="email">Correo electrónico <span>*</span><input class="form-control" id="email" type="email" autocomplete="username" placeholder="usuario@ejemplo.gob.pe" required></label><label class="field-label password-field" for="password">Contraseña <span>*</span><span class="password-input"><input class="form-control" id="password" type="password" autocomplete="current-password" required><button class="password-toggle" type="button" aria-label="Mostrar contraseña"><i class="fa-regular fa-eye"></i></button></span></label><div class="auth-secondary-actions"><a class="auth-recovery-link" href="../ref-014-password-recovery/index.html?auth=autoregistro">Recuperar contraseña</a></div>` }
};

let mode = new URLSearchParams(window.location.search).get("auth") || "passport";
if (!modes[mode]) mode = "passport";
const periodState = new URLSearchParams(window.location.search).get("period") || "open";

function showToast(message, type = "info") { renderToast(refs.toast, message, type); }
function showError(message) { refs.feedback.hidden = false; refs.feedback.textContent = message; }
function clearState() { refs.feedback.hidden = true; refs.success.hidden = true; }
function bindPasswordToggle() { refs.panel.querySelector(".password-toggle")?.addEventListener("click", (event) => { const button = event.currentTarget; const input = button.closest(".password-input").querySelector("input"); const visible = input.type === "text"; input.type = visible ? "password" : "text"; button.querySelector("i").className = `fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}`; button.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña"); }); }
function renderMode() { const config = modes[mode]; clearState(); refs.panel.innerHTML = `<form class="auth-panel-form" id="centralLoginForm" novalidate>${config.fields}<div class="form-actions"><button class="btn btn-ssee button button-primary" type="submit"><i class="fa-solid fa-right-to-bracket" aria-hidden="true"></i>Ingresar</button></div></form>`; document.querySelectorAll(".auth-tab").forEach((tab) => { const active = tab.dataset.authMode === mode; tab.classList.toggle("is-active", active); tab.setAttribute("aria-selected", active ? "true" : "false"); if (active) { const box = tab.getBoundingClientRect(); refs.cursor.style.left = `${box.left + box.width / 2 - 8}px`; refs.cursor.style.top = `${box.top + box.height / 2 - 8}px`; } }); bindPasswordToggle(); refs.guide.hidden = false; refs.cursor.classList.add("is-visible"); refs.guideTitle.textContent = `Acceso ${config.label}`; refs.guideCopy.textContent = `Completa los campos de ${config.label} y presiona Ingresar. Ejemplo válido: ${config.example}.`; refs.panel.querySelector("input, select")?.focus(); refs.panel.querySelector("form").addEventListener("submit", validateMode); }
function validateMode(event) { event.preventDefault(); clearState(); const form = event.currentTarget; const values = [...form.querySelectorAll("input, select")]; const user = mode === "autoregistro" ? form.querySelector("#email")?.value.trim() : form.querySelector("#documentNumber")?.value.trim(); if (mode === "autoregistro" && periodState !== "open") { const messageKey = periodState === "closed" ? "M23" : "M24"; recordAuthAttempt({ user: user || "No identificado", authType: "Autoregistro", result: "Fallida", reason: periodState === "closed" ? "Proceso no habilitado" : "Vigencia vencida" }); showError(getMessage(messageKey)); showToast(getMessage(messageKey), "warning"); return; } if (!hasRequiredValues(values.map((field) => field.value))) { recordAuthAttempt({ user: user || "No identificado", authType: modes[mode].label, result: "Fallida", reason: "Datos incompletos" }); showError(getMessage("M11")); showToast(getMessage("M11"), "warning"); return; } let valid = false; if (mode === "passport") valid = validatePassportAccess({ documentNumber: form.querySelector("#documentNumber").value.trim(), password: form.querySelector("#password").value, user: { documentNumber: "12345678", password: "ClaveSegura1", active: true, synchronized: true, projects: 1, roles: 1 } }); if (mode === "document") valid = validateDocumentAccess({ documentNumber: form.querySelector("#documentNumber").value.trim(), birthDate: form.querySelector("#birthDate").value, issueDate: form.querySelector("#issueDate").value, user: { number: "74125896", birthDate: "1988-04-15", issueDate: "2020-06-20", active: true, valid: true, projects: 1, roles: 1 } }); if (mode === "autoregistro") valid = validateAutoregisterAccess({ email: form.querySelector("#email").value.trim().toLowerCase(), password: form.querySelector("#password").value, account: { email: "ana.paredes@ejemplo.gob.pe", password: "ClaveSegura1", active: true }, periodState }); if (!valid) { recordAuthAttempt({ user: user || "No identificado", authType: modes[mode].label, result: "Fallida", reason: "Credenciales inválidas o acceso no autorizado" }); showError(getMessage("M27")); showToast(getMessage("M27"), "warning"); return; } recordAuthAttempt({ user, authType: modes[mode].label, result: "Exitosa" }); form.hidden = true; refs.successCopy.textContent = modes[mode].success; refs.success.hidden = false; showToast(getPrototypeMessage("authenticationSuccess"), "success"); }
document.querySelectorAll(".auth-tab").forEach((tab) => tab.addEventListener("click", () => { mode = tab.dataset.authMode; const url = new URL(window.location.href); url.searchParams.set("auth", mode); window.history.replaceState({}, "", url); renderMode(); }));
refs.continueButton.addEventListener("click", () => { refs.authPage.hidden = true; refs.authWelcome.hidden = false; mountAuthWelcome(refs.authWelcome, mode === "autoregistro" ? "autoregistro" : mode); });
renderMode();
