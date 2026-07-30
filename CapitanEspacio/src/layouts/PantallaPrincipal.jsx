import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import {
  Home, Globe, Disc, Rocket, Orbit, Calendar,
  Users, Moon, Image, Heart, User, Search, Bell, Sun, Compass, LogIn, X, Radio
} from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';

export default function PantallaPrincipal() {
  const { globalQuery, setGlobalQuery } = useSearch();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Nueva imagen astronómica de la nebulosa Carina disponible.", time: "Hace 10m", unread: true },
    { id: 2, text: "Alerta: Lanzamiento programado Falcon 9 para hoy a las 23:00 UTC.", time: "Hace 2h", unread: true },
    { id: 3, text: "Se ha actualizado la trayectoria del asteroide cercano Apofis.", time: "Ayer", unread: false }
  ];

  const navItems = [
    { to: '/', label: 'Inicio', icon: Home },
    { to: '/universo', label: 'Universo', icon: Globe },
    { to: '/sistema-solar', label: 'Sistema Solar', icon: Disc },
    { to: '/misiones', label: 'Misiones', icon: Rocket },
    { to: '/asteroides', label: 'Asteroides', icon: Orbit },
    { to: '/lanzamientos', label: 'Lanzamientos', icon: Calendar },
    { to: '/personas', label: 'Personas en el espacio', icon: Users },
    { to: '/luna', label: 'Fases de la Luna', icon: Moon },
    { to: '/galeria', label: 'Galería NASA', icon: Image },
    { to: '/favoritos', label: 'Favoritos', icon: Heart },
    { to: '/perfil', label: 'Perfil', icon: User },
  ];

  return (
    <div className="flex h-screen bg-space-900 text-gray-100 overflow-hidden relative">

      {/* SIDEBAR */}
      <aside className="w-64 bg-space-800 border-r border-gray-800 flex flex-col justify-between p-4 z-10">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 mb-4">
            <div className="bg-space-primary p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <Compass size={24} />
            </div>
            <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Capitan del Espacio
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-space-primary text-white shadow-md shadow-blue-500/20'
                      : 'text-gray-400 hover:bg-space-700/50 hover:text-gray-200'}
                  `}
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="bg-space-700/40 p-4 rounded-2xl border border-gray-800/60 text-center">
          <div className="w-16 h-16 bg-space-700 rounded-full mx-auto mb-2 flex items-center justify-center border border-gray-600">
            <span className="text-xl">👨‍🚀</span>
          </div>
          <p className="text-xs font-semibold text-gray-300">
            {usuario ? `Piloto: ${usuario.nickname || usuario.email}` : 'Houston, todo en orden'}
          </p>
        </div>
      </aside>

      {/* CONTENEDOR DERECHO */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* NAVBAR */}
        <header className="h-16 bg-space-800/80 backdrop-blur-md border-b border-gray-800 px-6 flex items-center justify-between relative z-20">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
            <input
              type="text"
              value={globalQuery}
              onChange={(e) => setGlobalQuery(e.target.value)}
              placeholder="Filtro de búsqueda global..."
              className="w-full bg-space-900 border border-gray-800 rounded-xl pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-space-primary text-gray-300 transition-colors"
            />
          </div>

          <div></div>

          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 rounded-xl transition-colors relative ${isNotificationsOpen ? 'text-space-primary bg-space-700/50' : 'text-gray-400 hover:text-gray-200 hover:bg-space-700/50'}`}
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-space-800 border border-gray-800 rounded-2xl shadow-2xl p-4 z-20 animate-fade-in text-left">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-700/50">
                      <span className="text-xs font-bold font-mono uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                        <Radio size={12} className="text-space-primary" /> Centro de Control
                      </span>
                    </div>
                    <div className="space-y-2.5 max-h-60 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`p-2.5 rounded-xl text-xs transition-colors ${notif.unread ? 'bg-space-700/40 border border-blue-900/10' : 'bg-transparent'}`}>
                          <p className="text-gray-200 leading-normal">{notif.text}</p>
                          <span className="text-[10px] text-gray-500 mt-1 block font-mono">{notif.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-space-700/50 rounded-xl transition-colors">
              <Sun size={18} />
            </button>

            {/* BOTÓN DE INICIAR Y CIERRE SESIÓN */}
            {!usuario ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-1.5 bg-space-primary hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-blue-500/10"
              >
                <LogIn size={14} />
                <span>Iniciar Sesión</span>
              </Link>
            ) : (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-red-500/10 animate-fade-in"
              >
                <X size={14} />
                <span>Cerrar Sesión</span>
              </button>
            )}
          </div>
        </header>

        {/* ÁREA DE CONTENIDO */}
        <main className="flex-1 overflow-y-auto bg-space-900 text-gray-200">
          <Outlet />
        </main>
      </div>

    </div>
  );
}