
const readGrid = require('./readGrid');
const formatGrid = require('./formatGrid');
const Waterfall = require('./Waterfall');
const { sleep, randomFileNameFromFolder, toggleCursor } = require('./util');

const SAMPLES_FOLDER = './samples';

const fileName = process.argv[2] ? process.argv[2] : randomFileNameFromFolder(SAMPLES_FOLDER);
const grid = readGrid(fileName);

const animation = new Waterfall(grid);
animation.initialize();

let frame = 0;

const CLEAR = '\33c';

const DEBUG = process.env.NODE_ENV == 'development';

async function main() {

  while (true) {
    let gridText = formatGrid(grid, frame++);

    let out = `${CLEAR}${gridText}`;

    if (DEBUG) {
      out = `${out}Queue: ${animation.queueSize()}\n`;
    }

    process.stdout.write(out);

    toggleCursor(false);
    await sleep(100);

    if (!animation.isFinished()) animation.update();
  }
}

function exitHandler() {
  //console.clear();
  toggleCursor(true);
  process.exit();
}

process.on('exit', exitHandler);
process.on('SIGTERM', exitHandler);
process.on('SIGINT', exitHandler);

main();
