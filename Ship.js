//1.Begin your app by creating the Ship class/factory (your choice).

function Ship(length) {
 
  let hits = 0;
  let isSunk = false;
  return { length, hits, isSunk };
}
//Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.

//Ships should have a hit() function that increases the number of ‘hits’ in your ship.

//isSunk() should be a function that calculates whether a ship is considered sunk

module.exports = Ship;

