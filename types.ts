// Este archivo definirá los tipos de TypeScript para nuestra aplicación.

export type ParkingSpaceStatus = 'available' | 'occupied' | 'accessible';

export interface ParkingSpace {
  id: string;
  label: string;
  status: ParkingSpaceStatus;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
}
