const guideRefs = {
  guide: document.getElementById("authGuide"),
  guideTitle: document.getElementById("authGuideTitle"),
  guideCopy: document.getElementById("authGuideCopy"),
  guideOptions: document.querySelectorAll("[data-guide-auth]"),
  cursor: document.getElementById("authCursor"),
  accountTrigger: document.getElementById("accountMenuTrigger"),
  accountInitial: document.getElementById("accountInitial"),
  accountMenu: document.getElementById("accountMenu"),
  changePassword: document.getElementById("changePasswordOption")
};

let mode = "passport";

function positionGuideCursor(target) {
  if (!target) return;
  const box = target.getBoundingClientRect();
  guideRefs.cursor.style.left = `${box.left + box.width / 2 - 8}px`;
  guideRefs.cursor.style.top = `${box.top + box.height / 2 - 8}px`;
  guideRefs.cursor.classList.remove("is-visible");
  requestAnimationFrame(() => guideRefs.cursor.classList.add("is-visible"));
}

function setGuide(title, copy, target) {
  guideRefs.guideTitle.textContent = title;
  guideRefs.guideCopy.textContent = copy;
  positionGuideCursor(target);
}

function setMode(nextMode) {
  mode = nextMode;
  guideRefs.guideOptions.forEach((option) => option.classList.toggle("is-active", option.dataset.guideAuth === mode));
  const isPassport = mode === "passport";
  const profile = welcomeProfiles[mode];
  renderProfile(refs, profile);
  renderNotifications(refs, profile.notifications);
  guideRefs.accountMenu.hidden = true;
  guideRefs.accountTrigger.setAttribute("aria-expanded", "false");
  setGuide(
    `Cambio mediante ${mode === "passport" ? "Passport" : "Autoregistro"}`,
    "El usuario ya está autenticado. Abre el menú de perfil para seleccionar Cambiar contraseña.",
    guideRefs.accountInitial
  );
}

guideRefs.guide.hidden = false;
guideRefs.guideOptions.forEach((option) => option.addEventListener("click", () => setMode(option.dataset.guideAuth)));

guideRefs.accountTrigger.addEventListener("click", () => {
  const isOpening = guideRefs.accountMenu.hidden;
  guideRefs.accountMenu.hidden = !isOpening;
  guideRefs.accountTrigger.setAttribute("aria-expanded", String(isOpening));
  if (isOpening) {
    setGuide("Cambiar contraseña", "Selecciona Cambiar contraseña en el menú de perfil para continuar.", guideRefs.changePassword);
  } else {
    setGuide(`Cambio mediante ${mode === "passport" ? "Passport" : "Autoregistro"}`, "Abre el menú de perfil para seleccionar Cambiar contraseña.", guideRefs.accountInitial);
  }
});

guideRefs.changePassword.addEventListener("click", () => {
  window.location.href = mode === "autoregistro" ? "system.html?auth=autoregistro" : "index.html?auth=passport";
});

document.addEventListener("click", (event) => {
  if (guideRefs.accountMenu.hidden || guideRefs.accountMenu.contains(event.target) || guideRefs.accountTrigger.contains(event.target)) return;
  guideRefs.accountMenu.hidden = true;
  guideRefs.accountTrigger.setAttribute("aria-expanded", "false");
});

setMode("passport");
