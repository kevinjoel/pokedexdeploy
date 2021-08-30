import { render, screen } from '@testing-library/react';
import App from './App';

test('Pokedex', () => {
  render(<App />);
  const linkElement = screen.getByText(/Pokedex/i);
  expect(linkElement).toBeInTheDocument();
});
