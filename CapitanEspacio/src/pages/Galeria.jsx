import React, { useState, useEffect, useContext } from 'react';
import { Heart, Image } from 'lucide-react'; 
import { FavoritosContext } from '../context/FavoritosContext';

export default function Galeria() {
  const [imagenes, setImagenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorApi, setErrorApi] = useState(null);

  // Consumimos los datos globales de nuestra lista de favs
  const { favoritos, toggleFavorito } = useContext(FavoritosContext);

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=6')
      .then((respuesta) => {
        return respuesta.json(); 
      })
      .then((datos) => {
        // Validamos si la NASA devolvió un array o un objeto de error
        if (Array.isArray(datos)) {
          setImagenes(datos); 
        } else {
          console.error("La API de la NASA no devolvió un array. Respuesta:", datos);
          setErrorApi("¡Límite de excedido! La demo está saturada.");
        }
        setCargando(false); 
      })
      .catch((error) => {
        console.log("Hubo un error en la conexión:", error);
        setErrorApi("Error de conexión al centro de control de la NASA.");
        setCargando(false);
      });
  }, []);

  // Si está cargando, mostramos el cartel
  if (cargando === true) {
    return (
      <div className="p-6 text-center text-gray-400 font-mono">
        Cargando imágenes desde la NASA...
      </div>
    );
  }

  // Si saltó el límite de la demo, mostramos el panel de error
  if (errorApi) {
    return (
      <div className="p-12 text-center max-w-md mx-auto mt-20 bg-space-800 border border-gray-800 rounded-3xl shadow-2xl">
        <span className="text-3xl">⚠️</span>
        <h2 className="text-base font-bold text-white mt-3 mb-1">Fallo de Telemetría</h2>
        <p className="text-xs text-gray-400 leading-relaxed font-mono">{errorApi}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Image className="text-space-primary" size={24} /> Galería NASA
        </h1>
        <p className="text-xs text-gray-400">Imágenes reales del día astronómico</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {imagenes.map((img, index) => {
          // Buscamos si la imagen actual ya está guardada
          const esFavorito = favoritos.some((fav) => fav.url === img.url);

          return (
            <div key={index} className="bg-space-800 rounded-2xl overflow-hidden border border-gray-800 relative group">
              
              {/* BOTÓN DE CORAZÓN */}
              <button
                onClick={() => toggleFavorito(img)}
                className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-space-900/80 backdrop-blur-md border border-gray-800 text-gray-400 hover:text-red-500 transition-all duration-200 active:scale-90"
                title={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
              >
                <Heart 
                  size={16} 
                  className={esFavorito === true ? "fill-red-500 text-red-500" : "text-gray-400"} 
                />
              </button>

              {img.url && (
                <img 
                  src={img.url} 
                  alt={img.title || "Imagen de la NASA"} 
                  className="w-full aspect-square object-cover group-hover:scale-[1.02] transition-transform duration-300" 
                />
              )}
              
              <div className="p-4 relative bg-space-800">
                <h3 className="text-sm font-bold text-white truncate">{img.title || "Sin título"}</h3>
                <p className="text-[11px] text-gray-500 mt-1">{img.date || "Fecha de misión desconocida"}</p>
                
                <a 
                  href={img.hdurl || img.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl mt-4 transition-colors"
                >
                  Ver Imagen Completa
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}