import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WheelchairIcon, CheckIcon, XIcon } from '@/components/Icons';

const AccessibilityPrompt: React.FC = () => {
  const navigate = useNavigate();

  const handleSelection = () => {
    // En un futuro, aquí guardaríamos la preferencia del usuario.
    // Por ahora, simplemente navegamos al mapa.
    navigate('/map');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center animate-fade-in">
      <main className="flex flex-col items-center">
        <WheelchairIcon className="h-24 w-24 text-fp-blue mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          ¿Necesitas un espacio de estacionamiento accesible?
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 mb-8 max-w-md">
          Te guiaremos al lugar más conveniente según tu elección.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
          <button
            onClick={handleSelection}
            className="flex-1 flex items-center justify-center w-full bg-fp-blue text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
            aria-label="Sí, necesito un espacio de estacionamiento accesible"
          >
            <CheckIcon className="h-6 w-6 mr-3" />
            Sí, por favor
          </button>
          <button
            onClick={handleSelection}
            className="flex-1 flex items-center justify-center w-full bg-gray-200 text-gray-800 font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-transform transform hover:scale-105"
            aria-label="No, no necesito un espacio de estacionamiento accesible"
          >
            <XIcon className="h-5 w-5 mr-3" />
            No, gracias
          </button>
        </div>
      </main>
    </div>
  );
};

export default AccessibilityPrompt;