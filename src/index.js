import lunchMenuRaw from './menu.json';

const lunchMenu = lunchMenuRaw.courses;
const menu = document.querySelector('#menu');
let currentLanguage = 'en';

const clearMenuList = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
};

const writeMenuList = (items, lang, parent) => {
  clearMenuList(parent);

  for (let i = 1; i < Object.keys(items).length + 1; i++) {
    let title;
    if (lang === 'en') {
      title = items[i].title_en;
    } else if (lang == 'fi') {
      title = items[i].title_fi;
    }
    const properties = items[i].properties;
    const price = items[i].price;
    const menuListItem = document.createElement('li');
    menuListItem.innerHTML =
      '<strong>' + title + '</strong> (' + properties + ')<br>' + price;
    parent.appendChild(menuListItem);
  }
};

writeMenuList(lunchMenu, currentLanguage, menu);

const changeLanguage = document.querySelector('#changeLanguage');

changeLanguage.addEventListener('click', () => {
  if (currentLanguage === 'fi') {
    currentLanguage = 'en';
    writeMenuList(lunchMenu, currentLanguage, menu);
  } else if (currentLanguage === 'en') {
    currentLanguage = 'fi';
    writeMenuList(lunchMenu, currentLanguage, menu);
  }
});

const sortMenu = (menu, asc) => {
  const menuItems = menu.childNodes;
  const array = [];
  for (const item of menuItems) {
    array.push(item.innerHTML);
  }

  if (asc) {
    array.sort();
  } else {
    array.sort((a, b) => b - a);
  }

  clearMenuList(menu);

  array.forEach((item) => {
    const menuListItem = document.createElement('li');
    menuListItem.innerHTML = item;
    menu.appendChild(menuListItem);
  });
};

let asc = true;

sort.addEventListener('click', () => {
  sortMenu(menu, asc);
  asc = asc ? false : true;
});

const random = document.querySelector('#getRandom');

const getRandomItem = (menu) => {
  const index = Math.floor(Math.random() * menu.childNodes.length);
  const randomItem = menu.childNodes[index];
  return randomItem.innerHTML;
};

random.addEventListener('click', () => {
  document.querySelector('#random').innerHTML =
    '<h2>Your random dish:</h2>' + getRandomItem(menu);
  document.location = '#random';
});
