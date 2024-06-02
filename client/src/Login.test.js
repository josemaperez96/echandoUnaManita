import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Login from '../components/Login';

jest.mock('axios');

test('renders Login component and handles login', async () => {
  const navigate = jest.fn();
  const setUser = jest.fn();

  render(<Login navigate={navigate} setUser={setUser} />);

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'Password123' } });
  fireEvent.click(screen.getByText(/iniciar sesión/i));

  axios.post.mockResolvedValueOnce({ data: { user: { id_usuario: 1, nombre: 'Test User' } } });

  expect(await screen.findByText('Inicio de sesión exitoso')).toBeInTheDocument();
  expect(setUser).toHaveBeenCalledWith({ id_usuario: 1, nombre: 'Test User' });
  expect(navigate).toHaveBeenCalledWith('home');
});
