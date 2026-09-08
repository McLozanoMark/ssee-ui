import { getMessage } from "../../design-system/messages.js";
import { renderToast } from "../../design-system/interaction.js";

export function showToast(refs, message, type = "info") {
  renderToast(refs.toast, message, type);
}

export function showFeedback(refs, target, messageCode) {
  refs[target].hidden = false;
  refs[target].textContent = getMessage(messageCode);
}

export function updatePolicy(refs, password, policy) {
  refs.policyLength.classList.toggle("is-valid", password.length >= policy.minLength);
  refs.policyUpper.classList.toggle("is-valid", policy.uppercase.test(password));
  refs.policyLower.classList.toggle("is-valid", policy.lowercase.test(password));
  refs.policyNumber.classList.toggle("is-valid", policy.number.test(password));
}

export function showOnly(refs, view) {
  ["requestView", "sentView", "resetView", "expiredView", "successView"].forEach((key) => { refs[key].hidden = key !== view; });
}
