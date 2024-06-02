import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Chat from '../components/Chat';

jest.mock('axios');

const mockMessages = [
  { id_usuario: 1, mensaje: 'Hola' },
  { id_usuario: 2, mensaje: '¿Cómo estás?' }
];

const mockUser = { id_usuario: 1 };
const mockOtherUser = { id_usuario: 2, foto_perfil: 'perfil.jpg' };

test('renders Chat component with messages', async () => {
  axios.get.mockResolvedValueOnce({ data: mockMessages }).mockResolvedValueOnce({ data: mockOtherUser });

  render(<Chat chatId={1} user={mockUser} navigate={jest.fn()} />);

  expect(await screen.findByText('Hola')).toBeInTheDocument();
  expect(screen.getByText('¿Cómo estás?')).toBeInTheDocument();
});

test('sends a new message', async () => {
  axios.get.mockResolvedValueOnce({ data: mockMessages }).mockResolvedValueOnce({ data: mockOtherUser });
  axios.post.mockResolvedValueOnce({});

  render(<Chat chatId={1} user={mockUser} navigate={jest.fn()} />);

  const input = screen.getByPlaceholderText('Escribe un mensaje...');
  fireEvent.change(input, { target: { value: 'Nuevo mensaje' } });
  fireEvent.click(screen.getByText('Enviar'));

  expect(await screen.findByText('Nuevo mensaje')).toBeInTheDocument();
});
