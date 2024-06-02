// Mensajes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mensajes.css';

const Mensajes = ({ user, navigate }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getUserChats/${user.id_usuario}`);
        setChats(response.data);
      } catch (error) {
        console.error('Error obteniendo chats:', error);
      }
    };

    fetchChats();
  }, [user.id_usuario]);

  return (
    <div className="mensajes-container">
      {chats.length === 0 ? (
        <p>No tienes chats abiertos.</p>
      ) : (
        <ul>
          {chats.map(chat => (
            <li key={chat.id_chat} onClick={() => navigate('chat', { chatId: chat.id_chat })}>
              <img
                src={chat.userProfileImage ? `http://localhost:3001/${chat.userProfileImage}` : 'http://localhost:3001/upload/Perfil_defecto.jpg'}
                alt="Perfil"
                className="profile-picture"
              />
              Chat con {chat.userName} {/* Ajusta según los datos recibidos */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Mensajes;

