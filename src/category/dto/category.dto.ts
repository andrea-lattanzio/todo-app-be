import { Category } from "@prisma/client";
import { Exclude, plainToInstance } from "class-transformer";

export class CategoryDto {
  id: string;
  name: string;
  description: string;

  @Exclude()
  createdAt: string;
  @Exclude()
  updatedAt: string;
  @Exclude()
  userId: string;

  constructor(partial: Partial<Category>) {
    Object.assign(this, plainToInstance(CategoryDto, partial));
  }

  static fromEntities(categories: Category[]): CategoryDto[] {
    return categories.map((category: Category) => new CategoryDto(category));
  }
}