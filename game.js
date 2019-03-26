'use strict';

let _ = require('lodash');

class Board {
    constructor() {
        /*
        tileSpaces may be 'E' (Empty), 'G' (Generic), or `{corporation letter}`.
         */
        this.tileSpaces = [
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
            'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'
        ];
        this.letterToRow = Object.freeze({
            'A': 0,
            'B': 1,
            'C': 2,
            'D': 3,
            'E': 4,
            'F': 5,
            'G': 6,
            'H': 7,
            'I': 8,
            'J': 9,
            'K': 10,
            'L': 11
        });
        this.corporationSymbols = Object.freeze([
            'S', 'W', 'F', 'I', 'A', 'C', 'T'
        ]);
    };

    countNumberOf(corporation){
        let count = 0;
        for (let i = 0; i < this.tileSpaces.length; i++){
                if (this.tileSpaces[i] === corporation){
                    count++;
                }
            }
        return count;
    }

    _insertTiles(corporation, n){
        // This function populates the board for testing.
        // corporation: str, n: number
        for (let i = 0; i < this.tileSpaces.length; i++){
           if (n === 0){
               break
           }
           else{
               this.tileSpaces[i] = corporation;
               n -= 1;
           }
        }
    }

    getCoordinatesOf(tilePosition){
        /* Converts tilePosition (e.g., A1, B2) to coordinates (0, 13). */
        let row = this.letterToRow[tilePosition.charAt(0)];
        let column = tilePosition.charAt(1) - 1;  // -1 accounts for 0th-based grid.
        let coordinates = row * 12 + column;
        return coordinates;
    }

    getAdjacentCorporations(tilePosition){
        let position = this.getCoordinatesOf(tilePosition);
        // todo: Refactor the above to create a board position to coordinate func.
        let adjacentCorporations = [];
        let coordinates = this._getCoordinatesOfAdjacentTiles(position);
        for (let i = 0; i < coordinates.length; i++){
            if (this.corporationSymbols.includes(this.tileSpaces[coordinates[i]])){
               adjacentCorporations.push(this.tileSpaces[coordinates[i]]);
            }
        }
        return adjacentCorporations;
    }

    _getCoordinatesOfAdjacentTiles(boardPosition){
        // @param: int @return: [int]
        let coordinates = [];
        if (boardPosition % 12 !== 0){
           coordinates.push(boardPosition - 1)
        }
        if (boardPosition % 11 !== 0 || boardPosition === 0){
            coordinates.push(boardPosition + 1)
        }
        if (boardPosition > 11){
            coordinates.push(boardPosition - 12)
        }
        if (boardPosition < 133){
            coordinates.push(boardPosition + 12)
        }
        return coordinates;
    }

    getLargestAdjacentCorporations(tileSpace){
        let adjacentCorporations = Array.from(
            new Set(this.getAdjacentCorporations(tileSpace))
        );

        let largestSize = 0;
        for (let i = 0; i < adjacentCorporations.length; i++){
            let corporationSize = this.countNumberOf(adjacentCorporations[i]);
            if (corporationSize > largestSize){
               largestSize = corporationSize;
            }
        }

        let largestAdjacentCorporations = [];
        for (let i = 0; i < adjacentCorporations.length; i++){
            let corporationSize = this.countNumberOf(adjacentCorporations[i]);
            if (corporationSize === largestSize){
               largestAdjacentCorporations.push(adjacentCorporations[i]);
            }
        }
        return largestAdjacentCorporations;
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
        let letterToRow = {
            'A': 0,
            'B': 1,
            'C': 2,
            'D': 3,
            'E': 4,
            'F': 5,
            'G': 6,
            'H': 7,
            'I': 8,
            'J': 9,
            'K': 10,
            'L': 11
        };
        let row = letterToRow[position.charAt(0)];
        let column = position.charAt(1) - 1;  // -1 accounts for 0th-based grid.
        let gridPosition = row * 12 + column;
        board.tileSpaces[gridPosition] = 'G';  // 'G' stands for 'Generic'.
    }
}


class Prices {
    constructor(board){
        this.board = board;
        let lowestPricesTier = Object.freeze({
            '2': 200,
            '3': 300,
            '4': 400,
            '5': 500,
            '6To10': 600,
            '11To20': 700,
            '21To30': 800,
            '31To40': 900,
            '41AndOver': 1000
        });
        let middlePricesTier = Object.freeze({
            '2': 300,
            '3': 400,
            '4': 500,
            '5': 600,
            '6To10': 700,
            '11To20': 800,
            '21To30': 900,
            '31To40': 1000,
            '41AndOver': 1100
        });
        let highestPricesTier = Object.freeze({
            '2': 400,
            '3': 500,
            '4': 600,
            '5': 700,
            '6To10': 800,
            '11To20': 900,
            '21To30': 1000,
            '31To40': 1100,
            '41AndOver': 1200
        });
        this.worldwide = lowestPricesTier;
        this.sackson = lowestPricesTier;
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
    constructor(board) {
        this.board = board;
    }

    showAllBoard() {
        for (let row = 0; i < 12; i++) {
            for (let column = 0; j < 12; j++) {
                console.log(this.board.tileSpaces[row][column])
            }
        }
    }
}


module.exports =  {
    Board,
    Prices,
    Player,

};
