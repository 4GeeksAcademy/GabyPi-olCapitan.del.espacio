import React from 'react';
import { X } from 'lucide-react';

export default function InfoModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo traslúcido difuminado */}
      <div className="absolute inset-0 bg-space-900/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      {/* Caja del Modal */}
      <div className="bg-space-800 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 animate-fade-in p-6">
        <div className="flex justify-between items-center border-b border-gray-800/60 pb-3 mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-space-700 rounded-xl text-gray-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="text-gray-300 space-y-4 text-sm">{children}</div>
      </div>
    </div>
  );
}