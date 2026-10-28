/*
 * Personal details live here so the page can be customized without hunting
 * through the markup. Empty URLs are omitted from the rendered page.
 */
const SITE_CONFIG = {
  name: "Jatin Bisht",
  email: "jatinbisht003uk@gmail.com",
  profiles: {
    github: "https://github.com/jatinbisht003uk",
    linkedin: "https://www.linkedin.com/in/jatin-bisht-33580b2b7/",
    leetcode: "https://leetcode.com/u/jatin_bisht/",
  },
  resumePath: "assets/resume.pdf",
  projects: [
    {
      title: "ChurnGuardAI",
      category: "Machine Learning",
      description: "An interactive customer churn prediction application that identifies customers who may be at risk of leaving, with model evaluation, churn analytics, and visual insights.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
      repository: "https://github.com/jatinbisht003uk/ChurnGuardAI",
      demo: "https://churnguard-ai-ml.streamlit.app/",
      image: "assets/projects/churnguard.svg",
      featured: true,
      status: "Live demo",
    },
    {
      title: "SketchSync",
      category: "Web Development",
      description: "A real-time collaborative drawing app where people can create together on a shared canvas.",
      technologies: ["HTML", "CSS", "JavaScript", "Socket.IO"],
      repository: "https://github.com/jatinbisht003uk/sketchsync",
      demo: "https://sketchsyncn.netlify.app/",
      image: "assets/projects/whiteboard.svg",
      featured: false,
      status: "Live demo",
    },
    {
      title: "AlgoVisualizer",
      category: "Tools",
      description: "An interactive tool for visualizing algorithms and exploring data structures step by step.",
      technologies: ["React", "JavaScript", "C++", "Monaco Editor"],
      repository: "https://github.com/jatinbisht003uk/AlgoVisualizer",
      demo: "https://algovisualizere.netlify.app/",
      image: "assets/projects/koda.svg",
      featured: false,
      status: "Live demo",
    },
  ],
  skills: [
    { category: "Programming", items: ["Python", "Java", "C++", "SQL"] },
    { category: "Data Science & ML", items: ["Pandas", "NumPy", "Scikit-learn", "Data Analysis"] },
    { category: "Web Development", items: ["HTML", "CSS", "JavaScript", "Streamlit"] },
    { category: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "Jupyter Notebook"] },
  ],
  journey: [
    { date: "ONGOING", title: "Software & data projects", detail: "Learning by building practical applications across web development, data science, and machine learning.", kind: "Projects" },
    { date: "ADD DATES", title: "Education", detail: "Add your qualification, institution, and dates here when ready.", kind: "Education", placeholder: true },
    { date: "ADD DATES", title: "Work experience", detail: "Add relevant internships or work experience here. This entry is hidden until you provide details.", kind: "Experience", placeholder: true },
  ],
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function make(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function safeExternalLink(url) {
  if (!url || url.startsWith("[ADD_") || url.startsWith("YOUR_")) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : null;
  } catch {
    return null;
  }
}

function renderSkills() {
  const grid = $("[data-skill-grid]");
  if (!grid) return;
  SITE_CONFIG.skills.forEach((group) => {
    const card = make("article", "skill-card reveal");
    const heading = make("h3", "", group.category);
    const chips = make("ul", "skill-tags");
    group.items.forEach((skill) => chips.append(make("li", "", skill)));
    card.append(heading, chips);
    grid.append(card);
  });
}

function createProjectCard(project, index) {
  const card = make("article", "project-card reveal");
  card.dataset.category = project.category;
  card.style.setProperty("--card-index", index);

  const visual = make("div", "project-visual");
  const image = document.createElement("img");
  image.src = project.image;
  image.alt = `${project.title} project illustration`;
  image.loading = "lazy";
  image.width = 520;
  image.height = 300;
  visual.append(image);
  const badges = make("div", "project-badges");
  if (project.featured) badges.append(make("span", "badge badge-featured", "Featured"));
  badges.append(make("span", "badge", project.status));
  visual.append(badges);

  const content = make("div", "project-content");
  const category = make("p", "project-category", project.category.toUpperCase());
  const title = make("h3", "", project.title);
  const description = make("p", "project-description", project.description);
  const tags = make("ul", "tag-list");
  project.technologies.forEach((technology) => tags.append(make("li", "", technology)));
  const links = make("div", "project-links");
  const repository = safeExternalLink(project.repository);
  const demo = safeExternalLink(project.demo);
  if (repository) {
    const link = make("a", "project-link", "GitHub ↗");
    link.href = repository;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    links.append(link);
  }
  if (demo) {
    const link = make("a", "project-link project-link-demo", "Live demo ↗");
    link.href = demo;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    links.append(link);
  }
  if (!repository && !demo) links.append(make("span", "project-unavailable", "Links not provided"));
  content.append(category, title, description, tags, links);
  card.append(visual, content);
  return card;
}

function renderProjects() {
  const grid = $("[data-project-grid]");
  const filterGroup = $("[data-project-filters]");
  if (!grid || !filterGroup) return;
  const categories = ["All", "Machine Learning", "Data Science", "Web Development", "Tools"];
  let selected = "All";

  const render = () => {
    grid.classList.add("is-changing");
    window.setTimeout(() => {
      grid.replaceChildren();
      SITE_CONFIG.projects
        .filter((project) => selected === "All" || project.category === selected)
        .forEach((project, index) => grid.append(createProjectCard(project, index)));
      grid.classList.remove("is-changing");
      observeReveals(grid);
    }, 120);
  };

  categories.forEach((category) => {
    const button = make("button", "filter-button", category);
    button.type = "button";
    button.setAttribute("aria-pressed", String(category === selected));
    button.addEventListener("click", () => {
      selected = category;
      $$("button", filterGroup).forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      render();
    });
    filterGroup.append(button);
  });
  render();
}

function renderJourney() {
  const timeline = $("[data-timeline]");
  if (!timeline) return;
  SITE_CONFIG.journey.filter((entry) => !entry.placeholder).forEach((entry) => {
    const item = make("article", "timeline-item reveal");
    const date = make("p", "timeline-date", entry.date);
    const title = make("h3", "", entry.title);
    const kind = make("span", "timeline-kind", entry.kind);
    const detail = make("p", "timeline-detail", entry.detail);
    item.append(date, title, kind, detail);
    timeline.append(item);
  });
}

function renderProfiles() {
  const links = $("[data-profile-links]");
  const social = $("[data-social-links]");
  const contactSocial = $("[data-contact-social]");
  if (!links) return;
  const profiles = [
    ["GitHub", SITE_CONFIG.profiles.github, "Code & projects"],
    ["LinkedIn", SITE_CONFIG.profiles.linkedin, "Professional profile"],
    ["LeetCode", SITE_CONFIG.profiles.leetcode, "Problem solving"],
  ].filter(([, url]) => safeExternalLink(url));

  profiles.forEach(([name, url, detail]) => {
    const href = safeExternalLink(url);
    const card = make("a", "profile-card");
    card.href = href;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.append(make("span", "profile-arrow", "↗"), make("span", "profile-name", name), make("span", "profile-detail", detail));
    links.append(card);

    [social, contactSocial, $("[data-footer-social]")].filter(Boolean).forEach((container) => {
      const link = make("a", "social-link", name);
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      container.append(link);
    });
  });
}

function configureContactAndResume() {
  const email = SITE_CONFIG.email.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const emailLink = $("[data-contact-email]");
  if (validEmail && emailLink) {
    emailLink.href = `mailto:${email}`;
    emailLink.hidden = false;
    $("[data-contact-message]").textContent = email;
  }

  const resumeLink = safeExternalLink(new URL(SITE_CONFIG.resumePath, window.location.href).href);
  const download = $("[data-resume-download]");
  const view = $("[data-resume-view]");
  const heroDownload = $("[data-resume-link]");
  if (!download || !view) return;
  fetch(SITE_CONFIG.resumePath, { method: "HEAD" }).then((response) => {
    if (!response.ok || !resumeLink) return;
    download.hidden = false;
    view.hidden = false;
    download.href = SITE_CONFIG.resumePath;
    view.href = SITE_CONFIG.resumePath;
    if (heroDownload) {
      heroDownload.hidden = false;
      heroDownload.href = SITE_CONFIG.resumePath;
    }
    $("[data-resume-message]").textContent = "View or download a copy of my resume.";
  }).catch(() => {});
}

function applyPersonalName() {
  const name = SITE_CONFIG.name.trim();
  if (!name) return;
  $$('[data-person-name]').forEach((element) => {
    element.textContent = name.toLocaleUpperCase();
  });
  const brandLink = $(".site-header .wordmark");
  if (brandLink) brandLink.setAttribute("aria-label", `${name} home`);
  document.title = `${name} — Developer & Data Science Enthusiast`;
}

function setupMobileMenu() {
  const button = $(".menu-toggle");
  const nav = $(".site-nav");
  if (!button || !nav) return;
  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };
  button.addEventListener("click", () => setOpen(button.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) setOpen(false);
  });
}

function setupScrollFeatures() {
  const sections = $$("main section[id]");
  const navLinks = $$(".site-nav a[href^='#']");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    window.revealObserver = revealObserver;
    observeReveals();

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
  } else {
    $$(".reveal").forEach((element) => element.classList.add("is-visible"));
  }
}

function observeReveals(root = document) {
  const observer = window.revealObserver;
  if (!observer) {
    $$(".reveal", root).forEach((element) => element.classList.add("is-visible"));
    return;
  }
  $$(".reveal:not(.is-visible)", root).forEach((element) => observer.observe(element));
}

function setYear() {
  const year = $("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}

document.documentElement.classList.add("js-ready");
applyPersonalName();
renderSkills();
renderProjects();
renderJourney();
renderProfiles();
configureContactAndResume();
setupMobileMenu();
setupScrollFeatures();
setYear();
