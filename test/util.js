const Waterfall = require('../src/Waterfall');
const { linesToGrid } = require('../src/readGrid');

function animate(lines, frames = 1000000000) {
  let grid = linesToGrid(lines);
  let w = new Waterfall(grid);
  w.initialize();
  while (!w.isFinished() && (frames--) > 0) w.update();
  return grid;
}

function printGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''));
  }
}

module.exports = { animate, printGrid };
