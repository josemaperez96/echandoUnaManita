import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import PublicarRes from '../components/PublicarRes';

jest.mock('axios');

const mockUser = { id_usuario: 1 };

test('renders PublicarRes component and publishes review', async () => {
  const navigate = jest.fn();

  render(<PublicarRes navigate={navigate} user={mockUser} reviewedUserId={2} />);

  fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Test Title' } });
  fireEvent.change(screen.getByLabelText(/comentario/i), { target: { value: 'Test Comment' } });
  fireEvent.change(screen.getByLabelText(/puntuación/i), { target: { value: 5 } });
  fireEvent.click(screen.getByText(/publicar/i));

  axios.post.mockResolvedValueOnce({});

  expect(await screen.findByText('Reseña publicada exitosamente')).toBeInTheDocument();
  expect(navigate).toHaveBeenCalledWith('perfil', { id_usuario: 2 });
});
