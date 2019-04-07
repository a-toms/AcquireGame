'use strict';

let tape = require('tape');
let game = require('./acquire.js');

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
    boardWithTenSacksonTiles._insertTiles('S', 10);

    TC.test('Test count number of corporation tiles on board.', function (assert) {
        assert.equal(
            boardWithTenSacksonTiles.countNumberOf('S'), 10,
            '.countNumberOf() counts the corporation tiles on the board'
        );
        assert.end();
    });

    TC.test('Test that _insertTiles() inserts correct number of corporation tiles', function (assert) {
        let testBoard1 = new game.Board();
        assert.equal(
            testBoard1.countNumberOf('W'),
            0,
            'testBoard1 initially contains no \'W\''
        );
        testBoard1._insertTiles('W', 15);
        assert.equal(
            testBoard1.countNumberOf('W'),
            15,
            'testBoard1 contains 15 \'W\' after _insertTiles() called.'
        );
        assert.end();
    });
});


tape('\nPlayer class.', function (TC) {
    let testboard = new game.Board();
    let player = new game.Player(testboard);

    TC.test('Test that placeTile incorporates adjacent generic tiles',
        function (assert){
        testboard.tileSpaces[5] = 'E';
        testboard.tileSpaces[6] = 'G';  // Generic
        testboard.tileSpaces[7] = 'E';
        testboard.tileSpaces[8] = 'W';  // Worldwide corporation
        testboard.tileSpaces[9] = 'W';  // Worldwide corporation

        player.placeTile('A8');  // 'A8' is tileSpaces[7].
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


    TC.test('Test incorporateAdjacentGenericTiles()', function (assert) {
        let testboard1 = new game.Board();
        let player1 = new game.Player();
        testboard1.tileSpaces[7] = 'C';
        testboard1.tileSpaces[8] = 'C';
        testboard1.tileSpaces[10] = 'C';

        assert.equals(
            testboard1.tileSpaces[9],
            'E',
            'E tile at tileSpaces[9], i.e. A10'
        );
        testboard1.incorporateAdjacentGenericTiles('A10');  // 'A10' is tileSpaces[9].
        assert.equals(
            testboard1.tileSpaces[9],
            'C',
            'After placing a tile on A10, the adjacent corporation incorporated A10'
        );
        assert.end();
    });
});


tape('\nStock prices', function(TC){

    TC.test('Test get corporation stock price', function (assert) {
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('S', 2);

        assert.equal(
            prices.getStockPriceOf('S'), 200,
            'S stock price == 200 when there are 2 S board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('S', 3);

        assert.equal(
            prices.getStockPriceOf('S'), 300,
            'S stock price == 300 when there are 3 S board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('S', 4);

        assert.equal(
            prices.getStockPriceOf('S'), 400,
            'S stock price == 400 when there are 4 S board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('S', 5);

        assert.equal(
            prices.getStockPriceOf('S'), 500,
            'S stock price == 500 when there are 5 S board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price.', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('S', 6);

        assert.equal(
            prices.getStockPriceOf('S'), 600,
            'S stock price == 600 when there are 6 S board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price.', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('S', 11);

        assert.equal(
            prices.getStockPriceOf('S'), 700,
            'S stock price == 700 when there are 11 S board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price.', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('S', 21);

        assert.equal(
            prices.getStockPriceOf('S'), 800,
            'S stock price == 800 when there are 21 S board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('S', 31);

        assert.equal(
            prices.getStockPriceOf('S'), 900,
            'S stock price == 900 when there are 31 S board tiles'
        );
        assert.end();
    });

    TC.test('Test get corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('S', 41);

        assert.equal(
            prices.getStockPriceOf('S'), 1000,
            'S stock price == 1000 when there are 41 S board tiles'
        );
        assert.end();
    });

    TC.test('Test get lowestPriceTier corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('W', 41);

        assert.equal(
            prices.getStockPriceOf('W'), 1000,
            'W stock price == 1000 when there are 41 W board tiles'
        );
        assert.end();
    });

    TC.test('Test get middlePriceTier corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('F', 2);

        assert.equal(
            prices.getStockPriceOf('F'), 300,
            'F stock price == 300 when there are 2 F board tiles'
        );
        assert.end();
    });

    TC.test('Test get middlePriceTier corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('I', 11);

        assert.equal(
            prices.getStockPriceOf('I'), 800,
            'I stock price == 800 when there are 11 I board tiles'
        );
        assert.end();
    });

    TC.test('Test get middlePriceTier corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('A', 42);

        assert.equal(
            prices.getStockPriceOf('A'), 1100,
            'I stock price == 1100 when there are 42 I board tiles'
        );
        assert.end();
    });

    TC.test('Test get highestPriceTier corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('C', 2);

        assert.equal(
            prices.getStockPriceOf('C'), 400,
            'C stock price == 400 when there are 2 C board tiles'
        );
        assert.end();
    });

    TC.test('Test get highestPriceTier corporation stock price', function(assert){
        let testBoard = new game.Board();
        let prices = new game.Prices(testBoard);
        testBoard._insertTiles('T', 42);

        assert.equal(
            prices.getStockPriceOf('T'), 1200,
            'T stock price == 1200 when there are 42 T board tiles'
        );
        assert.end();
    });
});


tape('\nTest finding corporation on board', function (TC) {

    TC.test('Test getCoordinatesAdjacentTo()', function (assert) {

        assert.deepEqual(
            game.Helper.getCoordinatesAdjacentTo(0),
            [1, 12],
        );
        assert.end();
   });

    TC.test('Test getCoordinatesAdjacentTo()', function (assert) {
        assert.deepEqual(
            game.Helper.getCoordinatesAdjacentTo(143),
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
        testBoard1.tileSpaces[9] = 'C';
        testBoard1.tileSpaces[10] = 'C';
        testBoard1.tileSpaces[17] = 'W';
        testBoard1.tileSpaces[29] = 'W';
        testBoard1.tileSpaces[41] = 'W';
        testBoard1.tileSpaces[53] = 'W';
        testBoard1.tileSpaces[65] = 'W';


        assert.deepEqual(
            testBoard1.getLargestAdjacentCorporations('A6'), // i.e., tileSpaces[5]
            ['C', 'S', 'W'],
            '\'C\', \'S\', and \'W\' are the largest corporations adjancent to A6.'
        );
        assert.end();
    });


});

tape('\nTest functions relating to founding a new corporation', function (TC) {

    TC.test('Test foundCorporation()', function (assert) {
        let testboard1 = new game.Board();
        let player1 = new game.Player();
        let tileSpaces = testboard1.tileSpaces;
        tileSpaces[0] = 'G';
        tileSpaces[2] = 'G';

        assert.deepEqual(
            [tileSpaces[0], tileSpaces[1], tileSpaces[2]],
            ['G', 'E', 'G']
        );
        testboard1.foundCorporation('A2', 'I');
        assert.deepEqual(
            [tileSpaces[0], tileSpaces[1], tileSpaces[2]],
            ['I', 'I', 'I']
        );
        assert.end();
    });

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

     TC.test('Test hasGenericTilesAdjacentTo()', function (assert) {
        let testboard1 = new game.Board();
        let player1 = new game.Player();
        testboard1.tileSpaces[8] = 'G';
        // tileSpaces[20] (i.e., 'B9') is the first test's search point.
        testboard1.tileSpaces[19] = 'G';
        testboard1.tileSpaces[21] = 'T';
        // tileSpaces[22] (i.e., 'B11') is the second test's search point.

        assert.equals(
            testboard1.hasGenericTilesAdjacentTo('B9'),
            true,
        );
        assert.equals(
            testboard1.hasGenericTilesAdjacentTo('B11'),
            false,
        );
        assert.end();
    });

    TC.test('Test findActiveCorporations())', function (assert) {
        let testboard1 = new game.Board();
        let player1 = new game.Player();
        testboard1.tileSpaces[8] = 'T';
        testboard1.tileSpaces[9] = 'T';
        testboard1.tileSpaces[19] = 'S';
        testboard1.tileSpaces[31] = 'S';
        testboard1.tileSpaces[32] = 'S';

        assert.deepEqual(
            testboard1.findActiveCorporations(),
            ['S', 'T'],
        );
        assert.end();
    });

    TC.test('Test hasNonActiveCorporations() - true', function (assert) {
        let testboard1 = new game.Board();
        let player1 = new game.Player();
        testboard1.tileSpaces[7] = 'T';
        testboard1.tileSpaces[8] = 'T';
        testboard1.tileSpaces[10] = 'C';
        testboard1.tileSpaces[11] = 'C';
        testboard1.tileSpaces[19] = 'F';
        testboard1.tileSpaces[20] = 'F';
        testboard1.tileSpaces[31] = 'I';
        testboard1.tileSpaces[32] = 'I';
        testboard1.tileSpaces[39] = 'S';
        testboard1.tileSpaces[38] = 'S';
        testboard1.tileSpaces[50] = 'A';
        testboard1.tileSpaces[51] = 'A';

        assert.deepEqual(
            testboard1.hasNonActiveCorporations(),
            true,
        );
        assert.end();
    });

   TC.test('Test hasNonActiveCorporations() - false', function (assert) {
       let testboard1 = new game.Board();
       let player1 = new game.Player();
       testboard1.tileSpaces[7] = 'T';
       testboard1.tileSpaces[8] = 'T';
       testboard1.tileSpaces[10] = 'C';
       testboard1.tileSpaces[11] = 'C';
       testboard1.tileSpaces[19] = 'F';
       testboard1.tileSpaces[20] = 'F';
       testboard1.tileSpaces[31] = 'I';
       testboard1.tileSpaces[32] = 'I';
       testboard1.tileSpaces[39] = 'S';
       testboard1.tileSpaces[38] = 'S';
       testboard1.tileSpaces[50] = 'A';
       testboard1.tileSpaces[51] = 'A';
       testboard1.tileSpaces[71] = 'W';
       testboard1.tileSpaces[72] = 'W';

       assert.deepEqual(
           testboard1.hasNonActiveCorporations(),
           false,
       );
       assert.end();
   });

//     TC.test('Test canFoundCorporation() positive', function (assert) {
//         let testboard1 = new game.Board();
//         let player1 = new game.Player();
//         testboard1.tileSpaces[8] = 'T';
//         testboard1.tileSpaces[9] = 'T';
//         testboard1.tileSpaces[19] = 'S';
//         testboard1.tileSpaces[31] = 'S';
//         testboard1.tileSpaces[32] = 'S';
//
//         assert.equals(
//             testboard1.canFoundCorporation('C'),
//             true,
//             'C is available to found'
//         );
//         assert.end();
//     });
//
// TC.test('Test canFoundCorporation() negative', function (assert) {
//         let testboard1 = new game.Board();
//         let player1 = new game.Player();
//         testboard1.tileSpaces[8] = 'T';
//         testboard1.tileSpaces[9] = 'T';
//         testboard1.tileSpaces[19] = 'S';
//         testboard1.tileSpaces[31] = 'S';
//         testboard1.tileSpaces[32] = 'S';
//         testboard1.tileSpaces[1] = 'C';
//         testboard1.tileSpaces[2] = 'C';
//
//         assert.equals(
//             testboard1.canFoundCorporation('C'),
//             false,
//             'C is no longer available to found'
//         );
//         assert.end();
//     });
//



});

tape('\nHelper actions', function (TC) {

    TC.test('\nTest isEmpty', function (assert){
        let empty_array = [];
        let filled_array = ['A', 'B'];
        assert.equals(
            game.Helper.isEmpty(empty_array),
            true,
            'Array is empty'
        );
        assert.equals(
            game.Helper.isEmpty(filled_array),
            false,
            'Array is not empty'
        );
        assert.end();
    });

    TC.test('\nTest getDifferenceBetween', function (assert){
        let alpha = ['A', 'B', 'C', 'D'];
        let beta = ['B', 'E', 'F'];
        let charlie = [];
        let delta = [];
        assert.deepEquals(
            game.Helper.getDifferenceBetween(alpha, beta),
            ['A', 'C', 'D'],
            'alpha has \'A\, \'C\', and \'D\', which beta does not have.'
        );
        assert.deepEquals(
            game.Helper.getDifferenceBetween(alpha, charlie),
            ['A', 'B', 'C', 'D'],
            'alpha has \'A\, \'B\', \'C\', and \'D\', which charlie does not have.'
        );
        assert.deepEquals(
            game.Helper.getDifferenceBetween(charlie, delta),
            [],
            'charlie has no elements that delta does not have.'
        );
        assert.deepEquals(
            game.Helper.getDifferenceBetween(alpha),
            alpha,
            'returned the array when only one array was passed.'
        );
        // assert.equals(
        //     Helper.isEmpty(filled_array),
        //     false
        // );
        assert.end();
    });


});