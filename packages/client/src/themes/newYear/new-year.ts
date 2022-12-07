import splash from './sounds/splash.mp3';
import splashSm from './sounds/splash-sm.mp3';
import swirl from './sounds/swirl.mp3';
import laughter from './sounds/villain-laughter.mp3';
import pouring from './sounds/water-pouring-a.mp3';

import jaws from './music/jaws.mp3';

import NewYear from './img/background/NY-BG.jpg';
import santa from './img/background/123.jpg';

export const Santa: Record<string, string> = {
  santa: santa,
};

export const NYsharkMusic = jaws;

export const NYsharkSounds = {
  start: pouring,
  end: laughter,
  fall: splash,
  position: splashSm,
  line: swirl,
};

export const NYsharkBackground = NewYear;

export const NYsharkStroke = '#EEEEEE';

export const water = 'rgba(0, 188, 255, 0.2)';
