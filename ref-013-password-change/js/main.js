import { recordAuditEvent } from "../../design-system/auth-audit.js";
import { getMessage } from "../../design-system/messages.js";
import { passwordPolicy } from "./data.js";
import { createPasswordState } from "./state.js";
import { showFeedback, showToast, updateAccount, updatePolicy } from "./ui.js";
import { validatePasswordChange } from "./password.js";

const refs = {
  form: document.getElementById("passwordForm"), current: document.getElementById("currentPassword"), next: document.getElementById("newPassword"), confirmation: document.getElementById("confirmPassword"), feedback: document.getElementById("passwordFeedback"), success: document.getElementById("passwordSuccess"), passportNotice: document.getElementById("passportNotice"), passportRedirect: document.getElementById("passportRedirect"), documentPanel: document.getElementById("documentPanel"), documentRedirect: document.getElementById("documentRedirect"), accountSummary: document.querySelector(".account-summary"), accountName: document.getElementById("accountName"), accountEmail: document.getElementById("accountEmail"), accountType: document.getElementById("accountType"), policyTrigger: document.getElementById("passwordPolicyTrigger"), policyContent: document.getElementById("passwordPolicyContent"), policyLength: document.getElementById("policyLength"), policyMaxLength: document.getElementById("policyMaxLength"), policyUpper: document.getElementById("policyUpper"), policyLower: document.getElementById("policyLower"), policyNumber: document.getElementById("policyNumber"), policyForbidden: document.getElementById("policyForbidden"), toast: document.getElementById("toast")
};

const authParam = new URLSearchParams(window.location.search).get("auth");
const authType = authParam === "passport" ? "Passport" : authParam === "document" ? "Documento" : "Autoregistro";
const state = createPasswordState(authType);

function initPolicyTooltip() {
  if (!window.bootstrap || !refs.policyTrigger || !refs.policyContent) return;
  refs.policyTooltip = bootstrap.Tooltip.getOrCreateInstance(refs.policyTrigger, {
    html: true,
    placement: "top",
    trigger: "hover focus click",
    container: "body",
    title: () => refs.policyContent.innerHTML
  });
}

function setPassportView() {
  refs.form.hidden = true;
  refs.passportNotice.hidden = false;
}

function setDocumentView() {
  refs.form.hidden = true;
  refs.documentPanel.hidden = false;
  refs.accountSummary.hidden = true;
}

if (state.authType === "Passport") {
  setPassportView();
  updateAccount(refs, state.user);
  refs.passportRedirect.addEventListener("click", () => { showToast(refs, "Continúa en el mecanismo oficial de Passport.", "info"); });
} else if (state.authType === "Documento") {
  setDocumentView();
  updateAccount(refs, state.user);
  refs.documentRedirect.addEventListener("click", () => { showToast(refs, "Este tipo de acceso no administra una contraseña local.", "info"); });
} else {
  updateAccount(refs, state.user);
  updatePolicy(refs, refs.next.value, passwordPolicy);
  initPolicyTooltip();
  refs.next.addEventListener("input", () => updatePolicy(refs, refs.next.value, passwordPolicy));
  refs.form.addEventListener("reset", () => { refs.feedback.hidden = true; updatePolicy(refs, "", passwordPolicy); });
  refs.form.addEventListener("submit", (event) => {
    event.preventDefault();
    refs.feedback.hidden = true;
    const result = validatePasswordChange({ currentPassword: refs.current.value, newPassword: refs.next.value, confirmation: refs.confirmation.value, user: state.user, policy: passwordPolicy });
    recordAuditEvent({ user: state.user.email, authType: state.authType, operation: "Cambio de contraseña", result: result.ok ? "Exitosa" : "Fallida", reason: result.reason || "" });
    if (!result.ok) {
      showFeedback(refs, result.messageCode);
      showToast(refs, refs.feedback.textContent, "warning");
      return;
    }
    refs.form.hidden = true;
    refs.success.hidden = false;
    showToast(refs, getMessage("M37"), "success");
  });
}

document.querySelectorAll(".password-toggle").forEach((button) => button.addEventListener("click", (event) => {
  const input = event.currentTarget.closest(".password-input").querySelector("input");
  const visible = input.type === "text";
  input.type = visible ? "password" : "text";
  event.currentTarget.querySelector("i").className = `fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}`;
  event.currentTarget.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña");
}));
