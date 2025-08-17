import { useCallback } from 'react';
import { useCombinedStore } from '@/lib/stores/useCombinedStore';
import type { Point2D } from '@/types/common';

export function useGameActions() {
  const fireAt = useCombinedStore((state) => state.fireAt);
  const incrementRound = useCombinedStore((state) => state.incrementRound);
  const recordShipHit = useCombinedStore((state) => state.recordShipHit);
  const checkWinCondition = useCombinedStore(
    (state) => state.checkWinCondition,
  );
  const showSunkShipModal = useCombinedStore(
    (state) => state.showSunkShipModal,
  );

  const handleCellClick = useCallback(
    (
      location: Point2D,
      ship: string | null,
      shipSize: number,
      totalShipsCount: number,
      currentStatus: 'hit' | 'miss' | null,
    ) => {
      if (currentStatus !== null) return;

      const result = fireAt(location, ship || undefined);

      if (result !== 'already-fired') {
        incrementRound();

        if (result === 'hit' && ship && shipSize > 0) {
          const sunkShipName = recordShipHit(ship, shipSize);

          if (sunkShipName) {
            showSunkShipModal(sunkShipName);
          }

          checkWinCondition(totalShipsCount);
        }
      }
    },
    [
      fireAt,
      incrementRound,
      recordShipHit,
      checkWinCondition,
      showSunkShipModal,
    ],
  );

  return { handleCellClick };
}
