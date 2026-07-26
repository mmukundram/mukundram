// =============================================================================
// thought-lab.js — renders the Thought Lab index (list of posts) from posts.json.
// =============================================================================

import { mountChrome, el } from "../assets/js/components.js";
import { thoughtLabConfig } from "./thought-lab.config.js";

mountChrome({
  homeHref: "../",
  navLinks: [{ label: "Thought Lab", href: "./" }],
});

// Header block
const head = document.getElementById("thought-lab-head");
if (head) {
  const h1 = el("h1");
  h1.textContent = thoughtLabConfig.title;
  const sub = el("p", "muted");
  sub.textContent = thoughtLabConfig.subtitle;
  head.append(h1, sub);
}

const listEl = document.getElementById("post-list");

function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

async function render() {
  try {
    const res = await fetch(thoughtLabConfig.manifest, { cache: "no-cache" });
    if (!res.ok) throw new Error(`manifest ${res.status}`);
    const posts = await res.json();

    posts.sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first

    if (posts.length === 0) {
      listEl.innerHTML = `<li class="state">No posts yet — check back soon.</li>`;
      return;
    }

    listEl.innerHTML = "";
    for (const post of posts) {
      const li = el("li", "post-list__item");

      const title = el("h2", "post-list__title");
      const link = el("a");
      link.href = `post.html?slug=${encodeURIComponent(post.slug)}`;
      link.textContent = post.title;
      title.appendChild(link);

      const meta = el("div", "post-list__meta");
      meta.textContent = fmtDate(post.date);

      li.append(title, meta);

      if (post.excerpt) {
        const ex = el("p", "post-list__excerpt");
        ex.textContent = post.excerpt;
        li.appendChild(ex);
      }
      listEl.appendChild(li);
    }
  } catch (err) {
    listEl.innerHTML = `<li class="state">Couldn't load posts. ${err.message}</li>`;
  }
}

render();
