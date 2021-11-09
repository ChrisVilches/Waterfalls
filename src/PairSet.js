class PairSet {
  constructor() {
    this.set = new Set();
  }

  add(i, j) {
    this.set.add(`${i} ${j}`);
  }

  entries() {
    let result = [];
    for (let [cell] of this.set.entries()) {
      result.push(cell.split(' ').map(x => +x));
    }

    return result;
  }
}

module.exports = PairSet;
