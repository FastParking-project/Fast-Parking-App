import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '@/src/store/sessionStore';
import ParkingLotMap from '@/components/ParkingLotMap';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchParkingLayout, ENTRANCE_POSITION } from '@/src/api/mockApi';
import { calculatePath, Point } from '@/src/utils/pathfinding';
import { MapElement } from '@/types';

const NAVIGATION_SPEED = 150; // pixels per second

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { selectedSpace } = useSessionStore();
  
  const [mapLayout, setMapLayout] = useState<MapElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [navigationStatus, setNavigationStatus] = useState('Calculando ruta...');
  const [carTransform, setCarTransform] = useState(`translate(${ENTRANCE_POSITION.x}, ${ENTRANCE_POSITION.y}) rotate(0)`);
  
  // FIX: Initialize useRef with null and update type to allow null to fix "Expected 1 arguments, but got 0" error.
  const animationFrameRef = useRef<number | null>(null);
  // FIX: Initialize useRef with null and update type to allow null to fix "Expected 1 arguments, but got 0" error.
  const animationStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (!selectedSpace) {
      navigate('/map', { replace: true });
      return;
    }

    const loadLayout = async () => {
      const layout = await fetchParkingLayout();
      setMapLayout(layout);
      setIsLoading(false);
      setNavigationStatus('Dirigiéndote a tu espacio...');
    };
    loadLayout();
  }, [selectedSpace, navigate]);

  const path = useMemo(() => {
    if (!selectedSpace || mapLayout.length === 0) return [];
    
    const spaceElement = mapLayout.find(el => el.id === selectedSpace.id);
    if (spaceElement && spaceElement.kind === 'space') {
      return calculatePath(ENTRANCE_POSITION, spaceElement, mapLayout);
    }
    return [];
  }, [selectedSpace, mapLayout]);
  
  const pathString = useMemo(() => path.map(p => `${p.x},${p.y}`).join(' '), [path]);

  useEffect(() => {
    if (path.length < 2 || isLoading) return;

    const totalPathLength = path.reduce((length, point, i) => {
      if (i === 0) return 0;
      const prev = path[i - 1];
      return length + Math.hypot(point.x - prev.x, point.y - prev.y);
    }, 0);

    const animate = (timestamp: number) => {
      // FIX: Check for null to match the new initial value of the ref.
      if (animationStartRef.current === null) {
        animationStartRef.current = timestamp;
      }
      const elapsedTime = (timestamp - animationStartRef.current!) / 1000; // in seconds
      const distanceCovered = elapsedTime * NAVIGATION_SPEED;

      if (distanceCovered >= totalPathLength) {
        const endPoint = path[path.length - 1];
        const prevPoint = path[path.length - 2];
        const angle = Math.atan2(endPoint.y - prevPoint.y, endPoint.x - prevPoint.x) * 180 / Math.PI;
        setCarTransform(`translate(${endPoint.x}, ${endPoint.y}) rotate(${angle + 90})`);
        setNavigationStatus('¡Has llegado!');
        return;
      }

      let currentLength = 0;
      for (let i = 1; i < path.length; i++) {
        const prev = path[i - 1];
        const curr = path[i];
        const segmentLength = Math.hypot(curr.x - prev.x, curr.y - prev.y);

        if (currentLength + segmentLength >= distanceCovered) {
          const distanceIntoSegment = distanceCovered - currentLength;
          const ratio = distanceIntoSegment / segmentLength;
          const x = prev.x + (curr.x - prev.x) * ratio;
          const y = prev.y + (curr.y - prev.y) * ratio;
          const angle = Math.atan2(curr.y - prev.y, curr.x - prev.x) * 180 / Math.PI;
          setCarTransform(`translate(${x}, ${y}) rotate(${angle + 90})`);
          break;
        }
        currentLength += segmentLength;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if(animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [path, isLoading]);


  if (isLoading) {
     return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
        <LoadingSpinner />
        <p className="mt-4 text-gray-800 dark:text-gray-100">{navigationStatus}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
      <header className="p-4 bg-white dark:bg-gray-900 shadow-md z-10">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Guía a tu espacio: {selectedSpace?.label}
        </h1>
         <p className="text-center text-gray-500 dark:text-gray-400">{navigationStatus}</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
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
                  />
                   {/* Car Icon */}
                  <g transform={carTransform}>
                     <path d="M -7 -12 L 7 -12 L 7 12 L -7 12 Z M 0 -15 L 5 -10 L -5 -10 Z" fill="var(--color-fp-blue)" stroke="white" strokeWidth="1" />
                  </g>
                </>
              )}
            </svg>
            </ParkingLotMap>
          </div>
      </main>

      <footer className="p-4 bg-white dark:bg-gray-900 shadow-top z-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-fp-green text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:scale-105 disabled:bg-gray-400"
          aria-label="Confirmar llegada y ver el panel de control"
          disabled={navigationStatus !== '¡Has llegado!'}
        >
          {navigationStatus === '¡Has llegado!' ? 'Ir al Panel de Control' : 'Navegando...'}
        </button>
      </footer>
    </div>
  );
};

export default Navigation;
