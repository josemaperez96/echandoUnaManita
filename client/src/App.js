// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import HeaderNav from './HeaderNav';
import Search from './Search';
import Filters from './Filters';
import Ads from './Ads';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import Perfil from './Perfil';
import AdDetails from './AdDetails';
import PublicarAd from './PublicarAd';
import PublicarRes from './PublicarRes';
import ModificarPerfil from './ModificarPerfil';
import Mensajes from './Mensajes';
import Chat from './Chat';
import axios from 'axios';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [reviewedUserId, setReviewedUserId] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState('');

  const navigate = (page, data) => {
    setCurrentPage(page);
    if (page === 'adDetails') {
      setSelectedAd(data);
    } else if (page === 'perfil') {
      if (data && data.id_usuario) {
        setSelectedUserId(data.id_usuario);
      } else {
        setSelectedUserId(user ? user.id_usuario : null);
      }
    } else if (page === 'publicarRes') {
      setReviewedUserId(data.reviewedUserId);
    } else if (page === 'chat') {
      setSelectedChatId(data.chatId);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('login');
  };

  const updateAds = async (category = '') => {
    try {
      const params = { page: 1, limit: 9 };
      if (category) {
        params.categoria = category;
      }
      const response = await axios.get('http://localhost:3001/api/latestAds', { params });
      setAds(response.data);
    } catch (error) {
      console.error('Error obteniendo anuncios:', error);
    }
  };

  useEffect(() => {
    updateAds();
  }, []);

  useEffect(() => {
    updateAds(filter);
  }, [filter]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <div className="app-container">
      <HeaderNav navigate={navigate} user={user} onLogout={handleLogout} />
      <main>
        {currentPage === 'home' && (
          <>
            <Search setAds={setAds} />
            <Filters setFilter={setFilter} />
            <Ads navigate={navigate} ads={ads} updateAds={updateAds} />
          </>
        )}
        {currentPage === 'register' && <Register navigate={navigate} />}
        {currentPage === 'login' && <Login navigate={navigate} setUser={setUser} />}
        {currentPage === 'perfil' && <Perfil navigate={navigate} userId={selectedUserId} user={user} />}
        {currentPage === 'adDetails' && <AdDetails ad={selectedAd} user={user} navigate={navigate} updateAds={updateAds} />}
        {currentPage === 'publicarAd' && <PublicarAd navigate={navigate} user={user} updateAds={updateAds} />}
        {currentPage === 'publicarRes' && <PublicarRes navigate={navigate} user={user} reviewedUserId={reviewedUserId} />}
        {currentPage === 'modificarPerfil' && <ModificarPerfil user={user} navigate={navigate} />}
        {currentPage === 'mensajes' && <Mensajes user={user} navigate={navigate} />}
        {currentPage === 'chat' && <Chat chatId={selectedChatId} user={user} navigate={navigate} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;



