'use strict';

const root = document.documentElement;
const themeButton = document.getElementById('theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');
document.getElementById('year').textContent = new Date().getFullYear();

function updateTheme() {
  const light = root.dataset.theme === 'light';
  const label = `Ativar tema ${light ? 'escuro' : 'claro'}`;
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
  themeColor.content = light ? '#f7f8f2' : '#10120f';
}
updateTheme();
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (_) {}
  updateTheme();
});

const menuButton = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
function closeMenu() {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}
menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.nav')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
matchMedia('(min-width: 581px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
const projectCount = document.getElementById('project-count');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(item => {
    const selected = item === chip;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  projects.forEach(project => {
    const visible = chip.dataset.filter === 'all' || project.dataset.tags.split(' ').includes(chip.dataset.filter);
    project.hidden = !visible;
    if (visible) { count++; project.classList.add('visible'); }
  });
  projectCount.textContent = `${count} ${count === 1 ? 'projeto' : 'projetos'}`;
}));

const copyButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
let copyReset;
function fallbackCopy(value) {
  const input = document.createElement('textarea');
  input.value = value;
  input.setAttribute('readonly', '');
  input.style.cssText = 'position:fixed;left:-9999px;top:0;';
  document.body.appendChild(input);
  input.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } catch (_) {}
  input.remove();
  copyButton.focus({ preventScroll: true });
  return copied;
}
copyButton.addEventListener('click', async () => {
  clearTimeout(copyReset);
  let copied = false;
  copyButton.disabled = true;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      copied = true;
    }
  } catch (_) {}
  if (!copied) copied = fallbackCopy(copyButton.dataset.email);
  copyButton.disabled = false;
  copyButton.querySelector('span').textContent = copied ? 'E-mail copiado!' : 'Selecione o e-mail';
  copyStatus.textContent = copied ? 'E-mail copiado para a área de transferência.' : 'Não foi possível copiar automaticamente. Selecione e copie o endereço de e-mail exibido.';
  if (!copied) {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('.contact-email'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
  copyReset = setTimeout(() => {
    copyButton.querySelector('span').textContent = 'Copiar e-mail';
    copyStatus.textContent = '';
  }, 3000);
});

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  root.classList.add('motion-ready');
}

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...navLinks.querySelectorAll('a')];
const progress = document.querySelector('.scroll-progress');
let scrollPending = false;
function updateScroll() {
  const scrollable = root.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0})`;
  let active = sections[0].id;
  const marker = Math.min(210, window.innerHeight * .3);
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= marker) active = section.id;
  });
  if (scrollable > 0 && window.scrollY >= scrollable - 8) active = 'contato';
  links.forEach(link => {
    const selected = link.hash === `#${active}`;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollPending = false;
}
function scheduleScroll() {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); }
}
window.addEventListener('scroll', scheduleScroll, { passive: true });
window.addEventListener('resize', scheduleScroll, { passive: true });
window.addEventListener('load', updateScroll);
updateScroll();
