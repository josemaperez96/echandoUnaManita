// Perfil.js
import React, { useState, useEffect } from 'react';
import './Perfil.css';
import Informacion from './Informacion';
import Ad from './Ad';
import Resenas from './Resenas';
import axios from 'axios';

const Perfil = ({ userId, navigate, user }) => {
  const [profileUser, setProfileUser] = useState(null);
  const [activeSection, setActiveSection] = useState('informacion');
  const [ads, setAds] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
        setProfileUser(response.data);
      } catch (error) {
        console.error('Error cargando datos del usuario:', error);
      }
    };

    const fetchUserAds = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/userAds/${userId}`);
        setAds(response.data);
      } catch (error) {
        console.error('Error cargando anuncios del usuario:', error);
      }
    };

    const fetchUserReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/userReviews/${userId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error cargando reseñas del usuario:', error);
      }
    };

    fetchUserData();
    fetchUserAds();
    fetchUserReviews();
  }, [userId]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/startChat', {
        id_user1: user.id_usuario,
        id_user2: profileUser.id_usuario,
      });
      navigate('chat', { chatId: response.data.chat.id_chat });
    } catch (error) {
      console.error('Error iniciando chat:', error);
    }
  };

  if (!profileUser) {
    return <div>Cargando perfil...</div>;
  }

  // Ruta de la imagen de perfil
  const profileImage = profileUser.foto_perfil ? `http://localhost:3001/${profileUser.foto_perfil}` : 'http://localhost:3001/upload/Perfil_defecto.jpg';

  return (
    <div className="perfil">
      <h2>Perfil</h2>
      <img src={profileImage} alt="Perfil" className="profile-pic" />
      <p>Nombre: {profileUser.nombre}</p>
      <p>Email: {profileUser.email}</p>
      <p>Puntuación media: {profileUser.puntuacion_media ? profileUser.puntuacion_media.toFixed(2) : 'N/A'}</p>
      {user && user.id_usuario === profileUser.id_usuario ? (
        <button className="profile-button" onClick={() => navigate('modificarPerfil')}>Modificar Perfil</button>
      ) : (
        <button className="message-button" onClick={handleSendMessage}>Enviar Mensaje</button>
      )}
      <div className="profile-nav-content">
        <div className="profile-nav">
          <button onClick={() => setActiveSection('informacion')}>Información</button>
          <button onClick={() => setActiveSection('anuncios')}>Anuncios</button>
          <button onClick={() => setActiveSection('resenas')}>Reseñas</button>
        </div>
        <div className="profile-content">
          {activeSection === 'informacion' && <Informacion user={profileUser} />}
          {activeSection === 'anuncios' && (
            <div id="ads">
              <h2>Anuncios</h2>
              <div className="ads-container">
                {ads.map((ad, index) => (
                  <Ad 
                    key={index}
                    title={ad.titulo}
                    description={ad.descripcion}
                    location={ad.ubicacion}
                    date=""
                    autor={profileUser.nombre}
                    categoria={ad.categoria}
                    onClick={() => navigate('adDetails', ad)}
                  />
                ))}
              </div>
            </div>
          )}
          {activeSection === 'resenas' && (
            <Resenas 
              reviews={reviews || []} 
              showWriteReviewButton={user && user.id_usuario !== profileUser.id_usuario}
              navigate={navigate}
              reviewedUserId={profileUser.id_usuario}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;

