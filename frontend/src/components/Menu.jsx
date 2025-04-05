import React from 'react';

const Menu = ({ onStartGame, onShowInstructions }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-center drop-shadow-md">
        AI Codenames
      </h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={onStartGame}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-xl text-lg font-semibold transition-all duration-300"
        >
          Start Game
        </button>

        <button
          onClick={onShowInstructions}
          className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl text-lg font-semibold transition-all duration-300"
        >
          How to Play
        </button>
      </div>

      <footer className="absolute bottom-4 text-sm text-gray-300">
        Play codenames against an AI
      </footer>
    </div>
  );
};

export default Menu;
