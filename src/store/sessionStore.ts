import { create } from 'zustand';
import { ParkingSpace } from '@/types';

interface SessionState {
  selectedSpace: ParkingSpace | null;
  sessionStart: Date | null;
  setSelectedSpace: (space: ParkingSpace | null) => void;
  startSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  selectedSpace: null,
  sessionStart: null,
  setSelectedSpace: (space) => set({ selectedSpace: space }),
  startSession: () => set({ sessionStart: new Date() }),
}));