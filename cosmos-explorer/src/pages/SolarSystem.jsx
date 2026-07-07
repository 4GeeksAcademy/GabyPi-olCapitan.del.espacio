import React, { useState, useEffect } from 'react';
import { spaceService } from '../services/spaceService';
import LoadingCard from '../components/ui/LoadingCard';
import ErrorCard from '../components/ui/ErrorCard';
import InfoModal from '../components/ui/InfoModal';
import { useSearch } from '../context/SearchContext';
import { Shield } from 'lucide-react';

export default function SolarSystem() {
  const [bodies, setBodies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBody, setSelectedBody] = useState(null);
  const { globalQuery } = useSearch();

  const loadData = async () => {
    setLoading(true); setError(null);
    try {
      const data = await spaceService.getSolarSystemBodies();
      // Filtrar solo los planetas reales principales
      const planetsOnly = data.filter(b => b.isPlanet === true || b.type === 'Planet');
      setBodies(planetsOnly);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  // Filtro del buscador de la Navbar
  const filteredPlanets = bodies.filter(p => 
    p.name.toLowerCase().includes(globalQuery.toLowerCase())
  );

  if (loading) return <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6"><LoadingCard /><LoadingCard /><LoadingCard /></div>;
  if (error) return <div className="p-6"><ErrorCard message={error} onRetry={loadData} /></div>;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Fichas de Planetas</h1>
        <p className="text-sm text-gray-400">Modelos de masa, gravedad y traslación orbital comparada.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPlanets.map(planet => {
          // Cálculo simple comparativo (Radio Tierra aproximado = 6371km, Diámetro = 12742km)
          const earthRatio = planet.diameter !== 'Desconocido' ? (planet.diameter / 12742).toFixed(2) : 'N/A';

          return (
            <div 
              key={planet.id} 
              onClick={() => setSelectedBody(planet)}
              className="bg-space-800/40 border border-gray-800 hover:border-space-primary rounded-2xl p-5 cursor-pointer transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white group-hover:text-space-primary transition-colors">{planet.name}</h3>
                <span className="text-xs bg-space-700/60 text-gray-400 px-2 py-0.5 rounded-md font-mono">x{earthRatio} Tierra</span>
              </div>
              <div className="space-y-1.5 text-xs text-gray-400 font-mono">
                <div className="flex justify-between"><span>Gravedad:</span> <span className="text-gray-200">{planet.gravity} m/s²</span></div>
                <div className="flex justify-between"><span>Lunas:</span> <span className="text-gray-200">{planet.moons}</span></div>
                <div className="flex justify-between"><span>Temp. Media:</span> <span className="text-gray-200">{planet.temp} °C</span></div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800/60 text-center text-[11px] text-space-primary font-semibold">
                Ver parámetros orbitales completos →
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Detallado */}
      <InfoModal 
        isOpen={!!selectedBody} 
        onClose={() => setSelectedBody(null)} 
        title={`Exploración de Telemetría: ${selectedBody?.name}`}
      >
        {selectedBody && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 bg-space-900/60 p-4 rounded-xl border border-gray-800 font-mono text-xs">
              <div><span className="text-gray-500 block">Masa Absoluta:</span> <span className="text-gray-200 text-sm font-bold">{selectedBody.mass}</span></div>
              <div><span className="text-gray-500 block">Diámetro Ecuatorial:</span> <span className="text-gray-200 text-sm font-bold">{selectedBody.diameter.toLocaleString()} km</span></div>
              <div className="mt-2"><span className="text-gray-500 block">Período de Rotación:</span> <span className="text-gray-200 text-sm font-bold">{selectedBody.rotation} horas</span></div>
              <div className="mt-2"><span className="text-gray-500 block">Período de Traslación:</span> <span className="text-gray-200 text-sm font-bold">{selectedBody.orbit} días</span></div>
            </div>
            <div>
              <h4 className="text-xs uppercase font-bold text-space-primary mb-1">Métricas de Habitabilidad</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Este cuerpo celeste cuenta con una fuerza gravitatoria de {selectedBody.gravity} m/s² y registra temperaturas medias en superficie de {selectedBody.temp} °C. Cuenta con {selectedBody.moons} satélites naturales orbitando su eje de atracción de forma permanente.
              </p>
            </div>
          </div>
        )}
      </InfoModal>
    </div>
  );
}