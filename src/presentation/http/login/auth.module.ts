import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/infra/authentication/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/presentation/http/users/users.module';
import { LoginUseCase } from 'src/application/login/login-use-case';
import { PrismaUserRepository } from 'src/infra/orm/repository/users/PrismaUserRepository';
import { BcryptPasswordHasher } from 'src/infra/authentication/BcryptPasswordHasher';
import { JwtTokenProvider } from 'src/infra/authentication/JwtTokenProvider';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret123',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase, 
    {
      provide: 'PASSWORD_HASHER',
      useClass: BcryptPasswordHasher,
    },
    {
      provide: 'TOKEN_PROVIDER',
      useClass: JwtTokenProvider,
    },

    {
      provide: 'USER_REPOSITORY',
      useClass: PrismaUserRepository,
    } ,    
    JwtStrategy
  ],
  exports: [LoginUseCase],
})

export class AuthModule {}
