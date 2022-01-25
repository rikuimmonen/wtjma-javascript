import FazerData from './modules/FazerData';
import SodexoData from './modules/SodexoData';

import sodexoRaw from './sodexo.json';
const sodexoMenu = sodexoRaw.courses;

import fazerFiRaw from './fazerFi.json';
import fazerEnRaw from './fazerEn.json';

const fazerFiMenu = fazerFiRaw.LunchMenus;
const fazerEnMenu = fazerEnRaw.LunchMenus;

const coursesFi = FazerData.FazerFormat(fazerFiMenu, 0);
const coursesEn = FazerData.FazerFormat(fazerEnMenu, 0);

/*
const coursesEn = SodexoData.sodexoFormat(sodexoMenu, 'en');
const coursesFi = SodexoData.sodexoFormat(sodexoMenu, 'fi');
*/

const clearMenuList = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
};

const writeMenuList = (items, parent) => {
  clearMenuList(parent);

  for (const item of items) {
    const menuItem = document.createElement('li');
    menuItem.textContent = item;
    parent.appendChild(menuItem);
  }
};

writeMenuList(coursesEn, menu);

const changeLanguage = document.querySelector('#changeLanguage');
let currentLanguage = 'en';

changeLanguage.addEventListener('click', () => {
  if (currentLanguage === 'fi') {
    currentLanguage = 'en';
    writeMenuList(coursesEn, menu);
  } else if (currentLanguage === 'en') {
    currentLanguage = 'fi';
    writeMenuList(coursesFi, menu);
  }
});

const sortMenu = (menu, asc) => {
  if (asc) {
    return menu.sort((a, b) => {
      return a.localeCompare(b);
    });
  } else {
    return menu.sort((a, b) => {
      return b.localeCompare(a);
    });
  }
};

const sort = document.querySelector('#sort');
let asc = true;

const getCurrentMenu = (menu) => {
  const array = [];
  for (const childNode of menu.childNodes) {
    array.push(childNode.textContent);
  }
  return array;
};

sort.addEventListener('click', () => {
  writeMenuList(sortMenu(getCurrentMenu(menu), asc), menu);
  asc = !asc;
});

const random = document.querySelector('#getRandom');

const getRandomItem = (menu) => {
  const index = Math.floor(Math.random() * menu.childNodes.length);
  const randomItem = menu.childNodes[index];
  return randomItem.textContent;
};

random.addEventListener('click', () => {
  document.querySelector(
    '#random').innerHTML = '<strong>Your random dish:</strong><br>' +
    getRandomItem(menu);
});
