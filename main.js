// Tema chiaro/scuro
const toggle = document.getElementById("darkmode-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");
// Hamburger menu e overlay
const hamburger = document.getElementById("hamburger-toggle");
const controlsMenu = document.getElementById("main-menu");
const menuOverlay = document.getElementById("menu-overlay");

const body = document.body;
let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Preferenza tema da localStorage
const savedTheme = localStorage.getItem("notedown-theme");
if (savedTheme) dark = savedTheme === "dark";

// Applica lingua salvata o default all'avvio
const savedLang = localStorage.getItem("notedown-lang") || "it";

function setDarkMode(on, update = false) {
  const currentLang = document.querySelector('.language-switcher').value;
  const lightTheme = currentLang === "it" ? "Tema chiaro" : "Light theme";
  const darkTheme = currentLang === "it" ? "Tema scuro" : "Dark theme";
  body.classList.toggle("dark", on);
  themeIcon.className = on ? "fa-solid fa-sun" : "fa-solid fa-moon";
  themeLabel.textContent = on ? darkTheme : lightTheme;
  localStorage.setItem("notedown-theme", on ? "dark" : "light");
}

// Switch lingua con salvataggio preferenza
function switchLanguage(lang, save = true) {
  document.getElementById("policy-it").classList.toggle("hidden", lang !== "it");
  document.getElementById("policy-en").classList.toggle("hidden", lang !== "en");
  document.querySelector('.language-switcher').value = lang;
  if (save) localStorage.setItem("notedown-lang", lang);

  // Chiudi il menu su mobile
  if (window.innerWidth <= 800 && controlsMenu.classList.contains("open")) {
    controlsMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
    menuOverlay.classList.remove("active");
    toggle.classList.remove("in-menu");
  }
}

// Inizializza tema e lingua
setDarkMode(dark);
switchLanguage(savedLang, false);

toggle.addEventListener("click", () => {
  dark = !body.classList.contains("dark");
  setDarkMode(dark);

  // Chiudi il menu se aperto su mobile
  if (window.innerWidth <= 800 && controlsMenu.classList.contains("open")) {
    controlsMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
    menuOverlay.classList.remove("active");
    toggle.classList.remove("in-menu");
  }
});

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = !controlsMenu.classList.contains("open");
  controlsMenu.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", open ? "true" : "false");
  body.classList.toggle("menu-open", open);
  menuOverlay.classList.toggle("active", open);
  toggle.classList.toggle("in-menu", open && window.innerWidth <= 800);
  setDarkMode(dark, false);
});

menuOverlay.addEventListener("click", function () {
  if (controlsMenu.classList.contains("open") && window.innerWidth <= 800) {
    controlsMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
    menuOverlay.classList.remove("active");
    toggle.classList.remove("in-menu");
  }
});

// Event listener su select lingua
document.querySelector('.language-switcher').addEventListener('change', function (e) {
  switchLanguage(this.value, true);
});

