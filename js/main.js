const navbar = document.getElementById('navbar');
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const sidebarLinks = document.querySelectorAll('.sidebar-links li');
const submenus = document.querySelectorAll('.submenu');
const thirdSubmenus = document.querySelectorAll('.third-submenu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const langPanel = document.getElementById('sidebar-language');
const openLangBtn = document.getElementById('lang-open-btn');
const closeLangBtn = document.getElementById('close-lang');
const lhoItems = document.querySelectorAll('.lho');
const backButtons = document.querySelectorAll('.submenu .back-btn');
const thirdBackButtons = document.querySelectorAll('.third-submenu .back-btn');

let lastScrollY = window.scrollY;
let activeSubmenu = null;
let activeThirdSubmenu = null;
let activeLink = null;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  const triggerHeight = window.innerHeight * 0.1;

  if (currentScroll > triggerHeight) {
    if (currentScroll > lastScrollY) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }
  } else {
    navbar.classList.remove('hide');
  }

  lastScrollY = currentScroll;

  const content = document.querySelector('.content');
  if (content && content.getBoundingClientRect().bottom <= 50) {
    navbar.classList.add('colored');
  } else {
    navbar.classList.remove('colored');
  }

  const bignews = document.querySelector('.bignews');
  const inbignews = document.querySelector('.inbignews');
  if (bignews && inbignews) {
    const bignewsTop = bignews.offsetTop;
    const bignewsHeight = bignews.offsetHeight;
    const inbignewsHeight = inbignews.offsetHeight;
    const maxScroll = bignewsHeight - inbignewsHeight;

    if (currentScroll >= bignewsTop && currentScroll <= bignewsTop + maxScroll) {
      const yOffset = currentScroll - bignewsTop;
      inbignews.style.transform = `translateY(${yOffset}px)`;
    } else if (currentScroll > bignewsTop + maxScroll) {
      inbignews.style.transform = `translateY(${maxScroll}px)`;
    } else {
      inbignews.style.transform = `translateY(0px)`;
    }
  }
});

langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  langDropdown.style.display = langDropdown.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', () => {
  langDropdown.style.display = 'none';
});

menuBtn.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('show');
});

function closeSidebarAndPanels() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
  langPanel.classList.remove('open');

  submenus.forEach(menu => menu.classList.remove('open', 'closing'));
  thirdSubmenus.forEach(menu => menu.classList.remove('open'));
  sidebarLinks.forEach(link => link.classList.remove('active'));

  activeSubmenu = null;
  activeThirdSubmenu = null;
  activeLink = null;
}

closeBtn.addEventListener('click', closeSidebarAndPanels);
overlay.addEventListener('click', closeSidebarAndPanels);

sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('data-target');
    const targetMenu = document.getElementById(targetId);

    if (activeSubmenu === targetMenu) return;

    if (activeLink) activeLink.classList.remove('active');
    link.classList.add('active');
    activeLink = link;

    if (activeSubmenu) {
      activeSubmenu.classList.remove('open');
      activeSubmenu.classList.add('closing');
      setTimeout(() => {
        activeSubmenu.classList.remove('closing');
      }, 300);
    }

    thirdSubmenus.forEach(menu => menu.classList.remove('open'));
    activeThirdSubmenu = null;

    if (targetMenu) {
      targetMenu.classList.add('open');
      activeSubmenu = targetMenu;
    }
  });
});

lhoItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetId = item.getAttribute('data-target');
    const targetMenu = document.getElementById(targetId);

    if (activeThirdSubmenu === targetMenu) return;

    thirdSubmenus.forEach(menu => menu.classList.remove('open'));

    if (targetMenu) {
      targetMenu.classList.add('open');
      activeThirdSubmenu = targetMenu;
    }
  });
});

backButtons.forEach(button => {
  button.addEventListener('click', () => {
    const parentSubmenu = button.closest('.submenu');
    parentSubmenu.classList.remove('open');
    if (activeLink) activeLink.classList.remove('active');
    activeSubmenu = null;
    activeLink = null;

    thirdSubmenus.forEach(menu => menu.classList.remove('open'));
    activeThirdSubmenu = null;
  });
});

thirdBackButtons.forEach(button => {
  button.addEventListener('click', () => {
    const thirdMenu = button.closest('.third-submenu');
    thirdMenu.classList.remove('open');
    activeThirdSubmenu = null;
  });
});

openLangBtn.addEventListener('click', () => {
  langPanel.classList.add('open');
});

closeLangBtn.addEventListener('click', () => {
  langPanel.classList.remove('open');
});

document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.footer-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const section = toggle.closest('.footer-section');
      const wasActive = section.classList.contains('active');

      document.querySelectorAll('.footer-section').forEach(sec => {
        if (sec.querySelector('.footer-links')) {
          sec.classList.remove('active');
        }
      });

      if (!wasActive) {
        section.classList.add('active');
      }
    });
  });
});
