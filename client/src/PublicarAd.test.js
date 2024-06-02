import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import PublicarAd from '../components/PublicarAd';

jest.mock('axios');

const mockUser = { id_usuario: 1 };

test('renders PublicarAd component and publishes ad', async () => {
  const navigate = jest.fn();
  const updateAds = jest.fn();

  render(<PublicarAd navigate={navigate} user={mockUser} updateAds={updateAds} />);

  fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Test Title' } });
  fireEvent.change(screen.getByLabelText(/descripción/i), { target: { value: 'Test Description' } });
  fireEvent.change(screen.getByLabelText(/categoría/i), { target: { value: 'Carpintero' } });
  fireEvent.change(screen.getByLabelText(/ubicación/i), { target: { value: 'Test Location' } });
  fireEvent.click(screen.getByText(/publicar/i));

  axios.post.mockResolvedValueOnce({});

  expect(await screen.findByText('Anuncio publicado exitosamente')).toBeInTheDocument();
  expect(updateAds).toHaveBeenCalled();
  expect(navigate).toHaveBeenCalledWith('home');
});
