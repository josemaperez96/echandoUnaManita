import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../components/Filters';

test('renders Filters component and handles filter click', () => {
  const setFilter = jest.fn();
  render(<Filters setFilter={setFilter} />);

  const filter = screen.getByText('Carpintero');
  fireEvent.click(filter);
  expect(setFilter).toHaveBeenCalledWith('Carpintero');

  fireEvent.click(filter);
  expect(setFilter).toHaveBeenCalledWith('');
});
