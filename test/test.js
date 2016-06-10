const test = require('mocha');
const assert = require('chai').assert;
const gol = require('../app/js/gol.js');
const _ = require('lodash');

test.describe('GOL', function() {
  const testGrid = [
  //  0,   1,   2,   3,
     'a', 'b', 'c', 'd',
  //  4,   5,   6,   7,
     'e', 'f', 'g', 'h',
  //  8,   9,  10,  11,
     'i', 'j', 'k', 'l',
  // 12,  13,  14,  15,
     'm', 'n', 'o', 'p'
  ];
  const testLineLength = 4;

  test.describe('getRandomChar', function() {
    test.it('should return " " or "·"', function() {
      assert.oneOf(gol.getRandomChar(), [' ', '·'], 'not one of the possibilities');
    });
  });

  test.describe('switchChar(i)', function() {
    test.it("should return '·' when i = ' ', else is should return ' '", function() {
      assert.strictEqual(gol.switchChar('·'), ' ', "return value of switchChar isn't correct");
      assert.strictEqual(gol.switchChar(' '), '·', "return value of switchChar isn't correct");
    });
  });

  test.describe('genArray(n, fill)', function() {
    test.it("should return an array of length n where each item is equal to fill", function() {
      assert.strictEqual(gol.genArray(5, 'X').length, 5, "length of returned array isn't correct");
      assert.strictEqual(gol.genArray(5, 'Y')[0], 'Y', "first array item isn't equal to fill");
      assert.equal(gol.genArray(0, 'Y').length, [].length, "n = 0 doesn't returns empty array");
    });
  });

  // NORTH
  test.describe('getNorthNeighbour(i, grid, linelength)', function() {
    test.it("should return the north neighbouring tile in the grid", function() {
      const expectedOutcome = [
        'm', 'n', 'o', 'p',
        'a', 'b', 'c', 'd',
        'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l'
      ];
      testGrid.map((c, i, arr) => {
        return gol.getNorthNeighbour(i, arr, 4);
      }).forEach((c, i, arr) => {
        assert.strictEqual(arr[i], expectedOutcome[i], 'no match');
      });
    });
  });

  // EAST
  test.describe('getEastNeighbour(i, grid, linelength)', function() {
    test.it("should return the east neighbouring tile in the grid", function() {
      const expectedOutcome = [
         'b', 'c', 'd', 'a',
         'f', 'g', 'h', 'e',
         'j', 'k', 'l', 'i',
         'n', 'o', 'p', 'm'
      ];
      testGrid.map((c, i, arr) => {
        return gol.getEastNeighbour(i, arr, 4);
      }).forEach((c, i, arr) => {
        assert.strictEqual(arr[i], expectedOutcome[i], 'no match');
      });
    });
  });

  // SOUTH
  test.describe('getSouthNeighbour(i, grid, linelength)', function() {
    test.it("should return the south neighbouring tile in the grid", function() {
      const expectedOutcome = [
        'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p',
        'a', 'b', 'c', 'd'
      ];
      testGrid.map((c, i, arr) => {
        return gol.getSouthNeighbour(i, arr, 4);
      }).forEach((c, i, arr) => {
        assert.strictEqual(arr[i], expectedOutcome[i], 'no match');
      });
    });
  });

  // WEST
  test.describe('getWestNeighbour(i, grid, linelength)', function() {
    test.it("should return the west neighbouring tile in the grid", function() {
      const expectedOutcome = [
        'd', 'a', 'b', 'c',
        'h', 'e', 'f', 'g',
        'l', 'i', 'j', 'k',
        'p', 'm', 'n', 'o',
      ];
      testGrid.map((c, i, arr) => {
        return gol.getWestNeighbour(i, arr, 4);
      }).forEach((c, i, arr) => {
        assert.strictEqual(arr[i], expectedOutcome[i], 'no match');
      });
    });
  });


});
