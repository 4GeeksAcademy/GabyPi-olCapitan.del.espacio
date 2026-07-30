import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Target, Award, Save, Camera, Lock, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Perfil() {
  const { token, usuario, cargando, logout, setUsuario } = useAuth();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👨‍🚀');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [guardando, setGuardando] = useState(false);

  const avatars = ['👨‍🚀', '👩‍🚀', '👽', '🤖', '🚀', '🌟'];

  // Cargar el nickname del usuario actual
  useEffect(() => {
    if (usuario) {
      setNickname(usuario.nickname || '');
    }
  }, [usuario]);

  // Redirección si no está autenticado
  useEffect(() => {
    if (!cargando && !token) {
      navigate('/login');
    }
  }, [token, cargando, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });
    setGuardando(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${backendUrl}/api/perfil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nickname })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Error al actualizar credenciales');
      }

      // Actualizamos el usuario en el contexto global
      if (setUsuario) {
        setUsuario(data.user);
      }

      setMensaje({ tipo: 'exito', texto: '¡Nickname actualizado con éxito en la bitácora!' });
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.message });
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <div className="text-center text-gray-400 mt-20 font-mono animate-pulse">
        Sincronizando telemetría del tripulante...
      </div>
    );
  }

  if (!token) {
    return (
      <div className="p-12 text-center max-w-md mx-auto mt-20 bg-space-800 border border-gray-800 rounded-3xl shadow-2xl">
        <div className="w-16 h-16 bg-red-950/40 border border-red-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-500">
          <Lock size={28} />
        </div>
        <h2 className="text-lg font-bold text-white mb-1">Acceso Restringido</h2>
        <p className="text-xs text-gray-400 leading-relaxed mb-6">
          Debes sincronizar tus credenciales para visualizar la telemetría de tu cuenta.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto animate-fade-in text-white">
      
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <User className="text-blue-500" size={24} /> Panel de Tripulación
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-mono uppercase tracking-wider">
            Identificación y estadísticas del operador en órbita
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-950/40 border border-red-900/50 hover:bg-red-900/60 text-red-400 rounded-xl text-xs font-bold transition-all"
        >
          <LogOut size={14} />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Columna izquierda */}
        <div className="bg-space-800 border border-gray-800/80 rounded-3xl p-6 flex flex-col items-center text-center shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative w-24 h-24 bg-space-900 rounded-full flex items-center justify-center text-5xl border-2 border-blue-500/40 shadow-inner mb-4 group">
            <span>{selectedAvatar}</span>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera size={18} className="text-white" />
            </div>
          </div>

          <h2 className="text-lg font-bold text-white tracking-tight">{usuario?.nickname || 'Cargando...'}</h2>
          <span className="px-3 py-1 bg-blue-500/10 border border-blue-900/40 rounded-full text-[10px] text-blue-400 font-mono uppercase font-bold mt-1.5 tracking-wider">
            Piloto Intergaláctico
          </span>

          <div className="w-full border-t border-gray-700/40 my-5" />

          <div className="w-full space-y-3 text-left text-xs">
            <div className="flex items-center gap-2.5 text-gray-400">
              <Shield size={14} className="text-gray-500" />
              <span>ID Tripulante: <strong className="text-gray-200 font-mono">#{usuario?.id || '—'}</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-400">
              <Shield size={14} className="text-gray-500" />
              <span>Rango de Acceso: <strong className="text-gray-200">Nivel 4</strong></span>
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Telemetría */}
          <div className="bg-space-800 border border-gray-800/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white tracking-tight mb-4 flex items-center gap-2">
              <Target size={16} className="text-blue-500" /> Telemetría de Actividad
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-space-900/60 p-4 rounded-2xl border border-gray-800/50 text-center">
                <span className="text-2xl font-black text-white font-mono">0</span>
                <p className="text-[11px] text-gray-500 font-medium mt-1 uppercase font-mono">Favoritos Guardados</p>
              </div>
              <div className="bg-space-900/60 p-4 rounded-2xl border border-gray-800/50 text-center">
                <span className="text-2xl font-black text-white font-mono">100%</span>
                <p className="text-[11px] text-gray-500 font-medium mt-1 uppercase font-mono">Sincronización API</p>
              </div>
              <div className="bg-space-900/60 p-4 rounded-2xl border border-gray-800/50 text-center col-span-2 sm:col-span-1">
                <span className="text-2xl font-black text-white font-mono">1</span>
                <p className="text-[11px] text-gray-500 font-medium mt-1 uppercase font-mono">Sistemas Explorados</p>
              </div>
            </div>
          </div>

          {/* Formulario PUT */}
          <div className="bg-space-800 border border-gray-800/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white tracking-tight mb-4 flex items-center gap-2">
              <Award size={16} className="text-blue-500" /> Modificar Credenciales
            </h3>
            
            {mensaje.texto && (
              <div className={`p-3 mb-4 text-xs rounded-xl border ${mensaje.tipo === 'exito' ? 'bg-green-950/40 border-green-800 text-green-300' : 'bg-red-950/40 border-red-800 text-red-300'}`}>
                {mensaje.texto}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2 font-mono tracking-wider">
                  Seleccionar Transmisor
                </label>
                <div className="flex gap-2.5">
                  {avatars.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`text-2xl p-2 bg-space-900 rounded-xl border transition-all ${selectedAvatar === av ? 'border-blue-500 bg-blue-900/20 scale-105' : 'border-gray-800 hover:border-gray-700'}`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1 font-mono tracking-wider">
                    Firma de Usuario (Nickname)
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full bg-space-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1 font-mono tracking-wider">
                    Correo Encriptado (No modificable)
                  </label>
                  <input
                    type="email"
                    value={usuario?.email || ''}
                    disabled
                    className="w-full bg-space-900/40 border border-gray-800/30 text-gray-500 rounded-xl px-4 py-2.5 text-xs cursor-not-allowed select-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={guardando}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/10 active:scale-[0.98]"
                >
                  <Save size={14} />
                  <span>{guardando ? 'Guardando...' : 'Guardar Datos en Bitácora'}</span>
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}