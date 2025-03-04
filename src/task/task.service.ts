import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { PrismaDatabaseService } from 'src/config/database/database.service';
import { Task } from '@prisma/client';
import { TaskDto } from './dtos/task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaDatabaseService) {}

  async create(userId: string, createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const { categories, ...taskData } = createTaskDto;
    const task = {
      ...taskData,
      userId: userId,
      categories: {
        connect: categories?.map((id: string) => ({ id })) || [],
      },
    };
    const createdTask: Task = await this.prisma.task.create({ data: task });
    return new TaskDto(createdTask);
  }

  async findAll(userId: string): Promise<TaskDto[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId: userId,
      },
      include: { categories: true },
    });

    return TaskDto.fromEntities(tasks);
  }

  async findOne(id: string): Promise<TaskDto> {
    const task = await this.prisma.task.findUniqueOrThrow({
      where: { id },
      include: { categories: true },
    });

    return new TaskDto(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskDto> {
    const { categories, ...taskData } = updateTaskDto;

    const updateData: any = { ...taskData };

    if (categories) {
      updateData.categories = {
        set: categories.map((id: string) => ({ id })),
      };
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: updateData,
    });

    return new TaskDto(updatedTask);
  }

  async remove(id: string): Promise<TaskDto> {
    const deletedTask = await this.prisma.task.delete({ where: { id } });
    return new TaskDto(deletedTask);
  }
}
