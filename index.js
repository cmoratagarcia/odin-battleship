import GameController from "./GameController.js";
import { createBoard, renderShips } from "./UI.js";

function initGame() {
  // Clear old boards to reset
  const player1Container = document.getElementById("player1-board");
  const player2Container = document.getElementById("player2-board");
  player1Container.innerHTML = "";
  player2Container.innerHTML = "";

  const game = GameController();

  // Create new boards
  createBoard("player1-board");
  createBoard("player2-board");
  game.attachListeners();

  // Render ships
  renderShips(game.player1.board.getShips(), player1Container);

  return game;
}

let game = initGame();

const resetButton = document.getElementById("reset-btn");
if (resetButton) {
  resetButton.addEventListener("click", () => {
    game = initGame(); // new game
  });
}
