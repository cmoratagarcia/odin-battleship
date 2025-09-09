import Player from "./Player.js";
import { renderHits, renderMissed, clearHitsAndMisses } from "./UI.js";

export default function GameController() {
  let gameOver = false;
  let player1 = Player("human");
  let player2 = Player("computer");
  const player1Container = document.getElementById("player1-board");
  const player2Container = document.getElementById("player2-board");
  const turnIndicator = document.getElementById("turn-indicator");

  let currentPlayer = player1;

  // Add event listeners to player2's board
  function attachListeners() {
    const cells = player2Container.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (gameOver) return;
        if (currentPlayer.type !== "human") return;
        playRound(parseInt(cell.dataset.x), parseInt(cell.dataset.y));
      });
    });
  }

  function playRound(x, y) {
    if (gameOver) return;

    const opponent = currentPlayer === player1 ? player2 : player1;

    if (currentPlayer.type === "computer") {
      setTimeout(() => {
        const result = currentPlayer.attack(opponent.board);

        if (result?.sunk) {
          result.sunk.positions.forEach(([sx, sy]) => {
            const sunkCell = document.querySelector(
              `#${
                opponent.type === "human" ? "player1-board" : "player2-board"
              } .cell[data-x="${sx}"][data-y="${sy}"]`
            );
            sunkCell.classList.add("sunk-cell");
            sunkCell.textContent = "X";
          });
        }

        if (isGameOver()) {
          handleGameOver();
          updateUI();

          return;
        }

        currentPlayer = opponent;
        if (currentPlayer.type === "computer") {
          playRound(); // loop until human, in case it's two computers
        }
        updateUI();
      }, 500);
    } else {
      // human attack can return true/false/null
      const result = currentPlayer.attack(x, y, opponent.board);

      if (result === null) {
        // already attacked this cell: do NOT switch turns
        turnIndicator.textContent = "Already attacked this cell!";
        return;
      }
      if (result.sunk) {
        // Highlight sunk ship
        result.sunk.positions.forEach(([sx, sy]) => {
          const sunkCell = document.querySelector(
            `#${
              opponent.type === "human" ? "player1-board" : "player2-board"
            } .cell[data-x="${sx}"][data-y="${sy}"]`
          );
          sunkCell.classList.add("sunk-cell");
          sunkCell.textContent = "X";
        });
      }
      if (isGameOver()) {
        handleGameOver();
        updateUI();
        return;
      }

      currentPlayer = opponent;

      if (currentPlayer.type === "computer") {
        playRound();
      }

      updateUI();
    }
  }

  function updateUI() {
    clearHitsAndMisses(player1Container);
    player1Container.classList.remove("active-board");
    player2Container.classList.remove("active-board");
    renderHits(player1.board.getShips(), player1Container);
    renderMissed(player1.board.getMissed(), player1Container);
    renderHits(player2.board.getShips(), player2Container);
    renderMissed(player2.board.getMissed(), player2Container);

    if (!turnIndicator) return;

    if (gameOver) {
      const winner = player1.board.allSunk() ? "Computer" : "Human";
      turnIndicator.textContent = `Game Over! ${winner} wins!`;
    } else {
      turnIndicator.textContent = `Turn: ${currentPlayer.type}`;
      currentPlayer === player1
        ? player2Container.classList.add("active-board")
        : player1Container.classList.add("active-board");
    }
  }

  function isGameOver() {
    return player1.board.allSunk() || player2.board.allSunk();
  }

  function handleGameOver() {
    gameOver = true;
  }
  return {
    playRound,
    isGameOver,
    player1,
    player2,
    attachListeners,
  };
}
