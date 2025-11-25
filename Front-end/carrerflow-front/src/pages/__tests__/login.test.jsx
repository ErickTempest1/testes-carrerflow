import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Login from '../login'; // Importando de login.jsx

// Wrapper necessário pois o Login usa useNavigate
const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Page: Login', () => {
  it('deve renderizar o formulário de login inicialmente', () => {
    renderLogin();
    // Verifica textos que existem no seu AuthLayout/LoginForm
    expect(screen.getByText(/Bem-vindo de volta/i)).toBeInTheDocument();
    
    // Verifica se o link de cadastro existe
    expect(screen.getByText(/Cadastre-se gratuitamente/i)).toBeInTheDocument();
  });

  it('deve permitir interagir com o campo de email', () => {
    renderLogin();
    // Busca pelo placeholder que vi no seu código (ou use getByLabelText se preferir)
    // O código anterior mostrava placeholder="voce@exemplo.com" ou similar no input
    const inputs = screen.getAllByRole('textbox');
    const emailInput = inputs.find(i => i.type === 'email') || inputs[0];
    
    fireEvent.change(emailInput, { target: { value: 'teste@carrerflow.com' } });
    expect(emailInput.value).toBe('teste@carrerflow.com');
  });
});