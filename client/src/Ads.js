// Ads.js
import React from 'react';
import Ad from './Ad';
import './Ads.css';

const Ads = ({ navigate, ads, updateAds }) => {
  if (!Array.isArray(ads)) {
    return <div>No hay anuncios disponibles</div>;
  }

  return (
    <section id="ads">
      <h2>Anuncios</h2>
      <div className="ads-container">
        {ads.map((ad) => (
          <Ad 
            key={ad.id_anuncio}
            title={ad.titulo}
            description={ad.descripcion}
            location={ad.location}
            date={ad.date}
            autor={ad.autor}
            categoria={ad.categoria}
            onClick={() => navigate('adDetails', ad)}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => navigate('previousPage')} disabled={ads.length < 9}>
          &lt; Anterior
        </button>
        <button onClick={() => navigate('nextPage')} disabled={ads.length < 9}>
          Siguiente &gt;
        </button>
      </div>
    </section>
  );
};

export default Ads;




