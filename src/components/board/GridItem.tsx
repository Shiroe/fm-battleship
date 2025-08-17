import Image from 'next/image';
import React, { memo, useCallback } from 'react';

import type { Point2D } from '@/types/common';
import { cn } from '@/lib/utils';
import { useGameActions } from '@/lib/hooks/useGameActions';

import MissIcon from '@/assets/Miss small.png';
import HitIcon from '@/assets/Hit.png';

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  location: Point2D;
  status: 'hit' | 'miss' | null;
  ship?: string | null;
  shipSize: number;
  totalShipsCount: number;
  children?: React.ReactNode;
}

const GridItem = memo(
  function GridItem({
    location,
    status,
    ship,
    shipSize,
    totalShipsCount,
    ...props
  }: GridItemProps) {
    const { handleCellClick } = useGameActions();

    const handleClick = useCallback(() => {
      handleCellClick(
        location,
        ship || null,
        shipSize,
        totalShipsCount,
        status,
      );
    }, [handleCellClick, location, ship, shipSize, totalShipsCount, status]);

    return (
      <div
        {...props}
        onClick={handleClick}
        className={cn(
          'relative flex aspect-square items-center justify-center overflow-hidden border border-blue-300 bg-blue-200 transition-colors',
          status === null
            ? 'cursor-pointer hover:bg-blue-300'
            : 'cursor-not-allowed',
          status === 'hit' && 'bg-red-100',
          status === 'miss' && 'bg-gray-100',
          props.className,
        )}
      >
        {status !== null && (
          <Image
            alt={status === 'hit' ? 'Hit' : 'Miss'}
            src={status === 'hit' ? HitIcon : MissIcon}
            className='h-full w-full object-contain'
            priority={false}
          />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.status === nextProps.status &&
      prevProps.ship === nextProps.ship &&
      prevProps.shipSize === nextProps.shipSize &&
      prevProps.totalShipsCount === nextProps.totalShipsCount &&
      prevProps.location[0] === nextProps.location[0] &&
      prevProps.location[1] === nextProps.location[1]
    );
  },
);

export default GridItem;
