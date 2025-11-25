import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../pagination';

describe('UI Component: Pagination', () => {
  it('deve renderizar navegação correta', () => {
    const handleChange = vi.fn();
    render(<Pagination meta={{ page: 1, totalPages: 5 }} onChange={handleChange} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    
    fireEvent.click(screen.getByLabelText('Próxima'));
    expect(handleChange).toHaveBeenCalledWith(2);
  });
});