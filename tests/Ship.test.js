const Ship = require("../Ship");

test("creates a ship with specified length", () => {
  const ship = Ship(3);
  expect(ship.length).toBe(3);
});

test("hit increments hits", () => {
  const ship = Ship(2);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("isSunk returns true when sunk", () => {
  const ship = Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
