//1.Begin your app by creating the Ship class/factory (your choice).

function Ship(length) {
  let hits = 0;

  //Ships should have a hit() function that increases the number of ‘hits’ in your ship.
  function hit() {
    hits++;
  }
  //isSunk() should be a function that calculates whether a ship is considered sunk
  function isSunk() {
    return hits >= length;
  }
  return {
    length,
    isSunk,
    hit,
    get hits() {
      return hits;
    },
  };
}

module.exports = Ship;
