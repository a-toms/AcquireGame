
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
        this.corporationSymbols = Object.freeze([
            'S', 'W', 'F', 'I', 'A', 'C', 'T'
        ]);
    };

    countNumberOf(corporation) {
        let count = 0;
        for (let i = 0; i < this.tileSpaces.length; i++) {
            if (this.tileSpaces[i] === corporation) {
                count++;
            }
        }
        return count;
    }

    _insertTiles(corporation, tilesToAdd) {
        // This function populates the board for testing.
        // corporation: str, n: number
        for (let i = 0; i < this.tileSpaces.length; i++) {
            if (tilesToAdd === 0) {
                break
            } else {
                this.tileSpaces[i] = corporation;
                tilesToAdd -= 1;
            }
        }
    }

    replaceTiles(replacement, coordinates){
        /* replacement: str coordinates: array[int] or int */
        if (Array.isArray(coordinates)){
            for (let i = 0; i < coordinates.length; i++) {
                this.tileSpaces[coordinates[i]] = replacement;
            }
        }
        else if (typeof coordinates === 'number'){
            this.tileSpaces[coordinates] = replacement;
        }
    }

    getAdjacentCorporations(tilePosition) {
        let centralCoordinate = Helper.getCoordinateOf(
            tilePosition
        );
        let surroundingCoordinates = Helper.getCoordinatesAdjacentTo(
            centralCoordinate
        );
        let adjacentCorporations = [];
        for (let i = 0; i < surroundingCoordinates.length; i++) {
            if (this.corporationSymbols.includes(
                this.tileSpaces[surroundingCoordinates[i]])
            ) {
                adjacentCorporations.push(this.tileSpaces[surroundingCoordinates[i]]);
            }
        }
        return Array.from(new Set(adjacentCorporations));
    }

    hasOnlyOneCorporationAdjacentTo(tilePosition) {
        return this.getAdjacentCorporations(tilePosition).length === 1;
    }

    getCoordinatesOfGenericTilesAdjacentTo(tilePosition) {
        let centralCoordinate = Helper.getCoordinateOf(
            tilePosition
        );
        let adjacentCoordinates = Helper.getCoordinatesAdjacentTo(
            centralCoordinate
        );
        let adjacentGenericCoordinates = [];
        for (let i = 0; i < adjacentCoordinates.length; i++) {
            if (this.tileSpaces[adjacentCoordinates[i]] === 'G') {
                adjacentGenericCoordinates.push(adjacentCoordinates[i]);
            }
        }
        adjacentGenericCoordinates.sort(function(a, b){return a - b});
        console.log("adj generic coordinates = " + adjacentGenericCoordinates);
        return adjacentGenericCoordinates;
    }

    hasGenericTilesAdjacentTo(tilePosition) {
        let capacity = !Helper.isEmpty(
            this.getCoordinatesOfGenericTilesAdjacentTo(tilePosition)
        );
        console.log("empty = " + capacity);
        return capacity;
    }

    canFoundCorporation(corporationSymbol) {
        let availableCorporations = this.getNonActiveCorporations();
        return availableCorporations.includes(corporationSymbol);
    }

    hasNonActiveCorporations() {
        return !Helper.isEmpty(this.getNonActiveCorporations())
    }

    getNonActiveCorporations() {

        console.log(Helper.getDifferenceBetween(
            this.corporationSymbols, this.findActiveCorporations()
        ));
        return Helper.getDifferenceBetween(
            this.corporationSymbols, this.findActiveCorporations()
        );
    }

    findActiveCorporations() {
        let existingCorporations = [];
        for (let i = 0; i < this.tileSpaces.length; i++) {
            let tileSymbol = this.tileSpaces[i];
            if (this.corporationSymbols.includes(tileSymbol)
                && !existingCorporations.includes(tileSymbol)) {
                existingCorporations.push(tileSymbol);
            }
        }
        existingCorporations.sort();
        return existingCorporations;
    }

    getLargestAdjacentCorporations(tileSpace) {
        let adjacentCorporations = Array.from(
            new Set(this.getAdjacentCorporations(tileSpace))
        );
        let largestSize = this.getSizeOfLargest(adjacentCorporations);
        return this.getLargest(largestSize, adjacentCorporations);
    }

    getSizeOfLargest(adjacentCorporations){
        let largestSize = 0;
        for (let i = 0; i < adjacentCorporations.length; i++) {
            let corporationSize = this.countNumberOf(adjacentCorporations[i]);
            if (corporationSize > largestSize) {
                largestSize = corporationSize;
            }
        }
        return largestSize;
    }

    getLargest(sizeOfLargest, adjacentCorporations){
        for (let i = adjacentCorporations.length; i > -1; i--) {
            let corporationSize = this.countNumberOf(adjacentCorporations[i]);
            if (corporationSize !== sizeOfLargest) {
                adjacentCorporations.splice(i, 1);
            }
        }
        adjacentCorporations.sort();
        return adjacentCorporations;
    }

    incorporateAdjacentGenericTiles(position) {
        let corporationSymbol = this.getAdjacentCorporationSymbol(position);
        let corporationCoordinate = Helper.getCoordinateOf(position);
        let genericCoordinates = this.getCoordinatesOfGenericTilesAdjacentTo(
            position
        );
        this.replaceTiles(corporationSymbol, genericCoordinates);
        this.replaceTiles(corporationSymbol, corporationCoordinate);
        return this;
    }

    getAdjacentCorporationSymbol(position){
        if (!this.hasOnlyOneCorporationAdjacentTo(position)){
            throw 'MoreThanOneAdjacentCorporationError'
        }
        return this.getAdjacentCorporations(position)[0];
    }

    foundCorporation(tilePosition, corpSymbol) {
        let central = Helper.getCoordinateOf(tilePosition);
        let adjacentGenerics = this.getCoordinatesOfGenericTilesAdjacentTo(
            tilePosition
        );
        if (Helper.isEmpty(adjacentGenerics)){
            throw 'NoAdjacentGenericsError'
        }
        this.replaceTiles(corpSymbol, central);
        this.replaceTiles(corpSymbol, adjacentGenerics);
        return this
    }

}

class Player {
    constructor(board, name, money) {  // Default money at game start is 6000
        this.board = board;
        this.name = name;
        this.money = money;
        this.stocks = [];
        this.tiles = [];
    };

    placeTile(position) {
        // Complete this function.

        if (this.board.getAdjacentCorporations(position).length > 1) {
            // Initiate acquisition
        } else if (this.board.hasOnlyOneCorporationAdjacentTo(position)) {
            return this.board.incorporateAdjacentGenericTiles(position);
        } else if (
            this.board.hasGenericTilesAdjacentTo(position) &&
            this.board.hasNonActiveCorporations()) { // Todo: Refactor above to a single combined function.


            // s
            // Todo: get user input of corporation that user wants to found.
            //  For the above, use canFoundCorporation().
            let symbol = '*'; // todo: Replace with user input.

            return this.board.foundCorporation(position, symbol);


        }
        let existing = this.board.findActiveCorporations();
        // Todo: complete
        return this.board;
    }

    buy(number, corporationSymbol){

    }

}

class Helper {

    static isEmpty(array) {
        if (Array.isArray(array) && array.length === 0){
            console.log("empty = " + array);
            return true;
        }
        else if (Array.isArray(array) && array.length > 0){
            console.log("not empty = " + array);
            return false;
        }
    }

    static getDifferenceBetween(first_arr, second_arr=[]){
        let difference = first_arr.filter(x => !second_arr.includes(x));
        difference.sort();
        return difference;
    }

    static getCoordinateOf(tilePosition){
        /* Converts tilePosition (e.g., A1, B2) to coordinates (0, 13). */
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
        let row = letterToRow[tilePosition.charAt(0)];
        let column = parseInt(tilePosition.substring(1)) - 1;  // -1 accounts for 0th-based grid.
        let coordinate = row * 12 + column;
        return coordinate;
    }

    static getCoordinatesAdjacentTo(boardPosition){
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
}


class Stocks {
    constructor(board) {
        this.board = board;
        let lowest = Object.freeze({
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
        let middle = Object.freeze({
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
        let highest = Object.freeze({
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
        this.W = lowest;
        this.S = lowest;
        this.F = middle;
        this.I = middle;
        this.A = middle;
        this.C = highest;
        this.T = highest;
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


// Game page testing

let board = new Board();
let players = [
    new Player(board, 'Mendeval', 4000),
    new Player(board, 'Alphi', 4000),
    new Player(board, 'Paulson', 4000),
    new Player(board, 'Tuyti', 4000)
];


function drawPlayers(players){
    let namesPlace = document.getElementById('player-information');
    for (let i = 0; i < players.length; i++){
        let playerInfo = document.createElement("P");
        playerInfo.id = `${players[i].name}`;
        playerInfo.innerHTML = `${players[i].name} has ${players[i].money} money`;
        namesPlace.appendChild(playerInfo)
    }
}

// Todo: TD later: refactor the below. It is too big currently.
function drawBoard(){
    let boardContainer = document.createElement("div");
    boardContainer.className = "board-container";
    const letters = Object.freeze(
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    );
    let rowLength = 12;
    for(let rowNumber = 0; rowNumber < 9; rowNumber++){
        let row = document.createElement("div");
        row.className = "row";
        for(let columnNumber = 1; columnNumber < 13; columnNumber++){
            let tilespace = document.createElement("button");
            tilespace.id = rowNumber * rowLength + columnNumber;
            tilespace.className = "board-space";
            tilespace.innerText = `${columnNumber}${letters[rowNumber]}`;
            tilespace.onclick = function() {
                placeTile(tilespace.id);
            };
            row.appendChild(tilespace);
        }
        boardContainer.append(row);
    }
    document.getElementById("boardPlace").appendChild(boardContainer);
}


// Todo: complete addStock. Integrate within Stocks class.
//  1. Check if stock available. 2. Add stock to basket 3. Press buy button and pay.
let availableStocks = {
    'w' : 1,
    't' : 3
};


let prices = {
    'w': 1000,
    't': 600
};

let shoppingBasket = [];

function addStock(id){
    let stockSymbol = id.charAt(0);
    if (availableStocks[stockSymbol] > 0 ){
        console.log("Bought 1 " + stockSymbol);
        availableStocks[stockSymbol] -= 1;
        shoppingBasket.push(stockSymbol);
    }
    else if (availableStocks[stockSymbol] <= 0){
        console.log("No " + stockSymbol + " available to buy")
    }
}

function buyStock(){
    // Execute shopping basket transactions.
}



function takeMoneyFrom(player){
    player.money -= 100;
    let mendevalInfo = document.getElementById('Mendeval');
    mendevalInfo.innerHTML = `${players[0].name} has ${players[0].money} money`;
}

function placeTile(tileId){
    let tileSpace = document.getElementById(tileId);
    tileSpace.style.backgroundColor= "#FF8D6F";
}

// Todo: Integrate amalgamate placeTile and placeTile.


// module.exports =  {
//     Board,
//     Stocks,
//     Player,
//     Helper
//
// };

function showPrice(idString, stockLedger){
    let stock = document.getElementById(idString);
    let corporateSymbol = idString.toUpperCase().charAt(0);
    console.log(stockLedger.getStockPriceOf(corporateSymbol));
    console.log(stock);


}


function showPrices(stockLedger){
    showPrice('t-stock', stockLedger);
    showPrice('c-stock', stockLedger);
    showPrice('w-stock', stockLedger);
    showPrice('i-stock', stockLedger);
    showPrice('f-stock', stockLedger);
    showPrice('s-stock', stockLedger);
    showPrice('a-stock', stockLedger);
// Todo: complete showPrices to display

}


// GAME ///

function loadGame(){
    let board = new Board();
    let stocks = new Stocks(board);
    board._insertTiles('T', 3);
    showPrices(stocks);
    drawBoard();
    drawPlayers(players);

}
//
window.addEventListener('load', loadGame);
