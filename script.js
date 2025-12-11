document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const navToggle = document.querySelector(".nav-toggle");
  const navLinksContainer = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const revealEls = document.querySelectorAll(".reveal");
  const backToTop = document.querySelector(".back-to-top");
  const typingEl = document.querySelector(".typing");
  const yearEl = document.getElementById("year");

  // Footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // NAV TOGGLE (mobile)
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("open");
    });
    navLinks.forEach(l => l.addEventListener("click", () => navLinksContainer.classList.remove("open")));
  }

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("href");
      if (target && target.startsWith("#")) {
        e.preventDefault();
        document.querySelector(target).scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Active nav item on scroll & back-to-top show
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => link.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add("active");
      }
    });

    if (scrollY > 400) backToTop.classList.add("show");
    else backToTop.classList.remove("show");

    // reveal elements (fallback for browsers without IntersectionObserver)
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) el.classList.add("show");
    });
  });

  // Back to top click
  if (backToTop) backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // IntersectionObserver for reveal (preferred)
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealEls.forEach(el => io.observe(el));
  }

  // Typing effect (role-focused)
  const texts = [
    "Java Full-Stack Intern",
    "Spring Boot · REST APIs · SQL",
    "Arduino · MATLAB · Prototyping",
    "Frontend Integration · JavaScript"
  ];
  let tIndex = 0, chIndex = 0, deleting = false;

  function typeLoop() {
    if (!typingEl) return;
    const current = texts[tIndex];
    if (!deleting) {
      typingEl.textContent = current.substring(0, chIndex + 1);
      chIndex++;
      if (chIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 900);
        return;
      }
    } else {
      typingEl.textContent = current.substring(0, chIndex - 1);
      chIndex--;
      if (chIndex === 0) {
        deleting = false;
        tIndex = (tIndex + 1) % texts.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 90);
  }
  typeLoop();
});
