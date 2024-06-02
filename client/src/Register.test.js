import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Register from '../components/Register';

jest.mock('axios');

test('renders Register component', () => {
  render(<Register navigate={jest.fn()} />);
  expect(screen.getByText('Nombre completo:')).toBeInTheDocument();
});

test('handles form submission', async () => {
  const navigate = jest.fn();
  axios.post.mockResolvedValueOnce({ data: {} });

  render(<Register navigate={navigate} />);

  fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Juan Pérez' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'juan@example.com' } });
  fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'Password123' } });
  fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'Password123' } });
  fireEvent.change(screen.getByLabelText(/edad/i), { target: { value: '30' } });
  fireEvent.change(screen.getByLabelText(/perfil profesional/i), { target: { value: 'Carpintero' } });

  fireEvent.click(screen.getByText('Registrarse'));

  expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/api/register', expect.any(Object));
  expect(await screen.findByText('Usuario registrado exitosamente')).toBeInTheDocument();
});
