// Tema chiaro/scuro
const toggle = document.getElementById("darkmode-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");
const body = document.body;
let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setDarkMode(on) {
  body.classList.toggle("dark", on);
  themeIcon.className = on ? "fa-solid fa-sun" : "fa-solid fa-moon";
  themeLabel.textContent = on ? "Tema chiaro" : "Tema scuro";
}
setDarkMode(dark);

toggle.addEventListener("click", () => {
  dark = !body.classList.contains("dark");
  setDarkMode(dark);
});

// Switch lingua
function switchLanguage(lang) {
  document
    .getElementById("policy-it")
    .classList.toggle("hidden", lang !== "it");
  document
    .getElementById("policy-en")
    .classList.toggle("hidden", lang !== "en");
}

// Hamburger menu e overlay
const hamburger = document.getElementById("hamburger-toggle");
const controlsMenu = document.getElementById("main-menu");
const menuOverlay = document.getElementById("menu-overlay");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = !controlsMenu.classList.contains("open");
  controlsMenu.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", open ? "true" : "false");
  body.classList.toggle("menu-open", open);
  menuOverlay.classList.toggle("active", open);
  toggle.classList.toggle("in-menu", open && window.innerWidth <= 800);
});

document.addEventListener("click", function (e) {
  if (
    controlsMenu.classList.contains("open") &&
    window.innerWidth <= 800 &&
    !controlsMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    controlsMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
    menuOverlay.classList.remove("active");
    toggle.classList.remove("in-menu");
  }
});