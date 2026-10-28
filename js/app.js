const menu = document.querySelector('#menu-nav ul');
const menuToggle = document.querySelector('.menu-toggle');

// posição da página quando o menu abriu
let scrollSalvo = 0;

function setMenu(aberto) {
  menu.classList.toggle('active', aberto);
  menuToggle.setAttribute('aria-expanded', aberto);
  menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');

  // trava a página de trás do menu
  // (overflow: hidden sozinho não segura a rolagem no iPhone; fixar o body segura)
  if (aberto) {
    scrollSalvo = window.scrollY;
    document.body.style.top = `-${scrollSalvo}px`;
    document.body.classList.add('menu-aberto');
  } else if (document.body.classList.contains('menu-aberto')) {
    document.body.classList.remove('menu-aberto');
    document.body.style.top = '';
    window.scrollTo(0, scrollSalvo);
  }
}

menuToggle.addEventListener('click', () => {
  setMenu(!menu.classList.contains('active'));
});

// fecha o menu mobile ao clicar em um link
menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});
  

// CURSOR

const cursor = document.querySelector('.cursor');

// só em computador com mouse; no celular não existe cursor
const temMouse = matchMedia('(hover: hover) and (pointer: fine)').matches;

if (cursor && temMouse) {
  document.body.classList.add('cursor-ativo');

  document.addEventListener('pointermove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}
// CURSOR (MÃO)
const clicaveis = 'a, button, label, summary, [role="button"]';

document.addEventListener('pointermove', (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

  // closest sobe pelos "pais" até achar algo clicável (ou nada)
  const emClicavel = e.target.closest(clicaveis);
  document.body.classList.toggle('sobre-clicavel', !!emClicavel);
});

