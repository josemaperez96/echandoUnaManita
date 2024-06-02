/*import React, { useState, useEffect } from 'react';
import './ModificarAd.css';
import axios from 'axios';

const ModificarAd = ({ ad, navigate }) => {
  const [titulo, setTitulo] = useState(ad.titulo);
  const [descripcion, setDescripcion] = useState(ad.descripcion);
  const [categoria, setCategoria] = useState(ad.categoria);
  const [ubicacion, setUbicacion] = useState(ad.ubicacion);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/api/updateAd/${ad.id_anuncio}`, {
        titulo,
        descripcion,
        categoria,
        ubicacion,
      });
      alert('Anuncio actualizado exitosamente');
      navigate('perfil');
    } catch (error) {
      console.error('Error actualizando anuncio:', error.response?.data || error.message);
      alert('Hubo un error actualizando el anuncio');
    }
  };

  return (
    <div className="modificar-ad-container">
      <h2>Modificar Anuncio</h2>
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
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="carpintero">Carpintero</option>
            <option value="electricista">Electricista</option>
            <option value="fontanero">Fontanero</option>
            <option value="pintor">Pintor</option>
            <option value="jardinero">Jardinero</option>
            <option value="albañil">Albañil</option>
            <option value="otros">Otros</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ubicacion">Ubicación:</label>
          <input
            type="text"
            id="ubicacion"
            name="ubicacion"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ModificarAd;
*/