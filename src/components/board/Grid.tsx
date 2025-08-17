import { memo } from 'react';
import { useShips } from '@/lib/hooks/useShips';
import { useCombinedStore } from '@/lib/stores/useCombinedStore';
import GridItem from './GridItem';

const MemoizedGridItem = memo(function MemoizedGridItem({
  location,
  ship,
  shipSize,
  totalShipsCount,
}: {
  location: [number, number];
  ship: string | null;
  shipSize: number;
  totalShipsCount: number;
}) {
  const status = useCombinedStore((state) => state.getStatusAt(location));

  return (
    <GridItem
      location={location}
      status={status}
      ship={ship}
      shipSize={shipSize}
      totalShipsCount={totalShipsCount}
    />
  );
});

export default function Grid() {
  const { data: ships, isLoading, error } = useShips();

  if (isLoading) {
    return <div>Loading ship positions...</div>;
  }

  if (error) {
    return <div>Error loading ships: {error.message}</div>;
  }

  return (
    <div className='grid aspect-square grid-cols-10 gap-1 rounded-sm border-2 bg-gray-50 p-2'>
      {Array.from({ length: 100 }, (_, i) => {
        const x = Math.floor(i / 10);
        const y = i % 10;
        const position: [number, number] = [x, y];

        const shipAtPosition = ships?.layout.find((ship) =>
          ship.positions.some(([sx, sy]) => sx === x && sy === y),
        );

        const shipSize =
          (shipAtPosition && ships?.shipTypes[shipAtPosition.ship]?.size) || 0;

        return (
          <MemoizedGridItem
            key={i}
            location={position}
            ship={shipAtPosition?.ship || null}
            shipSize={shipSize}
            totalShipsCount={ships?.layout.length || 0}
          />
        );
      })}
    </div>
  );
}
