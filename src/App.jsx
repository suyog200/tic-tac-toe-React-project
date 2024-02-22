import { useState } from 'react';
import React from 'react';
import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard';
import Log from './components/Log_/Log';
import { WINNING_COMBINATIONS } from './winning-combination';
import GameOver from './components/GameOver/GameOver';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};


const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];



function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  return gameBoard;
}

function derivedWinner(gameBoard, players) {
  console.log(gameBoard);
  let winner;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];


    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
      //winner = firstSquareSymbol;
    }

  };
  console.log(winner);

  return winner;
}

function App() {
  const [players , setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const [selectedSymbol1, setSelectedSymbol1] = useState("X");
  const [selectedSymbol2, setSelectedSymbol2] = useState("O");

  function derivedActivePlayer(gameTurns) {
    let currentPlayer = selectedSymbol1;
  
    if(gameTurns.length > 0 && gameTurns[0].player === selectedSymbol1) {
      currentPlayer = selectedSymbol2;
    }
  
    return currentPlayer;
  }

  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = derivedWinner(gameBoard, players);
  
  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const selectedSymbol = currentPlayer === selectedSymbol1 ? selectedSymbol1 : selectedSymbol2;

      const updateTurns = [
        {
          square : {
              row: rowIndex , 
              col: colIndex
          },
          player: currentPlayer,
          symbol: selectedSymbol
        }
        ,...prevTurns
      ];
        return updateTurns;
    });
  }

  function handleRestartGame() {
    setGameTurns([]);
  }

  function handPlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  function handleSelectedSymbol1(symbol) {
    setSelectedSymbol1(symbol);
    console.log(symbol)
  }

  function handleSelectedSymbol2(symbol) {
    setSelectedSymbol2(symbol);
    console.log(symbol)
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={PLAYERS.X} symbol={selectedSymbol1} isActive={activePlayer === 'X'} onChangeName={handPlayerNameChange} onSelectedSymbol={handleSelectedSymbol1}/>
          <Player initialName={PLAYERS.O} symbol={selectedSymbol2} isActive={activePlayer === 'O'} onChangeName={handPlayerNameChange} onSelectedSymbol={handleSelectedSymbol2}/>
        </ol>
        {(winner || hasDraw ) && <GameOver winner={winner} onRestart={handleRestartGame}/>}
        <GameBoard 
        onSelectSquare={handleSelectSquare}
        board = {gameBoard}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
