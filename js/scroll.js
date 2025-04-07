// js/scroll.js

const main = document.querySelector('#scroll-container');
const sections = document.querySelectorAll('section');

let scrollTimeout = null;

// 1. Iniciar Lenis y decirle que el contenedor es el main
const lenis = new Lenis({
  wrapper: main, // el contenedor que hace scroll
  content: main.firstElementChild, // el hijo directo que contiene el contenido (tus secciones)
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  smoothWheel: true,
  smoothTouch: false
});

// 2. Ejecutar Lenis en cada frame
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 3. Detectar scroll manual (parada del usuario)
lenis.on('scroll', () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    const scrollTop = main.scrollTop;
    const viewportHeight = main.clientHeight;
    const viewportCenterY = scrollTop + viewportHeight / 2;

    let closestSection = null;
    let minDistance = Infinity;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionCenterY = sectionTop + sectionHeight / 2;
      const distance = Math.abs(sectionCenterY - viewportCenterY);

      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });

    if (closestSection) {
      const sectionOffset =
        closestSection.offsetTop +
        closestSection.offsetHeight / 2 -
        viewportHeight / 2;

      lenis.scrollTo(sectionOffset, {
        duration: 1.2,
        easing: (t) => t * (2 - t), // easeOutQuad
      });

      // Refresh AOS tras scroll
      setTimeout(() => {
        if (window.AOS) AOS.refresh();
      }, 1300);
    }
  }, 250); // espera para detectar parada (ajustable)
});
