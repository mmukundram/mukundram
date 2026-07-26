// =============================================================================
// post.js — renders a single post. Reads ?slug= from the URL, looks it up in
// the manifest, fetches its markdown file, and renders it with `marked`.
// =============================================================================

import { mountChrome, el } from "../assets/js/components.js";
import { thoughtLabConfig } from "./thought-lab.config.js";
import { marked } from "../assets/js/vendor/marked.esm.js";

mountChrome({
  homeHref: "../",
  navLinks: [{ label: "Thought Lab", href: "./" }],
});

const articleEl = document.getElementById("post");
const metaEl = document.getElementById("post-meta");

function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function fail(message) {
  articleEl.innerHTML = `<p class="state">${message}</p>
    <p><a class="back-link" href="./">← All posts</a></p>`;
}

async function render() {
  const slug = new URLSearchParams(location.search).get("slug");
  if (!slug) return fail("No post specified.");

  try {
    const manifestRes = await fetch(thoughtLabConfig.manifest, { cache: "no-cache" });
    if (!manifestRes.ok) throw new Error("manifest unavailable");
    const posts = await manifestRes.json();

    const post = posts.find((p) => p.slug === slug);
    if (!post) return fail("That post doesn't exist.");

    document.title = `${post.title} · Thought Lab`;

    const mdRes = await fetch(thoughtLabConfig.postsDir + post.file, { cache: "no-cache" });
    if (!mdRes.ok) throw new Error(`post file ${mdRes.status}`);
    const markdown = await mdRes.text();

    metaEl.textContent = fmtDate(post.date);

    const prose = el("div", "prose");
    prose.innerHTML = marked.parse(markdown);

    const back = el("a", "back-link");
    back.href = "./";
    back.textContent = "← All posts";

    // replaceChildren (not append) so the "Loading…" placeholder is removed.
    articleEl.replaceChildren(prose, back);
  } catch (err) {
    fail(`Couldn't load this post. ${err.message}`);
  }
}

render();
