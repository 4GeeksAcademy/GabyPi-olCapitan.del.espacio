import React, { useState, useEffect } from 'react';

export default function Asteroides() {
  const [listaAsteroides, setListaAsteroides] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Conseguimos la fecha de hoy en formato AAAA-MM-DD
    const hoy = new Date().toISOString().split('T')[0];

    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${hoy}&end_date=${hoy}&api_key=DEMO_KEY`)
      .then((res) => {
        return res.json();
      })
      .then((datos) => {
        // La API nos devuelve los asteroides agrupados por la fecha de hoy
        const datosDeHoy = datos.near_earth_objects[hoy];
        setListaAsteroides(datosDeHoy);
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
        Escaneando asteroides cercanos...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">☄️ Asteroides del Día</h1>
        <p className="text-xs text-gray-400">Objetos detectados por el radar de la NASA hoy</p>
      </div>

      <div className="bg-space-800 rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-space-900 text-gray-400">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">¿Es Peligroso?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {listaAsteroides.map((ast) => {
              return (
                <tr key={ast.id} className="hover:bg-space-700/20">
                  <td className="p-4 font-bold text-white font-mono">{ast.name}</td>
                  <td className="p-4">
                    {ast.is_potentially_hazardous_asteroid === true ? (
                      <span className="text-amber-400 font-bold">⚠️ Sí, Potencial</span>
                    ) : (
                      <span className="text-emerald-400">✅ No, Seguro</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}