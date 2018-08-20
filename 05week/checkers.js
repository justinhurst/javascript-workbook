'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var setBoard = [
	[ null, 'X', null, 'X', null, 'X', null, 'X' ],
	[ 'X', null, 'X', null, 'X', null, 'X', null ],
	[ null, 'X', null, 'X', null, 'X', null, 'X' ],
  [ null , null, null, null, null, null, null, null ],
  [ null , null, null, null, null, null, null, null ],  
	[ 'O', null, 'O', null, 'O', null, 'O', null ],
	[ null, 'O', null, 'O', null, 'O', null, 'O' ],
	[ 'O', null, 'O', null, 'O', null, 'O', null ]
]

class Checker {
  constructor(symbol,id,row,column) {
    this.symbol = symbol;
    this.id = id;
    this.row = row;
    this.column = column;
  }
  updateCoords(row,col){
    this.row = Number(row);
    this.column = Number(col);
  }
}

class Board {
  constructor() {
    this.grid = [];
    this.checkers = [];
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  addCheckers(){
    let checkerID = 1;
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        if( setBoard[row][column] ) {
          const createAChecker = new Checker(setBoard[row][column],checkerID,row,column);
          this.grid[row][column] = createAChecker;
          this.checkers.push(createAChecker);
          checkerID++;
        }
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  // Your code here
  //a checker board must be created
  // a board consists of spaces
    // a space is available for move or it is not available for a move
      // empty space is unavailable for a move or a checker to be on
      // a filled space is a space that you can move to or a checker can be on
    // valid spaces will either be empty or have a colored checker in it
  // checker 
    // will have a color 
    // will be in a space
  // moveChecker is going to take two parameters a from spot, and a to spot
    // will check if move and to cooridates are valid isValidMove
      // isValidMove
        // is the space the checker is moving to an empty available space?
      //isKillMove
      //isRegMove
      // from and to spot will be coordiantes
    // from cooridation must contain current players color
    // to corridante must be a valid empty space, or 
  
}

class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.addCheckers();
  }
  moveChecker(whichPiece, toWhere) {
    //console.log('move checker function called');
    const whichPieceCoordinates = whichPiece.split(''); //[2,1]
    const toWhereCoordinates = toWhere.split(''); //[3,0]
    let moveType = undefined;
    if( toWhereCoordinates[0] - whichPieceCoordinates[0] > 1 ){
      console.log('kill Move, going down');
      moveType = 'killMoveDown'
    } else if( whichPieceCoordinates[0] - toWhereCoordinates[0] > 1 ){
      console.log('kill Move, going up');
      moveType = 'killMoveUp'
    } else {
      console.log('regular move');
      moveType = "regularMove"
    }
    const checkerToMove = this.board.grid[whichPieceCoordinates[0]][whichPieceCoordinates[1]];
    const toSpace = this.board.grid[toWhereCoordinates[0]][toWhereCoordinates[1]];
    if(checkerToMove){
      // there is a checker to move
      if(!toSpace){
        // to an empty space
        this.board.grid[toWhereCoordinates[0]][toWhereCoordinates[1]] = checkerToMove;
        checkerToMove.updateCoords(toWhereCoordinates[0],toWhereCoordinates[1]);
        this.board.grid[whichPieceCoordinates[0]][whichPieceCoordinates[1]] = null;
        console.log('check for a kill');
        if(!moveType == 'regularMove'){
          //decide what checker to remove from the board.grid and the board.checkers array
          console.log('this is not a regular move');
        }
        //console.log(this.board.checkers);
      } else {
        console.log('there is something in that space, cant move, try again');
      }
    } else {
      console.log('there is no checker to move, try again');
    }
  } 
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
