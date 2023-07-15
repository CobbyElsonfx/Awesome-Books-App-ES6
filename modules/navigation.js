export const toggleNavigation = () => {
  const navigationMenu = document.querySelector('.navItems');
  navigationMenu.classList.toggle('headerNavActive');
};

export const changeButtonIcon = (buttonImage, path) => {
  buttonImage.src = path;
};

export const initializeNavigation = () => {
  const links = document.querySelectorAll('.navItems a');
  const sectionList = document.querySelectorAll('.content');

  links.forEach((link) => {
    link.addEventListener('click', (ev) => {
      ev.preventDefault();

      sectionList.forEach((sectionContent) => {
        sectionContent.classList.remove('show');
      });

      const linkId = ev.target.id;
      // Add 'show' class to the corresponding content section
      const sectionId = linkId.replace('link', 'section');
      const section = document.getElementById(sectionId);
      section.classList.add('show');
    });
  });

  // hamburger menu
  const buttonMenu = document.querySelector('#header-button');
  const buttonImage = document.querySelector('#hamburger-image');

  const navigationLinks = document.querySelectorAll('.navLink');
  const navigationIcons = ['./assets/icons/button-menu.svg', './assets/icons/x-icon.svg'];

  navigationLinks.forEach((element) => {
    element.addEventListener('click', () => {
      toggleNavigation();
      changeButtonIcon(buttonImage, navigationIcons[0]);
      buttonMenu.style.width = 'initial';
    });
  });

  buttonMenu.addEventListener('click', () => {
    const actualButtonIcon = buttonImage.src;

    if (actualButtonIcon.includes('button-menu')) {
      changeButtonIcon(buttonImage, navigationIcons[1]);
      buttonMenu.style.width = '12px';
    } else {
      changeButtonIcon(buttonImage, navigationIcons[0]);
      buttonMenu.style.width = 'initial';
    }
    toggleNavigation();
  });
};
