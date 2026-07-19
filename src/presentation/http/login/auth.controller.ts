import { Controller, Post, Body } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginInputDTO } from 'src/application/login/dto/login-input-dto';
import { LoginOutputDTO } from 'src/application/login/dto/login-output-dto';
import { LoginUseCase } from 'src/application/login/login-use-case';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({type: LoginInputDTO})
  @ApiResponse({ status: 200, description: 'JWT token', type: LoginOutputDTO })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: { email: string; password: string }) {    
    const token = await this.loginUseCase.execute({ email: body.email, password: body.password });
    return { accessToken: token };
  }
}
