let tape = require('tape');
let game = require('./game.js');

tape('Board creation.', function (TC) {
    let emptyBoard = new game.Board();

    TC.test('Can access board.', function (assert) {
        assert.equal(emptyBoard.tileSpaces.A["1"], 'empty',
            'Tile place A1 in new board === \'empty\'');
        assert.end();
    });
});

tape('Board actions.', function (TC) {
    let boardWithTenSacksonTiles = new game.Board();

    boardWithTenSacksonTiles.tileSpaces = {
        // Contains 10 'Sackson' tiles.
        A: {
            1: 'Sackson', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
            6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
            11: 'empty', 12: 'empty'
        },
        B: {
            1: 'Sackson', 2: 'Sackson', 3: 'empty', 4: 'empty', 5: 'empty',
            6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
            11: 'empty', 12: 'empty'
        },
        C: {
            1: 'empty', 2: 'Sackson', 3: 'Sackson', 4: 'empty', 5: 'empty',
            6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
            11: 'empty', 12: 'empty'
        },
        D: {
            1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
            6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
            11: 'empty', 12: 'empty'
        },
        E: {
            1: 'empty', 2: 'Sackson', 3: 'Sackson', 4: 'Sackson', 5: 'empty',
            6: 'empty', 7: 'empty', 8: 'Sackson', 9: 'Sackson', 10: 'empty',
            11: 'empty', 12: 'empty'
        },
        F: {
            1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
            6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
            11: 'empty', 12: 'empty'
        },
        G: {
            1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
            6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
            11: 'empty', 12: 'empty'
        },
        H: {
            1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
            6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
            11: 'empty', 12: 'empty'
        },
        I: {
            1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
            6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
            11: 'empty', 12: 'empty'
        },
        J: {
            1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
            6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
            11: 'empty', 12: 'empty'
        },
        K: {
            1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
            6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
            11: 'empty', 12: 'empty'
        },
        L: {
            1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
            6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
            11: 'empty', 12: 'empty'
        }
        // tileSpaces may be 'empty', 'generic', or `{hotel name}`
    };

    TC.test('Count number of corporation tiles on board.', function (assert) {
        assert.equal(
            boardWithTenSacksonTiles.countNumberOf('Sackson'), 10,
            '.countNumberOf() counts the corporation tiles on the board'
        );
        assert.end();
    });


    TC.test('Test that _insertTiles() inserts correct number of corporation tiles', function (assert) {
        let testBoardInsertTiles = new game.Board();
        assert.equal(testBoardInsertTiles.countNumberOf('Worldwide'), 0);
        testBoardInsertTiles._insertTiles('Worldwide', 15);
        assert.equal(testBoardInsertTiles.countNumberOf('Worldwide'), 15);
        assert.end();
    });
});


    // TC.test('Get corporation stock price based on the corporation tiles on board.', function (assert) {
    //     assert.equal(
    //         boardWithTenSacksonTiles.getStockPriceOf('Sackson'), 600,
    //         '.getStockPrice() returns a stock price for Sackson based on the board tiles'
    //     );
    //     assert.end();
    //
    //     assert.equal(
    //         testBoard2.getStockPriceOf('Sackson'), 600,
    //         '.getStockPrice() returns a stock price based on the board tiles'
    //     );
    //     assert.end();
    //
    //
    // });
// };

tape('Player class.', function (TC) {
    let player = new game.Player();
    let board = new game.Board();

    TC.test('Player can place tile', function (assert) {
        assert.equal(board.tileSpaces.A["1"], 'empty', 'Board space is \'empty\' before placing tile');
        player.placeTile('A1', board);
        assert.equal(board.tileSpaces.A["1"], 'generic', 'Board space is \'generic\' after placing tile');
        assert.end();
    });

});

