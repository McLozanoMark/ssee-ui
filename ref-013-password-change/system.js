const accountTrigger = document.getElementById("accountMenuTrigger");
const accountMenu = document.getElementById("accountMenu");
const backHome = () => { window.location.href = "welcome.html?auth=autoregistro"; };

accountTrigger.addEventListener("click", () => {
  const isOpening = accountMenu.hidden;
  accountMenu.hidden = !isOpening;
  accountTrigger.setAttribute("aria-expanded", String(isOpening));
});

document.addEventListener("click", (event) => {
  if (accountMenu.hidden || accountMenu.contains(event.target) || accountTrigger.contains(event.target)) return;
  accountMenu.hidden = true;
  accountTrigger.setAttribute("aria-expanded", "false");
});

document.getElementById("backHomeOption").addEventListener("click", backHome);
document.getElementById("cancelPassword").addEventListener("click", backHome);
document.getElementById("returnHome").addEventListener("click", backHome);
