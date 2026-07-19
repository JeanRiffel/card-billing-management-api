class UserEmailValueObject {

  constructor(public readonly value: string) {  
    this.validateEmail(value);
  }

  private validateEmail(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;        

    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format');
    }
  }

  getValue(): string {
    return this.value;        
  }

}

export default UserEmailValueObject;