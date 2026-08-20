import { getMessage } from "../../design-system/messages.js";

export function showToast(refs, message, type = "info") {
  const icon = type === "success" ? "fa-circle-check" : type === "warning" ? "fa-triangle-exclamation" : type === "error" ? "fa-circle-xmark" : "fa-circle-info";
  refs.toast.className = `toast toast-${type}`;
  refs.toast.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span>${message}</span>`;
  refs.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => refs.toast.classList.remove("is-visible"), 4500);
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
