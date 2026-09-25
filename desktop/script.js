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

  // 3. ICP Modal & Pre-Qualification WhatsApp Funnel
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

    setTimeout(() => {
      if (nameInput) nameInput.focus();
    }, 150);
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

  // Interceptar todos os botões e links de CTA
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

  // Máscara dinâmica de telefone brasileiro (DDD + 8 ou 9 dígitos)
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

  // Submissão do Formulário de Qualificação -> Redirecionamento para WhatsApp Oficial
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
