import { Injectable } from "@nestjs/common";
import { TokenProvider } from "src/application/login/ports/token-provider";
import { JwtService } from "@nestjs/jwt";
import { LoginInputDTO } from "src/application/login/dto/login-input-dto";

@Injectable()
export class JwtTokenProvider
implements TokenProvider {

    constructor(
        private readonly jwt: JwtService,
    ) {}
    verify(token: string): Promise<LoginInputDTO> {
        throw new Error("Method not implemented.");
    }

    async generate(payload: LoginInputDTO) {
        return this.jwt.signAsync({
            sub: payload.userId,
            email: payload.email,
        });
    }
}