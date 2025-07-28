const Ship = require("./Ship");

test("returns object with parameters", () => {
  expect(Ship(3)).toEqual({ length: 3, hits: 0, isSunk: false });
});
