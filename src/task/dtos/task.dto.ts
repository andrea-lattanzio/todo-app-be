import { Category, Task } from "@prisma/client";
import { Exclude, Expose, plainToInstance, Type } from "class-transformer";
import { CategoryDto } from "src/category/dto/category.dto";

type FullTask = Task & { categories?: Category[] };

export class TaskDto {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  
  @Type(() => CategoryDto)
  categories: CategoryDto[];

  @Exclude()
  createdAt: string;
  @Exclude()
  updatedAt: string;
  @Exclude()
  userId: string;

  constructor(partial: Partial<FullTask>) {
    Object.assign(this, plainToInstance(TaskDto, partial));
  }

  static fromEntities(tasks: FullTask[]): TaskDto[] {
    return tasks.map((task: FullTask) => new TaskDto(task));
  }
}