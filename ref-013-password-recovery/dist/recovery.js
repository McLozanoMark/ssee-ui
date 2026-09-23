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


/* source: ref-013-password-recovery/js/data.js */
const recoveryUsers = {
  "ana.paredes@ejemplo.gob.pe": { email: "ana.paredes@ejemplo.gob.pe", authType: "Autoregistro" }
};

const recoveryPolicy = {
  minLength: 8,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/
};


/* source: ref-013-password-recovery/js/state.js */
function createRecoveryState({ authType, tokenState }) {
  return { authType, tokenState, email: "", tokenUsed: false };
}


/* source: ref-013-password-recovery/js/ui.js */



function showToast(refs, message, type = "info") {
  renderToast(refs.toast, message, type);
}

function showFeedback(refs, target, messageCode) {
  refs[target].hidden = false;
  refs[target].textContent = getMessage(messageCode);
}

function updatePolicy(refs, password, policy) {
  refs.policyLength.classList.toggle("is-valid", password.length >= policy.minLength);
  refs.policyUpper.classList.toggle("is-valid", policy.uppercase.test(password));
  refs.policyLower.classList.toggle("is-valid", policy.lowercase.test(password));
  refs.policyNumber.classList.toggle("is-valid", policy.number.test(password));
}

function showOnly(refs, view) {
  ["requestView", "sentView", "resetView", "expiredView", "successView"].forEach((key) => { refs[key].hidden = key !== view; });
}


/* source: ref-013-password-recovery/js/recovery.js */
function validateResetPassword({ newPassword, confirmation, policy }) {
  if (![newPassword, confirmation].every((value) => value.trim())) return { ok: false, messageCode: "M11", reason: "Datos incompletos" };
  if (newPassword !== confirmation) return { ok: false, messageCode: "M32", reason: "Las contraseñas no coinciden" };
  if (newPassword.length < policy.minLength || !policy.uppercase.test(newPassword) || !policy.lowercase.test(newPassword) || !policy.number.test(newPassword)) return { ok: false, messageCode: "M31", reason: "Política de seguridad no cumplida" };
  return { ok: true };
}


/* source: ref-013-password-recovery/js/main.js */







const refs = {
  passportPanel: document.getElementById("passportPanel"), passportRecoveryForm: document.getElementById("passportRecoveryForm"), passportRecoveryDocumentNumber: document.getElementById("passportRecoveryDocumentNumber"), passportRecoveryCaptcha: document.getElementById("passportRecoveryCaptcha"), passportCaptchaText: document.getElementById("passportCaptchaText"), passportCaptchaRefresh: document.getElementById("passportCaptchaRefresh"), passportFeedback: document.getElementById("passportFeedback"), passportCancel: document.getElementById("passportCancel"), passportSent: document.getElementById("passportSent"), passportBackLogin: document.getElementById("passportBackLogin"), documentPanel: document.getElementById("documentPanel"), documentRedirect: document.getElementById("documentRedirect"), requestForm: document.getElementById("requestForm"), email: document.getElementById("email"), requestFeedback: document.getElementById("requestFeedback"), backToLogin: document.getElementById("backToLogin"), requestView: document.getElementById("requestView"), sentView: document.getElementById("sentView"), resetView: document.getElementById("resetView"), expiredView: document.getElementById("expiredView"), successView: document.getElementById("successView"), successMessage: document.getElementById("successMessage"), sentBackToLogin: document.getElementById("sentBackToLogin"), requestNew: document.getElementById("requestNew"), resetForm: document.getElementById("resetForm"), newPassword: document.getElementById("newPassword"), confirmPassword: document.getElementById("confirmPassword"), resetFeedback: document.getElementById("resetFeedback"), cancelReset: document.getElementById("cancelReset"), policyLength: document.getElementById("policyLength"), policyUpper: document.getElementById("policyUpper"), policyLower: document.getElementById("policyLower"), policyNumber: document.getElementById("policyNumber"), toast: document.getElementById("toast")
};

const params = new URLSearchParams(window.location.search);
const authParam = params.get("auth");
const authType = authParam === "passport" ? "Passport" : authParam === "document" ? "Documento" : "Autoregistro";
const requestedTokenState = params.get("token");
const tokenState = ["expired", "error", "valid"].includes(requestedTokenState) ? requestedTokenState : "available";
const state = createRecoveryState({ authType, tokenState });
refs.successMessage.textContent = getMessage("M37");

function resetToRequest() {
  window.history.replaceState({}, "", "index.html");
  state.tokenState = "available";
  state.tokenUsed = false;
  refs.email.value = "";
  showOnly(refs, "requestView");
}

if (state.authType === "Passport") {
  document.body.classList.add("passport-external-mode");
  refs.requestView.hidden = true;
  refs.passportPanel.hidden = false;
  refs.passportRecoveryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = document.getElementById("passportRecoveryDocumentType").value && /^\d{8,12}$/.test(refs.passportRecoveryDocumentNumber.value.trim()) && refs.passportRecoveryCaptcha.value.trim().toUpperCase() === refs.passportCaptchaText.textContent;
    refs.passportFeedback.hidden = valid;
    refs.passportFeedback.classList.toggle("is-valid", valid);
    refs.passportFeedback.textContent = valid ? "" : "Verifica el número de documento y el captcha ingresado.";
    if (valid) { refs.passportRecoveryForm.hidden = true; refs.passportSent.hidden = false; showToast(refs, "Solicitud enviada en Passport.", "success"); }
  });
  refs.passportCaptchaRefresh.addEventListener("click", () => { refs.passportCaptchaText.textContent = refs.passportCaptchaText.textContent === "WXY7MZ" ? "K7P4QX" : "WXY7MZ"; refs.passportRecoveryCaptcha.value = ""; });
  refs.passportCancel.addEventListener("click", () => { window.location.href = "../auth-login/index.html?auth=passport"; });
  refs.passportBackLogin.addEventListener("click", () => { window.location.href = "../auth-login/index.html?auth=passport"; });
} else if (state.authType === "Documento") {
  refs.requestView.hidden = true;
  refs.documentPanel.hidden = false;
  refs.documentRedirect.addEventListener("click", () => { showToast(refs, "Este tipo de acceso no requiere recuperación de contraseña local.", "info"); });
} else if (state.tokenState === "expired") {
  refs.requestView.hidden = true;
  refs.expiredView.hidden = false;
} else {
  if (["error", "valid"].includes(state.tokenState)) {
    refs.requestView.hidden = true;
    refs.resetView.hidden = false;
  }
  refs.requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    refs.requestFeedback.hidden = true;
    state.email = refs.email.value.trim().toLowerCase();
    recordAuditEvent({ user: state.email || "No identificado", authType: state.authType, operation: "Solicitud de recuperación", result: state.email ? "Exitosa" : "Fallida", reason: state.email ? "" : "Datos incompletos" });
    if (!state.email) {
      showFeedback(refs, "requestFeedback", "M11");
      showToast(refs, refs.requestFeedback.textContent, "warning");
      return;
    }
    showOnly(refs, "sentView");
    showToast(refs, getMessage("M35"), "info");
  });

  refs.sentBackToLogin.addEventListener("click", () => { window.location.href = "../auth-login/index.html?auth=autoregistro"; });

  refs.resetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    refs.resetFeedback.hidden = true;
    const result = state.tokenState === "error"
      ? { ok: false, messageCode: "M38", reason: "Error técnico simulado" }
      : validateResetPassword({ newPassword: refs.newPassword.value, confirmation: refs.confirmPassword.value, policy: recoveryPolicy });
    recordAuditEvent({ user: state.email, authType: state.authType, operation: "Restablecimiento de contraseña", result: result.ok ? "Exitosa" : "Fallida", reason: result.reason || "" });
    if (!result.ok) {
      showFeedback(refs, "resetFeedback", result.messageCode);
      showToast(refs, refs.resetFeedback.textContent, "warning");
      return;
    }
    state.tokenUsed = true;
    showOnly(refs, "successView");
    showToast(refs, getMessage("M37"), "success");
  });
}

refs.newPassword.addEventListener("input", () => updatePolicy(refs, refs.newPassword.value, recoveryPolicy));
refs.requestNew.addEventListener("click", resetToRequest);
refs.cancelReset.addEventListener("click", resetToRequest);
refs.backToLogin.addEventListener("click", () => {
  window.location.href = "../auth-login/index.html?auth=" + (authType === "Passport" ? "passport" : "autoregistro");
});

document.querySelectorAll(".password-toggle").forEach((button) => button.addEventListener("click", (event) => {
  const input = event.currentTarget.closest(".password-input").querySelector("input");
  const visible = input.type === "text";
  input.type = visible ? "password" : "text";
  event.currentTarget.querySelector("i").className = `fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}`;
  event.currentTarget.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña");
}));
