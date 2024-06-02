import React, { useState } from 'react';
import './PublicarRes.css';
import axios from 'axios';

const PublicarRes = ({ navigate, user, reviewedUserId }) => {
  const [titulo, setTitulo] = useState('');
  const [comentario, setComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(0);

  if (!user) {
    return (
      <div className="publicar-res">
        <h2>Debes iniciar sesión para escribir una reseña.</h2>
        <button onClick={() => navigate('login')}>Iniciar Sesión</button>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newReview = {
      titulo,
      comentario,
      puntuacion,
      id_usuario: user.id_usuario,
      id_reviewed_user: reviewedUserId,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/publicarRes', newReview);
      console.log('Reseña publicada:', response.data);
      alert('Reseña publicada exitosamente');
      navigate('perfil', { id_usuario: reviewedUserId });
    } catch (error) {
      console.error('Error publicando reseña:', error.response?.data || error.message);
      alert('Hubo un error publicando la reseña');
    }
  };

  return (
    <div className="publicar-res-container">
      <h2>Escribir Reseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comentario">Comentario:</label>
          <textarea
            id="comentario"
            name="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="puntuacion">Puntuación:</label>
          <input
            type="number"
            id="puntuacion"
            name="puntuacion"
            value={puntuacion}
            onChange={(e) => setPuntuacion(e.target.value)}
            required
            min="1"
            max="5"
          />
        </div>
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default PublicarRes;

