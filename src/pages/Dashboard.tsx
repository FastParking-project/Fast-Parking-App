
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '@/src/store/sessionStore';
import { CarIcon, DollarSignIcon, FastParkingLogo } from '@/components/Icons';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { selectedSpace, sessionStart } = useSessionStore();
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    if (!sessionStart) {
      // Si no hay una sesión iniciada, el temporizador no se inicia.
      // El componente mostrará el estado de "No hay sesión activa".
      return;
    }

    const timerInterval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - sessionStart.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
      const seconds = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');

      setElapsedTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [sessionStart]);

  if (!selectedSpace || !sessionStart) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">No hay sesión activa</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 mb-8">
          Escanea un ticket de entrada para comenzar.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-fp-blue text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-opacity-90"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
      <header className="p-4 bg-white dark:bg-gray-900 shadow-md">
        <FastParkingLogo className="w-48 h-auto mx-auto text-fp-blue dark:text-white" />
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-full max-w-sm p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl animate-fade-in">
          <p className="text-xl text-gray-500 dark:text-gray-400">Tu espacio</p>
          <p className="text-8xl font-extrabold text-fp-blue my-2">{selectedSpace.label}</p>
          
          <div className="my-8">
            <p className="text-lg text-gray-500 dark:text-gray-400">Tiempo transcurrido</p>
            <p className="text-5xl font-mono font-bold text-gray-800 dark:text-gray-100 tracking-wider">
              {elapsedTime}
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
             <button
              onClick={() => navigate('/find-vehicle')}
              className="flex items-center justify-center w-full bg-gray-200 text-gray-800 font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-transform transform hover:scale-105"
              aria-label="Encontrar mi vehículo"
            >
              <CarIcon className="h-6 w-6 mr-3" />
              Encontrar mi vehículo
            </button>
            <button
              onClick={() => navigate('/payment')}
              className="flex items-center justify-center w-full bg-fp-blue text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
              aria-label="Pagar y salir del estacionamiento"
            >
              <DollarSignIcon className="h-6 w-6 mr-3" />
              Pagar y Salir
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;