import React, { useState, useEffect } from 'react';

export default function Luna() {
  const [datosLuna, setDatosLuna] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // wttr.in/?format=j1 nos da el estado del clima y astronomía actual en formato JSON
    fetch('https://wttr.in/?format=j1')
      .then((res) => {
        return res.json();
      })
      .then((datos) => {
        // Extraemos la información de hoy
        const astroHoy = datos.weather[0].astronomy[0];
        setDatosLuna(astroHoy);
        setCargando(false);
      })
      .catch((err) => {
        console.log("Error en Luna:", err);
        setCargando(false);
      });
  }, []);

  if (cargando === true) {
    return (
      <div className="p-6 text-center text-gray-400 font-mono">
        Calculando fase lunar actual...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">🌙 Estado de la Luna</h1>
        <p className="text-xs text-gray-400">Datos astronómicos del satélite en tiempo real</p>
      </div>

      <div className="bg-space-800 border border-gray-800 p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* Lado izquierdo */}
        <div className="text-center text-6xl py-4 bg-space-900 rounded-xl border border-gray-800/50">
          🌕
        </div>

        {/* Lado derecho */}
        <div className="space-y-3 text-sm text-gray-300">
          <p>
            <strong className="text-white">Fase actual:</strong> {datosLuna?.moon_phase}
          </p>
          <p>
            <strong className="text-white">Iluminación:</strong> {datosLuna?.moon_illumination}%
          </p>
          <p>
            <strong className="text-white">Salida de la Luna:</strong> {datosLuna?.moonrise}
          </p>
          <p>
            <strong className="text-white">Puesta de la Luna:</strong> {datosLuna?.moonset}
          </p>
        </div>
      </div>
    </div>
  );
}