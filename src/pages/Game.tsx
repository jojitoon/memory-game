import * as React from 'react';
import { Button } from 'components';
import { GridBox } from 'containers';
import { useState } from 'react';
import { GameItem, GameSettings } from 'types';
import { shuffle } from 'utils';
import { GameItemState } from 'enums';

interface MemoryGameProps {
  gameSettings: GameSettings;
  setGameSettings: (gameSettings: GameSettings | null) => void;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({
  gameSettings,
  setGameSettings,
}) => {
  const [gridItems, setGridItems] = useState<GameItem[]>([]);
  const [lastFlippedItem, setLastFlippedItem] = useState<number | null>(null);
  const [flippedCount, setFlippedCount] = useState(0);
  const [scores, setScores] = useState<{ [key: number]: number }>({});
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const generatingMemoryItems = (gridSize: number): string[] => {
    const items: string[] = [];
    const placementSize = (gridSize * gridSize) / 2;
    for (let i = 0; i < placementSize; i++) {
      const wholeNumber = Math.floor(Math.random() * 30) + 1;
      if (items.includes(wholeNumber.toString())) {
        i--;
      } else {
        items.push(wholeNumber.toString());
        items.push(wholeNumber.toString());
      }
    }
    return shuffle(items);
  };

  const generateGridItems = React.useCallback(
    (gridSize: number): GameItem[] => {
      const gridItems = [];
      const items = generatingMemoryItems(gridSize);

      for (let i = 0; i < gridSize * gridSize; i++) {
        gridItems.push({
          key: i.toString(),
          theme: gameSettings.theme,
          value: items[i],
          state: GameItemState.FLIPPED,
        });
      }
      return gridItems;
    },
    [gameSettings.theme]
  );

  const onGenerateGrid = React.useCallback(() => {
    const gridItems = generateGridItems(gameSettings.gridSize);
    setGridItems(gridItems);
    setTimeout(() => {
      const newGridItems = gridItems.map((item) => {
        return { ...item, state: GameItemState.HIDDEN };
      });
      setGridItems(newGridItems);
    }, 2000);
  }, [gameSettings.gridSize, generateGridItems]);

  React.useEffect(() => {
    onGenerateGrid();
  }, [gameSettings, onGenerateGrid]);

  const gotoNextPlayer = React.useCallback(() => {
    setCurrentPlayer((prev) => {
      if (prev === gameSettings.numberOfPlayers) {
        return 1;
      }
      return prev + 1;
    });
  }, [gameSettings.numberOfPlayers]);

  const onGridItemClick = React.useCallback(
    (index: number) => {
      if (flippedCount >= 2 || index === lastFlippedItem) return;
      let newGrid = [...gridItems];
      const item = newGrid[index];

      setFlippedCount((prev) => prev + 1);

      if (item.state === GameItemState.HIDDEN) {
        if (lastFlippedItem !== null) {
          const newItem = {
            ...item,
            state: GameItemState.FLIPPED,
          };
          newGrid[index] = newItem;
          setGridItems(newGrid);
          const lastItem = newGrid[lastFlippedItem];

          setTimeout(() => {
            if (item.value === lastItem.value) {
              newGrid[index].state = GameItemState.MATCHED;
              newGrid[lastFlippedItem].state = GameItemState.MATCHED;
              setLastFlippedItem(null);
              setFlippedCount(0);
              setScores((prev) => ({
                ...prev,
                [currentPlayer]: (prev[currentPlayer] || 0) + 1,
              }));
            } else {
              setLastFlippedItem(null);
              setFlippedCount(0);
              newGrid[index].state = GameItemState.HIDDEN;
              newGrid[lastFlippedItem].state = GameItemState.HIDDEN;
              gotoNextPlayer();
            }
          }, 1000);
        } else {
          const newItem = {
            ...item,
            state: GameItemState.FLIPPED,
          };
          newGrid[index] = newItem;
          setLastFlippedItem(index);
          setFlippedCount(1);
        }
        setGridItems(newGrid);
      }
    },
    [currentPlayer, flippedCount, gotoNextPlayer, gridItems, lastFlippedItem]
  );

  const onRestart = React.useCallback(() => {
    onGenerateGrid();
  }, [onGenerateGrid]);

  const newGame = React.useCallback(() => {
    setGameSettings(null);
  }, [setGameSettings]);

  return (
    <div className='body white'>
      <div className='nav'>
        <h2 className='title'>memory</h2>
        <div>
          <Button variant='secondary' onClick={onRestart}>
            Restart
          </Button>
          <Button
            variant='tertiary'
            additionalClassNames='new-game'
            onClick={newGame}>
            New Game
          </Button>
        </div>
      </div>
      <GridBox
        gridSize={gameSettings.gridSize}
        gridItems={gridItems}
        onGridItemClick={onGridItemClick}
      />
      <div className='footer'>
        player {currentPlayer} -<span>{scores[currentPlayer] || 0}</span>
      </div>
    </div>
  );
};
