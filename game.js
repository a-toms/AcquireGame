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

    getStockPriceOf(corporation){
        // Todo: 1. Count corporation tiles on board. 2. Give price.
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


class Ledger{
    constructor(){
        this.stockRemaining = {
            // Note that the game permits different # of stocks per corporation.
            'Worldwide': 15,
            'Sackson': 15,
            'Festival': 15,
            'Imperial': 15,
            'American': 15,
            'Continental': 15,
            'Tower': 15
        }
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
    Player
};
