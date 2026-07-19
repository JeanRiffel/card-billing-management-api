import { LoginInputDTO } from "../dto/login-input-dto";


export interface TokenProvider {
    generate(payload: LoginInputDTO): Promise<string>;
    verify(token: string): Promise<LoginInputDTO>;
}