import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Input from '../input';

describe('UI Component: Input', () => {
  it('deve renderizar label e placeholder', () => {
    render(<Input label="Nome" placeholder="Digite seu nome" />);
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro', () => {
    render(<Input error="Dado inválido" />);
    expect(screen.getByText('Dado inválido')).toBeInTheDocument();
  });
});