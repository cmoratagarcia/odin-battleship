import Player from "./Player.js";
import { renderHits, renderMissed, clearHitsAndMisses } from "./UI.js";

export default function GameController() {
  let player1 = Player("human");
  let player2 = Player("computer");
  const player1Container = document.getElementById("player1-board");
  const player2Container = document.getElementById("player2-board");

  let currentPlayer = player1;

  // Add event listeners to player2's board
  const cells = player2Container.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (currentPlayer.type !== "human") return;
      playRound(parseInt(cell.dataset.x), parseInt(cell.dataset.y));
    });
  });

  function playRound(x, y) {
    let opponent = currentPlayer === player1 ? player2 : player1;

    currentPlayer.attack(x, y, opponent.board);

    clearHitsAndMisses(player1Container);
    renderHits(player1.fleet, player1Container);
    renderMissed(player2.missedAttacks, player1Container);
    renderHits(player2.fleet, player2Container);
    renderMissed(player1.missedAttacks, player2Container);

    //  if (isGameOver()) {

    //  };
    currentPlayer = opponent;
  }

  function updateUI() {
    clearHitsAndMisses(player1Container);
    renderHits(player1.fleet, player1Container);
    renderMissed(player2.missedAttacks, player1Container);
    renderHits(player2.fleet, player2Container);
    renderMissed(player1.missedAttacks, player2Container);
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
