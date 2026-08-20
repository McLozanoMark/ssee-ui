export function showToast(refs, message, type = "info") {
  const icon = type === "success" ? "fa-circle-check" : type === "warning" ? "fa-triangle-exclamation" : type === "error" ? "fa-circle-xmark" : "fa-circle-info";
  refs.toast.className = `toast toast-${type}`;
  refs.toast.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span>${message}</span>`;
  refs.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => refs.toast.classList.remove("is-visible"), 4500);
}

export function showAuthView(refs, user, expired) {
  refs.activeView.hidden = true;
  refs.authView.hidden = false;
  refs.authTitle.textContent = expired ? "Sesión expirada" : "Sesión cerrada";
  refs.authMessage.textContent = expired ? "Tu sesión ha expirado. Inicia sesión nuevamente para continuar." : "La sesión se cerró correctamente. Inicia sesión nuevamente para continuar.";
  refs.authLink.href = user.authenticationUrl;
}
