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

    const regex = /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u;
    if (!regex.test(value)) {
      throw new Error(
        'User name can only contain letters, and single spaces, hyphens or apostrophes between them',
      );
    }
  }

  getValue(): string {
    return this.value;
  }
}

export default UserNameValueObject;
