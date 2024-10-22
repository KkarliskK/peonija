import { render, screen } from '@testing-library/react';
import Categories from '../Categories'; 

describe('Categories', () => {
  it('renders the title', () => {
    render(<Categories title="Hello, World!" />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});