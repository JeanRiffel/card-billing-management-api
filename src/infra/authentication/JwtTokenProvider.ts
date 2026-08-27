import { Injectable } from '@nestjs/common';
import {
  TokenProvider,
  TokenPayload,
} from 'src/application/login/ports/token-provider';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenProvider implements TokenProvider {
  constructor(private readonly jwt: JwtService) {}

  async verify(token: string): Promise<TokenPayload> {
    const payload = await this.jwt.verifyAsync<{ sub: string; email: string }>(
      token,
    );
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }

  async generate(payload: TokenPayload) {
    return this.jwt.signAsync({
      sub: payload.userId,
      email: payload.email,
    });
  }
}
