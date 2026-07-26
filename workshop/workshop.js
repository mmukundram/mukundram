// =============================================================================
// workshop.js — renders the Workshop project gallery from workshopConfig.
// =============================================================================

import { mountChrome, renderCardGrid, el } from "../assets/js/components.js";
import { workshopConfig } from "./workshop.config.js";

mountChrome({
  homeHref: "../",
  navLinks: [{ label: "Workshop", href: "./" }],
});

// Header block
const head = document.getElementById("workshop-head");
if (head) {
  const h1 = el("h1");
  h1.textContent = workshopConfig.title;
  const sub = el("p", "muted");
  sub.textContent = workshopConfig.subtitle;
  head.append(h1, sub);
}

// Project cards
const grid = document.getElementById("projects");
if (workshopConfig.projects.length === 0) {
  grid.innerHTML = `<p class="state">No projects yet — check back soon.</p>`;
} else {
  renderCardGrid(grid, workshopConfig.projects);
}
