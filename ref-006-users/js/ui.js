import { renderToast } from "../../design-system/interaction.js";

export const refs = {
  usersBody: document.getElementById("usersBody"),
  emptyState: document.getElementById("emptyState"),
  pageSummary: document.getElementById("pageSummary"),
  userCount: document.getElementById("userCount"),
  listView: document.getElementById("listView"),
  detailView: document.getElementById("detailView"),
  detailCard: document.getElementById("detailCard"),
  toast: document.getElementById("toast"),
  rolesModal: document.getElementById("rolesModal"),
  rolesModalTitle: document.getElementById("rolesModalTitle"),
  rolesModalContext: document.getElementById("rolesModalContext"),
  rolePicker: document.getElementById("rolePicker"),
  sitePicker: document.getElementById("sitePicker"),
  projectPicker: document.getElementById("projectPicker"),
  validitySelect: document.getElementById("validitySelect"),
  validityField: document.getElementById("validityField"),
  accessEditNote: document.getElementById("accessEditNote"),
  roleModalFeedback: document.getElementById("roleModalFeedback"),
  reniecModal: document.getElementById("reniecModal"),
  reniecModalContext: document.getElementById("reniecModalContext"),
  reniecDocument: document.getElementById("reniecDocument"),
  reniecResult: document.getElementById("reniecResult"),
  reniecName: document.getElementById("reniecName"),
  reniecBirth: document.getElementById("reniecBirth"),
  consultReniecBtn: document.getElementById("consultReniecBtn"),
  saveReniecBtn: document.getElementById("saveReniecBtn"),
  confirmRolesModal: document.getElementById("confirmRolesModal"),
  confirmRolesMessage: document.getElementById("confirmRolesMessage"),
  editUserStatusControl: document.getElementById("editUserStatusControl"),
  editUserStatusToggle: document.getElementById("editUserStatusToggle"),
};
export function showToast(message, type = "info") {
  renderToast(refs.toast, message, type);
}
export function showList() {
  refs.listView.classList.add("is-active");
  refs.detailView.classList.remove("is-active");
}
export function showDetail(user) {
  const roleTags = user.roles.length
    ? user.roles.map((role) => `<span class="tag">${role}</span>`).join("")
    : '<span class="muted">Pendiente de asignación</span>';
  const projectTags = user.projects?.length
    ? user.projects.map((project) => `<span class="tag">${project}</span>`).join("")
    : '<span class="muted">Pendiente de asignación</span>';
  refs.listView.classList.remove("is-active");
  refs.detailView.classList.add("is-active");
  refs.detailCard.innerHTML = `
    <div class="detail-grid">
      <div class="detail-field"><span>Usuario</span><strong>${user.username}</strong></div>
      <div class="detail-field"><span>Tipo de autenticación</span><strong>${user.auth}</strong></div>
      <div class="detail-field"><span>Sede</span><strong>${user.site || "-"}</strong></div>
      <div class="detail-field"><span>Nombres y apellidos</span><strong>${user.name}</strong></div>
      <div class="detail-field"><span>Documento</span><strong>${user.documentNumber || "-"}</strong></div>
      <div class="detail-field"><span>Fecha de nacimiento</span><strong>${user.birthDate || "-"}</strong></div>
      <div class="detail-field"><span>Correo</span><strong>${user.email}</strong></div>
      <div class="detail-field"><span>Estado</span><strong>${user.status}</strong></div>
      <div class="detail-field"><span>Último acceso</span><strong>${user.lastAccess}</strong></div>
      <div class="detail-field"><span>Fecha de creación</span><strong>${user.created}</strong></div>
      <div class="detail-field"><span>Vigencia</span><strong>${user.expires}</strong></div>
    </div>
    <div class="detail-section"><h2>Roles asignados</h2><div class="user-role-tags">${roleTags}</div></div>
    <div class="detail-section"><h2>Proyectos asignados</h2><div class="user-role-tags">${projectTags}</div></div>
    ${user.auth === "Documento" ? '<div class="detail-actions"><button class="btn btn-outline-ssee button button-secondary" type="button" data-detail-action="reniec"><i class="fa-solid fa-id-card" aria-hidden="true"></i>Actualizar datos RENIEC</button></div>' : ""}
  `;
}
