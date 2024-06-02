import React from 'react';
import './Header.css';
import './Nav.css';

const HeaderNav = ({ navigate, user, onLogout }) => {
  // URL de la imagen de perfil
  const profileImageUrl = user && user.foto_perfil ? `http://localhost:3001/${user.foto_perfil}` : 'http://localhost:3001/upload/Perfil_defecto.jpg';

  return (
    <header>
      <div className="header-top">
        <h1>Echando una Manita</h1>
        <div className="profile">
          {user ? (
            <>
              <img
                src={profileImageUrl}
                alt="Perfil"
                className="profile-picture"
                onClick={() => navigate('perfil')}
              />
            </>
          ) : (
            <button onClick={() => navigate('login')} className="profile-button">
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
      <nav>
        <ul>
          <li><button onClick={() => navigate('home')}>Inicio</button></li>
          <li><button onClick={() => navigate('publicarAd')}>Publicar Anuncio</button></li>
          {user ? (
            <>
              <li><button onClick={() => navigate('perfil')}>Perfil</button></li>
              <li><button onClick={() => navigate('mensajes')}>Mensajes</button></li>
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
    </header>
  );
};

export default HeaderNav;




