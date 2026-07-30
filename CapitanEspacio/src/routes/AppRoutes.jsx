import { Routes, Route } from 'react-router-dom';
import PantallaPrincipal from '../layouts/PantallaPrincipal.jsx';
import PlaceholderPage from '../pages/PlaceholderPage.jsx';
import Home from '../pages/Home.jsx'; 
import SolarSystem from '../pages/SolarSystem.jsx';
import Favoritos from '../pages/Favoritos.jsx'; 
import Perfil from '../pages/Perfil.jsx';
import Galeria from '../pages/Galeria.jsx';
import Asteroides from '../pages/Asteroides.jsx';
import Personas from '../pages/Personas.jsx';
import Lanzamientos from '../pages/Lanzamientos.jsx';
import Universo from '../pages/Universo.jsx';
import Luna from '../pages/Luna.jsx';
import Misiones from '../pages/Misiones.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PantallaPrincipal />}>
        <Route path="/" element={<Home />} />
        <Route path="/sistema-solar" element={<SolarSystem />} />
        <Route path="/universo" element={<Universo />} />
        <Route path="/misiones" element={<Misiones />} />
        <Route path="/asteroides" element={<Asteroides />} />
        <Route path="/lanzamientos" element={<Lanzamientos />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/luna" element={<Luna />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/perfil" element={<Perfil />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      <Route path="*" element={<PlaceholderPage title="🚀 404 - Perdido en el Espacio" />} />
    </Routes>
  );
}