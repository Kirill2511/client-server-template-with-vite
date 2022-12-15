import splash from './sounds/splash.mp3';
import splashSm from './sounds/splash-sm.mp3';
import swirl from './sounds/swirl.mp3';
import laughter from './sounds/villain-laughter.mp3';
import pouring from './sounds/water-pouring-a.mp3';

import jaws from './music/jaws.mp3';

import NewYear from './img/background/NY-BG.jpg';
import santa from './img/background/123.jpg';
import santaLeft from './img/background/123-mirrow.png';
import santaEnd from './img/background/444.png';
import santaStart from './img/background/555.png';

export const Santa: Record<string, string> = {
  santa: santa,
  santaL: santaLeft,
  santaSled: santaStart,
  santaE: santaEnd,
};

export const NYsharkMusic = jaws;

export const NYsharkSounds = {
  start: pouring,
  end: laughter,
  fall: splash,
  position: splashSm,
  line: swirl,
};

export const NewYearBackground = NewYear;

export const NYsharkStroke = '#EEEEEE';

export const water = 'rgba(0, 188, 255, 0.2)';
