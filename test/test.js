/* eslint-disable prefer-arrow-callback */
const test = require('mocha');
const assert = require('chai').assert;
const gol = require('../app/js/game/gol.js');

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
    test.it('should return " " or "×"', function assertGetRandomChar() {
      assert.oneOf(gol.getRandomChar(), [' ', '×'], 'not one of the possibilities');
    });
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

  test.describe('countAlive(arr)', function testCountAlive() {
    test.it(
      'should return array where each item contains the number of alive neighbours',
      function asserCountAlive() {
        const countAliveArr = [
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '×'], // 1
          ['×', ' ', '×', ' ', '×', ' ', ' ', ' ', '×'], // 4
          ['×', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '×'], // 2
          ['×', ' ', ' ', ' ', '×', ' ', ' ', ' ', '×'], // 3
          ['×', ' ', '×', ' ', '×', ' ', '×', ' ', '×'], // 5
        ];
        const countAliveResults = [1, 4, 2, 3, 5];

        countAliveArr.map((a) => gol.countAlive(a))
          .forEach((b, i) => {
            assert.strictEqual(b, countAliveResults[i], 'no match');
          }
        );
      }
    );
  });

  test.describe('aliveOrDead(neighbours, tile)', function testAliveOrDead() {
    test.it(
      'should return array where each item contains the number of alive neighbours',
      function asserAliveOrDead() {
        const start = [
          ' ', ' ', ' ', ' ',
          ' ', ' ', ' ', '×',
          ' ', '×', '×', ' ',
          ' ', '×', '×', ' ',
        ];
        const nums = [
          2, 2, 3, 2,
          2, 2, 3, 1,
          3, 3, 4, 3,
          2, 3, 3, 2,
        ];
        const end = [
          ' ', ' ', '×', ' ',
          ' ', ' ', '×', ' ',
          '×', '×', ' ', '×',
          ' ', '×', '×', ' ',
        ];

        assert.strictEqual(gol.aliveOrDead(nums[0], start[0]), end[0], 'fail 0');
        assert.strictEqual(gol.aliveOrDead(nums[1], start[1]), end[1], 'fail 1');
        assert.strictEqual(gol.aliveOrDead(nums[2], start[2]), end[2], 'fail 2');
        assert.strictEqual(gol.aliveOrDead(nums[3], start[3]), end[3], 'fail 3');
        assert.strictEqual(gol.aliveOrDead(nums[4], start[4]), end[4], 'fail 4');
        assert.strictEqual(gol.aliveOrDead(nums[5], start[5]), end[5], 'fail 5');
        assert.strictEqual(gol.aliveOrDead(nums[6], start[6]), end[6], 'fail 6');
        assert.strictEqual(gol.aliveOrDead(nums[7], start[7]), end[7], 'fail 7');
        assert.strictEqual(gol.aliveOrDead(nums[8], start[8]), end[8], 'fail 8');
        assert.strictEqual(gol.aliveOrDead(nums[9], start[9]), end[9], 'fail 9');
        assert.strictEqual(gol.aliveOrDead(nums[10], start[10]), end[10], 'fail 10');
        assert.strictEqual(gol.aliveOrDead(nums[11], start[11]), end[11], 'fail 11');
        assert.strictEqual(gol.aliveOrDead(nums[12], start[12]), end[12], 'fail 12');
        assert.strictEqual(gol.aliveOrDead(nums[13], start[13]), end[13], 'fail 13');
        assert.strictEqual(gol.aliveOrDead(nums[14], start[14]), end[14], 'fail 14');
        assert.strictEqual(gol.aliveOrDead(nums[15], start[15]), end[15], 'fail 15');
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
      const i2neighbours = ['×', ' ', ' ', '×', ' ', ' ', ' ', '×'];
      const resulti2neighbours = gol.gatherDirections(2, 4, thisIsHowItStarts);
      for (let i = 0; i < i2neighbours.length; i++) {
        assert.strictEqual(resulti2neighbours[i], i2neighbours[i], `neighbour ${i} is wrong`);
      }
    });

    test.it('it should count the number of alive neighbours', function assertCountAlive() {
      const i2neighbours = ['×', ' ', ' ', '×', ' ', ' ', ' ', '×'];
      const numAliveNeighbours = gol.countAlive(i2neighbours);
      assert.strictEqual(numAliveNeighbours, 3, 'count is wrong');
    });

    test.it('it should return the correct tile based on the number', function assertAliveDead() {
      assert.strictEqual(gol.aliveOrDead(3, ' '), '×', 'tile is wrong');
    });
  });
});
/* eslint-enable prefer-arrow-callback */
