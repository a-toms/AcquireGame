'use strict';

class Board {
    constructor() {
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

    countNumberOf(corporation){
        let count = 0;
        for (let row  of Object.keys(this.tileSpaces)){
            for (let tileSpace of Object.values(this.tileSpaces[row])){
                if (tileSpace === corporation){
                    count++;
                }
            }
        }
        return count;
    }

    _insertTiles(corporation, number){
        // This function populates the board for testing.
        // corporation: str
        for (let row  of Object.keys(this.tileSpaces)){
            for (let i = 1; i < 13; i++){
               if (number > 0){
                   this.tileSpaces[row][i] = corporation;
                   number -= 1;
               }
            }
        }
    }


    hasAdjacentCorporation(tileSpace){
        // Return bool.
        // Todo: Write
    }

    getLargestAdjacentCorporation(tileSpace){
        // Return array of 1 or more strings.
        // Todo: Write.
    }

}



class Player {
    constructor(name, money){  // Default money at game start is 6000
        this.name = name;
        this.money = money;
        this.tiles = [];
    };

    placeTile(position, board){
        // tileLocation: str. E.g., 'A1' or 'A2'.
        board.tileSpaces[position.charAt(0)][position.charAt(1)] = 'generic';
    }


}

// Todo: Write prices to pass tests.
class Prices {
    constructor(board){
        this.board = board;
        let tier1 = { // todo: rename 'tier ...' to 'lowestPriced' and mutatis mutandis regarding the other tiers.
            'start': 200,
            '6To10': 600,
            '11To20': 700,
            '21To30': 800,
            '31To40': 900,
            '41AndOver': 1000
        };
        let tier2 = {
            'start': 300,
            '6To10': 700,
            '11To20': 800,
            '21To30': 900,
            '31To40': 1000,
            '41AndOver': 1100
        };
        let tier3 = {
            'start': 400,
            '6To10': 800,
            '11To20': 900,
            '21To30': 1000,
            '31To40': 1100,
            '41AndOver': 1200
        };
        this.worldwide = tier1;
        this.sackson = tier1;
        this.festival = tier2;
        this.imperial = tier2;
        this.american = tier2;
        this.continental = tier3;
        this.tower = tier3
    }


    getShareholderBonus(corporation){
        // Todo: write function
    }

    getStockPriceOf(corporation) {
        let numberOfTiles = this.board.countNumberOf(corporation);
        if (numberOfTiles === 2 || 3 || 4 || 5){
            // Todo: Change to return the correct price.
            return this[corporation]['start'] * numberOfTiles;
        }
        else if (numberOfTiles <= 10){
            return this[corporation]['6To10'];
        }
        else if (numberOfTiles <= 20){
            return this[corporation]['11To20'];
        }
        else if (numberOfTiles <= 30){
            return this[corporation]['21To30'];
        }
        else if (numberOfTiles <= 40){
            return this[corporation]['31To40'];
        }
        else if (numberOfTiles >= 41)
            return this[corporation]['41AndOver'];
        }

}





class Display {
    constructor(board){
        this.board = board;
    }

    showAllBoard(){
        for (let row of Object.keys(this.board.tileSpaces)){
            console.log(row);
            console.log(this.board.tileSpaces[row])
            }
    }
}

//
// let b = new Board();
// let d = new Display(b);
// d.showAllBoard();

module.exports =  {
    Board,
    Prices,
    Player,

};
