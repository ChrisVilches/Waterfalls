const Queue = require('queue-fifo');
const R = require('ramda');
const { WATER, STONE, EMPTY } = require('./GridConstants');

function* waterfall(grid) {
  const q = new Queue();
  const rows = grid.length;
  const cols = grid[0].length;

  const prev = [];

  const tmp = R.clone(grid);

  for (let i = 0; i < rows; i++) {
    prev.push([]);
    for (let j = 0; j < cols; j++) {
      prev[i].push([-1, -1]);
    }
  }

  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      if (grid[i][j] == WATER)
        q.enqueue([i, j, 0]);

  let currFrame = 0;

  while (!q.isEmpty()) {
    let [i, j, frame] = q.dequeue();

    if (frame != currFrame) {
      currFrame = frame;
      yield currFrame;
    }

    if (i == rows - 1) continue;

    let below = tmp[i + 1][j];
    if (below == WATER) continue;

    if (below == EMPTY) {
      grid[i + 1][j] = WATER;
      tmp[i + 1][j] = WATER;
      q.enqueue([i + 1, j, frame + 1]);
      prev[i + 1][j] = [i, j];
    } else {
      [-1, 1].forEach(d => {
        let j2 = j + d;
        if (j2 < 0 || j2 == cols) return;

        if (tmp[i][j2] == EMPTY) {
          grid[i][j2] = WATER;
          tmp[i][j2] = WATER;
          q.enqueue([i, j2, frame + 1]);
          prev[i][j2] = prev[i][j];
        } else if (grid[i][j2] == STONE) {
          let concaveFull = true;

          let pos = j;

          while (pos < cols && pos >= 0) {
            if (grid[i][pos] == STONE) break;
            if (grid[i][pos] != WATER) {
              concaveFull = false;
              break;
            }
            pos += -d;
          }

          if (!concaveFull) return;

          pos = j;

          while (pos < cols && pos >= 0) {
            if (grid[i][pos] == STONE) break;
            if (grid[i][pos] == WATER) {
              tmp[i][pos] = STONE;
            }
            pos += -d;
          }
          let [previ, prevj] = prev[i][j];
          q.enqueue([previ, prevj, frame + 1]);
        }
      });
    }
  }

  yield -1;
}

module.exports = waterfall;
