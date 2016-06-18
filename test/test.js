/* eslint-disable prefer-arrow-callback */
const test = require('mocha');
const assert = require('chai').assert;
const gol = require('../app/js/game/gol.js');

test.describe('GOL', function testGOL() {
  test.describe('randomCell', function testrandomCell() {
    test.it('should return " " or "×"', function assertrandomCell() {
      assert.oneOf(gol.randomCell(), [' ', '×'], 'not one of the possibilities');
    });
  });

  test.describe('createGrid(n, fill)', function testcreateGrid() {
    test.it(
      'should return an array of length n where each item is equal to fill',
      function assertcreateGrid() {
        assert.strictEqual(
          gol.createGrid(5, 'X').length, 5,
          "length of returned array isn't correct"
        );
        assert.strictEqual(gol.createGrid(5, 'Y')[0], 'Y', "first array item isn't equal to fill");
        assert.equal(gol.createGrid(0, 'Y').length, [].length, "n = 0 doesn't returns empty array");
      }
    );
  });

  test.describe('chainzinger', function testDebug() {
    const thisIsHowItStarts = [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', '×',
      ' ', '×', '×', ' ',
      ' ', '×', '×', ' ',
    ];
    test.it('it should gather all neighbouring tiles', function assertGetThemNeighbours() {
      const i2neighbours = ['×', '×', ' ', ' ', ' ', ' ', ' ', '×'];
      const resulti2neighbours = gol.gatherDirections(2, 4, thisIsHowItStarts);
      for (let i = 0; i < i2neighbours.length; i++) {
        assert.strictEqual(resulti2neighbours[i], i2neighbours[i], `neighbour ${i} is wrong`);
      }
    });

    test.it('it should count the number of alive neighbours', function assertCountAlive() {
      const i2neighbours = ['×', '×', ' ', ' ', ' ', ' ', ' ', '×'];
      const numAliveNeighbours = gol.countAlive(i2neighbours);
      assert.strictEqual(numAliveNeighbours, 3, 'count is wrong');
    });

    test.it('it should return the correct tile based on the number', function assertAliveDead() {
      assert.strictEqual(gol.aliveOrDead(3, ' '), '×', 'tile is wrong');
    });
  });
});
/* eslint-enable prefer-arrow-callback */
