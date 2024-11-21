import React, { useEffect, useRef, useState } from 'react';

interface KeySyncProps {
  url: string;
}

const KeySync: React.FC<KeySyncProps> = ({ url }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== new URL(url).origin) return;
      console.log('Mensaje recibido del iframe:', event.data);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [url]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setError('Error al cargar KeySync');
    setIsLoading(false);
  };

  return (
    <div className="absolute inset-0 flex flex-col">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Cargando KeySync...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
          <div className="text-red-600 text-center">
            <p className="font-semibold">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={url}
        title="KeySync Integration"
        className="flex-1 w-full h-full"
        style={{ height: '100vh' }}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi"
        frameBorder="0"
      />
    </div>
  );
};

export default KeySync;