import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AdDetails from '../components/AdDetails';

jest.mock('axios');

const mockAd = {
  id_anuncio: 1,
  titulo: 'Test Ad',
  descripcion: 'Test Description',
  categoria: 'Test Category',
  ubicacion: 'Test Location',
  autor: 'Test Author',
  id_usuario: 1,
};

const mockUser = {
  id_usuario: 1,
};

test('renders AdDetails component with provided ad', () => {
  render(<AdDetails ad={mockAd} user={mockUser} navigate={jest.fn()} updateAds={jest.fn()} />);

  expect(screen.getByText('Test Ad')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
  expect(screen.getByText('Categoría: Test Category')).toBeInTheDocument();
  expect(screen.getByText('Ubicación: Test Location')).toBeInTheDocument();
  expect(screen.getByText('Autor: Test Author')).toBeInTheDocument();
});

test('handles delete ad action', async () => {
  axios.delete.mockResolvedValueOnce({});
  const updateAds = jest.fn();
  const navigate = jest.fn();

  render(<AdDetails ad={mockAd} user={mockUser} navigate={navigate} updateAds={updateAds} />);

  window.confirm = jest.fn(() => true);
  fireEvent.click(screen.getByText('Eliminar anuncio'));

  expect(axios.delete).toHaveBeenCalledWith('http://localhost:3001/api/deleteAd/1');
  expect(await screen.findByText('Anuncio eliminado exitosamente')).toBeInTheDocument();
  expect(updateAds).toHaveBeenCalled();
  expect(navigate).toHaveBeenCalledWith('home');
});
