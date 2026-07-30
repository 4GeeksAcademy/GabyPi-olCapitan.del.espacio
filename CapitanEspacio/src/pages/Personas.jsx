import React, { useState, useEffect } from 'react';

export default function Personas() {
  const [astronautas, setAstronautas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Usamos la API de los lanzamientos que no falla
    fetch('https://ll.thespacedevs.com/2.2.0/astronaut/?in_space=true')
      .then((res) => {
        return res.json();
      })
      .then((datos) => {
        // Esta API nos devuelve la lista dentro de 'results'
        setAstronautas(datos.results || []);
        setCargando(false);
      })
      .catch((err) => {
        console.log("Error en Personas:", err);
        setCargando(false);
      });
  }, []);

  if (cargando === true) {
    return (
      <div className="p-6 text-center text-gray-400 font-mono">
        Contando astronautas en órbita...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">👨‍🚀 Humanos en el Espacio</h1>
        <p className="text-xs text-gray-400">Lista real de la tripulación internacional en el espacio exterior ahora mismo</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {astronautas.map((persona, index) => {
          return (
            <div key={index} className="bg-space-800 border border-gray-800 p-4 rounded-2xl">
              {/* Mostramos el nombre del astronauta */}
              <h3 className="text-sm font-bold text-white">{persona.name}</h3>
              
              {/* Mostramos algunos datos */}
              <p className="text-xs text-blue-400 mt-2 font-mono">
                🌍 Agencia: {persona.agency?.name || 'Internacional'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}