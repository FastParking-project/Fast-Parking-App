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

export type ObstacleType = 
  'pillar' | 
  'wall' | 
  'marking' | 
  'curb' | 
  'greenery' |
  'asphalt-base' |
  'parking-area-background' |
  'driving-lane';

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
  // FIX: Add optional 'strokeWidth' property to support SVG path styling and fix type errors.
  strokeWidth?: string | number;
  borderRadius?: number;
  // FIX: Add optional 'rotation' property to support map transformations and resolve type error.
  rotation?: number;
}

export interface Decoration {
    kind: 'decoration';
    id: string;
    type: 'arrow' | 'line';
    d: string; // SVG path data
    fill?: string;
    transform?: string;
    // FIX: Add optional 'stroke' and 'strokeWidth' properties to support SVG path styling and fix type errors.
    stroke?: string;
    strokeWidth?: string | number;
}


export type MapElement = ParkingSpace | Obstacle | Decoration;