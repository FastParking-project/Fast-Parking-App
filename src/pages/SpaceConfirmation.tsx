import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '@/src/store/sessionStore';
import { CheckCircleIcon } from '@/components/Icons';

const COUNTDOWN_SECONDS = 15;

const SpaceConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { selectedSpace, setSelectedSpace } = useSessionStore();
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Redirigir si no hay ningún espacio seleccionado al cargar la página
  useEffect(() => {
    if (!selectedSpace) {
      navigate('/map', { replace: true });
    }
  }, [selectedSpace, navigate]);

  // Lógica del temporizador de cuenta regresiva
  useEffect(() => {
    if (!selectedSpace || isConfirmed) return;

    if (countdown === 0) {
      handleCancel();
      return;
    }

    const timerId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [countdown, selectedSpace, isConfirmed]);

  const handleConfirm = () => {
    setIsConfirmed(true);
    // Simula una llamada a la API y luego navega
    setTimeout(() => {
      navigate('/navigate');
    }, 2000); // Muestra el mensaje de confirmación por 2 segundos
  };

  const handleCancel = () => {
    setSelectedSpace(null);
    navigate('/map');
  };

  if (!selectedSpace) {
    // Renderiza null o un loader mientras se redirige
    return null;
  }
  
  const progress = (countdown / COUNTDOWN_SECONDS) * 100;

  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center animate-fade-in">
        <CheckCircleIcon className="h-24 w-24 text-fp-green mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          ¡Espacio Confirmado!
        </h1>
        <p className="text-xl font-bold text-fp-blue mt-2 mb-8">{selectedSpace.label}</p>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          En breve serás redirigido a la navegación...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center animate-fade-in">
      <main className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Confirma tu Espacio
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Tienes {countdown} segundos para confirmar tu selección.
        </p>

        <div className="relative w-48 h-48 mb-8">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Círculo de fondo */}
            <circle
              className="text-gray-200 dark:text-gray-700"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
            />
            {/* Círculo de progreso */}
            <circle
              className="text-fp-blue"
              strokeWidth="10"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="45"
              cx="50"
              cy="50"
              style={{
                strokeDasharray: 283,
                strokeDashoffset: 283 - (283 * progress) / 100,
                transition: 'stroke-dashoffset 1s linear'
              }}
              transform="rotate(-90 50 50)"
            />
            <text x="50" y="50" textAnchor="middle" dy=".3em" className="text-4xl font-bold fill-current text-gray-800 dark:text-gray-100">
              {countdown}
            </text>
          </svg>
        </div>

        <p className="text-2xl text-gray-600 dark:text-gray-400">Espacio seleccionado:</p>
        <p className="text-6xl font-extrabold text-fp-blue mb-10">{selectedSpace.label}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <button
            onClick={handleConfirm}
            className="flex-1 w-full bg-fp-blue text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
            aria-label={`Confirmar reserva del espacio ${selectedSpace.label}`}
          >
            Confirmar Reserva
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 w-full bg-gray-200 text-gray-800 font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-transform transform hover:scale-105"
            aria-label="Cancelar y elegir otro espacio"
          >
            Elegir Otro Espacio
          </button>
        </div>
      </main>
    </div>
  );
};

export default SpaceConfirmation;
