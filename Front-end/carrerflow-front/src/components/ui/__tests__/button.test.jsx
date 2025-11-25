import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../button'; // Importando do arquivo button.jsx (minúsculo)

describe('UI Component: Button', () => {
  it('deve renderizar o texto corretamente', () => {
    render(<Button>Clique Aqui</Button>);
    expect(screen.getByText('Clique Aqui')).toBeInTheDocument();
  });

  it('deve executar a função onClick quando clicado', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Ação</Button>);
    
    const btn = screen.getByText('Ação');
    fireEvent.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando a prop disabled for passada', () => {
    render(<Button disabled>Bloqueado</Button>);
    // Como seu botão usa a prop HTML padrão 'disabled' ou classe de estilo
    const btn = screen.getByText('Bloqueado');
    expect(btn).toBeDisabled(); 
  });
});