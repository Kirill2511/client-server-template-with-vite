export type sequence = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export const tetrominos: Record<sequence, number[][]> = {
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
export type ColorsType = {
  [key: string]: string;
};
export enum Colors {
  I = 'cyan',
  O = 'yellow',
  T = 'purple',
  S = 'green',
  Z = 'red',
  J = 'blue',
  L = 'orange',
}
