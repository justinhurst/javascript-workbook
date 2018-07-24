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
  hand1 = hand1.toLowerCase().trim();
  hand2 = hand2.toLowerCase().trim();
  //create conditions to determine which hand wins the game
  //instead of using tons of conditionals, try and place all conditions in one conditional
  
  if( (hand1 == 'rock' && hand2 == 'rock') || (hand1 == 'paper' && hand2 == 'paper') || (hand1 == 'scissors' && hand2 == 'scissors') ){
    //set the conditions for a tied game
    return "It's a tie!"
  } else if( (hand1 == 'rock' && hand2 == 'scissors') || (hand1 == 'paper' && hand2 == 'rock') || (hand1 == 'scissors' && hand2 == 'paper') ){
    //set the conditions for a hand 1 to win the game
    return 'Hand one wins!'
  } else if( (hand1 == 'rock' && hand2 == 'paper') || (hand1 == 'paper' && hand2 == 'scissors') || (hand1 == 'scissors' && hand2 == 'rock') ){
    //set conditions for hand 2 to win the game
    return 'Hand two wins!'
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
  });
} else {

  getPrompt();

}
