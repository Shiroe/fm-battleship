import Image, { type StaticImageData } from 'next/image';

import { useCombinedStore } from '@/lib/stores/useCombinedStore';
import Button from '@/components/ui/Button';

import AircraftIcon from '@/assets/aircraft.png';
import BattleShipIcon from '@/assets/battleship.png';
import CarrierIcon from '@/assets/carrier.png';
import CruiserIcon from '@/assets/cruiser.png';
import SubmarineIcon from '@/assets/submarine.png';

const SHIP_IMAGES: Record<string, StaticImageData> = {
  carrier: AircraftIcon,
  battleship: BattleShipIcon,
  cruiser: CruiserIcon,
  submarine: SubmarineIcon,
  destroyer: CarrierIcon,
};

export default function ShipSunkModal() {
  const sunkShipModal = useCombinedStore((state) => state.sunkShipModal);
  const hideSunkShipModal = useCombinedStore(
    (state) => state.hideSunkShipModal,
  );

  if (!sunkShipModal.isVisible || !sunkShipModal.shipName) {
    return null;
  }

  const handleContinue = () => {
    hideSunkShipModal();
  };

  const shipImage = sunkShipModal.shipName
    ? SHIP_IMAGES[sunkShipModal.shipName.toLowerCase()]
    : null;

  return (
    <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
      <div className='mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl'>
        <div className='space-y-4 text-center'>
          {shipImage ? (
            <Image
              alt={`${sunkShipModal.shipName} Ship Icon`}
              src={shipImage}
              className='mx-auto h-24 w-24 object-contain'
            />
          ) : (
            <div className='text-6xl'>🚢</div>
          )}
          <h2 className='text-2xl font-bold text-gray-800'>Ship Sunk!</h2>
          <p className='text-lg text-blue-600'>
            Congratulations! You sunk the{' '}
            <span className='font-semibold capitalize'>
              {sunkShipModal.shipName}
            </span>
          </p>

          <div className='pt-4'>
            <Button onClick={handleContinue} variant='primary'>
              Continue Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
