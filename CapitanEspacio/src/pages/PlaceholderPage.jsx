import React from 'react';

export default function PlaceholderPage({ title }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1>
      <p className="text-gray-400">Esta sección se conectará con la API de la NASA en los próximos días.</p>
      <div className="mt-6 h-64 border border-dashed border-gray-700 rounded-2xl flex items-center justify-center bg-space-800/50">
        <span className="text-gray-500">Vista previa del módulo de datos</span>
      </div>
    </div>
  );
}