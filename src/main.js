
const readGrid = require('./readGrid');
const formatGrid = require('./formatGrid');
const waterfall = require('./waterfall');
const { sleep } = require('./util');

const grid = readGrid("./src/sample1.txt");

const animation = waterfall(grid, 600);

let frame = 0;

const CLEAR = '\33c';

async function main() {
  do {
    let gridText = formatGrid(grid, frame);

    let out = `${CLEAR}${gridText}`;
    process.stdout.write(out);

    await sleep(300);
  } while ((frame = animation.next().value) > -1);
}

function exitHandler() {
  //console.clear();
  process.exit();
}

process.on('exit', exitHandler);
process.on('SIGTERM', exitHandler);
process.on('SIGINT', exitHandler);

main();
