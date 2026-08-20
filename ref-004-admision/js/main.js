import { getMessage } from "../../design-system/messages.js";

const roles = ["Administrador USE", "Supervisor de Seguimiento", "Evaluador", "Registrador"];
const refs = {
  form: document.getElementById("identityForm"),
  number: document.getElementById("documentNumber"),
  result: document.getElementById("identityResult"),
  admit: document.getElementById("admitBtn"),
  roles: document.getElementById("roleOptions"),
  projects: document.getElementById("projectOptions"),
  toast: document.getElementById("toast"),
};
let consulted = false;

function toast(message, type = "info") {
  refs.toast.className = `toast toast-${type}`;
  refs.toast.innerHTML = `<i class="fa-solid ${type === "success" ? "fa-circle-check" : type === "warning" ? "fa-triangle-exclamation" : "fa-circle-info"}"></i><span>${message}</span>`;
  refs.toast.classList.add("is-visible");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => refs.toast.classList.remove("is-visible"), 4500);
}

function renderRoles() {
  refs.roles.innerHTML = roles.map((role) => `<label class="role-check"><input class="form-check-input" type="checkbox" value="${role}"><span>${role}</span></label>`).join("");
}

function updateAdmit() {
  refs.admit.disabled = !consulted
    || !document.querySelector("#roleOptions input:checked")
    || !document.querySelector("#projectOptions input:checked");
}

function resetForm() {
  refs.form.reset();
  document.querySelectorAll("#projectOptions input, #roleOptions input").forEach((input) => {
    input.checked = false;
  });
  document.getElementById("email").value = "";
  document.getElementById("site").value = "";
  document.getElementById("validity").value = "";
  refs.result.hidden = true;
  consulted = false;
  updateAdmit();
}

function confirmAdmission() {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.innerHTML = `<div class="modal-dialog modal-dialog-centered modal-sm"><div class="modal-content admission-modal"><div class="modal-header"><div><span class="modal-eyebrow">Confirmar admisión</span><h2 class="modal-title">Confirmar acción</h2></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><p>${getMessage("M1")}</p><p>Se creará el acceso con el proyecto y los roles seleccionados.</p></div><div class="modal-footer"><button type="button" class="btn btn-outline-ssee button button-secondary" data-bs-dismiss="modal">No, cancelar</button><button type="button" class="btn btn-ssee button button-primary" data-confirm="admission">Sí, continuar</button></div></div></div>`;
  document.body.append(modal);
  const instance = new bootstrap.Modal(modal);
  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-confirm='admission']")) {
      instance.hide();
      toast(getMessage("M2"), "success");
    }
  });
  modal.addEventListener("hidden.bs.modal", () => modal.remove());
  instance.show();
}

refs.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (refs.number.value.trim().length < 8) {
    toast(getMessage("M12"), "warning");
    return;
  }
  consulted = true;
  document.getElementById("identityName").textContent = "Ana María Paredes García";
  document.getElementById("identityDocument").textContent = `${document.getElementById("documentType").value} ${refs.number.value.trim()}`;
  document.getElementById("identityBirth").textContent = "15/04/1988";
  refs.result.hidden = false;
  updateAdmit();
  toast("Información consultada correctamente.", "success");
});

document.addEventListener("input", updateAdmit);
refs.admit.addEventListener("click", confirmAdmission);
document.getElementById("clearBtn").addEventListener("click", resetForm);
document.getElementById("cancelBtn").addEventListener("click", resetForm);
renderRoles();
