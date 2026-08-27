import { ApiProperty } from '@nestjs/swagger';

export class LoginInputDTO {
  @ApiProperty({ example: 'john@example.com' })
  email: string = '';

  @ApiProperty({ example: '123456' })
  password: string = '';
}
