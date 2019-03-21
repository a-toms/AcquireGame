
class Board {
    constructor(){
        this.tileSpaces = {
            A: {
                1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
                6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
                11: 'empty', 12: 'empty'
            },
            B: {
                1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
                6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
                11: 'empty', 12: 'empty'
            },
            C: {
                1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
                6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
                11: 'empty', 12: 'empty'
            },
            D: {
                1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
                6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
                11: 'empty', 12: 'empty'
            },
            E: {
                1: 'empty', 2: 'empty', 3: 'empty', 4: 'empty', 5: 'empty',
                6: 'empty', 7: 'empty', 8: 'empty', 9: 'empty', 10: 'empty',
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
        }
    }
}

class Player {
    constructor(name, money){  // Default money at game start is 6000
        this.name = name;
        this.money = money;
        this.tiles = [];
    };


     placeTile(position, board){
         // tileLocation: str
         board.tileSpaces[position.charAt(0)][position.charAt(1)] = 'generic';
    }
}

class Display {
    constructor(board){
        this.board = board;
    }

    showBoard(){
        for (let row of Object.keys(this.board.tileSpaces)){
            console.log(row);
            console.log(this.board.tileSpaces[row])
            }
    }
}


b = new Board();
d = new Display(b);
d.showBoard();

module.exports =  {
    Board,
    Player
};
