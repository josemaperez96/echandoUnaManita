import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ModificarPerfil from '../components/ModificarPerfil';

jest.mock('axios');

const mockUser = {
  id_usuario: 1,
  nombre: 'John Doe',
  edad: 30,
  profesion: 'Carpintero',
  descripcion: 'Experto en carpintería'
};

test('renders ModificarPerfil component and updates profile', async () => {
  const navigate = jest.fn();

  render(<ModificarPerfil user={mockUser} navigate={navigate} />);

  fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Updated Name' } });
  fireEvent.change(screen.getByLabelText(/edad/i), { target: { value: 35 } });
  fireEvent.click(screen.getByText(/guardar cambios/i));

  axios.put.mockResolvedValueOnce({});

  expect(await screen.findByText('Perfil actualizado exitosamente')).toBeInTheDocument();
  expect(navigate).toHaveBeenCalledWith('perfil');
});
