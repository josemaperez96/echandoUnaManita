import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Perfil from '../components/Perfil';

jest.mock('axios');

const mockUser = { id_usuario: 1 };
const mockProfileUser = { id_usuario: 2, nombre: 'Jane Doe', email: 'jane@example.com', puntuacion_media: 4.5 };

test('renders Perfil component with user data', async () => {
  axios.get.mockResolvedValueOnce({ data: mockProfileUser }).mockResolvedValueOnce({ data: [] }).mockResolvedValueOnce({ data: [] });

  render(<Perfil userId={2} navigate={jest.fn()} user={mockUser} />);

  expect(await screen.findByText('Nombre: Jane Doe')).toBeInTheDocument();
  expect(screen.getByText('Email: jane@example.com')).toBeInTheDocument();
  expect(screen.getByText('Puntuación media: 4.50')).toBeInTheDocument();
});
