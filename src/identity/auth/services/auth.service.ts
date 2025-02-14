import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/identity/user/services/user.service';
import {
  BCRYPT_HASH_SALT,
  ERROR_EMAIL_EXISTS,
  ERROR_INVALID_CREDENTIALS,
  ERROR_USER_NOT_FOUND,
} from '../constants/auth.constants';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto, RegisterRequestDto } from '../dtos/auth.dtos';
import { JwtService } from '@nestjs/jwt';
import { AuthProvider, User } from 'src/identity/user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSrv: UserService,
    private readonly jwtSrv: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userSrv.findOneByEmail(email);
    if (!user) throw new BadRequestException(ERROR_USER_NOT_FOUND);
    const match = bcrypt.compareSync(password, user.password);
    if (!match) throw new BadRequestException(ERROR_INVALID_CREDENTIALS);
    return user;
  }

  async login(validatedUser: User): Promise<LoginResponseDto> {
    const user = {
      email: validatedUser.email,
    };
    const payload = {
      email: validatedUser.email,
      id: validatedUser.id,
    };
    return { token: await this.jwtSrv.signAsync(payload), user: user };
  }

  async register(user: RegisterRequestDto): Promise<LoginResponseDto> {
    const existingUser = await this.userSrv.findOneByEmail(user.email);
    if(existingUser) throw new BadRequestException(ERROR_EMAIL_EXISTS);
    const hashedPassword = await bcrypt.hashSync(user.password, BCRYPT_HASH_SALT);
    const newUser: User = {
      ...user,
      authProviders: AuthProvider.LOCAL,
      password: hashedPassword
    }
    await this.userSrv.create(newUser);
    return this.login(newUser);
  }

  async profile(user: User) {
    if(!user) return;
    return await this.userSrv.findOneByEmail(user.email);
  }
}
