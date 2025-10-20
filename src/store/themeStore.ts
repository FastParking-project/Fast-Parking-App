import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Cargar el tema desde localStorage para persistencia
const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
      return storedTheme;
    }
  }
  return 'system';
};


export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
    set({ theme });
  },
}));
