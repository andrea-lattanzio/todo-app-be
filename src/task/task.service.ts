import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto, UpdateTaskRelationsDto } from './dto/update-task.dto';
import { PrismaMySqlService } from 'src/config/database/mysql.service';
@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { categories, tags, userId, ...taskData } = createTaskDto;
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

  async findAll() {
    return await this.prisma.task.findMany({
      include: {
        categories: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            name: true,
            color: true,
          },
        },
        user: {
          select: {
            email: true
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        user: true,
        tags: true,
        categories: true,
      },
    });

    if(!task) { throw new NotFoundException('No task with such id'); }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const { updateRelations, ...taskData } = updateTaskDto;
    const relationUpdates = updateRelations ? this.prepareUpdateRelations(updateRelations) : {};
    const updatedData = {
      ...taskData,
      ...relationUpdates
    }

    return await this.prisma.task.update({
      where: { id },
      data: updatedData,
    });
  }

  private prepareUpdateRelations(updateRelations: UpdateTaskRelationsDto) {
    return {
      tags: {
        connect: this.buildRelationOps(updateRelations.addTags),
        disconnect: this.buildRelationOps(updateRelations.removeTags),
      },
      categories: {
        connect: this.buildRelationOps(updateRelations.addCategories),
        disconnect: this.buildRelationOps(updateRelations.removeCategories),
      }
    };
  
  }

  private buildRelationOps(ids: string[] = []) {
    return ids.length > 0 ? ids.map((id) => ({ id })) : undefined;
  }

  async remove(id: string) {
    return await this.prisma.task.delete({ where: { id } });
  }
}