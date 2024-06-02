import React, { useState } from 'react';
import './PublicarAd.css';
import axios from 'axios';

const PublicarAd = ({ navigate, user, updateAds }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  if (!user) {
    return (
      <div className="publicar-ad">
        <h2>Debes iniciar sesión para publicar un anuncio.</h2>
        <button onClick={() => navigate('login')}>Iniciar Sesión</button>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newAd = {
      titulo: title,
      descripcion: description,
      id_usuario: user.id_usuario,
      categoria: category,
      ubicacion: location,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/publicarAd', newAd);
      console.log('Anuncio publicado:', response.data);
      alert('Anuncio publicado exitosamente');
      updateAds();
      navigate('home');  // Redirigir a la página de inicio
    } catch (error) {
      console.error('Error publicando anuncio:', error.response?.data || error.message);
      alert('Hubo un error publicando el anuncio');
    }
  };

  return (
    <div className="publicar-ad-container">
      <h2>Publicar Anuncio</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Carpintero">Carpintero</option>
            <option value="Electricista">Electricista</option>
            <option value="Fontanero">Fontanero</option>
            <option value="Pintor">Pintor</option>
            <option value="Jardinero">Jardinero</option>
            <option value="Albañil">Albañil</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Ubicación:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default PublicarAd;



