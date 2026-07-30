import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/perfil');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-space-800 border border-gray-800 rounded-2xl text-white">
      <h2 className="text-xl font-bold mb-4">Ingreso al Centro de Control</h2>
      {error && <div className="p-3 mb-4 text-xs bg-red-900/50 border border-red-500 rounded-xl text-red-200">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 bg-space-900 border border-gray-700 rounded-xl text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 bg-space-900 border border-gray-700 rounded-xl text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-xl text-sm font-bold transition-colors">
          Iniciar Sesión
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-4 text-center">
        ¿No tenés cuenta? <Link to="/register" className="text-blue-400 hover:underline">Registrate acá</Link>
      </p>
    </div>
  );
}