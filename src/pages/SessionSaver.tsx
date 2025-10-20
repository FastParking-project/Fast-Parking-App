import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCodeIcon } from '@/components/Icons';

const SessionSaver: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scanSuccess, setScanSuccess] = useState(false);

  const startCamera = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsLoading(false);
      } else {
        throw new Error('Tu navegador no soporta el acceso a la cámara.');
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError('Permiso de cámara denegado. Por favor, habilítalo en los ajustes de tu navegador.');
        } else {
          setError('No se pudo acceder a la cámara. Inténtalo de nuevo.');
        }
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startCamera();

    // Cleanup: detener la cámara cuando el componente se desmonte
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Simulación de escaneo de QR
  useEffect(() => {
    if (!isLoading && !error) {
      const timer = setTimeout(() => {
        setScanSuccess(true);
        // Espera un poco para el feedback visual antes de navegar
        setTimeout(() => {
          navigate('/accessibility');
        }, 1500); // Aumentado de 500ms a 1500ms
      }, 3000); // Simula escaneo por 3 segundos

      return () => clearTimeout(timer);
    }
  }, [isLoading, error, navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 overflow-hidden">
      <div className="text-center z-10 mb-4">
        <h1 className="text-2xl font-bold">Escanear Ticket de Entrada</h1>
        <p className="text-gray-300">Apunta al código QR de tu ticket</p>
      </div>

      <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
          aria-label="Vista de la cámara para escanear código QR"
        />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div
            className={`w-full h-full border-4 rounded-lg transition-colors duration-500 ${
              scanSuccess ? 'border-fp-green' : 'border-white/50'
            }`}
            style={{
              boxShadow: scanSuccess
                ? '0 0 20px 5px var(--color-fp-green)'
                : '0 0 0 9999px rgba(0,0,0,0.5)',
            }}
          />
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
            <p>Iniciando cámara...</p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 bg-fp-red/90 flex flex-col items-center justify-center text-center p-4">
            <p className="font-bold mb-4">{error}</p>
            <button
              onClick={startCamera}
              className="bg-white text-fp-red font-bold py-2 px-4 rounded-lg"
            >
              Reintentar
            </button>
          </div>
        )}

        {scanSuccess && (
          <div className="absolute inset-0 bg-fp-green/80 flex flex-col items-center justify-center">
            <QrCodeIcon className="h-16 w-16 mb-4" />
            <p className="text-xl font-bold">¡Código escaneado!</p>
          </div>
        )}
      </div>

      <div className="mt-8 z-10">
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

export default SessionSaver;