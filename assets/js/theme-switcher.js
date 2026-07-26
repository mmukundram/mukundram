// =============================================================================
// theme-switcher.js
// -----------------------------------------------------------------------------
// Applies + persists the visitor's chosen theme, and wires up a <select>
// theme picker. Works across every mini-site because the choice is stored in
// localStorage under a shared key.
//
// NOTE: To avoid a flash of the wrong theme, each page also runs a tiny inline
// script in <head> that sets data-theme *before* first paint. This module is
// the full, config-driven version that also builds the picker UI.
// =============================================================================

import { themes, defaultTheme, STORAGE_KEY } from "../../config/themes.config.js";

export function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || defaultTheme;
  } catch {
    return defaultTheme;
  }
}

export function applyTheme(id) {
  const known = themes.some((t) => t.id === id) ? id : defaultTheme;
  document.documentElement.setAttribute("data-theme", known);
  try {
    localStorage.setItem(STORAGE_KEY, known);
  } catch {
    /* private mode / storage disabled — theme still applies for this session */
  }
}

// Build a labelled <select> populated from the theme registry and attach it to
// `mountEl`. Returns the created <select> element.
export function buildThemePicker(mountEl) {
  const wrap = document.createElement("label");
  wrap.className = "theme-picker";
  wrap.setAttribute("title", "Change theme");

  const caption = document.createElement("span");
  caption.textContent = "Theme";
  caption.setAttribute("aria-hidden", "false");

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Select color theme");

  for (const t of themes) {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = t.label;
    select.appendChild(opt);
  }

  select.value = getSavedTheme();
  select.addEventListener("change", () => applyTheme(select.value));

  wrap.append(caption, select);
  mountEl.appendChild(wrap);
  return select;
}

// Apply the saved theme immediately on import (in case the inline head script
// was absent or a newer choice exists).
applyTheme(getSavedTheme());
