import { useState } from 'react';
import Menu from './Menu.jsx';

function App() {
  const [screen, setScreen] = useState('menu');

  const handleStartGame = () => {
    setScreen('game');
  };

  const handleShowInstructions = () => {
    setScreen('instructions');
  };

  return (
    <>
      {screen === 'menu' && (
        <Menu
          onStartGame={handleStartGame}
          onShowInstructions={handleShowInstructions}
        />
      )}

      {screen === 'game' && (
        <div className="text-white text-center p-10">
          <h2 className="text-3xl font-bold">Game Component Coming Soon</h2>
          <button
            onClick={() => setScreen('menu')}
            className="mt-6 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Menu
          </button>
        </div>
      )}

      {screen === 'instructions' && (
        <div className="text-white text-center p-10">
          <h2 className="text-3xl font-bold mb-4">How to Play</h2>
          <p>Codenames is a game of association. You'll try to guess the right words based on a one-word clue...</p>
          <button
            onClick={() => setScreen('menu')}
            className="mt-6 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Menu
          </button>
        </div>
      )}
    </>
  );
}

export default App;
