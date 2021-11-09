const fs = require('fs');
const path = require('path');

function sleep(n) {
  return new Promise(resolve => {
    setTimeout(resolve, n);
  });
}

function randomFileNameFromFolder(folder) {
  const files = fs.readdirSync(folder);
  const idx = Math.floor((Math.random() * 100) % files.length);
  const file = files[idx];

  return path.join(folder, file);
}

function toggleCursor(toggle) {
  const disable = '\x1B[?25l';
  const enable = '\x1B[?25h';
  process.stderr.write(toggle ? enable : disable);
}

module.exports = { sleep, randomFileNameFromFolder, toggleCursor };
