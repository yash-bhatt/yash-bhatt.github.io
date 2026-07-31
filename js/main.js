const initPortfolio = () => {

  // ==========================================================================
  // Mobile Navigation (A11y compliant)
  // ==========================================================================
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
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

    // Focus trapping for mobile menu accessibility
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
  }

  // ==========================================================================
  // Form Submission & Validation Management
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const alertSuccess = document.getElementById('formAlertSuccess');
  const alertError = document.getElementById('formAlertError');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        alertSuccess.style.display = 'none';
        alertError.style.display = 'block';
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
        submitBtn.textContent = 'Send message';
      }
    });
  }

  // ==========================================================================
  // Scroll Navigation Active Highlighting
  // ==========================================================================
  const sections = document.querySelectorAll('section, footer');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 120; // Offset for fixed navbar

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
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
