function sleep(n) {
  return new Promise(resolve => {
    setTimeout(resolve, n);
  });
}

module.exports = { sleep };
