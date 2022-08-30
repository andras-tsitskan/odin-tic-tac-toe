"use strict";

const playerFactory = (marker) => {
  const getMarker = () => marker;

  return { getMarker };
};

const human = playerFactory("X");
const computer = playerFactory("O");

const gameboard = (() => {
  // INIT
  const gameboard = new Array(9);
  resetGameboard();

  // OTHER FUNCTIONS
  function resetGameboard() {
    gameboard.fill("");
  }
})();
