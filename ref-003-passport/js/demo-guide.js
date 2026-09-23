const guide = document.getElementById("demoGuide");
const guideTitle = document.getElementById("guideTitle");
const guideCopy = document.getElementById("guideCopy");
const guideOptions = document.getElementById("guideOptions");
const cursor = document.getElementById("demoCursor");
const guideSyncButton = document.getElementById("syncBtn");
let selectedScenario = "success";

function resetGuide() {
  guide.hidden = false;
  guideTitle.textContent = "¿Qué escenario deseas probar?";
  guideCopy.textContent = "Selecciona un resultado para iniciar el recorrido.";
  guideOptions.hidden = false;
  cursor.classList.remove("is-visible");
}

document.querySelectorAll("[data-demo-scenario]").forEach((option) => {
  option.addEventListener("click", () => {
    selectedScenario = option.dataset.demoScenario;
    window.ref003SyncScenario = selectedScenario;
    try {
      sessionStorage.setItem("ref003-sync-scenario", selectedScenario);
    } catch {
      // La guía sigue funcionando cuando el navegador bloquea el almacenamiento en file://.
    }
    guideTitle.textContent = "Ahora prueba la sincronización";
    guideCopy.textContent = "Haz clic en Sincronizar Passport para continuar.";
    guideOptions.hidden = true;
    guide.hidden = false;
    const target = guideSyncButton.getBoundingClientRect();
    cursor.style.left = `${target.left + target.width / 2 - 10}px`;
    cursor.style.top = `${target.top + target.height / 2 - 10}px`;
    cursor.classList.add("is-visible");
  });
});

guideSyncButton.addEventListener("click", () => cursor.classList.remove("is-visible"));
window.addEventListener("ref003-sync-finished", resetGuide);
