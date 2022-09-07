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
  const resetBtn = document.querySelector(".js-reset-btn");
  const humanMarkerField = document.querySelector(".js-human-marker");
  const computerMarkerField = document.querySelector(".js-computer-marker");
  const resultField = document.querySelector(".js-result");

  // INIT
  const gameboard = new Array(9);
  resetGameboard();

  humanMarkerField.textContent = human.getMarker();
  computerMarkerField.textContent = computer.getMarker();

  // EVENT FUNCTIONS
  function markCell(event) {
    if (gameboard[event.target.dataset.cell] !== human.getMarker()) {
      gameboard[event.target.dataset.cell] = human.getMarker();
      event.target.textContent = human.getMarker();
      console.log(gameboard);
      checkVictory();
    }
  }

  function resetGame() {
    resetGameboard();
    resetCells();
    addEventToCells();

    // TO BE DELETED
    console.log(gameboard);
  }

  // EVENT BINDING
  // addEventToCells() is created as a function for the possibility to call it in resetGame().
  const addEventToCells = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", markCell);
    });
  };
  addEventToCells();

  resetBtn.addEventListener("click", resetGame);

  // OTHER FUNCTIONS
  function resetGameboard() {
    gameboard.fill("");
  }

  function resetCells() {
    cells.forEach((cell) => (cell.textContent = ""));
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

  const getGameboard = () => {
    return gameboard;
  };

  // TO BE DELETED
  console.log(gameboard);

  return { getGameboard };
})();
