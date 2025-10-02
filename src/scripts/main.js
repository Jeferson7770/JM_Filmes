document.addEventListener('DOMContentLoaded', () => {
  /* ===========================
     MENU DO USUÁRIO (SUBMENU)
  ============================ */
  const userButton = document.querySelector('.header__user-button');
  const submenu = document.querySelector('.header__submenu');
  const userWrapper = document.querySelector('.header__user');
  let closeTimeout;

  if (userButton && submenu && userWrapper) {
    const openMenu = () => {
      clearTimeout(closeTimeout);
      submenu.classList.add('header__submenu--active');
      userButton.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      clearTimeout(closeTimeout);
      closeTimeout = setTimeout(() => {
        submenu.classList.remove('header__submenu--active');
        userButton.setAttribute('aria-expanded', 'false');
      }, 300);
    };

    const toggleMenu = (e) => {
      if (e) e.preventDefault();
      const isActive = submenu.classList.contains('header__submenu--active');
      if (isActive) {
        submenu.classList.remove('header__submenu--active');
        userButton.setAttribute('aria-expanded', 'false');
      } else {
        openMenu();
      }
    };

    userWrapper.addEventListener('mouseenter', openMenu);
    userWrapper.addEventListener('mouseleave', closeMenu);
    userButton.addEventListener('click', toggleMenu);
  }

  /* ===========================
     PLAYER DE TRAILER YOUTUBE
  ============================ */
  const hero = document.querySelector('.hero');
  const btnTrailer = document.getElementById('btnTrailer');
  const btnFechar = document.getElementById('btnFechar');

  // elementos de texto que queremos ocultar
  const textosHero = document.querySelectorAll(
    '.hero__branding, .hero__sinopse, .hero__info, .hero__tags, .hero__aviso, .hero__buttons'
  );


  let player;
  window.onYouTubeIframeAPIReady = function () { };

  if (btnTrailer && btnFechar && hero) {
    btnTrailer.addEventListener('click', () => {
      if (!player) {
        player = new YT.Player('trailerVideo', {
          videoId: 'ILAwV65XuGA',
          playerVars: { autoplay: 1, controls: 1, rel: 0 },
          events: {
            onReady: (event) => event.target.playVideo()
          }
        });
      } else {
        player.playVideo();
      }

      hero.classList.add('show-video');

      // 🔴 esconde só textos
      textosHero.forEach(el => el.style.display = 'none');

      btnFechar.style.display = 'block';
    });

    btnFechar.addEventListener('click', () => {
      hero.classList.remove('show-video');

      // 🔵 mostra de novo os textos
      textosHero.forEach(el => el.style.display = '');

      btnFechar.style.display = 'none';
      if (player && typeof player.stopVideo === 'function') {
        player.stopVideo();
      }
    });
  }

  /* ===========================
     SEÇÃO DE ATRAÇÕES (ABAS + SETAS)
  ============================ */
  const buttons = document.querySelectorAll('[data-tab-button]');
  const tabsContainer = document.querySelectorAll('[data-tab-id]');
  const setaEsq = document.querySelector('.shows__arrow--left');
  const setaDir = document.querySelector('.shows__arrow--right');

  function removeBotaoAtivo() {
    buttons.forEach(btn => btn.classList.remove('shows__tabs__button--is-active'));
  }

  function escondeTodasAbas() {
    tabsContainer.forEach(tab => tab.classList.remove('shows__list--is-active'));
  }

  function atualizaSetasScroll(container) {
    if (!container) return;
    const scrollMax = container.scrollWidth - container.clientWidth;
    setaEsq.style.display = container.scrollLeft > 0 ? 'block' : 'none';
    setaDir.style.display = container.scrollLeft < scrollMax ? 'block' : 'none';
  }

  function inicializaSetas(container) {
    if (!container) return;
    setaEsq.addEventListener('click', () => {
      container.scrollBy({ left: -240, behavior: 'smooth' });
    });
    setaDir.addEventListener('click', () => {
      container.scrollBy({ left: 240, behavior: 'smooth' });
    });
    container.addEventListener('scroll', () => atualizaSetasScroll(container));
    window.addEventListener('resize', () => atualizaSetasScroll(container));
    atualizaSetasScroll(container);
  }

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const abaAlvo = e.target.dataset.tabButton;
      const aba = document.querySelector(`[data-tab-id=${abaAlvo}]`);
      escondeTodasAbas();
      aba.classList.add('shows__list--is-active');
      removeBotaoAtivo();
      e.target.classList.add('shows__tabs__button--is-active');
      atualizaSetasScroll(aba);
    });
  });

  const abaInicial = document.querySelector('.shows__list--is-active');
  inicializaSetas(abaInicial);

  /* ===========================
     SEÇÃO FAQ (ACCORDION)
  ============================ */
  const faqQuestions = document.querySelectorAll("[data-faq-question]");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const parent = question.parentElement;
      document.querySelectorAll(".faq__questions__item").forEach((item) => {
        if (item !== parent) {
          item.classList.remove("faq__questions__item--is-open");
        }
      });
      parent.classList.toggle("faq__questions__item--is-open");
    });
  });

  /* ===========================
     FUNÇÕES AUXILIARES HEADER
  ============================ */
  function ocultaElementosDoHeader() {
    const header = document.querySelector('header');
    header.classList.add('header--is-hidden');
  }

  function exibeElementosDoHeader() {
    const header = document.querySelector('header');
    header.classList.remove('header--is-hidden');
  }
});
