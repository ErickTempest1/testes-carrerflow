import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from '../dashboard';
import { api } from '../../services/api'; // Mockando api.js
import { useAuth } from '../../hooks/useAuth'; // Mockando useAuth.jsx

// 1. Mock do Módulo de API
vi.mock('../../services/api', () => ({
  api: {
    getCandidaturas: vi.fn(),
    getAnalytics: vi.fn()
  }
}));

// 2. Mock do Hook de Autenticação
vi.mock('../../hooks/useAuth', () => ({
  useAuth: vi.fn()
}));

describe('Page: Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Configura o usuário logado para todos os testes deste arquivo
    useAuth.mockReturnValue({
      user: { id: 'user-123', name: 'Erick Teste' }
    });
  });

  it('deve carregar e exibir os dados do analytics', async () => {
    // Configura o retorno falso da API para simular sucesso
    api.getAnalytics.mockReturnValue({
      totals: { total: 15, emAnalise: 5, entrevistas: 3, ofertas: 1, conversionRate: 20 },
      deltas: { total: 10 },
      summary: [],
      timeline: [],
      companies: []
    });
    
    api.getCandidaturas.mockReturnValue({
      items: [],
      meta: { total: 0 }
    });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Como o dashboard carrega dados assincronamente, usamos waitFor
    await waitFor(() => {
      // Verifica se o Card "Total de Candidaturas" mostra o valor 15
      expect(screen.getByText('15')).toBeInTheDocument();
      
      // Verifica se o Card "Entrevistas" mostra o valor 3
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });
});