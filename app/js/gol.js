const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

const getRandomInt = (min, max) => {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
};

const getRandomChar = () => {
  return getRandomInt(0, 1) === 1 ? '·' : ' ';
};

const switchChar = (i) => {
  return i === ' ' ? '·' : ' ';
};

const genArray = (n, fill) => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(fill);
  }
  return arr;
};

const createBlankGrid = ([height, width]) => {
  let grid = genArray(height, '');
  grid.forEach( (_, i) => {
    grid[i] = genArray(width, ' ');
  });
  return grid;
};

const mapToGrid = (grid, fn) => {
  return grid.map(row => row.map(fn));
};

// todo: implement game of life rules
const grabNeighbours = (grid, [x,y]) => {

}

const aliveOrDead = (grid, [x, y]) => {

}

const decideFate = (grid) => {

}

const gol = {
  gen() {
    return mapToGrid(createBlankGrid([30, 30]), getRandomChar);
  },
  next(grid) {
    return mapToGrid(grid, switchChar);
  }
};

module.exports = gol;
