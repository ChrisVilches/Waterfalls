const { expect } = require('chai');
const { animate } = require('./util');
const { linesToGrid } = require('../src/readGrid');

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

    it('three partitions', function () {
      const initial = [
        '                .                  ',
        '     #                             ',
        '     #       #     #             # ',
        '     #       #     #             # ',
        '     #       #     #             # ',
        '     #       #     #             # ',
        '     #       #     #             # ',
        '     #                           # ',
        '################################## '
      ];
      let grid1 = animate(initial, 25);

      let grid2 = linesToGrid([
        '                .                  ',
        '     #          .                  ',
        '     #       #  .  #             # ',
        '     #       #  .  #             # ',
        '     #       #  .  #             # ',
        '     #       #  .  #             # ',
        '     # ....  # ... #     ...     # ',
        '     #...........................# ',
        '################################## '
      ]);

      let grid3 = linesToGrid([
        '                .                  ',
        '     #.............................',
        '     #.......#.....#.............#.',
        '     #.......#.....#.............#.',
        '     #.......#.....#.............#.',
        '     #.......#.....#.............#.',
        '     #.......#.....#.............#.',
        '     #...........................#.',
        '##################################.'
      ]);

      expect(grid1).to.deep.eq(grid2);
      grid1 = animate(initial);
      expect(grid1).to.deep.eq(grid3);
    });

    it('concave area is trapped', function () {
      let grid1 = animate([
        '   .                  ',
        ' #   #                ',
        ' #   #############    ',
        ' #               #    ',
        '  ################    ',
        '                      '
      ], 17);

      let grid2 = linesToGrid([
        '   .                  ',
        ' # . #                ',
        ' #...#############    ',
        ' #...............#    ',
        '  ################    ',
        '                      '
      ]);

      expect(grid1).to.deep.eq(grid2);
    });

    it('two water sources filling the same concave area (progress)', function () {
      let grid1 = animate([
        '       .               .         ',
        '                                 ',
        '                                 ',
        ' #                             # ',
        ' #                             # ',
        ' #                             # ',
        ' ############################### '
      ], 14);

      let grid2 = linesToGrid([
        '       .               .         ',
        '       .               .         ',
        '       .               .         ',
        ' #     .               .       # ',
        ' #    ...             ...      # ',
        ' #.............................# ',
        ' ############################### '
      ]);

      expect(grid1).to.deep.eq(grid2);
    });

    it('two water sources filling the same concave area (full)', function () {
      let grid1 = animate([
        '       .               .         ',
        '                                 ',
        '                                 ',
        ' #                             # ',
        ' #                             # ',
        ' #                             # ',
        ' ############################### '
      ]);

      let grid2 = linesToGrid([
        '       .               .         ',
        '       .               .         ',
        '.................................',
        '.#.............................#.',
        '.#.............................#.',
        '.#.............................#.',
        '.###############################.'
      ]);

      expect(grid1).to.deep.eq(grid2);
    });
  });
});
