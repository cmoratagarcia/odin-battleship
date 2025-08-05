//1.Begin your app by creating the Ship class/factory (your choice).

export default function Ship(length) {
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
    hit,
    isSunk,
    get hits() {
      return hits;
    },
  };
}
