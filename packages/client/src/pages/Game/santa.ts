import santaRigth from '../../themes/newYear/img/background/123.jpg';
export const startSanta = (canvas: HTMLCanvasElement) => {
  const canv = document.createElement('canvas');
  canv.id = 'canvasdummy';
  canv.height = 300;
  canv.width = 300;
  const context = canv.getContext('2d') as CanvasRenderingContext2D;
  const bufferctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let index = 0;
  let direction = 0;
  let x = 0;
  let y = 100;
  function init() {
    setInterval(anim, 10);
  }
  const santa = new Image();
  santa.src = santaRigth;
  function update() {
    if (bufferctx) {
      bufferctx.fillStyle = 'black';
      bufferctx.fillRect(0, 0, bufferctx.canvas.width, bufferctx.canvas.height);
      bufferctx.drawImage(santa, index * 150, direction * 150, 150, 150, x, y, 150, 150);
    }
  }
  function draw() {
    if (context) {
      context.drawImage(canvas, 0, 0, context.canvas.width, context.canvas.height);
    }
  }
  // Main animation loop
  function anim() {
    update();
    draw();
  }
  window.addEventListener(
    'keydown',
    function (e) {
      let keyCode = e.keyCode;
      /* eslint-disable */
      if (e.hasOwnProperty('key')) {
        keyCode = e.key.charCodeAt(index);
      }
      /* eslint-enable */
      if ([98, 100, 102, 104, 37, 38, 39, 40].indexOf(keyCode) !== -1) {
        index++;
        if (index > 3) {
          index = 0;
          direction++;
          if (direction > 3) {
            direction = 0;
          }
        }
        if (keyCode === 100 || keyCode === 37) {
          // Left
          if (x > 0) {
            x -= 2;
          }
        } else if (keyCode === 102 || keyCode === 39) {
          // Right
          if (x + 75 < bufferctx.canvas.width - 35) {
            x += 10;
          }
        } else if (keyCode === 98 || keyCode === 40) {
          // Down
          if (y + 64 < bufferctx.canvas.height - 75) {
            y += 2;
          }
        } else if (keyCode === 104 || keyCode === 38) {
          // Up
          if (y > 0) {
            y -= 2;
          }
        }
      }
    },
    false,
  );

  // Simply resets the frame so he is standing when he stops.
  window.addEventListener('keyup', function (e) {
    index = 0;
  });
  init();
};
