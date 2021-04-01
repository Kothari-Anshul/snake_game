import Board from "./board.js";

export default class Snake {
    #snakeParts
    #direction;
    
    static dx = [-1, 0, 1, 0]; // change need to be made per direction Left Up Right Down
    static dy = [0, -1, 0, 1];

    constructor() {
        this.#snakeParts = [
            {x: 100, y: 250},
            {x: 110, y: 250},
            {x: 120, y: 250}
        ];
        this.#direction = 0; // left direction
    }

    getSnakeParts() {
        return this.#snakeParts;
    }

    move() {
        const nextSnakeHead = this.getNextSnakeHead();
        this.#snakeParts.unshift(nextSnakeHead);
        this.#snakeParts.pop();
    }

    updateDirection(direction) {
        switch(direction) {
            case 0:
            case 2:
                //left & right
                if(this.#direction != 0 && this.#direction != 2) {
                    // change from left to right and vice-versa not allowed
                    this.#direction = direction;
                }
                break;
            case 1:
            case 3: 
                //up & down
                if(this.#direction != 1 && this.#direction != 3) {
                    // change from up to down and vice-versa not allowed
                    this.#direction = direction;
                }
                break;
            }
    }

    getNextSnakeHead() {
        const currentHead = this.#snakeParts[0];
        const xNew = currentHead.x + Board.enlargeFactor * Snake.dx[this.#direction];
        const yNew = currentHead.y + Board.enlargeFactor * Snake.dy[this.#direction];
        const newHead = {x: xNew, y: yNew};
        return newHead;
    }

    getSnakeHead() {
        return this.#snakeParts[0];
    }

    grow() {
        const nextHead = this.getNextSnakeHead();
        this.#snakeParts.unshift(nextHead);
    }

    isCrossingItself() {
        // check if head is same as any other part
        const snakeHead = this.#snakeParts[0];
        return this.contains(1, snakeHead);
    }

    isSnakePart(value) {
        return this.contains(0, value);
    }

    contains(startIndex, value) {
        for(let i = startIndex; i < this.#snakeParts.length; i++) {
            if(value.x == this.#snakeParts[i].x && value.y == this.#snakeParts[i].y) {
                return true;
            }
        }
        return false;
    }

    hasSnakeEatenFood(food) {
        const snakeHead = this.#snakeParts[0];
        return snakeHead.x == food.x && snakeHead.y == food.y;
    }

}