export function createBoard(containerID) {
  const container = document.getElementById(containerID);

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x; //store to access position later
      cell.dataset.y = y;
      container.appendChild(cell);
    }
  }
}
export function renderShips(fleet, containerID) {
  fleet.forEach((shipObj) => {
    shipObj.positions.forEach(([x, y]) => {
      const cell = containerID.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      if (cell) {
        cell.classList.add("ship-cell");
      }
    });
  });
}
