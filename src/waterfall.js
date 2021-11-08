const Queue = require('queue-fifo');
const { WATER, EMPTY } = require('./GridConstants');

function* waterfall(grid) {
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
      yield currFrame;
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

  yield -1;
}

module.exports = waterfall;
