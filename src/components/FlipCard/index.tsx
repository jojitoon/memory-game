import { GameItemState } from 'enums';
import React from 'react';
import { GameItem } from 'types';
import classNames from './flip.module.css';

interface FlipCardProps {
  item: GameItem;
  onClick?: () => void;
}

export const FlipCard: React.FC<FlipCardProps> = ({ item, onClick }) => {
  const isFlipped = item.state === GameItemState.FLIPPED;
  const isMatched = item.state === GameItemState.MATCHED;

  return (
    <div onClick={onClick} role='button' className={classNames.card}>
      <div
        className={`${classNames.content} ${
          isFlipped ? classNames.flipped : ''
        } ${isMatched ? classNames.flipped : ''}`}>
        <div className={classNames.front}></div>
        <div
          className={`${classNames.back} ${
            isMatched ? classNames.matched : ''
          }`}>
          {item.value}
        </div>
      </div>
    </div>
  );
};
