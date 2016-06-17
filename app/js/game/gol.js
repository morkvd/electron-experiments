const _ = require('lodash');

const tiles = {
  alive: '·',
  dead: ' ',
};

// returns one of two random characters
function getRandomChar() {
  return _.random(0, 1) === 1 ? tiles.alive : tiles.dead;
}

function switchChar(i) {
  return i === tiles.alive ? tiles.dead : tiles.alive;
}

// generates an array of length `n` where each array-item has the value of `fill`
function genArray(n, fill) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(fill);
  }
  return arr;
}


function lookNorth(i, len, grid) {
  const gridL = grid.length;
  return grid[(i + (gridL - len)) % gridL];
}

function lookNorthEast(i, len, grid) {
  const gridL = grid.length;
  const minOne = len - 1;
  const N = (i + (gridL - len)) % gridL;
  return grid[N % len === minOne ? N - minOne : N + 1];
}

function lookEast(i, len, grid) {
  const minOne = len - 1;
  return grid[i % len === minOne ? i - minOne : i + 1];
}

function lookSouthEast(i, len, grid) {
  const S = (i + len) % grid.length;
  const minOne = len - 1;
  return grid[S % len === minOne ? S - minOne : S + 1];
}

function lookSouth(i, len, grid) {
  return grid[(i + len) % grid.length];
}

function lookSouthWest(i, len, grid) {
  const S = (i + len) % grid.length;
  return grid[S % len === 0 ? S + (len - 1) : S - 1];
}

function lookWest(i, len, grid) {
  return grid[i % len === 0 ? i + (len - 1) : i - 1];
}

function lookNorthWest(i, len, grid) {
  const gridL = grid.length;
  const N = (i + (gridL - len)) % gridL;
  return grid[N % len === 0 ? N + (len - 1) : N - 1];
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
    lookNorthWest(i, len, grid),
  ];
}

function countAlive(arr) {
  return _.reduce(arr, (acc, value) => (value === tiles.alive ? acc + 1 : acc), 0);
}

function aliveOrDead(neighbours, tile) {
  const alive = tiles.alive;
  const dead = tiles.dead;
  if (tile === alive) {
    if (neighbours < 2 || neighbours > 3) {
      return dead;
    } else if (neighbours === 2 || neighbours === 3) {
      return alive;
    }
  } else if (tile === dead && neighbours === 3) {
    return alive;
  }
  return dead;
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
exports.countAlive = countAlive;
exports.tick = tick;
