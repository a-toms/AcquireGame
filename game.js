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

    getStockPriceOf(corporation){

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
    constructor(){
        this.worldwide = this.tier1;
        this.sackson = this.tier1;
        this.festival = this.tier2;
        this.imperial = this.tier2;
        this.american = this.tier2;
        this.continental = this.tier3;
        this.tower = this.tier3
    }

    tier1 = {
        'start': 200,
        '6to10': 600,
        '11to20': 700,
        '21to30': 800,
        '31to40': 900,
        '41andOver': 1000
    };
    tier2 = {
            'start': 300,
            '6to10': 700,
            '11to20': 800,
            '21to30': 900,
            '31to40': 1000,
            '41andOver': 1100
    };
    tier3 = {
            'start': 400,
            '6to10': 800,
            '11to20': 900,
            '21to30': 1000,
            '31to40': 1100,
            '41andOver': 1200
    };



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
    Player
};
