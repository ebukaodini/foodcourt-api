import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, PassportModule, JwtModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  const body = {
    email: 'john.do@example.com',
    password: '12345',
  };

  describe('create', () => {
    it('should create a new meal addon for the specified brand.', async () => {
      const result = {
        user: {
          email: 'john.doe@example.com',
          role: 'admin',
          createdAt: '2023-01-07T19:48:26.767Z',
        },
        authToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE2NzMxMjMxNjcsImV4cCI6MTY3MzEyMzIyN30.oNN7MKA5H4VTzJ8E30zQg8Bz-7iAF2Tq6GjizLIg3A8',
      };

      jest.spyOn(authService, 'login').mockReturnValue(result as any);

      expect(await authController.login(body)).toBe(result);
    });
  });
});
