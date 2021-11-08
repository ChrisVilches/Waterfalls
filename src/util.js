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

module.exports = { sleep, randomFileNameFromFolder };
