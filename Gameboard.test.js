const Gameboard = require("./Gameboard");

//Ship(2), start
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
