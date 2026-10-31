document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isEditable = target instanceof HTMLElement &&
        (target.isContentEditable || target.matches("input, textarea, select"));

    if (event.key === "0" && !event.altKey && !event.ctrlKey && !event.metaKey && !isEditable) {
        window.location.assign("https://www.google.com/");
    }
});
