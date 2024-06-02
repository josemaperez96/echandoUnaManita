import React from 'react';
import './Header.css';

const Header = ({ navigate, user, onLogout }) => (
  <header>
    <div className="header-top">
      <h1>Manitas App</h1>
      <div className="profile">
        {user ? (
          <>
             <span onClick={() => navigate('perfil')} className="profile-picture">
              {user.nombre}
            </span>
            <button onClick={onLogout} className="profile-button">Cerrar Sesión</button>
          </>
        ) : (
          <button onClick={() => navigate('login')} className="profile-button">
            Iniciar Sesión
          </button>
        )}
      </div>
    </div>
  </header>
);


export default Header;




