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
              <nav class="breadcrumb" aria-label="Ruta"><a href="../index.html">Índice de requerimientos</a> / ALI-REF-017 / Bienvenida y módulos</nav>
              <div class="title-row">
                <div class="title-icon" aria-hidden="true"><i class="fa-solid fa-house"></i></div>
                <div><h1 id="welcomeTitle" tabindex="-1">Bienvenido, ${profile.name}</h1><p id="welcomeSubtitle">Consulta los módulos y proyectos disponibles para tu acceso.</p></div>
              </div>
            </div>
          </div>

          <div class="context-strip" id="welcomeProcessContext" ${profile.process ? "" : "hidden"}>
            <span class="context-icon" aria-hidden="true"><i class="fa-solid fa-user-plus"></i></span>
            <div><strong>Proceso asociado</strong><span id="welcomeProcessText">${profile.process || ""}</span></div>
          </div>

          <div class="welcome-grid">
            <section class="surface-card modules-card" aria-labelledby="welcomeModulesTitle">
              <div class="section-heading"><div><p class="eyebrow">Acceso según rol y permisos</p><h2 id="welcomeModulesTitle">Módulos disponibles</h2></div><span class="count-label" id="welcomeModuleCount">0 módulos</span></div>
              <div class="module-grid" id="welcomeModuleGrid"></div>
            </section>
            <section class="surface-card project-card" aria-labelledby="welcomeProjectsTitle">
              <div class="section-heading"><div><p class="eyebrow">Asignaciones vigentes</p><h2 id="welcomeProjectsTitle">Mis proyectos</h2></div><span class="count-label" id="welcomeProjectCount">0 proyectos</span></div>
              <div id="welcomeProjectList" class="project-list"></div>
            </section>
          </div>

          <section class="surface-card summary-card" aria-labelledby="welcomeSummaryTitle">
            <div class="section-heading"><div><p class="eyebrow">Información del acceso</p><h2 id="welcomeSummaryTitle">Resumen de usuario</h2></div><span class="status-chip"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Acceso habilitado</span></div>
            <div class="user-summary" id="welcomeUserSummary"></div>
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
    moduleGrid: container.querySelector("#welcomeModuleGrid"),
    projectList: container.querySelector("#welcomeProjectList"),
    userSummary: container.querySelector("#welcomeUserSummary"),
    moduleCount: container.querySelector("#welcomeModuleCount"),
    projectCount: container.querySelector("#welcomeProjectCount"),
    notificationButton: container.querySelector("#welcomeNotificationButton"),
    notificationCount: container.querySelector("#welcomeNotificationCount"),
    notificationPanel: container.querySelector("#welcomeNotificationPanel"),
    notificationList: container.querySelector("#welcomeNotificationList"),
    closeNotifications: container.querySelector("#welcomeCloseNotifications"),
    toast: document.getElementById("toast")
  };

  refs.moduleCount.textContent = `${profile.modules.length} módulos`;
  refs.projectCount.textContent = `${profile.projects.length} ${profile.projects.length === 1 ? "proyecto" : "proyectos"}`;
  refs.moduleGrid.innerHTML = profile.modules.map((module) => `<a href="#" class="module-item" data-module="${module.name}"><span class="module-icon"><i class="fa-solid ${module.icon}" aria-hidden="true"></i></span><span><strong>${module.name}</strong><span>${module.description}</span></span><i class="fa-solid fa-chevron-right module-arrow" aria-hidden="true"></i></a>`).join("");
  refs.projectList.innerHTML = profile.projects.map((project) => `<article class="project-item"><div class="project-item-head"><strong>${project.name}</strong><span class="count-label">Periodo ${project.period}</span></div><div class="project-meta"><span class="metric"><i class="fa-solid fa-layer-group" aria-hidden="true"></i>${project.assigned} asignados</span><span class="metric pending"><i class="fa-solid fa-clock" aria-hidden="true"></i>${project.pending} pendientes</span><span class="metric sent"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i>${project.sent} enviados</span></div><div class="project-contact"><i class="fa-regular fa-address-book" aria-hidden="true"></i><span>Contacto: ${project.contact}</span></div></article>`).join("");
  refs.userSummary.innerHTML = `<div><span>Nombre completo</span><strong>${profile.name}</strong></div><div><span>Tipo de autenticación</span><strong>${profile.authType}</strong></div><div><span>Rol referencial</span><strong>${profile.role}</strong></div><div><span>Sede</span><strong>${profile.site}</strong></div>`;
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
  refs.moduleGrid.addEventListener("click", (event) => {
    const module = event.target.closest("[data-module]");
    if (!module) return;
    event.preventDefault();
    if (typeof renderToast === "function") renderToast(refs.toast, `Acceso a ${module.dataset.module} disponible para revisión.`, "info");
  });

  container.hidden = false;
  container.querySelector("#welcomeTitle")?.focus({ preventScroll: true });
  window.dispatchEvent(new CustomEvent("auth:welcome-ready"));
}
