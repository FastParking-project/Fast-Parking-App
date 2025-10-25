import React from 'react';
import { useThemeStore } from '@/src/store/themeStore';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <label
      htmlFor="theme-toggle"
      className="relative inline-flex items-center w-14 h-7 cursor-pointer"
      title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
    >
      <input
        id="theme-toggle"
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        className="peer sr-only"
        aria-label="Selector de tema"
      />
      {/* Background */}
      <div className="w-full h-full rounded-full bg-fp-blue peer-checked:bg-gray-700 transition-colors duration-300 ease-in-out"></div>
      
      {/* Thumb */}
      <div className="absolute top-[2px] left-[2px] w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out peer-checked:translate-x-7"></div>
    </label>
  );
};

export default ThemeSwitcher;