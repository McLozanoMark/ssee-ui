import { getMessage } from "../../design-system/messages.js";
import { renderToast } from "../../design-system/interaction.js";

export function showToast(refs, message, type = "info") {
  renderToast(refs.toast, message, type);
}

export function showFeedback(refs, messageCode) {
  refs.feedback.hidden = false;
  refs.feedback.textContent = getMessage(messageCode);
}

export function updateAccount(refs, user) {
  refs.accountName.textContent = user.name;
  refs.accountEmail.textContent = user.email;
  refs.accountType.textContent = user.authType;
}

export function updatePolicy(refs, password, policy) {
  const checks = {
    policyLength: password.length >= policy.minLength,
    policyMaxLength: password.length > 0 && password.length <= policy.maxLength,
    policyUpper: policy.uppercase.test(password),
    policyLower: policy.lowercase.test(password),
    policyNumber: policy.number.test(password),
    policyForbidden: password.length > 0 && !policy.forbidden.test(password)
  };
  Object.entries(checks).forEach(([id, valid]) => {
    const item = refs[id];
    item.classList.toggle("is-valid", valid);
    item.classList.toggle("is-invalid", !valid);
  });
  if (refs.policyTooltip) refs.policyTooltip.setContent({ ".tooltip-inner": refs.policyContent.innerHTML });
}
