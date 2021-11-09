const Queue = require('queue-fifo');
const R = require('ramda');
const { WATER, STONE, EMPTY } = require('./GridConstants');

class Waterfall {
  constructor(grid) {
    this.grid = grid;
  }

  initialize() {
    this.rows = this.grid.length;
    this.cols = this.grid[0].length;

    this.prev = [];
    this.tmp = R.clone(this.grid);
    for (let i = 0; i < this.rows; i++)
      this.prev.push([R.repeat([-1, -1], this.cols)]);

    this.q = new Queue();

    for (let i = 0; i < this.rows; i++)
      for (let j = 0; j < this.cols; j++)
        if (this.grid[i][j] == WATER)
          this.q.enqueue([i, j, 0]);

    this.currFrame = 0;
  }

  isFinished() {
    return this.q.isEmpty();
  }

  queueSize() {
    return this.q.size();
  }

  update() {
    const rows = this.rows;
    const cols = this.cols;
    const grid = this.grid;
    const tmp = this.tmp;
    const prev = this.prev;
    const q = this.q;

    while (!q.isEmpty()) {
      let [i, j, frame] = q.dequeue();

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

            const floodCells = new Set();

            let allowFloodUp = true;

            while (pos < cols && pos >= 0) {
              if (grid[i][pos] == STONE) break;
              if (grid[i][pos] == WATER) {
                tmp[i][pos] = STONE;
                floodCells.add(prev[i][pos].join(' '));
              }
              pos += -d;
            }

            for (let [cell] of floodCells.entries()) {
              let [i3, j3] = cell.split(' ');
              //prev[+i3][+j3] = prev[i][j];
              q.enqueue([+i3, +j3, frame + 1]);
            }
          }
        });
      }

      if (frame != this.currFrame) {
        this.currFrame = frame;
        return;
      }
    }
  }
}

module.exports = Waterfall;
