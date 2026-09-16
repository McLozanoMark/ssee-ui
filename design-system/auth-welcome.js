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

