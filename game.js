import Board from "./board.js";
import Snake from "./snake.js";

export default class Game {
    #board;
    #snake;
    #food;
    #timerID;
    #score;
    static refreshFrequency = 200; // in ms

    constructor() {
        this.#snake = new Snake();
        this.#food = {};
        this.generateNewFood();
        this.#board = new Board(this.#snake, this.#food);
        this.#score = 0;
    }

    startGame() {
        this.displayScore();
        this.#timerID = setInterval(() => {
            this.#snake.move();
            if(this.#snake.hasSnakeEatenFood(this.#food)) {
                this.#snake.grow();
                this.#score++;
                this.displayScore();
                this.generateNewFood();
            }
            this.#board.redrawBoard();
            if(this.isGameOver()) {
                this.stopGame();
                this.#board.drawTextOnBoard("GAME OVER");
            }
        }, Game.refreshFrequency);
    }

    stopGame() {
        clearInterval(this.#timerID);
    }
    
    updateDirection(event) {
        const keyPressed = event.keyCode;
        this.#snake.updateDirection(keyPressed - 37);
    }

    isGameOver() {
        return this.#board.isSnakeCrossingBoardBoundary(this.#snake) || this.#snake.isCrossingItself();
    }

    displayScore() {
        const scoreElement = document.getElementById("score");
        scoreElement.innerHTML = "YOUR SCORE: " + this.#score;
    }

    generateNewFood() {
        let x, y;
        while(true) {
            x = this.getRamdomNumber(Board.width/Board.enlargeFactor) * Board.enlargeFactor;
            y = this.getRamdomNumber(Board.height/Board.enlargeFactor) * Board.enlargeFactor;
            if(!this.#snake.isSnakePart({x: x, y: y})) {
                break;
            };
        }
        this.#food.x = x;
        this.#food.y = y;
    }

    getRamdomNumber(max) {
        return Math.floor(Math.random()*max)
    }
}