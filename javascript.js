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
      checkVictory();
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

  const checkVictory = () => {
    const winConditionRow = [
      [gameboard[0], gameboard[1], gameboard[2]],
      [gameboard[3], gameboard[4], gameboard[5]],
      [gameboard[6], gameboard[7], gameboard[8]],
      [gameboard[0], gameboard[3], gameboard[6]],
      [gameboard[1], gameboard[4], gameboard[7]],
      [gameboard[2], gameboard[5], gameboard[8]],
      [gameboard[0], gameboard[4], gameboard[8]],
      [gameboard[2], gameboard[4], gameboard[6]],
    ];

    if (
      winConditionRow.some((item) => {
        return item.every((subitem) => subitem === "X");
      })
    ) {
      console.log("VICTORY");
      cells.forEach((cell) => {
        cell.removeEventListener("click", markCell);
      });
    }
  };
})();
