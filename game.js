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
        };
        this.letterToNumber = [
            null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
        ];
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

    }

    getAdjacentCorporations(tileSpace){
        // Check that any adjacent tile is not 'empty' or 'generic'.

        // Todo: Write.
    }

    getLargestAdjacentCorporation(tileSpace){
        // Todo: write.
    }
}


class Player {
    // Todo: Consider adding board as a constructor parameter.
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
        let lowestPriceTier = { // todo: rename 'tier ...' to 'lowestPriced' and mutatis mutandis regarding the other tiers.
            '2': 200,
            '3': 300,
            '4': 400,
            '5': 500,
            '6To10': 600,
            '11To20': 700,
            '21To30': 800,
            '31To40': 900,
            '41AndOver': 1000
        };
        let middlePricesTier = {
            '2': 300,
            '3': 400,
            '4': 500,
            '5': 600,
            '6To10': 700,
            '11To20': 800,
            '21To30': 900,
            '31To40': 1000,
            '41AndOver': 1100
        };
        let highestPricesTier = {
            '2': 400,
            '3': 500,
            '4': 600,
            '5': 700,
            '6To10': 800,
            '11To20': 900,
            '21To30': 1000,
            '31To40': 1100,
            '41AndOver': 1200
        };
        this.worldwide = lowestPriceTier;
        this.sackson = lowestPriceTier;
        this.festival = middlePricesTier;
        this.imperial = middlePricesTier;
        this.american = middlePricesTier;
        this.continental = highestPricesTier;
        this.tower = highestPricesTier
    }


    getShareholderBonus(corporation){
        // Todo: write function. Shareholder bonus is directly linked to the stock price.
    }

    getStockPriceOf(corporation) {
        let numberOfTiles = this.board.countNumberOf(corporation);
        if (numberOfTiles <= 5) {
            return this[corporation][`${numberOfTiles}`];
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


module.exports =  {
    Board,
    Prices,
    Player,

};
