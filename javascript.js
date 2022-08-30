"use strict";

const playerFactory = (marker) => {
  const getMarker = () => marker;

  return { getMarker };
};
