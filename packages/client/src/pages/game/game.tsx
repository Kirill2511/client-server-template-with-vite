import React, { useEffect, useRef, useState } from 'react';
import { start } from '../hook';
import './game.scss'
import foto from '../../assets/222.jpg'
const Game: React.FC = () => {
    const [IsGameStarted, setIsGameStarted] = useState(false)

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvasRefFigure = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const canvasFigure = canvasRefFigure.current
        if (canvas && canvasFigure) {
            const context = canvas.getContext('2d')
            const contextFigure = canvasFigure.getContext('2d')
            if (context && contextFigure) {
                context.fillStyle = '#B0E0E6'
                // context.textAlign = "center";
                // context.textBaseline = "middle";
                // context.strokeText("Game Over", 30, 50);
                context.fillRect(0, 0, context.canvas.width, context.canvas.height)
                // contextGameOver.strokeText('Game Over', 10, 100);
                // contextGameOver.font = "40px Courier";
                // contextGameOver.fillStyle = '#000'

                // contextFigure.fillRect(0, 0, context.canvas.width, context.canvas.height)
            }
        }
    }, [])
    const startGame = () => {
        setIsGameStarted(true)
        start()
    }

    return (
        <div className='game-container'>
            <div className='menu-game'>
                <h2>меню</h2>
                <li>новая игра</li>
                <li>как играть</li>
                <li>доска почета</li>
                <li>мой профиль</li>
                <li>форум</li>
                <li>ночная тема</li>
                <li>настройки</li>
                <li>выйти</li>
            </div>
            <div className='game-screen'>
                <canvas ref={canvasRef} id="canvas" ></canvas>
                <div className="button-wrapper">
                    <div className="button-wrapper-inner">
                        {!IsGameStarted &&
                            <button className='start-btn' onClick={startGame}>Начать игру</button>
                        }
                        <div className='game-over'>
                            <h2>
                                GameOver
                            </h2>
                            <p className='level'></p>
                            <p className='score'></p>
                            <button>Играть снова</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='game-info'>
                <canvas ref={canvasRefFigure} id="canvas-figure" ></canvas>
                <img className='avatar' src={foto} alt="" />
                <p>Счет</p>
                <p>Уровень</p>
                <p>Линии</p>
            </div>
            {/* следующая фигура */}
        </div>
    )
};

export default Game;