import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaDatabaseService } from 'src/config/database/database.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaDatabaseService) {}

  async create(
    userId: string,
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDto> {
    const category = { ...createCategoryDto, userId };
    const createdCategory = await this.prisma.category.create({
      data: category,
    });
    return new CategoryDto(createdCategory);
  }

  async findAll(userId: string): Promise<CategoryDto[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        userId: userId,
      },
    });
    return CategoryDto.fromEntities(categories);
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUniqueOrThrow({
      where: { id },
    });
    return new CategoryDto(category);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
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
      return new CategoryDto(category);
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: updatedData,
    });

    return new CategoryDto(updatedCategory);
  }

  async remove(id: string): Promise<CategoryDto> {
    const deleted = await this.prisma.category.delete({ where: { id } });
    return new CategoryDto(deleted);
  }
}
