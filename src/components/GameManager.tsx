'use client';

import { useCombinedStore } from '@/lib/stores/useCombinedStore';
import IntroScreen from '@/components/screens/IntroScreen';
import GameScreen from '@/components/screens/GameScreen';
import GameOverScreen from '@/components/screens/GameOverScreen';

export default function GameManager() {
  const gameScreen = useCombinedStore((state) => state.gameScreen);

  switch (gameScreen) {
    case 'intro':
      return <IntroScreen />;
    case 'playing':
      return <GameScreen />;
    case 'gameOver':
      return <GameOverScreen />;
    default:
      return <IntroScreen />;
  }
}
