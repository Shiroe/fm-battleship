import { useCombinedStore } from '@/lib/stores/useCombinedStore';
import Button from '@/components/ui/Button';

export default function IntroScreen() {
  const startGame = useCombinedStore((state) => state.startGame);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100'>
      <div className='space-y-8 p-8 text-center'>
        <div className='space-y-4'>
          <h1 className='text-6xl font-bold text-blue-900'>Battleship</h1>
          <p className='mx-auto max-w-md text-xl text-blue-700'>
            Find and sink all enemy ships in this classic naval strategy game
          </p>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2 text-gray-600'>
            <p>🎯 Click grid squares to fire</p>
            <p>🚢 Find all 5 ships to win</p>
            <p>📊 Track your shots and accuracy</p>
          </div>
        </div>

        <Button onClick={startGame} variant='primary' size='lg'>
          Start Game
        </Button>
      </div>
    </div>
  );
}
