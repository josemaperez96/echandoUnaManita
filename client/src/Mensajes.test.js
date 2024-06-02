import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Mensajes from '../components/Mensajes';

jest.mock('axios');

const mockUser = { id_usuario: 1 };

test('renders Mensajes component with no chats', async () => {
  axios.get.mockResolvedValueOnce({ data: [] });

  render(<Mensajes user={mockUser} navigate={jest.fn()} />);

  expect(await screen.findByText('No tienes chats abiertos.')).toBeInTheDocument();
});

test('renders Mensajes component with chats', async () => {
  const mockChats = [
    { id_chat: 1, userName: 'User 1', userProfileImage: 'profile1.jpg' },
    { id_chat: 2, userName: 'User 2', userProfileImage: 'profile2.jpg' },
  ];

  axios.get.mockResolvedValueOnce({ data: mockChats });

  render(<Mensajes user={mockUser} navigate={jest.fn()} />);

  expect(await screen.findByText('Chat con User 1')).toBeInTheDocument();
  expect(screen.getByText('Chat con User 2')).toBeInTheDocument();
});
