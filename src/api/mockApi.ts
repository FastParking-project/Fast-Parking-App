import { MapElement, ParkingSpace, ParkingSpaceStatus } from "@/types";

// --- Constantes de Diseño del Mapa ---
export const MAP_WIDTH = 1200;
export const MAP_HEIGHT = 700; // Aumentado para más espacio

const SPACE_WIDTH = 50;
const SPACE_HEIGHT = 100;

// --- Colores ---
const ASPHALT_COLOR = '#4A4A4A';
const DRIVING_LANE_COLOR = '#5A5A5A'; // Asfalto ligeramente más claro
const CURB_COLOR = '#A0A0A0';
const GREENERY_COLOR = '#5A8B4D';

let spaceCounter = 1;

// Helper para generar un espacio de estacionamiento individual
const createSpace = (id: string, x: number, y: number, status: ParkingSpaceStatus = 'available'): ParkingSpace => ({
    kind: 'space',
    id,
    label: `${spaceCounter++}`,
    status,
    x,
    y,
    width: SPACE_WIDTH,
    height: SPACE_HEIGHT,
    rotation: 0,
});


// Función para generar un nuevo layout con estados aleatorios
const createFreshLayout = (): MapElement[] => {
    spaceCounter = 1; // Reset counter
    const elements: MapElement[] = [
        // Elementos de fondo primero
        { kind: 'obstacle', id: 'background', type: 'asphalt-base', x: 0, y: 0, width: MAP_WIDTH, height: MAP_HEIGHT, fill: ASPHALT_COLOR },
        { kind: 'obstacle', id: 'driving-area-background', type: 'parking-area-background', x: 50, y: 100, width: 1100, height: 500, fill: DRIVING_LANE_COLOR },
        { kind: 'obstacle', id: 'top-greenery', type: 'greenery', x: 50, y: 50, width: 1100, height: 50, fill: GREENERY_COLOR, borderRadius: 10 },
        { kind: 'obstacle', id: 'bottom-curb', type: 'curb', x: 50, y: 600, width: 1100, height: 50, fill: CURB_COLOR, borderRadius: 10 },
        
        // Carril de conducción (para pathfinding) - Invisible
        { kind: 'obstacle', id: 'driving-lane', type: 'driving-lane', x: 50, y: 250, width: 1100, height: 250, fill: 'transparent' },
    ];

    const SPACES_PER_ROW = 15;
    const TOTAL_PARKING_AREA_WIDTH = 1100;
    const TOTAL_SPACES_WIDTH = SPACES_PER_ROW * SPACE_WIDTH;
    const TOTAL_GAPS_WIDTH = TOTAL_PARKING_AREA_WIDTH - TOTAL_SPACES_WIDTH;
    const SPACE_GAP = TOTAL_GAPS_WIDTH / (SPACES_PER_ROW - 1);
    const START_X = 50;


    // --- Fila Superior ---
    for (let i = 0; i < SPACES_PER_ROW; i++) {
        const status = i < 2 ? 'accessible' : 'available'; // 2 accesibles
        const x = START_X + i * (SPACE_WIDTH + SPACE_GAP);
        elements.push(createSpace(`top-${i + 1}`, x, 150, status));
    }

    // --- Fila Inferior ---
    for (let i = 0; i < SPACES_PER_ROW; i++) {
        const status = i < 3 ? 'accessible' : 'available'; // 3 accesibles
        const x = START_X + i * (SPACE_WIDTH + SPACE_GAP);
        elements.push(createSpace(`bottom-${i + 1}`, x, 500, status)); // Y-coordinate moved down
    }
    
    // Asignar estados de ocupado aleatoriamente a espacios no accesibles
    elements.forEach(el => {
        if (el.kind === 'space' && el.status === 'available' && Math.random() > 0.65) {
            (el as ParkingSpace).status = 'occupied';
        }
    });

    return elements;
}

export const ENTRANCE_POSITION = { x: 50, y: 375 }; // Y-coordinate updated
export const EXIT_POSITION = { x: 1150, y: 375 }; // Y-coordinate updated

export const fetchParkingLayout = (): Promise<MapElement[]> => {
  return new Promise(resolve => {
    const freshLayout = createFreshLayout();
    setTimeout(() => {
      resolve(freshLayout);
    }, 500);
  });
};