

// Todo: Convert into a node app with tests. Refactor. Separate into different parts.
// The app is too unwieldy currently. I must restructure it to manage it.




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
        this.letters = Object.freeze(
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
        );
        this.tiles = this.makeArrayOfAllTiles();
    };

    makeArrayOfAllTiles(){
        const numberOfTilespaces = 108;
        let tiles = [];
        for(let i = 0; i < numberOfTilespaces; i++) {
            tiles.push(i)
        }
        return tiles;
    }

    drawBoard(){
        const boardContainer = document.createElement("div");
        for(let rowNumber = 0; rowNumber < 9; rowNumber++){
            let row = document.createElement("div");
            row.className = "tile-space-row";
            for(let columnNumber = 1; columnNumber < 13; columnNumber++){
                row.appendChild(
                    this.returnTilespaceButton(columnNumber, rowNumber)
                );
            }
            boardContainer.append(row);
        }
        document.getElementById("boardPlace").appendChild(boardContainer);
    }

    returnTilespaceButton(column, row){
        const tilespace = document.createElement("button");
        tilespace.innerText = `${column}${this.letters[row]}`;
        tilespace.id = `${row * 12 + column - 1}`;
        tilespace.className = "tile-space";
        return tilespace;
    }

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
        let centralCoordinate = tilePosition;
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
        let centralCoordinate = tilePosition;
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
        let central = tilePosition;
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
    constructor(board, name, money, stockExchange) {
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
        this.orderStocks = [];
        this.orderPrice = 0;
        this.hasBoughtStocksThisTurn = false;
    };

    takeNumberOfTiles(number){
        let newTilesForPlayer = [];
        for (let i = 0; i < number; i++){
           newTilesForPlayer.push(this.board.tiles.pop())
        }
        return newTilesForPlayer;
    }

    addTilesToPlayer(tiles){
        this.tiles.push(tiles);
    }

    showTilesInHand(){
        // Todo: Clear all of the existing buttons before adding new buttons below.
        const playerTiles = document.querySelector(".player-tiles");
        if (playerTiles.childNodes.length > 0){
            for (let i = 0; i < this.tiles.length; i++) {
                let existingButton = document.getElementById(`tile-${this.tiles[i]}`);
                existingButton.parentNode.removeChild(existingButton);

                // Remove tile from player's tiles
                Helper.remove(this.tiles[i], this.tiles);
           }
        }

        const playerHand = document.querySelector(".player-hand");
        for (let i = 0; i < this.tiles.length; i++){
            let button = document.createElement("button");
            button.id = `tile-${this.tiles[i]}`;
            button.textContent = Helper.convertCoordinateToLetterPosition(
                this.tiles[i]
            );
            button.className = "player-tile";

            playerTiles.append(button);
        }

    }

    addClickEventListenersToTilespaces(){
        for (let tilespace of document.querySelectorAll(".tile-space")){
            tilespace.addEventListener('click', this.placeTile.bind(this));
        }
    }

    // Tdo: Refactor this.
    placeTile(event) {
        let coordinate = Number(event.target.id);

        // Initiate acquisition.
        if (this.board.getAdjacentCorporations(coordinate).length > 1) {
        }

        // Add to existing corporation.
        else if (this.board.hasOnlyOneCorporationAdjacentTo(coordinate)) {
            return this.board.incorporateAdjacentGenericTiles(coordinate);
        }

        // Tdo: Connect the DOM to the below :D
        // Found corporation
        else if (
            this.board.hasGenericTilesAdjacentTo(coordinate) &&
            this.board.hasNonActiveCorporations()) {
            let symbol = 'A2';
            return this.foundCorporation(coordinate, symbol);
        }

        // Place generic tile.
        else {
            // If player has tile
            if (this.tiles.includes(coordinate)){

                // Add tile to board
                let tilespaceElement = document.getElementById(`${coordinate}`);
                tilespaceElement.textContent = Helper.convertCoordinateToLetterPosition(coordinate);
                tilespaceElement.className += " clicked";
                this.board.tileSpaces[coordinate] = 'G';

                // Remove placed tile from player's hand
                for (let j = this.tiles.length - 1; j > -1; j--){
                    if (this.tiles[j] === coordinate){
                        this.tiles.splice(j, 1);
                    }
                }

                // Re-render player's hand of tiles
                this.showTilesInHand()
            }

        }
    }


    prepareOrder() {
        /*
        Handles the user pressing the DOM stock buttons to order and to buy stocks.

        */
        const stockButtons = document.querySelectorAll(".stock-button-group");
        stockButtons.forEach(
            stockButton => {
                stockButton.addEventListener('click', this.addStock.bind(this));
            }
        );
    }

    addStock(e) {
        /*
        Add stock to order basket and stock price to order price.
         */
        const tickerSymbol = this.getStockSymbolFromStockButtonEvent(e);
        this.orderStocks = this.addStockToAnOrderWithThreeItems(tickerSymbol, this.orderStocks);
        this.orderPrice = this.calculateOrderPrice(this.orderStocks, this.orderPrice);
        this.displayOrderPrice(this.orderPrice);
        this.displayOrderStocks(this.orderStocks);
    }

    getStockSymbolFromStockButtonEvent(event) {
        // Get the stock symbol of the button pressed.
        let stockSymbol = '';
        if (event.target.className === 'priceShown') {
            stockSymbol = event.target.parentNode.className.charAt(0).toUpperCase();
        }
        else {
            stockSymbol = event.target.className.charAt(0).toUpperCase();
        }
        return stockSymbol
    }

    addStockToAnOrderWithThreeItems(stockSymbol, order) {
        this.keepMaximumOfThreeStocks();
        return this.addToOrder(stockSymbol, order);
    }

    addToOrder(stockSymbol, order){
        // Add stock to order
        order.push(stockSymbol);
        return order;
    }


    keepMaximumOfThreeStocks(){
        // Remove first added stock if more than 3 stock in order.
        if (this.orderStocks.length === 3) {
            this.orderStocks.shift();
        }
    }

    calculateOrderPrice(stockSymbolsOfOrder, orderPrice) {
        return stockSymbolsOfOrder.reduce(
            (total, stockSymbol) => {
                return total + this.stockExchange.getStockPriceOf(stockSymbol)
            }, 0
        );
    }

    displayOrderStocks(order) {
        // Shows the stocks of the order in the DOM.
        let shownOrder = "Order: ";
        if (order.length === 0){
            document.querySelector('#current-order-stocks').textContent = shownOrder;
        }
        else {
            for (let stockSymbol of Array.from(new Set(order))) {
                let quantity = Helper.count(stockSymbol, order);
                shownOrder += `${stockSymbol} ${quantity} `;
                document.querySelector('#current-order-stocks').textContent = shownOrder;
            }
        }

    }

    displayOrderPrice(price) {
        // Shows the price of the order in the DOM.
        const priceToShow = ` ${price}`;
        const priceElement = document.querySelector('#current-order-price');
        priceElement.textContent = priceToShow;
        priceElement.className = "money-added";

    }

    clearOrderOnButtonPress(){
        const clearButton = document.querySelector(".action-button.clear-order");
        clearButton.addEventListener('click', this.resetOrder.bind(this));
    }

    buyOrderOnButtonPress(){
        const buyButton = document.querySelector(".action-button.buy-order");
        buyButton.addEventListener('click', this.buyOrder.bind(this));
    }

    buyOrder(){
        if (this.hasBoughtStocksThisTurn){
            alert('You have already bought stocks');
            return 'Invalid Order'
        }
        if (!this.stockExchange.areSelectedStocksAllAvailable(this.orderStocks)){
            alert('Stocks unavailable');
            return 'Invalid Order'
        }
        else if (!this.canAfford(this.orderStocks)){
            alert('Not enough money');
            return 'Invalid Order'
        }
        else{
            this.payFor(this.orderStocks);
            this.receiveTransferFromStockExchange(this.orderStocks);
            this.resetOrder();
            this.hasBoughtStocksThisTurn = true;
        }
    }

    resetOrder(){
        this.orderPrice = 0;
        this.orderStocks = [];
        this.displayOrderPrice(0);
        this.displayOrderStocks([]);
        this.showPlayerInformation();
    }

    canAfford(stocks){
        return this.stockExchange.getTotalPriceOf(stocks) <= this.money;
    }

    payFor(stocks){
        const price = this.stockExchange.getTotalPriceOf(stocks);
        this.money -= price
    }

    receiveTransferFromStockExchange(purchasedStocks){
        for (let stockSymbol of purchasedStocks){
            this.stockExchange.availableStocks[stockSymbol] -= 1;
            this.stockPortfolio[stockSymbol] += 1;
        }
        return this.stockPortfolio;
    }

    showPlayerInformation(){
        const display = document.querySelector(".player-information");
        display.querySelector('.name')
            .textContent = this.name;
        display.querySelector('.money')
            .textContent = `$ ${this.money}`;
        display.querySelector('.stock-portfolio')
            .textContent = `${Object.entries(this.stockPortfolio)}`;
    }
}


class Helper {
    static isEmpty(array) {
        if (Array.isArray(array) && array.length === 0){
            return true;
        }
        else if (Array.isArray(array) && array.length > 0){
            return false;
        }
    }

    static remove(element, array) {
        for (let i = array.length - 1; i > -1; i--) {
            if (array[i] === element) {
                array.splice(i, 1);
            }
        }
        return array;
    }

    static count(element, array){
        let quantity = 0;
        for (let i = 0; i < array.length; i++){
            if (array[i] === element){
                quantity += 1;
            }
        }
        return quantity;
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

    static convertCoordinateToLetterPosition(coordinate){
        let letterToRow = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'
        ];
        const row = Math.floor(coordinate / 12);
        const column = coordinate % 12;
        return `${column + 1}${letterToRow[row]}`
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

    isStockAvailable(stockSymbol){
        return this.availableStocks[stockSymbol] > 0;
    }

    areSelectedStocksAllAvailable(stocks) {
        // typeof stocks === Array
        for (let stock of stocks){
            if (!this.isStockAvailable(stock)){
                return false;
            }
        }
        return true;
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

    getTotalPriceOf(stockSymbols){
        // @param: []
        let totalPrice = 0;
        for (let stockSymbol of stockSymbols){
            let individualStockPrice = this.getStockPriceOf(
                stockSymbol
            );
            totalPrice += individualStockPrice;
        }
        return totalPrice;
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


// GAME ///


function loadGame() {
    const board = new Board();
    const stockExchange = new StockExchange(board);
    const player1 = new Player(board, 'Verban', 2000, stockExchange);
    stockExchange.showCurrentPricesOnStockButtons();
    board.drawBoard();
    player1.addClickEventListenersToTilespaces();
    player1.prepareOrder();
    player1.showPlayerInformation();
    player1.buyOrderOnButtonPress();
    player1.clearOrderOnButtonPress();
    player1.tiles = [0, 1, 2, 12, 105, 12];
    player1.showTilesInHand();







}

//
// module.exports =  {
//     Board,
//     StockExchange,
//     Player,
//     Helper
//
// };
window.addEventListener('load', loadGame);
