const Player = require("./Player");


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

