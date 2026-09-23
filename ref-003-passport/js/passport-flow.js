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
  renderToast(toast, message, type);
}

syncButton.addEventListener("click", () => {
  if (syncRunning) return;

  syncRunning = true;
  syncButton.disabled = true;
  syncButton.setAttribute("aria-busy", "true");
  syncButton.classList.add("is-syncing");
  syncButton.innerHTML = '<i class="fa-solid fa-rotate icon" aria-hidden="true"></i>Sincronizando Passport..';
  showToast("Sincronización de Passport iniciada.", "info");

  window.setTimeout(() => {
    syncRunning = false;
    syncButton.disabled = false;
    syncButton.removeAttribute("aria-busy");
    syncButton.classList.remove("is-syncing");
    syncButton.innerHTML = '<i class="fa-solid fa-rotate icon" aria-hidden="true"></i>Sincronizar Passport';
    if (getScenario() === "error") {
      showToast("No fue posible completar la sincronización con Passport.", "error");
      window.dispatchEvent(new CustomEvent("ref003-sync-finished"));
      return;
    }
    showToast("La sincronización con Passport se ha realizado correctamente.", "success");
    window.dispatchEvent(new CustomEvent("ref003-sync-finished"));
  }, 1200);
});
