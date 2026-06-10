/* VANTAM — script.js (2026 rebuild) */

// ── Mobile nav toggle ──────────────────────────────────────────────
const header    = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks  = document.querySelectorAll(".site-nav a");

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  });
});

// ── Respect reduced motion ─────────────────────────────────────────
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── Scroll reveal ──────────────────────────────────────────────────
const revealTargets = [
  ".who-card",
  ".service-item",
  ".process-step",
  ".situation-card",
  ".pillar",
  ".partner-card",
  ".section-header",
  ".why-copy",
  ".why-pillars",
  ".partners-intro",
  ".partners-who",
  ".partners-cta",
  ".partner-tags",
  ".contact-copy",
  ".tally-wrap",
];

function initReveal() {
  const selector = revealTargets.join(", ");
  const elements = document.querySelectorAll(selector);

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add("reveal", "visible"));
    return;
  }

  elements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

// ── Staggered children for grids ───────────────────────────────────
function initStagger() {
  if (prefersReducedMotion) return;
  const grids = document.querySelectorAll(
    ".who-grid, .services-grid, .process-steps, .situations-grid, .why-pillars, .partners-grid"
  );

  grids.forEach((grid) => {
    Array.from(grid.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 65}ms`;
    });
  });
}

// ── Header scroll style ────────────────────────────────────────────
function initHeaderScroll() {
  if (!header) return;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 40;
        header.style.borderBottomColor = scrolled
          ? "rgba(255,255,255,0.1)"
          : "rgba(255,255,255,0.08)";
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ── Active nav highlight ───────────────────────────────────────────
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".site-nav a[href^='#']");

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.removeAttribute("data-active"));
          const active = document.querySelector(
            `.site-nav a[href="#${entry.target.id}"]`
          );
          if (active) active.setAttribute("data-active", "true");
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

// ── Init ───────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initStagger();
  initReveal();
  initHeaderScroll();
  initActiveNav();
});
