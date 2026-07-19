import { ApiProperty } from '@nestjs/swagger';

export class UserCreatedDTO {
  @ApiProperty({
    example: "ebb3d472-7da3-4520-ac6d-415116d6cf57",
  })
  id: string;

  @ApiProperty({
    example: "John"
  })
  name: string;


  @ApiProperty({
    example: "john@email.com",
  })
  email: string;

}

