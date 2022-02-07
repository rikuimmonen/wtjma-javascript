import fazerFormat from './modules/fazer-data';
import sodexoFormat from './modules/sodexo-data';
import fetchData from './modules/network';

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

const getCurrentMenu = (menu) => {
  const array = [];
  for (const childNode of menu.childNodes) {
    array.push(childNode.textContent);
  }
  return array;
};

const getRandomItem = (menu) => {
  const index = Math.floor(Math.random() * menu.childNodes.length);
  const randomItem = menu.childNodes[index];
  return randomItem.textContent;
};

const checkServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').
        then(registration => {
          console.log('SW registered: ', registration);
        }).
        catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

const fazerUrlFi = 'https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=2022-02-01';
const menu = document.querySelector('#menu');
const changeLanguage = document.querySelector('#changeLanguage');
const sort = document.querySelector('#sort');
const random = document.querySelector('#getRandom');
let currentLanguage = 'fi';
let asc = true;

checkServiceWorker();

fetchData(fazerUrlFi, true).then(data => {
  const menuData = JSON.parse(data.contents);
  const coursesFi = fazerFormat(menuData.LunchMenus, 0);
  writeMenuList(coursesFi, menu);
});

changeLanguage.addEventListener('click', () => {
  if (currentLanguage === 'fi') {
    currentLanguage = 'en';
    writeMenuList(coursesEn, menu);
  } else if (currentLanguage === 'en') {
    currentLanguage = 'fi';
    writeMenuList(coursesFi, menu);
  }
});

sort.addEventListener('click', () => {
  writeMenuList(sortMenu(getCurrentMenu(menu), asc), menu);
  asc = !asc;
});

random.addEventListener('click', () => {
  document.querySelector(
    '#random').innerHTML = '<strong>Your random dish:</strong><br>' +
    getRandomItem(menu);
});
