import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Resenas from '../components/Resenas';

const mockReviews = [
  { titulo: 'Buen trabajo', comentario: 'Muy satisfecho', puntuacion: 5 },
  { titulo: 'Regular', comentario: 'Podría mejorar', puntuacion: 3 },
];

test('renders Resenas component with reviews', () => {
  render(<Resenas reviews={mockReviews} showWriteReviewButton={false} navigate={jest.fn()} reviewedUserId={1} />);
  
  expect(screen.getByText('Buen trabajo')).toBeInTheDocument();
  expect(screen.getByText('Muy satisfecho')).toBeInTheDocument();
  expect(screen.getByText('Regular')).toBeInTheDocument();
  expect(screen.getByText('Podría mejorar')).toBeInTheDocument();
});

test('handles write review button click', () => {
  const navigate = jest.fn();
  render(<Resenas reviews={[]} showWriteReviewButton={true} navigate={navigate} reviewedUserId={1} />);

  fireEvent.click(screen.getByText('Escribir Reseña'));
  expect(navigate).toHaveBeenCalledWith('publicarRes', { reviewedUserId: 1 });
});
