/* source: design-system/demo-navigation.js */
const CURRENT_DEMO_USER = "Ana Paredes";

function applyCurrentDemoUser() {
  document.querySelectorAll(".account-copy strong, #accountName").forEach((node) => {
    node.textContent = CURRENT_DEMO_USER;
  });
}

function mountClearableFields(root = document) {
  root.querySelectorAll('input[type="search"], [data-clearable-input]').forEach((input) => {
    if (input.closest(".clearable-field")) return;
    const wrapper = document.createElement("span");
    wrapper.className = "clearable-field";
    input.parentNode.insertBefore(wrapper, input);
    wrapper.append(input);
    const clear = document.createElement("button");
    clear.className = "field-clear";
    clear.type = "button";
    clear.setAttribute("aria-label", "Borrar contenido");
    clear.title = "Borrar contenido";
    clear.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    wrapper.append(clear);

    const syncVisibility = () => {
      clear.hidden = !input.value;
    };
    input.addEventListener("input", syncVisibility);
    clear.addEventListener("click", () => {
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    });
    syncVisibility();
  });
}

function normalizeSharedControls(root = document) {
  root.querySelectorAll(".filter-actions [id^='clear'], .filter-actions [id^='reset']").forEach((button) => {
    button.classList.add("filter-reset");
    button.setAttribute("aria-label", "Restablecer filtros");
    button.title = "Restablecer filtros";
    button.innerHTML = '<i class="fa-solid fa-xmark icon" aria-hidden="true"></i>';
  });

  root.querySelectorAll("#newUserBtn, #newSourceBtn, #newSampleBtn, #newAssignmentBtn, #newConfigBtn, #newRoleBtn").forEach((button) => {
    const icon = button.querySelector("i")?.outerHTML || "";
    button.innerHTML = `${icon}Nuevo`;
  });
  root.querySelectorAll("#syncBtn").forEach((button) => {
    if (button.dataset.syncRunning === "true") return;
    const icon = button.querySelector("i")?.outerHTML || "";
    button.innerHTML = `${icon}Sincronizar Passport`;
  });

  const identityForm = root.querySelector("#identityForm");
  const identityClear = identityForm?.querySelector("#clearBtn");
  const documentNumber = identityForm?.querySelector("#documentNumber");
  if (identityClear && documentNumber && !identityClear.closest(".clearable-field")) {
    const wrapper = document.createElement("span");
    wrapper.className = "clearable-field";
    documentNumber.parentNode.insertBefore(wrapper, documentNumber);
    wrapper.append(documentNumber, identityClear);
    identityClear.className = "field-clear";
    identityClear.removeAttribute("id");
    identityClear.setAttribute("aria-label", "Borrar contenido");
    identityClear.title = "Borrar contenido";
    identityClear.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    const syncVisibility = () => { identityClear.hidden = !documentNumber.value; };
    documentNumber.addEventListener("input", syncVisibility);
    syncVisibility();
  }

  root.querySelectorAll(".form-actions > #clearBtn").forEach((button) => {
    button.classList.add("form-reset");
    button.setAttribute("aria-label", "Restablecer formulario");
    button.title = "Restablecer formulario";
    button.innerHTML = '<i class="fa-solid fa-xmark icon" aria-hidden="true"></i>';
  });
}

function mountDemoIndexLink() {
  applyCurrentDemoUser();
  mountClearableFields();
  normalizeSharedControls();
  if (document.querySelector(".demo-index-link")) return;
  const link = document.createElement("a");
  link.className = "demo-index-link";
  link.href = "../index.html";
  link.setAttribute("aria-label", "Volver al índice");
  link.innerHTML = '<i class="fa-solid fa-list" aria-hidden="true"></i><span>Volver al índice</span>';
  document.body.append(link);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountDemoIndexLink, { once: true });
} else {
  mountDemoIndexLink();
}


/* source: design-system/auth-welcome.js */
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



/* source: design-system/auth-welcome-flow.js */
function bindAuthWelcomeFlow({ continueButton, authPage, authWelcome, authType }) {
  if (!continueButton || !authPage || !authWelcome) return;
  continueButton.addEventListener("click", () => {
    authPage.hidden = true;
    mountAuthWelcome(authWelcome, authType);
  });
}


/* source: design-system/auth-guide.js */
(function () {
  const guide = document.getElementById("authGuide");
  const cursor = document.getElementById("authCursor");
  const root = document.querySelector("[data-auth-guide]");
  if (!guide || !cursor || !root) return;

  const title = document.getElementById("authGuideTitle");
  const copy = document.getElementById("authGuideCopy");
  const kind = root.dataset.authGuide;
  const authParam = new URLSearchParams(window.location.search).get("auth");
  const authType = authParam === "passport" ? "Passport" : authParam === "document" ? "Documento" : "Autoregistro";

  const loginSteps = {
    passport: [
      ["#documentNumber", "Ingresa el documento", "Escribe el número de documento del usuario registrado en Passport.", "input"],
      ["#password", "Ingresa la contraseña", "Escribe la contraseña asociada al usuario.", "input"],
      ["#loginForm button[type=submit]", "Envía los datos", "Presiona Ingresar para ejecutar la validación del acceso.", "submit"]
    ],
    document: [
      ["#documentNumber", "Ingresa el documento", "Escribe el número de documento para iniciar la validación.", "input"],
      ["#birthDate", "Ingresa la fecha", "Completa la fecha de nacimiento del documento.", "input"],
      ["#issueDate", "Ingresa la fecha", "Completa la fecha de emisión del documento.", "input"],
      ["#loginForm button[type=submit]", "Envía los datos", "Presiona Ingresar para ejecutar la validación del acceso.", "submit"]
    ],
    autoregister: [
      ["#email", "Ingresa el correo", "Escribe el correo de la cuenta creada mediante Autoregistro.", "input"],
      ["#password", "Ingresa la contraseña", "Escribe la contraseña de la cuenta.", "input"],
      ["#loginForm button[type=submit]", "Envía los datos", "Presiona Ingresar para validar el acceso.", "submit"]
    ]
  };

  function getSteps() {
    if (kind === "password") {
      return authType === "Passport"
        ? [["#passportRecoveryForm select", "Selecciona el documento", "Elige el tipo de documento en el formulario oficial simulado de Passport.", "click"], ["#passportRecoveryDocumentNumber", "Ingresa el documento", "Escribe el número de documento válido para solicitar la recuperación.", "input"], ["#passportRecoveryCaptcha", "Ingresa el captcha", "Escribe el código que aparece en la imagen de seguridad.", "input"], ["#passportRecoveryForm button[type=submit]", "Envía la solicitud", "Presiona Enviar correo para finalizar el flujo de recuperación en Passport.", "submit"]]
        : authType === "Documento"
          ? [["#documentPanel", "Revisa el acceso", "Este tipo de acceso no administra una contraseña local.", "click"]]
        : [
          ["#currentPassword", "Ingresa la contraseña", "Escribe la contraseña actual de la cuenta.", "input"],
          ["#newPassword", "Ingresa la contraseña", "Escribe la nueva contraseña.", "input"],
          ["#confirmPassword", "Confirma la contraseña", "Repite la nueva contraseña.", "input"],
          ["#passwordForm button[type=submit]", "Guarda el cambio", "Presiona Cambiar contraseña para completar el flujo.", "submit"]
        ];
    }
    if (kind === "recovery") {
      const token = new URLSearchParams(window.location.search).get("token");
      if (authType === "Autoregistro" && ["valid", "error"].includes(token)) {
        return [
          ["#newPassword", "Ingresa la contraseña", "Escribe la nueva contraseña para el enlace recibido.", "input"],
          ["#confirmPassword", "Confirma la contraseña", "Repite la nueva contraseña.", "input"],
          ["#resetForm button[type=submit]", "Restablece la contraseña", "Presiona Restablecer contraseña para finalizar.", "submit"]
        ];
      }
      return authType === "Passport"
        ? [["#passportRecoveryForm select", "Selecciona el documento", "Elige el tipo de documento en el formulario oficial simulado de Passport.", "click"], ["#passportRecoveryDocumentNumber", "Ingresa el documento", "Escribe el número de documento válido para solicitar la recuperación.", "input"], ["#passportRecoveryCaptcha", "Ingresa el captcha", "Escribe el código que aparece en la imagen de seguridad.", "input"], ["#passportRecoveryForm button[type=submit]", "Envía la solicitud", "Presiona Enviar correo para finalizar el flujo de recuperación en Passport.", "submit"]]
        : authType === "Documento"
          ? [["#documentPanel", "Revisa el acceso", "Este tipo de acceso no requiere recuperación de contraseña local.", "click"]]
        : [
          ["#email", "Ingresa el correo", "Escribe el correo registrado para solicitar el enlace.", "input"],
          ["#requestForm button[type=submit]", "Solicita el enlace", "Presiona Solicitar enlace para continuar.", "request"],
          ["#sentBackToLogin", "Regresa al login", "El enlace llegará al correo registrado. Presiona Ir al login para cerrar este flujo de demostración.", "click"],
          ["#newPassword", "Ingresa la contraseña", "Escribe la nueva contraseña.", "input"],
          ["#confirmPassword", "Confirma la contraseña", "Repite la nueva contraseña.", "input"],
          ["#resetForm button[type=submit]", "Restablece la contraseña", "Presiona Restablecer contraseña para finalizar.", "submit"]
        ];
    }
    if (kind === "logout") {
      return [
        ["#accountMenuTrigger", "Abre tu cuenta", "Selecciona tu nombre para ver las opciones de sesión.", "click"],
        ["#logoutOption", "Cierra sesión", "Selecciona esta opción para finalizar la sesión actual.", "click"]
      ];
    }
    if (kind === "validation") return loginSteps.passport.map((step) => [step[0], step[1], "Este paso evidencia la validación general de autenticación.", step[3]]);
    if (kind === "audit") return loginSteps.passport.map((step) => [step[0], step[1], "Este paso genera la trazabilidad del intento de autenticación.", step[3]]);
    return loginSteps[kind] || [];
  }

  const steps = getSteps();
  const successfulContinuation = {
    passport: ["#continueBtn", "Continúa a la bienvenida", "La autenticación se completa en Passport. La demo representa el retorno autorizado a S.S.E.E.; presiona Continuar para ver la bienvenida.", "continue"],
    document: ["#continueBtn", "Continúa a la bienvenida", "El documento y las condiciones de acceso fueron validados correctamente. Presiona Continuar para ver la bienvenida.", "continue"],
    autoregister: ["#continueBtn", "Continúa a la bienvenida", "La cuenta y el proceso asociado fueron validados correctamente. Presiona Continuar para ver la bienvenida.", "continue"]
  };
  let current = 0;

  function isVisible(element) {
    return element && !element.hidden && getComputedStyle(element).display !== "none";
  }

  function finish(message) {
    title.textContent = "Recorrido completo";
    copy.textContent = message;
    cursor.classList.remove("is-visible");
  }

  function showSuccessfulContinuation() {
    if (!document.getElementById("continueBtn") || !document.getElementById("authWelcome")) {
      return finish("El sistema muestra la confirmación del flujo.");
    }
    if (steps.some((step) => step[3] === "continue")) return;
    steps.push(successfulContinuation[kind] || successfulContinuation.autoregister);
    steps.push(["#welcomeTitle", "Revisa la bienvenida", "Esta es la pantalla de bienvenida del flujo. El recorrido terminó dentro de esta demo.", "welcome"]);
    current += 1;
    showStep();
  }

  function bindStep(step) {
    const element = document.querySelector(step[0]);
    if (!element) return;
    const eventName = step[3] === "input" ? "blur" : "click";
    if (step[3] === "continue") {
      window.addEventListener("auth:welcome-ready", () => nextStep(), { once: true });
      return;
    }
    element.addEventListener(eventName, () => {
      if (step[3] === "submit" || step[3] === "request") return;
      window.setTimeout(nextStep, 0);
    }, { once: true });
    if (step[3] === "submit" || step[3] === "request") {
      const form = element.form;
      form?.addEventListener("submit", () => {
        window.setTimeout(() => {
          const success = document.querySelector(".auth-success, #successView");
          const response = step[3] === "request" && isVisible(document.getElementById("sentView"))
            ? "El enlace de recuperación está disponible para continuar."
            : isVisible(success)
              ? "El sistema muestra la confirmación del flujo."
              : "El sistema muestra el resultado de la validación.";
          if (step[3] === "request" && isVisible(document.getElementById("sentView"))) nextStep();
          else if (isVisible(success)) showSuccessfulContinuation();
          else finish(response);
        }, 80);
      }, { once: true });
    }
  }

  function position(step, bind = true) {
    const element = document.querySelector(step[0]);
    if (!isVisible(element)) {
      current += 1;
      return showStep();
    }
    const box = element.getBoundingClientRect();
    cursor.style.left = `${box.left + box.width / 2 - 8}px`;
    cursor.style.top = `${box.top + box.height / 2 - 8}px`;
    title.textContent = step[1];
    copy.textContent = step[2];
    cursor.classList.remove("is-visible");
    requestAnimationFrame(() => cursor.classList.add("is-visible"));
    if (bind) bindStep(step);
  }

  function showStep() {
    if (current >= steps.length) return finish("El flujo terminó correctamente.");
    position(steps[current]);
  }

  function nextStep() {
    current += 1;
    showStep();
  }

  window.setTimeout(() => {
    guide.hidden = false;
    showStep();
  }, 0);
  window.addEventListener("resize", () => {
    if (steps[current]) position(steps[current], false);
  });
})();


/* source: design-system/messages.js */
const MESSAGE_CATALOG = Object.freeze({
  M1: { text: "¿Está seguro que desea guardar esta información?", type: "Confirmación", scope: "General" },
  M2: { text: "La información se ha guardado correctamente.", type: "Información", scope: "General" },
  M3: { text: "La información se ha actualizado correctamente.", type: "Información", scope: "General" },
  M4: { text: "¿Está seguro que desea eliminar la información seleccionada?", type: "Confirmación", scope: "General" },
  M5: { text: "¿Está seguro que desea activar el registro seleccionado?", type: "Confirmación", scope: "General" },
  M6: { text: "¿Está seguro que desea inactivar el registro seleccionado?", type: "Confirmación", scope: "General" },
  M7: { text: "El registro se ha activado correctamente.", type: "Información", scope: "General" },
  M8: { text: "El registro se ha inactivado correctamente.", type: "Información", scope: "General" },
  M9: { text: "No se encontraron registros con los criterios de búsqueda seleccionados.", type: "Información", scope: "General" },
  M10: { text: "Ya existe un registro con los datos ingresados.", type: "Alerta", scope: "General" },
  M11: { text: "Debe completar los campos obligatorios.", type: "Alerta", scope: "General" },
  M12: { text: "Verifique la información ingresada.", type: "Alerta", scope: "General" },
  M13: { text: "Ocurrió un error inesperado al procesar la solicitud. Por favor, intente nuevamente.", type: "Alerta", scope: "General" },
  M14: { text: "¿Está seguro que desea cancelar?", type: "Confirmación", scope: "General" },
  M15: { text: "No es posible inactivar un rol que posee usuarios asociados.", type: "Alerta", scope: "General" },
  M16: { text: "Debe seleccionar al menos un permiso para asignar al rol.", type: "Alerta", scope: "General" },
  M17: { text: "No es posible realizar la operación porque el rol se encuentra inactivo.", type: "Alerta", scope: "General" },
  M18: { text: "Los permisos del rol se han actualizado correctamente.", type: "Información", scope: "General" },
  M19: { text: "Ya existe un usuario registrado con el documento ingresado.", type: "Alerta", scope: "General" },
  M20: { text: "Ya existe un usuario registrado con el correo electrónico ingresado.", type: "Alerta", scope: "General" },
  M21: { text: "No fue posible completar la sincronización con Passport.", type: "Alerta", scope: "General" },
  M22: { text: "La sincronización con Passport se ha realizado correctamente.", type: "Información", scope: "General" },
  M23: { text: "El periodo de autoregistro no se encuentra habilitado.", type: "Alerta", scope: "General" },
  M24: { text: "El periodo habilitado para el autoregistro ha finalizado.", type: "Alerta", scope: "General" },
  M25: { text: "El enlace de registro ha expirado.", type: "Alerta", scope: "General" },
  M26: { text: "Se ha enviado un mensaje al correo electrónico registrado para completar el registro.", type: "Información", scope: "General" },
  M27: { text: "Las credenciales ingresadas no son válidas.", type: "Alerta", scope: "General" },
  M28: { text: "Su sesión ha expirado. Inicie sesión nuevamente.", type: "Alerta", scope: "General" },
  M29: { text: "Su sesión ha sido cerrada debido al inicio de una nueva sesión.", type: "Información", scope: "General" },
  M30: { text: "No fue posible iniciar sesión. Intente nuevamente.", type: "Alerta", scope: "General" },
  M31: { text: "La nueva contraseña no cumple con las políticas de seguridad establecidas.", type: "Alerta", scope: "General" },
  M32: { text: "La nueva contraseña y su confirmación no coinciden.", type: "Alerta", scope: "General" },
  M33: { text: "La contraseña se ha actualizado correctamente.", type: "Información", scope: "General" },
  M34: { text: "El cambio de contraseña no pudo completarse. Intente nuevamente.", type: "Alerta", scope: "General" },
  M35: { text: "Si existe una cuenta asociada al correo ingresado, recibirá un enlace para recuperar su contraseña.", type: "Información", scope: "General" },
  M36: { text: "El enlace de recuperación ha expirado. Solicite uno nuevo.", type: "Alerta", scope: "General" },
  M37: { text: "La contraseña se ha restablecido correctamente.", type: "Información", scope: "General" },
  M38: { text: "No fue posible restablecer la contraseña. Intente nuevamente.", type: "Alerta", scope: "General" },
  M39: { text: "No tiene proyectos asignados para visualizar.", type: "Información", scope: "General" },
  M40: { text: "No tiene instrumentos pendientes de atención.", type: "Información", scope: "General" },
  M41: { text: "Tiene %s instrumentos asignados.", type: "Información", scope: "General" },
  M42: { text: "Tiene %s instrumentos pendientes de atención.", type: "Información", scope: "General" },
  M43: { text: "Tiene %s instrumentos enviados.", type: "Información", scope: "General" },
  M44: { text: "Tiene %s notificaciones pendientes.", type: "Información", scope: "General" },
  M45: { text: "Complete la información requerida para registrar la fuente de datos.", type: "Información", scope: "General" },
  M46: { text: "No fue posible guardar la estructura.", type: "Información", scope: "General" },
  M47: { text: "Seleccione el campo o conjunto de campos que identificarán las unidades muestrales.", type: "Información", scope: "General" },
  M48: { text: "Debe seleccionar al menos un campo válido.", type: "Error", scope: "General" },
  M49: { text: "Se detectaron registros con observaciones; revise el detalle.", type: "Advertencia", scope: "General" },
  M50: { text: "Ingrese los datos de las unidades muestrales según la estructura configurada.", type: "Advertencia", scope: "General" },
  M51: { text: "El archivo contiene observaciones que deberán revisarse.", type: "Advertencia", scope: "General" },
  M52: { text: "El archivo fue cargado correctamente.", type: "Información", scope: "General" },
  M53: { text: "El procesamiento finalizó. Procesados: %s. Aceptados: %s. Rechazados: %s. Duplicados: %s. Con errores: %s.", type: "Información", scope: "General" },
  M54: { text: "Ya existe una fuente con el mismo nombre para el periodo e intervención seleccionados.", type: "Advertencia", scope: "General" },
  M55: { text: "La fuente ya fue utilizada y su estructura no puede modificarse/eliminarse.", type: "Advertencia", scope: "General" },
  M56: { text: "El procesamiento finalizó con observaciones; revise los registros rechazados o duplicados.", type: "Advertencia", scope: "General" },
  M57: { text: "Se detectaron unidades muestrales con observaciones.", type: "Advertencia", scope: "General" },
  M58: { text: "El archivo fue generado correctamente.", type: "Información", scope: "General" },
  M59: { text: "La sincronización finalizó correctamente.", type: "Información", scope: "General" },
  M60: { text: "No fue posible completar la sincronización.", type: "Alerta", scope: "General" },
  M61: { text: "No fue posible consultar el detalle de la fuente.", type: "Alerta", scope: "General" },
  M62: { text: "La fuente ya fue utilizada y no puede modificarse.", type: "Alerta", scope: "General" },
  M63: { text: "No fue posible generar una nueva versión.", type: "Alerta", scope: "General" },
  M64: { text: "La fuente de datos fue eliminada correctamente.", type: "Información", scope: "General" },
  M65: { text: "No hay registros disponibles. Haz clic en \"Nuevo\" para empezar.", type: "Información", scope: "General" },
  M66: { text: "Complete los datos del rol para activar esta sección.", type: "Alerta", scope: "Roles" },
  M67: { text: "Registros exportados correctamente.", type: "Información", scope: "General" },
  M70: { text: "Se han detectado cambios sin guardar. ¿Desea guardar los cambios y continuar?", type: "Confirmación", scope: "General" },
  M130: { text: "¿Está seguro que desea cerrar sesión?\nSe finalizará tu sesión actual. Tendrás que ingresar tus datos nuevamente para acceder.", type: "Confirmación", scope: "Sesiones" },
  M131: { text: "Sesión próxima a finalizar\nLa sesión se cerrará automáticamente en %s por inactividad.\n¿Deseas continuar en el sistema?", type: "Alerta", scope: "Sesiones" }
});

// Confirmed prototype copy pending official codes in the stakeholder workbook.
const PROTOTYPE_MESSAGES = Object.freeze({
  identityLookupSuccess: "La información fue consultada correctamente.",
  authenticationSuccess: "Autenticación validada correctamente.",
  syncStarted: "Sincronización iniciada.",
  filtersApplied: "Filtros aplicados.",
  filtersCleared: "Filtros limpiados.",
  sessionClosed: "La sesión se cerró correctamente.",
  sessionInactive: "La sesión ya no está activa.",
  sessionActive: "La sesión continúa activa.",
  previousSessionClosed: "La sesión anterior fue finalizada automáticamente."
});

function getMessage(code, values = []) {
  const entry = MESSAGE_CATALOG[code];
  if (!entry) return "";
  let index = 0;
  return entry.text.replace(/%s/g, () => values[index++] ?? "");
}

function getPrototypeMessage(key) {
  return PROTOTYPE_MESSAGES[key] || "";
}


/* source: design-system/interaction.js */


const standardMessages = {
  "Completa los campos obligatorios.": "M11",
  "Fuente registrada correctamente.": "M2",
  "Muestra registrada correctamente.": "M2",
  "Asignación registrada correctamente.": "M2",
  "Asignación reasignada correctamente.": "M3",
  "Fuente activada correctamente.": "M7",
  "Fuente inactivada correctamente.": "M8",
  "Muestra clonada como borrador.": "M2",
};

function renderToast(element, message, type = "info") {
  message = standardMessages[message] ? getMessage(standardMessages[message]) : message;
  element.classList.remove("is-visible");
  void element.offsetWidth;
  const icons = {
    success: "fa-circle-check",
    error: "fa-circle-exclamation",
    warning: "fa-triangle-exclamation",
    info: "fa-circle-info"
  };
  const titles = {
    success: "Operación completada",
    error: "No se pudo completar",
    warning: "Revisa la información",
    info: "Información"
  };
  element.className = `toast toast-${type}`;
  element.setAttribute("role", "status");
  element.setAttribute("aria-live", type === "error" || type === "warning" ? "assertive" : "polite");
  element.setAttribute("aria-hidden", "false");
  element.innerHTML = `<span class="toast-icon" aria-hidden="true"><i class="fa-solid ${icons[type] || icons.info}"></i></span><span class="toast-content"><strong class="toast-title">${titles[type] || titles.info}</strong><span class="toast-message"></span></span><button class="toast-close" type="button" aria-label="Cerrar aviso"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button><span class="toast-progress" aria-hidden="true"></span>`;
  element.querySelector(".toast-message").textContent = message;
  const dismiss = () => {
    window.clearTimeout(renderToast.timeoutId);
    element.classList.remove("is-visible");
    element.setAttribute("aria-hidden", "true");
  };
  element.querySelector(".toast-close")?.addEventListener("click", dismiss, { once: true });
  element.classList.add("is-visible");
  window.clearTimeout(renderToast.timeoutId);
  renderToast.timeoutId = window.setTimeout(dismiss, 4500);
}

function enableTooltips() {
  document.querySelectorAll(".filter-toggle").forEach((element) => {
    element.setAttribute("title", "Filtro Personalizado");
    element.setAttribute("data-bs-title", "Filtro Personalizado");
    element.setAttribute("data-bs-toggle", "tooltip");
  });
  if (!window.bootstrap) return;
  document.querySelectorAll("[data-bs-toggle='tooltip']").forEach((element) => {
    bootstrap.Tooltip.getOrCreateInstance(element);
  });
}

function closeMenus(root = document) {
  root.querySelectorAll("[data-menu-panel]").forEach((panel) => {
    panel.hidden = true;
  });
  root.querySelectorAll("[data-menu-button]").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

const INACTIVATION_REASON_MAX_LENGTH = 240;

function resetConfirmReason(modal, required) {
  const wrapper = modal.querySelector("[data-confirm-reason-wrap]");
  const field = modal.querySelector("[data-confirm-reason]");
  const error = modal.querySelector("[data-confirm-reason-error]");
  if (!wrapper || !field) return;
  wrapper.hidden = !required;
  field.required = required;
  field.maxLength = INACTIVATION_REASON_MAX_LENGTH;
  field.setAttribute("aria-required", String(required));
  field.setAttribute("aria-invalid", "false");
  field.value = "";
  if (error) {
    error.hidden = true;
    error.textContent = "";
  }
  modal.dataset.requireReason = String(required);
}

function openConfirmModal(id, message, { requireReason = false } = {}) {
  const modal = document.getElementById(id);
  if (!modal || !window.bootstrap) return null;
  const messageNode = modal.querySelector("[data-confirm-message]");
  if (messageNode) messageNode.textContent = message;
  resetConfirmReason(modal, requireReason);
  const instance = bootstrap.Modal.getOrCreateInstance(modal);
  instance.show();
  return instance;
}

function getConfirmReason(id) {
  return document.getElementById(id)?.querySelector("[data-confirm-reason]")?.value.trim() || "";
}

function validateConfirmReason(id, message = "Debe completar los campos obligatorios.") {
  const modal = document.getElementById(id);
  const field = modal?.querySelector("[data-confirm-reason]");
  if (!modal || !field || modal.dataset.requireReason !== "true") return true;
  const error = modal.querySelector("[data-confirm-reason-error]");
  const valid = Boolean(field.value.trim());
  field.setAttribute("aria-invalid", String(!valid));
  if (error) {
    error.textContent = valid ? "" : message;
    error.hidden = valid;
  }
  if (!valid) field.focus();
  return valid;
}

function closeConfirmModal(id) {
  const modal = document.getElementById(id);
  if (modal && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modal).hide();
}


/* source: design-system/auth-validation.js */
function hasRequiredValues(values) {
  return values.every((value) => String(value ?? "").trim().length > 0);
}

function validatePassportAccess({ documentNumber, password, user }) {
  return Boolean(user)
    && user.password === password
    && user.documentNumber === documentNumber
    && user.active
    && user.synchronized
    && user.projects > 0
    && user.roles > 0;
}

function validateDocumentAccess({ documentNumber, birthDate, issueDate, user }) {
  return Boolean(user)
    && user.number === documentNumber
    && user.birthDate === birthDate
    && user.issueDate === issueDate
    && user.active
    && user.valid
    && user.projects > 0
    && user.roles > 0;
}

function validateAutoregisterAccess({ email, password, account, periodState }) {
  return periodState === "open"
    && Boolean(account)
    && account.email === email
    && account.password === password
    && account.active;
}


/* source: design-system/auth-audit.js */
const AUDIT_STORAGE_KEY = "ssee-auth-audit";

function recordAuditEvent({ user, authType, operation = "Inicio de sesión", closureType = "", result, reason = "" }) {
  const entry = {
    timestamp: new Date().toISOString(),
    user,
    authenticationType: authType,
    operation,
    closureType,
    result,
    reason
  };
  try {
    const current = JSON.parse(sessionStorage.getItem(AUDIT_STORAGE_KEY) || "[]");
    sessionStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify([entry, ...current].slice(0, 50)));
  } catch {
    // The demo remains usable when browser storage is unavailable.
  }
  return entry;
}

function recordAuthAttempt(args) {
  return recordAuditEvent(args);
}


/* source: ref-008-auth-passport/js/main.js */





const refs = {
  form: document.getElementById("loginForm"),
  number: document.getElementById("documentNumber"),
  password: document.getElementById("password"),
  feedback: document.getElementById("authFeedback"),
  success: document.getElementById("authSuccess"),
  continueButton: document.getElementById("continueBtn"),
  authPage: document.querySelector(".auth-page"),
  authWelcome: document.getElementById("authWelcome"),
  toast: document.getElementById("toast")
};

const passportUsers = {
  "12345678": { documentNumber: "12345678", password: "ClaveSegura1", synchronized: true, active: true, projects: 1, roles: 1 },
  "87654321": { documentNumber: "87654321", password: "ClaveSegura1", synchronized: true, active: true, projects: 0, roles: 0 },
  "99999999": { documentNumber: "99999999", password: "ClaveSegura1", synchronized: true, active: false, projects: 1, roles: 1 }
};

function showToast(message, type = "info") {
  renderToast(refs.toast, message, type);
}

function showError(message) {
  refs.feedback.hidden = false;
  refs.feedback.textContent = message;
}

refs.form.addEventListener("submit", (event) => {
  event.preventDefault();
  refs.feedback.hidden = true;
  refs.success.hidden = true;
  if (!hasRequiredValues([refs.number.value, refs.password.value])) {
    recordAuthAttempt({ user: refs.number.value.trim() || "No identificado", authType: "Passport", result: "Fallida", reason: "Datos incompletos" });
    showError(getMessage("M11"));
    showToast(getMessage("M11"), "warning");
    return;
  }
  const user = passportUsers[refs.number.value.trim()];
  if (!validatePassportAccess({ documentNumber: refs.number.value.trim(), password: refs.password.value, user })) {
    recordAuthAttempt({ user: refs.number.value.trim(), authType: "Passport", result: "Fallida", reason: "Credenciales inválidas o acceso no autorizado" });
    showError(getMessage("M27"));
    showToast(getMessage("M27"), "warning");
    return;
  }
  refs.form.hidden = true;
  refs.success.hidden = false;
  recordAuthAttempt({ user: refs.number.value.trim(), authType: "Passport", result: "Exitosa" });
  showToast(getPrototypeMessage("authenticationSuccess"), "success");
});

document.querySelector(".password-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const visible = refs.password.type === "text";
  refs.password.type = visible ? "password" : "text";
  button.querySelector("i").className = `fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}`;
  button.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña");
});

bindAuthWelcomeFlow({ ...refs, authType: "passport" });
