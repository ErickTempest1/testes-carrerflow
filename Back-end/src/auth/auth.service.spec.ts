import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserRepo = {
    findOne: jest.fn(),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) => Promise.resolve({ id: 1, ...user })),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('test-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepo },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('deve registrar um usuário e retornar token', async () => {
    mockUserRepo.findOne.mockResolvedValue(null); // Usuário não existe
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashedPass'));

    const result = await service.register({
      name: 'Test',
      email: 'new@test.com',
      password: '123',
    });

    expect(result).toEqual({ access_token: 'test-token' });
    expect(mockUserRepo.save).toHaveBeenCalled();
  });

  it('deve falhar ao registrar email duplicado', async () => {
    mockUserRepo.findOne.mockResolvedValue({ id: 1, email: 'exists@test.com' });
    await expect(service.register({ name: 'Test', email: 'exists@test.com', password: '123' }))
      .rejects.toThrow(ConflictException);
  });

  it('deve fazer login com sucesso', async () => {
    mockUserRepo.findOne.mockResolvedValue({ id: 1, email: 'login@test.com', password: 'hashedPassword' });
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

    const result = await service.login({ email: 'login@test.com', password: '123' });
    expect(result).toEqual({ access_token: 'test-token' });
  });
});