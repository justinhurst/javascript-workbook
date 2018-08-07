'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4,3,2,1],
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
    // function should make sure only one disk is moving, and the destination peg is empty or the top disk of destination stack is smaller than the moved disk stack.length() and the
  // checkForWin()
    // checks to see if the middle or right stack is in descending order from largest to smallest [4,3,2,1]
    // just checking if array == to array will not work. have to manually check the values of the array using a loop
  // resetGame()
    // restarts that game and clears all stacks except for farthest left stack, and makes it in descending order largest to smallesr [4,3,2,1]
  //towersOfHanoi
    // parent function that calls other critical functions of the game
    // check if the move is a legal move isLegal()
    // if it is a legal move than move the disk
    // check for a win after the move
    // if the player wins the game, reset the game, set stacks object to values before game started
*/
function resetGame(){
  stacks.a = [4,3,2,1];
  stacks.b = [];
  stacks.c = [];
}
function movePiece(from, to) {
  stacks[to].push(stacks[from].pop());
}

function isLegal(startStack, endStack) {
  const possibleStacks = ['a','b','c'];
  if( possibleStacks.includes(startStack, endStack ) ){
    const fromValue = stacks[startStack][stacks[startStack].length -1]
    const toValue =  stacks[endStack][stacks[endStack].length -1];
    return ( toValue == undefined || fromValue < toValue );
  } else {
    return false
  }
}

function checkForWin() {
  const descStack = [4,3,2,1];
  if(stacks['b'].length !== descStack.length && stacks['c'].length !== descStack.length){
    return false;
    for(let i = descStack.length; i--;) {
      if(stacks['b'][i] !== descStack[i] || stacks['c'][i] !== descStack[i]){
        return false;
      }
    }
  }
  console.log('You Win, resetting the game.');
  resetGame();
  return true;
} 

function towersOfHanoi(startStack, endStack) {
  if( isLegal(startStack, endStack) ){
    movePiece(startStack,endStack);
    checkForWin();
  } else {
    console.log('please make a valid move');
    return false
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
  describe('#isLegal()', () => {
    it('should not allow a move to non existing peg', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('d', 'b'), false);
    });
  });
  describe('#towersOfHanoi()', () => {
    it('should reset game afer a win', () => {
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2, 1], b: [], c: [] });
    });
  });

} else {

  getPrompt();

}
