#!/usr/bin/env node

const { readGrid } = require('./readGrid');
const formatGrid = require('./formatGrid');
const Waterfall = require('./Waterfall');
const path = require('path');
const { sleep, randomFileNameFromFolder, toggleCursor } = require('./util');

const SAMPLES_FOLDER = path.join(__dirname, '..', 'samples');

const fileName = process.argv[2] ? process.argv[2] : randomFileNameFromFolder(SAMPLES_FOLDER);
const grid = readGrid(fileName);

const animation = new Waterfall(grid);
animation.initialize();

let frame = 0;

const CLEAR = '\33c';

const DEBUG = process.env.NODE_ENV == 'development';

const SLEEP_TIME = 100;

let highestQueueSize = 0;

async function main() {

  while (true) {
    let gridText = formatGrid(grid, frame++);

    let out = `${CLEAR}${gridText}`;

    if (DEBUG) {
      out += `BFS Queue: ${animation.queueSize()} (highest: ${highestQueueSize})\n`;
      out += `Animation finished: ${animation.isFinished()}\n`;
      highestQueueSize = Math.max(animation.queueSize(), highestQueueSize);
    }

    process.stdout.write(out);

    toggleCursor(false);
    await sleep(SLEEP_TIME);

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
