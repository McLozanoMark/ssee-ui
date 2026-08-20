import { recordAuditEvent } from "../../design-system/auth-audit.js";
import { passwordPolicy } from "./data.js";
import { createPasswordState } from "./state.js";
import { showFeedback, showToast, updateAccount, updatePolicy } from "./ui.js";
import { validatePasswordChange } from "./password.js";

const refs = {
  form: document.getElementById("passwordForm"), current: document.getElementById("currentPassword"), next: document.getElementById("newPassword"), confirmation: document.getElementById("confirmPassword"), feedback: document.getElementById("passwordFeedback"), success: document.getElementById("passwordSuccess"), passportNotice: document.getElementById("passportNotice"), passportRedirect: document.getElementById("passportRedirect"), accountName: document.getElementById("accountName"), accountEmail: document.getElementById("accountEmail"), accountType: document.getElementById("accountType"), policyLength: document.getElementById("policyLength"), policyUpper: document.getElementById("policyUpper"), policyLower: document.getElementById("policyLower"), policyNumber: document.getElementById("policyNumber"), toast: document.getElementById("toast")
};

const authType = new URLSearchParams(window.location.search).get("auth") === "passport" ? "Passport" : "Autoregistro";
const state = createPasswordState(authType);

function setPassportView() {
  refs.form.hidden = true;
  refs.passportNotice.hidden = false;
}

if (state.authType === "Passport") {
  setPassportView();
  updateAccount(refs, state.user);
  refs.passportRedirect.addEventListener("click", () => showToast(refs, "El mecanismo oficial de Passport no tiene una URL configurada en esta demo.", "info"));
} else {
  updateAccount(refs, state.user);
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
    showToast(refs, "La contraseña se ha actualizado correctamente.", "success");
  });
}

document.querySelectorAll(".password-toggle").forEach((button) => button.addEventListener("click", (event) => {
  const input = event.currentTarget.closest(".password-input").querySelector("input");
  const visible = input.type === "text";
  input.type = visible ? "password" : "text";
  event.currentTarget.querySelector("i").className = `fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}`;
  event.currentTarget.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña");
}));
