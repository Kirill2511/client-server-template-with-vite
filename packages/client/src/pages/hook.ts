export const start = function () {
    "use strict";
    const Tetris = function (this: any, canvas: any, sideCnvs: any) {
        this.score = 0
        this.shapes = [
            [ // Square
                [
                    [
                        "0000",
                        "0110",
                        "0110",
                        "0000"
                    ],
                ]
            ],
            [ // Bar
                [
                    [
                        "0000",
                        "1111",
                        "0000",
                        "0000"
                    ],
                    [
                        "0010",
                        "0010",
                        "0010",
                        "0010"
                    ]
                ]
            ],
            [ // Notch
                [
                    [
                        "0000",
                        "0111",
                        "0010",
                        "0000"
                    ],
                    [
                        "0010",
                        "0110",
                        "0010",
                        "0000"
                    ],
                    [
                        "0010",
                        "0111",
                        "0000",
                        "0000"
                    ],
                    [
                        "0010",
                        "0011",
                        "0010",
                        "0000"
                    ]
                ]
            ],
            [ // J
                [
                    [
                        "0000",
                        "0111",
                        "0001",
                        "0000"
                    ],
                    [
                        "0010",
                        "0010",
                        "0110",
                        "0000"
                    ],
                    [
                        "0100",
                        "0111",
                        "0000",
                        "0000"
                    ],
                    [
                        "0011",
                        "0010",
                        "0010",
                        "0000"
                    ]
                ]
            ],
            [ // L
                [
                    [
                        "0000",
                        "0111",
                        "0100",
                        "0000"
                    ],
                    [
                        "0110",
                        "0010",
                        "0010",
                        "0000"
                    ],
                    [
                        "0001",
                        "0111",
                        "0000",
                        "0000"
                    ],
                    [
                        "0010",
                        "0010",
                        "0011",
                        "0000"
                    ]
                ]
            ],
            [ // S
                [
                    [
                        "0000",
                        "0011",
                        "0110",
                        "0000"
                    ],
                    [
                        "0010",
                        "0011",
                        "0001",
                        "0000"
                    ],
                ]
            ],
            [ // Z
                [
                    [
                        "0000",
                        "0110",
                        "0011",
                        "0000"
                    ],
                    [
                        "0001",
                        "0011",
                        "0010",
                        "0000"
                    ],
                ]
            ]
        ];

        this.colors = [
            "hsl(0, 90%, 40%)",
            "hsl(5, 90%, 45%)",
            "hsl(10, 90%, 50%)",
            "hsl(15, 90%, 55%)",
            "hsl(20, 90%, 60%)",
            "hsl(25, 90%, 65%)",
            "hsl(30, 90%, 70%)"
        ];

        this.canvas = canvas;
        this.canvas.width = 200;
        this.canvas.height = this.canvas.width * 2;
        this.ctx = this.canvas.getContext("2d");
        this.sideCnvs = sideCnvs;
        this.sideCnvs.height = 80;
        this.sideCnvs.width = 120;
        this.sideCtx = this.sideCnvs.getContext("2d");
        this.tetOrigin = { x: 3, y: -2 };
        this.grid = 20;
        this.initialSpeed = 500;
        this.gameSpeed;
        this.interval;
        this.activeTet;
        this.nextTet;
        this.board;
        this.kbd;
    };

    Tetris.prototype.newBlock = function () {
        if (!this.nextTet) {
            const shapeNum = Math.random() * this.shapes.length | 0;
            this.nextTet = new (Tetromino as any)(
                1, 0,
                this.shapes[shapeNum][0],
                this.colors[shapeNum]
            );
        }

        this.activeTet = this.nextTet;
        this.activeTet.x = this.tetOrigin.x;
        this.activeTet.y = this.tetOrigin.y;

        const shapeNum = Math.random() * this.shapes.length | 0;
        this.nextTet = new (Tetromino as any)(
            1, 0,
            this.shapes[shapeNum][0],
            this.colors[shapeNum]
        );

        this.sideCtx.clearRect(0, 0, this.sideCnvs.width, this.sideCnvs.height);
        this.nextTet.draw(this.sideCtx, this.board, this.grid);
    };

    Tetris.prototype.init = function () {
        this.newBlock();

        this.kbd = {
            up: false,
            down: false,
            left: false,
            right: false,
            z: false
        };

        this.board = [];

        for (let i = 0; i < 20; i++) {
            this.board[i] = [];

            for (let j = 0; j < 10; j++) {
                this.board[i][j] = "0";
            }
        }

        document.addEventListener("keydown", function (this: any, e: any) {
            switch (e.keyCode) {
                case 38: this.kbd.up = true; break;
                case 40: this.kbd.down = true; break;
                case 37: this.kbd.left = true; break;
                case 39: this.kbd.right = true; break;
                case 90: this.kbd.z = true; break;
            }
        }.bind(this));

        this.newInterval(this.initialSpeed);
        this.update();
    };
    Tetris.prototype.newInterval = function (speed: any) {
        clearInterval(this.interval);
        this.gameSpeed = speed;
        this.interval = setInterval(function (this: any) {
            if (!this.activeTet.move("down", this.board)) {
                if (this.activeTet.y <= 0) {
                    const over = document.querySelector('.game-over')
                    const score = document.querySelector('.score')
                    const level = document.querySelector('.level')
                    if (over && score && level) {
                        over.classList.add('show')
                        score.textContent = `Ваш счет: ${this.score * 100}`
                        level.textContent = `Ваш счет: ${this.score}`
                    }
                    //this.init();
                    // this.board = [];
                    // console.log(this.board);

                }
                else {
                    this.activeTet.kill(this.board);
                    this.newBlock();
                }
            }
        }.bind(this), this.gameSpeed);
    };

    Tetris.prototype.newRow = function () {
        const newRow = [];

        for (let i = 0; i < 10; i++) {
            newRow.push("0");
        }

        this.board.unshift(newRow);
        this.score += 1
        console.log(this.score);

    };

    Tetris.prototype.handleKeyboard = function () {
        if (this.kbd.left) {
            this.activeTet.move("left", this.board);
        }
        else if (this.kbd.right) {
            this.activeTet.move("right", this.board);
        }
        else if (this.kbd.up) {
            this.activeTet.rotate(this.board);
        }
        else if (this.kbd.z) {
            this.activeTet.rotate(this.board, true);
        }
        else if (this.kbd.down) {
            this.activeTet.drop(this.board);
            this.newBlock();
        }
    };

    Tetris.prototype.clearFullRows = function () {
        let rowsCleared = 0;

        for (let i = 0; i < this.board.length; i++) {
            let clear = true;

            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] === "0") {
                    clear = false;
                    break;
                }
            }

            if (clear) {
                rowsCleared++;
                this.board.splice(i, 1);
                this.newRow();
                this.gameSpeed -= 5;
                this.newInterval(this.gameSpeed);

            }
        }

        return rowsCleared;
    };

    Tetris.prototype.render = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#B0E0E6";
        // this.ctx.textBaseline = "middle";
        // this.ctx.font = "50px Courier";
        // this.ctx.strokeText("Game Over", 30, 50);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.activeTet.draw(this.ctx, this.board, this.grid);

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] !== "0") {
                    this.ctx.fillStyle = this.board[i][j];
                    this.ctx.fillRect(j * this.grid, i * this.grid, this.grid, this.grid);
                    this.ctx.strokeRect(j * this.grid, i * this.grid, this.grid, this.grid);
                }
            }
        }
    };

    Tetris.prototype.update = function () {
        this.handleKeyboard();
        this.clearFullRows();
        this.render();
        this.kbd.up = this.kbd.down = this.kbd.left = false;
        this.kbd.z = this.kbd.right = false;
        requestAnimationFrame(this.update.bind(this));

    };


    const Tetromino = function (this: any, x: any, y: any, shape: any, color: any) {
        this.x = x;
        this.y = y;
        this.shape = shape;
        this.color = color;
        this.shapeIdx = 0;
    };

    Tetromino.prototype.rotate = function (board: any, ccw: any) {
        const prevIdx = this.shapeIdx;

        if (!ccw) {
            this.shapeIdx = (this.shapeIdx + 1) %
                this.shape.length;
        }
        else {
            this.shapeIdx = ((this.shapeIdx - 1) +
                this.shape.length) %
                this.shape.length;
        }

        if (this.checkConflict(board)) {
            this.shapeIdx = prevIdx;
            return false;
        }

        return true;
    };

    Tetromino.prototype.move = function (dir: any, board: any) {
        const savedPosition = { x: this.x, y: this.y };

        if (dir === "left") {
            this.x--;
        }
        else if (dir === "right") {
            this.x++;
        }
        else if (dir === "down") {
            this.y++;
        }

        if (this.checkConflict(board)) {
            this.x = savedPosition.x;
            this.y = savedPosition.y;
            return false;
        }

        return true;
    };

    Tetromino.prototype.kill = function (board: any) {
        for (let i = 0; i < this.shape[this.shapeIdx].length; i++) {
            for (let j = 0; j < this.shape[this.shapeIdx][i].length; j++) {
                if (this.shape[this.shapeIdx][i][j] === "1" &&
                    board[this.y + i] && board[this.y + i][this.x + j]) {
                    board[this.y + i][this.x + j] = this.color;
                }
            }
        }
    };

    Tetromino.prototype.checkConflict = function (board: any) {
        for (let i = 0; i < this.shape[this.shapeIdx].length; i++) {
            for (let j = 0; j < this.shape[this.shapeIdx][i].length; j++) {
                if (this.shape[this.shapeIdx][i][j] === "1" &&
                    (!board[this.y + i] || !board[this.y + i][this.x + j] ||
                        board[this.y + i][this.x + j] !== "0") && this.y + i >= 0) {
                    return true;
                }
            }
        }

        return false;
    };

    Tetromino.prototype.drop = function (board: any) {
        while (this.move("down", board)) {/**/ }
        this.kill(board);
    };

    Tetromino.prototype.draw = function (ctx: any, board: any, grid: any) {
        ctx.fillStyle = this.color;

        for (let i = 0; i < this.shape[this.shapeIdx].length; i++) {
            for (let j = 0; j < this.shape[this.shapeIdx][i].length; j++) {
                if (this.shape[this.shapeIdx][i][j] === "1") {
                    ctx.fillRect((this.x + j) * grid, (this.y + i) * grid, grid, grid);
                    ctx.strokeRect((this.x + j) * grid, (this.y + i) * grid, grid, grid);
                }
            }
        }
    };
    const game = new (Tetris as any)(
        document.getElementById("canvas"),
        document.getElementById("canvas-figure")
    ).init();
}