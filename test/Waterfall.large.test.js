const { expect } = require('chai');
const { animate, printGrid } = require('./util');
const { linesToGrid } = require('../src/readGrid');

describe('Waterfall', function () {
  context('animates water correctly', function () {
    it('complex example 1', function () {
      let grid1 = animate([
        '                                              .                          ',
        '                                                                         ',
        '                                          #                              ',
        '                                          ##     #                       ',
        '                                            ######                       ',
        '                                                                         ',
        '                                                        #                ',
        '                                                      ##                 ',
        '                                           #        ##                   ',
        '                                            ########                     ',
        '                                                                         ',
        '                                          #                              ',
        '                                                                         ',
        '                       ############### ### ## ################ #######   ',
        '                                                                    ##   ',
        '                                      #   #  #       #                #  ',
        '                     #####              #       #    #               #   ',
        '                    #     #              #       #    #             #    ',
        '                          #     #       #       #    #              #    ',
        '                          #      #                  #              ##    ',
        '                           #      ##################              #      ',
        '                            ####                                ###      ',
        '                                ##                            ##         ',
        '                                  #############################          ',
        '                                                                         '
      ]);

      let grid2 = linesToGrid([
        '                                              .                          ',
        '                                              .                          ',
        '                                          #........                      ',
        '                                          ##.....#.                      ',
        '                                            ######.                      ',
        '                                                  .                      ',
        '                                                  .     #                ',
        '                                          ............##                 ',
        '                                          .#........##                   ',
        '                                          . ########                     ',
        '                                         ...                             ',
        '                                         .#.                             ',
        '                                      ........                           ',
        '                       ###############.###.##.################ #######   ',
        '                                     ...............................##   ',
        '                    ..................#...#..#.......#................#  ',
        '                   ..#####..............#.......#....#...............#   ',
        '                   .#     #..............#.......#....#.............#    ',
        '                   .      #.....#.......#.......#....#..............#    ',
        '                   .      #......#..................#..............##    ',
        '                   .       #......##################..............#      ',
        '                   .        ####................................###      ',
        '                   .            ##............................##         ',
        '                   .              #############################          ',
        '                   .                                                     '
      ]);

      /**
       * TODO: The result should be filled until the point where the water leaks out.
       *       In other words, at row 14 (zero based index), it should be a bit more empty.
       *       (only the falling water cells should be present)
       *       But it seems fixing this isn't possible with the current algorithm.
       */
      expect(grid1).to.deep.eq(grid2);
    });

    it('complex example 2', function () {
      let grid1 = animate([
        '                                              .                          ',
        '                                                                         ',
        '                                          #                              ',
        '                                          ##     #                       ',
        '                                            ######                       ',
        '                                                                         ',
        '                                                        #                ',
        '                                                      ##                 ',
        '                                           #        ##                   ',
        '                                            ########                     ',
        '                                                                         ',
        '                                          #                              ',
        '                                                                         ',
        '                       ############### ### ## ################ #######   ',
        '                        #                                           ##   ',
        '                        #             #   #  #       #                #  ',
        '                     #####              #       #    #               #   ',
        '                    #     #              #       #    #             #    ',
        '                          #     #       #       #    #              #    ',
        '                          #      #                  #              ##    ',
        '                           #      ##################              #      ',
        '                            ####                                ###      ',
        '                                ##                            ##         ',
        '                                  #############################          ',
        '                                                                         '
      ]);

      let grid2 = linesToGrid([
        '                                              .                          ',
        '                                              .                          ',
        '                                          #........                      ',
        '                                          ##.....#.                      ',
        '                                            ######.                      ',
        '                                                  .                      ',
        '                                                  .     #                ',
        '                                          ............##                 ',
        '                                          .#........##                   ',
        '                                          . ########                     ',
        '                                         ...                             ',
        '                                         .#.                             ',
        '                      .................................................  ',
        '                      .###############.###.##.################.#######.  ',
        '                      . #...........................................##.. ',
        '                    ....#.............#...#..#.......#................#. ',
        '                   ..#####..............#.......#....#...............# . ',
        '                   .#     #..............#.......#....#.............#  . ',
        '                   .      #.....#.......#.......#....#..............#  . ',
        '                   .      #......#..................#..............##  . ',
        '                   .       #......##################..............#    . ',
        '                   .        ####................................###    . ',
        '                   .            ##............................##       . ',
        '                   .              #############################        . ',
        '                   .                                                   . '
      ]);

      expect(grid1).to.deep.eq(grid2);
    });

    it('complex example 3', function () {
      let grid1 = animate([
        '                                  ',
        '                 .                ',
        '                             #    ',
        '              #              #    ',
        '               #      #######     ',
        '                #    #            ',
        '                #    #            ',
        '                #    #            ',
        '              ###    ###          ',
        '             #  #    #  #         ',
        '            #   #    #   #        ',
        '           #    #    #    #       ',
        '          #               #       ',
        '          #       ####    #       ',
        '          #              #        ',
        '           ##############         ',
        '                                  '
      ]);

      let grid2 = linesToGrid([
        '                                  ',
        '                 .                ',
        '             ................#    ',
        '             .#..............#    ',
        '             . #......#######     ',
        '             .  #....#            ',
        '             .  #....#            ',
        '             .  #....#            ',
        '            ..###....###          ',
        '           ..#..#....#..#         ',
        '          ..#...#....#...#        ',
        '         ..#....#....#....#       ',
        '         .#...............#       ',
        '         .#.......####....#       ',
        '         .#..............#        ',
        '         . ##############         ',
        '         .                        '
      ]);

      expect(grid1).to.deep.eq(grid2);
    });
  });
});
