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
          } else if (grid[i][j2] == STONE || grid[i][j2] == WATER) {
            if (!this.isConcaveFull(i, j)) return;
            if (i == 0) return;

            let [start, end] = this.concaveRange(i, j);

            if (this.grid[i][start] != STONE && this.grid[i][end] != STONE) return;

            for (let x = start + 1; x <= end; x++) {

              let start1, end1;

              if (this.grid[i - 1][x] == STONE && this.grid[i - 1][x - 1] == EMPTY) {
                [start1, end1] = this.concaveRange(i - 1, x - 1);
              } else if (x == end - 1 && this.grid[i - 1][x] != STONE) {
                [start1, end1] = this.concaveRange(i - 1, x);
              } else {
                continue;
              }

              const bothStones = this.grid[i - 1][start1] == STONE && this.grid[i - 1][end1] == STONE;
              const bothEmpty = this.grid[i - 1][start1] == EMPTY && this.grid[i - 1][end1] == EMPTY;
              //if (!(bothEmpty || bothStones)) break;

              start1 = Math.max(start1, start);
              end1 = Math.min(end1, end);

              let j3 = Math.floor((start1 + end1) / 2);

              // If the "prev" (the incoming initial water flow) comes from this concave partition,
              // then enqueue that one. If not, just leave it at the middle of the partition.
              if (prev[i][j] && start1 <= prev[i][j][1] && prev[i][j][1] <= end1) {
                j3 = prev[i][j][1];
              }

              grid[i - 1][j3] = WATER; // Necessary ?
              tmp[i - 1][j3] = STONE;
              q.enqueue([i - 1, j3, frame + 1]);
            }

            for (let x = start + 1; x < end; x++) {
              tmp[i][x] = STONE;
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

  /**
   * Returns the range from the first stone before the given position, ending in the first stone after the position.
   * @param {Number} i
   * @param {Number} j
   * @returns {Number[]} Start and End position of range, including both stones.
   */
  concaveRange(i, j) {
    let pos = j;
    let start = 0;
    let end = this.cols - 1;

    if (this.grid[i][j] == STONE) {
      throw new Error(`Concave ranges cannot be computed starting from a stone position (${i}, ${j}).`);
    }

    while (pos < this.cols) {
      if (this.grid[i][pos] == STONE) {
        end = pos;
        break;
      }
      pos++;
    }

    pos = j;
    while (pos >= 0) {
      if (this.grid[i][pos] == STONE) {
        start = pos;
        break;
      }
      pos--;
    }

    if (this.grid[i][start] != STONE || this.grid[i][start] != STONE) {
      //throw new Error('Incorrect range. It is not surrounded by stones.');
    }

    return [start, end];
  }

  /**
   * @param {Number} i
   * @param {Number} j
   * @returns {boolean} Checks if the concave range the position is in, is full of water.
   */
  isConcaveFull(i, j) {
    let [start, end] = this.concaveRange(i, j);

    for (let x = start + 1; x < end; x++) {
      if (this.grid[i][x] != WATER) return false;
    }

    if (start == 0 && this.grid[i][start] != STONE) return false;
    if (end == this.cols - 1 && this.grid[i][end] != STONE) return false;
    return true;
  }
}

module.exports = Waterfall;
