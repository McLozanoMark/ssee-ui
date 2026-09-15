const syncButton = document.getElementById("syncBtn");
const toast = document.getElementById("toast");
let syncRunning = false;

function getScenario() {
  if (window.ref003SyncScenario) return window.ref003SyncScenario;
  try {
    return sessionStorage.getItem("ref003-sync-scenario") || "success";
  } catch {
    return "success";
  }
}

function showToast(message, type = "info") {
  const icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-exclamation" : "fa-circle-info";
  toast.className = `toast toast-${type} is-visible`;
  toast.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span>${message}</span>`;
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => toast.classList.remove("is-visible"), 4500);
}

syncButton.addEventListener("click", () => {
  if (syncRunning) return;

  syncRunning = true;
  syncButton.disabled = true;
  syncButton.setAttribute("aria-busy", "true");
  syncButton.classList.add("is-syncing");
  syncButton.innerHTML = '<i class="fa-solid fa-rotate icon" aria-hidden="true"></i>Sincronizando..';
  showToast("Sincronización iniciada.", "info");

  window.setTimeout(() => {
    syncRunning = false;
    syncButton.disabled = false;
    syncButton.removeAttribute("aria-busy");
    syncButton.classList.remove("is-syncing");
    syncButton.innerHTML = '<i class="fa-solid fa-rotate icon" aria-hidden="true"></i>Sincronizar';
    if (getScenario() === "error") {
      showToast("No fue posible completar la sincronización con Passport.", "error");
      window.dispatchEvent(new CustomEvent("ref003-sync-finished"));
      return;
    }
    showToast("La sincronización con Passport se ha realizado correctamente.", "success");
    window.dispatchEvent(new CustomEvent("ref003-sync-finished"));
  }, 1200);
});
