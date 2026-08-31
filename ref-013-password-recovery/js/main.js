import { recordAuditEvent } from "../../design-system/auth-audit.js";
import { getMessage } from "../../design-system/messages.js";
import { recoveryPolicy, recoveryUsers } from "./data.js";
import { createRecoveryState } from "./state.js";
import { showFeedback, showOnly, showToast, updatePolicy } from "./ui.js";
import { validateResetPassword } from "./recovery.js";

const refs = {
  passportPanel: document.getElementById("passportPanel"), passportRedirect: document.getElementById("passportRedirect"), requestForm: document.getElementById("requestForm"), email: document.getElementById("email"), requestFeedback: document.getElementById("requestFeedback"), backToLogin: document.getElementById("backToLogin"), requestView: document.getElementById("requestView"), sentView: document.getElementById("sentView"), resetView: document.getElementById("resetView"), expiredView: document.getElementById("expiredView"), successView: document.getElementById("successView"), openLink: document.getElementById("openLink"), requestNew: document.getElementById("requestNew"), resetForm: document.getElementById("resetForm"), newPassword: document.getElementById("newPassword"), confirmPassword: document.getElementById("confirmPassword"), resetFeedback: document.getElementById("resetFeedback"), cancelReset: document.getElementById("cancelReset"), policyLength: document.getElementById("policyLength"), policyUpper: document.getElementById("policyUpper"), policyLower: document.getElementById("policyLower"), policyNumber: document.getElementById("policyNumber"), toast: document.getElementById("toast")
};

const params = new URLSearchParams(window.location.search);
const authType = params.get("auth") === "passport" ? "Passport" : "Autoregistro";
const tokenState = params.get("token") === "expired" ? "expired" : params.get("token") === "error" ? "error" : "available";
const state = createRecoveryState({ authType, tokenState });

function resetToRequest() {
  window.history.replaceState({}, "", "index.html");
  state.tokenState = "available";
  state.tokenUsed = false;
  refs.email.value = "";
  showOnly(refs, "requestView");
}

if (state.authType === "Passport") {
  refs.requestView.hidden = true;
  refs.passportPanel.hidden = false;
  refs.passportRedirect.addEventListener("click", () => { window.location.href = "../ref-007-auth-passport/index.html"; });
} else if (state.tokenState === "expired") {
  refs.requestView.hidden = true;
  refs.expiredView.hidden = false;
} else {
  if (state.tokenState === "error") {
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

  refs.openLink.addEventListener("click", () => {
    state.tokenState = "available";
    recordAuditEvent({ user: state.email, authType: state.authType, operation: "Utilización del mecanismo de recuperación", result: "Exitosa" });
    showOnly(refs, "resetView");
  });

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
  window.location.href = authType === "Passport" ? "../ref-007-auth-passport/index.html" : "../ref-009-auth-autoregistro/index.html";
});

document.querySelectorAll(".password-toggle").forEach((button) => button.addEventListener("click", (event) => {
  const input = event.currentTarget.closest(".password-input").querySelector("input");
  const visible = input.type === "text";
  input.type = visible ? "password" : "text";
  event.currentTarget.querySelector("i").className = `fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}`;
  event.currentTarget.setAttribute("aria-label", visible ? "Mostrar contraseña" : "Ocultar contraseña");
}));
