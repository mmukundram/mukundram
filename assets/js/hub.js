// =============================================================================
// hub.js — renders the personal home page (root index.html) from siteConfig.
// =============================================================================

import { siteConfig } from "../../config/site.config.js";
import { mountChrome, el } from "./components.js";

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
const grid = document.getElementById("minisites");
if (grid) {
  for (const site of siteConfig.minisites) {
    const isLive = site.status === "live";
    const card = el(isLive ? "a" : "div", `card${isLive ? "" : " card--soon"}`);
    if (isLive) card.href = site.href;

    const icon = el("div", "card__icon");
    icon.textContent = site.icon || "•";

    const title = el("h2", "card__title");
    title.textContent = site.title;

    const desc = el("p", "card__desc");
    desc.textContent = site.description;

    card.append(icon, title, desc);

    if (!isLive) {
      const badge = el("span", "card__badge");
      badge.textContent = "Coming soon";
      card.appendChild(badge);
    }
    grid.appendChild(card);
  }
}
