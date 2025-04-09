// 1. Código para la navegación con clic en las flechas
document.querySelectorAll('.arrow').forEach(arrow => {
  arrow.addEventListener('click', function() {
    const direction = arrow.getAttribute('data-direction'); // "up" o "down"
    const currentSection = arrow.closest('section');
    let targetSection = null;
    if (direction === 'down') {
      targetSection = currentSection.nextElementSibling;
    } else if (direction === 'up') {
      targetSection = currentSection.previousElementSibling;
    }
    if (targetSection) {
      // Obtenemos el contenedor de scroll y su altura
      const scrollContainer = document.getElementById('scroll-container');
      const containerHeight = scrollContainer.clientHeight;
      // Calculamos la posición para centrar la sección de destino:
      // Posición del targetSection + mitad de su altura menos la mitad del contenedor.
      const targetScroll = targetSection.offsetTop + (targetSection.clientHeight / 2) - (containerHeight / 2);
      
      // Realizamos el scroll usando Lenis
      lenis.scrollTo(targetScroll, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  });
});

// 2. Código para mostrar/ocultar las flechas según inactividad y hover sobre ellas

const arrows = document.querySelectorAll('.arrow');
let inactivityTimer;

// Función para ocultar las flechas (quita la clase 'visible')
function hideArrows() {
  arrows.forEach(arrow => arrow.classList.remove('visible'));
}

// Función para mostrar las flechas (añade la clase 'visible')
function showArrows() {
  arrows.forEach(arrow => arrow.classList.add('visible'));
}

// Función que reinicia el temporizador de inactividad y, tras 150 ms sin actividad, muestra las flechas.
function resetInactivityTimer() {
  showArrows();
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(hideArrows(), 500); // 500 ms de inactividad para mostrar las flechas
}

//— Eventos en el contenedor de scroll (donde ocurre el scroll) —//
const scrollContainer = document.getElementById('scroll-container');
if (scrollContainer) {
  scrollContainer.addEventListener('mousemove', resetInactivityTimer);
  scrollContainer.addEventListener('touchmove', resetInactivityTimer);
  scrollContainer.addEventListener('scroll', () => {
    hideArrows();
    clearTimeout(inactivityTimer); // Cancelamos cualquier espera activa
  });
}

//— Mostrar las flechas al cargar la página tras 500 ms —//
window.addEventListener('load', () => {
  inactivityTimer = setTimeout(showArrows, 500);
});
  