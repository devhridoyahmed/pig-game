'use strict';

// starting selection
let dice = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');
let playerScore0El = document.getElementById('score--0');
let playerScore1El = document.getElementById('score--1');

// global variables declaration
let currentScore, activePlayer, scoreArr, activeGame;

let initGame = function () {
    dice.classList.add('hidden');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    // starting variable
    currentScore = 0;
    activePlayer = 0;
    scoreArr = [0, 0];
    activeGame = true;

    playerScore0El.textContent = 0;
    playerScore1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
};
initGame ();

// switch player
let switchPlayer = function () {
    activePlayer = (activePlayer === 0) ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    currentScore = 0;
};

// Roll dice event
btnRoll.addEventListener('click', function () {
    if (activeGame) {
        // initiating game by clicking roll dice and displaying it
        let diceNumber = Math.trunc(Math.random() * 6) + 1 ;
        dice.src = `dice-${diceNumber}.png`;
        dice.classList.remove('hidden');
    

    // checking it if score is 1 or not
    if (!(diceNumber === 1)) {
        // if score is not 1
        currentScore += diceNumber;
        console.log(currentScore);
        if (activePlayer === 0) {
            currentScore0El.textContent = currentScore;
        } else {
            currentScore1El.textContent = currentScore;
        }
    } else {
        //switch player
        switchPlayer()
    }
    }
});

// Score hold event
btnHold.addEventListener('click', function (){
    if (activeGame) {
        scoreArr[activePlayer] += currentScore;
        playerScore0El.textContent = scoreArr[0];
        playerScore1El.textContent = scoreArr[1];
    
    // player wins
    if (scoreArr[activePlayer] >= 10) {
        player0El.classList.remove('player--active');
        player1El.classList.remove('player--active');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        dice.classList.add('hidden');
        activeGame = false;
    // hold score, continue game
    } else {
        switchPlayer();
    }
    }
});

// reset game event
btnNew.addEventListener('click', initGame);