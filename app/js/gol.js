var _ = require('lodash');

const getRandomChar = () => {
  return _.random(0,1) === 1 ? '·' : ' ';
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

const mapToGrid = (grid, fn) => {
  return grid.map(row => row.map(fn));
};


const gol = {
  blankLevel: genArray(900, ' '),
  gen() {
    return this.blankLevel.map( getRandomChar );
  },
  next(grid) {
    return grid.map( switchChar );
  }
};

module.exports = gol;
