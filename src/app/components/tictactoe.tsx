"use client";

import { useState } from 'react';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (!board.includes('')) {
      setWinner('Draw');
    }
  };

  const renderCell = (i: number) => {
    return (
      <button
        className='w-16 h-16 border border-black flex justify-center items-center text-3xl font-bold focus:outline-none '
        
        onClick={() => handleClick(i)}
      >
        {board[i]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <div className='flex flex-col object-fit items-center justify-center place-content-center '>
      <div className='grid grid-cols-3 gap-1 bordr-2 '>
        {board.map((cell, index) => (
          <div key={index}>{renderCell(index)}</div>
        ))}
      </div>
      <div className='mt-4 self-center px-4 py-2 gap-4 item-center justify-between'>
        {winner ? (
          <div className='bg-black flex-wrap py-4 px-2 gap-4 border-1 rounded-md justify-center item-center'>
            {winner === 'Draw' ? (
              <p className='text-xl font-semibold text-blue-300 place-content-center justify-self-center'>Its a Draw!</p>
            ) : (
              <p className='text-xl font-semibold text-teal-200 place-content-center justify-self-center'>Player {winner} wins!</p>
            )}
            <button
              className='px-4 py-2 gap-4 border-1 bg-teal-300 text-black rounded-md mt-2 justify-between item-center'
              onClick={resetGame}
            >
              Reset Game
            </button>
          </div>
        ) : (
            <p>Next Player: {xIsNext ? 'X' : 'O'}</p>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;