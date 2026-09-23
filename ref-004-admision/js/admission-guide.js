(function () {
  const guide = document.getElementById("admissionGuide");
  const cursor = document.getElementById("admissionCursor");
  const target = document.getElementById("newUserBtn");
  if (!guide || !cursor || !target) return;
  if (new URLSearchParams(window.location.search).get("admitted") === "1") {
    guide.remove();
    cursor.remove();
    return;
  }
  const box = target.getBoundingClientRect();
  cursor.style.left = `${box.left + box.width / 2 - 8}px`;
  cursor.style.top = `${box.top + box.height / 2 - 8}px`;
  requestAnimationFrame(() => cursor.classList.add("is-visible"));
  target.addEventListener("click", () => cursor.classList.remove("is-visible"));
})();
