import React, { Component, ReactNode } from 'react';
import { colors, gray, Sequence, sequence, TetrominoMatrix, tetrominos, man, shark } from './constant';

type TetrisProps = {
  canvas: HTMLCanvasElement;
  canvasFigure: HTMLCanvasElement;
  getDataUp: (score: number, level: number, lineCount: number) => void;
  sendEnd: () => void;
  gameNo: number;
};

type Playfield = (Sequence | undefined)[][];

export class Tetris extends Component<TetrisProps> {
  private count = 0;
  private currentTetromino = this.getNextTetromino();
  private nextTetromino = this.getNextTetromino();
  private gameOver = false;
  private paused = false;
  private title: string;
  private width: number;
  private height: number;
  private canvas: HTMLCanvasElement;
  private canvasFigure: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private ctxFigure: CanvasRenderingContext2D;
  private tetrominoSequence: string[] = [];
  private playfield: Playfield = [];
  private tetrominos = tetrominos;
  private colors = colors;
  private sequence = sequence;
  private score = 0;
  private lineCount = 0;
  private level = 0;
  private speed = 1000;
  private shareData;
  private sendEnd;
  private gameNo: number;
  private cellSize = 50;
  private sharkMode = true;
  private manPic = 0;
  private timestamp = 0;

  private sharkCoords = {
    x: 0,
    y: 0,
  };
  private sharkForward = true;
  private sharkStep = 10;

  public constructor(props: TetrisProps) {
    super(props);
    const { canvas, canvasFigure, getDataUp, sendEnd, gameNo } = props;
    this.canvas = canvas;
    this.canvasFigure = canvasFigure;
    this.title = 'canvas';
    this.width = 10;
    this.height = 20;
    this.shareData = getDataUp;
    this.sendEnd = sendEnd;
    this.gameNo = gameNo;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctxFigure = this.canvasFigure.getContext('2d') as CanvasRenderingContext2D;
  }

  componentDidMount(): void {
    this.onKeypress();
    this.init();
  }

  componentWillUnmount(): void {
    this.removeKeypress();
  }

  componentDidUpdate(prevProps: Readonly<TetrisProps>): void {
    if (prevProps.gameNo != this.props.gameNo) {
      this.gameOver = false;
      this.nextTetromino = this.getNextTetromino();
      this.currentTetromino = this.nextTetromino;
      this.init();
    }
  }

  private createCanvas(): void {
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawWorld() {
    this.ctx.beginPath();
    for (let x = 0; x < this.width + 1; x++) {
      this.ctx.moveTo(this.cellSize * x, 0);
      this.ctx.lineTo(this.cellSize * x, this.height * this.cellSize);
    }
    for (let y = 0; y < this.height + 1; y++) {
      this.ctx.moveTo(0, this.cellSize * y);
      this.ctx.lineTo(this.width * this.cellSize, this.cellSize * y);
    }
    this.ctx.stroke();
  }

  // для акул

  private drawWater(end: number) {
    this.ctx.fillStyle = 'rgba(0, 188, 255, 0.1)';
    this.ctx.fillRect(0, this.canvas.height - end + 15, this.canvas.width, this.canvas.height);
  }

  private drawMan() {
    const img = new Image();
    const randomNo = this.manPic;
    if (randomNo < 0.3) {
      img.src = man.basic;
    } else if (randomNo >= 0.3 && randomNo < 0.5) {
      img.src = man.head;
    } else if (randomNo >= 0.5 && randomNo < 0.8) {
      img.src = man.leftLeg;
    } else {
      img.src = man.rightLeg;
    }
    this.ctx.drawImage(img, this.cellSize * 2, 0);
  }

  private makeManPic() {
    this.manPic = Math.random();
    if (!this.gameOver) {
      setTimeout(() => {
        this.makeManPic();
        if (this.sharkForward && this.sharkCoords.x + this.cellSize * 3 < this.canvas.width) {
          this.sharkCoords.x += this.sharkStep;
        } else if (this.sharkForward && this.sharkCoords.x + this.cellSize * 3 >= this.canvas.width) {
          this.sharkForward = false;
          this.sharkCoords.x -= this.sharkStep;
        } else if (!this.sharkForward && this.sharkCoords.x > 0) {
          this.sharkCoords.x -= this.sharkStep;
        } else if (!this.sharkForward && this.sharkCoords.x <= 0) {
          this.sharkForward = true;
          this.sharkCoords.x += this.sharkStep;
        }
      }, 200);
    }
  }

  private drawShark() {
    const img = new Image();
    const randomNo = this.manPic;
    if (randomNo < 0.5) {
      img.src = this.sharkForward ? shark.basicM : shark.basic;
    } else if (randomNo >= 0.5) {
      img.src = this.sharkForward ? shark.leftM : shark.left;
    }
    this.ctx.drawImage(img, this.sharkCoords.x, this.sharkCoords.y);
  }

  // END для акул

  private init() {
    this.createCanvas();
    this.tetrominoSequence = [];
    this.playfield = [];
    for (let row = -2; row < 20; row++) {
      this.playfield[row] = [];
      for (let col = 0; col < 10; col++) {
        this.playfield[row][col] = undefined;
      }
    }
    this.score = 0;
    this.lineCount = 0;
    this.level = 0;
    this.speed = 1000;
    this.timestamp = Date.now();
    this.count = 0;
    this.sharkCoords = {
      x: 0,
      y: 0,
    };
    this.sharkForward = true;
    this.drawWorld();
    this.generateSequence();
    const step = () => {
      if (!this.gameOver) {
        requestAnimationFrame(step);
        this.loop();
      }
    };
    step();
    this.makeManPic();
  }

  private generateSequence() {
    this.sequence = sequence.slice();
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

  private getNextTetromino() {
    this.tetrominos = tetrominos;
    this.tetrominoSequence = [];
    this.generateSequence();
    const name = this.tetrominoSequence.pop() as Sequence;
    const matrix = this.tetrominos[name];
    const col = 4;
    const row = name == 'I' ? -2 : -1;
    return {
      name: name,
      matrix: matrix,
      row: row,
      col: col,
    };
  }

  private rotate(matrix: TetrominoMatrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
    return result;
  }

  private isValidMove({
    matrix = this.currentTetromino.matrix,
    row = this.currentTetromino.row,
    col = this.currentTetromino.col,
  }) {
    const cellCol = col;
    const cellRow = row;
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

  private placeTetromino() {
    let linesAtOnce = 0;
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
      if (this.playfield[row].every((cell) => !!cell)) {
        linesAtOnce++;
        this.lineCount++;
        if (this.lineCount >= 10 && this.lineCount % 10 == 0) {
          this.level++;
          this.speed -= 50;
        }
        for (let r = row; r >= 0; r--) {
          for (let c = 0; c < this.playfield[r].length; c++) {
            this.playfield[r][c] = this.playfield[r - 1][c];
          }
        }
      } else {
        row--;
      }
    }
    let ratio = 0;
    switch (linesAtOnce) {
      case 0:
        break;
      case 1:
        ratio = 40;
        break;
      case 2:
        ratio = 100;
        break;
      case 3:
        ratio = 300;
        break;
      default:
        ratio = 1200;
        break;
    }
    this.score += ratio * (this.level + 1);
    this.shareData(this.score, this.level, this.lineCount);

    for (let i = 0; i < this.playfield[0].length; i++) {
      if (this.playfield[0][i] != undefined) {
        return this.showGameOver();
      }
    }
    this.currentTetromino = this.nextTetromino;
    this.nextTetromino = this.getNextTetromino();
  }

  private showGameOver() {
    this.gameOver = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawWorld();
    for (let row = -2; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        if (this.playfield[row][col]) {
          this.ctx.fillStyle = gray;
          this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize - 1, this.cellSize - 1);
        }
      }
    }
    this.sendEnd();
  }

  private pause() {
    this.paused = true;
    if (this.paused) {
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

  private loop() {
    if (this.gameOver || this.paused) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawWorld();
    let upperRow = 0;
    for (let row = 0; row < 20; row++) {
      let filled = 0;
      for (let col = 0; col < 10; col++) {
        if (this.playfield[row][col]) {
          filled++;
          const name = this.playfield[row][col];
          this.ctx.fillStyle = name ? this.colors[name] : 'white';
          this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize - 1, this.cellSize - 1);
        }
      }
      if (filled > 0) {
        upperRow++;
      }
    }
    if (this.sharkMode) {
      this.drawWater((upperRow + 1) * this.cellSize);
      this.drawMan();
      this.sharkCoords.y = this.canvas.height - this.cellSize - upperRow * this.cellSize;
      this.drawShark();
    }
    if (this.nextTetromino) {
      this.ctxFigure.clearRect(0, 0, this.canvasFigure.width, this.canvasFigure.height);
      for (let i = 0; i < this.nextTetromino.matrix.length; i++) {
        for (let j = 0; j < this.nextTetromino.matrix[i].length; j++) {
          if (this.nextTetromino.matrix[i][j] === 1) {
            let margin = 1.5;
            if (this.nextTetromino.name === 'I') margin = 1;
            else if (this.nextTetromino.name === 'O') margin = 2;
            this.ctxFigure.fillStyle = this.colors[this.nextTetromino.name];
            this.ctxFigure.fillRect(
              (j + margin) * (this.cellSize / 1.5),
              (i + margin) * (this.cellSize / 1.5),
              this.cellSize / 1.5 - 1,
              this.cellSize / 1.5 - 1,
            );
          }
        }
      }
    }
    if (this.currentTetromino) {
      if (Date.now() - this.timestamp > this.speed) {
        this.currentTetromino.row++;
        this.count = 0;
        this.timestamp = Date.now();
        if (!this.isValidMove({})) {
          this.currentTetromino.row--;
          this.placeTetromino();
        }
      }

      this.ctx.fillStyle = this.gameOver ? gray : this.colors[this.currentTetromino.name];
      for (let row = 0; row < this.currentTetromino.matrix.length; row++) {
        for (let col = 0; col < this.currentTetromino.matrix[row].length; col++) {
          if (this.currentTetromino.matrix[row][col]) {
            this.ctx.fillRect(
              (this.currentTetromino.col + col) * this.cellSize,
              (this.currentTetromino.row + row) * this.cellSize,
              this.cellSize - 1,
              this.cellSize - 1,
            );
          }
        }
      }
    }
  }

  private MyClick = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW': {
        const matrix = this.rotate(this.currentTetromino.matrix);
        if (this.isValidMove({ matrix })) {
          this.currentTetromino.matrix = matrix;
        }
        break;
      }
      case 'ArrowDown':
      case 'KeyS': {
        const row = this.currentTetromino.row + 1;
        if (!this.isValidMove({ row })) {
          this.currentTetromino.row = row - 1;
          this.placeTetromino();
          return;
        }
        this.currentTetromino.row = row;
        break;
      }
      case 'ArrowLeft':
      case 'KeyA': {
        const col = this.currentTetromino.col - 1;
        if (this.isValidMove({ col })) {
          this.currentTetromino.col = col;
        }
        break;
      }
      case 'ArrowRight':
      case 'KeyD': {
        const col = this.currentTetromino.col + 1;
        if (this.isValidMove({ col })) {
          this.currentTetromino.col = col;
        }
        break;
      }
      case 'KeyP': {
        this.paused = !this.paused;
        if (this.paused) {
          this.pause();
        }
        break;
      }
      case 'Space': {
        while (this.isValidMove({})) {
          this.currentTetromino.row++;
        }
        if (!this.isValidMove({})) {
          this.currentTetromino.row--;
          this.placeTetromino();
        }
        break;
      }
      case 'Enter': {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        break;
      }
    }
  };
  private onKeypress() {
    document.addEventListener('keydown', this.MyClick);
  }

  private removeKeypress() {
    document.removeEventListener('keydown', this.MyClick);
  }

  public render(): ReactNode {
    return <div></div>;
  }
}
