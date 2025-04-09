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

// 2. Código para mostrar/ocultar las flechas según inactividad
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

// Función para reiniciar el temporizador de inactividad.  
// Al detectar actividad se ocultan las flechas y se reinicia el contador.
function resetInactivityTimer() {
  hideArrows();
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    showArrows();
  }, 500); // 300 ms de inactividad para mostrar las flechas
}

// Para detectar la actividad dentro del contenedor de scroll:
const scrollContainer = document.getElementById('scroll-container');
if (scrollContainer) {
  scrollContainer.addEventListener('mousemove', resetInactivityTimer);
  scrollContainer.addEventListener('scroll', resetInactivityTimer);
  scrollContainer.addEventListener('touchmove', resetInactivityTimer);
}

// También, por si el usuario interactúa fuera del contenedor:
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);
document.addEventListener('touchmove', resetInactivityTimer);

// Al cargar la página, iniciamos el timer para mostrar las flechas después de 300 ms
window.addEventListener('load', () => {
  inactivityTimer = setTimeout(() => {
    showArrows();
  }, 500);
});
  