import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '../components/Nav';

const mockUser = { nombre: 'John Doe' };

test('renders Nav component and handles navigation', () => {
  const navigate = jest.fn();
  const onLogout = jest.fn();

  render(<Nav navigate={navigate} user={mockUser} onLogout={onLogout} />);

  expect(screen.getByText('Inicio')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Inicio'));
  expect(navigate).toHaveBeenCalledWith('home');

  fireEvent.click(screen.getByText('Cerrar Sesión'));
  expect(onLogout).toHaveBeenCalled();
});
