import { useCombinedStore } from '@/lib/stores/useCombinedStore';
import Button from '@/components/ui/Button';

export default function GameOverScreen() {
  const resetGame = useCombinedStore((state) => state.resetGame);
  const round = useCombinedStore((state) => state.round);
  const actions = useCombinedStore((state) => state.actions);
  const isGameWon = useCombinedStore((state) => state.isGameWon);

  const hits = actions.filter((action) => action.result === 'hit').length;
  const misses = actions.filter((action) => action.result === 'miss').length;
  const accuracy =
    actions.length > 0 ? Math.round((hits / actions.length) * 100) : 0;

  const handlePlayAgain = () => {
    resetGame();
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100'>
      <div className='max-w-md space-y-8 p-8 text-center'>
        <div className='space-y-4'>
          <h1 className='text-6xl font-bold text-blue-900'>
            {isGameWon ? 'Victory!' : 'Game Over'}
          </h1>
          <p className='text-xl text-blue-700'>
            {isGameWon
              ? 'Congratulations! You sank all the ships!'
              : 'Better luck next time, Admiral!'}
          </p>
        </div>

        <div className='space-y-4 rounded-lg bg-white p-6 shadow-lg'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            Game Statistics
          </h2>

          <div className='grid grid-cols-2 gap-4 text-center'>
            <div className='space-y-1'>
              <p className='text-3xl font-bold text-blue-600'>{round}</p>
              <p className='text-sm text-gray-600'>Rounds</p>
            </div>
            <div className='space-y-1'>
              <p className='text-3xl font-bold text-green-600'>{hits}</p>
              <p className='text-sm text-gray-600'>Hits</p>
            </div>
            <div className='space-y-1'>
              <p className='text-3xl font-bold text-red-600'>{misses}</p>
              <p className='text-sm text-gray-600'>Misses</p>
            </div>
            <div className='space-y-1'>
              <p className='text-3xl font-bold text-purple-600'>{accuracy}%</p>
              <p className='text-sm text-gray-600'>Accuracy</p>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <Button onClick={handlePlayAgain} variant='primary' size='lg'>
            Play Again
          </Button>

          <div className='text-sm text-gray-500'>
            {isGameWon
              ? '🎊 Excellent marksmanship!'
              : '🎯 Keep practicing your aim!'}
          </div>
        </div>
      </div>
    </div>
  );
}
