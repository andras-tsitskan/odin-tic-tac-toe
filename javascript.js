"use strict";

const playerFactory = (marker) => {
  const getMarker = () => marker;

  return { getMarker };
};

const human = playerFactory("X");
const computer = playerFactory("O");

const gameboard = (() => {
})();
