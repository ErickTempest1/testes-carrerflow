import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Candidaturas Flow (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let candidaturaId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    // Se você usou app.setGlobalPrefix('api') no main.ts, os testes precisam saber
    app.setGlobalPrefix('api'); 
    await app.init();

    // 1. Criar Usuário
    const email = `dev-${Date.now()}@jobs.com`;
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ name: 'Dev E2E', email, password: '123456' });

    // 2. Logar para pegar Token
    const loginRes = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email, password: '123456' });
    
    token = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /candidaturas - Deve criar nova candidatura', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/candidaturas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nomeEmpresa: 'Google',
        tituloVaga: 'Backend Eng',
        dataCandidatura: '2025-12-01'
      })
      .expect(201);

    candidaturaId = res.body.id;
    expect(res.body.nomeEmpresa).toBe('Google');
  });

  it('GET /candidaturas - Deve listar minhas candidaturas', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/candidaturas')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].tituloVaga).toBe('Backend Eng');
  });

  it('PATCH /candidaturas/:id - Deve atualizar status', () => {
    return request(app.getHttpServer())
      .patch(`/api/candidaturas/${candidaturaId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'Entrevista Técnica' }) // Verifique se bate com seu Enum
      .expect(200)
      .then((res) => {
        expect(res.body.status).toBe('Entrevista Técnica');
      });
  });

  it('DELETE /candidaturas/:id - Deve remover candidatura', () => {
    return request(app.getHttpServer())
      .delete(`/api/candidaturas/${candidaturaId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});