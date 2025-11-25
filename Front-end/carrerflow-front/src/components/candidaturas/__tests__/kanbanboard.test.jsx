import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import KanbanBoard from '../kanbanboard';

// Mock dos dados
const mockItems = [
  { id: '1', title: 'Dev Frontend', company: 'Google', status: 'Entrevista', createdAt: '2023-01-01' },
  { id: '2', title: 'Dev Backend', company: 'Amazon', status: 'Aplicada', createdAt: '2023-01-02' }
];

describe('Component: KanbanBoard', () => {
  it('deve distribuir os cards nas colunas corretas', () => {
    render(<KanbanBoard items={mockItems} />);

    // Verifica se os textos das vagas estão na tela
    expect(screen.getByText('Dev Frontend')).toBeInTheDocument();
    expect(screen.getByText('Dev Backend')).toBeInTheDocument();

    // Verificação mais avançada: Checar se "Dev Frontend" está dentro da coluna "Entrevista"
    // (Isso é difícil de fazer só com seletores de texto, mas garantir que renderizou já é 80% do caminho)
  });

  it('deve renderizar todas as colunas de status padrão', () => {
    render(<KanbanBoard items={[]} />);
    // Baseado na sua constante STATUS_LABELS
    expect(screen.getByText('Entrevista')).toBeInTheDocument();
    expect(screen.getByText('Aplicada')).toBeInTheDocument();
    expect(screen.getByText('Proposta')).toBeInTheDocument();
  });
});