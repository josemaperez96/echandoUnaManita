// Chat.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = ({ chatId, user, navigate }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getMessages/${chatId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error obteniendo mensajes:', error);
      }
    };

    const fetchOtherUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getOtherUser/${chatId}/${user.id_usuario}`);
        setOtherUser(response.data);
      } catch (error) {
        console.error('Error obteniendo datos del otro usuario:', error);
      }
    };

    fetchMessages();
    fetchOtherUser();
  }, [chatId, user.id_usuario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage) return;

    try {
      await axios.post('http://localhost:3001/api/sendMessage', {
        id_chat: chatId,
        id_usuario: user.id_usuario,
        mensaje: newMessage,
      });
      setMessages([...messages, { id_usuario: user.id_usuario, mensaje: newMessage }]);
      setNewMessage('');
    } catch (error) {
      console.error('Error enviando mensaje:', error);
    }
  };

  if (!otherUser) {
    return <div>Cargando...</div>;
  }

  const profileImageUrl = otherUser.foto_perfil ? `http://localhost:3001/${otherUser.foto_perfil}` : 'http://localhost:3001/upload/Perfil_defecto.jpg';

  return (
    <div className="chat-container">
      <div className="header-chat">
        <button className="back-button" onClick={() => navigate('mensajes')}>←</button>
        <img
          src={profileImageUrl}
          alt="Perfil"
          className="profile-picture"
          onClick={() => navigate('perfil', { id_usuario: otherUser.id_usuario })}
        />
      </div>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.id_usuario === user.id_usuario ? 'my-message' : 'other-message'}`}
          >
            {message.mensaje}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;



