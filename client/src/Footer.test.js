import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../components/Footer';

test('renders Footer component', () => {
  render(<Footer />);
  expect(screen.getByText('Echando una Manita - Todos los derechos reservados')).toBeInTheDocument();
});
