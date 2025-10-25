import React from 'react';
import { MapElement, ParkingSpace } from '@/types';
import { WheelchairIcon, CarIcon } from './Icons';

interface ParkingLotMapProps {
  mapElements: MapElement[];
  selectedSpaceId: string | null;
  onSelectSpace: (space: ParkingSpace) => void;
  children?: React.ReactNode;
}

const ParkingLotMap: React.FC<ParkingLotMapProps> = ({ mapElements, selectedSpaceId, onSelectSpace, children }) => {
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

  return (
    <svg 
      viewBox="0 0 600 600" 
      className="w-full h-full max-w-lg max-h-lg bg-gray-800 dark:bg-gray-900 rounded-lg shadow-inner"
      aria-label="Mapa del estacionamiento"
    >
      <rect width="600" height="600" fill="transparent" />
      {mapElements.map((element) => {
        if (element.kind === 'obstacle') {
          return (
            <rect
              key={element.id}
              x={element.x}
              y={element.y}
              width={element.width}
              height={element.height}
              fill={element.fill || "#4B5563"}
              stroke={element.stroke || 'none'}
            />
          );
        }

        if (element.kind === 'decoration') {
            return (
                <path 
                    key={element.id}
                    d={element.d}
                    fill={element.fill || '#FFCC00'}
                    transform={element.transform}
                />
            )
        }

        const space = element;
        const transform = space.rotation ? `rotate(${space.rotation} ${space.x + space.width / 2} ${space.y + space.height / 2})` : '';
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
              rx="2"
              ry="2"
              className={`${getSpaceColor(space)}`}
              strokeWidth={isSelected ? 3 : 1.5}
            />
            <text
              x={space.x + space.width / 2}
              y={space.y + space.height / 2 + 5}
              textAnchor="middle"
              className="fill-current text-gray-800 dark:text-gray-200 font-bold text-xs pointer-events-none select-none"
              transform={`rotate(${space.rotation ? -space.rotation : 0} ${space.x + space.width / 2} ${space.y + space.height / 2})`}
            >
              {space.label}
            </text>
            
            {space.status === 'accessible' && (
              <WheelchairIcon
                className="text-fp-blue pointer-events-none"
                x={space.x + space.width / 2 - 8}
                y={space.y + space.height - 20}
                width="16"
                height="16"
                transform={`rotate(${space.rotation ? -space.rotation : 0} ${space.x + space.width / 2} ${space.y + space.height / 2})`}
              />
            )}

            {space.status === 'occupied' && (
               <CarIcon
                className="text-gray-300 pointer-events-none"
                x={space.x + space.width / 2 - 12}
                y={space.y + space.height / 2 - 12}
                width="24"
                height="24"
                transform={`rotate(${space.rotation ? -space.rotation : 0} ${space.x + space.width/2} ${space.y + space.height/2})`}
               />
            )}
          </g>
        );
      })}
      {/* Children se renderiza encima de todo para la navegación */}
      {children}
    </svg>
  );
};

export default ParkingLotMap;