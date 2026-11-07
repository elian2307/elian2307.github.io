/**
 * ELIAN DOMÍNGUEZ | PORTFOLIO LOGIC & INTERACTIVES
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSplideSlider();
  initTypewriter();
  initPortfolioFilter();
  initScrollAnimations();
  initMouseGlowEffect();
  initFormValidation();
});

/* 1. MOBILE NAVIGATION MENU */
function initMobileNav() {
  const toggle = document.getElementById('btn-mobile-menu');
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    const links = nav.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // Header scroll appearance
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* 2. SPLIDE TESTIMONIALS SLIDER */
function initSplideSlider() {
  if (document.querySelector('.splide')) {
    new Splide('.splide', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '2rem',
      arrows: false,
      pagination: true,
      autoplay: true,
      interval: 4000,
      pauseOnHover: true,
      breakpoints: {
        1024: {
          perPage: 2,
        },
        768: {
          perPage: 1,
        }
      }
    }).mount();
  }
}

/* 3. HERO TYPEWRITER EFFECT */
function initTypewriter() {
  const typewriter = document.getElementById('typewriter');
  if (!typewriter) return;

  const words = JSON.parse(typewriter.getAttribute('data-words') || '[]');
  if (words.length === 0) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 150;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriter.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      delay = 75; // Faster deletion
    } else {
      typewriter.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      delay = 150; // Regular typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Cycle to next word
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  type();
}

/* 4. PORTFOLIO FILTER WITH FADE ANIMATION */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.buttons-category-container button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterButtons.length === 0 || portfolioItems.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Set active button state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        // Apply transition styling
        item.style.transition = 'all 0.4s ease-out';

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.classList.add('hidden');
          }, 400); // Match transit time
        }
      });
    });
  });
}

/* 5. VIEWPORT OBSERVATION & SCROLL REVEALS */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const skillProgressBars = document.querySelectorAll('.skill-bar-progress');
  const metricProgressBars = document.querySelectorAll('.metric-progress-fill');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  // General reveal observer
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    // Add default reveal style wrapper class from animations.css
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Skills and metrics animation triggers
  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        if (target.classList.contains('skill-bar-progress')) {
          const val = target.getAttribute('data-progress-val');
          target.style.width = `${val}%`;
        } else if (target.classList.contains('metric-progress-fill')) {
          // Keep existing inline styling but execute animation
          // The inline CSS contains width, so we set width initially to 0 and restore it here.
          const finalWidth = target.style.width;
          target.style.width = '0%';
          setTimeout(() => {
            target.style.width = finalWidth;
          }, 50);
        }
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.1 });

  // Initialize progress bar properties for animating
  skillProgressBars.forEach(bar => {
    bar.style.width = '0%';
    progressObserver.observe(bar);
  });

  metricProgressBars.forEach(bar => {
    // Read style, store it, reset it for animation
    const originalWidth = bar.style.width;
    bar.setAttribute('data-target-width', originalWidth);
    bar.style.width = '0%';

    // Custom trigger since it's nested
    progressObserver.observe(bar);
  });
}

/* 6. METALLIC MOUSE TRACKING GLOW (PREMIUM UX) */
function initMouseGlowEffect() {
  const cards = document.querySelectorAll('.skill-card, .service-card, .contact-detail-card, .testimonial-card, .contact-form-card, .social-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update custom properties to position border glow
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* 7. CONTACT FORM INTERACTIVE VALIDATION */
function initFormValidation() {
  const form = document.getElementById('contact-form-el');
  if (!form) return;

  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    // Add real-time feedback classes
    input.addEventListener('blur', () => {
      if (input.checkValidity()) {
        input.style.borderColor = 'rgba(52, 211, 153, 0.4)'; // Green success
      } else {
        input.style.borderColor = 'rgba(239, 68, 68, 0.4)'; // Red fail
      }
    });

    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.style.borderColor = '';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
        input.style.borderColor = 'rgba(239, 68, 68, 0.8)';
      }
    });

    if (isValid) {
      const submitBtn = document.getElementById('btn-submit-form');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      // Simulate network request
      setTimeout(() => {
        submitBtn.textContent = '¡Mensaje Enviado!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)'; // Emerald gradient

        // Reset form
        form.reset();
        inputs.forEach(input => {
          input.style.borderColor = '';
        });

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
        }, 3000);
      }, 1500);
    }
  });
}
