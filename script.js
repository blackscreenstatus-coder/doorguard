// ===== MM Enterprises — interactions =====

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close menu when a link is clicked (mobile)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
      nav.classList.remove('open');
    }
  });
}

// Auto-update footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


// ===== Reusable image slider =====
function initSlider({ sliderId, trackId, dotsId, prevId, nextId, interval = 4000 }) {
  const slider = document.getElementById(sliderId);
  const track = document.getElementById(trackId);
  const dotsWrap = document.getElementById(dotsId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  if (!slider || !track) return;

  const slides = track.querySelectorAll('.slide');
  const total = slides.length;
  let index = 0;
  let timer = null;

  // Build navigation dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }
  const dots = dotsWrap.querySelectorAll('button');

  function update() {
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function goTo(i) {
    index = (i + total) % total;
    update();
    restart();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, interval);
  }

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', restart);

  update();
  restart();
}

// Hero door slider
initSlider({
  sliderId: 'doorSlider',
  trackId: 'sliderTrack',
  dotsId: 'sliderDots',
  prevId: 'sliderPrev',
  nextId: 'sliderNext',
});

// Features section slider
initSlider({
  sliderId: 'featureSlider',
  trackId: 'featureTrack',
  dotsId: 'featureDots',
  prevId: 'featurePrev',
  nextId: 'featureNext',
  interval: 4500,
});


// ===== Scroll to top button =====
(function () {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  function toggle() {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggle();
})();
