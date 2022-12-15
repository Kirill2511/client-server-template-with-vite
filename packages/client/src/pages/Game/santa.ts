import santaRigth from '../../themes/newYear/img/background/123.jpg';
import santaLeft from '../../themes/newYear/img/background/123-mirrow.png';
import santaEnd from '../../themes/newYear/img/background/444.png';
import santaStart from '../../themes/newYear/img/background/555.png';
export const startSanta = (canvas: HTMLCanvasElement, index0: number, direction0: number, x0: number, y0: number) => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  let index = index0;
  let direction = direction0;
  let x = x0;
  let y = y0;
  let isStart = true;
  const init = () => {
    document.addEventListener('keydown', handleMove);
    setInterval(anim, 10);
  };
  let santaImg = santaRigth;

  function update() {
    if (context && isStart) {
      const santa = new Image();
      santa.src = santaImg;
      context.fillStyle = 'black';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      const sani = new Image();
      sani.src = santaStart;
      context.drawImage(sani, 0, 0, 1000, 1600, 20, 450, 600, 800);
      if (santaImg === santaRigth) {
        context.drawImage(santa, index * 150, direction * 150, 150, 150, x, y, 150, 150);
      } else if (santaImg === santaLeft) {
        context.drawImage(santa, index * 150, direction * 150, 150, 150, x, y, 150, 150);
      } else if (santaImg === santaEnd) {
        const move = () => {
          for (let i = 0; i < 200; i += 5) {
            x += i / 500;
            y -= (2 * i) / 500;
          }
          setTimeout(() => {
            isStart = false;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.clearRect(0, 0, canvas.width, canvas.height);
          }, 1000);
        };

        setTimeout(move, 2000);
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(santa, 0, 0, 1000, 1600, x, y, 400, 800);
      }
    }
    if (0 < x && x < 50 && 400 < y && y < 450) {
      return end(x, y);
    }
  }
  function draw() {
    if (context) {
      context.drawImage(canvas, 0, 0, context.canvas.width, context.canvas.height);
    }
  }

  const end = (x0: number, y0: number) => {
    x = x0;
    y = y0;
    index = 0;
    direction = 0;
    santaImg = santaEnd;
    document.removeEventListener('keydown', handleMove);
  };
  // Main animation loop
  function anim() {
    update();
    draw();
  }
  const handleMove = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp': {
        index++;
        if (index > 3) {
          index = 0;
          direction++;
          if (direction > 3) {
            direction = 0;
          }
        }
        if (y > 0) {
          y -= 2;
        }
        break;
      }
      case 'ArrowDown': {
        index++;
        if (index > 3) {
          index = 0;
          direction++;
          if (direction > 3) {
            direction = 0;
          }
        }
        if (y + 64 < context.canvas.height - 75) {
          y += 15;
        }
        break;
      }
      case 'ArrowLeft': {
        index--;
        if (index < 0) {
          index = 3;
          direction++;
          if (direction > 3) {
            direction = 0;
          }
        }
        santaImg = santaLeft;
        if (x > 0) {
          x -= 5;
        }
        break;
      }
      case 'ArrowRight': {
        index++;
        if (index > 3) {
          index = 0;
          direction++;
          if (direction > 3) {
            direction = 0;
          }
        }
        santaImg = santaRigth;
        if (x + 75 < context.canvas.width - 35) {
          x += 5;
        }
        break;
      }
    }
  };
  return init();
};
