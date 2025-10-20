import React from 'react';
import { ParkingSpace } from '@/types';
import { WheelchairIcon, CarIcon } from './Icons';

interface ParkingLotMapProps {
  spaces: ParkingSpace[];
  selectedSpaceId: string | null;
  onSelectSpace: (space: ParkingSpace) => void;
}

const ParkingLotMap: React.FC<ParkingLotMapProps> = ({ spaces, selectedSpaceId, onSelectSpace }) => {
  const getSpaceColor = (space: ParkingSpace) => {
    if (selectedSpaceId === space.id) {
      return 'fill-fp-yellow stroke-fp-blue';
    }
    switch (space.status) {
      case 'available':
        return 'fill-fp-available hover:fill-green-200 stroke-gray-300';
      case 'accessible':
        return 'fill-blue-100 hover:fill-blue-200 stroke-fp-blue';
      case 'occupied':
        return 'fill-fp-occupied stroke-gray-600 cursor-not-allowed';
      default:
        return 'fill-gray-200 stroke-gray-400';
    }
  };

  const isRotated = (space: ParkingSpace) => (space.rotation || 0) !== 0;

  return (
    <svg 
      viewBox="0 0 600 600" 
      className="w-full h-full max-w-lg max-h-lg bg-white dark:bg-gray-700 rounded-lg shadow-inner"
      aria-label="Mapa del estacionamiento"
    >
      <rect width="600" height="600" fill="transparent" />
      {spaces.map((space) => {
        const transform = space.rotation ? `rotate(${space.rotation} ${space.x} ${space.y})` : '';
        const isSelected = selectedSpaceId === space.id;

        return (
          <g
            key={space.id}
            onClick={() => onSelectSpace(space)}
            className={`transition-all duration-200 ${space.status !== 'occupied' ? 'cursor-pointer' : ''}`}
            transform={transform}
            aria-label={`Espacio ${space.label}, estado: ${space.status}`}
            role="button"
            tabIndex={space.status !== 'occupied' ? 0 : -1}
          >
            <rect
              x={space.x}
              y={space.y}
              width={space.width}
              height={space.height}
              rx="4"
              ry="4"
              className={`${getSpaceColor(space)}`}
              strokeWidth={isSelected ? 3 : 1}
            />
            <text
              x={space.x + space.width / 2}
              y={space.y + space.height / 2 + 5}
              textAnchor="middle"
              className="fill-current text-gray-800 dark:text-gray-200 font-bold text-lg pointer-events-none select-none"
              transform={space.rotation ? `rotate(-${space.rotation} ${space.x + space.width / 2} ${space.y + space.height / 2 + 5})` : ''}
            >
              {space.label}
            </text>
            
            {space.status === 'accessible' && (
              <WheelchairIcon
                className="text-fp-blue pointer-events-none"
                x={space.x + space.width / 2 - 12}
                y={space.y + space.height - 30}
                width="24"
                height="24"
                transform={space.rotation ? `rotate(-${space.rotation} ${space.x + space.width / 2} ${space.y + space.height - 18})` : ''}
              />
            )}

            {space.status === 'occupied' && (
               <CarIcon
                className="text-gray-300 pointer-events-none"
                x={space.x + space.width / 2 - (isRotated(space) ? 20 : 15)}
                y={space.y + space.height / 2 - (isRotated(space) ? 15 : 20)}
                width={isRotated(space) ? "40" : "30"}
                height={isRotated(space) ? "30" : "40"}
                transform={space.rotation ? `rotate(-${space.rotation} ${space.x + space.width/2} ${space.y + space.height/2})` : ''}
               />
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default ParkingLotMap;