import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from '../components/App';

jest.mock('axios');

test('renders App component and navigates through pages', async () => {
  axios.get.mockResolvedValue({ data: [] });

  render(<App />);

  expect(screen.getByText('Anuncios')).toBeInTheDocument();


  fireEvent.click(screen.getByText('Registrarse'));
  expect(screen.getByText('Formulario de Registro')).toBeInTheDocument();


  fireEvent.click(screen.getByText('Iniciar sesión'));
  expect(screen.getByText('Formulario de Inicio de Sesión')).toBeInTheDocument();
});
