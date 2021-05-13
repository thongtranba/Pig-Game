'use strict';

//NOTE selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnNewSecond = document.querySelector('.btn--newSecond');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
//hidden diceEl
diceEl.classList.add('hidden');
//scores contain the score of active player
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const newGame = function () {
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//rolling the dice
btnRoll.addEventListener('click', function () {
  //generating a random dice roll
  const dice = Math.trunc(Math.random() * 6 + 1);
  //   console.log(dice);

  //display dice
  diceEl.classList.remove('hidden');
  //add the image source following the dice number
  diceEl.src = `dice-${dice}.png`;

  //check for rolled: if true, switch to next player
  if (dice != 1) {
    // add dice to current score
    currentScore += dice;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
    // current0El.textContent = currentScore;
  } else {
    //switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  //add current scroe to active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  //   console.log(scores[activePlayer]);
  if (scores[activePlayer] >= 50) {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.querySelector('.winner').textContent = `Player ${
      activePlayer === 0 ? '1' : '2'
    } is the winner 🎉🏆`;
  } else {
    diceEl.classList.add('hidden');
    switchPlayer();
  }
});

btnNew.addEventListener('click', newGame);
btnNewSecond.addEventListener('click', newGame);
