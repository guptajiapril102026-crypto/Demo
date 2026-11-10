document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide SVG icons
  if (window.lucide) {
    lucide.createIcons();
  }

  const navbar = document.getElementById("navbar");
  const waterDrop = document.getElementById("waterDrop");
  const navItems = document.querySelectorAll(".nav-item");

  let currentIndex = 2; // Default to 'Apps' matching the reference picture
  let isMoving = false;

  // Reposition the glass droplet lens over the chosen element
  function updateWaterDropPosition(targetElement, animateSquish = false) {
    const navRect = navbar.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    // Calculate center offset relative to the navbar container
    const xPos = targetRect.left - navRect.left + (targetRect.width / 2) - (waterDrop.offsetWidth / 2);

    if (animateSquish) {
      // Add liquid elongation in motion direction
      const diff = targetRect.left - (navItems[currentIndex] ? navItems[currentIndex].getBoundingClientRect().left : 0);
      const direction = diff >= 0 ? 1 : -1;
      
      waterDrop.style.transform = `translate3d(${xPos}px, 0, 0) skewX(${direction * -4}deg) scaleX(1.15) scaleY(0.92)`;
      
      clearTimeout(waterDrop.squishTimeout);
      waterDrop.squishTimeout = setTimeout(() => {
        // Return to standard spherical lens on rest
        waterDrop.style.transform = `translate3d(${xPos}px, 0, 0) scale(1)`;
      }, 300);
    } else {
      waterDrop.style.transform = `translate3d(${xPos}px, 0, 0)`;
    }
  }

  // Click & Touch Handlers
  navItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentIndex === index) return;

      navItems[currentIndex].classList.remove("active");
      item.classList.add("active");

      updateWaterDropPosition(item, true);
      currentIndex = index;
    });
  });

  // Initial placement over the active item ("Apps")
  const initialActive = document.querySelector(".nav-item.active") || navItems[2];
  updateWaterDropPosition(initialActive, false);

  // Recalculate on window resize for responsive layout
  window.addEventListener("resize", () => {
    const activeItem = navItems[currentIndex];
    if (activeItem) {
      updateWaterDropPosition(activeItem, false);
    }
  });
});

// scroll down 


let lastScrollY = window.scrollY;

const navbar = document.querySelector(".liquid-navbar");

let ticking = false;

window.addEventListener("scroll", () => {

  if (!ticking) {

    window.requestAnimationFrame(() => {

      let currentScrollY = window.scrollY;

      // Scroll down = Hide navbar
      if (currentScrollY > lastScrollY &&
          currentScrollY > 80) {

        navbar.classList.add("nav-hidden");
        navbar.classList.remove("nav-visible");

      }

      // Scroll up = Show navbar
      else if (currentScrollY < lastScrollY) {

        navbar.classList.remove("nav-hidden");
        navbar.classList.add("nav-visible");

      }

      // At top = Always show
      if (currentScrollY <= 10) {

        navbar.classList.remove("nav-hidden");
        navbar.classList.add("nav-visible");

      }

      lastScrollY = currentScrollY;
      ticking = false;

    });

    ticking = true;
  }

}, { passive: true });