import { useQuery } from '@tanstack/react-query';
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

async function fetchShips(): Promise<ShipsResponse> {
  const response = await fetch('/api/ships');

  if (!response.ok) {
    throw new Error('Failed to fetch ships');
  }

  return (await response.json()) as ShipsResponse;
}

export function useShips() {
  return useQuery({
    queryKey: ['ships'],
    queryFn: fetchShips,
    staleTime: Infinity,
    retry: 3,
  });
}
