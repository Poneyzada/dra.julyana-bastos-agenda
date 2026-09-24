/**
 * DRA. JULYANA BASTOS — MOBILE JAVASCRIPT
 * Interações otimizadas para touch e performance móvel
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navDrawer = document.getElementById('navDrawer');
  const navLinks = document.querySelectorAll('.mobile-nav-links a');

  if (menuToggle && navDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navDrawer.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navDrawer.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Procedures Accordion
  const procCards = document.querySelectorAll('.proc-card');
  procCards.forEach(card => {
    const header = card.querySelector('.proc-header');
    if (header) {
      header.addEventListener('click', () => {
        const isCurrentActive = card.classList.contains('active');
        // Close others for clean accordion experience
        procCards.forEach(c => c.classList.remove('active'));
        if (!isCurrentActive) {
          card.classList.add('active');
        }
      });
    }
  });

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isCurrentActive = item.classList.contains('active');
        faqItems.forEach(f => f.classList.remove('active'));
        if (!isCurrentActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 4. WhatsApp Links Configuration
  const defaultPhone = '5575999999999'; // Substituir pelo WhatsApp oficial da clínica
  const message = encodeURIComponent('Olá Dra. Julyana e equipe! Vi a página de avaliação facial (R$ 500) e gostaria de agendar uma consulta.');
  const waUrl = `https://wa.me/${defaultPhone}?text=${message}`;

  const ctaButtons = document.querySelectorAll('[data-whatsapp]');
  ctaButtons.forEach(btn => {
    btn.setAttribute('href', waUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // 5. Hide sticky bar when at the very bottom (footer contact already visible)
  const stickyBar = document.querySelector('.mobile-sticky-bar');
  const footer = document.querySelector('.footer');

  if (stickyBar && footer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stickyBar.style.transform = 'translateY(100%)';
          stickyBar.style.transition = 'transform 0.3s ease';
        } else {
          stickyBar.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.2 });

    observer.observe(footer);
  }
});
