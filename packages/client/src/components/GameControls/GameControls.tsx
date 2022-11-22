import React, { FC } from 'react';

import arrowLeft from '../../assets/control-arrow-left.svg';
import arrowUp from '../../assets/control-arrow-up.svg';
import arrow from '../../assets/control-arrow-drop.svg';
import arrowDown from '../../assets/control-arrow-down.svg';
import arrowRight from '../../assets/control-arrow-right.svg';

import './GameControls.scss';

export const GameControls: FC = () => {
  return (
    <div className="game-controls">
      <button
        className="game-controls__button game-controls__button_vertical game-controls__button_border-left"
        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }))}
      >
        <img className="button__img" src={arrowLeft} alt="Влево" />
      </button>
      <span className="game-controls__button-wrapper">
        <button
          className="game-controls__button game-controls__button_horizontal"
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }))}
        >
          <img className="button__img" src={arrowUp} alt="Вверх" />
        </button>
        <button
          className="game-controls__button game-controls__button_horizontal"
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }))}
        >
          <img className="button__img" src={arrow} alt="Пробел" />
        </button>
        <button
          className="game-controls__button game-controls__button_horizontal"
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }))}
        >
          <img className="button__img" src={arrowDown} alt="Вниз" />
        </button>
      </span>
      <button
        className="game-controls__button game-controls__button_vertical game-controls__button_border-right"
        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }))}
      >
        <img className="button__img" src={arrowRight} alt="Вправо" />
      </button>
    </div>
  );
};
