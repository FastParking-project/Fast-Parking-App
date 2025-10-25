import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layer, Line, Group, Path, Circle } from 'react-konva';
import { useSessionStore } from '@/src/store/sessionStore';
import ParkingLotMap from '@/components/ParkingLotMap';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchParkingLayout, ENTRANCE_POSITION } from '@/src/api/mockApi';
import { calculatePath } from '@/src/utils/pathfinding';
import { MapElement } from '@/types';

const KonvaMapPinIcon: React.FC<{ x: number; y: number; size: number; color: string; }> = ({ x, y, size, color }) => (
    <Group x={x - size / 2} y={y - size}>
        <Path 
            data="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            fill={color}
            scale={{ x: size/24, y: size/24 }}
            shadowColor="black"
            shadowBlur={5}
            shadowOpacity={0.5}
        />
        <Circle
            x={size/2}
            y={size/2.6}
            radius={size/8}
            fill="white"
        />
    </Group>
);

const VehicleNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { selectedSpace } = useSessionStore();
  
  const [mapLayout, setMapLayout] = useState<MapElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedSpace) {
      navigate('/dashboard', { replace: true });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        const loadLayout = async () => {
          const layout = await fetchParkingLayout();
          setMapLayout(layout);
          setIsLoading(false);
        };
        loadLayout();
        setPermissionError(null);
      },
      (error) => {
        console.error("Error de geolocalización:", error);
        setPermissionError("No se pudo obtener tu ubicación. Por favor, activa los servicios de localización y actualiza la página.");
        setIsLoading(false);
      }
    );
  }, [selectedSpace, navigate]);

  const path = useMemo(() => {
    if (!selectedSpace || mapLayout.length === 0) return [];
    const spaceElement = mapLayout.find(el => el.id === selectedSpace.id);
    if (spaceElement && spaceElement.kind === 'space') {
      return calculatePath(ENTRANCE_POSITION, spaceElement, mapLayout);
    }
    return [];
  }, [selectedSpace, mapLayout]);
  
  const pathPoints = useMemo(() => path.flatMap(p => [p.x, p.y]), [path]);

  if (isLoading) {
     return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
        <LoadingSpinner />
        <p className="mt-4 text-gray-800 dark:text-gray-100">Obteniendo ubicación y mapa...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
      <header className="p-4 bg-white dark:bg-gray-900 shadow-md z-10">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          De vuelta a tu vehículo
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative">
        {permissionError ? (
          <div className="text-center text-fp-red p-4 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-md mx-auto">
            <p className="font-bold">{permissionError}</p>
          </div>
        ) : (
          <ParkingLotMap
            mapElements={mapLayout}
            selectedSpaceId={selectedSpace?.id || null}
            onSelectSpace={() => {}}
          >
            {path.length > 0 && (
              <Layer>
                <Line
                    points={pathPoints}
                    stroke="#FFCC00" // fp-yellow
                    strokeWidth={4}
                    dash={[8, 8]}
                    lineCap="round"
                />
                <KonvaMapPinIcon x={ENTRANCE_POSITION.x} y={ENTRANCE_POSITION.y} size={36} color="#03679E" />
              </Layer>
            )}
          </ParkingLotMap>
        )}
      </main>

      <footer className="p-4 bg-white dark:bg-gray-900 shadow-top z-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-gray-200 text-gray-800 font-bold py-4 px-4 rounded-lg shadow-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          aria-label="Volver al panel de control"
        >
          Volver al Panel
        </button>
      </footer>
    </div>
  );
};

export default VehicleNavigation;
