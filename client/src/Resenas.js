// Resenas.js
import React from 'react';
import './Resenas.css';
import ResInf from './ResInf';

const Resenas = ({ reviews, showWriteReviewButton, navigate, reviewedUserId }) => (
  <section id="resenas">
    <h2>Reseñas</h2>
    {showWriteReviewButton && (
      <button className="write-review-button" onClick={() => navigate('publicarRes', { reviewedUserId })}>
        Escribir Reseña
      </button>
    )}
    <div className="container-res">
      {Array.isArray(reviews) && reviews.length > 0 ? (
        reviews.map((res, index) => (
          <ResInf 
            key={index}
            titulo={res.titulo}
            comentario={res.comentario} // Asegúrate de que se pasa el campo correcto
            puntuacion={res.puntuacion}
          />
        ))
      ) : (
        <p>No hay reseñas disponibles</p>
      )}
    </div>
  </section>
);

export default Resenas;




