import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from 'src/domain/user/repository/user-repository';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import User from 'src/domain/user/entity/user';
import UserNameValueObject from 'src/domain/user/value-object/user-name-value-object';
import UserEmailValueObject from 'src/domain/user/value-object/user-email-value-object';
import { UserCreatedDTO } from '../dto/user-created.dto';

@Injectable()
class CreateUserUseCase {

  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<any> {

    const existingUser = await this.userRepository.findById(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    const user = await this.userRepository.create(
      new User(
        '545454-41545',
        new UserNameValueObject(createUserDto.name),
        new  UserEmailValueObject(createUserDto.email),
        hashedPassword
      )    
    );

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
 

}



export default CreateUserUseCase;