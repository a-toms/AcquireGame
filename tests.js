'use strict';

let tape = require('tape');
let game = require('./game.js');

tape('\nBoard creation.', function (TC) {
    let emptyBoard = new game.Board();

    TC.test('Test that one can access the board.', function (assert) {
        assert.equal(
            emptyBoard.tileSpaces[0][0],
            'E',
            'Tile space \'A1\' in new board === \'empty\''
        );
        assert.end();
    });
});


tape('\nBoard actions.', function (TC) {
    let boardWithTenSacksonTiles = new game.Board();
    boardWithTenSacksonTiles._insertTiles('sackson', 10);

    TC.test('Test count number of corporation tiles on board.', function (assert) {
        assert.equal(
            boardWithTenSacksonTiles.countNumberOf('sackson'), 10,
            '.countNumberOf() counts the corporation tiles on the board'
        );
        assert.end();
    });

    TC.test('Test that _insertTiles() inserts correct number of corporation tiles', function (assert) {
        let testBoard1 = new game.Board();
        assert.equal(
            testBoard1.countNumberOf('worldwide'),
            0,
            'testBoard1 initially contains no \'worldwide\''
        );
        testBoard1._insertTiles('worldwide', 15);
        assert.equal(
            testBoard1.countNumberOf('worldwide'),
            15,
            'testBoard1 contains 15 \'worldwide\' after _insertTiles() called.'
        );
        assert.end();
    });
});


tape('\nPlayer class.', function (TC) {
    let player = new game.Player();
    let testboard = new game.Board();

    TC.test('Test that Player can place tile', function (assert) {
        testboard.tileSpaces[5] = 'E';
        testboard.tileSpaces[6] = 'G';  // Generic
        testboard.tileSpaces[7] = 'E';
        testboard.tileSpaces[8] = 'W';  // Worldwide corporation
        testboard.tileSpaces[9] = 'W';  // Worldwide corporation

        player.placeTile('A8', testboard);  // 'A8' is tileSpaces[7].
        assert.equal(
            testboard.tileSpaces[7],
            'W',
            'Placing the tile incorporated E into the W corporation'
        );
        assert.equal(
            testboard.tileSpaces[6],
            'W',
            'Placing the tile also incorporated the G tile, ' +
            'which was adjacent to E, into the W corporation'
        );
        assert.end();
    });
});


tape('\nStock prices', function(TC){

    TC.test('Test get corporation stock price', function (assert) {
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('sackson', 2);

        assert.equal(
            prices.getStockPriceOf('sackson'), 200,
            'sackson stock price == 200 when there are 2 sackson board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('sackson', 3);

        assert.equal(
            prices.getStockPriceOf('sackson'), 300,
            'sackson stock price == 300 when there are 3 sackson board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('sackson', 4);

        assert.equal(
            prices.getStockPriceOf('sackson'), 400,
            'sackson stock price == 400 when there are 4 sackson board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('sackson', 5);

        assert.equal(
            prices.getStockPriceOf('sackson'), 500,
            'sackson stock price == 500 when there are 5 sackson board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price.', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('sackson', 6);

        assert.equal(
            prices.getStockPriceOf('sackson'), 600,
            'sackson stock price == 600 when there are 6 sackson board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price.', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('sackson', 11);

        assert.equal(
            prices.getStockPriceOf('sackson'), 700,
            'sackson stock price == 700 when there are 11 sackson board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price.', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('sackson', 21);

        assert.equal(
            prices.getStockPriceOf('sackson'), 800,
            'sackson stock price == 800 when there are 21 sackson board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('sackson', 31);

        assert.equal(
            prices.getStockPriceOf('sackson'), 900,
            'sackson stock price == 900 when there are 31 sackson board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('sackson', 41);

        assert.equal(
            prices.getStockPriceOf('sackson'), 1000,
            'sackson stock price == 1000 when there are 41 sackson board tiles'
        );
        assert.end();
    });

    TC.test('Test get lowestPriceTier corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('worldwide', 41);

        assert.equal(
            prices.getStockPriceOf('worldwide'), 1000,
            'worldwide stock price == 1000 when there are 41 worldwide board tiles'
        );
        assert.end();
    });

    TC.test('Test get middlePriceTier corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('festival', 2);

        assert.equal(
            prices.getStockPriceOf('festival'), 300,
            'festival stock price == 300 when there are 2 festival board tiles'
        );
        assert.end();
    });

    TC.test('Test get middlePriceTier corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('imperial', 11);

        assert.equal(
            prices.getStockPriceOf('imperial'), 800,
            'imperial stock price == 800 when there are 11 imperial board tiles'
        );
        assert.end();
    });

    TC.test('Test get middlePriceTier corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('american', 42);

        assert.equal(
            prices.getStockPriceOf('american'), 1100,
            'imperial stock price == 1100 when there are 42 imperial board tiles'
        );
        assert.end();
    });

    TC.test('Test get highestPriceTier corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('continental', 2);

        assert.equal(
            prices.getStockPriceOf('continental'), 400,
            'continental stock price == 400 when there are 2 continental board tiles'
        );
        assert.end();
    });

    TC.test('Test get highestPriceTier corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('tower', 42);

        assert.equal(
            prices.getStockPriceOf('tower'), 1200,
            'tower stock price == 1200 when there are 42 tower board tiles'
        );
        assert.end();
    });
});


tape('\nTest finding corporation on board', function (TC) {

    TC.test('Test getCoordinatesOfTilesAdjacentTo()', function (assert) {

        assert.deepEqual(
            game.Helper.getCoordinatesOfTilesAdjacentTo(0),
            [1, 12],
        );
        assert.end();
   });

    TC.test('Test getCoordinatesOfTilesAdjacentTo()', function (assert) {
        assert.deepEqual(
            game.Helper.getCoordinatesOfTilesAdjacentTo(143),
            [142, 131],
        );
        assert.end();
    });

    TC.test('Test getAdjacentCorporation() horizontal', function (assert) {
        let testboard1 = new game.Board();
        let player1 = new game.Player();
        testboard1.tileSpaces[0] = 'T';
        testboard1.tileSpaces[2] = 'T';

        assert.deepEqual(
            testboard1.getAdjacentCorporations('A2'),
            ['T'],
            'testboard has horizontal adjacent corporation'
        );
        assert.end();
    });

    TC.test('Test getAdjacentCorporation() vertical', function (assert) {
        let testBoard1 = new game.Board();
        let player1 = new game.Player();
        testBoard1.tileSpaces[12] = 'T';

        assert.deepEqual(
            testBoard1.getAdjacentCorporations('C1'),
            ['T'],
            'testboard has vertical adjacent corporation'
        );
        assert.end();
    });

    TC.test('Test getAdjacentCorporation() vertical', function (assert) {
        let testBoard1 = new game.Board();
        testBoard1.tileSpaces[12] = 'T';

        assert.deepEqual(
            testBoard1.getAdjacentCorporations('C1'),
            ['T'],
            'testboard has vertical adjacent corporation'
        );
        assert.end();
    });

     TC.test('Test getLargestAdjacentCorporations()', function (assert) {
        let testBoard1 = new game.Board();
        testBoard1.tileSpaces[0] = 'S';
        testBoard1.tileSpaces[1] = 'S';
        testBoard1.tileSpaces[2] = 'S';
        testBoard1.tileSpaces[3] = 'S';
        testBoard1.tileSpaces[4] = 'S';
        // tileSpaces[5] (i.e., 'A6') is 'E'.
        testBoard1.tileSpaces[6] = 'C';
        testBoard1.tileSpaces[7] = 'C';
        testBoard1.tileSpaces[8] = 'C';

        assert.deepEqual(
        testBoard1.getLargestAdjacentCorporations('A6'), // i.e., tileSpaces[5]
            ['S'],
            '\'S\' is the largest adjacent corporation'
        );
        assert.end();
    });


});

tape('\nTest founding new corporation', function (TC) {

    TC.test('Test getCoordinatesOfGenericTilesAdjacentTo()', function (assert) {
        let testboard1 = new game.Board();
        let player1 = new game.Player();
        testboard1.tileSpaces[8] = 'G';
        // tileSpaces[20] (i.e., tilePosition 'B9') will be the search point.
        testboard1.tileSpaces[19] = 'G';
        testboard1.tileSpaces[21] = 'T'; // I.e., not a generic tile.

        assert.deepEqual(
            testboard1.getCoordinatesOfGenericTilesAdjacentTo('B9'),
            [8, 19],
        );
        assert.end();
    });

    TC.test('Test findExistingCorporations())', function (assert) {
        let testboard1 = new game.Board();
        let player1 = new game.Player();
        testboard1.tileSpaces[8] = 'T';
        testboard1.tileSpaces[9] = 'T';
        testboard1.tileSpaces[19] = 'S';
        testboard1.tileSpaces[31] = 'S';
        testboard1.tileSpaces[32] = 'S';

        assert.deepEqual(
            testboard1.findExistingCorporations(),
            ['S', 'T'],
        );
        assert.end();
    });

    TC.test('Test isCorporationAvailableToFound() positive', function (assert) {
        let testboard1 = new game.Board();
        let player1 = new game.Player();
        testboard1.tileSpaces[8] = 'T';
        testboard1.tileSpaces[9] = 'T';
        testboard1.tileSpaces[19] = 'S';
        testboard1.tileSpaces[31] = 'S';
        testboard1.tileSpaces[32] = 'S';

        assert.equals(
            testboard1.isCorporationAvailableToFound('C'),
            true,
            'C is available to found'
        );
        assert.end();
    });

TC.test('Test isCorporationAvailableToFound() negative', function (assert) {
        let testboard1 = new game.Board();
        let player1 = new game.Player();
        testboard1.tileSpaces[8] = 'T';
        testboard1.tileSpaces[9] = 'T';
        testboard1.tileSpaces[19] = 'S';
        testboard1.tileSpaces[31] = 'S';
        testboard1.tileSpaces[32] = 'S';
        // Player founds corporation 'C'
        testboard1.tileSpaces[1] = 'C';
        testboard1.tileSpaces[2] = 'C';

        assert.equals(
            testboard1.isCorporationAvailableToFound('C'),
            false,
            'C is no longer available to found'
        );
        assert.end();
    });

    TC.test('Test foundCorporation()', function (assert) {
        let testboard1 = new game.Board();
        let player1 = new game.Player();
        testboard1.tileSpaces[8] = 'G';
        // A tile will be placed at tileSpaces[20] to found 'S' corporation.
        testboard1.tileSpaces[19] = 'G';


        // Todo: complete.

    });
});