import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';

import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access_token on valid credentials', async () => {
      const body = { email: 'test@example.com', password: '123456' };
      const user = { id: '1', email: body.email };
      const token = { access_token: 'jwt.token.here' };
      mockAuthService.validateUser.mockResolvedValue(user);
      mockAuthService.login.mockResolvedValue(token);

      const result = await controller.login(body);
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(body.email, body.password);
      expect(mockAuthService.login).toHaveBeenCalledWith(user);
      expect(result).toEqual(token);
    });

    it('should throw error if validateUser throws', async () => {
      const body = { email: 'fail@example.com', password: 'wrong' };
      mockAuthService.validateUser.mockRejectedValue(new Error('Invalid credentials'));

      await expect(controller.login(body)).rejects.toThrow('Invalid credentials');
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(body.email, body.password);
      expect(mockAuthService.login).not.toHaveBeenCalled();
    });
  });
});
