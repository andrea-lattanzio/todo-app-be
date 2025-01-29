import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { Public } from '../../../common/decorators/public.decorator';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from 'src/common/guards/local.guard';
import {
  LoginRequestDTO,
  LoginResponseDto,
  RegisterRequestDto,
} from '../dtos/auth.dtos';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Logs in a user by sending back an authentication token',
    description:
      'This endpoint receives an email and a password and after validating them, returns a jwt token with the encrypted user infos',
  })
  @ApiBody({
    description: 'User email and password',
    type: LoginRequestDTO,
  })
  @ApiOkResponse({
    description: 'User succesfully logged in',
    type: LoginResponseDto,
  })
  async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Creates a new user',
    description:
      'This endpoint receives an email and a password and creates a new user if email is not already present',
  })
  @ApiBody({
    description: 'User email and password',
    type: RegisterRequestDto,
  })
  @ApiOkResponse({
    description: 'User succesfully created and logged in',
    type: LoginResponseDto,
  })
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<LoginResponseDto> {
    return this.authService.register(registerRequestDto);
  }
}
