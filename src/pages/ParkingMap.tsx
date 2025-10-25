import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingLotMap from '@/components/ParkingLotMap';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ParkingSpace, MapElement } from '@/types';
import { useSessionStore } from '@/src/store/sessionStore';
import { fetchParkingLayout } from '@/src/api/mockApi';

const ParkingMap: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  const setSelectedSpace = useSessionStore((state) => state.setSelectedSpace);
  const startSession = useSessionStore((state) => state.startSession);

  const [mapLayout, setMapLayout] = useState<MapElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLayout = async () => {
      setIsLoading(true);
      const layout = await fetchParkingLayout();
      setMapLayout(layout);
      setIsLoading(false);
    };
    loadLayout();
  }, []);

  const handleSelectSpace = (space: ParkingSpace) => {
    if (space.status !== 'occupied') {
      setSelectedSpaceId(space.id === selectedSpaceId ? null : space.id);
    }
  };

  const selectedSpace = useMemo(() => {
    const element = mapLayout.find(el => el.id === selectedSpaceId);
    if (element && element.kind === 'space') {
      return element;
    }
    return undefined;
  }, [selectedSpaceId, mapLayout]);

  const handleConfirm = () => {
    if (selectedSpace) {
      setSelectedSpace(selectedSpace);
      startSession();
      navigate('/navigate');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
        <LoadingSpinner />
        <p className="mt-4 text-gray-800 dark:text-gray-100">Cargando mapa del estacionamiento...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
      <header className="p-4 bg-white dark:bg-gray-900 shadow-md z-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
            Selecciona tu espacio
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400">Sótano 1</p>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center overflow-hidden">
        <ParkingLotMap
          mapElements={mapLayout}
          selectedSpaceId={selectedSpaceId}
          onSelectSpace={handleSelectSpace}
        />
      </main>

      <footer className="p-4 bg-white dark:bg-gray-900 shadow-top z-10">
        <button
          onClick={handleConfirm}
          disabled={!selectedSpaceId}
          className="w-full bg-fp-blue text-white font-bold py-4 px-4 rounded-lg shadow-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed hover:enabled:bg-opacity-90 transform hover:enabled:scale-105"
          aria-label={selectedSpace ? `Confirmar selección del espacio ${selectedSpace.label}` : "Seleccione un espacio para continuar"}
        >
          {selectedSpace ? `Confirmar Espacio ${selectedSpace.label}` : 'Selecciona un espacio'}
        </button>
      </footer>
    </div>
  );
};

export default ParkingMap;
