import { PrismaService } from '../../prisma/prisma.service';
import User from 'src/domain/user/entity/user';
import UserNameValueObject from 'src/domain/user/value-object/user-name-value-object';
import UserEmailValueObject from 'src/domain/user/value-object/user-email-value-object';
import { UserRepository } from 'src/domain/user/repository/user-repository';

export class PrismaUserRepository 
  implements UserRepository {

  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name.toString(),
        email: user.email.toString(),
        passwordHash: user.password,
      },
    });

    return new User(
      createdUser.id,
      new UserNameValueObject(createdUser.name),
      new UserEmailValueObject(createdUser.email),
      createdUser.passwordHash,
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;
    return new User(
      user.id,
      new UserNameValueObject(user.name),
      new UserEmailValueObject(user.email),
      user.passwordHash,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;
    return new User(
      user.id,
      new UserNameValueObject(user.name),
      new UserEmailValueObject(user.email),
      user.passwordHash,
    );
  }

}