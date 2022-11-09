import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import './game.scss';
import foto from '../../assets/avatar.svg';
import { Tetris } from './game-screen';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from './../../redux/actions/singActions';

export const Game: React.FC = () => {
  const [IsGameStarted, setIsGameStarted] = useState(false);
  const [gameNo, setGameNo] = useState(1);
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
  const canvasRefFigure = useRef() as MutableRefObject<HTMLCanvasElement>;
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lineCount, setLineCount] = useState(0);
  const [isGameEnded, setGameEnded] = useState(false);

  const getData = useCallback((score: number, level: number, lineCount: number) => {
    setScore(score);
    setLevel(level);
    setLineCount(lineCount);
  }, []);
  const getEnd = useCallback(() => {
    setGameEnded(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasFigure = canvasRefFigure.current;
    if (canvas && canvasFigure) {
      const context = canvas.getContext('2d');
      const contextFigure = canvasFigure.getContext('2d');
      if (context && contextFigure) {
        context.fillStyle = '#eee';
        context.strokeStyle = '#111';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.strokeRect(0, 0, context.canvas.width, context.canvas.height);
      }
    }
  }, []);

  const startGame = useCallback(() => {
    setIsGameStarted(true);
    setScore(0);
    setLevel(1);
    setLineCount(0);
    setGameNo(gameNo + 1);
  }, [gameNo]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await dispatch(logout());
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  const handleNewGame = useCallback(() => {
    setGameEnded(false);
    startGame();
  }, [startGame]);

  // TODO завернуть в useCallback

  return (
    <div className="game">
      <div className="game-menu">
        <h1 className="game-menu__header">Меню</h1>
        <h3 className=" menu-item" onClick={startGame}>
          Новая игра
        </h3>
        <h3 className="menu-item">
          <Link className="game-menu__link" to="/howto">
            Как играть
          </Link>
        </h3>
        <h3 className="menu-item">
          <Link className="game-menu__link" to="/leaderboard">
            Доска почета
          </Link>
        </h3>
        <h3 className="menu-item">
          <Link className="game-menu__link" to="/profile">
            Мой профиль
          </Link>
        </h3>
        <h3 className="menu-item">
          <Link className="game-menu__link" to="/phorum">
            Форум
          </Link>
        </h3>
        <h3 className=" menu-item game-menu__link_color-red" onClick={handleLogout}>
          Выйти
        </h3>
      </div>
      <div className="game-screen">
        <canvas className="game-screen__canvas" ref={canvasRef} id="canvas" width={500} height={1000}>
          {IsGameStarted && (
            <>
              <Tetris
                canvas={canvasRef.current}
                canvasFigure={canvasRefFigure.current}
                getDataUp={getData}
                sendEnd={getEnd}
                gameNo={gameNo}
              />
            </>
          )}
        </canvas>
        {!IsGameStarted && (
          <button className="game-screen__start-button" onClick={startGame}>
            Начать игру
          </button>
        )}
        {isGameEnded && (
          <div className="game-screen__game-end">
            <h3>Игра окончена!</h3>
            <p>Вы добрались до {level} уровня</p>
            <p>Ваш счет: {score} очков</p>
            <button className="game-screen__end-button" onClick={handleNewGame}>
              Играть снова
            </button>
          </div>
        )}
      </div>
      <div className="game-info">
        <div className="game-info__next-figure">
          <canvas className="game-info__canvas-figure" ref={canvasRefFigure} id="canvas-figure"></canvas>
        </div>
        <p>Следующая фигура</p>
        <div className="game-info__user-info">
          <img className="game-info__avatar" src={foto} alt="" />
          <Link className="game-info__user-name" to="/profile">
            Иван Иваныч Джагатай-Хан
          </Link>
        </div>
        <div className="game-info__score">
          <p>Счет: {score}</p>
          <p>Уровень: {level}</p>
          <p>Линии: {lineCount}</p>
        </div>
      </div>
    </div>
  );
};
