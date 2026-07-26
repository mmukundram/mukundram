# mukundram — personal website

A personal home page that acts as a **hub linking to several mini-sites**. The
first mini-site is **Thought Lab**, a personal blog (in the `thought-lab/`
folder). The whole thing is plain static HTML/CSS/JS — no build step, no
framework — so GitHub Pages can serve it directly.

Key features:

- **Modular mini-sites** — each lives in its own folder and is added via config.
- **User-selectable themes** — a theme picker in the header, remembered across
  every mini-site.
- **Config-driven** — add sites, themes, and posts by editing data files,
  not markup.

## Structure

```
.
├── index.html                # personal hub (renders itself from config)
├── 404.html                  # custom not-found page
├── .nojekyll                 # serve files as-is (no Jekyll processing)
├── config/
│   ├── site.config.js        # site name, socials, mini-site registry
│   └── themes.config.js      # list of themes + default
├── assets/
│   ├── css/
│   │   ├── base.css          # layout + components (uses theme variables)
│   │   ├── themes.css        # @imports each theme file
│   │   └── themes/           # one file per theme (light, dark, …)
│   └── js/
│       ├── theme-switcher.js # applies + persists theme, builds the picker
│       ├── components.js     # shared chrome + card-grid renderer
│       ├── hub.js            # renders the home page from config
│       └── vendor/
│           └── marked.esm.js # markdown parser (MIT), vendored — no CDN needed
├── thought-lab/             # ── mini-site: the blog ──
│   ├── index.html            # post list
│   ├── post.html             # single-post reader (?slug=…)
│   ├── thought-lab.config.js
│   ├── thought-lab.js / post.js
│   └── posts/
│       ├── posts.json        # manifest of posts
│       └── *.md              # posts, written in Markdown
└── workshop/                # ── mini-site: project gallery ──
    ├── index.html
    ├── workshop.config.js    # list of projects (local folders or other repos)
    └── workshop.js
```

### Projects that live in their own repo

A project can be a sub-folder here, or its **own repository with its own GitHub
Pages site** — the Workshop just links to it. That's the recommended path for
anything large (e.g. a games arcade full of assets): a separate repo gets a fresh
**~1 GB Pages quota**, so big projects don't count against this site's limit.
Because every one of these sites is served from the same `mmukundram.github.io`
domain, the theme choice (stored in `localStorage`) even carries across them.

Example: **Carnival** (a games arcade) lives in its own `carnival` repo and is
listed in `workshop/workshop.config.js` as a full-URL link.

## How it works

### Deliberately boring, on purpose

The site is **plain HTML, CSS, and a bit of JavaScript** — no build step, no
framework, served straight from GitHub Pages. That means there's nothing to
break in CI, nothing to `npm install`, and editing a file shows the result
immediately. The whole approach optimizes for one thing: that it stays easy
enough to keep using.

The repository is a **hub** at the root that links out to independent
**mini-sites**, each in its own folder. The hub renders its own list of
mini-site cards from `config/site.config.js`, so adding one is a data change,
not a markup change.

### Theming

Every color on the page comes from a CSS custom property, so a "theme" is just a
small file that sets those variables:

```css
[data-theme="dark"] {
  --bg:     #0f1115;
  --text:   #e6e8ec;
  --accent: #6d8bff;
}
```

The theme picker in the header writes the chosen `data-theme` onto the page's
root element and remembers it in `localStorage`, so the choice **follows the
visitor across every mini-site**. A tiny inline script in each page's `<head>`
applies the saved theme before first paint, avoiding a flash of the wrong theme.
Because `base.css` never hard-codes a color — it only reads the variables —
every page re-themes at once. (See "Add a theme" below for the three steps to
add one.)

## Running locally

Because the pages use ES modules and `fetch`, open them through a local server
(not `file://`):

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How to extend

### Add a post
1. Create `thought-lab/posts/<slug>.md`.
2. Add an entry to `thought-lab/posts/posts.json` (`slug`, `title`, `date`,
   `excerpt`, `file`). Newest date sorts to the top automatically.

### Add a theme
1. Create `assets/css/themes/<id>.css` defining the CSS variables (copy an
   existing theme as a template).
2. Add `@import "themes/<id>.css";` to `assets/css/themes.css`.
3. Register `{ id: "<id>", label: "…" }` in `config/themes.config.js`.

The picker and every page pick it up automatically.

### Add a new mini-site
1. Create a folder, e.g. `projects/`, with its own `index.html`. Reuse the
   shared assets — link `../assets/css/…` and import
   `../assets/js/components.js` and call `mountChrome({ homeHref: "../" })` to
   get the same header/footer and theme picker.
2. Add an entry to `minisites` in `config/site.config.js` and set
   `status: "live"`.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`.

For the cleanest URLs, host it as a **user site** in a repo named
`<username>.github.io` (served at `https://<username>.github.io/`). Paths in the
pages are relative, so a project repo (served under `/<repo>/`) also works — the
only exception is `404.html`, which uses root-relative paths tuned for a user
site; adjust them if you deploy under a subpath.

## Notes

- The only third-party code is `marked` (Markdown → HTML), vendored locally
  under `assets/js/vendor/` so there is no runtime CDN dependency.
