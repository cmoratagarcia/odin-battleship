import GameController from "./GameController.js";
import createBoard from "./UI.js";

function initGame() {
  createBoard("player1-board");
  createBoard("player2-board");
}

initGame();
