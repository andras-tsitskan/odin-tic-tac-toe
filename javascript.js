"use strict";

const playerFactory = (marker) => {
  const getMarker = () => marker;

  return { getMarker };
};

const human = playerFactory("X");
const computer = playerFactory("O");

const gameboard = (() => {
  // --- SELECTORS ---

  const cells = document.querySelectorAll(".js-gameboard-cell");
  const resetBtn = document.querySelector(".js-reset-btn");
  const humanMarkerField = document.querySelector(".js-human-marker");
  const computerMarkerField = document.querySelector(".js-computer-marker");
  const resultField = document.querySelector(".js-result");

  // --- INIT ---

  const gameboard = new Array(9);
  resetGameboard();

  humanMarkerField.textContent = human.getMarker();
  computerMarkerField.textContent = computer.getMarker();
  resetResultField();

  let turnCount = 0;

  // --- EVENT FUNCTIONS ---

  function markCell(event) {
    if (gameboard[event.target.dataset.cell] !== human.getMarker()) {
      gameboard[event.target.dataset.cell] = human.getMarker();
      event.target.textContent = human.getMarker();
      console.log(gameboard);
      turnCount++;
      checkVictory();
      getComputerMove();
    }
  }

  function resetGame() {
    resetGameboard();
    resetCells();
    addEventToCells();
    turnCount = 0;
    resetResultField();

    // TO BE DELETED
    console.log(gameboard);
    console.clear();
  }

  // --- EVENT BINDING ---

  // addEventToCells() is created as a function for the possibility to call it in resetGame().
  const addEventToCells = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", markCell);
    });
  };
  addEventToCells();

  resetBtn.addEventListener("click", resetGame);

  // --- HELPER FUNCTIONS ---

  function resetGameboard() {
    gameboard.fill("");
  }

  function resetCells() {
    cells.forEach((cell) => (cell.textContent = ""));
  }

  function resetResultField() {
    resultField.textContent = "the game is ongoing!";
    resultField.classList.remove("gold");
  }

  const checkVictory = () => {
    const winConditionRows = [
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
      winConditionRows.some((item) => {
        return item.every((subitem) => subitem === "X");
      })
    ) {
      console.log("YOU WON");
      resultField.textContent = "you won! Nice job!";
      resultField.classList.add("gold");
      cells.forEach((cell) => {
        cell.removeEventListener("click", markCell);
      });
      return;
    } else if (
      winConditionRows.some((item) => {
        return item.every((subitem) => subitem === "O");
      })
    ) {
      console.log("COMPUTER WON");
      resultField.textContent =
        'computer won. Press "Restart game" to play again.';
      resultField.classList.add("gold");
      cells.forEach((cell) => {
        cell.removeEventListener("click", markCell);
      });
      return;
    } else if (turnCount >= 4) {
      resultField.textContent =
        'it is a tie! Press "Restart game" to play again.';
      resultField.classList.add("gold");
      cells.forEach((cell) => {
        cell.removeEventListener("click", markCell);
      });
      return;
    }
  };

  const getComputerMove = () => {
    while (turnCount < 5) {
      const randomCell = Math.floor(Math.random() * gameboard.length);
      const computerCellSelection = gameboard[randomCell];

      if (computerCellSelection === "") {
        gameboard[randomCell] = "O";
        cells[randomCell].textContent = "O";
        cells[randomCell].removeEventListener("click", markCell);
        checkVictory();

        // TO BE DELETED
        console.log(gameboard);

        break;
      }
    }
  };

  const getGameboard = () => {
    return gameboard;
  };

  // TO BE DELETED
  console.log(gameboard);

  return { getGameboard };
})();
