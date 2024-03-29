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
  const resultField = document.querySelector(".js-result");
  const humanMarkerField = document.querySelector(".js-human-marker");
  const computerMarkerField = document.querySelector(".js-computer-marker");

  // --- INIT ---

  const gameboard = new Array(9);
  resetGameboard();

  humanMarkerField.textContent = human.getMarker();
  computerMarkerField.textContent = computer.getMarker();
  resetResultField();

  let turnCount = 1;

  // --- EVENT FUNCTIONS ---

  function markCell(event) {
    if (gameboard[event.target.dataset.cell] !== human.getMarker()) {
      gameboard[event.target.dataset.cell] = human.getMarker();
      event.target.textContent = human.getMarker();
      console.log(gameboard);
      turnCount++;
      displayController.updateTurnCountField(turnCount);
      checkVictory();
      getComputerMove();
    }
  }

  const markCell2 = (event, marker) => {
    if (gameboard[event.target.dataset.cell] === "") {
      gameboard[event.target.dataset.cell] = marker;
      event.target.textContent = marker;
      console.log(gameboard);
      turnCount++;
      displayController.updateTurnCountField(turnCount);
      checkVictory();
      getComputerMove();
    }
  };

  function resetGame() {
    resetGameboard();
    resetCells();
    addEventToCells();
    turnCount = 1;
    displayController.updateTurnCountField(turnCount);
    resetResultField();

    // TO BE DELETED
    console.log(gameboard);
    console.clear();
  }

  // --- EVENT BINDING ---

  // addEventToCells() is created as a function for the possibility to call it in resetGame().
  const addEventToCells = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", (event) => {
        markCell2(event, human.getMarker());
      });
    });
  };
  // const addEventToCells = () => {
  //   cells.forEach((cell) => {
  //     cell.addEventListener("click", markCell);
  //   });
  // };
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
    resultField.textContent = "you are thinking your next move, I know that!";
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
    } else if (turnCount >= 5) {
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

const displayController = (() => {
  // --- SELECTORS ---
  const turnCountField = document.querySelector(".js-turn-number");

  // --- HELPER FUNCTIONS ---

  const updateTurnCountField = (turnCount) => {
    if (turnCount < 4) {
      turnCountField.textContent = `Turn ${turnCount}/4`;
    } else if ((turnCount = 4)) {
      turnCountField.textContent = "Final turn!";
    }
  };

  return { updateTurnCountField };
})();
