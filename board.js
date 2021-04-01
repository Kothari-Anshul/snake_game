export default class Board {
    #boardContext;
    #snake;
    #food;

    static width = 500;
    static height = 500;
    static enlargeFactor = 10; // used for grouping pixles to be considered as single point by the human eye
    static snakeColor = 'lightblue';
    static snakeBorderColor = 'darkblue';
    static foodColor = 'lightgreen';
    static foodBorderColor = 'darkgreen';
    static textColor = "#b30000";
    
    constructor(snake, food) {
        const board = document.getElementById("snake_board");
        this.#boardContext = board.getContext("2d");
        this.#snake = snake;
        this.#food = food;
    }

    redrawBoard() {
        this.clearBoard();
        this.drawSnakeOnBoard();
        this.drawFoodOnBoard()
    }

    drawSnakeOnBoard() {
        const snakeParts =  this.#snake.getSnakeParts();
        snakeParts.forEach(snakePart => {
            this.drawRectangle(Board.snakeColor, Board.snakeBorderColor, snakePart.x, snakePart.y, 10, 10);
        }, this);
    }

    drawFoodOnBoard() {
        const {x, y} = this.#food;
        this.drawRectangle(Board.foodColor, Board.foodBorderColor, x, y, 10, 10);
    }

    clearBoard() {
        this.#boardContext.clearRect(0, 0, Board.width, Board.height);
    }

    drawRectangle(color, borderColor, x, y, width, height) {
        this.#boardContext.fillStyle = color;
        this.#boardContext.strokestyle = borderColor;
        this.#boardContext.fillRect(x, y, width, height);
        this.#boardContext.strokeRect(x, y, width, height);
    }

    drawTextOnBoard(text) {
        this.#boardContext.fillStyle = Board.textColor;
        this.#boardContext.font = "60px Arial";
        this.#boardContext.fillText(text, 60, 240);
    }

    isSnakeCrossingBoardBoundary() {
        const snakeHead = this.#snake.getSnakeHead();
        return !(snakeHead.x >= 0 && snakeHead.x < Board.width && snakeHead.y >= 0 && snakeHead.y < Board.height);
    }
}