import React, { useEffect } from 'react';
import AppRouter from '@/src/routes';
import { useThemeStore } from '@/src/store/themeStore';

const App: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      const isDark =
        theme === 'dark' ||
        (theme === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      root.classList.toggle('dark', isDark);
    };

    applyTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Usamos getState para asegurarnos de tener el valor más reciente del store
      // dentro del closure del listener de eventos.
      if (useThemeStore.getState().theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <div className="font-sans antialiased text-gray-900 dark:text-gray-100">
      <AppRouter />
    </div>
  );
};

export default App;