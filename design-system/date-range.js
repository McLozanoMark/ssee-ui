const DAY_NAMES = ["D", "L", "M", "X", "J", "V", "S"];
const MONTH_FORMATTER = new Intl.DateTimeFormat("es-PE", { month: "long", year: "numeric", timeZone: "UTC" });

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function formatInputDate(date) {
  if (!date) return "";
  return [date.getUTCFullYear(), String(date.getUTCMonth() + 1).padStart(2, "0"), String(date.getUTCDate()).padStart(2, "0")].join("-");
}

function formatDisplayDate(value) {
  const date = parseDate(value);
  return date ? `${String(date.getUTCDate()).padStart(2, "0")}/${String(date.getUTCMonth() + 1).padStart(2, "0")}/${date.getUTCFullYear()}` : "";
}

function monthStart(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function addMonths(date, amount) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1));
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function isSameMonth(left, right) {
  return left.getUTCFullYear() === right.getUTCFullYear() && left.getUTCMonth() === right.getUTCMonth();
}

export function createDateRangeFilter(root) {
  if (!root) return null;
  const picker = root.querySelector(".date-range-picker");
  const start = root.querySelector("[data-date-range-start]");
  const end = root.querySelector("[data-date-range-end]");
  const trigger = root.querySelector("[data-date-range-trigger]");
  const label = root.querySelector("[data-date-range-label]");
  const clearButton = root.querySelector("[data-date-range-clear]");
  const popover = root.querySelector("[data-date-range-popover]");
  const summary = root.querySelector("[data-date-range-summary]");
  const months = root.querySelector("[data-date-range-months]");
  const monthLabels = root.querySelector("[data-date-range-month-labels]");
  const error = root.querySelector("[data-date-range-error]");
  if (!picker || !start || !end || !trigger || !label || !popover || !months || !monthLabels) return null;

  const today = new Date();
  let viewMonth = monthStart(parseDate(start.value) || new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1)));
  let draftStart = start.value;
  let draftEnd = end.value;

  function validate() {
    const invalid = Boolean(start.value && end.value && start.value > end.value);
    start.setAttribute("aria-invalid", String(invalid));
    end.setAttribute("aria-invalid", String(invalid));
    root.toggleAttribute("data-invalid", invalid);
    if (error) {
      if (invalid) error.removeAttribute("hidden");
      else error.setAttribute("hidden", "");
      error.textContent = invalid ? "La fecha inicial debe ser anterior o igual a la fecha final." : "";
    }
    return !invalid;
  }

  function updateSummary() {
    if (draftStart && draftEnd) summary.textContent = `${formatDisplayDate(draftStart)} a ${formatDisplayDate(draftEnd)}`;
    else if (draftStart) summary.textContent = `${formatDisplayDate(draftStart)} a ...`;
    else summary.textContent = "Selecciona una fecha inicial y final";
  }

  function updateTrigger() {
    if (start.value && end.value) label.textContent = `${formatDisplayDate(start.value)} - ${formatDisplayDate(end.value)}`;
    else if (start.value) label.textContent = `Desde ${formatDisplayDate(start.value)}`;
    else if (end.value) label.textContent = `Hasta ${formatDisplayDate(end.value)}`;
    else label.textContent = "Seleccionar rango";
    clearButton.hidden = !(start.value || end.value);
  }

  function renderMonth(month) {
    const firstDay = month.getUTCDay();
    const weekdays = DAY_NAMES.map((day) => `<span class="date-range-weekday">${day}</span>`).join("");
    const dates = [];
    for (let day = 1; ; day += 1) {
      const date = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), day));
      if (date.getUTCMonth() !== month.getUTCMonth()) break;
      dates.push(date);
    }
    const dayCells = [
      ...Array.from({ length: firstDay }, () => `<span class="date-range-day is-empty" aria-hidden="true"></span>`),
      ...dates.map((date) => {
      const day = date.getUTCDate();
      const value = formatInputDate(date);
      const selectedStart = value === draftStart;
      const selectedEnd = value === draftEnd;
      const inRange = Boolean(draftStart && draftEnd && value > draftStart && value < draftEnd);
      const todayValue = formatInputDate(new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())));
      const classes = ["date-range-day", selectedStart || selectedEnd ? "is-selected" : "", inRange ? "is-in-range" : "", value === todayValue ? "is-today" : ""].filter(Boolean).join(" ");
      const labelText = `${day} de ${capitalize(MONTH_FORMATTER.format(month).split(" de ")[0])} de ${month.getUTCFullYear()}`;
      return `<button class="${classes}" type="button" data-date-range-day="${value}" aria-label="${labelText}"${selectedStart ? " aria-current=\"date\"" : ""}>${day}</button>`;
      })
    ].join("");
    return `<section class="date-range-month" aria-label="${capitalize(MONTH_FORMATTER.format(month))}"><h4>${capitalize(MONTH_FORMATTER.format(month))}</h4><div class="date-range-weekdays">${weekdays}</div><div class="date-range-day-grid">${dayCells}</div></section>`;
  }

  function renderCalendar() {
    monthLabels.innerHTML = `<span>${capitalize(MONTH_FORMATTER.format(viewMonth))}</span><span>${capitalize(MONTH_FORMATTER.format(addMonths(viewMonth, 1)))}</span>`;
    months.innerHTML = `${renderMonth(viewMonth)}${renderMonth(addMonths(viewMonth, 1))}`;
    updateSummary();
  }

  function positionPopover() {
    if (popover.hidden) return;
    const pickerRect = picker.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const popoverWidth = popover.offsetWidth;
    const viewportGutter = 12;
    const preferredLeft = triggerRect.left - pickerRect.left;
    const minimumLeft = viewportGutter - pickerRect.left;
    const maximumLeft = Math.max(minimumLeft, window.innerWidth - viewportGutter - popoverWidth - pickerRect.left);
    const boundedLeft = Math.min(Math.max(preferredLeft, minimumLeft), maximumLeft);

    popover.style.left = `${boundedLeft}px`;
    popover.style.right = "auto";
  }

  function open() {
    draftStart = start.value;
    draftEnd = end.value;
    const anchor = parseDate(draftStart) || parseDate(draftEnd);
    if (anchor) viewMonth = monthStart(anchor);
    renderCalendar();
    popover.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    positionPopover();
  }

  function close() {
    popover.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  function resetDraft() {
    draftStart = "";
    draftEnd = "";
    renderCalendar();
  }

  trigger.addEventListener("click", () => (popover.hidden ? open() : close()));
  clearButton.addEventListener("click", (event) => {
    event.stopPropagation();
    start.value = "";
    end.value = "";
    resetDraft();
    updateTrigger();
    validate();
  });
  root.querySelector("[data-date-range-prev]")?.addEventListener("click", () => { viewMonth = addMonths(viewMonth, -1); renderCalendar(); });
  root.querySelector("[data-date-range-next]")?.addEventListener("click", () => { viewMonth = addMonths(viewMonth, 1); renderCalendar(); });
  popover.addEventListener("click", (event) => event.stopPropagation());
  months.addEventListener("click", (event) => {
    const day = event.target.closest("[data-date-range-day]");
    if (!day) return;
    const value = day.dataset.dateRangeDay;
    if (!draftStart || (draftStart && draftEnd)) {
      draftStart = value;
      draftEnd = "";
    } else if (value < draftStart) {
      draftEnd = draftStart;
      draftStart = value;
    } else {
      draftEnd = value;
    }
    renderCalendar();
  });
  root.querySelector("[data-date-range-cancel]")?.addEventListener("click", () => { draftStart = start.value; draftEnd = end.value; close(); });
  root.querySelector("[data-date-range-apply]")?.addEventListener("click", () => {
    start.value = draftStart;
    end.value = draftEnd;
    updateTrigger();
    validate();
    close();
  });
  document.addEventListener("click", (event) => {
    if (!picker.contains(event.target)) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !popover.hidden) close();
  });
  window.addEventListener("resize", positionPopover);

  function reset() {
    start.value = "";
    end.value = "";
    resetDraft();
    updateTrigger();
    validate();
    close();
  }

  updateTrigger();
  renderCalendar();
  validate();
  return { start, end, validate, reset, open };
}

export function toDateInputValue(value) {
  const date = String(value || "").split(" ")[0];
  const [day, month, year] = date.split("/");
  return day && month && year ? `${year}-${month}-${day}` : "";
}
