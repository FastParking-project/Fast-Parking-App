// Este archivo definirá los tipos de TypeScript para nuestra aplicación.

export type ParkingSpaceStatus = 'available' | 'occupied' | 'accessible';

export interface ParkingSpace {
  kind: 'space';
  id: string;
  label: string;
  status: ParkingSpaceStatus;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
}

export type ObstacleType = 'pillar' | 'wall' | 'road' | 'marking';

export interface Obstacle {
  kind: 'obstacle';
  id: string;
  type: ObstacleType;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
}

export interface Decoration {
    kind: 'decoration';
    id: string;
    type: 'arrow';
    d: string; // SVG path data
    fill?: string;
    transform?: string;
}


export type MapElement = ParkingSpace | Obstacle | Decoration;