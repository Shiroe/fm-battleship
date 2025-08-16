import { type StateCreator } from "zustand";

import type { Point2D } from "@/types/common";
import type { GameStateSlice } from "./gameStateSlice";

export interface PlayerStateSlice {
  actions: Point2D[];
}

export const createPlayerStateSlice: StateCreator<
  GameStateSlice & PlayerStateSlice,
  [],
  [],
  PlayerStateSlice
> = (_set) => ({
  actions: [],
});
