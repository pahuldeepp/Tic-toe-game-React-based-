import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
import { useState } from "react";
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";

import GameOver from "./component/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Helper to determine whose turn it is
function deriveActivePlayer(gameTurns) {
  if (gameTurns.length === 0 || gameTurns[0].player === 'O') {
    return 'X';
  }
  return 'O';
}

function App() {
  const [players, setPlayers]= useState({
    X: 'Player 1',
    O :'Player 2'
  })

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  // Deep copy of initial game board
  const gameBoard = initialGameBoard.map(row => [...row]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    gameBoard[square.row][square.col] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
 
    const [a, b, c] = combination;
    const first = gameBoard[a.row][a.column];
    const second = gameBoard[b.row][b.column];
    const third = gameBoard[c.row][c.column];

    if (first && first === second && first === third) {
      winner = players[first];
      break;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    if (gameBoard[rowIndex][colIndex] || winner) return; // Prevent overwriting or playing after game end

    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]); // Clear all turns to restart game
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayer=>{
      return {
        ... prevPlayer,
        [symbol]:newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}  onChangeName={handlePlayerNameChange}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>

        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
