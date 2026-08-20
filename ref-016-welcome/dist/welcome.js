
/* source: ref-016-welcome/js/data.js */
const welcomeProfiles = {
  passport: {
    name: "Luis Ramos",
    role: "Supervisor de Seguimiento",
    authType: "Passport",
    site: "Unidad de Seguimiento y Evaluación",
    institution: "Ministerio de Educación",
    process: "",
    modules: [
      { name: "Seguimiento", description: "Consulta y supervisa avances.", icon: "fa-chart-line" },
      { name: "Evaluación", description: "Revisa resultados e indicadores.", icon: "fa-clipboard-check" },
      { name: "Instrumentos", description: "Atiende instrumentos asignados.", icon: "fa-file-lines" },
      { name: "Reportes", description: "Consulta reportes disponibles.", icon: "fa-chart-column" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 12, pending: 4, sent: 8, contact: "Equipo de Seguimiento" }],
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
    modules: [
      { name: "Seguimiento", description: "Consulta el avance de tu proceso.", icon: "fa-chart-line" },
      { name: "Instrumentos", description: "Revisa los instrumentos asignados.", icon: "fa-file-lines" },
      { name: "Reportes", description: "Consulta reportes disponibles.", icon: "fa-chart-column" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 8, pending: 2, sent: 6, contact: "Mesa de ayuda USE" }],
    notifications: [
      { title: "Instrumentos pendientes", text: "Tienes 2 instrumentos pendientes de atención.", icon: "fa-clipboard-list" },
      { title: "Registro habilitado", text: "Tu acceso al proceso Autoregistro 2026 está habilitado.", icon: "fa-circle-check" }
    ]
  }
};


/* source: ref-016-welcome/js/state.js */
function getWelcomeState(params, profiles) {
  const requested = params.get("auth") === "passport" ? "passport" : "autoregistro";
  return { profileKey: requested, profile: profiles[requested], notificationsOpen: false };
}


/* source: ref-016-welcome/js/ui.js */
function showToast(refs, message, type = "info") {
  const icon = type === "success" ? "fa-circle-check" : type === "warning" ? "fa-triangle-exclamation" : "fa-circle-info";
  refs.toast.className = `toast toast-${type}`;
  refs.toast.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span>${message}</span>`;
  refs.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => refs.toast.classList.remove("is-visible"), 4_500);
}

function renderProfile(refs, profile) {
  refs.accountName.textContent = profile.name;
  refs.accountRole.textContent = profile.role;
  refs.accountInitial.textContent = profile.name.charAt(0);
  refs.welcomeTitle.textContent = `Bienvenido, ${profile.name}`;
  refs.welcomeSubtitle.textContent = profile.authType === "Autoregistro" ? "Consulta las opciones disponibles para tu proceso de registro." : "Consulta los módulos y proyectos disponibles para tu acceso.";
  refs.processContext.hidden = !profile.process;
  refs.processText.textContent = profile.process;
  refs.moduleCount.textContent = `${profile.modules.length} módulos`;
  refs.projectCount.textContent = `${profile.projects.length} ${profile.projects.length === 1 ? "proyecto" : "proyectos"}`;
  refs.moduleGrid.innerHTML = profile.modules.map((module) => `<a href="#" class="module-item" data-module="${module.name}"><span class="module-icon"><i class="fa-solid ${module.icon}" aria-hidden="true"></i></span><span><strong>${module.name}</strong><span>${module.description}</span></span><i class="fa-solid fa-chevron-right module-arrow" aria-hidden="true"></i></a>`).join("");
  refs.projectList.innerHTML = profile.projects.map((project) => `<article class="project-item"><div class="project-item-head"><strong>${project.name}</strong><span class="count-label">Periodo ${project.period}</span></div><div class="project-meta"><span class="metric"><i class="fa-solid fa-layer-group" aria-hidden="true"></i>${project.assigned} asignados</span><span class="metric pending"><i class="fa-solid fa-clock" aria-hidden="true"></i>${project.pending} pendientes</span><span class="metric sent"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i>${project.sent} enviados</span></div><div class="project-contact"><i class="fa-regular fa-address-book" aria-hidden="true"></i><span>Contacto: ${project.contact}</span></div></article>`).join("");
  refs.userSummary.innerHTML = `<div><span>Nombre completo</span><strong>${profile.name}</strong></div><div><span>Tipo de autenticación</span><strong>${profile.authType}</strong></div><div><span>Rol referencial</span><strong>${profile.role}</strong></div><div><span>Sede</span><strong>${profile.site}</strong></div>`;
}

function renderNotifications(refs, notifications) {
  refs.notificationCount.textContent = notifications.length;
  refs.notificationList.innerHTML = notifications.map((notification) => `<article class="notification-item"><span class="notification-icon"><i class="fa-solid ${notification.icon}" aria-hidden="true"></i></span><div><strong>${notification.title}</strong><span>${notification.text}</span></div></article>`).join("");
}

function setNotificationPanel(refs, isOpen) {
  refs.notificationPanel.hidden = !isOpen;
  refs.notificationButton.setAttribute("aria-expanded", String(isOpen));
}


/* source: ref-016-welcome/js/main.js */




const refs = {
  accountName: document.getElementById("accountName"), accountRole: document.getElementById("accountRole"), accountInitial: document.getElementById("accountInitial"), welcomeTitle: document.getElementById("welcomeTitle"), welcomeSubtitle: document.getElementById("welcomeSubtitle"), processContext: document.getElementById("processContext"), processText: document.getElementById("processText"), moduleCount: document.getElementById("moduleCount"), projectCount: document.getElementById("projectCount"), moduleGrid: document.getElementById("moduleGrid"), projectList: document.getElementById("projectList"), userSummary: document.getElementById("userSummary"), notificationButton: document.getElementById("notificationButton"), notificationCount: document.getElementById("notificationCount"), notificationPanel: document.getElementById("notificationPanel"), notificationList: document.getElementById("notificationList"), closeNotifications: document.getElementById("closeNotifications"), toast: document.getElementById("toast")
};

const state = getWelcomeState(new URLSearchParams(window.location.search), welcomeProfiles);
renderProfile(refs, state.profile);
renderNotifications(refs, state.profile.notifications);

refs.notificationButton.addEventListener("click", () => {
  state.notificationsOpen = !state.notificationsOpen;
  setNotificationPanel(refs, state.notificationsOpen);
});
refs.closeNotifications.addEventListener("click", () => {
  state.notificationsOpen = false;
  setNotificationPanel(refs, false);
});
document.addEventListener("click", (event) => {
  if (state.notificationsOpen && !refs.notificationPanel.contains(event.target) && !refs.notificationButton.contains(event.target)) {
    state.notificationsOpen = false;
    setNotificationPanel(refs, false);
  }
});
refs.moduleGrid.addEventListener("click", (event) => {
  const module = event.target.closest("[data-module]");
  if (!module) return;
  event.preventDefault();
  showToast(refs, `Acceso a ${module.dataset.module} disponible para revisión.`, "info");
});
