/* ===========================================================
   INSTITUT KYESHERO — galerie.js
   Filtres par catégorie + visionneuse (lightbox)
   =========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initGalleryFilters();
  initLightbox();
});

/* ---------- Filtres par catégorie ---------- */
function initGalleryFilters() {
  const buttons = document.querySelectorAll(".gallery-filter-btn");
  const items = document.querySelectorAll("#galleryGrid .gal-item");
  const emptyMsg = document.getElementById("galleryEmpty");
  if (!buttons.length || !items.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      items.forEach((item) => {
        const match = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("gal-item-hidden", !match);
        if (match) visibleCount++;
      });

      if (emptyMsg) emptyMsg.hidden = visibleCount > 0;
    });
  });
}

/* ---------- Visionneuse (lightbox) ---------- */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  if (!lightbox || !lightboxImg) return;

  let visibleItems = [];
  let currentIndex = 0;

  function getVisibleItems() {
    return Array.from(document.querySelectorAll("#galleryGrid .gal-item")).filter(
      (item) => !item.classList.contains("gal-item-hidden"),
    );
  }

  function openLightbox(item) {
    visibleItems = getVisibleItems();
    currentIndex = visibleItems.indexOf(item);
    showCurrent();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function showCurrent() {
    const item = visibleItems[currentIndex];
    if (!item) return;
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = item.dataset.caption || "";
  }

  function showNext() {
    if (!visibleItems.length) return;
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showCurrent();
  }

  function showPrev() {
    if (!visibleItems.length) return;
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showCurrent();
  }

  document.querySelectorAll("#galleryGrid .gal-item").forEach((item) => {
    item.addEventListener("click", () => openLightbox(item));
  });

  closeBtn?.addEventListener("click", closeLightbox);
  nextBtn?.addEventListener("click", showNext);
  prevBtn?.addEventListener("click", showPrev);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
}
