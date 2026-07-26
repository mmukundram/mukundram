// =============================================================================
// Global site configuration
// -----------------------------------------------------------------------------
// This is the single source of truth for the personal hub (the root landing
// page). Add a new mini-site by dropping another entry into `minisites` below —
// no HTML changes required, the hub renders itself from this list.
// =============================================================================

export const siteConfig = {
  name: "Mukundram",
  tagline: "Personal home base — a hub for my mini-sites and experiments.",
  email: "mmukundram@gmail.com",

  // Links shown in the footer / anywhere social links are rendered.
  social: [
    { label: "Email", href: "mailto:mmukundram@gmail.com" },
  ],

  // Each mini-site is an independent sub-folder in this repo. `href` is relative
  // to the site root. `status` controls how the card is presented:
  //   "live"    -> clickable card
  //   "soon"    -> shown but marked as coming soon (not linked)
  minisites: [
    {
      id: "thought-lab",
      title: "Thought Lab",
      description: "Notes, essays, and things I'm figuring out.",
      href: "thought-lab/",
      icon: "✍️",
      status: "live",
    },
    // ---- Future mini-sites: copy the shape above ----
    {
      id: "workshop",
      title: "Workshop",
      description: "A gallery of things I've built.",
      href: "workshop/",
      icon: "🛠️",
      status: "live",
    },
    {
      id: "content-cache",
      title: "Content Cache",
      description: "Bookmarks, references, and things worth keeping.",
      href: "content-cache/",
      icon: "🗂️",
      status: "soon",
    },
  ],
};
