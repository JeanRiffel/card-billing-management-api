import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
//import { PrismaService } from 'src/infra/orm/prisma.service';
import CreateUserUseCase from 'src/application/user/use-cases/create-user-user-case';
import { PrismaUserRepository } from 'src/infra/orm/repository/users/PrismaUserRepository';

@Module({
  providers: [  
    CreateUserUseCase,  
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository, // Replace with your actual implementation of UserRepository

    }
  ],
  controllers: [UsersController],
  //exports: [UsersService], 
})
export class UsersModule {}
