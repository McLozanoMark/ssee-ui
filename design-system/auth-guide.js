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
