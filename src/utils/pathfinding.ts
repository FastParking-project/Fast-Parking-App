import { MapElement, ParkingSpace } from "@/types";

export interface Point {
  x: number;
  y: number;
}

// Simple Breadth-First Search (BFS) for pathfinding on a grid.
const GRID_SIZE = 10; // Use a smaller grid size for better path resolution around objects.

export const calculatePath = (
  start: Point,
  endSpace: ParkingSpace,
  mapElements: MapElement[],
  mapWidth = 600,
  mapHeight = 600
): Point[] => {
  const gridWidth = Math.ceil(mapWidth / GRID_SIZE);
  const gridHeight = Math.ceil(mapHeight / GRID_SIZE);

  // Create a grid representing walkable areas.
  const grid: boolean[][] = Array(gridWidth)
    .fill(0)
    .map(() => Array(gridHeight).fill(true));

  // Mark obstacles on the grid.
  // Treat all map elements that aren't the destination as potential obstacles.
  mapElements.forEach(element => {
    if (element.kind === 'obstacle' || (element.kind === 'space' && element.id !== endSpace.id)) {
      const startX = Math.floor(element.x / GRID_SIZE);
      const endX = Math.ceil((element.x + element.width) / GRID_SIZE);
      const startY = Math.floor(element.y / GRID_SIZE);
      const endY = Math.ceil((element.y + element.height) / GRID_SIZE);

      for (let i = startX; i < endX; i++) {
        for (let j = startY; j < endY; j++) {
          if (i >= 0 && i < gridWidth && j >= 0 && j < gridHeight) {
            grid[i][j] = false;
          }
        }
      }
    }
  });

  const startGrid = {
    x: Math.floor(start.x / GRID_SIZE),
    y: Math.floor(start.y / GRID_SIZE),
  };
  
  const endGrid = {
    x: Math.floor((endSpace.x + endSpace.width / 2) / GRID_SIZE),
    y: Math.floor((endSpace.y + endSpace.height / 2) / GRID_SIZE),
  };
  
  // Check if start or end points are valid.
  if (!grid[startGrid.x]?.[startGrid.y] || !grid[endGrid.x]?.[endGrid.y]) {
    console.error("Pathfinding error: Start or end point is inside an obstacle.");
    // Return a direct line as a fallback.
    return [start, {x: endSpace.x + endSpace.width / 2, y: endSpace.y + endSpace.height / 2}];
  }
  
  const queue: { x: number; y: number; path: Point[] }[] = [{ 
    ...startGrid, 
    path: [{x: start.x, y: start.y}] 
  }];
  const visited = new Set<string>([`${startGrid.x},${startGrid.y}`]);
  
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // Up, Down, Right, Left

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;

    if (current.x === endGrid.x && current.y === endGrid.y) {
      // Path found.
      const finalPath = [...current.path, {x: endSpace.x + endSpace.width / 2, y: endSpace.y + endSpace.height / 2}];
      return finalPath;
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
  // Return a direct line as a fallback if no path is found.
  return [start, {x: endSpace.x + endSpace.width / 2, y: endSpace.y + endSpace.height / 2}];
};
