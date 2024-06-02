import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';

const mockUser = { nombre: 'Juan' };

test('renders Header component and handles navigation', () => {
  const navigate = jest.fn();
  const onLogout = jest.fn();

  render(<Header navigate={navigate} user={mockUser} onLogout={onLogout} />);

  expect(screen.getByText('Manitas App')).toBeInTheDocument();
  expect(screen.getByText('Juan')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Cerrar Sesión'));
  expect(onLogout).toHaveBeenCalled();
});
