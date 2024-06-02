import React, { useState } from 'react';
import './Search.css';
import axios from 'axios';

const Search = ({ setAds }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/searchAds', {
        params: { title, location },
      });
      setAds(response.data);
    } catch (error) {
      console.error('Error buscando anuncios:', error);
    }
  };

  return (
    <section id="search">
      <div className="search-container">
        <div className="search-item">
          <label htmlFor="search-job">Buscar trabajo:</label>
          <input 
            type="text" 
            id="search-job" 
            placeholder="Buscar..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="search-item">
          <label htmlFor="search-location">Ubicación:</label>
          <input 
            type="text" 
            id="search-location" 
            placeholder="Ubicación..." 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button className="search-button" onClick={handleSearch}>Buscar</button>
      </div>
    </section>
  );
};

export default Search;



