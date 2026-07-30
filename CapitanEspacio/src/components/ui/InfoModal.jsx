import React from 'react';
import { X } from 'lucide-react';

export default function InfoModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* fondo exterior */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* caja del modal */}
      <div className="bg-space-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 animate-fade-in p-6">
        <div className="flex justify-between items-center border-b border-gray-800/80 pb-3 mb-4">
          <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-space-800 rounded-xl text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="text-gray-200 space-y-4 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}