import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createGameStateSlice, type GameStateSlice } from './gameStateSlice';
import {
  createPlayerStateSlice,
  type PlayerStateSlice,
} from './playerStateSlice';

export const useCombinedStore = create<GameStateSlice & PlayerStateSlice>()(
  devtools(
    (...a) => ({
      ...createGameStateSlice(...a),
      ...createPlayerStateSlice(...a),
    }),
    { name: 'combined-store' },
  ),
);
