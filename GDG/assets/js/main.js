/**
 * DevGlow Engine - Interactive Features & Dynamic Customization
 * Google Developer Group on Campus - SOA ITER Chapter (gdgociter.in)
 * Features:
 * - Light/Dark Theme Switcher with localStorage persistence
 * - 6-Color Accent Customizer (Google Blue, Red, Green, Yellow, Violet, Cyan)
 * - 16:9 Aspect Ratio Media Controls
 * - Interactive Developer CLI Terminal Widget
 * - Live Event Countdown HUD
 * - Scroll Progress Indicator & Back to Top Dock
 * - Interactive FAQ Accordion
 * - 3D Volumetric Emblem & Hero Particle Constellation
 * - 3D Zig-Zag Timeline Runner
 * - Full Team Search, Filter & Lightbox Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndColorEngine();
  initScrollProgressBar();
  initHeroCanvas();
  initHero3DEmblem();
  initHeroTypewriter();
  initDeveloperTerminal();
  initEventCountdown();
  initFaqAccordion();
  initStatsCounters();
  initFloatingPillsParallax();
  initTimelineRunner();
  initTeamFiltering();
  initMemberModal();
  initEventModal();
  initGalleryLightbox();
  initMobileNav();
  initMagneticButtons();
  initSoundEngine();
  initCommunityModal();
});

/* ==========================================================================
   1. THEME ENGINE (LIGHT & DARK MODE WITH PERSISTENCE)
   ========================================================================== */
function initThemeAndColorEngine() {
  const root = document.documentElement;

  // Retrieve or initialize saved preferences (default: dark)
  let currentTheme = localStorage.getItem('gdg_theme_mode') || 'dark';
  let isBootstrapping = true;

  function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('gdg_theme_mode', theme);

    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }

    // Update icon states across all theme toggle buttons
    const themeIcons = document.querySelectorAll('.theme-toggle-icon');
    themeIcons.forEach((icon) => {
      icon.textContent = theme === 'light' ? 'dark_mode' : 'light_mode';
    });

    const themeLabels = document.querySelectorAll('.theme-toggle-label');
    themeLabels.forEach((label) => {
      label.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
    });

    if (!isBootstrapping && typeof playHapticSound === 'function') {
      playHapticSound('theme');
    }
  }

  // Initial application
  applyTheme(currentTheme);
  isBootstrapping = false;

  // Bind all theme toggles (header & mobile drawer)
  document.querySelectorAll('.theme-toggle-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });

  // Expose global helper
  window.setGdgTheme = applyTheme;
}

/* ==========================================================================
   2. TOP SCROLL PROGRESS BAR & FLOATING BACK-TO-TOP
   ========================================================================== */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'scale-90');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'scale-90');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   3. HERO CANVAS PARTICLE CONSTELLATION SYSTEM
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const heroSection = canvas.closest('section') || canvas.parentElement;

  let width = (canvas.width = heroSection.offsetWidth);
  let height = (canvas.height = heroSection.offsetHeight);

  const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];
  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 9500), 75);

  const mouse = {
    x: null,
    y: null,
    radius: 140,
    isActive: false
  };

  class Particle {
    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 1.2;
      this.baseSize = this.size;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.alpha = Math.random() * 0.5 + 0.3;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulse = Math.random() * Math.PI;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      this.pulse += this.pulseSpeed;
      this.currentAlpha = this.alpha + Math.sin(this.pulse) * 0.2;

      // Mouse proximity interaction
      if (mouse.isActive && mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          this.x -= (dx / dist) * force;
          this.y -= (dy / dist) * force;
          this.size = this.baseSize * 1.5;
        } else {
          this.size = this.baseSize;
        }
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0.1, Math.min(1, this.currentAlpha));
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function handleResize() {
    width = canvas.width = heroSection.offsetWidth;
    height = canvas.height = heroSection.offsetHeight;
  }

  window.addEventListener('resize', handleResize);

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.isActive = true;
  });

  heroSection.addEventListener('mouseleave', () => {
    mouse.isActive = false;
  });

  // Connecting constellation lines
  function drawConnections() {
    const maxDist = 110;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / maxDist) * 0.16;
          ctx.strokeStyle = '#b5c4ff';
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      if (mouse.isActive && mouse.x !== null) {
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = (1 - mdist / mouse.radius) * 0.35;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. 3D GYROSCOPIC TILT RIG & SPARK BURST
   ========================================================================== */
function initHero3DEmblem() {
  const wrapper = document.getElementById('hero-emblem-3d-wrapper');
  const card = document.getElementById('hero-emblem-card');
  const glare = document.getElementById('hero-emblem-glare');
  if (!wrapper || !card) return;

  let isHovered = false;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;
  let targetTranslateZ = 0;
  let currentTranslateZ = 0;
  let idleTime = 0;

  function renderPhysics() {
    if (!isHovered) {
      idleTime += 0.025;
      targetRotateX = Math.cos(idleTime * 0.9) * 3.5;
      targetRotateY = Math.sin(idleTime) * 4.5;
      targetTranslateZ = Math.sin(idleTime * 1.4) * 6;
    }

    currentRotateX += (targetRotateX - currentRotateX) * 0.09;
    currentRotateY += (targetRotateY - currentRotateY) * 0.09;
    currentTranslateZ += (targetTranslateZ - currentTranslateZ) * 0.09;

    card.style.transform = `rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) translateZ(${currentTranslateZ.toFixed(2)}px)`;

    requestAnimationFrame(renderPhysics);
  }
  requestAnimationFrame(renderPhysics);

  wrapper.addEventListener('mouseenter', () => {
    isHovered = true;
    targetTranslateZ = 16;
  });

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetRotateX = -((y - centerY) / centerY) * 16;
    targetRotateY = ((x - centerX) / centerX) * 18;

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 65%)`;
    }
  });

  wrapper.addEventListener('mouseleave', () => {
    isHovered = false;
    targetRotateX = 0;
    targetRotateY = 0;
    targetTranslateZ = 0;
  });

  wrapper.addEventListener('click', (e) => {
    createSparkBurst(e.clientX, e.clientY);
  });
}

function createSparkBurst(clickX, clickY) {
  const container = document.body;
  const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FFFFFF'];
  const sparkCount = 28;

  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('span');
    spark.className = 'spark-particle';

    const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
    const distance = Math.random() * 85 + 40;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    const size = Math.random() * 6 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];

    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.backgroundColor = color;
    spark.style.boxShadow = `0 0 10px ${color}`;
    spark.style.left = `${clickX}px`;
    spark.style.top = `${clickY}px`;
    spark.style.setProperty('--tx', `${tx}px`);
    spark.style.setProperty('--ty', `${ty}px`);

    container.appendChild(spark);

    spark.addEventListener('animationend', () => {
      spark.remove();
    });
  }
}

/* ==========================================================================
   5. HERO PARALLAX FLOATING TECH PILLS
   ========================================================================== */
function initFloatingPillsParallax() {
  const hero = document.getElementById('hero-section');
  const pills = document.querySelectorAll('.floating-pill');
  if (!hero || pills.length === 0) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    pills.forEach((pill, idx) => {
      const depth = (idx + 1) * 15;
      const moveX = x * depth;
      const moveY = y * depth;
      pill.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    pills.forEach((pill) => {
      pill.style.transform = `translate3d(0, 0, 0)`;
    });
  });
}

/* ==========================================================================
   6. DYNAMIC KINETIC TYPEWRITER TEXT
   ========================================================================== */
function initHeroTypewriter() {
  const textElement = document.getElementById('hero-typewriter');
  if (!textElement) return;

  const phrases = [
    'WHERE CAMPUS MEETS GOOGLE',
    'The Bridge Between Theory and Impact',
    'Empowering 500+ Student Engineers at SOA ITER',
    '30+ Tech Events, Workshops & Hackathons',
    'Google Cloud, Gemini AI, Web & Android Systems'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 90;

  function typeTick() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      delay = 45;
    } else {
      charIndex++;
      delay = 90;
    }

    textElement.textContent = currentPhrase.substring(0, charIndex);

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeTick, delay);
  }

  typeTick();
}

/* ==========================================================================
   7. INTERACTIVE DEVELOPER CLI TERMINAL WIDGET
   ========================================================================== */
function initDeveloperTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const chipContainer = document.getElementById('terminal-chips');
  if (!input || !output) return;

  const history = [];
  let historyIdx = -1;

  const commands = {
    help: () => `Available GDG Commands:
  • <span class="text-primary font-bold">events</span>     - List flagship upcoming & past events
  • <span class="text-primary font-bold">tracks</span>     - Display technical learning tracks
  • <span class="text-primary font-bold">team</span>       - View chapter leads & core architects
  • <span class="text-primary font-bold">rsvp</span>       - Official link to join chapter WhatsApp
  • <span class="text-primary font-bold">theme</span>      - Toggle light/dark mode (e.g. 'theme light' / 'theme dark')
  • <span class="text-primary font-bold">color</span>      - Google 4-color brand identity
  • <span class="text-primary font-bold">quote</span>      - Inspiring developer quotation
  • <span class="text-primary font-bold">party</span>      - Trigger celebratory confetti explosion
  • <span class="text-primary font-bold">clear</span>      - Clean up terminal display`,

    events: () => `<span class="text-google-blue font-bold">Upcoming & Flagship Events:</span>
  1. <span class="text-white font-bold">Decode the Tech</span> (May 15, 2026) - Logic & Tech Trivia Flagship
  2. <span class="text-white font-bold">MayaVyuh: The Prompt War</span> (Apr 5, 2026) - GenAI LLM Battle
  3. <span class="text-white font-bold">AI Treasure Hunt</span> (Apr 4, 2026) - Algorithmic Campus Hunt
  4. <span class="text-white font-bold">Algorithm Arena</span> (Dec 20, 2025) - DSA Sprints
Type 'rsvp' to join the community on WhatsApp!`,

    tracks: () => `<span class="text-google-green font-bold">Engineering Specializations:</span>
  ☁️ <span class="text-white font-bold">Web & Cloud Systems</span>: GCP, Firebase, Serverless, Next.js
  📱 <span class="text-white font-bold">Mobile Engineering</span>: Kotlin, Android Jetpack Compose, Flutter
  🤖 <span class="text-white font-bold">AI & Machine Learning</span>: Gemini API, LLM Agents, TensorFlow
  ⚡ <span class="text-white font-bold">Open Source & DevOps</span>: Git, Docker, Kubernetes, CI/CD`,

    team: () => `<span class="text-google-red font-bold">Core Leadership (SOA ITER Chapter):</span>
  • Executive Chapter Lead: <span class="text-white font-bold">Mohammad Faiz</span>
  • Technical Engineering Lead: <span class="text-white font-bold">Kumar Rakshit</span>
  • PR & Operations Lead: <span class="text-white font-bold">Harsh Kumar</span>
  • Media Lead: <span class="text-white font-bold">Mansa Siddhi</span>
  • Design Lead: <span class="text-white font-bold">Rajana Durga Pavan Kumar</span>
Explore all 44 verified contributors in the Team section below.`,

    rsvp: () => `<span class="text-google-yellow font-bold">Join GDG on Campus ITER:</span>
WhatsApp Community: <a href="https://chat.whatsapp.com/HsvMXSnPBqx7w7RLJCtUc8?mode=wwt" target="_blank" class="text-primary underline">chat.whatsapp.com/HsvMXSnPBqx7w7RLJCtUc8</a>
Official Platform: <a href="https://gdg.community.dev/gdg-on-campus-institute-of-technical-education-research-bhubaneswar-india/" target="_blank" class="text-primary underline">gdg.community.dev (ITER Chapter)</a>`,

    quote: () => {
      const quotes = [
        '"Technology is best when it brings people together." — Matt Mullenweg',
        '"Talk is cheap. Show me the code." — Linus Torvalds',
        '"First, solve the problem. Then, write the code." — John Johnson',
        '"At GDG ITER, every student has the potential to ship something revolutionary."'
      ];
      return `<span class="text-tertiary">${quotes[Math.floor(Math.random() * quotes.length)]}</span>`;
    },

    party: () => {
      triggerConfetti();
      return '<span class="text-google-yellow font-bold">🎉 WOOHOO! Let\'s build the future together! (Confetti triggered!)</span>';
    },

    confetti: () => {
      triggerConfetti();
      return '<span class="text-google-green font-bold">✨ Confetti launched across the screen!</span>';
    },

    clear: () => {
      output.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    history.push(cmd);
    historyIdx = history.length;

    // Echo input
    const inputRow = document.createElement('div');
    inputRow.className = 'mt-2 text-on-surface flex items-center gap-2';
    inputRow.innerHTML = `<span class="text-tertiary">visitor@gdg-iter:~$</span> <span>${escapeHtml(cmd)}</span>`;
    output.appendChild(inputRow);

    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts[1] ? parts[1].toLowerCase() : '';

    const responseRow = document.createElement('div');
    responseRow.className = 'mt-1 text-on-surface-variant font-mono whitespace-pre-wrap';

    if (mainCmd === 'clear') {
      output.innerHTML = '';
      return;
    } else if (mainCmd === 'theme') {
      if (arg === 'light' || arg === 'dark') {
        window.setGdgTheme(arg);
        responseRow.innerHTML = `<span class="text-primary font-bold">Switched theme to ${arg} mode!</span>`;
      } else {
        const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        window.setGdgTheme(next);
        responseRow.innerHTML = `<span class="text-primary font-bold">Toggled theme to ${next} mode!</span>`;
      }
    } else if (mainCmd === 'color') {
      responseRow.innerHTML = `<span class="text-google-blue font-bold">● Blue (#4285F4)</span> &nbsp; <span class="text-google-red font-bold">● Red (#EA4335)</span> &nbsp; <span class="text-google-yellow font-bold">● Yellow (#FBBC04)</span> &nbsp; <span class="text-google-green font-bold">● Green (#34A853)</span><div class="text-[11px] text-outline mt-1">Official GDG brand identity colors active.</div>`;
    } else if (commands[mainCmd]) {
      responseRow.innerHTML = commands[mainCmd]();
    } else {
      responseRow.innerHTML = `<span class="text-error">Command not recognized: '${escapeHtml(cmd)}'. Type <span class="text-primary font-bold">'help'</span> for list of commands.</span>`;
    }

    if (responseRow.innerHTML) {
      output.appendChild(responseRow);
    }

    output.scrollTop = output.scrollHeight;
  }

  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (typeof playHapticSound === 'function') playHapticSound('click');
      executeCommand(input.value);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (typeof playHapticSound === 'function') playHapticSound('terminal');
      if (historyIdx > 0) {
        historyIdx--;
        input.value = history[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      if (typeof playHapticSound === 'function') playHapticSound('terminal');
      if (historyIdx < history.length - 1) {
        historyIdx++;
        input.value = history[historyIdx];
      } else {
        historyIdx = history.length;
        input.value = '';
      }
    } else if (e.key.length === 1 || e.key === 'Backspace') {
      if (typeof playHapticSound === 'function') playHapticSound('terminal');
    }
  });

  // Chip buttons click
  if (chipContainer) {
    chipContainer.querySelectorAll('.terminal-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        if (typeof playHapticSound === 'function') playHapticSound('click');
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) {
          executeCommand(cmd);
        }
      });
    });
  }
}

/* Confetti launcher helper */
function triggerConfetti() {
  const count = 75;
  const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#A855F7', '#06B6D4'];

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'fixed z-[9999] pointer-events-none rounded-sm';
    const size = Math.random() * 8 + 6;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size * 0.6}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = '-20px';
    confetti.style.opacity = '1';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.transition = `all ${Math.random() * 2 + 1.5}s cubic-bezier(0.25, 1, 0.5, 1)`;

    document.body.appendChild(confetti);

    requestAnimationFrame(() => {
      confetti.style.top = `${Math.random() * 80 + 20}vh`;
      confetti.style.left = `${parseFloat(confetti.style.left) + (Math.random() - 0.5) * 30}vw`;
      confetti.style.opacity = '0';
      confetti.style.transform = `rotate(${Math.random() * 720}deg) scale(0.5)`;
    });

    setTimeout(() => confetti.remove(), 3500);
  }
}

/* ==========================================================================
   8. LIVE EVENT COUNTDOWN HUD
   ========================================================================== */
function initEventCountdown() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Target event: May 15, 2026 10:00:00 IST
  const targetDate = new Date('2026-05-15T10:00:00+05:30').getTime();

  function updateClock() {
    const now = new Date().getTime();
    let distance = targetDate - now;

    if (distance < 0) {
      distance = 0;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   9. INTERACTIVE FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-accordion-item');

  items.forEach((item) => {
    const header = item.querySelector('.faq-accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordions for clean UX
      items.forEach((other) => {
        other.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   10. ANIMATED STATS COUNTER
   ========================================================================== */
function initStatsCounters() {
  const statElements = document.querySelectorAll('.counter-stat');
  if (statElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1800;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.textContent = `${prefix}${Math.floor(count).toLocaleString()}${suffix}`;
          }, stepTime);

          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.25 }
  );

  statElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   11. 3D ZIG-ZAG TIMELINE RUNNER
   ========================================================================== */
function initTimelineRunner() {
  const wrapper = document.getElementById('timeline-flow-wrapper');
  const activePath = document.getElementById('timeline-active-path');
  const puck = document.getElementById('gdg-runner-puck');
  const puckCard = document.getElementById('gdg-puck-card');
  const steps = document.querySelectorAll('.timeline-step');
  if (!wrapper || !activePath || !puck) return;

  const pathLength = activePath.getTotalLength();
  activePath.style.strokeDasharray = pathLength;
  activePath.style.strokeDashoffset = pathLength;

  function updateTimelineRunner() {
    const rect = wrapper.getBoundingClientRect();
    const windowH = window.innerHeight;

    const startTrigger = windowH * 0.75;
    const scrollableH = rect.height - windowH * 0.35;
    const currentScroll = startTrigger - rect.top;
    let progress = currentScroll / scrollableH;
    progress = Math.max(0, Math.min(1, progress));

    const currentOffset = pathLength * (1 - progress);
    activePath.style.strokeDashoffset = currentOffset;

    const point = activePath.getPointAtLength(progress * pathLength);
    const forwardStep = Math.min(pathLength, progress * pathLength + 6);
    const forwardPoint = activePath.getPointAtLength(forwardStep);

    const dx = forwardPoint.x - point.x;
    const dy = forwardPoint.y - point.y;
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = angleRad * (180 / Math.PI);

    const tiltBank = Math.sin(angleRad) * 20;
    const tiltPitch = Math.cos(progress * Math.PI * 3) * 14;
    const dynamicScale = 1 + Math.sin(progress * Math.PI) * 0.16;

    puck.style.transform = `translate3d(${point.x - 32}px, ${point.y - 32}px, 0)`;
    if (puckCard) {
      puckCard.style.transform = `rotate(${angleDeg * 0.25}deg) rotateX(${tiltPitch}deg) rotateY(${tiltBank}deg) scale(${dynamicScale})`;
    }

    const stepProgress = progress * 4;
    steps.forEach((step, idx) => {
      if (stepProgress >= idx + 0.3) {
        step.classList.add('opacity-100');
        step.classList.remove('opacity-70');
      } else {
        step.classList.add('opacity-70');
        step.classList.remove('opacity-100');
      }
    });
  }

  window.addEventListener('scroll', updateTimelineRunner, { passive: true });
  window.addEventListener('resize', updateTimelineRunner);
  updateTimelineRunner();
}

/* ==========================================================================
   12. TEAM SEARCH & FILTER SYSTEM
   ========================================================================== */
function initTeamFiltering() {
  const searchInput = document.getElementById('member-search');
  const filterPills = document.querySelectorAll('.filter-pill');
  const memberCards = document.querySelectorAll('.member-card');
  const sections = document.querySelectorAll('.domain-section');
  const countBadge = document.getElementById('visible-member-count');

  if (memberCards.length === 0) return;

  let currentFilter = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    memberCards.forEach((card) => {
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const role = (card.getAttribute('data-role') || '').toLowerCase();
      const category = card.getAttribute('data-category') || '';

      const matchesSearch = !searchQuery || name.includes(searchQuery) || role.includes(searchQuery);
      const matchesCategory = currentFilter === 'all' || category === currentFilter;

      if (matchesSearch && matchesCategory) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (countBadge) {
      countBadge.textContent = `${visibleCount} Members`;
    }

    sections.forEach((sec) => {
      const visibleChildren = sec.querySelectorAll('.member-card:not(.hidden)');
      if (visibleChildren.length === 0) {
        sec.classList.add('hidden');
      } else {
        sec.classList.remove('hidden');
      }
    });
  }

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      currentFilter = pill.getAttribute('data-filter');

      filterPills.forEach((p) => {
        p.classList.remove('bg-primary', 'text-on-primary', 'shadow-[0_0_16px_rgba(181,196,255,0.4)]');
        p.classList.add('bg-surface-container-low', 'text-on-surface-variant');
      });

      pill.classList.remove('bg-surface-container-low', 'text-on-surface-variant');
      pill.classList.add('bg-primary', 'text-on-primary', 'shadow-[0_0_16px_rgba(181,196,255,0.4)]');

      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
}

/* ==========================================================================
   13. MEMBER DETAIL MODAL
   ========================================================================== */
function initMemberModal() {
  const modal = document.getElementById('member-detail-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('close-member-modal');
  const modalImg = document.getElementById('modal-member-img');
  const modalName = document.getElementById('modal-member-name');
  const modalRole = document.getElementById('modal-member-role');
  const modalTag = document.getElementById('modal-member-tag');

  document.querySelectorAll('.member-card').forEach((card) => {
    card.addEventListener('click', () => {
      const name = card.getAttribute('data-name');
      const role = card.getAttribute('data-role');
      const category = card.getAttribute('data-category');
      const img = card.querySelector('img')?.src;

      if (modalName) modalName.textContent = name;
      if (modalRole) modalRole.textContent = role;
      if (modalImg && img) modalImg.src = img;
      if (modalTag) {
        modalTag.textContent = category.toUpperCase();
        modalTag.className = `px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase ${
          category === 'lead'
            ? 'bg-error/20 text-error'
            : category === 'tech'
            ? 'bg-primary/20 text-primary'
            : category === 'prmanagement'
            ? 'bg-tertiary/20 text-tertiary'
            : category === 'media'
            ? 'bg-secondary/20 text-secondary'
            : 'bg-primary-container/20 text-primary-container'
        }`;
      }

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   14. EVENT DETAILS MODAL (16:9 PREVIEW FRAME)
   ========================================================================== */
function initEventModal() {
  const modal = document.getElementById('event-detail-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('close-event-modal');
  const modalTitle = document.getElementById('modal-event-title');
  const modalDate = document.getElementById('modal-event-date');
  const modalDesc = document.getElementById('modal-event-desc');
  const modalBadge = document.getElementById('modal-event-badge');

  document.querySelectorAll('.event-card-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const title = trigger.getAttribute('data-title');
      const date = trigger.getAttribute('data-date');
      const desc = trigger.getAttribute('data-desc');
      const track = trigger.getAttribute('data-track');
      const img = trigger.getAttribute('data-img');
      const modalImg = document.getElementById('modal-event-img');

      if (modalTitle) modalTitle.textContent = title;
      if (modalDate) modalDate.textContent = date;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalBadge) modalBadge.textContent = track;
      if (modalImg) {
        if (img) {
          modalImg.src = img;
          modalImg.classList.remove('hidden');
        } else {
          modalImg.classList.add('hidden');
        }
      }

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   15. CAMPUS IMPACT GALLERY LIGHTBOX (16:9 RATIO)
   ========================================================================== */
function initGalleryLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('close-lightbox');

  document.querySelectorAll('.gallery-card-trigger').forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img')?.src;
      const title = item.querySelector('h4')?.textContent || 'GDG ITER Community';
      const subtitle = item.querySelector('p')?.textContent || '';

      if (lightboxImg && img) lightboxImg.src = img;
      if (lightboxCaption) lightboxCaption.textContent = `${title} — ${subtitle}`;

      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

/* ==========================================================================
   16. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  if (!mobileToggle || !mobileDrawer) return;

  mobileToggle.addEventListener('click', () => {
    mobileDrawer.classList.toggle('hidden');
  });

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   17. MAGNETIC BUTTON HOVER EFFECT
   ========================================================================== */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-magnetic');

  buttons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });

    btn.addEventListener('click', function (e) {
      if (typeof playHapticSound === 'function') {
        playHapticSound('click');
      }
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ==========================================================================
   18. SYNTHETIC HAPTIC SOUND FX ENGINE (WEB AUDIO API)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = localStorage.getItem('gdg_sound_fx') === 'true';

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playHapticSound(type = 'click') {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'theme') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'terminal') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540 + Math.random() * 180, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.06);
      osc.frequency.setValueAtTime(783.99, now + 0.12);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch (err) {}
}

function initSoundEngine() {
  const soundToggles = document.querySelectorAll('.sound-toggle-trigger');

  function updateSoundUI() {
    soundToggles.forEach((btn) => {
      const icon = btn.querySelector('.sound-toggle-icon');
      if (icon) {
        icon.textContent = soundEnabled ? 'volume_up' : 'volume_off';
      }
      btn.setAttribute('title', soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects');
      if (soundEnabled) {
        btn.classList.add('text-primary');
      } else {
        btn.classList.remove('text-primary');
      }
    });
  }

  soundToggles.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundEnabled = !soundEnabled;
      localStorage.setItem('gdg_sound_fx', soundEnabled);
      updateSoundUI();
      if (soundEnabled) {
        playHapticSound('success');
      }
    });
  });

  updateSoundUI();
}

/* ==========================================================================
   19. WHATSAPP & COMMUNITY JOIN MODAL
   ========================================================================== */
function initCommunityModal() {
  const modal = document.getElementById('community-join-modal');
  const closeBtn = document.getElementById('close-community-modal');
  const copyBtn = document.getElementById('copy-invite-link-btn');
  const copyToast = document.getElementById('copy-toast-msg');

  if (!modal) return;

  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    playHapticSound('click');
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // Bind to any trigger element
  document.querySelectorAll('[data-open-community-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const link = 'https://chat.whatsapp.com/HsvMXSnPBqx7w7RLJCtUc8?mode=wwt';
      try {
        await navigator.clipboard.writeText(link);
      } catch (err) {
        const input = document.createElement('input');
        input.value = link;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      if (copyToast) {
        copyToast.classList.remove('hidden');
        setTimeout(() => copyToast.classList.add('hidden'), 2500);
      }
      playHapticSound('success');
    });
  }
}




