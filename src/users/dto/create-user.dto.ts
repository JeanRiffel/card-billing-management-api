import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john@email.com'})
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234'})
  @IsNotEmpty()  
  password: string;

  @ApiProperty({example: 'John Woo'})
  @IsNotEmpty()
  name: string;
}
