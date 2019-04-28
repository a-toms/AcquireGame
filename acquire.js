
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
        // @param: {str:int}
        /*
         After pressing 'buy', check that all selected stocks are available and
         that player has enough money. If the player does have enough money:
         lower his money by $X;
         move the stocks to him; and
         remove the stocks from the available stocks.
         */
        if (!this.areSelectedStocksAllAvailable(stocks)){
            return 'Invalid Order'
        }
        else if (!this.canAfford(stocks)){
            return 'Invalid Order'
        }
        else{
            this.payFor(stocks);
            this.receiveFromStockExchange(stocks);
        }
    }

    areSelectedStocksAllAvailable(stocks){
        for (let stockSymbol of Object.keys(stocks)) {
            if (!this.isStockAvailable(stockSymbol)){
                return false;
            }
        }
        return true;
    }

    canAfford(stocks){
        return this.stockExchange.getTotalPriceOf(stocks) <= this.money;
    }

    payFor(stocks){
        const price = this.stockExchange.getTotalPriceOf(stocks);
        this.money -= price;
    }

    isStockAvailable(stockSymbol){
        return this.stockExchange.availableStocks[stockSymbol] > 0;
    }

    receiveFromStockExchange(purchasedStocks){
        for (let stockSymbol of Object.keys(purchasedStocks)){
            this.stockExchange.availableStocks[stockSymbol] -= purchasedStocks[stockSymbol];
            this.stockPortfolio[stockSymbol] += purchasedStocks[stockSymbol];
        }
        return this.stockPortfolio;
    }

    // Todo: complete showInformation
    showInformation(){
        const displayedInformation = document.querySelector("player-information");
        console.log(displayedInformation);
        displayedInformation.querySelector('name').textContent = 'Michael';
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

    getStockPriceOf(stockSymbol) {
        let numberOfTiles = this.board.countNumberOf(stockSymbol);
        // Display the starting price if the corporation is not yet founded.
        if (this.board.getNonActiveCorporations().includes(stockSymbol)) {
            return this[stockSymbol][2];
        }
        if (numberOfTiles <= 5) {
            return this[stockSymbol][`${numberOfTiles}`];
        } else if (numberOfTiles <= 10) {
            return this[stockSymbol]['6To10'];
        } else if (numberOfTiles <= 20) {
            return this[stockSymbol]['11To20'];
        } else if (numberOfTiles <= 30) {
            return this[stockSymbol]['21To30'];
        } else if (numberOfTiles <= 40) {
            return this[stockSymbol]['31To40'];
        } else if (numberOfTiles >= 41)
            return this[stockSymbol]['41AndOver'];
    }

    getTotalPriceOf(stockSymbolsAndQuantity){
        // @param: {corporate symbol : int}
        let totalPrice = 0;
        for (let stockSymbol of Object.keys(stockSymbolsAndQuantity)) {
            let individualStockPrice = this.getStockPriceOf(
                stockSymbol
            );
            totalPrice += individualStockPrice;
        }
        return totalPrice;
    }


    handleAnyBuyOrders(){
        /*
        Handles the user pressing the DOM stock buttons to order and to buy stocks.
        */
        const outerClass = this; // Outer class access point for the nested functions.
        let orderStocks = {};
        let orderPrice = 0;

        const stockButtons = document.querySelectorAll(".stock-button-group");
        stockButtons.forEach(
            stockButton => {
                stockButton.addEventListener('click', addStock);
            }
        );

        function addStock(e){
            const tickerSymbol = getStockSymbolFromStockButtonEvent(e);
            orderStocks = addStockToOrder(tickerSymbol, orderStocks);
            orderPrice = addStockPriceToOrderPrice(tickerSymbol, orderPrice);
            displayOrderPrice(orderPrice);
            displayOrderStocks(orderStocks);
        }

        function getStockSymbolFromStockButtonEvent(event){
            // Get the stock symbol of the button pressed.
            let stockSymbol = new String();
            if (event.target.className === 'priceShown') {
                stockSymbol = event.target.parentNode.className.charAt(0).toUpperCase();
            }
            else {
                stockSymbol = event.target.className.charAt(0).toUpperCase();
            }
            return stockSymbol
        }

        function addStockToOrder(stockSymbol, order) {
            if (stockSymbol in order) {
                order[stockSymbol] += 1;
            }
            else {
                order[stockSymbol] = 1;
            }
            return order;
        }

        function addStockPriceToOrderPrice(stockSymbol, orderPrice){
            orderPrice += outerClass.getStockPriceOf(stockSymbol);
            return orderPrice;
        }

        function displayOrderStocks(order){
            // Show the stocks of the order in the DOM.
            let shownOrder = "Order: ";
            for (let stockSymbol of Object.keys(order)){
                shownOrder += `${stockSymbol} ${order[stockSymbol]} - `;
                document.querySelector('#current-order-stocks').textContent = shownOrder;
            }
        }

        function displayOrderPrice(price){
            // Show the price of the order in the DOM.
            let shownPrice = `$ ${price}`;
            document.querySelector('#current-order-price').textContent = shownPrice;
        }

        // Todo: Add ability for the player to buy the order.

    }



    showCurrentPricesOnStockButtons() {
        const stockButtons = document.querySelector('.stock-button-group').children;
        Array.from(stockButtons).forEach(
            stockButton => {
                let symbol = stockButton.className.charAt(0).toUpperCase();
                let display = stockButton.querySelector('span');
                display.innerText = this.getStockPriceOf(symbol);
            }
        );
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
//     StockExchange,
//     Player,
//     Helper
//
// };










// GAME ///

// Todo: complete addStock(). Integrate addStock() to the StockExchange class.
//  1. Check if stock available. 2. Add stock to basket 3. Press buy button and pay.

// Show stock colour as grayscale when unavailable.

function loadGame(){
    const board = new Board();
    const stockExchange = new StockExchange(board);
    const player1 = new Player(board, 'Verban', 2000, stockExchange);
    board._insertTiles('S', 12);
    board._insertTiles('T', 3);
    stockExchange.showCurrentPricesOnStockButtons();
    drawBoard();
    drawPlayers(players);
    stockExchange.handleAnyBuyOrders();
    player1.showInformation();



}

window.addEventListener('load', loadGame);
