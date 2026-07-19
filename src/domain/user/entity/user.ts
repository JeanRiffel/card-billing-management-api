import UserNameValueObject from "../value-object/user-name-value-object"
import UsermailValueObject from "../value-object/user-email-value-object"

class User {

  constructor(
    public readonly id: string,
    public readonly name: UserNameValueObject,
    public readonly email: UsermailValueObject,
    public readonly password: string,
  ) {}

  toJSON(){
    return {
      id: this.id,
      name: this.name.toString(),
      email: this.email.toString(),
      password: this.password,
    }
  }
}

export default User