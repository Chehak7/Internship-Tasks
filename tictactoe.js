import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Users } from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameCount, setGameCount] = useState(0);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (squares) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: combination };
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setScores(prev => ({ ...prev, [result.winner]: prev[result.winner] + 1 }));
    } else if (newBoard.every(cell => cell !== null)) {
      setWinner('draw');
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
    setGameCount(prev => prev + 1);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
    setGameCount(0);
    resetGame();
  };

  const getStatusMessage = () => {
    if (winner === 'draw') return "It's a draw!";
    if (winner) return `Player ${winner} wins! 🎉`;
    return `Player ${isXNext ? 'X' : 'O'}'s turn`;
  };

  const getCellContent = (index) => {
    const value = board[index];
    if (!value) return '';
    
    return (
      <span className={`
        text-4xl font-bold transition-all duration-300 transform
        ${value === 'X' ? 'text-blue-500' : 'text-red-500'}
        ${winner && winningLine.includes(index) ? 'scale-110 animate-pulse' : ''}
      `}>
        {value}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Trophy className="text-yellow-400" />
            Tic Tac Toe
          </h1>
          <p className="text-white/80">Classic game, modern style</p>
        </div>

        {/* Score Board */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-6">
            <div className="text-center">
              <div className="text-blue-400 text-2xl font-bold">{scores.X}</div>
              <div className="text-white/80 text-sm">Player X</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-white text-2xl font-bold">{scores.draws}</div>
              <div className="text-white/80 text-sm">Draws</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-red-400 text-2xl font-bold">{scores.O}</div>
              <div className="text-white/80 text-sm">Player O</div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="text-center mb-6">
          <div className={`
            text-xl font-semibold px-4 py-2 rounded-full inline-block
            ${winner ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}
          `}>
            {getStatusMessage()}
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-3 mb-8 max-w-xs mx-auto">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`
                w-24 h-24 rounded-2xl border-2 transition-all duration-300 
                flex items-center justify-center cursor-pointer
                ${cell ? 'bg-white/20 border-white/30' : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105'}
                ${winner && winningLine.includes(index) ? 'bg-green-500/30 border-green-400' : ''}
                ${!cell && !winner ? 'active:scale-95' : ''}
              `}
              disabled={!!cell || !!winner}
            >
              {getCellContent(index)}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <RotateCcw size={18} />
            New Game
          </button>
          <button
            onClick={resetScores}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Users size={18} />
            Reset Scores
          </button>
        </div>

        {gameCount > 0 && (
          <div className="text-center mt-4 text-white/60 text-sm">
            Game #{gameCount + 1}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;