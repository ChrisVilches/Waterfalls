const Waterfall = require('../src/Waterfall');
const { linesToGrid } = require('../src/readGrid');
const { expect } = require('chai');

function animate(lines, frames = 1000000000) {
  let grid = linesToGrid(lines);
  let w = new Waterfall(grid);
  w.initialize();
  while (!w.isFinished() && (frames--) > 0) w.update();
  return grid;
}

describe('Waterfall', function () {
  context('animates water correctly', function () {
    it('no stones', function () {
      let grid1 = animate([
        '   .   ',
        '       ',
        '       '
      ]);

      let grid2 = linesToGrid([
        '   .   ',
        '   .   ',
        '   .   '
      ]);

      expect(grid1).to.deep.eq(grid2);
    });

    it('one stone', function () {
      let grid1 = animate([
        '   .   ',
        '       ',
        '   #   '
      ]);

      let grid2 = linesToGrid([
        '   .   ',
        '  ...  ',
        '  .#.  '
      ]);

      expect(grid1).to.deep.eq(grid2);
    });

    it('two water cells overlap', function () {
      let grid1 = animate([
        '   .   ',
        '       ',
        '   .   ',
        '       '
      ]);

      let grid2 = linesToGrid([
        '   .   ',
        '   .   ',
        '   .   ',
        '   .   '
      ]);

      expect(grid1).to.deep.eq(grid2);
    });

    it('overflow simple', function () {
      let grid1 = animate([
        '   .     ',
        '         ',
        ' #     # ',
        ' #     # ',
        '  #####  ',
        '         '
      ]);

      let grid2 = linesToGrid([
        '   .     ',
        '.........',
        '.#.....#.',
        '.#.....#.',
        '. ##### .',
        '.       .'
      ]);

      expect(grid1).to.deep.eq(grid2);
    });

    it('water cell inside concave area', function () {
      let grid1 = animate([
        '         ',
        ' #     # ',
        ' #  .  # ',
        ' #     # ',
        '  #####  ',
        '         '
      ]);

      let grid2 = linesToGrid([
        '.........',
        '.#.....#.',
        '.#.....#.',
        '.#.....#.',
        '. ##### .',
        '.       .'
      ]);

      expect(grid1).to.deep.eq(grid2);
    });

    it('overflow with partitions', function () {
      let grid1 = animate([
        '   .                 ',
        '                     ',
        ' #     #        #    ',
        ' #              #    ',
        '  ###############    ',
        '                     '
      ]);

      let grid2 = linesToGrid([
        '   .                 ',
        '..................   ',
        '.#.....#........#.   ',
        '.#..............#.   ',
        '. ###############.   ',
        '.                .   '
      ]);

      expect(grid1).to.deep.eq(grid2);
    });

    it('overflow with partitions. One of them starts filling from the incoming water source, and the other one from the middle.', function () {
      let grid1 = animate([
        '   .                     ',
        '                         ',
        ' #         #        #    ',
        ' #                  #    ',
        '  ###################    ',
        '                         '
      ], 20);

      let grid2 = linesToGrid([
        '   .                     ',
        '   .                     ',
        ' #...      #   .    #    ',
        ' #..................#    ',
        '  ###################    ',
        '                         '
      ]);

      expect(grid1).to.deep.eq(grid2);
    });
  });
});
