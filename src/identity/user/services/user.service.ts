import { Injectable } from '@nestjs/common';
import { PrismaMySqlService } from 'src/config/database/mysql.service';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async create(user: User) {
    return await this.prisma.user.create({ data: user });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email: email } });
  }
}
