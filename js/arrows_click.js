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
        // Calculamos la posición para centrar el targetSection:
        // Posición actual del targetSection + la mitad de su altura menos la mitad de la altura del contenedor.
        const targetScroll = targetSection.offsetTop + (targetSection.clientHeight / 2) - (containerHeight / 2);
        
        // Realizamos el scroll usando Lenis
        lenis.scrollTo(targetScroll, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });
  