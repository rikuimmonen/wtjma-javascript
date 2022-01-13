'use strict';

const guesses = 10;
const answerMinimumValue = 0;
const answerMaximumValue = 100;

const createAnswer = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const answer = createAnswer(answerMinimumValue, answerMaximumValue);

const title = document.querySelector('h1');
title.innerHTML += ' (' + answerMinimumValue + '&ndash;' + answerMaximumValue + ')';

const guessInput = document.querySelector('#guess');
guessInput.max = answerMaximumValue;
guessInput.min = answerMinimumValue;

const guessButton = document.querySelector('#submitGuess');
const previousGuesses = document.querySelector('#previousGuesses');
const result = document.querySelector('#result');

let guessNumber = 1;
let startTime;

const hint = (guess, answer) => {
  if (guess < answer) {
    return 'The answer is higher than ' + guess + '.';
  } else {
    return 'The answer is lower than ' + guess + '.';
  }
};

const checkGuess = (guess, answer) => {
  guessInput.value = '';

  if (guessNumber <= guesses) {
    if (guess === answer) {
      const time = Math.round((Date.now() - startTime) / 1000);
      result.innerHTML = '<span id="correct">Correct answer!</span> Time: ' + time + ' s. Tries: ' + guessNumber + '.';
      guessButton.disabled = true;
      const newGame = document.createElement('button');
      newGame.textContent = 'Play again';
      document.querySelector('#info').appendChild(newGame);
      newGame.addEventListener('click', () => {
        location.reload();
      });
    } else {
      result.innerHTML = '<span id="wrong">Wrong answer!</span> ' + hint(guess, answer);
      previousGuesses.textContent += ' ' + guess;
      guessNumber++;
    }
  } else {
    result.innerHTML = '<span id="wrong">Out of turns!</span> You have used all your guesses!';
    guessButton.disabled = true;
  }
};

guessButton.addEventListener('click', () => {
  if (guessNumber === 1) {
    startTime = Date.now();
  }
  checkGuess(Number(guessInput.value), answer);
});
