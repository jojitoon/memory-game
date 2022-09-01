import React from 'react';
import './App.css';
import { MemoryGame, Menu } from 'pages';
import { GameSettings } from 'types';

function App() {
  const [gameSettings, setGameSettings] = React.useState<GameSettings | null>(
    null
  );

  return gameSettings ? (
    <MemoryGame gameSettings={gameSettings} setGameSettings={setGameSettings} />
  ) : (
    <Menu onPlayStart={setGameSettings} />
  );
}

export default App;
