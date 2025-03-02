import { Injectable } from '@nestjs/common';
import { PrismaDatabaseService } from 'src/config/database/database.service';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaDatabaseService) {}

  async create(user: User) {
    return await this.prisma.user.create({ data: user });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email: email } });
  }
}
