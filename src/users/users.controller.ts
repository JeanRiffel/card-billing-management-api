import { Controller, Body, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import {  
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UserCreatedDTO } from './dto/user-created.dto';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post()
  @ApiOperation({summary:'Create user' })
  @ApiBody({type: CreateUserDto})
  @ApiResponse({ status: 200, description: 'User created successfully.', type: UserCreatedDTO })  
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('me')
  getProfile(@CurrentUser() user: { userId: string }) {
    return this.userService.findById(user.userId);
  }

  

}
