// import manBasic from './../../assets/img/man/man-basic.png';
// import manHeadLeft from './../../assets/img/man/man-basic-head-left.png';
// import manLeftLegUP from './../../assets/img/man/man-left-leg-up.png';
// import manRightLegUp from './../../assets/img/man/man-right-leg-up.png';

// import shark1 from './../../assets/img/shark/shark-1.png';
// import shark2 from './../../assets/img/shark/shark-2.png';
// import sharkM1 from './../../assets/img/shark/shark-mirror-1.png';
// import sharkM2 from './../../assets/img/shark/shark-mirror-2.png';

// import splash from './../../assets/sounds/shark/splash.mp3';
// import splashSm from './../../assets/sounds/shark/splash-sm.mp3';
// import swirl from './../../assets/sounds/shark/swirl.mp3';
// import laughter from './../../assets/sounds/shark/villain-laughter.mp3';
// import pouring from './../../assets/sounds/shark/water-pouring-a.mp3';

// import end from './../../assets/sounds/light/end.mp3';
// import line from './../../assets/sounds/light/line.mp3';
// import position from './../../assets/sounds/light/position.mp3';
// import start from './../../assets/sounds/light/start.mp3';

// import jaws from './../../assets/music/jaws.mp3';
// import sandman from './../../assets/music/Mr. Sandman.mp3';

export type Sequence = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export type TetrominoMatrix = (0 | 1)[][];
export const tetrominos: Record<Sequence, TetrominoMatrix> = {
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
export const colors: Record<Sequence, string> = {
  I: '#FFDD00',
  O: '#0DCAF0',
  T: '#EE82EE',
  S: '#CB0000',
  Z: '#FFA500',
  J: '#0000FF',
  L: '#008000',
};

export const gray = '#D9D9D9';
export const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

// export const man: Record<string, string> = {
//   basic: manBasic,
//   head: manHeadLeft,
//   leftLeg: manLeftLegUP,
//   rightLeg: manRightLegUp,
// };

// export const shark: Record<string, string> = {
//   basic: shark1,
//   left: shark2,
//   basicM: sharkM1,
//   leftM: sharkM2,
// };

// export const sharkMusic = jaws;

// export const sharkSounds = {
//   start: pouring,
//   end: laughter,
//   fall: splash,
//   position: splashSm,
//   line: swirl,
// };

// export const lightMusic = sandman;

// export const lightSounds = {
//   start: start,
//   end: end,
//   fall: position,
//   position: position,
//   line: line,
// };
