export function showToast(refs, message, type = "info") {
  const icon = type === "success" ? "fa-circle-check" : type === "warning" ? "fa-triangle-exclamation" : "fa-circle-info";
  refs.toast.className = `toast toast-${type}`;
  refs.toast.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span>${message}</span>`;
  refs.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => refs.toast.classList.remove("is-visible"), 4_500);
}

export function renderProfile(refs, profile) {
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

export function renderNotifications(refs, notifications) {
  refs.notificationCount.textContent = notifications.length;
  refs.notificationList.innerHTML = notifications.map((notification) => `<article class="notification-item"><span class="notification-icon"><i class="fa-solid ${notification.icon}" aria-hidden="true"></i></span><div><strong>${notification.title}</strong><span>${notification.text}</span></div></article>`).join("");
}

export function setNotificationPanel(refs, isOpen) {
  refs.notificationPanel.hidden = !isOpen;
  refs.notificationButton.setAttribute("aria-expanded", String(isOpen));
}
