const initPortfolio = () => {
  
  // ==========================================================================
  // Header Scroll State
  // ==========================================================================
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run

  // ==========================================================================
  // Mobile Navigation (A11y Compliant)
  // ==========================================================================
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
  
  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    
    if (isOpen) {
      // Focus first link on opening
      setTimeout(() => mobileLinks[0].focus(), 100);
    }
  };

  menuBtn.addEventListener('click', toggleMenu);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close menu on selecting a link
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Focus Trapping for mobile menu accessibility
  mobileMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusables = Array.from(mobileLinks);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  });

  // ==========================================================================
  // Theme Management (Native Color-Scheme Toggle)
  // ==========================================================================
  const themeToggle = document.getElementById('themeToggle');
  
  const getThemePreference = () => {
    const saved = localStorage.getItem('theme-preference');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme-preference', theme);
    
    // Customize logo icons based on theme choice (sun/moon display options)
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--sun-display', 'block');
    } else {
      document.documentElement.style.setProperty('--sun-display', 'block'); // Or replace icon SVG if needed
    }
  };

  // Init theme
  const initialTheme = getThemePreference();
  applyTheme(initialTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.style.colorScheme || initialTheme;
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // Listen for system changes if no override is set
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme-preference')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });



  // ==========================================================================
  // Form Submission & Validation Management
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const alertSuccess = document.getElementById('formAlertSuccess');
  const alertError = document.getElementById('formAlertError');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const controls = contactForm.querySelectorAll('.form-control');

    if (!contactForm.checkValidity()) {
      alertSuccess.style.display = 'none';
      alertError.style.display = 'block';
      controls.forEach(control => {
        if (!control.validity.valid) {
          control.classList.add('invalid-shake');
          setTimeout(() => control.classList.remove('invalid-shake'), 500);
        }
      });
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch('https://formspree.io/f/xdavbako', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm),
      });

      if (response.ok) {
        alertError.style.display = 'none';
        alertSuccess.style.display = 'block';
        contactForm.reset();
        setTimeout(() => { alertSuccess.style.display = 'none'; }, 6000);
      } else {
        alertSuccess.style.display = 'none';
        alertError.style.display = 'block';
      }
    } catch {
      alertSuccess.style.display = 'none';
      alertError.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Secure Message';
    }
  });

  // ==========================================================================
  // Scroll Navigation Active Highlighting
  // ==========================================================================
  const sections = document.querySelectorAll('section, footer');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 120; // Offset for sticky navbar
    
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        const id = section.getAttribute('id');
        if (id) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav(); // Initial run

  // ==========================================================================
  // Dynamic Year Utility
  // ==========================================================================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // Background Carousel Cycle
  // ==========================================================================
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    const nextSlide = () => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    };
    setInterval(nextSlide, 5000); // Transition slide every 5 seconds

    // Diagnose Image Load Status in Developer Console
    slides.forEach((slide, index) => {
      const styleBg = slide.style.backgroundImage;
      const match = styleBg.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (match && match[1]) {
        const url = match[1];
        const tester = new Image();
        tester.onload = () => {
          console.log(`[Carousel Debug] Slide ${index + 1} Image Loaded successfully: ${url} (${tester.width}x${tester.height})`);
        };
        tester.onerror = (err) => {
          console.error(`[Carousel Debug] Slide ${index + 1} Image FAILED to load at path: ${url}. Verify the file is in the assets folder.`, err);
        };
        tester.src = url;
      } else {
        console.warn(`[Carousel Debug] Slide ${index + 1} has no valid background image URL.`);
      }
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
