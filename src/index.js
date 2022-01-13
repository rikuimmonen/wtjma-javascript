const coursesEn = [
  "Hamburger, cream sauce and poiled potates",
  "Goan style fish curry and whole grain rice",
  "Vegan Chili sin carne and whole grain rice",
  "Broccoli puree soup, side salad with two napas",
  "Lunch baguette with BBQ-turkey filling",
  "Cheese / Chicken / Vege / Halloum burger and french fries",
];
const coursesFi = [
  "Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
  "Goalaista kalacurrya ja täysjyväriisiä",
  "vegaani Chili sin carne ja täysjyväriisi",
  "Parsakeittoa,lisäkesalaatti kahdella napaksella",
  "Lunch baguette with BBQ-turkey filling",
  "Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset",
];

const menu = document.querySelector('#menu');

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
  if(asc) {
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
  for (childNode of menu.childNodes) {
    array.push(childNode.textContent);
  }
  return array;
};

sort.addEventListener('click', () => {
  writeMenuList(sortMenu(getCurrentMenu(menu), asc), menu);
  asc = asc ? false : true;
});

const random = document.querySelector('#getRandom');

const getRandomItem = (menu) => {
  const index = Math.floor(Math.random() * menu.childNodes.length);
  const randomItem = menu.childNodes[index];
  return randomItem.textContent;
};

random.addEventListener('click', () => {
  document.querySelector('#random').innerHTML = '<strong>Your random dish:</strong><br>' + getRandomItem(menu);
});
