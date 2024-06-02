import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Ad from '../components/Ad';

test('renders Ad component with provided props', () => {
  const handleClick = jest.fn();
  render(
    <Ad
      title="Test Title"
      description="Test Description"
      location="Test Location"
      date="Test Date"
      autor="Test Author"
      categoria="Test Category"
      onClick={handleClick}
    />
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
  expect(screen.getByText('Ubicación: Test Location')).toBeInTheDocument();
  expect(screen.getByText('Fecha de Publicación: Test Date')).toBeInTheDocument();
  expect(screen.getByText('Autor: Test Author')).toBeInTheDocument();
  expect(screen.getByText('Categoría: Test Category')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Test Title'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
