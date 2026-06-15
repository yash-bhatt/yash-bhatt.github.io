const initScrollEffects = () => {
  // Check native scroll-driven animations support
  const supportsNativeScrollAnimations = CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

  if (!supportsNativeScrollAnimations) {
    // ==========================================================================
    // IntersectionObserver Fallback for Section/Card Reveals (ViewTimeline)
    // ==========================================================================
    
    // Inject fallback CSS styles dynamically to hide scroll reveals initially and transition them smoothly
    const fallbackStyleElement = document.createElement('style');
    fallbackStyleElement.textContent = `
      .scroll-reveal, .scroll-reveal-slow {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .scroll-reveal-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      .scroll-fade {
        opacity: 0;
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .scroll-fade-visible {
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(fallbackStyleElement);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('scroll-fade')) {
            entry.target.classList.add('scroll-fade-visible');
          } else {
            entry.target.classList.add('scroll-reveal-visible');
          }
          // Unobserve after revealing to prevent repeated triggering
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px' // Trigger slightly before the item enters the full viewport
    });

    document.querySelectorAll('.scroll-reveal, .scroll-reveal-slow, .scroll-fade').forEach((element) => {
      revealObserver.observe(element);
    });

    // ==========================================================================
    // JS Scroll Event Fallback for Scroll Progress Bar (ScrollTimeline)
    // ==========================================================================
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      let isThrottled = false;
      
      const updateProgressBarFallback = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        
        const scrollPercent = scrollTop / (docHeight - winHeight);
        progressBar.style.transform = `scaleX(${scrollPercent})`;
        
        isThrottled = false;
      };

      window.addEventListener('scroll', () => {
        if (!isThrottled) {
          window.requestAnimationFrame(updateProgressBarFallback);
          isThrottled = true;
        }
      }, { passive: true });
      
      updateProgressBarFallback(); // Initial setup on load
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollEffects);
} else {
  initScrollEffects();
}
