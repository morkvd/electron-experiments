/* eslint-disable prefer-arrow-callback */
const test = require('mocha');
const assert = require('chai').assert;
const gol = require('../app/js/gol.js');

test.describe('GOL', function testGOL() {
  const testGrid = [
    'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p',
  ];
  const northGrid = [
    'm', 'n', 'o', 'p',
    'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l',
  ];
  const northEastGrid = [
    'n', 'o', 'p', 'm',
    'b', 'c', 'd', 'a',
    'f', 'g', 'h', 'e',
    'j', 'k', 'l', 'i',
  ];
  const eastGrid = [
    'b', 'c', 'd', 'a',
    'f', 'g', 'h', 'e',
    'j', 'k', 'l', 'i',
    'n', 'o', 'p', 'm',
  ];
  const southEastGrid = [
    'f', 'g', 'h', 'e',
    'j', 'k', 'l', 'i',
    'n', 'o', 'p', 'm',
    'b', 'c', 'd', 'a',
  ];
  const southGrid = [
    'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p',
    'a', 'b', 'c', 'd',
  ];
  const southWestGrid = [
    'h', 'e', 'f', 'g',
    'l', 'i', 'j', 'k',
    'p', 'm', 'n', 'o',
    'd', 'a', 'b', 'c',
  ];
  const westGrid = [
    'd', 'a', 'b', 'c',
    'h', 'e', 'f', 'g',
    'l', 'i', 'j', 'k',
    'p', 'm', 'n', 'o',
  ];
  const northWestGrid = [
    'p', 'm', 'n', 'o',
    'd', 'a', 'b', 'c',
    'h', 'e', 'f', 'g',
    'l', 'i', 'j', 'k',
  ];
  const directionsGrid = [
    northGrid,
    northEastGrid,
    eastGrid,
    southEastGrid,
    southGrid,
    southWestGrid,
    westGrid,
    northWestGrid,
  ];

  const testLineLength = 4;

  test.describe('getRandomChar', function testGetRandomChar() {
    test.it('should return " " or "·"', function assertGetRandomChar() {
      assert.oneOf(gol.getRandomChar(), [' ', '·'], 'not one of the possibilities');
    });
  });

  test.describe('switchChar(i)', function testSwitchChar() {
    test.it(
      "should return '·' when i = ' ', else is should return ' '",
      function assertSwitchChar() {
        assert.strictEqual(gol.switchChar('·'), ' ', "return value of switchChar isn't correct");
        assert.strictEqual(gol.switchChar(' '), '·', "return value of switchChar isn't correct");
      }
    );
  });

  test.describe('genArray(n, fill)', function testGenArray() {
    test.it(
      'should return an array of length n where each item is equal to fill',
      function assertGenArray() {
        assert.strictEqual(
          gol.genArray(5, 'X').length, 5,
          "length of returned array isn't correct"
        );
        assert.strictEqual(gol.genArray(5, 'Y')[0], 'Y', "first array item isn't equal to fill");
        assert.equal(gol.genArray(0, 'Y').length, [].length, "n = 0 doesn't returns empty array");
      }
    );
  });


  // NORTH
  test.describe('lookNorth(i, linelength, grid)', function testLookNorth() {
    test.it('should return the north ing tile in the grid', function assertLookNorth() {
      testGrid.map((c, i, arr) => gol.lookNorth(i, testLineLength, arr))
        .forEach((c, i, arr) => {
          assert.strictEqual(arr[i], northGrid[i], 'no match');
        }
      );
    });
  });

  // NORTH EAST
  test.describe('lookNorthEast(i, testLineLength, arr)', function testLookNorthEast() {
    test.it('should return the north east ing tile in the grid', function assertLookNorthEast() {
      testGrid.map((c, i, arr) => gol.lookNorthEast(i, testLineLength, arr))
        .forEach((c, i, arr) => {
          assert.strictEqual(arr[i], northEastGrid[i], 'no match');
        }
      );
    });
  });

  // EAST
  test.describe('lookEast(i, testLineLength, arr)', function testLookEast() {
    test.it('should return the east ing tile in the grid', function asertLookEast() {
      testGrid.map((c, i, arr) => gol.lookEast(i, testLineLength, arr))
        .forEach((c, i, arr) => {
          assert.strictEqual(arr[i], eastGrid[i], 'no match');
        }
      );
    });
  });

  // SOUTHEAST
  test.describe('lookSouthEast(i, testLineLength, arr)', function testLookSouthEast() {
    test.it('should return the south east ing tile in the grid', function assertLookSouthEast() {
      testGrid.map((c, i, arr) => gol.lookSouthEast(i, testLineLength, arr))
        .forEach((c, i, arr) => {
          assert.strictEqual(arr[i], southEastGrid[i], 'no match');
        }
      );
    });
  });

  // SOUTH
  test.describe('lookSouth(i, testLineLength, arr)', function testLookSouth() {
    test.it('should return the south ing tile in the grid', function assertLookSouth() {
      testGrid.map((c, i, arr) => gol.lookSouth(i, testLineLength, arr))
        .forEach((c, i, arr) => {
          assert.strictEqual(arr[i], southGrid[i], 'no match');
        }
      );
    });
  });

  // SOUTWEST
  test.describe('lookSouthWest(i, testLineLength, arr)', function testLookSouthWest() {
    test.it(
      'should return the ing tile to the south west of `i` in the grid',
      function assertLookSouthWest() {
        testGrid.map((c, i, arr) => gol.lookSouthWest(i, testLineLength, arr))
          .forEach((c, i, arr) => {
            assert.strictEqual(arr[i], southWestGrid[i], 'no match');
          }
        );
      }
    );
  });

  // WEST
  test.describe('lookWest(i, testLineLength, arr)', function testLookWest() {
    test.it('should return the west ing tile in the grid', function assertLookWest() {
      testGrid.map((c, i, arr) => gol.lookWest(i, testLineLength, arr))
        .forEach((c, i, arr) => {
          assert.strictEqual(arr[i], westGrid[i], 'no match');
        }
      );
    });
  });

  // NORTHWEST
  test.describe('lookNorthWest(i, testLineLength, arr)', function testLookNorthWest() {
    test.it('should return the tile NW of `grid[i]`', function assertLookNorthWest() {
      testGrid.map((c, i, arr) => gol.lookNorthWest(i, testLineLength, arr))
        .forEach((c, i, arr) => {
          assert.strictEqual(arr[i], northWestGrid[i], 'no match');
        }
      );
    });
  });

  // ALL DIRECTIONS
  test.describe('gatherDirections(i, testLineLength, arr)', function testGatherDirections() {
    test.it('should return `grid[i]` surounding tiles', function assertGatherDirections() {
      testGrid.map((a, i, arr) => gol.gatherDirections(i, testLineLength, arr))
        .forEach((b, j) => {
          b.forEach((c, k) => {
            assert.strictEqual(c, directionsGrid[k][j], 'no match');
          });
        }
      );
    });
  });
});
/* eslint-enable prefer-arrow-callback */
