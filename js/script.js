// Jahr im Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Header: Hintergrund beim Scrollen
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll);

// Mobiles Menü
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  burger.classList.toggle('open', isOpen);
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});

// FAQ Akkordeon
document.querySelectorAll('.accordion__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion__item');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.accordion__item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.accordion__trigger').setAttribute('aria-expanded', false);
    });

    if (!isOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', true);
    }
  });
});

// Scroll-Reveal Animation
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Kontaktformular -> öffnet E-Mail-Programm mit vorausgefüllter Nachricht
const form = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const unternehmen = form.unternehmen.value.trim();
  const nachricht = form.nachricht.value.trim();

  const subject = encodeURIComponent(`Anfrage von ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nE-Mail: ${email}\nUnternehmen: ${unternehmen || '-'}\n\nNachricht:\n${nachricht}`
  );

  window.location.href = `mailto:ademnasufi@hotmail.com?subject=${subject}&body=${body}`;
  const lang = window.currentLang || 'de';
  formNote.textContent = translations[lang]['form.note_sent'];
});
