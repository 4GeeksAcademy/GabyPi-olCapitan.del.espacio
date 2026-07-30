import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorCard({ message, onRetry }) {
  return (
    <div className="bg-space-800/30 border border-red-900/30 rounded-2xl p-6 flex flex-col justify-between items-center text-center h-full min-h-[220px] backdrop-blur-md">
      <div className="text-red-500/80 p-3 bg-red-950/30 rounded-xl mb-2">
        <AlertTriangle size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-300">Fallo de Telemetría</p>
        <p className="text-xs text-gray-500 mt-1 max-w-[200px]">{message || 'No se han podido cargar los datos.'}</p>
      </div>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-4 flex items-center gap-2 px-4 py-1.5 bg-space-700/50 hover:bg-space-700 text-xs text-gray-300 rounded-xl border border-gray-700 transition-colors w-full justify-center"
        >
          <RefreshCw size={12} />
          Reintentar enlace
        </button>
      )}
    </div>
  );
}