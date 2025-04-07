// js/scroll.js

// Referencia al contenedor de scroll y a todas las secciones
const main = document.querySelector('#scroll-container');
const sections = document.querySelectorAll('section');

// Inicializar Lenis
const lenis = new Lenis({
  wrapper: main, // El contenedor que tiene overflow-y-scroll
  content: main.firstElementChild, // El hijo directo que contiene las secciones
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  smoothWheel: true,
  smoothTouch: false,
});

// Función recursiva para que Lenis se actualice en cada frame
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Interceptar clics en enlaces del navbar que tengan href="#algo"
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault(); // Evitar el scroll nativo del navegador

    const targetId = anchor.getAttribute('href').slice(1); // Quitar el "#"
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Desplázate hasta la posición inicial de la sección
      lenis.scrollTo(targetSection.offsetTop, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  });
});

// Lógica para snap automático al dejar de hacer scroll
let scrollTimeout = null;

lenis.on('scroll', () => {
  // Refrescar AOS en cada movimiento (si deseas un refresco continuo)
  // Si prefieres refrescar tras cada "snap", hazlo al final del setTimeout
  if (window.AOS) AOS.refreshHard?.();

  // Limpiar un timeout previo, si lo hubiera
  if (scrollTimeout) clearTimeout(scrollTimeout);

  // Esperar 250ms tras el último evento de scroll
  scrollTimeout = setTimeout(() => {
    // Hallar la sección más cercana al centro de la vista
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

    // Hacer snap a la sección encontrada
    if (closestSection) {
      const sectionOffset =
        closestSection.offsetTop +
        closestSection.offsetHeight / 2 -
        viewportHeight / 2;

      lenis.scrollTo(sectionOffset, {
        duration: 1.2,
        easing: (t) => t * (2 - t), // easeOutQuad
      });

      // Opcional: refrescar AOS tras el snap final
      setTimeout(() => {
        if (window.AOS) AOS.refresh();
      }, 1300);
    }
  }, 250);
});
