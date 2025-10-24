const burger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('open');
});

// Закрыть меню по клику на пункт (на мобиле)
menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && window.matchMedia('(max-width: 768px)').matches) {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// Закрыть по Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }
});

const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// Применяем сохранённую тему при загрузке
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
});

// Кнопка «Наверх»
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Порог появления (в пикселях)
const SHOW_AFTER = 300;

// Следим за прокруткой и показываем/скрываем кнопку
window.addEventListener('scroll', () => {
  if (window.scrollY > SHOW_AFTER) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

// Плавно прокручиваем к началу страницы
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Плавная прокрутка без подсветки активного пункта
document.querySelectorAll('a.nav[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', id);
  });
});


window.addEventListener('load', () => {
  const { hash } = window.location;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Prompt for a user name and update the hero title
function askAndSetHeroName() {
  const heroTitleElement = document.querySelector('.hero-title');
  if (!heroTitleElement) {
    return;
  }

  let storedName = localStorage.getItem('userName') || '';

  if (!storedName) {
    const inputName = window.prompt("What's your name?");
    const trimmedName = inputName ? inputName.trim() : '';
    if (trimmedName.length === 0) {
      return; // keep default title if user cancels or leaves empty
    }
    storedName = trimmedName;
    localStorage.setItem('userName', storedName);
  }

  heroTitleElement.textContent = `Hi, ${storedName}, I am Hideo Kojima.`;
  const userName = window.prompt("What's your name?");
  const trimmedName = userName ? userName.trim() : '';
  if (trimmedName.length === 0) {
    return;
  }

  heroTitleElement.textContent = `Hi, ${trimmedName}, I am Hideo Kojima`;
}

// Expose for manual reuse
window.askAndSetHeroName = askAndSetHeroName;

// Run once on load so the title updates immediately
askAndSetHeroName();
