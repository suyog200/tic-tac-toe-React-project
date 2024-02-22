export default function GameOver({winner, onRestart}) {
    return (
        <div id="game-over">
            <h1>Game Over</h1>
            <h2>{winner ? `Winner: ${winner}` : 'Draw'}</h2>
            <button onClick={onRestart}>Rematch!</button>
        </div>
    );
}