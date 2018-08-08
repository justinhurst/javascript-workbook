'use strict';

// require the colors package from npm
var colors  = require('colors');

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess,solution) {
  const guessArray = guess.split('');
  let solutionArray = solution.split('');

  let correctLetterLocations = 0;
  for ( let i = 0; i < solutionArray.length; i++ ) {
    if ( solutionArray[i] == guessArray[i] ) {
      correctLetterLocations++;
      solutionArray[i] = null;
    }
  }
  
  let correctLetters = 0;
  for ( let k = 0; k < solutionArray.length; k++ ) {
    if ( solutionArray.indexOf(guessArray[k]) > -1 ) {
      correctLetters++;
    }
  }
  //return colors.red(correctLetterLocations) + '-' + colors.white(correctLetters)
  return correctLetterLocations + '-' + correctLetters
}

function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution
  if ( guess == solution ){
    console.log('you win');
    return 'You guessed it!'
  } else {
    const hint = generateHint(guess,solution);
    board.push( guess + ' ' + hint)
  }

  if ( board.length == 10 ) {
    return 'You ran out of turns! The solution was ' + solution
  } else {
    return 'Guess Again'
  }
}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
