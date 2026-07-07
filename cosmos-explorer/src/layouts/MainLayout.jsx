import { Outlet, NavLink } from 'react-router-dom';
import { 
  Home, Globe, Disc, Rocket, Orbit, Calendar, 
  Users, Moon, Image, Heart, User, Search, Bell, Sun, Compass 
} from 'lucide-react';
// Importamos el hook de búsqueda global
import { useSearch } from '../context/SearchContext';

export default function MainLayout() {
  // Extraemos la query global y la función para actualizarla
  const { globalQuery, setGlobalQuery } = useSearch();
  
  // Lista de navegación para el Sidebar
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
    <div className="flex h-screen bg-space-900 text-gray-100 overflow-hidden">
      
      {/* 5. SIDEBAR (Fijo a la izquierda) */}
      <aside className="w-64 bg-space-800 border-r border-gray-800 flex flex-col justify-between p-4 z-10">
        <div>
          {/* Header del Sidebar */}
          <div className="flex items-center gap-3 px-2 py-4 mb-4">
            <div className="bg-space-primary p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <Compass size={24} />
            </div>
            <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Capitan del Espacio
            </span>
          </div>

          {/* Enlaces de navegación */}
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

        {/* Parte inferior: Mascota placeholder */}
        <div className="bg-space-700/40 p-4 rounded-2xl border border-gray-800/60 text-center">
          <div className="w-16 h-16 bg-space-700 rounded-full mx-auto mb-2 flex items-center justify-center border border-gray-600 animate-pulse">
            <span className="text-xl">👨‍🚀</span>
          </div>
          <p className="text-xs font-semibold text-gray-300">Houston, todo en orden</p>
          <span className="text-[10px] text-gray-500">Mascota de misión</span>
        </div>
      </aside>

      {/* CONTENEDOR DERECHO (Navbar + Contenido + Footer) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* 6. NAVBAR */}
        <header className="h-16 bg-space-800/80 backdrop-blur-md border-b border-gray-800 px-6 flex items-center justify-between">
          
          {/* Izquierda: Buscador Conectado al Estado Global */}
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

          {/* Centro: Vacío */}
          <div></div>

          {/* Derecha: Acciones */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-space-700/50 rounded-xl transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-space-700/50 rounded-xl transition-colors">
              <Sun size={18} />
            </button>

            <button className="flex items-center gap-1.5 px-3 py-1 bg-space-700/60 hover:bg-space-700 border border-gray-700/50 rounded-xl text-xs font-medium text-space-primary transition-colors">
              <Rocket size={12} />
              <span>Modo Viajero</span>
            </button>

            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xs text-white border border-space-800 cursor-pointer">
              U
            </div>
          </div>
        </header>

        {/* CONTENIDO DE LA PÁGINA */}
        <main className="flex-1 overflow-y-auto bg-space-900 text-gray-200">
          <Outlet />
          
          {/* FOOTER */}
          <footer className="mt-auto py-4 px-6 border-t border-gray-800/40 text-center text-xs text-gray-600">
            © 2026 Explorador del Cosmos • Impulsado por la API de la NASA
          </footer>
        </main>

      </div>
    </div>
  );
}