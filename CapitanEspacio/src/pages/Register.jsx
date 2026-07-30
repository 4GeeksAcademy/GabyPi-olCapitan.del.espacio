import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  // Envío de datos al backend
  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Llamamos a register pasando los parámetros correspondientes
      await register(email, password, nickname);
      
      // Redirigimos al inicio para acceder mediante el login
      navigate('/');
    } catch (err) {
      // Capturamos cualquier error
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-space-800 border border-gray-800 rounded-2xl mt-12">
      <h2 className="text-xl font-bold text-white mb-2">📝 Nueva Incorporación</h2>
      <p className="text-xs text-gray-400 mb-6">Regístrate en la base de datos del Centro de Operaciones</p>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={manejarRegistro} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1">APODO</label>
          <input 
            type="text" 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full bg-space-900 border border-gray-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
            placeholder="Tu apodo de tripulante"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1">EMAIL</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-space-900 border border-gray-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
            placeholder="correo@ejemplo.com"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1">CONTRASEÑA</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-space-900 border border-gray-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl transition-colors font-mono uppercase mt-4">
          Únete
        </button>
      </form>
    </div>
  );
}