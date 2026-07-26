// =============================================================================
// Theme registry
// -----------------------------------------------------------------------------
// The list of themes offered to the visitor in the theme picker. Each entry
// maps to a `[data-theme="<id>"]` block of CSS variables.
//
// To add a theme:
//   1. Create  assets/css/themes/<id>.css  defining the variables.
//   2. Add an @import for it in  assets/css/themes.css
//   3. Register it here.
// That's it — every page picks it up automatically.
// =============================================================================

export const themes = [
  { id: "light",     label: "Light" },
  { id: "dark",      label: "Dark" },
  { id: "solarized", label: "Solarized" },
  { id: "terminal",  label: "Terminal" },
];

// Theme used on first visit (before the user picks one).
export const defaultTheme = "light";

// localStorage key used to remember the visitor's choice across mini-sites.
export const STORAGE_KEY = "site-theme";
