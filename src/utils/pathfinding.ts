import { MapElement, ParkingSpace } from "@/types";

export interface Point {
  x: number;
  y: number;
}

const GRID_SIZE = 10;
// Dimensiones actualizadas para el mapa horizontal
const MAP_WIDTH = 1200;
const MAP_HEIGHT = 700;

// Función para simplificar la ruta eliminando puntos colineales innecesarios
const simplifyPath = (path: Point[]): Point[] => {
    if (path.length < 3) return path;
    const newPath = [path[0]];
    for (let i = 1; i < path.length - 1; i++) {
        const p1 = newPath[newPath.length - 1];
        const p2 = path[i];
        const p3 = path[i + 1];

        // Usar producto cruzado para verificar colinealidad con una tolerancia
        const crossProduct = (p2.y - p1.y) * (p3.x - p2.x) - (p2.x - p1.x) * (p3.y - p2.y);
        if (Math.abs(crossProduct) > 1e-9) { 
            newPath.push(p2);
        }
    }
    newPath.push(path[path.length - 1]);
    return newPath;
};

export const calculatePath = (
  start: Point,
  endSpace: ParkingSpace,
  mapElements: MapElement[]
): Point[] => {
  const gridWidth = Math.ceil(MAP_WIDTH / GRID_SIZE);
  const gridHeight = Math.ceil(MAP_HEIGHT / GRID_SIZE);

  // 1. Iniciar la cuadrícula como no transitable
  const grid: boolean[][] = Array(gridWidth)
    .fill(0)
    .map(() => Array(gridHeight).fill(false));

  // 2. Marcar solo los 'driving-lane' como transitables
  mapElements.forEach(element => {
    if (element.kind === 'obstacle' && element.type === 'driving-lane') {
      const startX = Math.floor(element.x / GRID_SIZE);
      const endX = Math.ceil((element.x + element.width) / GRID_SIZE);
      const startY = Math.floor(element.y / GRID_SIZE);
      const endY = Math.ceil((element.y + element.height) / GRID_SIZE);

      for (let i = startX; i < endX; i++) {
        for (let j = startY; j < endY; j++) {
          if (i >= 0 && i < gridWidth && j >= 0 && j < gridHeight) {
            grid[i][j] = true;
          }
        }
      }
    }
  });
  
  const endPoint = {
    x: endSpace.x + endSpace.width / 2,
    y: endSpace.y + endSpace.height / 2
  };
  
  // 3. Lógica de "punto de aproximación" para el mapa horizontal.
  // El vehículo se alineará en el centro del carril de conducción antes de entrar al espacio.
  const drivingLaneCenterY = 375; // Updated to new center
  const approachPoint: Point = { x: endPoint.x, y: drivingLaneCenterY };

  const startGrid = {
    x: Math.floor(start.x / GRID_SIZE),
    y: Math.floor(start.y / GRID_SIZE),
  };
  
  const endGrid = {
    x: Math.floor(approachPoint.x / GRID_SIZE),
    y: Math.floor(approachPoint.y / GRID_SIZE),
  };
  
  // Asegurarse de que el punto de inicio y de fin estén en áreas transitables
  if (!grid[startGrid.x]?.[startGrid.y]) grid[startGrid.x][startGrid.y] = true;
  if (!grid[endGrid.x]?.[endGrid.y]) grid[endGrid.x][endGrid.y] = true;

  const queue: { x: number; y: number; path: Point[] }[] = [{ 
    ...startGrid, 
    path: [start] 
  }];
  const visited = new Set<string>([`${startGrid.x},${startGrid.y}`]);
  
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // 4 direcciones

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;

    if (current.x === endGrid.x && current.y === endGrid.y) {
      // 4. Ruta encontrada: combinar la ruta BFS con la maniobra final de estacionamiento
      const finalPath = [...current.path, approachPoint, endPoint];
      return simplifyPath(finalPath);
    }

    for (const [dx, dy] of directions) {
      const nextX = current.x + dx;
      const nextY = current.y + dy;
      const key = `${nextX},${nextY}`;

      if (
        nextX >= 0 && nextX < gridWidth &&
        nextY >= 0 && nextY < gridHeight &&
        grid[nextX][nextY] &&
        !visited.has(key)
      ) {
        visited.add(key);
        const newPath = [...current.path, { x: nextX * GRID_SIZE + GRID_SIZE / 2, y: nextY * GRID_SIZE + GRID_SIZE / 2 }];
        queue.push({ x: nextX, y: nextY, path: newPath });
      }
    }
  }
  
  console.error("Pathfinding error: No path found.");
  // Si no se encuentra una ruta, regresa una ruta directa como fallback.
  return [start, approachPoint, endPoint];
};