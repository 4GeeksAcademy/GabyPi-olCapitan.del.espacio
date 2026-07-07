import React, { useState, useEffect } from 'react';
import { nasaService } from '../services/nasaService';
import { launchService } from '../services/launchService';
import { spaceService } from '../services/spaceService';
import { moonService } from '../services/moonService';

import LoadingCard from '../components/ui/LoadingCard';
import ErrorCard from '../components/ui/ErrorCard';
import Countdown from '../components/ui/Countdown';
import { Orbit, Rocket, Users, Moon, ExternalLink, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function Home() {
  // Estados para cada API de manera independiente
  const [apod, setApod] = useState({ data: null, loading: true, error: null });
  const [asteroids, setAsteroids] = useState({ data: null, loading: true, error: null });
  const [launch, setLaunch] = useState({ data: null, loading: true, error: null });
  const [astronauts, setAstronauts] = useState({ data: null, loading: true, error: null });
  const [moon, setMoon] = useState({ data: null, loading: true, error: null });

  // Funciones de llamada individuales para permitir reintentos (Punto 9)
  const loadApod = async () => {
    setApod(prev => ({ ...prev, loading: true, error: null }));
    try { const res = await nasaService.getPictureOfTheDay(); setApod({ data: res, loading: false, error: null }); }
    catch (e) { setApod({ data: null, loading: false, error: e.message }); }
  };

  const loadAsteroids = async () => {
    setAsteroids(prev => ({ ...prev, loading: true, error: null }));
    try { const res = await nasaService.getNearEarthObjects(); setAsteroids({ data: res, loading: false, error: null }); }
    catch (e) { setAsteroids({ data: null, loading: false, error: e.message }); }
  };

  const loadLaunch = async () => {
    setLaunch(prev => ({ ...prev, loading: true, error: null }));
    try { const res = await launchService.getNextLaunch(); setLaunch({ data: res, loading: false, error: null }); }
    catch (e) { setLaunch({ data: null, loading: false, error: e.message }); }
  };

  const loadAstronauts = async () => {
    setAstronauts(prev => ({ ...prev, loading: true, error: null }));
    try { const res = await spaceService.getAstronauts(); setAstronauts({ data: res, loading: false, error: null }); }
    catch (e) { setAstronauts({ data: null, loading: false, error: e.message }); }
  };

  const loadMoon = async () => {
    setMoon(prev => ({ ...prev, loading: true, error: null }));
    try { const res = await moonService.getMoonPhase(); setMoon({ data: res, loading: false, error: null }); }
    catch (e) { setMoon({ data: null, loading: false, error: e.message }); }
  };

  // Carga paralela al montar el componente (Punto 10)
  useEffect(() => {
    loadApod();
    loadAsteroids();
    loadLaunch();
    loadAstronauts();
    loadMoon();
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Centro de Operaciones Cosmos</h1>
        <p className="text-sm text-gray-400">Telemetría en tiempo real de agencias espaciales integradas.</p>
      </div>

      {/* Grid Principal Layout Dashboard (Responsive) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMNA IZQUIERDA Y CENTRAL: APOD (Grande) */}
        <div className="lg:col-span-2 space-y-6">
          {apod.loading ? (
            <div className="h-[460px] bg-space-800/60 rounded-2xl animate-pulse" />
          ) : apod.error ? (
            <ErrorCard message={apod.error} onRetry={loadApod} />
          ) : (
            <div className="bg-space-800/40 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-gray-700 transition-all group duration-300">
              <div className="relative h-72 md:h-96 w-full bg-black overflow-hidden">
                <img 
                  src={apod.data.image} 
                  alt={apod.data.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 bg-space-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Imagen Astronómica del Día
                </span>
              </div>
              <div className="p-6 -mt-10 relative z-10">
                <span className="text-xs text-space-primary font-mono">{apod.data.date}</span>
                <h2 className="text-xl font-bold text-white mt-1 mb-2">{apod.data.title}</h2>
                <p className="text-gray-400 text-sm line-clamp-2 max-w-2xl">
                  {apod.data.explanation}
                </p>
                <a 
                  href={apod.data.image} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white bg-space-primary hover:bg-blue-600 px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/10"
                >
                  <ExternalLink size={14} /> Ver Imagen Completa
                </a>
              </div>
            </div>
          )}

          {/* SUB-GRID: Asteroides y Luna */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tarjeta de Asteroides */}
            {asteroids.loading ? <LoadingCard /> : asteroids.error ? <ErrorCard message={asteroids.error} onRetry={loadAsteroids} /> : (
              <div className="bg-space-800/40 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Objetos Cercanos (Hoy)</span>
                    <h3 className="text-4xl font-extrabold text-white mt-2 font-mono">{asteroids.data.count}</h3>
                  </div>
                  <div className="p-2.5 bg-orange-500/10 text-orange-400 rounded-xl border border-orange-500/20"><Orbit size={20} /></div>
                </div>
                <div className="my-4 space-y-2 border-y border-gray-800/60 py-3 text-xs text-gray-400">
                  <div className="flex justify-between"><span>Más cercano:</span> <strong className="text-gray-200 font-mono">{asteroids.data.closest?.name}</strong></div>
                  <div className="flex justify-between"><span>Distancia:</span> <span className="text-gray-300 font-mono">{asteroids.data.closest?.distance}</span></div>
                  <div className="flex justify-between"><span>Velocidad:</span> <span className="text-gray-300 font-mono">{asteroids.data.closest?.velocity}</span></div>
                  <div className="flex justify-between items-center">
                    <span>¿Peligroso?</span> 
                    {asteroids.data.closest?.isDangerous ? (
                      <span className="flex items-center gap-1 text-red-400 font-bold bg-red-950/30 px-2 py-0.5 rounded-md border border-red-900/30"><ShieldAlert size={12}/> Sí</span>
                    ) : (
                      <span className="flex items-center gap-1 text-green-400 font-bold bg-green-950/30 px-2 py-0.5 rounded-md border border-green-900/30"><ShieldCheck size={12}/> No</span>
                    )}
                  </div>
                </div>
                <button className="w-full text-center text-xs text-gray-400 hover:text-white bg-space-700/30 hover:bg-space-700/60 py-2 rounded-xl transition-all border border-gray-800">Ver todos</button>
              </div>
            )}

            {/* Tarjeta de la Luna */}
            {moon.loading ? <LoadingCard /> : moon.error ? <ErrorCard message={moon.error} onRetry={loadMoon} /> : (
              <div className="bg-space-800/40 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fase Lunar Actual</span>
                    <h3 className="text-xl font-bold text-white mt-2">{moon.data.phase}</h3>
                  </div>
                  <div className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">{moon.data.icon}</div>
                </div>
                <div className="my-4 bg-space-900/40 border border-gray-800/60 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Iluminación de superficie:</span>
                    <span className="font-bold text-space-primary font-mono">{moon.data.illumination}%</span>
                  </div>
                  <div className="w-full bg-space-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-space-primary h-1.5 transition-all duration-500" style={{ width: `${moon.data.illumination}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-500 pt-1">
                    <span>Próxima Luna Llena:</span>
                    <span className="text-gray-300 font-mono">{moon.data.nextFull}</span>
                  </div>
                </div>
                <button className="w-full text-center text-xs text-gray-400 hover:text-white bg-space-700/30 hover:bg-space-700/60 py-2 rounded-xl transition-all border border-gray-800">Ver ciclo completo</button>
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: Próximo Lanzamiento e ISS (Menor tamaño horizontal) */}
        <div className="space-y-6">
          
          {/* Tarjeta de Próximo Lanzamiento */}
          {launch.loading ? <LoadingCard /> : launch.error ? <ErrorCard message={launch.error} onRetry={loadLaunch} /> : (
            <div className="bg-space-800/40 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300 flex flex-col h-full justify-between">
              <div>
                <div className="relative h-40 w-full bg-black">
                  <img src={launch.data.image} alt={launch.data.rocket} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-800/90 to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <Rocket size={10} /> Cuenta Atrás T-MINUS
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase text-space-primary font-bold tracking-wider">{launch.data.company}</span>
                    <h4 className="text-base font-bold text-white line-clamp-1 mt-0.5">{launch.data.name}</h4>
                    <span className="text-xs text-gray-400 font-mono">{launch.data.rocket}</span>
                  </div>
                  <Countdown targetDate={launch.data.date} />
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="text-[10px] text-gray-500 font-mono text-center mb-2">NET: {new Date(launch.data.date).toLocaleString()}</div>
                <button className="w-full text-center text-xs text-gray-400 hover:text-white bg-space-700/30 hover:bg-space-700/60 py-2 rounded-xl transition-all border border-gray-800">Detalles del Lanzamiento</button>
              </div>
            </div>
          )}

          {/* Tarjeta de Humanos en el Espacio */}
          {astronauts.loading ? <LoadingCard /> : astronauts.error ? <ErrorCard message={astronauts.error} onRetry={loadAstronauts} /> : (
            <div className="bg-space-800/40 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Órbita Terrestre Baja</span>
                  <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                    {astronauts.data.count} Humanos en órbita
                  </h3>
                </div>
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20"><Users size={18} /></div>
              </div>
              
              {/* Lista limitada a 7 astronautas como pide el requerimiento */}
              <div className="my-4 space-y-1.5 max-h-[170px] overflow-y-auto pr-1">
                {astronauts.data.list.slice(0, 7).map((ast, i) => (
                  <div key={i} className="flex justify-between items-center text-xs bg-space-900/40 px-3 py-1.5 rounded-xl border border-gray-800/40">
                    <span className="text-gray-300 font-medium">{ast.name}</span>
                    <span className="text-[10px] text-space-primary font-mono bg-space-700/30 px-2 py-0.5 rounded-md">{ast.craft}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full text-center text-xs text-gray-400 hover:text-white bg-space-700/30 hover:bg-space-700/60 py-2 rounded-xl transition-all border border-gray-800">Ver Detalles</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}