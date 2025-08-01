const Player = require("../Player");

test("human player can attack and register a hit", () => {
  const player = Player("human");
  const opponent = Player("human");

  opponent.board.placeShip(2, 0, 0);

  const result = player.attack(0, 0, opponent.board);

  expect(result).toBe(true); // Hit
  const ship = opponent.board.getShips()[0].ship;
  expect(ship.hits).toBe(1);
});

test("human player registers a miss", () => {
  const player = Player("human");
  const opponent = Player("human");

  opponent.board.placeShip(2, 0, 0);

  const result = player.attack(5, 5, opponent.board);

  expect(result).toBe(false); // Miss
  expect(opponent.board.getMissed()).toContainEqual([5, 5]);
  expect(opponent.board.getShips()[0].ship.hits).toBe(0);
});

test("computer player makes a valid attack", () => {
  const computer = Player("computer");
  const opponent = Player("human");

  // Place a ship at a known location to increase chances of testing both hit/miss
  opponent.board.placeShip(1, 0, 0);

  // Make attack
  computer.attack(opponent.board);

  const ships = opponent.board.getShips();
  const hits = ships[0].ship.hits;
  const missed = opponent.board.getMissed();

  // The attack should have caused either a hit or a miss
  const totalAttacks = hits + missed.length;

  expect(totalAttacks).toBe(1);
});
