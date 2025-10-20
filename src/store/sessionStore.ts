import { create } from 'zustand';
import { ParkingSpace } from '@/types';

interface SessionState {
  selectedSpace: ParkingSpace | null;
  setSelectedSpace: (space: ParkingSpace | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  selectedSpace: null,
  setSelectedSpace: (space) => set({ selectedSpace: space }),
}));
