// src/auth/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { jest } from '@jest/globals';
import { RegisterDto } from '../users/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  const mockUser = {
    id: 1,
    name: 'Yash',
    email: 'yash@example.com',
    password: '$2b$10$hashedpassword',
  };

  beforeEach(async () => {
    usersService = {
      createUser: jest.fn().mockResolvedValue(mockUser),
      findByEmail: jest.fn().mockResolvedValue(mockUser),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mocked-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('register should create a new user', async () => {
    const registerDto: RegisterDto = { name: 'Yash', email: 'yash@example.com', password: 'secret' };
    const user = await service.register(registerDto);
    expect(user).toEqual(mockUser);
    expect(usersService.createUser).toHaveBeenCalled();
  });

  it('login should return access token for valid credentials', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);


    const loginDto: LoginDto = { email: 'yash@example.com', password: 'secret' };
    const result = await service.login(loginDto);

    expect(result).toEqual({ access_token: 'mocked-jwt-token' });
    expect(usersService.findByEmail).toHaveBeenCalledWith('yash@example.com');
    expect(jwtService.sign).toHaveBeenCalled();
  });

  it('login should throw UnauthorizedException for invalid credentials', async () => {
    (usersService.findByEmail as jest.Mock).mockResolvedValue(null);

    const loginDto: LoginDto = { email: 'wrong@example.com', password: 'secret' };
    await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
  });

  it('login should throw UnauthorizedException if password is invalid', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const loginDto: LoginDto = { email: 'yash@example.com', password: 'wrongpass' };
    await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
  });
});
