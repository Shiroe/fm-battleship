import { NextResponse } from 'next/server';
import type { Point2D } from '@/types/common';

interface ShipType {
  size: number;
  count: number;
}

interface ShipPlacement {
  ship: string;
  positions: Point2D[];
}

interface ShipsResponse {
  shipTypes: Record<string, ShipType>;
  layout: ShipPlacement[];
}

export function GET() {
  const shipsData: ShipsResponse = {
    shipTypes: {
      carrier: { size: 5, count: 1 },
      battleship: { size: 4, count: 1 },
      cruiser: { size: 3, count: 1 },
      submarine: { size: 3, count: 1 },
      destroyer: { size: 2, count: 1 },
    },
    layout: [
      {
        ship: 'carrier',
        positions: [
          [2, 9],
          [3, 9],
          [4, 9],
          [5, 9],
          [6, 9],
        ],
      },
      {
        ship: 'battleship',
        positions: [
          [5, 2],
          [5, 3],
          [5, 4],
          [5, 5],
        ],
      },
      {
        ship: 'cruiser',
        positions: [
          [8, 1],
          [8, 2],
          [8, 3],
        ],
      },
      {
        ship: 'submarine',
        positions: [
          [3, 0],
          [3, 1],
          [3, 2],
        ],
      },
      {
        ship: 'destroyer',
        positions: [
          [0, 0],
          [1, 0],
        ],
      },
    ],
  };

  return NextResponse.json(shipsData);
}
