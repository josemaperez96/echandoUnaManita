import React, { useState } from 'react';
import './Filters.css';

const Filters = ({ setFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterClick = (filter) => {
    const newFilter = selectedFilter === filter ? '' : filter;
    setSelectedFilter(newFilter);
    setFilter(newFilter);
    console.log('Filtro seleccionado:', newFilter);
  };

  return (
    <section id="filters">
      <div className="filter-group">
        {['Carpintero', 'Electricista', 'Fontanero', 'Pintor', 'Jardinero', 'Albañil', 'Otros'].map(filter => (
          <div
            key={filter}
            className={`filter-item ${selectedFilter === filter ? 'selected' : ''}`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Filters;

