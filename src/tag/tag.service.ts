import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaMySqlService } from 'src/config/database/mysql.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async create(createTagDto: CreateTagDto) {
    return await this.prisma.tag.create({ data: createTagDto });
  }

  async findAll() {
    return await this.prisma.tag.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.tag.findUnique({ where: { id } });
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const updatedData = {};
    const tag = await this.prisma.tag.findUniqueOrThrow({ where: { id } });
    Object.entries(updateTagDto).forEach(([key, newValue]) => {
      if (newValue != null && newValue != tag[key]) {
        updatedData[key] = newValue;
      }
    });

    if (Object.keys(updatedData).length === 0) {
      return tag;
    }

    return await this.prisma.tag.update({ where: { id }, data: updatedData });
  }

  async remove(id: string) {
    return await this.prisma.tag.delete({ where: { id } });
  }
}
