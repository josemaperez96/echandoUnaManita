import React from 'react';
import { render, screen } from '@testing-library/react';
import Informacion from '../components/Informacion';

test('renders Informacion component with user data', () => {
  const user = {
    nombre: 'John Doe',
    edad: 30,
    profesion: 'Carpintero',
    descripcion: 'Experto en carpintería'
  };

  render(<Informacion user={user} />);

  expect(screen.getByText('Nombre: John Doe')).toBeInTheDocument();
  expect(screen.getByText('Edad: 30')).toBeInTheDocument();
  expect(screen.getByText('Profesión: Carpintero')).toBeInTheDocument();
  expect(screen.getByText('Descripción: Experto en carpintería')).toBeInTheDocument();
});
