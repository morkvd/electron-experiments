const _ = require('lodash');

// returns one of two random characters
function getRandomChar() {
  return _.random(0,1) === 1 ? '·' : ' ';
}

function switchChar(i) {
  return i === ' ' ? '·' : ' ';
}

// generates an array of length `n` where each array-item has the value of `fill`
function genArray(n, fill) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(fill);
  }
  return arr;
}



function lookNorth(i, len, grid) {
  const gridL = grid.length;
  return grid[ (i + (gridL - len) ) % gridL ];
}

function lookNorthEast(i, len, grid) {
  const gridL = grid.length;
  const minOne = len - 1;
  const N = (i + (gridL - len) ) % gridL;
  return grid[ N % len === minOne ? N - minOne : N + 1  ];
}

function lookEast(i, len, grid) {
  const minOne = len - 1;
  return grid[ i % len === minOne ? i - minOne : i + 1 ];
}

function lookSouthEast(i, len, grid) {
  const S = (i + len) % grid.length;
  const minOne = len - 1;
  return grid[ S % len === minOne ? S - minOne : S + 1 ];
}

function lookSouth(i, len, grid) {
  return grid[ (i + len) % grid.length ];
}

function lookSouthWest(i, len, grid) {
  const S = (i + len) % grid.length;
  return grid[ S % len === 0 ? S + (len - 1) : S - 1 ];
}

function lookWest(i, len, grid) {
  return grid[ i % len === 0 ? i + (len - 1) : i - 1 ];
}

function lookNorthWest(i, len, grid) {
  const gridL = grid.length;
  const N = (i + (gridL - len) ) % gridL;
  return grid[ N % len === 0 ? N + (len - 1) : N - 1 ];
}

function gatherDirections(i, len, grid) {
  return [
    lookNorth(i, len, grid),
    lookNorthEast(i, len, grid),
    lookEast(i, len, grid),
    lookSouthEast(i, len, grid),
    lookSouth(i, len, grid),
    lookSouthWest(i, len, grid),
    lookWest(i, len, grid),
    lookNorthWest(i, len, grid)
  ];
}

function getInitialState() {
  return _.map(genArray(900, ' '), getRandomChar);
}

function getNextState(grid) {
  return _.map(grid, switchChar);
}

exports.getRandomChar = getRandomChar;

exports.switchChar = switchChar;

exports.genArray = genArray;

exports.lookNorth = lookNorth;
exports.lookNorthEast = lookNorthEast;
exports.lookEast = lookEast;
exports.lookSouthEast = lookSouthEast;
exports.lookSouth = lookSouth;
exports.lookSouthWest = lookSouthWest;
exports.lookWest = lookWest;
exports.lookNorthWest = lookNorthWest;

exports.gatherDirections = gatherDirections;


exports.getInitialState = getInitialState;
exports.getNextState = getNextState;
