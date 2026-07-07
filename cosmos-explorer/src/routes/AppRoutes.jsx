import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PlaceholderPage from '../pages/PlaceholderPage';
import Home from '../pages/Home'; 
// 1. Añadimos el import de la nueva página aquí:
import SolarSystem from '../pages/SolarSystem';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        
        {/* 2. Reemplazamos el Placeholder por la página real: */}
        <Route path="/sistema-solar" element={<SolarSystem />} />
        
        {/* Las demás se quedan temporalmente en Placeholder */}
        <Route path="/universo" element={<PlaceholderPage title="🌌 El Universo Profundo" />} />
        <Route path="/misiones" element={<PlaceholderPage title="🚀 Misiones Espaciales" />} />
        <Route path="/asteroides" element={<PlaceholderPage title="☄️ Asteroides Cercanos" />} />
        <Route path="/lanzamientos" element={<PlaceholderPage title="🚀 Próximos Lanzamientos" />} />
        <Route path="/personas" element={<PlaceholderPage title="👨‍🚀 Humanos en el Espacio Exterior" />} />
        <Route path="/luna" element={<PlaceholderPage title="🌙 Fases de la Luna" />} />
        <Route path="/galeria" element={<PlaceholderPage title="🖼️ Galería Multimedia de la NASA" />} />
        <Route path="/favoritos" element={<PlaceholderPage title="❤️ Tu Cosmos Guardado" />} />
        <Route path="/perfil" element={<PlaceholderPage title="👤 Perfil de Astronauta" />} />
      </Route>
      <Route path="/login" element={<PlaceholderPage title="🔐 Iniciar Sesión" />} />
      <Route path="/register" element={<PlaceholderPage title="📝 Registro" />} />
      <Route path="*" element={<PlaceholderPage title="🚀 404 - Perdido en el Espacio" />} />
    </Routes>
  );
}