import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/infra/orm/prisma/prisma.service';
import CreateUserUseCase from 'src/application/user/use-cases/create-user-user-case';
import { PrismaUserRepository } from 'src/infra/orm/repository/users/PrismaUserRepository';

@Module({
  providers: [
    CreateUserUseCase,
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
