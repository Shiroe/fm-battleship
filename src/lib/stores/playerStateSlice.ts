import { type StateCreator } from 'zustand';

import type { Point2D } from '@/types/common';
import type { GameStateSlice } from './gameStateSlice';

export interface PlayerAction {
  position: Point2D;
  result: 'hit' | 'miss';
  ship?: string | undefined;
}

export interface PlayerStateSlice {
  actions: PlayerAction[];
  fireAt: (
    position: Point2D,
    ship?: string,
  ) => 'hit' | 'miss' | 'already-fired';
  resetActions: () => void;
  getStatusAt: (position: Point2D) => 'hit' | 'miss' | null;
}

export const createPlayerStateSlice: StateCreator<
  GameStateSlice & PlayerStateSlice,
  [],
  [],
  PlayerStateSlice
> = (set, get) => ({
  actions: [],

  fireAt: (position: Point2D, ship?: string) => {
    const state = get();

    const alreadyFired = state.actions.some(
      (action) =>
        action.position[0] === position[0] &&
        action.position[1] === position[1],
    );

    if (alreadyFired) {
      return 'already-fired';
    }

    const result: 'hit' | 'miss' = ship ? 'hit' : 'miss';

    set((state) => ({
      actions: [
        ...state.actions,
        {
          position,
          result,
          ship: ship || undefined,
        },
      ],
    }));

    return result;
  },

  resetActions: () =>
    set(() => ({
      actions: [],
    })),

  getStatusAt: (position: Point2D) => {
    const state = get();
    const action = state.actions.find(
      (action) =>
        action.position[0] === position[0] &&
        action.position[1] === position[1],
    );
    return action ? action.result : null;
  },
});
