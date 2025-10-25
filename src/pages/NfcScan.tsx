import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NfcIcon, CheckIcon } from '@/components/Icons';

const NfcScan: React.FC = () => {
  const navigate = useNavigate();
  const [scanStatus, setScanStatus] = useState<'scanning' | 'success'>('scanning');

  // Simulación de escaneo
  useEffect(() => {
    const scanTimer = setTimeout(() => {
      setScanStatus('success');
    }, 3000); // Simula escaneo por 3 segundos

    return () => clearTimeout(scanTimer);
  }, []);

  // Navegación tras escaneo exitoso
  useEffect(() => {
    if (scanStatus === 'success') {
      const navigateTimer = setTimeout(() => {
        // En un caso real, aquí se asociaría el ID de la tarjeta NFC
        // con una nueva sesión de estacionamiento.
        navigate('/map');
      }, 1500); // Muestra el mensaje de éxito por 1.5 segundos

      return () => clearTimeout(navigateTimer);
    }
  }, [scanStatus, navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 overflow-hidden">
      <div className="text-center z-10 mb-8">
        <h1 className="text-2xl font-bold">Escanear Tarjeta NFC</h1>
        <p className="text-gray-300">Acerca tu tarjeta o dispositivo</p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {scanStatus === 'scanning' && (
          <div className="flex flex-col items-center justify-center animate-fade-in">
            {/* Animación de pulso */}
            <div className="absolute inset-0 bg-fp-blue/20 rounded-full animate-ping"></div>
            <NfcIcon className="w-32 h-32 text-fp-blue" />
          </div>
        )}

        {scanStatus === 'success' && (
          <div className="absolute inset-0 bg-fp-green/80 rounded-full flex flex-col items-center justify-center animate-fade-in">
            <CheckIcon className="h-24 w-24 mb-2" />
            <p className="text-xl font-bold">¡Éxito!</p>
          </div>
        )}
      </div>

      <div className="mt-16 z-10">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default NfcScan;