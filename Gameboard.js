const Ship = require("./Ship");

function Gameboard() {
  const boardSize = 10;
  const fleet = [];
  const missedAttacks = [];
  //Gameboards should be able to place ships at specific coordinates by calling the ship factory or class

  function placeShip(length, startX, startY, direction = "horizontal") {
    const ship = Ship(length);
    const positions = [];

    for (let i = 0; i < length; i++) {
      const x = direction === "horizontal" ? startX + i : startX;
      const y = direction === "vertical" ? startY + i : startY;
      positions.push([x, y]);
    }

    fleet.push({ ship, positions, hitsReceived: [] });
  }
  //Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship
  function receiveAttack(x, y) {
    if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) {
      throw new Error(
        `Invalid coordinates: (${x}, ${y}) are outside the ${boardSize}x${boardSize} board`
      );
    }

    const shipData = fleet.find((shipObj) =>
      shipObj.positions.some(([px, py]) => px === x && py === y)
    );

    if (shipData) {
      shipData.ship.hit();
      shipData.hitsReceived.push([x, y]);
      return true; // hit
    } else {
      missedAttacks.push([x, y]);
      return false; // miss
    }
  }

  return {
    placeShip,
    getShips: () => fleet, // for testing
    receiveAttack,
    getMissed: () => missedAttacks, // for testing
  };
}

module.exports = Gameboard;
