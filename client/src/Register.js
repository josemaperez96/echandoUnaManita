// Register.js
import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';

const Register = ({ navigate }) => {
  const [profile, setProfile] = useState('');
  const [otherProfile, setOtherProfile] = useState('');
  const [tags, setTags] = useState([]);
  const [age, setAge] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleProfileChange = (event) => {
    setProfile(event.target.value);
  };

  const handleOtherProfileKeyDown = (event) => {
    if (event.key === 'Enter' && otherProfile.trim() !== '') {
      event.preventDefault();
      setTags([...tags, otherProfile.trim()]);
      setOtherProfile('');
    }
  };

  const handleTagClick = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    const ageValue = parseInt(age);
    if (ageValue < 0) {
      setErrorMessage('La edad no puede ser negativa');
      return;
    }

    if (ageValue < 18) {
      setErrorMessage('Debes tener al menos 18 años para registrarte');
      return;
    }

    const newUser = {
      nombre,
      email,
      contraseña: password,
      edad: ageValue,
      profesion: profile,
      descripcion: description
    };

    try {
      const response = await axios.post('http://localhost:3001/api/register', newUser);
      console.log('Usuario registrado:', response.data);
      alert('Usuario registrado exitosamente');
      navigate('login');
    } catch (error) {
      console.error('Error registrando usuario:', error.response?.data || error.message);
      alert('Hubo un error registrando el usuario');
    }
  };

  return (
    <div>
      <div className="container">
        <main>
          <form id="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo:</label>
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
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[A-Z]).{6,}"
                title="La contraseña debe contener al menos 6 caracteres, una mayúscula y un número"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirmar Contraseña:</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Edad:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form-group">
              <label htmlFor="profile">Perfil Profesional:</label>
              <select id="profile" name="profile" value={profile} onChange={handleProfileChange} required>
                <option value="" disabled hidden>Seleccionar perfil</option>
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
              <label htmlFor="description">Descripción (Máximo 500 caracteres):</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="500"
              ></textarea>
            </div>
            <button type="submit">Registrarse</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Register;

