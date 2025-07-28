const Ship = require("./Ship");

function Gameboard() {
  const boardSize = 10;
  const ships = [];
  //Gameboards should be able to place ships at specific coordinates by calling the ship factory or class

  function placeShip(length, startX, startY, direction = "horizontal") {
    const ship = Ship(length);
    const positions = [];

    for (let i = 0; i < length; i++) {
      const x = direction === "horizontal" ? startX + i : startX;
      const y = direction === "vertical" ? startY + i : startY;
      positions.push([x, y]);
    }

    ships.push({ ship, positions });
  }

  return {
    placeShip,
    getShips: () => ships, // for testing
  };
}

module.exports = Gameboard;
