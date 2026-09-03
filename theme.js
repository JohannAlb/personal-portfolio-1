const root = document.documentElement;

try {
    root.dataset.theme = localStorage.getItem("theme") || "dark";
} catch {
    root.dataset.theme = "dark";
}

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector("#theme-button");

    if (!themeToggle) {
        return;
    }

    const updateThemeToggle = () => {
        const isLight = root.dataset.theme === "light";

        themeToggle.setAttribute(
            "aria-label",
            `Switch to ${isLight ? "dark" : "light"} mode`,
        );
    };

    updateThemeToggle();

    themeToggle.addEventListener("click", () => {
        const newTheme = root.dataset.theme === "light" ? "dark" : "light";

        root.dataset.theme = newTheme;

        try {
            localStorage.setItem("theme", newTheme);
        } catch {
            // The theme still works when browser storage is unavailable.
        }

        updateThemeToggle();
    });
});
