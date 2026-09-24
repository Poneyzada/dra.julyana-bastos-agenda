/**
 * DRA. JULYANA BASTOS — DESKTOP JAVASCRIPT
 * Interações refinadas para telas grandes
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Effect on Scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. FAQ Accordion Desktop
  const faqItems = document.querySelectorAll('.faq-item-desktop');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(f => f.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. WhatsApp Dynamic Link Configuration
  const defaultPhone = '5575999999999'; // Substituir pelo WhatsApp oficial da clínica
  const message = encodeURIComponent('Olá Dra. Julyana e equipe! Vi o site e gostaria de agendar a consulta de avaliação facial (R$ 500).');
  const waUrl = `https://wa.me/${defaultPhone}?text=${message}`;

  const ctaButtons = document.querySelectorAll('[data-whatsapp]');
  ctaButtons.forEach(btn => {
    btn.setAttribute('href', waUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // 4. Smooth Anchor Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 5. Hero Video Autoplay Assurance
  const heroVideo = document.querySelector('.hero-bg-video, .hero-art-video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback silently if browser restrictions apply
      });
    }
  }
});
