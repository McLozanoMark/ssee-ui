(function () {
  const guide = document.getElementById("sessionGuide");
  const title = document.getElementById("sessionGuideTitle");
  const copy = document.getElementById("sessionGuideCopy");
  const options = document.getElementById("sessionGuideOptions");
  const cursor = document.getElementById("sessionCursor");
  if (!guide || !title || !copy || !options || !cursor) return;

  const scenarios = {
    main: {
      label: "flujo principal",
      startEvents: [],
      steps: [
        { target: "#accountName", title: "Sesión autenticada", copy: "Ahora iniciaremos el flujo principal. Esta bienvenida se muestra después de una autenticación exitosa y refleja el usuario, su rol y sus módulos habilitados.", auto: 1800 }
      ]
    },
    new: {
      label: "flujo de nueva sesión",
      startEvents: ["ref016-start-new-session"],
      steps: [
        { target: "#sessionLoginSubmit", title: "Inicia sesión nuevamente", copy: "Ahora iniciaremos el flujo de nueva sesión. La pantalla de autenticación pertenece a este REF-IDE-015 y representa el nuevo acceso del mismo usuario.", event: "ref016-authenticated" },
        { target: "#welcome", title: "Sesión reemplazada", copy: "La sesión anterior finalizó automáticamente y la nueva sesión queda activa en la bienvenida.", auto: 1100 }
      ]
    },
    inactive: {
      label: "flujo de inactividad",
      startEvents: ["ref016-start-inactivity"],
      steps: [
        { target: "#inactivityAlert .confirm-modal", title: "Alerta de inactividad", copy: "La sesión muestra un contador y pregunta si deseas continuar trabajando o cerrar sesión.", auto: 1200 },
        { target: "#continueSession", title: "Decide sobre la sesión", copy: "Selecciona Continuar trabajando para conservar la sesión o Cerrar sesión para volver a autenticación.", click: true },
        { target: "#welcome", title: "Sesión continúa activa", copy: "La sesión se mantiene activa porque elegiste continuar trabajando.", auto: 900 }
      ]
    },
    logout: {
      label: "flujo de cierre voluntario",
      startEvents: [],
      steps: [
        { target: "#accountMenuTrigger", title: "Abre tu cuenta", copy: "Ahora iniciaremos el flujo de cierre voluntario. Selecciona el nombre del usuario para abrir sus opciones.", click: true },
        { target: "#logoutOption", title: "Cierra sesión", copy: "Selecciona Cerrar sesión para finalizar voluntariamente la sesión activa.", click: true },
        { target: "#confirmLogout", title: "Confirma el cierre", copy: "Confirma la acción para finalizar inmediatamente la sesión.", event: "ref016-session-ended" },
        { target: "#authView", title: "Vuelve al login", copy: "La sesión queda invalidada y el usuario permanece dentro de este REF-IDE-015 en la pantalla de autenticación.", auto: 900 }
      ]
    }
  };

  let scenarioKey = null;
  let stepIndex = 0;
  let runId = 0;

  function isVisible(element) {
    return element && !element.hidden && getComputedStyle(element).display !== "none";
  }

  function hideCursor() { cursor.classList.remove("is-visible"); }

  function positionCursor(element) {
    const box = element.getBoundingClientRect();
    cursor.style.left = `${box.left + box.width / 2 - 10}px`;
    cursor.style.top = `${box.top + box.height / 2 - 10}px`;
    hideCursor();
    requestAnimationFrame(() => cursor.classList.add("is-visible"));
  }

  function finish() {
    title.textContent = "Recorrido completo";
    copy.textContent = `El ${scenarios[scenarioKey].label} terminó dentro del REF-IDE-015. Puedes seleccionar otro flujo.`;
    options.hidden = false;
    hideCursor();
  }

  function showStep() {
    const steps = scenarios[scenarioKey].steps;
    if (stepIndex >= steps.length) return finish();
    const step = steps[stepIndex];
    const element = document.querySelector(step.target);
    if (!isVisible(element)) return window.setTimeout(showStep, 80);

    title.textContent = step.title;
    copy.textContent = step.copy;
    positionCursor(element);
    const currentRun = runId;
    const advance = () => window.setTimeout(() => {
      if (currentRun !== runId) return;
      stepIndex += 1;
      showStep();
    }, 80);
    if (step.event) window.addEventListener(step.event, advance, { once: true });
    else if (step.auto) window.setTimeout(advance, step.auto);
    else if (step.click) element.addEventListener("click", advance, { once: true });
  }

  function startScenario(nextScenario) {
    if (!scenarios[nextScenario]) return;
    scenarioKey = nextScenario;
    stepIndex = 0;
    runId += 1;
    guide.hidden = false;
    options.hidden = true;
    title.textContent = `Ahora iniciaremos el ${scenarios[nextScenario].label}`;
    copy.textContent = "La guía externa te indicará cada paso y permanecerá dentro de este requerimiento.";
    hideCursor();
    window.dispatchEvent(new CustomEvent("ref016-guide-reset"));
    scenarios[nextScenario].startEvents.forEach((eventName) => window.dispatchEvent(new CustomEvent(eventName)));
    window.setTimeout(showStep, 140);
  }

  document.querySelectorAll("[data-session-scenario]").forEach((option) => option.addEventListener("click", () => startScenario(option.dataset.sessionScenario)));
  window.addEventListener("resize", () => {
    if (!scenarioKey || !scenarios[scenarioKey].steps[stepIndex]) return;
    const element = document.querySelector(scenarios[scenarioKey].steps[stepIndex].target);
    if (isVisible(element)) positionCursor(element);
  });
})();
