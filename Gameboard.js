import Ship from "./Ship.js";

export default function Gameboard() {
  const boardSize = 10;
  const fleet = [
    { name: "Carrier", ship: Ship(5), positions: [], hitsReceived: [] },
    { name: "Battleship", ship: Ship(4), positions: [], hitsReceived: [] },
    { name: "Cruiser", ship: Ship(3), positions: [], hitsReceived: [] },
    { name: "Submarine", ship: Ship(3), positions: [], hitsReceived: [] },
    { name: "Destroyer", ship: Ship(2), positions: [], hitsReceived: [] },
  ];
  const missedAttacks = [];

  // Place ships automatically on board creation
  autoPlaceShips();

  //Gameboards should be able to place ships at specific coordinates by calling the ship factory or class

  function placeShip(name, startX, startY, direction = "horizontal") {
    const shipObj = fleet.find((ship) => ship.name === name);

    if (!shipObj) {
      return false;
    } else {
      const length = shipObj.ship.length;
      const newPositions = [];

      for (let i = 0; i < length; i++) {
        const x = direction === "horizontal" ? startX + i : startX;
        const y = direction === "vertical" ? startY + i : startY;

        // Check out-of-bounds
        if (x < 0 || x > 9 || y < 0 || y > 9) return false;
        // Check overlap
        if (
          fleet.some((ship) =>
            ship.positions.some(([px, py]) => px === x && py === y)
          )
        )
          return false;

        newPositions.push([x, y]);
      }

      // All good – apply the positions
      shipObj.positions = newPositions;
      return true;
    }
  }

  function autoPlaceShips() {
    for (const vessel of fleet) {
      let placed = false;

      while (!placed) {
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

        const maxX = direction === "horizontal" ? 10 - vessel.ship.length : 9;
        const maxY = direction === "vertical" ? 10 - vessel.ship.length : 9;

        const x = Math.floor(Math.random() * (maxX + 1));
        const y = Math.floor(Math.random() * (maxY + 1));
        placed = placeShip(vessel.name, x, y, direction);
      }
    }
  }
  //Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship
  function receiveAttack(x, y) {
    if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) {
      throw new Error(
        `Invalid coordinates: (${x}, ${y}) are outside the ${boardSize}x${boardSize} board`
      );
    }

    // Check if already attacked
    const alreadyAttacked =
      missedAttacks.some(([mx, my]) => mx === x && my === y) ||
      fleet.some((shipObj) =>
        shipObj.hitsReceived.some(([hx, hy]) => hx === x && hy === y)
      );

    if (alreadyAttacked) {
      return null; // already attacked
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
  //Gameboards should be able to report whether or not all of their ships have been sunk.
  function allSunk() {
    return fleet.every((shipObj) => shipObj.ship.isSunk());
  }

  return {
    getShips: () => fleet, // for testing
    receiveAttack,
    getMissed: () => missedAttacks, // for testing
    allSunk,
  };
}
