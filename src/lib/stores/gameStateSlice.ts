import { type StateCreator } from 'zustand';

import { type PlayerStateSlice } from './playerStateSlice';

export type GameScreen = 'intro' | 'playing' | 'gameOver';

export interface ShipStatus {
  hitCount: number;
  isSunk: boolean;
}

export interface SunkShipModal {
  isVisible: boolean;
  shipName: string | null;
}

export interface GameStateSlice {
  round: number;
  isPaused: boolean;
  gameScreen: GameScreen;
  isGameWon: boolean;
  shipsStatus: Record<string, ShipStatus>;
  sunkShipModal: SunkShipModal;
  // Actions
  startGame: () => void;
  incrementRound: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: (won: boolean) => void;
  resetGame: () => void;
  recordShipHit: (shipName: string, shipSize: number) => string | null;
  checkWinCondition: (totalShipsCount: number) => void;
  showSunkShipModal: (shipName: string) => void;
  hideSunkShipModal: () => void;
}

export const createGameStateSlice: StateCreator<
  GameStateSlice & PlayerStateSlice,
  [],
  [],
  GameStateSlice
> = (set, get) => ({
  round: 0,
  isPaused: false,
  gameScreen: 'intro',
  isGameWon: false,
  shipsStatus: {},
  sunkShipModal: { isVisible: false, shipName: null },

  startGame: () =>
    set(() => ({
      gameScreen: 'playing',
      round: 1,
      isPaused: false,
      isGameWon: false,
      shipsStatus: {},
      sunkShipModal: { isVisible: false, shipName: null },
    })),

  incrementRound: () =>
    set((state) => ({
      round: state.round + 1,
    })),

  pauseGame: () =>
    set(() => ({
      isPaused: true,
    })),

  resumeGame: () =>
    set(() => ({
      isPaused: false,
    })),

  endGame: (won: boolean) =>
    set(() => ({
      gameScreen: 'gameOver',
      isPaused: true,
      isGameWon: won,
    })),

  resetGame: () => {
    const state = get();

    state.resetActions();

    set(() => ({
      round: 0,
      isPaused: false,
      gameScreen: 'intro',
      isGameWon: false,
      shipsStatus: {},
      sunkShipModal: { isVisible: false, shipName: null },
    }));
  },

  recordShipHit: (shipName: string, shipSize: number) => {
    const state = get();

    const currentStatus = state.shipsStatus[shipName] || {
      hitCount: 0,
      isSunk: false,
    };
    const newHitCount = currentStatus.hitCount + 1;
    const isSunk = newHitCount >= shipSize;

    set((state) => ({
      shipsStatus: {
        ...state.shipsStatus,
        [shipName]: {
          hitCount: newHitCount,
          isSunk,
        },
      },
    }));

    // Return ship name if it was just sunk
    return isSunk && !currentStatus.isSunk ? shipName : null;
  },

  checkWinCondition: (totalShipsCount: number) => {
    const state = get();
    const sunkShips = Object.values(state.shipsStatus).filter(
      (ship) => ship.isSunk,
    );
    const allShipsSunk =
      sunkShips.length === totalShipsCount && totalShipsCount > 0;

    if (allShipsSunk) {
      state.endGame(true);
    }
  },

  showSunkShipModal: (shipName: string) =>
    set(() => ({
      sunkShipModal: { isVisible: true, shipName },
    })),

  hideSunkShipModal: () =>
    set(() => ({
      sunkShipModal: { isVisible: false, shipName: null },
    })),
});
