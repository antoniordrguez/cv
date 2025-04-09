document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const scrollContainer = document.getElementById('scroll-container');
        const containerHeight = scrollContainer.clientHeight;
        const targetScroll = targetSection.offsetTop + (targetSection.clientHeight / 2) - (containerHeight / 2);
        
        lenis.scrollTo(targetScroll, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });
  