const GameController = require("./GameController");

test("initializes with two players and places ships", () => {
  const game = GameController();

  expect(game.player1).toBeDefined();
  expect(game.player2).toBeDefined();
  expect(game.player1.board.getShips().length).toBeGreaterThan(0);
  expect(game.player2.board.getShips().length).toBeGreaterThan(0);
});

test("human attack registers on computer board", () => {
  const game = GameController();

  const x = 5,
    y = 5;
  game.playRound(x, y);

  const missed = game.player2.board.getMissed();
  expect(missed).toEqual([[5, 5]]);
});

test("isGameOver returns true when all ships are sunk", () => {
  const game = GameController();

  const shipCoords = game.player2.board.getShips()[0].positions;

  // Hit all ship positions
  shipCoords.forEach(([x, y]) => {
    game.player1.attack(x, y, game.player2.board);
  });

  expect(game.isGameOver()).toBe(true);
});
