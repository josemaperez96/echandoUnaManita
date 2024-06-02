import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Ads from '../components/Ads';

const mockAds = [
  {
    id_anuncio: 1,
    titulo: 'Test Ad 1',
    descripcion: 'Description 1',
    location: 'Location 1',
    date: 'Date 1',
    autor: 'Author 1',
    categoria: 'Category 1',
  },
  {
    id_anuncio: 2,
    titulo: 'Test Ad 2',
    descripcion: 'Description 2',
    location: 'Location 2',
    date: 'Date 2',
    autor: 'Author 2',
    categoria: 'Category 2',
  },
];

test('renders Ads component with list of ads', () => {
  render(<Ads navigate={jest.fn()} ads={mockAds} updateAds={jest.fn()} />);

  expect(screen.getByText('Test Ad 1')).toBeInTheDocument();
  expect(screen.getByText('Test Ad 2')).toBeInTheDocument();
});

test('handles pagination buttons', () => {
  const navigate = jest.fn();
  render(<Ads navigate={navigate} ads={mockAds} updateAds={jest.fn()} />);

  fireEvent.click(screen.getByText('Siguiente >'));
  expect(navigate).toHaveBeenCalledWith('nextPage');

  fireEvent.click(screen.getByText('< Anterior'));
  expect(navigate).toHaveBeenCalledWith('previousPage');
});
