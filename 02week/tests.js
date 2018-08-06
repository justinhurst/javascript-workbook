'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function rockPaperScissors(hand1, hand2) {
    // Write code here
  // function should take in two inputs and then compare them to see which hand wins a game of rock, paper, scissors
  //normalize the inputs to remove errors arising from lower/uppercase letters and spaces
  //use .trim() and .toLowerCase()
  const hand1Formatted = hand1.toLowerCase().trim();
  const hand2Formatted = hand2.toLowerCase().trim();
  //create conditions to determine which hand wins the game
  //instead of using tons of conditionals, try and place all conditions in one conditional
  const areValidInputs = () => {
    if ( (hand1Formatted == 'rock' || hand1Formatted == 'paper' || hand1Formatted == 'scissors') && (hand2Formatted == 'rock' || hand2Formatted == 'paper' || hand2Formatted == 'scissors') ){
      return true
    }
  }

  if( areValidInputs()){
    if( hand1Formatted == hand2Formatted ){
      //set the conditions for a tied game
      return "It's a tie!"
    } else if( (hand1Formatted == 'rock' && hand2Formatted == 'scissors') || (hand1Formatted == 'paper' && hand2Formatted == 'rock') || (hand1Formatted == 'scissors' && hand2Formatted == 'paper') ){
      //set the conditions for a hand 1 to win the game
      return 'Hand one wins!'
    } else if( (hand1Formatted == 'rock' && hand2Formatted == 'paper') || (hand1Formatted == 'paper' && hand2Formatted == 'scissors') || (hand1Formatted == 'scissors' && hand2Formatted == 'rock') ){
      //set conditions for hand 2 to win the game
      return 'Hand two wins!'
    }
  } else {
    return 'inputs are invalid'
  }
}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });

    //new Tests
    //hand one wins tests
    it('should detect hand one win conditions', () => {
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
      assert.equal(rockPaperScissors('paper', 'rock'), "Hand one wins!");
      assert.equal(rockPaperScissors('scissors ', 'paper'), "Hand one wins!");
    });
    //hand two wins tests
    it('should detect hand two win conditions', () => {
      assert.equal(rockPaperScissors('scissors', 'rock'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper ', 'scissors'), "Hand two wins!");
    });
    //inputs are valid
    it('should detect if inputs/hands are valid', () => {
      assert.equal(rockPaperScissors('scisors', 'rock'), "inputs are invalid");
      assert.equal(rockPaperScissors('', 'paper'), "inputs are invalid");
      assert.equal(rockPaperScissors('rok ', 'pape'), "inputs are invalid");
    });
  });
} else {

  getPrompt();

}
