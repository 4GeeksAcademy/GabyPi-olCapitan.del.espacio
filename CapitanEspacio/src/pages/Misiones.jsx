import React, { useState, useEffect } from 'react';

export default function Misiones() {
  const [listaMisiones, setListaMisiones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Buscamos contenido de misiones espaciales en el índice oficial de la NASA
    fetch('https://images-api.nasa.gov/search?q=mission&media_type=image')
      .then((res) => {
        return res.json();
      })
      .then((datos) => {
        const resultados = datos.collection.items;
        // Cortamos la lista para mostrar únicamente las primeras 4 misiones y mantener el diseño limpio
        setListaMisiones(resultados.slice(0, 4));
        setCargando(false);
      })
      .catch((err) => {
        console.log("Error en Misiones:", err);
        setCargando(false);
      });
  }, []);

  if (cargando === true) {
    return (
      <div className="p-6 text-center text-gray-400 font-mono">
        Cargando registro de misiones oficiales...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">🚀 Misiones Espaciales</h1>
        <p className="text-xs text-gray-400">Bitácora histórica de proyectos y flotas enviadas por las agencias</p>
      </div>

      <div className="space-y-4">
        {listaMisiones.map((item, index) => {
          const foto = item.links[0]?.href;
          const info = item.data[0];

          return (
            <div key={index} className="bg-space-800 border border-gray-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
              <img 
                src={foto} 
                alt={info?.title} 
                className="w-full sm:w-32 aspect-video object-cover rounded-xl bg-space-900" 
              />
              <div>
                <h3 className="text-sm font-bold text-white">{info?.title}</h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {info?.description || 'Sin detalles adicionales en el archivo.'}
                </p>
                <span className="inline-block text-[10px] text-blue-400 font-mono mt-2">
                  Centro: {info?.center || 'NASA'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}