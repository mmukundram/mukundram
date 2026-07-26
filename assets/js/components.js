// =============================================================================
// components.js
// -----------------------------------------------------------------------------
// Shared page "chrome" (header + footer + theme picker) used by every page and
// mini-site, so the look stays consistent and there's a single place to change
// it. Pages just include empty <header id="site-header"> / <footer
// id="site-footer"> mount points and call mountChrome().
// =============================================================================

import { siteConfig } from "../../config/site.config.js";
import { buildThemePicker } from "./theme-switcher.js";

/**
 * @param {Object} opts
 * @param {string} opts.homeHref  Relative path back to the site root from the
 *                                current page (e.g. "./" on the hub, "../" in a
 *                                mini-site).
 * @param {Array<{label:string, href:string}>} [opts.navLinks] Extra links to
 *                                show in the header (rendered before the picker).
 */
export function mountChrome({ homeHref = "./", navLinks = [] } = {}) {
  mountHeader(homeHref, navLinks);
  mountFooter();
}

function mountHeader(homeHref, navLinks) {
  const host = document.getElementById("site-header");
  if (!host) return;
  host.className = "site-header";

  const inner = el("div", "site-header__inner container");

  const brand = el("a", "brand");
  brand.href = homeHref;
  brand.textContent = siteConfig.name;

  const nav = el("nav", "header-nav");
  for (const link of navLinks) {
    const a = el("a", "nav-link");
    a.href = link.href;
    a.textContent = link.label;
    nav.appendChild(a);
  }
  // Theme picker lives at the end of the nav.
  buildThemePicker(nav);

  inner.append(brand, nav);
  host.appendChild(inner);
}

function mountFooter() {
  const host = document.getElementById("site-footer");
  if (!host) return;
  host.className = "site-footer";

  const inner = el("div", "site-footer__inner container");

  const left = el("span");
  left.textContent = `© ${new Date().getFullYear()} ${siteConfig.name}`;

  const right = el("span", "footer-links");
  siteConfig.social.forEach((s, i) => {
    if (i > 0) right.append(document.createTextNode("  ·  "));
    const a = el("a");
    a.href = s.href;
    a.textContent = s.label;
    if (s.href.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    right.appendChild(a);
  });

  inner.append(left, right);
  host.appendChild(inner);
}

/**
 * Render a grid of cards into `gridEl` from a list of items. Shared by the hub
 * (mini-sites) and the Workshop (projects) so both look and behave identically.
 *
 * Each item: { title, description, icon?, href?, status?, badge?, newTab? }
 *   - status "live"  -> clickable <a> card (needs href)
 *   - status "soon"  -> non-clickable card with a "Coming soon" badge
 *   - newTab: true   -> open href in a new tab (use for links to other repos)
 *   - badge          -> optional custom badge text on a live card
 */
export function renderCardGrid(gridEl, items) {
  if (!gridEl) return;
  for (const item of items) {
    const isLive = item.status === "live";
    const card = el(isLive ? "a" : "div", `card${isLive ? "" : " card--soon"}`);
    if (isLive) {
      card.href = item.href;
      if (item.newTab) {
        card.target = "_blank";
        card.rel = "noopener";
      }
    }

    const icon = el("div", "card__icon");
    icon.textContent = item.icon || "•";

    const title = el("h2", "card__title");
    title.textContent = item.title;

    const desc = el("p", "card__desc");
    desc.textContent = item.description;

    card.append(icon, title, desc);

    const badgeText = isLive ? item.badge : item.badge || "Coming soon";
    if (badgeText) {
      const badge = el("span", "card__badge");
      badge.textContent = badgeText;
      card.appendChild(badge);
    }

    gridEl.appendChild(card);
  }
}

// Small DOM helper.
export function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}
