var Queue = require('queue-fifo');
const chalk = require('chalk');

function sleep(n) {
  return new Promise(resolve => {
    setTimeout(resolve, n);
  });
}

const WATER = '.';
const STONE = '#';
const EMPTY = ' ';

async function* waterfall(grid, sleepTime) {
  let q = new Queue();
  const rows = grid.length;
  const cols = grid[0].length;

  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      if (grid[i][j] == WATER)
        q.enqueue([i, j, 0]);

  let currFrame = 0;

  while (!q.isEmpty()) {
    let [i, j, frame] = q.dequeue();

    if (frame != currFrame) {
      currFrame = frame;
      yield true;
      await sleep(sleepTime);
    }

    if (i == rows - 1) continue;

    let below = grid[i + 1][j];
    if (below == WATER) continue;

    if (below == EMPTY) {
      grid[i + 1][j] = WATER;
      q.enqueue([i + 1, j, frame + 1]);
    } else {
      [-1, 1].forEach(d => {
        let j2 = j + d;
        if (j2 < 0 || j2 == cols) return;
        if (grid[i][j2] == EMPTY) {
          grid[i][j2] = WATER;
          q.enqueue([i, j2, frame + 1]);
        }
      });
    }
  }

  yield false;
}

const initialMatrix = [
  '           .                           .                            .                                  ',
  '           ##                        #####                                                 .           ',
  '       .                                                            #                              #   ',
  '      ###                              ######                       #                  #          ##   ',
  '                                                                   # #                 #        ####   ',
  '                                                                   #  #                ##       #      ',
  '                                                                   #  #                #####  ###      ',
  '          ###############       ########                          #    #                   ####        ',
  '      #                    #               #                      #     #                              ',
  '      ########          ####      #    ####                      #       #                             ',
  '                               ####                                                                    ',
  '              #        #          #######                                                              ',
  '                                                                                                       ',
];

function toGrid(lines) {
  let matrix = [];

  for (let i = 0; i < lines.length; i++) {
    matrix.push(lines[i].split(''));
  }

  return matrix;
}

function printGrid(grid, frame) {
  const rows = grid.length;
  const cols = grid[0].length;

  let result = '';

  let chars = ['.', ',', '`', ';', ':'];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] == WATER) {
        let unique = (i + j + frame);
        result += chalk.blue(chars[unique % chars.length]);
      } else {
        result += grid[i][j];
      }
    }
    result += '\n';
  }

  console.log(result);
}

let grid = toGrid(initialMatrix);

printGrid(grid);

let animation = waterfall(grid, 500);

let frame = 0;

(async function () {
  do {
    console.clear();
    printGrid(grid, frame++);
  } while ((await animation.next()).value)
}());
