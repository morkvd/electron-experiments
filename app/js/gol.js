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

// returns the value of the tile above `grid[i]` when the `grid` array is split up into equal lines
// of `linelength`
function getNorthNeighbour(i, grid, linelength) {
  return grid[ (i + (grid.length - linelength) ) % grid.length ];
}

// returns the value of the tile right of `grid[i]` when the `grid` array is split up into equal lines
// of `linelength`
function getEastNeighbour(i, grid, linelength) {
  let llMinOne = linelength - 1;
  return grid[ i % linelength === llMinOne ? i - llMinOne : i + 1 ];
}

// returns the value of the tile below `grid[i]` when the `grid` array is split up into equal lines
// of `linelength`
function getSouthNeighbour(i, grid, linelength) {
  return grid[ (i + linelength) % grid.length ];
}

// returns the value of the tile left of `grid[i]` when the `grid` array is split up into equal lines
// of `linelength`
function getWestNeighbour(i, grid, linelength) {
  return grid[ i % 4 === 0 ? i + (linelength - 1) : i - 1 ];
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
exports.getNorthNeighbour = getNorthNeighbour;
exports.getEastNeighbour = getEastNeighbour;
exports.getSouthNeighbour = getSouthNeighbour;
exports.getWestNeighbour = getWestNeighbour;
exports.getInitialState = getInitialState;
exports.getNextState = getNextState;
