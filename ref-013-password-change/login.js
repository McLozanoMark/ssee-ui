const refs = {
  panel: document.getElementById("authPanel"),
  feedback: document.getElementById("authFeedback"),
  success: document.getElementById("authSuccess"),
  successCopy: document.getElementById("authSuccessCopy"),
  continueButton: document.getElementById("continueBtn"),
  authWelcome: document.getElementById("authWelcome"),
  authPage: document.querySelector(".auth-page"),
  toast: document.getElementById("toast"),
  guide: document.getElementById("authGuide"),
  guideTitle: document.getElementById("authGuideTitle"),
  guideCopy: document.getElementById("authGuideCopy"),
  guideOptions: document.querySelectorAll("[data-guide-auth]"),
  cursor: document.getElementById("authCursor")
};

const messages = {
  M11: "Completa los campos obligatorios.",
  M27: "Las credenciales ingresadas no son válidas."
};

const modes = {
  passport: {
    label: "Passport",
    example: "Documento: 12345678 · Contraseña: ClaveSegura1",
    success: "Las credenciales Passport fueron validadas y tu cuenta cumple las condiciones de acceso.",
    fields: `<div class="field-grid"><label class="field-label" for="documentType">Tipo de documento <span>*</span><select class="form-select" id="documentType"><option>DNI</option><option>CE</option></select></label><label class="field-label" for="documentNumber">Número de documento <span>*</span><input class="form-control" id="documentNumber" autocomplete="username" placeholder="Ingresa tu número" required></label></div><label class="field-label password-field" for="password">Contraseña <span>*</span><span class="password-input"><input class="form-control" id="password" type="password" autocomplete="current-password" required><button class="password-toggle" type="button" aria-label="Mostrar contraseña"><i class="fa-regular fa-eye"></i></button></span></label><div class="auth-secondary-actions"><a class="auth-recovery-link" href="../ref-014-password-recovery/index.html?auth=passport">Recuperar contraseña</a></div>`
  },
  document: {
    label: "Documento",
    example: "DNI: 74125896 · Nacimiento: 15/04/1988 · Emisión: 20/06/2020",
    success: "Los datos del documento fueron validados y tu cuenta cumple las condiciones de acceso.",
    fields: `<div class="document-grid"><label class="field-label" for="documentType">Tipo de documento <span>*</span><select class="form-select" id="documentType"><option>DNI</option><option>CE</option></select></label><label class="field-label" for="documentNumber">Número de documento <span>*</span><input class="form-control" id="documentNumber" autocomplete="username" placeholder="Ingresa tu número" required></label><label class="field-label" for="birthDate">Fecha de nacimiento <span>*</span><input class="form-control" id="birthDate" type="date" required></label><label class="field-label" for="issueDate">Fecha de emisión <span>*</span><input class="form-control" id="issueDate" type="date" required></label></div>`
  },
  autoregistro: {
    label: "Autoregistro",
    example: "Correo: ana.paredes@ejemplo.gob.pe · Contraseña: ClaveSegura1",
    success: "La cuenta y el proceso asociado están habilitados para ingresar a S.S.E.E.",
    fields: `<label class="field-label" for="email">Correo electrónico <span>*</span><input class="form-control" id="email" type="email" autocomplete="username" placeholder="usuario@ejemplo.gob.pe" required></label><label class="field-label password-field" for="password">Contraseña <span>*</span><span class="password-input"><input class="form-control" id="password" type="password" autocomplete="current-password" required><button class="password-toggle" type="button" aria-label="Mostrar contraseña"><i class="fa-regular fa-eye"></i></button></span></label><div class="auth-secondary-actions"><a class="auth-recovery-link" href="../ref-014-password-recovery/index.html?auth=autoregistro">Recuperar contraseña</a></div>`
  }
};

let mode = new URLSearchParams(window.location.search).get("auth") || "passport";
if (!modes[mode] || mode === "document") mode = "passport";

function showToast(message, type = "info") {
  refs.toast.className = `toast toast-${type} is-visible`;
  refs.toast.innerHTML = `<i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-triangle-exclamation"}" aria-hidden="true"></i><span>${message}</span>`;
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => refs.toast.classList.remove("is-visible"), 4500);
}

function positionCursor(target) {
  const box = target.getBoundingClientRect();
  refs.cursor.style.left = `${box.left + box.width / 2 - 8}px`;
  refs.cursor.style.top = `${box.top + box.height / 2 - 8}px`;
  refs.cursor.classList.add("is-visible");
}

function bindPasswordToggle() {
  refs.panel.querySelectorAll(".password-toggle").forEach((button) => button.addEventListener("click", () => {
    const input = button.closest(".password-input").querySelector("input");
    const visible = input.type === "text";
    input.type = visible ? "password" : "text";
    button.querySelector("i").className = `fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}`;
    button.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña");
  }));
}

function renderMode() {
  const config = modes[mode];
  refs.feedback.hidden = true;
  refs.success.hidden = true;
  refs.panel.innerHTML = `<form class="auth-panel-form" id="centralLoginForm" novalidate>${config.fields}<div class="form-actions"><button class="btn btn-ssee button button-primary" type="submit"><i class="fa-solid fa-right-to-bracket" aria-hidden="true"></i>Ingresar</button></div></form>`;

  document.querySelectorAll(".auth-tab").forEach((tab) => {
    const active = tab.dataset.authMode === mode;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    if (active) positionCursor(tab);
  });

  refs.guide.hidden = false;
  refs.guideTitle.textContent = "Cambio de contraseña";
  refs.guideCopy.textContent = "Selecciona si deseas observar el cambio mediante Passport o Autoregistro. El cursor te indicará el siguiente paso.";
  refs.guideOptions.forEach((option) => option.classList.toggle("is-active", option.dataset.guideAuth === mode));
  bindPasswordToggle();
  refs.panel.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    refs.feedback.hidden = false;
    refs.feedback.textContent = "Usa Recuperar contraseña para probar este requerimiento.";
    showToast(messages.M27, "warning");
  });
}

document.querySelectorAll(".auth-tab").forEach((tab) => {
  if (tab.dataset.authMode === "document") {
    tab.addEventListener("click", (event) => event.preventDefault());
    return;
  }
  tab.addEventListener("click", () => {
    mode = tab.dataset.authMode;
    history.replaceState({}, "", `login.html?auth=${mode}`);
    renderMode();
  });
});

refs.guideOptions.forEach((option) => option.addEventListener("click", () => {
  const selectedMode = option.dataset.guideAuth;
  mode = selectedMode;
  history.replaceState({}, "", `login.html?auth=${mode}`);
  renderMode();
  const target = document.querySelector(`.auth-tab[data-auth-mode="${mode}"]`);
  if (target) positionCursor(target);
}));

renderMode();
