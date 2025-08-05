import Gameboard from "./Gameboard.js";

export default function Player(type = "human") {
  const board = Gameboard();

  function humanAttack(x, y, opponentBoard) {
    return opponentBoard.receiveAttack(x, y);
  }

  function randomAttack(opponentBoard) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    return opponentBoard.receiveAttack(x, y);
  }
  return {
    board,
    type,
    attack: type === "human" ? humanAttack : randomAttack,
  };
}
