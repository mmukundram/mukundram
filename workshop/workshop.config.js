// =============================================================================
// Workshop mini-site configuration.
// -----------------------------------------------------------------------------
// A gallery of projects. A project can live anywhere:
//   - in this repo (a sub-folder, e.g. href: "some-project/")
//   - in its OWN repo with its own GitHub Pages site (href: full URL), which is
//     how large projects dodge the ~1 GB per-repo Pages limit.
//
// Add a project by dropping an entry into `projects` below.
// =============================================================================

export const workshopConfig = {
  title: "Workshop",
  subtitle: "Things I've built.",

  projects: [
    {
      id: "carnival",
      title: "Carnival",
      description: "A gaming arcade — a collection of small, vibe-coded games.",
      // Carnival lives in its own repo (its own Pages site) so its games get a
      // fresh 1 GB quota. Update this if you name the repo differently — the
      // path is case-sensitive and must match the repo name exactly.
      href: "https://mmukundram.github.io/carnival/",
      icon: "🎡",
      status: "live",
      newTab: true,
    },
    // ---- Future projects: copy the shape above ----
    // {
    //   id: "my-project",
    //   title: "My Project",
    //   description: "…",
    //   href: "https://mmukundram.github.io/my-project/",  // or "my-project/" if in this repo
    //   icon: "📦",
    //   status: "live",
    //   newTab: true,
    // },
  ],
};
