import React from 'react';
import './Ad.css';

const Ad = ({ title, description, location, date, autor, categoria, onClick }) => (
  <div className="ad" onClick={onClick}>
    <h3>{title}</h3>
    <p>{description}</p>
    {categoria && <p>Categoría: {categoria}</p>}
    {location && <p>Ubicación: {location}</p>}
    {date && <p>Fecha de Publicación: {date}</p>}
    <p>Autor: {autor}</p>
  </div>
);

export default Ad;




