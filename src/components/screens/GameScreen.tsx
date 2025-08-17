import { useCombinedStore } from '@/lib/stores/useCombinedStore';
import { cn } from '@/lib/utils';
import Grid from '@/components/board/Grid';
import ShipSunkModal from '@/components/modals/ShipSunkModal';

export default function GameScreen() {
  const round = useCombinedStore((state) => state.round);
  const actions = useCombinedStore((state) => state.actions);

  const hits = actions.filter((action) => action.result === 'hit').length;
  const misses = actions.filter((action) => action.result === 'miss').length;

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4'>
      <div
        className={cn(
          'flex min-h-[calc(100vh-2rem)] items-center justify-center',
          'lg:mx-auto lg:max-w-6xl lg:flex-row lg:gap-8',
          'mx-auto max-w-4xl flex-col gap-6',
        )}
      >
        <div
          className={cn(
            'lg:flex-shrink-0 lg:space-y-6 lg:text-left',
            'space-y-4 text-center',
          )}
        >
          <div>
            <h1
              className={cn(
                'mb-2 font-bold text-blue-900',
                'lg:mb-4 lg:text-4xl',
                'text-3xl',
              )}
            >
              Battleship
            </h1>

            <div
              className={cn(
                'text-blue-700',
                'lg:space-y-2',
                'flex justify-center gap-6 text-sm lg:block lg:text-lg',
              )}
            >
              <span className='lg:block'>
                Round: <span className='font-semibold'>{round}</span>
              </span>
              <span className='lg:block'>
                Hits:{' '}
                <span className='font-semibold text-green-600'>{hits}</span>
              </span>
              <span className='lg:block'>
                Misses:{' '}
                <span className='font-semibold text-red-600'>{misses}</span>
              </span>
            </div>
          </div>

          <div
            className={cn(
              'text-sm text-gray-600',
              'lg:mt-6 lg:max-w-xs lg:text-left',
              'mt-4 text-center',
            )}
          >
            <p className='lg:hidden'>
              Click on grid squares to fire at enemy ships
            </p>
            <p className='hidden lg:block'>
              Click on grid squares to fire at enemy ships. Find and sink all 5
              ships to win!
            </p>
          </div>
        </div>

        <div className={cn('flex justify-center', 'lg:flex-1', 'w-full')}>
          <div
            className={cn(
              'aspect-square w-full',
              'lg:w-[min(85vh,85vw)]',
              'w-[85vw] max-w-[85vh]',
            )}
          >
            <Grid />
          </div>
        </div>
      </div>

      <ShipSunkModal />
    </div>
  );
}
