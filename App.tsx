import React, { useEffect } from 'react';
import AppRouter from '@/src/routes';
import { useThemeStore } from '@/src/store/themeStore';

const App: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="font-sans antialiased text-gray-900 dark:text-gray-100">
      <AppRouter />
    </div>
  );
};

export default App;