// ModificarPerfil.js
import React, { useState } from 'react';
import './ModificarPerfil.css';
import axios from 'axios';

const ModificarPerfil = ({ user, navigate }) => {
  const [nombre, setNombre] = useState(user.nombre);
  const [edad, setEdad] = useState(user.edad);
  const [profesion, setProfesion] = useState(user.profesion);
  const [descripcion, setDescripcion] = useState(user.descripcion);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ageValue = parseInt(edad);
    if (ageValue < 0) {
      setErrorMessage('La edad no puede ser negativa');
      return;
    }

    if (ageValue < 18) {
      setErrorMessage('Debes tener al menos 18 años para modificar tu perfil');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('edad', edad);
      formData.append('profesion', profesion);
      formData.append('descripcion', descripcion);
      if (fotoPerfil) {
        formData.append('profilePicture', fotoPerfil);
      }
      const response = await axios.put(`http://localhost:3001/api/user/${user.id_usuario}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Perfil actualizado exitosamente');
      navigate('perfil');
    } catch (error) {
      console.error('Error actualizando perfil:', error.response?.data || error.message);
      alert('Hubo un error actualizando el perfil');
    }
  };

  const handleFileChange = (event) => {
    setFotoPerfil(event.target.files[0]);
  };

  return (
    <div className="modificar-perfil-container">
      <h2>Modificar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="edad">Edad:</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="profesion">Profesión:</label>
          <select
            id="profesion"
            name="profesion"
            value={profesion}
            onChange={(e) => setProfesion(e.target.value)}
            required
          >
            <option value="">Selecciona una profesión</option>
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
          <label htmlFor="foto_perfil">Foto de perfil:</label>
          <input type="file" id="foto_perfil" name="foto_perfil" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};


export default ModificarPerfil;

