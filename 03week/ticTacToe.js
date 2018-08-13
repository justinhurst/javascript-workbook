'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}
/* WHITE BOARD THE PROGRAM */
// ticTacToe() runs everytime, this will be the parent function that calls the other functions from the game
  // 1) check if player is trying to overwrite another players space or choose a row or column that is outside of the board
  // 2) set the players choice in the row and column they provided
  // 3) check if the player has a winning combination
  // 4) if they did not win switch the player to the other letter, 'X' or 'O'
// checkForWin()
  // win condtion functions should return truthy or falsey to checkForWin()
// horizontalWin()
  // 1) three winning combinations
  // 2) if one of the arrays in the board multidimensional array values all equal to 'playerTurn' thats a win
// verticalWin()
  // 1) three winning combinations
  // 2) check if these vertical board values are equal to playerTurn variable:
    // board[0][0] && board[1][0] && board[2][0] || board[0][1] && board[1][1] && board[2][1] || board[0][2] &&  board[1][2] && board[2][2]
// diagonalWin()
  // 1) two winning combinations
  // 2) check if the diagonal combinations have the same value in all three places
    // board[0][0] && board[1][1] && board[2][2] || board[0][2] && board[1][1] && board[2][0]

function horizontalWin() {
  // Your code here
  if( board[0].every(x => x == playerTurn) || board[1].every(x => x == playerTurn) || board[2].every(x => x == playerTurn) ){
    return true
  }
}

function verticalWin() {
  // Your code here
   const columnOneCheck = ( board[0][0] == playerTurn && board[1][0] == playerTurn && board[2][0] == playerTurn );
   const columnTwoCheck = ( board[0][1] == playerTurn && board[1][1] == playerTurn && board[2][1] == playerTurn );
   const columnThreeCheck = ( board[0][2] == playerTurn && board[1][2] == playerTurn && board[2][2] == playerTurn );
    if( columnOneCheck || columnTwoCheck || columnThreeCheck ){
      return true
    }
}

function diagonalWin() {
  // Your code here
  const diagonalOneCheck = ( board[0][0] == playerTurn && board[1][1] == playerTurn  && board[2][2] == playerTurn );
  const diagonalTwoCheck = ( board[0][2] == playerTurn  && board[1][1] == playerTurn  && board[2][0] == playerTurn  );
  if( diagonalOneCheck || diagonalTwoCheck ) {
    return true;
  } 
}

function checkForWin() {
  // Your code here
  if( horizontalWin() || verticalWin() || diagonalWin() ){
    return true;
  }
}

function ticTacToe(row, column) {
  // Your code here
  if( board[row][column] == ' '){
    board[row][column] = playerTurn;
    if( checkForWin() ){
      board[0] =[ ' ', ' ', ' '];
      board[1] =[ ' ', ' ', ' '];
      board[2] =[ ' ', ' ', ' '];
      //return playerTurn + ' Wins the game! Clearing the board and starting a new game.'
      console.log(playerTurn + ' Wins the game! Clearing the board and starting a new game.');
    } else {
      playerTurn == 'X' ? playerTurn = 'O' : playerTurn = 'X';
    }
  } else {
    return 'please choose an open and valid space'
  }
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
