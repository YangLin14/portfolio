// --- Theme Switcher ---
const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");

// On page load, check for a saved theme in localStorage
if (currentTheme) {
    // If a theme is saved, apply it
    document.documentElement.setAttribute("data-theme", currentTheme);

    // If the saved theme is light, make sure the toggle switch is checked
    if (currentTheme === "light") {
        toggleSwitch.checked = true;
    }
} else {
    // If no theme is saved (new visitor), default to dark mode
    document.documentElement.setAttribute("data-theme", "dark");
}

// Function to switch the theme
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light"); // Save the theme preference
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark"); // Save the theme preference
    }
}

// Add event listener to the toggle switch
toggleSwitch.addEventListener("change", switchTheme, false);

// --- Smooth scrolling for navigation links ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

// --- Set current year in footer ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- Live Clock for Taipei ---
function updateTime() {
    const timeElement = document.getElementById("location-time");
    const now = new Date();
    const options = {
        timeZone: "Asia/Taipei",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    const taipeiTime = new Intl.DateTimeFormat("en-US", options).format(now);
    timeElement.textContent = `Xinyi District, Taipei | ${taipeiTime}`;
}

// Initial call to display the time immediately
updateTime();
// Update the time every minute
setInterval(updateTime, 60000);
