import Player from "./Player.js";
import { renderHits, renderMissed, clearHitsAndMisses } from "./UI.js";

export default function GameController() {
  let player1 = Player("human");
  let player2 = Player("computer");
  const player1Container = document.getElementById("player1-board");
  const player2Container = document.getElementById("player2-board");

  let currentPlayer = player1;

  // Add event listeners to player2's board
  function attachListeners() {
    const cells = player2Container.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (currentPlayer.type !== "human") return;
        playRound(parseInt(cell.dataset.x), parseInt(cell.dataset.y));
      });
    });
  }

  function playRound(x, y) {
    const opponent = currentPlayer === player1 ? player2 : player1;

    if (currentPlayer.type === "computer") {
      setTimeout(() => {
        currentPlayer.attack(opponent.board);
        updateUI();
        if (!isGameOver()) {
          currentPlayer = opponent;
          if (currentPlayer.type === "computer") {
            playRound(); // loop until human, in case it's two computers
          }
        }
      }, 500);
    } else {
      currentPlayer.attack(x, y, opponent.board);
      updateUI();
      if (!isGameOver()) {
        currentPlayer = opponent;
        if (currentPlayer.type === "computer") {
          playRound();
        }
      }
    }
  }

  function updateUI() {
    clearHitsAndMisses(player1Container);
    renderHits(player1.board.getShips(), player1Container);
    renderMissed(player2.board.getMissed(), player1Container);
    renderHits(player2.board.getShips(), player2Container);
    renderMissed(player1.board.getMissed(), player2Container);

    const turnIndicator = document.getElementById("turn-indicator");
    if (turnIndicator) {
      turnIndicator.textContent = `Turn: ${currentPlayer.type}`;
    }
  }
  function isGameOver() {
    return player1.board.allSunk() || player2.board.allSunk();
  }
  return {
    playRound,
    isGameOver,
    player1,
    player2,
    attachListeners,
  };
}
