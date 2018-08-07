'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

/* Code Plan 
  // Tower of Hanoi Rules
    // Goal is to move all disks from left most peg to the right most peg
    // Only one disk may be moved at a time
    // A move is moving one disk from the top of a stack and then placing in on an empty peg or another stack
    // Disks cannot be placed on smaller disk than the one that is moving
  // movePiece()
    // move a disk from the top of one stack, and place it at the end of another stack. .pop() and .push()
  // isLegal()
    // function should make sure only one disk is moving, and the destination peg is empty or the top disk of destination stack is smaller than the moved disk
  // checkForWin()
    // checks to see if the farthest stack to the right is in descending order from largest to smallest [4,3,2,1]
  // resetGame()
    // restarts that game and clears all stacks except for farthest left stack, and makes it in descending order largest to smallesr [4,3,2,1]
  //towersOfHanoi
    // parent function that calls other critical functions of the game
    // check if the move is a legal move isLegal()
    // if it is a legal move than move the disk
*/
function movePiece(from, to) {
  // Your code here
  to.push(from.pop());
}

function isLegal(fromValue, toValue) {
  // Your code here
  console.log('from : ' + fromValue + ' | to : ' + toValue);
  return ( toValue == undefined || fromValue < toValue );

}

function checkForWin() {
  // Your code here

}

function towersOfHanoi(startStack, endStack) {
  // Your code here
  const fromStack = stacks[startStack];
  const toStack = stacks[endStack];
  if( isLegal(fromStack[fromStack.length -1], toStack[toStack.length -1]) ){
    movePiece(fromStack,toStack);
  } else {
    console.log('please make a valid move');
    return 'Please make a valid move.'
  }
  
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
