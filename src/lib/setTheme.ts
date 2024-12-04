export function setShadowElementTheme(
    shadowRoot: ShadowRoot | undefined | null
) {
    if (!shadowRoot) return

    // modewatcher is not working in shadow dom
    const theme = window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"

    if (theme === "dark")
        shadowRoot?.querySelector("html")?.classList.add("dark")
}
