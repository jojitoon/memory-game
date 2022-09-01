import { FlipCard } from 'components';
import { GameItem } from 'types';
import classNames from './gridbox.module.css';

interface GridBoxProps {
  gridSize: number;
  gridItems: GameItem[];
  onGridItemClick?: (index: number) => void;
}

export const GridBox: React.FC<GridBoxProps> = ({
  gridSize,
  gridItems,
  onGridItemClick,
}) => {
  return (
    <div
      className={`${classNames.grid} ${
        gridSize === 6 ? classNames.six : classNames.four
      }`}>
      {gridItems.map((item, index) => (
        <FlipCard
          key={item.key}
          item={item}
          onClick={() => {
            onGridItemClick?.(index);
          }}
        />
      ))}
    </div>
  );
};
