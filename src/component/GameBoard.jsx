import { useState } from "react";


export default function GameBoard({onSelectSquare, board}) {
 


  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymb, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymb!==null}>
                  {playerSymb}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
