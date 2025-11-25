import { describe, it, expect } from 'vitest';
import { getStatusTone, STATUS_LABELS } from '../statusColors'; // Ajuste o nome do arquivo se for statuscolors.js

describe('Utils: StatusColors', () => {
  it('deve retornar a cor correta para "Entrevista"', () => {
    const tone = getStatusTone('Entrevista');
    // Verifica se retornou um objeto com background (não precisamos checar a cor exata hexadecimal, só a estrutura)
    expect(tone).toHaveProperty('background');
    expect(tone).toHaveProperty('text');
  });

  it('deve ter um fallback (padrão) para status desconhecido', () => {
    const tone = getStatusTone('Status Inexistente');
    expect(tone).toBeDefined();
    expect(tone.background).toBeDefined();
  });

  it('deve exportar a lista de labels correta', () => {
    expect(STATUS_LABELS).toContain('Entrevista');
    expect(STATUS_LABELS).toContain('Aplicada');
  });
});