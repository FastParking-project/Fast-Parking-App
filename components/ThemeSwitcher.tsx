import React from 'react';
import { useThemeStore } from '@/src/store/themeStore';
import { SunIcon, MoonIcon, SystemIcon } from './Icons';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  const iconClasses = (current: 'light' | 'dark' | 'system') => `
    w-7 h-7 p-1 rounded-md transition-colors duration-200 ease-in-out
    ${theme === current
      ? 'bg-fp-blue text-white'
      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
    }
  `;

  return (
    <div className="flex items-center space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
      <button
        onClick={() => setTheme('light')}
        aria-label="Activar modo claro"
        title="Modo Claro"
      >
        <SunIcon className={iconClasses('light')} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        aria-label="Activar modo oscuro"
        title="Modo Oscuro"
      >
        <MoonIcon className={iconClasses('dark')} />
      </button>
      <button
        onClick={() => setTheme('system')}
        aria-label="Usar preferencia del sistema"
        title="Sistema"
      >
        <SystemIcon className={iconClasses('system')} />
      </button>
    </div>
  );
};

export default ThemeSwitcher;