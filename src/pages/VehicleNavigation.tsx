import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '@/src/store/sessionStore';
import ParkingLotMap from '@/components/ParkingLotMap';
import LoadingSpinner from '@/components/LoadingSpinner';
import { MapPinIcon } from '@/components/Icons';
import { fetchParkingLayout, ENTRANCE_POSITION } from '@/src/api/mockApi';
import { calculatePath } from '@/src/utils/pathfinding';
import { MapElement } from '@/types';

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
        // Permiso concedido, podemos cargar el mapa
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
     // Find the full space object from the layout
    const spaceElement = mapLayout.find(el => el.id === selectedSpace.id);
    if (spaceElement && spaceElement.kind === 'space') {
      // FIX: Pass mapLayout to calculatePath for obstacle detection.
      return calculatePath(ENTRANCE_POSITION, spaceElement, mapLayout);
    }
    return [];
  }, [selectedSpace, mapLayout]);
  
  const pathString = useMemo(() => path.map(p => `${p.x},${p.y}`).join(' '), [path]);

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

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {permissionError ? (
          <div className="text-center text-fp-red p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="font-bold">{permissionError}</p>
          </div>
        ) : (
          <div className="relative w-full max-w-lg max-h-lg">
            <ParkingLotMap
              mapElements={mapLayout}
              selectedSpaceId={selectedSpace?.id || null}
              onSelectSpace={() => {}}
            >
              <svg
              viewBox="0 0 600 600"
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              {path.length > 0 && (
                <>
                  <polyline
                    points={pathString}
                    fill="none"
                    stroke="var(--color-fp-yellow)"
                    strokeWidth="4"
                    strokeDasharray="8 8"
                    strokeLinecap="round"
                  >
                     <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1s" repeatCount="indefinite" />
                  </polyline>
                  
                  <g transform={`translate(${ENTRANCE_POSITION.x - 15}, ${ENTRANCE_POSITION.y - 30})`}>
                     <MapPinIcon className="w-[30px] h-[30px] text-fp-blue" fill="var(--color-fp-blue)" />
                      <circle cx="15" cy="12" r="4" fill="white"/>
                  </g>
                </>
              )}
            </svg>
            </ParkingLotMap>
          </div>
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