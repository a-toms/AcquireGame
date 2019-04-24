
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
        /* replacement: str coordinates: array[number] or number */
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
        return adjacentGenericCoordinates;
    }

    hasGenericTilesAdjacentTo(tilePosition) {
        let capacity = !Helper.isEmpty(
            this.getCoordinatesOfGenericTilesAdjacentTo(tilePosition)
        );
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
    constructor(board, name, money, stockExchange) {  // Todo: Move stockPortfolio to second position.
        this.board = board;
        this.stockExchange = stockExchange;
        this.name = name;
        this.money = money;
        this.stockPortfolio = {
            'W': 0,
            'S': 0,
            'F': 0,
            'I': 0,
            'A': 0,
            'C': 0,
            'T': 0,
        };
        this.tiles = [];
    };

    placeTile(position) {
        if (this.board.getAdjacentCorporations(position).length > 1) {
            // Initiate acquisition
        } else if (this.board.hasOnlyOneCorporationAdjacentTo(position)) {
            return this.board.incorporateAdjacentGenericTiles(position);
        } else if (
            this.board.hasGenericTilesAdjacentTo(position) &&
            this.board.hasNonActiveCorporations()) { // Todo: Refactor above to a single combined function.

            // Todo: get user input of corporation that user wants to found from the DOM.
            let symbol = '*'; // todo: Replace with user input.
            return this.board.foundCorporation(position, symbol);
        }
        let existing = this.board.findActiveCorporations();
        // Todo: complete
        return this.board;
    }

    buy(stocks){
        // DOM creates an object.
        // @param purchaseOrder: Object

        if (!this.areSelectedStocksAllAvailable(stocks)){
            return 'Invalid Order'
        }
        else if (!this.canAfford(stocks)){
            return 'Invalid Order'
        }
        else{

            // Todo: payFor(stocks)

            this.receiveFromStockExchange(stocks);

        }

        // After pressing 'buy', check that player has enough money. If the player does,
    // lower his money by $X; move the stockPortfolio to him; remove the stockPortfolio from available stockPortfolio.
    }

    canAfford(shoppingBasket){
        let totalPrice = 0;
        for (let stockSymbol of Object.keys(shoppingBasket)) {
            let individualStockPrice = this.stockExchange.getStockPriceOf(
                stockSymbol
            );
            totalPrice += individualStockPrice;
        }
        return totalPrice <= this.money;
    }

    areSelectedStocksAllAvailable(shoppingBasket){
        for (let k of Object.keys(shoppingBasket)) {
            if (!this.isStockAvailable(k)){
                return false;
            }
        }
        return true;
    }

    isStockAvailable(corporateSymbol){
        return this.stockExchange.availableStocks[corporateSymbol] > 0;
    }

    receiveFromStockExchange(purchasedStocks){
        for (let stockSymbol of Object.keys(purchasedStocks)){
            this.stockExchange.availableStocks[stockSymbol] -= purchasedStocks[stockSymbol];
            this.stockPortfolio[stockSymbol] += purchasedStocks[stockSymbol];
        }
        return this.stockPortfolio;
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


class StockExchange {
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
        this.availableStocks = {
            'W': 10,
            'S': 10,
            'F': 10,
            'I': 10,
            'A': 10,
            'C': 10,
            'T': 10,
        }
    }

    getShareholderBonus(corporation) {
        // Todo: write function. Shareholder bonus is directly linked to the stock price.
    }

    getStockPriceOf(corporation) {
        let numberOfTiles = this.board.countNumberOf(corporation);
        // Display the starting price if the corporation is not yet founded.
        if (this.board.getNonActiveCorporations().includes(corporation)) {
            return this[corporation][2];
        }
        if (numberOfTiles <= 5) {
            return this[corporation][`${numberOfTiles}`];
        } else if (numberOfTiles <= 10) {
            return this[corporation]['6To10'];
        } else if (numberOfTiles <= 20) {
            return this[corporation]['11To20'];
        } else if (numberOfTiles <= 30) {
            return this[corporation]['21To30'];
        } else if (numberOfTiles <= 40) {
            return this[corporation]['31To40'];
        } else if (numberOfTiles >= 41)
            return this[corporation]['41AndOver'];
    }



// Todo: continue writing the below. Add test.
    addStockToShoppingBasket(id) {
        const shoppingBasket = [];
        const stockSymbol = id.charAt(0);
        if (this.availableStocks[stockSymbol] > 0) {
            shoppingBasket.push(stockSymbol);
            this.availableStocks[stockSymbol] -= 1;
            return shoppingBasket;
        }
    }


    // function buyStock(){
    // Execute shopping basket transactions.
// }





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


module.exports =  {
    Board,
    StockExchange: StockExchange,
    Player,
    Helper

};


function showPrice(idString, stockLedger){
    let stock = document.getElementById(idString);
    let corporateSymbol = idString.toUpperCase().charAt(0);
    let priceToDisplay = stockLedger.getStockPriceOf(corporateSymbol);
    stock.getElementsByClassName("priceShown")[0].textContent = priceToDisplay;
}


function showPrices(stockLedger){
    showPrice('t-stock', stockLedger);
    showPrice('c-stock', stockLedger);
    showPrice('w-stock', stockLedger);
    showPrice('i-stock', stockLedger);
    showPrice('f-stock', stockLedger);
    showPrice('s-stock', stockLedger);
    showPrice('a-stock', stockLedger);
}


// GAME ///

// Todo: complete addStock(). Integrate addStock() to the StockExchange class.
//  1. Check if stock available. 2. Add stock to basket 3. Press buy button and pay.

// Show stock colour as grayscale when unavailable.

function loadGame(){
    let board = new Board();
    let stocks = new StockExchange(board);
    board._insertTiles('S', 12);
    board._insertTiles('T', 3);
    showPrices(stocks);
    drawBoard();
    drawPlayers(players);

}
//
// window.addEventListener('load', loadGame);
