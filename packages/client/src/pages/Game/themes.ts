/* Если кто-то будет добавлять тему
 *
 * Фоновая картинка, музыка (в количестве одного трека) и звуки (в количестве пяти вариаций
 *  - ускоренное падение,
 *  - падение,
 *  - убирание ряда,
 *  - начало игры,
 *  - конец игры) добавляются полуавтоматически.
 * Если нужны какие-то другие варианты звуков на события, либо анимация,
 * то добавлять самостоятельно.
 *
 * Чтобы добавить тему фон + музыка + звуки, нужно
 *  - поставить импорты звуков,
 *  - дополнить константы themes, ThemesNames, themesOptions, musicTrackTime
 * Вроде должно работать
 *
 */

import manBasic from './../../assets/img/man/man-basic.png';
import manHeadLeft from './../../assets/img/man/man-basic-head-left.png';
import manLeftLegUP from './../../assets/img/man/man-left-leg-up.png';
import manRightLegUp from './../../assets/img/man/man-right-leg-up.png';
import manEnd1 from './../../assets/img/man/man-going-left.png';
import manEnd2 from './../../assets/img/man/man-fist-1.png';
import manEnd3 from './../../assets/img/man/man-fist-2.png';

import shark1 from './../../assets/img/shark/shark-1.png';
import shark2 from './../../assets/img/shark/shark-2.png';
import sharkM1 from './../../assets/img/shark/shark-mirror-1.png';
import sharkM2 from './../../assets/img/shark/shark-mirror-2.png';
import sharkEnd1 from './../../assets/img/shark/shark-sad.png';
import sharkEnd2 from './../../assets/img/shark/shark-sad-2.png';

import splash from './../../assets/sounds/shark/splash.mp3';
import splashSm from './../../assets/sounds/shark/splash-sm.mp3';
import swirl from './../../assets/sounds/shark/swirl.mp3';
import laughter from './../../assets/sounds/shark/villain-laughter.mp3';
import pouring from './../../assets/sounds/shark/water-pouring-a.mp3';

import end from './../../assets/sounds/light/end.mp3';
import line from './../../assets/sounds/light/line.mp3';
import position from './../../assets/sounds/light/position.mp3';
import start from './../../assets/sounds/light/start.mp3';

import jaws from './../../assets/music/jaws.mp3';
import tetris from './../../assets/music/TECHNOTRIS.mp3';

export type StringObject = Record<string, string>;

export interface ThemeProps {
  sounds?: ThemeSounds;
  music?: string;
  images?: Record<string, StringObject> | StringObject | string;
  backgroundImg?: string;
}

export interface ThemeSounds {
  start?: string; // начало игры
  end?: string; // конец игры
  fall?: string; // быстрая установка (пробел)
  position?: string; // обычная установка
  line?: string; // собран ряд
}

export const man: Record<string, string> = {
  basic: manBasic,
  head: manHeadLeft,
  leftLeg: manLeftLegUP,
  rightLeg: manRightLegUp,
  end1: manEnd1,
  end2: manEnd2,
  end3: manEnd3,
};

export const shark: Record<string, string> = {
  basic: shark1,
  left: shark2,
  basicM: sharkM1,
  leftM: sharkM2,
  end1: sharkEnd1,
  end2: sharkEnd2,
};

export const sharkMusic = jaws;

export const sharkSounds = {
  start: pouring,
  end: laughter,
  fall: splash,
  position: splashSm,
  line: swirl,
};

export const classicMusic = tetris;

export const classicSounds = {
  start: start,
  end: end,
  fall: position,
  position: position,
  line: line,
};

export const themes: Record<string, ThemeProps> = {
  shark: {
    // обозначение темы
    sounds: sharkSounds, // звуки в формате ThemeSounds
    music: sharkMusic, // музыкальная запись 1 штука
    images: {
      // картинки для анимации
      man: man,
      shark: shark,
    },
    backgroundImg: './../src/assets/img/shark/beach.jpg', // картинка на фон
  },
  classic: {
    sounds: classicSounds,
    music: classicMusic,
    backgroundImg: '',
  },
};

export type ThemesNames = 'classic' | 'shark';

export const themesOptions: Record<string, ThemesNames> = {
  // Обозначение в селекте тем : обозначение темы
  Классическая: 'classic',
  Челюсти: 'shark',
};

export const musicTrackTime: Record<ThemesNames, number> = {
  classic: 0,
  shark: 0,
};

export interface ThemeFlags {
  classic?: boolean;
  shark?: boolean;
}

export type SoundControls = {
  context: AudioContext;
  track: MediaElementAudioSourceNode;
  gainNode: GainNode;
};
