/* ============================================================
   IMPCH Pichi Pelluco — Interacciones
   ============================================================ */
(function () {
  "use strict";

  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  /* ---- Navbar: cambia de estilo al hacer scroll ---- */
  const onScroll = () => {
    if (window.scrollY > 60) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Menú móvil ---- */
  const toggleMenu = (open) => {
    const isOpen = open ?? !navLinks.classList.contains("open");
    navLinks.classList.toggle("open", isOpen);
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };
  navToggle.addEventListener("click", () => toggleMenu());
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => toggleMenu(false))
  );

  /* ---- Reveal al hacer scroll ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---- Galería + Lightbox ---- */
  const items = Array.from(document.querySelectorAll(".gallery__item"));
  const lb = document.getElementById("lightbox");
  if (lb && items.length) {
    const lbImg = document.getElementById("lightboxImg");
    const lbCap = document.getElementById("lightboxCaption");
    const btnClose = document.getElementById("lightboxClose");
    const btnPrev = document.getElementById("lightboxPrev");
    const btnNext = document.getElementById("lightboxNext");
    let current = 0;

    const show = (i) => {
      current = (i + items.length) % items.length;
      const img = items[current].querySelector("img");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = items[current].dataset.caption || img.alt || "";
    };
    const open = (i) => {
      show(i);
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    items.forEach((item, i) => item.addEventListener("click", () => open(i)));
    btnClose.addEventListener("click", close);
    btnPrev.addEventListener("click", () => show(current - 1));
    btnNext.addEventListener("click", () => show(current + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---- Año dinámico en el footer ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
