import React from 'react';
import './Informacion.css';

const Informacion = ({ user }) => {
  const { nombre, edad, profesion, descripcion } = user || {};

  return (
    <div className="informacion">
      <div className="container-inf">
        <h3>Información del Usuario</h3>
        <p>Nombre: {nombre}</p>
        <p>Edad: {edad}</p>
        <p>Profesión: {profesion || 'Ninguna'}</p>
        <p>Descripción: {descripcion}</p>
      </div>
    </div>
  );
};

export default Informacion;


