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
  refs.policyLength.classList.toggle("is-valid", password.length >= policy.minLength);
  refs.policyUpper.classList.toggle("is-valid", policy.uppercase.test(password));
  refs.policyLower.classList.toggle("is-valid", policy.lowercase.test(password));
  refs.policyNumber.classList.toggle("is-valid", policy.number.test(password));
}
