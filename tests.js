'use strict';

let tape = require('tape');
let game = require('./game.js');

tape('\nBoard creation.', function (TC) {
    let emptyBoard = new game.Board();

    TC.test('Test that one can access the board.', function (assert) {
        assert.equal(
            emptyBoard.tileSpaces.A["1"],
            'empty',
            'Tile space \'A1\' in new board === \'empty\''
        );
        assert.end();
    });
});

tape('\nBoard actions.', function (TC) {
    let boardWithTenSacksonTiles = new game.Board();
    boardWithTenSacksonTiles._insertTiles('Sackson', 10);

    TC.test('Test count number of corporation tiles on board.', function (assert) {
        assert.equal(
            boardWithTenSacksonTiles.countNumberOf('Sackson'), 10,
            '.countNumberOf() counts the corporation tiles on the board'
        );
        assert.end();
    });


    TC.test('Test that _insertTiles() inserts correct number of corporation tiles', function (assert) {
        let testBoard1 = new game.Board();
        assert.equal(
            testBoard1.countNumberOf('Worldwide'),
            0,
            'testBoard1 initially contains no \'Worldwide\''
        );
        testBoard1._insertTiles('Worldwide', 15);
        assert.equal(
            testBoard1.countNumberOf('Worldwide'),
            15,
            'testBoard1 contains 15 \'Worldwide\' after _insertTiles() was called'
        );
        assert.end();
    });
});


tape('\nPlayer class.', function (TC) {
    let player = new game.Player();
    let board = new game.Board();

    TC.test('Test that Player can place tile', function (assert) {
        assert.equal(board.tileSpaces.A["1"], 'empty', 'Board space is \'empty\' before placing tile');
        player.placeTile('A1', board);
        assert.equal(board.tileSpaces.A["1"], 'generic', 'Board space is \'generic\' after placing tile');
        assert.end();
    });

});


tape('\nStock prices', function(TC){
    let testBoard2 = new game.Board();
    let prices = new game.Prices(testBoard2);

    TC.test('Get corporation stock price based on the corporation tiles on board.', function (assert) {
        testBoard2._insertTiles('Sackson', 2);
        assert.equal(
            prices.getStockPriceOf('Sackson'), 200,
            'Sackson stock price == 200 when there are 2 Sackson board tiles'
        );
        assert.end();d();


    });
});
