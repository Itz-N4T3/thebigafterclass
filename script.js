document.addEventListener("keydown", (event) => {
    if (event.key === "0") {
        window.location.assign("https://www.google.com/");
    }
});

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
    const applyTheme = (theme) => {
        const isLight = theme === "light";
        document.documentElement.dataset.theme = isLight ? "light" : "dark";
        themeToggle.textContent = isLight ? "☾" : "☼";
        themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} mode`);
        themeToggle.title = `Switch to ${isLight ? "dark" : "light"} mode`;
        themeToggle.setAttribute("aria-pressed", String(isLight));
    };

    applyTheme(document.documentElement.dataset.theme);

    themeToggle.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
        applyTheme(nextTheme);
        localStorage.setItem("afterclass-theme", nextTheme);
    });
}

const searchInput = document.querySelector(".site-search input");
const resourceCards = document.querySelectorAll(".resource-card");
const searchResults = document.querySelector(".search-results");

if (searchInput && resourceCards.length > 0 && searchResults) {
    const searchParams = new URLSearchParams(window.location.search);
    const initialQuery = searchParams.get("search") || "";
    searchInput.value = initialQuery;

    const filterResources = () => {
        const query = searchInput.value.trim().toLocaleLowerCase();
        let visibleCount = 0;

        resourceCards.forEach((card) => {
            const title = card.querySelector("img")?.alt.toLocaleLowerCase() || "";
            const isMatch = title.includes(query);
            card.hidden = !isMatch;
            visibleCount += isMatch ? 1 : 0;
        });

        searchResults.hidden = query.length === 0;
        searchResults.textContent = query.length === 0
            ? ""
            : visibleCount === 0
                ? `No resources found for "${searchInput.value.trim()}".`
                : `${visibleCount} ${visibleCount === 1 ? "resource" : "resources"} found.`;
    };

    searchInput.addEventListener("input", filterResources);
    filterResources();
}
