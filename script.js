// ===== 1. TYPING ANIMATION =====
const typingEl = document.getElementById("typing");
const words = ["Full Stack Developer", "Web Developer", "BSc IT Student"];
let w = 0, c = 0, deleting = false;
function type() {
  const word = words[w];
  typingEl.textContent = deleting ? word.slice(0, --c) : word.slice(0, ++c);
  let delay = deleting ? 45 : 95;
  if (!deleting && c === word.length) { delay = 1600; deleting = true; }
  else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 400; }
  setTimeout(type, delay);
}
type();

// ===== 2. MOBILE MENU =====
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
}
menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

// ===== 3. THEME TOGGLE (dark by default, saved in localStorage) =====
const themeBtn = document.getElementById("theme-toggle");
function setTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  themeBtn.innerHTML = t === "dark" ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let saved = "dark";
try { saved = localStorage.getItem("theme") || "dark"; } catch (e) {}
setTheme(saved);
themeBtn.addEventListener("click", () => setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"));

// ===== 4. NAVBAR STYLE, ACTIVE LINK, SCROLL-TO-TOP =====
const navbar = document.getElementById("navbar");
const toTop = document.getElementById("to-top");
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");
function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  toTop.classList.toggle("show", window.scrollY > 500);
  const pos = window.scrollY + 140;
  sections.forEach(s => {
    if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight)
      navItems.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + s.id));
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== 5. SCROLL REVEAL =====
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ===== 6. PROJECT CARD GLOW FOLLOWS THE CURSOR =====
document.querySelectorAll(".project").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  });
});

// ===== 7. FOOTER YEAR =====
document.getElementById("year").textContent = new Date().getFullYear();