const fs = require('fs');
const { WATER, STONE, EMPTY } = require('./GridConstants');

function checkChar(c) {
  if (c != WATER && c != STONE && c != EMPTY)
    throw new Error(`Invalid file. Character '${c}' cannot be present.`);
}

function readGrid(fileName) {
  const buffer = fs.readFileSync(fileName);
  const fileContent = buffer.toString();
  const lines = fileContent.split('\n');

  const rows = lines.length;
  let cols = 0;
  let grid = [];
  for (let i = 0; i < rows; i++) {
    cols = Math.max(cols, lines[i].length);
  }

  for (let i = 0; i < rows; i++) {
    grid.push(Array(cols));
    grid[i].fill(' ');
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let c = lines[i].charAt(j) || ' ';
      checkChar(c);
      grid[i][j] = c;
    }
  }
  return grid;
}

module.exports = readGrid;
