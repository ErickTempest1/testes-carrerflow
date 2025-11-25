import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from '../modal';

describe('UI Component: Modal', () => {
  it('não deve aparecer se open=false', () => {
    render(<Modal open={false}>Conteúdo</Modal>);
    expect(screen.queryByText('Conteúdo')).not.toBeInTheDocument();
  });

  it('deve aparecer se open=true e fechar ao clicar no botão', () => {
    const handleClose = vi.fn();
    render(<Modal open={true} onClose={handleClose}>Segredo</Modal>);
    
    expect(screen.getByText('Segredo')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Fechar'));
    expect(handleClose).toHaveBeenCalled();
  });
});