import GameController from "./GameController.js";
import { createBoard, renderShips } from "./UI.js";

function initGame() {
  const game = GameController();

  // Create boards
  createBoard("player1-board");
  createBoard("player2-board");

  const player1Container = document.getElementById("player1-board");
  const player2Container = document.getElementById("player2-board");

  // Render ships
  renderShips(game.player1.board.getShips(), player1Container);
  renderShips(game.player2.board.getShips(), player2Container);
}

initGame();
