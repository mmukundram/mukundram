// =============================================================================
// hub.js — renders the personal home page (root index.html) from siteConfig.
// =============================================================================

import { siteConfig } from "../../config/site.config.js";
import { mountChrome, renderCardGrid, el } from "./components.js";

mountChrome({ homeHref: "./" });

// Hero
const hero = document.getElementById("hero");
if (hero) {
  const h1 = el("h1");
  h1.textContent = siteConfig.name;
  const tagline = el("p");
  tagline.textContent = siteConfig.tagline;
  hero.append(h1, tagline);
}

// Mini-site cards
renderCardGrid(document.getElementById("minisites"), siteConfig.minisites);
