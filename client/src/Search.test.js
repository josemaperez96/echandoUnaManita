import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Search from '../components/Search';

jest.mock('axios');

const mockAds = [
  { titulo: 'Electricista', descripcion: 'Necesito un electricista' },
  { titulo: 'Fontanero', descripcion: 'Se busca fontanero' },
];

test('renders Search component', () => {
  render(<Search setAds={jest.fn()} />);
  expect(screen.getByLabelText('Buscar trabajo:')).toBeInTheDocument();
  expect(screen.getByLabelText('Ubicación:')).toBeInTheDocument();
});

test('handles search button click', async () => {
  axios.get.mockResolvedValueOnce({ data: mockAds });
  const setAds = jest.fn();

  render(<Search setAds={setAds} />);

  fireEvent.change(screen.getByPlaceholderText('Buscar...'), { target: { value: 'Electricista' } });
  fireEvent.change(screen.getByPlaceholderText('Ubicación...'), { target: { value: 'Madrid' } });
  fireEvent.click(screen.getByText('Buscar'));

  expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/api/searchAds', {
    params: { title: 'Electricista', location: 'Madrid' },
  });
  expect(await setAds).toHaveBeenCalledWith(mockAds);
});
