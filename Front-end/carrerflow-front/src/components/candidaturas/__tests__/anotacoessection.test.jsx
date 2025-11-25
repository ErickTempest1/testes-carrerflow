import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AnotacoesSection from '../anotacoessection';

describe('Component: AnotacoesSection', () => {
  it('deve adicionar nova anotação', () => {
    const handleAdd = vi.fn();
    render(<AnotacoesSection onAddAnotacao={handleAdd} />);
    
    const text = screen.getByPlaceholderText(/Escreva suas observações/i);
    fireEvent.change(text, { target: { value: 'Nota de teste' } });
    
    fireEvent.click(screen.getByText('Salvar Anotação'));
    expect(handleAdd).toHaveBeenCalledWith('Nota de teste');
  });
});