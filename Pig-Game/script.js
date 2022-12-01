'use strict';

//Selecting elements
const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.getElementById('score--1');
const currentPlayer0 = document.querySelector('.player--0');
const currentPlayer1 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScoreEl0 = document.querySelector('#current--0');
const currentScoreEl1 = document.querySelector('#current--1');

//Starting conditions
let currentScore, activePlayer, scores, playing;

const init = function () {
  diceEl.classList.add('hidden');
  currentPlayer0.classList.add('player--active');
  currentPlayer1.classList.remove('player--active');
  currentPlayer0.classList.remove('player--winner');
  currentPlayer1.classList.remove('player-winner');
  currentScoreEl0.textContent = 0;
  currentScoreEl1.textContent = 0;
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;

  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  playing = true;
};

const switchingPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentPlayer0.classList.toggle('player--active');
  currentPlayer1.classList.toggle('player--active');
};

init();
btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchingPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      switchingPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
