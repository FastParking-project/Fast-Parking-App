import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layer, Line, Group, Path } from 'react-konva';
import Konva from 'konva';
import { useSessionStore } from '@/src/store/sessionStore';
import ParkingLotMap from '@/components/ParkingLotMap';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchParkingLayout, ENTRANCE_POSITION } from '@/src/api/mockApi';
import { calculatePath, Point } from '@/src/utils/pathfinding';
import { MapElement } from '@/types';

const NAVIGATION_SPEED = 150; // pixels per second

const AnimatedCar: React.FC<{ path: Point[]; onArrival: () => void }> = ({ path, onArrival }) => {
  const carRef = useRef<Konva.Group>(null);

  useEffect(() => {
    if (!carRef.current || path.length < 2) return;

    const carNode = carRef.current;
    let distance = 0;
    const totalPathLength = path.reduce((length, point, i) => {
      if (i === 0) return 0;
      const prev = path[i - 1];
      return length + Math.hypot(point.x - prev.x, point.y - prev.y);
    }, 0);

    const animation = new Konva.Animation(frame => {
      if (!frame) return;
      distance += (frame.timeDiff / 1000) * NAVIGATION_SPEED;

      if (distance >= totalPathLength) {
        animation.stop();
        onArrival();
        const endPoint = path[path.length - 1];
        const prevPoint = path[path.length - 2];
        const angle = Math.atan2(endPoint.y - prevPoint.y, endPoint.x - prevPoint.x) * 180 / Math.PI;
        carNode.position({ x: endPoint.x, y: endPoint.y });
        carNode.rotation(angle + 90);
        return;
      }
      
      let currentLength = 0;
      for (let i = 1; i < path.length; i++) {
        const prev = path[i - 1];
        const curr = path[i];
        const segmentLength = Math.hypot(curr.x - prev.x, curr.y - prev.y);

        if (currentLength + segmentLength >= distance) {
          const distanceIntoSegment = distance - currentLength;
          const ratio = distanceIntoSegment / segmentLength;
          const x = prev.x + (curr.x - prev.x) * ratio;
          const y = prev.y + (curr.y - prev.y) * ratio;
          const angle = Math.atan2(curr.y - prev.y, curr.x - prev.x) * 180 / Math.PI;
          
          carNode.position({ x, y });
          carNode.rotation(angle + 90); // +90 to align car model forward
          break;
        }
        currentLength += segmentLength;
      }
    }, carNode.getLayer());

    animation.start();

    return () => {
      animation.stop();
    };
  }, [path, onArrival]);

  return (
    <Group ref={carRef}>
       <Path
        data="M -20 -42.5 C -20 -47.5 -15 -47.5 0 -47.5 C 15 -47.5 20 -47.5 20 -42.5 L 20 32.5 C 20 37.5 15 42.5 0 42.5 C -15 42.5 -20 37.5 -20 32.5 Z"
        fill="#03679E"
        stroke="white"
        strokeWidth={1.5}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.5}
      />
      <Path
        data="M -16 -35 L 16 -35 L 14 -10 L -14 -10 Z"
        fill="rgba(255, 255, 255, 0.4)"
      />
    </Group>
  );
};


const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { selectedSpace } = useSessionStore();
  
  const [mapLayout, setMapLayout] = useState<MapElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [navigationStatus, setNavigationStatus] = useState('Calculando ruta...');

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
  
  const pathPoints = useMemo(() => path.flatMap(p => [p.x, p.y]), [path]);

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

      <main className="flex-1 flex flex-col items-center justify-center relative">
        <ParkingLotMap
          mapElements={mapLayout}
          selectedSpaceId={selectedSpace?.id || null}
          onSelectSpace={() => {}}
        >
          {path.length > 0 && (
            <Layer>
              <Line
                points={pathPoints}
                stroke="#03679E"
                strokeWidth={6}
                lineCap="round"
                lineJoin="round"
                shadowColor="black"
                shadowBlur={5}
                shadowOpacity={0.5}
              />
              <AnimatedCar path={path} onArrival={() => setNavigationStatus('¡Has llegado!')} />
            </Layer>
          )}
        </ParkingLotMap>
      </main>

      <footer className="p-4 bg-white dark:bg-gray-900 shadow-top z-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-fp-green text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
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