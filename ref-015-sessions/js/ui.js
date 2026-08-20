export function showToast(refs, message, type = "info") {
  const icon = type === "success" ? "fa-circle-check" : type === "warning" ? "fa-triangle-exclamation" : type === "error" ? "fa-circle-xmark" : "fa-circle-info";
  refs.toast.className = `toast toast-${type}`;
  refs.toast.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span>${message}</span>`;
  refs.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => refs.toast.classList.remove("is-visible"), 4500);
}

export function showAuthView(refs, user, message) {
  refs.activeView.hidden = true;
  refs.authView.hidden = false;
  refs.logoutButton.hidden = true;
  refs.authMessage.textContent = message;
  refs.authLink.href = user.authenticationUrl;
}

export function updateLastInteraction(refs, date) {
  refs.lastInteraction.textContent = date.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
}
