import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto, UpdateTaskRelationsDto } from './dto/update-task.dto';
import { PrismaMySqlService } from 'src/config/database/mysql.service';
import { disconnect } from 'process';
import { connect } from 'http2';
@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { categories, tags, users, ...taskData } = createTaskDto;
    const task = {
      ...taskData,
      tags: {
        connect: tags?.map((id: string) => ({ id })) || [],
      },
      categories: {
        connect: categories?.map((id: string) => ({ id })) || [],
      },
      users: {
        connect: users?.map((id: string) => ({ id })) || [],
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
        users: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        users: true,
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
      },
      users: {
        connect: this.buildRelationOps(updateRelations.addUsers),
        disconnect: this.buildRelationOps(updateRelations.removeUsers),
      },
    };
  
  }

  private buildRelationOps(ids: string[] = []) {
    return ids.length > 0 ? ids.map((id) => ({ id })) : undefined;
  }

  async remove(id: string) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
