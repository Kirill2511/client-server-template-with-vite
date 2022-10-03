import React, { useEffect, useRef, useState } from 'react';
import './game.scss'
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
                context.fillRect(0, 0, context.canvas.width, context.canvas.height)
                contextFigure.fillStyle = '#B0E0E6'
                contextFigure.fillRect(0, 0, context.canvas.width, context.canvas.height)
            }
        }
    }, [])
    return (
        <div className='game-container'>
            <div className='menu-game'>
                <h2>меню</h2>
                <p>пункт меню</p>
                <p>пункт меню</p>
                <p>пункт меню</p>
                <p>пункт меню</p>
                <p>пункт меню</p>
            </div>
            <div className='game-screen'>
                <canvas ref={canvasRef} id="canvas" ></canvas>
                {!IsGameStarted &&
                    <div className="button-wrapper">
                        <div className="button-wrapper-inner">
                            <button className='start-btn' onClick={() => setIsGameStarted(true)}>Начать игру</button>
                        </div>
                    </div>
                }
                {IsGameStarted && <>
                    <div className="button-wrapper">
                        <div className="button-wrapper-inner">
                            <button className='start-btn' onClick={() => setIsGameStarted(false)}>Вернуться назад</button>
                        </div>
                    </div>
                </>
                }
            </div>
            <div className='game-info'>
                <canvas ref={canvasRefFigure} id="canvas-figure" ></canvas>
                <div className='game-score'>
                    сама фигура
                </div>
            </div>
        </div>
    )
};

export default Game;