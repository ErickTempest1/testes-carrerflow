import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Signup from '../signup';

const renderSignup = () => render(<BrowserRouter><Signup /></BrowserRouter>);

describe('Page: Signup', () => {
  it('deve mostrar erro se as senhas não coincidirem', () => {
    renderSignup();

    // Simula preencher o form
    // Nota: Ajuste os placeholders/labels conforme seu código real do SignupForm
    const passInput = screen.getByPlaceholderText('Mín. 6 caracteres');
    const confirmInput = screen.getByPlaceholderText('Repita a senha');

    fireEvent.change(passInput, { target: { value: 'senha123' } });
    fireEvent.change(confirmInput, { target: { value: 'senha456' } });

    // Tenta submeter (assumindo que tem um botão "Criar conta" ou similar)
    // Se o erro aparecer antes do click (onBlur), o teste já valida aqui
    
    // Procura pela mensagem de erro que vi no seu arquivo signup.jsx
    // "As senhas não coincidem"
    // Pode ser necessário disparar o submit dependendo de como está implementado
    const submitBtn = screen.getByText(/Criar conta/i); // Ajuste o texto do botão
    fireEvent.click(submitBtn);

    expect(screen.getByText(/As senhas não coincidem/i)).toBeInTheDocument();
  });
});