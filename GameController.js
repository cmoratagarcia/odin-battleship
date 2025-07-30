const Player = require("./Player");

function GameController() {
  let player1 = Player("human");
  let player2 = Player("computer");

  player1.board.placeShip(3, 0, 0);
  player2.board.placeShip(3, 0, 0);

  let currentPlayer = player1;

  function playRound(x, y) {
    let opponent = currentPlayer === player1 ? player2 : player1;

    currentPlayer.attack(x,y, opponent.board);

    //  if (isGameOver()) {
        
    //  };
    currentPlayer = opponent;
 
  }

  function isGameOver() {
    return player1.board.allSunk() || player2.board.allSunk();
}
return {
  playRound,
  isGameOver,
  player1,
  player2,
};
}

module.exports = GameController;
