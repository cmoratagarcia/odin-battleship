const Gameboard = require("./Gameboard");

test("places ship at correct coordinates", () => {
  const board = Gameboard();
  board.placeShip(3, 0, 0);
  const ships = board.getShips();
  expect(ships[0].positions).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
});

test("registers a hit when attack matches ship position", () => {
  const board = Gameboard();
  board.placeShip(3, 0, 0);
  const hit = board.receiveAttack(1, 0); // should hit
  const ships = board.getShips();

  expect(hit).toBe(true);
  expect(ships[0].ship.hits).toBe(1);
});
