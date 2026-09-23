import { renderToast } from "../../design-system/interaction.js";

export function showToast(refs, message, type = "info") {
  renderToast(refs.toast, message, type);
}

function renderProjectContact(contact) {
  if (!contact) return "";
  const details = typeof contact === "string"
    ? [{ icon: "fa-address-book", text: `Contacto: ${contact}` }]
    : [
        contact.name && { icon: "fa-address-book", text: `Contacto: ${contact.name}` },
        contact.email && { icon: "fa-envelope", text: contact.email },
        contact.phone && { icon: "fa-phone", text: contact.phone }
      ].filter(Boolean);
  if (!details.length) return "";
  return `<div class="project-contact">${details.map((detail) => `<span><i class="fa-solid ${detail.icon}" aria-hidden="true"></i>${detail.text}</span>`).join("")}</div>`;
}

function renderQuickAccess(items = []) {
  return items.map((item) => `<div class="quick-access-item" role="listitem"><span class="quick-access-icon"><i class="fa-solid ${item.icon}" aria-hidden="true"></i></span><strong>${item.name}</strong></div>`).join("");
}

export function renderProfile(refs, profile) {
  refs.accountName.textContent = profile.name;
  refs.accountRole.textContent = profile.role;
  refs.accountInitial.textContent = profile.name.charAt(0);
  refs.welcomeTitle.textContent = `Bienvenido, ${profile.name}`;
  refs.projectCount.textContent = `${profile.projects.length} ${profile.projects.length === 1 ? "proyecto" : "proyectos"}`;
  refs.projectList.innerHTML = profile.projects.map((project) => `<article class="project-item"><div class="project-item-head"><strong>${project.name}</strong><span class="count-label">Periodo ${project.period}</span></div><div class="project-meta"><span class="metric"><i class="fa-solid fa-layer-group" aria-hidden="true"></i>${project.assigned} asignados</span><span class="metric pending"><i class="fa-solid fa-clock" aria-hidden="true"></i>${project.pending} pendientes</span><span class="metric sent"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i>${project.sent} enviados</span></div>${renderProjectContact(project.contact)}</article>`).join("");
  refs.quickAccessList.innerHTML = renderQuickAccess(profile.quickAccess);
  refs.userSummary.innerHTML = `<div><span>Tipo de autenticación</span><strong>${profile.authType}</strong></div><div><span>Estado</span><strong>Acceso habilitado</strong></div>`;
}

export function renderNotifications(refs, notifications) {
  refs.notificationCount.textContent = notifications.length;
  refs.notificationList.innerHTML = notifications.map((notification) => `<article class="notification-item"><span class="notification-icon"><i class="fa-solid ${notification.icon}" aria-hidden="true"></i></span><div><strong>${notification.title}</strong><span>${notification.text}</span></div></article>`).join("");
}

export function setNotificationPanel(refs, isOpen) {
  refs.notificationPanel.hidden = !isOpen;
  refs.notificationButton.setAttribute("aria-expanded", String(isOpen));
}
