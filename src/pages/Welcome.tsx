import React from 'react';
import { Link } from 'react-router-dom';
import { FastParkingLogo, QrCodeIcon, NfcIcon } from '@/components/Icons';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const Welcome: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen p-4 text-center animate-fade-in">
      <div className="absolute top-4 right-4 z-10">
        <ThemeSwitcher />
      </div>

      <header className="mb-12 w-full max-w-sm px-4">
        <FastParkingLogo className="w-full h-auto text-fp-blue" />
      </header>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 -mt-8 mb-12">
        Tu experiencia de estacionamiento inteligente comienza aquí.
      </p>

      <main className="w-full max-w-xs flex flex-col gap-4">
        <Link
          to="/save-session"
          className="flex items-center justify-center w-full bg-fp-blue text-white font-bold py-4 px-4 rounded-full shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
          aria-label="Escanear código QR de entrada para iniciar sesión de estacionamiento"
        >
          <QrCodeIcon className="h-6 w-6 mr-3" />
          Escanear QR de Entrada
        </Link>
        <Link
          to="/nfc-scan"
          className="flex items-center justify-center w-full bg-fp-blue text-white font-bold py-4 px-4 rounded-full shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
          aria-label="Escanear NFC de entrada para iniciar sesión de estacionamiento"
        >
          <NfcIcon className="h-6 w-6 mr-3" />
          Escanear NFC de Entrada
        </Link>
      </main>

      <footer className="mt-8">
        <Link
          to="/dashboard"
          className="text-sm text-fp-blue hover:underline"
          aria-label="Ingresar al panel de control si ya tienes una sesión activa"
        >
          ¿Ya tienes una sesión activa? Ingresa aquí
        </Link>
      </footer>
    </div>
  );
};

export default Welcome;