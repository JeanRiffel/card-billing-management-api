import { Controller, Body, Post, Get } from '@nestjs/common';
import { CreateUserDto } from '../../../users/dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import {  
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UserCreatedDTO } from '../../../users/dto/user-created.dto';
import CreateUserUseCase from 'src/application/user/use-cases/create-user-user-case';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Public()
  @Post()
  @ApiOperation({summary:'Create user' })
  @ApiBody({type: CreateUserDto})
  @ApiResponse({ status: 200, description: 'User created successfully.', type: UserCreatedDTO })  
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUser.execute(createUserDto);
  }

  /*@Get('me')
  getProfile(@CurrentUser() user: { userId: string }) {
    return this.userService.findById(user.userId);
  }
*/
  

}
