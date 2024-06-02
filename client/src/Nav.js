import React from 'react';
import './Nav.css';

const Nav = ({ navigate, user, onLogout }) => (
  <nav>
    <ul>
      <li><button onClick={() => navigate('home')}>Inicio</button></li>
      <li><button onClick={() => navigate('buscar-trabajos')}>Buscar Trabajos</button></li>
      <li><button onClick={() => navigate('publicar-anuncio')}>Publicar Anuncio</button></li>
      {user ? (
        <>
          <li><button onClick={() => navigate('perfil')}>Perfil</button></li>
          <li><button onClick={onLogout}>Cerrar Sesión</button></li>
        </>
      ) : (
        <>
          <li><button onClick={() => navigate('login')}>Iniciar Sesión</button></li>
          <li><button onClick={() => navigate('register')}>Registrarse</button></li>
        </>
      )}
    </ul>
  </nav>
);

export default Nav;





