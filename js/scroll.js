// js/scroll.js

// ------------------------- //
// ---- VERTICAL SCROLL ---- //
// ------------------------- //
window.addEventListener('load', () => {
  if (window.AOS) AOS.refresh();
});

const main = document.querySelector('#scroll-container');
const sections = document.querySelectorAll('section');

// Inicializar Lenis
const lenis = new Lenis({
  wrapper: main, // Contenedor de scroll
  content: main.firstElementChild, // Contenido interno con las secciones
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  smoothWheel: true,
  smoothTouch: false
});

// Actualizar Lenis en cada frame
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Interceptar clics en enlaces ancla para usar Lenis.scrollTo
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault(); // Evitar el scroll nativo
    const targetId = anchor.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      lenis.scrollTo(targetSection.offsetTop, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  });
});

// Lógica para "snap" automático a la sección más cercana
let scrollTimeout = null;

lenis.on('scroll', () => {
  // Refrescar AOS en cada scroll para detectar cambios
  if (window.AOS) AOS.refresh();

  // Limpiar timeout previo
  if (scrollTimeout) clearTimeout(scrollTimeout);

  // Esperar 250ms tras el último evento de scroll
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

    // Realizar el "snap" a la sección encontrada
    if (closestSection) {
      const sectionOffset =
        closestSection.offsetTop +
        closestSection.offsetHeight / 2 -
        viewportHeight / 2;

      lenis.scrollTo(sectionOffset, {
        duration: 1.2,
        easing: (t) => t * (2 - t) // easeOutQuad
      });

      // Después del snap, refrescar AOS para activar animaciones
      setTimeout(() => {
        if (window.AOS) AOS.refresh();
      }, 1300);
    }
  }, 250);
});


// ------------------------- //
// --- HORIZONTAL SCROLL --- //
// ------------------------- //
document.addEventListener('DOMContentLoaded', function() {
  // Configuración general para todos los contenedores que usen scroll horizontal
  setupHorizontalScroll();
});

function setupHorizontalScroll() {
  // Selecciona todos los contenedores que tengan la clase 'horizontal-scroll-container'
  const horizontalContainers = document.querySelectorAll('.horizontal-scroll-container');
  
  horizontalContainers.forEach(container => {
    container.addEventListener('wheel', function(e) {
      // Calcula la cantidad máxima de scroll horizontal para el contenedor
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      
      // Si se detecta scroll hacia abajo y aún no se ha llegado al final del contenido
      if (e.deltaY > 0 && container.scrollLeft < maxScrollLeft) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
      // Si se detecta scroll hacia arriba y aún no se ha llegado al inicio del contenido
      else if (e.deltaY < 0 && container.scrollLeft > 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
      // Si el contenedor ya está completamente desplazado (inicio o fin),
      // se permite el comportamiento de scroll vertical normal en la página.
    }, { passive: false });
  });
}
