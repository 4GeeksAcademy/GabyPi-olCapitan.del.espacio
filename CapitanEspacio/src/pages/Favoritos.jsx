import React, { useContext } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { FavoritosContext } from '../context/FavoritosContext';

export default function Favoritos() {
  // Traemos el listado y la misma función para borrar directamente desde las tarjetas
  const { favoritos, toggleFavorito } = useContext(FavoritosContext);

  // Si la lista está vacía, mostramos pantalla de aviso
  if (favoritos.length === 0) {
    return (
      <div className="p-12 text-center max-w-md mx-auto mt-20 bg-space-800 border border-gray-800 rounded-3xl shadow-2xl">
        <div className="w-16 h-16 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-500">
          <Heart size={24} />
        </div>
        <h2 className="text-lg font-bold text-white mb-1">Sin favoritos guardados</h2>
        <p className="text-xs text-gray-400 leading-relaxed">
          Explorá la Galería de la NASA y marcá con un corazón tus capturas preferidas del cosmos para verlas acá.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Heart className="text-red-500 fill-red-500" size={24} /> Mis Favoritos
        </h1>
        <p className="text-xs text-gray-400">Tus capturas espaciales preferidas almacenadas en la bitácora</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favoritos.map((img, index) => (
          <div key={index} className="bg-space-800 rounded-2xl overflow-hidden border border-gray-800 relative">
            
            {/* BOTÓN DE ELIMINACIÓN DIRECTA */}
            <button
              onClick={() => toggleFavorito(img)}
              className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-space-900/80 backdrop-blur-md border border-gray-800 text-red-500 hover:bg-red-950/30 transition-colors"
              title="Quitar de favoritos"
            >
              <Trash2 size={16} />
            </button>

            <img src={img.url} alt={img.title} className="w-full aspect-square object-cover" />

            <div className="p-4">
              <h3 className="text-sm font-bold text-white truncate">{img.title}</h3>
              {/* Detalle rústico: agregamos un tag estático para simular metadatos de guardado */}
              <p className="text-[10px] font-mono text-space-primary uppercase mt-1">Misión de guardado manual</p>
              
              <a 
                href={img.hdurl || img.url} 
                target="_blank" 
                rel="noreferrer"
                className="block text-center bg-space-700 hover:bg-space-600 text-white text-xs font-bold py-2 px-4 rounded-xl mt-4 transition-colors"
              >
                Ver Imagen Completa
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}