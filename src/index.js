'use strict';

// Create a "game cheat code" like secret code feature, activated by typing
// secret password (record letter key presses in certain sequence). When a user
// types e.g. "hello", launch a response alert or something like that.
// (TIP: think about queue data structure)

const code = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];
let current = 0;

const cheatCode = (event, code) => {
  if (event.code === code[current]) {
    current++;
    if (current === code.length) {
      window.alert('Konami code!');
    }
  } else {
    current = 0;
  }
};

document.addEventListener('keyup', (event) => {
  cheatCode(event, code);
});

// Create a function that shows the x and y coordinates of mouse double-clicks
// on the page.

const coords = document.querySelector('#coords span');

document.addEventListener('dblclick', function(event) {
  const x = event.pageX.toString();
  const y = event.pageY.toString();
  coords.innerHTML = 'X: ' + x + ', Y: ' + y;
});

// Create an element that reacts (e.g. console.log something) to touches but not
// clicks.

const touch = document.querySelector('#touch');
let touchToggle = false;

touch.addEventListener('touchstart', function() {
  touchToggle = !touchToggle;
  if (touchToggle) {
    touch.style.background = 'red';
  } else {
    touch.style.background = 'transparent';
  }
});

// Create a timer that tells user to "hurry up" after 15 secs of browsing. The
// notification should appear on the web page.

const timer = document.querySelector('#timer');
setTimeout(() => timer.innerHTML = '15 seconds has passed', 15 * 1000);

// Create a timer that tells user to "hurry up" after 15 secs of idling (= not
// doing anything: mouse hasn't been moving, keyboard keys haven't been
// pressed...). The notification should appear on the web page.
