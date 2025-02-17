import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { Public } from '../../../shared/decorators/public.decorator';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from 'src/shared/guards/local.guard';
import {
  LoginRequestDTO,
  LoginResponseDto,
  RegisterRequestDto,
} from '../dtos/auth.dtos';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { User } from 'src/identity/user/interfaces/user.interface';
import { GetUser } from 'src/shared/decorators/getuser.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Login',
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

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Register',
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

  @Get()
  async profile(@GetUser() user: User) {
    return this.authService.profile(user);
  }
}
