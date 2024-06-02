import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ModificarAd from '../components/ModificarAd';

jest.mock('axios');

const mockAd = {
  id_anuncio: 1,
  titulo: 'Test Ad',
  descripcion: 'Test Description',
  categoria: 'Carpintero',
  ubicacion: 'Test Location'
};

test('renders ModificarAd component and updates ad', async () => {
  const navigate = jest.fn();

  render(<ModificarAd ad={mockAd} navigate={navigate} />);

  fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Updated Title' } });
  fireEvent.change(screen.getByLabelText(/descripción/i), { target: { value: 'Updated Description' } });
  fireEvent.click(screen.getByText(/guardar cambios/i));

  axios.put.mockResolvedValueOnce({});

  expect(await screen.findByText('Anuncio actualizado exitosamente')).toBeInTheDocument();
  expect(navigate).toHaveBeenCalledWith('perfil');
});
