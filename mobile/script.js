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

  // 4. ICP Modal & Pre-Qualification WhatsApp Funnel Mobile
  const defaultPhone = '5575999999999'; // Substituir pelo WhatsApp oficial da clínica
  const modalBackdrop = document.getElementById('icpModalBackdrop');
  const modalClose = document.getElementById('icpModalClose');
  const icpForm = document.getElementById('icpForm');
  const nameInput = document.getElementById('icpName');
  const phoneInput = document.getElementById('icpPhone');
  const emailInput = document.getElementById('icpEmail');
  const nameError = document.getElementById('icpNameError');
  const phoneError = document.getElementById('icpPhoneError');

  function openIcpModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Recupera dados salvos previamente se existirem
    try {
      const saved = JSON.parse(localStorage.getItem('drajulyana_lead') || '{}');
      if (saved.nome && nameInput && !nameInput.value) nameInput.value = saved.nome;
      if (saved.telefone && phoneInput && !phoneInput.value) phoneInput.value = saved.telefone;
      if (saved.email && emailInput && !emailInput.value && saved.email !== 'Não informado') emailInput.value = saved.email;
    } catch (e) {}
  }

  function closeIcpModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (nameError) nameError.classList.remove('active');
    if (phoneError) phoneError.classList.remove('active');
    if (nameInput) nameInput.classList.remove('error');
    if (phoneInput) phoneInput.classList.remove('error');
  }

  // Interceptar todos os botões e links de CTA mobile
  const ctaButtons = document.querySelectorAll('[data-whatsapp], .open-icp-modal');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openIcpModal();
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeIcpModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeIcpModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeIcpModal();
    }
  });

  // Máscara dinâmica de telefone brasileiro no mobile
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (v.length > 5) {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else if (v.length > 0) {
        v = v.replace(/^(\d*)$/, '($1');
      }
      e.target.value = v;
      if (phoneError) phoneError.classList.remove('active');
      phoneInput.classList.remove('error');
    });
  }

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameError) nameError.classList.remove('active');
      nameInput.classList.remove('error');
    });
  }

  // Submissão do Formulário de Qualificação Mobile
  if (icpForm) {
    icpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nomeVal = nameInput ? nameInput.value.trim() : '';
      const phoneDigits = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
      const emailVal = emailInput && emailInput.value.trim() ? emailInput.value.trim() : 'Não informado';
      const selectedInterest = icpForm.querySelector('input[name="interesse"]:checked')?.value || 'Cirurgia Facial & Cervical';

      if (!nomeVal || nomeVal.length < 2) {
        if (nameError) nameError.classList.add('active');
        if (nameInput) nameInput.classList.add('error');
        isValid = false;
      }

      if (!phoneDigits || phoneDigits.length < 10) {
        if (phoneError) phoneError.classList.add('active');
        if (phoneInput) phoneInput.classList.add('error');
        isValid = false;
      }

      if (!isValid) return;

      // Salva lead localmente para persistência
      try {
        localStorage.setItem('drajulyana_lead', JSON.stringify({
          nome: nomeVal,
          telefone: phoneInput.value.trim(),
          email: emailVal,
          interesse: selectedInterest,
          date: new Date().toISOString()
        }));
      } catch (err) {}

      // Monta a mensagem personalizada e elegante de triagem médica
      const msgLines = [
        'Olá, Dra. Julyana Bastos e equipe!',
        '',
        `Me chamo *${nomeVal}*.`,
        'Preenchi a triagem no site para agendamento de Consulta de Avaliação (R$ 500):',
        '',
        `• *Principal Interesse:* ${selectedInterest}`,
        `• *WhatsApp:* ${phoneInput.value.trim()}`,
        `• *E-mail:* ${emailVal}`,
        '',
        'Gostaria de verificar as opções de horários e datas disponíveis para o meu atendimento presencial.'
      ];

      const fullMessage = encodeURIComponent(msgLines.join('\n'));
      const finalWaUrl = `https://wa.me/${defaultPhone}?text=${fullMessage}`;

      // Fecha o modal e redireciona
      closeIcpModal();
      window.open(finalWaUrl, '_blank') || (window.location.href = finalWaUrl);
    });
  }

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

  // 6. Hero Video Autoplay Assurance for Mobile Browsers
  const heroVideo = document.querySelector('.hero-bg-video, .hero-art-video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback silently if browser policies restrict before touch
      });
    }
  }
});
