import React, { useState, useEffect } from 'react';

export default function Lanzamientos() {
  const [cohetes, setCohetes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=4')
      .then((res) => {
        return res.json();
      })
      .then((datos) => {
        setCohetes(datos.results); 
        setCargando(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setCargando(false);
      });
  }, []);

  if (cargando === true) {
    return (
      <div className="p-6 text-center text-gray-400 font-mono">
        Buscando próximos despegues...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">🚀 Próximos Lanzamientos</h1>
        <p className="text-xs text-gray-400">Calendario internacional de misiones espaciales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cohetes.map((item) => {
          return (
            <div key={item.id} className="bg-space-800 border border-gray-800 p-5 rounded-2xl">
              <h3 className="text-sm font-bold text-white">{item.name}</h3>
              <p className="text-xs text-blue-400 mt-1">
                Proveedor: {item.launch_service_provider?.name}
              </p>
              <p className="text-xs text-gray-400 mt-3">
                📍 Lugar: {item.pad?.location?.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}