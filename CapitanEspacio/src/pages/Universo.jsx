import React, { useState, useEffect } from 'react';

export default function Universo() {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Buscamos nebulosas en el banco de imágenes
    fetch('https://images-api.nasa.gov/search?q=nebula&media_type=image')
      .then((res) => {
        return res.json();
      })
      .then((datos) => {
        // La NASA mete los resultados dentro de collection.items
        const listaCompleta = datos.collection.items;
        // Nos quedamos solo con 6 para no saturar
        const primerosSeis = listaCompleta.slice(0, 6);
        
        setItems(primerosSeis);
        setCargando(false);
      })
      .catch((err) => {
        console.log("Error en Universo:", err);
        setCargando(false);
      });
  }, []);

  if (cargando === true) {
    return (
      <div className="p-6 text-center text-gray-400 font-mono">
        Viajando al universo profundo...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">🌌 El Universo Profundo</h1>
        <p className="text-xs text-gray-400">Descubrimientos indexados por la NASA</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => {
          // La API guarda la foto en 'links' y los textos en 'data'
          const foto = item.links[0]?.href;
          const info = item.data[0];

          return (
            <div key={index} className="bg-space-800 rounded-2xl overflow-hidden border border-gray-800 flex flex-col justify-between">
              <img 
                src={foto} 
                alt={info?.title} 
                className="w-full aspect-video object-cover bg-space-900" 
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{info?.title}</h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-3">
                    {info?.description || 'Sin descripción disponible.'}
                  </p>
                </div>
                <span className="block text-[10px] text-blue-400 font-mono mt-4 uppercase">
                  ID: {info?.nasa_id}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}