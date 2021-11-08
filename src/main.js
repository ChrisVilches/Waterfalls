
const readGrid = require('./readGrid');
const formatGrid = require('./formatGrid');
const waterfall = require('./waterfall');
const { sleep, randomFileNameFromFolder } = require('./util');

const SAMPLES_FOLDER = './samples';

const fileName = process.argv[2] ? process.argv[2] : randomFileNameFromFolder(SAMPLES_FOLDER);
const grid = readGrid(fileName);

const animation = waterfall(grid);

let frame = 0;

const CLEAR = '\33c';

async function main() {
  do {
    let gridText = formatGrid(grid, frame);

    let out = `${CLEAR}${gridText}`;
    process.stdout.write(out);

    await sleep(100);
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
