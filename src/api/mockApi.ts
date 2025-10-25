import { MapElement, ParkingSpace } from "@/types";

export const ENTRANCE_POSITION = { x: 545, y: 550 };

// --- Constantes para un diseño consistente ---
const SPACE_WIDTH = 30;
const SPACE_HEIGHT = 60;
const ROAD_COLOR = '#4B5563'; // Gris oscuro para asfalto
const WALL_COLOR = '#A1A1AA';  // Gris claro para muros
const PILLAR_COLOR = '#9CA3AF'; // Gris medio para pilares
const MARKING_COLOR = '#FFCC00'; // Amarillo para líneas

// --- Función de ayuda para crear espacios con sus líneas ---
const createSpaceWithMarkings = (
  id: string,
  label: string,
  status: 'available' | 'occupied' | 'accessible',
  x: number,
  y: number,
  rotation: number = 0
): MapElement[] => {
  const space: ParkingSpace = {
    kind: 'space', id, label, status, x, y,
    width: SPACE_WIDTH,
    height: SPACE_HEIGHT,
    rotation
  };

  const elements: MapElement[] = [space];

  // Líneas de demarcación (solo para espacios no rotados por ahora para simplicidad)
  if (rotation === 0) {
    // Línea trasera
    elements.push({ kind: 'obstacle', id: `${id}-mark-back`, type: 'marking', x: x, y: y + SPACE_HEIGHT, width: SPACE_WIDTH, height: 1.5, fill: MARKING_COLOR });
    // Línea izquierda
    elements.push({ kind: 'obstacle', id: `${id}-mark-left`, type: 'marking', x: x - 1.5, y: y, width: 1.5, height: SPACE_HEIGHT, fill: MARKING_COLOR });
    // Línea derecha
    elements.push({ kind: 'obstacle', id: `${id}-mark-right`, type: 'marking', x: x + SPACE_WIDTH, y: y, width: 1.5, height: SPACE_HEIGHT, fill: MARKING_COLOR });
  }

  return elements;
};


// --- Layout del Estacionamiento ---
const realisticParkingLayout: MapElement[] = [
  // Fondo de asfalto
  { kind: 'obstacle', id: 'road-full', type: 'road', x: 0, y: 0, width: 600, height: 600, fill: '#6B7280' },

  // Muros perimetrales
  { kind: 'obstacle', id: 'wall-top', type: 'wall', x: 10, y: 10, width: 580, height: 5, fill: WALL_COLOR },
  { kind: 'obstacle', id: 'wall-bottom', type: 'wall', x: 10, y: 585, width: 580, height: 5, fill: WALL_COLOR },
  { kind: 'obstacle', id: 'wall-left', type: 'wall', x: 10, y: 10, width: 5, height: 580, fill: WALL_COLOR },
  { kind: 'obstacle', id: 'wall-right', type: 'wall', x: 585, y: 10, width: 5, height: 580, fill: WALL_COLOR },

  // Vías de circulación
  { kind: 'obstacle', id: 'road-main-horiz', type: 'road', x: 15, y: 490, width: 570, height: 60, fill: ROAD_COLOR },
  { kind: 'obstacle', id: 'road-vert-1', type: 'road', x: 80, y: 15, width: 60, height: 475, fill: ROAD_COLOR },
  { kind: 'obstacle', id: 'road-vert-2', type: 'road', x: 250, y: 15, width: 60, height: 475, fill: ROAD_COLOR },
  { kind: 'obstacle', id: 'road-vert-3', type: 'road', x: 420, y: 15, width: 60, height: 475, fill: ROAD_COLOR },
  
  // --- Fila A ---
  ...createSpaceWithMarkings('A-01', 'A1', 'occupied', 35, 40),
  ...createSpaceWithMarkings('A-02', 'A2', 'available', 35, 110),
  ...createSpaceWithMarkings('A-03', 'A3', 'accessible', 35, 180),
  ...createSpaceWithMarkings('A-04', 'A4', 'available', 35, 250),
  ...createSpaceWithMarkings('A-05', 'A5', 'available', 35, 320),
  ...createSpaceWithMarkings('A-06', 'A6', 'occupied', 35, 390),

  // --- Fila B ---
  ...createSpaceWithMarkings('B-01', 'B1', 'available', 155, 40),
  ...createSpaceWithMarkings('B-02', 'B2', 'occupied', 155, 110),
  ...createSpaceWithMarkings('B-03', 'B3', 'available', 155, 180),
  ...createSpaceWithMarkings('B-04', 'B4', 'available', 155, 250),
  ...createSpaceWithMarkings('B-05', 'B5', 'available', 155, 320),
  ...createSpaceWithMarkings('B-06', 'B6', 'available', 155, 390),

  // --- Fila C ---
  ...createSpaceWithMarkings('C-01', 'C1', 'occupied', 205, 40),
  ...createSpaceWithMarkings('C-02', 'C2', 'available', 205, 110),
  ...createSpaceWithMarkings('C-03', 'C3', 'available', 205, 180),
  ...createSpaceWithMarkings('C-04', 'C4', 'occupied', 205, 250),
  ...createSpaceWithMarkings('C-05', 'C5', 'available', 205, 320),
  ...createSpaceWithMarkings('C-06', 'C6', 'available', 205, 390),
  
  // --- Fila D ---
  ...createSpaceWithMarkings('D-01', 'D1', 'available', 325, 40),
  ...createSpaceWithMarkings('D-02', 'D2', 'available', 325, 110),
  ...createSpaceWithMarkings('D-03', 'D3', 'available', 325, 180),
  ...createSpaceWithMarkings('D-04', 'D4', 'occupied', 325, 250),
  ...createSpaceWithMarkings('D-05', 'D5', 'available', 325, 320),
  ...createSpaceWithMarkings('D-06', 'D6', 'available', 325, 390),

  // --- Fila E ---
  ...createSpaceWithMarkings('E-01', 'E1', 'occupied', 375, 40),
  ...createSpaceWithMarkings('E-02', 'E2', 'available', 375, 110),
  ...createSpaceWithMarkings('E-03', 'E3', 'available', 375, 180),
  ...createSpaceWithMarkings('E-04', 'E4', 'available', 375, 250),
  ...createSpaceWithMarkings('E-05', 'E5', 'occupied', 375, 320),
  ...createSpaceWithMarkings('E-06', 'E6', 'available', 375, 390),
  
  // --- Fila F ---
  ...createSpaceWithMarkings('F-01', 'F1', 'available', 495, 40),
  ...createSpaceWithMarkings('F-02', 'F2', 'available', 495, 110),
  ...createSpaceWithMarkings('F-03', 'F3', 'occupied', 495, 180),
  ...createSpaceWithMarkings('F-04', 'F4', 'available', 495, 250),
  ...createSpaceWithMarkings('F-05', 'F5', 'available', 495, 320),
  ...createSpaceWithMarkings('F-06', 'F6', 'occupied', 495, 390),
  
  // Pilares
  { kind: 'obstacle', id: 'p-1', type: 'pillar', x: 70, y: 170, width: 10, height: 10, fill: PILLAR_COLOR},
  { kind: 'obstacle', id: 'p-2', type: 'pillar', x: 70, y: 380, width: 10, height: 10, fill: PILLAR_COLOR},
  { kind: 'obstacle', id: 'p-3', type: 'pillar', x: 240, y: 170, width: 10, height: 10, fill: PILLAR_COLOR},
  { kind: 'obstacle', id: 'p-4', type: 'pillar', x: 240, y: 380, width: 10, height: 10, fill: PILLAR_COLOR},
  { kind: 'obstacle', id: 'p-5', type: 'pillar', x: 410, y: 170, width: 10, height: 10, fill: PILLAR_COLOR},
  { kind: 'obstacle', id: 'p-6', type: 'pillar', x: 410, y: 380, width: 10, height: 10, fill: PILLAR_COLOR},
  
  // Señalización de Vías
  { kind: 'decoration', id: 'arrow-1', type: 'arrow', d: 'M0 10 L15 0 L30 10 L22 10 L22 25 L8 25 L8 10 Z', transform: 'translate(95, 450) rotate(180)', fill: MARKING_COLOR },
  { kind: 'decoration', id: 'arrow-2', type: 'arrow', d: 'M0 10 L15 0 L30 10 L22 10 L22 25 L8 25 L8 10 Z', transform: 'translate(265, 450) rotate(180)', fill: MARKING_COLOR },
  { kind: 'decoration', id: 'arrow-3', type: 'arrow', d: 'M0 10 L15 0 L30 10 L22 10 L22 25 L8 25 L8 10 Z', transform: 'translate(435, 450) rotate(180)', fill: MARKING_COLOR },
  { kind: 'decoration', id: 'arrow-main', type: 'arrow', d: 'M0 15 L15 0 L15 30 Z', transform: 'translate(50, 510)', fill: MARKING_COLOR },
  { kind: 'decoration', id: 'arrow-main-2', type: 'arrow', d: 'M0 15 L15 0 L15 30 Z', transform: 'translate(150, 510)', fill: MARKING_COLOR },
  { kind: 'decoration', id: 'arrow-main-3', type: 'arrow', d: 'M0 15 L15 0 L15 30 Z', transform: 'translate(250, 510)', fill: MARKING_COLOR },
  { kind: 'decoration', id: 'arrow-main-4', type: 'arrow', d: 'M0 15 L15 0 L15 30 Z', transform: 'translate(350, 510)', fill: MARKING_COLOR },
];


export const fetchParkingLayout = (): Promise<MapElement[]> => {
  return new Promise(resolve => {
    // Simula un retraso de red
    setTimeout(() => {
      resolve(realisticParkingLayout);
    }, 500);
  });
};