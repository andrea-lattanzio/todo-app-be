import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaMySqlService } from 'src/config/database/mysql.service';
import {
  taskUpdateOmits,
  taskWithSelectedFields,
  taskWithTagsAndCategories,
} from './dto/queries.dto';
@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const { categories, tags, ...taskData } = createTaskDto;
    const task = {
      ...taskData,
      userId: userId,
      tags: {
        connect: tags?.map((id: string) => ({ id })) || [],
      },
      categories: {
        connect: categories?.map((id: string) => ({ id })) || [],
      },
    };
    return await this.prisma.task.create({ data: task });
  }

  async findAll(userId: string) {
    return await this.prisma.task.findMany({
      where: {
        userId: userId,
      },
      include: taskWithSelectedFields.include,
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: taskWithTagsAndCategories.include,
    });

    if (!task) {
      throw new NotFoundException('No task with such id');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const { categories, ...taskData } = updateTaskDto;

    return await this.prisma.task.update({
      where: { id },
      data: {
        ...taskData,
        categories: {
          set: categories?.map((id: string) => ({ id })) || [],
        },
      },
      omit: taskUpdateOmits.omit,
      include: taskWithTagsAndCategories.include,
    });
  }

  async remove(id: string) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
