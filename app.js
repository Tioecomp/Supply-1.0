// ============================================
// SUPPLY — Premium Animation Layer
// Powered by: GSAP + ScrollTrigger + Lenis
// Agent: Sarah Drasner (Arcade Sites Squad)
// ============================================

// --- Native Scroll (no Lenis — maximum responsiveness) ---

// --- Register ScrollTrigger ---
gsap.registerPlugin(ScrollTrigger);

// --- Navbar Background on Scroll ---
const navbar = document.getElementById('navbar');
ScrollTrigger.create({
  start: 'top -80',
  onUpdate: (self) => {
    if (self.direction === 1 && self.scroll() > 80) {
      navbar.classList.add('bg-dark-950/90', 'backdrop-blur-xl', 'border-b', 'border-white/5');
    }
    if (self.scroll() < 80) {
      navbar.classList.remove('bg-dark-950/90', 'backdrop-blur-xl', 'border-b', 'border-white/5');
    }
  }
});

// --- Hero Entrance Animation ---
const heroTl = gsap.timeline({
  defaults: { ease: 'power3.out' }
});

heroTl
  .to('[data-animate]', { opacity: 1, duration: 0 }) // Reset opacity for hero elements
  .from('.font-mono[data-animate]', {
    y: 20,
    opacity: 0,
    duration: 0.8,
  }, 0.3)
  .from('h1 [data-animate]', {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
  }, 0.5)
  .from('main > section:first-child p[data-animate]', {
    y: 20,
    opacity: 0,
    duration: 0.7,
  }, 1.2)
  .from('main > section:first-child div[data-animate]', {
    y: 20,
    opacity: 0,
    duration: 0.6,
  }, 1.4)
  .from('.scroll-bounce', {
    opacity: 0,
    duration: 0.5,
  }, 1.8);

// --- Statement Section (2nd section - special treatment) ---
const statementSection = document.querySelectorAll('section')[1];
if (statementSection) {
  const statementTexts = statementSection.querySelectorAll('[data-animate]');
  gsap.set(statementTexts, { opacity: 0, y: 40 });
  gsap.to(statementTexts, {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: statementSection,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
}

// --- Scroll-Triggered Section Reveals (skip hero + statement) ---
const sections = document.querySelectorAll('section:not(:first-child)');

sections.forEach((section, index) => {
  // Skip statement section (index 0 = 2nd section overall, already handled above)
  if (index === 0) return;

  const animatedElements = section.querySelectorAll('[data-animate]');

  if (animatedElements.length > 0) {
    gsap.set(animatedElements, { opacity: 0, y: 50 });
    gsap.to(animatedElements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });
  }
});

// --- Counter Animation ---
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const target = parseInt(counter.dataset.target);
  if (!target) return;

  ScrollTrigger.create({
    trigger: counter,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(counter, {
        textContent: target,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        onUpdate: function() {
          counter.textContent = Math.round(parseFloat(counter.textContent));
        }
      });
    },
    once: true,
  });
});

// --- Sector Cards Stagger ---
const sectorCards = document.querySelectorAll('#setores .grid > div');
if (sectorCards.length > 0) {
  gsap.set(sectorCards, { opacity: 0, y: 40 });
  gsap.to(sectorCards, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#setores .grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
}

// --- Diferencial Cards Stagger ---
const difCards = document.querySelectorAll('#diferenciais .grid > div');
if (difCards.length > 0) {
  gsap.set(difCards, { opacity: 0, y: 40 });
  gsap.to(difCards, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#diferenciais .grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
}

// --- Process Steps Stagger ---
const processSteps = document.querySelectorAll('#processo .grid > div');
if (processSteps.length > 0) {
  gsap.set(processSteps, { opacity: 0, y: 40 });
  gsap.to(processSteps, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#processo .grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
}

// --- WhatsApp FAB Entrance ---
const whatsappFab = document.getElementById('whatsapp-fab');
if (whatsappFab) {
  ScrollTrigger.create({
    start: 'top -400',
    onEnter: () => {
      gsap.to(whatsappFab, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      });
    },
    onLeaveBack: () => {
      gsap.to(whatsappFab, {
        opacity: 0,
        y: 20,
        duration: 0.3,
      });
    }
  });
}

// --- Smooth Scroll for Nav Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
});

// --- Prefers Reduced Motion ---
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(0);
  document.querySelectorAll('[data-animate]').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

// --- Log ---
console.log('%c⚡ Supply — Powered by Arcade Sites Squad', 'color: #f97316; font-size: 14px; font-weight: bold;');
