// --- Theme Toggle ---
const themeToggle = document.getElementById("theme-toggle");

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) {
        themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
        themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }
}

// Initialize theme from localStorage or system preference
const saved = localStorage.getItem("theme");
if (saved) {
    setTheme(saved);
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    setTheme("light");
} else {
    setTheme("dark");
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        setTheme(current === "dark" ? "light" : "dark");
    });
}

// --- Smooth scrolling for navigation links ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// --- Active nav link tracking (only on index page) ---
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
const sections = [];

navLinks.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);
    if (section) sections.push({ link, section });
});

function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    let current = null;

    sections.forEach(({ link, section }) => {
        if (section.offsetTop <= scrollPos) {
            current = link;
        }
    });

    navLinks.forEach((link) => link.classList.remove("active"));
    if (current) current.classList.add("active");
}

if (sections.length > 0) {
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();
}

// --- Scroll reveal animations ---
const revealElements = document.querySelectorAll(
    ".project-card, .timeline-item, .about-container, .features-grid article, .project-section, .contact-section"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((el) => {
    el.classList.add("reveal-on-scroll");
    revealObserver.observe(el);
});

// --- Set current year in footer ---
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// --- Live Clock for California ---
function updateTime() {
    const timeElement = document.getElementById("location-time");
    if (!timeElement) return;
    const now = new Date();
    const options = {
        timeZone: "America/Los_Angeles",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    const caTime = new Intl.DateTimeFormat("en-US", options).format(now);
    timeElement.textContent = `California, USA | ${caTime}`;
}

updateTime();
setInterval(updateTime, 60000);
