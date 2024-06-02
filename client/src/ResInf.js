// ResInf.js
import React from 'react';
import './ResInf.css';

const ResInf = ({ titulo, comentario, puntuacion }) => (
  <div className="res">
    <h3>{titulo}</h3>
    <p>Puntuación: {puntuacion}</p>
    <p>Comentario: {comentario}</p>
  </div>
);

export default ResInf;


