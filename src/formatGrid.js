const chalk = require('chalk');
const { WATER } = require('./GridConstants');

const WATER_CHARS = ['.', ',', '`', ';', ':'];

function formatGrid(grid, frame) {
  const rows = grid.length;
  const cols = grid[0].length;

  let result = '';

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] == WATER) {
        let unique = (i + j + frame);
        result += chalk.blue(WATER_CHARS[unique % WATER_CHARS.length]);
      } else {
        result += grid[i][j];
      }
    }
    result += '\n';
  }

  return result;
}

module.exports = formatGrid;
