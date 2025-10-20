import { ParkingSpace } from "@/types";

export const parkingSpaces: ParkingSpace[] = [
  // Fila A
  { id: 'A-01', label: 'A-01', status: 'occupied', x: 50, y: 50, width: 60, height: 100 },
  { id: 'A-02', label: 'A-02', status: 'available', x: 50, y: 160, width: 60, height: 100 },
  { id: 'A-03', label: 'A-03', status: 'accessible', x: 50, y: 270, width: 80, height: 100 },
  { id: 'A-04', label: 'A-04', status: 'available', x: 50, y: 380, width: 60, height: 100 },
  { id: 'A-05', label: 'A-05', status: 'occupied', x: 50, y: 490, width: 60, height: 100 },
  
  // Fila B (Rotada)
  { id: 'B-01', label: 'B-01', status: 'available', x: 250, y: 50, width: 100, height: 60 },
  { id: 'B-02', label: 'B-02', status: 'available', x: 360, y: 50, width: 100, height: 60 },
  { id: 'B-03', label: 'B-03', status: 'occupied', x: 470, y: 50, width: 100, height: 60 },

  // Fila C
  { id: 'C-01', label: 'C-01', status: 'available', x: 250, y: 530, width: 60, height: 100, rotation: 180 },
  { id: 'C-02', label: 'C-02', status: 'occupied', x: 320, y: 530, width: 60, height: 100, rotation: 180 },
  { id: 'C-03', label: 'C-03', status: 'available', x: 390, y: 530, width: 60, height: 100, rotation: 180 },
  { id: 'C-04', label: 'C-04', status: 'accessible', x: 460, y: 530, width: 80, height: 100, rotation: 180 },
];