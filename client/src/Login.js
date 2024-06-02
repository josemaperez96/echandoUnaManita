import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

const Login = ({ navigate, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, contraseña: password });
      console.log('Usuario iniciado sesión:', response.data);
      alert('Inicio de sesión exitoso');
      setUser(response.data.user); // Guardar el usuario en el estado
      navigate('home'); // Redirigir a la página de inicio
    } catch (error) {
      console.error('Error iniciando sesión:', error.response?.data || error.message);
      alert('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <main>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Iniciar Sesión</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;


