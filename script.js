const projects = [
  {
    name: "Wanderlust",
    featured: true,
    lane: "AI product",
    filters: ["ai"],
    summary:
      "Collaborative AI travel planning with route boards, stay comparison, itinerary editing, and a live consumer product surface.",
    proof:
      "Proves consumer product thinking, AI-assisted workflows, and the ability to shape a fuzzy idea into a real interface.",
    state: "Live product",
    links: [
      { label: "Open live", href: "https://travel.miodragdev.com" },
    ],
  },
  {
    name: "MiodragDev Portal",
    featured: true,
    lane: "Ops system",
    filters: ["ops", "client"],
    summary:
      "Multi-client retainer tracking, work request management, contracts, invoices, and admin-facing delivery visibility.",
    proof:
      "Proves productizing service workflows, client-safe state, and operational software that people actually use to manage work.",
    state: "Live portal",
    links: [
      { label: "Open portal", href: "https://miodragdev-portal.vercel.app" },
      {
        label: "Desktop downloads",
        href: "https://github.com/MiodragMTasic/miodragdev-portal-downloads",
      },
    ],
  },
  {
    name: "GetClouds + GCCRM",
    featured: true,
    lane: "Commerce + ops",
    filters: ["ops", "client"],
    summary:
      "Customer-facing Shopify work plus an internal CRM that uses Shopify as the source of truth and layers writable workflows on top.",
    proof:
      "Proves real business systems work across both surfaces: commerce UX, sync boundaries, lead and list tooling, recovery flows, and internal operations UX.",
    state: "Live site + private CRM",
    links: [{ label: "Open site", href: "https://getclouds.ca" }],
    note:
      "The storefront is public. The internal CRM is private, which is exactly how real operating software often works.",
  },
  {
    name: "SwiftNotes",
    featured: true,
    lane: "Desktop product",
    filters: ["desktop", "lab"],
    summary:
      "Docked local-first macOS workspace with notes, tasks, clipboard, links, plugin bar, stock ticker, and a tiny game subsystem.",
    proof:
      "Proves desktop range, native shell thinking, and the ability to design around constrained screen real estate instead of default full-window patterns.",
    state: "Public repo + DMG",
    links: [
      { label: "GitHub", href: "https://github.com/MiodragMTasic/SwiftNotes" },
      {
        label: "Download DMG",
        href: "https://github.com/MiodragMTasic/SwiftNotes/releases/latest/download/SwiftNotes.dmg",
      },
    ],
  },
  {
    name: "LoLPerformance",
    lane: "Analytics lab",
    filters: ["experiments"],
    summary:
      "League of Legends performance analysis system built around match-history parsing, player tendencies, achievement logic, and coaching-style feedback from noisy game data.",
    state: "Legacy or private",
    links: [],
  },
  {
    name: "Command Center",
    lane: "Ops lab",
    filters: ["systems", "experiments"],
    summary:
      "Operator-facing system concept where an in-app assistant saves unresolved requests to the database and an autonomous cloud engineer loop checks that queue, makes product changes, and pushes them live.",
    state: "Paused",
    links: [],
  },
  {
    name: "RentEZ (hackathon)",
    lane: "Hackathon build",
    filters: ["experiments"],
    summary:
      "Landlord-tenant review platform with auth, file upload, and review workflows built end to end under hackathon time pressure.",
    state: "Public repo",
    links: [{ label: "GitHub", href: "https://github.com/miodragmtasic/RentEZ" }],
  },
  {
    name: "Diana Go Studio",
    lane: "Client site",
    filters: ["sites"],
    summary:
      "Editorial hospitality website for Diana Go, centered on classes, gatherings, inquiry flow, and a warmer brand posture.",
    state: "Live site",
    links: [{ label: "Open site", href: "https://dianas-website.vercel.app" }],
  },
  {
    name: "miodragdev.com / architect website",
    lane: "Portfolio system",
    filters: ["sites"],
    summary:
      "Previous studio site system used to test portfolio structure, concept demos, and reusable presentation directions.",
    state: "Live site",
    links: [{ label: "Open site", href: "https://www.miodragdev.com/" }],
  },
  {
    name: "Course website",
    lane: "Teaching build",
    filters: ["sites"],
    summary:
      "Course site organized around weekly material, office hours, and supporting resources for fast scanning.",
    state: "Live site",
    links: [
      {
        label: "Open site",
        href: "https://course-website-lemon.vercel.app",
      },
    ],
  },
];

const projectList = document.getElementById("project-list");
const filterButtons = Array.from(document.querySelectorAll(".filter-chip"));
const indexProjects = projects.filter((project) => !project.featured);

function makeLinks(links) {
  if (!links.length) {
    return '<span class="quiet-link">Walkthrough on request.</span>';
  }

  return `<div class="project-links">${links
    .map(
      (link) =>
        `<a class="project-link" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`
    )
    .join("")}</div>`;
}

function renderProjects(activeFilter) {
  projectList.innerHTML = indexProjects
    .map((project) => {
      const visible =
        activeFilter === "all" || project.filters.includes(activeFilter);

      return `
        <article class="project-card ${visible ? "" : "hidden"}" data-filters="${project.filters.join(" ")}">
          <h3 class="project-title">${project.name}</h3>
          <div class="project-topline">
            <span class="project-lane">${project.lane}</span>
            <span class="project-state">${project.state}</span>
          </div>
          <p class="project-summary">${project.summary}</p>
          <div class="project-bottom">
            ${makeLinks(project.links)}
          </div>
        </article>
      `;
    })
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    renderProjects(filter);
  });
});

filterButtons.forEach((button) => {
  button.setAttribute(
    "aria-pressed",
    button.classList.contains("active") ? "true" : "false"
  );
});

renderProjects("all");
