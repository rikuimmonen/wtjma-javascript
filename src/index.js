'use strict';

const data = [
  {name: 'Lingonberry jam', price: 4.00},
  {name: 'Mushroom and bean casserole', price: 5.50},
  {name: 'Chili-flavoured wheat', price: 3.00},
  {name: 'Vegetarian soup', price: 4.80},
  {name: 'Pureed root vegetable soup with smoked cheese', price: 8.00},
];

const isValidName = (name) => {
  const pattern = /^[A-Z][A-Za-z0-9 -\/,()]{3,63}$/gm;
  return pattern.test(name);
};

// slice() keeps original array intact
const sortMenuByPrice = (menu) =>
  menu.slice().sort((a, b) => a.price - b.price);

const lessThan5 = (menu) => menu.filter(item => item.price < 5);

const priceRaise = (menu) => menu.map(item => {
  let _item = {};
  _item.name = item.name;
  _item.price = (item.price * 1.15).toFixed(2);
  return _item;
});

const menuPrice = (menu) => menu.reduce(
  (prevItem, currentItem) => prevItem + currentItem.price, 0);

// TESTS

for (let i = 0; i < data.length; i++) {
  const string = data[i].name;
  console.log('Name validation:', string, isValidName(string));
}

console.log('Array sorting:', sortMenuByPrice(data));
console.log('Array filtering:', lessThan5(data));
console.log('Array mapping:', priceRaise(data));
console.log('Array reducing:', menuPrice(data));
