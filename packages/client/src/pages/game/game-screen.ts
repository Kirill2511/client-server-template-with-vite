import { Colors, ColorsType, sequence, tetrominos } from './constant';

export class Tetris {
  private myOnClick = this.MyClick.bind(this);
  public count = 0;
  public currentTetromino = this.getNextTetromino();
  public nextTetromino = this.getNextTetromino();
  public gameOver = false;
  public paused = false;
  public title: string;
  public width: number;
  public height: number;
  public canvasRef: React.RefObject<HTMLCanvasElement>;
  public canvasRefFigure: React.RefObject<HTMLCanvasElement>;
  public canvas: HTMLCanvasElement | null;
  public canvasFigure: HTMLCanvasElement | null;
  public ctx: CanvasRenderingContext2D | null | undefined;
  public ctxFigure: CanvasRenderingContext2D | null | undefined;
  private tetrominoSequence: string[] = [];
  public playfield: any[] = [];
  public tetrominos = tetrominos;
  public colors: ColorsType = Colors;
  public sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  CELL_SIZE = 50;

  public constructor(
    title: string,
    width: number,
    height: number,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    canvas: HTMLCanvasElement | null,
    canvasRefFigure: React.RefObject<HTMLCanvasElement>,
    canvasFigure: HTMLCanvasElement | null,
  ) {
    this.canvas = canvas;
    this.canvasRef = canvasRef;
    this.canvasFigure = canvasFigure;
    this.canvasRefFigure = canvasRefFigure;
    this.title = title;
    this.width = width;
    this.height = height;
    this.createCanvas();
  }

  public createCanvas(): void {
    if (this.canvas && this.canvasRef.current && this.canvasFigure && this.canvasRefFigure.current) {
      this.ctx = this.canvasRef.current.getContext('2d');
      this.ctxFigure = this.canvasRefFigure.current.getContext('2d');
      if (this.ctx && this.ctxFigure) {
        this.ctx.fillStyle = '#B0E0E6';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
  public drawWorld() {
    if (this.ctx) {
      this.ctx.beginPath();
      for (let x = 0; x < this.width + 1; x++) {
        this.ctx.moveTo(this.CELL_SIZE * x, 0);
        this.ctx.lineTo(this.CELL_SIZE * x, this.height * this.CELL_SIZE);
      }
      for (let y = 0; y < this.height + 1; y++) {
        this.ctx.moveTo(0, this.CELL_SIZE * y);
        this.ctx.lineTo(this.width * this.CELL_SIZE, this.CELL_SIZE * y);
      }
      this.ctx.stroke();
    }
  }
  public init() {
    this.tetrominoSequence = [];
    this.playfield = [];
    for (let row = -2; row < 20; row++) {
      this.playfield[row] = [];
      for (let col = 0; col < 10; col++) {
        this.playfield[row][col] = 0;
      }
    }
    this.drawWorld();
    this.generateSequence();
  }
  public generateSequence() {
    this.sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    while (this.sequence.length) {
      const rand = getRandomInt(0, this.sequence.length - 1);
      const name = this.sequence.splice(rand, 1)[0];
      this.tetrominoSequence.push(name);
    }
  }
  public get nextTetronimo() {
    return this.nextTetromino;
  }
  public getNextTetromino() {
    this.tetrominos = {
      I: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      J: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      L: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      O: [
        [1, 1],
        [1, 1],
      ],
      S: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      Z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      T: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    };
    this.tetrominoSequence = [];
    this.generateSequence();
    const name = this.tetrominoSequence.pop();
    const matrix = this.tetrominos[(name || 'I') as sequence];
    const col = 5;
    const row = name === 'I' ? -1 : -2;
    return {
      name: name || 'I',
      matrix: matrix,
      row: row,
      col: col,
    };
  }
  public rotate(matrix: Array<[]>) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
    return result;
  }
  public isValidMove(matrix: number[][], cellRow: number, cellCol: number) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (
          matrix[row][col] &&
          (cellCol + col < 0 ||
            cellCol + col >= this.playfield[0].length ||
            cellRow + row >= this.playfield.length ||
            this.playfield[cellRow + row][cellCol + col])
        ) {
          return false;
        }
      }
    }
    return true;
  }
  public placeTetromino() {
    for (let row = 0; row < this.currentTetromino.matrix.length; row++) {
      for (let col = 0; col < this.currentTetromino.matrix[row].length; col++) {
        if (this.currentTetromino.matrix[row][col]) {
          if (this.currentTetromino.row + row < 0) {
            return this.showGameOver();
          }
          this.playfield[this.currentTetromino.row + row][this.currentTetromino.col + col] = this.currentTetromino.name;
        }
      }
    }
    for (let row = this.playfield.length - 1; row >= 0; ) {
      if (this.playfield[row].every((cell: number) => !!cell)) {
        for (let r = row; r >= 0; r--) {
          for (let c = 0; c < this.playfield[r].length; c++) {
            this.playfield[r][c] = this.playfield[r - 1][c];
          }
        }
      } else {
        row--;
      }
    }
    this.currentTetromino = this.nextTetromino;
    this.nextTetromino = this.getNextTetromino();
  }
  public showGameOver() {
    this.gameOver = true;
    document.removeEventListener('keydown', this.myOnClick);
    if (this.ctx && this.canvas) {
      this.ctx.fillStyle = 'black';
      this.ctx.globalAlpha = 0.75;
      this.ctx.fillRect(0, this.canvas.height / 2 - 30, this.canvas.width, 60);
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = 'white';
      this.ctx.font = '36px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('Игра окончена', this.canvas.width / 2, this.canvas.height / 2);
    }
  }
  public pause() {
    this.paused = !this.paused;
    if (this.paused && this.ctx && this.canvas && !this.gameOver) {
      this.ctx.fillStyle = 'black';
      this.ctx.globalAlpha = 0.75;
      this.ctx.fillRect(0, this.canvas.height / 2 - 30, this.canvas.width, 60);
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = 'white';
      this.ctx.font = '36px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('Пауза', this.canvas.width / 2, this.canvas.height / 2);
    }
  }
  public loop() {
    if (!this.gameOver && !this.paused && this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawWorld();
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
          if (this.ctx && this.playfield[row][col]) {
            const name = this.playfield[row][col];
            this.ctx.fillStyle = this.colors[name];
            this.ctx.fillRect(col * this.CELL_SIZE, row * this.CELL_SIZE, this.CELL_SIZE - 1, this.CELL_SIZE - 1);
          }
        }
      }
      if (this.nextTetromino && this.ctxFigure && this.canvasFigure) {
        this.ctxFigure.clearRect(0, 0, this.canvasFigure.width, this.canvasFigure.height);
        for (let i = 0; i < this.nextTetromino.matrix.length; i++) {
          for (let j = 0; j < this.nextTetromino.matrix[i].length; j++) {
            if (this.nextTetromino.matrix[i][j] === 1) {
              let margin = 1;
              if (this.nextTetromino.name === 'I') margin = 0.5;
              else if (this.nextTetromino.name === 'O') margin = 1.5;
              this.ctxFigure.fillStyle = this.colors[this.nextTetromino.name];
              this.ctxFigure.fillRect(
                (j + margin) * this.CELL_SIZE,
                (i + margin) * this.CELL_SIZE,
                this.CELL_SIZE - 1,
                this.CELL_SIZE - 1,
              );
            }
          }
        }
      }
      if (this.currentTetromino && this.ctx) {
        if (++this.count > 35) {
          this.currentTetromino.row++;
          this.count = 0;
          if (!this.isValidMove(this.currentTetromino.matrix, this.currentTetromino.row, this.currentTetromino.col)) {
            this.currentTetromino.row--;
            this.placeTetromino();
          }
        }
        this.ctx.fillStyle = this.colors[this.currentTetromino.name];
        for (let row = 0; row < this.currentTetromino.matrix.length; row++) {
          for (let col = 0; col < this.currentTetromino.matrix[row].length; col++) {
            if (this.currentTetromino.matrix[row][col]) {
              this.ctx.fillRect(
                (this.currentTetromino.col + col) * this.CELL_SIZE,
                (this.currentTetromino.row + row) * this.CELL_SIZE,
                this.CELL_SIZE - 1,
                this.CELL_SIZE - 1,
              );
            }
          }
        }
      }
    }
  }
  private MyClick(this: any, e: any) {
    switch (e.keyCode) {
      case 38: {
        const matrix = this.rotate(this.currentTetromino.matrix);
        if (this.isValidMove(matrix, this.currentTetromino.row, this.currentTetromino.col)) {
          this.currentTetromino.matrix = matrix;
        }
        break;
      }
      case 40: {
        const row = this.currentTetromino.row + 1;
        if (!this.isValidMove(this.currentTetromino.matrix, row, this.currentTetromino.col)) {
          this.currentTetromino.row = row - 1;
          this.placeTetromino();
          return;
        }
        this.currentTetromino.row = row;
        break;
      }
      case 37: {
        const col = this.currentTetromino.col - 1;
        if (this.isValidMove(this.currentTetromino.matrix, this.currentTetromino.row, col)) {
          this.currentTetromino.col = col;
        }
        break;
      }
      case 39: {
        const col = this.currentTetromino.col + 1;
        if (this.isValidMove(this.currentTetromino.matrix, this.currentTetromino.row, col)) {
          this.currentTetromino.col = col;
        }
        break;
      }
      case 13: {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        break;
      }
      case 90:
        this.pause();
        break;
    }
  }
  public onKeypress() {
    document.addEventListener('keydown', this.myOnClick);
  }
}
