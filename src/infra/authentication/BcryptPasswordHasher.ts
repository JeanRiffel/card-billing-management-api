import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { PasswordHasher } from "src/application/login/password-hasher";

@Injectable()
export class BcryptPasswordHasher
implements PasswordHasher {

    async hash(password: string) {
        return bcrypt.hash(password, 10);
    }

    async compare(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }
}