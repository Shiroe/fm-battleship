import { type StateCreator } from "zustand";

import { type PlayerStateSlice } from "./playerStateSlice";

export interface GameStateSlice {
  round: number;
  isPaused: boolean;
}

export const createGameStateSlice: StateCreator<
  GameStateSlice & PlayerStateSlice,
  [],
  [],
  GameStateSlice
> = (_set) => ({
  round: -1,
  isPaused: false,
});
