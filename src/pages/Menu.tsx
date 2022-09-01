import { Button } from 'components';
import { GameTheme } from 'enums';
import React from 'react';
import { GameSettings } from 'types';
import './page.css';

interface MenuProps {
  onPlayStart: (values: GameSettings) => void;
}

export const Menu: React.FC<MenuProps> = ({ onPlayStart }) => {
  const [theme, setTheme] = React.useState(GameTheme.NUMBER);
  const [numberOfPlayers, setNumberOfPlayers] = React.useState(1);
  const [gridSize, setGridSize] = React.useState(4);

  const handlePlayStart = () => {
    onPlayStart({
      theme,
      numberOfPlayers,
      gridSize,
    });
  };
  return (
    <div className='body'>
      <h2 className='menu-header'>memory</h2>
      <div className='menu'>
        <h3 className='menu-label'>Select Theme</h3>
        <div className='grid-2'>
          <Button
            isActive={theme === GameTheme.NUMBER}
            onClick={() => setTheme(GameTheme.NUMBER)}
            variant='tertiary'>
            Numbers
          </Button>
          <Button
            isActive={theme === GameTheme.ICON}
            onClick={() => setTheme(GameTheme.ICON)}
            variant='tertiary'>
            Icons
          </Button>
        </div>

        <h3 className='menu-label'>Number of Players</h3>
        <div className='grid-4'>
          <Button
            isActive={numberOfPlayers === 1}
            onClick={() => setNumberOfPlayers(1)}
            variant='tertiary'>
            1
          </Button>
          <Button
            isActive={numberOfPlayers === 2}
            onClick={() => setNumberOfPlayers(2)}
            variant='tertiary'>
            2
          </Button>
          <Button
            isActive={numberOfPlayers === 3}
            onClick={() => setNumberOfPlayers(3)}
            variant='tertiary'>
            3
          </Button>
          <Button
            isActive={numberOfPlayers === 4}
            onClick={() => setNumberOfPlayers(4)}
            variant='tertiary'>
            4
          </Button>
        </div>
        <h3 className='menu-label'>Grid Size</h3>
        <div className='grid-2'>
          <Button
            isActive={gridSize === 4}
            onClick={() => setGridSize(4)}
            variant='tertiary'>
            4x4
          </Button>
          <Button
            isActive={gridSize === 6}
            onClick={() => setGridSize(6)}
            variant='tertiary'>
            6x6
          </Button>
        </div>
        <Button
          onClick={handlePlayStart}
          variant='secondary'
          additionalClassNames='start-button'
          full>
          Start Game
        </Button>
      </div>
    </div>
  );
};
