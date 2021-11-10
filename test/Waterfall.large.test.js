const { expect } = require('chai');
const { animate } = require('./util');
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
        '                                     ... ......                     ##   ',
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
