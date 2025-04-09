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
      // Posición actual del targetSection más la mitad de su altura menos la mitad de la altura del contenedor.
      const targetScroll = targetSection.offsetTop + (targetSection.clientHeight / 2) - (containerHeight / 2);
      
      // Realizamos el scroll usando Lenis
      lenis.scrollTo(targetScroll, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  });
});


// 2. Código para mostrar/ocultar las flechas en función de la inactividad del usuario
const arrows = document.querySelectorAll('.arrow');
let inactivityTimer;

// Función para ocultar las flechas (quitar la clase 'visible')
function hideArrows() {
  arrows.forEach(arrow => arrow.classList.remove('visible'));
}

// Función para mostrar las flechas (añadir la clase 'visible')
function showArrows() {
  arrows.forEach(arrow => arrow.classList.add('visible'));
}

// Función para reiniciar el temporizador de inactividad.
// Al detectar actividad se ocultan inmediatamente las flechas y se reinicia el contador.
function resetInactivityTimer() {
  hideArrows();
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    showArrows();
  }, 2000); // 2 segundos de inactividad para mostrar las flechas
}

// Escucha eventos de actividad
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);
document.addEventListener('touchmove', resetInactivityTimer);

// Opcional: iniciar el temporizador al cargar la página para mostrar las flechas después de 2 segundos
window.addEventListener('load', () => {
  inactivityTimer = setTimeout(() => {
    showArrows();
  }, 2000);
});
  