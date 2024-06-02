import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeaderNav from '../components/HeaderNav';

const mockUser = { foto_perfil: 'perfil.jpg' };

test('renders HeaderNav component and handles navigation', () => {
  const navigate = jest.fn();
  const onLogout = jest.fn();

  render(<HeaderNav navigate={navigate} user={mockUser} onLogout={onLogout} />);

  expect(screen.getByText('Echando una Manita')).toBeInTheDocument();

  const profileImage = screen.getByAltText('Perfil');
  fireEvent.click(profileImage);
  expect(navigate).toHaveBeenCalledWith('perfil');
});

test('handles logout', () => {
  const navigate = jest.fn();
  const onLogout = jest.fn();

  render(<HeaderNav navigate={navigate} user={mockUser} onLogout={onLogout} />);

  fireEvent.click(screen.getByText('Cerrar Sesión'));
  expect(onLogout).toHaveBeenCalled();
});
