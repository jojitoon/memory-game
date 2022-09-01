import { GameItemState, GameTheme } from 'enums';

export interface GameSettings {
  theme: GameTheme;
  gridSize: number;
  numberOfPlayers: number;
}

export interface GameItem {
  key: string;
  theme: GameTheme;
  value: string;
  state: GameItemState;
}
