let tape = require('tape');
let game = require('./game.js');

tape('Board creation.', function (TC) {
    let board = new game.Board();

    TC.test('Can access board.', function(assert) {
        assert.equal(board.tileSpaces.A["1"], 'empty',
            'Tile place A1 in new board === \'empty\'');
        assert.end();
    });
});


tape('Player class.', function (TC) {
    let player = new game.Player();
    let board = new game.Board();

    TC.test('Player can place tile', function(assert) {
        assert.equal(board.tileSpaces.A["1"], 'empty', 'Board space is \'empty\' before placing tile');
        player.placeTile('A1', board);
        assert.equal(board.tileSpaces.A["1"], 'generic', 'Board space is \'generic\' after placing tile');
        assert.end();
    });
});

