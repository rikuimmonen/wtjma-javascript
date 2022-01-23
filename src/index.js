'use strict';

const guesses = 10;
const answerMinimumValue = 0;
const answerMaximumValue = 100;

const createAnswer = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1));
const newAnswer = () => createAnswer(answerMinimumValue, answerMaximumValue);
let answer = newAnswer();

const title = document.querySelector('h1');
title.innerHTML += ` (${answerMinimumValue}&ndash;${answerMaximumValue})`;

const guessInput = document.querySelector('#guess');
guessInput.max = answerMaximumValue;
guessInput.min = answerMinimumValue;

const guessButton = document.querySelector('#submitGuess');
const previousGuesses = document.querySelector('#previousGuesses');
const result = document.querySelector('#result');

let guessNumber = 1;
let startTime;

const getHint = (guess, answer) => {
  if (guess < answer) {
    return `The answer is higher than ${guess}.`;
  } else {
    return `The answer is lower than ${guess}.`;
  }
};

const reset = () => {
  guessNumber = 1;
  previousGuesses.textContent = '';
  answer = newAnswer();
  guessButton.disabled = false;
  result.innerHTML = '';
};

const checkGuess = (guess, answer) => {
  guessInput.value = '';

  if (guessNumber <= guesses) {
    if (guess === answer) {
      const time = Math.round((Date.now() - startTime) / 1000);
      result.innerHTML = `<span id="correct">${guess} is the correct answer!</span> Time: ${time} s. Tries: ${guessNumber}.`;
      guessButton.disabled = true;
      const newGame = document.createElement('button');
      newGame.id = 'newGame';
      newGame.textContent = 'Play again';
      document.querySelector('#info').appendChild(newGame);
      newGame.addEventListener('click', () => {
        reset();
        newGame.parentNode.removeChild(newGame);
      });
    } else {
      const hint = getHint(guess, answer);
      result.innerHTML = `<span id="error">Wrong answer!</span> ${hint}`;
      previousGuesses.textContent += ' ' + guess;
      guessNumber++;
    }
  } else {
    result.innerHTML =
      '<span id="error">Out of turns!</span> You have used all your guesses!';
    guessButton.disabled = true;
  }
};

guessButton.addEventListener('click', () => {
  if (guessNumber === 1) {
    startTime = Date.now();
  }
  checkGuess(Number(guessInput.value), answer);
});

/*
Describe the best strategy in playing the number guessing game and design an algorithm for it:

1. Guess half of the given range
2. If incorrect:
   2.1. If guess is too high, change range floor to previous guess
   2.2. If guess is too low, change range ceiling to previous guess
   2.3. Go back to step one
3. If correct, end guessing
*/

const prevGuesses = [];

const guessBot = (min, max, guessInput, guessArray) => {
  while (!guessButton.disabled) {
    const guess = Math.round(min + (max - min) / 2);
    guessInput.value = guess;

    guessButton.click();
    guessArray.push(guess);

    const regex = /higher/gi;

    if (regex.test(result.innerHTML)) {
      min = guess;
    } else {
      max = guess;
    }
  }
};

const botButton = document.querySelector('#runBot');

botButton.addEventListener('click', () => {
  guessBot(answerMinimumValue, answerMaximumValue, guessInput, prevGuesses);
});
