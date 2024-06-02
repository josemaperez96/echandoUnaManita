import React from 'react';
import { render, screen } from '@testing-library/react';
import ResInf from '../components/ResInf';

test('renders ResInf component with provided props', () => {
  render(<ResInf titulo="Buen trabajo" comentario="Muy satisfecho" puntuacion={5} />);

  expect(screen.getByText('Buen trabajo')).toBeInTheDocument();
  expect(screen.getByText('Muy satisfecho')).toBeInTheDocument();
  expect(screen.getByText('Puntuación: 5')).toBeInTheDocument();
});
