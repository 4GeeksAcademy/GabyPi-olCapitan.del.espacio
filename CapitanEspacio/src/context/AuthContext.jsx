import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token_cosmos') || null);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  const backendUrl = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

  // Validar token y cargar datos
  useEffect(() => {
    if (token) {
      fetch(`${backendUrl}/api/perfil`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error('Token inválido');
          return res.json();
        })
        .then((data) => setUsuario(data.user))
        .catch(() => logout())
        .finally(() => setCargando(false));
    } else {
      setCargando(false);
    }
  }, [token]);

  // Registro de usuario nuevo
  const register = async (email, password, nickname) => {
    const res = await fetch(`${backendUrl}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, nickname })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || 'Error en el registro');
    return true;
  };

  // Inicio de sesión
  const login = async (email, password) => {
    const res = await fetch(`${backendUrl}/api/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || 'Error en el inicio de sesión');

    localStorage.setItem('token_cosmos', data.access_token);
    setToken(data.access_token);
    setUsuario(data.user);
    return true;
  };

  // Actualizar datos del usuario en el global
  const actualizarUsuario = (nuevosDatos) => {
    setUsuario(nuevosDatos);
  };

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem('token_cosmos');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      usuario, 
      cargando, 
      login, 
      register, 
      logout, 
      setUsuario, 
      actualizarUsuario 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);