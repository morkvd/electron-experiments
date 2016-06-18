/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\

  The Game of Life is a cellular automaton devised by the British mathematician
  John Horton Conway in 1970. It is the best-known example of a cellular automaton.
  Conway's game of life is described here:

  A cell C is represented by a 1 when alive or 0 when dead, in an m-by-m square array of cells.
  We calculate N - the sum of live cells in C's eight-location neighbourhood, then cell C is alive
  or dead in the next generation based on the following table:

    C   N                 new C
    1   0,1             ->  0  # Lonely
    1   4,5,6,7,8       ->  0  # Overcrowded
    1   2,3             ->  1  # Lives
    0   3               ->  1  # It takes three to give birth!
    0   0,1,2,4,5,6,7,8 ->  0  # Barren

  The "game" is actually a zero-player game, meaning that its evolution is determined by its
  initial state, needing no input from human players. One interacts with the Game of Life by
  creating an initial configuration and observing how it evolves.

  source: http://rosettacode.org/wiki/Conway%27s_Game_of_Life
  more info: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const _ = require('lodash');
const cell = { alive: '×', dead: ' ' };

// returns one of two random characters representing an alive or dead cell
function randomCell() {
  return _.random(0, 1) === 1 ? cell.alive : cell.dead;
}

// generates an array of length `n` where each array-item has the value of `fill`
function createGrid(n, fill) {
  const arr = [];
  let i;
  for (i = n; i--;) {
    arr.push(fill);
  }
  return arr;
}

/* * *
  Gathers the neighbours of cell `i` from grid `g`, where grid is a onedimensional array that
  represents a square grid where the sides are equal to linelength `linelen` so that
  `ll * ll === g.length`. The left and right edges, and the top and bottom edges of the field
  are stitched together forming forming a toroidal array, so that the easter-neighbour of a cell
  that sits on the eastern edge of the grid is the cell is on the western edge of the same line.
* * */
function gatherDirections(i, linelen, g) {
  // save the length of the grid so we don't have to calculate it everytime we need it.
  const gridlen = g.length;

  // because arrays are zero-indexed the last cell of the line === linelen - 1
  const eastEdge = linelen - 1;

  // get the northern neighbour by taking the index of the current cell and subtracting the length
  // of a line in the grid. The addition of the length of the grid is to prevent a negative value,
  // we can do this because we already take the remainder make the value 'loop around' when it gets
  // bigger than the length of the grid.
  const north = (i - linelen + gridlen) % gridlen;

  // get the southern neighbour by taking the index of the current cell and adding the length
  // of a line in the grid. The remainder operator is once again used to make the value
  // 'loop around' when it gets bigger than the length of the grid.
  const south = (i + linelen) % gridlen;

  // get the eastern neighbour by taking the index and adding 1, exept when i is the last cell of
  // the line, then we need to subtract `eastEdge` from the index
  const east = a => a % linelen === eastEdge ? a - eastEdge : a + 1;

  // get the western neighbour by taking the index and subtracting 1, exept when i is the first cell
  // of the line, then we need to add `eastEdge` to the index
  const west = a => a % linelen === 0 ? a + eastEdge : a - 1;

  // return an array of all the neighbours, we can get the diagonal neighbours by combining
  // north or south with east or west
  return [
    g[west(north)], g[north], g[east(north)],
    g[west(i)], /*  g[i]   */ g[east(i)],
    g[west(south)], g[south], g[east(south)],
  ];
}

// count the amount of alive cells in the provided array
function countAlive(arr) {
  return _.reduce(arr, (acc, value) => (value === cell.alive ? acc + 1 : acc), 0);
}

// decide if a cell is alive or dead based on number of alive neighbours and the current state
// of the cell
function aliveOrDead(neighbours, tile) {
  const alive = cell.alive;
  const dead = cell.dead;
  const lookup = [dead, dead, alive, alive, dead, dead, dead, dead, dead];

  if (tile === dead) {
    return (neighbours !== 3) ? dead : alive;
  }
  return lookup[neighbours];
}

// get the next state of a cell
function tickTile(v, i, a) {
  return aliveOrDead(countAlive(gatherDirections(i, 30, a)), v);
}

// get the next state of the grid
function tick(currentGrid) {
  return _.map(currentGrid, tickTile);
}

function getInitialState() {
  return _.map(createGrid(900, ' '), randomCell);
}

exports.randomCell = randomCell;
exports.createGrid = createGrid;
exports.gatherDirections = gatherDirections;
exports.getInitialState = getInitialState;
exports.tick = tick;
exports.countAlive = countAlive;
exports.aliveOrDead = aliveOrDead;
