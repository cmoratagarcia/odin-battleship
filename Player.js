import Gameboard from "./Gameboard.js";

export default function Player(type = "human") {
  const board = Gameboard();

  function humanAttack(x, y, opponentBoard) {
    return opponentBoard.receiveAttack(x, y);
  }

  function randomAttack(opponentBoard) {
    let result = null;
    while (result === null) {
      //keep trying if already hit
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      result = opponentBoard.receiveAttack(x, y);
    }
    return result;
  }
  return {
    board,
    type,
    attack: type === "human" ? humanAttack : randomAttack,
  };
}
