import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaMySqlService } from 'src/config/database/mysql.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async create(userId: string, createCategoryDto: CreateCategoryDto) {
    const category = { ...createCategoryDto, userId };
    return await this.prisma.category.create({ data: category });
  }

  async findAll(userId: string) {
    return await this.prisma.category.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedData = {};
    const category = await this.prisma.category.findUniqueOrThrow({
      where: { id },
    });
    Object.entries(updateCategoryDto).forEach(([key, newValue]) => {
      if (newValue != null && newValue != category[key]) {
        updatedData[key] = newValue;
      }
    });

    if (Object.keys(updatedData).length === 0) {
      return category;
    }

    return await this.prisma.category.update({
      where: { id },
      data: updatedData,
    });
  }

  async remove(id: string) {
    return await this.prisma.category.delete({ where: { id } });
  }
}
