/* Higher Vision Music — script.js */

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  const [a, b, c] = toggle.querySelectorAll('span');
  if (open) {
    a.style.transform = 'translateY(6.5px) rotate(45deg)';
    b.style.opacity = '0';
    c.style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    a.style.transform = b.style.opacity = c.style.transform = '';
  }
});
links.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.querySelectorAll('span').forEach(s => s.style.transform = s.style.opacity = '');
}));

// Scroll reveal with stagger
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // stagger siblings
    const siblings = [...(entry.target.parentElement?.querySelectorAll('.reveal') || [])];
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('revealed'), idx * 100);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// Playlist filter
const pills = document.querySelectorAll('.pill');
const cards = document.querySelectorAll('.playlist-card');

pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const filter = pill.dataset.filter;
    cards.forEach(card => {
      const tags = card.dataset.tags || '';
      const show = filter === 'all' || tags.includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + scrollY - nav.offsetHeight - 20;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
