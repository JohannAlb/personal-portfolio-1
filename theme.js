const themeToggle = document.querySelector("#theme-button");
const root = document.documentElement;

const updateThemeToggle = () => {
    const isLight = root.dataset.theme === "light";

    themeToggle.setAttribute(
        "aria-label",
        `Switch to ${isLight ? "dark" : "light"} mode`,
    );
};

if (themeToggle) {
    updateThemeToggle();

    themeToggle.addEventListener("click", () => {
        const newTheme = root.dataset.theme === "light" ? "dark" : "light";

        root.dataset.theme = newTheme;

        try {
            localStorage.setItem("theme", newTheme);

            const bannerImg = document.querySelector("#banner-img");
            if(newTheme == "light"){
                bannerImg.src = "./img/banner-clouds.webp";
            } else{
                bannerImg.src = "./img/banner-firework.webp";
            }
        } catch {
            // The theme still works when browser storage is unavailable.
        }

        updateThemeToggle();
    });
}
