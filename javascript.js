"use strict";

const playerFactory = (marker) => {
  const getMarker = () => marker;

  return { getMarker };
};

const human = playerFactory("X");
const computer = playerFactory("O");

const gameboard = (() => {
  // SELECTORS
  const cells = document.querySelectorAll(".js-gameboard-cell");
  // INIT
  const gameboard = new Array(9);
  resetGameboard();


  // EVENT FUNCTIONS
  function markCell(event) {
    if (gameboard[event.target.dataset.cell] !== human.getMarker()) {
      gameboard[event.target.dataset.cell] = human.getMarker();
      event.target.textContent = human.getMarker();
      console.log(gameboard);
    }
  }

  // EVENT BINDING
  // addEventToCells() is created as a function for the possibility to call it in resetGame().
  const addEventToCells = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", markCell);
    });
  };
  addEventToCells();
  // OTHER FUNCTIONS
  function resetGameboard() {
    gameboard.fill("");
  }
})();
