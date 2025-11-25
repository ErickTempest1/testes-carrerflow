import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Layout from '../layout';
import { useAuth } from '../../../hooks/useAuth';

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({ user: { name: 'Tester', email: 'test@mail.com' } })
}));

describe('Component: Layout', () => {
  it('deve renderizar Header e Sidebar', () => {
    render(<BrowserRouter><Layout /></BrowserRouter>);
    expect(screen.getByText('Tester')).toBeInTheDocument(); // Header
    expect(screen.getByText('Dashboard')).toBeInTheDocument(); // Sidebar
  });
});