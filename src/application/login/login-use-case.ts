import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInputDTO } from './dto/login-input-dto';
import { LoginOutputDTO } from './dto/login-output-dto';
import { UserRepository } from 'src/domain/user/repository/user-repository';
import { PasswordHasher } from './password-hasher';
import { TokenProvider } from './ports/token-provider';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly users: UserRepository,

    @Inject('PASSWORD_HASHER')
    private readonly passwordHasher: PasswordHasher,

    @Inject('TOKEN_PROVIDER')
    private readonly tokenProvider: TokenProvider,
  ) {}

  async execute(input: LoginInputDTO): Promise<LoginOutputDTO> {
    const user = await this.users.findByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = await this.passwordHasher.compare(
      input.password,
      user.password,
    );

    if (!valid) {
      throw new UnauthorizedException();
    }

    const token = await this.tokenProvider.generate({
      userId: user.id,
      email: user.email.value,
    });

    return {
      accessToken: token,
    };
  }
}