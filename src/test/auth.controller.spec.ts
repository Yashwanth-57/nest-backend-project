
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from '../users/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn().mockImplementation(dto => Promise.resolve({ id: 1, ...dto, password: 'hashed' })),
    login: jest.fn().mockResolvedValue({ access_token: 'jwt-token' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('register should call AuthService.register', async () => {
    const dto: RegisterDto = { name: 'Yash', email: 'yash@example.com', password: 'password' };
    const result = await controller.register(dto);
    expect(result).toEqual({ id: 1, ...dto, password: 'hashed' });
    expect(mockAuthService.register).toHaveBeenCalledWith(dto);
  });

  it('login should call AuthService.login', async () => {
    const dto: LoginDto = { email: 'yash@example.com', password: 'password' };
    const result = await controller.login(dto);
    expect(result).toEqual({ access_token: 'jwt-token' });
    expect(mockAuthService.login).toHaveBeenCalledWith(dto);
  });
});
