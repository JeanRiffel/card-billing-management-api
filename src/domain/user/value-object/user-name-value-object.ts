class UserNameValueObject {

  constructor(public readonly value: string) {
    this.validateUserName(value);
  }


  private validateUserName(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('User name cannot be empty');
    }

    if (value.length < 3 || value.length > 50) {
      throw new Error('User name must be between 3 and 50 characters');
    }

    const regex = /^[a-zA-Z0-9_]+$/;
    if (!regex.test(value)) {
      throw new Error('User name can only contain alphanumeric characters and underscores');
    }
  }

  getValue(): string {
    return this.value
  }

}

export default  UserNameValueObject;