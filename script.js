/**
 * LEFTCLICK - Interactive Functionality & Dynamics
 * Powers the interactive Pick Best Fit simulation, CAC calculator,
 * Hero AI Terminal tabs, Booking modal, and smooth UI animations.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===================================================================
  // 1. Mobile Menu Toggle
  // ===================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const spans = mobileToggle.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ===================================================================
  // 2. Terminal Tabs (Hero Section)
  // ===================================================================
  const termTabs = document.querySelectorAll('.term-tab');
  const termContents = document.querySelectorAll('.term-content');

  termTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      termTabs.forEach(t => t.classList.remove('active'));
      termContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = `tab-${tab.getAttribute('data-tab')}`;
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // ===================================================================
  // 3. Interactive "Pick Best Fit" ICP Simulation
  // ===================================================================
  const industrySelect = document.getElementById('icp-industry');
  const revenueSelect = document.getElementById('icp-revenue');
  const triggerSelect = document.getElementById('icp-trigger');
  const targetSelect = document.getElementById('icp-target');

  const resAvatar = document.getElementById('res-avatar');
  const resCompany = document.getElementById('res-company');
  const resDetails = document.getElementById('res-details');
  const resScore = document.getElementById('res-score');
  const resSignals = document.getElementById('res-signals');
  const resPerson = document.getElementById('res-person');
  const resRole = document.getElementById('res-role');
  const resHook = document.getElementById('res-hook');
  const resReply = document.getElementById('res-reply');
  const resCac = document.getElementById('res-cac');

  // ICP Data Matrix
  const icpData = {
    fintech: {
      avatar: 'FIN',
      company: 'PayVault Global',
      details: 'Series B • 140 Employees • New York, NY',
      person: 'Jordan Miller',
      role: 'VP Sales & Merchant Partnerships',
      signals: [
        '⚡ Raised $28M Series B led by Andreessen Horowitz',
        '👥 Hiring 7 Enterprise Account Executives on LinkedIn',
        '💳 Migrated API stack to modern merchant rails'
      ],
      hook: '"Saw PayVault just announced the $28M Series B and you’re scaling out enterprise merchant acquisition. When adding 7 AEs this quarter, high LinkedIn ad CAC ($1,100+) usually eats into unit economics before reps ramp..."',
      reply: '39.8%',
      cac: '$135',
      score: '97.2'
    },
    saas: {
      avatar: 'SaaS',
      company: 'Datastream Technologies',
      details: 'Series C • 180 Employees • San Francisco, CA',
      person: 'Elena Rostova',
      role: 'Chief Revenue Officer',
      signals: [
        '⚡ Closed $32M Series C led by Insight Partners',
        '👥 8 Openings for Outbound Account Executives',
        '📈 Headcount Growth: +48% YoY in Go-To-Market'
      ],
      hook: '"Saw Datastream just expanded your enterprise AE team by 8 heads after the $32M Series C. When ramping outbound capacity that quickly, keeping CAC under $250 without burning SDR bandwidth is usually the bottleneck..."',
      reply: '38.4%',
      cac: '$125',
      score: '96.8'
    },
    ai: {
      avatar: 'AI',
      company: 'NeuroScale Compute',
      details: 'Series A • 65 Employees • Seattle, WA',
      person: 'Dr. Aaron Zhang',
      role: 'Head of Commercial Growth & GTM',
      signals: [
        '⚡ $18M Series A from Founders Fund',
        '👥 5 Enterprise Sales roles newly listed on Greenhouse',
        '🧠 250k+ GitHub stars across dev community'
      ],
      hook: '"Noticed NeuroScale just launched your enterprise inference cluster and brought on 5 enterprise sales reps. Dev-led growth converts fast, but outbound directly to VP Engineering targets at Fortune 500s usually drives 4x bigger ACVs..."',
      reply: '42.1%',
      cac: '$110',
      score: '98.5'
    },
    cyber: {
      avatar: 'SEC',
      company: 'FortressGuard Identity',
      details: 'Series C • 220 Employees • Boston, MA',
      person: 'Sarah Vance',
      role: 'VP Global Enterprise Sales',
      signals: [
        '⚡ Series C $50M round announcement',
        '👥 Target account expansion into Tier-1 Banking',
        '🛡️ Replacement cycle trigger: Legacy Okta integrations'
      ],
      hook: '"Saw FortressGuard is pushing aggressively into Tier-1 regional banks post your Series C. Reaching risk-averse CISOs with generic spam gets domains blacklisted, but our deep intent mapping targets only teams with active compliance audit triggers..."',
      reply: '35.6%',
      cac: '$158',
      score: '95.4'
    }
  };

  function updatePickBestFit() {
    const selectedIndustry = industrySelect ? industrySelect.value : 'saas';
    const data = icpData[selectedIndustry] || icpData.saas;

    // Modify slightly based on trigger & role
    const selectedTrigger = triggerSelect ? triggerSelect.options[triggerSelect.selectedIndex].text : '';
    const selectedRole = targetSelect ? targetSelect.options[targetSelect.selectedIndex].text : '';

    if (resAvatar) resAvatar.textContent = data.avatar;
    if (resCompany) resCompany.textContent = data.company;
    if (resDetails) resDetails.textContent = data.details;
    if (resScore) resScore.innerHTML = `${data.score}<span>/100</span>`;
    if (resPerson) resPerson.textContent = data.person;
    if (resRole) resRole.textContent = selectedRole || data.role;
    if (resReply) resReply.textContent = data.reply;
    if (resCac) resCac.textContent = data.cac;
    if (resHook) resHook.textContent = data.hook;

    if (resSignals) {
      let signalsHTML = data.signals.map(s => `<span class="intent-pill">${s}</span>`).join('');
      if (selectedTrigger) {
        signalsHTML += `<span class="intent-pill" style="border-color: rgba(99, 102, 241, 0.4); background: rgba(99, 102, 241, 0.1);">🎯 Active Filter: ${selectedTrigger}</span>`;
      }
      resSignals.innerHTML = signalsHTML;
    }

    // Flash result card smoothly
    const fitCard = document.getElementById('fit-result-card');
    if (fitCard) {
      fitCard.style.borderColor = 'rgba(99, 102, 241, 0.6)';
      setTimeout(() => {
        fitCard.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }, 350);
    }
  }

  [industrySelect, revenueSelect, triggerSelect, targetSelect].forEach(sel => {
    if (sel) sel.addEventListener('change', updatePickBestFit);
  });

  // ===================================================================
  // 4. Interactive CAC & ROI Calculator
  // ===================================================================
  const sliderMeetings = document.getElementById('target-meetings');
  const sliderAcv = document.getElementById('deal-size');
  const sliderClose = document.getElementById('close-rate');

  const valMeetings = document.getElementById('val-meetings');
  const valAcv = document.getElementById('val-acv');
  const valClose = document.getElementById('val-close');

  const outPipeline = document.getElementById('out-pipeline');
  const outArr = document.getElementById('out-arr');
  const outCac = document.getElementById('out-cac');
  const outSavings = document.getElementById('out-savings');

  function formatCurrency(num) {
    return '$' + num.toLocaleString('en-US');
  }

  function updateCacCalculator() {
    if (!sliderMeetings || !sliderAcv || !sliderClose) return;

    const meetings = parseInt(sliderMeetings.value, 10);
    const acv = parseInt(sliderAcv.value, 10);
    const closeRate = parseInt(sliderClose.value, 10) / 100;

    // Update Label texts
    valMeetings.textContent = `${meetings} Demos / mo`;
    valAcv.textContent = formatCurrency(acv);
    valClose.textContent = `${Math.round(closeRate * 100)}%`;

    // Calculations:
    // Monthly Pipeline Added = meetings * ACV
    const monthlyPipeline = meetings * acv;
    
    // Projected Annual Closed ARR = (meetings * 12) * closeRate * ACV
    const annualClosedArr = Math.round((meetings * 12) * closeRate * acv);

    // LeftClick Demo CAC (economies of scale):
    // baseline ~$165, scales down to $120 at higher meeting tiers
    const leftClickCac = Math.round(175 - (meetings * 0.6));

    // Typical Paid Ad CAC for B2B Qualified Demo: ~$850
    const typicalAdCac = 850;
    const annualSavings = Math.round((meetings * 12) * (typicalAdCac - leftClickCac));

    if (outPipeline) outPipeline.textContent = formatCurrency(monthlyPipeline);
    if (outArr) outArr.textContent = formatCurrency(annualClosedArr);
    if (outCac) outCac.textContent = `$${leftClickCac}`;
    if (outSavings) outSavings.textContent = formatCurrency(annualSavings);
  }

  if (sliderMeetings && sliderAcv && sliderClose) {
    sliderMeetings.addEventListener('input', updateCacCalculator);
    sliderAcv.addEventListener('input', updateCacCalculator);
    sliderClose.addEventListener('input', updateCacCalculator);
    updateCacCalculator();
  }

  // ===================================================================
  // 5. FAQ Accordion Interaction
  // ===================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(i => i.classList.remove('active'));
        // Toggle clicked
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
  }

  // ===================================================================
  // 6. Strategy Session Modal Flow
  // ===================================================================
  const bookingModal = document.getElementById('booking-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalTriggers = document.querySelectorAll('.open-modal-trigger, #open-booking-btn');
  const timeSlots = document.querySelectorAll('.time-slot');
  const bookingForm = document.getElementById('booking-form');
  const bookingSuccess = document.getElementById('booking-success');
  const closeSuccessBtn = document.getElementById('close-success-btn');
  let selectedTimeSlot = 'Tomorrow, 10:00 AM EST';

  function openModal() {
    if (bookingModal) {
      bookingModal.classList.add('active');
      bookingModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      bookingModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      // Reset form after short delay
      setTimeout(() => {
        if (bookingForm) bookingForm.style.display = 'block';
        if (bookingSuccess) bookingSuccess.style.display = 'none';
      }, 300);
    }
  }

  openModalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeModal();
    });
  }

  // Time slot selection
  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');
      selectedTimeSlot = slot.getAttribute('data-time') || slot.textContent.trim();
    });
  });

  // Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('lead-email');
      const emailVal = emailInput ? emailInput.value : 'your email';

      const successEmail = document.getElementById('success-email');
      const successTime = document.getElementById('success-time');
      if (successEmail) successEmail.textContent = emailVal;
      if (successTime) successTime.textContent = selectedTimeSlot;

      bookingForm.style.display = 'none';
      if (bookingSuccess) bookingSuccess.style.display = 'block';

      showToast(`Strategy Session booked for ${selectedTimeSlot}! Check your inbox.`);
    });
  }

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', closeModal);
  }

  // ===================================================================
  // 7. Toast Notification Utility
  // ===================================================================
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="color: #10b981; font-weight: bold;">✔</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // ===================================================================
  // 8. Dynamic Metric Counter Animation (Hero)
  // ===================================================================
  const metricValues = document.querySelectorAll('.metric-value');

  function animateCounters() {
    metricValues.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1400; // ms
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = target * easeProgress;

        if (target % 1 === 0) {
          el.textContent = `${prefix}${Math.round(currentVal)}${suffix}`;
        } else {
          el.textContent = `${prefix}${currentVal.toFixed(1)}${suffix}`;
        }

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          el.textContent = `${prefix}${target}${suffix}`;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  // Run metric counter animation
  setTimeout(animateCounters, 200);

  // Active Nav link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ===================================================================
  // 9. Authentication UI Logic (Modal, Tabs, Password Strength & Auth State)
  // ===================================================================
  const authModal = document.getElementById('auth-modal');
  const authCloseBtn = document.getElementById('auth-modal-close-btn');
  const openLoginBtns = document.querySelectorAll('#open-login-btn, #mobile-login-btn, #link-switch-login, #link-forgot-back-login, #btn-forgot-return-login');
  const openSignupBtns = document.querySelectorAll('#open-signup-btn, #mobile-signup-btn, #link-switch-signup');
  
  const authTitle = document.getElementById('auth-modal-title');
  const authSubtitle = document.getElementById('auth-modal-subtitle');
  const authTabsContainer = document.getElementById('auth-tabs-container');
  const authSocialContainer = document.getElementById('auth-social-container');
  
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const authGlider = document.getElementById('auth-glider');
  
  const formLogin = document.getElementById('form-login');
  const formSignup = document.getElementById('form-signup');
  const formForgot = document.getElementById('form-forgot');
  const forgotSuccessBox = document.getElementById('forgot-success-box');
  const linkForgotPass = document.getElementById('link-forgot-pass');

  const userProfileMenu = document.getElementById('user-profile-menu');
  const userAvatarBtn = document.getElementById('user-avatar-btn');
  const navAuthBtns = document.querySelectorAll('.nav-auth-btn');
  const logoutBtn = document.getElementById('logout-btn');

  let currentAuthMode = 'login'; // 'login', 'signup', 'forgot'

  // Open Auth Modal
  function openAuthModal(mode = 'login') {
    if (!authModal) return;
    authModal.classList.add('active');
    authModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    switchAuthMode(mode);
  }

  // Close Auth Modal
  function closeAuthModal() {
    if (!authModal) return;
    authModal.classList.remove('active');
    authModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Switch Auth Mode
  function switchAuthMode(mode) {
    currentAuthMode = mode;
    
    // Reset forms visibility
    if (formLogin) formLogin.style.display = 'none';
    if (formSignup) formSignup.style.display = 'none';
    if (formForgot) formForgot.style.display = 'none';
    if (forgotSuccessBox) forgotSuccessBox.style.display = 'none';

    if (mode === 'login') {
      if (authTitle) authTitle.textContent = 'Welcome Back';
      if (authSubtitle) authSubtitle.textContent = 'Log in to your account to manage outbound pipelines and lead intelligence.';
      if (authTabsContainer) authTabsContainer.style.display = 'block';
      if (authSocialContainer) authSocialContainer.style.display = 'block';
      
      if (tabLogin) {
        tabLogin.classList.add('active');
        tabLogin.setAttribute('aria-selected', 'true');
      }
      if (tabSignup) {
        tabSignup.classList.remove('active');
        tabSignup.setAttribute('aria-selected', 'false');
      }
      if (authGlider) authGlider.classList.remove('signup');

      if (formLogin) formLogin.style.display = 'flex';
    } else if (mode === 'signup') {
      if (authTitle) authTitle.textContent = 'Create Your Free Account';
      if (authSubtitle) authSubtitle.textContent = 'Join 500+ revenue teams cutting CAC and automating outbound workflows.';
      if (authTabsContainer) authTabsContainer.style.display = 'block';
      if (authSocialContainer) authSocialContainer.style.display = 'block';
      
      if (tabSignup) {
        tabSignup.classList.add('active');
        tabSignup.setAttribute('aria-selected', 'true');
      }
      if (tabLogin) {
        tabLogin.classList.remove('active');
        tabLogin.setAttribute('aria-selected', 'false');
      }
      if (authGlider) authGlider.classList.add('signup');

      if (formSignup) formSignup.style.display = 'flex';
    } else if (mode === 'forgot') {
      if (authTitle) authTitle.textContent = 'Reset Password';
      if (authSubtitle) authSubtitle.textContent = 'We will email you step-by-step instructions to recover your account.';
      if (authTabsContainer) authTabsContainer.style.display = 'none';
      if (authSocialContainer) authSocialContainer.style.display = 'none';

      if (formForgot) formForgot.style.display = 'flex';
    }
  }

  // Event Triggers for Modal Opening
  openLoginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal('login');
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });

  openSignupBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal('signup');
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });

  if (linkForgotPass) {
    linkForgotPass.addEventListener('click', (e) => {
      e.preventDefault();
      switchAuthMode('forgot');
    });
  }

  if (tabLogin) {
    tabLogin.addEventListener('click', () => switchAuthMode('login'));
  }

  if (tabSignup) {
    tabSignup.addEventListener('click', () => switchAuthMode('signup'));
  }

  if (authCloseBtn) {
    authCloseBtn.addEventListener('click', closeAuthModal);
  }

  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeAuthModal();
    });
  }

  // ESC Key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (authModal && authModal.classList.contains('active')) closeAuthModal();
      if (bookingModal && bookingModal.classList.contains('active')) closeModal();
    }
  });

  // Password Visibility Toggle
  const togglePassBtns = document.querySelectorAll('.btn-toggle-pass');
  togglePassBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');
      
      const eyeIcon = btn.querySelector('svg');
      if (eyeIcon) {
        eyeIcon.innerHTML = isPassword
          ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`
          : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
      }
    });
  });

  // Live Password Strength Indicator & Checklist
  const signupPassInput = document.getElementById('signup-password');
  const strengthFill = document.getElementById('strength-fill');
  const strengthText = document.getElementById('strength-text');

  const reqLength = document.getElementById('req-length');
  const reqUpper = document.getElementById('req-upper');
  const reqNumber = document.getElementById('req-number');
  const reqSpecial = document.getElementById('req-special');

  if (signupPassInput) {
    signupPassInput.addEventListener('input', () => {
      const val = signupPassInput.value;
      
      const hasLength = val.length >= 8;
      const hasUpper = /[A-Z]/.test(val);
      const hasNumber = /[0-9]/.test(val);
      const hasSpecial = /[^A-Za-z0-9]/.test(val);

      updateReqItem(reqLength, hasLength);
      updateReqItem(reqUpper, hasUpper);
      updateReqItem(reqNumber, hasNumber);
      updateReqItem(reqSpecial, hasSpecial);

      let score = 0;
      if (hasLength) score++;
      if (hasUpper) score++;
      if (hasNumber) score++;
      if (hasSpecial) score++;

      if (!strengthFill || !strengthText) return;

      if (val.length === 0) {
        strengthFill.style.width = '0%';
        strengthFill.style.backgroundColor = 'var(--brand-rose)';
        strengthText.textContent = 'Empty';
        strengthText.style.color = 'var(--text-muted)';
      } else if (score <= 1) {
        strengthFill.style.width = '25%';
        strengthFill.style.backgroundColor = 'var(--brand-rose)';
        strengthText.textContent = 'Weak';
        strengthText.style.color = 'var(--brand-rose)';
      } else if (score === 2) {
        strengthFill.style.width = '50%';
        strengthFill.style.backgroundColor = 'var(--brand-amber)';
        strengthText.textContent = 'Fair';
        strengthText.style.color = 'var(--brand-amber)';
      } else if (score === 3) {
        strengthFill.style.width = '75%';
        strengthFill.style.backgroundColor = 'var(--brand-cyan)';
        strengthText.textContent = 'Strong';
        strengthText.style.color = 'var(--brand-cyan)';
      } else {
        strengthFill.style.width = '100%';
        strengthFill.style.backgroundColor = 'var(--brand-emerald)';
        strengthText.textContent = 'Excellent';
        strengthText.style.color = 'var(--brand-emerald)';
      }
    });
  }

  function updateReqItem(el, isValid) {
    if (!el) return;
    const badge = el.querySelector('.req-badge');
    if (isValid) {
      el.classList.add('valid');
      if (badge) badge.textContent = '✓';
    } else {
      el.classList.remove('valid');
      if (badge) badge.textContent = '✕';
    }
  }

  // Simulated User Auth State
  function setLoggedInUser(name, email) {
    const initials = name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AM';
    
    const navName = document.getElementById('user-nav-name');
    const navInitials = document.getElementById('user-avatar-initials');
    const dropdownName = document.getElementById('dropdown-user-name');
    const dropdownEmail = document.getElementById('dropdown-user-email');

    const nameParts = name.trim().split(' ');
    const shortDisplay = nameParts[0] + (nameParts[1] ? ' ' + nameParts[1][0] + '.' : '');

    if (navName) navName.textContent = shortDisplay;
    if (navInitials) navInitials.textContent = initials;
    if (dropdownName) dropdownName.textContent = name;
    if (dropdownEmail) dropdownEmail.textContent = email;

    // Toggle header controls
    navAuthBtns.forEach(btn => btn.style.display = 'none');
    if (userProfileMenu) userProfileMenu.style.display = 'block';

    localStorage.setItem('leftclick_user', JSON.stringify({ name, email }));
  }

  function setLoggedOutUser() {
    navAuthBtns.forEach(btn => btn.style.display = '');
    if (userProfileMenu) userProfileMenu.style.display = 'none';
    if (userProfileMenu) userProfileMenu.classList.remove('open');
    localStorage.removeItem('leftclick_user');
  }

  // Check saved session on load
  const savedUser = localStorage.getItem('leftclick_user');
  if (savedUser) {
    try {
      const parsed = JSON.parse(savedUser);
      setLoggedInUser(parsed.name, parsed.email);
    } catch (err) {
      // Ignore parse error
    }
  }

  // User Dropdown Toggle
  if (userAvatarBtn && userProfileMenu) {
    userAvatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userProfileMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!userProfileMenu.contains(e.target)) {
        userProfileMenu.classList.remove('open');
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      setLoggedOutUser();
      showToast('Logged out successfully.');
    });
  }

  // Form Submissions (Log In, Sign Up, Reset Password)
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-submit-login');
      const textSpan = btn.querySelector('.btn-text');
      const spinner = btn.querySelector('.spinner-loader');

      const email = document.getElementById('login-email').value;

      if (textSpan) textSpan.style.display = 'none';
      if (spinner) spinner.style.display = 'block';

      setTimeout(() => {
        if (textSpan) textSpan.style.display = 'block';
        if (spinner) spinner.style.display = 'none';
        
        const rawName = email.split('@')[0].replace(/[\._]/g, ' ');
        const userName = rawName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        setLoggedInUser(userName, email);
        closeAuthModal();
        showToast(`Welcome back, ${userName}! Logged in successfully.`);
      }, 1000);
    });
  }

  if (formSignup) {
    formSignup.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-submit-signup');
      const textSpan = btn.querySelector('.btn-text');
      const spinner = btn.querySelector('.spinner-loader');

      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;

      if (textSpan) textSpan.style.display = 'none';
      if (spinner) spinner.style.display = 'block';

      setTimeout(() => {
        if (textSpan) textSpan.style.display = 'block';
        if (spinner) spinner.style.display = 'none';
        
        setLoggedInUser(name, email);
        closeAuthModal();
        showToast(`Account created successfully! Welcome to LeftClick, ${name}.`);
      }, 1200);
    });
  }

  if (formForgot) {
    formForgot.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-submit-forgot');
      const textSpan = btn.querySelector('.btn-text');
      const spinner = btn.querySelector('.spinner-loader');

      const email = document.getElementById('forgot-email').value;
      const targetEmailSpan = document.getElementById('forgot-target-email');
      if (targetEmailSpan) targetEmailSpan.textContent = email;

      if (textSpan) textSpan.style.display = 'none';
      if (spinner) spinner.style.display = 'block';

      setTimeout(() => {
        if (textSpan) textSpan.style.display = 'block';
        if (spinner) spinner.style.display = 'none';
        
        formForgot.style.display = 'none';
        if (forgotSuccessBox) forgotSuccessBox.style.display = 'block';
      }, 900);
    });
  }

  // Social Auth Handler Simulation
  const googleBtn = document.getElementById('google-auth-btn');
  const githubBtn = document.getElementById('github-auth-btn');

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      setLoggedInUser('Sarah Connor', 'sarah@skynet-defence.io');
      closeAuthModal();
      showToast('Authenticated with Google successfully!');
    });
  }

  if (githubBtn) {
    githubBtn.addEventListener('click', () => {
      setLoggedInUser('Devon Miles', 'devon@knight-industries.com');
      closeAuthModal();
      showToast('Authenticated with GitHub successfully!');
    });
  }

});

