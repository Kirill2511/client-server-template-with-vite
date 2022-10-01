import React, { useEffect, useRef } from 'react';

const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const context = canvas.getContext('2d')
            if (context) {
                context.fillStyle = '#000000'
                context.fillRect(0, 0, context.canvas.width, context.canvas.height)
            }
        }
    }, [])
    return (
        <div className='game-container'>
            <div className='menu-game'></div>
            <h1>Game</h1>
            <canvas ref={canvasRef} id="canvas" width="300" height="150"></canvas>
            <div className='game-score'></div>
        </div>
    )
};

export default Game;