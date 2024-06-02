// AdDetails.js
import React from 'react';
import './AdDetails.css';
import axios from 'axios';

const AdDetails = ({ ad, user, navigate, updateAds }) => {
  if (!ad) {
    return <div>No se encontró el anuncio.</div>;
  }

  const goToProfile = () => {
    navigate('perfil', { id_usuario: ad.id_usuario });
  };

  const handleDeleteAd = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar el anuncio?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/api/deleteAd/${ad.id_anuncio}`);
        alert('Anuncio eliminado exitosamente');
        updateAds(); // Actualiza la lista de anuncios
        navigate('home'); // Navega a la página principal
      } catch (error) {
        console.error('Error eliminando anuncio:', error);
        alert('Hubo un error eliminando el anuncio');
      }
    }
  };

  return (
    <div className="ad-details">
      <h2>{ad.titulo}</h2>
      <p>{ad.descripcion}</p>
      <p>Categoría: {ad.categoria || 'No especificada'}</p>
      <p>Ubicación: {ad.ubicacion || 'No especificada'}</p>
      <p>Autor: {ad.autor}</p>
      {user && user.id_usuario === ad.id_usuario ? (
        <button onClick={handleDeleteAd}>Eliminar anuncio</button>
      ) : (
        <button onClick={goToProfile}>Ir al perfil</button>
      )}
    </div>
  );
};

export default AdDetails;






